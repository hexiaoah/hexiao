/**
 * Created by air on 2017/7/10.
 */
import React, { Component } from 'react'
import { Select , Button ,message ,Modal} from 'antd'
import FileUpload from 'react-fileupload'
import styles from './style.css'
import InitData from './init'
import * as action from '../../action'
import * as bridge from '../../utils/bridge'
import api from '../../api'

const Option = Select.Option

class Handle extends Component {
    constructor(props) {

        super(props);

        this.state = {
            previewText: '请上传MP4格式视频',
            importLock: false,
            exportLock: false,
            videoType : 1,
            fileNameRepeat : false
        }
    }

    componentDidMount () {
        const t =this

        const { dispatch ,params} = t.props

        const query = bridge.getInfoAsQuery()

        const Data = InitData(params.pageType, query ,this.state.videoType)
        dispatch(action.initVideoData(Data))
    }
    handleChange (value) {
        const t = this

        const { dispatch } = t.props

        const query = bridge.getInfoAsQuery()

        const { params } = this.props

        if(t.state.videoType === 0){
            t.setState ({
                videoType : 1
            },()=>{

                dispatch(action.getVideoList(t.state.videoType))

                const Data = InitData(params.pageType, query ,this.state.videoType)

                dispatch(action.initVideoData(Data))

                dispatch(action.changeVideoType(t.state.videoType))
            })
            dispatch(action.changeVideoType(1))
        }else{
            t.setState ({
                videoType : 0
            },()=>{

                dispatch(action.getVideoList(t.state.videoType))

                const Data = InitData(params.pageType, query ,this.state.videoType)

                dispatch(action.initVideoData(Data))

                dispatch(action.changeVideoType(t.state.videoType))
            })
            dispatch(action.changeVideoType(0))
         }

    }

