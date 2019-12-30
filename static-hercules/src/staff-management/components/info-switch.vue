<template>
    <li class="input-wrapper border-b">
        <div class="input-list" :class="!canEdit?'no-edit':' input-switch'">
            <span class="title">{{title}}</span>
            <span class="content" v-if="canEdit"></span>
            <div :class="['switch__wrapper', { switch_active: getValue, disabled: !select }]">
                <div :class="['circle', { circle_active: getValue }]" @click="changeValue"></div>
            </div>
        </div>
    </li>
</template>

<script>

import {mapState, mapGetters, mapActions} from 'vuex'

    export default {
        name: 'XiaoWeiBaseInfo',
        props: {
            switchName: {
                type: String,
                required: true,
                default: ''
            },
            title: {
                type: String,
                required: true,
                default: false
            },
            value: {
                type: Boolean,
                default: false
            },
            select: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                isChecked: this.value
            }
        },
        computed: {
            canEdit() {
                return true;
            },
            getValue() {
                return this.value
            }
        },
        methods: {
             ...mapActions(['changeExtraAction',]),
            changeValue () {
                if (this.select) {
                    this.isChecked = !this.isChecked;
                }
            }
        },
        watch: {
            isChecked(val) {
                this.changeExtraAction({type: this.switchName, value: val})
            }
        },
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
.switch__wrapper{
    position: relative;
    width: 100px;
    height: 60px;
    background: #F7F7F7;
    border-radius: 36px;
    padding: 1PX 2px;
    position: relative;
    border: 2px solid #E6E6E6;
    box-sizing: border-box;
    margin: auto;

    &.disabled{
      opacity: 0.4;
    }

    &.switch_active{
      border: none;
      padding: 3px;
      background: #4CD964;
    }

    .circle{
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background: white;
      cursor: pointer;
      border: 0 solid #E5E5E5;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,0.50);
      transform: translate3d(0, 0, 0);
      transition: transform .3s;

      &.circle_active{
        transform: translate3d(40px, 0, 0);
      }
    }
  }</style>
