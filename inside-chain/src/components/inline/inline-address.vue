<script>
    /**
     -- zeqi@2dfire

     @props:
     自带一个定位图标
     */

    export default {
    }
</script>

<template>
    <div class="content-wrap">
        <span class="point"></span>
        <span class="right">
            <slot></slot>
        </span>
    </div>
</template>

<style lang="scss" scoped>
    .content-wrap {
        font-size: 12px;
        color: #333333;
        letter-spacing: 0;
        height: 22px;
        line-height: 22px;
    }

    .point {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-image: url(https://assets.2dfire.com/frontend/ff456c612eb0e96788c01b3fdedf1db6.png);
        background-size: cover;
        background-repeat: no-repeat;

        margin-right: 5px;
    }

    .right {
        display: inline-block;
        max-width: calc(100% - 30px);
        vertical-align: top;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;

    }
</style>

