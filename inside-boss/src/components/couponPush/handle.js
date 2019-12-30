/**
 * Created by air on 2018/3/14.
 */
/**
 * Created by air on 2017/7/10.
 */
import React, {Component} from 'react'
import {Select, Button, Icon, Modal, message, Radio, Progress} from 'antd'
import styles from './style.css'
import FileUpload from 'react-fileupload'
import BatchSelector from './select'
import * as action from '../../action'
import * as bridge from '../../utils/bridge'
import cx from 'classnames'
import InitData from './init'

const Option = Select.Option
const RadioGroup = Radio.Group;
let timer

class Handle extends Component {
    constructor(props) {

        super(props);

        this.state = {
            previewText: '请上传excel文件',
            importLock: false,
            exportLock: false,
            visible: false,
            couponId: '',
            couponNum: 1,
            importProgress: 0,
            progressTitle: '正在努力加载，请稍等...',
            processId: '',
            status: this.props.status || null,
            statusData: [
                {label: '发券成功', value: '1'},
                {label: '发券失败', value: '2'}
            ]

        }
    }

    componentDidMount() {
        const query = bridge.getInfoAsQuery()

        const {dispatch, params} = this.props

        const {couponId, couponNum} = this.state

        const data = InitData(params.pageType, query, couponId, couponNum)

        dispatch(action.getCouponType())

        dispatch(action.initCouponData(data))

    }

    componentWillReceiveProps(nextProps) {
        if (this.state.status !== nextProps.data.status) {
            this.setState({
                status: nextProps.data.status
            })
        }
    }

