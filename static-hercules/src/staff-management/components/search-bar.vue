<template>
  <form action="" class="goods__search" name='goods_search' @submit.prevent>
    <i class="iconfont icon-search theme-search"></i>
    <input type="search"
           v-model.trim="inputText"
           :class="{ pr_active: inputText.length }"
           autocomplete="off"
           @focus="inputFocus"
           @blur="inputBlur"
           @input="entryFilter"
           @keyup.enter="filterList"
           :placeholder="'请输入权限名称'" />
    <i class="iconfont icon-close_search" v-show="inputText.length" @click="clearSearchText"></i>
  </form>
</template>

<script>
export default {
  name: 'search-bar',
  data () {
    return {
      inputText: ''
    }
  },
  methods: {
    inputFocus () {
      this.$emit('on-focus')
    },
    inputBlur () {
      this.$emit('on-blur')
    },
    clearSearchText () {
      this.inputText = ''
      this.$emit('filter-list')
    },
    filterList (event) {
      event.preventDefault()
      this.$emit('filter-list', this.inputText)
    },
    entryFilter (event) {
      event.preventDefault()
      if (!this.inputText) {
        this.$emit('filter-list', '')
      }
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
  input[type="search"]::-webkit-search-cancel-button {
    display: none;
    -webkit-appearance: none;
  }

  .pr_active{
    padding-right: 80px;
  }

  .goods__search{
    position: relative;
    height: 88px;
    line-height: 88px;
    padding: 14px 20px;
    border-bottom: 1PX solid #E6E6E6;

    i.icon-search{
      position: absolute;
      top: 0;
      left: 40px;
      width: 36px;
      height: 36px;
      font-size: 32px;
    }

    i.icon-close_search{
      position: absolute;
      top: 2px;
      right: 40px;
      width: 36px;
      height: 36px;
      font-size: 32px;
      color: #999;
      z-index: 1;
    }

    input{
      width: 100%;
      height: 60px;
      background: #F2F2F2;
      border-radius: 10px;
      font-size: 30px;
      letter-spacing: 0;
      display: block;
      padding-left: 78px;
      color: #0088FF;
      line-height: 40px;
    }
  }
</style>
