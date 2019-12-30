/**
 * Created by air on 2017/7/31.
 */
import React, {Component} from 'react'
import cx from 'classnames'
import styles from './style.css'
import {message, Button, Modal, Spin, Select, Tabs, Input } from 'antd'

const Option = Select.Option;
const TabPane = Tabs.TabPane;

import GoodsList from './goodsList'
import CateManage from '../cateManage/main'
import AddExcel from './addExcel'
import * as action from '../../action'
import saveAs from '../../utils/saveAs'
import * as bridge from '../../utils/bridge'
import {setBrandId} from "../../action"
import FieldTemplate from './fieldTemplate'
import ModalTemplate from './modalTemplate'
import apiNetwork from '../../api/networkApi'


class Main extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            importLock: false,
            exportLock: false,
            exportLock1: false,
            exportLock2: false,
            exportLock3: false,
            visible:false,
            type:'',
            storeName: '',
            feedbackUrl:'https://jinshuju.net/f/egvdM3'
        }
    }
    
    componentDidMount() {
        const t = this
        const {dispatch} = t.props
    }
    
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        if (nextProps.data.brandId !== this.state.storeName)
            this.setState({
                storeName: nextProps.data.brandId
            })
    }
    
    clearFn(e, dispatch) {
        
        (e !== undefined) && e.preventDefault()
        
        window.location.reload()
        
    }
    
    json2url(json) {
        let url = ''
        let arr = []
        for (let i in json) {
            arr.push(i + '=' + json[i])
        }
        url = arr.join('&')
        return url
    }
    
    handleExport(url) {
        const t = this
        const {token} = bridge.getInfoAsQuery()
        
        t.setState({
            exportLock: true
        })
        
        const {isRecharge, rechargeBatchId} = this.props.data
        
        if (!!isRecharge && !rechargeBatchId) {
            message.warn('没有选择有效的文件！')
            setTimeout(() => {
                t.setState({
                    exportLock: false
                })
            }, 2000)
            return
        }
        
        saveAs(url, token).then(
            filename => message.success('导出成功!'), // 成功返回文件名
            err => {
                if (err.code === 0) {
                    
                    if (err.errorCode === '401') {
                        bridge.callParent('logout')
                        return
                    }
                    
                    message.error(err.message || '导出失败')
                }
                
            }
        ).then(e => this.setState({exportLock: false}))
    }
    
    handleDownload(url) {
        if(this.props.data.inWhite){
            location.href = this.props.data.newTemplateFile
        }else{
            location.href = url
        }
    }
    
    //选择品牌
    handleChange(e) {
        console.log(e);
        this.setState({
            storeName: e,
        });
        const {dispatch} = this.props
        dispatch(action.setPageIndex(1))
        dispatch(action.setBrandId(e));
        dispatch(action.getGoodsList(1, e))
        dispatch(action.getMenuTree(e))
        dispatch(action.getCustomTableHeader(e))
        dispatch(action.canSetupMenuLanguage(e))
        dispatch(action.setGoodsParams({kindId:'',keyWord:''}))
    }
    //导出商品信息
    exportProductInfo = ()=>{
        this.setState(()=>({exportLock1:true}))
        const plateEntityId = this.state.storeName
        apiNetwork.batchExportMenu({plateEntityId}).then(res=>{
            if(res.data){
                this.getExportPath({taskId:res.data})
            }
          },err=>{
            this.setState(()=>({exportLock1:false}))
            this.props.dispatch(action.errorHandler(err))
          })
    }
    //导出套餐信息
    exportMenuInfo=()=>{
        this.setState(()=>({exportLock2:true}))
        const plateEntityId = this.state.storeName
        apiNetwork.batchExportSuit({plateEntityId}).then(res=>{
            if(res.data){
                this.getExportPath({taskId:res.data})
            }
          },err=>{
            this.setState(()=>({exportLock2:false}))
            this.props.dispatch(action.errorHandler(err))
          })
    }

    getExportPath(params,count = 0){
        const reg = /^(http|https):.+\.(xlsx|xls)$/
        // if( count > 20 ){
        //     this.setState(()=>({exportLock2:false,exportLock1:false}))
        //     return message.error('网络连接超时，请稍后再试！')
        // } 
        apiNetwork.getExportPath(params).then(res=>{
            if(res.data){
                if(reg.test(res.data)){
                    message.success('导出成功!')
                    window.location.href = res.data
                }else{
                    message.error(res.data)
                }
                this.setState(()=>({exportLock2:false,exportLock1:false}))
            }else{
                setTimeout(() => {
                    this.getExportPath(params,++count)
                }, 1000);
            }
        },err=>{
            this.setState(()=>({exportLock2:false,exportLock1:false}))
            this.props.dispatch(action.errorHandler(err))
        })
    }
    //空白模板
    exportTemplate = () => {
        this.setState(()=>({visible:true,type:'exportTemplate'}))
        const plateEntityId = this.state.storeName
        const MenuLanguage = this.props.data.menuLanguage
        this.props.dispatch(action.getTableFieldsList({plateEntityId,MenuLanguage}))
    }
    handleHide=()=>{
        this.setState(()=>({visible:false}))
    }

    //下一步
    handleNext = () => {
        let data = []
        this.props.data.tableFieldsOptions &&
        Object.values( this.props.data.tableFieldsOptions ).map(i=>{
            data = data.concat(i.selectedList)
        })
        const twinsFiledIdList = this.props.data.twinsFiledIdList || {}
        data.map(item=>{
            if( Object.prototype.toString.call(twinsFiledIdList).slice(8,-1) === 'Object' ){
                if (twinsFiledIdList.hasOwnProperty(item) && data.indexOf(twinsFiledIdList[item]) == -1 ){
                    data.push(twinsFiledIdList[item])
                }
            }
        })
        if(!data.length) return message.error('勾选字段不能为空')
        const plateEntityId = this.state.storeName
        //保存勾选字段
        this.props.dispatch(action.batchCreatUserGridField({data,plateEntityId}))
        this.props.dispatch(action.setModalVisible({boole:true,modalType:'select'}))
        this.handleHide()
    }
    //恢复默认
    handleReset = () => {
        const plateEntityId = this.state.storeName
        const MenuLanguage = this.props.data.menuLanguage
        this.props.dispatch(action.resetFromFieldsList(plateEntityId,MenuLanguage))
    }
    //选择模板
    handleOk = (kindMenuIdList) =>{
        const { dispatch } = this.props
        this.setState(()=>({exportLock3:true}))
        this.props.dispatch(action.setModalVisible({boole:false,modalType:''}))
        const plateEntityId = this.state.storeName
        dispatch(action.startDownload({kindMenuIdList,plateEntityId})).then(res=>{
        if(res.data){
            window.location.href = res.data
            this.setState(()=>({exportLock3:false}))
        }
        },err=>{
            this.setState(()=>({exportLock3:false}))
            dispatch(action.errorHandler(err))
        })
    }

    //上一步
    handleBack=()=>{
        this.props.dispatch(action.setModalVisible({boole:false,modalType:''}))
        this.setState(()=>({visible:true}))
    }
    
    //历史记录
    handleHistory=()=>{
        const plateEntityId = this.state.storeName
        this.props.dispatch(action.setResultData(null))
        this.props.dispatch(action.getImportResultList(plateEntityId))
        this.props.dispatch(action.setModalVisible({boole:true,modalType:'history'}))
    }

    handleResult=(res)=>{
        console.log(res)
        this.props.dispatch(action.setModalVisible({boole:true,modalType:'result'}))
    }
    goView(url){
        window.open(url)
    }
    
    render() {
        const t = this
        const {dispatch, data} = t.props
        const testList = Object.keys(data)
        const query = bridge.getInfoAsQuery()
        const industry= query.industry
        if (testList.length === 0) {
            return null
        }
        // isRecharge 是否为会员卡批量充值入口
        const {exportData, exportBtnText, templateFile, newTemplateFile, isRecharge, rechargeBatchDetailsViewList, showSpin, rechargeBatchId, modalVisible, resultData} = data
        let {exportUrl} = data
        let final = exportData
        
        if (!!isRecharge) {
            final = Object.assign({}, exportData, {rechargeBatchId: rechargeBatchId})
        }
        if (data.isShowBrand === "fixed") {
            exportUrl = exportUrl.replace('/v1/menus', '/v2/menus');
            final.plateEntityId = data.brandId ? data.brandId : '';
        }
        const _exportUrl = exportUrl + '?' + t.json2url(final)
        const len = isRecharge ? rechargeBatchDetailsViewList.length : 0
        return (
            <div className={styles.main_wrapper}>
                {t.props.data.isShowBrand === "fixed" ? (
                    <div className={styles.select_wrapper}>
                        <span className={styles.select_title}> 品牌:</span>
                        <Select className={styles.select}
                                defaultValue={t.state.storeName || '请选择'}
                                value={t.state.storeName || '请选择'}
                                onChange={(e) => t.handleChange(e)}>
                            {
                                data.brandList ? data.brandList.map(function (val) {
                                    return <Option value={val.entityId} key={val.entityId}>{val.name}</Option>
                                }) : ''
                            }
                        </Select>
                        <span>
                        {t.state.storeName ? '' : '说明：请先选择品牌。如果没有品牌请在掌柜APP内创建一个品牌。'}
                        </span>
                        {t.state.storeName ? '' : (function () {
                            return <hr/>
                        }())}
                    </div>
                ) : ""}
                {(!t.props.data.isShowBrand && (t.props.data.isShowBrand !== null)) ? '' : (((t.state.storeName && t.props.data.isShowBrand === "fixed") || t.props.data.isShowBrand !== "fixed") ?
                    (<div>
                        <a className={ styles.instructions } target="_blank" href="https://shimo.im/docs/6CCyjqR6QgtdhQqp/">使用指南及常见问题</a>
                        <div className={styles.top_line}>
                            {
                                industry === 3 ?
                                <div className={styles.import_part}>
                                    <Button className={styles.secondButton}
                                            onClick={t.handleDownload.bind(t, templateFile)}>下载空白模版</Button>
                                    <div className={styles.vertical_line}/>
                                    <AddExcel dispatch={dispatch} data={data}/>
                                    <Button type="primary" loading={this.state.exportLock}
                                            className={cx(styles.primaryButton, styles.export_btn)}
                                            onClick={t.handleExport.bind(t, _exportUrl)}>
                                        {exportBtnText}
                                    </Button>
                                </div>
                                :
                                <Tabs>
                                    <TabPane tab="商品导入" key="1">
                                        <div className={styles.import_part}>
                                            <Button className={styles.secondButton}
                                            loading = {this.state.exportLock3}
                                                    onClick={this.exportTemplate}>下载空白模版</Button>
                                            <div className={styles.vertical_line}/>
                                            <AddExcel handleResult={this.handleResult}  dispatch={dispatch} data={data} plateEntityId={this.state.storeName } />
                                            <Button type="primary"
                                                    className={cx(styles.primaryButton, styles.history_btn)}
                                                    onClick={this.handleHistory}>
                                                    历史导入记录
                                            </Button>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="商品导出" key="2">
                                        <div className={styles.import_part}>
                                            <div className={styles.export_warp}>
                                                <Button type="primary" loading={this.state.exportLock1} onClick={this.exportProductInfo} className={cx(styles.primaryButton, styles.export_btn)}>商品信息导出</Button>
                                                <Button type="primary" loading={this.state.exportLock2} onClick={this.exportMenuInfo} className={cx(styles.primaryButton, styles.export_btn)}>套餐信息导出</Button>
                                            </div>
                                        </div>
                                    </TabPane>
                                </Tabs>
                            }
                        </div>
                        <Button onClick={this.goView.bind(this,this.state.feedbackUrl)} type="primary" className={ styles.feedbackWarp }>
                            <span className={styles.feedback} >体验反馈</span>
                        </Button>
                        <GoodsList data={data} dispatch={dispatch}/>
                        <FieldTemplate 
                        visible={this.state.visible} 
                        dispatch = { dispatch }
                        data = { data }
                        handleCancel = {this.handleHide}
                        >
                                <Button onClick={this.handleReset} style={{float:"left"}}>恢复默认值</Button>
                                <Button onClick={this.handleHide} >取消</Button>
                                <Button onClick={this.handleNext} type="primary">{
                                    this.state.type === 'exportMenuInfo'? '确定' : '下一步'
                                }</Button>
                        </FieldTemplate>
                        {
                            modalVisible && modalVisible.boole ?
                            (<ModalTemplate 
                            handleBack={this.handleBack}
                            handleOk = { this.handleOk }
                            dispatch = { dispatch }
                            data = {this.props.data}
                            show = { modalVisible.boole }
                            modalType = { modalVisible.modalType }
                            resultList = { resultData }
                            ></ModalTemplate>) : null
                        }
                        {showSpin && showSpin.bool ? (
                            <div className={styles.cover}>
                                <Spin tip={showSpin.content} style={{marginTop: 160, marginLeft: -160}}
                                      size="large"/>
                            </div>
                        ) : null
                        }
                    </div>) : '')
                }
                
                {/*{(t.state.storeName && t.props.data.isShowBrand === "fixed" )|| (t.props.data.isShowBrand !== "fixed" && t.props.data.isShowBrand !=="undefined")?*/}
                {/*: ''}*/}
            </div>
        )
    }
}

export default Main





