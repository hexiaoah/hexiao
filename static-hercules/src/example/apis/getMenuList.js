/**
 * Created by hupo
 * on 16/10/11.
 *
 * 获取菜单列表
 * @param options
 */

// 基础 URL 地址, 在webpack配置中, 根据打包的环境变量加载不同的URL配置文件 默认加载 ../base/config/dev
const { API_BASE_URL } = require('apiConfig');
var Fetch = require('../../base/utils/Fetch').dFireFetch;
var AppUtil = require('../../base/utils/AppUtil');

var API_URL_MENUS = API_BASE_URL + '/menus/v1/list';

var getMenuList = function (options) {
    options.url = API_URL_MENUS;

    options.params = {
        entity_id: AppUtil.getCookie('entity_id')
    };

    return Fetch(options);
};

module.exports = getMenuList;
