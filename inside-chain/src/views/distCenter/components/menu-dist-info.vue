<template>
    <div>
        <BaseCard class="mb-20px">
            <BaseTitle>1.选择菜单</BaseTitle>
            <Row class="mt-20px">
                <Col :md="12" class="block">
                <BaseBlock :type="1">
                        <span slot="left">
                            {{taskInfo.menuInfo.menuName}}
                        </span>
                    <span slot="right">
                            共{{taskInfo.menuInfo.menuCount}}个商品
                        </span>
                </BaseBlock>
                </Col>
            </Row>
            <!--菜单-->
        </BaseCard>

        <BaseCard class="mb-20px">
            <BaseTitle>2.下发设置</BaseTitle>
            <!--一个表单-->
            <Form :label-width="80" inline class="mt-20px">
                <FormItem :label-width="182" label="下发任务名称">
                    <span>{{taskInfo.name}}</span>
                </FormItem>
                <br>
                <FormItem :label-width="182" label="下发时间设置">
                    <span>{{taskSetting.timeType}}</span>
                </FormItem>
                <span v-show="!taskInfo.timeType">
                        <FormItem label="开始日期">
                            <span>{{taskSetting.publishDate}}</span>
                        </FormItem>
                        <FormItem label="开始时间">
                            <span>{{taskSetting.publishTime}}</span>
                        </FormItem>
                    </span>
                <br>
                <FormItem :label-width="182" label="下发方式">
                    <span>{{taskSetting.publishType}}</span>
                </FormItem>
            </Form>
        </BaseCard>
    </div>
</template>

<script>
    import BaseCard from '@/components/layout/base-card'
    import BaseTitle from '@/components/layout/base-title'
    import BaseBlock from '@/components/layout/base-block'
    import Tip from '@/components/tip/tip'

    import DateFormat from '@2dfire/utils/date'

    import {mapGetters, mapActions} from "vuex";

    let pageParams = {
        taskId: ''
    }
    export default {
        name: "distHistory",
        props: {
            taskInfo: {
                type: Object,
                default: {}
            },
            taskSetting: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                pageParams,
            }
        },
        computed: {},
        components: {
            BaseCard,
            BaseTitle,
            BaseBlock,
            Tip
        },
        methods: {},
        created() {
        }
    }
</script>

<style lang="scss" scoped>
    .block {
        margin-bottom: 5px;
        padding: 0 5px;
    }
</style>
