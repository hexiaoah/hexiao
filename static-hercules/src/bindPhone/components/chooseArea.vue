<template>
    <div class="go_beyond_area">
        <div class="go_beyond_area_background">
            <div class="content">
                <div class="title">
                    <a class="go_beyond_area_no" @click="cancle">
                        {{ cancleBtnText || '取消'}}
                    </a>

                    <span class="go_beyond_area_title">
                    {{title}}
                </span>
                    <a class="go_beyond_area_yes" @click="ok">
                        {{ okBtnText || '确定'}}
                    </a>
                </div>
                <div class="data">
                    <ul>
                        <li v-for="(item,index) in list" @click="handle(index,item)" :key="index" :class="{'active':selected(index)}">
                            {{item.name || ''}} {{item.value || ''}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            item: '',
            current_index: 0
        };
    },
    props: {
        cancleBtnText: {
            type: String,
            default: ''
        },
        okBtnText: {
            type: String,
            default: ''
        },
        list: {
            type: Array,
            default: []
        },
        title: {
            type: String,
            default: ''
        },
        defaultCode: {
            type: String,
            default: ''
        }
    },
    methods: {
        setDate() {
            let self = this;
            for (let i = 0; i < self.list.length; i++) {
                if (self.list[i].value === self.defaultCode) {
                    self.current_index = i;
                    self.item = self.list[i];
                }
            }
        },
        selected(i) {
            return i == this.current_index;
        },
        ok: function() {
            this.$emit('ok', this.item);
        },
        cancle: function() {
            this.setDate();
            this.$emit('cancle');
        },
        handle(index, item) {
            this.current_index = index;
            this.item = item;
        }
    },
    components: {},
    mounted() {
        this.setDate();
    }
};
</script>
<style lang="scss" scoped>
.go_beyond_area {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
}
.go_beyond_area_background {
    position: absolute;
    bottom: 0;
    height: 520px;
    width: 100%;
    display: block;
    overflow: hidden;
    background-color: #fff;
}
.title {
    background: #e3e3e3;
    line-height: 88px;
    padding: 0 30px;
    text-align: center;
    font-size: 32px;
}
.go_beyond_area_no {
    float: left;
    color: #007ae3;
}
.go_beyond_area_yes {
    float: right;
    color: #007ae3;
}
.go_beyond_area_title {
    font-size: 36px;
}
.data {
    height: 432px;
    text-align: center;
    overflow: scroll;
    font-size: 36px;
    ul,
    li {
        list-style: none;
        padding: 0;
    }
}
.active {
    color: #007ae3;
}
</style>
