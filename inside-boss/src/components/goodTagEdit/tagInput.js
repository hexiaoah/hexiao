import React, { Component } from 'react'
import { Input, Form } from 'antd'
const FormItem = Form.Item
import * as action from '../../action'
import styles from './moduleTag.css'
class tagInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showInput: true,
            showCloseImg: false
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
    closeInput(type) {
        const { dispatch, moduleDetail } = this.props
        const changeText = this.textMap[type]
        const changeType = this.radioCheckMap[type]
        if (type !== 'productDate') {
            moduleDetail[changeText] = 'del'
            delete moduleDetail[changeType]
        } else{
             moduleDetail.goodsManufactureExt = 'del'
             moduleDetail.goodsManufacture = 'del'
             delete moduleDetail.goodsManufactureType
        }
        this.props.isShowEdit(type, false)
        dispatch(action.setModuleDetail(moduleDetail))
    }
    hiddenInput() {
        this.setState({
            showCloseImg: false
        })
    }
    showInputArea() {
        this.setState({
            showCloseImg: true
        })
    }
    getInputValue(type, content, productDate, exampleContent) {
        if (type === 'productDate') {
            if (content !== 'del') {
                if (productDate) {
                    return content !== 'del'
                        ? content + ' ' + productDate
                        : productDate
                } else {
                    return content !== 'del'
                        ? content + ' 2019-01-01'
                        : '2019-01-01'
                }
            } else {
                if (productDate) {
                    return productDate !== 'del' ? productDate : ''
                } else if (content === null || content === 'del') {
                    return '2019-01-01'
                } else {
                    return '生产日期 2019-01-01'
                }
            }
        } else {
            return !(content.split(' ')[0] === 'del') ? content : exampleContent
        }
    }
    drawBoardValue = () => {
        const {
            getFieldDecorator,
            content,
            type,
            productDate = '',
            moduleDetail = {},
            isShowEdit,
            backgroundImage = '',
            exampleContent = ''
        } = this.props
        const { showCloseImg } = this.state
        const radioType = this.radioCheckMap[type]
        const isCanEdit = moduleDetail[radioType] ? true : false
        const showBarCode = type === 'barCode'
        return (
            isCanEdit && (
                <div>
                    {!showBarCode && (
                        <FormItem>
                            {getFieldDecorator(type, {
                                initialValue: this.getInputValue(
                                    type,
                                    content,
                                    productDate,
                                    exampleContent
                                )
                            })(
                                <Input
                                    onClick={() => {
                                        this.showInputArea()
                                        isShowEdit(type, true)
                                    }}
                                    onBlur={this.hiddenInput.bind(this)}
                                    className={styles.inputText}
                                    readOnly="readOnly"
                                />
                            )}
                            {showCloseImg && (
                                <div className={styles.closeIcon}>
                                    <img
                                        src="https://assets.2dfire.com/frontend/e72eee699579e0922be27ad1ebe20587.png"
                                        className={styles.closeIcon}
                                        onMouseDown={this.closeInput.bind(
                                            this,
                                            type
                                        )}
                                    />
                                </div>
                            )}
                        </FormItem>
                    )}
                    {showBarCode && (
                        <div>
                            <Input
                                onClick={() => {
                                    this.showInputArea()
                                    isShowEdit(type, true)
                                }}
                                onBlur={this.hiddenInput.bind(this)}
                                className={styles.inputText}
                                readOnly="readOnly"
                                style={{
                                    backgroundImage: backgroundImage,
                                    backgroundSize: '100% 100%',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center'
                                }}
                            />
                            {showCloseImg && (
                                <div className={styles.closeIcon}>
                                    <img
                                        src="https://assets.2dfire.com/frontend/e72eee699579e0922be27ad1ebe20587.png"
                                        className={styles.closeIcon}
                                        onMouseDown={this.closeInput.bind(
                                            this,
                                            type
                                        )}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )
        )
    }
    render() {
        const { className } = this.props
        const { showInput } = this.state
        return (
            showInput && (
                <div className={styles[className]} tabIndex="0">
                    <div>{this.drawBoardValue()}</div>
                </div>
            )
        )
    }
}
export default tagInput
