import React from 'react';
import { Radio, Checkbox, message } from 'antd';
import visualApi from '@src/api/visualConfigApi'
import ImgUpload from '../../common/imgUpload'
import GoogsSelect from '../../common/googsSelect'
import { DesignEditor, ControlGroup } from '../../editor/DesignEditor';
import style from './GoodsEditor.css'
import constants from '../../common/constants'

const RadioGroup = Radio.Group;

const maxGood = {
  '大图': 6,
  '详细列表': 10,
  '双列小图': 10,
}
export default class GoodsEditor extends DesignEditor {
  state = {
    showFields: ['名称', '价格','下单按钮'],
    superscriptList: ['新品', '热卖', 'NEW', 'HOT', '自定义'],
    defaultImg:'https://assets.2dfire.com/frontend/071bac5b44ade2005ad9091d1be18db6.png',
    isShowImgUpload: false,
    imgUrl: '',
    isShowGoods: false,
    data: []
  }

  componentDidMount() {
    this.getRetailGoodsList()
  }

  getRetailGoodsList = ({ keyWord } = {}) => {
    // 零售商品列表
    visualApi.getRetailGoodsList({ keyWord }).then(
      res=>{
          this.setState({
            data: res.data
          })
        },
      err=>{
        console.log('err', err)
      }
    )
  }

  onChange = (str, e) => {
    const { value, onChange } = this.props;
    const { config } =  value
    let target = e.target.value
    const orderButton = Object.assign({}, config.orderButton)
    orderButton[str] = target
    onChange(value, {config:{
      ...config,
      orderButton
    }})
  }
  _selectType = (e) => {
    // 样式选择
    const { value, onChange } = this.props;
    const { config } =  value

    onChange(value, {config:{
      ...config,
      mode: e.target.value
    }})
  }

