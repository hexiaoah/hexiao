import {observable} from 'mobx'
import api from '../../api'
import React from 'react'
import {Modal} from 'antd'
import img from './advertising.png'
import cookie from '@2dfire/utils/cookie'
import pathMap from './pathMap'
import {hashHistory} from 'react-router'
import getUserInfo from '../../utils/getUserInfo'
import { currentFHYUrl } from '../../utils/env'

const entrance = JSON.parse(cookie.getItem('entrance'))
import * as bridge from '../../utils/bridge'

class Store {
  @observable menuList = []
  @observable header = {}
  getMenuList = async () => {
    // cookie.removeItem('new-token')
    const active = cookie.getItem('active')
    const entityId = JSON.parse(cookie.getItem('entrance')).shopInfo.entityId
    const menuVo = await api[
      active === '掌柜工具' ? 'getBossMenuList' : 'getRailwayMenuList'
      ]()

    // if ( active === '掌柜工具'&& ) {
    // 00229806这家店为需要设置高铁开店监控的店
    // console.log(entityId)
    // if ( active === '掌柜工具'&& (entityId === "99930005"||entityId === "00229806"||entityId==='00143255')) {
    if (active === '掌柜工具' && (entityId === "00229806" || entityId === '00143255'|| entityId === '99180147')) {
      // if ( active === '掌柜工具'&& (entityId === "00229806")) {
      if (menuVo && menuVo.menuName === '掌柜' && menuVo.children &&
        menuVo.children[0] && menuVo.children[0].menuName === '数据导入导出') {
        if (menuVo.children[0].children) {
          menuVo.children[0].children.push({
            "menuId": "e450d5e7bb9a4567a7c5fb00000000000",
            "menuName": "开店监控",
            "businessType": "boss",
            "pageType": "HIGH_DAILY_MONITOR",
            "parentId": menuVo.children[0].menuId,
            "query": {reportId: "e450d5e7bb9a4567a7c5fb00000000000"}
          })
        } else {
          menuVo.children[0].children = [{
            "menuId": "e450d5e7bb9a4567a7c5fb00000000000",
            "menuName": "开店监控",
            "businessType": "boss",
            "pageType": "HIGH_DAILY_MONITOR",
            "parentId": menuVo.children[0].menuId,
            "query": {reportId: "e450d5e7bb9a4567a7c5fb00000000000"}
          }]
        }
      }
    }
    // cookie.setItem('new-token', token)
    const menuList = (menuVo || {}).children || []

    // const { industry } = (JSON.parse(cookie.getItem('entrance')).shopInfo || {})
    // if (industry == 3) {
    //   menuList.push({
    //     menuId: 'visual_config_parent',
    //     menuName: '店铺装修',
    //     pageType: 'node',
    //     businessType: 'boss',
    //     children: [
    //       {
    //         menuId: 'visual_config_design',
    //         menuName: '自定义装修',
    //         pageType: 'visual_config_design',
    //         businessType: 'boss',
    //         parentId: 'visual_config_parent',
    //       },
    //       {
    //         menuId: 'visual_config_pages',
    //         menuName: '页面管理',
    //         pageType: 'visual_config_pages',
    //         businessType: 'boss',
    //         parentId: 'visual_config_parent',
    //       },
    //       {
    //         menuId: 'visual_config_templates',
    //         menuName: '装修模板',
    //         pageType: 'visual_config_templates',
    //         businessType: 'boss',
    //         parentId: 'visual_config_parent',
    //       },
    //       {
    //         menuId: 'visual_config_backups',
    //         menuName: '备份',
    //         pageType: 'visual_config_backups',
    //         businessType: 'boss',
    //         parentId: 'visual_config_parent',
    //       },
    //     ]
    //   })
    // }

    this.menuList = menuList
  }
  setHeader = header => {
    this.header = header || {}
  }
  linkRoute = info => {
    const {pageType} = info
    const path = pathMap(info)[pageType]
    // if(pageType === 'FHY_EXTERNAL_LINK') window.location.href = currentFHYUrl
    if (path) {
      hashHistory.push(path)
      //`${path}?${getUserInfo(true)}&token=${cookie.getItem('new-token')}`
    }
  }
  //点击侧边栏之后的操作
  setInfo = info => {
    const {query = {}} = info
    const {withAd, isVipOpen} = query
    if ((isVipOpen === '1' || !isVipOpen) && withAd === '1') {
      this.showAdvertisingModal()
    }
  }
  showNoVipModal = info => {
    Modal.info({
      title: '公告',
      content: (
        <div>
          <p>您没有开通</p>
          <p style={{color: '#f00'}}>{info.menuName}</p>
          <p>的查看权限，请登录供应链APP，在高级模块商城中进行开通。</p>
        </div>
      )
    })
  }
  showAdvertisingModal = () => {
    Modal.info({
      content: <img src={img} alt=""/>
    })
  }
}

export default new Store()
