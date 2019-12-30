<template>
    <div class="nav-wrap">
        <div v-if="!shopNav">

            <div class="shop-wrap">
                <img class="shop-logo" :src="nav.shop.logo" alt="">
                <p class="shop-name">{{nav.shop.name}}</p>
            </div>
            <div class="list-scroll">
                <div class="list-wrap">
                    <ul class="nav-list">
                        <li v-for="item in nav.list" class="list-item" :nav-id="item.id" :class="{'active':item.select}"
                            :key="item.id">
                            <p class="text"><i class="icon" :class="item.icon"></i><a class="link"
                                                                                      @click="firstNavClick(item)">{{item.name}}<i
                                v-show="item.list&&item.list.length>0" class="ddl"
                                :class="{'up':item.show,'down':!item.show}"></i></a></p>
                            <div class="second-list" v-if="item.list" :class="{'show-list':item.show}">
                                <p :class="{'active':subitem.select}" :nav-id="subitem.id" class="sub-text"
                                   v-for="subitem in item.list" :key="subitem.id">
                                    <a class="sub-link" @click="secondNavClick(subitem)">{{subitem.name}}</a>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!--店铺内导航-->
        <div v-if="shopNav">
            <div class="back-chain" @click="backChain"> <span class="back-icon"></span>返回总部管理首页</div>
            <div class="shop-wrap">
                <img class="shop-logo" :src="shopSimpleInfo.logo" alt="门店照">
                <p class="shop-name">{{shopSimpleInfo.name}}</p>
                <ShopStatus v-if="shop_info.status" :color='color[status]' :status='shopStatus[status]' @on-click="editShopStatus"></ShopStatus>
            </div>
            <div class="list-scroll shop-nav-list">
                <div class="list-wrap">
                    <ul class="nav-list">
                        <li v-for="item in shopNavList" class="list-item shop-list-item" :nav-id="item.id" :class="{'shop-nav-active':item.active}"
                            :key="item.id">
                            <p class="text shop-nav-item">
                                <a class="link" @click="shopNavClick(item)">{{item.name}}</a>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Modal
        width="480"
        v-model="modal"
        :title="title"
        @on-ok="ok"
        @on-cancel="cancel">
            <ShopModal :shop_info="shop_info" ></ShopModal>
        </Modal>
    </div>
