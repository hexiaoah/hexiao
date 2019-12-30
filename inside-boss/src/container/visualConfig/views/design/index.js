import React, { Component } from 'react';
import { Button, Menu, Dropdown, Icon, message  } from 'antd';
import assign from 'lodash/assign';
import uuid from 'uuid';

import Design from './Design'
import Config from './compoents/config'
import Ad from './compoents/ad'
import Ranking from './compoents/ranking'
import Slider from './compoents/slider'
import Title from './compoents/title'
import PictureText from './compoents/pictureText'
import Coupons from './compoents/coupons'
import Seach from './compoents/seach'
import Announce from './compoents/announce'
import Navigation from './compoents/navigation'
import Telephone from './compoents/telephone'
import Goods from './compoents/goods'
import CateList from './compoents/cate'
import MyPage from './compoents/mypage'
import visualApi from '@src/api/visualConfigApi'
import { entityId } from './utils/index'
import session from './tempConfig'
import style from './index.css'
import defaultConfig from './common/defaultConfig'
import validators from './common/validators'

var QRCode = require('qrcode.react');

const components = [
  Config,
  // lineConf,
  Ad,
  Ranking,
  Slider,
  Title,
  PictureText,
  Coupons,
  Seach,
  Announce,
  Navigation,
  Telephone,
  Goods,
  CateList,
  MyPage,
]

const UUID_KEY = '__zent-design-uuid__';

export default class DesignIndex extends Component {
  state = {
    designMode: null,
    shopInfo: null,
    value: [],
    qRcodeL: null,
    backgroundImage: null,
    compontmaxNum: {
      '店招': 1,
      '图片广告': 10,
      '商品排行': 3,
      '辅助留白': 10,
      '标题': 10,
      '图文导航': 5,
      '优惠券': 3,
      '商品搜索框': 1,
      '公告信息': 3,
      '客服电话': 3,
      '商品列表': 5,
      '导航': 1
    },
    compontContent: null, // 备份回来的数据，或者上架的数据
  }

  componentDidMount() {
    this.getShopInfo()
  }

  getShopInfo = () => {
    const [name, content] = session.get()
       // 获取店铺信息
      visualApi.getShopInfo().then(
        res=>{
          this.setState({ shopInfo: res.data })
          if(name) {
            const mode = {
                'page:home': '微店铺首页',
                'theme': '店铺导航',
                'page:cate': '商品分类页',
                'page:mine': '我的页面',
            }[name]
            this.restoreConfig(mode, content)
          } else {
            this.initMode('微店铺首页')
          }
         },
        err=>{
          message.error('店铺信息获取失败')
        }
     )
  }

  setUUIDForValue(value, id) {
    if (value) {
      value[UUID_KEY] = id;
    }

    return value;
  }

  getConfigName(designMode) {
      switch (designMode || this.state.designMode) {
          case '微店铺首页':
              return 'page:home'
          case '店铺导航':
              return 'theme'
          case '商品分类页':
              return 'page:cate'
          case '我的页面':
              return 'page:mine'
          default:
              return 'page:home'
      }
  }

  commonData = (validate=false) => {
    let content = {}
    let errorMsg = null

    const configName = this.getConfigName()
    if (configName == 'page:home' || 'page:cate' ) {
        const { value, backgroundImage } = this.state
        content = {
            backgroundImage,
            components: value.map(i => i.config)
        }
        if (validate) errorMsg = validators.page(content)
    } else if(configName === 'theme' || 'page:mine') {
        content = this.state.value[0].config
        if (validate) errorMsg = validators.theme(content)
    }

    if (errorMsg) {
        message.error(errorMsg)
        return null
    }

    return ({
      ...this.state.shopInfo,
      entityId,
      name: configName,
      content: JSON.stringify(content)
    })
  }

  publishAjax = () => {
    const data = this.commonData(true)
    if (!data) return

    // 上架
    visualApi.publish(data).then(
      res=>{
        if(res.data) {
          message.info('上架成功')
        }
       },
      err=>{
        console.log('err', err)
      }
   )
  }

  previewAjax = () => {
    // 预览
    visualApi.preview(this.commonData(true)).then(
      res=>{
        this.setState({
          qRcodeL:res.data
        })
       },



      err=>{
        console.log('err', err)
      }
   )
  }
  backupsAjax = () => {
    // 备份
    visualApi.backup(this.commonData()).then(
      res=>{
        if(res.data) {
          message.info('备份成功')
        }
       },
      err=>{
          const confirmed = confirm(err.message)
          if (!confirmed) return

          visualApi.backup({ ...this.commonData(), force: 1 })
            .then(res => {
                if (res.data) {
                    message.info('备份成功')
                }
            }, err => {
                message.info(err.message)
            })
      }
   )
  }

  initMode = (mode) => {
    if (this.designMode) this.setState({ designMode: null })
    const { appId, appVersionId } = this.state.shopInfo
    visualApi.getConfigContent({
      name: this.getConfigName(mode),
      appId,
      appVersionId
    }).then(res => {
        this.restoreConfig(mode, res.data.content)
      }, err => {
        this.setState({ designMode: mode })
        message.error('装修信息获取失败')
      }
    )
  }

