import React, {Component} from 'react'
import {Table, Pagination, Button, Modal} from 'antd'
import styles from './style.css'
import * as bridge from '../../utils/bridge'
import * as action from '../../action'

class GoodsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 1,
            columns: [
                {
                    title: '导入内容',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '导入时间',
                    dataIndex: 'date',
                    key: 'date',
                },
                {
                    title: '成功/失败件数',
                    dataIndex: 'hint',
                    key: 'hint',
                },
                {
                    title: '失败信息',
                    dataIndex: 'messageUrl',
                    key: 'messageUrl',
                    render: (text, record) => {
                        return <a href={record.messageUrl}>{record.messageUrl}</a>;
                    },
                }
            ]
        }
    }
    
    paginationChange(pageNum) {
        const t = this
        const {dispatch, data} = t.props
        this.setState({
            current: pageNum,
        });
        dispatch(action.getImportHistoryList({pageNum:pageNum}))
    }
    
    render() {
        const t = this
        const {data} = t.props
        const total = data.totalRecord
        const records = data.records
        const pageNum = data.pageNum
        const columns = this.state.columns
        return (<div className={styles.wrap}>
                <Table dataSource={records} columns={columns} pagination={false}
                       rowKey={records => records.id}
                       className={styles.specificationTable}
                />
                <div className={styles.paginationBox}>
                    <Pagination className={styles.paginationHtml} showQuickJumper current={pageNum} total={total}
                                defaultPageSize={10}
                                pageSize={10} onChange={this.paginationChange.bind(this)}/>
                    <p>共{total}条记录</p>
                </div>
            </div>
        )
    }
}

export default GoodsList
