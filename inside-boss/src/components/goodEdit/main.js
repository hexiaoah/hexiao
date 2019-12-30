import React, { Component } from 'react'
import { Input, Switch, Select, Form, Message, Breadcrumb, Modal, Button } from 'antd'
import {hashHistory} from 'react-router'
import BaseInfo from './baseInfo'
import Sepcification from './specification'
import Card from './card'
import DetailPicture from './detailPicture'
import styles from './style.css'
import * as action from "../../action"
import Format from './format'
const FormItem = Form.Item
const Option = Select.Option
const confirm = Modal.confirm;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
}
class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stepLengthOption: [
                {
                    label: '1',
                    value: '1'
                },
                {
                    label: '2',
                    value: '2'
                },
                {
                    label: '3',
                    value: '3'
                },
                {
                    label: '4',
                    value: '4'
                },
                {
                    label: '5',
                    value: '5'
                },
                {
                    label: '6',
                    value: '6'
                },
                {
                    label: '7',
                    value: '7'
                },
                {
                    label: '8',
                    value: '8'
                },
                {
                    label: '9',
                    value: '9'
                },
                {
                    label: '10',
                    value: '10'
                },
                {
                    label: '11',
                    value: '11'
                },
                {
                    label: '12',
                    value: '12'
                },
                {
                    label: '13',
                    value: '13'
                },
                {
                    label: '14',
                    value: '14'
                },
                {
                    label: '15',
                    value: '15'
                },
                {
                    label: '16',
                    value: '16'
                },
                {
                    label: '17',
                    value: '17'
                },
                {
                    label: '18',
                    value: '18'
                },
                {
                    label: '19',
                    value: '19'
                },{
                    label: '20',
                    value: '20'
                },
            ]
        }

    }
    submit(changeToSelf) {
        const { data, dispatch, menuId, industry} = this.props
        const { skuTableData, goodDetail, unitList, headPicture, detailPicture, selectedSkuList, freightTemplate} = data
        const { getFieldValue } = this.props.form
        const categoryEntry = getFieldValue('categoryEntry')
        const len = categoryEntry.length
        const categoryId = categoryEntry[len-1]
        const name = getFieldValue('name')
        const accountId = getFieldValue('accountId')
        const account = unitList.filter(item => item.id === accountId)
        const initSkuVOList = JSON.parse(localStorage.getItem('initSkuVOList'))
        const submitSkuVOList = Format.revertSkuVOList(skuTableData)
        const code = getFieldValue('code')
        const isGive = getFieldValue('isGive')
        const isTwoAccount = getFieldValue('isTwoAccount')
        const freightType = getFieldValue('freightType')
        const freightCost = getFieldValue('freightCost')
        const freightNumber = getFieldValue('freightNumber')
        const freightModelId = getFieldValue('freightModelId')
        const memo = getFieldValue('memo')
        const stepLength = getFieldValue('stepLength')
        const startNum = getFieldValue('startNum')
        const price = getFieldValue('price')
        const memberPrice = getFieldValue('memberPrice')
        const state = getFieldValue('state')
        const isTakeout = getFieldValue('isTakeout')
        const hasSku = getFieldValue('hasSku')
        const isShelfLife = getFieldValue('isShelfLife')
        const shelfLife = getFieldValue('shelfLife')
        let selectedValues = []
        selectedSkuList.map(item => {
            const v = item.skuValueList.filter(t => t.isSelect === 1)
            if (v.length > 0) {
                selectedValues.push(v)
            }
        })
        if (selectedValues.length === 0 && hasSku) {
            Message.error('多规格商品需要至少选择一个规格')
            return
        }
        if (freightTemplate.length === 0 && freightType == 2) {
            Message.error('你还未配置运费模板，请切换快递运费为统一运费后再保存')
            return
        }
        if (freightType == 2 && !freightModelId) {
            Message.error('请选择运费模版')
            return
        }
        if (submitSkuVOList.length > 64) {
            Message.error('每个商品最多添加64个商品规格')
            return
        }
        if (!hasSku) {
            initSkuVOList.map(item => {
                item.price = price
                item.memberPrice = memberPrice
            })
        }
        // 会员价为空时， 默认将会员价置为单价传给服务端
        submitSkuVOList.map(item => {
            if(item.memberPrice === '') {
                item.memberPrice = item.price
            }
        })
        const params = {
            // 商品ID
            id: menuId,
            // 分类Id
            categoryId,
            // 商品名称
            name,
            // 单位id
            accountId: accountId || '',
            // 单位
            account: account[0]? account[0].name: goodDetail.account,
            // 商品条码
            code,
            // 是否可作为赠品
            isGive: isGive? 1: 0,
            // 是否为散称商品
            isTwoAccount: isTwoAccount? 1:0 ,
            // 备注
            memo,
            // 快递物流
            freightType,
            // 运费/运费模版数量
            freightNumber: freightType == 1 ? freightCost : freightNumber,
            // 运费模版id
            freightModelId: freightModelId ? freightModelId : '',
            // 最小累加单位
            stepLength,
            // 起点份数
            startNum,
            // 单价
            price: price ? price : '',
            // 会员价
            memberPrice: memberPrice ? memberPrice : '',
            // 是否允许打折
            isRatio: goodDetail.isRatio,
            // 商品sku组合
            skuVOList: hasSku? submitSkuVOList:initSkuVOList,
            // 商品主图
            headPicList: headPicture,
            // 商品详情图
            detailPicList: detailPicture,
            // 上架状态
            state: state?1:0,
            // 是否在微店销售
            isTakeout: isTakeout && !isTwoAccount?1:0,
            // 是否转自建
            changeToSelf: changeToSelf,
            // 是否设置保质期
            isShelfLife: isShelfLife ? '1' : '0',
            // 保质期天数
            shelfLife: shelfLife ? shelfLife : goodDetail.shelfLife
        }
        dispatch(action.saveGoodItem(industry, params))
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll({force:true},(err, values) => {
            console.log('err', err)
            if (!err) {
                const { chain, data} = this.props
                const { goodDetail={} } = data
                const { chainManageableBaseVo={} } = goodDetail
                const { changeToSelf } = chainManageableBaseVo
                // 连锁下发的商品 并且允许门店将总部下发的商品转为单店的商品
                if (chain === 'true' && changeToSelf) {
                    confirm({
                        title: '提示',
                        content: '该下发商品将保存为单店商品，您确认吗?',
                        onOk: () => { this.submit(1)},
                        onCancel: () => {},
                    })
                } else {
                    this.submit(0)
                }
            } else {
                Message.error('请检查商品信息是否正确')
            }
        })
    }
    goGoodManage() {
        hashHistory.push('/ITEM_EXPORT/item')
    }
    render() {
        const self = this
        const {
            getFieldDecorator,
            getFieldValue,
            setFieldsValue
        } = self.props.form
        const { data, chain, dispatch, entityType } = self.props
        const { goodDetail = {}, headPicture=[], detailPicture = [], goodCategory = {}, unitList = [], goodSkuList = [], freightTemplate = [], selectedSkuList = [], skuTableData = [], strategy = {} } = data
        const { memo, hasSku, price, memberPrice, currentStock, frozenStock, state, isTakeout, stepLength = 1, chainManageableBaseVo={}, isTwoAccount} = goodDetail
        const { chainDataManageable, changeToSelf } = chainManageableBaseVo
        // 不可编辑
        const unEdit = (chain === 'true' && chainDataManageable === false && changeToSelf === false)
        const defaultStepLength = stepLength.toString()
        const specInfo = {
            hasSku,
            isTwoAccount,
            price,
            memberPrice,
            currentStock,
            frozenStock,
            chainManageConfig: chainManageableBaseVo
        }
        return (
            <Form >
                <div className={styles.bread_crumb}>
                    <span className={styles.split_line}></span>
                    <Breadcrumb>
                        <Breadcrumb.Item className={styles.bread_first} onClick={this.goGoodManage}>商品管理</Breadcrumb.Item>
                        <Breadcrumb.Item>编辑商品</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <BaseInfo
                    chain={chain}
                    baseInfo={goodDetail}
                    goodCategory={goodCategory}
                    unitList={unitList}
                    freightTemplate={freightTemplate}
                    getFieldDecorator={getFieldDecorator}
                    setFieldsValue={setFieldsValue}
                    entityType={entityType}
                    headPicture={headPicture}
                    dispatch={dispatch}
                    strategy = {strategy}
                />
                <Sepcification
                    chain={chain}
                    skuTableList={skuTableData}
                    goodSkuList={goodSkuList}
                    selectedSkuList={selectedSkuList}
                    specInfo={specInfo}
                    getFieldDecorator={getFieldDecorator}
                    getFieldValue={getFieldValue}
                    dispatch={dispatch}
                    formItemLayout={formItemLayout} />
                <Card title="商品展示设置">
                    <div className={styles.main}>
                        <div className={styles.display_item}>
                            <FormItem
                                label="起点份数"
                                {...formItemLayout}
                            >
                                {
                                    getFieldDecorator('startNum', {
                                        initialValue: goodDetail.startNum
                                    })(<Input style={{ width: 200 }} disabled={unEdit}/>)
                                }
                            </FormItem>
                        </div>
                        <div className={styles.display_item}>
                            {
                                goodDetail.stepLength &&
                                <FormItem
                                    label="最小累加单位"
                                    {...formItemLayout}
                                >
                                    {
                                        getFieldDecorator('stepLength', {
                                            initialValue: defaultStepLength
                                        })(
                                            <Select style={{ width: 200 }} disabled={unEdit}>
                                                {
                                                    this.state.stepLengthOption.map((item, index) => {
                                                        return (
                                                            <Option value={item.value} key={index}>{item.label}</Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        )
                                    }
                                    <span className={styles.step_tip}>例如最小累加单位为2，顾客在选择此商品时，每次点击加号，数量都会增加2，以此类推。</span>
                                </FormItem>
                            }
                        </div>
                    </div>
                </Card>
                <DetailPicture
                    dispatch={dispatch}
                    memo={memo}
                    chain={chain}
                    chainManageConfig={chainManageableBaseVo}
                    detailPicture={detailPicture}
                    getFieldDecorator={getFieldDecorator}
                    formItemLayout={formItemLayout} />
                <Card title="商品状态">
                    <div className={styles.main}>
                        <span className={styles.status_tip}>在所有可点单的设备上(包括火小二)显示</span>
                        <div className={styles.switch_group}>
                            <div className={styles.switch_item}>
                                <FormItem
                                    label="商品上架"
                                    {...formItemLayout}
                                >
                                    {
                                        getFieldDecorator('state', {
                                            valuePropName: 'checked',
                                            initialValue: state === 1
                                        })(<Switch disabled={unEdit}/>)
                                    }
                                </FormItem>
                            </div>
                            <div className={styles.switch_item}>
                                <FormItem
                                    label="在微店销售"
                                    {...formItemLayout}
                                >
                                    {
                                        getFieldDecorator('isTakeout', {
                                            valuePropName: 'checked',
                                            initialValue: isTakeout === 1
                                        })(<Switch disabled={isTwoAccount === 1 || unEdit}/>)
                                    }
                                </FormItem>
                            </div>
                        </div>
                    </div>
                </Card>
                <div className={styles.save_btn}>
                    <Form.Item>
                        <Button className={styles.btn} type="primary" onClick={(e) => {this.handleSubmit(e)}}>保存</Button>
                    </Form.Item>
                </div>
            </Form>

        )
    }
}

export default Form.create()(Main)
