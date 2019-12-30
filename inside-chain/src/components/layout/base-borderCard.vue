<script>
    /**
     -- zeqi@2dfire

     @props:
     pd：四周padding（内边距值）
     max: 最大高度 超出滚动默认 240px

     基本卡片容器 默认边框为15px的白色有边框
     */

    export default {
        props: ["pd", "max"],
        data() {
            return {
            }
        },
        computed: {

            styles() {
                let self = this;
//                 默认15px的内边距
                let padding = 15;
                let max = 240;
                if(self.pd !==undefined){
                    padding = self.pd
                }
                if(self.max !==undefined){
                    max = self.max
                }

                return {
                    padding: `${padding}px`,
                    maxHeight: `${max}px`,
                };
            }
        },
        created() {

        }
    }
</script>

<template>
<div class="bcard" :style="styles">
        <slot></slot>
</div>
</template>

<style lang="scss" scoped>
    .bcard {
        width: 100%;
        overflow-y: auto;
        border: 1px solid #E6E6E6;
        border-radius: 4px;
    }

</style>

