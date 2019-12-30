// 可视化配置项目相关接口
// 接口定义见 http://mock.2dfire-daily.com/mock-serverapi/workspace/myWorkspace.do?projectId=773

import axios from './networkAxios'
import * as bridge from '../utils/bridge'

const { entityId } = bridge.getInfoAsQuery()
import cookie from '@2dfire/utils/cookie'

function isUnionShop (){
    const data = JSON.parse(cookie.getItem('entrance')).shopInfo
    const { entityTypeId, isInLeague } = data // entityTypeId: 3是店铺，10是联盟；isInLeague：1，店铺是属于联盟下的店铺
    if (entityTypeId == '3' && !!isInLeague){ // 联盟或者是联盟下的店铺
        return false
    }
    return true
}    

export default {
    // 获取店铺信息
    getShopInfo() {
        return axios({
            isWg: true,
            name: 'getShopInfo',
            url: 'com.dfire.complex.business.IConfigFacade.getShopInfo',
            method: 'GET',
            params: {
                entityId,
                entry: 'default',
            }
        })
    },

    // 获取自定义页面列表
    getCustomPages(data = {}) {
        const { appId, appVersionId } = data
        return axios({
            isWg: true,
            name: 'getCustomPages',
            url: 'com.dfire.complex.business.IPageFacade.getEntityPagesList',
            method: 'GET',
            params: { entityId, appId, appVersionId },
        })
    },

    // 新增自定义页面
    addCustomPage(data = {}) {
        const { appId, appVersionId, pageName, shareImage, shareText } = data
        return axios({
            isWg: true,
            name: 'addCustomPage',
            url: 'com.dfire.complex.business.IPageFacade.addPage',
            method: 'POST',
            params: {
                pageDTO: JSON.stringify({
                    appId,
                    appVersionId,
                    entityId,
                    pageName,
                    shareImage,
                    shareText,
                })
            },
        })
    },

    // 更新自定义页面
    updateCustomPage(data = {}) {
        const { appId, appVersionId, pageCode, pageName, shareImage, shareText } = data
        return axios({
            isWg: true,
            name: 'updateCustomPage',
            url: 'com.dfire.complex.business.IPageFacade.updatePage',
            method: 'POST',
            params: {
                pageDTO: JSON.stringify({
                    appId,
                    appVersionId,
                    entityId,
                    pageCode,
                    pageName,
                    shareImage,
                    shareText,
                })
            },
        })
    },

    // 删除自定义页面
    removeCustomPage(data = {}) {
        const { pageCode } = data
        return axios({
            isWg: true,
            name: 'removeCustomPage',
            url: 'com.dfire.complex.business.IPageFacade.deletePage',
            method: 'POST',
            params: {
                entityId,
                pageCode,
            },
        })
    },

    /*
    获取配置内容
    获取已发布内容，传 appId、appVersionId、name
    获取备份内容，传 configId
    获取模板内容，传 preConfigAppId、preConfigAppVersionId
    */
   getConfigContent(data = {}) {
        const { name, appId, appVersionId, configId, preConfigAppId, preConfigAppVersionId } = data
        return axios({
            isWg: true,
            name: 'getConfigContent',
            url: 'com.dfire.complex.business.IConfigFacade.getConfig',
            method: 'GET',
            params: {
                queryDTO: JSON.stringify({
                    entityId: isUnionShop() ? entityId: '99229084',
                    name,
                    appId,
                    appVersionId,
                    configId,
                    preConfigAppId,
                    preConfigAppVersionId,
                })
            }
        })
    },

    // 发布配置
    publish(data = {}){
        const { appId, appVersionId, name, content } = data
        return axios({
            isWg: true,
            name: 'configPublish',
            url: 'com.dfire.complex.business.IConfigFacade.publish',
            method: 'POST',
            data: { entityId, appId, appVersionId, name, content },
        })
    },

    // 预览配置
    preview(data = {}){
        const { appId, appVersionId, name, content } = data
        return axios({
            isWg: true,
            name: 'configPreview',
            url: 'com.dfire.complex.business.IConfigFacade.preview',
            method: 'POST',
            data: { entityId, appId, appVersionId, name, content },
        })
    },

    // 备份当前配置
    backup(data = {}){
        const {
            appId, appVersionId, name, content,
            force = 0
        } = data

        return axios({
            isWg: true,
            name: 'backup',
            url: 'com.dfire.complex.business.IConfigFacade.addConfigBackup',
            method: 'POST',
            data: { entityId, appId, appVersionId, name, content },
            params: {
                force,
            }
        })
    },

    // 获取备份列表
    getBackups(data = {}) {
        const { appId, appVersionId } = data
        return axios({
            isWg: true,
            name: 'getBackups',
            url: 'com.dfire.complex.business.IConfigFacade.getConfigBackupList',
            method: 'GET',
            params: {
                entityId,
                appId,
                appVersionId,
            },
        })
    },

    // 删除备份
    removeBackup(data = {}) {
        const { configId } = data
        return axios({
            isWg: true,
            name: 'removeBackup',
            url: 'com.dfire.complex.business.IConfigFacade.delConfigBackup',
            method: 'GET',
            params: {
                configDTO: JSON.stringify({
                    entityId,
                    configId,
                })
            },
        })
    },

    // 获取预定义模板列表
    getTemplates() {
        return axios({
            isWg: true,
            name: 'getTemplates',
            url: 'com.dfire.complex.business.IConfigFacade.getPreConfigList',
            method: 'GET',
        })
    },

    // 获取店铺素材列表
    getMaterials(data = {}){
        const { pageIndex, pageSize, type } = data
        return axios({
            isWg: true,
            name: 'getMaterials',
            url: 'com.dfire.complex.business.IMaterialFacade.getEntityMaterials',
            method: 'GET',
            params: { entityId, pageIndex, pageSize, type }
        })
    },

    // 向店铺素材库添加素材
    addMaterial(data = {}) {
        const { type, url = '', name = '', meta = {}, status = ''  } = data
        return axios({
            isWg: true,
            name: 'addMaterial',
            url: 'com.dfire.complex.business.IMaterialFacade.addEntityMaterial',
            method: 'POST',
            params: {
                materialDTO: JSON.stringify({
                    entityId, type, url, name, meta, status
                }),
            },
        })
    },

    // 删除素材
    deleteEntityMaterial(params = {}) {
        return axios({
            isWg: true,
            name: 'addMaterial',
            url: 'com.dfire.complex.business.IMaterialFacade.deleteEntityMaterial',
            method: 'POST',
            params
        })
    },
     // 交换素材顺序
     swapEntityMaterialSort(params = {}) {
        return axios({
            isWg: true,
            name: 'addMaterial',
            url: 'com.dfire.complex.business.IMaterialFacade.swapEntityMaterialSort',
            method: 'POST',
            params
        })
    },

    // 更新素材
    updateEntityMaterial(data = {}) {
        const { type, url, name = '', materialId="", meta = {}, status = ''  } = data
        return axios({
            isWg: true,
            name: 'addMaterial',
            url: 'com.dfire.complex.business.IMaterialFacade.updateEntityMaterial',
            method: 'POST',
            params: {
                materialDTO: JSON.stringify({
                    entityId, materialId, type, url, name, meta, status
                }),
            },
        })
    },

    // 零售: 获取商品列表
    getRetailGoodsList(data = {}){
        const { keyWord = '' } = data
        return axios({
            isWg: true,
            name: 'getRetailGoodsList',
            url: 'com.dfire.complex.industry.ItemService.getRetailMenuList',
            method: 'POST',
            params: {
                entityId,
                industry:3,
                function: 'retail_pc_menu_list'
            },
            data: {
                retailItemsParam: {
                    entityId,
                    shopCategoryId: '',
                    cursorMark: '',
                    keyWord,
                }
            },
        })
    },

    // 零售：获取指定 id 的商品列表
    getSpecifyRetailGoodsList(data = {}) {
        const { idList } = data
        return axios({
            isWg: true,
            name: 'getSpecifyRetailGoodsList',
            url: 'com.dfire.complex.industry.ItemService.getRetailMenuDetail',
            method: 'POST',
            params: {
                entityId,
                itemIds: JSON.stringify(idList)
            },
        })
    },

    // 零售: 获取优惠券列表
    getRetailCoupons(){
        return axios({
            isWg: true,
            name: 'getRetailCoupons',
            url: 'com.dfire.complex.industry.IRetailCouponService.getRetailCouponList',
            method: 'POST',
            params: {
                entityId,
                industry: 3,
                userRangeList: JSON.stringify(["TAKEOUT","TANGSHI"])
            },
        })
    },
}
