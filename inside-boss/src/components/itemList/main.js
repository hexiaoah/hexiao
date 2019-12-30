import React, { Component } from 'react'
import { Cascader, Input, Table, Modal, message, Popconfirm } from 'antd'
import styles from './style.css'
import * as action from '../../action'
import * as bridge from '../../utils/bridge'
import { hashHistory } from 'react-router'

const Search = Input.Search
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
            entityType: null,
            dissolutionTip: '',
            dissolutionList: [],
            disolutedata: {}
        }
    }
    componentWillMount() {
        const { data, dispatch } = this.props
        // entityType: 0=单店 1=连锁总部 2=连锁下的门店 3=分公司 4=商圈
        const { entityType } = bridge.getInfoAsQuery()
        dispatch(action.getItemList({ pageSize: 20, pageIndex: 1 }))
        dispatch(action.getGoodCategory())
        dispatch(action.getGoodStrategy())
        if (entityType == 2) {
            dispatch(
                action.getFacadeService({
                    param: JSON.stringify({ entityType })
                })
            )
        }
        this.setState({
            entityType
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            disolutedata: nextProps.data.childGoodsList
        })
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
                            {record.hasSku && (
                                <div className={styles.hasSku}>多</div>
                            )}{' '}
                            {record.chain && (
                                <div className={styles.chain}>连锁</div>
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
            dataIndex: 'scopePrice'
        },
        {
            title: '会员价（元）',
            dataIndex: 'scopeMemberPrice'
        },
        {
            title: '结账单位',
            dataIndex: 'account'
        },
        {
            title: '库存数',
            dataIndex: 'currentStock'
        },
        {
            title: '保质期(天)',
            render: (text, record) => {
                const { data } = this.props
                const { strategy = {} } = data
                const strategyLeng = Object.keys(strategy).length > 0
                const hasStrategy =
                    strategyLeng && strategy.itemShelfLifeConfig == '1'
                const { entityType } = this.state
                // 保质期策略：itemShelfLifeConfig， 1： 有设置保质期管理策略， 2：无保质期策略
                // entityType == 2 && record.chain ：门店下发商品
                return (
                    <span>
                        {entityType == 2 && record.chain
                            ? this.issuedPreview(record, hasStrategy)
                            : this.strategyPriew(record, hasStrategy)}
                    </span>
                )
            }
        },
        {
            title: '是否为称重商品',
            dataIndex: 'isTwoAccount'
        },
        {
            title: '是否打折',
            dataIndex: 'isRatio'
        },
        {
            title: '商品介绍',
            width: 150,
            dataIndex: 'detail',
            render: (text, record) => (
                <span className={styles.detail}>
                    {' '}
                    {this.strSubstring(record.detail)}{' '}
                </span>
            )
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a
                        onClick={this.goEdit.bind(
                            this,
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
    showModal(value, type) {
        const t = this
        const { dispatch } = t.props
        let itemIdList = []
        let idList = []
        // 如果是从列表中单个删除，value传过来的是一个对象，如果批量删除，value传来的是一个id数组
        // 请求参数 id列表
        itemIdList =
            typeof value == 'object' && value.constructor === Array
                ? value
                : [value.id]
        dispatch(action.getChildGoodResult({ itemType: 0, itemIdList }))
        setTimeout(function() {
            const { disolutedata = {} } = t.state
            if (disolutedata.pass === 0) {
                t.setState({
                    dissolutionTip: disolutedata.cause,
                    dissolutionList: disolutedata.causeItemVOList || []
                })
                t.warning()
            } else if (disolutedata.pass === 1) {
                if (type === 'single') {
                    t.setState({
                        deleteTip: `删除商品后，将同步删除供应链端该商品信息！您确认要删除 ${value.name} 吗？`
                    })
                    idList.push(value.id)
                } else {
                    if (t.state.selectedRowKeys.length === 0) {
                        message.error('请先选择商品再进行删除操作')
                        return
                    }
                    t.setState({
                        deleteTip: `删除商品后，将同步删除供应链端该商品信息！您确认要删除吗？`
                    })
                    idList = value
                }
                t.setState({
                    isShowConfirmModal: true,
                    deleteValue: idList,
                    delType: type
                })
            }
        }, 200)
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
            action.deleteItem({
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
        const { selectedCategoryId } = this.state
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
            action.getItemList({
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
            action.changeCateSave({
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

    kk() {
        this.setState({
            changeCate: false,
            changeToCate: ''
        })
    }
    warning() {
        Modal.warning({
            title: <p>{this.state.dissolutionTip}</p>,
            content: (
                <div className={styles.itemList}>
                    {this.state.dissolutionList.map((item, key) => {
                        return (
                            <p key={key}>
                                <span>{item.name}</span>
                                {/* <a>查看详情</a> */}
                            </p>
                        )
                    })}
                </div>
            )
        })
    }
    render() {
        const { data, dispatch } = this.props
        let selectList = []
        let changeCategoryList = []
        if (data.goodsCategoryList.categoryList.length > 0) {
            selectList = JSON.stringify(data.goodsCategoryList.categoryList)
            selectList = selectList
                .replace(/"categoryId"/g, '"value"')
                .replace(/"categoryName"/g, '"label"')
                .replace(/"categoryList"/g, '"children"')
            selectList = JSON.parse(selectList)
            changeCategoryList = selectList.filter(
                value => value.chain === false
            )
        }
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRowKeys })
                console.log(
                    `selectedRowKeys: ${selectedRowKeys}`,
                    'selectedRows: ',
                    selectedRows
                )
            }
        }

        const pagination = {
            current: this.state.current,
            defaultPageSize: 20,
            total: data.item.totalRecord || 0,
            showTotal: total => {
                ;`Total ${total} items`
            },
            onChange: page => {
                // this.setState({ tableData: [] });
                dispatch(
                    action.getItemList({
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
                        onClick={this.exportItems.bind(this)}
                    >
                        商品信息导出
                    </div>
                    <div
                        className={styles.importButton}
                        onClick={this.goImportPage.bind(this)}
                    >
                        商品导入
                    </div>
                </div>
                <div>
                    <div className={styles.relative}>
                        <Table
                            className={styles.table}
                            pagination={pagination}
                            rowSelection={rowSelection}
                            columns={this.columns}
                            dataSource={data.item.itemList}
                            rowKey="id"
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
                <Modal
                    title="确认弹窗"
                    visible={this.state.isShowConfirmModal}
                    onOk={() => this.del()}
                    onCancel={() => this.handleCancel()}
                >
                    {this.state.deleteTip}
                </Modal>
            </div>
        )
    }
}

export default Main
