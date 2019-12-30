const requester = require('base/requester');

const { API_BASE_URL } = require('apiConfig');

const API_URL = API_BASE_URL + '/bind/v1/get_code';

module.exports = function sendMobilePhoneVerificationCode ({ mobile, areaCode = '+86' }) {
    const params = { mobile, areaCode };
    return requester.post(API_URL, { params });
};
