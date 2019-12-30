import { API_BASE_URL } from "apiConfig";
import { GW } from '@2dfire/gw-params';
const AND =  '&' + GW;

const API = {
    // 获取左侧侧边栏
    GET_LEFT_NAV: API_BASE_URL + "com.dfire.boss.center.pc.IMenuBossPcService.getBossChainBizMenus" + AND,
    // 获取连锁总部下 所有品牌
    GET_ALL_BRANDS: API_BASE_URL + "com.dfire.boss.center.pc.IPlateBossPcService.getBrandByBrandEntityId" + AND,
    // 获取连锁总部下 所有品牌
    GET_ALL_PLATE: API_BASE_URL + "com.dfire.boss.center.pc.IPlateBossPcService.getAllPlateByBrand" + AND,
    // 获取连锁总部下 所有地区 树形结构
    GET_ALL_AREAS: API_BASE_URL + "com.dfire.boss.center.pc.IAddressBossPcService.getAllProvince" + AND,
    // 获取门店列表
    GET_SHOP_LIST: API_BASE_URL  + "com.dfire.boss.center.pc.IShopBossPcService.queryShopList" + AND,
    // 获取门店详情
    GET_SHOP_INFO: API_BASE_URL  + "com.dfire.boss.center.pc.IShopBossPcService.getShopDetail" + AND,
    // 获取品牌列表
    GET_BRANDS: API_BASE_URL  + "com.dfire.boss.center.pc.IPlateBossPcService.queryBrand" + AND,
    // 设置默认品牌
    SET_DEFAULT_PLATE: API_BASE_URL  + "com.dfire.boss.center.soa.pc.IPlateBossPcService.setDefaultPlate" + AND,
    // 是否有权限操作品牌
    CAN_MANAGE_PLATE: API_BASE_URL  + "com.dfire.boss.center.soa.pc.IPlateBossPcService.canManagePlate" + AND,
    // 获取品牌详情
    GET_BRAND_INFO: API_BASE_URL  + "com.dfire.boss.center.pc.IPlateBossPcService.getBrandByEntityId" + AND,
    // 获取分支机构
    GET_ORGAN_MAP: API_BASE_URL  + "com.dfire.boss.center.pc.IBranchBossPcService.getAllBranchTreeByBrandEntityId" + AND,
    // 获取分支机构详情 by entityId
    GET_ORGAN_INFO: API_BASE_URL + "com.dfire.boss.center.pc.IBranchBossPcService.getBranchByBranchEntityId" + AND,
    // 获取店铺报表相关数据
    GET_SHOP_VIEW: API_BASE_URL + "com.dfire.boss.center.pc.IReportBossPcService.patchFetchMallReportData" + AND,
    //查询是否有停业门店
    GET_CLASE_SHOP: API_BASE_URL + "com.dfire.soa.boss.centerpc.entity.service.IShopBossPcService.hasCloseShop" + AND,


    // 商品设置部分接口

    // /************************************商品分类管理*******************************************/
    //获取商品分类列表
    GET_GOOD_CLASSES:API_BASE_URL + "com.dfire.boss.center.pc.IKindMenuService.kindMenuTree"+ AND,

    GET_GOOD_CLASS_DETAIL:API_BASE_URL + "com.dfire.boss.center.pc.IKindMenuService.kindMenuDetail"+ AND,
    //删除商品分类
    DELETE_GOOD_CLASS:API_BASE_URL + "com.dfire.boss.center.pc.IKindMenuService.deleteKindMenu"+ AND,
    //保存分类
    SAVE_GOOD_CLASS:API_BASE_URL + "com.dfire.boss.center.pc.IKindMenuService.saveKindMenu"+ AND,
    //分类详情
    // GET_GOOD_CLASS_DETAIL:API_BASE_URL + "com.dfire.boss.center.pc.IKindMenuService.kindMenuDetail"+ AND,


    // /************************************商品加料管理*******************************************/

    //获取商品加料列表（不含加料信息）
    GET_GOOD_FEEDS_LIST:API_BASE_URL + "com.dfire.boss.center.pc.IAdditionKindService.getAdditionKindList"+ AND,
    //获取商品加料列表（含加料信息）
    GET_GOOD_FEEDS_ADDITION_LIST:API_BASE_URL + "com.dfire.boss.center.pc.IAdditionKindService.listKindAndAddition"+ AND,
    //删除加料分类
    DELETE_GOOD_FEED_CATA:API_BASE_URL + "com.dfire.boss.center.pc.IAdditionKindService.deleteAdditionKind"+ AND,
    //保存加料分类
    SAVE_GOOD_FEED_CATA:API_BASE_URL + "com.dfire.boss.center.pc.IAdditionKindService.saveAdditionKind"+ AND,
    //删除加料
    DELETE_GOOD_FEED:API_BASE_URL + "com.dfire.boss.center.pc.IAdditionService.deleteAddition"+ AND,
    //保存加料
    SAVE_GOOD_FEED:API_BASE_URL + "com.dfire.boss.center.pc.IAdditionService.saveAddition"+ AND,

    // /************************************商品备注管理*******************************************/

    //获取商品备注列表（不含加料信息）
    GET_GOOD_REMARKS_LIST:API_BASE_URL + "com.dfire.boss.center.pc.IKindTasteService.getKindTasteList"+ AND,
    //获取商品备注列表（含加料信息）
    GET_GOOD_REMARKS_ADDITION_LIST:API_BASE_URL + "com.dfire.boss.center.pc.IKindTasteService.queryKindAndTasteList"+ AND,
    //删除备注分类
    DELETE_GOOD_REMARK_CATA:API_BASE_URL + "com.dfire.boss.center.pc.IKindTasteService.deleteKindTaste"+ AND,
    //保存备注分类
    SAVE_GOOD_REMARK_CATA:API_BASE_URL + "com.dfire.boss.center.pc.IKindTasteService.saveKindTaste"+ AND,
    //删除备注
    DELETE_GOOD_REMARK:API_BASE_URL + "com.dfire.boss.center.pc.ITasteService.deleteTaste"+ AND,
    //保存备注
    SAVE_GOOD_REMARK:API_BASE_URL + "com.dfire.boss.center.pc.ITasteService.saveTaste"+ AND,


    // 获取单位列表
    GET_UNIT_LIST: API_BASE_URL + "com.dfire.boss.center.pc.IUnitService.getUnitList" + AND,

    // 获取单位转换是否开启
    GET_UNIT_CONVERSION: API_BASE_URL + "com.dfire.boss.center.pc.IUnitService.getUseUnitConversion" + AND,

    // 保存单位
    SAVE_UNIT: API_BASE_URL + "com.dfire.boss.center.pc.IUnitService.saveUnit" + AND,

    // 获取店铺报表相关数据
    UPDATE_UNIT: API_BASE_URL + "com.dfire.boss.center.pc.IUnitService.updateUnit" + AND,

    // 删除单位
    DELETE_UNIT: API_BASE_URL + "com.dfire.boss.center.pc.IUnitService.deleteUnit" + AND,

//    获取规格列表
    GET_SPEC_LIST: API_BASE_URL + "com.dfire.boss.center.pc.ISpecDetailService.getSpecDetailList" + AND,

//    删除规格
    DELETE_SPEC: API_BASE_URL + "com.dfire.boss.center.pc.ISpecDetailService.deleteSpecDetail" + AND,

//    保存规格
    SAVE_SPEC: API_BASE_URL + "com.dfire.boss.center.pc.ISpecDetailService.saveSpecDetail" + AND,
//    保存规格
    UPDATE_SPEC: API_BASE_URL + "com.dfire.boss.center.pc.ISpecDetailService.updateSpecDetail" + AND,

    // 获取做法列表
    GET_PRACTICE_LIST: API_BASE_URL + "com.dfire.boss.center.pc.IMakeService.getMakeList" + AND,

//    删除做法
    DELETE_PRACTICE: API_BASE_URL + "com.dfire.boss.center.pc.IMakeService.deleteMake" + AND,

    //    保存做法
    SAVE_PRACTICE: API_BASE_URL + "com.dfire.boss.center.pc.IMakeService.saveMake" + AND,

//    获取菜单列表
    GET_MENU_LIST: API_BASE_URL + "com.dfire.boss.center.pc.getMenuList" + AND,

//    保存菜单
    SAVE_MENU: API_BASE_URL + "com.dfire.boss.center.pc.saveMenu" + AND,

//    编辑菜单
    UPDATE_MENU: API_BASE_URL + "com.dfire.boss.center.pc.updateMenu" + AND,

//    删除菜单
    DELETE_MENU: API_BASE_URL + "com.dfire.boss.center.pc.deleteMenu" + AND,

    QUERY_ALL_SHOPS: API_BASE_URL + "com.dfire.boss.center.pc.IShopBossPcService.queryAllShopList" + AND,

//  获取员工职级信息
    GET_ROLE_BY_EID: API_BASE_URL +  "com.dfire.bps.soa.getRoleByEId" + AND,

//
    LIST_MANAGE_ABLE_ROLE: API_BASE_URL + "com.dfire.boss.center.soa.role.service.IRoleClientService.listManageableRole" + AND,

//获取统一管理门店数量
    COUNT_SHOPS: API_BASE_URL + "com.dfire.soa.boss.common.chainunifiedrole.service.IShopApplyChainRoleService.countShops" + AND,

//获取统一管理和自主管理门店
    GET_APPLY_AND_UNAPPLU_SHOPS: API_BASE_URL + "common.chainunifiedrole.service.IShopApplyChainRoleService.getApplyAndUnapplyShops" + AND,

//新增统一管理门店
    ADD_UNIFY_APPLY_SHOPS: API_BASE_URL + "com.dfire.soa.boss.common.chainunifiedrole.service.IShopApplyChainRoleService.saveApplyShops" + AND,

//新增统一管理门店
    DEL_UNIFY_APPLY_SHOPS: API_BASE_URL + "com.dfire.soa.boss.common.chainunifiedrole.service.IShopApplyChainRoleService.deleteApplyShops" + AND,

//获取连锁管理的全部门店职级
    GET_CHAIN_BRANCH_ROLE_LIST: API_BASE_URL + "com.dfire.boss.center.service.IRoleClientService.getChainBranchRoleList" + AND,

//获取连锁管理的全部门店职级
    // GET_CHAIN_BRANCH_ROLE_DETAIL_LIST: API_BASE_URL + "com.dfire.boss.center.IRoleClientService.getChainBranchRoleDetailList" + AND,
    GET_CHAIN_BRANCH_ROLE_DETAIL_LIST: API_BASE_URL + "com.dfire.boss.center.IRoleClientService.getBrandUnifiedRoleDetailList" + AND,


//查询可管理的职级
    GET_LIST_TOP_ACTION_GROUP: API_BASE_URL + "com.dfire.boss.center.action.IActionClientService.listTopActionGroupV2" + AND,

//获取连锁总部统一管理的职级权限详情
    LIST_REST_UNIFIED_ALL_ACTION_GROUP: API_BASE_URL + "com.dfire.boss.center.soa.action.service.IActionClientService.listRestUnifiedAllActionGroup" + AND,
    
//创建职级
    CREATE_ROLE: API_BASE_URL + "com.dfire.soa.boss.center.role.api.RoleFacade.createRole" + AND,

//更新职级
    UPDATE_ROLE: API_BASE_URL + "com.dfire.soa.boss.center.role.api.RoleFacade.updateRole" + AND,

//删除职级
    DELETE_ROLE: API_BASE_URL + "com.dfire.soa.boss.center.role.api.RoleFacade.deleteRole" + AND,

//对职权赋值
    GRANT_ROLE_ACTION: API_BASE_URL + "com.dfire.boss.center.soa.role.api.ActionFacade.grantRoleAction" + AND,

//查询门店  
    QUERY_ALL_CHAIN_SHOP_LIST: API_BASE_URL + "com.dfire.soa.boss.centerpc.entity.service.IShopBossPcService.queryAllChainShopList" + AND,

//获取分组
    GET_BASE_GROUP: API_BASE_URL + "com.dfire.soa.boss.centerpc.entity.service.IChainShopGroupService.getBaseGroup" + AND,

//获取机构
    GET_BRAND_ENTITIES_LIST: API_BASE_URL + "com.dfire.soa.boss.centerpc.entity.service.IShopBossPcService.getBrandEntitiesList" + AND,
    
//查询连锁门店列表
    GET_QUERY_CHAIN_SHOP_LIST: API_BASE_URL + "com.dfire.soa.boss.centerpc.entity.service.IShopBossPcService.queryChainShopList" + AND,

//更新店铺状态 
    UPDATE_SHOP_STATUS: API_BASE_URL + "com.dfire.soa.boss.centerpc.entity.service.IShopBossPcService.updateShopStatus" + AND,

//查询连锁总部员工列表
    GET_QUERY_USER_LINE_INFO: API_BASE_URL + "com.dfire.bps.IComboUserClientService.queryUserLineInfoVo" + AND,

//连锁员工冻结
    UPDATE_FROZEN_STATUS: API_BASE_URL + "com.dfire.bps.service.IUserInfoService.updateFrozenStatus" + AND,

//连锁员工删除
    DETELE_THOROUGH_USER: API_BASE_URL + "com.dfire.bps.IComboEntityClerkWriteClientService.deteleThoroughUser" + AND,

//获取店铺所有职权 暂时不用
    GET_LIST_SHOP_ROLES: API_BASE_URL + "com.dfire.boss.center.soa.employee.service.IEmployeeClientServiceV2.listShopRoles" + AND,

//获取职级
    GET_LIST_SHOP_ROLES_NEW: API_BASE_URL + "com.dfire.bps.IRoleService.listByEIdConditionContainUser" + AND,

//获取职级
    GET_QUERY_SYNTHE_SIZE: API_BASE_URL + "com.dfire.boss.center.soa.IUserSynthesizeClientService.querySynthesizeByUserId" + AND,

//获取员工基本信息
    GET_QUERY_SUMPLE_INFO: API_BASE_URL + "com.dfire.bps.IComboUserClientService.querySimpleInfoVo" + AND,

//新增员工
    INSERT_CHAIN_USER: API_BASE_URL + "com.dfire.bps.IComboEntityStaffWriteClientService.insert" + AND,

//修改员工
    UPDATE_CHAIN_USER: API_BASE_URL + "com.dfire.bps.IComboEntityStaffWriteClientService.update" + AND,

//查询所有职级信息
    GET_ROLE_DETAL_LIST: API_BASE_URL + "com.dfire.boss.center.soa.role.service.IRoleClientService.getRoleDetailList" + AND,

//查询职级详情信息
    GET_ALL_ACTION_GROUP_LIST: API_BASE_URL + "com.dfire.boss.center.soa.action.service.IActionClientService.listAllActionGroup" + AND,

//更新自定义简称和编码
    UPDATE_SHOP_CODE: API_BASE_URL + "com.dfire.boss.center.soa.entity.service.IShopBossPcService.updateShopCode" + AND,

//更新自定义简称和编码页面
    QUERY_SIMPLE_SHOP_LIST: API_BASE_URL + "com.dfire.boss.center.soa.centerpc.entity.service.IShopBossPcService.querySimpleShopList" + AND,

}
export default API;