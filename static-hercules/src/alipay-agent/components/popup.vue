<template>
    <div class="popup__wrapper">
        <div :class="['popup_content', { active: value }]">
            <div class="content">
                <div class="title">{{title}}</div>
                <div class="list-item"
                     :style="{ color: item.color || '#0088FF' }"
                     @click="jumpUrl(item.routerPath)"
                     v-for="(item, $index) in list"
                     :key="$index">
                    {{ item.name }}
                </div>
            </div>
            <div class="cancel" @click="close">取消</div>
        </div>
        <f-mask :visible="value" @close="close"></f-mask>
    </div>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'

    export default {
        name: 'popup',
        props: {
            title: {
                type: String,
                default() {
                    return '请选择操作内容'
                }
            },
            value: {
                type: Boolean,
                default() {
                    return false
                }
            },
            list: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        methods: {
            ...mapActions([
                'saveIsPopShow'
            ]),
            jumpUrl(url) {
                this.saveIsPopShow(false)
                this.$router.push({
                    path: url
                })
            },
            close() {
                this.saveIsPopShow(false)
            }
        }
    }
</script>

<style type="text/less" lang="less" scoped>
    .popup_content {
        width: 690px;
        position: fixed;
        left: 30px;
        bottom: 0;
        z-index: 1005;
        transform: translate3d(0, 100%, 0);
        transition: transform .4s ease;

        &.active {
            transform: translate3d(0, -20px, 0);
        }

        .content {
            background: #FFFFFF;
            border-radius: 26px;
            margin-bottom: 20px;
            text-align: center;

            .title {
                font-size: 26px;
                color: #999999;
                letter-spacing: 0;
                line-height: 88px;
                height: 88px;
                border-bottom: 1PX solid #ccc;
            }

            .list-item {
                height: 112px;
                line-height: 112px;
                border-bottom: 1PX solid #ccc;
                font-size: 30px;
                color: #0088FF;
                letter-spacing: 0;
                text-align: center;

                &:last-child {
                    border-radius: 26px;
                }
            }
        }

        .cancel {
            height: 112px;
            line-height: 112px;
            text-align: center;
            background: #FFFFFF;
            border-radius: 26px;
            font-size: 30px;
            color: #0088FF;
            letter-spacing: 0;
        }
    }

    .f-mask {
        z-index: 1003;
    }
</style>
