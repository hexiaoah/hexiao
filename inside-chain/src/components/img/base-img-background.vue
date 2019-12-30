<template>
    <div :src="src" :style="pos" class="img" alt="IMAGE"></div>
</template>
<style lang="scss" scoped>
    .img {
        display: inline-block;
        width: 100%;
        height: 100%;
        background: #f1f1f1;
        border: 1px dashed #cccccc;
    }
</style>
<script>
    export default {
        props: ["src"],
        data() {
            return {pos: ""};
        },
        computed: {

        },
        methods: {
            imgLoad() {
                let self = this;
                let img = new Image();
                // 改变图片的src
                img.src = self.src + "?" + new Date().getTime();

                // 定时执行获取宽高
                let check = function () {
                    if (img.width > 0 && img.height > 0) {
                        if (img.width / img.height > 1) {
                            self.pos = {
                                backgroundImage: 'url(' + self.src + ')',
                                backgroundSize: 'auto 100%',
                                backgroundPosition: '50%'
                            }
                        }
                        else {
                            self.pos = {
                                backgroundImage: 'url(' + self.src + ')',
                                backgroundSize: 'auto 100%',
                                backgroundPosition: '50%'
                            }
                        }
                        clearInterval(set)
                    }
                }
                let set = setInterval(check, 40);
            }
        },
        created() {
            if (this.src) this.imgLoad();
        },
    };
</script>
