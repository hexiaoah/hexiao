// 商品分类 编辑组件
import React from 'react'
import { Radio, Checkbox, Row, Col } from 'antd'
import style from './CateEditor.css'

const RadioGroup = Radio.Group

export default class CateEditor extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            showFields: ['商品名称', '商品价格', '下单按钮',],
        }
    }
    
    selecteTier = (e) => {
        const {value, onChange} = this.props;
        const {config} = value
        let target = e.target.value
        const seeLevel = target
        // debugger
        onChange(value, {config:{
            ...config,
            seeLevel
        }})
    }
    
    _radioCheck = (str, e) => {
        const {value, onChange} = this.props
        const {config} = value
        // debugger
        let target = e.target.value
        let orderButton = Object.assign({},config.orderButton)
        orderButton[str] = target
        onChange(value, {config:{
            ...config,
            orderButton
        }})
    }
    
    _checkboxChange = (item, e) => {
        const { value, onChange } = this.props
        const { config } =  value
        let  showFields = [...config.showFields]

        if(e.target.checked) { // 选中
            showFields.push(item)
        } else {
            showFields = showFields.filter(v => v != item)
        }
    
        onChange(value, {config:{
            ...config,
            showFields
        }})
    }
    
    render() {
        const { value } = this.props
        const { config } = value
        const { seeLevel, orderButton } = config
        const { showFields } = this.state
        let isShopButton = config.showFields.indexOf('下单按钮') > -1 // 是否显示商品按钮
        
        return (
            <div className={style.cate_editor_container}>
                <div className={style.cant_delete_tip}>分类商品组件不可删除</div>
                <div className={style.tier_radio}>
                    <div className={style.tier_title}>展示层级:</div>
                    <RadioGroup value={seeLevel}
                                onChange={this.selecteTier}
                                className={style.tier_radio_group}>
                        {/* <Radio name="mode" value={'2'}>二级分类</Radio> */}
                        <Radio name="mode" value={'1'}>一级分类</Radio>
                    </RadioGroup>
                    <br/>
                    <div className={style.show_content}>
                        <div className={style.tier_title}>显示内容:</div>
                        <div className={style.content_box}>
                            { showFields.map((item, i) =>
                                <Checkbox defaultChecked={true}
                                          key={i}
                                          disabled={ item === '下单按钮' ? false : true }
                                          className={style.rankEditorCheckbox}
                                          onChange={(e) => this._checkboxChange(item, e)}>
                                    { item }
                                    <br/>
                                </Checkbox>
                            )}
                            {
                                isShopButton &&
                                <div className={style.show_order_btn}>
                                    <RadioGroup value={orderButton.mode} className={style.controlGroupControl}
                                                onChange={(e) => this._radioCheck('mode', e)}>
                                        <Radio name="mode" value='立即下单'>立即下单</Radio>
                                        <Radio name="mode" value='加入购物车'>加入购物车</Radio>
                                    </RadioGroup>
                                    <br/>
                                    {orderButton.mode == '立即下单' ?
                                        <RadioGroup value={orderButton.orderStyle} className={style.controlGroupControl}
                                                    onChange={(e) => this._radioCheck('orderStyle', e)}>
                                            <Radio name="orderStyle" value='1'>样式一</Radio>
                                            <Radio name="orderStyle" value='2'>样式二</Radio>
                                        </RadioGroup> :
                                        <RadioGroup value={orderButton.cartStyle} className={style.controlGroupControl}
                                                    onChange={(e) => this._radioCheck('cartStyle', e)}>
                                            <Radio name="cartStyle" value='1'>样式一</Radio>
                                            <Radio name="cartStyle" value='2'>样式二</Radio>
                                            <Radio name="cartStyle" value='3'>样式三</Radio>
                                        </RadioGroup>}
                                </div>
        
                            }
                        </div>
                       
                    </div>
                </div>
            </div>
        )
    }
    static designType = 'cateList'
    static designDescription = '分类商品'
    
    static getInitialValue() {
        return {
            config: {
                seeLevel: '1', // 显示的分类层级。2 则显示二级分类；1 则只显示一级分类
                type: 'cateList',
                showFields: ['商品名称', '商品价格', '下单按钮',],// 可使用值：名称、价格、下单按钮 / 下单按钮设置（仅在 showFields 里有 '下单按钮' 时生效）
                orderButton: {                 // 下单按钮设置（仅在 showFields 里有 '下单按钮' 时生效）
                    mode: '加入购物车',             // 可选值：下单按钮、加入购物车
                    orderStyle: '1',             // 立即下单按钮样式。可选值：'1'、'2'。仅在 mode=立即下单 时生效
                    cartStyle: '1',              // 加入购物车按钮样式。可选值：'1'、'2'、'3'。仅在 mode=加入购物车 时生效
                },
            }
        }
    }
}
