import React from 'react';
import { Radio, Button, Input, Icon } from 'antd';
import { SketchPicker } from 'react-color';
import cx from 'classnames'
import visualApi from '@src/api/visualConfigApi'

import ImgUpload from '../../common/imgUpload'
import Dropdown from '../../common/dropdown'
import GoogsSelect from '../../common/googsSelect'
import { DesignEditor, ControlGroup } from '../../editor/DesignEditor';
import style from './pictureTextEditor.css'

const RadioGroup = Radio.Group;
export default class pictureTextEditor extends DesignEditor {
  state = {
    isSketchPicker: false,
    defaultImg:'https://assets.2dfire.com/frontend/071bac5b44ade2005ad9091d1be18db6.png',
    isShowImgUpload: false,
    isShowGoods: false,
    relationIndex: -1, // 导航编辑选中值
    goodsNames: [],
  };

  componentDidMount() {
    const { config } = this.props.value;
    const { items } = config

    const arrId = []
    for(let i = 0; i < items.length; i++) {
      if(items[i].linkGoodsId.length) arrId.push(items[i].linkGoodsId)
    }

    if(arrId) {
      this.getSpecifyRetailGoodsList(arrId)
    }
  }

  getSpecifyRetailGoodsList(arrId) {
    // 通用接口，通过ID来查询信息接口
    visualApi.getSpecifyRetailGoodsList({ idList: arrId }).then(
      res=>{
        this.setState({
          goodsNames: res.data
        })
        },
      err=>{
        console.log('err', err)
      }
    )
  }

  onChange = (str, e) => {
    const { value, onChange } = this.props;
    const { config} = value;

    onChange(value, {config:{
      ...config,
      [str]: e.target.value
    }})
  }


  showSkentPick = (str) => {
    this.setState({
      [str]: !this.state[str]
    })
  }

  handleChangeComplete = (color) => {
    // 拾色器的回调
    const { value, onChange } = this.props;
    const { config } = value;

     onChange(value, {config:{
      ...config,
      textColor: color.hex
    }})
  }

  onChangeInput = (index, e) => {
    //input 回调
    const { value, onChange } = this.props;
    const { config } = value
    let items = [...config.items]
    items[index].text = e.target.value
    onChange(value, {config:{
      ...config,
      items
    }})
  }

  closeItem = (index) => {
    // 删除编辑组件
    const { value, onChange } = this.props;
    const { config } = value
    let items = [...config.items]
    items.splice(index, 1)
    onChange(value, {config:{
      ...config,
      items
    }})
  }

  addItem = () => {
    // 添加编辑组件
    const { value, onChange } = this.props;
    const { config } = value
    let items = [...config.items]

    items.push({
      picture: '',
      text: '',
      linkType: 'goods',
      linkGoodsId: '',
      linkPage: '',
    })
    onChange(value, {config:{
      ...config,
      items
    }})
  }

  close = () => {
    this.setState({
      isShowImgUpload: false,
      isShowGoods: false,
    })
  }

  onChangeBtn = (index) => {
    this.setState({
      isShowImgUpload: !this.setState.isShowImgUpload,
      relationIndex: index
    })
  }
  _getImg = (data) => {
    // 获取图片
    const { value, onChange } = this.props;
    const { config } =  value
    const { relationIndex } = this.state
    let items = [...config.items]
    items[relationIndex].picture = data
    onChange(value, {config:{
      ...config,
      items
    }})
  }
  getGoodsItem = (data) => {
    // 商品选择
    const { value, onChange } = this.props;
    const { config } =  value
    const { relationIndex } = this.state
    let items = [...config.items]
    items[relationIndex].linkGoodsId = data[0].itemId
    const arrgoodsNames =  [...this.state.goodsNames]

     if(!arrgoodsNames.some(c => {return c.itemId ==  data[0].itemId})){
      arrgoodsNames.push(data[0])
      this.setState({
        goodsNames:arrgoodsNames
      })
     }
     onChange(value, {config:{
      ...config,
      items
    }})
  }
  _selectLink = (data) => {
    // 页面链接选择
    const { value, onChange } = this.props;
    const { config } =  value
    const {relationIndex} = this.state
    let items = [...config.items]
    items[relationIndex].linkPage = data
    onChange(value, {config:{
      ...config,
      items
    }})
  }
  _selectlinkType = (str, index, e) => {
    // 关联选择
    const { value, onChange } = this.props;
    const { config } =  value
    let items = [...config.items]
    items[index].linkType= e.target.value
    this.setState({
      relationIndex: index
    })
    onChange(value, {config:{
      ...config,
      items
    }})
  }

