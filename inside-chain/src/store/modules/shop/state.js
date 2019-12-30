export default {
    brands: {
        total: 0,
        shops: []
    },
    brand_info: {
        name: '',
        foundDate: '',
        joinMode: '',
        cooking: [],
        intro: '',
        logo: ''
    },
    shop_filter: {
        keyWord: '',
        code:'',
        areas: [],
        area_show: [],
        brands: [],

        joinModes: [
            {
                name: '全部',
                entityId: '-1',
            },
            {
                name: '加盟',
                entityId: 0,
            },
            {
                name: '直营',
                entityId: 1,
            },
            {
                name: '合作',
                entityId: 2,
            },
            {
                name: '合营',
                entityId: 3,
            },
        ],
        shopStatusList:[
            {
                name:'全部',
                entityId:''
            },
            {
                name:'正常营业',
                entityId:'1'
            },{
                name:'停业',
                entityId:'2'
            }
        ],

        organs: [],
        organs_show: [],
        organs_checked: [],
        areas_checked: [],

        showFilterOrgan: true,

        //是否有停业门店
        closeShop: false,
        // 选中的品牌id
        selected_brand: '',
        // 选中的加盟类型 默认全部 -1
        selected_join: '-1',
        // 选中的组织id
        selected_organ: '',
        // 省id
        selected_provinceId: '',
        // 城市id
        selected_cityId: '',
        // 区县id
        selected_townId: '',
        //类别ID
        categoryIds:[],
        //分组ID
        groupIds:[],
        //供应链
        supplyGroupMap:[],
        //供应链选中的id
        select_supplyGroupMap:[],
        //门店状态
        shopStatus:''
    },
    shops:
        {
            shops: [{
                address: '',
                brand: '',
                code: '',
                img: '',
                manager: '',
                name: '',
                open_date: '',
                phone: '',
                staff: '',
                status: '',
                statusCN: '',
                type: '',
            }],
            total: 0
        },
    shop_info: {
        base_info: {
            brand: '',
            code: '',
            manager: '',
            name: '',
            organ: '',
            phone: '',
            type: '',
        },
        business_info: {
            address: '',
            cooking: '',
            cost: '',
            intro: '',
            open_date: '',
            service: '',
        },
        shop_photo: {
            main: '',
            imgs: []
        }
    },
    shop_turnover: [],

    view_date: {
        start: '',
        end: '',
    },
    category: [],
    params: {
        pageIndex: 1,
        pageSize: 6,
    },
    catchFilter:{
        status:false
    }
}