    setOptions() {

        const t = this

        const {dispatch, data} = t.props

        const {importUrl, importData, isRecharge} = data

        const query = bridge.getInfoAsQuery()

        const {token} = query

        return {
            baseUrl: importUrl || '',

            param: importData || {},

            fileFieldName: 'couponFile',

            dataType: 'json',

            wrapperDisplay: 'inline-block',

            multiple: false,

            accept: '*/*',

            chooseAndUpload: false,

            paramAddToField: importData,

            withCredentials: false,

            requestHeaders: {
                'X-Token': token
            },

            chooseFile: function (files) {

                var name = (typeof files === 'string') ? files : files[0].name

                if (/\.(xls)$/.test(name) || /\.(xlsx)$/.test(name)) {

                    if (files[0] && files[0].size < 1024 * 1024 * 200) {

                        t.setState({
                            previewText: name,
                            processId: Date.parse(new Date()).toString()
                        }, () => {
                            const query = bridge.getInfoAsQuery()

                            const {params} = t.props

                            const {couponId, couponNum, processId} = t.state

                            const data = InitData(params.pageType, query, couponId, couponNum, processId)

                            dispatch(action.initCouponData(data))
                        })
                    } else {

                        message.info('文件太大，无法上传！')
                        if (!isRecharge) {
                            setTimeout(function () {
                                t.clearFn(undefined, dispatch)
                            }, 1500)
                        }
                        t.setState({
                            previewText: '请上传excel文件'
                        })

                    }

                } else {

                    message.info('仅允许上传格式为.xls或者.xlsx的文件！')
                    if (!isRecharge) {
                        setTimeout(function () {
                            t.clearFn(undefined, dispatch)
                        }, 1500)
                    }
                    t.setState({
                        previewText: '请上传excel文件'
                    })
                }

            },

            beforeUpload: function (files, mill) {

                sessionStorage.setItem('progressNum', '0')
                if (!files || files.length <= 0) {

                    if (t.state.previewText === '请上传excel文件') {
                        dispatch(action.globalMessageError('请先选择合适的文件！'))

                        return false
                    } else {
                        dispatch(action.globalMessageError('选择文件已取消，请重新选择文件'))

                        setTimeout(function () {
                            t.clearFn(undefined, dispatch)
                        }, 1500)

                        return false
                    }

                } else {
                    //此块逻辑可以省略，留着做为双重保险
                    var name = (typeof files === 'string') ? files : files[0].name

                    if (/\.(xls)$/.test(name) || /\.(xlsx)$/.test(name)) {

                        if (files[0] && files[0].size < 1024 * 1024 * 200) {

                            files[0].mill = mill

                            if (importData.couponId) {

                                return true
                            } else {

                                message.info('请选择优惠券类型！')

                                setTimeout(function () {
                                    t.clearFn(undefined, dispatch)
                                }, 1500)

                                return false
                            }

                        } else {

                            message.info('文件太大，无法上传！')
                            if (!isRecharge) {
                                setTimeout(function () {
                                    t.clearFn(undefined, dispatch)
                                }, 1500)
                            }
                            t.setState({
                                importLock: false,
                                previewText: '请上传excel文件'
                            })
                            return false

                        }

                    } else {

                        message.info('仅允许上传格式为.xls或者.xlsx的文件！')
                        if (!isRecharge) {
                            setTimeout(function () {
                                t.clearFn(undefined, dispatch)
                            }, 1500)
                        }
                        t.setState({
                            importLock: false,
                            previewText: '请上传excel文件'
                        })
                        return false

                    }

                }
            },

            doUpload: function (files, mill) {

                console.log('you just uploaded', typeof files === 'string' ? files : files[0]);

                timer = setInterval(() => {

                    t.setTimer()

                }, 1000)


            },

            uploading: function (progress) {

                let progressNum

                setTimeout(() => {
                    progressNum = sessionStorage.getItem('progressNum')

                    let p

                    if (progressNum && progressNum != '0') {
                        p = progressNum
                    } else {
                        p = '0'
                    }
                    console.log(progressNum)
                    console.log('loading...', p + '%')
                    t.setState({
                        importLock: true,
                        visible: true
                    }, () => {
                        if (parseInt(p) >= 100) {
                            t.setState({
                                progressTitle: '发券完成'
                            }, () => {
                                clearInterval(timer)
                            })
                        }
                        t.setState({
                            importProgress: parseInt(p)
                        })

                    })
                }, 1200)


            },

            uploadSuccess: function (resp) {

                let code = resp.code

                const {dispatch} = t.props

                setTimeout(() => {

                    const progressNum = sessionStorage.getItem('progressNum')

                    if (code === 1) {

                        if (progressNum === '100') {

                            const {failNum, successNum, total} = resp.data

                            setTimeout(() => {

                                Modal.info({
                                    title: '发券完成',
                                    onOk: () => {
                                        t.setState({
                                            importLock: false,
                                            previewText: '请上传excel文件',
                                            visible: false
                                        })
                                        dispatch(action.fetchImportFileList('UPLOAD_DEFAULT'))
                                    },
                                    content: <div>
                                        <p>
                                            {/*共{total}条数据，*/}
                                            发送成功{successNum}条，发送失败{failNum}条</p>
                                    </div>
                                })
                            }, 1000)
                        }
                    } else {
                        const {message} = resp

                        clearInterval(timer)

                        if (resp.errorCode === '401') {
                            bridge.callParent('logout')
                            return
                        }

                        Modal.info({
                            title: '导入信息',
                            onOk: () => {
                                if (!isRecharge) {
                                    setTimeout(function () {
                                        t.clearFn(undefined, dispatch)
                                    }, 1000)
                                }
                                t.setState({
                                    importLock: false,
                                    previewText: '请上传excel文件'
                                })
                            },
                            content: <div>{message}</div>

                        })

                    }

                }, 1200)


            },

            uploadError: function (err) {
                clearInterval(timer)
                console.log(t.props.data.progressNum)

                if (err.errorCode === '401') {
                    bridge.callParent('logout')
                    return
                }

                message.info('出错啦~')
                if (!isRecharge) {
                    setTimeout(function () {
                        t.clearFn(undefined, dispatch)
                    }, 1000)
                }
                t.setState({
                    importLock: false,
                    previewText: '请上传excel文件'
                })
            },

            uploadFail: function (resp) {
                clearInterval(timer)

                message.info('导入失败！')
                if (!isRecharge) {
                    setTimeout(function () {
                        t.clearFn(undefined, dispatch)
                    }, 1000)
                }
                t.setState({
                    importLock: false,
                    previewText: '请上传excel文件'
                })
            },

            textBeforeFiles: true

        }

    }

    clearFn(e, dispatch) {

        (e !== undefined) && e.preventDefault()

        window.location.reload()

    }

    setTimer() {
        const t = this

        const {dispatch} = t.props

        dispatch(action.pushProgress(t.state.processId))

    }

