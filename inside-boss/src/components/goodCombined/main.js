import React, { Component } from 'react'
import { Cascader, Input, Table, Modal, message, Popconfirm } from 'antd'
import styles from './style.css'
import * as action from '../../action'
import * as bridge from '../../utils/bridge'
import { hashHistory } from 'react-router'
import Cookie from '@2dfire/utils/cookie'

const Search = Input.Search;
class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRowKeys: [],
            current: 1,
            tableData: [],
            selectedCategoryId: '',
            keyword: '',
            isShowConfirmModal: false,
            deleteValue: [],
            changeCate: false,
            deleteTip: '',
            delType: '',
            isShowDetailPop: false,
            entityType: null,
            currentChooseId: '',
            pageSource:[]
        }
    }
    componentWillMount() {
        const { dispatch } = this.props
        dispatch(action.getCombinedGoodsList({ pageSize: 20, pageIndex: 1 }))
        dispatch(action.getGoodCategory())
    }
    options = []
    columns = [
        {
            title: '商品',
            key: '1',
            render: (text, record) => (
                <div className={styles.title}>
                    <img
                        className={styles.img}
                        src={
                            record.imageUrl ||
                            'https://assets.2dfire.com/frontend/eae523b1a01aba73903009489818b177.png'
                        }
                    ></img>
                    <div className={styles.ml10}>
                        <div className={styles.titleContent}>
                            {record.name}{' '}
                            {record.chain && (
                                <div className={styles.isChainIcon}>连锁</div>
                            )}
                        </div>
                        <div className={styles.titleCode}>
                            商品编码：{record.code}
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: '所属分类',
            dataIndex: 'kindMenuName'
        },
        {
            title: '单价（元）',
            dataIndex: 'price'
        },
        {
            title: '会员价（元）',
            dataIndex: 'memberPrice'
        },
        {
            title: '结账单位',
            dataIndex: 'account'
        },
        {
            title: '是否打折',
            dataIndex: 'isRatio'
        },
        {
            title: '组合明细',
            dataIndex: 'combinedDetail',
            render: (text, record) => (
                <span>
                    <a onClick={this.goToDetail.bind(this, record.id)}>
                        查看明细
                    </a>
                </span>
            )
        },
        {
            title: '商品介绍',
            width: 150,
            dataIndex: 'detail'
        },

        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a
                        onClick={this.editCombinedList.bind(
                            this,
                            'edit',
                            record.id,
                            record.chain
                        )}
                    >
                        编辑
                    </a>
                    <div className={styles.divider}></div>
                    <a onClick={this.showModal.bind(this, record, 'single')}>
                        删除
                    </a>
                </span>
            )
        }
    ]
    detailColumns = [
        {
            title: '商品名称',
            dataIndex: 'itemName'
        },
        {
            title: '商品编码',
            dataIndex: 'code'
        },
        {
            title: '规格',
            dataIndex: 'skuDesc'
        },
        {
            title: '单位',
            dataIndex: 'unitName'
        },
        {
            title: '组合数量',
            dataIndex: 'num'
        },
        {
            title: '商品单价',
            dataIndex: 'price'
        }
    ]
    goToDetail(id) {
        const { dispatch } = this.props
        this.setState({
            isShowDetailPop: true,
            currentChooseId: id,
            // pageSource:[]
        })
        dispatch(action.getCombinedGoodDetail(id))
    }

    strSubstring = (str = '') => {
        const len = str.length
        if (len > 50) return str.substring(0, 50) + '...'
        return str
    }

    CateSearch = true

    issuedPreview = (record, bloon) => {
        const { data } = this.props
        const { facadeService } = data
        // changeToSelf: 允许门店下发商品转自建
        if (facadeService.changeToSelf) {
            return (
                <span>
                    {bloon && !!Number(record.isShelfLife)
                        ? `${record.shelfLife}`
                        : '-'}
                </span>
            )
        } else {
            return (
                <span>
                    {!!record.itemShelfLifeConfig &&
                    record.itemShelfLifeConfig == '1' &&
                    !!Number(record.isShelfLife)
                        ? `${record.shelfLife}`
                        : '-'}
                </span>
            )
        }
    }
    strategyPriew = (record, bloon) => {
        // isShelfLife 1:有保质期， 0：无保质期
        return (
            <span>
                {bloon && !!Number(record.isShelfLife)
                    ? `${record.shelfLife}`
                    : '-'}
            </span>
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
                action.getCombinedGoodsList({
                    pageSize: 20,
                    pageIndex: 1,
                    keyword: '',
                    categoryId: value[value.length - 1]
                })
            )
        }
        this.CateSearch = true
    }
    showModal(value, type) {
        let idList = []
        if (type === 'single') {
            this.setState({
                deleteTip: `删除商品后，将同步删除供应链端该商品信息！您确认要删除 ${value.name} 吗？`
            })
            idList.push(value.id)
        } else {
            if (this.state.selectedRowKeys.length === 0) {
                message.error('请先选择商品再进行删除操作')
                return
            }
            this.setState({
                deleteTip: `删除商品后，将同步删除供应链端该商品信息！您确认要删除吗？`
            })
            idList = value
        }
        this.setState({
            isShowConfirmModal: true,
            deleteValue: idList,
            delType: type
        })
    }
    handleCancel() {
        this.setState({
            isShowConfirmModal: false
        })
    }
    del() {
        const { data, dispatch } = this.props
        const page = this.state.delType === 'single' ? this.state.current : 1
        dispatch(
            action.deleteCombinedGoodDetail({
                idList: this.state.deleteValue,
                pageSize: 20,
                pageIndex: page,
                keyword: this.state.keyword,
                categoryId: this.state.selectedCategoryId
            })
        )
        this.setState({
            selectedRowKeys: [],
            deleteValue: [],
            isShowConfirmModal: false,
            current: page
        })
    }
    searchItem(value) {
        const { data, dispatch } = this.props
        const {selectedCategoryId} = this.state
        this.setState({
            keyword: value,
            selectedCategoryId: '',
            current: 1
        })
        // this.CateSearch = false
        // if (document.getElementsByClassName('ant-cascader-picker-clear')[0]) {
        //     document
        //         .getElementsByClassName('ant-cascader-picker-clear')[0]
        //         .click()
        // }
        document.getElementById('search').value = value
        dispatch(
            action.getCombinedGoodsList({
                pageSize: 20,
                pageIndex: 1,
                keyword: value,
                categoryId: selectedCategoryId
            })
        )
    }
    showChangeCate(type) {
        if (this.state.selectedRowKeys.length === 0 && type !== 'cancel') {
            message.error('请先选择商品再进行换分类操作')
            return
        }
        this.setState({
            changeCate: !this.state.changeCate,
            changeToCate: ''
        })
    }
    setChangeCate(value) {
        this.setState({
            changeToCate: value[value.length - 1]
        })
    }

    changeCateSave() {
        if (this.state.selectedRowKeys.length === 0) {
            message.error('请先选择商品')
            return
        }
        if (!this.state.changeToCate) {
            message.error('请先选择分类')
            return
        }
        const { data, dispatch } = this.props
        dispatch(
            action.changeCombinedCateSave({
                idList: this.state.selectedRowKeys,
                changeCategoryId: this.state.changeToCate,
                pageSize: 20,
                pageIndex: 1,
                keyword: this.state.keyword,
                categoryId: this.state.selectedCategoryId
            })
        )
        this.setState({
            changeCate: !this.state.changeCate,
            current: 1,
            selectedRowKeys: []
        })
    }

    goEdit(id, chain) {
        hashHistory.push(`/ITEM_EDIT/item?id=${id}&chain=${chain}`)
    }
    goImportPage() {
        hashHistory.push(`/ITEM_IMPORT/item`)
    }
    goManageCate() {
        this.props._switchTab()
    }

    exportItems() {
        const { data, dispatch } = this.props
        dispatch(action.exportItems({ menu_ids: this.state.selectedRowKeys }))
    }
    editCombinedList(type, id, chain) {
        if (type === 'edit') {
            hashHistory.push(
                `/COMBINED_GOODS_EDIT/item?id=${id}&chain=${chain}`
            )
        } else {
            hashHistory.push(`/COMBINED_GOODS_EDIT/item`)
        }
    }
    kk() {
        this.setState({
            changeCate: false,
            changeToCate: ''
        })
    }
    closeDetailPop() {
        this.setState({
            isShowDetailPop: false
        })
    }
    render() {
        const { data = {}, dispatch } = this.props
        const { goodCombinedList = [], goodCombinedDetail = {} } = data
        const totalDetailPage = goodCombinedDetail.childItems?goodCombinedDetail.childItems.length:0
        const {pageSource} = this.state
        const childItems = pageSource.length>0?pageSource:goodCombinedDetail.childItems||[]
        let selectList = []
        let changeCategoryList = [1, 23]
        if (data.goodsCategoryList.categoryList.length > 0){
            selectList = JSON.stringify(data.goodsCategoryList.categoryList)
            selectList = selectList.replace(/"categoryId"/g, '"value"').replace(/"categoryName"/g, '"label"').replace(/"categoryList"/g, '"children"')
            selectList = JSON.parse(selectList)
            changeCategoryList = selectList.filter(value => value.chain === false)
        }
        //  const {
        //     getFieldDecorator,
        //     getFieldValue,
        //     setFieldsValue
        // } = self.props.form
        const pagination = {
            current: this.state.current,
            defaultPageSize: 20,
            total: goodCombinedList.totalRecord || 0,
            showTotal: total => {
                ;`Total ${total} items`
            },
            onChange: page => {
                // this.setState({ tableData: [] });
                dispatch(
                    action.getCombinedGoodsList({
                        pageSize: 20,
                        pageIndex: page,
                        keyword: this.state.keyword,
                        categoryId: this.state.selectedCategoryId
                    })
                )
                this.setState({
                    current: page
                })
            }
        }
        const detailPagination = {
            current: this.state.current,
            defaultPageSize: 5,
            total: totalDetailPage ,
            showTotal: total => {
                ;`Total ${total} items`
            },
            onChange: page => {
                const { goodCombinedDetail = {} } = this.props.data
                const detailList = goodCombinedDetail.childItems || []
                const afterSliceList = detailList.slice(
                    (page - 1) * 5,
                    page * 5 - 1
                )
                this.setState({
                    pageSource: afterSliceList,
                    current:page
                })
            }
        }
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRowKeys })
            }
        }
        const { isShowDetailPop } = this.state
        return (
            <div className={styles.baseInfo_wrapper}>
                <div>
                    <Cascader
                        className={styles.cascaderId}
                        size="large"
                        options={selectList}
                        onChange={this.onChange.bind(this)}
                        placeholder="全部分类"
                    />
                    <Search
                        id="search"
                        className={styles.search}
                        size="large"
                        placeholder="商品名称/条形码"
                        onSearch={this.searchItem.bind(this)}
                        style={{ width: 200 }}
                    />
                    <div
                        className={styles.exportButton}
                        onClick={this.editCombinedList.bind(this, 'add')}
                    >
                        新增组合商品
                    </div>
                </div>
                <div>
                    <div className={styles.relative}>
                        <Table
                            className={styles.table}
                            columns={this.columns}
                            rowSelection={rowSelection}
                            rowKey="id"
                            pagination={pagination}
                            dataSource={goodCombinedList.itemList}
                        />
                        <div className={styles.batchActionsPosition}>
                            <div
                                className={styles.batchActions}
                                onClick={this.showChangeCate.bind(this)}
                            >
                                换分类
                            </div>
                            {this.state.changeCate && (
                                <div>
                                    <div
                                        className={styles.cover}
                                        onClick={this.kk.bind(this)}
                                    ></div>
                                    <div className={styles.changeCateWrapper}>
                                        <div className={styles.changeCateTitle}>
                                            <span>换分类</span>
                                            <span
                                                className={styles.goCate}
                                                onClick={this.goManageCate.bind(
                                                    this
                                                )}
                                            >
                                                管理分类
                                            </span>
                                        </div>
                                        <Cascader
                                            size="large"
                                            options={changeCategoryList}
                                            onChange={this.setChangeCate.bind(
                                                this
                                            )}
                                            placeholder="请选择分类"
                                        />
                                        <div className={styles.action}>
                                            <Popconfirm
                                                placement="topLeft"
                                                title={
                                                    '是否更换选中商品的分类？'
                                                }
                                                onConfirm={this.changeCateSave.bind(
                                                    this
                                                )}
                                                okText="确定"
                                                cancelText="取消"
                                            >
                                                <span
                                                    className={
                                                        styles.changeCateSave
                                                    }
                                                >
                                                    保存
                                                </span>
                                            </Popconfirm>
                                            <span
                                                className={
                                                    styles.changeCateCancel
                                                }
                                                onClick={this.showChangeCate.bind(
                                                    this,
                                                    'cancel'
                                                )}
                                            >
                                                取消
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div
                                className={styles.batchActions}
                                onClick={this.showModal.bind(
                                    this,
                                    this.state.selectedRowKeys
                                )}
                            >
                                删除
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
                <Modal
                    title="确认弹窗"
                    visible={this.state.isShowConfirmModal}
                    onOk={() => this.del()}
                    onCancel={() => this.handleCancel()}
                >
                    {this.state.deleteTip}
                </Modal>
                {isShowDetailPop && (
                    <div className={styles.good_combined_add_cate_container}>
                        <div
                            className={styles.add_cate_bg}
                        />
                        <div className={styles.add_cate_box}>
                            <div className={styles.add_cate_title}>
                                商品组合明细
                            </div>
                            <Table
                                className={styles.table}
                                columns={this.detailColumns}
                                // rowSelection={rowDetailSelection}
                                rowKey="id"
                                pagination={detailPagination}
                                dataSource={childItems}
                            />
                            <div
                                className={styles.closeBtn}
                                onClick={this.closeDetailPop.bind(this)}
                            >
                                关闭弹窗
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Main
