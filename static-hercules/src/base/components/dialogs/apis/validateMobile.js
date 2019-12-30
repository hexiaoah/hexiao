const requester = require('base/requester');

const { API_BASE_URL } = require('apiConfig');

const API_URL = API_BASE_URL + '/bind/v1/verify';

module.exports = function validateMobile ({ mobile, code, areaCode = '+86' }) {
    const params = { mobile, code, areaCode };
    return requester.post(API_URL, { params });
};
