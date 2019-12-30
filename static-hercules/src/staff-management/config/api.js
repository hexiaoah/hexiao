import axios from './interception'
import {
    API_BASE_URL,
    APP_KEY
} from "apiConfig";
import qs from 'qs'

const API = {
    /*获取session信息*/
    getSessionMap() {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.login.service.ILoginService.getSessionMapFromToken',
            params: {
                appKey: APP_KEY
            }
        })
    },
    /*获取员工列表信息*/
    listAllShopUsers() {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.employee.service.IEmployeeClientServiceV2.listAllShopUsers',
        })
    },
    /*获取员工简要信息和权限数量*/
    getEmployeeBriefInfo(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.employee.service.IEmployeeClientServiceV2.getEmployeeBriefInfo',
            params: params
        })
    },
    /**删除员工信息 */
    deleteEmployee(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.employee.service.IEmployeeClientServiceV2.deleteEmployee',
            params: params
        })
    },
    /**创建员工 */
    createEmployee(data) {
        return axios({
            method: 'POST',
            url: 'com.dfire.boss.center.soa.employee.service.IEmployeeClientServiceV2.createEmployee',
            data: qs.stringify(data),
        })
    },
    /**获取店铺职级列表 */
    listShopRoles(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.employee.service.IEmployeeClientServiceV2.listShopRoles',
            params: params
        })
    },
    /**获取职级可选和已选的权限列表 */
    getRoleActionList(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.employee.service.getRoleActionList',
            params: params
        })
    },
    /**删除职级 */
    deleteRole(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.employee.service.IEmployeeClientServiceV2.deleteRoleOfShop',
            params: params
        })
    },
    /**获取店铺权限总数 */
    getShopActionTotal() {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.employee.service.getShopActionTotal',
        })
    },
    /**创建店铺职级 */
    createRole(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.employee.service.IEmployeeClientServiceV2.createRole',
            params: params
        })
    },
    /**更新店铺职级名称 */
    updateRole(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.employee.service.IEmployeeClientServiceV2.updateRoleOfShop',
            params: params
        })
    },
    /**获取员工配置项 */
    getExtraActionSettings(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.employee.service.IEmployeeClientServiceV2.getExtraActionSettings',
            params: params
        })
    },
    /**给云收银店铺职级赋予权限 */
    grantAction(data) {
        return axios({
            method: 'POST',
            url: 'com.dfire.boss.center.soa.employee.service.IEmployeeClientServiceV2.grantActionForRole',
            data: qs.stringify(data),
        })
    },
    /**获取职级的权限统计 */
    getRoleActionCount(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.employee.service.getRoleActionCount',
            params: params
        })
    },
    /**更新员工信息 */
    updateEmployee(data) {
        return axios({
            method: 'POST',
            url: 'com.dfire.boss.center.soa.employee.service.IEmployeeClientServiceV2.updateEmployee',
            data: qs.stringify(data),
        })
    },
    /**更新员工职级 */
    updateEmployeeRole(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.employee.service.updateEmployeeRole',
            params: params
        })
    },
}

export default API;
