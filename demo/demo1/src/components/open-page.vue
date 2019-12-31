<script>
    /**
     分页组件 zeqi at 2017/10/31

     iview原有page组件基础上，新增首页、尾页


     */

    let componentData = {
        current: 1
    }

    import _i from "@/i18n/index";

    let pageData = {
        firstPage: _i('SERVER.APPS.CONTROL.FIRSTPAGE'),
        lastPage: _i('SERVER.APPS.CONTROL.LASTPAGE'),
    };

    export default {
        data() {
            return {
                componentData: componentData,
                pageData: pageData
            }
        },
        props: ['total','totalPage',"pageSize","current"],
        methods: {
            toFirstPage(){
                this.$emit("on-change", 1);
            },
            toLastPage () {
                let self = this;
                this.$emit("on-change",self.totalPage);
            },
            pageChange (e) {
                this.$emit("on-change",e);
            }
        }
    }
</script>
<template>
    <div class="open-page">
        <span class="pageBtn" :class="{'active': current === 1 && totalPage!= 1}" @click="toFirstPage">{{pageData.firstPage}}</span>
        <Page :total="total" :page-size="pageSize" :current="current" size="small" class="open-page" @on-change="pageChange"></Page>
        <span class="pageBtn" :class="{'active': current === totalPage && totalPage!= 1}"  @click="toLastPage">{{pageData.lastPage}}</span>
    </div>
</template>

<style lang="scss" scoped>

    .open-page {
        text-align: center;
        display: inline-block;
    }

    .pageBtn{
        vertical-align: top;
        display: inline-block;
        margin-top: 3px;
        color: #333333;
        cursor: pointer;
        &.active{
            color: #C42022;
        }
    }

</style>


