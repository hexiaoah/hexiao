<template>
    <div>
        <!--<CrumbBar>-->
            <!--<Crumb></Crumb>-->
        <!--</CrumbBar>-->

        <div class="situation-wrap">
            <!--<CrumbBar class="mb-20px">-->
                <!--<Tabs></Tabs>-->
            <!--</CrumbBar>-->

            <containerCard>
                <div>
                    <Form :label-width="80" inline>
                        <FormItem label="开始时间" prop="date">
                            <DatePicker type="date"
                                        :options="dateOption"
                                        v-model="pageParams.start"
                                        :clearable="false"
                                        format="yyyy-MM-dd"></DatePicker>
                        </FormItem>
                        <FormItem label="结束时间" prop="date">
                            <DatePicker type="date"
                                        :options="dateOption"
                                        v-model="pageParams.end"
                                        :clearable="false"
                                        format="yyyy-MM-dd"></DatePicker>
                        </FormItem>
                        <Button type="ghost" @click="changeDate">确定</Button>
                    </Form>
                </div>
                <iframe id="data-frame"
                        :src="dataUrl"
                        scrolling="no"
                        class="from-data"
                        width='100%'
                        height='100%'
                        frameborder="0">
                </iframe>
            </containerCard>

        </div>
    </div>
</template>
<script>

    import containerCard from '@/components/layout/container-card'
    import CrumbBar from '@/components/layout/crumb-bar'
    import Crumb from "@/components/layout/crumb";
    import Tabs from "@/components/tabs/tabs";

    import Cookie from "@2dfire/utils/cookie"
    import DateFormat from "@2dfire/utils/date"

    import {DATA_URL} from "apiConfig";

    let pageParams = {
        appkey: '200800',
        token: '',
        entityId: '',
        start: '',
        end: ''
    }

    export default {
        data() {
            return {
                dataUrl: DATA_URL,
                pageParams,
                dateOption: {
                    disabledDate(date) {
                        return date && date.valueOf() > Date.now();
                    }
                }
            }
        },
        methods: {
//            调整iframe的高度为
            changeFrameHeight() {
                let ifm = document.getElementById("data-frame");
                ifm.height = 3280;
            },
            initDate() {
                let self = this;
                let now = new Date(Date.now());
                self.pageParams.start = now;
                self.pageParams.end = now;

            },
            changeDate() {
                let self = this;

                let start = DateFormat.dateFormat(self.pageParams.start, 'yyyy-MM-dd')
                let end = DateFormat.dateFormat(self.pageParams.end, 'yyyy-MM-dd')

//                entity_id: String 店铺id
//                start_date: String 查询起始日期 'YYYY-MM-DD'
//                end_date: String 查询结束日期 'YYYY-MM-DD'

                let urlParams =
                    '?appkey=' + self.pageParams.appkey +
                    '&token=' + self.pageParams.token +
                    '&entity_id=' + self.pageParams.entityId +
                    '&start_date=' + start +
                    '&end_date=' + end
//                拼装最后URl
                self.dataUrl = DATA_URL + urlParams;
            }
        },
        components: {
            Crumb,
            CrumbBar,
            containerCard,
            Tabs
        },
        created() {
            let self = this;
//            this.$store.dispatch("leftNav/setNav", 2);
            this.$store.dispatch("leftNav/showShopNav", 1);
            let userToken = '';
            if (Cookie.getItem('entrance') !== undefined) {
                userToken = encodeURIComponent(JSON.parse(decodeURIComponent(Cookie.getItem('entrance'))).token)
            }
            self.pageParams.token = userToken
            self.pageParams.entityId = self.$route.query.entityId;

            self.initDate();

            self.changeDate()

        },
        mounted() {
            let self = this;
            self.changeFrameHeight()
        }
    }
    ;
</script>
<style lang="scss" scoped>
    .situation-wrap {
        padding: 30px;
    }

    .from-data {
        margin: 0;
        overflow-x: hidden;

    }

</style>
