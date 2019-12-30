<template>
<div>
    <div v-for="(imgUrl, index) in images" :key="index">
        <img v-lazy="imgUrl" class="img-responsive" >
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            images: [
                "https://assets.2dfire.com/frontend/a2148a9402c5f998b95e09906f38d2e8.png",
                "https://assets.2dfire.com/frontend/7ac38a71e7835c97719022239db37ac2.png",
                "https://assets.2dfire.com/frontend/4a5a76e1632afffd3f2c0d92cd2d695d.png",
                "https://assets.2dfire.com/frontend/6adf283d4f07ab690f2bc8c9d4475b76.png",
                "https://assets.2dfire.com/frontend/192fbab9d3db3ec5b5b1ecb8b724b2d0.png",
                "https://assets.2dfire.com/frontend/88869f62deab97bda092c9823aaba71a.png",
                "https://assets.2dfire.com/frontend/59ca0305874179957c5950bc6c609098.png",
                "https://assets.2dfire.com/frontend/c8954b045584a33dc503108857873a94.png",
                "https://assets.2dfire.com/frontend/454219e13fe3453f0bdb8a5b0701300b.png",
                "https://assets.2dfire.com/frontend/e50098b91f1ac856f2b5385fd0b47638.png",
                "https://assets.2dfire.com/frontend/33588ab6b78492311eaf25384be6c8ec.png",
                "https://assets.2dfire.com/frontend/6cb30c2137b76f503b0ab701bcaf6e99.png",
                "https://assets.2dfire.com/frontend/890960c53b5edacd0a0e861c23642d98.png",
                "https://assets.2dfire.com/frontend/db78fcdd9a7205790372d7c2519d2c8e.png",
                "https://assets.2dfire.com/frontend/5290169899bffef95870422f1d6d0def.png",
                "https://assets.2dfire.com/frontend/62d95adb55ac893cab17aa10756e8297.png",
                "https://assets.2dfire.com/frontend/cbf3fbbaecbcc613ce37b7fac7bdc9c4.png",
                "https://assets.2dfire.com/frontend/959c90c792977f7dfeb963164bf2edf2.png",
                "https://assets.2dfire.com/frontend/db55a0fe61b41550ee9ab411c9120015.png",
                "https://assets.2dfire.com/frontend/ce737d71cdcd2dc211ff70d6ff4da75d.png"
            ]
        }
    },
    methods: {
    },
    components: {
    },
    created() {
    }
}
</script>
<style lang="scss" scoped>
.img-responsive {
  display: block;
  height: auto;
  width: 100%;
}
</style>