  _onChangGoods = (index) => {
    this.setState({
      isShowGoods: true,
      relationIndex: index
    })
  }

  getlinkGoodsName = (item, index) => {
    const { goodsNames } = this.state
    let name
    goodsNames.find((c) => {
      if(item.linkGoodsId == c.itemId) {
        name = c.itemName
      }
    })
    return <div onClick={(e) => this._onChangGoods(index, e)} className={style.link}> {name ? name : '选择商品的链接'} <Icon type="down" /></div>
  }
  
  relationPriew = () => {
    // 导航编辑组件
    const { config } = this.props.value;
    const { items } = config
    const { defaultImg } = this.state
    return(
      items.map((item, index) =>
        <div className={style.picturEdit}>
          <img
            className={style.closeBtn}
            src="https://assets.2dfire.com/frontend/73a3ec09ff1b5814aea734d1e7e226cb.png"
            onClick={() => this.closeItem(index)}
          />
          {config.mode !== '文字导航' && <img onClick={(e)=>this.onChangeBtn(index, e)} className={style.uploadBtn} src={item.picture ? item.picture : defaultImg}></img> }
          <div className={style.EditInfo}>
            {config.mode !== '图片导航'&& <div className={style.picturEditor}>
              <div className={style.text}>文字：</div>
              <Input
                className={style.picturInput}
                value={item.text}
                onChange={(e) => this.onChangeInput(index, e)}
                maxLength={5}
              />
            </div>}
            <div className={style.picturEditor}>
              <div className={style.text}>关联：</div>
              <RadioGroup value={item.linkType} className={style.picturRelation} onChange={(e) => this._selectlinkType('linkType',index, e)}>
                  <Radio name="linkType" value='goods' className={style.radio}>商品</Radio>
                  <Radio name="linkType" value='page' className={style.radio}>页面</Radio>
              </RadioGroup>
            </div>
            <div className={cx(style.picturEditor)}>
              <div className={style.text}>链接：</div>
              {item.linkType == 'goods'
                   ? this.getlinkGoodsName(item, index)
                   : <Dropdown selectLink={this._selectLink} current={item.linkPage} /> }
            </div>
          </div>
        </div>
      )
    )
  }

