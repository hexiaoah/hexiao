import React, { Component } from 'react'
import { Input, Switch, Checkbox, Table, Form, message, Select, Message } from 'antd'
import Card from './card'
import styles from './specification.css'
import Format from './format'
import * as action from "../../action";
const FormItem = Form.Item
const Option = Select.Option
class Sepcification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            multiSpe: false,
            showSpecSelect: false,
            // 批量设置弹窗
            isShowVolumnPop: false,
            volumnValue: {
                price: '',
                memberPrice: '',
                expectStock: '',
                expectCost: '',
            },
            selectedRowKeys: [],
            selectedRows: [],
        }
    }
    // 展示批量设置弹窗
    _showVolumnModal() {
        const { selectedRowKeys } = this.state
        if (selectedRowKeys.length === 0) {
            Message.info('请至少选择一项规格进行操作')
            return
         }
        this.setState({
            isShowVolumnPop: true
        })
    }
    // 隐藏批量设置弹窗
    _hideVolumnModal() {
        this.setState({
            isShowVolumnPop: false
        })
    }
    _priceChange(e) {
        const value = e.target.value
        const { volumnValue } = this.state
        volumnValue.price = value
        this.setState({
            volumnValue
        })

    }
    _memberPriceChange(e) {
        const value = e.target.value
        const { volumnValue } = this.state
        volumnValue.memberPrice = value
        this.setState({
            volumnValue
        })
    }
    _expectStockChange(e) {
        const value = e.target.value
        const { volumnValue } = this.state
        volumnValue.expectStock = value
        this.setState({
            volumnValue
        })
    }
    _expectCostChange(e) {
        const value = e.target.value
        const { volumnValue } = this.state
        volumnValue.expectCost = value
        this.setState({
            volumnValue
        })
    }
    // 批量设置
    _saveVolumn() {
        const { skuTableList = [], dispatch } = this.props
        const { volumnValue, selectedRowKeys } = this.state
        const { price, memberPrice, expectStock, expectCost} = volumnValue
        if (price === '') {
            Message.error('单价不能为空')
            return
        }
        selectedRowKeys.map(item => {
            skuTableList[item].price = price
            skuTableList[item].memberPrice = memberPrice
            if (expectCost) {
                skuTableList[item].costPrice = expectCost
            }
            if (expectStock) {
                skuTableList[item].openingInventory = expectStock
            }
        })
        dispatch(action.setSkuTableData(skuTableList))
        this._hideVolumnModal()
    }
    // 切换无规格到多规格
    // 多规格无法切换成无规格
    toggleMultiSpe(checked) {
        if (checked) {
            this.setState({
                multiSpe: true
            })
        } else {
            this.setState({
                multiSpe: false,
                showSpecSelect: false,

            })
        }
    }
    addSpec() {
        this.setState({
            showSpecSelect: true
        })
    }
    // 删除新增的规格
    deleteSku(item, index) {
        const { selectedSkuList, dispatch } = this.props
        const { isSelect } = item
        if (isSelect === 1) {
            message.info('已存在商品无法修改商品规格，请于规格库中停用或删除该商品')
            return
        } else {
            const selected = selectedSkuList[index].skuValueList.filter(item => item.isSelect === 1)
            if (selected.length) {
                message.info('请先取消勾选已选规格值, 再删除相关规格')
            } else {
                selectedSkuList.splice(index, 1)
                dispatch(action.setSelectedSkuList(selectedSkuList))
            }
        }
    }
    // 选择新的规格
    // 每个商品最多三个规格
    selectMoreSku(value) {
        const { goodSkuList, selectedSkuList } = this.props
        // 首先判断商品规则是不是已经存在再做后续操作
        const result = selectedSkuList.some(item => {
            if (item.name === value) {
                return true
            }
        })
        if (result) {
            message.info('此规格已经存在')
        } else {
            if (selectedSkuList.length < 3) {
                goodSkuList.map(item => {
                    if (item.name === value) {
                        selectedSkuList.push(item)
                    }
                })
            } else {
                message.info('每个商品最多添加三种规格')
            }
        }
        this.setState({
            showSpecSelect: false
        })

    }
    // 已选规格变化时 规格表格里的数据也更新
    selectedSkuChange(e, index, tIndex, result, id) {
        let { selectedSkuList, skuTableList, dispatch } = this.props
        let newTableData = []
        if (e.target.checked) {
            selectedSkuList[index].skuValueList[tIndex].isSelect = 1
            dispatch(action.setSelectedSkuList(selectedSkuList))
            newTableData = Format.selectdSkuToTableData(selectedSkuList, index, result, id)
        } else {
            if (selectedSkuList[index].isSelect === 1) {
                const skuList = selectedSkuList[index].skuValueList.filter(item => item.isSelect === 1)
                if (skuList.length === 1) {
                    Message.info('除非该规格停用，否则原规格项下必选择一个规格值')
                    return
                }
            }
            selectedSkuList[index].skuValueList[tIndex].isSelect = 0
            dispatch(action.setSelectedSkuList(selectedSkuList))
            newTableData = Format.deleteSkuValue(selectedSkuList, skuTableList, index,id)
        }
        if (newTableData.length > 64) {
            message.info('每个商品最多添加64个商品规格')
            selectedSkuList[index].skuValueList[tIndex].isSelect = 0
            dispatch(action.setSelectedSkuList(selectedSkuList))
            newTableData = Format.deleteSkuValue(selectedSkuList, skuTableList, index,id)
        }
        dispatch(action.setSkuTableData(newTableData))
    }
    // 多规格商品不能转化成无规格
    hasSkuClick(flag) {
        if (flag) {
            Message.info('规格商品无法转为无规格商品，请删除该商品重新创建。')
        }
    }
    columnPriceChange(text, record) {
        const { skuTableList, dispatch } = this.props
        const { key } = record
        skuTableList[key].price = text
        dispatch(action.setSkuTableData(skuTableList))
    }
    columnMemberpriceChange(text, record) {
        const { skuTableList, dispatch } = this.props
        const { key } = record
        skuTableList[key].memberPrice = text
        dispatch(action.setSkuTableData(skuTableList))
    }
    columnCodeChange(text, record) {
        const { skuTableList, dispatch } = this.props
        const { key } = record
        skuTableList[key].code = text
        dispatch(action.setSkuTableData(skuTableList))
    }
    columnCostPriceChange(text, record) {
        const { skuTableList, dispatch } = this.props
        const { key } = record
        skuTableList[key].costPrice = text
        dispatch(action.setSkuTableData(skuTableList))
    }
    columnOpeningInventoryChange(text, record) {
        const { skuTableList, dispatch } = this.props
        const { key } = record
        skuTableList[key].openingInventory = text
        dispatch(action.setSkuTableData(skuTableList))
    }
    checkPrice(rule, value, callback) {
        const reg = /^\d*(?:\.\d{0,2})?$/
        if (value) {
            const valueStr = value.toString()
            if ((!reg.test(valueStr.trim()) || valueStr.split('.')[0].length > 6 )) {
                callback('只能输入数字并且整数位最多六位,小数位最多保留两位')
            }
        }
        callback()
    }
    /**
     * 检验期初库存输入是否合格
     */
    checkInventory = (rule, value, callback) => {
        const { getFieldValue } = this.props
        const isTwoAccount = getFieldValue('isTwoAccount')
        if (isTwoAccount) {
            const reg = /^\d*(?:\.\d{0,2})?$/
            if (value) {
                const valueStr = value.toString()
                if ((!reg.test(valueStr.trim()) || valueStr.split('.')[0].length > 6 )) {
                    callback('只能输入数字并且整数位最多六位,小数位最多保留两位')
                }
            }
        } else {
            const reg = /^\d{1,6}$/
            if (value) {
                const valueStr = value.toString()
                if ((!reg.test(valueStr.trim()) )) {
                    callback('非散称商品的期初库存只能输入六位以内的整数')
                }
            }
        }
        callback()
    }
    render() {
        const { isShowVolumnPop, volumnValue, multiSpe, selectedRows} = this.state
        const { skuTableList = [], getFieldDecorator, formItemLayout, specInfo, goodSkuList, selectedSkuList=[], chain } = this.props
        const { chainManageConfig } = specInfo
        // 允许门店修改总部下发的商品 editable
        // 并且允许门店将总部下发的商品转为单店的商品 changeToSelf
        const { chainDataManageable, changeToSelf } = chainManageConfig
        // 可修改连锁下发
        const canEditSelf = chain === 'true' && chainDataManageable
        // 不可编辑
        const unEdit = (chain === 'true' && chainDataManageable === false && changeToSelf === false)
        const skuFormatList = Format.formatSkuVoList(skuTableList)
        const columns = [
            {
                title: '规格',
                dataIndex: 'spec',
            },
            {
                title: '规格条码',
                dataIndex: 'code',
                render: (text, record) => {
                    return (
                        <FormItem>
                            {
                                getFieldDecorator(`skuCode${record.key}`, {
                                    initialValue: text
                                })
                                (<Input onChange={(e) => { this.columnCodeChange(e.target.value, record) }} disabled={unEdit}></Input>)
                            }
                        </FormItem>
                    )
                }
            },
            {
                title: '单价',
                dataIndex: 'price',
                render: (text, record) => {
                    return (
                        <FormItem>
                            {
                                getFieldDecorator(`skuPrice${record.key}`, {
                                    rules: [{
                                        required: true,
                                        message: '请填写商品单价'
                                    },
                                    {
                                        validator: this.checkPrice
                                    }],
                                    initialValue: text
                                })(<Input onChange={(e) => { this.columnPriceChange(e.target.value, record) }} disabled={unEdit}></Input>)
                            }
                        </FormItem>
                    )
                }
            },
            {
                title: '会员价',
                dataIndex: 'memberPrice',
                render: (text, record) => {
                    return (
                        <FormItem>
                            {
                                getFieldDecorator(`skuMemberPrice${record.key}`, {
                                    rules: [{
                                        validator: this.checkPrice
                                    }],
                                    initialValue: text
                                })(<Input onChange={(e) => { this.columnMemberpriceChange(e.target.value, record) }} disabled={unEdit}></Input>)
                            }
                        </FormItem>

                    )
                }
            },
            {
                title: '期初库存数',
                dataIndex: 'openingInventory',
                render: (text, record) => {
                    return (
                        record.id?<span className={styles.disable_item}>-</span>:
                        <FormItem>
                            {
                                getFieldDecorator(`skuOpeningInventory${record.key}`, {
                                    rules: [
                                    {
                                        validator: this.checkInventory
                                    }],
                                    initialValue: text
                                })(<Input onChange={(e) => { this.columnOpeningInventoryChange(e.target.value, record) }} disabled={unEdit || record.id!== ''}></Input>)
                            }
                        </FormItem>
                    )
                }
            },
            {
                title: '期初成本价',
                dataIndex: 'costPrice',
                render: (text, record) => {
                    return (
                        record.id?<span className={styles.disable_item}>-</span>:
                        <FormItem>
                            {
                                getFieldDecorator(`skuCostPrice${record.key}`, {
                                    rules: [{
                                        validator: this.checkPrice
                                    }],
                                    initialValue: text
                                })(<Input onChange={(e) => { this.columnCostPriceChange(e.target.value, record) }} disabled={unEdit || record.id!== ''}></Input>)
                            }
                        </FormItem>
                    )
                }
            },
            {
                title: '当前库存数',
                dataIndex: 'inventory',
            },
            {
                title: '冻结库存数',
                dataIndex: 'frozenStock',
            }
        ]
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRowKeys, selectedRows});
            }
        }
        const newSpecData = selectedRows.filter(item => item.id !== '')
        const newLen = newSpecData.length
        return (
            <Card title="规格设置">
                <div className={styles.main}>
                    <div className={styles.spec_item}>
                        <FormItem
                            {...formItemLayout}
                            label="是否为多规格"
                        >
                            {
                                getFieldDecorator('hasSku', {
                                    valuePropName: 'checked',
                                    initialValue: specInfo.hasSku
                                })(<Switch disabled={specInfo.hasSku || unEdit} onChange={this.toggleMultiSpe.bind(this)} onClick={() => { this.hasSkuClick(specInfo.hasSku) }} />)
                            }
                        </FormItem>
                    </div>
                    {
                        ((specInfo.hasSku || multiSpe) && selectedSkuList.length > 0) &&
                        <div className={styles.spec_list}>
                            {
                                selectedSkuList.map((item, index) => {
                                    return (
                                        <div className={styles.spec_value} key={index}>
                                            <div className={styles.sv_top}>
                                                <span className={styles.sv_name}>
                                                    {`规格${index + 1}（${item.name}）`}
                                                </span>
                                                <span className={styles.delete} onClick={() => { this.deleteSku(item, index) }}>删除</span>
                                            </div>
                                            <div className={styles.sv_main}>
                                                {
                                                    item.skuValueList.map((t, tIndex) => {
                                                        return (
                                                            <Checkbox checked={t.isSelect} key={tIndex} style={{ marginRight: 30 }} onChange={(e) => { this.selectedSkuChange(e, index, tIndex, skuTableList, t.charId) }} disabled={unEdit || canEditSelf}>{t.name}</Checkbox>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    }
                    {
                        (specInfo.hasSku || multiSpe) && !unEdit && !canEditSelf &&
                        <div className={styles.add_spec}>
                            <span className={styles.add_text} onClick={this.addSpec.bind(this)}>+ 添加规格</span>
                        </div>
                    }
                    {
                        this.state.showSpecSelect &&
                        <div className={styles.spec_select}>
                            <Select style={{ width: 200 }} placeholder="请选择规格" onChange={this.selectMoreSku.bind(this)}>
                                {
                                    goodSkuList.map((item, index) => {
                                        return (
                                            <Option value={item.name} key={index}>{item.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                    }
                    {
                        !specInfo.hasSku && !multiSpe &&
                        <div className={styles.single_spec}>
                            <div className={styles.spec_item}>
                                <FormItem
                                    {...formItemLayout}
                                    label="单价(元)"
                                >
                                    {
                                        getFieldDecorator('price', {
                                            rules: [{
                                                required: true,
                                                message: '请填写商品单价'
                                            },
                                            {
                                                validator: this.checkPrice
                                            }
                                            ],
                                            initialValue: specInfo.price
                                        })(<Input style={{ width: 200 }} disabled={unEdit} />)
                                    }
                                </FormItem>
                            </div>
                            <div className={styles.spec_item}>
                                <FormItem
                                    {...formItemLayout}
                                    label="会员价(元)"
                                >
                                    {
                                        getFieldDecorator('memberPrice', {
                                            rules: [{
                                                required: false,
                                                validator: this.checkPrice
                                            }],
                                            initialValue: specInfo.memberPrice
                                        })(<Input style={{ width: 200 }} disabled={unEdit} />)
                                    }
                                </FormItem>
                            </div>
                            <div className={styles.spec_item}>
                                <FormItem
                                    {...formItemLayout}
                                    label="当前库存数"
                                >
                                    {
                                        getFieldDecorator('currentStock', {
                                            initialValue: specInfo.currentStock
                                        })(<Input style={{ width: 200 }} disabled />)
                                    }
                                </FormItem>
                            </div>
                            <div className={styles.spec_item}>
                                <FormItem
                                    {...formItemLayout}
                                    label="冻结库存"
                                >
                                    {
                                        getFieldDecorator('frozenStock', {
                                            initialValue: specInfo.frozenStock
                                        })(<Input style={{ width: 200 }} disabled />)
                                    }
                                </FormItem>
                            </div>
                        </div>
                    }
                    {
                        (specInfo.hasSku || multiSpe) &&
                        <FormItem
                        >
                        <div className={styles.multi_spec}>
                            <Table
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={skuFormatList}
                            />
                            {
                                (!unEdit && !canEditSelf) &&
                                <div className={styles.multi_set} onClick={this._showVolumnModal.bind(this)}>
                                    批量设置
                                </div>
                            }

                        </div>
                        </FormItem>
                    }
                    {/* 批量设置 */}
                    {
                        isShowVolumnPop &&
                        <div className={styles.add_spec_container}>
                            <div className={styles.box_bg} onClick={() => this._hideVolumnModal()} ></div>
                            <div className={styles.add_spec_box}>
                                <div className={styles.add_title}>批量设置</div>
                                <div className={styles.add_spec_name}>
                                    <span><i className={styles.required_symbol}>*</i>单价</span>
                                    <input type="text" value={volumnValue.price} onChange={(e) => this._priceChange(e)} />
                                </div>
                                <div className={styles.add_spec_name}>
                                    <span>会员价</span>
                                    <input type="text" value={volumnValue.memberPrice} onChange={(e) => this._memberPriceChange(e)} />
                                </div>
                                {
                                    newLen === 0 &&
                                    <div className={styles.add_spec_name}>
                                        <span>期初库存</span>
                                        <input type="text" value={volumnValue.expectStock} onChange={(e) => this._expectStockChange(e)} />
                                    </div>
                                }
                                {
                                    newLen === 0 &&
                                    <div className={styles.add_spec_name}>
                                        <span>期初成本价</span>
                                        <input type="text" value={volumnValue.expectCost} onChange={(e) => this._expectCostChange(e)} />
                                    </div>
                                }

                                <div className={styles.add_spec_bottom}>
                                    <div className={styles.btn_cancel} onClick={() => this._hideVolumnModal()}>取消</div>
                                    <div className={styles.btn_save} onClick={() => this._saveVolumn()}>保存</div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </Card>
        )
    }
}

export default Sepcification
