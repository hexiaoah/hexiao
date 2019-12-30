import React, { Component } from 'react'
import { Table, Pagination } from 'antd'
import styles from './style.css'
import * as action from '../../action'
  const columns = [
    {
        title: '车底号',
        dataIndex: 'trainNo',
        key: 'trainNo',
    },
    {
        title: '发车日期',
        dataIndex: 'currDate',
        key: 'currDate',
    },
    {
        title: '车次号',
        dataIndex: 'trainNumber',
        key: 'trainNumber',
    },
    {
        title: '始发站',
        dataIndex: 'startStation',
         key: 'startStation',
    },
    {
        title: '始发日期',
        dataIndex: 'startDay',
        key: 'startDay',
    },
    {
        title: '始发时间',
        dataIndex: 'startTime',
        key: 'startTime',
    },
    {
        title: '终点站',
        dataIndex: 'endStation',
        key: 'endStation',
    },
    {
        title: '到站日期',
        dataIndex: 'endDay',
        key: 'endDay',
    },
    {
        title: '到站时间',
        dataIndex: 'endTime',
        key: 'endTime',
    },
    {
        title: '是否过夜',
        dataIndex: 'stayOver',
        key: 'stayOver',
        render: (text, record) => {
            return record.stayOver=="1"?"是":"否";
        },
    }
]
class RouteList extends Component{
    constructor (props) {
        super(props)
    }
    paginationChange(pageNumber){
        const t =this
        const { dispatch ,data} = t.props
        this.setState({
            current: pageNumber,
        });
        dispatch(action.setCurIndex(pageNumber))
        dispatch(action.getRouteList(pageNumber))
    }
    render(){
        const t = this
        const { data } = t.props
        const total = data.routeListTotal
        const routelist = data.routeList
        const pageNumber = data.pageNumber
        return (
            <div className={styles.wrap}>
                <p className={styles.headTip}>交路信息库</p>
                <Table dataSource={routelist} columns={columns}   pagination={false}  rowKey={routelist => routelist.id} bordered/>
                <div className={styles.paginationBox}>
                <Pagination  className={styles.paginationHtml} showQuickJumper current={pageNumber} total={total} defaultPageSize={10}
                            pageSize={10}   onChange={this.paginationChange.bind(this)} />
                <p>共{total}条记录</p>
            </div>
            </div>

        )
    }
}
export default RouteList
