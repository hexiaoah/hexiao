<template>
    <div class="editorGroup">
        <crumbBar>
            <Crumb></Crumb>
        </crumbBar>
        <div class="content">
            <div class="baseInfoWarp">
                <ContainerCard title="基本信息" >
                    <div class="baseInfoMain">
                        <p class="baseContent">
                            <span class="baseName"><Icon type="asterisk" style="Icon" size="12"></Icon>分组类别</span>
                            <Select
                                :disabled="currentPath === 'editor_group'"
                                style="width:200px;margin-right:10px"
                                v-model="list.itemClassId"
                                placeholder='请选择店铺类型'
                                @on-change="changeKindId"
                                @on-open-change="handleChangeKindId"
                                >
                                <Option v-for="(item, $index) in classList"
                                    :value="item && item.id"
                                    :key="$index">
                                    {{item.groupName}}
                                </Option>
                            </Select>
                            <span class="resultMessage">{{classMessage}}</span>
                            <span v-if="currentPath !== 'editor_group'">
                                <a class="groupBtn" @click="getClassList({reload:true})">刷新</a>
                                <a class="groupBtn" @click="addCategory" >新建类别</a>
                            </span>
                        </p>
                        <p class="baseContent">
                            <span class="baseName"><Icon type="asterisk" style="Icon" size="12"></Icon>分组名称</span>
                            <Input v-model="list.itemName" type="text" style="width:200px" @input="checkName" ></Input>
                            <span class="resultMessage">{{nameMessage}}</span>
                        </p>
                        <p class="baseContent">
                            <span class="baseName">备注</span>
                            <Input v-model="list.itemps"  type="textarea" style="width:400px" :rows="4"></Input>
                        </p>
                    </div>
                </ContainerCard>
            </div>
            <div class="shopInfoWarp">
                <BaseTitle>选择门店</BaseTitle>
                <!--门店-->
                <!--门店操作栏-->
                <div class="shopSelectWarp">
                    <ButtonAdd class="pull-left mt-10px" @on-tap="showShopsModal">选择门店</ButtonAdd>
                    <span class="pull-left mt-20px">已选择下列门店：共{{shopList.length}}家</span>
                    <Button class="pull-right mt-10px" type="ghost" shape="circle" icon="trash-a" @click="clearAll">清空
                    </Button>
                    <div class="fl-clear"></div>
                    <p class="titleMessage" >{{shopMessage}}</p>
                </div>
                <!--门店数-->
                <BaseBCard class="mt-10px mb-10px">
                    <Row>
                        <Col :md="6" class="block" v-for="(item,index) in shopList" :key="index">
                        <SelectBlock :item="item" @on-tap="select" @on-cancel="delOne($event, index)" :key="index">
                        </SelectBlock>
                        </Col>
                    </Row>
                </BaseBCard>
                <span class="promrt">注：在同一类别下，门店不能同时被归类到多个分组中</span>

            <ButtonHuge center class="mt-10px" @on-tap="submitDist">保存</ButtonHuge>
            </div>
        </div>
        <ShopSelect :brand="pageData.plateEntityId" :list="list" v-if="pageState.showShopSelect"
                    @on-cancel="pageState.showShopSelect = false"
                    @on-ok="saveShops"></ShopSelect>
        <EditorModal 
            :value='value' 
            :modal="classModal" 
            :type="type"
            v-on:ok="handleok" 
            v-on:center="handleCenter" 
            v-on:change="handleChange"
        />
    </div>
</template>
<script>
    import crumbBar from '@/components/layout/crumb-bar'
    import Crumb from "@/components/layout/crumb";
    import ContainerCard from '@/components/layout/container-card'
    import BaseCard from '@/components/layout/base-card'
    import BaseBCard from '@/components/layout/base-borderCard'
    import BaseTitle from '@/components/layout/base-title'
    import SelectBlock from '@/components/layout/select-block'
    import ButtonAdd from '@/components/button/button-add'
    import ShopSelect from '@/components/shop-select/shop-select'
    import shopSelectModule from "@/store/modules/components/shop-select"
    import ButtonHuge from '@/components/button/button-huge'
    import EditorModal from '../category/editorGroup'

    import DateFormat from '@2dfire/utils/date'
    import { mapActions, mapGetters } from 'vuex'
    import groupModule from "@/store/modules/group/index"

    let pageState = {
//        是否展示门店选择模态框
        showShopSelect: false,
    }
    let pageData = {
        plateEntityId: ''
    }