  _checkboxChange = (item, e) => {
    // 多选框 ['名称', '价格', '下单按钮'] 事件
    const { value, onChange } = this.props;
    const { config } =  value

    let showFields = [...config.showFields]
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

  _superscriptCheckbox = (e) => {
    // 角标
    const { value, onChange } = this.props;
    const { config } =  value
    let showFields = [...config.showFields]

    if(e.target.checked) { // 选中
      showFields.push('角标')
    } else {
      showFields = showFields.filter( v => v!= '角标' )
    }

    onChange(value, {config:{
      ...config,
      showFields
    }})
  }

  _superscriptTypeChange = (e) => {
    // 角标类型选择
    const { value, onChange } = this.props;
    const { config } =  value
    let target = e.target.value
    let subscript = Object.assign({}, config.subscript )
    subscript.type = 'text'
    if (target == '自定义') {
      subscript.type = 'image'
    }
    subscript.text = target

    onChange(value, {config:{
      ...config,
      subscript
    }})
  }

  close = () => {
    this.setState({
      isShowImgUpload: false,
      isShowGoods: false,
    })
  }

  _getImg = (data) => {
    // 获取图片
    const { value, onChange } = this.props;
    const { config } =  value
    let subscript = Object.assign({}, config.subscript )
    subscript.image = data
    this.setState({
      imgUrl: data
    })
    onChange(value, {config:{
      ...config,
      subscript
    }})
  }

  closeItem = (index) => {
    // 删除商品
    const { value, onChange } = this.props;
    const { config } = value
    let goodsList = [...config.goodsList]
    goodsList.splice(index, 1)

    onChange(value, {config:{
      ...config,
      goodsList
    }})
  }

  getGoodsItem = (data) => {
    // 商品选择
    const { value, onChange } = this.props;
    const { config } =  value
    const length = data.length
    let goodsList = [...config.goodsList]

    if(this._maxGoodItem(length)) {
      for (let i = 0; i < length; i++) {
        goodsList.push(data[i].itemId)
      }
      onChange(value, {config:{
        ...config,
        goodsList
      }})
    }
  }

  _maxGoodItem = (len) => {
    const { value } = this.props;
    const { config } =  value
    const goodsListLen = config.goodsList.length
    if(Number(goodsListLen + len) > maxGood[config.mode]) {
      message.info(`${config.mode}最多添加${maxGood[config.mode]}个商品`);
      return false
    }
    return true
  }

  _onChangGoods = () => {
    this.setState({
      isShowGoods: true
    })
  }
  onChangeBtn = () => {
    this.setState({
      isShowImgUpload: !this.setState.isShowImgUpload
    })
  }

  imgList = (data, newGoodsList) => {
    // 图片列表
    const dataLen = data.length
    const goodLen = newGoodsList.length
    let imglist = []
    // debugger
    for( var i = 0; i < goodLen; i++ ) {
      for(var j = 0; j < dataLen; j++ ) {
        if(newGoodsList[i] == data[j].itemId) {
          imglist.push(data[j].imagePath)
        }
      }
    }
    return imglist
  }

  render(){
    const { value, prefix } = this.props;
    const {
      superscriptList, defaultImg, isShowImgUpload, imgUrl, isShowGoods, data, showFields
    } = this.state
    const { config } = value
    const { mode, orderButton, subscript } = value.config

    let newGoodsList = Array.from(config.goodsList)
    if(mode == '大图'){
      if(newGoodsList.length > 6) {
        newGoodsList = newGoodsList.splice(0, 6)
      }
    }

    let isShopButton = config.showFields.indexOf('下单按钮') > -1 // 是否显示商品按钮
    let isShowSuperscript = config.showFields.indexOf('角标') > -1 // 角标是否显示
    
    return (
      <div className={`${prefix}-design-component-config-editor`}>
        <ImgUpload
          getImg={this._getImg}
          isShowImgUpload={isShowImgUpload}
          close={this.close}
        />
        <GoogsSelect
          getGoodsItem={this.getGoodsItem}
          isShowGoods={isShowGoods}
          close={this.close}
        />
        <div className={style.componentGoodsEditor}>
          <ControlGroup
            label="样式选择："
            className={style.groupLabel}
          >
          </ControlGroup>
          <RadioGroup value={mode} className={style.controlGroupControl} onChange={(e) => this._selectType(e)}>
              <Radio name="mode" value='大图' className={style.radio}>大图</Radio>
              <Radio name="mode" value='详细列表' className={style.radio}>详细列表</Radio>
              <Radio name="mode" value='双列小图' className={style.radio}>双列小图</Radio>
              {/* <Radio name="imgType" value='transverse'>横向滑动</Radio> */}
          </RadioGroup>
        </div>
        <div className={style.componentGoodsEditor}>
          <ControlGroup
            label="商品选择："
            className={style.groupLabel}
          >
          </ControlGroup>
          <div className={style.shopImgList}>
            {this.imgList(data, newGoodsList).map((item, index) =>
              <div className={style.shopImgUl}>
                <img  className={style.imgItem} src={item || constants.defaultGoodsImg} />
                <img
                  className={style.closeBtn}
                  src="https://assets.2dfire.com/frontend/73a3ec09ff1b5814aea734d1e7e226cb.png"
                  onClick={() => this.closeItem(index)}
                />
              </div>
            )}
            <img onClick={this._onChangGoods} className={style.goodsBtn} src={defaultImg}></img>
          </div>
        </div>
        <div className={style.componentGoodsEditor}>
          <ControlGroup
            label="显示内容："
            className={style.groupLabel}
          >
          </ControlGroup>
          <div className={style.showContent}>
            {showFields.map((item) =>
             <Checkbox defaultChecked={true}  className={style.rankEditorCheckbox} onChange={(e) => this._checkboxChange(item, e)}>{item}</Checkbox>
            )}
            {isShopButton &&
              <div>
                <RadioGroup value={orderButton.mode} className={style.controlGroupControl} onChange={(e) => this.onChange('mode', e)}>
                  <Radio name="mode" value='立即下单'>立即下单</Radio>
                  <Radio name="mode" value='加入购物车'>加入购物车</Radio>
                </RadioGroup>
                {orderButton.mode == '立即下单' ?
                  <RadioGroup value={orderButton.orderStyle} className={style.controlGroupControl} onChange={(e) => this.onChange('orderStyle', e)}>
                    <Radio name="orderStyle" value='1'>样式一</Radio>
                    <Radio name="orderStyle" value='2'>样式二</Radio>
                  </RadioGroup> :
                  <RadioGroup value={orderButton.cartStyle} className={style.controlGroupControl} onChange={(e) => this.onChange('cartStyle', e)}>
                    <Radio name="cartStyle" value='1'>样式一</Radio>
                    <Radio name="cartStyle" value='2'>样式二</Radio>
                    <Radio name="cartStyle" value='3'>样式三</Radio>
                  </RadioGroup>}
              </div>}
            <Checkbox className={style.rankEditorCheckbox} onChange={this._superscriptCheckbox}>角标</Checkbox>
            {isShowSuperscript &&
              <RadioGroup value={subscript.text} className={style.controlGroupControl} onChange={this._superscriptTypeChange}>
                {superscriptList.map((item) =>
                    <Radio className={style.rankRadio} name="superscript" value={item}>{item}</Radio>
                )}
                {subscript.text == '自定义' &&
                  <div className={style.uploadInfo}>
                    <img onClick={this.onChangeBtn} className={style.uploadBtn} src={imgUrl ? imgUrl: defaultImg}></img>
                    <p className={style.uploadTip}>建议尺寸80X30px</p>
                  </div>
                }
            </RadioGroup>
            }
          </div>
        </div>
      </div>
    )
  }
  static designType = 'goodsList';
  static designDescription = '商品列表';
  static designTemplateType = '基础类';
  static getInitialValue() {
    return {
      config: {
        type: 'goodsList',
        mode: '大图',                // 可选值：大图、详细列表、双列小图、横向滑动
        showFields: ['名称', '价格', '下单按钮'],// 可使用值：名称、价格、下单按钮、角标 / 可以为空数组，商品主图是固定显示的 / 下单按钮设置（仅在 showFields 里有 '下单按钮' 时生效）
        goodsList: [],     // 选中的商品列表，最少1个，最多：大图6个、详细列表10个、双列小图10个、横向滑动6个
        orderButton: {                 // 下单按钮设置（仅在 showFields 里有 '下单按钮' 时生效）
          mode: '立即下单',             // 可选值：立即下单、加入购物车
          orderStyle: '1',             // 立即下单按钮样式。可选值：'1'、'2'。仅在 mode=立即下单 时生效
          cartStyle: '1',              // 加入购物车按钮样式。可选值：'1'、'2'、'3'。仅在 mode=加入购物车 时生效
        },
        subscript: {                     // 角标设置（仅在 showFields 里有 '下单按钮' 时生效）
            type: 'text',               // 角标类型。可选值：text、image
            text: '新品',                 // 可选值：新品、热卖、NEW、HOT。仅在 type=text 时生效
            image: null,                // image URL。在 type=image 时有效且必填
        },
      }
    };
  }
}
