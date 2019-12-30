<template>
    <div>
        <div v-for="(item,index) in list" :class="{'table-content':true}">
            <div  >{{item.groupName}}</div>
            <div v-if="ifType"  >{{item.shopNum}}</div>
            <div v-if="ifType"  >{{omit(item.ps)}}</div>
            <div  >
                <button class="table-button" @click="editGroup(item)" >编辑</button>
                <button class="table-button" @click="delOne(item)" >删除</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:["list","type"],
    data() {
        return {
            
        }
    },
    created() {
    },
    methods: {
        editGroup(item){
            this.$emit('editGroup',item)
        },
        delOne(item){
            this.$emit('delOne',item)
        },
        omit(item=''){
            if( item && item.length>10){
                item = item.substring(0,10) + '...'
            }else if(!item){
                item = '-'
            }
            return item
        }
    },
    computed: {
        ifType(){
            return this.type === "group"
        }
    },
}
</script>
<style lang="scss" scoped>
.table-content{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #F1F1F1;
        line-height: 40px;
        padding-left: 15px;
        .table-item{
            width: 25%;
        }
        .table-edit{
            width: 15%;
        }
        .table-button{
            border: 0;
            outline: 0;
            cursor: pointer;
            font-size: 12px;
            color: #5599FF;
            line-height: 12px;
            border-right: 1px solid #A9A9A9;
            background: #ffffff;
            &:last-child{
                border-right: none;
                padding-left: 8px;
            }
        }
    }
</style>

