<template>
<div class="scroll-wrap">
    <div class="page-list" v-show="pageList.length">
        <slot></slot>
    </div>
    <infinite-loading v-bind="$attrs" :on-infinite="beforeLoadHandler" ref="infiniteLoading" spinner="spiral">
        <div class="no-more" slot='no-more'>
            <slot name="no-more">
                {{noMoreText}}
            </slot>
        </div>
        <div class="no-results" slot='no-results'>
            <slot name="no-results">
                {{noResultText}}
            </slot>
        </div>
    </infinite-loading>
</div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

export default {
    name: "scroll-loading",
    components: {
        InfiniteLoading
    },
    props: {
        pageList: {
            type: Array,
            default () {
                return []
            }
        },
        total: [Number, Object],
        beforeLoad: {
            type: Function
        },
        pageLoad: {
            type: Function
        },
        totalLoad: {
            type: Function
        },
        query: {
            type: Object,
            default () {
                return {}
            }
        },
        noMoreText: {
            type: String,
            default () {
                return "已经加载完全部数据"
            }
        },
        noResultText: {
            type: String,
            default () {
                return "暂无数据"
            }
        },
        pageSize: {
            type: Number,
            default () {
                return 10
            }
        }
    },
    data() {
        return {
            pageConfig: {
                page_index: 1,
                page_size: this.pageSize,  
            }
        }
    },
    methods: {
        beforeLoadHandler($state) {
            if (this.beforeLoad && typeof this.pageLoad === 'function') {
                if (this.beforeLoad()) {
                    this.infiniteHandler($state)
                } else {
                    $state.complete()
                }
            } else {
                this.infiniteHandler($state)
            }
        },
        infiniteHandler($state) { 
            if (this.pageLoad && typeof this.pageLoad === 'function') {
                this.pageLoad({
                    ...this.query,
                    ...this.pageConfig
                }).then(data => {
                    if (data.length > 0) {
                        this.$emit("update:pageList", this.pageList.concat(data))
                        this.pageConfig.page_index++
                            $state.loaded()
                        if (data.length < this.pageConfig.page_size) {
                            $state.complete();
                        }
                    } else {
                        $state.complete();
                    }
                })
            }
            if (this.totalLoad && typeof this.totalLoad === 'function') {
                this.totalLoad(this.query).then(data => {
                    this.$emit("update:total", data)
                })
            }
        }
    },
    watch: {
        query: {
            handler() {
                this.pageConfig.pageIndex = 1
                this.$emit("update:pageList", [])
                this.$refs.infiniteLoading.stateChanger.reset()
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.no-more {
    position: relative;
    text-align: center;
    font-size: 28px;
    color: #999;
    &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 21%;
        display: block;
        width: 48px;
        height: 1PX;
        background-color: #ccc;
    }
    &:after {
        content: '';
        position: absolute;
        top: 50%;
        right: 21%;
        display: block;
        width: 48px;
        height: 1PX;
        background-color: #ccc;
    }
}

.no-results {
    font-size: 30px;
    color: #333;
}
</style>
