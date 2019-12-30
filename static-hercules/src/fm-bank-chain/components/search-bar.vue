<template>
  <div class="goods__search">
    <div class="input-wrap">
      <i :class="['icon' ,'icon-search',{'icon_left':classLeft}]"></i>
      <input
        type="search"
        v-model.trim="inputText"
        :class="['input',{ pr_active: classLeft }]"
        autocomplete="off"
        @focus="inputFocus"
        @blur="inputBlur"
        @input="entryFilter"
        @keyup.enter="filterList"
        :placeholder="'请输入门店名称'"
      />
      <i v-show="inputText.length" class="icon icon-cancel" @click="clearSearchText"></i>
    </div>
    <span class="cancel" v-show="isCancel" @click="onCancel">取消</span>
  </div>
</template>

<script>
export default {
  name: 'search-bar',
  data() {
    return {
      inputText: '',
      classLeft: false,
      isCancel: false
    }
  },
  methods: {
    inputFocus() {
      this.$emit('on-focus')
      this.classLeft = true
    },
    inputBlur() {
      if (!this.inputText.length) {
        this.classLeft = false
      }
      this.$emit('on-blur')
    },
    onCancel() {
      this.isCancel = false
      this.inputText = ''
      this.classLeft = false
      this.$emit('on-cancel')
    },
    clearSearchText() {
      this.isCancel = true
      this.inputText = ''
    },

    filterList(event) {
      event.preventDefault()
      this.$emit('filter-list', this.inputText)
    },
    entryFilter(event) {
      event.preventDefault()
      if (!this.inputText) {
        this.$emit('on-cancel', '')
        this.isCancel = false
      } else {
        if (!this.isCancel) {
          this.isCancel = true
        }
      }
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
.goods__search {
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 88px;
  line-height: 88px;
  padding: 14px 20px;
  border-bottom: 1px solid #e6e6e6;
  background: rgba(204, 204, 204, 0.5);
  .input-wrap {
    width: 100%;
    position: relative;
    .icon {
      position: absolute;
      top: 0;
      width: 60px;
      height: 60px;
      background-size: cover;
      background-repeat: no-repeat;
    }
    .icon-search {
      left: 210px;
      background-image: url('https://assets.2dfire.com/frontend/9804bfa8fda0c4e4730de9c9e9322aaa.png');
    }
    .icon-cancel {
      right: 0;
      background-image: url('https://assets.2dfire.com/frontend/97d6ad905b4f1bdddc87257267d75011.png');
    }
    input[type='search']::-webkit-search-cancel-button {
      display: none;
      -webkit-appearance: none;
    }

    input::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #ccc;
      font-size: 26px;
    }
    .input {
      width: 100%;
      height: 60px;
      text-align: center;
      flex: 1;
      background: #ffffff;
      border-radius: 10px;
      font-size: 30px;
      letter-spacing: 0;
      display: block;
      color: #0088ff;
      line-height: 40px;
    }
    .pr_active {
      padding: 0 80px;
      text-align: left;
    }
    .icon_left {
      left: 10px;
    }
  }

  .cancel {
    width: 80px;
    font-size: 30px;
    color: #333333;
    text-align: center;
    margin-left: 20px;
    line-height: 60px;
  }
}
</style>
