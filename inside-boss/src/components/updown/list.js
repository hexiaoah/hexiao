import React, {Component} from 'react'
import {Button, Radio, Pagination, Table, Popconfirm, Tooltip, Icon, message} from 'antd'
import cx from 'classnames'
import styles from './list.css'
import * as action from '../../action'

const RadioGroup = Radio.Group

const getParams = () => ({
  startTime: sessionStorage.getItem('startTime'),
  endTime: sessionStorage.getItem('endTime'),
  rechargeStatusList: sessionStorage.getItem('rechargeStatusList'),
  pageSize: sessionStorage.getItem('pageSize'),
  pageIndex: sessionStorage.getItem('pageIndex'),
  selectedList: sessionStorage.getItem('selectedList')
})

class ListTop extends Component {

  onChange = (e) => {
    e && e.preventDefault()
    sessionStorage.setItem('pageSize', e.target.value)
    const {dispatch, data} = this.props
    const {rechargeBatchId} = data
    const params = getParams()
    const {startTime, endTime, rechargeStatusList, pageSize} = params
    const pageIndex = 1
    dispatch(action.fetchRechargeList({
      rechargeBatchId,
      startTime,
      endTime,
      rechargeStatusList,
      pageSize,
      pageIndex
    }))
  }
  operate = (e, tag) => {
    e && e.preventDefault()
    const {dispatch, data} = this.props
    const {rechargeBatchId} = data
    const params = getParams()
    const {startTime, endTime, rechargeStatusList, pageSize, pageIndex, selectedList} = params
    const rechargeBatchDetailsVoList = JSON.parse(selectedList)
    const len = rechargeBatchDetailsVoList.length || 0
    if (len === 0) {
      message.warn('没有选择任何选项！')
    } else {
      if (tag === 'recharge') {
        dispatch(action.rechargeMultiple({
          rechargeBatchId,
          startTime,
          endTime,
          rechargeStatusList,
          pageSize,
          pageIndex,
          rechargeBatchDetailsVoList
        }))
      }
      if (tag === 'delete') {
        dispatch(action.deleteMultiple(rechargeBatchId, startTime, endTime, rechargeStatusList, pageSize, 1, rechargeBatchDetailsVoList))
      }
      if (tag === 'refund') {
        dispatch(action.refund({
          rechargeBatchId,
          startTime,
          endTime,
          rechargeStatusList,
          pageSize,
          pageIndex,
          rechargeBatchDetailsVoList
        }))
      }
    }
  }

  render() {
    const t = this
    const {defaultPageSize, selectedCounter} = t.props.data
    return (
      <div className={cx(styles.list_top, 'cf')}>
        <div className={styles.list_top_left}>
          <div className={styles.list_top_left_icon}>充值列表</div>
          <div className={styles.list_top_left_count}>{`已选${selectedCounter}条`}</div>
          <div className={styles.list_top_left_radio_wrapper}>
            <RadioGroup onChange={this.onChange} value={defaultPageSize}>
              <Radio value={50} style={{marginRight: 58}}>50条/页</Radio>
              <Radio value={100} style={{marginRight: 58}}>100条/页</Radio>
              <Radio value={300} style={{marginRight: 58}}>300条/页</Radio>
            </RadioGroup>
          </div>
        </div>
        <div className={styles.list_top_right}>
          <Popconfirm title={`是否确定对选中的${selectedCounter}条数据进行充值?`}
                      onConfirm={e => {
                        t.operate(e, 'recharge')
                      }}>
            <Button>批量充值</Button>
          </Popconfirm>
          <Popconfirm title={`是否确定对选中的${selectedCounter}条数据进行删除?`} onConfirm={e => {
            t.operate(e, 'delete')
          }}>
            <Button>批量删除</Button>
          </Popconfirm>
          <Popconfirm title={`是否确定对选中的${selectedCounter}条数据进行红冲?`} onConfirm={e => {
            t.operate(e, 'refund')
          }}>
            <Button>批量红冲</Button>
          </Popconfirm>
        </div>
      </div>
    )
  }
}

class ListBody extends Component {

  constructor(props) {
    super(props)
    this.columns = [{
      title: '卡备注',
      dataIndex: 'remark',
      key: "remark",
      width: '10%',
      align: 'center'
    }, {
      title: '卡号',
      dataIndex: 'cardNumber',
      width: '10%',
      align: 'center'
    }, {
      title: '充值金额(本金)',
      dataIndex: 'money',
      align: 'center',
      width: '10%',
    }, {
      title: '充值金额(赠送金)',
      dataIndex: 'money_present',
      width: '15%',
      align: 'center'
    }, {
      title: '充值状态',
      dataIndex: 'status',
      width: '10%',
      align: 'center'
    }, {
      title: '操作时间',
      dataIndex: 'time',
      width: '20%',
      align: 'center'
    }, {
      title: '操作',
      dataIndex: 'operation',
      // width: 260,
      align: 'center',
      render: (text, record, index) => {
        const dataSource = this.getData()
        if (dataSource.length > 0) {
          return (
            (record.type === 0 || record.type === 2) ? (
              <div>
                <Button className={cx(styles.edit_button)}
                        onClick={e => this.edit(e, record)}>编辑</Button>
                <Popconfirm title="是否确认删除此条数据?" onConfirm={() => this.onDelete(record, index)}>
                  <Button>删除</Button>
                </Popconfirm>
              </div>
            ) : null
          )
        } else {
          return null
        }
      },
    }]

  }

