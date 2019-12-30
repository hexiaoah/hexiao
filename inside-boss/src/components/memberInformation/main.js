/**
 * Created by air on 2017/7/31.
 */
import React, { Component } from 'react'
import cx from 'classnames'
import styles from './style.css'
import { message, Button, Modal, Spin ,Icon} from 'antd'

import * as action from '../../action'
import saveAs from '../../utils/saveAs'
import * as bridge from '../../utils/bridge'
import FileUpload from 'react-fileupload'
import List from './list'

class Main extends Component {

    constructor (props) {
        super(props)
        this.state = {
            importLock: false,
            exportLock: false,
            previewText: '请上传excel文件',
            // showSpin:{
            //     boole: false,
            //     content: ""
            // }
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

                if (/\.(xlsx)$/.test(name) || /\.(xls)$/.test(name)) {

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

                    message.info('仅允许上传格式为.xls或者.xlxs的文件！')
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

                    if (/\.(xlsx)$/.test(name) || /\.(xls)$/.test(name)) {

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

                        message.info('仅允许上传格式为.xls或者.xlxs的文件！')
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
                    const {failCnt, successCnt, totalCnt, errorList} = resp.data

                    let messageList = errorList ? errorList : []

                    Modal.info({
                        title: '导入信息',
                        onOk: () => {
                            t.setState({
                                importLock: false,
                                previewText: '请上传excel文件',
                                // showSpin:{
                                //     boole: true,
                                //     content: "错误结果加载中..."
                                // }
                            })
                            if(messageList.length > 0){

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
                                        <p style={{color:'#999',borderBottom:'1px solid #e2e9e7',paddingBottom:'10px',textAlign:'center'}}>
                                            文件中有错误信息，导入失败，请仔细检查修改后，重新选择文件导入
                                        </p>
                                        <div className={styles.errorBox}>
                                            <ul>
                                                <li>错误位置</li>
                                                <li>卡类型,卡号</li>
                                                <li>错误信息</li>
                                            </ul>
                                            {
                                                messageList.map((e, i) => {
                                                    return <ul key={i}>
                                                        <li>{e.lineNum}</li>
                                                        <li>{e.lineData}</li>
                                                        <li>{e.msg}</li>
                                                    </ul>
                                                })
                                            }
                                        </div>
                                    </div>,
                                    width : 720

                                })

                            }

                        },

                        content: <div>
                            <p>共{totalCnt}条数据，导入成功{successCnt}条，导入失败{failCnt}条</p>
                        </div>
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
                            content: <div>{message}</div>

                        })
                    }

            },

            uploadError: function (err) {

                console.log(err)

                if (err.errorCode === '401') {
                    bridge.callParent('logout')
                    return
                }

                message.info('出错啦~')
                // if (!isRecharge) {
                //     setTimeout(function () {
                //         t.clearFn(undefined, dispatch)
                //     }, 1000)
                // }
                t.setState({
                    importLock: false,
                    previewText: '请上传excel文件'
                })
            },

            uploadFail: function (resp) {
                message.info('导入失败！')
                // if (!isRecharge) {
                //     setTimeout(function () {
                //         t.clearFn(undefined, dispatch)
                //     }, 1000)
                // }
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
        location.href = `${url}?${Date.now()}`
    }

    submitInfo(){
        Modal.info({
            title: '填表信息',
            content: (
                <div style={{margin:'0px 0 0 -40px'}}>
                    <p style={{marginTop:'20px'}}>1、在第一张“会员信息空白模板”表格中输入会员的信息，请不要更改工作区顺序，默认模板数据为第1个工作区。</p>
                    <p style={{marginTop:'20px'}}>2、第一行为说明行，不可修改。第二行开始为数据行，数据行应连续，中间不得出现空行。</p>
                    <p style={{marginTop:'20px'}}>3、卡类型、卡号必须填写，否则无法导入。</p>
                    <p style={{marginTop:'20px'}}>4、卡ID为每张ID卡的内置卡号，可通过刷卡器写入，如果为空，那么导入后默认与卡号相同，但这样就不能刷卡了，使用时只能手工输入卡号。</p>
                    <p style={{marginTop:'20px'}}>5、卡内本金、卡内赠送金和积分可不填，但不能为负数。</p>
                    <p style={{marginTop:'20px'}}>6、生日的格式必须为年/月/日，可不填。</p>
                    <p style={{marginTop:'20px'}}>7、发卡门店编码可不填，但如果连锁门店根据发卡门店来进行财务结算，建议输入。</p>
                    <p style={{marginTop:'20px'}}>8、会员信息导入以卡号为基准，重名的卡号无法导入。</p>
                    <p style={{marginTop:'20px'}}>9、请按照示例的格式填写信息，否则可能会导入失败。</p>
                    <p style={{marginTop:'20px'}}>10、当手机号未填写时，客户姓名，客户性别，和客户生日将不会一同导入。</p>
                    {/*<p style={{marginTop:'20px'}}>11、openid：加密后的微信号，每个用户对每个公众号的OpenID是唯一的。对于不同公众号，同一用户的openid不同；openid需要第三方软件开发公司提供，提供后可以使微信公众号关注用户的关系迁移更顺利（可不填）。</p>
                    <p style={{marginTop:'20px'}}>12、appid：微信公众平台服务号特有的钥匙（可不填）。</p>*/}
                </div>
            ),
            onOk() {},
            maskClosable : true,
            width : 520

        });
    }
    render () {

        const t = this

        const {dispatch, data} = t.props

        const testList = Object.keys(data)

        if (testList.length === 0) {return null}

        // isRecharge 是否为会员卡批量充值入口
        const {exportUrl, exportData, exportBtnText, templateFile, isRecharge, memberImportErrorList, rechargeBatchId, exportBtn} = data

        //文件删除按钮
        const showBtn = (t.state.previewText === '请上传excel文件') ? false : true

        // const showSpin = t.state.showSpin

        let final = exportData

        if (!!isRecharge) {
            final = Object.assign({}, exportData, {rechargeBatchId: rechargeBatchId})
        }
//onClick={t.handleDownload.bind(t, templateFile)}
        const _exportUrl = exportUrl + '?' + t.json2url(final)

        return (
            <div className={styles.main_wrapper}>
                <div className={styles.top_line}>
                    <div className={styles.import_part}>
                       <Button className={styles.secondButton} onClick={t.handleDownload.bind(t, templateFile)}>下载空白模版</Button>


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
                        <Button style={{width: '80px',padding:'0px',marginTop:'33px'}} onClick={t.submitInfo}>
                            <Icon type="question" style={{fontSize:'14px', color:'#d52632' }}/>
                            <span style={{margin:'0px'}}>填表说明</span>
                        </Button>
                        {
                            exportBtn ?
                                <Button type="primary" loading={this.state.exportLock}
                                                         className={cx(styles.primaryButton, styles.export_btn)}
                                                         onClick={t.handleExport.bind(t, _exportUrl)}>
                                                        {exportBtnText}
                                </Button>
                                : ''
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default Main





