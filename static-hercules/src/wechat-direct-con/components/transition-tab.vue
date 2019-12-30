<template>
    <li class="step-list">
         <slot></slot>
    </li>
</template>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    /*border-bottom: 1PX solid #ccc;*/
    .step-list {
        position: relative;
        float: left;
        // display: inline-block;
        font-size: 26px;
        color: #333;
        text-align: center;
        line-height: 36px;
        width: 25%;
        height: 144px;
        &:before {
            content: '';
            display: block;
            width: 20px;
            height: 20px;
            margin: 39px auto 12px;
            border-radius: 50%;
            border: 1Px solid #999;
            background: white;
            box-sizing: border-box;
        }
        &:after {
            content: '';
            position: absolute;
            right: 50%;
            top: 48px;
            width: 90%;
            height: 1PX;
            background: #999;
            margin-right: 10px;
        }
        &.active {
            color: #0088FF;
            &:before {
                content: '';
                display: block;
                width: 20px;
                height: 20px;
                margin: 38px auto 12px;
                border-radius: 50%;
                background: #0088FF;
                border: 0;
            }
            &:after {
                content: '';
                position: absolute;
                left: 50%;
                top: 48px;
                width: 100%;
                height: 1PX;
                background: #0088FF;
                margin-left: 10px;
            }
            &:last-child:after {
                content: none;
            }
        }
    }
</style>
