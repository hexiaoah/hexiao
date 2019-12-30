import React, { Component } from 'react'
import { Input, Upload, Icon, Form } from 'antd';
import Card from './card'
import styles from './detailPicture.css'
import * as action from "../../action";
import UploadImage from './uploadImage'
import { currentIMGUrl } from '../../utils/env'
const FormItem = Form.Item


class DetailPicture extends Component {
    constructor(props) {
        super(props)
    }
    deleteImg(index) {
        const { detailPicture, dispatch } = this.props
        detailPicture[index].isValid = 0
        dispatch(action.setDetailPicture(detailPicture))
    }
    detailPictureUpload(info) {
        const { detailPicture, dispatch } = this.props 
        if (info.file.status === 'done') {
            const fullPath = info.file.response.data
            const path = fullPath.split(currentIMGUrl)[1] || ''
            const newImg = {
                fullPath,
                id: '',
                isValid: 1,
                path: path,
                sortCode: detailPicture.length + 1,
            }
            detailPicture.push(newImg)
            dispatch(action.setDetailPicture(detailPicture))
        }
    }
    render() {
        const { memo, detailPicture, getFieldDecorator, formItemLayout, chainManageConfig, chain} = this.props
        // 允许门店修改总部下发的商品 editable
        // 并且允许门店将总部下发的商品转为单店的商品 changeToSelf
        const { chainDataManageable, changeToSelf } = chainManageConfig
        // 不可编辑
        const unEdit = (chain === 'true' && chainDataManageable === false && changeToSelf === false)

        const { TextArea } = Input;
        return (
            <Card title="详情图">
                <div className={styles.main}>
                    <div className={styles.detail_item}>
                        <FormItem
                            label="商品介绍"
                            {...formItemLayout}
                        >
                            {
                                getFieldDecorator('memo', {
                                    rules: [{
                                        required: false,
                                    }, {
                                        validator: null
                                    }],
                                    initialValue: memo
                                })(<TextArea placeholder="可在此添加关于商品的文字介绍" style={{ width: 370 }} rows={4} maxLength="250" disabled={unEdit}/>)
                            }
                        </FormItem>
                    </div>
                    <div className={styles.detail_item}>
                        <FormItem
                            label="商品详情图"
                            {...formItemLayout}
                        >
                            <Upload
                                {...UploadImage()}
                                className={styles.picture_upload}
                                accept=".png,.jpeg,.jpg,.gif"
                                listType="picture-card"
                                showUploadList={false}
                                onChange={this.detailPictureUpload.bind(this)}
                                disabled={unEdit}               
                            >
                                {
                                    detailPicture.filter(t => t.isValid === 1).length < 5 && <Icon type="plus" style={{ fontSize: 40, marginTop: 10 }}></Icon>
                                }
                            </Upload>
                            <div className={styles.upload_list}>
                                {
                                    detailPicture.map((item, index) => {
                                        return (
                                            item.isValid === 1 ?
                                            <div className={styles.img_item} key={index}>
                                                <img className={styles.image} src={item.fullPath} />
                                                { !unEdit && <div className={styles.mask}></div>}
                                                { !unEdit && <Icon type="delete" style={{ fontSize: 20, color: '#fff' }} className={styles.icon_delete} onClick={() => { this.deleteImg(index) }} />}
                                            </div>
                                            : null
                                        )
                                    })
                                }
                            </div>
                            <div className={styles.upload_tips}>至多添加5张图片;图片格式为png,jpeg,jpg,gif;建议使用png格式图片，以保证最佳效果；上传彩色图片；建议图片尺寸为5：4</div>
                        </FormItem>
                    </div>
                </div>
            </Card>
        )
    }
}

export default DetailPicture