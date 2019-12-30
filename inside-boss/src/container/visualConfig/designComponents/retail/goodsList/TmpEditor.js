import React from 'react';
import { Radio, Checkbox, message } from 'antd';
import visualApi from '@src/api/visualConfigApi'
import ImgUpload from '@src/container/visualConfig/views/design/common/imgUpload'
import GoogsSelect from '@src/container/visualConfig/views/design/common/googsSelect'
import { DesignEditor, ControlGroup } from '@src/container/visualConfig/views/design/editor/DesignEditor';
import cx from 'classnames'
import style from './TmpEditor.css'
import constants from '@src/container/visualConfig/views/design/common/constants'

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
    data: [],
    imgList: [],
    img: 'http://assets.2dfire.com/frontend/fad1279df20c0a5371eee760e5a47d57.png'
  }

  componentDidMount() {
    this.init()
  }

  init = () => {
    const { value } = this.props;
    const { config } = value
    const { mode } = value.config
    let newGoodsList = Array.from(config.goodsList)
    if(!newGoodsList.length) return false

    if(mode == '大图'){
      if(newGoodsList.length > 6) {
        newGoodsList = newGoodsList.splice(0, 6)
      }
    }
    this.getSpecifyRetailGoodsList(newGoodsList)
  }

  configChang = (obj) => {
    const { value, onChange } = this.props;
    const { config } =  value
    onChange(value, { config: {
      ...config,
      ...obj
    }})
  }

  changeGroup = (str, e) => {
    const { value } = this.props;
    const { config } =  value
    let target = e.target.value
    const orderButton = Object.assign({}, config.orderButton)
    orderButton[str] = target
    this.configChang({orderButton})
  }
  _selectType = (e) => {
    // 样式选择
    this.configChang({mode: e.target.value})
  }

  _checkboxChange = (item, e) => {
    // 多选框 ['名称', '价格', '下单按钮'] 事件
    const { value } = this.props;
    const { config } =  value

    let showFields = [...config.showFields]
    if(e.target.checked) { // 选中
      showFields.push(item)
    } else {
      showFields = showFields.filter(v => v != item)
    }
    this.configChang({showFields})
  }

  _superscriptCheckbox = (e) => {
    // 角标
    const { value } = this.props;
    const { config } =  value

    let showFields = [...config.showFields]
    if(e.target.checked) { // 选中
      showFields.push('角标')
    } else {
      showFields = showFields.filter( v => v!= '角标' )
    }
    this.configChang({showFields})
  }

  _superscriptTypeChange = (e) => {
    // 角标类型选择
    let target = e.target.value
    let subscript =  { 
      type: 'text',    
      text: '新品', 
      image: null, 
    }
    if (target == '自定义') {
      subscript.type = 'image'
    }
    subscript.text = target
    this.configChang({subscript})
  }

  close = () => {
    this.setState({
      isShowImgUpload: false,
      isShowGoods: false,
    })
  }

  _getImg = (data) => {
    // 获取角标图片
    let subscript =  { 
      type: 'image',    
      text: '自定义', 
      image: null, 
    }
    subscript.image = data
    this.configChang({subscript})
    this.setState({
      imgUrl: data
    })
  }

  closeItem = (index) => {
    // 删除商品
    const { value } = this.props;
    const { config } = value
    let goodsList = [...config.goodsList]
    goodsList.splice(index, 1)
    let imgList = [...this.state.imgList]
    imgList.splice(index, 1)
    this.setState({
      imgList
    })
    
    this.configChang({goodsList})
  }

  getGoodsItem = (data) => {
    // 商品选择
    const { value } = this.props;
    const { config } =  value
    const length = data.length
    let goodsList = [...config.goodsList]
    if(this._maxGoodItem(length)) {
      for (let i = 0; i < length; i++) {
        goodsList.push(data[i].itemId)
      }
      this.getSpecifyRetailGoodsList(goodsList)
      this.configChang({goodsList})
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

  getSpecifyRetailGoodsList = (idList) => {
    // 图片列表
    let imgArr = []
    visualApi.getSpecifyRetailGoodsList({ idList }).then(
      res=>{
        for(let i = 0; i< res.data.length; i++){
          if(!res.data[i].imagePath){
            imgArr.push(this.img)
          }else{
            imgArr.push(res.data[i].imagePath)
          }
        }
        this.setState({
          imgList: imgArr
        })
      },
      err=>{
        console.log('err', err)
      }
    )
  }

  render(){
    const { value, prefix } = this.props;
    const {
      superscriptList, defaultImg, isShowImgUpload, imgUrl, isShowGoods, showFields, imgList
    } = this.state
    const { config } = value
    const { mode, orderButton, subscript } = value.config

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
            {imgList.map((item, index) =>
              <div className={style.shopImgUl}>
                <div className={cx(style.imgItem, 'desigeCove')} style={{backgroundImage:`url(${item || constants.defaultGoodsImg})`}}></div>
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
                <RadioGroup value={orderButton.mode} className={style.controlGroupControl} onChange={(e) => this.changeGroup('mode', e)}>
                  <Radio name="mode" value='立即下单'>立即下单</Radio>
                  <Radio name="mode" value='加入购物车'>加入购物车</Radio>
                </RadioGroup>
                {orderButton.mode == '立即下单' ?
                  <RadioGroup value={orderButton.orderStyle} className={style.controlGroupControl} onChange={(e) => this.changeGroup('orderStyle', e)}>
                    <Radio name="orderStyle" value='1'>样式一</Radio>
                    <Radio name="orderStyle" value='2'>样式二</Radio>
                  </RadioGroup> :
                  <RadioGroup value={orderButton.cartStyle} className={style.controlGroupControl} onChange={(e) => this.changeGroup('cartStyle', e)}>
                    <Radio name="cartStyle" value='1'>样式一</Radio>
                    <Radio name="cartStyle" value='2'>样式二</Radio>
                    <Radio name="cartStyle" value='3'>样式三</Radio>
                  </RadioGroup>}
              </div>}
            <Checkbox defaultChecked={isShowSuperscript} className={style.rankEditorCheckbox} onChange={this._superscriptCheckbox}>角标</Checkbox>
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
