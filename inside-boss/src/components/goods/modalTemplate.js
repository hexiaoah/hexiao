import React, { Component } from 'react';
import { Modal, Button, Checkbox, Table, Popover, Icon, Radio, Progress, Pagination } from 'antd'
import style from './style.css'
import { recursionClass } from './data'
import * as action from '../../action'
import moment from 'moment'

const CheckGroup = Checkbox.Group
const RadioGroup = Radio.Group;

const histroyColumns =(props)=>([
    {
        title: '导入时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render:(text,record)=>{
            return moment(record.createTime).format('YYYY-MM-DD HH:mm:ss')
        },
        width:180
    },{
        title: '导入结果',
        render:(text,record)=>{
            return(
                <span>
                    <span>新增<span className = {style.Bcolor} >{record.successAdd}</span>条</span>,
                    <span>更新<span className = {style.Bcolor} >{record.successUpdate}</span>条</span>,
                    <span>失败<span className = {style.Bcolor} >{record.failed}</span>条</span>
                </span>
            )

    }
    },{
        title: '导入成功文件',
        dataIndex: 'successFilePath',
        key: 'successFilePath',
        width:120,
        render:(text,record)=>{
            if(record.successFilePath){
                return(
                    <a className = {style.Bcolor} onClick={()=>props.handleExport(record.successFilePath)}>{moment(record.createTime).format('YYYY-MM-DD')}.xls</a>
                )
            }
        }
    },{
        title: '导入失败文件',
        dataIndex: 'failedFilePath',
        key: 'failedFilePath',
        width:120,
        render:(text,record)=>{
            if(record.failedFilePath){
                return(
                    <a className = {style.Bcolor} onClick={()=>props.handleExport(record.failedFilePath)}>{moment(record.createTime).format('YYYY-MM-DD')}.xls</a>
                )
            }
        }
    }
])

const columns = [
    {
        title: '商品名称',
        dataIndex: 'showColumn1',
        key: 'showColumn1',
        width:100
    },
    {
        title: '编码',
        dataIndex: 'showColumn2',
        key: 'showColumn2',
        width:100
    },
    {
        title: '错误位置',
        dataIndex: 'rowNum',
        key: 'rowNum',
        width:100,
        render: (text, record)=>{
            return record.rowNum ? `第${record.rowNum}行`:''
        }
    },
    {
        title: '错误信息',
        dataIndex: 'failMsg',
        key: 'failMsg',
        render: (text, record) => {
            let message = ''
            try {
                // message = JSON.parse(record.failMsg)[0].message || ''
                message = JSON.parse(record.failMsg).map((i,index)=>{
                    return <p key={index} >{i.message}</p>
                })
            } catch (error) {
                console.log(error)
            }
            return message
        },
    },
]


