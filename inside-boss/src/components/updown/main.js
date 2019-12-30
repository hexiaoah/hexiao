import React, { Component } from 'react'
import cx from 'classnames'
import styles from './style.css'
import { message, Button, Modal, Spin } from 'antd'

import * as action from '../../action'
import saveAs from '../../utils/saveAs'
import * as bridge from '../../utils/bridge'
import FileUpload from 'react-fileupload'
import BatchSelector from './select'
import Filter from './filter'
import List from './list'
import Layer from './layer'

class Main extends Component {

    constructor (props) {
        super(props)
        this.state = {
            importLock: false,
            exportLock: false,
            previewText: '请上传excel文件'
        }
    }

    setOptions () {

        const t = this

        const {dispatch, data} = t.props

        const {importUrl, importData, isRecharge} = data

        const query = bridge.getInfoAsQuery()

        const {token} = query

        return {
            baseUrl: importUrl,

            param: importData,

            fileFieldName: 'file',

            dataType: 'json',

            wrapperDisplay: 'inline-block',

            multiple: false,

            numberLimit: 1,

            accept: '*/*',

            chooseAndUpload: false,

            paramAddToField: importData,

            withCredentials: false,

            requestHeaders: {
                'X-Token': token
            },

            chooseFile: function (files) {

                var name = (typeof files === 'string') ? files : files[0].name

                if (/\.(xls|xlsx)$/.test(name)) {

                    if (files[0] && files[0].size < 1024 * 1024 * 20) {

                        t.setState({
                            previewText: name
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

                    message.info('仅允许上传格式为.xls或.xlsx的文件！')
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

                if (!files || files.length <= 0) {

                    if(t.state.previewText === '请上传excel文件'){
                        dispatch(action.globalMessageError('请先选择合适的文件！'))

                        return false
                    }else{
                        dispatch(action.globalMessageError('选择文件已取消，请重新选择文件'))

                        setTimeout(function () {
                            t.clearFn(undefined, dispatch)
                        }, 1500)

                        return false
                    }

                } else {
                    //此块逻辑可以省略，留着做为双重保险
                    var name = (typeof files === 'string') ? files : files[0].name

                    if (/\.(xls|xlsx)$/.test(name)) {

                        if (files[0] && files[0].size < 1024 * 1024 * 20) {

                            files[0].mill = mill
                            return true

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

                        message.info('仅允许上传格式为.xls或.xlsx的文件！')
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
                // console.log('you just uploaded', typeof files === 'string' ? files : files[0]);
            },

            uploading: function (progress) {
                // console.log('loading...', progress.loaded / progress.total + '%')
                t.setState({
                    importLock: true
                })

            },

            uploadSuccess: function (resp) {

                let code = resp.code

                if (code === 1) {
                    //区别于会员信息导入，商品信息导入会返回messages @Array
                    const {failCnt, successCnt, totalCnt, messages} = resp.data

                    let messageList = messages ? messages : []

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
                            dispatch(action.rechargeImportEvent(resp.data))

                        },

                        content: <div>
                            <p>共{totalCnt}条数据，导入成功{successCnt}条，导入失败{failCnt}条</p>
                            {
                                messageList.map((e, i) => {
                                    return <p key={i}>{e}</p>
                                })
                            }
                        </div>
                    })

                } else {

                    if (resp.errorCode === '401') {
                        bridge.callParent('logout')
                        return
                    }

                    //失败接口返回字符串
                    const {message} = resp

                    const list = message.replace(/\[|\]/g, '').split(/\#\,?/g) // eslint-disable-line

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
                        content: <div>
                            {
                                list.map((e, i) => {
                                    return <p key={i}>{e}</p>
                                })
                            }
                        </div>

                    })

                }

            },

            uploadError: function (err) {

                if (err.errorCode === '401') {
                    bridge.callParent('logout')
                    return
                }

                message.info(err.message)
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

    clearFn (e, dispatch) {

        (e !== undefined) && e.preventDefault()

        window.location.reload()

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

    handleExport (url) {
        const t = this
        const {token} = bridge.getInfoAsQuery()

        t.setState({
            exportLock: true
        })

        const {isRecharge, rechargeBatchId} = this.props.data

        if (!!isRecharge && !rechargeBatchId) {
            message.warn('没有选择有效的文件！')
            setTimeout(() => {
                t.setState({
                    exportLock: false
                })
            }, 2000)
            return
        }

        saveAs(url, token).then(
            filename => message.success('导出成功!'), // 成功返回文件名
            err => {
                if (err.code === 0) {

                    if (err.errorCode === '401') {
                        bridge.callParent('logout')
                        return
                    }

                    message.error(err.message || '导出失败')
                }

            }
        ).then(e => this.setState({exportLock: false}))
    }

    handleDownload (url) {
        location.href = url+'?t='+ Date.parse(new Date());
    }

    render () {

        const t = this

        const {dispatch, data} = t.props

        const testList = Object.keys(data)

        if (testList.length === 0) {return null}

        // isRecharge 是否为会员卡批量充值入口
        const {exportUrl, exportData, exportBtnText, templateFile, isRecharge, rechargeBatchDetailsViewList, showSpin, rechargeBatchId} = data

        const showBtn = (t.state.previewText === '请上传excel文件') ? false : true

        let final = exportData

        if (!!isRecharge) {
            final = Object.assign({}, exportData, {rechargeBatchId: rechargeBatchId})
        }

        const _exportUrl = exportUrl + '?' + t.json2url(final)

        const len = isRecharge ? rechargeBatchDetailsViewList.length : 0

        return (
            <div className={styles.main_wrapper}>
                <div className={styles.top_line}>
                    <div className={styles.import_part}>
                        <Button className={styles.secondButton}
                                onClick={t.handleDownload.bind(t, templateFile)}>下载空白模版</Button>
                        <div className={styles.vertical_line}></div>
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
                            <div style={{width:'16px', display:'inline-block'}}></div>
                            <Button type="primary" className={styles.chooseFile} ref="uploadBtn" loading={this.state.importLock}>导入</Button>

                        </FileUpload>
                        {isRecharge ? <BatchSelector dispatch={dispatch} data={data}/> : null}
                    </div>
                    <div className={styles.vertical_line}></div>
                    <Button type="primary" loading={this.state.exportLock}
                            className={cx(styles.primaryButton, styles.export_btn)}
                            onClick={t.handleExport.bind(t, _exportUrl)}>
                        {exportBtnText}
                    </Button>
                    </div>
                {isRecharge ? <Filter dispatch={dispatch} data={data}/> : null}
                {len > 0 ? <List dispatch={dispatch} data={data}/> : null}
                {isRecharge ? <Layer dispatch={dispatch} data={data}/> : null}
                {
                    showSpin && showSpin.bool ? (
                        <div className={styles.cover}>
                            <Spin tip={showSpin.content} style={{marginTop: 160, marginLeft: -160}} size="large"></Spin>
                        </div>
                    ) : null
                }
            </div>
        )
    }
}

export default Main





