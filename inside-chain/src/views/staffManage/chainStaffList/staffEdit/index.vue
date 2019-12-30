<template>
    <div>
        <crumbBar>
            <Crumb :name="userName"></Crumb>
        </crumbBar>
        <div class="staffEdit">
            <Form :label-width="200" ref="formInline" :model="formInline" :rules="ruleInline" >
                <CardBlock title="1、基础设置">
                    <div class="baseInfo">
                        <div style="display:inline-block">
                            <BaseInfo :formInline="formInline" ></BaseInfo>
                        </div>
                        <div class="uploadWarp">
                            <DrapUpload 
                            v-for="item in uploadList" 
                            @upload-success="uploadSuccess" 
                            @upload-remove='uploadRemove' 
                            :entityId="shopInfo.entityId" 
                            :key="item.key"
                            :picType="item.key"
                            :defaultList="getDefalutList(formInline.staffImageDTO[item.key])" 
                            :title="item.title"></DrapUpload>
                            <!-- <DrapUpload @upload-success="uploadSuccess" @upload-remove='uploadRemove' :entityId="shopInfo.entityId" :defaultList="defaultList" title="身份证正面（国徽）"></DrapUpload> -->
                            <!-- <DrapUpload @upload-success="uploadSuccess" @upload-remove='uploadRemove' :entityId="shopInfo.entityId" :defaultList="defaultList" title="身份证背面（人像）"></DrapUpload> -->
                            <p class="advice">仅支持jpg、png格式，大小不超过1MB</p>
                        </div>
                    </div>
                </CardBlock>
                <CardBlock title="2、权限设置">
                    <div class="baseInfo">
                        <FormItem label="员工职级：" prop="roleId">
                            <Select v-model="formInline.roleId" class="w-200">
                                <Option v-for="item in listShopRoles" :value="item.id" :key="item.id">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                    </div>
                </CardBlock>
                <CardBlock title="3、高级设置">
                    <div class="baseInfo">
                        <FormItem label="可管理门店：">
                            <Select v-model="formInline.shopsVo.all" class="w-200">
                                <Option value="true">全部门店</Option>
                                <Option value="false">部分门店</Option>
                            </Select>
                        </FormItem>
                        <div class="selectShop" v-if="formInline.shopsVo.all === 'false'">
                            <Button @click="showShopList" class="selectShopBtn"><Icon type="plus"></Icon> 选择门店</Button><span>已选择下列门店：共 {{shopList.length}} 家</span>
                            <Button class="right" type="ghost" shape="circle" icon="trash-a" @click="clearAll">清空</Button>
                            <ShopSelect :brand="pageState.plateEntityId" v-if="pageState.showShopSelect"
                                @on-cancel="pageState.showShopSelect = false"
                                @on-ok="saveShops" >
                            </ShopSelect>
                            <BaseBCard class="mt-10px mb-20px">
                                <Row>
                                    <Col :md="6" class="block" v-for="(item,index) in shopList" :key="index">
                                    <SelectBlock :item="item" @on-tap="select" @on-cancel="delOne($event, index)" :key="index">
                                    </SelectBlock>
                                    </Col>
                                </Row>
                            </BaseBCard>
                        </div>
                        <FormItem label="可管理品牌：">
                            <Select v-model="formInline.platesVo.all" class="w-200 mr-20px">
                                <Option value="true">全部品牌</Option>
                                <Option value="false">部分品牌</Option>
                            </Select>
                            <Select multiple class="w-300" placeholder="请选择内容" v-model="formInline.platesVo.userSynthesizes" v-if="formInline.platesVo.all === 'false'">
                                <Option v-for="item in querySyntheList.platesVo.userSynthesizeVos" :key="item.synthesizeId" :value="item.synthesizeId">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="可管理机构：">
                            <Select v-model="formInline.branchsVo.all" class="w-200 mr-20px">
                                <Option value="true">全部机构</Option>
                                <Option value="false">部分机构</Option>
                            </Select>
                            <Select multiple class="w-300" placeholder="请选择内容" v-model="formInline.branchsVo.userSynthesizes" v-if="formInline.branchsVo.all === 'false'">
                                <Option v-for="item in querySyntheList.branchsVo.userSynthesizeVos" :key="item.synthesizeId" :value="item.synthesizeId">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                    </div>
                </CardBlock>
            </Form>
        </div>
        <div class="flex-save">
                <Button type="primary" class="save-btn" @click="save('formInline')">保存</Button>
        </div>
    </div>
