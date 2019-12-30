import React from 'react';
import { Radio, Button, Icon } from 'antd';
import cx from 'classnames'
import visualApi from '@src/api/visualConfigApi'
import ImgUpload from '../../common/imgUpload'
import GoogsSelect from '../../common/googsSelect'
import Dropdown from '../../common/dropdown'
import { DesignEditor, ControlGroup } from '../../editor/DesignEditor';
import style from './AdEditor.css'

const RadioGroup = Radio.Group;

export default class AdEditor extends DesignEditor {
  state = {
    size: 'large',
    isShowImgUpload: false,
    isShowGoods: false,
    goodIndex: -1,
    goodsNames: [],
    defaultImg: 'https://assets.2dfire.com/frontend/071bac5b44ade2005ad9091d1be18db6.png'
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
    const {config} =  value

    onChange(value, {config: {
      ...config,
      [str]: e.target.value
    }})
  }

  onChangeBtn = (index) => {
    this.setState({
      isShowImgUpload: !this.setState.isShowImgUpload,
      goodIndex: index
    })
  }

  close = () => {
    this.setState({
      isShowImgUpload: false,
      isShowGoods: false,
    })
  }

  _selectType = (index, e) => {
    // 样式选择
    this.setState({
      goodIndex: index
    })
    const { value, onChange } = this.props;
    const {config} =  value
    let items = [...config.items]
    items[index].linkType = e.target.value

    onChange(value,{ config: {
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
    
    onChange(value,{ config: {
      ...config,
      items
    }})
  }

  getlinkGoodsName = (item, index) => {
    const { goodsNames } = this.state
    let name
    goodsNames.find((c) => {
      if(item.linkGoodsId == c.itemId) {
        name = c.itemName
      }
    })
    return <div onClick={(e) => this._onChangGoods(index, e)} className={style.picturlink}> {name ? name : '选择商品的链接'} <Icon type="down" /></div>
  }

  relationPriew = () => {
    // 导航编辑组件
    const { config } = this.props.value;
    const { items } = config
    const {defaultImg} = this.state
    return(
      items.map((item, index) =>
        <div className={style.picturEdit}>
          <img
            className={style.closeBtn}
            src="https://assets.2dfire.com/frontend/73a3ec09ff1b5814aea734d1e7e226cb.png"
            onClick={() => this.closeItem(index)}
          />
          <img onClick={(e) =>this.onChangeBtn(index, e)} className={style.uploadBtn} src={item.picture ? item.picture: defaultImg}></img>
          <div className={style.EditInfo}>
            <div className={style.picturEditor}>
              <div className={style.text}>关联：</div>
              <RadioGroup value={item.linkType} className={style.picturRelation} onChange={(e) => this._selectType(index, e)}>
                  <Radio name="linkType" value='goods' className={style.radio}>商品</Radio>
                  <Radio name="linkType" value='page' className={style.radio}>页面</Radio>
              </RadioGroup>
            </div>
            <div className={cx(style.picturEditor, style.picturLink)}>
              <div className={style.text}>链接：</div>
                {item.linkType == 'goods'
                    ? this.getlinkGoodsName(item, index)
                    : <Dropdown selectLink={this._selectLink} current={item.linkPage} />}
            </div>
          </div>
        </div>
      )
    )
  }

  _selectLink = (data) => {
    // 页面链接选择
    const { value, onChange } = this.props;
    const {config} =  value
    const {goodIndex} = this.state
    let items = [...config.items]
    items[goodIndex].linkPage = data

    onChange(value,{ config: {
      ...config,
      items
    }})
  }
  _onChangGoods = (index) => {
    this.setState({
      isShowGoods: true,
      goodIndex: index
    })
  }
  _getImg = (data) => {
    // 获取图片
    const { value, onChange } = this.props;
    const { config } =  value
    const { goodIndex } = this.state
    let items = [...config.items]

    if(items.length == 0){
      items.push({
        picture: '',            // 图片 URL，必填
        linkType: 'goods',      // 图片链接到哪里。可选值：goods（商品）、page（页面）
        linkGoodsId: '',        // 链接到的商品 id，在 linkType 为 goods 时有效且必填
        linkPage: '',           // 链接到的页面路径，在 linkType 为 page 时有效且必填
      })
    }
    if(config.mode == '单图'){
      items[0].picture = data
    } else {
      items[goodIndex].picture = data
    }
    onChange(value,{ config: {
      ...config,
      items
    }})
  }

  addImg = () => {
    // 轮播图添加图片按钮
    const { value, onChange } = this.props;
    const { config } =  value
    let items = [...config.items]

    if(config.mode == '单图'){
      this.setState({
        isShowImgUpload: !this.setState.isShowImgUpload,
      })
      return
    }
    items.push({
      picture: '',            // 图片 URL，必填
      linkType: 'goods',      // 图片链接到哪里。可选值：goods（商品）、page（页面）
      linkGoodsId: '',        // 链接到的商品 id，在 linkType 为 goods 时有效且必填
      linkPage: '',           // 链接到的页面路径，在 linkType 为 page 时有效且必填
    })
    onChange(value,{ config: {
      ...config,
      items
    }})
  }

  getGoodsItem = (data) => {
    // 商品选择
    const { value, onChange } = this.props;
    const { config } =  value
    const {goodIndex} = this.state
    let items = [...config.items]

    items[goodIndex].linkGoodsId = data[0].itemId
    const arrgoodsNames =  [...this.state.goodsNames]

     if(!arrgoodsNames.some(c => {return c.itemId ==  data[0].itemId})){
      arrgoodsNames.push(data[0])
      this.setState({
        goodsNames:arrgoodsNames
      })
     }
     onChange(value,{ config: {
      ...config,
      items
    }})
  }

  render(){
    const { value, prefix, validation } = this.props;
    const { config } = value;
    const size = this.state.size;
    const { isShowImgUpload, isShowGoods }= this.state;

    let isShowCompont = false

    if(config.items.length == 0){
      isShowCompont = false
    }
    if(config.items.length > 0) {
      if(config.items[0].picture == ''){
        isShowCompont = false
      } else {
        isShowCompont = true
      }
      if(config.mode =='轮播图'){
        isShowCompont = true
       }
    }

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
        <div className={style.componentConfigEditor}>
          <ControlGroup
            label="选择模板:"
            error={validation.hasPadding}
            className={style.groupLabel}
          >
          </ControlGroup>
          <Radio.Group value={config.mode} buttonStyle="solid" className={style.controlGroupControl} onChange={(e) => this.onChange('mode', e)}>
              <Radio.Button value="单图" name='mode' className={style.imgType}>
                <img src={value.config.mode == '单图' ? 'https://assets.2dfire.com/frontend/d777e5330a31b209352eff0db2fe568e.png':'https://assets.2dfire.com/frontend/3bc532d72c77bcabc0bc8602d9a26249.png'} />
              </Radio.Button>
              <Radio.Button value="轮播图" name='mode' className={style.imgType}>
                <img src={config.mode == '轮播图' ? 'https://assets.2dfire.com/frontend/e25c6ce74c7a13e93c801e6b5e5cdde7.png':'https://assets.2dfire.com/frontend/e036d229a2c1f0d260b7dd6229d000b7.png'} />
              </Radio.Button>
              {/* <Radio.Button value="c" name='hasPadding' className={style.imgType}>
                <img src={value.hasPadding == 'c' ? 'https://assets.2dfire.com/frontend/36cbfa04856035395fe5a388b9ff0bf9.png':'https://assets.2dfire.com/frontend/e926936b709902682c4c6265babb0735.png'} />
              </Radio.Button> */}
          </Radio.Group>
        </div>
        <div className={style.componentConfigEditor}>
          <ControlGroup
            label="图片添加:"
            error={validation.hasPadding}
            className={style.groupLabel}
          >
          </ControlGroup>
          <div className={style.adBut}>
            {isShowCompont && this.relationPriew()}
            {config.items.length <= 4 && <Button onClick={this.addImg} className={style.adAntBtn} type="primary" shape="round" icon="plus" size={size}>添加图片</Button>}
            <p className={style.tipAdBut}>建议宽度为750px</p>
          </div>
        </div>
      </div>
    )
  }
  static designType = 'pictureAds';
  static designTemplateType = '基础类';
  static designDescription = '图片广告';
  static getInitialValue() {
    return {
      config: {
        type: 'pictureAds',
        mode: '单图',               // 模板类型；可选值：单图、轮播图、横向滑动
        // 图片项列表。最多添加 5 项。mode 为 "单图" 时，只使用列表里的第一项
        items: [
            {
                picture: '',            // 图片 URL，必填
                linkType: 'goods',      // 图片链接到哪里。可选值：goods（商品）、page（页面）
                linkGoodsId: "",        // 链接到的商品 id，在 linkType 为 goods 时有效且必填
                linkPage: '',           // 链接到的页面路径，在 linkType 为 page 时有效且必填
            },
        ]
      }
    };
  }
}
