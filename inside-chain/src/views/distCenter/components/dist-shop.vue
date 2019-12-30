<script>
    /**
     -- zeqi@2dfire

     @props:
     type
     发布状态（0：待发布，2：发布失败,3：发布成功）

     显示下发状态用模块
     */

    export default {
        props: ["type", "count"],
        methods: {

        },
        computed: {
            showText() {
                let self = this
                if(self.type === 2){
                    return '下发失败门店'
                }else{
                    return '已选择下列门店'
                }
            }
        },
        created() {

        }
    }
</script>

<template>
    <div class="dist-shop">
        {{showText}}：共{{count}}家
    </div>
</template>

<style lang="scss" scoped>
.dist-shop {
    font-size: 12px;
    color: #333333;
}
</style>

