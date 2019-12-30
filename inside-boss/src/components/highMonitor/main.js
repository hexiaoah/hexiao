/**
 * Created by air on 2017/7/31.
 */
import React, {Component} from 'react'
import styles from './style.css'
import {Divider, showSpin, Table, Pagination, Button} from 'antd'
import * as action from "../../action";

const columns = [{
    title: '日期',
    dataIndex: 'currDate',
    key: 'currDate',
}, {
    title: '交路',
    dataIndex: 'crewRoadId',
    key: 'crewRoadId',
}, {
    title: '车次',
    dataIndex: 'trainNumber',
    key: 'trainNumber',
}, {
    title: '已开店车底号',
    dataIndex: 'isAllowTrainNo',
    key: 'isAllowTrainNo'
}, {
    title: '已开店领班工号',
    dataIndex: 'userName',
    key: 'userName'
}];

class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            current: props.data.pageNumber || 1
        }
        this.nextBtn = this.nextBtn.bind(this)
        this.preBtn = this.preBtn.bind(this)
        this.firstBtn = this.firstBtn.bind(this)
        this.toPage = this.toPage.bind(this)
    }

    componentDidMount() {
        const t = this
        const {dispatch, data} = t.props
        dispatch(action.getHighMonitor(data.pageNumber))
    }

    componentWillReceiveProps(nextProps) {
        const t = this
        const {dispatch} = t.props
        if (nextProps.data.pageNumber && t.props.data.pageNumber && (nextProps.data.pageNumber !== t.props.data.pageNumber)) {
            dispatch(action.getHighMonitor(nextProps.data.pageNumber))
        }
    }

    //下一页
    nextBtn() {
        const {data} = this.props
        if(data.monListLeg<20){
            return false;
        }
        const pageNumber = Number(this.state.current) + 1
        this.toPage(pageNumber)
    }
    //上一页
    preBtn() {
        const pageNumber =this.state.current>1?( Number(this.state.current) - 1):this.state.current
        this.toPage(pageNumber)
    }
    //首页
    firstBtn() {
        if(this.state.current===1){
            return false;
        }
        this.toPage(1)
    }
    /**
     * 跳转到某页
     * @param pageNumber number 具体某页
     * */
    toPage(pageNumber){
        const {dispatch} = this.props
        this.setState({
            current: pageNumber,
        });
        dispatch(action.setPageIndex(pageNumber))
    }
    render() {
        const t = this
        const {dispatch, data} = t.props
        const {monitorList, monListLeg} = data
        const page=t.state.current;
        return (
            <div className={styles.main_wrapper}>
                <div className={styles.wrap}>
                    <Table columns={columns} pagination={false} dataSource={monitorList} bordered rowKey={monitorList => monitorList.id}/>
                    {/*{(!monitorList||monitorList.length===0)?'':(monListLeg >= 20 ? (<Button className={styles.nextBtn} onClick={this.nextBtn}>下一页</Button>) : '')}*/}
                    {(!!monitorList&&monListLeg >= 20)||page>1? (<div className={styles.pageBox}>
                        <ul className="ant-pagination" unselectable="unselectable">
                            <li title="上一页" className={page<=1?'ant-pagination-disabled ant-pagination-prev':'ant-pagination-prev'} aria-disabled="true">
                                <a className="ant-pagination-item-link" onClick={this.preBtn}></a>
                            </li><span className={page>1?styles.pageBtn:styles.page} onClick={page>=1?this.firstBtn:''}>首页</span>{page||1}<span className={styles.page}>末页</span>
                            <li title="下一页" tabIndex="0" className={monListLeg<20?'ant-pagination-disabled ant-pagination-next':'ant-pagination-next'} aria-disabled="false">
                                <a className="ant-pagination-item-link" onClick={this.nextBtn}></a>
                            </li>
                        </ul>
                    </div>):''}
                </div>
            </div>
        )
    }
}
export default Main





