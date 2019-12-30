<template>
    <div>
        <!--付款方式下发 显示组件-->
        <BaseCard class="mb-20px">
            <BaseTitle>1.传菜设置</BaseTitle>
            <Row class="mt-20px">
                <Col :md="24">
                <PassBlock :info="taskInfo.passInfo"></PassBlock>
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
            </Form>
        </BaseCard>
    </div>
</template>

<script>
    import BaseCard from '@/components/layout/base-card'
    import BaseTitle from '@/components/layout/base-title'
    import PassBlock from './pass-module'
    import Tip from '@/components/tip/tip'

    import DateFormat from '@2dfire/utils/date'

    import {mapGetters, mapActions} from "vuex";

    let pageParams = {
        taskId: ''
    }
    export default {
        name: "passDistHistory",
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
            PassBlock,
            Tip
        },
        methods: {},
        created() {
        }
    }
</script>

<style lang="scss" scoped>
</style>
