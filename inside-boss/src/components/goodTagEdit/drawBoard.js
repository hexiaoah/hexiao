import React, { Component } from 'react'
import styles from './moduleTag.css'
import TagInput from './tagInput'
class DrawBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showType: '', // 展示的编辑框类型
            defaultCodeImg: '' // 条码效果图'
        }
    }
    componentWillReceiveProps(nextProps) {
         switch (nextProps.moduleDetail.goodsBarCodeType) {
             case 1:
                this.setState({
                    defaultCodeImg: './image/moduleTag/barCodeNum.png'
                })
                 break
             case 2:
                 this.setState({
                    defaultCodeImg:  './image/moduleTag/code.png'
                })
                 break
             case 3:
                 this.setState({
                    defaultCodeImg:  './image/moduleTag/num.png'
                })
                 break
         }

    }
    moduleOneDrawBoard = () => {
        const {
            moduleDetail={},
            setFieldsValue,
            getFieldDecorator,
            isShowEdit,
            getFieldValue,
            codeImg,
            dispatch
        } = this.props
        const { showType, defaultCodeImg } = this.state
        const {
            goodsNameExt,
            goodsUnitExt,
            definitionExt,
            goodsMemberPriceExt,
            goodsRetailPriceExt,
            goodsSpecificationExt,
            goodsNameType,
            goodsUnitType,
            goodsRetailPriceType,
            goodsSpecificationType,
            goodsMemberPriceType,
        } = moduleDetail

        return (
            <div className={styles.goodModuleOneImg}>
                <div className={styles.goodModuleOne} id="goodModuleOne" style={{backgroundImage:"url('./image/moduleTag/moduleOneTag.png')"}}>
                    <TagInput
                        content={(goodsNameExt === undefined && goodsNameType===1 )? '商品名称 可乐': !goodsNameExt?' 可乐':goodsNameExt}
                        showType={showType}
                        type="name"
                        isShowEdit={isShowEdit.bind(this)}
                        exampleContent="可乐"
                        moduleType="1"
                        className="moduleOneName"
                        getFieldValue={getFieldValue}
                        getFieldDecorator={getFieldDecorator}
                        setFieldsValue={setFieldsValue}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                    />
                    <TagInput
                        content={definitionExt === undefined ? ' ' : definitionExt}
                        showType={showType}
                        type="customText"
                        isShowEdit={isShowEdit.bind(this)}
                        exampleContent=""
                        moduleType="1"
                        getFieldValue={getFieldValue}
                        className="moduleOneProductPlace"
                        getFieldDecorator={getFieldDecorator}
                        setFieldsValue={setFieldsValue}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                    />
                    <TagInput
                        content={(goodsUnitExt === undefined && goodsUnitType===1) ? '单位 件' : !goodsUnitExt?' 件':goodsUnitExt}
                        showType={showType}
                        type="unit"
                        isShowEdit={isShowEdit.bind(this)}
                        exampleContent="件"
                        moduleType="1"
                        getFieldValue={getFieldValue}
                        className="moduleOneUnit"
                        getFieldDecorator={getFieldDecorator}
                        setFieldsValue={setFieldsValue}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                    />
                    <TagInput
                        content={(goodsSpecificationExt === undefined && goodsSpecificationType===1)? '规格 1L': !goodsSpecificationExt?' 1L':goodsSpecificationExt}
                        showType={showType}
                        type="specifications"
                        isShowEdit={isShowEdit.bind(this)}
                        exampleContent="1L"
                        moduleType="1"
                        getFieldValue={getFieldValue}
                        className="moduleOneSpecifications"
                        getFieldDecorator={getFieldDecorator}
                        setFieldsValue={setFieldsValue}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                    />
                    <TagInput
                        content={(goodsRetailPriceExt === undefined && goodsRetailPriceType===1)? '零售价 12元': !goodsRetailPriceExt?' 12元':goodsRetailPriceExt}
                        showType={showType}
                        type="retailPrice"
                        getFieldValue={getFieldValue}
                        isShowEdit={isShowEdit.bind(this)}
                        exampleContent="12元"
                        moduleType="1"
                        className="moduleOneRetailPrice"
                        getFieldDecorator={getFieldDecorator}
                        setFieldsValue={setFieldsValue}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                    />
                    <TagInput
                        content={(goodsMemberPriceExt === undefined && goodsMemberPriceType===1)?'会员价 12元': !goodsMemberPriceExt?' 12元':goodsMemberPriceExt}
                        showType={showType}
                        type="memberPrice"
                        getFieldValue={getFieldValue}
                        isShowEdit={isShowEdit.bind(this)}
                        exampleContent="12元"
                        moduleType="1"
                        className="moduleOneMemberPrice"
                        getFieldDecorator={getFieldDecorator}
                        setFieldsValue={setFieldsValue}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                    />
                   <img
                        className={styles.moduleOneBarCode}
                        src={codeImg || defaultCodeImg}
                        onClick={isShowEdit.bind(
                            this,
                            'barCode',
                            '条形码',
                            '',
                            '1'
                        )}
                    />
                </div>
            </div>
        )
    }
    moduleTwoDrawBoard = () => {
        const {
            moduleDetail={},
            getFieldDecorator,
            isShowEdit,
            getFieldValue,
            codeImg,
            setFieldsValue,
            dispatch
        } = this.props
        const { showType, defaultCodeImg } = this.state
        const {
            goodsNameExt,
            goodsRetailPriceExt,
            goodsSpecificationExt,
            goodsNameType,
            goodsRetailPriceType,
            goodsSpecificationType,

        } = moduleDetail
        return (
            <div className={styles.goodModuleTwoImg}>
                <div className={styles.goodModuleTwo} id="goodModuleTwo">
                    <TagInput
                        content={(goodsNameExt === undefined && goodsNameType===1 )? '商品名称 可乐': !goodsNameExt?' 可乐':goodsNameExt}
                        showType={showType}
                        type="name"
                        isShowEdit={isShowEdit.bind(this)}
                        exampleContent="可乐"
                        className="moduleTwoName"
                        getFieldValue={getFieldValue}
                        getFieldDecorator={getFieldDecorator}
                        setFieldsValue={setFieldsValue}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                    />
                    <TagInput
                        content={(goodsRetailPriceExt === undefined && goodsRetailPriceType===1)? '零售价 12元': !goodsRetailPriceExt?' 12元':goodsRetailPriceExt}
                        showType={showType}
                        type="retailPrice"
                        isShowEdit={isShowEdit.bind(this)}
                        exampleContent="12元"
                        className="moduleTwoRetailPrice"
                        getFieldValue={getFieldValue}
                        getFieldDecorator={getFieldDecorator}
                        setFieldsValue={setFieldsValue}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                    />
                    <TagInput
                        showType={showType}
                        type="barCode"
                        isShowEdit={isShowEdit.bind(this)}
                        className="moduleTwoBarCode"
                        getFieldValue={getFieldValue}
                        getFieldDecorator={getFieldDecorator}
                        setFieldsValue={setFieldsValue}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                        backgroundImage={
                            'url(' + (codeImg || defaultCodeImg) + ')'
                        }
                    />
                    <TagInput
                        content={(goodsSpecificationExt === undefined && goodsSpecificationType===1)? '规格 1L': !goodsSpecificationExt?' 1L':goodsSpecificationExt}
                        showType={showType}
                        type="specifications"
                        isShowEdit={isShowEdit.bind(this)}
                        exampleContent="1L"
                        className="moduleTwoSpecifications"
                        getFieldValue={getFieldValue}
                        getFieldDecorator={getFieldDecorator}
                        setFieldsValue={setFieldsValue}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                    />
                </div>
            </div>
        )
    }
    moduleThreeDrawBoard = () => {
        const {
            moduleDetail={},
            getFieldDecorator,
            isShowEdit,
            getFieldValue,
            codeImg,
            setFieldsValue,
            dispatch
        } = this.props
        const { showType, defaultCodeImg } = this.state
        const {
            goodsNameExt,
            goodsNameType,
            goodsRetailPriceType,
            goodsSpecificationType,
            goodsManufactureType,
            goodsPeriodType,
            definitionExt,
            goodsRetailPriceExt,
            goodsSpecificationExt,
            goodsPeriodExt,
            goodsManufactureExt,
            goodsManufacture
        } = moduleDetail
        return (
            <div className={styles.goodModuleThreeImg}>
                <div
                    className={styles.goodModuleThree}
                    id="goodModuleThree"
                >
                    <TagInput
                        content={goodsNameExt === undefined && goodsNameType === 1? '商品名称 可乐': !goodsNameExt?' 可乐':goodsNameExt}
                        showType={showType}
                        type="name"
                        isShowEdit={isShowEdit.bind(this)}
                        exampleContent="可乐"
                        className="moduleThreeName"
                        getFieldValue={getFieldValue}
                        getFieldDecorator={getFieldDecorator}
                        setFieldsValue={setFieldsValue}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                    />
                    <TagInput
                        content={definitionExt === undefined? '自定义文字': definitionExt}
                        showType={showType}
                        type="customText"
                        isShowEdit={isShowEdit.bind(this)}
                        exampleContent=""
                        className="moduleThreeProductPlace"
                        getFieldValue={getFieldValue}
                        getFieldDecorator={getFieldDecorator}
                        setFieldsValue={setFieldsValue}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                    />
                    <TagInput
                        content={goodsRetailPriceExt === undefined &&goodsRetailPriceType === 1? '零售价 12元': !goodsRetailPriceExt?' 12元':goodsRetailPriceExt}
                        showType={showType}
                        type="retailPrice"
                        isShowEdit={isShowEdit.bind(this)}
                        exampleContent="12元"
                        className="moduleThreeRetailPrice"
                        getFieldValue={getFieldValue}
                        getFieldDecorator={getFieldDecorator}
                        setFieldsValue={setFieldsValue}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                    />
                    <TagInput
                        content={(goodsSpecificationExt === undefined && goodsSpecificationType===1)? '规格 1L': !goodsSpecificationExt?' 1L':goodsSpecificationExt}
                        showType={showType}
                        type="specifications"
                        isShowEdit={isShowEdit.bind(this)}
                        exampleContent="1L"
                        className="moduleThreeSpecifications"
                        getFieldValue={getFieldValue}
                        getFieldDecorator={getFieldDecorator}
                        setFieldsValue={setFieldsValue}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                    />
                    <TagInput
                        content={(goodsPeriodExt === undefined && goodsPeriodType===1)? '保质期 30天': !goodsPeriodExt?' 30天':goodsPeriodExt}
                        setFieldsValue={setFieldsValue}
                        showType={showType}
                        type="shelfLife"
                        isShowEdit={isShowEdit.bind(this)}
                        exampleContent="30天"
                        className="moduleThreeShelfLife"
                        getFieldValue={getFieldValue}
                        getFieldDecorator={getFieldDecorator}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                    />
                    <TagInput
                        content={(goodsManufactureExt === undefined && goodsManufactureType===1)? '生产日期': goodsManufactureExt}
                        productDate={goodsManufacture}
                        showType={showType}
                        type="productDate"
                        isShowEdit={isShowEdit.bind(this)}
                        exampleContent="2019-01-01"
                        className="moduleThreeProductDate"
                        getFieldValue={getFieldValue}
                        getFieldDecorator={getFieldDecorator}
                        setFieldsValue={setFieldsValue}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                    />
                    <TagInput
                        showType={showType}
                        type="barCode"
                        isShowEdit={isShowEdit.bind(this)}
                        className="moduleThreeBarCode"
                        getFieldValue={getFieldValue}
                        getFieldDecorator={getFieldDecorator}
                        setFieldsValue={setFieldsValue}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                        backgroundImage={
                            'url(' + (codeImg || defaultCodeImg) + ')'
                        }
                    />
                </div>
            </div>
        )
    }
    moduleFourDrawBoard = () => {
        const {
            moduleDetail={},
            getFieldDecorator,
            isShowEdit,
            getFieldValue,
            codeImg,
            setFieldsValue,
            dispatch
        } = this.props
        const { showType, defaultCodeImg } = this.state
        const {
            goodsNameExt,
            goodsNameType,
            definitionExt,
            goodsRetailPriceExt,
            goodsRetailPriceType,
            goodsSpecificationExt,
            goodsSpecificationType,
            goodsPeriodExt,
            goodsPeriodType,
            goodsManufactureExt,
            goodsManufactureType,
            goodsManufacture
        } = moduleDetail
        return (
            <div className={styles.goodModuleFourImg}>
                <div className={styles.goodModuleFour} id="goodModuleThree">
                    <TagInput
                        content={(goodsNameExt === undefined && goodsNameType===1)?'商品名称 可乐': !goodsNameExt?' 可乐':goodsNameExt}
                        showType={showType}
                        type="name"
                        isShowEdit={isShowEdit.bind(this)}
                        exampleContent="可乐"
                        className="moduleFourName"
                        getFieldValue={getFieldValue}
                        setFieldsValue={setFieldsValue}
                        getFieldDecorator={getFieldDecorator}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                    />
                    <TagInput
                        content={definitionExt === undefined? '自定义文字': definitionExt}
                        showType={showType}
                        type="customText"
                        isShowEdit={isShowEdit.bind(this)}
                        exampleContent=""
                        className="moduleFourProductPlace"
                        getFieldValue={getFieldValue}
                        setFieldsValue={setFieldsValue}
                        getFieldDecorator={getFieldDecorator}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                    />
                    <TagInput
                        content={(goodsRetailPriceExt === undefined && goodsRetailPriceType===1)? '零售价 12元': !goodsRetailPriceExt?' 12元':goodsRetailPriceExt}
                        showType={showType}
                        type="retailPrice"
                        isShowEdit={isShowEdit.bind(this)}
                        exampleContent="12元"
                        className="moduleFourRetailPrice"
                        getFieldValue={getFieldValue}
                        setFieldsValue={setFieldsValue}
                        getFieldDecorator={getFieldDecorator}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                    />
                    <TagInput
                        content={(goodsSpecificationExt === undefined && goodsSpecificationType===1)? '规格 1L': !goodsSpecificationExt?' 1L':goodsSpecificationExt}
                        showType={showType}
                        type="specifications"
                        isShowEdit={isShowEdit.bind(this)}
                        setFieldsValue={setFieldsValue}
                        exampleContent="1L"
                        className="moduleFourSpecifications"
                        getFieldValue={getFieldValue}
                        getFieldDecorator={getFieldDecorator}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                    />
                    <TagInput
                        content={(goodsPeriodExt === undefined && goodsPeriodType===1)? '保质期 30天': !goodsPeriodExt?' 30天':goodsPeriodExt }
                        showType={showType}
                        type="shelfLife"
                        isShowEdit={isShowEdit.bind(this)}
                        exampleContent="30天"
                        className="moduleFourShelfLife"
                        setFieldsValue={setFieldsValue}
                        getFieldValue={getFieldValue}
                        getFieldDecorator={getFieldDecorator}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                    />
                    <TagInput
                        content={(goodsManufactureExt === undefined && goodsManufactureType===1)? '生产日期': goodsManufactureExt}
                        productDate={goodsManufacture}
                        showType={showType}
                        type="productDate"
                        isShowEdit={isShowEdit.bind(this)}
                        setFieldsValue={setFieldsValue}
                        exampleContent="2019-01-01"
                        className="moduleFourProductDate"
                        getFieldValue={getFieldValue}
                        getFieldDecorator={getFieldDecorator}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                    />
                    <TagInput
                        showType={showType}
                        type="barCode"
                        isShowEdit={isShowEdit.bind(this)}
                        className="moduleFourBarCode"
                        getFieldValue={getFieldValue}
                        getFieldDecorator={getFieldDecorator}
                        setFieldsValue={setFieldsValue}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                        backgroundImage={
                            'url(' + (codeImg || defaultCodeImg) + ')'
                        }
                    />
                </div>
            </div>
        )
    }

    moduleFiveDrawBoard = () => {
        const {
            moduleDetail={},
            getFieldDecorator,
            isShowEdit,
            getFieldValue,
            codeImg,
            setFieldsValue,
            dispatch
        } = this.props
        const { showType, defaultCodeImg } = this.state
        const {
            goodsNameExt,
            goodsRetailPriceExt,
            goodsNameType,
            goodsRetailPriceType
        } = moduleDetail
        return (
            <div className={styles.goodModuleFiveImg}>
                <div className={styles.goodModuleFive} id="goodModuleFive">
                    <TagInput
                        content={(goodsNameExt === undefined && goodsNameType===1)?'商品名称 可乐': !goodsNameExt?' 可乐':goodsNameExt}
                        setFieldsValue={setFieldsValue}
                        showType={showType}
                        type="name"
                        isShowEdit={isShowEdit.bind(this)}
                        exampleContent="可乐"
                        className="moduleFiveName"
                        getFieldValue={getFieldValue}
                        getFieldDecorator={getFieldDecorator}
                        moduleDetail={moduleDetail}
                    />
                    <TagInput
                        content={(goodsRetailPriceExt === undefined && goodsRetailPriceType)? '零售价 12元': !goodsRetailPriceExt?' 12元':goodsRetailPriceExt}
                        showType={showType}
                        type="retailPrice"
                        isShowEdit={isShowEdit.bind(this)}
                        setFieldsValue={setFieldsValue}
                        exampleContent="12元"
                        className="moduleFiveRetailPrice"
                        getFieldValue={getFieldValue}
                        getFieldDecorator={getFieldDecorator}
                        moduleDetail = {moduleDetail}
                    />
                    <TagInput
                        showType={showType}
                        type="barCode"
                        isShowEdit={isShowEdit.bind(this)}
                        className="moduleFiveBarCode"
                        getFieldValue={getFieldValue}
                        getFieldDecorator={getFieldDecorator}
                        setFieldsValue={setFieldsValue}
                        moduleDetail={moduleDetail}
                        dispatch={dispatch}
                        backgroundImage={
                            'url(' + (codeImg || defaultCodeImg) + ')'
                        }
                    />
                </div>
            </div>
        )
    }
    render() {
        const { moduleDetail = {} } = this.props
        const { templateType } = moduleDetail
        return (
            <div className={styles.moduleSettingsPart}>
                <div className={styles.drawBoard}>模板画板</div>
                {templateType === 1 && <div>{this.moduleOneDrawBoard()}</div>}
                {templateType === 2 && <div>{this.moduleTwoDrawBoard()}</div>}
                {templateType === 3 && <div>{this.moduleThreeDrawBoard()}</div>}
                {templateType === 4 && <div>{this.moduleFourDrawBoard()}</div>}
                {templateType === 5 && <div>{this.moduleFiveDrawBoard()}</div>}
            </div>
        )
    }
}

export default DrawBoard