export default {
    components:{
        crumbBar,Crumb,ContainerCard,BaseBCard,BaseTitle,SelectBlock,BaseCard,ButtonAdd,ShopSelect,
        shopSelectModule,ButtonHuge,EditorModal
    },
    created() {
        this.$store.dispatch("leftNav/setNav", 15);
        this.getClassList()
        this.clearShops()
        if(this.$route.query.id){
            let id = this.$route.query.id
            this.getGroupItem({id})
        }else{
            this.clearGroupItem()
        }
    },
    data() {
        return {
            modal:false,
            list:{
                itemClassId: '',
                itemName: '',
                itemps: '',
                itemId:''
            },
            pageState,
            pageData,
            value:'',
            classModal:false,
            type:false,
            nameMessage:'',
            classMessage:'',
            shopMessage:''
        }
    },
    computed:{
        ...mapGetters({
            classList:"group/classList",
            selfList:"group/editGroupItem",
            shopList: 'shopSelect/shopList',
            allShops: "shopSelect/shops",
        }),
        checkGroupInfo(){
            let self = this
            return {
                checkName(name){
                    name = name.replace(/\s+/g,'')
                    if(name === ''){
                        return '必填项，不能为空'
                    }else if(name.length > 8){
                        return '不得超过8个字符'
                    }else if(/\s+/g.test(name)){
                        return '不能输入空格'
                    }else{
                        return ''
                    }
                },
                checkClassName(classId){
                    if(classId === ''){
                        return '必填项，不能为空'
                    }else{
                        return ''
                    }
                },
                checkResult(){
                    // !self.nameMessage || self.$Message.info(self.nameMessage)
                    // !self.classMessage || self.$Message.info(self.classMessage)
                    return (!!self.nameMessage || !!self.classMessage)
                }
            }
        },
        currentPath(){
            return window.location.hash.split("\/")[1].split("?")[0]
        }
    },
    watch:{
        selfList(value){
            this.list = {
                itemClassId:value.itemClassId,
                itemName:value.itemName,
                itemps:value.itemps,
                itemId:value.itemId
            }
            let shops = value.shopList.map(item=>{
                return {
                    checked:true,
                    name:item.shopName,
                    entityId:item.shopEid
                }
            })
            if(shops.length){
                this.joinShop(shops);
            }
        },
        _getCategory(value){
            console.log(value)
        }
    },
    methods: {
        ...mapActions("group",[
             "getClassList",
             "clearGroupItem",
             "getGroupItem",
             "insertOrUpdateGroup",
             "addClass"
        ]),
        ...mapActions({
//                门店选择
            cancelShop: 'shopSelect/cancelShop',
            clearShops: "shopSelect/clearShops",
            joinShop: 'shopSelect/joinShop',
            selectShop: 'shopSelect/selectShop',
        }),
        SelectShop(){
            this.modal = true
        },
        ok(){
            this.modal = false
        },
        cancel(){
            this.modal = false
        },
        handleok(value){
            
            this.addClass({value})
            this.classModal = false
            this.value = ''
        },
        handleCenter(){
            this.classModal = false
            this.value = ''
        },
        handleChange(value){
            this.value = value
        },
        addCategory(){
            if(this.classList.length < 3){
                this.classModal = true
            }else{
                this.$Message.info('类别数量不得超过3个！')
            }
        },
        //选中一个门店，使其变得可以删除
        select(item) {
            this.selectShop(item)
        },
        //删除一个选中的门店
        delOne(item, index) {
            console.log(item,index)
            this.cancelShop({item, index})
        },
        clearAll(){
            this.clearShops()
        },
        changeKindId(e){
            this.classMessage = this.checkGroupInfo.checkClassName(e)
            this.shopMessage = ''
        },
        handleChangeKindId(e){
            if(!e){
                this.clearShops()
            }
        },
        showShopsModal() {
            if(this.list.itemClassId === ''){
                return this.shopMessage = '请先选择类别'
            }
            let self = this;
            self.pageState.showShopSelect = true;
        },
        checkName(e){
            this.nameMessage = this.checkGroupInfo.checkName(e)
        },
        checkEmpty(){
            const { itemName, itemClassId } = this.list
            this.nameMessage = this.checkGroupInfo.checkName(itemName)
            this.classMessage = this.checkGroupInfo.checkClassName(itemClassId)
            return this.checkGroupInfo.checkResult()
        },
        submitDist() {
            if(this.checkEmpty()) return
            
            let groupItem = {
                categoryId:this.list.itemClassId,
                name:this.list.itemName,
                remark:this.list.itemps,
                groupId:this.list.itemId,
                parentId:'',
                shopEntityIds:[].concat(this.shopList.map(item=>item.entityId))
            }
            this.insertOrUpdateGroup(groupItem)
        },
//      保存门店选择组件内选择的门店
        saveShops() {
            let self = this;
            console.log(this.allShops)
            self.joinShop(self.allShops);
//                关闭模态框
            self.pageState.showShopSelect = false
        },
    },
    beforeCreate() {
        let { group={}, shopSelect={} } = this.$store.state

        if(Object.keys(group).length <= 0) {
            this.$store.registerModule('group', groupModule)
        }
        if(Object.keys(shopSelect).length <= 0) {
            this.$store.registerModule('shopSelect', shopSelectModule)
        }
    },
    
    
}
</script>

