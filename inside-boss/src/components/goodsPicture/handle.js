/**
 * Created by air on 2017/7/10.
 */
import React, {Component} from 'react'
import {Button, message, Modal, Progress, Icon, Popover, Input, Alert} from 'antd'
import AddPictureBtn from './addPictureBtn'

import styles from './style.css'
import * as action from '../../action'

class Handle extends Component {
    constructor(props) {

        super(props);

        this.state = {
            previewText: '请上传图片',
            importLock: false,
            exportLock: false,
            visible: false,
            importPic: 0,
            importProgress: 0,
            imgUrl: 'https://assets.2dfire.com/frontend/9cc7696eb06429081f8036c5cac31c8a.png',
            show: false
        };
        const {dispatch, data} = this.props;

        this.addImgData = data
    }

    clearFn(e, dispatch) {

        (e !== undefined) && e.preventDefault()

        window.location.reload()
        
    }

    searchName(name) {

        const t = this

        const {dispatch} = t.props
        const { 
            data : {
                brandId,
            }
         } = this.props;
         
        dispatch(action.backPictureList())
        dispatch(action.setSearchName(name))

        dispatch(action.getPictureList(1, name, brandId))
    }
    handleExample = ()=>{
        this.setState(()=>({show:true}))
    }

    render() {

        const t = this

        // const {dispatch} = t.props

        // const showBtn = (t.state.previewText === '请上传图片') ? false : true

        const content = (
            <div style={{width: '500px', color: '#999', padding: '10px 0px'}}>
                <p>图片格式：png,jpeg,jpg,gif；建议使用png格式图片</p>
                <p>图片尺寸：建议比例为5:4（如750*600px）</p>
                <p>图片大小：不可超过10M，至多可添加5张</p>
                <p>注意：系统会在主图中截取正方形区域作为菜单缩略图，以手机实际预览效果为准<span onClick={this.handleExample} className={styles.example} >示例</span></p>
            </div>
        );
        const {data, dispatch, detail} = this.props
        return (
            <div>

                <div className={styles.handleBox}>
                    <div className={styles.t2}>
                        
                        <AddPictureBtn data={data} dispatch={dispatch} imgType="3" loadType="1"/>
                        <AddPictureBtn data={data} dispatch={dispatch} imgType="1" loadType="1"/>
                        
                        <p className={styles.submit}>图片格式要求
                            <Popover content={content} placement="bottom">
                                <Icon type="question-circle-o"
                                      style={{fontSize: '16px', marginLeft: '5px', color: '#d52632'}}/>
                            </Popover>

                        </p>
                        <Input.Search size="large" placeholder="请输入文件夹全称" onSearch={value => t.searchName(value)}
                                      className={styles.searchInput}/>
                    </div>

                    {
                        (() => {
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
                    }

                </div>

                <Alert
                    style={{margin: '20px 0'}}
                    message="注意"
                    description="1、商品主图和商品详情图请分开导入。批量导入的图片名称请跟商品名称保持一致，如果是多张图片请在每张图片后加上@+数字，例如：红烧肉@1，红烧肉@2，红烧肉@3。每个商品主图最多上传5张，超过5张则上传无效。每个商品详情图最多上传24张，超过24张则上传失败。列表页（小图）默认展示商品主图中的第一张。2、列表中商品名称置灰代表头图为空，文件框置灰代表详情图为空。"
                    type="warning"
                    closable
                    showIcon
                />
                <Modal
                    footer={null}
                    visible={this.state.show}
                    width="600px"
                    zIndex="1050"
                    onCancel={()=>this.setState(()=>({show:false}))}
                >
                    <div>
                        <img style={{width:'520px',display:'block',margin:'0 auto'}} src={this.state.imgUrl} alt=""/>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Handle
