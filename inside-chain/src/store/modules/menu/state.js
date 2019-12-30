export default{
    // 品牌列表
    allMenuList: {
        total: 0,
        menus: []
    },
    reuseMenuList: [],
    goodsList: [],
    noSearchItems: true,
    unSubmitGoods: [],
    resultBackup: [],

    // 进入某菜单后，记录菜单的信息
    // 如不存在，则从cookie中获取
    menuInfo: {
        menuName: ''
    },
    filterParams: {
        type: '',
        keyword: ''
    },
    goodsKinds: [],
    goodsKindsSingle: [],
    typeList: [
    ],
    goodsOfMenu: [],
    goodsOfMenuTotal: 0,
    goodsOfMenuSimple: [],
    goodsOfMenuSimpleTotal: 0,
    // 商品价格
    goodsPrice: {
        useDefaultPriceSwitch: false,
        priceSwitch: false,
        price: 0,
        memberPrice: 0,
        defaultPrice: 0,
        defaultMemberPrice: 0,
        specPrices: [
            // {
            //     defaultPrice: 0,
            //     price: 0,
            //     specDetailId: '',
            //     specDetailName: ''
            // }
        ]
    },
    // 商品价格备份
    priceBackup: {

    },
    kindMenuTree: [],
    allSimpleItem: [],
    publishType: [],
    publishTimeType: [],
    publishMenus: []
}
