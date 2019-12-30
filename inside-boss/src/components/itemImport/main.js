import React, { Component } from 'react'
import { Upload, Button, Icon, message, Select, Progress, notification, Modal, Breadcrumb } from 'antd'
import styles from './style.css'
import * as action from "../../action";
import api from '../../api/uploadApi'
import networkApi from '../../api/networkApi'
import { debug } from 'util';
import {hashHistory} from 'react-router'
import WebSocket from 'socket.io-client'
import * as bridge from "../../utils/bridge";
import { currentwebCocketUrl } from '@src/utils/env'

const Option = Select.Option;
const BATCHITEM = 'batch_item_import'
let timer
// 'http://10.1.6.218:9003/ws?scanId=html-socket
var socket = new WebSocket(currentwebCocketUrl,{ transports: ['websocket']});


class Main extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            fileList: [],
            uploading: false,
            selectValue: 'no_spec',
            showMask: false,
            percent: 0,
            inputVal: '',
            inputFile: {},
            previewText: '请上传excel文件',
            importLock: false,
            total: 0,
            currentIndex: 0,
            currentpercent: 0,
            hasProgress: false,
            batchId: '',
        }
    }
    componentWillMount() {
        // socket 长链接
        const { entityId } = bridge.getInfoAsQuery()

        const that = this
        that._isMounted = true
        socket.on('connect', function(data){
            that.joinRoom(entityId)
          })
        socket.on('progress', function(data){
            const {startIndex, succeedNum, total, failedNum, type, statusStr, batchId} = data
            const index = startIndex + succeedNum + failedNum
            if(type == 2){
                clearTimeout(timer)
                if(that._isMounted){
                    console.log('message %j', data)
                    that.setState({
                        total,
                        currentIndex: index,
                        currentpercent: Math.round((index / total)* 100),
                        hasProgress: true,
                    })
                    // 传输完成或者报错 && batchId：批量任务的ID
                    if(statusStr == ("FINISHED" || "ERROR") && batchId){
                        that.apiGetImportResult(data.batchId)
                    }
                }
            }
        })
    }
    componentWillUnmount() {
        this._isMounted = false
    }

    joinRoom = (entityId) => {
        var data = [
          {
            id: `${entityId}_${BATCHITEM}`
          }
        ]
        socket.emit('join_room', data, (response) => {
            let data = {
                entityId: entityId,
                batchTag: BATCHITEM,
                from: 'simple-html',
                date: new Date()
            }
            let msg = {
                tag: 'socket_to_batch',
                data: JSON.stringify(data)
            }
            socket.emit('notify', msg, (response) => {
            })
        })
    }

    apiGetImportResult = (id) => {
        api.getImportResult(id).then(res => {
            this.getResultSuccess(res)
            this.setState({
                hasProgress: false,
            })
        }).catch(err => {
            this.uploadError(err)
            this.setState({
                hasProgress: false,
            })
        })
    }
    getResultSuccess = (res) => {
        const { messages } = res
        let messageList = messages ? messages : []
        Modal.info({
            title: '导入信息',
            onOk: () => {
                this.ajaxClearBatch()
                this.setState({
                    previewText: '请上传excel文件'
                })
            },

            content: <div>
                <p>文件导入成功</p>
                {messageList.map((val, i) => {
                    return (<p key={i}>{val}</p>)
                })}
            </div>
        })
    }

    handleChange(value) {
        this.setState({
            selectValue: value,
        });
    }

    handleDownload() {
        location.href = 'https://download.2dfire.com/template_file/%E5%95%86%E5%93%81%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.zip'
    }
    handleUpload = () => {
        const { fileList, selectValue } = this.state;
        const { dispatch, data } = this.props
        let key = ''
        const formData = new FormData();
        fileList.forEach((file) => {
          formData.append('files', file);
        });
        if(selectValue === 'no_spec') {
            dispatch(action.uploadNospec(formData))
            this.setState({
                showMask: true
            })
            key = setInterval(() => {
                if(this.state.percent<=90) {
                    this.setState({
                        percent: this.state.percent + 10
                    })
                }
            }, 1000);
        } else {
            dispatch(action.uploadSpec(formData))
            this.setState({
                showMask: true
            })
        }
        notification.open({
            message: 'Notification Title',
            description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            placement: 'top'
          })
        // this.setState({
        //   uploading: true,
        // });
        // this.setState({
        //   fileList: [],
        //   uploading: false,
        // })

        // reqwest({
        //   url: '//jsonplaceholder.typicode.com/posts/',
        //   method: 'post',
        //   processData: false,
        //   data: formData,
        //   success: () => {
        //     this.setState({
        //       fileList: [],
        //       uploading: false,
        //     });
        //     message.success('上传成功.');
        //   },
        //   error: () => {
        //     this.setState({
        //       uploading: false,
        //     });
        //     message.error('上传失败.');
        //   },
        // });
      }

    //监听上传
    uploadChange(e) {
        let files = e.target.files
        if (!files) {
            return false
        }
        if (files[0] && files[0].size < 1024 * 1024 * 8) {
            this.setState({
                inputVal: e.target.value,
                previewText: e.target.files[0].name,
                inputFile: e.target.files[0]
            })
        } else {
            this.setState({
                inputVal: '',
                previewText: '',
                inputFile: ''
            })
            message.info('文件选择被取消！或者文件太大，无法上传！')
        }
    }

    //导入（零售）
    importExcel() {
        if (!!this.state.inputFile && Object.prototype.toString.call(this.state.inputFile).match(/[A-Z][a-z]*/)[0] === "File") {
            let that = this;
            const {selectValue} = that.state
            let modal = Modal.success({
                title: '正在导入中，稍后可在导入履历页面中查看导入结果',
                content: ``,
            });
            that.setState({
                importLock: true,
            })
            let data = {}
            if( selectValue === 'no_spec') {
                data.spec = 0
            } else {
                data.spec = 1
            }
            api.uploadGoodsSpecification({file: this.state.inputFile, ...data}).then(res => {
                modal.destroy();
                that.uploadSuccess(res)
                that.setState({
                    importLock: false,
                    batchId: res.batchId || ''
                })

            }).catch(err => {
                modal.destroy();
                that.uploadError(err)
                that.setState({
                    importLock: false,
                })
            })

        } else {
            message.info('请先选择excel文件！');
            return false
        }
    }

    ajaxClearBatch = () => {
        networkApi.clearBatch({
            param: JSON.stringify({ batchTag: BATCHITEM})
            }).then(res => {
            }).catch(err => {
                this.uploadError(err)
            })
    }

    // 导入成功
    uploadSuccess(res) {
        const {messages, showProgress, batchId} = res
        let that = this
        let messageList = messages ? messages : []
        if(showProgress) {
            timer = setTimeout(() => {
                this.apiGetImportResult(batchId)
            }, 5000)
            return
        }

        Modal.info({
            title: '导入信息',
            onOk: () => {
                that.setState({
                    previewText: '请上传excel文件'
                })
            },

            content: <div>
                <p>文件导入成功</p>
                {messageList.map((val, i) => {
                    return (<p key={i}>{val}</p>)
                })}
            </div>
        })
    }

    uploadError(err) {
        let that = this
        if (err.errorCode === '401') {
            bridge.callParent('logout')
            return
        }
        if(err.message == null || err.message == undefined) {
           return message.info('亲，导入模板错误，请下载正确的空白模板。');
        }

        if (err.message.indexOf('[') >= 0) {
            const list = eval(err.message)
            Modal.error({
                title: '错误信息',
                onOk: () => {
                    that.setState({
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
                title: '导入信息',
                onOk: () => {
                    that.setState({
                        previewText: '请上传excel文件'
                    })
                },
                content: <div>{err.message}</div>
            })
        }
    }

    goImportHistory() {
        hashHistory.push(`IMPORT_HISTORY/import_history`)
    }
    goGoodManage() {
        hashHistory.push('/ITEM_EXPORT/item')
    }

    render() {
        const { uploading, total, currentIndex,currentpercent, hasProgress } = this.state;
        const props = {
            action: '//jsonplaceholder.typicode.com/posts/',
            onRemove: (file) => {
                this.setState(({ fileList }) => {
                const index = fileList.indexOf(file);
                const newFileList = fileList.slice();
                newFileList.splice(index, 1);
                return {
                    fileList: newFileList,
                };
                });
            },
            beforeUpload: (file) => {
                if(this.state.fileList.length > 0) {
                    console.log('只能上传一个')
                    return
                }
                this.setState(({ fileList }) => ({
                fileList: [...fileList, file],
                }));
                return false;
            },
            fileList: this.state.fileList,
        };
        return (
            <div>
                <div>
                <Modal
                    visible={hasProgress}
                    footer={null}
                    closable= {false}
                    >
                    <div className={styles.itemList}>
                        <p>导入进度：{currentIndex} / {total}</p>
                        <Progress percent={currentpercent}/>
                    </div>
                </Modal>
                </div>
                <div className={styles.bread_crumb}>
                    <span className={styles.split_line}></span>
                    <Breadcrumb>
                        <Breadcrumb.Item className={styles.bread_first} onClick={this.goGoodManage}>商品管理</Breadcrumb.Item>
                        <Breadcrumb.Item>商品导入</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className={styles.baseInfo_wrapper}>
                    <text>商品导入</text>
                    <div className={styles.baseInfo_content}>
                        <div className={styles.downModel}>
                            <a onClick={this.handleDownload.bind(this)}>下载空白模板</a>
                        </div>
                        <div className={styles.mb20}>
                            <div className={styles.selectFileTip}>选择上传文件类型</div>
                            <Select defaultValue={this.state.selectValue} size="large" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                                <Option value="no_spec">无规格商品</Option>
                                <Option value="spec">多规格商品</Option>
                            </Select>
                        </div>
                        <div>
                            <input
                            type='file' name='upload'
                            accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            value={this.state.inputVal}
                            onChange={this.uploadChange.bind(this)}/>

                            <div className={styles.selectTip}>无规格商品和多规格商品需分开导入。</div>
                            <Button type="primary" className="upload-demo-start" onClick={this.importExcel.bind(this)}
                                    loading={this.state.importLock} >点击上传</Button>
                        </div>
                        <div className={styles.uploadTip}>只有导入新商品生效，无法导入修改已存在商品。修改商品请前往商品管理或新零售掌柜APP对商品进行编辑；操作完成后，可前往<a className={styles.underLine} onClick={this.goImportHistory.bind(this)}>导入履历</a>页面查看导入结果</div>
                    </div>
                    {this.state.showMask&&<div className={styles.progressWrapper}>
                        <div className={styles.progressContent}>
                            <Progress percent={this.state.percent} showInfo={false} />
                            <div className={styles.progressTip}>商品正在导入中，不可进行其他操作!</div>
                        </div>
                    </div>}
                    {false&&<div className={styles.progressWrapper}>
                        <div className={styles.progressSuccess}>
                            <img src='https://assets.2dfire.com/frontend/f2b1ce391d907404e55a5b520a4aac95.png' width='36px' height='36px'></img>
                            <div className={styles.pb10}>
                                <div className={styles.tipTitle}>商品导入成功</div>
                                <div className={styles.successTip}>本次共导入商品6条，其中5条导入成功维护我和维护维护偶尔人家鸡尾酒欧文我及饿哦就问囧闻奇偶问问为将诶傲迪士尼四季豆我近段时间都是奇偶的酒叟京东is基督教寺ID偶是激动死角地速手动娇我我偶尔囧闻奇偶IE接欧文叫哦我而后问候问候沃尔沃和我而后我，</div>
                                <div className={styles.importButton}>商品导入</div>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}

export default Main
