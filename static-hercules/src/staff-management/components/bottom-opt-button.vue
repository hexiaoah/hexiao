<template>
    <div class="btn-group">
            <div class="help-button" v-show="isShowHelp" @click="clickHelp"></div>
            <f-button type="danger" icon="add" v-show="isShowAdd" @click="toAdd">添加</f-button>
        </div>
</template>

<script>
export default {
    name: 'bottom-opt-button',
    props: {
      isShowHelp: {
        type: Boolean,
        default: true
      },
      isShowAdd: {
        type: Boolean,
        default: true
      }
    },
    methods: {
        toAdd() {
            this.$emit('add');
        },
        clickHelp() {
            this.$emit('help');
        }
    }
}
</script>


<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .btn-group {
        position: fixed;
        width: 100%;
        bottom: 24px;
        border: none;

        .help-button {
            position: fixed;
            float: left;
            margin-left: 26px;
            width: 96px;
            height: 96px;
            background-image: url('https://assets.2dfire.com/frontend/551e1f737ac2f22d0a61216f5588be7c.png');
            background-size: cover;
            border-radius: 50%;
            bottom: 24px;
        }
        .f-button {
            width: 120px;
            height: 120px;
            float: right;
            right: 26px;
        }
    }

</style>