  render(){
    const { value, prefix, validation } = this.props;
    const { isSketchPicker, isShowImgUpload, isShowGoods  } = this.state
    return (
      <div className={`${prefix}-design-component-config-editor`}>
        <ImgUpload
          getImg={this._getImg}
          isShowImgUpload={isShowImgUpload}
          close={this.close}
        />
        <GoogsSelect
          radio
          getGoodsItem={this.getGoodsItem}
          isShowGoods={isShowGoods}
          close={this.close}
        />
        <div className={style.componentPictureEditor}>
          <ControlGroup
            label="选择模板:"
            className={style.groupLabel}
          >
          </ControlGroup>
          <Radio.Group value={value.config.mode} buttonStyle="solid" className={style.controlGroupControl} onChange={(e) => this.onChange('mode', e)}>
              <Radio.Button value="图片导航" name='mode' className={style.imgType}>
                <img src={value.config.mode == '图片导航' ? 'https://assets.2dfire.com/frontend/0f0f9c1bdd56eaecbe804301ec82d544.png':'https://assets.2dfire.com/frontend/08995c4ef91a4114fed2ac227748ab2e.png'} />
              </Radio.Button>
              <Radio.Button value="文字导航" name='mode' className={style.imgType}>
                <img src={value.config.mode == '文字导航' ? 'https://assets.2dfire.com/frontend/57849c5c4082ceb4af51be0682b45be1.png':'https://assets.2dfire.com/frontend/81e870fa6369e30fd0b18f104ad9a240.png'} />
              </Radio.Button>
              <Radio.Button value="图文导航" name='mode' className={style.imgType}>
                <img src={value.config.mode == '图文导航' ? 'https://assets.2dfire.com/frontend/a6fe3b53bd3709ea5db4e2ae778235a5.png':'https://assets.2dfire.com/frontend/25a7c1585867a20f9715c0485c714a72.png'} />
              </Radio.Button>
          </Radio.Group>
        </div>
        {value.config.mode != '图片导航'&&
          <div className={style.componentPicturEditor}>
            <ControlGroup
              label="文字颜色："
              className={style.groupLabel}
            >
            </ControlGroup>
            <div className={style.PicturPickColor}>
              <Button style={{backgroundColor: value.config.textColor}} className={style.pickColorBtn} onClick={() => this.showSkentPick('isSketchPicker')} type="primary" />
              {isSketchPicker &&
                <SketchPicker
                  color={value.config.textColor}
                  className={style.PicturSketchPicker}
                  onChangeComplete={this.handleChangeComplete}
              />}
            </div>
          </div>
        }
        <div className={style.componentPicturEditor}>
          <ControlGroup
            label="导航编辑:"
            error={validation.hasPadding}
            className={style.groupLabel}
          >
          </ControlGroup>
          <div className={style.picturEditList}>
            {this.relationPriew()}
            {value.config.items.length < 4 &&<Button onClick={() => this.addItem()} className={style.adAntBtn} type="primary" shape="round" icon="plus" >添加一个导航</Button>}
          </div>
        </div>
      </div>
    )
  }
  static designType = 'pictureTextNav';
  static designDescription = '图文导航';
  static designTemplateType = '基础类';
  static getInitialValue() {
    return {
      config: {
        type: 'pictureTextNav',
        mode: '图片导航',           // 导航类型。可选值：图片导航、文字导航、图文导航
        textColor: '#000000',      // 只在 mode=文字导航|图文导航 时有效
          // 导航项列表。导航项数量：1 ~ 4 个，默认 3 个。
          items: [
              {
                picture: '',       // mode=图片导航|图文导航 时有效且必填
                text: '导航一',          // mode=文字导航|图文导航 时有效且必填
                linkType: 'goods',      // 导航链接到哪里。可选值：goods（商品）、page（页面）
                linkGoodsId: '',        // 链接到的商品 id，在 linkType 为 goods 时有效。可不填
                linkPage: '',           // 链接到的页面路径，在 linkType 为 page 时有效。可不填
              },
              {
                picture: '',       // mode=图片导航|图文导航 时有效且必填
                text: '导航二',          // mode=文字导航|图文导航 时有效且必填
                linkType: 'goods',      // 导航链接到哪里。可选值：goods（商品）、page（页面）
                linkGoodsId: '',        // 链接到的商品 id，在 linkType 为 goods 时有效。可不填
                linkPage: '',           // 链接到的页面路径，在 linkType 为 page 时有效。可不填
            },
            {
              picture: '',       // mode=图片导航|图文导航 时有效且必填
              text: '导航三',          // mode=文字导航|图文导航 时有效且必填
              linkType: 'goods',      // 导航链接到哪里。可选值：goods（商品）、page（页面）
              linkGoodsId: '',        // 链接到的商品 id，在 linkType 为 goods 时有效。可不填
              linkPage: '',           // 链接到的页面路径，在 linkType 为 page 时有效。可不填
          },
        ]
      }
    };
  }
}
