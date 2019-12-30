<template>
    <transition name="slide-fade">
        <div class="toast" v-if="show">
            <p class="text">{{text}}</p>
        </div>
    </transition>
</template>

<script>
/**
 *
 * @param res
 * @author
 *
 */
export default {
  name: 'toast',
  props: {
    text: {
      type: String,
      default: 'toast'
    },
    show: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 2500
    }
  },
  data() {
    return {
      timeout: ''
    }
  },
  methods: {
    start() {
      if (this.timeout) this.clear()
      this.timeout = setTimeout(() => {
        this.close()
      }, this.duration)
    },
    close() {
      this.show = false
      this.clear()
    },
    clear() {
      clearTimeout(this.timeout)
      this.timeout = ''
    }
  },
  mounted() {
    window.addEventListener('hashchange', this.close)
  },
  beforeDestroy() {
    window.removeEventListener('hashchange', this.close)
  }
}
</script>

<style lang="scss" scoped>
    .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 190px;
        padding: 12px 18px;
        border-radius: 10px;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, .7);
        color: #fff;
        text-align: center;
        z-index: 1000;
        font-size: 14px;
        p {
            margin: 0;
            padding: 0;
        }
    }

    .slide-fade-enter-active {
        transition: all .3s ease-in;
    }

    .slide-fade-leave-active {
        transition: all .3s ease-out;
    }

    .slide-fade-enter, .slide-fade-leave-to {
        opacity: 0;
    }
</style>
