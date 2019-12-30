export default item => {
  const {query = {}} = item
  return {
    visual_config_design: '/visual_config_design',
    visual_config_pages: '/visual_config_pages',
    visual_config_templates: '/visual_config_templates',
    visual_config_backups: '/visual_config_backups',
    visual_config_union: '/visual_config_union',
    visual_config_adPage: '/visual_config_adPage',
    visual_config_recommendedGood: '/visual_config_recommendedGood',
    price_tag: '/price_tag',

    CHART: `/CHART/${query.reportId || ''}`,
    ITEM_EXPORT: '/ITEM_EXPORT/item',
    ITEM_EDIT: '/ITEM_EDIT/item',
    COMBINED_GOODS_EDIT: '/COMBINED_GOODS_EDIT/item',
    DOWNLOAD_COMM_TMPL: '/DOWNLOAD_COMM_TMPL/template',
    IMPORT_LOG: '/IMPORT_LOG/comm',
    HIGH_ROUTE_IMPORT: '/HIGH_ROUTE_IMPORT/item',
    HIGH_TRAIN_IMPORT: '/HIGH_TRAIN_IMPORT/item',
    MEMBER_EXPORT: '/MEMBER_EXPORT/member',
    RECHARGE_BATCH: '/RECHARGE_BATCH/recharge',
    BOSS_VIDEO_IMPORT: '/BOSS_VIDEO_IMPORT/video',
    ORDER_HISTORY_SNAPSHOT: '/ORDER_HISTORY_SNAPSHOT/order',
    BOSS_MENU_IMG_IMPORT: '/BOSS_MENU_IMG_IMPORT/picture',
    UPLOAD_COMM_FILE: '/UPLOAD_COMM_FILE/item',
    PC_BRAND_ISSUE_COUPON: '/PC_BRAND_ISSUE_COUPON/coupon',//优惠券批量发放
    PC_ISSUE_COUPON: '/PC_BRAND_ISSUE_COUPON/coupon',//优惠券批量发放一样的
    NO_OWNER_COUPON: '/NO_OWNER_COUPON/coupon',//不记名优惠券
    HIGH_DAILY_MONITOR: '/HIGH_DAILY_MONITOR/list',
    MALL_BANNER_MANAGER: '/MALL_BANNER_MANAGER/list',
    MALL_PROMOTION_MANAGER: '/MALL_PROMOTION_MANAGER/list',
    IMPORT_HISTORY: '/IMPORT_HISTORY/import_history',
    CUSTOM_BILL: '/CUSTOM_BILL/main', //自定义单据
    ITEM_IMPORT: '/ITEM_IMPORT/item',
    design: '/design',
    visual_template: '/visual_template',
    visual_backup: '/visual_backup',
    CUSTOM_BILL: '/CUSTOM_BILL/main',//自定义单据,
    FHY_EXTERNAL_LINK: '/EXTERNAL_LINK/shopManage',
    FHY_CATEGORY_LINK: '/EXTERNAL_LINK/category',
    FHY_DYNAMIC_LINK: '/EXTERNAL_LINK/dynamic',
    FHY_CHAINMANAGE_LINK: '/EXTERNAL_LINK/chainManage',
    FHY_ACCOUNTGUARANTEE_LINK:'/EXTERNAL_LINK/bankCardCheckForGuarantee',
    FHY_VEDIO_LINK: '/EXTERNAL_LINK/vedio',
    FHY_REPORT_LINK:'/EXTERNAL_LINK/report',
    FHY_GROUPORDER_LINK: '/EXTERNAL_LINK/groupbuyOrder',
    FHY_SHAREMAKEMONEY_LINK: '/EXTERNAL_LINK/shareMakeMoney',
    FHY_GROUPDINNER_LINK: '/EXTERNAL_LINK/groupDinner',
    PRICE_TAG_EDIT: '/PRICE_TAG_EDIT/main',
  }
}
