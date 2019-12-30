<template>
    <Modal
        class="modal"
        :value="isShow"
        :width="720"
        :mask-closable="false"
        @on-visible-change="change">
        <p slot="header">可选商品</p>
        <div class="body">
            <div class="sub-title">
                <Select v-model="kindId" @on-change="changeKindId">
                    <Option v-for="item in selectList"
                            :value="item && item.id"
                            :key="item && item.id">
                        {{ item.name }}
                    </Option>
                </Select>
                <Input v-model="keyWord"
                       icon="search"
                       placeholder="搜索内容"
                       @on-click="filterGoods"
                       @on-enter="filterGoods">
                </Input>
                <span class="refresh" @click="refreshData"></span>
            </div>
            <div class="table-wrapper">
                <div class="table-header">
                    <Checkbox
                        class="title-wrapper"
                        :value="checkAll"
                        @click.prevent.native="chooseAllClick">
                        <span class="name">商品</span>
                        <span class="price">价格</span>
                    </Checkbox>
                </div>
                <ul class="table-ul" v-show="!isLoading">
                    <li v-for="(item, $index) in suitGoodsList.itemList"
                        :key="$index"
                        :class="['goods-li', {active: isActive(item)}]">
                        <div class="sub-wrapper over-hidden mb-10px">
                            <div class="sub-wrapper-content pull-left">
                                <Checkbox :value="allChoosedGoodsIdOrSpecId.indexOf(item.itemId) >= 0"
                                          :disabled="choosedGoodsIdOrSpecId.indexOf(item.itemId) >= 0"
                                          @on-change="changeCheckBox(item, $event)"
                                          :style="{visibility: !item.specList.length ? 'visible' : 'hidden'}"
                                          class="pull-left checkbox-li">
                                </Checkbox>
                                <img-box :src="item.itemPath" class="img-box"></img-box>
                                <div class="content">
                                    <div class="title">{{item.itemName}}</div>
                                    <span :class="['price', {active: (item.itemMemberPrice === 0 || item.itemMemberPrice) && (item.itemMemberPrice !== item.itemPrice)}]">
                                        <span>¥ {{item.itemPrice.toFixed(2)}}</span>
                                        /{{item.itemAccount}}
                                    </span>
                                    <!--<span class="mermber-price" v-if="(item.itemMemberPrice === 0 && item.itemPrice !== 0) || (item.itemMemberPrice && (item.itemMemberPrice !== item.itemPrice))">-->
                                        <!--<span>¥ {{item.itemMemberPrice.toFixed(2)}}</span>-->
                                        <!--/{{item.itemAccount}}-->
                                    <!--</span>-->
                                    <!--<i class="mermber-icon" v-if="(item.itemMemberPrice === 0 && item.itemPrice !== 0) || (item.itemMemberPrice && (item.itemMemberPrice !== item.itemPrice))"></i>-->
                                </div>
                            </div>
                            <div class="mark pull-right" v-if="item.mealOnly">仅在套餐中显示</div>
                        </div>
                        <div class="sup-wrapper" v-if="item.specList && item.specList.length">
                            <span class="title">规格(*必选)</span>
                            <Button
                                :class="['sup-wrapper-spec', {choosed: allChoosedGoodsIdOrSpecId.indexOf(value.onlyKey) >= 0}]"
                                :key="$index"
                                :disabled="choosedGoodsIdOrSpecId.indexOf(value.onlyKey) >= 0"
                                @click="changeSpec(value, item)"
                                v-for="(value, $index) in item.specList">
                                {{value.name}}
                            </Button>
                        </div>
                    </li>
                </ul>
                <div class="loading demo-spin-col" v-show="isLoading">
                    <Spin fix>
                        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    </Spin>
                </div>
            </div>
        </div>
        <div slot="footer" class="footer">
            <Button type="error" class="comfirm" size="default" @click="confirm">确认使用</Button>
            <Page :total="suitGoodsList && suitGoodsList.total"
                  :current="currentPageNum"
                  @on-change="changeSize"
                  :page-size="page.pageSize" show-total>
                <p>共{{(suitGoodsList && suitGoodsList.total) || 0}}条，每页30条</p>
            </Page>
        </div>
    </Modal>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import Tools from '@/base/tools'
    import ImgBox from '@/components/img/img-box'
    export default {
        name: 'modal-add-suit-goods',
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            // 已经被选中的商品或者规格
            choosedGoodsIdOrSpecId: {
                type: Array,
                default(){
                    return []
                }
            }
        },
        data() {
            return {
                isLoading: true,
                // 新被选中的商品或者规格id, 包含了choosedGoodsIdOrSpecId
                allChoosedGoodsIdOrSpecId: [],
                // 新增被选中的商品数组
                newChoosedGoods: [],
                kindId: '0',
                keyWord: '',
                currentPageNum: 1,
                page: {
                    pageSize: 30,
                    pageNum: 1
                }
            }
        },
        computed: {
            ...mapState({
                suitGoodsList(state){
                    let obj = state.setting.common.suit.suitGoodsList
                    obj && obj.itemList && obj.itemList.map(item => {
                        if (item.specList && item.specList.length) {
                            item.specList = item.specList.map(data => {
                                data.onlyKey = item.itemId + data.id
                                return data
                            })
                        }
                        return item
                    })
                    return obj
                },
                selectList(state){
                    return [{
                        name: '全部分类',
                        id: '0'
                    }].concat(Tools.recursion(state.setting.common.suit.suitGoodsCategory || []))
                }
            }),
            // 当前页可以被选择的商品和规格
            canChoosedGoodsIdOrSpecId(){
                // 商品id
                let goodList = this.suitGoodsList.itemList && this.suitGoodsList.itemList.filter(item => {
                        return (!item.specList || item.specList.length === 0)
                    }) || []
                let goodsIdList = goodList.map(item => item.itemId) || []

                // 规格ID 既onlyKey
                let specIdList = []
                let itemList =  this.suitGoodsList.itemList || []
                for(let i=0; i<itemList.length; i++){
                    if(itemList[i].specList && itemList[i].specList.length){
                        itemList[i].specList.map(item => {
                            specIdList.push(item.onlyKey)
                        })
                    }
                }
                return [].concat(goodsIdList).concat(specIdList)
            },
            checkAll: {
                get: function () {
                    // 只要所有能被选中的都被选了，那么就返回被选中的状态
                    return this.canChoosedGoodsIdOrSpecId.every(item => this.allChoosedGoodsIdOrSpecId.indexOf(item) >= 0)
                },
                set: function (newval) {
                    if (!newval) {
                        this.newChoosedGoods = []
                        this.allChoosedGoodsIdOrSpecId = [].concat(this.choosedGoodsIdOrSpecId) || []
                    }
                    else {
                        // 获取到无规格的商品数组并且之前没有被选中的商品列表
                        let arr = this.suitGoodsList.itemList && this.suitGoodsList.itemList.filter(item => {
                                return (!item.specList || item.specList.length === 0) && this.choosedGoodsIdOrSpecId.indexOf(item.itemId) < 0
                            })

                        // 获取到有规格的商品数组
                        let arr2 = this.suitGoodsList.itemList && this.suitGoodsList.itemList.filter(item => {
                                return item.specList && item.specList.length
                            })

                        let arr3 = []
                        // 遍历有规格的商品，然后有多少种规格就生成多少个对象，并且去除已经被选中的规格
                        for (let i = 0; i < arr2.length; i++) {
                            let specList = arr2[i].specList
                            for (let j = 0; j < specList.length; j++) {
                                if (this.choosedGoodsIdOrSpecId.indexOf(specList[j].onlyKey) < 0) {
                                    let obj = JSON.parse(JSON.stringify(arr2[i]))
                                    obj.onlyKey = specList[j].onlyKey
                                    obj.specDetailId = specList[j].id
                                    obj.specName = specList[j].name
                                    arr3.push(obj)
                                }
                            }
                        }
                        this.newChoosedGoods = [].concat(arr).concat(arr3)
                        this.allChoosedGoodsIdOrSpecId = [].concat(this.canChoosedGoodsIdOrSpecId)
                    }
                }
            }
        },
        methods: {
            ...mapActions({
                _getSuitGoodsList: 'setting/getSuitGoodsList',
                _getSelectList: 'setting/getCategoryList'
            }),
            isActive(item){
                if(!item.specList || item.specList.length === 0){
                    return (this.allChoosedGoodsIdOrSpecId.indexOf(item.itemId) >= 0)
                }
                else{
                    return item.specList.some(data => this.allChoosedGoodsIdOrSpecId.indexOf(data.onlyKey) >= 0)
                }
            },
            filterGoods(){
                this.page.pageNum = 1
                this.currentPageNum = 1
                this.getSuitGoodsList()
            },
            getSuitGoodsList(){
                let plateEntityId = this.$route.query.plateEntityId
                let opEntityId = this.$route.query.entityId
                this.isLoading = true
                let self = this
                this._getSuitGoodsList({
                    plateEntityId,
                    opEntityId,
                    kindId: this.kindId === '0' ? '' : this.kindId,
                    keyWord: this.keyWord.trim(),
                    pageNum: this.page.pageNum,
                    pageSize: this.page.pageSize,
                    callback: function () {
                        self.isLoading = false
                    }
                })
            },
            changeSize(val){
                this.page.pageNum = val
                this.currentPageNum = val
                this.getSuitGoodsList()
            },
            changeKindId(kindId){
                this.kindId = kindId
                this.getSuitGoodsList()
            },
            changeSpec(value, item){
                let { onlyKey, id, name } = value
                let index = this.allChoosedGoodsIdOrSpecId.indexOf(onlyKey)
                // 当前规格被选中
                if (index >= 0) {
                    // 将新增的数组中去除这个规格的商品
                    this.newChoosedGoods = this.newChoosedGoods.filter(item => {
                        return item.onlyKey !== onlyKey
                    })
                    this.allChoosedGoodsIdOrSpecId.splice(index, 1)
                }
                else {
                    item.specDetailId = id
                    item.specName = name
                    item.onlyKey = onlyKey
                    this.allChoosedGoodsIdOrSpecId.push(onlyKey)
                    this.newChoosedGoods.push(Object.assign({}, item))
                }
            },
            change(state){
                if (state) {
                    let plateEntityId = this.$route.query.plateEntityId
                    let opEntityId = this.$route.query.entityId
                    this.getSuitGoodsList()
                    this._getSelectList({
                        plateEntityId,
                        opEntityId,
                        isInclude: 0,
                        type: 'suitGoods'
                    })
                    this.allChoosedGoodsIdOrSpecId = [].concat(this.choosedGoodsIdOrSpecId) || []
                }
                else {
                    this.newChoosedGoods = []
                    this.allChoosedGoodsIdOrSpecId = []
                    this.keyWord = ''
                    this.kindId = '0'
                    this.page.pageNum = 1
                    this.currentPageNum = 1
                }
                this.$emit('change-visible', state)
            },
            chooseAllClick(){
                this.checkAll = !this.checkAll
            },
            changeCheckBox(item, val){
                if (val) {
                    this.allChoosedGoodsIdOrSpecId.push(item.itemId)
                    this.newChoosedGoods.push(item)
                }
                else {
                    let index = this.allChoosedGoodsIdOrSpecId.indexOf(item.itemId)
                    let index2 = this.newChoosedGoods.findIndex(data => data.itemId === item.itemId)
                    this.allChoosedGoodsIdOrSpecId.splice(index, 1)
                    this.newChoosedGoods.splice(index2, 1)
                }
            },
            confirm(){
                this.$emit('choosed-goods', this.newChoosedGoods)
                this.newChoosedGoods = []
                this.allChoosedGoodsIdOrSpecId = []
                this.keyWord = ''
                this.kindId = '0'
                this.page.pageNum = 1
                this.currentPageNum = 1
            },
            refreshData(){
                this.newChoosedGoods = []
                this.allChoosedGoodsIdOrSpecId = []
                this.keyWord = ''
                this.kindId = '0'
                this.page.pageNum = 1
                this.currentPageNum = 1
                this.getSuitGoodsList()
            }
        },
        components: {
            ImgBox
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .modal {
        /deep/ .ivu-modal-body {
            padding-left: 0;
            padding-right: 0;
        }

        /deep/ .ivu-modal-footer {
            border-top: none;
        }
    }

    .body {
        /deep/ .ivu-select {
            width: 200px;
            margin-right: 10px;
        }

        /deep/ .ivu-input-wrapper {
            width: 180px;
        }

        .refresh {
            width: 36px;
            height: 36px;
            float: right;
            display: inline-block;
            background-size: cover;
            background-image: url(https://assets.2dfire.com/frontend/cadf13fa9eb8bdc77b5545d7c18464e9.png);
        }

        .table-header {
            height: 40px;
            margin-top: 10px;
            background: #F1F1F1;

            .title-wrapper {
                display: block;
                height: 40px;
                line-height: 40px;
                padding-left: 10px;

                /deep/ .ivu-checkbox {
                    margin-right: 5px;
                }
            }
        }

        .table-wrapper {
            position: relative;
            height: 520px;

            .table-ul {
                height: 480px;
                overflow: auto;
                border: 1px solid #E5E5E5;

                .goods-li {
                    padding: 0 0 0 10px;
                    border-bottom: 1px solid #E5E5E5;

                    &.active {
                        background: rgba(216, 63, 63, 0.04);
                        border-color: #E5E5E5;
                    }

                    /deep/ .ivu-checkbox-wrapper {
                        vertical-align: 30px;
                        margin-right: 10px;
                    }

                    .img {
                        width: 60px;
                        height: 60px;
                        display: inline-block;
                        margin-top: 10px;
                        background: red;
                        margin-right: 10px;
                    }

                    .content {
                        vertical-align: top;
                        margin-top: 20px;

                        .title {
                            font-size: 14px;
                            color: #333333;
                        }

                        .price {
                            /*&.active {*/
                                /*text-decoration: line-through;*/
                                /*color: #999999;*/

                                /*span{*/
                                    /*color: #999999;*/
                                /*}*/
                            /*}*/

                            span {
                                color: #D83F3F;


                                &.active {
                                    color: #999999;
                                }
                            }
                        }

                        .mermber-price {
                            span {
                                color: #D83F3F;
                            }
                        }

                        .mermber-icon{
                            display: inline-block;
                            vertical-align: middle;
                            width: 38px;
                            height: 16px;
                            background-size: contain;
                            background-image: url(https://assets.2dfire.com/frontend/b8bd5b42f411673be2f8dc6bcc8743db.png);
                        }
                    }

                    .mark {
                        float: right;
                        font-size: 12px;
                        color: #FFFFFF;
                        line-height: 16px;
                        padding: 0 3px;
                        background: #5599FF;
                        border-radius: 2px;
                        margin-top: 20px;
                        height: 18px;
                        margin-right: 20px;
                    }

                    .img, .content, .mark {
                        display: inline-block;
                    }

                    .sup-wrapper {
                        border-top: 1px solid #EEEEEE;
                        margin-left: 20px;
                        height: 50px;
                        line-height: 50px;

                        span.title {
                            margin-right: 5px;
                        }

                        .sup-wrapper-spec {
                            border-radius: 100px;
                            font-size: 12px;
                            text-align: center;
                            margin-left: 10px;
                            height: 30px;
                            padding: 0 27px;
                            color: #333333;
                            background: #E6E6E6;
                            line-height: 18px;
                            border: none !important;

                            &.choosed {
                                background: #D83F3F;
                                color: white;
                            }

                            &[disabled] {
                                color: #999999;
                                background: #E6E6E6;
                                text-align: center;
                            }
                        }
                    }
                }
            }

            .loading {
                position: absolute;
                top: 40px;
                left: 0;
                width: 100%;
                height: 480px;
                z-index: 100;
            }
        }
    }

    .img-box {
        width: 60px;
        height: 60px;
        margin-top: 10px;
        display: inline-block;
        margin-right: 10px;
    }

    .checkbox-li {
        margin-top: 30px;

        /deep/ .ivu-checkbox + span {
            display: none;
        }
    }

    .footer {
        overflow: hidden;

        .comfirm {
            background: #D83F3F;
            border: 1px solid #D83F3F;
            border-radius: 4px;
            float: left;
        }
    }

    .flex-col {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
    }

    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }

    @keyframes ani-demo-spin {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .demo-spin-col {
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }

    .over-hidden{
        overflow: hidden;
    }
</style>

