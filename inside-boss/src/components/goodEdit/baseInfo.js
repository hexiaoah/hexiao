import React, { Component } from 'react'
import { Form, Select, Input, Switch, Cascader, Upload, Icon, Message } from 'antd'
import Card from './card'
import classnames from 'classnames'
import styles from './baseInfo.css'
import Format from './format'
import UploadImage from './uploadImage'
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
                    value: '1',
                },
                {
                    label: '运费模版',
                    value: '2',
                }
            ],
            // 新建分类信息
            newCate: {
                classifyId: '', // 销售额归类
                parentId: '', // 上级分类
                categoryName: '', // 商品分类
                cateCode: '', // 分类编码
            },
            // 新建单位信息
            newUnit: '',
            templateMode: 0,
        }
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
    // 切换快递运费
    freightTypeChange(value) {
        const { baseInfo } = this.props
        if (value === '2') {
            baseInfo.freightType = 2
        } else {
            baseInfo.freightType = 1
        }
        baseInfo.freightNumber = null
    }
    // 切换是否为散称食品
    isTwoAccountChange(checked) {
        const { baseInfo } = this.props
        const { freightType } =baseInfo
        // 选中时 不展示邮费相关信息
        if (checked) {
            baseInfo.isTwoAccount = 1
        } else {
            if (freightType === 0) {
                baseInfo.freightType = 1
            }
            baseInfo.isTwoAccount = 0
        }
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
    // 检验商品条码
    checkCode(rule, value, callback) {
        const reg1 = /^[A-Za-z0-9]+$/
        if (value && !reg1.test(value.trim())) {
            callback('商品条码只能输入数字和字母')
        } else {
            callback()
        }
    }

    numCheck(rule, value, callback){
        const reg1 = /^-?(0|[1-9][0-9]*)(\[0-9]*)?$/

        if( value == undefined || value.length == 0) {
          return callback('保质期天数不能为空')
        }
        if (value && !reg1.test(value.trim())) {
           return callback('保质期天数只能输入自然数')
        }
        callback()
    }
    /**
    * 改变商品分类
    */
    _changeCateName(e) {
        const { newCate } = this.state
        newCate.categoryName = e.target.value
        this.setState({
            newCate,
        })
    }
    /**
     * 修改分类编码
     */
    _changeCateCode(e) {
        const { newCate } = this.state
        newCate.cateCode = e.target.value
        this.setState({
            newCate,
        })
    }
    // 上级分类
    _handleAddCateSelect(e) {
        const { newCate } = this.state
        newCate.parentId = e.target.value
        this.setState({
            newCate,
        })
    }

    // 销售额归属分类
    _handleAddCateClassify(e) {
        const { newCate } = this.state
        newCate.classifyId = e.target.value
        this.setState({
            newCate,
            chargingMode: 0,
        })
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
                groupCategoryId: classifyId,

            })
        }
        dispatch(action.addNewCategory(params))
        this._hideKindOrUnitModal('kind')
    }
    // _changeNewUnit(e) {
    //     const value = e.target.value
    //     this.setState({
    //         newUnit: value
    //     })
    // }
    // 新建单位
    // _addNewUnit() {
    //     const { dispatch } = this.props
    //     const { newUnit } = this.state
    //     dispatch(action.addNewUnit(newUnit))
    //     this._hideKindOrUnitModal('unit')
    // }
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
    // 删除照片
    deleteImg(index) {
        const { headPicture, dispatch } = this.props
        headPicture[index].isValid = 0
        dispatch(action.setHeadPicture(headPicture))
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
                sortCode: headPicture.length + 1,
            }
            headPicture.push(newImg)
            dispatch(action.setHeadPicture(headPicture))
        }
    }
    /**
     * 检查运费模版子项是否输入合法
     */
    checkFreightNumber(rule, value, callback) {
        const { templateMode } = this.state
        const { baseInfo, freightTemplate } = this.props
        const { freightModelId } = baseInfo
        const modefilter = freightTemplate.filter(item => item.idStr === freightModelId )
        let tempMode = templateMode ? templateMode : modefilter[0].chargingMode
        const reg1 = /^\d{1,6}$/
        const reg2 = /^\d*(?:\.\d{0,2})?$/
        if (tempMode == 1) {
            if (value) {
                const valueStr = value.toString()
                if (!reg1.test(valueStr.trim()))
                callback('物流件数只能输入六位以内的整数')
            }
        } else {
            if (value){
                const valueStr = value.toString()
                if (!reg2.test(valueStr.trim()) || valueStr.split('.')[0].length > 6) {
                    if (tempMode == 2) {
                        callback('物流重量只能输入数字并且整数位最多六位,小数位最多保留两位')
                    } else {
                        callback('物流体积只能输入数字并且整数位最多六位,小数位最多保留两位')
                    }
                }
            }
        }
        callback()
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
    // 显示/隐藏商品分类选择浮层的回调
    onPopupVisibleChange(value) {
        const { entityType, goodCategory, dispatch } = this.props
        let selfCategory = []
        if (value && entityType !== '1') {
            selfCategory = {
                categoryList: Format.formatSelfCategory(goodCategory.categoryList)
            }
            dispatch(action.setGoodCategory(selfCategory))
        }
    }
    // 运费模版聚焦的回调
    freightModeFocus() {
        const { freightTemplate = [] } = this.props
        if (freightTemplate.length === 0) {
            Message.error('你还未配置运费模板，请前往掌柜APP配置')
        }
    }

    shelfLifePreview = () => {
        const { baseInfo = {}, chain } = this.props
        // chain true:下发商品，false: 自建商品
        /**
         * 如果业务逻辑不清楚可以看下PRD文档 http://k.2dfire.net/pages/viewpage.action?pageId=524846331
        */
       // entityType: 0=单店 1=连锁总部 2=连锁下的门店 3=分公司 4=商圈
       const { entityType } = bridge.getInfoAsQuery()
       const hasShow = this.hasItemShelfLifeConfig()
        return (entityType == 2 && chain == 'true') ? this.issuedPreview(baseInfo) :  this.common(hasShow)
    }

    issuedPreview = (baseInfo) => {
        // 门店下发商品
        const hasShow = this.hasItemShelfLifeConfig() // 门店保质期管理策略
        const baseVo = baseInfo.chainManageableBaseVo || {}
        // hangeToSelf:允许门店下发商品转自建
        return (
            baseVo.changeToSelf ? this.common(hasShow) : this.branchCommon()
        )
    }


    shelfLifeChang = (checked) => {
        const { baseInfo } = this.props
        if (checked) {
            baseInfo.isShelfLife = '1'
        } else {
            baseInfo.isShelfLife = '0'
        }
    }

    common = (bloon ) => {
        const { getFieldDecorator, baseInfo = {} } = this.props
        const isShelfLife = !!Number(baseInfo.isShelfLife) ? true : false
        return (
            bloon &&
            <div>
                <FormItem
                    label="是否设置保质期"
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('isShelfLife', { valuePropName: 'checked', initialValue: isShelfLife })(<Switch onChange={this.shelfLifeChang} />)
                    }
                </FormItem>
                { isShelfLife &&
                    <FormItem
                        label="保质期天数："
                        {...formItemLayout}
                    >
                        {
                            getFieldDecorator('shelfLife', {
                                rules: [{
                                    required: false,
                                },
                                {
                                    validator: this.numCheck
                                }
                            ],
                                initialValue: baseInfo.shelfLife
                            })(<Input style={{ width: 200 }} maxLength="4" />)
                        }
                    </FormItem>
                }
            </div>
        )
    }

    branchCommon = () => {
        const { getFieldDecorator, baseInfo = {} } = this.props
        const hasItemShelfLifeConfig = !!baseInfo.itemShelfLifeConfig && baseInfo.itemShelfLifeConfig == '1'
        const isShelfLife = !!Number(baseInfo.isShelfLife) ? true : false
        return (
            hasItemShelfLifeConfig &&
            <div>
                <FormItem
                    label="是否设置保质期"
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('isShelfLife', { valuePropName: 'checked', initialValue: isShelfLife })(<Switch disabled = {true} onChange={this.shelfLifeChang} />)
                    }
                </FormItem>
                { isShelfLife &&
                    <FormItem
                        label="保质期天数："
                        {...formItemLayout}
                    >
                        {
                            getFieldDecorator('shelfLife', {
                                rules: [{
                                    required: false,
                                },
                                {
                                    validator: this.numCheck
                                }
                            ],
                                initialValue: baseInfo.shelfLife
                            })(<Input style={{ width: 200 }} disabled ={true} maxLength="4" />)
                        }
                    </FormItem>
                }
            </div>
        )
    }

    hasItemShelfLifeConfig = () => {
        const { strategy } = this.props
        const hasStrategy = Object.keys(strategy).length > 0
        // 保质期策略：itemShelfLifeConfig， 1： 有设置保质期管理策略， 2：无保质期策略
        return hasStrategy && strategy.itemShelfLifeConfig == '1'
    }

    render() {
        const { isShowAddCatePop, newCate, uploadData, } = this.state
        const { unitList = [], baseInfo = {}, headPicture = [], goodCategory = [], getFieldDecorator, freightTemplate = [], chain, entityType } = this.props
        console.log(headPicture, 'headPicture')
        console.log(this.props,'data')
        const { scopeCategoryId = '', freightType, chainManageableBaseVo = {} } = baseInfo
        // 允许门店修改总部下发的商品 editable
        // 并且允许门店将总部下发的商品转为单店的商品 changeToSelf
        const { chainDataManageable, changeToSelf, addible } = chainManageableBaseVo
        // 可修改连锁下发
        const canEditSelf = chain === 'true' && chainDataManageable
        // 不可编辑
        const unEdit = (chain === 'true' && chainDataManageable === false && changeToSelf === false)

        const defaultCategory = scopeCategoryId.split('/')
        const defaultFreightType = freightType?freightType.toString():'1'
        const categoryList = Format.formatCatogoryList(goodCategory)
        const cateFlat = Format.formatCateListFlat(goodCategory.categoryList || [])
        return (
            <Card title="基本信息">
                <div className={styles.main}>
                    <div className={styles.main_left}>
                        <div className={classnames([styles.good_category], [styles.mb_10])}>
                            <FormItem
                                label="商品分类"
                                {...formItemLayout}
                            >
                                {
                                    getFieldDecorator('categoryEntry', {
                                        rules: [{
                                            required: true,
                                            message: '请选择商品分类'
                                        }],
                                        initialValue: defaultCategory
                                    })(
                                        <Cascader style={{ width: 200 }} placeholder="选择商品分类" options={categoryList.children} disabled={unEdit || canEditSelf} onPopupVisibleChange={this.onPopupVisibleChange.bind(this)} />
                                    )
                                }
                                {
                                    addible &&
                                    <div className={styles.unit_right}>
                                        <span className={styles.refresh} onClick={() => { this._refresh('kind') }}>刷新</span>
                                        <span className={styles.split}>|</span>
                                        <span className={styles.new} onClick={() => { this._showKindOrUnitModal('kind') }}>新建分类</span>
                                    </div>
                                }

                            </FormItem>
                        </div>
                        <div className={classnames([styles.good_name], [styles.mb_10])}>
                            <FormItem
                                label="商品名称"
                                {...formItemLayout}
                            >
                                {
                                    getFieldDecorator('name', {
                                        rules: [{
                                            required: true,
                                            message: '请填写商品名称',
                                        }, {
                                            validator: null
                                        }],
                                        initialValue: baseInfo.name
                                    })(<Input style={{ width: 200 }} maxLength="21" disabled={unEdit || canEditSelf} />)
                                }
                            </FormItem>
                        </div>
                        <div className={classnames([styles.good_unit], [styles.mb_10])}>
                            {
                                baseInfo.account &&
                                <FormItem
                                    label="结账单位"
                                    {...formItemLayout}
                                >
                                    {
                                        getFieldDecorator('accountId', {
                                            initialValue: baseInfo.accountId
                                        })(
                                            <Select style={{ width: 200 }} disabled  placeholder={baseInfo.account}>
                                                {
                                                    unitList.map((item, index) => {
                                                        return (
                                                            <Option value={item.id} key={index}>{item.name}</Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        )
                                    }
                                    {/* <div className={styles.unit_right} >
                                        <span className={styles.refresh} onClick={() => { this._refresh('unit') }}>刷新</span>
                                        <span className={styles.split}>|</span>
                                        <span className={styles.new} onClick={() => { this._showKindOrUnitModal('unit') }}>新建单位</span>
                                    </div> */}
                                </FormItem>
                            }
                        </div>
                        <div className={classnames([styles.good_code], [styles.mb_10])}>
                            <FormItem
                                label="商品条码"
                                {...formItemLayout}
                            >
                                {
                                    getFieldDecorator('code', {
                                        rules: [{
                                            required: false,
                                        }, {
                                            validator: this.checkCode
                                        }],
                                        initialValue: baseInfo.code
                                    })(<Input style={{ width: 200 }} maxLength="20" disabled={unEdit || canEditSelf} />)
                                }
                            </FormItem>
                        </div>
                        <div className={classnames([styles.good_extra], [styles.mb_10])}>
                            <FormItem
                                label="可作为赠品"
                                {...formItemLayout}
                            >
                                {
                                    getFieldDecorator('isGive', { valuePropName: 'checked', initialValue: baseInfo.isGive === 1 })(<Switch disabled={unEdit} />)
                                }
                            </FormItem>
                        </div>
                        <div className={classnames([styles.good_extra], [styles.mb_10])}>
                            {this.shelfLifePreview()}
                        </div>
                        <div className={classnames([styles.good_extra], [styles.mb_10])}>
                            <FormItem
                                label="散称商品"
                                {...formItemLayout}
                            >
                                {
                                    getFieldDecorator('isTwoAccount', { valuePropName: 'checked', initialValue: baseInfo.isTwoAccount === 1 })(<Switch onChange={this.isTwoAccountChange.bind(this)} disabled={unEdit} />)
                                }
                            </FormItem>
                        </div>
                        {
                            baseInfo.isTwoAccount === 0 && entityType !== '1' &&
                            <div>
                                <div className={classnames([styles.good_freight], [styles.mb_10])}>
                                    <FormItem
                                        label="快递运费"
                                        {...formItemLayout}
                                    >
                                        {
                                            getFieldDecorator('freightType', {
                                                initialValue: defaultFreightType
                                            })(
                                                <Select style={{ width: 200 }} onChange={this.freightTypeChange.bind(this)}>
                                                    {
                                                        this.state.freightOptions.map((item, index) => {
                                                            return (
                                                                <Option value={item.value} key={index}>{item.label}</Option>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            )
                                        }
                                    </FormItem>
                                </div>
                                {
                                    baseInfo.freightType == 1 &&
                                    <div className={classnames([styles.good_freight], [styles.mb_10])}>
                                        <FormItem
                                            label="运费(元)"
                                            {...formItemLayout}
                                        >
                                            {
                                                getFieldDecorator('freightCost', {
                                                    rules: [{
                                                        required: true,
                                                        message: '运费不能为空'
                                                    }, {
                                                        validator: this.checkFreightCost
                                                    }],
                                                    initialValue: baseInfo.freightNumber
                                                })(<Input style={{ width: 200 }} />)
                                            }
                                        </FormItem>
                                    </div>
                                }

                                {
                                    baseInfo.freightType === 2 &&
                                    <div className={classnames([styles.good_freight], [styles.mb_10])}>
                                        <FormItem
                                            label="运费模版"
                                            {...formItemLayout}
                                        >
                                            {
                                                getFieldDecorator('freightModelId', {
                                                    initialValue: baseInfo.freightModelId
                                                }
                                                )(
                                                    <Select style={{ width: 200 }} onChange={this.freightModelChange.bind(this)} onFocus={this.freightModeFocus.bind(this)}>
                                                        {
                                                            freightTemplate.map((item, index) => {
                                                                return (
                                                                    <Option value={item.idStr} key={index}>{item.name}</Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                )
                                            }
                                        </FormItem>
                                    </div>
                                }
                                {
                                    baseInfo.freightType === 2 && baseInfo.freightDescription &&
                                    <div className={classnames([styles.good_freight], [styles.mb_10])}>
                                        <FormItem
                                            label={baseInfo.freightDescription}
                                            {...formItemLayout}
                                        >
                                            {
                                                getFieldDecorator('freightNumber', {
                                                    rules: [{
                                                        required: true,
                                                        message: `${baseInfo.freightDescription}不能为空`
                                                    }, {
                                                        validator: this.checkFreightNumber.bind(this)
                                                    }],
                                                    initialValue: baseInfo.freightNumber
                                                })(<Input style={{ width: 200 }} />)
                                            }
                                        </FormItem>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                    <div className={styles.main_right}>
                        <div className={styles.good_picture}>
                            <FormItem
                                label="商品主图"
                                {...formItemLayout}
                            >
                                <Upload
                                    {...UploadImage()}
                                    className={styles.picture_upload}
                                    accept=".png,.jpeg,.jpg,.gif"
                                    listType="picture-card"
                                    showUploadList={false}
                                    onChange={this.uploadHeadPicture.bind(this)}
                                    // beforeUpload={this.beforeUpload.bind(this)}
                                    disabled={unEdit}
                                >
                                    {
                                        headPicture.filter(t => t.isValid === 1).length < 5 &&
                                        <Icon type="plus" style={{ fontSize: 40, marginTop: 10 }} />
                                    }
                                </Upload>
                                <div className={styles.upload_list}>
                                    {
                                        headPicture.map((item, index) => {
                                            return (
                                                item.isValid === 1 ?
                                                    <div className={styles.img_item} key={index}>
                                                        <img className={styles.image} src={item.fullPath} />
                                                        {!unEdit && <div className={styles.mask}></div>}
                                                        {!unEdit && <Icon type="delete" style={{ fontSize: 20, color: '#fff' }} className={styles.icon_delete} onClick={() => { this.deleteImg(index) }} />}
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
                </div>
                {/* 商品分类添加弹窗 */}
                {
                    isShowAddCatePop &&
                    <div className={styles.add_cate_container}>
                        <div className={styles.add_cate_bg} onClick={() => this._hideKindOrUnitModal('kind')}></div>
                        <div className={styles.add_cate_box}>
                            <div className={styles.add_cate_title}>商品分类添加</div>
                            <div className={styles.add_base_conf}>基础设置</div>
                            <div className={styles.add_cate_item}>
                                <span>商品分类</span>
                                <input type="text" value={newCate.categoryName || ''} onChange={this._changeCateName.bind(this)} />
                            </div>
                            <div className={styles.add_cate_item}>
                                <span>上级分类</span>
                                <Select
                                    placeholder="无上级分类"
                                    onChange={this._handleAddCateSelect.bind(this)}
                                    style={{ width: 200 }}>
                                    <option value="">无上级分类</option>
                                    {
                                        cateFlat.map(item => {
                                            return (
                                                <Option value={item.id} key={item.id}>{item.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                            <div className={styles.add_cate_item}>
                                <span>分类编码</span>
                                <input type="text" value={newCate.cateCode || ''} onChange={this._changeCateCode.bind(this)} />
                            </div>
                            <div className={styles.add_high_conf}>高级设置</div>
                            <div className={styles.add_cate_item}>
                                <span>销售额归到其他分类</span>
                                <Select
                                    placeholder="不设置"
                                    style={{ width: 200 }}
                                    onChange={this._handleAddCateClassify.bind(this)}>
                                    <Option value="">不设置</Option>
                                    {
                                        cateFlat.map(item => {
                                            return (
                                                <Option value={item.id} key={item.id}>{item.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                            <div className={styles.add_cate_bottom}>
                                <div className={styles.btn_cancel} onClick={() => this._hideKindOrUnitModal('kind')}>取消</div>
                                <div className={styles.btn_save} onClick={() => this._addNewCategory()}>保存</div>
                            </div>
                        </div>
                    </div>
                }
                {/* 单位添加弹窗 */}
                {
                    // isShowAddUnitPop &&
                    // <div className={styles.add_spec_container}>
                    //     <div className={styles.box_bg} onClick={() => this._hideKindOrUnitModal('unit')}></div>
                    //     <div className={styles.add_spec_box}>
                    //         <div className={styles.add_title}>添加单位</div>
                    //         <div className={styles.add_spec_name}>
                    //             <span>单位名称</span>
                    //             <input type="text" value={newUnit} onChange={this._changeNewUnit.bind(this)} />
                    //         </div>

                    //         <div className={styles.add_spec_bottom}>
                    //             <div className={styles.btn_cancel} onClick={() => this._hideKindOrUnitModal('unit')}>取消</div>
                    //             <div className={styles.btn_save} onClick={() => this._addNewUnit()}>保存</div>
                    //         </div>
                    //     </div>
                    // </div>
                }
            </Card>
        )
    }
}

export default BaseInfo
