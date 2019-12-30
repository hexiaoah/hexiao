<template>
    <div class="list-wrapper">
        <div class="list-header">
            <Checkbox
                class="title-wrapper"
                :value="checkAll"
                @click.prevent.native="chooseAll">
            </Checkbox>
            <title-list :title-list="titleList"></title-list>
        </div>

        <!-- <CheckboxGroup v-model="checkAllGroup"
                       class="list-body"
                       @on-change="checkAllGroupChange"> -->
        <div class="list-body">

            <div v-for="item in tableData"
                 class="list-item"
                 :key="item.suitId"
                 :item-data="item">
                <Checkbox  v-model="checkedGroup[item.suitId]" @on-change="checkOne(item,$event)"></Checkbox>
                <base-info class="pull-left" :item-data="item" :style="{width: titleList[0].width}"></base-info>
                <div class="belongs-category oneline pull-left" :style="{width: titleList[1].width}">{{item.kindMenuName}}</div>

                <belongs-menu :item="item"
                              v-if="isChain"
                              class="belongs-menu"
                              :style="{width: titleList[2].width}">
                </belongs-menu>

                <belongs-shop :item="item"
                              v-if="isChain"
                              class="belongs-shop"
                              :style="{width: titleList[3].width}">
                </belongs-shop>

                <div class="pull-left isshelves" :style="{width: titleList[2].width}" v-if="!isChain">{{item.status === 1 ? '已上架' : '未上架'}}</div>
                <div class="operation" :style="{width: isChain ? titleList[4].width : titleList[3].width}">
                    <button class="table-button" @click="editItem(item)">编辑</button>
                    <button class="table-button" @click="deleteItem(item)">删除</button>
                </div>
            </div>
        </div>
        <!-- </CheckboxGroup> -->

        <Modal
            class="delete-modal"
            v-model="deleteModel"
            title="删除套餐"
            okText="确定"
            @on-ok="ok"
            @on-cancel="cancel">
            <p class="content">删除套餐后, 将无法恢复，请慎重操作！</p>
        </Modal>
    </div>
</template>

