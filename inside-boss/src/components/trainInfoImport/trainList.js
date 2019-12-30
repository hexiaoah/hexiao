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
        title: '车次号',
        dataIndex: 'trainNumber',
        key: 'trainNumber',
    },
    {
        title: '当前日期',
        dataIndex: 'currDate',
        key: 'currDate',
    },
    {
        title: '车次编码',
        dataIndex: 'trainCode',
         key: 'trainCode',
    },
    {
        title: '站序',
        dataIndex: 'stationNum',
        key: 'stationNum',
    },
    {
        title: '站名',
        dataIndex: 'stationName',
        key: 'stationName',
    },
    {
        title: '到站时间',
        dataIndex: 'endTime',
        key: 'endTime',
    },
    {
        title: '停留时间',
        dataIndex: 'stayTime',
        key: 'stayTime',
    },
    {
        title: '开车时间',
        dataIndex: 'startTime',
        key: 'startTime',
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
        dispatch(action.setCurNum(pageNumber))
        dispatch(action.getTrainList(pageNumber))
    }
    render(){
        const t = this
        const { data } = t.props
        const total = data.trainListTotal
        const trainlist = data.trainList
        const pageNumber = data.pageNumber
        return (
            <div className={styles.wrap}>
                <p className={styles.headTip}>车次时刻信息库</p>
                <Table dataSource={trainlist} columns={columns}   pagination={false} rowKey={trainlist => trainlist.id} bordered />
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
