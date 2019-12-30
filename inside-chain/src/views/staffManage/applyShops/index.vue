<template>
    <div>
       <crumbBar>
            <Crumb></Crumb>
        </crumbBar>
        <div class="shopCase">
            <div class="useShop">
                <ShopSelect 
                @saveShops="saveShops" 
                @select="select" 
                @delOne="delOne" 
                :shopList="unifyShopList" 
                type='unify' 
                title="已适用门店" 
                :promptMes="promptMes.title" />
            </div>
            <div class="selfManage">
                <ShopSelect 
                @saveShops="saveShops" 
                @select="select" 
                @delOne="delOne" 
                :shopList="selfShopList" 
                type='self' title="自主管理门店" />
            </div>
            <!-- <Modal
                v-model="model"
                width="400"
                title="请注意"
                @on-ok="ok"
                @on-cancel="cancel">
                <div class="modelContent">
                    <div class="iconWarp">
                        <Icon class="staff-icon" type="android-alert"></Icon>
                    </div>
                    <div>
                        确认添加 <span style="color:#5599FF">{{selectCount}}</span> 家门店
                    </div>
                </div>
                <div slot="footer">
                    <Button type="default"  @click="cancel">上一步</Button>
                    <Button type="default"  @click="cancel">取消</Button>
                    <Button type="primary"  @click="ok">确认</Button>
                </div>
            </Modal> -->
        </div>
    </div>
</template>
<script>
import crumbBar from '@/components/layout/crumb-bar'
import Crumb from "@/components/layout/crumb";
import ShopSelect from './component/shopSelect'
import shopSelectModule from "@/store/modules/components/shop-select"
import { mapGetters, mapActions } from 'vuex'
import staffManage from '@/store/modules/components/staffManage'


const promptMes = {
    title:"*店员职级适用门店代表该店店员职级由连锁总部统一管理，门店员工无权自主设置或修改权限。",
    add:{
        self:'家门店将切换为员工职级自主管理，请谨慎操作！',
        unify:'家门店将由职级自主管理更换为连锁统一管理，门店职级将被清空，员工职级需重新绑定，请谨慎操作！'
    },
    del:{
        self:'修改为总部统一管理职级的门店吗？',
        unify:'修改为自主管理职级的门店吗？'
    }
}
export default {
    components: {
        crumbBar,Crumb,ShopSelect
    },
    computed: {
        ...mapGetters({
            shopList: 'shopSelect/shopList',
            allShops: "shopSelect/shops",
            unifyShopList:"staff/getUnifyShopList",
            selfShopList:"staff/getSelfShopList",
        }),
        selectCount(){
            return (this.allShops.filter(item=>{
                return item.checked
            }))
        }
    },
    methods: {
        ...mapActions({
            selectShop: 'staff/selectShop',
            addUnifyApplyShops:'staff/addUnifyApplyShops',
            delUnifyApplyShops:'staff/delUnifyApplyShops',
            getApplyAndUnapplyShops:'staff/getApplyAndUnapplyShops'
        }),
        saveShops({type}){
            this.model = true;
            const config ={
                title: '请注意',
                render: (h) => {
                    return h('div',{style:{height:'40px',padding:'18px 0 0 48px'}},[
                        h('p',{style:{fontSize:'14px'}},[
                            h('span',{style:{color:'#5599FF',margin:'0 5px '}},this.selectCount.length),
                            h('span',this.promptMes.add[type]),
                        ]),
                        h('div',{style:{position:'absolute',left:'0',top:'0',color:'#f90',fontSize:'36px'}},[
                            h('Icon',{attrs:{type:'android-alert'}})
                        ])
                    ])
                },
                onOk: () => {
                    
                    if(type === 'unify'){
                        this.addUnifyApplyShops(this.selectCount.map(i=>i.entityId))
                    }else if( type === 'self' ){
                        this.delUnifyApplyShops(this.selectCount.map(i=>i.entityId))
                    }
                },
                onCancel: () => {
                }
            }
            this.$Modal.confirm(config)
        },
        select(res){
            this.selectShop(res)
        },
        delOne(res){
            const { type, item } = res
            const delConfig = {
                title: '请注意',
                render: (h) => {
                    return h('div',{style:{height:'40px',padding:'18px 0 0 48px'}},[
                        h('p',{style:{fontSize:'14px'}},[
                            h('span','确定要将'),
                            h('span',{style:{color:'#5599FF',margin:'0 5px '}},item.name),
                            h('span',this.promptMes.del[type]),
                        ]),
                        h('div',{style:{position:'absolute',left:'0',top:'0',color:'#f90',fontSize:'36px'}},[
                            h('Icon',{attrs:{type:'android-alert'}})
                        ])
                    ])
                },
                onOk: () => {
                    if(type === 'unify'){
                        this.delUnifyApplyShops([].concat(item.entityId))
                    }else if( type === 'self' ){
                        this.addUnifyApplyShops([].concat(item.entityId))
                    }
                },
                onCancel: () => {
                }
            }
            this.$Modal.confirm(delConfig)
            
        },
        ok(){
            this.model = false
        },
        cancel(){
            this.model = false
        }
    },
    created () {
        this.$store.dispatch("leftNav/setNav", 18);
        this.getApplyAndUnapplyShops()
    },
    data () {
        return {
            promptMes,
            model:false,
        }
    },
    beforeCreate () {
        let { shopSelect={}, staff={} } = this.$store.state

        if(Object.keys(shopSelect).length <= 0) {
            this.$store.registerModule('shopSelect', shopSelectModule)
        }

        if(Object.keys(staff).length <= 0) {
            this.$store.registerModule('staff', staffManage)
        }
    }
}
</script>
<style lang="scss" scoped>
.shopCase{
    padding: 30px;
    .useShop{
        margin-bottom: 20px;
    }
}
/deep/ .modelContent{
    position: relative;
    min-height: 40px;
    padding: 0px 0px 0px 48px;
    font-size: 14px;
    .iconWarp{
        position: absolute;
        left: 0px;
        top: -16px;
        color: rgb(255, 153, 0);
        font-size: 36px;
    }
}
</style>


