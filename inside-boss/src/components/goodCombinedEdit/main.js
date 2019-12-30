import React, { Component } from 'react'
import { Input, Breadcrumb, Form, Button, Message } from 'antd'
import styles from './style.css'
import * as action from '../../action'
import BaseInfo from './baseInfo'
import CombineInfo from './combineInfo'
import Format from './format'
import { hashHistory } from 'react-router'

const Search = Input.Search
class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentWillMount() {
    }

    handleSubmit(){
        const { getFieldValue } = this.props.form
        const {
            headPicture = [],
            unitList = [],
            freightTemplate
        } = this.props.data
        const {menuId} = this.props
        const categoryEntry = getFieldValue('categoryEntry') || []
        const len = categoryEntry.length
        const categoryId = categoryEntry[len - 1]
        const id = menuId
        const name = getFieldValue('name')
        const code = getFieldValue('code')
        const isGive = getFieldValue('isGive')?1:0
        // const isTwoAccount = getFieldValue('isTwoAccount')
        const freightType = getFieldValue('freightType')
        const freightCost = getFieldValue('freightCost')
        const freightModelId = getFieldValue('freightModelId')
        const price = getFieldValue('combinedGoodsPrice')
        const memberPrice = getFieldValue('combinedGoodsMemberPrice')
        const list =Format.getRequestChildItem(this.props.data.selectCombinedGoods) || []
        list.pop()
        const accountId = getFieldValue('accountId')
        const account = unitList.filter(item => item.id === accountId)
        if (!categoryId) {
            Message.error('商品分类不能为空')
            return
        } else if (!name) {
            Message.error('商品名称不能为空')
            return
        } else if (account.length === 0) {
            Message.error('结账单位不能为空')
            return
        } else if (freightType === '1' && freightCost === '') {
            Message.error('运费不能为空')
            return
        } else if (freightType == 2 && !freightModelId) {
            Message.error('请选择运费模版')
            return
        } else if (freightTemplate.length === 0 && freightType == 2) {
            Message.error(
                '你还未配置运费模板，请切换快递运费为统一运费后再保存'
            )
            return
        } else if (list.length === 0) {
            Message.error('组合商品至少要选择一个子商品')
            return
        } else if (list.length > 50) {
            Message.error('每个组合商品最多允许添加50个子商品，请修改！')
            return
        } else if (!price) {
            Message.error('组合商品销售单价不能为空')
            return
        }
        const { dispatch } = this.props
        const updateParams = {
            id,
            headPicList:headPicture,
            name,
            code,
            isGive,
            freightType,
            freightCost,
            childItems: list,
            categoryId,
            price,
            account: account[0] ? account[0].name : goodDetail.account,
            memberPrice,
            accountId
        }
        const addParams = {
            headPicList: headPicture,
            name,
            code,
            isGive,
            freightType,
            freightCost,
            childItems: list,
            categoryId,
            price,
            account: account[0] ? account[0].name : goodDetail.account,
            memberPrice,
            accountId
        }
        if(id){
            dispatch(action.updateCombinedGood(updateParams))
        }else{
            dispatch(action.addCombinedGood(addParams))
        }
         setTimeout(() => {
             hashHistory.push('/ITEM_EXPORT/item?routeSource=combined')
         }, 500)


    }
    render() {
        const { data, dispatch, } = this.props
        const {
            goodCategory = [],
            headPicture = [],
            goodDetail = {},
            itemList = {},
            unitList =[],
            goodItemDetail = {},
            selectCombinedGoods = [],
            childSpecItems = [],
            selectGoodsSpecList = [],
            freightTemplate
        } = data
        const {
            getFieldDecorator,
            getFieldValue,
            setFieldsValue
        } = this.props.form
        return (
            <div>
                <Form>
                    <div className={styles.bread_crumb}>
                        <span className={styles.split_line} />
                        <Breadcrumb>
                            <Breadcrumb.Item
                                className={styles.bread_first}
                                onClick={this.goGoodManage}
                            >
                                组合商品
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>编辑商品</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <BaseInfo
                        getFieldDecorator={getFieldDecorator}
                        setFieldsValue={setFieldsValue}
                        headPicture={headPicture}
                        goodCategory={goodCategory}
                        dispatch={dispatch}
                        baseInfo={goodDetail}
                        unitList={unitList}
                        freightTemplate={freightTemplate}
                    />

                    <CombineInfo
                        getFieldDecorator={getFieldDecorator}
                        itemList={itemList}
                        goodItemDetail={goodItemDetail}
                        dispatch={dispatch}
                        selectCombinedGoods={selectCombinedGoods}
                        CombineInfo={goodDetail}
                        childSpecItems={childSpecItems}
                        goodCategory={goodCategory}
                        selectGoodsSpecList={selectGoodsSpecList}
                    />
                </Form>
                <div className={styles.save_btn}>
                    <Form.Item>
                        <Button
                            className={styles.btn}
                            type="primary"
                            onClick={e => {
                                this.handleSubmit(e)
                            }}
                        >
                            保存
                        </Button>
                    </Form.Item>
                </div>
            </div>
        )
    }
}
export default Form.create()(Main)
