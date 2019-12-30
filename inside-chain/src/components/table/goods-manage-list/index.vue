<template>
    <div class="list-wrapper">
        <div class="list-header">
            <Checkbox
                class="title-wrapper"
                :value="checkAll"
                @click.prevent.native="chooseAll">
            </Checkbox>
            <title-list :title-list="titleList"></title-list>
            <span class="list-count">(已选{{checkAllGroup.length?checkAllGroup.length:'0'}}件商品)</span>
        </div>
        <div class="list-body">
        <!-- <CheckboxGroup v-model="checkAllGroup"
                       class="list-body"
                       @on-change="checkAllGroupChange"> -->
            <div v-for="item in tableData"
                 class="list-item"
                 :key="item.itemId"
                 :item-data="item">
                <Checkbox v-model="checkedGroup[item.itemId]" @on-change="checkOne(item,$event)"></Checkbox>
                <base-info class="pull-left" :item-data="item" :style="{width: titleList[0].width}"></base-info>
                <div class="belongs-category oneline pull-left" :style="{width: titleList[1].width}">{{item.kindName}}</div>

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

                <div class="pull-left isshelves"
                     :style="{width: titleList[2].width}"
                     v-if="!isChain">
                    {{item.state === 1 ? '已上架' : '未上架'}}
                </div>
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
            title="删除商品"
            okText="确定"
            @on-ok="ok"
            @on-cancel="cancel">
            <p class="content">删除商品后, 将无法恢复，请慎重操作！</p>
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
        name: 'goods-manage',
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
            },
            isEmpty:{
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                deleteModel: false,
                deleteGoodsItem: {},
                checkAll: false,
                checkAllGroup: [],
                checkedGroup:{}
            }
        },
        computed: {
            ...mapState({
                tableDataList(state){
                    let data = state.setting
                    return this.opEntityId ? data.single.goodsList.itemList : data.chain.goodsList.itemList
                }
            })
        },
        watch: { 
            tableData(newval, oldval){
                if (newval !== oldval) {
                    this.checkAll = false
                    this.checkAllGroup = []
                    this.checkedGroup = {}
                }
            },
            isEmpty(value){
                if(value){
                    this.checkAll = false
                    this.checkAllGroup = []
                }
            }  
        },
        methods: {
            chooseAll(e){
                if (!this.checkAll) {
                    let arr = this.tableData.map(item => {
                        return {itemId: item.itemId, itemName: item.itemName}
                    })
                    this.checkAllGroup = arr.map(item => {
                        this.checkedGroup[item.itemId] = !this.checkAll
                        return item.itemId
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
            checkOne(item,e){
                let { itemId } = item
                let arr = []
                this.checkedGroup[itemId] = e
                if(e && !this.checkAllGroup.includes(itemId)){
                    this.checkAllGroup.push(itemId)
                }else{
                    if(this.checkAllGroup.includes(itemId)){
                        this.checkAllGroup.splice(this.checkAllGroup.indexOf(itemId),1)
                    }
                }
                this.checkAll = this.checkAllGroup.length === this.tableData.length
                for (let i = 0; i < this.checkAllGroup.length; i++) {
                    for (let j = 0; j < this.tableData.length; j++) {
                        if (this.checkAllGroup[i] === this.tableData[j].itemId) {
                            arr.push({
                                itemId: this.tableData[j].itemId,
                                itemName: this.tableData[j].itemName
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
        .list-count{
            position: absolute;
            left: 70px;
            top: 50%;
            transform: translateY(-50%);
            color: #5599FF;
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
            font-size: 12px;

            .belongs-category {
                margin-top: 25px;
                padding-right: 50px;
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
            }

            .isshelves {
                margin-top: 25px;
                color: #5599FF;
                letter-spacing: 0;
                line-height: 12px;
            }

            .operation {
                margin-top: 25px;
                font-size: 0;
                display: inline-block;

                a {
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

