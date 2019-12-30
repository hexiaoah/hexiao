import React, { Component } from 'react'
import { Radio, Input, Popover, Form, DatePicker,LocaleProvider } from 'antd'
import moment from 'moment'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const { TextArea } = Input
import styles from './moduleTag.css'
import * as action from '../../action'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import 'moment/locale/zh-cn'
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
}

class EditBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customTextErrorTip: '', // 自定义文本框的错误提示
            isShowTitleEditInput: false,
            showDefaultInput: false,
            textAreaWordLength: 0,
        }
    }
    componentWillReceiveProps(nextProps) {
           this.setState({
                showDefaultInput: nextProps.moduleDetail.templateType===1?false:true
           })
    }
    radioCheckMap = {
        name: 'goodsNameType',
        barCode: 'goodsBarCodeType',
        retailPrice: 'goodsRetailPriceType',
        memberPrice: 'goodsMemberPriceType',
        unit: 'goodsUnitType',
        shelfLife: 'goodsPeriodType',
        productDate: 'goodsManufactureType',
        customText: 'definitionType',
        specifications: 'goodsSpecificationType'
    }
    textMap = {
        name: 'goodsNameExt',
        retailPrice: 'goodsRetailPriceExt',
        memberPrice: 'goodsMemberPriceExt',
        unit: 'goodsUnitExt',
        shelfLife: 'goodsPeriodExt',
        productDate: 'goodsManufactureExt',
        productDateContent: 'goodsManufacture',
        customText: 'definitionExt',
        specifications: 'goodsSpecificationExt'
    }
    // input框中默认的提示字段
    moduleSettings = {
        name: '商品名称',
        barCode: '商品条码',
        specifications: '规格',
        retailPrice: '零售价',
        memberPrice: '会员价',
        unit: '单位',
        shelfLife: '保质期',
        productDate: '生产日期',
        customText: '自定义文字'
    }
    // 编辑内容为打印标题或内容的字段类型
    showTitleList = [
        'name',
        'specifications',
        'retailPrice',
        'shelfLife',
        'productDate',
        'memberPrice',
        'unit'
    ]
    // 编辑内容为打印条码的字段类型
    showBarCodeList = ['barCode']
    // 编辑内容为自定义 textarea 的字段类型
    showTextAreaList = ['customText']

    // 限制文本框中的文字个数
    handleTextareaChange(e) {
        const t = this
        if (e.target.value.length > 20) {
            t.setState({
                customTextErrorTip: '文字长度不能超过20个'
            })
        } else {
            t.setState({
                customTextErrorTip: ''
            })
        }
    }
    changeItem(content,e){
        const { dispatch, moduleDetail = {}, type } = this.props
        switch (content.type) {
            case 'radio':
                this.setState({
                    isShowTitleEditInput: true
                })
                const willChangeType = this.radioCheckMap[type]
                moduleDetail[willChangeType] = content.value
                switch (content.value) {
                    case 1:
                        this.setState({
                            showDefaultInput: true
                        })
                        const willChangeText = this.textMap[type]
                        moduleDetail[willChangeText] = this.moduleSettings[type]
                        break
                    case 2:
                        this.setState({
                            showDefaultInput: false
                        })
                        const willclearText = this.textMap[type]
                        moduleDetail[willclearText] = 'del'
                        break
                }
                break
            case 'title':
                const changeValue = e.target.value
                const willChangeText = this.textMap[type]
                if (changeValue === '') {
                    moduleDetail[willChangeText] = 'del'
                } else {
                    moduleDetail[willChangeText] = changeValue
                }
                break;
            case 'customText':
                const value = e.target.value
                if(value===''){
                    moduleDetail.definitionExt='del'
                }else{
                    moduleDetail.definitionExt = value
                }
                this.setState({
                    textAreaWordLength: e.target.value.length
                })
                break
            case 'productDateContent':
                moduleDetail.goodsManufacture = moment(e).format('YYYY-MM-DD')==='Invalid date'?'2019-01-01':moment(e).format('YYYY-MM-DD')
                break
            case 'code':
                moduleDetail.goodsBarCodeType = content.value
                break
        }

        dispatch(action.setModuleDetail(moduleDetail))
    }
    hiddenInput() {
        this.setState({
            isShowTitleEditInput: false
        })
    }
    render() {
        const {
            type,
            getFieldDecorator,
            showEditArea,
            radioCheck,
            moduleDetail = {},
            changeCodeImg,
        } = this.props
        const radioValue = moduleDetail[radioCheck]
        const { showDefaultInput,textAreaWordLength } = this.state
        const showProductDate = (type ==='productDate')
        // 显示标题内容模块
        const showTitle = this.showTitleList.indexOf(type) >= 0
        // 显示自定义文本框模块
        const showTextArea = this.showTextAreaList.indexOf(type) >= 0
        // 显示条形码模块
        const showBarCode = this.showBarCodeList.indexOf(type) >= 0
        const {definitionExt=''} = moduleDetail
        const initTextAreaWordLength = definitionExt==='del'?0:definitionExt.length
        const titleContentAnswer = (
            <div>
                <p>
                    打印出来的内容包含标题和内容两部分。如：“商品名称：绿箭口香糖”
                </p>
            </div>
        )
        const contentAnswer = (
            <div>
                <p>打印出来的内容仅包含内容。如：“绿箭口香糖”</p>
            </div>
        )
        const showEditInputflag = radioValue === 1 ? true : false
        const  defaultTip = moduleDetail.templateType===1?'请输入内容':'产地'
        return (
            <div className={styles.moduleSettings}>
                {showEditArea && (
                    <div className={styles.moduleSettingsText}>模板属性</div>
                )}
                {showEditArea && (
                    <div className={styles.goodModuleEditArea}>
                        <span className={styles.goodModuleEditTitle}>
                            {this.moduleSettings[type]}
                        </span>
                        <div className={styles.line}></div>
                        {showTitle && (
                            <div>
                                <FormItem>
                                    {getFieldDecorator(`${type}Radio`, {
                                        initialValue: radioValue
                                    })(
                                        <RadioGroup name="radiogroup">
                                            <div className={styles.titleContent}>
                                                <Radio name="titleCheck"onClick={this.changeItem.bind(this,{value:1,type:'radio'})} value={1} />
                                                打印标题和内容
                                                <Popover placement="bottomLeft"content={titleContentAnswer}trigger="click">
                                                    <img src="https://assets.2dfire.com/frontend/63de89515818f99c5adb0023baea2861.png"onClick={this.showAnswer}/>
                                                </Popover>
                                            </div>
                                            <div className={styles.content}>
                                                <Radio name="titleCheck"onClick={this.changeItem.bind(this,{value:2,type:'radio'})} value={2}/>
                                                只打印内容
                                                <Popover placement="bottomLeft"content={contentAnswer}trigger="click">
                                                    <img src="https://assets.2dfire.com/frontend/63de89515818f99c5adb0023baea2861.png"onClick={this.showAnswer }
                                                    />
                                                </Popover>
                                            </div>
                                        </RadioGroup>
                                    )}
                                </FormItem>

                                {
                                    (showDefaultInput&&showEditInputflag || showEditInputflag) && <div className={styles.titleName}>
                                        <FormItem label="标题名称" {...formItemLayout}colon={false} >
                                            {
                                                getFieldDecorator(`temp${type}`, {
                                                    initialValue: moduleDetail[this.textMap[type]]==='del'|| moduleDetail[this.textMap[type]]===''?'':moduleDetail[this.textMap[type]]||this.moduleSettings[type]
                                                })(<Input style={{ width: 200}} maxLength="20" onChange={this.changeItem.bind(this,{type:'title'})} />)
                                            }
                                        </FormItem>
                                    </div>
                                }
                                {
                                     showProductDate && <div className={styles.titleName}>
                                        <FormItem label="生产日期" {...formItemLayout} colon={false}>
                                            <LocaleProvider locale={locale}>
                                                <DatePicker
                                                    showTime
                                                    format="YYYY-MM-DD"
                                                    onChange={this.changeItem.bind(this,{type:'productDateContent'})}
                                                    style={{ width: 200}}
                                                    defaultValue={moment(moduleDetail.goodsManufacture || new Date(), "YYYY-MM-DD")}
                                                />
                                            </LocaleProvider>
                                        </FormItem>

                                    </div>
                                }
                            </div>
                        )}
                         {
                            showBarCode && <div>
                                <FormItem >
                                    {getFieldDecorator('barCode', {
                                        initialValue: radioValue
                                    })(
                                        <RadioGroup>
                                            <Radio name="barCode" className={styles.barCode} value={2} onClick={()=>{changeCodeImg(2);this.changeItem({value:2,type:'code'})} }/>
                                            展示为条码
                                            <br />
                                            <Radio name="barCode" className={styles.barCode} value={3} onClick={()=>{changeCodeImg(3);this.changeItem({value:3,type:'code'})} }/>
                                            展示为数字
                                            <br />
                                            <Radio name="barCode" className={styles.barCode} value={1} onClick={()=>{changeCodeImg(1);this.changeItem({value:1,type:'code'})} }/>
                                            展示为条码+数字
                                        </RadioGroup>
                                    )}
                                </FormItem>
                            </div>
                        }
                        {
                            showTextArea && <div>
                                <div className= {styles.textAreaContainer}>
                                    <FormItem {...formItemLayout}  style={{width:500
                                    }}>
                                        {getFieldDecorator(`temp${type}`, {
                                            initialValue: moduleDetail.definitionExt==='del'?'':moduleDetail.definitionExt
                                        })(<TextArea style={{ width: 400 }} maxLength="20" onChange={this.changeItem.bind(this,{type:'customText'})} rows="3" cols="40" placeholder={defaultTip}/>)
                                        }
                                    </FormItem>
                                    <p className={styles.wordNumber}>{textAreaWordLength || initTextAreaWordLength || 0}/20</p>
                                </div>
                                <br />
                                <span className={styles.customTextErrorTip}>
                                    {this.state.customTextErrorTip}
                                </span>
                            </div>
                        }
                    </div>
                )}
            </div>
        )
    }
}

export default EditBoard

