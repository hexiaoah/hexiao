<template>
  <div :class="['switch__wrapper', { switch_active: getValue, disabled: !select }]">
    <div :class="['circle', { circle_active: getValue }]" @click="changeValue"></div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'base-switch',
  props: {
    select: {
      type: Boolean,
      default: true
    }
  },
  computed: {
      ...mapState([
          'switchControl',
      ]),
      getValue() {
        return this.switchControl.switchValue
      }
  },
  methods: {
    ...mapActions([
        "changeSwitchControl",
        "modifyInputInfo"
    ]),
    changeValue () {
      if(this.select){
        let self = this;
        self.switchControl.switchValue = !self.switchControl.switchValue;
        self.modifyInputInfo({type: self.switchControl.switchName, value: self.switchControl.switchValue});
      }
    }
  },
}
</script>

<style type="text/less" lang="less" scoped>
  .switch__wrapper{
    position: relative;
    width: 100px;
    height: 60px;
    background: #F7F7F7;
    border-radius: 36px;
    padding: 1PX 2px;
    margin-top: 14px;
    position: relative;
    border: 2px solid #E6E6E6;
    box-sizing: border-box;

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
  }


</style>

