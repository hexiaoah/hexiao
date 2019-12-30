import { Table, Input, Icon, Button, Popconfirm, Modal } from 'antd'
import React, { Component } from 'react'
import s from './combinedDetailTable.css'
import * as action from '../../action'
import Format from './format'
class EditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: false
    }
    handleChange = e => {
        const value = e.target.value
        this.setState({ value })
    }
    check = () => {
        this.setState({ editable: false })
        if (this.props.onChange) {
            this.props.onChange(this.state.value)
        }
    }
    edit = () => {
        this.setState({ editable: true })
    }
    render() {
        const { value, editable } = this.state
        return (
            <div className="editable-cell">
                {editable ? (
                    <div >
                        <Input
                            value={value}
                            onChange={this.handleChange}
                            onPressEnter={this.check}
                        />
                        <Icon
                            type="check"
                            className="editable-cell-icon-check"
                            onClick={this.check}
                        />
                    </div>
                ) : (
                    <div style={{width:'200px',height:'20px'}}>
                        {value || ' '}
                        <div
                            onClick={this.edit}
                            style={{ width: '100%', height: '100%' }}
                        ></div>
                    </div>
                )}
            </div>
        )
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showDelModal: false
        }
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'itemName'
            },
            {
                title: '规格',
                dataIndex: 'skuDesc'
            },
            {
                title: '单位',
                dataIndex: 'unitName'
            },

            {
                title: '组合数量',
                dataIndex: 'num',
                render: (text, record) => (
                    <div>
                        {record.flag !== 1 && (
                            <Input
                                style={{ width: '100px', border: '0' }}
                                defaultValue={record.num}
                                onBlur={this.onCellChange.bind(this, record)}
                            ></Input>
                        )}
                        {record.flag === 1 && <span>{record.num}</span>}
                    </div>
                )
            },
            {
                title: '单价',
                dataIndex: 'price'
            },
            {
                title: '小计',
                dataIndex: 'subtotal',
            },
            {
                title: '库存',
                dataIndex: 'currentStock'
            },

            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <a onClick={this.showDelModal.bind(this, record)}>删除</a>
                )
            }
        ]
    }
    childItems = []
    openNumInput(){

    }
    onCellChange(record,e){
        const value = parseInt(e.target.value)
        const {dataSource=[]} = this.props
        const target = dataSource.find(item => item.itemId === record.itemId )
        if (target) {
            const index = dataSource.indexOf(target)
            dataSource[index].num=value
            dataSource[index].subtotal = value * target.price
            const { dispatch } = this.props
            dispatch(action.setSelectCombinedGoodsList(dataSource))
        }
    }
    onDelete = key => {
        const dataSource = [...this.state.dataSource]
        this.setState({
            dataSource: dataSource.filter(item => item.key !== key)
        })
    }
    cancelDelSpecGood() {
        this.setState({
            showDelModal: false
        })
    }
    showDelModal(record) {
        this.setState({
            showDelModal: true,
            willDelGood: record
        })
    }
    delSpecGood() {
        const { willDelGood } = this.state
        const { dispatch, dataSource = [] } = this.props
        const result = dataSource.findIndex(v => {
            return v.skuId == willDelGood.skuId
        })
        const len = dataSource.length
        dataSource.splice(result, 1)
        dataSource.splice(len - 1, 1)
        dispatch(action.setSelectCombinedGoodsList(dataSource))
        this.setState({
            showDelModal: false
        })
    }
    render() {
        const { dataSource = [] } = this.props
        const formatCombinedDetailSource = Format.formatCombinedDetailSource(
            dataSource
        )
        const { showDelModal } = this.state
        const columns = this.columns
        return (
            <div className={s.combinedGoodsDetailTable}>
                <Table
                    bordered
                    dataSource={formatCombinedDetailSource}
                    columns={columns}
                />
                <Modal
                    title="确认弹窗"
                    visible={showDelModal}
                    onOk={() => this.delSpecGood()}
                    onCancel={() => this.cancelDelSpecGood()}
                >
                    确定要删除吗?
                </Modal>
            </div>
        )
    }
}


export default EditableTable
