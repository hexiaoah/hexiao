import React, { Component } from 'react'
import { Table, Pagination, Button, Modal, Select, Input, message  } from 'antd'
import styles from './style.css'
import * as bridge from '../../utils/bridge'
import * as action from '../../action'
import Specification from './specification'
import FieldTemplate from './fieldTemplate'
import { getColumns, recursionClass } from './data'

const Option = Select.Option
const Search = Input.Search
class GoodsList extends Component{
    constructor (props) {
        super(props)
         this.showSpecification=this.showSpecification.bind(this);
        this.state={
             visible: false,
             show:false,
             columns1 : [
                {
                    title: '分类名称',
                    dataIndex: 'kindMenuName',
                    key: 'kindMenuName',
                    width: 100,
                },
                {
                    title: '商品名称',
                    dataIndex: 'name',
                    key: 'name',
                    width: 100,
                },
                {
                    title: '编码',
                    dataIndex: 'code',
                    key: 'code',
                    width: 100,
                },
                {
                    title: '单价（元）',
                    dataIndex: 'price',
                    key: 'price',
                    width: 100,
                },
                {
                    title: '会员价（元）',
                    dataIndex: 'memberPrice',
                    key: 'memberPrice',
                    width: 100,
                },
                {
                    title: '结账单位',
                    dataIndex: 'account',
                    key: 'account',
                    width: 100,
                },
                {
                    title: '点菜单位',
                    dataIndex: 'buyAccount',
                    key: 'buyAccount',
                    width: 100,
                },
                {
                    title: '是否打折',
                    dataIndex: 'isRatio',
                    key: 'isRatio',
                    width: 100,
                    render: (text, record) => {
                        return record.isRatio==1?"是":"否";
                    },
                },
                {
                    title: '商品简介',
                    dataIndex: 'memo',
                    key: 'memo',
                    width: 500,
                },
                {
                    title: '商品库存',
                    dataIndex: 'stock',
                    key: 'stock',
                    width: 100,
                },
                {
                    title: '加工耗时',
                    dataIndex: 'consume',
                    key: 'consume',
                    width: 100,
                    render: (text, record) => {
                        return record.consume==0?"":record.consume;
                    },
                }
            ],
             columns2 :[
                {
                    title: '分类名称',
                    dataIndex: 'kindMenuName',
                    key: 'kindMenuName',
                },
                {
                    title: '商品名称',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '条形码',
                    dataIndex: 'code',
                    key: 'code',
                },
                {
                    title: '单价（元）',
                    dataIndex: 'price',
                    key: 'price',
                    render: (text, record) => {
                        return record.specification?record.scopePrice:record.price;
                        },
                },
                {
                    title: '会员价（元）',
                    dataIndex: 'memberPrice',
                    key: 'memberPrice',
                    render: (text, record) => {
                        return record.specification?record.scopeMemberPrice:record.memberPrice;
                    },
                },
                {
                    title: '结账单位',
                    dataIndex: 'account',
                    key: 'account',
                },
                {
                    title: '是否为称重商品',
                    dataIndex: 'isTwoAccount',
                    key: 'isTwoAccount',
                    render: (text, record) => {
                        return record.isTwoAccount==1?"是":"否";
                    },
                },
                {
                    title: '是否打折',
                    dataIndex: 'isRatio',
                    key: 'isRatio',
                    render: (text, record) => {
                        return record.isRatio==1?"是":"否";
                    },
                },
                {
                    title: '规格属性',
                    dataIndex: 'specification',
                    key: 'specification',
                    render: (text, record) => {
                        return !record.specification?'-':<Button onClick={this.showSpecification.bind(this,record.id)}>查看规格</Button>;
                    },
                },
                {
                    title: '商品介绍',
                    width: '200',
                    dataIndex: 'memo',
                    key: 'memo',
                }
            ],
            searchParams:{
                keyWord:'',
                kindId: ''
            }
        }
    }
    paginationChange(pageNumber){
        const t =this
        const { dispatch ,data} = t.props
        this.setState({
            current: pageNumber,
        });
        dispatch(action.setPageIndex(pageNumber))
        // if(data.isShowBrand==="fixed"){
        //     let brandId=data.brandId?data.brandId:'';
        //     dispatch(action.getGoodsList(pageNumber,brandId))
        // }else {
        //     dispatch(action.getGoodsList(pageNumber))
        // }
        this.getGoodsList(pageNumber)

    }
    showSpecification(data){
        this.setState({
            specificationDataId:data,
            visible: true,
        });
    }
    
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleReset = ()=>{
        const { dispatch } = this.props
        const tableFieldsOptions = this.props.data.tableFieldsOptions
        Object.keys(tableFieldsOptions).map(key=>{
            tableFieldsOptions[key].selectedList = [].concat(tableFieldsOptions[key].defaultList)
        })
        dispatch(action.setTableFiledOptions(tableFieldsOptions))
    }
    handleHide = ()=>{
        this.setState(()=>({show:false}))
    }
    selectComplete=()=>{
        const plateEntityId = this.props.data.brandId ? this.props.data.brandId :''
        const gridType = '2'
        let data = []
        let fieldsList = []
        Object.values(this.props.data.tableFieldsOptions).map(i=>{
            data = data.concat(i.selectedList)
        })
        this.props.data.tableFieldsList.map(i=>{
            let list = i.children ? i.fields.concat(i.children.map(h=>h.fields)): [].concat(i.fields)
            action.flatDeep(list).filter(j=>{
                // if(data.includes(j.gridFieldId)){
                if(data.indexOf(j.gridFieldId) >= 0 ){
                    fieldsList.push(j.customId)
                }
            })
        })
        if(!data.length) return message.info('选择字段不能为空')
        this.props.dispatch(action.batchCreatUserGridField({data:fieldsList,plateEntityId,gridType}))
        this.props.dispatch(action.setTableHeader(data))
        this.setState(()=>({show:false}))
    }
    handleShow=()=>{
        const plateEntityId = this.props.data.brandId ? this.props.data.brandId :''
        const MenuLanguage = this.props.data.menuLanguage
        this.props.dispatch(action.getCustomTableHeader(plateEntityId,false,MenuLanguage))
        this.setState(()=>({show:true}))
    }
    handleMenuChange = (kindId)=>{
        this.getGoodsList(1,kindId)
    }

