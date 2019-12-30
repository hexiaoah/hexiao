import React, { Component } from 'react'
import { Form, Input, Button, Modal } from 'antd'
import cx from 'classnames'
import styles from './layer.css'
import * as action from '../../action'
const FormItem = Form.Item

const getParams = () => ({
    startTime: sessionStorage.getItem('startTime'),
    endTime: sessionStorage.getItem('endTime'),
    rechargeStatusList: sessionStorage.getItem('rechargeStatusList'),
    pageSize: sessionStorage.getItem('pageSize'),
    pageIndex: sessionStorage.getItem('pageIndex'),
    selectedList: sessionStorage.getItem('selectedList')
})

class Layer extends Component {

    handleSubmit = (e) => {
        e && e.preventDefault()
        const {dispatch, data, form} = this.props
        const params = getParams()
        const {rechargeBatchId} = data
        const {startTime, endTime, rechargeStatusList, pageSize, pageIndex} = params
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const currentItem = sessionStorage.getItem('currentItem')
                const rechargeBatchDetailsVo = Object.assign({}, values, JSON.parse(currentItem))
                dispatch(action.btnLock({name: 'saveModifyBtn', bool: true}))
                dispatch(action.modifyInfo(rechargeBatchId, startTime, endTime, rechargeStatusList, pageSize, pageIndex, rechargeBatchDetailsVo, form))
            }
        })
    }

    handleCancel = () => {
        const {dispatch, form} = this.props
        dispatch(action.showEditLayer(false))
        form.resetFields()
    }

    checkNum = (rule, value, callback) => {
        const regular = /^\w{6,30}$/
        if (!!regular.test(value)) {
            callback()
        } else {
            if (!value) {
                callback()
            } else {
                callback('请填写正确的卡号！')
            }
        }
    }

    checkMoney = (rule, value, callback) => {
        const regular = /^[1-9]\d{0,7}$/
        if (!!regular.test(value)) {
            callback()
        } else {
            if (!value) {
                callback()
            } else {
                callback('请填写正确的金额！')
            }
        }
    }
    checkMoneyPrecent = (rule, value, callback) => {
        const regular = /^[1-9]\d{0,7}$/
        if (!!regular.test(value)) {
            callback()
        } else {
            if (!value) {
                callback()
            } else {
                callback('请填写正确的金额！')
            }
        }
    }

    checkComment = (rule, value, callback) => {
        const regular = /^[\S]{0,6}$/
        if (!!regular.test(value) || value === undefined) {
            callback()
        } else {
            callback('备注过长')
        }
    }

    render () {
        const t = this
        const {
            getFieldDecorator
        } = t.props.form

        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 8
                }
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 14
                }
            },
        }

        const {data} = t.props
        const {showEditLayer, btnLocker, layerDefaultvalues} = data
        const {comment, cardCode, rechargeAmount,rechargeAmountPresent} = layerDefaultvalues
        const bool = (btnLocker && btnLocker.name === 'saveModifyBtn') ? btnLocker.bool : false
        return (
            <Modal
                visible={showEditLayer}
                onCancel={t.handleCancel}
                footer={null}
            >
                <div className={styles.layer_title}>修改编辑</div>
                <Form className={cx(styles.form_wrapper)} onSubmit={t.handleSubmit}>
                    <FormItem {...formItemLayout} label="备注" hasFeedback>
                        {
                            getFieldDecorator('comment', {
                                rules: [{
                                    required: false,
                                    validator: t.checkComment
                                }],
                                initialValue: comment
                            })(<Input placeholder="请输入卡备注"/>)
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="卡号" hasFeedback>
                        {
                            getFieldDecorator('cardCode', {
                                rules: [{
                                    required: true,
                                    message: '请输入您的卡号！'
                                }, {
                                    validator: t.checkNum
                                }],
                                initialValue: cardCode
                            })(<Input placeholder="请输入卡号"/>)
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="充值金额(本金)" hasFeedback>
                        {
                            getFieldDecorator('rechargeAmount', {
                                rules: [{
                                    required: true,
                                    message: '请输入充值金额（本金）！'
                                }, {
                                    validator: t.checkMoney
                                }],
                                initialValue: rechargeAmount
                            })(<Input placeholder="请输入充值金额（本金）"/>)
                        }
                    </FormItem>
                  <FormItem {...formItemLayout} label="充值金额（赠送金）" hasFeedback>
                    {
                      getFieldDecorator('rechargeAmountPresent', {
                        rules: [{
                          required: true,
                          message: '请输入充值金额（赠送金）！'
                        }, {
                          validator: t.checkMoneyPrecent
                        }],
                        initialValue: rechargeAmountPresent
                      })(<Input placeholder="请输入充值金额（赠送金）"/>)
                    }
                  </FormItem>
                    <FormItem className={cx(styles.btn_wrapper)}>
                        <Button className={cx(styles.btn)} htmlType="submit" loading={bool}>保存修改</Button>
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(Layer)




