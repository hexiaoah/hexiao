/**
 * Created by air on 2017/7/10.
 */
import React, {Component} from 'react'
import {Button, message, Modal, Progress, Icon, Popover, Input, Alert} from 'antd'
import FileUpload from 'react-fileupload'
import styles from './style.css'
import * as action from '../../action'
import * as bridge from '../../utils/bridge'

class AddPictureBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewText: '请上传图片',
            importLock: false,
            exportLock: false,
            visible: false,
            importPic: 0,
            importProgress: 0,
            img_type: this.props.imgType,//当前上传图片的状态，3为头图上传，1为详情图上传
            load_type: this.props.loadType,//当前按钮的显示方式，1为头部按钮，上传成功后刷新页面；2为图片列表页上传，上传成功后返回上传图片内容
            picture_name: this.props.data.pictureName || '',
            importData: {...this.props.data.importData, img_type: this.props.imgType}
        }
        this.alertUploadMessage = this.alertUploadMessage.bind(this);
    }

    options() {
        const t = this

        const {dispatch, data} = t.props

        const {importUrl, isRecharge} = data

        const importData = {...this.props.data.importData, img_type: this.props.imgType}
        if (data.brandId) {
            importData.plateEntityId=data.brandId
        }
        const query = bridge.getInfoAsQuery()


        const {token} = query
        return {
            baseUrl: importUrl ? importUrl : '',

            param: importData,

            fileFieldName: 'file',

            dataType: 'json',

            wrapperDisplay: 'inline-block',

            multiple: true,

            accept: '*/*',

            timeout: 0,

            chooseAndUpload: true,

            // paramAddToField: importData,

            withCredentials: false,

            requestHeaders: {
                'X-Token': token
            },
            //用户选择文件后的触发的回调函数
            chooseFile: function (files) {
                // const name = (typeof files === 'string') ? files : files[0].name.toLocaleLowerCase()
                // for (var i = 0; i < files.length; i++) {
                //     const filesArry = files[i].name.toLocaleLowerCase().split('.')
                //
                //     const length = filesArry.length
                //
                //     if (filesArry[length - 1] === 'jpg' || filesArry[length - 1] === 'jpeg' || filesArry[length - 1] === 'gif' || filesArry[length - 1] === 'png') {
                //
                //         if (files[i].size < 1024 * 1024 * 5) {
                //             const fileName = name.split('@')[0]
                //             t.setState({
                //                 previewText: fileName
                //             })
                //
                //         } else {
                //             t.alertUploadMessage('图片太大了，请控制在5M之内');
                //         }
                //     } else {
                //         t.alertUploadMessage('文件格式不正确');
                //     }
                // }
                // err => {
                //     dispatch(action.errorHandler(err))
                // }

            },

            /**进行上传动作之前执行，返回true继续，false阻止文件上传
             * @param file {array[File] | string} 现代浏览器返回包含File对象的数组(File API返回的方式)，IE返回文件名
             * @param mill {long} 上传动作执行时的时间(毫秒)，如果File对象已有mill属性则返回一样的
             * @return {boolean} 是否允许用户进行上传
             */
            beforeUpload: function (files, mill) {

                if (!files || files.length <= 0) {

                    if (t.state.previewText === '请上传图片') {

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
                    const name = (typeof files === 'string') ? files : files[0].name.toLocaleLowerCase()
                    const picture_name = t.state.picture_name || name.split('@')[0];
                    if (t.state.load_type === '2' && t.state.img_type === '3' && files.length > 5) {
                        message.error(picture_name + '头图超过5张');
                        return false;

                    } else if (t.state.load_type === '2' && t.state.img_type === '1' && files.length > 24) {
                        message.error(picture_name + '详情图超过24张');
                        return false;
                    }
                    for (let i = 0; i < files.length; i++) {

                        const filesArry = files[i].name.toLocaleLowerCase().split('.')

                        const length = filesArry.length

                        if (filesArry[length - 1] === 'jpeg' || filesArry[length - 1] === 'jpg' || filesArry[length - 1] === 'gif' || filesArry[length - 1] === 'png') {

                            if (files[i].size < 1024 * 1024 * 5) {

                                const fileName = files[i].name.split('@')[0]
                                //如果为具体商品的图片上传，需要先判断名称是否一致
                                if (t.state.load_type === '2' && fileName !== t.state.picture_name) {
                                    t.alertUploadMessage('您上传的图片名称跟当前的商品名称不一致，请重新选择图片');
                                    return false
                                } else {
                                    files[i].mill = mill
                                }
                            } else {
                                t.alertUploadMessage('图片太大了，请控制在5M之内');
                                return false
                            }
                        } else {
                            t.alertUploadMessage('文件格式不正确');
                            return false
                        }
                    }

                }

            },
            //上传动作(xhr send | form submit)执行后(请求发送后)调用
            doUpload: function (files, mill) {
                //  for(var i=0;i<files.length;i++){
                //
                //      console.log('you just uploaded', typeof files === 'string' ? files : files[i]);
                // }
                t.setState({
                    visible: true
                })
            },
            //在文件上传中的时候，浏览器会不断触发此函数，IE9-为虚拟的进度
            uploading: function (progress) {
                const p = progress.loaded * 100 / progress.total

                console.log('loading...', p + '%')

                t.setState({
                    importLock: true,

                })

            },
            /**
             * 上传成功后执行的回调（针对AJAX而言）
             * @param resp {json | string} 根据options.dataType指定返回数据的格式
             * @return
             * */
            uploadSuccess: function (resp) {
                let code = resp.code
                if (code === 1) {
                    let successNum = 0
                    let progress = 0
                    const errorMessage = []

                    //获取导入成功图片数量
                    for (let a = 0; a < resp.data.length; a++) {
                        if (resp.data[a].error) {
                            errorMessage.push(resp.data[a].error)
                        }

                        if (resp.data[a].success === true) {
                            successNum += 1
                        }
                    }

                    const p = successNum * 100 / resp.data.length

                    const int = setInterval(() => {

                        if (progress >= p) {
                            clearInterval(int)
                        }
                        progress += 1
                        t.setState({
                            importPic: successNum,
                            importProgress: progress
                        })

                    }, 20)


                    setTimeout(() => {
                        t.setState({
                            visible: false
                        })
                        //如果有错误信息，弹出窗口
                        console.log(errorMessage)
                        if (errorMessage.length > 0) {
                            Modal.info({
                                title: '导入失败信息',
                                content: (
                                    <div>
                                        {
                                            errorMessage.map((e, i) => {
                                                return <li key={i}>{e}</li>
                                            })
                                        }
                                    </div>
                                ),
                                onOk() {
                                    setTimeout(function () {
                                        t.clearFn(undefined, dispatch)
                                    }, 1500)
                                },
                            });
                        } else {
                            setTimeout(function () {
                                t.clearFn(undefined, dispatch, resp)
                            }, 1500)
                        }

                    }, 3000)

                    console.log(errorMessage)

                } else {

                    if (resp.errorCode === '401') {
                        bridge.callParent('logout')
                        return
                    }
                    t.setState({
                        visible: false
                    })
                    //失败接口返回字符串
                    const {message} = resp

                    const list = message.replace(/\[|\]/g, '').split(/\#\,?/g) // eslint-disable-line

                    Modal.error({
                        title: '导入信息',
                        onOk: () => {
                            // t.alertUploadMessage(null);
                        },
                        content: (<div>
                            <p>{message}</p>
                        </div>)
                    })
                }
            },

            uploadError: function (err) {
                if (err.errorCode === '401') {
                    bridge.callParent('logout')
                    return
                }
                t.alertUploadMessage(err.message);
            },

            uploadFail: function (resp) {
                t.alertUploadMessage('导入失败！');
            },
        }
    }

    /**
     * @param message string 提示信息
     * */
    alertUploadMessage(message) {
        const t = this;
        const {dispatch, data} = t.props
        const {isRecharge} = data
        message ? message.info(message) : ''
        console.log(isRecharge)
        if (!isRecharge) {
            setTimeout(function () {
                t.clearFn(undefined, dispatch)
            }, 1500)
        }
        t.setState({
            importLock: false,
            previewText: '请上传图片'
        })
    }

    /**
     * @param e
     *          dispatch
     *          resp
     * */
    clearFn(e, dispatch, resp) {
        (e !== undefined) && e.preventDefault()
        // window.location.reload()

        this.setState({
            previewText: '请上传图片',
            importLock: false,
            exportLock: false,
            visible: false,
            importPic: 0,
            importProgress: 0,
        });

        if (this.state.load_type === '2') {
            this.props.returnAddPicture(resp.data, this.state.img_type)
        } else {
          window.location.reload()
        }
    }

    render() {
        const t = this
        return (
            <span>
                {
                    (() => {
                        if (this.state.load_type === '1') {
                            return (
                                <FileUpload options={t.options()} style={{float: 'left'}}>
                                    <Button className={styles.chooseFile}
                                            ref="chooseAndUpload"
                                            loading={this.state.importLock}>
                                        {t.state.img_type === '3' ? '上传商品主图' : '上传商品详情图'}</Button>
                                </FileUpload>
                            )
                        } else {
                            return (
                                <FileUpload options={t.options()}
                                            style={{float: 'left'}}
                                            className={styles.btnType2}>
                                    <Button className={styles.chooseFile}
                                            ref="chooseAndUpload"
                                            loading={this.state.importLock}> </Button>
                                    <span className={styles.fileUploadIcon}> </span>
                                </FileUpload>)
                        }
                    })()
                }
                {(() => {
                    if (this.state.visible) {
                        return (
                            <div className={styles.progressBox}
                                 style={{left: (document.body.clientWidth - 200) / 2}}>
                                <p className={styles.progressTitle}>文件正在导入中</p>
                                <div style={{margin: '20px 50px'}}>
                                    <Progress type="circle" percent={this.state.importProgress} width={100}/>
                                </div>
                                <p style={{
                                    width: '100%',
                                    textAlign: 'center'
                                }}>已成功导入图片{this.state.importPic}张</p>
                            </div>
                        )
                    } else {
                        return null
                    }
                })()
                }</span>
        )
    }
}

export default AddPictureBtn
