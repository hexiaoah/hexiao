/**
 * Created by air on 2018/3/14.
 */
/**
 * Created by air on 2017/7/10.
 */
import React, {Component} from 'react'
import {Table} from 'antd'
import styles from './style.css'
import * as action from "../../action";

const columns = [
    {
        title: '序列号',
        dataIndex: 'numId',
        key: 'numId'
    },
    {
        title: '券号',
        dataIndex: 'couponId',
        key: 'couponId',
    },
    {
        title: '优惠券名称',
        dataIndex: 'couponName',
        key: 'couponName',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: '面值/折扣',
        dataIndex: 'worth',
        key: 'worth',
    },
    {
        title: '券有效期',
        dataIndex: 'indata',
        key: 'indata',
    },
    {
        title: '核销门店',
        dataIndex: 'store',
        key: 'store',
    },
    {
        title: '核销时间',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: '导出时间',
        dataIndex: 'exportTime',
        key: 'exportTime',
    },
];


class List extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    changePage(page, pageSize) {
        const {data, dispatch} = this.props
        const {search} = data
        dispatch(action.noOwnerCouponSearch({...search, pageNumber: page}))
    }

    componentWillReceiveProps(nextProps) {
    }
    render() {
        const {data} = this.props
        const pagination = {
            current: data.pageNumber,
            defaultPageSize: 10,
            pageSize: 20,
            total: data.listLeg,
            showTotal: (total) => `当前检索共有${total}条数据`,
            onChange: this.changePage.bind(this)
        };
        return (
            <div>
                <div className={styles.handleBox2}>
                    <Table
                        columns={columns}
                        dataSource={data.list}
                        bordered
                        pagination={pagination}
                        rowKey={(record) => `${record.numId}_${record.couponId}`}
                    /></div>
            </div>
        )
    }
}

export default List