</template>
<script>
    import {mapGetters} from "vuex";
    import ShopStatus from '@/components/layout/shop-status'
    import ShopModal from '@/components/modal/shop-status-modal'
    import Requester from '@/base/requester'
    import API from '@/config/api'
    import catchError from '@/base/catchError'


    export default {
        data(){
            return{
                shopSimpleInfo: {
                    name:'',
                    logo:'',
                },
                status:'',
                modal:false,
                title:'营业状态编辑',
                shopStatus:{
                    1:'正常营业',
                    2:'停业'
                },
                color:{
                    1: '#49C070',
                    2: '#D83F3F'
                },
                shop_info:{
                    status:'',
                    closeType:'',
                    notes:''
                }
            }
        },
        components:{
            ShopStatus,ShopModal
        },
        mounted() {
            console.log('nav',this.nav)
        },
        computed: mapGetters({
            nav: "leftNav/data",
            shopNav: "leftNav/shopNav",
            shopNavList: "leftNav/shopNavList",
        }),
        methods: {
            firstNavClick(item) {
                this.$store.dispatch("leftNav/firstNavClick", item);
            },
            secondNavClick(item) {

                if(!item.select) {
                    this.$store.dispatch("leftNav/secondNavClick", item);
                }
            },
            shopNavClick(item) {
                let query = {
                    query: this.$route.query
                }
                Object.assign(item, query)
                this.$store.dispatch("leftNav/shopNavClick", item);
            },
            backChain(){
                this.$router.push({
                    path: '/shop_manage'
                })
            },
            getShopSimpleInfo(){
                let self = this;
                let params = {
                    entityId: self.$route.query.entityId
                }
                Requester.get(API.GET_SHOP_INFO, {params: params}).then(data => {

                    let shopImgs = []

                    if (data.data.shopImgList && data.data.shopImgList.length > 0) {
                        data.data.shopImgList.map(v => {
                            if (v.type == 0) {
                                shopImgs.push(
                                    v.imgUrl || ''
                                )
                            }
                        })
                    }

                    self.shopSimpleInfo.logo = shopImgs[0] || 'https://assets.2dfire.com/frontend/48ce863ce555e883092e4a8e3fd1da2f.png'
                    self.shopSimpleInfo.name = data.data.name || '-'
                    self.shop_info.status = data.data.status
                    self.status = data.data.status
                })
            },
            editShopStatus(){
                this.modal = true
            },
            ok(){
                const params = {
                    status: this.shop_info.status,
                    entityId: this.$route.query.entityId
                }
                Requester.get(API.UPDATE_SHOP_STATUS, {params: params }).then(res=>{
                    this.status = this.shop_info.status
                    // this.getShopSimpleInfo()
                    // window.location.reload()
                }).catch(e=>{
                    catchError(e)
                })
                this.modal = false
            },
            cancel(){
                this.shop_info.status = this.status
                this.modal = false
            }

        },
        created() {
//            this.$store.dispatch("leftNav/setNav")
            this.$store.dispatch("leftNav/setShop")
        },
        watch: {
            shopNav(newVal){
                let self = this;
                if(newVal>0){
                    self.getShopSimpleInfo()
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    .nav-wrap {
        width: 200px;
        height: 100%;
        position: fixed;
        left: 0;
        top: 70px;
        background-color: #333;
        color: #fff;
        z-index: 100;
        a {
            color: #fff;
        }
    }

    .second-list {
        display: none;
        &.show-list {
            display: block;
        }
    }

    .shop-wrap {
        height: 192px;
        padding: 30px 0;
        text-align: center;
    }

    .list-item {
        height: 58px;
    }

    .shop-list-item{
        height: 50px;
    }
    .shop-nav-list .list-item{
        background: #272727;
    }

    .active {
        background-color: #272727;
        height: auto;
    }

    .text {
        line-height: 58px;
        height: 58px;
        position: relative;
    }

    .shop-nav-item {
        line-height: 50px;
        height: 50px;
        padding-left: 55px;
        /*font-size: 14px;*/
    }

    .sub-text {
        line-height: 50px;
        height: 50px;
        display: inline-block;
        width: 100%;
        &.active {
            background-color: #d83f3f;
        }
    }

    .shop-nav-list .list-item.shop-nav-active {
        background-color: #d83f3f;
    }

    .icon {
        width: 20px;
        height: 20px;
        display: inline-block;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        vertical-align: middle;
        margin: 0 10px 0 25px;
    }

    .link {
        display: inline-block;
        vertical-align: middle;
        width: 145px;
    }

    .sub-link {
        padding-left: 55px;
        height: 50px;
        width: 100%;
        display: inline-block;
    }

    .ddl {
        width: 12px;
        height: 6px;
        position: absolute;
        cursor: pointer;
        top: 26px;
        right: 20px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url("https://assets.2dfire.com/frontend/1c348827c9d586eec67b00c31926cdc4.png");
        transition: all 0.3s;
        &.up {
        }
        &.down {
            transform: rotate(180deg)
        }
    }

    .icon-home {
        background-image: url("https://assets.2dfire.com/frontend/2d5d442f7372dcf6e0f7daabd72813ba.png");
    }

    .icon-setting {
        background-image: url("https://assets.2dfire.com/frontend/01609daa48da4e4695f5a633586ace1a.png");
    }

    .icon-member {
        background-image: url("https://assets.2dfire.com/frontend/72ddf8fb84be533468a3086e1fe5936d.png");
    }

    .icon-order {
        background-image: url("https://assets.2dfire.com/frontend/d503b60b2924c3545e3d2839dd4ddddf.png");
    }

    .icon-package {
        background-image: url("https://assets.2dfire.com/frontend/b7685f5342065ad1b663fc15b256be74.png");
    }

    .icon-message {
        background-image: url("https://assets.2dfire.com/frontend/baaf34aba9a2cc34e1674b194b084dc6.png");
    }

    .icon-cashier {
        background-image: url("https://assets.2dfire.com/frontend/08bdb0d46c5f15431e8ac44ab9aef410.png");
    }

    .shop-logo {
        width: 72px;
        height: 72px;
        display: inline-block;

        border-radius: 50%;

        background: #666666;

        margin-bottom: 15px;
    }

    .shop-name {
        font-size: 15px;
        color: #ffffff;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .list-scroll, .nav-list {
        /*不可选中*/
        user-select: none;
        width: 200px;
        height: calc(100vh - 242px);
    }

    .nav-list {
        width: 215px;
        padding-right: 15px;
    }

    .list-scroll {
        position: relative;
        overflow: hidden;
    }

    .list-wrap {
        position: absolute;
        left: 0;
        overflow-x: hidden;
        overflow-y: auto;
    }

    /* for Chrome */
    .list-wrap::-webkit-scrollbar {
        display: none;
    }

    .back-chain {
        margin: 15px 10px 0 10px;
        width: 180px;
        background: #555555;
        border: 1px solid rgba(255,255,255,0.20);
        box-shadow: 0 3px 8px 0 rgba(0,0,0,0.50);
        border-radius: 4px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;

        color: #ffffff;
        font-size: 14px;
        text-align: center;

        .back-icon {
            display: inline-block;
            width: 16.4px;
            height: 12px;
            margin-right: 12.6px;
            background-image: url("https://assets.2dfire.com/frontend/4f74c0067180819b4564d260655d64c1.png");
            background-size: cover;
        }
    }


</style>
