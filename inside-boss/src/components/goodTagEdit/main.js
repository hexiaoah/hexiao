import React, { Component } from 'react'
import { Form, Breadcrumb } from 'antd'
import styles from './style.css'
import EditBoard from './editBoard'
import DrawBoard from './drawBoard'
import html2canvas from 'html2canvas'
import BaseInfo from './baseInfo'
import * as action from '../../action'
import { hashHistory } from 'react-router'
class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            moduleNameValue: '', //模板名称
            moduleNameErrorTip: '', //模板名称错误提示,
            showEditBoard: false,
            type: '',
            codeImg: '',
            templateNameError: ''
        }
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
    isShowEdit(type,isShow) {
        const t = this
        setTimeout(() => {
            t.setState({
                showEditBoard: isShow,
                type: type,
                radioCheck: this.radioCheckMap[type]
            })
        })
    }

    dataURLtoFile(dataurl, filename = 'file') {
        let arr = dataurl.split(',')
        let mime = arr[0].match(/:(.*?);/)[1]
        let suffix = mime.split('/')[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], `${filename}.${suffix}`, {
            type: mime
        })
    }
    getImg() {
        const { dispatch } = this.props
        const dom =
            document.getElementById('goodModuleOne') ||
            document.getElementById('goodModuleTwo') ||
            document.getElementById('goodModuleThree') ||
            document.getElementById('goodModuleFour') ||
            document.getElementById('goodModuleFive')
        html2canvas(dom, {}).then(canvas => {
            const imgData = canvas.toDataURL()
            const img = this.dataURLtoFile(imgData)
            dispatch(
                action.uploadGoodTagImage({
                    projectName: 'OssDownload',
                    path: 'mis/permanent/',
                    file: img
                })
            )
        })
    }
    saveModule(getFieldValue) {
        window.scroll(0,0)
        this.getImg()
        setTimeout(() => {
            const { data, dispatch } = this.props
            const templateName = getFieldValue('moduleName')
            const initTemplateName = this.props.data.moduleDetail.templateName
            if(initTemplateName!==templateName){
                if (templateName === '') {
                    this.setState({
                        templateNameError: '请输入模板名称'
                    })
                    return
                } else if (templateName.length >20) {
                    this.setState({
                        templateNameError: '最多输入20个字符'
                    })
                    return
                }
            }
            const goodsNameExt = data.moduleDetail.goodsNameExt
            const goodsSpecificationExt = data.moduleDetail.goodsSpecificationExt
            const goodsRetailPriceExt = data.moduleDetail.goodsRetailPriceExt
            const goodsMemberPriceExt = data.moduleDetail.goodsMemberPriceExt
            const goodsUnitExt = data.moduleDetail.goodsUnitExt
            const goodsPeriodExt = data.moduleDetail.goodsPeriodExt
            const goodsManufactureExt = data.moduleDetail.goodsManufactureExt
            const definitionExt = data.moduleDetail.definitionExt
            const definitionType =  data.moduleDetail.definitionType===undefined?0:data.moduleDetail.definitionType
            const goodsNameType = data.moduleDetail.goodsNameType===undefined?0:data.moduleDetail.goodsNameType
            const goodsSpecificationType = data.moduleDetail.goodsSpecificationType===undefined?0:data.moduleDetail.goodsSpecificationType
            const goodsRetailPriceType = data.moduleDetail.goodsRetailPriceType===undefined?0:data.moduleDetail.goodsRetailPriceType
            const goodsMemberPriceType = data.moduleDetail.goodsMemberPriceType===undefined?0:data.moduleDetail.goodsMemberPriceType
            const goodsUnitType = data.moduleDetail.goodsUnitType===undefined?0:data.moduleDetail.goodsUnitType
            const goodsPeriodType = data.moduleDetail.goodsPeriodType===undefined?0:data.moduleDetail.goodsPeriodType
            const goodsBarCodeType = data.moduleDetail.goodsBarCodeType===undefined?0:data.moduleDetail.goodsBarCodeType
            const goodsManufactureType = data.moduleDetail.goodsManufactureType===undefined?0:data.moduleDetail.goodsManufactureType
            const goodsManufacture = data.moduleDetail.goodsManufacture
            const templateType = data.moduleDetail.templateType
            const templateImageUrl = data.upLoadGoodTagImage
            const entityId = data.moduleDetail.entityId
            const id = data.moduleDetail.id
            const isUpdateTemplateName = (initTemplateName === templateName) ? 0 : 1
            const param = {
                id: id,
                entityId: entityId,
                templateName: templateName,
                templateType: templateType,
                templateImageUrl: templateImageUrl,
                goodsNameExt: goodsNameExt,
                goodsBarCodeType: goodsBarCodeType,
                goodsNameType: goodsNameType,
                goodsSpecificationType: goodsSpecificationType,
                goodsRetailPriceType: goodsRetailPriceType,
                goodsMemberPriceType: goodsMemberPriceType,
                goodsUnitType: goodsUnitType,
                goodsPeriodType: goodsPeriodType,
                goodsManufactureType: goodsManufactureType,
                goodsManufacture: goodsManufacture,
                goodsSpecificationExt: goodsSpecificationExt,
                goodsRetailPriceExt: goodsRetailPriceExt,
                goodsMemberPriceExt: goodsMemberPriceExt,
                goodsUnitExt: goodsUnitExt,
                goodsPeriodExt: goodsPeriodExt,
                goodsManufactureExt: goodsManufactureExt,
                definitionExt: definitionExt,
                isUpdateTemplateName: isUpdateTemplateName,
                definitionType: definitionType
            }
            dispatch(action.updatePriceTagModule({ param: param }))
            setTimeout(() => {
                const {updateModuleResult={}} = this.props.data
                if (updateModuleResult.message) {
                    this.setState({
                        templateNameError: '模板名称已存在，请重新填写'
                    })
                    return
                } else {
                    hashHistory.push('/price_tag')
                }
            },400)

        }, 700)
    }
    changeCodeImg(type) {
        const t = this
        if (type === 1) {
            t.setState({
                codeImg:
                    './image/moduleTag/barCodeNum.png'
            })
        } else if (type === 2) {
            t.setState({
                codeImg:
                    './image/moduleTag/code.png'
            })
        } else {
            t.setState({
                codeImg:
                    './image/moduleTag/num.png'
            })
        }
    }
    moduleSize = {
        1: '80*40',
        2: '75*30',
        3: '60*40',
        4: '40*30',
        5: '25*15'
    }
    goPriceTagManage() {
        hashHistory.push('/price_tag')
    }
    render() {
        const { data, dispatch } = this.props
        const { moduleDetail={} } = data
        const {
            showEditBoard,
            type,
            radioCheck,
            codeImg,
            templateNameError
        } = this.state
        const {
            getFieldDecorator,
            getFieldValue,
            setFieldsValue
        } = this.props.form
        return (
            <Form>
                <div className={styles.bread_crumb}>
                    <span className={styles.split_line} />
                    <Breadcrumb>
                        <Breadcrumb.Item className={styles.bread_first}onClick={this.goPriceTagManage}>设置</Breadcrumb.Item>
                        <Breadcrumb.Item>商品标价签</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className={styles.goodEditBox}>
                    {/* 基本设置区域 */}
                    <BaseInfo
                        moduleDetail={moduleDetail}
                        getFieldDecorator={getFieldDecorator}
                        templateNameError={templateNameError}
                    />
                    {/* 模板设置区域 */}
                    <div className={styles.moduleSettings}>
                        <div className={styles.goodModuleSettings}>模板设置</div>
                        <div className={styles.goodPriceEdit}>
                            <div className={styles.componentSettings}>
                                <DrawBoard
                                    dispatch={dispatch}
                                    moduleDetail={moduleDetail}
                                    setFieldsValue={setFieldsValue}
                                    isShowEdit={this.isShowEdit.bind(this)}
                                    getFieldDecorator={getFieldDecorator}
                                    getFieldValue={getFieldValue}
                                    codeImg={codeImg}
                                />
                                <EditBoard
                                    dispatch={dispatch}
                                    moduleDetail={moduleDetail}
                                    getFieldValue={getFieldValue}
                                    getFieldDecorator={getFieldDecorator}
                                    showEditArea={showEditBoard}
                                    type={type}
                                    setFieldsValue={setFieldsValue}
                                    moduleDetail={moduleDetail}
                                    radioCheck={radioCheck}
                                    changeCodeImg={this.changeCodeImg.bind(this)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.btnArea}>
                    <button className={styles.cancelBtn}onClick={this.goPriceTagManage}>取消</button>
                    <button className={styles.saveBtn} onClick={this.saveModule.bind(this, getFieldValue)}>保存</button>
                </div>
            </Form>
        )
    }
}

export default Form.create()(Main)
