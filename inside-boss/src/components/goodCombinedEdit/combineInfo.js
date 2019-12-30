import React, { Component } from 'react'
import { Form, Select, Input, Cascader, Table, Popover,Button } from 'antd'
const Search = Input.Search
import Card from './card'
import classnames from 'classnames'
import styles from './combineInfo.css'
import CombinedGoodsDetail from './combinedDetailTable'
import Format from './format'
import * as action from '../../action'
import * as bridge from '../../utils/bridge'
const FormItem = Form.Item
const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 14 }
}
class combinedInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowAddGoodsPop: false,
            selectedRowKeys: [],
            selectedSpecRowKeys: [],
            selectedSpecRows: {},
            skuList: [],
            selectGood: [],
            currentGoodId: '',
            formatSelectGoodList: [],
            num: 0,
            defaultPrice: 0,
        }
    }
    hide = () => {
        this.setState({
            visible: -1
        })
        this.setState({
            selectedSpecRows: null,
            skuList: []
        })
    }

    handleVisibleChange = (index,rows) => {
        this.setState({
            visible: index,
            // selectedSpecRows: rows,
            // skuList: []
        })
    }

    columns2 = [
        {
            title: '商品名称',
            dataIndex: 'name'
        },
        {
            title: '商品编码',
            dataIndex: 'code'
        },
        {
            title: '规格',
            dataIndex: 'specifications',
            render: (text, record,index) => {
                const isShowSelect = record.hasSku
                const { selectedSpecRows } = this.state
                const selectSpecNum =
                    selectedSpecRows?selectedSpecRows.length: record.selectSpecsNum
                const {skuList} = this.state
                return (
                    <Popover
                        placement="right"
                        visible={this.state.visible === index}
                        onVisibleChange={this.handleVisibleChange.bind(
                            this,
                            index,
                        )}
                        content={
                            <div>
                                <Table
                                    rowSelection={this.rowSpecSelection}
                                    columns={this.specColumns}
                                    dataSource={skuList}
                                    pagination={false}
                                    rowKey="id"
                                />
                                <div className={styles.tableBottom}>
                                    <div>已选{selectSpecNum}项</div>
                                    <div>
                                        <button
                                            className={styles.cancelBtn}
                                            onClick={this.hide.bind(this)}
                                        >
                                            取消
                                        </button>
                                        {selectSpecNum === 0 && (
                                            <button className={styles.saveBtn}>
                                                保存
                                            </button>
                                        )}
                                        {selectSpecNum > 0 && (
                                            <button
                                                className={styles.saveBtn}
                                                onClick={this.saveSelectRes.bind(
                                                    this,
                                                    2
                                                )}
                                            >
                                                已选择{selectSpecNum}
                                                个商品，确定并保存
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        }
                        trigger="click"
                    >
                        {isShowSelect && (
                            <a onClick={this.selectSpec.bind(this, record)}>
                                {record.selectSpecsNum
                                    ? '已选择' + record.selectSpecsNum
                                    : '选择'}
                            </a>
                        )}
                    </Popover>
                )
            }
        },
        {
            title: '分类',
            dataIndex: 'type'
        },
        {
            title: '单价(¥)',
            dataIndex: 'price'
        },
        {
            title: '会员价(¥)',
            dataIndex: 'memberPrice'
        },
        {
            title: '结账单位',
            dataIndex: 'account'
        },
        {
            title: '库存',
            dataIndex: 'currentStock'
        }
    ]
    selectSpec(record) {
        const { dispatch } = this.props
        dispatch(action.getGoodItemDetail(record.id))
        this.setState({
            currentGoodId: record.id,
            account: record.account,
            skuList: [],
            selectedSpecRows:null
            // selectedSpecRows:[]
        })
        // this.num=0
        setTimeout(() => {
            this.setState({
                skuList: Format.formatSkuVoList(
                    this.props.goodItemDetail.skuVOList
                )
            })
        }, 400)
    }
    cancelSelectSpec() {}
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({ selectedRows: selectedRows })
        },
        getCheckboxProps: record => {
            return { defaultChecked: record.selectSpecsNum > 0 }
        }
    }
    rowSpecSelection = {
        onChange: (selectedSpecRowKeys, selectedSpecRows) => {
            this.setState({
                selectedSpecRows: selectedSpecRows
            })
        },
        getCheckboxProps:(record,) => {
            const { selectCombinedGoods } = this.props
            const target = selectCombinedGoods.find(
                item => item.skuId === record.id
            )
            return { defaultChecked: target }
        }
    }
    specColumns = [
        {
            title: '组合规格',
            dataIndex: 'spec'
        },
        {
            title: '规格条码',
            dataIndex: 'code'
        }
    ]
    showAddGoodsPop() {
        document.querySelector('body').style.overflow = 'hidden'
        this.setState({
            isShowAddGoodsPop: true,
            selectedRows:[]
        })
    }
    closeAddGoodsPop() {
        this.setState({
            isShowAddGoodsPop: false,
            selectedRows:[]
        })
        document.querySelector('body').style.overflow = 'scroll'
    }
    saveSelectRes(type) {
        this.setState({
            visible: -1
        })
        const { dispatch, itemList = [] } = this.props
        const selectSpecsList = itemList.itemList
        this.setState({
            isShowAddGoodsPop: false
        })
        const currentSelectList = this.props.selectCombinedGoods
        const len = currentSelectList.length
        currentSelectList.splice(len - 1, 1)
        if (type === 2) {
            const newGoodSpec = this.state.selectedSpecRows
            const { currentGoodId, account } = this.state
            const selectGoodObj = {
                id: currentGoodId,
                spec: newGoodSpec || [],
                account
            }
            const formatSelectSpecGoodList = Format.formatSelectSpecGoodList(
                selectGoodObj,
                currentSelectList
            )
            formatSelectSpecGoodList.forEach((item, index) => {
                currentSelectList.push(item)
            })
            dispatch(action.setSelectCombinedGoodsList(currentSelectList))
            const target = selectSpecsList.find(
                item => item.id === selectGoodObj.id
            )
            if (target) {
                const index = selectSpecsList.indexOf(target)
                selectSpecsList[index].selectSpecsNum = newGoodSpec.length
            }
            dispatch(action.setSelectGoodsSpec(selectSpecsList))
        } else {
            let list = []
            const newGoods = this.state.selectedRows || []
            for(let i = 0;i<newGoods.length;i++){
                const res = currentSelectList.filter(
                    t => t.itemId === newGoods[i].id
                )
                if(res.length>0){
                    list.push(res[0])
                    continue
                }
                const { account, name, price, currentStock, id, skuId } = newGoods[i]
                list.push({
                    itemName: name,
                    price: price,
                    currentStock: currentStock,
                    itemId: id,
                    unitName: account,
                    skuId: skuId
                })
            }
            dispatch(action.setSelectCombinedGoodsList(list))
        }
        setTimeout(() => {
            const dataSource = Format.formatCombinedDetailList(this.props.selectCombinedGoods) || []
            const defaultPrice = dataSource.length > 0 ? dataSource[dataSource.length - 1].subtotal : ''
            this.setState({
                defaultPrice: defaultPrice
            })
        }, 500)

    }
    searchItem(value) {
        const { data, dispatch } = this.props
        this.setState({
            keyword: value,
            selectedCategoryId: '',
            current: 1
        })
        this.CateSearch = false
        if (document.getElementsByClassName('ant-cascader-picker-clear')[0]) {
            document
                .getElementsByClassName('ant-cascader-picker-clear')[0]
                .click()
        }
        document.getElementById('search').value = value
        dispatch(
            action.getItemList({
                pageSize: 20,
                pageIndex: 1,
                keyword: value,
                categoryId: ''
            })
        )
    }
    onChange(value) {
        const { data, dispatch } = this.props
        document.getElementById('search').value = ''
        this.setState({
            selectedCategoryId: value[value.length - 1],
            keyword: '',
            current: 1
        })
        if (this.CateSearch) {
            dispatch(
                action.getItemList({
                    pageSize: 20,
                    pageIndex: 1,
                    keyword: '',
                    categoryId: value[value.length - 1]
                })
            )
        }
        this.CateSearch = true
    }
    render() {
        const {
            getFieldDecorator,
            itemList = [],
            CombineInfo,
            selectCombinedGoods = [],
            dispatch,
            childSpecItems = [],
            goodCategory = [],
            selectGoodsSpecList = []
        } = this.props
        const { isShowAddGoodsPop, defaultPrice, selectedRows=[] } = this.state
        const dataSource =
            Format.formatCombinedDetailList(selectCombinedGoods) || []
        const categoryList = Format.formatCatogoryList(goodCategory)
        const selectCombinedDataSource =
            selectGoodsSpecList.length === 0
                ? itemList.itemList
                : selectGoodsSpecList
        const formatCombinedSource = Format.formatCombinedSource(
            selectCombinedDataSource,
            dispatch,
            this.props,
            action
        )
        const selectLen = selectedRows.length||dataSource.length-1
        return (
            <Card title="组合明细">
                <div className={styles.combinedDetail}>
                    <div className={styles.main}>
                        <div
                            className={classnames(
                                [styles.good_combined_detail],
                                [styles.mb_10]
                            )}
                        >
                            <FormItem {...formItemLayout} label="组合商品明细">
                                <Button
                                    className={styles.addGoodsBtn}
                                    onClick={this.showAddGoodsPop.bind(this)}
                                >
                                    +添加商品
                                </Button>
                            </FormItem>
                            <CombinedGoodsDetail
                                dataSource={dataSource}
                                dispatch={dispatch}
                                childSpecItems={childSpecItems}
                                CombineInfo={CombineInfo}
                            ></CombinedGoodsDetail>

                            <div
                                className={classnames(
                                    [styles.good_name],
                                    [styles.mb_10]
                                )}
                            ></div>
                            <div
                                className={classnames(
                                    [styles.good_name],
                                    [styles.mb_10]
                                )}
                            >
                                <FormItem
                                    label="组合商品销售单价"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('combinedGoodsPrice', {
                                        rules: [
                                            {
                                                required: true,
                                                message:
                                                    '请填写组合商品销售单价'
                                            },
                                            {
                                                validator: null
                                            }
                                        ],
                                        initialValue:
                                            CombineInfo.price || defaultPrice
                                    })(
                                        <Input
                                            style={{ width: 200 }}
                                            maxLength="21"
                                        />
                                    )}
                                </FormItem>
                            </div>
                            <div
                                className={classnames(
                                    [styles.good_name],
                                    [styles.mb_10]
                                )}
                            >
                                <FormItem
                                    label="组合商品会员价"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator(
                                        'combinedGoodsMemberPrice',
                                        {
                                            initialValue:
                                                CombineInfo.memberPrice ||
                                                defaultPrice
                                        }
                                    )(
                                        <Input
                                            style={{ width: 200 }}
                                            maxLength="21"
                                        />
                                    )}
                                </FormItem>
                            </div>
                        </div>

                        {isShowAddGoodsPop && (
                            <div className={styles.combined_edit_container}>
                                <div className={styles.add_combined_goods_bg} />
                                <div className={styles.add_combined_goods_box}>
                                    <div
                                        className={
                                            styles.add_combined_goods_title
                                        }
                                    >
                                        <div>选择商品</div>
                                        <div
                                            className={styles.closeBtn}
                                            onClick={this.closeAddGoodsPop.bind(
                                                this
                                            )}
                                        />
                                    </div>
                                    <hr />
                                    <div className={styles.selectSearch}>
                                        <Cascader
                                            className={styles.cascaderId}
                                            size="large"
                                            options={categoryList.children}
                                            onChange={this.onChange.bind(this)}
                                            placeholder="全部分类"
                                            style={{ width: 100 }}
                                        />
                                        <Search
                                            id="search"
                                            className={styles.search}
                                            size="large"
                                            placeholder="商品名称/条形码"
                                            onSearch={this.searchItem.bind(
                                                this
                                            )}
                                            style={{ width: 180 }}
                                        />
                                    </div>
                                    <Table
                                        rowSelection={this.rowSelection}
                                        columns={this.columns2}
                                        dataSource={formatCombinedSource}
                                        pagination={{ pageSize: 8 }}
                                        style={{ left: 200 }}
                                        rowKey="id"
                                    />
                                    <div className={styles.saveBtnArea}>
                                        <div className={styles.sumTip}>
                                            已选择{selectLen}个商品
                                        </div>
                                        <div
                                            className={styles.itemListSaveBtn}
                                            onClick={this.saveSelectRes.bind(
                                                this,
                                                1
                                            )}
                                        >
                                            确认并保存
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        )
    }
}

export default combinedInfo
