<template>
    <div>
         <div v-if="list.actionVOList && list.actionVOList.length > 0">
            <div @mouseenter="show = true" @mouseleave="show = false" class="thirdList">
                <Checkbox  
                    @on-change="selectGroup(list,item)" 
                    :disabled="!list.actionVOList.some(h=> h.hasEditPower)" 
                    :indeterminate="!!list.actionVOList.filter(i=>i.selected).length && list.actionVOList.filter(i=>i.selected).length !== list.actionVOList.length "
                    :value="isChecked(list) && list.actionVOList.some(h=> h.hasEditPower)">
                    {{list.name}}({{selected(list)}})
                </Checkbox>
                <Icon type="chevron-down" color="#ccc"></Icon>
                <transition name="fade">
                    <div v-show="show" class="thirdListCard">
                        <div v-for="thirdItem in list.actionVOList">
                            <Checkbox @on-change="selectItem(thirdItem,item)" :value="thirdItem.selected" :disabled="!thirdItem.hasEditPower" >{{thirdItem.name}}</Checkbox>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <div v-else class="thirdList" >
            <Checkbox :value="list.selected" :disabled="!list.hasEditPower"  @on-change="selectItem(list,item)" >{{list.name}}</Checkbox>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        list:{
            type:Object,
            default:()=>({})
        },
        selectItem:{
            type:Function,
        },
        isChecked:{
            type:Function,
        },
        selectGroup:{
            type:Function
        },
        item:{
            type:Object,
            default:()=>({})
        }
    },
    computed: {
      selected(){
          return list =>{
            let length = list.actionVOList.length
            let checkedLength = list.actionVOList.filter(i=>i.selected).length
            return checkedLength + '/' + length
          }
      }  
    },
    data () {
        return {
            show:false
        }
    }
    
}
</script>
<style lang="scss" scoped>
    .thirdList{
        padding: 0 10px;
        position: relative;
        /deep/ .ivu-icon{
            position: absolute;
            top: 50%;right: 10px;
            transform: translateY(-50%)
        }
        .fade-enter-active, .fade-leave-active {
            transition: opacity .3s;
        }
        .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
            opacity: 1;
        }
        
        .thirdListCard{
            position: absolute;
            left: 0;top: 38px;
            width: 100%;
            padding: 0 10px;
            background: #ffffff;
            box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
            z-index: 99;
            &::before{
                content: "";
                display:inline-block;
                border: 6px solid transparent;
                border-bottom: 6px solid #ffffff;
                position:absolute;
                top: -12px;right: 10px;
            }
        }
    }

</style>


