<template>
    <div class="category">
        <div class="tentant">
            <div class="btnWarp">
                <button @click="showModal" class="add-btn">新建类别</button>
            </div>

            <div class="tableWarp">
                <!-- <GroupManageList :list="tableList" :titleList='titleList' :type="type" v-on:delOne="delOne" v-on:editGroup="editGroup"></GroupManageList> -->
                <Table v-if="!!tableList && !!tableList.length" :columns="titleList" :data="tableList"></Table>
                <div v-else class="noData">
                    <Table :no-data-text='noData' :columns="titleList" ></Table>
                    <div class="no-data">
                        <img src="https://assets.2dfire.com/frontend/3be21e322d74bc5d4977a43380e79daf.png" alt="" class="no-menu">
                        <span>{{noData}}</span>
                    </div>
                </div>
            </div>
        </div>
           <EditorModal 
           :value='params.value' 
           :modal="modal" 
           :type="type"
           v-on:ok="ok" 
           v-on:center="center" 
           v-on:change="change"
        />           
    </div>
</template>
<script>
    import crumbBar from '@/components/layout/crumb-bar'
    import Crumb from "@/components/layout/crumb";
    import EditorModal from './editorGroup'
    import GroupManageList from '@/components/table/group-manage-list'
    import {mapGetters,mapActions} from 'vuex'
    import groupModule from "@/store/modules/group/index"
export default {
    components:{
        crumbBar,Crumb,EditorModal,GroupManageList
    },
    created() {
        this.$store.dispatch("leftNav/setNav", 15);
        this.getClassList()
        window.addEventListener("message", function(event){
            // 接收页面 A 发送过来的 jwt 令牌
            console.log('event',event)
        });
    },
    data() {
        return {
            modal:false,
            noData:'暂无类别！',
            titleList:[
                
                { title: '类别名称',key: 'groupName'},
                {
                        title: '操作',
                        render: (h,data)=>{
                            return h('div',[
                                h('a',{
                                    on:{
                                        click:()=>{
                                            this.editGroup(data.row)
                                        }
                                    },
                                    class:'edit-button'
                                },'编辑'),
                                h('a',{
                                    on:{
                                        click:()=>{
                                            this.delItem(data.row.id)
                                        }
                                    },
                                    class:'edit-button'
                                },'删除')
                            ])
                        },
                    }
            ],
            type:false,
            params:{
                value:'',
                id:''
            }
        }
    },
    computed: {
        ...mapGetters({tableList:'group/classList'})
    },
    methods: {
        ...mapActions("group",[
            "getClassList",
            "addClass",
            "delClassList"
        ]),
        showModal(){
            if(this.tableList.length < 3 ){
                this.type=false
                this.modal = true;
            }else{
                this.$Message.info('类别数量不得超过3个！')
            }
            
        },
        ok(){
            this.addClass({...this.params})
            this.classClear()
        },
        center(){
            this.classClear()
        },
        delItem(id){
            this.$Modal.confirm({
                title: '删除类别',
                render:h=>{
                    return h('div',{
                        style:{'padding-left':'48px','padding-top':'18px',color:'#495060'}
                    },[
                       h('div',{style:{position:'absolute',left:'0',top:'0',color:'#f90',fontSize:'36px'}},[
                            h('Icon',{attrs:{type:'android-alert'}})
                        ]),
                        h('div','是否删除该类别？')
                    ])
                },
                onOk: (e) => {
                   this.delClassList({id,isDel:1})
                },
                onCancel: () => {
                    this.classClear()
                }
            });
        },
        editGroup(item){
            this.modal = true
            this.type = true
            this.params = {
                id:item.id,
                value:item.groupName
            }
        },
        change(value){
            this.params.value = value
        },
        classClear(){
            this.params = {
                id:'',
                value:''
            }
            this.modal=false
        }

    },
    beforeCreate() {
        let { group={} } = this.$store.state

        if(Object.keys(group).length <= 0) {
            this.$store.registerModule('group', groupModule)
        }
    },
    
    
}
</script>
<style lang="scss" scoped>
.category{
    .tentant{
        padding: 20px;
        margin-bottom: 20px;
        background: #FFFFFF;
        .btnWarp{
            overflow:hidden;
            margin-bottom: 20px;
        }
        .add-btn{
            width: 88px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            background: #D83F3F;
            border: 1px solid #D83F3F;
            border-radius: 4px;
            font-size: 12px;
            color: #FFFFFF;
            letter-spacing: 0;
            float: right;
            margin-right: 10px;
            outline: none;
            cursor: pointer;
        }
        /deep/ .ivu-table{
            .ivu-table-header 
                .ivu-table-cell{
                    color: #333333;
                    font-weight: normal;
                }
            .edit-button{
                cursor: pointer;
                padding-right: 10px;
                font-size: 12px;
                color: #5599FF;
                line-height: 12px;
                border-right: 1px solid #A9A9A9;
                &:last-child{
                    border-right: none;
                    padding-left: 8px;
                }
            }
        }
        .noData{
            /deep/ .ivu-table-tip{
                display: none;
            }
            .no-data {
                text-align: center;
                padding: 15px 10px;
                font-size: 12px;
                color: #999999;

                .no-menu {
                    display: block;
                    width: 138px;
                    height: 83px;
                    margin: 27px auto;
                }
            }
        }
    }
}


</style>