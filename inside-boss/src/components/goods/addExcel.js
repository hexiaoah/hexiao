import React, {Component} from 'react'
import {Table, Pagination, Button} from 'antd'
import styles from './style.css'
import api from '../../api/uploadApi'
import networkApi from '../../api/networkApi'
import * as bridge from "../../utils/bridge";
import axios from "axios/index";
import {message, Modal} from "antd/lib/index";
import * as action from "../../action";

class Specification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            importLock1: false,
            importLock2: false,
            previewText: '请上传excel文件',
            inputVal: '',
            inputFile: {}
        }
        this.goodsV2Submit = this.goodsV2Submit.bind(this)
    }
    
    //监听上传
    uploadChange(e) {
        console.log('output aaaa',e);
        let files = e.target.files
        if (!(files && files[0])) {
            this.setState(()=>({inputVal:''}))
            return false
        }
        if (files[0] && files[0].size < 1024 * 1024 * 8) {
            this.setState({
                inputVal: e.target.value,
                previewText: e.target.files[0].name,
                inputFile: e.target.files[0]
            })
        } else {
            message.info('文件太大，无法上传！')
        }
    }
    
    //清除导入内容
    clearInput() {
        this.setState({
            inputVal: '',
            previewText: '请上传excel文件',
            inputFile: {}
        })
    }
    
    uploadSubmit() {
        const {data} = this.props
        let {importData} = data
        // 品牌
        if (data.isShowBrand === "fixed") {
            if (!data.brandId) {
                message.info('您还未选择品牌！');
                return false
            }
            importData.plateEntityId = data.brandId ? data.brandId : '';
            if (Object.prototype.toString.call(this.state.inputFile).match(/[A-Z][a-z]*/)[0] !== "File") {
                message.info('请先选择excel文件！');
                return false
            } else {
                // this.goodsV2Submit()
                this.uploadFile()
                return false
            }
        }
        if (Object.prototype.toString.call(this.state.inputFile).match(/[A-Z][a-z]*/)[0] !== "File") {
            message.info('请先选择excel文件！');
            return false
        }
        
        // this.goodsSubmit()
        this.uploadFile()
    }
    
    //品牌导入（餐饮）
    goodsV2Submit() {
        console.log(222)
        let that = this;
        let modal = Modal.success({
            title: '正在导入中，稍后可在导入履历页面中查看导入结果',
            content: ``,
        });
        that.setState({
            importLock1: true,
        })
        let importData=this.props.data.importData
        api.uploadGoodsV2({
            ...importData,
            file:this.state.inputFile
        }).then(res => {
            modal.destroy();
            that.uploadSuccess(res)
            that.setState({
                importLock1: false
            })
            
        }).catch(err => {
            modal.destroy();
            that.setState({
                importLock1: false
            })
            that.uploadError(err)
        })
    }
    //上传到oss服务
    uploadFile(){
        const that = this
        this.setState({
            importLock1: true
        })
        const plateEntityId = this.props.data.brandId ? this.props.data.brandId :''
        api.uploadfile(this.state.inputFile).then(data=>{
            if(data){
                that.filesSubmit({plateEntityId,fileName:data})
            }
        }).catch(err=>{
            this.props.dispatch(action.errorHandler(err))
            this.setState({
                importLock1: false
            })
            this.clearInput()
        })
    }

    //oss服务返回链接给服务端
    filesSubmit(params){
        networkApi.batchImport(params).then(res=>{
            this.updateProgress({finished:false, percent: 1})
            this.changeResultModal(true,'result')
            this.setState({importLock1: false})
            this.clearInput()
            setTimeout(() => {
                this.getImportProcess(res.data)
            }, 800);
        }).catch(err=>{
            this.importFaild(err)
        })
    }

    //查询上传进度
    getImportProcess( importName ){
        const that = this
        const plateEntityId = that.props.plateEntityId ? that.props.plateEntityId : ''
        networkApi.getImportProcess({ importName, plateEntityId }).then(res=>{
            if(!res.data.finished){
                const data = {
                    success: res.data.success || 0,
                    failed: res.data.failed || 0,
                    total: res.data.total || 1,
                }
                setTimeout(() => {
                    const params = {
                        finished: res.data.finished,
                        percent: Math.max(1,parseInt((data.success/1 + data.failed/1) / data.total * 100))
                    }
                    that.updateProgress(params)
                    that.getImportProcess( importName )
                }, 1000);
            }else{
                that.getImportResult(importName)
                that.updateProgress({finished:res.data.finished,percent: 100})
            }
        }).catch(err=>{
            that.importFaild(err)
        })
    }
    
    //查询上传结果
    getImportResult(importName){
        const plateEntityId = this.props.plateEntityId ? this.props.plateEntityId : ''
        const params = {
            importName,
            plateEntityId
        }
        networkApi.getImportResult(params).then(res=>{
            if(res.data){
                this.setState({importLock1: false})
                let data = {
                    finished: true,
                    success: res.data.success || 0,
                    successAdd: res.data.successAdd || 0,
                    successFilePath: res.data.successFilePath || '',
                    successUpdate: res.data.successUpdate|| 0,
                    failed: res.data.failed || 0,
                    failedFilePath: res.data.failedFilePath || '',
                    total: res.data.total || 0,
                }
                if(res.data.failMsg && res.data.failMsg.length){
                    data.failMsg = res.data.failMsg.map((item,index)=>({
                        key: index,
                        rowNum: item.rowNum,
                        showColumn1: item.showColumn1,
                        showColumn2: item.showColumn2,
                        failMsg: item.failMsg
                    }))
                }
                this.updateProgress(data)
                this.clearInput()
                this.successUpdate()
            }
        }).catch(err=>{
            if(err.message == '结果还在处理，请稍后再获取'){
                setTimeout(() => {
                    this.getImportResult(importName)
                }, 1000);
            }else{
                this.importFaild(err)
            }
        })
    }

    updateProgress(params){
        this.props.dispatch(action.setResultData(params))
    }
    changeResultModal(boole,modalType){
        this.props.dispatch(action.setModalVisible({boole,modalType}))
    }

    importFaild(err){
        this.props.dispatch(action.errorHandler(err))
        this.setState({importLock1: false})
        this.changeResultModal(false,'result')
        this.clearInput()
    }
    
    goodsSubmit() {
        let that = this;
        let modal = Modal.success({
            title: '正在导入中，稍后可在导入履历页面中查看导入结果',
            content: ``,
        });
        that.setState({
            importLock1: true,
        })
        let importData=this.props.data
        api.uploadGoods({
            ...importData,
            file:this.state.inputFile
        }).then(res => {
            modal.destroy();
            that.uploadSuccess(res)
            that.setState({
                importLock1: false
            })
        }).catch(err => {
            modal.destroy();
            that.setState({
                importLock1: false
            })
            that.uploadError(err)
        })
    }
    
    //多规格导入（零售）
    goodsSpecificationSubmit() {
        if (!!this.state.inputFile && Object.prototype.toString.call(this.state.inputFile).match(/[A-Z][a-z]*/)[0] === "File") {
            let that = this;
            let modal = Modal.success({
                title: '正在导入中，稍后可在导入履历页面中查看导入结果',
                content: ``,
            });
            that.setState({
                importLock2: true,
            })
            api.uploadGoodsSpecification(this.state.inputFile).then(res => {
                modal.destroy();
                that.uploadSuccess(res)
                that.setState({
                    importLock2: false
                })
            }).catch(err => {
                modal.destroy();
                that.setState({
                    importLock2: false
                })
                that.uploadError(err)
            })
        } else {
            message.info('请先选择excel文件！');
            return false
        }
    }

    //多规格导入（零售）
    goodsNoSpecificationSubmit() {
        if (!!this.state.inputFile && Object.prototype.toString.call(this.state.inputFile).match(/[A-Z][a-z]*/)[0] === "File") {
            let that = this;
            let modal = Modal.success({
                title: '正在导入中，稍后可在导入履历页面中查看导入结果',
                content: ``,
            });
            that.setState({
                importLock1: true,
            })
            api.uploadGoodsNoSpecification(this.state.inputFile).then(res => {
                modal.destroy();
                that.uploadSuccess(res)
                that.setState({
                    importLock1: false
                })
            }).catch(err => {
                modal.destroy();
                that.setState({
                    importLock1: false
                })
                that.uploadError(err)
            })
        } else {
            message.info('请先选择excel文件！');
            return false
        }
    }
    successUpdate = ()=>{
        const {dispatch, data} = this.props
        dispatch(action.setGoodsParams({keyWord:'',kindId:''}))
        dispatch(action.setPageIndex(1))
        if (data.isShowBrand === "fixed") {
            let brandId = data.brandId ? data.brandId : '';
            dispatch(action.getGoodsList(1, brandId))
            dispatch(action.getMenuTree(brandId))
        } else {
            dispatch(action.getGoodsList(1))
            dispatch(action.getMenuTree())
        }
    }
    // 导入成功
    uploadSuccess(res) {
        let {isRecharge} = this.props.data
        const {messages} = res
        let that = this
        let messageList = messages ? messages : []
        const {dispatch, data} = that.props
        dispatch(action.setPageIndex(1))
        if (data.isShowBrand === "fixed") {
            let brandId = data.brandId ? data.brandId : '';
            dispatch(action.getGoodsList(1, brandId))
        } else {
            dispatch(action.getGoodsList(1))
        }
        
        Modal.info({
            title: '导入信息',
            onOk: () => {
                if (!isRecharge) {
                    setTimeout(function () {
                        that.clearFnforSuccess(undefined, dispatch)
                    }, 1000)
                }
                that.setState({
                    importLock: false,
                    previewText: '请上传excel文件'
                })
            },
            
            content: <div>
                <p>文件导入成功</p>
                {messageList.map((val, i) => {
                    return (<p key={i}>{val}</p>)
                })}
            </div>
        })
    }
    
    uploadError(err) {
        let {isRecharge} = this.props.data
        let that = this
        if (err.errorCode === '401') {
            bridge.callParent('logout')
            return
        } else {
            
            //失败接口返回字符串
            const {message} = err
            
            if (message.indexOf('[') >= 0) {
                const list = eval(message)
                
                Modal.error({
                    title: '错误信息',
                    onOk: () => {
                        if (!isRecharge) {
                            setTimeout(function () {
                                that.clearFn(undefined)
                            }, 1000)
                        }
                        that.setState({
                            importLock: false,
                            previewText: '请上传excel文件'
                        })
                    },
                    content: <div>
                        <p style={{
                            color: '#999',
                            borderBottom: '1px solid #e2e9e7',
                            paddingBottom: '10px',
                            textAlign: 'center'
                        }}>
                            文件中有错误信息，导入失败，请仔细检查修改后，重新选择文件导入
                        </p>
                        <div className={styles.errorBox}>
                            <ul>
                                <li>商品名称</li>
                                <li>编码</li>
                                <li>错误位置</li>
                                <li>错误信息</li>
                            </ul>
                            {
                                list.map((e, i) => {
                                    return <ul key={i}>
                                        {
                                            e.name ? (
                                                <li className={styles.errorLiLeft}>{e.name}</li>
                                            
                                            ) : (
                                                <li className={styles.errorLiLeft}><br/></li>)
                                        }
                                        
                                        {
                                            e.code ? (
                                                <li className={styles.errorLiLeft}>{e.code}</li>
                                            
                                            ) : (
                                                <li className={styles.errorLiLeft}><br/></li>)
                                        }
                                        
                                        <li className={styles.errorLiLeft}>{e.rowNum}</li>
                                        <li className="errorLiRight">{e.error}</li>
                                    </ul>
                                })
                            }
                        </div>
                    </div>,
                    width: 720
                })
                
            } else {
                Modal.info({
                    title: '导入信息',
                    onOk: () => {
                        if (!isRecharge) {
                            setTimeout(function () {
                                that.clearFn(undefined)
                            }, 1000)
                        }
                        that.setState({
                            importLock: false,
                            previewText: '请上传excel文件'
                        })
                    },
                    content: <div>{message}</div>
                })
            }
        }
    }
    
    clearFn(e) {
        (e !== undefined) && e.preventDefault()
        // window.location.reload()
        this.clearInput()
    }
    clearFnforSuccess(e) {
        (e !== undefined) && e.preventDefault()
        window.location.reload()
    }
    render() {
        const t = this
        const {data} = t.props
        const query = bridge.getInfoAsQuery()
        const industry = query.industry
        const showBtn = t.state.previewText !== '请上传excel文件'
        console.log('white???',data.showSpecification, data.inWhite)
        return (
            <div style={{display: 'inline'}}>
                <div className={styles.view_area}>
                    <p className={styles.view_text}>{t.state.previewText}</p>
                    {(() => {
                        if (showBtn) {
                            return (
                                <div className={styles.delete_btn} onClick={this.clearInput.bind(this)}>
                                    <div className={styles.delete_vertical}/>
                                    <div className={styles.delete_horizontal}/>
                                </div>
                            )
                        } else {
                            return null
                        }
                    })()}
                </div>
                <label className={styles.input_wrapper}>
                    <input type='file' name='upload'
                           accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                           value={this.state.inputVal}
                           onChange={this.uploadChange.bind(this)}/>
                    <span className={styles.chose_area}>选择文件</span>
                </label>
                {industry === 3 && !!data.inWhite ?
                    // 零售
                    <div style={{display: 'inline'}}>
                        <Button type="primary" className={styles.chooseFile} onClick={this.goodsNoSpecificationSubmit.bind(this)}
                                loading={this.state.importLock1}>导入无规格商品</Button>
                        <Button type="primary" className={styles.chooseFile}
                                loading={this.state.importLock2}
                                onClick={this.goodsSpecificationSubmit.bind(this)}>导入多规格商品</Button>
                    </div> :
                    // 餐饮
                    <Button type="primary" className={styles.chooseFile}
                            loading={this.state.importLock1} onClick={this.uploadSubmit.bind(this)}>导入</Button>
                }
            </div>
        )
    }
}

export default Specification
