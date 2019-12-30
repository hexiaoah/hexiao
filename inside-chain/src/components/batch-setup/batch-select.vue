<template>
    <div class="bathSelectWarp">
        <span class="selectName">{{title}}</span>
        <Select :value="value" clearable style="width:160px" @on-change="handleChange" >
            <Option v-for="item in list" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
    </div>
</template>
<script>
export default {
    props:{
        list:{
            type: Array,
            default:{}
        },
        type:{
            type: String,
            default:'-1'
        },
        value:{
            type: String,
            default:'-1'
        },
        title:{
            type: String,
            default:''
        }
    },
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
        handleChange(id){
            this.$emit('change',{type:this.type,id})
        }
    },
}
</script>
<style lang="scss" scoped>
.bathSelectWarp{
    width: 49%;
    text-align: right;
    margin-bottom: 10px;
    white-space: nowrap;
    .selectName{
        margin-right: 10px;
    }
    /deep/ .ivu-select{
        text-align: left;
    }
}
</style>