    submitInfo() {
        Modal.info({
            title: '填表信息',
            content: (
                <div style={{margin: '0px 0 0 -40px'}}>
                    <p style={{marginTop: '20px'}}>1)、在第一张“批量发券信息模板”表格中输入会员的信息，请不要更改工作区顺序，默认模板数据为第1个工作区。</p>
                    <p style={{marginTop: '20px'}}>2).“会员”字段可不填写，“手机号码”字段必选填写，若该字段显示为空或填写不规范则无法给该会员发券</p>
                </div>
            ),
            onOk() {
            },
            maskClosable: true,
            width: 520

        });
    }

    handleDownload(url) {
        location.href = url+'?t='+ Date.parse(new Date());
    }

    changeCouponType(value) {

        const t = this

        const {dispatch} = t.props

        dispatch(action.changeCouponType(value))

        t.setState({
            couponId: value
        }, () => {

            const query = bridge.getInfoAsQuery()

            const {params} = this.props

            const {couponId, couponNum} = this.state

            const data = InitData(params.pageType, query, couponId, couponNum)

            dispatch(action.initCouponData(data))
        })


    }

    changeCouponNum(value) {

        const t = this

        value = parseInt(value)

        const {dispatch} = t.props

        t.setState({
            couponNum: value
        }, () => {

            const query = bridge.getInfoAsQuery()

            const {params} = this.props

            const {couponId, couponNum} = this.state

            const data = InitData(params.pageType, query, couponId, couponNum)

            dispatch(action.initCouponData(data))
        })

    }

    onChange = (e) => {

        const t = this
        const {dispatch, data} = t.props
        const {oldBatchId} = data
        const status = e.target.value
        dispatch(action.changeStatus(status))
        this.setState({
            status: status
        })
        if (oldBatchId) {

            if (status === 1) {
                dispatch(action.getRechargeList(oldBatchId, status, 50, 1))
            } else {
                dispatch(action.getRechargeList(oldBatchId, status))
            }

        } else {
            return
        }

    }

    getOptionList=(len=20)=>{
        let arr = []
        for(let i = 1;i<=len;i++){
            arr.push(i)
        }
        return arr
    }

    render() {

        const t = this

        const {data, dispatch} = t.props

        const {couponTypeList, templateFile} = data

        const progressNum = parseInt(sessionStorage.getItem('progressNum'))


        const showBtn = (t.state.previewText === '请上传excel文件') ? false : true

        const {progressTitle, visible} = t.state

        return (
            <div className={styles.handleBox}>
                <div className={styles.t1}>
                    <div className={styles.orderType}>优惠券种类:</div>

                    {couponTypeList ?
                        <Select placeholder="请选择一种优惠券" defaultValue={couponTypeList[0].couponName} style={{width: 160}}
                                onChange={t.changeCouponType.bind(t)}>

                            {
                                couponTypeList.map((coupon, index) => {
                                    return (
                                        <Option key={index} value={coupon.couponId}>{coupon.couponName}</Option>
                                    )
                                })

                            }
                        </Select>

                        : <Select placeholder="请先在掌柜端创建优惠券" style={{width: 160}}>
                        </Select>}
                    <div className={cx(styles.orderType, styles.orderType1)}>每人发券数:</div>
                    <Select defaultValue="1" style={{width: 160}} onChange={t.changeCouponNum.bind(t)}>
                        {/* 优惠劵从1-5扩展到 1-20
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                            <Option value="4">4</Option>
                            <Option value="5">5</Option>
                        */}
                        {
                            this.getOptionList(20).map(i=>(
                                <Option key={i} value={`${i}`}>{i}</Option>
                            ))
                        }
                    </Select>


                </div>
                <div className={styles.t2}>
                    <div className={styles.orderType} style={{float: 'left', marginTop: '8px'}}>会员手机号:</div>
                    <div className={styles.view_area}>
                        <p className={styles.view_text}>{t.state.previewText}</p>
                        {
                            (() => {
                                if (showBtn) {
                                    return (
                                        <div className={styles.delete_btn} onClick={e => {
                                            t.clearFn(e, dispatch)
                                        }}>
                                            <div className={styles.delete_vertical}/>
                                            <div className={styles.delete_horizontal}/>
                                        </div>
                                    )
                                } else {
                                    return null
                                }
                            })()
                        }
                    </div>
                    <FileUpload options={t.setOptions()} className={styles.fileupload}>
                        <Button className={styles.chose_area} ref="chooseBtn">
                            <span>选择文件</span>
                        </Button>
                        <BatchSelector dispatch={dispatch} data={data}/>
                        <div className={styles.vertical_line}></div>
                            <Button className={styles.secondButton}
                                    onClick={t.handleDownload.bind(t, templateFile)}>下载空白模版</Button>
                            <Button className={styles.submitInfo}
                                    onClick={t.submitInfo}>
                                <Icon type="question" style={{fontSize: '14px', color: '#d52632'}}/>
                                <span style={{margin: '0px'}}>填表说明</span>
                            </Button>
                        <Button type="primary" className={styles.chooseFile} ref="uploadBtn"
                                loading={this.state.importLock}>确定</Button>


                    </FileUpload>
                </div>
                <div className={styles.line}></div>
                <div className={styles.t3}>
                    <div className={styles.orderType}>发券状态:</div>
                    <RadioGroup onChange={this.onChange} value={this.state.status} options={this.state.statusData} />
                    {/*<Radio value={1}>发布成功</Radio>*/}
                    {/*<Radio value={2}>发布失败</Radio>*/}
                    {/*</RadioGroup>*/}
                    {/*<Button type="primary" style={{marginLeft:"832px",width:'87px'}}>确定</Button>*/}
                </div>
                {
                    (() => {
                        if (visible) {
                            return (
                                <div className={styles.progressBox}
                                     style={{left: (document.body.clientWidth - 200) / 2}}>
                                    <p className={styles.progressTitle}>{progressTitle}</p>
                                    <div style={{margin: '20px 50px'}}>
                                        <Progress type="circle" percent={progressNum} width={100}/>
                                    </div>
                                </div>
                            )
                        } else {
                            return null
                        }

                    })()
                }

            </div>
        )
    }
}

export default Handle
