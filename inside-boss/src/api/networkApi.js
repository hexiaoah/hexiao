import axios from './networkAxios'

export default {
    getMonitorList(params) {
        return axios({
            isWg: true,
            method: 'get',
            url: `com.dfire.thirdbind.not.Is.allow.train.number`,
            params: params
        })
    },
    getAllShopList(params) {
        return axios({
            isWg: true,
            url: 'com.dfire.boss.center.pc.IShopBossPcService.queryAllShopList',
            mockUrl: '127/report/queryArgs.json',
            method: 'GET'
        })
    },
    //获取机构
    getBranch(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.pc.IBranchBossPcService.getAllBranchTreeByBrandEntityId',
            mockUrl: '127/report/queryArgs.json',
            method: 'GET'
        })
    },
    // 获取省份
    getAllProvince(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.pc.IAddressBossPcService.getAllProvince',
            mockUrl: '127/report/queryArgs.json',
            method: 'GET'
        })
    },
    // 获取店铺类型
    getEntityType(params) {
        return axios({
            isWg: true,
            url: 'com.dfire.cashconfig.getEntityType',
            mockUrl: '',
            method: 'GET',
            params
        })
    },
    // 获取所有的模板分类
    getAllTmplType(params) {
        return axios({
            isWg: true,
            url: 'com.dfire.cashconfig.getAllTmplType',
            mockUrl: '',
            method: 'GET',
            params
        })
    },
    // 根据模板类型获取模板列表
    getTypeTmplList(params) {
        return axios({
            isWg: true,
            url: 'com.dfire.cashconfig.getAllTmplByTmplCode',
            mockUrl: '',
            method: 'GET',
            params
        })
    },
    // 删除模板
    delTmpl(params) {
        return axios({
            isWg: true,
            url: 'com.dfire.cashconfig.delTmpl',
            mockUrl: '',
            method: 'GET',
            params
        })
    },
    // 使用模板
    useTmpl(params) {
        return axios({
            isWg: true,
            url: 'com.dfire.cashconfig.useTmpl',
            mockUrl: '',
            method: 'GET',
            params
        })
    },
    // 	创建模板
    createPrintTmpl(params) {
        return axios({
            isWg: true,
            url: 'com.dfire.cashconfig.createPrintTmpl',
            mockUrl: '',
            method: 'GET',
            params
        })
    },
    // 	编辑模板接口
    getEditTmpl(params) {
        return axios({
            isWg: true,
            url: 'com.dfire.cashconfig.editTmpl',
            mockUrl: '',
            method: 'GET',
            params,
            timeout: 5000
        })
    },
    // 		保存模板
    editTmplName(params) {
        return axios({
            isWg: true,
            url: 'com.dfire.cashconfig.updateTmplBasic',
            mockUrl: '',
            method: 'GET',
            params
        })
    },
    // 		保存模板
    saveTmpl(params) {
        return axios({
            isWg: true,
            url: 'com.dfire.cashconfig.saveTmpl',
            mockUrl: '',
            method: 'POST',
            data: params,
            timeout: 5000
        })
    },
    // 获取适用的门店
    getUseStoreList(params) {
        return axios({
            isWg: true,
            url: 'com.dfire.cashconfig.getApplyShopList',
            mockUrl: '',
            method: 'GET',
            params
        })
    },
    // 	将模板适用给门店
    saveUseStore(params) {
        return axios({
            isWg: true,
            url: 'com.dfire.cashconfig.applyTmpl',
            mockUrl: '',
            method: 'GET',
            params
        })
    },
    // 	上传图片
    submitImg(params) {
        return axios({
            isWg: true,
            url: 'com.dfire.cashconfig.applyTmpl',
            mockUrl: '',
            method: 'GET',
            type: 'addImg',
            params
        })
    },
    // 	商品模板列表
    getTemplateList(params) {
        return axios({
            isWg: true,
            url: 'com.dfire.boss.center.soa.IItemService.queryBItemTemplates',
            mockUrl: '',
            method: 'GET',
            params
        })
    },
    // 	商品模板列表
    checkWhiteList(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.soa.retail.platform.config.facade.ConfigFacade.checkWhiteList',
            mockUrl: '',
            method: 'GET',
            params
        })
    },
    // 	获取模板详情
    getTemplateDetail(params) {
        return axios({
            isWg: true,
            url: 'com.dfire.boss.center.soa.IItemService.queryBItemDetail',
            mockUrl: '',
            method: 'GET',
            params
        })
    },
    // 	保存模板
    saveEditTemplate(params) {
        return axios({
            isWg: true,
            url: 'com.dfire.boss.center.soa.IItemService.saveBItemDetail',
            mockUrl: '',
            method: 'GET',
            params
        })
    },
    // 获取banner列表
    getMallBannerList(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.soa.mis.center.client.applets.IMallBannerService.listBannerList',
            mockUrl: '',
            method: 'GET',
            params
        })
    },
    postEditBannerIndex(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.soa.mis.center.client.applets.IMallBannerService.editBannerSequenceOrder',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    postEditBannerItem(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.soa.mis.center.client.applets.IMallBannerService.saveBanner',
            mockUrl: '',
            method: 'POST',
            params
        })
    },

    getMallActivityList(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.soa.mis.center.client.applets.IMallPromotionService.listPromotionList',
            mockUrl: '',
            method: 'GET',
            params
        })
    },
    postEditActivityItem(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.soa.mis.center.client.applets.IMallPromotionService.savePromotion',
            mockUrl: '',
            method: 'POST',
            params
        })
    },

    //设置规格
    getShowSpecification(params) {
        return axios({
            isWg: true,
            url: 'com.dfire.boss.center.soa.IItemService.saveBItemDetail',
            mockUrl: '',
            method: 'GET',
            params
        })
    },
    // 获取分类管理
    getCateList(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.soa.item.facade.service.IItemFacadeService.listCategory',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    // 获取规格列表
    getSpecList(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.soa.item.facade.service.IItemFacadeService.listSku',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    // 获取商品单位列表
    getUnitList(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.soa.item.facade.service.IItemFacadeService.listUnit',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    // 保存规格
    saveSpec(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.soa.item.facade.service.IItemFacadeService.saveSkuPropertyAndValues',
            method: 'POST',
            params
        })
    },
    // 切换规格值的启用或停用状态
    specItemSwitch(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.soa.item.facade.service.IItemFacadeService.onOrOffSkuValue',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    // 切换规格名称的启用或停用状态
    specNameSwitch(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.soa.item.facade.service.IItemFacadeService.onOrOffSkuProperty',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    // 删除单位
    deleteUnit(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.soa.item.facade.service.IItemFacadeService.deleteUnit',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    // 新增分类信息
    saveCate(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.soa.item.facade.service.IItemFacadeService.addCategory',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    // 更新分类信息
    updateCate(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.soa.item.facade.service.IItemFacadeService.modifyCategory',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    // 删除分类
    deleteCate(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.soa.item.facade.service.IItemFacadeService.removeCategory',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    // 请求商品列表
    getItemList(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.soa.item.retail.service.IRetailItemService.tidyListItem',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    // 添加单位
    addUnit(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.soa.item.facade.service.IItemFacadeService.saveUnit',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    // 拉取商品详情
    getGoodItemDetail(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.soa.item.facade.service.IItemFacadeService.detailItem',
            mockUrl: '',
            method: 'GET',
            params
        })
    },
    // 拉取运费模版
    getFreightTemplate(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.soa.lp.facade.LogisticsTemplateFacade.getLogisticsTemplateList',
            mockUrl: '',
            method: 'GET',
            params
        })
    },
    // 拉取运费模版
    deleteItem(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.soa.item.facade.service.IItemFacadeService.removeItem',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    // 获取店铺策略
    getStrategy(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.retail.platform.strategy.facade.ShopStrategyFacade.queryShopStrategyByEntityIdAndType',
            mockUrl: '',
            method: 'POST',
            data: params,
            postType: 'formData'
        })
    },
    // 获取商品转自建策略
    getFacadeService(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.soa.boss.center.strategy.service.IShopConfigFacadeService',
            mockUrl: '',
            method: 'POST',
            data: params,
            postType: 'formData'
        })
    },
    // 清除批量任务
    clearBatch(params) {
        return axios({
            isWg: true,
            url: 'com.dfire.batch.BatchFacade.clear',
            mockUrl: '',
            method: 'POST',
            data: params,
            postType: 'formData'
        })
    },
    // 保存商品
    saveGoodItem(industry, data) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.soa.item.facade.service.IItemFacadeService.modifyItem',
            mockUrl: '',
            method: 'POST',
            params: {
                industry
            },
            data: {
                req: JSON.stringify(data)
            },
            postType: 'formData'
        })
    },
    // 换分类
    changeCategory(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.soa.item.facade.service.IItemFacadeService.changeCategory',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    changeCombinedCategory(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.soa.item.retail.service.IRetailItemService.changeItemAssembleCategory',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    getChildGoodResult(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.soa.item.retail.service.IRetailItemService.deleteCheck',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    // 标价签获取所有模板
    getPriceTagModule(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.soa.retail.platform.pricetag.facade.PriceTagTemplateFacade.queryAllPriceTagTemplate',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    // 复制模板
    copyPriceTagModule(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.soa.retail.platform.pricetag.facade.PriceTagTemplateFacade.copyPriceTagTemplate',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    // 查询模板详情
    getModuleDetail(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.soa.retail.platform.pricetag.facade.PriceTagTemplateFacade.queryPriceTagTemplateById',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    // 更改模板属性
    updatePriceTagModule(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.soa.retail.platform.pricetag.facade.PriceTagTemplateFacade.updatePriceTagTemplate',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    // 修改组合商品
    updateCombinedGood(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.soa.item.retail.service.IRetailItemService.modifyItemAssemble',
            mockUrl: '',
            method: 'POST',
            postType: 'formData',
            data: {
                req: JSON.stringify(params)
            }
        })
    },
    // 添加组合商品
    addCombinedGood(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.soa..item.retail.service.IRetailItemService.addItemAssemble',
            mockUrl: '',
            method: 'POST',
            postType: 'formData',
            data: {
                req: JSON.stringify(params)
            }
        })
    },
    // 下发任务详情
    distributeWorkDetail(params) {
        return axios({
            isWg: true,
            url: 'bosscenter.IChainPublishPlatformClientService.saveTask',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    // 删除组合商品
    deleteCombinedGoodDetail(params) {
        return axios({
            isWg: true,
            postType: 'formData',
            url:
                'com.dfire.boss.center.soa.item.retail.service.IRetailItemService.removeItemAssemble',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    //拉取组合商品列表
    getCombinedGoodsList(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.soa.item.retail.service.IRetailItemService.listItemAssemble',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    // 获取组合商品详情
    getCombinedGoodDetail(params) {
        return axios({
            isWg: true,
            url:
                'com.dfire.boss.center.soa.item.retail.service.IRetailItemService.getItemAssembleDetail',
            mockUrl: '',
            method: 'POST',
            params
        })
    },
    //导出excel表字段查询
    queryUserGridFieldForDisplay(params={}){
        return axios({
            isWg: true,
            url:'com.dfire.soa.boss.gridfield.service.IUserGridFieldService.queryUserGridFieldForDisplay',
            mockUrl:'',
            method: 'POST',
            data:{
                request: JSON.stringify(params)
            },
            postType: 'formData',
        })
    },
    //重置表格字段
    createResetForDisplay(params={gridType:1}){
        return axios({
            isWg: true,
            url:'com.dfire.soa.boss.com.dfire.soa.boss.gridfield.service.IUserGridFieldService.createResetForDisplay',
            mockUrl:'',
            method: 'POST',
            data:{
                request: JSON.stringify(params)
            },
            postType: 'formData',
        })
    },
    //空白模板导出
    downloadDefaultTemplate(params={ gridType: 1 }){
        return axios({
            isWg: true,
            url:'com.dfire.soa.boss.boss.excel.application.IMenuBatchImportService.downloadDefaultTemplate',
            mockUrl:'',
            method: 'POST',
            data:{
                request: JSON.stringify(params)
            },
            postType: 'formData',
        })
    },
    //商品导出模板
    setupTemplate(params={gridType:1}){
        return axios({
            isWg: true,
            url:'com.dfire.soa.boss.com.dfire.soa.boss.excel.application.IMenuBatchImportService.setupTemplate',
            mockUrl:'',
            method: 'POST',
            data:{
                request: JSON.stringify(params)
            },
            postType: 'formData',
        })
    },
    //历史记录查询
    getImportResultList(params={gridType:1}){
        return axios({
            isWg: true,
            url:'com.dfire.soa.boss.com.dfire.soa.boss.excel.application.IMenuBatchImportService.getImportResultList',
            mockUrl:'',
            method: 'POST',
            data:{
                query: JSON.stringify(params)
            },
            postType: 'formData',
        })
    },
    //单次导入结果查询
    getImportResult(params){
        return axios({
            isWg: true,
            url:'com.dfire.soa.boss.com.dfire.soa.boss.excel.service.IMenuBatchImportService.getImportResult',
            mockUrl:'',
            mockUrl: '',
            method: 'GET',
            params
        })
    },
    //导入进度查询
    getImportProcess(params){
        return axios({
            isWg: true,
            url:'com.dfire.soa.boss.com.dfire.soa.boss.excel.service.IMenuBatchImportService.getImportProcess',
            mockUrl:'',
            mockUrl: '',
            method: 'GET',
            params
        })
    },
    //检查是否使用双语
    canSetupMenuLanguage(params={}){
        return axios({
            isWg: true,
            url:'com.dfire.soa.boss.com.dfire.soa.boss.gridfield.service.IUserGridFieldService.canSetupMenuLanguage',
            mockUrl:'',
            mockUrl: '',
            method: 'GET',
            params
        })
    },
    //保存选择字段
    batchCreatUserGridField(params){
        return axios({
            isWg: true,
            url:'com.dfire.soa.boss.boss.gridfield.service.IUserGridFieldService.batchCreatUserGridField',
            mockUrl:'',
            method: 'POST',
            data:{
                request: JSON.stringify(params)
            },
            postType: 'formData',
        })
    },
    //获取菜单分类
    kindMenuTreeSelect(params={}){
        return axios({
            isWg: true,
            url:'com.dfire.boss.center.pc.IKindMenuService.kindMenuTreeSelect',
            mockUrl:'',
            method: 'GET',
            params
            
        })
    },
    //商品导出
    batchExportMenu(params){
        return axios({
            isWg: true,
            url:'com.dfire.soa.boss.com.dfire.soa.boss.excel.service.IMenuBatchExportService.batchExportMenu',
            mockUrl: '',
            method: 'POST',
            data:{
                request: JSON.stringify(params)
            },
            postType: 'formData',
        })
    },
    //套餐导出
    batchExportSuit(params){
        return axios({
            isWg: true,
            url:'com.dfire.soa.boss.com.dfire.soa.boss.excel.service.IMenuBatchExportService.batchExportSuit',
            mockUrl:'',
            method: 'POST',
            data:{
                request: JSON.stringify(params)
            },
            postType: 'formData',
        })
    },
    //导入
    batchImport({plateEntityId,fileName}){
        return axios({
            isWg: true,
            url:'com.dfire.soa.boss.com.dfire.soa.boss.excel.service.IMenuBatchImportService.batchImport',
            mockUrl:'',
            method: 'POST',
            data:{
                baseRequest: JSON.stringify({plateEntityId}),
                fileName
            },
            postType: 'formData',
        })
    },
    //获取导出地址
    getExportPath(params){
        return axios({
            isWg: true,
            url:'com.dfire.soa.boss.com.dfire.soa.boss.excel.service.IMenuBatchExportService.getExportPath',
            mockUrl:'',
            method: 'GET',
            params
        })
    },
    //商品列表获取
    listItemDetail(params){
        return axios({
            isWg: true,
            url:'com.dfire.boss.center.soa.com.dfire.soa.boss.centerpc.item.service.IItemService.listItemDetail',
            mockUrl:'',
            method: 'GET',
            params:{
                listItemReq: JSON.stringify(params),
            },
        })
    },
    //商品列表获取
    listItem(params){
        return axios({
            isWg: true,
            url:'com.dfire.soa.boss.centerpc.item.service.IItemService.listItem',
            mockUrl:'',
            method: 'GET',
            params:{
                listItemReq: JSON.stringify(params),
            },
        })
    },
}
