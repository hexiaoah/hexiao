<template>
    <div class="bathSelectWarp">
        <!-- <span class="selectName">{{list.title}}</span> -->
        <div class="selectWarp" >
            <div @click.stop="handleShow" @mouseenter="handleEnter" @mouseleave="handleLeave">
                <Input :value="value" style="width:160px,z-index:10" placeholder="请选择" />
                <span class="shade">
                    <Icon :type="icon" />
                </span>
            </div>
            <div  ref="treeWarp" class="treeWarp">
                    <Tree :data="createitem(this.categoryList)" ></Tree>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import Tools from '@/base/tools'
export default {
    props:{
        list:{
            type:Array
        },
    },
    data() {
        return {
            id:'',
            flag:false,
            value:'',
            icon:'arrow-down-b'
        }
    },
    created() {
        console.log(this.list)
    },
    methods: {
        handleShow(){
            event.stopImmediatePropagation()
            if(event.target.className.split(' ').includes('ivu-icon-ios-close')){
                this.value = ''
                this.icon = 'arrow-down-b'
                return
            }
            this.flag = !this.flag;
            if(this.flag){
                this.$refs.treeWarp.style.height = '200px'
                document.addEventListener('click',this.hide, true);
            }else{
                this.hide()
            }

        },
        hide(){
            event.stopPropagation()
            if(event.target.className === 'option'){
                this.value = event.target.innerText
                this.id = event.target.attributes.itemId.value
            }
                console.dir(event.target)
            document.removeEventListener('click',this.hide,true);
            this.$refs.treeWarp.style.height = 0
            this.flag = false

        },
        handleEnter(){
            if(this.value){
                this.icon = 'ios-close'
            }
        },
        handleLeave(){
            this.icon = 'arrow-down-b'
        },

        createitem(list){
            let arr = []
            list.map(item=>{
                if(item.subList && item.subList.length > 0 ){
                    let data = this.createitem(item.subList)
                    let obj = {title: item.name,'children-key':item.id,children:data,expand:true,disabled:true,render:(h,{root,node,data})=>{
                        return h('span',{
                                style:{color:'#ccc',display:'inline-block',width:'100%',cursor:'not-allowed'}
                            },[
                                h('span',data.title)
                            ])
                    }}
                    arr.push(obj)
                }else{
                    let obj = {title: item.name,'children-key':item.id,expand:true,render:(h,{root,node,data})=>{
                        return h('span',{attrs:{itemId:data['children-key'],class:'option'},style:{display:'inline-block',width:'100%'}},data.title)
                    }}
                    arr.push(obj)
                }
            })
            return arr
        },
        dispose(value){
            this.kindList.filter(item=>{
                if(item.id === value){
                    this.value = item.name
                }
            })
        }
    },
    computed: {
        ...mapState({
            categoryList(state){
                return state.setting.categoryList || []
            },
        }),
        kindList(){
            return [{name: '全部分类', id: '0'}].concat(Tools.recursion(this.categoryList))
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
    /deep/ .ivu-select-dropdown{
        display: none;
    }
    .selectWarp{
        display: inline-block;
        text-align: left;
        position: relative;
        cursor: pointer;
        /deep/ .ivu-input{
            cursor: pointer;
        }
        .shade{
            position: absolute;
            display: inline-block;
            width: 100%;
            height: 100%;
            right: 0;
            top: 0;
            text-align: right;
            /deep/ .ivu-icon{
                margin: 10px 10px 0 0;
                color: #80848f;
                font-size: 14px;
            }
        }
        .treeWarp{
            position: absolute;
            width: 160px;
            height: 0;
            overflow: auto;
            margin: 5px 0;
            padding: 0px 16px;
            background-color: #fff;
            box-sizing: border-box;
            border-radius: 4px;
            box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
            z-index: 900;
            transition: .3s;
            // &::-webkit-scrollbar{
            //     width: 5px;
            // }
            // &::-webkit-scrollbar-thumb{
            //     border-radius: 5px;
            //     background: #cccccc;
            // }
            // &::-webkit-scrollbar-track{
            //     border-radius: 0;
            //     background: #ffffff;
            // }
            /deep/ .ivu-tree-arrow{
                display: none;
            }
        }
    }
}
</style>


