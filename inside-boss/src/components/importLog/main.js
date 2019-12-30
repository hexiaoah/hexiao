/**
 * Created by air on 2017/7/31.
 */
import React, {Component} from 'react'
// import cx from 'classnames'
import styles from './style.css'
import {Table, Pagination, Modal} from 'antd'

import * as action from '../../action'
import {setPageNumber} from "../../action/index";


const table_state = {
    pagination: false,
    rowKey:"id"

}

const pagination_state = {
    pageSize: 15,
    defaultCurrent: 1,
}

// const showFailResult = (logId) => {
//     console.log(this)
//     const {dispatch} = this.props;
//     dispatch(action.getImportLogDetail(logId, 1, 15));
//
//     Modal.info({
//         title: '导入失败',
//         onOk: () => {
//
//         },
//
//         content:
//             <div>
//                 <p>商品导入失败，请按下方信息进行修改</p>
//             </div>
//     })
// }
const ModalColumns = [
    {
        title: 'sheet名称',
        dataIndex: 'sheetName',
        key: 'sheetName',
        width: '161px'
    }, {
        title: '错误行数',
        dataIndex: 'sortCode',
        key: 'sortCode',
        width: '161px',
        render: (text, record, index) => (
            <span>
                {
                    record.columnIndex ? <span>第{record.columnIndex}行</span> : <span>-</span>
                }
                </span>

        )
    }
    , {
        title: '错误原因',
        dataIndex: 'logMessage',
        key: 'logMessage',
        width: '161px'
    }]

class Main extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        showModal: false,
        logId: '',
        listNo: 1,
        detailNo: 1
    }

    handleCancel = () => {
        this.setState({
            showModal: false
        })
    }

    showFailResult = (logId) => {
        console.log(this)
        const {dispatch, data} = this.props;
        dispatch(action.getImportLogDetail(logId, 1, 15));

        this.setState({
            showModal: true,
            logId: logId,
            detailNo: 1
        })
        // const
        //
        //
        //     Modal.info({
        //         title: '导入失败',
        //         onOk: () => {
        //
        //         },
        //
        //         content:
        //             <div>
        //
        //             </div>
        //
        // })
    }
// {/*<div>*/}
// {/*<Table {...table_state} columns={this.columns} dataSource={bizLogDetailList} bordered/>*/}
// {/*<Pagination className={styles.paginationBar} {...pagination_state} total={totalCount} onChange={this.changePage}/>*/}
// {/*</div>*/}

    columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id'
        }, {
            title: '操作时间',
            dataIndex: 'logTime',
            key: 'logTime'
        },
        {
            title: '事件',
            dataIndex: 'event',
            key: 'event',
            render: (text, record, index) => (
                <span>
               {record.event}
                    {
                        record.status == 2 ? <a className={styles.showError} onClick={e => {
                            this.showFailResult(record.id)
                        }}>查看失败原因</a> : ''
                    }

            </span>
            )
        }, {
            title: '操作人',
            dataIndex: 'operateName',
            key: 'operateName'
        }];

    changePage = (pageIndex, pageSize) => {
        const t = this;
        const {dispatch, data} = t.props;
        console.log(t, pageIndex, pageSize);
        dispatch(action.getImportLogByPage(data, pageIndex, pageSize));

        this.setState({
            listNo: pageIndex
        })
    }
    changePageDetail = (pageIndex, pageSize) => {
        const t = this;
        const {dispatch} = t.props;
        console.log(pageIndex, pageSize);
        dispatch(action.getImportLogDetail(this.state.logId, pageIndex, pageSize));
        this.setState({
            detailNo: pageIndex
        })
    }


    render() {

        const t = this
        const {dispatch, data} = t.props
        const {detail} = data;
        const {bizLogList, totalCount} = data;

        return (
            <div className={styles.main_wrapper}>
                <div className={styles.top_line}>
                    <div className={styles.selectedList}>
                        <Table {...table_state} columns={this.columns} dataSource={bizLogList} bordered/>
                        <Pagination className={styles.paginationBar} {...pagination_state} total={totalCount}
                                    onChange={this.changePage} current={this.state.listNo}/>
                    </div>
                </div>
                {this.state.showModal ?
                    <Modal
                        title="导入失败"
                        visible={this.state.showModal}
                        onCancel={this.handleCancel}
                        footer={null}
                        width="660px"
                    >
                        <p className={styles.tipText}>商品导入失败，请按照下方提示信息进行修改</p>

                        <Table {...table_state} size="small" columns={ModalColumns} dataSource={detail.bizLogDetailList}
                               bordered/>

                        < Pagination className={styles.paginationBar} {...pagination_state} total={detail.totalCount}
                                     current={this.state.detailNo} onChange={this.changePageDetail}/>
                    </Modal> :
                    ''
                }
            </div>
        )
    }
}

export default Main





