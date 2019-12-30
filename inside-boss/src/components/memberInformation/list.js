import React, { Component } from 'react'
import {  Radio, Table ,Icon ,Popover} from 'antd'
import cx from 'classnames'
import styles from './list.css'
import * as action from '../../action'

const RadioGroup = Radio.Group

class ListTop extends Component {
    onChange = (e) => {
        const { dispatch } = this.props

        e && e.preventDefault()

        dispatch(action.listInitData(e.target.value))
    }

    render () {
        const t = this
        const {defaultPageSize} = t.props.data
        return (
            <div className={cx(styles.list_top, 'cf')}>
                <div className={styles.list_top_left}>
                    <div className={styles.list_top_left_icon}>导入失败列表</div>
                    <div className={styles.list_top_left_radio_wrapper}>
                        <RadioGroup onChange={this.onChange} value={defaultPageSize}>
                            <Radio value={50} style={{marginRight: 58}}>50条/页</Radio>
                            <Radio value={100} style={{marginRight: 58}}>100条/页</Radio>
                            <Radio value={300} style={{marginRight: 58}}>300条/页</Radio>
                        </RadioGroup>
                    </div>
                </div>
            </div>
        )
    }
}

class ListBody extends Component {

    constructor (props) {
        super(props)
        this.columns = [{
            title: <Icon type="exclamation-circle-o" style={{fontSize : '16px'}}/>,
            dataIndex: 'front',
            width: 50,
            className : styles.columnClassName
        },{
            title: 'exel（行）',
            dataIndex: 'lineNum',
            width: 50,
            className : styles.columnClassName
        },{
            title: '卡类型',
            dataIndex: 'cardType',
            width: 50
        },{
            title: '卡号',
            dataIndex: 'cardNumber',
            width: 50,
            className : styles.columnClassName
        }, {
            title: '卡ID',
            dataIndex: 'cardId',
            width: 50,
            className : styles.columnClassName
        },{
            title: '卡内金额',
            dataIndex: 'cardMoney',
            width: 50,
            className : styles.columnClassName
        },{
            title: '积分',
            dataIndex: 'scole',
            width: 50,
            className : styles.columnClassName
        },{
            title: '会员',
            dataIndex: 'member',
            width: 50,
            className : styles.columnClassName
        }, {
            title: '性别',
            dataIndex: 'sex',
            width: 50,
            className : styles.columnClassName
        }, {
            title: '手机',
            dataIndex: 'phone',
            width: 50,
            className : styles.columnClassName
        }, {
            title: '生日',
            dataIndex: 'birthday',
            width: 50,
            className : styles.columnClassName
        }, {
            title: '是否已使用',
            dataIndex: 'ifDone',
            width: 50,
            className : styles.columnClassName
        }, {
            title: 'appid',
            dataIndex: 'appid',
            width: 50,
            className : styles.columnClassName
        }, {
            title: 'openid',
            dataIndex: 'openid',
            width: 50,
            className : styles.columnClassName
        }]

    }

    render () {
        const t = this

        const { data } = t.props

        const { defaultPageSize } = data

        console.log(defaultPageSize)
        return (
            <div className={styles.list_body}>
                <Table scroll={{x: 825, y: 510}} pagination={{ pageSize: defaultPageSize }} bordered columns={t.columns}
                       dataSource={t.getData()}/>
            </div>
        )
    }

    getData () {
        const {rechargeBatchDetailsViewList} = this.props.data
        const list = rechargeBatchDetailsViewList


        const data = [{
                    front:<Popover content={<p className={styles.errorP}>123</p>} title="错误信息" placement="right">
                              <Icon type="exclamation-circle-o" style={{fontSize : '16px',color :'#d52632'}}/>
                          </Popover>,
                    lineNum: '23123123',
                    cardType: '23123123',
                    cardNumber: '23123123',
                    cardId: '23123123',
                    cardMoney: '23123123',
                    scole: '23123123',
                    member: '23123123',
                    sex: '23123123',
                    phone :'23123123',
                    birthday : '12312321',
                    ifDone : '是',
                    appid : '231',
                    openid :'asdasd'
            }]
            // list.forEach((m, i) => {
            //     data.push({
            //         key: i,
            //         id: m.id,
            //         lineNum: '23123123',
            //         cardType: '23123123',
            //         cardNumber: '23123123',
            //         cardId: '23123123',
            //         cardMoney: '23123123',
            //         scole: '23123123',
            //         member: '23123123',
            //         sex: '23123123',
            //         phone :'23123123',
            //         birthday : '12312321',
            //         ifDone : '是',
            //         appid : '231',
            //         openid :'asdasd'
            //     })
            // })
        return data
    }
}


class List extends Component {

    render () {
        const {dispatch, data} = this.props
        return (
            <div className={cx(styles.list_wrapper, 'cf')}>
                <ListTop dispatch={dispatch} data={data}/>
                <ListBody dispatch={dispatch} data={data}/>
            </div>
        )
    }
}

export default List
