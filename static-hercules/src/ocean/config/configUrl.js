import {APP_KEY} from 'apiConfig'

const getBaseUrl = (method) => {
    const appKey = sessionStorage.getItem("appKey");
    if (appKey) {
        /*兼容74版本之前 绑定银行卡->绿洲*/
        return `app_key=${appKey}&method=${method}`
    } else {
        return `app_key=${APP_KEY}&method=${method}`
    }
}

let getUrl = obj => obj.mock ? obj.mockUrl : getBaseUrl(obj.url)

let configList = {
    /**
     * 查询开通状态
     * */
    APPLY_STATE: {
        url: 'com.dfire.boss.center.soa.pay.service.IAuditBluePlanService.getEntityOpenStatus',
        mockUrl: '/api/com.dfire.soa.audit.service.BlueOcean.getEntityOpenStatus',
        mock: false
    },
    /**
     * 营业模式
     * */
    SHOP_KIND: {
        url: 'com.dfire.soa.boss.center.shop.service.IActiveShopService.getOperationModeV2',
        mockUrl: '/api/com.dfire.soa.audit.service.BlueOcean.getEntityOpenStatus',
        mock: false,
    },
    /***
     * 省份选择
     * */
    GET_REGION: {
        url: 'com.dfire.soa.boss.center.base.service.ISystemService.getAreaInfo',
        mockUrl: '',
        mock: false,
        daily: false
    },
    /**
     * 开户银行选择
     * */
    GET_BANK: {
        url: 'com.dfire.boss.center.soa.pay.service.IBankService.getBanks',
        mockUrl: '/api/com.dfire.soa.audit.service.BlueOcean.getEntityOpenStatus',
        mock: false,
        daily: false
    },
    /**
     * 开户省份
     * */
    GET_BANK_PROVINCE: {
        url: 'com.dfire.boss.center.soa.pay.service.IBankService.getProvince',
        mockUrl: '/api/com.dfire.soa.audit.service.BlueOcean.getEntityOpenStatus',
        mock: false,
        daily: false
    },
    /**
     * 开户城市
     * */
    GET_BANK_CITY: {
        url: 'com.dfire.boss.center.soa.pay.service.IBankService.getCities',
        mockUrl: '/api/com.dfire.soa.audit.service.BlueOcean.getEntityOpenStatus',
        mock: false
    },

    /**
     * 开户银行支行选择
     * */
    GET_BANK_SUB: {
        url: 'com.dfire.boss.center.soa.pay.service.IBankService.getSubBanks',
        mockUrl: '/api/com.dfire.soa.audit.service.BlueOcean.getEntityOpenStatus',
        mock: false
    },
    /**
     * 发送验证码
     * */
    SEND_CODE: {
        url: 'com.dfire.boss.center.soa.pay.service.IAuditBluePlanService.sendSubmitSmsCode',
        mockUrl: '/api/com.dfire.soa.audit.service.BlueOcean.getEntityOpenStatus',
        mock: false
    },
    /**
     * 申请资料查询
     * */
    GET_SHOP_INFO: {
        url: 'com.dfire.boss.center.soa.pay.service.IAuditBluePlanService.getAuditInfo',
        mockUrl: '/api/com.dfire.soa.audit.service.BlueOcean.getEntityOpenStatus',
        mock: false
    },
    /**
     * 临时保存申请资料
     * */
    GET_SAVE_SHOP_INFO: {
        url: 'com.dfire.boss.center.soa.pay.service.IAuditBluePlanService.saveApply',
        mockUrl: '/api/com.dfire.soa.audit.service.BlueOcean.getEntityOpenStatus',
        mock: false
    },
    /**
     * 提交申请资料
     * */
    GET_SUBMIT_SHOP_INFO: {
        url: 'com.dfire.boss.center.soa.pay.service.IAuditBluePlanService.submitApply',
        mockUrl: '/api/com.dfire.soa.audit.service.BlueOcean.getEntityOpenStatus',
        mock: false
    }
};

module.exports = {
    // 购买详情页
    configUrl: (() => {
        let ConfigUrl = {};
        for (let key in configList) {
            ConfigUrl[key] = getUrl(configList[key])
        }
        return ConfigUrl
    })()
}

