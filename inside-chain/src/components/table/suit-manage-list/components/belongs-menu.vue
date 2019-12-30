<template>
    <Poptip @on-popper-show="getBelongsMenu(item)"
            @on-popper-hide="clearBelongsMenu"
            v-model="visible"
            :width="225"
            class="belongs-menu pull-left">
        <span>查看菜品所在菜单</span>
        <div class="menu-list" slot="content">
            <div class="title">
                <span>该商品在下列菜单中已加入</span>
                <span class="close" @click="closePopTip">关闭</span>
            </div>
            <ul class="content" v-if="belongsMenu.chainMenuList && belongsMenu.chainMenuList.length">
                <li v-for="(item, $index) in belongsMenu.chainMenuList" :key="$index">
                    <div class="menu-name oneline">{{item.chainMenuName}}</div>
                    <div class="price pull-right">
                        <span>单价:</span>
                        <span class="red">¥{{item.price.toFixed(2)}}</span>
                    </div>
                </li>
            </ul>
            <div class="text-center blank-color" v-else>0本菜单</div>
            <div class="footer">
                <div class="unjoin">{{belongsMenu.notJoinNum}}本菜单未加入</div>
                <a href="javascript:void(0)" class="pull-right set" @click="jumpToMenu">去设置</a>
            </div>
        </div>
    </Poptip>
</template>

<script>
    import {apiGetBelongsMenuList} from '@/config/api_setting'
    import catchError from '@/base/catchError'
    export default {
        name: 'belongs-ment',
        props: {
            item: {
                type: Object,
                default: null
            }
        },
        data(){
            return {
                visible: false,
                belongsMenu: {
                    chainMenuList: [],
                    notJoinNum: 0
                }
            }
        },
        methods: {
            getBelongsMenu(item){
                let {suitId} = item
                let plateEntityId = this.$route.query.plateEntityId
                apiGetBelongsMenuList(suitId, plateEntityId).then(data => {
                    console.log(data)
                    this.belongsMenu = data.data
                }).catch(e => {
                    catchError(e)
                })
            },
            clearBelongsMenu(){
                this.belongsMenu = {
                    chainMenuList: [],
                    notJoinNum: 0
                }
            },
            jumpToMenu(){
                let plateEntityId = this.$route.query.plateEntityId
                this.$router.push({
                    path: '/menu_manage',
                    query: {
                        plateEntityId
                    }
                })
            },
            closePopTip(){
                this.visible = false
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

    .title {
        height: 38px;
        line-height: 38px;
        background: #F1F1F1;
        border-radius: 1px;
        font-size: 12px;
        color: #333333;
        padding: 0 10px;

        span:first-child{
            font-weight: bold;
        }

        .close {
            float: right;
            color: #D83F3F;
            cursor: pointer;
        }
    }

    .content {
        max-height: 130px;
        overflow: auto;
        padding: 0 10px;

        li {
            height: 25px;
            line-height: 25px;
        }

        .menu-name {
            font-size: 12px;
            color: #666666;
            max-width: 115px;
            float: left;
        }

        .price {
            color: #333333;;

            .red {
                color: #ff673d;
            }
        }
    }

    .footer {
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        color: #333333;
        border: 1px solid #EEEEEE;
        border-bottom: 0;

        .unjoin {
            display: inline-block;
        }

        .set {
            color: #5599FF;
        }
    }
</style>

