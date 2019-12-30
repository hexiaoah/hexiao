import React, { Component } from 'react'
import { message, Button, Modal, Spin, Select, Row, Col, Input } from 'antd'
import Bill from '../customBillDetail/content'
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
            createBillName:this.props.data.type=== 'CREATE'?'':this.props.data.tmpl.name, //模板名称
            createBillWidth: 80 //模板宽度
        }
    }
    
    /**
     * 创建模板弹出 模板名称修改
     * */
    createBillNameChange(e) {
        this.setState({
            createBillName: e.target.value
        })
    }
    /**
     * 创建模板弹出 宽度选择
     * */
    createBillWidthChange(e) {
        this.setState({
            createBillWidth: e
        })
    }
    
    /**
     * 创建模板弹出 确定
     * */
    createHandleOk() {
        if (!this.state.createBillName) {
            message.error('请先输入模板名称')
            return false
        }
        const { dispatch, params, data } = this.props
        const { entityType ,type,importData,tmpl} = data
        console.log('output 1111ccc',this.props, 'entityType', entityType);
        apiNetwork
            .createPrintTmpl({
                createTmplBo: JSON.stringify({
                    sourceId:tmpl.id,
                    name: this.state.createBillName,
                    width: this.state.createBillWidth,
                    entityId:importData.entityId,
                    sourceEntityId:tmpl.entityId
                })
            })
            .then(
                res => {
                    console.log(res)
                    hashHistory.push(
                        `/CUSTOM_BILL/detail/main/${
                            res.data
                            }?entityType=${entityType}&width=${
                            this.state.createBillWidth
                            }`
                    )
                },
                err => dispatch(errorHandler(err))
            )
            .then()
    }
    /**
     * 修改模板弹出 确定
     * */
    editHandleOk=() =>{
        if (!this.state.createBillName) {
            message.error('请先输入模板名称')
            return false
        }
        const { dispatch, params, data } = this.props
        const { entityType,importData ,tmpl} = data
      console.log('output t',tmpl);
        apiNetwork
            .editTmplName({
                tmplBasicBo: JSON.stringify({
                    id:tmpl.id ,
                    name: this.state.createBillName,
                    entityId:importData.entityId
                })
            })
            .then(
                res => {
                    if(res){
                        message.success('修改成功')
                        this.props.createHandleCancel(this.state.createBillName)
                    }
                },
                err => dispatch(errorHandler(err))
            )
    }
    render() {
        const { dispatch, params, data } = this.props
        const { tmpl, visible,type } = data
        return (
            <div>
                <Modal
                    title={type==='CREATE'?'添加单据模板':'修改单据名称'}
                    visible={visible}
                    onOk={type==='CREATE'?this.createHandleOk.bind(this):this.editHandleOk.bind(this)}
                    onCancel={this.props.createHandleCancel.bind(this,null)}
                    bodyStyle={{
                        textAlign: 'center'
                    }}
                
                >
                    <div className={styles.add_alert_p}>
                        <span className={styles.add_alert_name}>
                            <i
                                style={{
                                    color: 'red',
                                    fontSize: '20px',
                                    verticalAlign: 'middle'
                                }}
                            >
                                *
                            </i>
                            模板名称：
                        </span>
                        <Input
                            className={styles.add_alert_form}
                            value={this.state.createBillName}
                            defaultValue={type==='CREATE'?this.state.createBillName:tmpl.name}
                            onChange={this.createBillNameChange.bind(this)}
                        />
                    </div>
                    <div className={styles.add_alert_p}>
                        <span className={styles.add_alert_name}>
                            打印纸宽度：
                        </span>
                        <Select
                            defaultValue={tmpl.width.toString()||'80'}
                            className={styles.add_alert_form}
                            onChange={this.createBillWidthChange.bind(this)}
                            disabled={type==='EDIT'}
                        >
                            <Option value="80" disabled={!(tmpl.systemDef||tmpl.width==80)
                            }>80mm</Option>
                            <Option value="58" disabled={!(tmpl.systemDef||tmpl.width==58)
                            }>58mm</Option>
                        </Select>
                    </div>
                </Modal>
            </div>
        )
    }
}
