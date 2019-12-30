<template>
    <div class="staffEdit" >
        <crumbBar>
            <Crumb :name="name"></Crumb>
        </crumbBar>
        <div class="editWarp">
            <div class="editName">
                <containerCard title="职级名称">
                <div class="NameWarp">
                        <span class="jobName">职级名称：</span>
                        <Input v-model.trim="inputValue"
                            @input="inputChange"
                            class="inputName">
                        </Input>
                        <p class="prompt"><span>{{this.Message}}</span></p>
                </div>
                </containerCard>
            </div>
            <div class="editSetting">
                <containerCard title="权限设置">
                    <div class="navWarp">
                        <ul class="navCard">
                            <li 
                            :class="{navItem:true,activeItem:activeId === item.code }" 
                            v-for="item in dataList"
                            @click="changePage(item)"
                            >
                                <span>{{item.name}}</span>
                                <span v-if="itemId">( {{item.rote}} )</span>
                            </li>
                        </ul>
                    </div>
                    <div class="content">
                            <div v-if="activeId === item.code " v-for="item in dataList">
                                <div v-if="item.actionVOList && item.actionVOList.length" class="checkAll">
                                    <Checkbox @on-change="selectAll(item)" :value="item.selected" >全选</Checkbox>
                                </div>
                                <div class="contentList" v-for="i in item.actionVOList">
                                    <div class="contentTitle">
                                        <Checkbox 
                                        :disabled="!i.actionVOList.some(h=> h.hasEditPower)" 
                                        :value="isChecked(i) && i.actionVOList.some(h=> h.hasEditPower)" 
                                        @on-change="selectGroup(i,item)">{{i.name}}</Checkbox>
                                    </div>
                                    <div class="contentWarp" >
                                        <div class="contentItem" v-for="itemBox in i.actionVOList">
                                            <CheckBoxItem
                                            :item="item" 
                                            :list="itemBox"
                                            :isChecked="isChecked" 
                                            :selectItem="selectItem" 
                                            :selectGroup="selectGroup"  />
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </containerCard>
                <div class="footer">
                    <Button type="primary"
                        :disabled="!dataList.length"
                        class="save-btn"
                        @click="save">
                        保存
                    </Button>
                </div>
            </div>
        </div>
            
    </div>
</template>
<script>

import crumbBar from '@/components/layout/crumb-bar'
import Crumb from "@/components/layout/crumb";
import containerCard from '@/components/layout/container-card'
import staffManage from '@/store/modules/components/staffManage'
import { mapGetters,mapActions } from 'vuex'
import CheckBoxItem from './CheckBoxItem'