<style lang="scss" scoped>
.editorGroup{
   .content{
        padding: 30px;
        .baseInfoWarp{
            margin-bottom: 20px;
            .baseInfoMain{
                margin-top: 20px;
                .baseContent{
                    margin-bottom: 21px;
                    position: relative;
                    .resultMessage{
                        position: absolute;
                        bottom: -20px;
                        left: 225px;
                        color: #ed3f14;
                    }
                }
                :global{
                        .ivu-icon{
                            transform: scale(0.6);
                            color: #D83F3F;
                            margin-right: 10px;
                        }
                }
                .baseName{
                    display: inline-block;
                    width: 200px;
                    text-align: right;
                    margin-right: 20px;
                } 
                /deep/ .ivu-input-wrapper{
                    textarea{
                        resize: none !important;
                    }
                }
                .groupBtn{
                    cursor: pointer;
                    padding-right: 10px;
                    font-size: 12px;
                    color: #5599FF;
                    line-height: 12px;
                    border-right: 1px solid #3F3F3F;
                    &:last-child{
                        border-right: none;
                        padding-left: 8px;
                    }
                }
            }
       }
       .shopInfoWarp{
           padding: 15px;
           background: #ffffff;
            .block {
                margin-bottom: 5px;
                padding: 0 5px;
            }
            .shopSelectWarp{
                padding-bottom: 10px;
                position: relative;
                .titleMessage{
                    position: absolute;
                    bottom: -9px;
                    left: 5px;
                    color: #ed3f14;
                }
            }
            .promrt{
                color: #999999;
            }
           .selectShop{
               width: 100px;
               line-height: 30px;
               margin-right: 10px;
               border-radius: 20px;
               border: 1px solid #D83F3F;
               color: #D83F3F;
               background-color: transparent;
               outline: none;
               cursor: pointer;
           }
           .shopEmpty{
               width: 100px;
               line-height: 30px;
               border: 1px solid #cccccc;
               border-radius: 20px;
               float:right;
               background-color: transparent;
               outline: none;
               cursor: pointer;
           }
           :global{
               .ivu-icon{
                   margin-right: 5px;
                   vertical-align: middle;
               }
           }
           .shopHeader{
               margin-bottom: 20px;
           }
           .shopListWarp{
               display: flex;
               max-height: 400px;
               overflow: auto;
               padding: 15px 0 5px 15px;
               flex-wrap: wrap;
               border: 1px solid #cccccc;
               text-align: center;
               &::-webkit-scrollbar{
                   width: 5px;
               }
               &::-webkit-scrollbar-thumb{
                   border-radius: 5px;
                   background: #cccccc;
               }
               &::-webkit-scrollbar-track{
                   border-radius: 0;
                   background: #ffffff;
               }
               .shopList{
                   width: 19%;
                   line-height: 40px;
                   padding: 0 5px;
                   background: #cccccc;
                   overflow: hidden;
                   text-overflow: ellipsis;
                   white-space: nowrap;
                   margin-right: 10px;
                   margin-bottom: 10px;
               }
           }
       }
   }
}

</style>




