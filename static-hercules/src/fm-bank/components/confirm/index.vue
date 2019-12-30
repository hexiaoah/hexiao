<template>
    <section class="confirm">
        <Shadow :visible="visible"></Shadow>
        <div class="container" v-show="visible">
            <div class="title">{{title}}</div>
            <div class="content">{{content}}</div>
            <div class="footer">
                <button class="btn btn-cancel" v-if="type!=='alert'" :style="{width:'50%'}" @click="handleCancel">{{cancelText}}</button>
                <button class="btn btn-confirm" :style="{width:type==='alert'?'100%':'50%'}" @click="handleConfirm">{{confirmText}}</button>
            </div>
        </div>
    </section>
</template>

<script>
import Shadow from '../mask-layer'

export default {
  name: 'confirm',
  components: {
    Shadow
  },
  data() {
    return {
      type: 'alert',
      visible: false,
      title: '',
      content: '',
      confirmText: '',
      cancelText: '',
      confirm: null,
      cancel: null
    }
  },
  methods: {
    handleConfirm() {
      if (this.confirm && typeof this.confirm === 'function') this.confirm()
      this.close()
    },
    handleCancel() {
      if (this.cancel && typeof this.cancel === 'function') this.cancel()
      this.close()
    },
    close() {
      this.visible = false
    }
  },
  mounted() {
    window.addEventListener('hashchange', this.close)
  },
  destroyed() {
    window.removeEventListener('hashchange', this.close)
  }
}
</script>

<style lang="scss" scoped>
    .confirm {
        .container {
            position: fixed;
            top: 50%;
            left: 50%;
            width: 540px;
            transform: translate(-50%, -50%);
            background-color: #fff;
            border-radius: 26px;
            font-size: 30px;
            text-align: center;
            z-index: 1001;
            .title {
                padding: 40px 30px 0;
            }
            .content {
                font-size: 26px;
                min-height: 122px;
                color: #666;
                padding: 30px 30px 20px;
            }
            .footer {
                border-top: 1PX solid #ddd;
                overflow: hidden;
                .btn {
                    float: left;
                    display: inline-block;
                    height: 88px;
                    line-height: 100%;
                    color: #0088FF;
                    font-size: inherit;
                    cursor: pointer;
                    background-color: transparent;
                    border: none;
                    padding: 0;
                }
                .btn-cancel {
                    border-right: 1PX solid #C8C7CC;
                }
            }
        }
    }

</style>
