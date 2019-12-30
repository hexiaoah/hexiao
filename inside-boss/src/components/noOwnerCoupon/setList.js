/**
 * Created by air on 2018/3/14.
 */
/**
 * Created by air on 2017/7/10.
 */
import React, {Component} from 'react'
import {Table, Icon} from 'antd'
import styles from './style.css'
import * as action from "../../action";

const columns = [
    {
        title: '操作时间',
        dataIndex: 'time',
        key: 'time'
    },
    {
        title: '操作对象（券）',
        dataIndex: 'coupon',
        key: 'coupon',
    },
    {
        title: '操作人',
        dataIndex: 'setUser',
        key: 'setUser',
    },
    {
        title: '操作类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '操作成功张数',
        dataIndex: 'number',
        key: 'number',
    },
];


class setList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.changePage(1)
    }

    changePage(page, pageSize) {
        const {data, dispatch} = this.props
        dispatch(action.noOwnerSetList({ pageNumber: page}))
    }
    back() {
        const {data, dispatch} = this.props
        dispatch(action.isShowSetPage(false))
    }

    componentWillReceiveProps(nextProps) {}
    //
    nextBtn() {
        const {data} = this.props
        if(data.setList.length<20){
            return false;
        }
        const pageNumber = Number( data.setPageNumber) + 1
        this.changePage(pageNumber)
    }
    //上一页
    preBtn() {
        const {data} = this.props
        if(data.setPageNumber<=1){
            return false
        }
        const pageNumber = data.setPageNumber>1?( Number( data.setPageNumber) - 1): data.setPageNumber
        this.changePage(pageNumber)
    }
    //首页
    firstBtn() {
        const {data} = this.props
        if( data.setPageNumber===1){
            return false;
        }
        this.changePage(1)
    }
    render() {
        const {data} = this.props
        
        const pagination = {
            current: data.setPageNumber,
            defaultPageSize: 20,
            pageSize: 20,
            total: data.setListLeg,
            onChange: this.changePage.bind(this)
        };
        return (
            <div>
                <div className={styles.handleBox2}>
                    <h3 className={styles.setListTitle}>
                        <span style={{cursor:'pointer'}} onClick={this.back.bind(this)}><Icon type="left-circle" className={styles.setListBack}/>返回 </span>
                        / 操作日志
                    </h3>
                    <Table
                        columns={columns}
                        dataSource={data.setList}
                        bordered
                        pagination={false}
                        rowKey={(record) => `${record.id}`}
                    />
                        {(!!data.setList&&data.setList.length >= 20)||data.setPageNumber>1? (<div className={styles.pageBox}>
                            <ul className="ant-pagination" unselectable="unselectable">
                                <li title="上一页" className={data.setPageNumber<=1?'ant-pagination-disabled ant-pagination-prev':'ant-pagination-prev'} aria-disabled="true">
                                    <a className="ant-pagination-item-link" onClick={this.preBtn.bind(this)}></a>
                                </li><span className={data.setPageNumber>1?styles.pageBtn:styles.page} onClick={data.setPageNumber>=1?this.firstBtn.bind(this):''}>首页</span>{data.setPageNumber||1}<span className={styles.page}>末页</span>
                                <li title="下一页" tabIndex="0" className={data.setList.length<20?'ant-pagination-disabled ant-pagination-next':'ant-pagination-next'} aria-disabled="false">
                                    <a className="ant-pagination-item-link" onClick={this.nextBtn.bind(this)}></a>
                                </li>
                            </ul>
                        </div>):''}
                </div>
            </div>
        )
    }
}

export default setList