    handleInputChange = (e)=>{
        const keyWord = e.target.value
        const params = {
            kindId: this.props.data.goodsParams.kindId,
            keyWord
        }
        this.props.dispatch(action.setGoodsParams(params))
    }

    componentWillReceiveProps(nextProps){
        const query = bridge.getInfoAsQuery()
        const industry = query.industry
        if( nextProps.data.tableHeader && nextProps.data.tableHeader.length && this.props.data.tableHeader != nextProps.data.tableHeader  && industry !== 3 ){
            const columns = getColumns(nextProps.data.tableHeader)
            const tableWidth = document.getElementsByClassName('customGoodsTable')[0].offsetWidth || 0
            const scrollXWidth = columns.map(i=>i.width?i.width:120).reduce((a,b)=>a+b)
            columns = columns.map(i=>{
                if(i.dataIndex === 'kindMenuName' || i.dataIndex === 'name' ){
                    if(scrollXWidth > tableWidth ){
                        i.fixed = 'left'
                    }else{
                        i.fixed || delete i.fixed
                    }
                }
                return i
            })
            this.setState({columns1: columns && columns.length ? columns : this.state.columns1  })
        }
    }
    getGoodsList=(index=1,kindId = undefined)=>{
        const { dispatch ,data} = this.props
        const pageNumber = index
        const params = {
            kindId: kindId === undefined ? data.goodsParams.kindId : kindId,
            keyWord: data.goodsParams.keyWord
        }
        dispatch(action.setGoodsParams(params))
        dispatch(action.setPageIndex(pageNumber))
        if(data.isShowBrand==="fixed"){
            const brandId = data.brandId?data.brandId:'';
            dispatch(action.getGoodsList(pageNumber,brandId,params))
        }else {
            dispatch(action.getGoodsList(pageNumber,null,params))
        }
    }

    render(){
        const t = this
        const query = bridge.getInfoAsQuery()
        const industry=query.industry
        const { data, dispatch } = t.props
        const total = data.goodsListTotal
        const picturelist = data.goodsList
        const pageNumber = data.pageNumber
        const columns=industry===3?this.state.columns2:this.state.columns1
        const menuList = this.props.data.menuList? recursionClass(this.props.data.menuList) : []
        return (
                <div className={styles.wrap}>
                    {
                        industry !== 3 &&
                        <div className={styles.headTip}>
                            <span>商品库</span>
                            <Select value = {data.goodsParams.kindId} onChange={this.handleMenuChange} defaultValue='1' style={{width:180,marginLeft:20}}>
                                <Option className={styles.menuListItem} value=''>全部分类</Option>
                                {
                                    menuList && menuList.map(item=>{
                                        return <Option className={styles.menuListItem} key={item.id} value={item.id}>{item.name}</Option>
                                    })
                                }
                            </Select>
                            <Search onChange = {this.handleInputChange} value = {data.goodsParams.keyWord} onSearch={()=>(this.getGoodsList())} placeholder='搜索' style={{width:180,marginLeft:20}}></Search>
                            <Button onClick={this.handleShow} style={{float:"right"}}>自定义表头</Button>
                        </div>
                    }
                    <Table 
                    className="customGoodsTable"
                    dataSource={picturelist} 
                    columns={columns} 
                    scroll={{x:industry !== 3 && columns.map(i=>i.width?i.width:120).reduce((a,b)=>a+b),y:industry !== 3 }}   
                    pagination={false}
                    bordered/>
                    <div className={styles.paginationBox}>
                        <Pagination  className={styles.paginationHtml} showQuickJumper current={pageNumber} total={total} defaultPageSize={10}
                                    pageSize={10}   onChange={this.paginationChange.bind(this)} />
                        <p>共{total}条记录</p>
                    </div>
                    <Modal
                        title="规格详情"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        style={{minWidth:'720px'}}
                        footer={null}
                    >
                        <Specification data={this.state.specificationDataId}/>
                    </Modal>
                    <FieldTemplate 
                    visible={this.state.show} 
                    dispatch = { dispatch }
                    data = { data }
                    handleCancel = {this.handleHide}
                    // handleOk = {this.selectComplete}
                    >
                        <Button onClick={this.handleReset} style={{float:"left"}}>恢复默认值</Button>
                        <Button onClick={this.handleHide} >取消</Button>
                        <Button onClick={this.selectComplete} type="primary">确定</Button>
                    </FieldTemplate>
                 </div>
        )
    }
}
export default GoodsList