  edit = (e, record) => {
    e && e.preventDefault()
    const {dispatch} = this.props
    const currentItem = {
      id: record.id,
      rechargeStatus: record.type,
      failMsg: record.failMsg,
    }
    const item = JSON.stringify(currentItem)
    sessionStorage.setItem('currentItem', item)
    dispatch(action.showEditLayer(true))
    dispatch(action.setLayerDefaultValues({
      comment: record.remark,
      cardCode: record.cardNumber,
      rechargeAmount: record.money,
      rechargeAmountPresent: record.money_present
    }))
  }

  onSelectChange = (selectedRowKeys) => {
    const {dispatch, data} = this.props
    const {rechargeBatchDetailsViewList} = data
    const list = rechargeBatchDetailsViewList
    const selectedList = []

    list.forEach((m, i) => {
      selectedRowKeys.forEach((v) => {
        if (i === v) selectedList.push(m)
      })
    })

    sessionStorage.setItem('selectedList', JSON.stringify(selectedList))
    const oList = sessionStorage.getItem('selectedList')
    const len = JSON.parse(oList).length
    dispatch(action.setSelectedCounter(len))
    dispatch(action.setSelectedRowKeys(selectedRowKeys))
  }

  getData() {
    const {rechargeBatchDetailsViewList} = this.props.data
    const list = rechargeBatchDetailsViewList
    const getStatus = (n, msg) => {
      switch (n) {
        case 0:
          return '未充值'
        case 1:
          return (
            <div>
              {
                (() => {
                  return msg ? <Tooltip placement="topLeft" title={msg}>
                    <Icon type="exclamation-circle" style={{marginRight: 4}}/>
                  </Tooltip> : null
                })()
              }
              <span>充值成功</span>
            </div>
          )
        case 2:
          return (
            <div>
              {
                (() => {
                  return msg ? <Tooltip placement="topLeft" title={msg}>
                    <Icon type="exclamation-circle" style={{marginRight: 4}}/>
                  </Tooltip> : null
                })()
              }
              <span>充值失败</span>
            </div>
          )
        case 3:
          return '已红冲'
        default:
          return ''
      }

    }
    const data = []
    list.forEach((m, i) => {
      data.push({
        key: i,
        id: m.id,
        remark: m.comment,
        cardNumber: m.cardCode,
        money: m.rechargeAmount,
        money_present: m.rechargeAmountPresent,
        status: getStatus(m.rechargeStatus, m.failMsg),
        failMsg: m.failMsg,
        type: m.rechargeStatus,
        time: m.opTimeStr
      })
    })
    console.log(data)
    return data
  }

  onDelete(record, i) {
    const id = record.id
    const {dispatch, data} = this.props
    const {rechargeBatchId} = data
    const params = getParams()
    const {startTime, endTime, rechargeStatusList, pageSize} = params
    dispatch(action.deleteSingle(rechargeBatchId, startTime, endTime, rechargeStatusList, pageSize, 1, id))

  }

  render() {
    const t = this
    const {selectedRowKeys} = t.props.data
    const rowSelection = {
      selectedRowKeys,
      onChange: t.onSelectChange
    }
    return (
      <div className={styles.list_body}>
        <Table scroll={{x: false, y: 510}} pagination={false} rowSelection={rowSelection} columns={t.columns}
               dataSource={t.getData()}/>
      </div>
    )
  }
}

class ListBottom extends Component {
  onChange = (page) => {
    sessionStorage.setItem('pageIndex', page)
    const {dispatch, data} = this.props
    const {rechargeBatchId} = data
    const params = getParams()
    const {startTime, endTime, rechargeStatusList, pageSize, pageIndex} = params
    dispatch(action.fetchRechargeList({
      rechargeBatchId,
      startTime,
      endTime,
      rechargeStatusList,
      pageSize,
      pageIndex
    }))
  }

  render() {
    const t = this
    const {totalCount, defaultPageSize, currentPage} = t.props.data
    return (
      <div className={styles.list_bottom}>
        <Pagination showQuickJumper showTotal={totalCount => `共${totalCount}条记录`} pageSize={defaultPageSize}
                    onChange={t.onChange} current={currentPage} total={totalCount}
                    className={cx(styles.pagination)}/>
      </div>
    )
  }
}

class List extends Component {
  render() {
    const {dispatch, data} = this.props
    return (
      <div className={cx(styles.list_wrapper, 'cf')}>
        <ListTop dispatch={dispatch} data={data}/>
        <ListBody dispatch={dispatch} data={data}/>
        <ListBottom dispatch={dispatch} data={data}/>
      </div>
    )
  }
}

export default List
