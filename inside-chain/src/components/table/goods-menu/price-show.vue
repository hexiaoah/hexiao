<template>
    <div>
        <span v-if="same">与基础价一致</span>
        <div v-else>
            <p class="custom-price">自定义设置</p>
            <p class="default-price">基础价：￥{{price}}/份</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'price-show',
    props: ["price", "switch"],
    computed: {
        same(){
            return this.switch
        }
    }
}
</script>

<style lang="scss" scoped>

    .same {
        color: #333333;
    }

    .custom-price{
        color: #D83F3F;
    }

    .default-price{
        color: #666666;
    }
</style>

