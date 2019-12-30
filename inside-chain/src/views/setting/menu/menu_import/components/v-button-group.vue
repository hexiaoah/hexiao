<script>
    /**
     -- zeqi@2dfire

     仅供菜单导入商品使用

     @props:
     width: 宽度
     height: 高度


     */

    export default {
        props: ["width", "height"],
        name: "vButtonGroup",
        data() {
            return {}
        },
        computed: {
            styles() {
                let self = this;
                let w = 0;
                let h = 0;
//                默认宽高
//                360*440
                if (self.width === undefined) w = 200
                else w = self.width
                if (self.height === undefined) h = 440
                else h = self.height

                return {
                    width: `${w}px`,
                    height: `${h}px`
                };
            },
            mt() {
                let self = this;
                let mt = 0;
//                默认上边距 高度的40%
//                440*0.4 = 176
                if (self.height === undefined) mt = 176
                else mt = (self.height*0.4).toFixed(0)
                return {
                    marginTop: `${mt}px`
                };
            }
        },
    }
</script>

<template>
    <div class="v-button-group" :style="styles">
        <div class="v" :style="mt">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .v-button-group {
        display: inline-block;
        vertical-align: top;
    }

    .v {
        margin-top: 180px;
    }


</style>

