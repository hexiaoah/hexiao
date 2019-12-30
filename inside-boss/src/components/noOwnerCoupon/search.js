/**
 * Created by air on 2018/3/14.
 */
/**
 * Created by air on 2017/7/10.
 */
import React, {Component} from 'react'
import {Select, Input, Button, Popover, Icon, DatePicker, Table} from 'antd'
const { RangePicker } = DatePicker;
import styles from './style.css'
import {message, Modal} from "antd/lib/index";
import saveAs from '../../utils/saveAs'
import * as bridge from "../../utils/bridge";
import * as action from "../../action";
import {setNoOwnerCouponPageNum} from "../../action";
import api from "../../api";
import {errorHandler} from "../../action";

const Option = Select.Option


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            couponId: '',
            start: '',
            end: '',
            store: '',
            status: '',
            // =============
            nowTimestamp: Date.parse(new Date()),
            timeStart: null,
            timeEnd: null,
            timeStartTimestamp: null,
            timeEndTimestamp: null,
            coupon: [],
            searchTimeType: 'CANCEL_TIME',
            timeTypeSelect:[{
                type: 'CANCEL_TIME',
                name: '核销时间'
            }, {
            type: 'EXPORT_TIME',
                name: '导出时间'
        }]
        }
    }


    /**
     * 选择优惠券
     * */
    changeCoupon(type, e) {
        if (!e) {
            return false
        }
        const data = {};
        data[type] = e;
        this.setState(data);
    }

    /**
     * 输入优惠券起始号段
     * */
    numStartChange(e) {
        this.setState({start: e.target.value});
    }

    /**
     * 输入优惠券起始号段
     * */
    numEndChange(e) {
        this.setState({end: e.target.value});
    }

    /**
     * 查询时间类型选择
     * */
    changeTimeType(type,e) {
        this.setState({searchTimeType: e});
    }

    /**
     * 时间选择
     * @param type timeStart开始时间，timeEnd结束时间
     * @param date 时间
     * @param dateString 时间string格式
     * */
    timeChange(type, date, dateString) {
        if(date.length>=2){
            date=[ new Date(date[0]._d.getFullYear(),date[0]._d.getMonth(),date[0]._d.getDate(),0,0,0),
                new Date(date[1]._d.getFullYear(),date[1]._d.getMonth(),date[1]._d.getDate(),23,59,59)];
        }else {
            date=[null,null]
        }
        const datas = {};
        datas['timeStart'] =date[0];
        datas[`timeStartTimestamp`] =date[0]? Date.parse(date[0])/1000:null;
        datas['timeEnd'] = date[1];
        datas[`timeEndTimestamp`] =date[1]?  Date.parse(date[1])/1000:null;
        this.setState(datas);
    }
    /**
     * 报表查询
     * */
    statementSearch() {
        if (!this.state.couponId) {
            message.error('请先选择优惠券')
            return false
        }
        const {data, dispatch} = this.props
        const {couponId, start, end, store, status, timeStart, timeEnd,searchTimeType} = this.state
        dispatch(action.setSearchParam({
            couponId,
            startNum: start,
            endNum: end,
            store,
            couponStatus: status,
            timeStart: Date.parse(timeStart)/1000,
            timeEnd: Date.parse(timeEnd)/1000,
            searchTimeType
        }));
        dispatch(action.noOwnerCouponSearch(
            {
                couponId,
                startNum: start,
                endNum: end,
                store,
                couponStatus: status,
                timeStart: Date.parse(timeStart)/1000,
                timeEnd: Date.parse(timeEnd)/1000,
                searchTimeType,
                pageNumber: 1
            }
        ))
    }

    /**
     *导出报表
     * */
    exportStatement() {
        const state = this.state
        if (!state.couponId) {
            message.error('请先选择优惠券')
            return false
        }
        const {data} = this.props
        const {exportStatementUrl, importData} = data
        this.handleExport(exportStatementUrl +
            `?app_key=${importData.app_key}&couponId=${state.couponId}&startNum=${state.start}&endNum=${state.end}&store=${state.store}&couponStatus=${
                state.status}&timeStart=${Date.parse(state.timeStart)/1000 || ''}&timeEnd=${Date.parse(state.timeEnd)/1000 || ''}&searchTimeType=${state.searchTimeType || ''}`)
    }

    /**
     * 获取优惠券
     * */
    getCoupon(e) {
        const {data, dispatch} = this.props
        api.noOwnerGetCoupon({
            type: 'ALL'
        }).then(
            res => {
                this.setState({coupon: res});
            },
            err => {
                dispatch(errorHandler(err))
            }
        ).then(e => {
        })
    }

    handleExport(url) {
        const t = this
        const {token} = bridge.getInfoAsQuery()

        t.setState({
            exportLock: true
        })

        const {isRecharge, rechargeBatchId} = this.props.data

        if (!!isRecharge && !rechargeBatchId) {
            message.warn('没有选择有效的文件！')
            setTimeout(() => {
                t.setState({
                    exportLock: false
                })
            }, 2000)
            return
        }

        saveAs(url, token).then(
            filename => {
                message.success('导出成功!')
            }, // 成功返回文件名
            err => {
                if (err.code === 0) {
                    if (err.errorCode === '401') {
                        // bridge.callParent('logout')
                        return
                    }
                    message.error(err.message || '导出失败')
                }

            }
        ).then(e => this.setState({exportLock: false}))
    }

    render() {
        const that = this
        const {data} = this.props
        const {coupon, status, store} = data.select
        return (
            <div>
                <div className={styles.handleBox}>
                    <div className={styles.main_p}>
                        <div className={styles.block}>
                            <span className={styles.main_title}>选择优惠券:</span>
                            <Select
                                showSearch
                                value={that.state.couponId}
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                className={styles.st_select1}
                                onFocus={that.getCoupon.bind(that)}
                                onSelect={that.changeCoupon.bind(that, 'couponId')}>
                                {this.state.coupon.map((val) => {
                                    return <Option value={val.id} key={val.id}>{val.name}</Option>
                                })}
                            </Select>
                        </div>
                        <div className={styles.block}>
                            <span className={styles.main_title2}>优惠券序列号:</span>
                            <Input className={styles.input2}
                                   value={that.state.start}
                                   onChange={that.numStartChange.bind(that)}/>
                            -
                            <Input className={styles.input2}
                                   value={that.state.end}
                                   onChange={that.numEndChange.bind(that)}/>

                        </div>
                        <div className={styles.block}>
                            <span className={styles.main_title2}>核销门店:</span>
                            <Select className={styles.st_select}
                                    showSearch
                                    value={that.state.store}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={that.changeCoupon.bind(that, 'store')}>
                                {store.map((val) => {
                                    return <Option value={val.id} key={val.id}>{val.name}</Option>
                                })}
                            </Select>
                        </div>
                    </div>
                    <div className={styles.main_p}>
                        <span className={styles.main_title}>优惠券状态:</span>

                        <Select className={styles.st_select}
                                showSearch
                                value={that.state.status}
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                onChange={that.changeCoupon.bind(that, 'status')}>
                            {status.map((val) => {
                                return <Option value={val.id.toString()} key={val.id}>{val.name}</Option>
                            })}
                        </Select>

                        <div className={styles.block}>
                            <Select className={styles.select_title}
                                    value={that.state.searchTimeType}
                                    optionFilterProp="children"
                                    onChange={that.changeTimeType.bind(that, 'timeType')}
                             >
                                {that.state.timeTypeSelect.map((val) => {
                                    return <Option value={val.type} key={val.type}>{val.name}</Option>
                                })}
                            </Select> <span className={styles.split}>:</span>

                            {/*<span className={styles.main_title2}>核销时间:</span>*/}
    
                            <RangePicker
                                format="YYYY-MM-DD"
                                placeholder={['开始时间', '结束时间']}
                                onChange={that.timeChange.bind(this,null)}
                                disabledDate={(currentDate) => Date.parse(currentDate) > that.state.nowTimestamp + 86400}
                            />
                            
                            {/*<DatePicker value={that.state.timeStart}*/}
                                        {/*onChange={that.timeChange.bind(this, 'timeStart')}*/}
                                        {/*disabledDate={(currentDate) => Date.parse(currentDate) > that.state.nowTimestamp + 86400}*/}
                                        {/*className={styles.date}*/}
                            {/*/>*/}
                            {/*-*/}
                            {/*<DatePicker value={that.state.timeEnd}*/}
                                        {/*className={styles.date}*/}
                                        {/*onChange={that.timeChange.bind(this, 'timeEnd')}*/}
                                        {/*disabledDate={(currentDate) => {*/}
                                            {/*return Date.parse(currentDate) >= that.state.nowTimestamp + 86400 || Date.parse(currentDate) <= that.state.timeStartTimestamp*/}
                                        {/*}}*/}
                            {/*/>*/}

                        </div>

                        <Button className={styles.btn_primary} type="primary"
                                onClick={that.statementSearch.bind(that)}>查询</Button>
                        <Button className={styles.btn_primary2} type="primary"
                                onClick={that.exportStatement.bind(that)}>导出报表</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search
