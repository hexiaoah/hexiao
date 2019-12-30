/**
 * Created by air on 2018/3/14.
 */
/**
 * Created by air on 2017/7/10.
 */
import React, {Component} from 'react'
import {Select, Input, Button, Icon} from 'antd'
import styles from './style.css'
import {message, Modal} from "antd/lib/index";
import saveAs from '../../utils/saveAs'
import * as bridge from "../../utils/bridge";
import * as action from "../../action";
import {setNoOwnerSetList} from "../../action";
import {setNoOwnerSetPageNum} from "../../action";
import {errorHandler} from "../../action";
import api from "../../api";


const Option = Select.Option


class Export extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            couponId: '',
            coupon: []
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {

    }

    submitInfo() {
        Modal.info({
            title: '导出优惠券码',
            content: (
                <div style={{margin: '0px 0 0 -40px'}}>
                    <p style={{marginTop: '20px'}}>
                        导出后，对应的优惠券会减去相应库存，导出的券码为18位，
                        需要商家自行将码转换为条形码，可支持收银机扫描枪或者云收银扫描核销。</p>
                </div>
            ),
            onOk() {
            },
            maskClosable: true,
            width: 520
        });
    }

    /**
     * 导出优惠券码
     * */
    couponPush() {
        const {data} = this.props
        const {exportCouponCodeUrl, importData} = data
        if (!this.state.couponId) {
            message.error('请先选择优惠券')
            return false
        }
        if (!this.state.number) {
            message.error('请先选择优惠券导出数量')
            return false
        }
        this.handleExport(`${exportCouponCodeUrl}?app_key=${importData.app_key}&couponId=${this.state.couponId}&num=${this.state.number}`)
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
     * 输入导出张数
     * */
    numChange(e) {
        this.setState({number: e.target.value});
    }

    /**
     * 查看操作日志
     * */
    setList(e) {
        const {data, dispatch} = this.props
        dispatch(action.isShowSetPage(true))
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
                console.log(res);
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
                this.setState({
                    number: '',
                    couponId: ''
                });
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

        return (
            <div>
                <h3 className={styles.h3}>券码导出</h3>
                <div className={styles.handleBox}>
                    <div className={styles.main_p}>
                        <span className={styles.main_title}>选择优惠券:</span>
                        <Select showSearch
                                value={that.state.couponId}
                                optionFilterProp="children"
                                allowClear={true}
                                onFocus={that.getCoupon.bind(that)}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                onSelect={that.changeCoupon.bind(that)}
                                className={styles.select}>
                            {this.state.coupon.map((val) => {
                                return <Option value={val.id} key={val.id}>{val.name}</Option>
                            })}
                        </Select>
                    </div>
                    <p className={styles.main_p}>
                        <span className={styles.main_title}>输入导出张数:</span>
                        <Input className={styles.input} type="number" onChange={that.numChange.bind(that)}
                               value={that.state.number}/>
                        <Button className={styles.btn} onClick={that.couponPush.bind(that)}>导出优惠券码</Button>
                        <Button className={styles.export_btn} onClick={that.submitInfo.bind(that)}>
                            <Icon type="question-circle-o" className={styles.hintIcon}/><span
                            style={{verticalAlign: 'middle'}}>操作说明</span>
                        </Button>
                        <Button className={styles.export_btn} onClick={that.setList.bind(that)}>查看操作记录</Button>
                    </p>
                </div>
            </div>
        )
    }
}

export default Export