</template>
<script>
import crumbBar from '@/components/layout/crumb-bar'
import Crumb from "@/components/layout/crumb";
import BaseBCard from '@/components/layout/base-borderCard'
import SelectBlock from '@/components/layout/select-block'
import ShopSelect from '@/components/shop-select/shop-select'
import { mapGetters, mapActions } from 'vuex'
import chainRoleManage from '@/store/modules/components/chainRoleManage'
import shopSelectModule from "@/store/modules/components/shop-select"
import BaseInfo from './components/base-info'
import DrapUpload from './components/upload'
import CardBlock from '@/components/layout/card-block.vue'
import Cookie from '@2dfire/utils/cookie'

let shopInfo = {
    entityId:'',
}

if(Cookie.getItem('entrance') != undefined){
    shopInfo = JSON.parse(decodeURIComponent(Cookie.getItem('entrance'))).shopInfo
}

const ruleInline = {
        name: [
            { required: true, message: '必填项，不能为空', trigger: 'blur' },
            { pattern: /^.{1,15}$/, message: '姓名不能超过15个字符', trigger: 'blur' },
        ],
        mobile: [
            { required: true, message: '必填项，不能为空', trigger: 'blur' },
            { pattern: /^1[0-9]{10}$/, message: '请输入11位正确手机号码！', trigger: 'blur' },
        ],
        sex:[
            { required: true, message: '必填项，不能为空', trigger: 'change' }
        ],
        roleId:[
            { required: true, message: '必填项，不能为空', trigger: 'change' }
        ],
        idCard:[
             { required: false, pattern: /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/, message: '请输入正确的身份证号', trigger: 'blur' },
        ]
    }
const uploadList = [
    {key:'avatarUrl',title:'头像'},
    {key:'frontImgUrl',title:'身份证正面（国徽）'},
    {key:'backImgUrl',title:'身份证背面（人像）'},
]