<script>
    import TitleList from './components/title-list.vue'
    import BaseInfo from './components/base-info.vue'
    import BelongsMenu from './components/belongs-menu.vue'
    import BelongsShop from './components/belongs-shop.vue'
    import {mapState} from 'vuex'
    export default {
        name: 'suit-manage-list',
        props: {
            titleList: {
                type: Array,
                default: null
            },
            tableData: {
                type: Array,
                default: null
            },
            isChain: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            ...mapState({
                tableDataList(state){
                    let data = state.setting
                    return (this.opEntityId ? data.single.suitList.list : data.chain.suitList.list) || []
                }
            })
        },
        watch: {
            tableDataList(newval, oldval){
                if(newval !== oldval){
                    this.checkAll = false
                    this.checkAllGroup = []
                }
            }
        },
        data() {
            return {
                deleteModel: false,
                deleteGoodsItem: {},
                checkAll: false,
                checkAllGroup: [],
                checkedGroup:[]
            }
        },
        methods: {
            chooseAll(){
                if (!this.checkAll) {
                    let arr = this.tableData.map(item => {
                        return {suitId: item.suitId, itemName: item.suitName}
                    })
                    this.checkAllGroup = arr.map(item => {
                        this.checkedGroup[item.suitId] = !this.checkAll
                        return item.suitId
                    })
                    this.$emit('current-choosed', arr)
                }
                else {
                    this.checkAllGroup = []
                    Object.keys(this.checkedGroup).map(key=>{
                        this.checkedGroup[key] = false
                    })
                    this.$emit('current-choosed', [])
                }
                this.checkAll = !this.checkAll
            },
            checkAllGroupChange(itemList){
                let arr = []
                this.checkAll = itemList.length === this.tableData.length
                for(let i=0; i<itemList.length; i++){
                    for(let j=0; j<this.tableData.length; j++){
                        if(itemList[i] === this.tableData[j].suitId){
                            arr.push({suitId: this.tableData[j].suitId, itemName: this.tableData[j].suitName})
                        }
                    }
                }

                this.$emit('current-choosed', arr)
            },
            checkOne(item,e){
                let { suitId } = item
                let arr = []
                this.checkedGroup[suitId] = e
                if(e && !this.checkAllGroup.includes(suitId)){
                    this.checkAllGroup.push(suitId)
                }else{
                    if(this.checkAllGroup.includes(suitId)){
                        this.checkAllGroup.splice(this.checkAllGroup.indexOf(suitId),1)
                    }
                }
                this.checkAll = this.checkAllGroup.length === this.tableData.length
                for (let i = 0; i < this.checkAllGroup.length; i++) {
                    for (let j = 0; j < this.tableData.length; j++) {
                        if (this.checkAllGroup[i] === this.tableData[j].suitId) {
                            arr.push({
                                suitId: this.tableData[j].suitId,
                                itemName: this.tableData[j].suitName
                            })
                        }
                    }
                }
                this.$emit('current-choosed', arr)
            },
            editItem(item){
                this.$emit('edit-item', item)
            },
            deleteItem(item){
                this.deleteModel = true
                this.deleteGoodsItem = item
            },
            ok(){
                this.deleteModel = false
                this.$emit('delete-item', this.deleteGoodsItem)
            },
            cancel(){
                this.deleteModel = false
            }
        },
        components: {
            TitleList,
            BaseInfo,
            BelongsMenu,
            BelongsShop
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

    .list-header {
        height: 40px;
        position: relative;
        margin-top: 15px;

        /deep/ label {
            position: absolute !important;
        }

        .title-wrapper {
            width: 100%;
            position: relative;

            /deep/ .ivu-checkbox {
                position: absolute;
                top: 13px;
                left: 10px;
            }
        }
    }

    .list-body {
        border: 1px solid #E5E5E5;
        border-bottom: 0;

        .list-item {
            position: relative;
            display: inline-block;
            width: 100%;
            padding-left: 31px;
            border-bottom: 1px solid #E5E5E5;

            .belongs-category {
                padding-right: 50px;
                margin-top: 25px;
                font-size: 12px;
                color: #333333;
                letter-spacing: 0;
            }

            .belongs-menu, .belongs-shop {
                color: #5599FF;
                letter-spacing: 0;
                line-height: 12px;
                margin-top: 25px;
                cursor: pointer;
                position: relative;
                font-size: 12px;
            }

            .isshelves{
                margin-top: 25px;
                font-size: 12px;
                color: #5599FF;
                letter-spacing: 0;
                line-height: 12px;
            }

            .operation {
                margin-top: 25px;
                font-size: 0;
                display: inline-block;

                &>.disabled{
                    color: #A9A9A9;
                    pointer-events: none;
                    cursor: not-allowed;
                }

                a {
                    font-size: 12px;
                    color: #5599FF;
                    line-height: 12px;
                }

                a.edit {
                    padding-right: 10px;
                    border-right: 1px solid #A9A9A9;
                }

                a.delete {
                    padding-left: 10px;
                }
            }
        }

        /deep/ label {
            width: 100%;
            float: left;

            span + span {
                display: none;
            }

            & > .ivu-checkbox {
                position: absolute;
                top: 42px;
                left: 10px;
            }
        }
    }

    .delete-modal {
        /deep/ .ivu-modal {
            width: 390px !important;
            height: 170px;
            border: 1px solid #F1F1F1;
            border-radius: 5px;
            background: white;
        }

        /deep/ .ivu-modal-footer {
            border: none;

            button {
                width: 88px;
                height: 32px;
            }

            button:first-child {
                border: 1px solid #CCCCCC;
                border-radius: 4px;
            }
        }

        .content {

            &:before {
                content: '';
                margin-right: 5px;
                display: inline-block;
                vertical-align: middle;
                width: 36px;
                height: 36px;
                background-image: url(https://assets.2dfire.com/frontend/476f6af6460834ccf909ece304f6a89f.png);
                background-size: contain;
            }
        }
    }
</style>

