<script>
    /**
     -- zeqi@2dfire

     @props:
     passInfo: {
        name: '', 品牌名称
        time: ''  时间
     }

     显示下发的传菜模块的组件
     */

    import BaseBlock from '@/components/layout/base-block'

    export default {
        props: ["info"],
        components: {
            BaseBlock
        },
    }
</script>

<template>
    <BaseBlock :type="1">
        <span slot="left">
            传菜所属品牌：{{info.name}}
        </span>
        <span slot="right">
            {{info.time}}
        </span>
    </BaseBlock>
</template>

