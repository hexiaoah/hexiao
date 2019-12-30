import React, { Component } from 'react'
import { message, Button, Modal, Spin, Select, Row, Col, Input } from 'antd'
import Bill from '../customBillDetail/content'
import CreateAlert from './createAlert'
const Option = Select.Option
import styles from './css/main.css'
import { Link, hashHistory } from 'react-router'
import cls from 'classnames'
import { data } from '../customBillDetail/data'
import apiNetwork from '../../api/networkApi'
import { errorHandler } from '../../action'
import * as action from '../../action'
export default class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tmplActiveIndex: '',
            tmplActiveCode: '',
            tmplActiveId: '',
            visible: false,
            createVisible: false,
            createBillName: '', //模板名称
            createBillWidth: 80 //模板宽度
        }
    }
    /**
     * 添加自定义模板
     * @param id 当前模板id
     * */
    addTemplate(id) {
        const { dispatch, params, data } = this.props
        const { typeTmplList } = data
        if (typeTmplList.length >= 5) {
            message.error('自定义模板最多只能添加5张')
            return false
        }
        this.setState({
            createVisible: true
        })
    }

    tmplPreview(data) {
        this.setState({
            visible: true
        })
    }
    /**
     * 中间模板选择
     * @code
     * */
    tmplListClick(index, code, id) {
        console.log(index, code, id)
        this.setState({
            tmplActiveIndex: index,
            tmplActiveCode: code,
            tmplActiveId: id
        })
    }

    showModal = () => {
        this.setState({
            visible: true
        })
    }

    handleOk = e => {
        this.setState({
            visible: false
        })
    }

    handleCancel = e => {
        this.setState({
            visible: false
        })
    }
  
    createHandleCancel() {
        this.setState({
            createVisible: false
        })
    }
    /**
     * 删除模板
     * @param id 模板id
     * */
    delTemplate(id) {
        const { dispatch, params, data } = this.props
        const { importData } = data
        const typeActiveCode=this.state.tmplActiveCode
        Modal.confirm({
            title: '提示',
            content: '是否确认删除此模版，删除后不可恢复',
            onOk() {
                apiNetwork
                    .delTmpl({
                        entityId: importData.entityId,
                        tmplId: id
                    })
                    .then(
                        res => {
                            if (res.data) {
                                dispatch(
                                    action.getTypeTmplList({
                                        tmplCode: typeActiveCode,
                                        entityId: importData.entityId
                                    })
                                )
                            }
                        },
                        err => dispatch(errorHandler(err))
                    )
            },
            onCancel() {
                console.log('Cancel')
            }
        })
    }
    /**
     * 使用此模版
     * @param id 模板id
     * */
    useTemplate(id) {
        const { dispatch, params, data } = this.props
        const { importData, typeActiveCode } = data
        apiNetwork
            .useTmpl({
                entityId: importData.entityId,
                tmplId: id
            })
            .then(
                res => {
                    if (res.data) {
                        message.success('使用成功')
                        dispatch(
                            action.getTypeTmplList({
                                tmplCode: this.state.tmplActiveCode,
                                entityId: importData.entityId
                            })
                        )
                    }
                },
                err => dispatch(errorHandler(err))
            )
    }
    //阻止时间冒泡
    stopClick(e) {
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
    }
    //隐藏遮罩层
    closeMask() {
        this.setState({
            tmplActiveIndex: '',
            tmplActiveCode: '',
            tmplActiveId: ''
        })
    }
    render() {
        const { dispatch, params, data } = this.props
        // console.log(data)
        const { typeTmplList, entityType ,importData} = data
        return (
            <div>
                <ul>
                    {typeTmplList &&
                        typeTmplList.map((val, index) => {
                            return (
                                <li key={val.id} className={styles.bill_list_wrapper}>
                                    <div className={styles.main_list_title}>
                                        {val.name}
                                    </div>
                                    <div className={cls(
                                            styles.bill,
                                            val.id === this.state.tmplActiveId ? styles.bill_active : ''
                                        )}>
                                        <div
                                            onClick={this.tmplListClick.bind(this, index, val.tmplCode, val.id)}
                                            className={styles.center_bill_wrapper}>
                                            {/*连锁不显示使用中*/}
                                            {val.using && entityType!= 2?<div className={styles.use_icon}>使用中</div>:''}
                                            {/*{val.using?<div className={styles.use_icon}>使用中</div>:''}*/}
                                            <Bill data={val} type="SHOW"/>
                                        </div>
                                        <div
                                            className={styles.bill_mask}
                                            onClick={this.closeMask.bind(this)}
                                        >
                                            <div className={styles.bill_mask_center}
                                                onClick={this.stopClick}>
                                                {(() => {
                                                    if (!val.using && entityType !== '5' && entityType !== '2') {
                                                        return (
                                                            <Button className={styles.bill_edit_btn}

                                                                onClick={this.useTemplate.bind(this, val.id)}>
                                                                使用此模版
                                                            </Button>
                                                        )
                                                    }
                                                })()}
                                                <Button className={styles.bill_edit_btn}
                                                    onClick={this.tmplPreview.bind(this, val)}>
                                                    预览
                                                </Button>
                                                <Button className={styles.bill_edit_btn}
                                                        onClick={this.addTemplate.bind(this,val, entityType)}>
                                                    基于此添加
                                                </Button>

                                                {(() => {
                                                    if (!val.systemDef) {
                                                        return (
                                                            <Link to={`/CUSTOM_BILL/detail/main/${val.id
                                                            }?entityType=${entityType}&width=${val.width}`}>
                                                                <Button className={styles.bill_edit_btn}>
                                                                    编辑
                                                                </Button>
                                                            </Link>
                                                        )
                                                    }
                                                })()}
                                                {(() => {
                                                    if (entityType === '2') {
                                                        return (
                                                            <Link to={`/CUSTOM_BILL/store/main/${val.id}`}>
                                                                <Button className={styles.bill_edit_btn}>
                                                                    选择使用门店
                                                                </Button>
                                                            </Link>
                                                        )
                                                    }
                                                })()}
                                                {(() => {
                                                    if (!val.systemDef) {
                                                        return (
                                                            <Button className={styles.bill_edit_btn}
                                                                onClick={this.delTemplate.bind(this, val.id)}>
                                                                删除
                                                            </Button>
                                                        )
                                                    }
                                                })()}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                </ul>
                <Modal
                    title=""
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    className={styles.modal_wrapper}
                    footer={null}
                    bodyStyle={{
                        minHeight:'300px',
                        maxHeight: '640px',
                        overflowY: 'auto',
                        background: '#fff',
                        zIndex: 9,
                        padding: 0
                    }}
                >
                    <Bill
                        type="SHOW"
                        data={
                            typeTmplList && this.state.tmplActiveIndex !== ''
                                ? typeTmplList[this.state.tmplActiveIndex]
                                : ''
                        }
                    />
                </Modal>
                {typeTmplList &&!isNaN(this.state.tmplActiveIndex) &&typeTmplList[this.state.tmplActiveIndex]?
                    <CreateAlert
                        data={
                            Object.assign({},
                            {tmpl:typeTmplList[this.state.tmplActiveIndex]},
                            {visible:this.state.createVisible,
                            type:'CREATE',
                                importData:importData,
                                entityType: entityType
                            })
                        }
                        createHandleCancel={this.createHandleCancel.bind(this)}
                        dispatch={dispatch}
                />:''}
            </div>
        )
    }
}
