/**
 * Created by air on 2018/3/14.
 */
/**
 * Created by air on 2017/7/10.
 */
import React, {Component} from 'react'
import {Select, Input, Button} from 'antd'
import styles from './style.css'
import {message, Modal} from "antd/lib/index";
import * as bridge from "../../utils/bridge";
import saveAs from "../../utils/saveAs";
import {errorHandler, showSpin} from "../../action";
import api from "../../api/index";

const Option = Select.Option


class Set extends Component {
    constructor(props) {
        super(props);
        this.state = {
            couponId: '',
            start: '',
            end: '',
            coupon: []
        }
    }

    /**
     * 选择优惠券
     * */
    changeCoupon(e) {
        if (!e) {
            return false
        }
        this.setState({couponId: e});
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
     * @param type
     * @param message
     * @param key
     * */
    submitInfo(type, message, key) {
        const that = this;
        const {data} = this.props
        const {exportActiveErrorUrl, exportStopErrorUrl,importData} = data
        if (!message) {
            message = [type === 'active' ? '当前优惠券中有已核销/已过期的券，无法激活' : '当前优惠券中有已核销/已过期的券']
        }
        Modal.confirm({
            title: `${type === 'active' ? '批量激活成功' : '批量停用失败'}`,
            content: (
                <div style={{margin: '0px 0 0 -40px'}}>
                   <p style={{marginTop: '20px'}}>{message}</p>
                </div>
            ),
            onOk() {
                const url = ((type === 'active') ? exportActiveErrorUrl : exportStopErrorUrl )+
                    `?key=${key}&app_key=${importData.app_key}`
                that.handleExport(url);
                that.setState({couponId: '', start: '', end: ''});
            },
            confirmLoading: true,
            className: 'ant-confirm-info',
            iconType: 'info-circle',
            cancelText: '取消',
            okText: `${type === 'active' ? '导出激活失败结果' : '导出停用失败结果'}`,
            maskClosable: true,
            width: 520
        });
    }

    /**
     * 批量操作
     * @param type 批量操作类型 active批量激活 stop批量停用
     * */
    batchProcessing(type) {
        if (!this.state.couponId) {
            message.error('请先选择优惠券')
            return false
        }
        if (!this.state.start || !this.state.end) {
            message.error('请先选择优惠券号段')
            return false
        }
        if (type === 'active') {
            this.toActive(type)
        } else if (type === 'stop') {
            this.toStop(type)
        }
    }

    /**
     * 批量激活
     * @param type 批量操作类型 active批量激活 stop批量停用
     * */
    toActive(type) {
        const {dispatch} = this.props
        const that = this;
        api.noOwnerCouponActive({
            couponId: this.state.couponId,
            start: this.state.start,
            end: this.state.end
        }).then(
            res => {
                if (res.succeed) {
                    message.success('批量激活成功!')
                } else {
                    that.submitInfo(type, res.message, res.key);
                }
            },
            err => {
                console.log(err)
                dispatch(errorHandler(err))
            }
        )
    }

    /**
     * 批量停用
     * @param type 批量操作类型 active批量激活 stop批量停用
     * */
    toStop(type) {
        const {dispatch} = this.props
        const that = this;
        api.noOwnerCouponStop({
            couponId: this.state.couponId,
            start: this.state.start,
            end: this.state.end
        }).then(
            res => {
                if (res.succeed) {
                    message.success('批量停用成功!')
                } else {
                    that.submitInfo(type, res.message, res.key);
                }
            },
            err => {
                console.log(err)
                dispatch(errorHandler(err))
            }
        )
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
                        bridge.callParent('logout')
                        return
                    }
                    message.error(err.message || '导出失败')
                }

            }
        ).then(e => this.setState({exportLock: false}))
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

    render() {
        const that = this
        const {data, dispatch, params} = this.props
        const {coupon} = data.select
        return (
            <div>
                <h3 className={styles.h3}>券码管理</h3>
                <div className={styles.handleBox}>
                    <div className={styles.main_p}>
                        <span className={styles.main_title}>选择优惠券:</span>
                        <Select
                            showSearch
                            value={that.state.couponId}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            className={styles.select}
                            onFocus={that.getCoupon.bind(that)}
                            onSelect={that.changeCoupon.bind(that)}>
                            {this.state.coupon.map((val) => {
                                return <Option value={val.id} key={val.id}>{val.name}</Option>
                            })}
                        </Select>
                    </div>
                    <p className={styles.main_p}>
                        <span className={styles.main_title}>搜索优惠券号段:</span>
                        <Input className={styles.input2}
                               value={that.state.start}
                               onChange={that.numStartChange.bind(that)}/>
                        -
                        <Input className={styles.input2}
                               value={that.state.end}
                               onChange={that.numEndChange.bind(that)}/>

                        <Button className={styles.btn_primary} type="primary"
                                onClick={that.batchProcessing.bind(that, 'active')}>批量激活</Button>
                        <Button className={styles.set_btn}
                                onClick={that.batchProcessing.bind(that, 'stop')}>批量停用</Button>
                    </p>
                </div>
            </div>
        )
    }
}

export default Set
