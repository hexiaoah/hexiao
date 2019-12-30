<template>
    <div class="apply-steps-wrap">
        <Shadow :show="show"></Shadow>
        <div class="apply-steps-con" v-show="show">
            <div class="top">
                <h3 class="title ft-15 font-bold">申请流程</h3>
                <i class="icon-x" @click="close()"></i>
            </div>
            <div class="content">
                <ul class="list clearflow">
                    <li class="item left clearflow" v-for="step in steps" :key="step.text">
                        <div class="item-inner left">
                            <img class="img" :src="step.img">
                            <p class="text c-333 ft-13">{{step.text}}</p>
                        </div>
                        <div class="icon-right left"></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Shadow from './shadow'

export default {
  name: 'apply-steps',
  props: ['show'],
  components: {
    Shadow
  },
  data() {
    return {
      flag: false,
      steps: [
        {
          img:
            'https://assets.2dfire.com/frontend/89c03ad7c9766277af87031d6565025b.png',
          text: '在线申请'
        },
        {
          img:
            'https://assets.2dfire.com/frontend/c1fc0a680fa160e567fd7559a5fa4754.png',
          text: '集中审批'
        },
        {
          img:
            'https://assets.2dfire.com/frontend/c4790cf7d2144a5c2a53c78ae456f68a.png',
          text: '统一放款'
        }
      ]
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
    .apply-steps-con {
        position: fixed;
        width: 636px;
        height: 364px;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        background-color: #fff;
        border-radius: 26px;
        z-index: 101;
        .top {
            .title {
                margin: 50px 0;
                text-align: center;
            }
            .icon-x {
                position: absolute;
                top: 18px;
                right: 18px;
                width: 48px;
                height: 48px;
                background: url("https://assets.2dfire.com/frontend/e37aa2b9ad645208b707fbce7c740745.png") no-repeat;
                background-size: 24px 24px;
                background-position: center;
            }
        }
        .content {
            padding: 0 50px;
            .list .item {
                .item-inner {
                    width: 120px;
                    .img {
                        display: block;
                        width: 100%;
                        height: auto;
                    }
                    .text {
                        margin-top: 8px;
                        text-align: center;
                    }
                }
                .icon-right {
                    width: 22px;
                    height: 120px;
                    margin-left: 30px;
                    margin-right: 35px;
                    background: url("https://assets.2dfire.com/frontend/6136e54759c1fe72cd76ebc9a758b5cb.png") no-repeat;
                    background-size: 100%;
                    background-position: center;
                }
                &:last-child .icon-right {
                    display: none;
                }
            }
        }
    }
</style>
