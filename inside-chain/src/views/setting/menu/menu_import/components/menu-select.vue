<script>
    /**
     -- zeqi@2dfire

     仅供菜单导入商品使用

     @props:
     goodsList: '商品列表'，
     typeList: '分类'，
     title: '标题'

     */

    import BasePanel from '@/components/layout/base-panel'

    export default {
        props: ["goodsList", "typeList", "title"],
        name: "menuSelect",
        components: {
            BasePanel,

        },
        data() {
            return {
//              all: false
                params: {
                    name: '',
                    kindId: '',
                    kindIdShow: 'all'
                }

            }
        },
        computed: {
            count() {
                if (this.goodsList !== undefined) {
                    return this.goodsList.length
                }
                else return 0
            },
            all() {
                let self = this;
                let count = 0;
                let length = self.goodsList.length;
//                console.log('goods: ',this.goodsList)
                if(self.goodsList.length > 0){
                    self.goodsList.map(v => {
                        if (v.checked) {
                            count++
                        }
                    })
                }

                return (length !== 0) && (count === length)
            },
            showList() {
                let self = this;
//                if (self.filterList !== undefined) {
//                    return this.filterList
//                }
//                else {
                    return this.goodsList
//                }
            }
        },
        methods: {
            filterGoods() {
                let self = this;
                if(self.params.kindIdShow === 'all') {
                    self.params.kindId = ''
                }else {
                    self.params.kindId = self.params.kindIdShow
                }
                this.$emit('on-search', this.params)
            },
            checkAll() {
                this.$emit('check-all', this.all)
            },
            checkOne(item, e) {
                this.$emit('check-one', {item: item, check: e})

            }
        },

        created() {
        }
    }
</script>

<template>
    <div class="menu-select">
        <p>{{title}}（{{count}}）</p>
        <div class="goods-box mt-10px">
            <BasePanel>
                <div slot="header" class="filter-bar">
                    <Select v-model="params.kindIdShow" style="width:168px" @on-change="filterGoods">
                        <Option value="all">全部分类</Option>
                        <Option :value="item.id" v-for="item in typeList" :key="item.id">{{item.name}}</Option>
                    </Select>
                    <Input v-model="params.name" icon="ios-search" placeholder="商品名称" style="width: 166px"
                           @on-click="filterGoods" @on-enter="filterGoods"></Input>
                </div>
                <div slot="body" class="goods-body">
                    <div class="select-all">
                        <Checkbox :value="all" @on-change="checkAll">全选</Checkbox>
                    </div>
                    <ul class="goods-list">
                        <li class="goods-item" v-for="(item,index) in goodsList" :key="index">
                            <Checkbox :value="item.checked" @on-change="checkOne(item, $event)">{{item.name}}
                            </Checkbox>
                        </li>
                    </ul>
                </div>
            </BasePanel>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .menu-select {
        display: inline-block;
        color: #333333;
    }

    .goods-box {
        width: 360px;
        height: 440px;
    }

    .goods-body {
        /*height: 398px;*/
    }

    .goods-list {
        list-style: none;
        overflow-y: auto;
        height: 359px;
    }

    .goods-item {
        padding: 10px 2px;
    }

    .filter-bar {
        padding: 5px 0
    }

    .select-all {
        padding-left: 2px;
        padding-bottom: 10px;
        border-bottom: 1px solid #E6E6E6;
    }

</style>

