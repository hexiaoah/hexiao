import React, { Component } from 'react'
import { Form, Select, Input, Switch, Cascader, Upload, Icon, Message } from 'antd'
import Card from './card'
import classnames from 'classnames'
import styles from './baseInfo.css'
import Format from './format'
import UploadImage from '../goodEdit/uploadImage'
import * as action from "../../action";
import { currentIMGUrl } from '../../utils/env'
import * as bridge from '../../utils/bridge'

const Option = Select.Option
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};
class BaseInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // 新建分类弹窗展示
            isShowAddCatePop: false,
            // 新建单位弹窗展示
            // isShowAddUnitPop: false,
            // 运费模版
            freightOptions: [
                {
                    label: '统一运费',
                    value: '1'
                },
                {
                    label: '运费模版',
                    value: '2'
                }
            ],
            // 新建分类信息
            newCate: {
                classifyId: '', // 销售额归类
                parentId: '', // 上级分类
                categoryName: '', // 商品分类
                cateCode: '' // 分类编码
            },
            // 新建单位信息
            newUnit: '',
            templateMode: 0
        }
    }
    // 显示/隐藏商品分类选择浮层的回调
    onPopupVisibleChange(value) {
        const { entityType, goodCategory, dispatch } = this.props
        let selfCategory = []
        if (value && entityType !== '1') {
            selfCategory = {
                categoryList: Format.formatSelfCategory(
                    goodCategory.categoryList
                )
            }
            dispatch(action.setGoodCategory(selfCategory))
        }
    }
    _refresh(type) {
        const { dispatch } = this.props
        if (type === 'kind') {
            dispatch(action.getGoodCategory())
            Message.info('商品分类刷新成功')
        } else {
            dispatch(action.getGoodUnitList())
            Message.info('结账单位刷新成功')
        }
    }
    // 上级分类
    _handleAddCateSelect(e) {
        const { newCate } = this.state
        newCate.parentId = e.target.value
        this.setState({
            newCate
        })
    }
    // 展示新建分类或者新建单位弹窗
    _showKindOrUnitModal(type) {
        if (type === 'kind') {
            this.setState({
                isShowAddCatePop: true
            })
        } else if (type === 'unit') {
            this.setState({
                isShowAddUnitPop: true
            })
        }
    }
    // 关闭新建分类或者新建单位弹窗
    _hideKindOrUnitModal(type) {
        if (type === 'kind') {
            this.setState({
                isShowAddCatePop: false
            })
        } else if (type === 'unit') {
            this.setState({
                isShowAddUnitPop: false
            })
        }
    }
    // 上传商品主图
    uploadHeadPicture(info) {
        const { headPicture, dispatch } = this.props
        if (info.file.status === 'done') {
            const fullPath = info.file.response.data
            const path = fullPath.split(currentIMGUrl)[1]
            const newImg = {
                fullPath,
                id: '',
                isValid: 1,
                path: path,
                sortCode: headPicture.length + 1
            }
            headPicture.push(newImg)
            dispatch(action.setHeadPicture(headPicture))
        }
    }
    /**
     * 修改分类编码
     */
    _changeCateCode(e) {
        const { newCate } = this.state
        newCate.cateCode = e.target.value
        this.setState({
            newCate
        })
    }
    // 销售额归属分类
    _handleAddCateClassify(e) {
        const { newCate } = this.state
        newCate.classifyId = e.target.value
        this.setState({
            newCate,
            chargingMode: 0
        })
    }
    // 关闭新建分类或者新建单位弹窗
    _hideKindOrUnitModal(type) {
        if (type === 'kind') {
            this.setState({
                isShowAddCatePop: false
            })
        } else if (type === 'unit') {
            this.setState({
                isShowAddUnitPop: false
            })
        }
    }
    // 新建分类
    _addNewCategory() {
        const { dispatch } = this.props
        const { newCate } = this.state
        const { cateCode, categoryName, classifyId, parentId } = newCate
        const params = {
            industry: 3,
            req: JSON.stringify({
                code: cateCode,
                name: categoryName,
                parentId: parentId,
                groupCategoryId: classifyId
            })
        }
        dispatch(action.addNewCategory(params))
        this._hideKindOrUnitModal('kind')
    }
    /**
     * 改变商品分类
     */
    _changeCateName(e) {
        const { newCate } = this.state
        newCate.categoryName = e.target.value
        this.setState({
            newCate
        })
    }
        /**
     * 检查运费输入是否合法
     */
    checkFreightCost(rule, value, callback) {
        const reg = /^\d*(?:\.\d{0,2})?$/
        if (value) {
            const valueStr = value.toString()
            if ((!reg.test(valueStr.trim()) || valueStr.split('.')[0].length > 6 )) {
                callback('运费只能输入数字并且整数位最多六位,小数位最多保留两位')
            }
        }
        callback()
    }
       // 切换快递运费
    freightTypeChange(value) {
        // console.log(value,'value')
        const { baseInfo,dispatch} = this.props
        if (value === '2') {
            baseInfo.freightType = 2
        } else {
            baseInfo.freightType = 1
        }
        baseInfo.freightNumber = null
        dispatch(action.setCombinedGoodDetail(baseInfo))

    }

    freightModelChange(value) {
        const { freightTemplate = [], baseInfo, setFieldsValue } = this.props
        const template = freightTemplate.filter(item => item.idStr == value)
        const mode = template[0].chargingMode
        baseInfo.freightDescription = template[0].description
        baseInfo.freightModelName = template[0].name
        this.setState({
            templateMode: mode
        })
        // 切换运费模版时 子项数量只为空
        setFieldsValue({
            ['freightNumber']: null
        })
    }
        // 运费模版聚焦的回调
    freightModeFocus() {
        const { freightTemplate = [] } = this.props
        if (freightTemplate.length === 0) {
            Message.error('你还未配置运费模板，请前往掌柜APP配置')
        }
    }
    render() {
        const {
            goodCategory = [],
            headPicture = [],
            getFieldDecorator,
            baseInfo = {},
            unitList=[],
            freightTemplate = []
        } = this.props
        console.log(headPicture, 'headPicture')
        const { isShowAddCatePop, newCate, uploadData } = this.state
        const categoryList = Format.formatCatogoryList(goodCategory)
        const cateFlat = Format.formatCateListFlat(
            goodCategory.categoryList || []
        )
        const freightType = baseInfo.freightType?baseInfo.freightType:1
        const defaultFreightType = freightType?freightType.toString():'1'
        const {scopeCategoryId = ''} = baseInfo
        const defaultCategory = scopeCategoryId.split('/')
        const res = unitList.filter(t => t.name === '件') || []
        const defaultUnitId = res[0]?res[0].id:''
        return (
            <Card title="基本信息">
                <div className={styles.main}>
                    <div className={styles.main_left}>
                        <div className={classnames([styles.good_category],[styles.mb_10])} >
                            <FormItem label="商品分类" {...formItemLayout}>
                                {getFieldDecorator('categoryEntry', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择商品分类'
                                        }
                                    ],
                                    initialValue: defaultCategory
                                })(
                                    <Cascader
                                        style={{ width: 200 }}
                                        placeholder="选择商品分类"
                                        options={categoryList.children}
                                        onPopupVisibleChange={this.onPopupVisibleChange.bind(this)}
                                    />
                                )}

                                <div className={styles.unit_right}>
                                    <span className={styles.refresh}onClick={() => {this._refresh('kind')}} >刷新</span>
                                    <span className={styles.split}>|</span>
                                    <span className={styles.new}onClick={() => { this._showKindOrUnitModal('kind')}}>新建分类</span>
                                </div>
                            </FormItem>
                        </div>
                        <div className={classnames([styles.good_name],[styles.mb_10])}>
                            <FormItem label="商品名称" {...formItemLayout}>
                                {getFieldDecorator('name', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写商品名称'
                                        },
                                        {
                                            validator: null
                                        }
                                    ],
                                    initialValue: baseInfo.name
                                })(
                                    <Input style={{ width: 200 }}maxLength="21" />
                                )}
                            </FormItem>
                        </div>
                        <div className={classnames([styles.good_unit],[styles.mb_10])}>
                            <FormItem label="结账单位" {...formItemLayout}>
                                {getFieldDecorator('accountId', {
                                    initialValue: baseInfo.accountId || defaultUnitId
                                })(
                                    <Select style={{ width: 200 }} placeholder={baseInfo.account} disabled={baseInfo.account ? true : false }>
                                        {unitList.map((item, index) => {
                                            return (
                                                <Option value={item.id}key={index}>{item.name}</Option>
                                            )
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </div>
                        <div className={classnames([styles.good_code],[styles.mb_10] )}>
                            <FormItem label="商品条码" {...formItemLayout}>
                                {getFieldDecorator('code', {
                                    initialValue: baseInfo.code
                                })(
                                    <Input style={{ width: 200 }} maxLength="20"/>
                                )}
                            </FormItem>
                        </div>
                        <div className={classnames([styles.good_extra],[styles.mb_10])}>
                            <FormItem label="可作为赠品" {...formItemLayout}>
                                {getFieldDecorator('isGive', {
                                    valuePropName: 'checked',
                                    initialValue: baseInfo.isGive === 1
                                })(<Switch />)}
                            </FormItem>
                        </div>
                        <div className={classnames([styles.good_freight],[styles.mb_10])}>
                            <FormItem label="快递运费" {...formItemLayout}>
                                {getFieldDecorator('freightType', {
                                    initialValue: defaultFreightType
                                })(
                                    <Select style={{ width: 200 }}onChange={this.freightTypeChange.bind(this )} >
                                        {this.state.freightOptions.map(
                                            (item, index) => {
                                                return (
                                                    <Option value={item.value} key={index} >{item.label} </Option>
                                                )
                                            }
                                        )}
                                    </Select>
                                )}
                            </FormItem>
                        </div>
                        {freightType == 1 && (
                            <div className={classnames([styles.good_freight],[styles.mb_10])}>
                                <FormItem label="运费(元)" {...formItemLayout}>
                                    {getFieldDecorator('freightCost', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '运费不能为空'
                                            },
                                            {
                                                validator: this.checkFreightCost
                                            }
                                        ],
                                        initialValue:baseInfo.freightNumber || 0
                                    })(<Input style={{ width: 200 }}/>)}
                                </FormItem>
                            </div>
                        )}
                        {freightType === 2 && (
                            <div className={classnames([styles.good_freight],[styles.mb_10] )}>
                                <FormItem label="运费模版" {...formItemLayout}>
                                    {getFieldDecorator('freightModelId', {
                                        initialValue: baseInfo.freightModelId
                                    })(
                                        <Select style={{ width: 200 }} onChange={this.freightModelChange.bind(this)} onFocus={this.freightModeFocus.bind(this)}>
                                            {freightTemplate.map(
                                                (item, index) => {
                                                    return (
                                                        <Option value={item.idStr} key={index}>{item.name}</Option>
                                                    )
                                                }
                                            )}
                                        </Select>
                                    )}
                                </FormItem>
                            </div>
                        )}
                    </div>
                    <div className={styles.main_right}>
                        <div className={styles.good_picture}>
                            <FormItem label="商品主图" {...formItemLayout}>
                                <Upload
                                    {...UploadImage()}
                                    className={styles.picture_upload}
                                    accept=".png,.jpeg,.jpg,.gif"
                                    listType="picture-card"
                                    showUploadList={false}
                                    onChange={this.uploadHeadPicture.bind(this)}
                                    // beforeUpload={this.beforeUpload.bind(this)}
                                    // disabled={unEdit}
                                >
                                    {headPicture.filter(t => t.isValid === 1).length < 5 && (
                                        <Icon type="plus" style={{fontSize: 40,marginTop: 10 }} />
                                    )}
                                </Upload>
                                <div className={styles.upload_list}>
                                    {headPicture.map((item, index) => {
                                        return item.isValid === 1 ? (
                                            <div  className={styles.img_item} key={index} >
                                                <img className={styles.image} src={item.fullPath}/>
                                                {<div className={styles.mask}></div>}
                                                {<Icon type="delete" style={{ fontSize: 20, color: '#fff' }} className={ styles.icon_delete } onClick={() => {this.deleteImg(index) }}/>}
                                            </div>
                                        ) : null
                                    })}
                                </div>
                                <div className={styles.upload_tips}>
                                    至多添加5张图片;图片格式为png,jpeg,jpg,gif;建议使用png格式图片，以保证最佳效果；上传彩色图片；建议图片尺寸为5：4
                                </div>
                            </FormItem>
                        </div>
                    </div>
                </div>
                {/* 商品分类添加弹窗 */}
                {isShowAddCatePop && (
                    <div className={styles.add_cate_container}>
                        <div className={styles.add_cate_bg} onClick={() => this._hideKindOrUnitModal('kind')}/>
                        <div className={styles.add_cate_box}>
                            <div className={styles.add_cate_title}>
                                商品分类添加
                            </div>
                            <div className={styles.add_base_conf}>基础设置</div>
                            <div className={styles.add_cate_item}>
                                <span>商品分类</span>
                                <input type="text" value={newCate.categoryName || ''} onChange={this._changeCateName.bind(this)}/>
                            </div>
                            <div className={styles.add_cate_item}>
                                <span>上级分类</span>
                                <Select placeholder="无上级分类" onChange={this._handleAddCateSelect.bind(this)} style={{ width: 200 }}>
                                    <option value="">无上级分类</option>
                                    {cateFlat.map(item => {
                                        return (
                                            <Option value={item.id}key={item.id}> {item.name}</Option>
                                        )
                                    })}
                                </Select>
                            </div>
                            <div className={styles.add_cate_item}>
                                <span>分类编码</span>
                                <input type="text" value={newCate.cateCode || ''} onChange={this._changeCateCode.bind(this)}/>
                            </div>
                            <div className={styles.add_high_conf}>高级设置</div>
                            <div className={styles.add_cate_item}>
                                <span>销售额归到其他分类</span>
                                <Select placeholder="不设置" style={{ width: 200 }} onChange={this._handleAddCateClassify.bind( this )}>
                                    <Option value="">不设置</Option>
                                    {cateFlat.map(item => {
                                        return (
                                            <Option value={item.id} key={item.id}>{item.name} </Option>
                                        )
                                    })}
                                </Select>
                            </div>
                            <div className={styles.add_cate_bottom}>
                                <div className={styles.btn_cancel}onClick={() =>this._hideKindOrUnitModal('kind')}>取消</div>
                                <div className={styles.btn_save}onClick={() => this._addNewCategory()}>
                                    保存
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Card>
        )
    }
}

export default BaseInfo
