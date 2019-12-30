import { currentAPIUrlPrefix, currentEnvString } from '../../utils/env'

const protocol = (currentEnvString === 'PUBLISH' ? 'https://' : 'http://')
const templateDomainPrefix = (currentEnvString === 'PUBLISH' || currentEnvString === 'PRE' ? 'ifile' : 'ifiletest')

const APP_AUTH = {
    app_key: '200800',
    s_os: 'pc_merchant_back',
}

export default (key, query) => {

    const {entityId, entityType='0', userName, memberId, userId, industry} = query;

    //零售
    if(industry === 3){

        var options = {

            'item': {
                industry,
                entityType,
                importUrl: currentAPIUrlPrefix + 'merchant/import/v1/menus',
                importData: {
                    ...APP_AUTH,
                    entityId: "12345678",
                    memberId: memberId,
                    userId: '9993000559496cd70159496cd7580001'
                },
                exportUrl: currentAPIUrlPrefix + 'merchant/export/v1/menus',
                exportData: {
                    ...APP_AUTH,
                    entityId: entityId,
                    memberId: memberId,
                    userId: userId
                },
                pageNumber:1,
                templateFile: protocol + templateDomainPrefix + '.2dfire.com/template/merchant/excelImportMenuForRetail.xls',
                newTemplateFile: 'https://download.2dfire.com/template_file/sku%E5%95%86%E5%93%81%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.zip',
                exportBtnText: '导出商品信息',
                addCateBtnText: '添加分类',
                isRecharge: false,
                showSpin: {
                    boole: false,
                    content: ''
                },
                item: {
                    itemList: [],
                    totalRecord: 0
                },
                childGoodsList:{},
                goodsCategoryList: {
                    categoryList: []
                }
            }

        }


    //餐饮
    }else {

        var options = {

            'item': {
                industry,
                importUrl: currentAPIUrlPrefix + 'merchant/import/v1/menus',
                importData: {
                    ...APP_AUTH,
                    entityId: "12345678",
                    memberId: memberId,
                    userId: '9993000559496cd70159496cd7580001'
                },
                exportUrl: currentAPIUrlPrefix + 'merchant/export/v1/menus',
                exportData: {
                    ...APP_AUTH,
                    entityId: entityId,
                    memberId: memberId,
                    userId: userId
                },
                pageNumber:1,
                // templateFile: protocol + templateDomainPrefix + '.2dfire.com/template/merchant/excelImportMenu.xls',
                templateFile:
                `https://download.2dfire.com/template_file/excelImportMenu.xls`,
                exportBtnText: '导出商品信息',
                isRecharge: false,
                showSpin: {
                    boole: false,
                    content: ''
                },
                modalVisible:{
                    boole: false,
                    modalType:'select',
                },
                resultData:null,
                goodsParams:{
                    keyWord:'',
                    kindId: ''
                }
            }
        }
    }

    return options[key]

};
