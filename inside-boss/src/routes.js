import { injectAsyncReducer } from './utils/asyncInjector'

export default function createRoutes(store) {
    return [
        {
            path: '/RECHARGE_BATCH/:pageType',
            name: 'updown',
            getComponent: (location, render) => {
                require.ensure(
                    ['./container/updown/reducers', './container/updown'],
                    require => {
                        const container = require('./container/updown').default
                        const reducer = require('./container/updown/reducers')
                            .default

                        injectAsyncReducer(store, 'updown', reducer)
                        render(null, container)
                    },
                    'updown'
                )
            }
        },
        {
            path: '/ITEM_EXPORT/:pageType',
            name: 'goods',
            getComponent: (location, render) => {
                require.ensure(
                    ['./container/goods/reducers', './container/goods'],
                    require => {
                        const container = require('./container/goods').default
                        const reducer = require('./container/goods/reducers')
                            .default

            injectAsyncReducer(store, 'goods', reducer)
            render(null, container)
          },
          'goods'
        )
      }
    },

      {
        path: "/ITEM_EDIT/:pageType",
        name: "goodEdit",
        getComponent: (location, render) => {
          require.ensure(
            ["./container/goodEdit/reducers", "./container/goodEdit"],
            require => {
              const container = require("./container/goodEdit").default;
              const reducer = require("./container/goodEdit/reducers")
                .default;

              injectAsyncReducer(store, "goodEdit", reducer);
              render(null, container);
            },
            "goodEdit"
          );
        }
      },
    {
        path: "/COMBINED_GOODS_EDIT/:pageType",
        name: "combinedGoodsEdit",
        getComponent: (location, render) => {
          require.ensure(
            ["./container/combinedGoodsEdit/reducers", "./container/combinedGoodsEdit"],
            require => {
              const container = require("./container/combinedGoodsEdit").default;
              const reducer = require("./container/combinedGoodsEdit/reducers")
                .default;
              injectAsyncReducer(store, "combinedGoodsEdit", reducer);
              render(null, container);
            },
            "combinedGoodsEdit"
          );
        }
      },
    {
      path: '/BOSS_MENU_IMG_IMPORT/:pageType',
      name: 'goodsPicture',
      getComponent: (location, render) => {
        require.ensure(
          ['./container/goodsPicture/reducers', './container/goodsPicture'],
          require => {
            const container = require('./container/goodsPicture').default
            const reducer = require('./container/goodsPicture/reducers').default

                        injectAsyncReducer(store, 'goodsPicture', reducer)
                        render(null, container)
                    },
                    'goodsPicture'
                )
            }
        },
        {
            path: '/MEMBER_EXPORT/:pageType',
            name: 'memberInformation',
            getComponent: (location, render) => {
                require.ensure(
                    [
                        './container/memberInformation/reducers',
                        './container/memberInformation'
                    ],
                    require => {
                        const container = require('./container/memberInformation')
                            .default
                        const reducer = require('./container/memberInformation/reducers')
                            .default

            injectAsyncReducer(store, 'memberInformation', reducer)
            render(null, container)
          },
          'memberInformation'
        )
      }
    },
    {
      path: '/PC_BRAND_ISSUE_COUPON/:pageType',
      name: 'couponPush',
      getComponent: (location, render) => {
        require.ensure(
          ['./container/couponPush/reducers', './container/couponPush'],
          require => {
            const container = require('./container/couponPush').default
            const reducer = require('./container/couponPush/reducers').default

                        injectAsyncReducer(store, 'couponPush', reducer)
                        render(null, container)
                    },
                    'couponPush'
                )
            }
        },
        {
            path: '/NO_OWNER_COUPON/:pageType',
            name: 'noOwnerCoupon',
            getComponent: (location, render) => {
                require.ensure(
                    [
                        './container/noOwnerCoupon/reducers',
                        './container/noOwnerCoupon'
                    ],
                    require => {
                        const container = require('./container/noOwnerCoupon')
                            .default
                        const reducer = require('./container/noOwnerCoupon/reducers')
                            .default

                        injectAsyncReducer(store, 'noOwnerCoupon', reducer)
                        render(null, container)
                    },
                    'noOwnerCoupon'
                )
            }
        },
        {
            path: '/BOSS_VIDEO_IMPORT/:pageType',
            name: 'videoImport',
            getComponent: (location, render) => {
                require.ensure(
                    [
                        './container/videoImport/reducers',
                        './container/videoImport'
                    ],
                    require => {
                        const container = require('./container/videoImport')
                            .default
                        const reducer = require('./container/videoImport/reducers')
                            .default

                        injectAsyncReducer(store, 'videoImport', reducer)
                        render(null, container)
                    },
                    'videoImport'
                )
            }
        },
        {
            path: '/ORDER_HISTORY_SNAPSHOT/:pageType',
            name: 'orderPhotos',
            getComponent: (location, render) => {
                require.ensure(
                    [
                        './container/orderPhotos/reducers',
                        './container/orderPhotos'
                    ],
                    require => {
                        const container = require('./container/orderPhotos')
                            .default
                        const reducer = require('./container/orderPhotos/reducers')
                            .default

                        injectAsyncReducer(store, 'orderPhotos', reducer)
                        render(null, container)
                    },
                    'orderPhotos'
                )
            }
        },
        {
            path: '/welcome',
            name: 'welcome',
            getComponent: (location, render) => {
                require.ensure(
                    ['./container/welcome'],
                    require => {
                        const container = require('./container/welcome').default
                        render(null, container)
                    },
                    'welcome'
                )
            }
        },
        {
            path: '/EXTERNAL_LINK/:pageType',
            name: 'externalLink',
            getComponent: (location, render) => {
                require.ensure(
                    ['./container/externalLink'],
                    require => {
                        const container = require('./container/externalLink').default
                        render(null, container)
                    },
                    'externalLink'
                )
            }
        },
        {
            path: '/old_design',
            name: 'visualConfigDesign',
            getComponent: (location, render) => {
                require.ensure(
                    ['./container/visualConfig/views/design'],
                    require => {
                        require('./container/visualConfig/store/register')
                        const container = require('./container/visualConfig/views/design').default;
                        render(null, container);
                    },
                    'old_design'
                );
            }
        },
        {
            path: '/visual_config_design',
            name: 'visualConfigDesign',
            getComponent: (location, render) => {
                require.ensure(
                    ['./container/visualConfig/views/new_design'],
                    require => {
                        require('./container/visualConfig/store/register')
                        const container = require('./container/visualConfig/views/new_design').default;
                        render(null, container);
                    },
                    'design'
                );
            }
        },
        {
          path: '/price_tag',
          name: 'priceTag',
          getComponent: (location, render) => {
            require.ensure([
              './container/priceTag/reducers',
              './container/priceTag'
            ], (require) => {
              const container = require('./container/priceTag')
                  .default
              const reducer = require('./container/priceTag/reducers').default

              injectAsyncReducer(store, 'priceTag', reducer)
              render(null, container)
            }, 'priceTag')
          }
        },
        {
          path: '/PRICE_TAG_EDIT',
          name: 'priceTagEdit',
          getComponent: (location, render) => {
            require.ensure([
              './container/priceTagEdit/reducers',
              './container/priceTagEdit'
            ], (require) => {
              const container = require('./container/priceTagEdit')
                  .default
              const reducer = require('./container/priceTagEdit/reducers').default

              injectAsyncReducer(store, 'priceTagEdit', reducer)
              render(null, container)
            }, 'priceTagEdit')
          }
        },
        {
            path: '/visual_config_union',
            name: 'visualConfigDesign',
            getComponent: (location, render) => {
                require.ensure(
                    ['./container/visualConfig/views/new_design'],
                    require => {
                        require('./container/visualConfig/store/register')
                        const container = require('./container/visualConfig/views/new_design').default;
                        render(null, container);
                    },
                    'design'
                );
            }
        },
        {
            path: '/visual_config_pages',
            name: 'visualConfigPages',
            getComponent: (location, render) => {
                require.ensure(
                    ['./container/visualConfig/views/pages_manage/page'],
                    require => {
                        require('./container/visualConfig/store/register')
                        const container = require('./container/visualConfig/views/pages_manage/page').default;
                        render(null, container);
                    },
                    'visualConfigPages'
                );
            }
        },
        {
            path: '/visual_config_adPage',
            name: 'visualConfigAdPage',
            getComponent: (location, render) => {
                require.ensure(
                    ['./container/visualConfig/views/pages_manage/adPage'],
                    require => {
                        require('./container/visualConfig/store/register')
                        const container = require('./container/visualConfig/views/pages_manage/adPage').default;
                        render(null, container);
                    },
                    'visualConfigAdPage'
                );
            }
        },
        {
            path: '/visual_config_recommendedGood',
            name: 'visualConfigRecommendedGood',
            getComponent: (location, render) => {
                require.ensure(
                    ['./container/visualConfig/views/pages_manage/recommendedGood'],
                    require => {
                        require('./container/visualConfig/store/register')
                        const container = require('./container/visualConfig/views/pages_manage/recommendedGood').default;
                        render(null, container);
                    },
                    'visualConfigRecommendedGood'
                );
            }
        },
        {
            path: '/visual_config_templates',
            name: 'visualConfigTemplates',
            getComponent: (location, render) => {
                require.ensure(
                    ['./container/visualConfig/views/templates'],
                    require => {
                        require('./container/visualConfig/store/register')
                        const container = require('./container/visualConfig/views/templates').default;
                        render(null, container);
                    },
                    'visualConfigTemplates'
                );
            }
        },
        {
            path: '/visual_config_backups',
            name: 'visualConfigBackups',
            getComponent: (location, render) => {
                require.ensure(
                    ['./container/visualConfig/views/backups'],
                    require => {
                        require('./container/visualConfig/store/register')
                        const container = require('./container/visualConfig/views/backups').default;
                        render(null, container);
                    },
                    'visualConfigBackups'
                );
            }
        },
        {
            path: '/UPLOAD_COMM_FILE/:pageType',
            name: 'uploadComm',
            getComponent: (location, render) => {
                require.ensure(
                    [
                        './container/uploadComm/reducers',
                        './container/uploadComm'
                    ],
                    require => {
                        const container = require('./container/uploadComm')
                            .default
                        const reducer = require('./container/uploadComm/reducers')
                            .default

                        injectAsyncReducer(store, 'uploadComm', reducer)
                        render(null, container)
                    },
                    'uploadComm'
                )
            }
        },
        {
            path: '/IMPORT_LOG/:pageType',
            name: 'importLog',
            getComponent: (location, render) => {
                require.ensure(
                    ['./container/importLog/reducers', './container/importLog'],
                    require => {
                        const container = require('./container/importLog')
                            .default
                        const reducer = require('./container/importLog/reducers')
                            .default

                        injectAsyncReducer(store, 'importLog', reducer)
                        render(null, container)
                    },
                    'importLog'
                )
            }
        },
        {
            path: '/DOWNLOAD_COMM_TMPL/:pageType',
            name: 'downComm',
            getComponent: (location, render) => {
                require.ensure(
                    ['./container/downComm/reducers', './container/downComm'],
                    require => {
                        const container = require('./container/downComm')
                            .default
                        const reducer = require('./container/downComm/reducers')
                            .default
                        injectAsyncReducer(store, 'downComm', reducer)
                        render(null, container)
                    },
                    'downComm'
                )
            }
        },
        {
            path: '/HIGH_ROUTE_IMPORT/:pageType',
            name: 'routeInfoImport',
            getComponent: (location, render) => {
                require.ensure(
                    [
                        './container/routeInfoImport/reducers',
                        './container/routeInfoImport'
                    ],
                    require => {
                        const container = require('./container/routeInfoImport')
                            .default
                        const reducer = require('./container/routeInfoImport/reducers')
                            .default
                        injectAsyncReducer(store, 'routeInfoImport', reducer)
                        render(null, container)
                    },
                    'routeInfoImport'
                )
            }
        },
        {
            path: '/HIGH_TRAIN_IMPORT/:pageType',
            name: 'trainInfoImport',
            getComponent: (location, render) => {
                require.ensure(
                    [
                        './container/trainInfoImport/reducers',
                        './container/trainInfoImport'
                    ],
                    require => {
                        const container = require('./container/trainInfoImport')
                            .default
                        const reducer = require('./container/trainInfoImport/reducers')
                            .default
                        injectAsyncReducer(store, 'trainInfoImport', reducer)
                        render(null, container)
                    },
                    'trainInfoImport'
                )
            }
        },
        {
            path: '/HIGH_DAILY_MONITOR/:pageType',
            name: 'highMonitor',
            getComponent: (location, render) => {
                require.ensure(
                    [
                        './container/highMonitor/reducers',
                        './container/highMonitor'
                    ],
                    require => {
                        const container = require('./container/highMonitor')
                            .default
                        const reducer = require('./container/highMonitor/reducers')
                            .default

                        injectAsyncReducer(store, 'highMonitor', reducer)
                        render(null, container)
                    },
                    'highMonitor'
                )
            }
        },
        {
            path: '/CUSTOM_BILL/:pageType',
            getComponent: (location, render) => {
                require.ensure(
                    [
                        './container/customBill/reducers',
                        './container/customBill'
                    ],
                    require => {
                        const container = require('./container/customBill')
                            .default
                        const reducer = require('./container/customBill/reducers')
                            .default
                        injectAsyncReducer(store, 'customBill', reducer)
                        render(null, container)
                    },
                    'customBill'
                )
            }
        },
        {
            path: '/CUSTOM_BILL/detail/:pageType(/:id)',
            name: 'customBillDetail',
            getComponent: (location, render) => {
                require.ensure(
                    ['./container/customBillDetail'],
                    require => {
                        const container = require('./container/customBillDetail')
                            .default
                        const reducer = require('./container/customBillDetail/reducers')
                            .default
                        injectAsyncReducer(store, 'customBill', reducer)
                        render(null, container)
                    },
                    'customBillDetail'
                )
            }
        },
        {
            path: '/MALL_BANNER_MANAGER/:pageType',
            name: 'mallBannerManager',
            getComponent: (location, render) => {
                require.ensure([
                    './container/mallBannerManager/reducers',
                    './container/mallBannerManager'
                ], (require) => {
                    const container = require('./container/mallBannerManager').default
                    const reducer = require('./container/mallBannerManager/reducers').default

                    injectAsyncReducer(store, 'mallBannerManager', reducer)
                    render(null, container)
                }, 'mallBannerManager')
            }
        },
        {
            path: '/MALL_PROMOTION_MANAGER/:pageType',
            name: 'mallActivityManager',
            getComponent: (location, render) => {
                require.ensure([
                    './container/mallActivityManager/reducers',
                    './container/mallActivityManager'
                ], (require) => {
                    const container = require('./container/mallActivityManager').default
                    const reducer = require('./container/mallActivityManager/reducers').default

                    injectAsyncReducer(store, 'mallActivityManager', reducer)
                    render(null, container)
                }, 'mallActivityManager')
            }
        },
        {
            path: "/IMPORT_HISTORY/:pageType",
            name: "importHistory",
            getComponent: (location, render) => {
                require.ensure(
                    ["./container/importHistory/reducers", "./container/importHistory"],
                    require => {
                        const container = require("./container/importHistory").default;
                        const reducer = require("./container/importHistory/reducers")
                            .default;

                        injectAsyncReducer(store, "importHistory", reducer);
                        render(null, container);
                    },
                    "importHistory"
                );
            }
        },
        {
            path: '/CUSTOM_BILL/store/:pageType(/:id)',
            getComponent: (location, render) => {
                require.ensure(
                    [
                        './container/customBillStore/reducers',
                        './container/customBillStore'
                    ],
                    require => {
                        const container = require('./container/customBillStore')
                            .default
                        const reducer = require('./container/customBillStore/reducers')
                            .default
                        injectAsyncReducer(store, 'customBill', reducer)
                        render(null, container)
                    },
                    'customBillStore'
                )
            }
        },
        {
          path: '/ITEM_IMPORT/:pageType',
          name: 'goodsImport',
          getComponent: (location, render) => {
            require.ensure([
              './container/goodsImport/reducers',
              './container/goodsImport'
            ], (require) => {
              const container = require('./container/goodsImport').default
              const reducer = require('./container/goodsImport/reducers').default

              injectAsyncReducer(store, 'goodsImport', reducer)
              render(null, container)
            }, 'goodsImport')
          }
        },

        {
            path: '/',
            onEnter(n, r) {
                r('/welcome')
            }
        },
        {
            path: '*',
            component: null
        }
    ]
}
