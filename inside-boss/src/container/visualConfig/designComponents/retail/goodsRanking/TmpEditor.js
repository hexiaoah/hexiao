import React from 'react';
import { Radio, Icon, Menu, Dropdown, Button, Checkbox, message } from 'antd';
import ImgUpload from '@src/container/visualConfig/views/design/common/imgUpload'
import { DesignEditor, ControlGroup } from '@src/container/visualConfig/views/design/editor/DesignEditor';
import style from './TmpEditor.css'

const RadioGroup = Radio.Group;
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
export default class RankingEditor extends DesignEditor {
  state = {
    defaultArr: arr,
    showFields: ['名称', '价格','下单按钮'],
    superscriptList: ['新品', '热卖', 'NEW', 'HOT', '自定义'],
    defaultImg:'https://assets.2dfire.com/frontend/071bac5b44ade2005ad9091d1be18db6.png',
    isShowImgUpload: false,
    imgUrl: ''
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
    const target = e.target.value
    let _newArr = Array.from(arr);
    let rankingLimit = 1
    if (target == '详细列表') {
      rankingLimit = 3
      _newArr = _newArr.splice(2)
    }
    if (target == '双列小图') {
      rankingLimit = 2
      _newArr = _newArr.splice(1)
    }
    this.setState({
      defaultArr: _newArr,
    })
    this.configChang({
      mode: target,
      rankingLimit,
    })
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


  selectRankType = ({key}) => {
    // 排行类型选择
    this.configChang({ranking: key})
  }

  selectShopNum = ({key}) => {
    // 商品数量选择
    const { value, onChange } = this.props;
    const { config } =  value
    let _arrShoplist = Array.from(arr);

    onChange(value, {
      arrShopLis:_arrShoplist.splice(0, key),
      config:{
        ...config,
        rankingLimit: key
      }
    })
  }

  close = () => {
    this.setState({
      isShowImgUpload: false,
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

  onChangeBtn = () => {
    this.setState({
      isShowImgUpload: !this.setState.isShowImgUpload
    })
  }

  render(){
    const { value, prefix } = this.props;
    const { config } = value
    const { defaultArr, superscriptList, defaultImg, isShowImgUpload, imgUrl, showFields } = this.state
    const { ranking, rankingLimit, mode, orderButton, subscript } = value.config

    let isShopButton = config.showFields.indexOf('下单按钮') > -1 // 是否显示商品按钮
    let isShowSuperscript = config.showFields.indexOf('角标') > -1 // 角标是否显示


    // 排行类型:
    const rankListMenu = (
      <Menu onClick={this.selectRankType}>
        <Menu.Item key="综合排序">综合排序</Menu.Item>
        <Menu.Item key="销量排行">销量排行</Menu.Item>
        <Menu.Item key="最新商品">最新商品</Menu.Item>
      </Menu>
    );

    // 展示商品数:
    const shopNumMenu = (
      <Menu onClick={this.selectShopNum}>
        {defaultArr.map((item) =>
          <Menu.Item key={item}>{item}</Menu.Item>
        )}
      </Menu>
    );

    return (
      <div className={`${prefix}-design-component-config-editor`}>
        <ImgUpload
          getImg={this._getImg}
          isShowImgUpload={isShowImgUpload}
          close={this.close}
        />
        <div className={style.componentConfigEditor}>
          <ControlGroup
            label="排行类型："
            className={style.groupLabel}
          >
          </ControlGroup>
          <Dropdown overlay={rankListMenu}>
            <Button style={{ marginLeft: 8 }} className={style.rankButton}>
              {ranking} <Icon type="down" />
            </Button>
          </Dropdown>
        </div>
        <div className={style.componentConfigEditor}>
          <ControlGroup
            label="展示商品数："
            className={style.groupLabel}
          >
          </ControlGroup>
          <Dropdown overlay={shopNumMenu}>
            <Button style={{ marginLeft: 8 }} className={style.rankButton}>
              {rankingLimit} <Icon type="down" />
            </Button>
          </Dropdown>
        </div>
        <div className={style.componentConfigEditor}>
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
        <div className={style.componentConfigEditor}>
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
  static designType = 'goodsRanking';
  static designDescription = '商品排行';
  static designTemplateType = '基础类';
  static getInitialValue() {
    return {
      config: {
        type: 'goodsRanking',
        ranking: '综合排序',         // 排行类型。可选值：综合排序、销量排行、最新商品
        rankingLimit: 1,            // 显示多少个排行商品；取值范围：2 ~ 12
        mode: '大图',                // 可选值：大图、详细列表、双列小图、横向滑动
        showFields: ['名称', '价格', '下单按钮'],// 可使用值：名称、价格、下单按钮、角标 / 可以为空数组，商品主图是固定显示的 / 下单按钮设置（仅在 showFields 里有 '下单按钮' 时生效）
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
