<template>
    <div>
        <crumbBar>
            <Crumb></Crumb>
        </crumbBar>

        <div class="org-wrap">
            <Input icon="ios-search" class="large mb-30px" v-model="pageState.name" @on-enter="searchOrgan"
                   @on-click="searchOrgan" placeholder="机构名称" style="width: 560px"></Input>

            <Row>
                <Col span="9" class="pr-20px">
                <containerCard title="机构">
                    <div class="pr-5px ">
                        <div class="tree-wrap">
                            <p class="sub-title">{{organ.name}}</p>
                            <vueTree :tree="organs" @z-click="getOrganInfo" @z-expand="expandNode"></vueTree>
                        </div>
                    </div>
                </containerCard>
                </Col>
                <Col span="15">
                <containerCard title="详情">
                    <div class="pr-5px info-wrap">
                        <p class="info-title">
                            <inlineOrgans :data="organ_info.organ_flow" v-show="organ_info.organ_flow.length > 0"></inlineOrgans>
                        </p>

                        <Row v-show="pageState.showInfo">
                            <Col :md="24">
                            <inlineDesc title="机构名称">{{organ_info.name}}</inlineDesc>
                            </Col>

                            <Col :md="24">
                            <inlineDesc title="机构编码">{{organ_info.code}}</inlineDesc>
                            </Col>

                            <!--<Col :md="12">-->
                            <!--<inlineDesc title="管理门店"><a>{{organ_info.num}}</a> ></inlineDesc>-->
                            <!--</Col>-->

                            <Col :md="24">
                            <inlineDesc title="创立日期">{{organ_info.found_date}}</inlineDesc>
                            </Col>
                            <Col :md="24">
                            <inlineDesc title="机构负责人">{{organ_info.manager}}</inlineDesc>
                            </Col>
                            <Col :md="24">
                            <inlineDesc title="联系电话">{{organ_info.phone}}</inlineDesc>
                            </Col>
                            <Col :md="24">
                            <inlineDesc title="机构地址">
                                {{organ_info.address}}
                            </inlineDesc>
                            </Col>
                        </Row>
                    </div>
                </containerCard>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>

    import containerCard from '@/components/layout/container-card'
    import inlineDesc from '@/components/inline/inline-desc'
    import inlineOrgans from '@/components/shop-select/inline-organs'
    import crumbBar from '@/components/layout/crumb-bar'
    import Crumb from "@/components/layout/crumb";
    import vueTree from "@/components/tree/tree";

    import organModules from "@/store/modules/organ/index";

    let pageState = {
        name: '',
        showInfo: false
    };

    import {mapGetters, mapActions} from "vuex";

    export default {
        computed: mapGetters({
            organ: "organ/organ",
            organs: "organ/organ_organs",
            organ_info: "organ/organ_info",
            organ_flow: "organ/organ_flow"
        }),
        data() {
            return {
                pageState
            }
        },
        methods: {
//            获取所有分支机构
            getOrganMap() {
                this.$store.dispatch("organ/getOrganMap");
            },
//            点击获取 当前节点的机构，展示详情
            getOrganInfo(e) {
                this.pageState.showInfo = true;
                this.$store.dispatch("organ/getOrganInfo", e);
            },
//            点击总部名称
            getHeadInfo(e) {
                this.$store.dispatch("organ/getHeadInfo", e);
            },
//            展开或收缩点击的节点
            expandNode(e) {

                console.log('node!',e)
                this.$store.dispatch("organ/toggleNode", e);
            },
//            搜索节点，包换搜索字段的标红
            searchOrgan() {
                let self = this;
                let name = self.pageState.name;

                this.$store.dispatch("organ/searchOrgan", name)
            }
        },
        created() {
            this.$store.dispatch("leftNav/setNav", 4);
            this.$store.dispatch("organ/setOrganHead");
            this.getOrganMap();
        },
        components: {
            Crumb, crumbBar, containerCard, inlineDesc, inlineOrgans, vueTree
        },
        beforeCreate() {
//            动态注册module
            let { organ={} } = this.$store.state

            if(Object.keys(organ).length <= 0) {
                this.$store.registerModule('organ', organModules)
            }
        }
    };
</script>
<style lang="scss" scoped>
    .org-wrap {
        padding: 30px;
    }

    .tree-wrap {
        margin-top: 18px;

        border: 1px solid #E6E6E6;
        border-radius: 4px;

        min-height: 500px;
        max-height: 700px;

        padding: 12px 17px;

        overflow-y: auto;
    }

    .info-wrap {
        margin-top: 18px;

        min-height: 500px;
        max-height: 700px;

    }

    .sub-title {
        font-size: 14px;
        color: #333333;
        font-weight: bold;

        /*cursor: pointer;*/
    }

    .info-title {
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        padding: 10px 0;
        border-bottom: 1px solid #E6E6E6;
    }

    .halo-tree li:before {
        display: none;
    }
</style>