  restoreConfig = (mode, config=null) => {
    if (!config || (typeof config === 'string' && config.length <= 2)) {
      config = defaultConfig[this.getConfigName(mode)]
    }
    if (typeof config === 'string') {
      config = JSON.parse(config)
    }

    if (mode === '微店铺首页') {
      const {backgroundImage, components: backupsComponents} = config
      if(backgroundImage) {
        // 背景
        this.backgroundChang(backgroundImage)
      }

      let newValue = []
      for( var i = 0; i < backupsComponents.length; i++ ){
        for(var j = 0; j< components.length; j++){
          if(backupsComponents[i].type == components[j].type ){
            const instance = components[j].editor.getInitialValue()

            instance.canDelete = true // 是否可以删除
            instance.config = assign({}, instance.config, backupsComponents[i])
            instance.type = components[j].editor.designType
            instance.title = components[j].editor.designDescription
            const id = uuid();
            this.setUUIDForValue(instance, id);

            newValue.push(instance);
          }
        }
      }
      this.setState({ designMode: mode, value: newValue })
    } else if(mode === '店铺导航') {
      const newValue = [
        {
          type: Navigation.type,
          config: config,
        }
      ]
      this.setState({ designMode: mode, value: newValue })
    } else if(mode === '商品分类页') {
        const {backgroundImage, components: backupsComponents} = config
        if(backgroundImage) {
            // 背景
            this.backgroundChang(backgroundImage)
        }

        let newValue = []
        for( var i = 0; i < backupsComponents.length; i++ ){
            for(var j = 0; j< components.length; j++){
                if(backupsComponents[i].type == components[j].type ){
                    const instance = components[j].editor.getInitialValue()
                    if(components[j].editor.designType === 'cateList') {
                        instance.canDelete = false // 商品列表不可删除
                    } else {
                        instance.canDelete = true // 是否可以删除
                    }
                    instance.config = assign({}, instance.config, backupsComponents[i])
                    instance.type = components[j].editor.designType
                    instance.title = components[j].editor.designDescription
                    const id = uuid();
                    this.setUUIDForValue(instance, id);

                    newValue.push(instance);
                }
            }
        }
        this.setState({ designMode: mode, value: newValue })
    } else if(mode === '我的页面') {
        const {backgroundImage, components: backupsComponents} = config
        if(backgroundImage) {
            // 背景
            this.backgroundChang(backgroundImage)
        }

        let newValue = []
        for( let i = 0; i < backupsComponents.length; i++ ){
            for(let j = 0; j< components.length; j++){
                if(backupsComponents[i].type == components[j].type ){

                    const instance = components[j].editor.getInitialValue()
                    instance.canDelete = false // 是否可以删除
                    instance.config = assign({}, instance.config, backupsComponents[i])
                    instance.type = components[j].editor.designType
                    instance.title = components[j].editor.designDescription
                    const id = uuid();
                    this.setUUIDForValue(instance, id);

                    newValue.push(instance);
                }
            }
        }
        this.setState({ designMode: mode, value: newValue })
    }
  }

  onChange = (newValue) => {
    this.setState({
      value: newValue
    });
  };

  backgroundChang = (img) => {
    this.setState({
      backgroundImage: img
    });
  }

  render() {
    const {designMode} = this.state
    if (!designMode) return <div className={style.loading}>载入中...</div>
    // 排行类型:
    const rankListMenu = (
     <Menu onClick={({key}) => this.initMode(key)}>
       <Menu.Item key="微店铺首页">微店铺首页</Menu.Item>
       <Menu.Item key="店铺导航">店铺导航</Menu.Item>
       <Menu.Item key="商品分类页">商品分类页</Menu.Item>
       <Menu.Item key="我的页面">我的页面</Menu.Item>
     </Menu>
   );
    return (
      <div>
        <div className={style.designTop}>
            <p className={style.tip}><span></span>自定义装修（点击相应的组件即可）</p>
            <Dropdown overlay={rankListMenu}>
              <Button style={{ marginRight: 378 }} className={style.rankButton}>
                {designMode} <Icon type="down" />
              </Button>
            </Dropdown>
            <Button type="primary" icon="picture"  shape="round" className={style.designBtn}  onClick={this.publishAjax}>上架</Button>
            <Button type="primary"  shape="round" className={style.designBtn}  onClick={this.backupsAjax}>备份</Button>
            <div className={style.code}>
              <Button type="primary" className={style.designBtn} onClick={this.previewAjax}>预览</Button>
              {this.state.qRcodeL&&<QRCode value={this.state.qRcodeL} className={style.designQRcodeL} />}
            </div>
        </div>
        <Design
          components={designMode == '店铺导航'? [Navigation] : components}
          value={this.state.value}
          onChange={this.onChange}
          designMode = {designMode}
          compontmaxNum = {this.state.compontmaxNum}
          backgroundChang = {this.backgroundChang}
          backgroundImage = {this.state.backgroundImage}
          configData = {this.state.data}
          // compontContent = {compontContent}
        />
      </div>
    );
  }
}