const baseKeys = [ 'name', 'mobile', 'sex', 'idCard', 'entryDate', 'roleId', 'hireType', 'staffImageDTO']
const syntheKeys = [ 'shopsVo', 'platesVo', 'branchsVo' ]
export default {
    components: {
        crumbBar,Crumb,BaseBCard,SelectBlock,ShopSelect,BaseInfo,DrapUpload,CardBlock
    },
    created () {
        this.$store.dispatch("leftNav/setNav", 17);
        this.getListShopRoles()
        const id = this.$route.query.id || ''
        this.getQuerySynthesize(id)
        id && this.getQueryBaseInfo(id)
        this.userName = this.$route.query.name
    },
    data () {
        return {
            userName:'',
            ruleInline,
            formInline:{
                name:'',
                mobile:'',
                sex: '1',  //0 女  1 男
                entryDate:'',
                idCard:'',
                roleId:'',
                hireType: 1,
                shopsVo: {
                    all:'true',
                    synthesizeType:'1',
                    userSynthesizes:[]
                },
                platesVo: {
                    all:'true',
                    synthesizeType:'2',
                    userSynthesizes:[]
                },
                branchsVo: {
                    all:'true',
                    synthesizeType:'3',
                    userSynthesizes:[]
                },
                staffImageDTO:{
                    avatarUrl:'',   //头像
                    backImgUrl:'',  //反面
                    frontImgUrl:''  //正面
                }
            },
            pageState:{
                showShopSelect : false,
                plateEntityId:''
            },
            baseKeys,
            syntheKeys,
            defaultList:[],
            shopInfo,
            uploadList
        }
    },
    watch: {
        querySyntheList(value){
            Object.keys(value).map(key=>{
                this.formInline[key].all = `${value[key].all}`
                if(key === 'shopsVo'){
                    this.clearShops()
                    const arr = value[key].userSynthesizeVos.filter(v=>v.selected).map(item=>({
                            checked: true,
                            entityId: item.synthesizeId,
                            name: item.name
                    }))
                    arr.length && this.joinShop(arr)
                }
                this.formInline[key].userSynthesizes = value[key].userSynthesizeVos.filter(v=>v.selected).map(v=>v.synthesizeId)
            })
        },
        querySumpleList(value){
            this.baseKeys.map(key=>{
                if(value.hasOwnProperty(key)){
                    this.formInline[key] = value[key]
                }
            })
        },
        shopList(value){
            this.formInline.shopsVo.userSynthesizes = value.map(v=>v.entityId)
        }
    },
    computed: {
        ...mapGetters({
            shopList: 'shopSelect/shopList',
            allShops: "shopSelect/shops",
            listShopRoles:'chainRole/listShopRoles',
            querySyntheList:'chainRole/getQuerySyntheList',
            querySumpleList:'chainRole/querySumpleList'
        })
    },
    methods: {
        ...mapActions({
            joinShop: 'shopSelect/joinShop',
            selectShop: 'shopSelect/selectShop',
            clearShops: "shopSelect/clearShops",
            cancelShop: 'shopSelect/cancelShop',
            getListShopRoles:'chainRole/getListShopRoles',
            getQuerySynthesize:'chainRole/getQuerySynthesize',
            getQueryBaseInfo:'chainRole/getQueryBaseInfo',
            insertChainUserInfo:'chainRole/insertChainUserInfo',
            updateChainUserInfo:'chainRole/updateChainUserInfo'
        }),
        save(name){
            this.$refs[name].validate((valid) => {
                if(valid){
                    let params = {
                        userId: this.$route.query.id || '',
                        tidyUserSynthesizeDTOS:[],
                    }
                    // let tidyUserSynthesizeDTOS = []
                    Object.keys(this.formInline).map(key=>{
                        if(this.syntheKeys.includes(key)){
                            // tidyUserSynthesizeDTOS.push({
                            params.tidyUserSynthesizeDTOS.push({
                                synthesizeType: this.formInline[key].synthesizeType,
                                all: ((this.formInline[key].all == 'true') || this.formInline[key].userSynthesizes.length === this.querySyntheList[key].userSynthesizeVos.length),
                                userSynthesizes: this.formInline[key].userSynthesizes.map(v=>({
                                    synthesizeId: v,
                                    isValid: '1',
                                    synthesizeType: this.formInline[key].synthesizeType
                                }))
                            })
                            // params.tidyUserSynthesizeDTOS = JSON.stringify(tidyUserSynthesizeDTOS)
                        }else{
                            if(key === 'entryDate'){
                                params[key] = this.formInline[key] && this.formInline[key].getTime()
                            }else{
                                params[key] = this.formInline[key]
                            }
                        }
                    })
                    if(this.$route.query.id){
                        this.updateChainUserInfo(params)
                    }else{
                        this.insertChainUserInfo(params)
                    }
                }
            })
        },
        showShopList(){
            this.pageState.showShopSelect = true
        },
        select(item) {
            this.selectShop(item)
        },
        delOne(item, index) {
            console.log(item,index)
            this.cancelShop({item, index})
        },
        clearAll(){
            this.clearShops()
        },
        saveShops(){
            console.log(this.allShops)
            this.joinShop(this.allShops)
            this.pageState.showShopSelect = false
        },
        uploadSuccess(url,type){
            this.formInline.staffImageDTO[type] = url
        },
        uploadRemove(type){
            this.formInline.staffImageDTO[type] = ''
        },
        getDefalutList(url){
            if(url) return [{fullPath: url,status:'finished'}]
        }
    },
    beforeCreate () {
        let { shopSelect={}, chainRole={} } = this.$store.state

        if(Object.keys(shopSelect).length <= 0) {
            this.$store.registerModule('shopSelect', shopSelectModule)
        }

        if(Object.keys(chainRole).length <= 0) {
            this.$store.registerModule('chainRole', chainRoleManage)
        }
    }
}
</script>
<style lang="scss" scoped>
.staffEdit{
    padding-bottom: 55px;
    margin-bottom: 100px;
    .selectShop{
        margin-left: 200px;
        .selectShopBtn{
            height: 30px;
            padding: 6px 15px;
            color: #D83F3F;
            border-color: #D83F3F;
            background-color: #ffffff;
            margin-right: 20px;
            border-radius: 20px;
        }
        .block {
            margin-bottom: 5px;
            padding: 0 5px;
        }
    }
    .w-200{
        display: inline-block;
        width: 220px;
    }
    .w-300{
        width: 300px;
        display: inline-block;
    }
    .editLaber{
        text-align: right;
        padding-right: 12px;
        box-sizing: border-box;
    }
    .uploadWarp{
        float: right;
        vertical-align: top;
        width: 50%;
        & > div{
            margin-right: 50px;
        }
    }
    .advice {
        font-size: 12px;
        color: #999999;
        letter-spacing: 0;
        line-height: 18px;
        margin-top: 20px;
    }
    .right{
        float: right;
    }
    .left{
        float: left;
    }
}
.flex-save{
    height: 55px;
    width: calc(100% - 200px);
    position: fixed;
    bottom: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.9);
    border-top: 0.5px solid #cccccc;
    padding-top: 10px;
    z-index: 10;
    .save-btn{
        position: absolute;
        width: 180px;
        height: 36px;
        left: 50%;
        margin-left: -90px;
    }
}
</style>


