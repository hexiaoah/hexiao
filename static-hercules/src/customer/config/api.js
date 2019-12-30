// const {BOSS_API_URL} = require('apiConfig');
// const {DD_API_URL} = require('apiConfig');
// module.exports = {
//     QUERY_REPAIR_ITEMS: BOSS_API_URL+'/customer_service/v1/query_repair_items',
//     STAFF_ATTENDANCE:DD_API_URL+'/staff_attendance/check.do',
// }


import Axios from 'base/axios'
const {BOSS_API_URL} = require('apiConfig');
const {DD_API_URL} = require('apiConfig');

const API = {
  queryRepairItems(query){
    return Axios({
      method: 'GET',
      url: BOSS_API_URL+'/customer_service/v1/query_repair_items',
      params:query
    })
  },
  staffAttendance(query){
    return Axios({
      method: 'GET',
      url: DD_API_URL+'/staff_attendance/check.do',
      params:query
    })
  },
  getQueryTodayRecord(query){
    return Axios({
      method: 'GET',
      url: DD_API_URL+'/staff_attendance/queryTodayRecord.do',
      params:query
    })
  },
  getId(query){
    return Axios({
      method:'GET',
      url:DD_API_URL+'/staff_attendance/exchangeIdByCode.do',
      params:query
    })
  },
  getQueryLastRecord(query){
    return Axios({
      method:'GET',
      url:DD_API_URL+'/staff_attendance/queryLastRecord.do',
      params:query
    })
  }

}

export default API;