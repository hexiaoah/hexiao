/**
 *
 * @param res
 * @author
 *
 */

const BASE_URL = 'http://localhost:8089/api/'
const  MOCK_API = {
    GET_GOOD_CLASSES:BASE_URL+'getGoodClass',//获取商品分类
    GET_GOOD_FEEDS:BASE_URL+'getGoodFeed',//获取新料
    GET_GOOD_REMARKS:BASE_URL+'getGoodRemark',//获取新料
}
export default  MOCK_API;
