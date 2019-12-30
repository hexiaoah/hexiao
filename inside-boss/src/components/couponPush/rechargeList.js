/**
 * Created by air on 2018/3/15.
 */
import React, {Component} from 'react'
import {Button, Pagination, Icon, Popover, Modal, Input} from 'antd'
import styles from './rechargeList.css'
import * as action from '../../action'


class RechargeList extends Component {

    constructor(props) {
        super(props)
        this.changeModalValue = this.changeModalValue.bind(this);
        this.state = {
            current: 1,
            loading: false,
            funcitonId: '',
            failType: 0,
            modelValue: '',
            functionId: ''
        }
    }

    changeModalValue(e) {
        this.setState({modelValue: e.target.value});
    }

    handleCancel = () => {

        const t = this

        const {dispatch} = t.props

        const value = this.state.modelValue

        const functionId = this.state.functionId

        if (value) {
            this.setState({
                loading: true,
                functionId: ''
            });
            dispatch(action.reupload({iphone: value, functionId: functionId}))
        }

    }

    handleClose = () => {
        const t = this
        const {dispatch} = t.props
        dispatch(action.visible(false))
    }

    reupload(index) {

        const t = this

        const {dispatch, data} = t.props

        const {rechargeList} = data

        t.setState({
            failType: rechargeList[index].failType,
            loading: false,
            modelValue: '',
            functionId: rechargeList[index].functionId
        })


        if (rechargeList[index].failType === 1) {
            dispatch(action.visible(true))
        } else if (rechargeList[index].failType === 4) {

            dispatch(action.visible(true))
        } else {
            dispatch(action.reupload(rechargeList[index]))
        }
    }

    allReupload() {

        const t = this

        const {dispatch, data} = t.props

        const {rechargeList} = data

        dispatch(action.reupload(rechargeList))
    }

    paginationChange(pageNumber) {

        console.log('Page: ', pageNumber);

        const t = this

        const {dispatch, data} = t.props

        const {name} = data

        this.setState({
            current: pageNumber,
        });

        dispatch(action.setPageNumber(pageNumber, status,))

    }

    render() {

        const t = this

        const {data, dispatch} = t.props

        const {status, rechargeList, total, visible} = data

        const {current, failType} = t.state

        const {loading} = t.state

        return (

            <div className={styles.rechargeListBox}>

                {
                    status === '2' ?
                        <Button className={styles.allReupload} onClick={t.allReupload.bind(t)}>批量重发</Button> : null
                }

                <ul className={styles.rechargeListUl}>
                    <li className={styles.rechargeTitle}>
                        <p>会员</p>
                        <p>手机号码</p>
                        <p>优惠券名称</p>
                        <p>发券状态</p>
                        <p>操作</p>
                    </li>
                    {rechargeList ?
                        rechargeList.map((recharge, index) => {
                            return (
                                recharge.status === 1 ? (
                                    <li className={styles.rechargeLi} key={index}>
                                        <p>{recharge.userName}</p>
                                        <p>{recharge.iphone}</p>
                                        <p>{recharge.couponName}</p>
                                        <p>发送成功</p>
                                        <p></p>
                                    </li>
                                ) : (
                                    <li className={styles.rechargeLi} style={{background: '#fceeef'}} key={index}>
                                        <p>{recharge.userName}</p>
                                        <p>{recharge.iphone}</p>
                                        <p>{recharge.couponName}</p>


                                        <p>发送失败
                                            {
                                                recharge.failType === 1 ?
                                                    <Popover content='因手机号码错误发券失败'>
                                                        <Icon type="exclamation-circle-o"
                                                              className={styles.popoverHint}/>
                                                    </Popover> : (
                                                        recharge.failType === 2 ?
                                                            <Popover content='因网络原因发券失败'>
                                                                <Icon type="exclamation-circle-o"
                                                                      className={styles.popoverHint}/>
                                                            </Popover> : (
                                                                recharge.failType === 3 ?
                                                                    <Popover content='因其他原因发券失败'>
                                                                        <Icon type="exclamation-circle-o"
                                                                              className={styles.popoverHint}/>
                                                                    </Popover> :
                                                                    <Popover content='因查询不到该会员发券失败'>
                                                                        <Icon type="exclamation-circle-o"
                                                                              className={styles.popoverHint}/>
                                                                    </Popover>
                                                            ))
                                            }
                                        </p>
                                        <p>
                                            <Button ref="reuploadBtn" id={recharge.functionId} size="small"
                                                    onClick={t.reupload.bind(t, index)}>重发</Button>
                                        </p>
                                    </li>
                                )
                            )
                        })

                        : ''}

                </ul>
                {
                    (status !== 2) ?
                        <div className={styles.paginationBox}>
                            <Pagination className={styles.paginationHtml} showQuickJumper current={current}
                                        total={total} defaultPageSize={50}
                                        pageSize={50} onChange={this.paginationChange.bind(this)}/>
                            <p>共{total}条记录</p>
                        </div> : null
                }

                {
                    (failType === 1) ?
                        <Modal
                            visible={visible}
                            onOk={t.handleOk}
                            onCancel={t.handleClose}
                            footer={null}
                        >
                            <p className={styles.modelTitle}>编辑修改</p>
                            <p className={styles.modelWord}>手机号码填写有误，请修改后重新发券</p>
                            <p style={{margin: '30px 0 0 86px'}}>
                                <span className={styles.star}>* </span>手机号码 ：
                                <Input style={{width: '240px'}} ref="iphone" value={t.state.modelValue}
                                       onChange={this.changeModalValue} placeholder="请填写手机号码"/>
                            </p>
                            <Button style={{margin: '30px 0 0 200px'}} type="primary" loading={loading}
                                    onClick={this.handleCancel}>
                                保存并发券
                            </Button>
                        </Modal> :
                        <Modal
                            visible={visible}
                            onCancel={t.handleClose}
                            footer={null}
                        >
                            <p style={{margin: '20px 0 0 184px', fontSize: '16px'}}>查询不到该会员</p>
                            <Button style={{margin: '28px 0 0 211px'}} type="primary" onClick={this.handleClose}>
                                确定
                            </Button>
                        </Modal>
                }

            </div>
        )
    }

}

export default RechargeList
