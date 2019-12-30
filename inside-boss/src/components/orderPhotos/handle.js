/**
 * Created by air on 2017/7/10.
 */
import React, { Component } from 'react'
import { Select , Button ,Input ,DatePicker,message} from 'antd'
import styles from './style.css'
import * as action from '../../action'
import saveAs from '../../utils/saveAs'
import * as bridge from '../../utils/bridge'

const Option = Select.Option

class Handle extends Component {
    constructor(props) {

        super(props);

        this.state = {
            orderType : 1,
            endOpen: false,
            startValue: null,
            endValue: null,
            exportLock: false,
        }
    }

    componentDidMount () {
        const t =this

        const { dispatch ,params} = t.props

        // const query = bridge.getInfoAsQuery()
        //
        // const Data = InitData(params.pageType, query ,this.state.orderType)
        // dispatch(action.initVideoData(Data))
    }
    handleChange (value) {
        const t = this
        value = parseInt(value)
        const { dispatch } = t.props

        dispatch(action.changeOrderType(value))


    }

    clearFn (e, dispatch) {

        (e !== undefined) && e.preventDefault()

        window.location.reload()

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
        val = val.substr(0, val.length - 3)
        val = `${val}000`
        this.setState({
            startValue: value,
        });
    }

    onEndChange = (value) => {
        let val = new Date(value)
        val = val.valueOf()
        val = String(val)
        val = val.substr(0, val.length - 3)
        val = `${val}000`
        this.setState({
            endValue: value,
        });
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({endOpen: true})
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({endOpen: open})
    }

    submit = () => {

        const {dispatch ,data} = this.props

        const {orderType} = data

        const {startValue,endValue} = this.state

        const invoiceCode = this.refs.invoiceCode.refs.input.value

        let val1 = new Date(startValue)
        val1 = val1.valueOf()
        val1 = String(val1)
        val1 = val1.substr(0, val1.length - 3)
        val1 = `${val1}000`

        if(val1 === '000'){
            val1 = ''
        }
        let val2 = new Date(endValue)
        val2 = val2.valueOf()
        val2 = String(val2)
        val2 = val2.substr(0, val2.length - 3)
        val2 = `${val2}000`
        if(val2 === '000'){
            val2 = ''
        }
        dispatch(action.setOrderStartValue(val1))
        dispatch(action.setOrderEndValue(val2))
        dispatch(action.setInvoiceCode(invoiceCode))
        dispatch(action.getOrderList(orderType ,1,val1,val2,invoiceCode))

        this.setState({
            ifDetail: false,
        });
    }

    handleExport (url) {
        const t = this
        const {token} = bridge.getInfoAsQuery()

        t.setState({
            exportLock: true
        })

        saveAs(url, token).then(
            filename => {
                message.success('导出成功!') // 成功返回文件名
            },
            err => {
                if (err.code === 0) {

                    if (err.errorCode === '401') {
                        bridge.callParent('logout')
                        return
                    }

                    message.error(err.message || '导出失败',8)

                }

            }

        ).then(e => {
            this.setState({exportLock: false})
            // message.warning('您选择的时间范围超出一个月，导致数据过大。请缩短时间间隔分多次导出。 ' +
            //     'Selected time exceeds one month, causing large data requirement. ' +
            //     'Please narrow your time range and export with multiple requests.',10)
        })
    }

    json2url (json) {
        var url = ''
        var arr = []
        for (let i in json) {
            arr.push(i + '=' + json[i])
        }
        url = arr.join('&')
        return url
    }

    render() {

        const t = this

        const {data} = t.props

        const {startValue, endValue,endOpen} = this.state

        const {exportUrl, exportData, exportBtnText, orderType,invoiceCode} = data

        let final

        final = Object.assign({}, exportData, {
            billType : orderType ? orderType :'',
            startTime:startValue?startValue:'',
            endTime:endValue?endValue:'',
            invoiceCode:invoiceCode?invoiceCode:''
        })

        const _exportUrl = exportUrl + '?' + t.json2url(final)

        return(
            <div className={styles.handleBox}>
                <div className={styles.t1}>
                    <div className={styles.orderType}>Order type</div>

                    <Select ref="select" defaultValue="Receipt slip" style={{ width: 220 }} onChange={t.handleChange.bind(t)}>
                        <Option value="1">Receipt slip</Option>
                        <Option value="2">Void slip</Option>
                        <Option value="3">Financial Report By Terminal Slip</Option>
                        <Option value="4">Sales Statistics By Terminal Slip</Option>
                    </Select>
                    <Input size="large" placeholder="Please enter the invoice number." ref="invoiceCode"  className={styles.searchInput}/>

                    <div className={styles.line}></div>
                </div>
                <div className={styles.t2}>
                    <div style={{float:'left'}}>
                        <div className={styles.date_start}>Start time</div>
                        <DatePicker
                            disabledDate={this.disabledStartDate}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            value={startValue}
                            placeholder="Start time"
                            size='large'
                            onChange={this.onStartChange}
                            onOpenChange={this.handleStartOpenChange}
                            style={{marginRight: 40}}
                        />
                        <div className={styles.date_end}>End time</div>
                        <DatePicker
                            disabledDate={this.disabledEndDate}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            value={endValue}
                            placeholder="End time"
                            size='large'
                            onChange={this.onEndChange}
                            open={endOpen}
                            onOpenChange={this.handleEndOpenChange}
                        />
                    </div>
                    <Button type="primary" className={styles.submit} onClick={t.submit.bind(t)}>Query</Button>

                    <Button type="primary" loading={this.state.exportLock}
                            className={styles.export_btn}
                            onClick={t.handleExport.bind(t, _exportUrl)}>
                        {exportBtnText}
                    </Button>
                </div>
            </div>
        )
    }
}

export default Handle
