/**
 * Created by hupo
 * on 16/10/11.
 *
 * 获取菜单列表
 * @param options
 */

const { API_BASE_URL } = require('apiConfig');
var Fetch = require('../../base/utils/Fetch').dFireFetch;

var API_URL_MENUS = API_BASE_URL + '/menus/v1/list2';

var getMenuList = function (options) {
    options.url = API_URL_MENUS;
    return Fetch(options);
};

module.exports = getMenuList;
