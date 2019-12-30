import React, {Component} from 'react'
import styles from './style.css'
import {message, Button, Modal, Spin} from 'antd'

import * as action from '../../action'
import * as bridge from '../../utils/bridge'
import FileUpload from 'react-fileupload'

class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            importLock: false,
            exportLock: false,
            previewText: '请上传excel文件'
        }
    }

    setOptions() {

        const t = this

        const {dispatch, data} = t.props

        const {importUrl, importData} = data

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

                    if (files[0] && files[0].size < 1024 * 1024 * 8) {

                        t.setState({
                            previewText: name
                        })

                    } else {

                        message.info('文件太大，无法上传！')
                        t.setState({
                            previewText: '请上传excel文件'
                        })

                    }

                } else {

                    message.info('仅允许上传格式为.xls或.xlsx的文件！')

                    t.setState({
                        previewText: '请上传excel文件'
                    })
                }

            },

            beforeUpload: function (files, mill) {

                if (!files || files.length <= 0) {

                    if (t.state.previewText === '请上传excel文件') {

                        dispatch(action.globalMessageError('请先选择excel文件！'))

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

                    if (/\.(xls|xlsx)$/.test(name)) {

                        if (files[0] && files[0].size < 1024 * 1024 * 8) {
                            if (files[0].size == 0) {
                                message.info('请上传正确的excel文件')

                                t.setState({
                                    importLock: false,
                                    previewText: '请上传excel文件'
                                })
                                return false
                            } else {

                                files[0].mill = mill
                                return true
                            }
                        }

                        else {

                            message.info('文件太大，无法上传！')

                            t.setState({
                                importLock: false,
                                previewText: '请上传excel文件'
                            })
                            return false

                        }

                    } else {

                        message.info('仅支持.xls或.xlsx的excel文件！')
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
                const modal = Modal.info({
                    title: '商品导入中',
                    footer: null,
                    content: <div>
                        <p>整个过程需要几分钟时间，请稍后查看导入结果</p>
                    </div>
                });
                setTimeout(() => modal.destroy(), 2000);
            },

            uploading: function (progress) {
                // console.log('loading...', progress.loaded / progress.total + '%')

                t.setState({
                    importLock: true
                })

            },

            uploadSuccess: function (resp) {
                console.log(resp)
                let code = resp.code
                //导入成功 返回code 1 ，直接显示message内容
                if (code === 1) {
                    const {message} = resp
                    //
                    const successModal = Modal.success({
                        title: '导入成功',
                        onOk: () => {
                            t.setState({
                                importLock: false,
                                previewText: '请上传excel文件'
                            })
                        },
                        content: <div>
                            <p>{message}</p>
                        </div>
                    });

                } else {

                    //登录超时
                    if (resp.errorCode === '401') {
                        bridge.callParent('logout')
                        return
                    } else {

                        //失败接口返回字符串
                        const {message} = resp

                        //message包含一个表格信息
                        if (message.indexOf('[') >= 0) {
                            const list = eval(message)

                            Modal.error({
                                title: '错误信息',
                                onOk: () => {
                                    t.setState({
                                        importLock: false,
                                        previewText: '请上传excel文件'
                                    })
                                },
                                content: <div>
                                    <p style={{
                                        color: '#999',
                                        borderBottom: '1px solid #e2e9e7',
                                        paddingBottom: '10px',
                                        textAlign: 'center'
                                    }}>
                                        文件中有错误信息，导入失败，请仔细检查修改后，重新选择文件导入
                                    </p>
                                    <div className={styles.errorBox}>
                                        <ul>
                                            <li>商品名称</li>
                                            <li>编码</li>
                                            <li>错误位置</li>
                                            <li>错误信息</li>
                                        </ul>
                                        {
                                            list.map((e, i) => {
                                                return <ul key={i}>
                                                    {
                                                        e.name ? (
                                                            <li className={styles.errorLiLeft}>{e.name}</li>

                                                        ) : (
                                                            <li className={styles.errorLiLeft}><br/></li>)
                                                    }

                                                    {
                                                        e.code ? (
                                                            <li className={styles.errorLiLeft}>{e.code}</li>

                                                        ) : (
                                                            <li className={styles.errorLiLeft}><br/></li>)
                                                    }

                                                    <li className={styles.errorLiLeft}>{e.rowNum}</li>
                                                    <li className="errorLiRight">{e.error}</li>
                                                </ul>
                                            })
                                        }
                                    </div>
                                </div>,
                                width: 720
                            })

                        } else {
                            Modal.info({
                                title: '请注意',
                                onOk: () => {
                                    t.setState({
                                        importLock: false,
                                        previewText: '请上传excel文件'
                                    })
                                },
                                content: <div>{message}</div>

                            })
                        }
                    }

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

    handleDownload(url) {
        location.href = url
    }

    render() {

        const t = this
        //
        const {dispatch, data} = t.props

        // const testList = Object.keys(data)
        //
        // if (testList.length === 0) {
        //     return null
        // }

        //data中获取空的模板文件下载链接
        const {templateFile, showSpin} = data


        const showBtn = (t.state.previewText === '请上传excel文件') ? false : true


        return (
            <div className={styles.main_wrapper}>
                <div className={styles.top_line}>
                    <div className={styles.import_part}>
                        {/*<Button className={styles.secondButton}*/}
                        {/*onClick={t.handleDownload.bind(t, templateFile)}>下载空白模版</Button>*/}
                        {/*<div className={styles.vertical_line}></div>*/}
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
                        {data.importUrl ?
                            <FileUpload options={t.setOptions()} className={styles.fileupload}>


                                <Button className={styles.chose_area} ref="chooseBtn">
                                    <span>选择文件</span>
                                </Button>
                                <div style={{width: '16px', display: 'inline-block'}}></div>
                                <Button type="primary" className={styles.chooseFile} ref="uploadBtn"
                                        loading={this.state.importLock}>导入</Button>

                            </FileUpload> : null}

                    </div>


                </div>
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





