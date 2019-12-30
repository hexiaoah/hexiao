<script>
    /**
     -- zeqi@2dfire

     @props:
     pd：四周padding（内边距值）

     基本卡片容器 默认边框为15px的白色有阴影卡片
     */

    export default {
        props: ["pd"],
        data() {
            return {
            }
        },
        computed: {

            styles() {
                let self = this;
//                 默认15px的内边距
                let padding = 15;
                if(self.pd !==undefined){
                    padding = self.pd
                }

                return {
                    padding: `${padding}px`
                };
            }
        },
        created() {

        }
    }
</script>

<template>
    <transition name="slide-fade">
<div class="card" :style="styles">
    <div class="card-body">
        <slot></slot>
    </div>
</div>
    </transition>
</template>

<style lang="scss" scoped>
    .card {
        width: 100%;
        background-color: #FFFFFF;
        box-shadow: 0 2px 4px 0 rgba(202,202,202,0.26);
        transition: box-shadow 0.3s;
    }

    .card:hover {
        box-shadow: 0 2px 6px 0 rgba(202,202,202,0.52);
    }
</style>