const ModalTemplate = {
        select:(props)=>{
            const { handleBack, handleCancel, handleChange, state, selectAll, templateSelect, ok, data  } = props
            const { arr, type } = state
            const list = data.menuList && data.menuList.length ? recursionClass(data.menuList):[]
            const height = (Math.min(10,list.length || 0) + 1) * 34
            return(
                <div className={style.templateSelectWarp}>
                    <div className={style.templateSelectAll}>
                        <Checkbox checked={type} onChange={templateSelect} >空白模板</Checkbox>
                    </div>
                    <div className={style.templateSelectAll}>
                        <Checkbox checked={!type} onChange={templateSelect} >商品模板</Checkbox>
                        <Popover placement="bottomLeft" overlayStyle={{width:225}}  content = '下载的表格中将包含已选分类下的商品信息，便于进行商品的批量修改。'>
                            <Icon style={{ fontSize: 16, paddingLeft: 12, verticalAlign: 'middle' }} type="question-circle-o" />
                        </Popover>
                    </div>

                    <div className={style.templateSelectAllWarp} style={ {height: type?'0':`${height}px` }} >
                        <div className={style.templateSelectItem} onChange={selectAll.bind(null,list)}><Checkbox disabled={type} checked={arr.length !== 0 && arr.length === list.length }>全选</Checkbox></div>
                            <div className={ style.templateSelectGroup}>
                                <CheckGroup onChange = {handleChange.bind(null,list)} value={arr} >
                                    {
                                        list && list.length && list.map(item=>{
                                            return(
                                                <div key={item.id} className={style.templateSelectItem}>
                                                    <Checkbox disabled={type} value={item.id}>{item.name}</Checkbox>
                                                </div>
                                            )
                                        })
                                    }
                                </CheckGroup>
                            </div>
                    </div>
                    <div>
                        <p className={style.templateExplanation}>注意事项：</p>
                        <p className={style.templateExplanation}>1.请仔细阅读下载模板中的填表说明后再进行填写</p>
                        <p className={style.templateExplanation}>2.请勿随意更改模板表头</p>
                        <p className={style.templateExplanation}>3.不同门店混合使用同一份模板导入时，请保证导入门店的表头设置与模板表头保持一致</p>
                    </div>
                    <div style={{textAlign:'right',marginTop:'10px'}}>
                        <Button onClick={handleBack} >上一步</Button>
                        <Button onClick={handleCancel} style={{marginLeft:'10px'}} >取消</Button>
                        <Button onClick={()=>ok(arr)} style={{marginLeft:'10px'}} type="primary" >确定</Button>
                    </div>
                </div>
            )
        },
        history:(props)=>{
            const { paginationChange, state, data } = props
            const resultList = data.historyDate
            const total = resultList && resultList.total ? resultList.total : 0
            return(
                resultList && resultList.data && resultList.data.length ?
                <div>
                    <div style={{marginBottom:'10px',border:'1px solid #e9e9e9'}}>
                        <Table scroll={{y:240}} bordered pagination={false} columns = { histroyColumns(props) } dataSource = { resultList.data }></Table>
                    </div>
                    <div className={style.paginationBox}>
                        <Pagination size="small"  className={style.paginationHtml} showQuickJumper current={state.pageIndex} total={total} defaultPageSize={10}
                                    pageSize={10} onChange={paginationChange}  />
                        <p>共{total}条记录</p>
                    </div>
                </div>: 
                <Table scroll={{y:240}} bordered pagination={false} columns = { histroyColumns(props) } dataSource = { [] }></Table>
            )
        },
        result:(props)=>{
            const { resultList, handleCancel } = props
            return (
                resultList && resultList.finished ?
                        <div>
                            <div className={style.resultTitle}>本次共导入<span style={{color:'#108ee9'}}> {resultList.total} </span>条记录，其中：</div>
                            {
                                (resultList.successAdd || resultList.successUpdate) ?
                                <div className={style.resultSuccess} style={{borderBottom: '1px solid #ccc'}}>
                                    <Icon className={style.resultIcon} type="check-circle-o" />
                                    <span>新增<span style={{color:'#108ee9'}}> {resultList.successAdd} </span>条记录，更新<span style={{color:'#108ee9'}}> {resultList.successUpdate} </span>条记录</span>
                                </div>: null
                            }
                            {
                                resultList.failed ?
                                <div style={{height:'35px'}}>
                                    <Icon className={style.resultIcon} style={{color:'#f04134'}} type="close-circle-o" />
                                    <span>失败<span style={{color:'#108ee9'}}> {resultList.failed} </span>条记录，请仔细检查修改后，重新选择文件导入</span>
                                </div> : null
                            }
                            {
                                resultList.failed && resultList.failMsg ?
                                <div className={style.resultTableWarp}>
                                    <Table size='small' scroll={{y:124}} bordered pagination={false} columns = { columns } dataSource = { resultList.failMsg }></Table>
                                </div> : null
                            }
                            <div style={{overflow:'hidden'}}>
                                { resultList.failedFilePath &&
                                    <Popover overlayStyle={{width:225}} trigger="hover" content = '可导出含【导入失败原因】列的表格，修改后可重新导入' placement= 'rightTop' >
                                        <a href={resultList.failedFilePath || ''} style={{color: '#108ee9'}}>下载纠错模板<Icon className={style.recoveryTemplate} type="question-circle-o" /></a>
                                    </Popover>
                                }
                                <Button onClick={handleCancel} style={{float:'right'}} type="primary" >我知道了</Button>
                            </div>
                        </div>
                    :  <Progress percent={resultList.percent} status={resultList.percent >= 100 ?'success':'active'} />
            )
        }
    }

class view extends Component {
    constructor(){
        super()
        this.state = {
            arr:[],
            type:true,
            pageIndex: 1
        }
    }
    templateSelect=(e)=>{
        if(e.target.checked){
            this.setState(()=>({type:!this.state.type}))
        }
    }
    handleChange=(list,value)=>{
        this.setState(()=>({
            arr:value,
            checkedAll:value.length === list.length
        }))
    }
    selectAll=(list,e)=>{
        let checked = e.target.checked
        if(checked){
            this.setState(()=>({arr:list.map(i=>i.id),checkedAll:checked}))
        }else{
            this.setState(()=>({arr:[],checkedAll:checked}))
        }
    }
    ok = (arr)=>{
        this.props.handleOk(this.state.type?[]:arr)
        this.setState(()=>({arr:[]}))
    }
    handleCancel = ()=>{
        if(this.props.modalType == 'result' && this.props.resultList && !this.props.resultList.finished) return
        this.props.dispatch(action.setModalVisible({boole:false,modalType:''}))
        this.setState(()=>({arr:[]}))
    }
    handleReload = ()=>{
        this.props.dispatch(action.setModalVisible({boole:false,modalType:''}))
        setTimeout(() => {
            window.location.reload()
        }, 800);
    }
    handleExport=(url)=>{
        if(url) window.location.href = url
    }
    selectTitle(modalType='select'){
        return {
            result: this.props.resultList && this.props.resultList.finished ?'导入结果':'商品模板导入中...',
            history:'历史导入记录',
            select:'模板选择'
        }[modalType]
    }
    paginationChange = (pageIndex)=>{
        this.setState(()=>({pageIndex}))
        const plateEntityId = this.props.data.brandId || ''
        this.props.dispatch(action.getImportResultList(plateEntityId,pageIndex))
    }

    render(){
        const { show = false, modalType = '', resultList } = this.props
        const title = this.selectTitle(modalType)
        return(
            <div>
                {ModalTemplate[modalType]?(
                <Modal
                    closable={ !(modalType == 'result' && resultList && !resultList.finished) }
                    title={title}
                    visible={show}
                    style={{minWidth:'650px',height:'600px'}}
                    footer={null}
                    onCancel = {this.handleCancel}
                >
                    {
                        ModalTemplate[modalType]({...this,...this.props})
                    }
                </Modal>):''}
            </div>
        )
    }
}

export default view