export default {
    components: {
        crumbBar,Crumb,containerCard,CheckBoxItem
    },
    computed: {
        ...mapGetters({
            dataList:'staff/getDataList',
            activeId:'staff/getActiveId'
        }),
        name(){
            return this.$route.query.name
        },
        itemId(){
            return this.$route.query.id || ''
        },
        isChecked(){
            return item =>{
                let arr = item.actionVOList.filter(i=>{
                    return !i.selected && i.hasEditPower
                })
                if(!arr.length){
                    item.selected = true
                    return true
                }else{
                    item.selected = false
                    return false
                }
            }
        },
        checkInputVal(){
            if(this.inputValue === ''){
                this.Message = '必填项，不能为空'
                return true
            }else if(this.inputValue.length > 15 ){
                this.Message = '不能超过15个字符'
                return true
            }else{
                this.Message = ''
                return false
            }
        }
    },
    data () {
        return {
            inputValue:'',
            Message:'',
        }
    },
    methods: {
        ...mapActions({
            saveRole:'staff/saveRole',
            selectedAll:'staff/selectedAll',
            changeActive:'staff/changeActive',
            clearDataLise:'staff/clearDataLise',
            checkedAllSelected:'staff/checkedAllSelected',
            getAllActionGroupList:'staff/getAllActionGroupList',
            listRestUnifiedAllActionGroup:'staff/listRestUnifiedAllActionGroup',
        }),
        changePage(item){
            if(this.activeId === item.code) return
            this.changeActive(item.code)
        },
        selectAll(item){
            const checked = event.target.checked
            this.selectedAll({item,checked})
        },
        selectGroup(item,parentItem){
            const checked = event.target.checked
            item.selected = checked
            this.loopSelect(item,checked,parentItem)
        },
        selectItem(item,parentItem){
            item.selected = event.target.checked
            this.checkedAllSelected({item:parentItem,type:event.target.checked})
        },
        loopSelect(item,type,parentItem){
            item.actionVOList.map(i=>{
                if(i.actionVOList && i.actionVOList.length > 0){
                    this.loopSelect(i,type,parentItem)
                }else{
                    if(i.hasEditPower){
                        i.selected = type
                    }
                }
            })
            this.checkedAllSelected({item:parentItem,type})
        },
        recursion(data) {
            const flat = arr => [].concat(...arr)
            const item = arr => {
                return flat(arr.map(i => {
                        if (i.actionVOList && i.actionVOList.length > 0) {
                            return item(i.actionVOList)
                        }
                        else {
                            return {name: i.name, id: i.id,selected:i.selected}
                        }
                    }
                ))
            }
            return item(data)
        },
        inputChange(){
            this.checkInputVal
        },
        save(){
            if(this.checkInputVal) return 
            let arr = []
            let params = {}
            this.dataList.map(i=>{
                arr.push({
                    code:i.code,
                    selectedActionIdList: this.recursion(i.actionVOList).filter(i=>i.selected).map(i=>i.id)
                })
            })
            params = {
                roleStr:this.inputValue.replace(/\s+/g,''),
                roleId: this.itemId,
                unified:'0',
                router:'/chain_role_action',
                selectedRole:[].concat(arr)
            }
            this.saveRole(params)
            // this.$emit('save',params)
        },
    },
    beforeCreate () {
        let { staff={} } = this.$store.state

        if(Object.keys(staff).length <= 0) {
            this.$store.registerModule('staff', staffManage)
        }
    },
    mounted () {
        console.log(this.$store)
        this.clearDataLise()
        this.inputValue = this.$route.query.name || ''
        this.getAllActionGroupList(this.itemId)
        // this.listRestUnifiedAllActionGroup(this.itemId)

    }
}
</script>
<style lang="scss" scoped>
    .staffEdit{
        .editWarp{
            padding: 30px;
            .editName{
                margin-bottom: 30px;
                .NameWarp{
                    padding: 20px 0;
                    position: relative;
                    .jobName{
                        display: inline-block;
                        width: 115px;
                        text-align: right;
                    }
                    .inputName{
                        width: 180px;
                        height: 32px;
                    }
                    .prompt{
                        position: absolute;
                        margin-left: 120px;
                        color: #d83f3f;
                    }
                }
            }
            .editSetting{
                padding-bottom: 55px;
                .navWarp{
                    margin-bottom: 20px;
                    .navCard{
                        .navItem{
                            display: inline-block;
                            min-width: 120px;
                            line-height: 32px;
                            padding: 0 5px;
                            text-align: center;
                            border: 1px solid #EFEFEF;
                            border-right: none;
                            background-color: #f8f8f8;
                            cursor: pointer;
                            &:last-child{
                                border-right: 1px solid #EFEFEF;
                            }
                        }
                        .activeItem{
                            color: #d83f3f;
                            background-color: #ffffff;
                            border-bottom-color: transparent;
                        }
                    }
                }
                .content{
                    border: 1px solid #f1f1f1;
                    .checkAll{
                        line-height: 50px;
                        padding-left: 10px;
                        background: #f1f1f1;
                    }
                    .contentList{
                        padding-left: 10px;
                        .contentTitle{
                            padding: 10px 0;
                        }
                        .contentWarp{
                            padding-left: 18px;
                            .contentItem{
                                display: inline-block;
                                min-width: 200px;
                                height: 38px;
                                line-height: 38px;
                                margin:0  10px 10px 0;
                                background-color: #f1f1f1;
                            }
                        }
                    }
                }
                .footer{
                    height: 55px;
                    width: calc(100% - 200px);
                    position: fixed;
                    bottom: 0;
                    right: 0;
                    background-color: rgba(255, 255, 255, 0.9);
                    border-top: 0.5px solid #cccccc;
                    padding-top: 10px;
                    z-index: 10;
                    .save-btn {
                        position: absolute;
                        width: 180px;
                        height: 36px;
                        left: 50%;
                        margin-left: -90px;
                    }
                }
            }
        }
    }
</style>


