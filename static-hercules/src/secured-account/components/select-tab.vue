<template>
    <div class="select-tab">
        <div class="tab-con" @click="toggleVisible" v-show="!visible" :class="{'selected':tabSelected}">
            {{tabName}}<i class="icon"></i>
        </div>
        <div class="select-con" v-show="visible">
            <p class="title">{{title}}</p>
            <ul class="list">
                <li class="item" v-for="item in list" :class="item.code===selected?'icon-ok':''" :key="item.name" @click="handleClick(item)">
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import MaskLayer from './mask-layer'
import Vue from 'vue'

export default {
  name: 'select-tab',
  props: {
    list: {
      type: Array,
      default: []
    },
    selected: {
      type: [Number, String],
      default() {
        return 0
      }
    },
    title: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      tabName: '',
      tabSelected: false,
      visible: false,
      maskInstance: '',
      wrapEl: '',
      top: 0
    }
  },
  components: { MaskLayer },
  methods: {
    handleClick(item) {
      let data = { ...item }
      this.tabName = data.name
      this.tabSelected = true
      this.$emit('click', data)
      this.$emit('update:selected', data.code)
      this.visible = false
    },
    toggleVisible() {
      this.visible = !this.visible
    },
    handleDocumentClick(e) {
      if (this.$el.contains(e.target) || !this.visible) return
      this.visible = false
    },
    getItemByCode(code) {
      let item = {}
      this.list.map(val => {
        if (val.code.toString() === code) {
          item = { ...val }
        }
      })
      return item
    }
  },
  watch: {
    visible(val) {
      if (val && !this.maskInstance) {
        let constructor = Vue.extend(MaskLayer) //实例化一个Toast
        const el = document.createElement('div')
        this.maskInstance = new constructor({
          el: el
        })
        this.wrapEl = document.getElementsByClassName('router-view')[0]
        this.wrapEl.appendChild(this.maskInstance.$el)
      }
      this.maskInstance.visible = val
    }
  },
  created() {
    let selectedItem = this.getItemByCode(this.selected)
    this.tabName = selectedItem.name || this.title
  },
  mounted() {
    document.addEventListener('click', this.handleDocumentClick)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleDocumentClick)
    if (this.wrapEl) {
      this.wrapEl.removeChild(this.maskInstance.$el)
    }
  }
}
</script>

<style lang="scss" scoped>

    .select-tab {
        height: 100%;
        .tab-con {
            height: 100%;
            .icon {
                display: inline-block;
                width: 20px;
                height: 16px;
                vertical-align: middle;
                margin-left: 10px;
                background: url("https://assets.2dfire.com/frontend/6fb5bc03423e9171e4cb179df7cc3ffc.png") no-repeat;
                background-size: 100%;
            }
            &.selected {
                color: #0088ff;
                .icon {
                    background: url("https://assets.2dfire.com/frontend/80d2ca6242bfc2716b9600e853793de6.png") no-repeat;
                    background-size: 100%;
                }
            }
        }
        .select-con {
            position: absolute;
            left: 0;
            width: 100%;
            background-color: #fff;
            border-top: 1PX solid #ccc;
            padding-left: 30px;
            font-size: 30px;
            text-align: left;
            z-index: 1;
            .title {
                height: 100px;
                line-height: 100px;
                font-weight: bold;
                border-bottom: 1PX solid #ccc;
            }
            .list .item {
                height: 88px;
                line-height: 88px;
                border-bottom: 1PX solid #ccc;
                padding-right: 30px;
                &:last-child {
                    border-bottom: none;
                }
                &.icon-ok p {
                    background: url("https://assets.2dfire.com/frontend/968849d2fd3777820124b0bc6d1b5834.png") no-repeat;
                    background-size: 26px 20px;
                    background-position: right center;
                }
            }
        }
    }
</style>