    options() {

        const t = this

        const {dispatch, data} = t.props

        const {importUrl, importData, isRecharge } = data

        const query = bridge.getInfoAsQuery()

        const {token} = query

        return {
            baseUrl: importUrl ? importUrl:'',

            param: importData,

            fileFieldName: 'file',

            dataType: 'json',

            wrapperDisplay: 'inline-block',

            multiple: false,

            numberLimit: 1,

            accept: '*/*',

            chooseAndUpload: false,

            // paramAddToField: importData,

            withCredentials: false,

            requestHeaders: {
                'X-Token': token
            },

            chooseFile: function (files) {

                const name = (typeof files === 'string') ? files : files[0].name

                api.is_name_repeat({
                    fileName : name ,
                    videoType : t.state.videoType
                }).then(
                    res => {
                        t.setState({
                            fileNameRepeat : res
                        },()=>{

                            if(t.state.fileNameRepeat){
                                Modal.confirm({
                                    content: name + '已存在，您要替换它吗？',
                                    onOk() {
                                        if (/\.(mp4|MP4)$/.test(name)) {
                                            if (files[0] && files[0].size < 1024 * 1024 * 200) {

                                                if(name.replace(/[\u0391-\uFFE5]/g,"aa").length < 32){
                                                    t.setState({
                                                        previewText: name
                                                    })
                                                }else{
                                                    message.info('文件名字长度不能超过32个字符！')

                                                    if (!isRecharge) {
                                                        setTimeout(function () {
                                                            t.clearFn(undefined, dispatch)
                                                        }, 1500)
                                                    }
                                                    t.setState({
                                                        previewText: '请上传MP4格式视频'
                                                    })
                                                }


                                            } else {

                                                message.info('文件太大，不支持超过200M的文件！')

                                                if (!isRecharge) {
                                                    setTimeout(function () {
                                                        t.clearFn(undefined, dispatch)
                                                    }, 1500)
                                                }
                                                t.setState({
                                                    previewText: '请上传MP4格式视频'
                                                })

                                            }

                                        } else {

                                            message.info('仅允许上传格式为MP4的文件！')
                                            if (!isRecharge) {
                                                setTimeout(function () {
                                                    t.clearFn(undefined, dispatch)
                                                }, 1500)
                                            }
                                            t.setState({
                                                previewText: '请上传MP4格式视频'
                                            })
                                        }

                                    },
                                    onCancel() {
                                        if (!isRecharge) {
                                            setTimeout(function () {
                                                t.clearFn(undefined, dispatch)
                                            }, 1500)
                                        }
                                        t.setState({
                                            previewText: '请上传MP4格式视频'
                                        })
                                    },
                                });
                            }else{
                                if (/\.(mp4|MP4)$/.test(name)) {

                                    if (files[0] && files[0].size < 1024 * 1024 * 200) {

                                        if(name.replace(/[\u0391-\uFFE5]/g,"aa").length < 32){
                                            t.setState({
                                                previewText: name
                                            })
                                        }else{
                                            message.info('文件名字长度不能超过32个字符！')

                                            if (!isRecharge) {
                                                setTimeout(function () {
                                                    t.clearFn(undefined, dispatch)
                                                }, 1500)
                                            }
                                            t.setState({
                                                previewText: '请上传MP4格式视频'
                                            })
                                        }

                                    } else {

                                        message.info('文件太大，不支持超过200M的文件！')

                                        if (!isRecharge) {
                                            setTimeout(function () {
                                                t.clearFn(undefined, dispatch)
                                            }, 1500)
                                        }
                                        t.setState({
                                            previewText: '请上传MP4格式视频'
                                        })

                                    }

                                } else {

                                    message.info('仅允许上传格式为MP4的文件！')
                                    if (!isRecharge) {
                                        setTimeout(function () {
                                            t.clearFn(undefined, dispatch)
                                        }, 1500)
                                    }
                                    t.setState({
                                        previewText: '请上传MP4格式视频'
                                    })
                                }
                            }
                        })
                    },
                    err => {dispatch(action.errorHandler(err))}
                )




            },
            beforeUpload: function (files, mill) {

                if (!files || files.length <= 0) {

                    if(t.state.previewText === '请上传MP4格式视频'){
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

                    if (/\.(mp4|MP4)$/.test(name)) {

                        if (files[0] && files[0].size < 1024 * 1024 * 200) {

                                files[0].mill = mill

                        } else {

                            message.info('文件太大，不支持超过200M的文件！')

                            if (!isRecharge) {
                                setTimeout(function () {
                                    t.clearFn(undefined, dispatch)
                                }, 1500)
                            }

                            t.setState({
                                importLock: false,
                                previewText: '请上传MP4格式视频'
                            })
                            return false

                        }

                    } else {

                        message.info('仅允许上传格式为MP4的文件！')

                        if (!isRecharge) {
                            setTimeout(function () {
                                t.clearFn(undefined, dispatch)
                            }, 1500)
                        }

                        t.setState({
                            importLock: false,
                            previewText: '请上传MP4格式视频'
                        })
                        return false

                    }

                }

            },
            doUpload: function (files, mill) {

                 // console.log('you just uploaded', typeof files === 'string' ? files : files[0]);
            },

            uploading: function (progress) {

                 console.log('loading...', progress.loaded / progress.total + '%')
                t.setState({
                    importLock: true
                })

            },
            uploadSuccess: function (resp) {
                let code = resp.code

                if (code === 1) {
                    //区别于会员信息导入，商品信息导入会返回messages @Array
                    // const {messages} = resp.data

                    // let messageList = messages ? messages : []
                    setTimeout(()=>{
                        Modal.success({
                            title: '导入信息',
                            onOk: () => {
                                //
                                // if (!isRecharge) {
                                //     setTimeout(function () {
                                //         t.clearFn(undefined, dispatch)
                                //     }, 1500)
                                // }
                                t.setState({
                                    importLock: false,
                                    previewText: '请上传MP4格式视频'
                                })
                                setTimeout(()=>{
                                    dispatch(action.getVideoList(t.state.videoType))
                                },500)

                            },

                            content: (<div>
                                    <p>上传成功！</p>
                                </div>
                            )
                        })
                    },500)
                } else {

                    if (resp.errorCode === '401') {
                        bridge.callParent('logout')
                        return
                    }

                    //失败接口返回字符串
                    const {message} = resp

                    const list = message.replace(/\[|\]/g, '').split(/\#\,?/g) // eslint-disable-line

                    Modal.error({
                        title: '导入信息',
                        onOk: () => {
                            if (!isRecharge) {
                                setTimeout(function () {
                                    t.clearFn(undefined, dispatch)
                                }, 1500)
                            }
                            t.setState({
                                importLock: false,
                                previewText: '请上传MP4格式视频'
                            })

                        },
                        content: (<div>
                            <p>上传失败，请重新上传</p>
                        </div>)

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
                    }, 1500)
                }
                t.setState({
                    importLock: false,
                    previewText: '请上传MP4格式视频'
                })
            },

            uploadFail: function (resp) {
                message.info('导入失败！')

                if (!isRecharge) {
                    setTimeout(function () {
                        t.clearFn(undefined, dispatch)
                    }, 1500)
                }

                t.setState({
                    importLock: false,
                    previewText: '请上传MP4格式视频'
                })
            },

        }

    }

    clearFn (e, dispatch) {

        (e !== undefined) && e.preventDefault()

        window.location.reload()

    }

    render() {

        const t = this

        const {dispatch} = t.props

        const showBtn = (t.state.previewText === '请上传MP4格式视频') ? false : true

        return(
            <div className={styles.handleBox}>
                <div className={styles.t1}>
                    <div className={styles.videoType}>视频类型</div>

                    <Select ref="select" defaultValue="商品视频" style={{ width: 120 }} onChange={t.handleChange.bind(t)}>
                        <Option value="商品视频">商品视频</Option>
                        <Option value="店家视频">店家视频</Option>
                    </Select>

                    <div className={styles.line}></div>
                </div>
                <div className={styles.t2}>
                    <div className={styles.FileName}>
                        <p>{this.state.previewText}</p>
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
                    <FileUpload options={t.options()} style={{float:'left', paddingLeft:'32px'}}>
                        <Button  className={styles.chooseFile} ref="chooseBtn">选择文件</Button>
                        <div style={{width:'16px', display:'inline-block'}}></div>
                        <Button type="primary" className={styles.chooseFile} ref="uploadBtn" loading={this.state.importLock}>导入</Button>
                    </FileUpload>
                    <p className={styles.submit}>文件格式仅支持MP4，单个视频大小不可超过200M</p>
                </div>
            </div>
        )
    }
}

export default Handle
