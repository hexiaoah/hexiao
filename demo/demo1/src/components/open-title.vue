<script>
    /**
     页面标题组件 zeqi at 2017/10/31

     传入标题内容: title（左侧显示，必填）和自定义内容（右侧显示，可选）

     */


    let componentData = {
        title: 'Title',
        state:'',
    }

    export default {
        data() {
            return {
                componentData: componentData,
            }
        },
        props: ['title','state'],
        methods: {},
        created() {
            if (this.title) {
                this.componentData.title = this.title;
            }
              if (this.state) {
                this.componentData.state = this.state;
            }
        }
    }
</script>
<template>
    <div class="open-title">
        <div class="title-box">
            <div class="fl-left title"><span class="icon icon-crumb"></span>
               <span class="title-text">{{componentData.title}}</span>
               <span class="state-text" v-if='state'>{{componentData.state}}</span>
            </div>
            <div class="fl-right">
                <slot></slot>
            </div>
            <div class="fl-clear"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    .open-title {
        width: 100%;
        /*height: 55px;*/
        padding: 20px 0 10px 0;

        border-bottom: 2px solid #333333;
    }

    .title-box {
        height: 25px;
        color: #333333;
        .title {
            .icon {
                width: 17px;
                height: 17px;
                display: inline-block;
                margin-right: 5px;
                background-size: cover;
                position: relative;
                top: 2px;
            }
            .title-text ,.state-text{
                font-size: 18px;
                line-height: 25px;
            }
            .state-text{
             color: #C42022;
            }
        }
    }
</style>


