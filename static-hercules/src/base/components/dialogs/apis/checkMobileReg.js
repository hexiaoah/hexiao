const requester = require('base/requester');

const { API_BASE_URL } = require('apiConfig');

const API_URL = API_BASE_URL + '/users/v1/is_mobile_reg';

module.exports = function checkMobileReg ({ mobile, area_code = '+86' }) {
    const params = {mobile, area_code}
    return requester.get(API_URL, { params });
};
