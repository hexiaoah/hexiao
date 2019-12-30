/**
 * Created by air on 2017/7/31.
 */
import React, { Component } from 'react'
import cx from 'classnames'
import styles from './style.css'
import { message, Button, Modal, Spin } from 'antd'
import RouteList from './routeList'

import * as action from '../../action'
import saveAs from '../../utils/saveAs'
import * as bridge from '../../utils/bridge'
import FileUpload from 'react-fileupload'

class Main extends Component {

    constructor (props) {
        super(props)
        this.state = {
            importLock: false,
            exportLock: false,
            previewText: '请上传excel文件'
        }
    }
    componentDidMount(){
        const t =this
        const { dispatch } = t.props
        dispatch(action.getRouteList(1))
    }
    setOptions () {

        const t = this

        const {dispatch, data} = t.props

        const {importUrl, importData, isRecharge} = data

        const {token} = bridge.getInfoAsQuery()

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
                    const errorList = resp.data

                    let messageList = errorList ? errorList : []

                    const {dispatch ,data} = t.props

                    dispatch(action.setCurIndex(1))
                    dispatch(action.getRouteList(1))
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
                                messageList.length > 0?
                                <div>
                                <p className={styles.titleTip}>
                                    文件中有错误信息，请仔细检查修改后，重新选择文件导入
                                </p>
                                <div className={styles.errorBox}>
                                    <ul>
                                        <li>错误位置</li>
                                        <li>错误信息</li>
                                    </ul>
                                    {
                                        messageList.map((e, i) => {
                                            return <ul key={i}>
                                                <li>第{e.lineNum}行</li>
                                                <li>{e.msg}</li>
                                            </ul>
                                        })
                                    }
                                </div>
                            </div>
                                :<p className={styles.importSuccess}>导入成功</p>
                            }

                        </div>,
                        width: 720
                    })
                } else {

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
                            content: <div>{resp.message}</div>

                        })
                    }

            },

            uploadError: function (err) {

                if (err.errorCode === '401') {
                    bridge.callParent('logout')
                    return
                }

                message.info(err.message)
                t.setState({
                    importLock: false,
                    previewText: '请上传excel文件'
                })
            },

            uploadFail: function (resp) {
                message.info('很抱歉，本次导入失败，请稍后重试。')
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

        const {isRecharge} = this.props.data

        if (!!isRecharge) {
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
        location.href = url
    }

    render () {

        const t = this

        const {dispatch, data} = t.props

        const testList = Object.keys(data)

        if (testList.length === 0) {return null}

        // isRecharge 是否为会员卡批量充值入口
        const {exportUrl, exportData, exportBtnText, templateFile, isRecharge, showSpin} = data

        const showBtn = (t.state.previewText === '请上传excel文件') ? false : true

        const _exportUrl = exportUrl + '?' + t.json2url(exportData)

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

                        <Button type="primary" loading={this.state.exportLock}
                                className={cx(styles.primaryButton, styles.export_btn)}
                                onClick={t.handleExport.bind(t, _exportUrl)}>
                            {exportBtnText}
                        </Button>
                    </div>



                </div>
                <RouteList data={data} dispatch={dispatch}/>
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





