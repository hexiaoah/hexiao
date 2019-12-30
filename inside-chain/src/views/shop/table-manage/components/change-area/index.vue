<!--换区域组件-->
<template>
    <Poptip placement="top-start"
            width="225"
            @on-popper-hide="initCheck"
            v-model="visible">
        <Button type="default" class="blankBtn" @click.stop="showAreaPop" :disabled="can">换区域</Button>
        <div slot="content">
            <div class="header">
                <span class="title fl-left">换区域</span>
                <span class="link-btn fl-right" @click="jumpToArea">管理区域</span>
                <div class="fl-clear"></div>
            </div>
            <div class="area-list">

                <RadioGroup v-model="checkedId" vertical>
                    <Radio v-for="item,index in list" :key="index+'_areaItem'" :label="item.id">
                        {{item.name}}
                    </Radio>
                </RadioGroup>
            </div>

            <div class="menu-foot">
                <div class="save classifyBtn fl-right" :class="{'disabled': !checkedId}"
                     @click="save">保存
                </div>
                <div class="cancel classifyBtn fl-right" @click="close">取消</div>
                <div class="fl-clear"></div>
            </div>
        </div>
    </Poptip>
</template>

<script>
    export default {
        props: {
            list: Array,
            can: Boolean
        },
        data() {
            return {
                checkedId: '',
                checkedName: '',
                visible: false,
            }
        },
        computed: {},
        methods: {
            showAreaPop() {
                let self = this;
                self.visible = true
            },
            close() {
                let self = this;
                self.checkedId = '';
                self.visible = false
            },
            save() {
                let self = this;
                if (self.checkedId) {
                    self.visible = false
                    self.list.map(item=>{
                        if(item.id === self.checkedId) self.checkedName = item.name
                    })

                    self.$emit('on-save', {id: self.checkedId, name: self.checkedName})
                }

            },
            jumpToArea() {
                let self = this;
                let entityId = self.$route.query.entityId

                this.$router.push({
                    path: '/shop_area_manage',
                    query: {
                        entityId
                    }
                })
            },
            initCheck() {
                let self = this;
                self.checkedId = '';
                self.visible = false
            }
        },
        components: {}
    }
</script>

<style lang="scss" type="text/scss" scoped>


    .blankBtn {
        background: #ffffff;
    }

    .area-list {
        text-align: left;
        padding: 0 10px;

        .area-item {
            margin-bottom: 7px;
        }

        max-height: 250px;
        overflow: auto;
    }

    .header {
        padding: 7px 10px;
        background: #f1f1f1;
        font-size: 12px;

        .title {
            color: #333333;
        }

        .link-btn {
            color: #5599FF;
            cursor: pointer;
        }
    }

    .menu-foot {
        width: 100%;
        border-top: 1px solid #D8D8D8;
        padding: 7px 10px;
        z-index: 10;
        background: #ffffff;
        border-radius: 0 0 4px 4px;

        .classifyBtn {
            width: 44px;
            height: 20px;
            border-radius: 3px;
            text-align: center;
            line-height: 20px;
            font-size: 11px;
            cursor: pointer;
        }

        .cancel {
            border: 1px solid #CCCCCC;
            color: #333333;
            margin-right: 10px;
        }

        .save {
            color: #D83F3F;
            border: 1px solid #D83F3F;

            &.disabled {
                color: #bbbec4;
                background-color: #f7f7f7;
                border-color: #dddee1;
                cursor: not-allowed;
            }
        }
    }
</style>

