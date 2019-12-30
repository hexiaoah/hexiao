import React, { Component } from 'react'
import { DatePicker, Checkbox, Button, Message } from 'antd'
import cx from 'classnames'
import styles from './filter.css'
import * as action from '../../action'
const CheckboxGroup = Checkbox.Group

class DateRange extends Component {
    state = {
        endOpen: false
    }

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue
        if (!startValue || !endValue) {
            return false
        }
        return startValue.valueOf() > endValue.valueOf()
    }
  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf()
  }

    onStartChange = (value) => {
        let val = new Date(value)
        val = val.valueOf()
        val = String(val)
        // console.log(val);
        val = val.substr(0, val.length - 3)
        val = `${val}000`
        // console.log(val);
        const {dispatch} = this.props
        sessionStorage.setItem('startTime', val)
        dispatch(action.setStartValue(value))
    }

    onEndChange = (value) => {
        let val = new Date(value)
        val = val.valueOf()
        val = String(val)
        // console.log(val);
        val = val.substr(0, val.length - 3)
        val = `${val}000`
        // console.log(val);
        const {dispatch} = this.props
        sessionStorage.setItem('endTime', val)
        dispatch(action.setEndValue(value))
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({endOpen: true})
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({endOpen: open})
    }

    render () {
        const {data} = this.props
        const {endOpen} = this.state
        const {startValue, endValue} = data
        return (
            <div className="cf">
                <div className={styles.date_start}>开始时间</div>
                <DatePicker
                    disabledDate={this.disabledStartDate}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    value={startValue}
                    placeholder="请选择开始时间"
                    size='large'
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                    style={{marginRight: 150}}
                />
                <div className={styles.date_end}>结束时间</div>
                <DatePicker
                    disabledDate={this.disabledEndDate}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    value={endValue}
                    placeholder="请选择结束时间"
                    size='large'
                    onChange={this.onEndChange}
                    open={endOpen}
                    onOpenChange={this.handleEndOpenChange}
                />
            </div>
        )
    }
}

class Status extends Component {

    plainOptions () {
        const {preRechargeCount, sucRechargeCount, faiRechargeCount, cancelRechargeCount} = this.props.data
        return [
            `未充值(${preRechargeCount})`,
            `充值成功(${sucRechargeCount})`,
            `充值失败(${faiRechargeCount})`,
            `已红冲(${cancelRechargeCount})`
        ]
    }

    onChange = (checkedValues) => {
        let final = {}
        checkedValues.forEach((m, i) => {
            let str = m.substring(0, 3)
            switch (str) {
                case '未充值':
                    final.never = '0'
                    break
                case '充值成':
                    final.success = '1'
                    break
                case '充值失':
                    final.fail = '2'
                    break
                case '已红冲':
                    final.refund = '3'
                    break
                default:
                    return
            }
        })

        let arr = []
        for (let key in final) {
            arr.push(final[key])
        }
        const params = arr.length > 0 ? arr.join(',') : ''
        sessionStorage.setItem('rechargeStatusList', params)

        const {dispatch} = this.props
        dispatch(action.setStatus(checkedValues))
    }

    render () {
        const t = this
        const {data} = t.props
        const {statusList} = data
        return (
            <div className={styles.status_wrapper}>
                <p className={styles.status_text}>充值状态</p>
                <div className={styles.status_checkbox}>
                    <CheckboxGroup options={t.plainOptions()} onChange={t.onChange} value={statusList}/>
                </div>
            </div>
        )
    }
}

class FilterButton extends Component {
    render () {
        const {data, dispatch, onSearch} = this.props
        const {btnLocker} = data
        const bool = (btnLocker && btnLocker.name === 'searchBtn') ? btnLocker.bool : false
        return <Button type="primary" className={cx(styles.primaryButton)} loading={bool} onClick={e => {
            e.preventDefault()
            onSearch(data, dispatch)
        }}>查询</Button>

    }
}

class Filter extends Component {

    onSearch (data, dispatch) {
        dispatch(action.btnLock({name: 'searchBtn', bool: true}))
        const {rechargeBatchId} = data
        if (!rechargeBatchId) {
            Message.warning('请选择有效文件')
            setTimeout(() => {
                dispatch(action.btnLock({name: 'search', bool: false}))
            }, 2000)
        } else {
            const startTime = sessionStorage.getItem('startTime')
            const endTime = sessionStorage.getItem('endTime')
            const rechargeStatusList = sessionStorage.getItem('rechargeStatusList')
            const pageSize = 50
            const pageIndex = 1
            const tag = 'fromSearchBtn'
            dispatch(action.fetchRechargeList({
                rechargeBatchId,
                startTime,
                endTime,
                rechargeStatusList,
                pageSize,
                pageIndex,
                tag
            }))
        }

    }

    render () {
        const {data, dispatch} = this.props
        return (
            <div className={styles.filter_wrapper}>
                <DateRange data={data} dispatch={dispatch}/>
                <Status data={data} dispatch={dispatch}/>
                <FilterButton data={data} dispatch={dispatch} onSearch={this.onSearch}/>
            </div>
        )
    }
}

export default Filter
