<template>
  <div class="address-wrapper">
    <p class="address m-l">店铺地址</p>
    <div class="main border-t border-b">
      <div class="formitem border-b">
        <p class="title">省份</p>
        <div class="relative" v-if="!isview" @click="chooseProvince">
          <p class="mustchoose blue" v-if="area.provinceName">{{area.provinceName}}</p>
          <p class="mustchoose" v-else>必选</p>
        </div>
        <span v-else class="m-r value">{{area.provinceName}}</span>
      </div>
      <div class="formitem border-b">
        <p class="title">城市</p>
        <div class="relative" v-if="!isview" @click="chooseCity">
          <p class="mustchoose blue" v-if="area.cityName">{{area.cityName}}</p>
          <p class="mustchoose" v-else>必选</p>
        </div>
        <span v-else class="m-r value">{{area.cityName}}</span>
      </div>
      <div class="formitem border-b" v-show="!isHideDistrict">
        <p class="title">区县</p>
        <div class="relative" v-if="!isview" @click="chooseTown">
          <p class="mustchoose blue" v-if="area.townName">{{area.townName}}</p>
          <p class="mustchoose" v-else>必选</p>
        </div>
        <span v-else class="m-r value">{{area.townName}}</span>
      </div>
      <div class="formitem">
        <p class="title">详细地址</p>
        <div class="detail-address" v-if="!isview">
          <input class="m-r blue"
                 type="text"
                 placeholder="必填"
                 :value="area.detailAddress"
                 maxlength="40"
                 @focus="showInputClose = true"
                 @blur="showInputClose = false"
                 @input="changeDetailAddress($event)" />
          <i class="closeicon" @click="clearValue" v-show="showInputClose"></i>
        </div>
        <span v-else class="m-r value">{{area.detailAddress}}</span>
      </div>
    </div>
    <mt-picker :slots="pickerSlots"
               showToolbar
               value-key="name"
               :class="['border-f', {active: showPicker}]"
               @change="onValuesChange"
               rotate-effect
               :visible-item-count="3">
      <a href="javascript:void(0)"
         class='cancel'
         @click="closePicker">取消</a>
      <a href="javascript:void(0)"
         class="title">{{pickerTitle}}</a>
      <a href="javascript:void(0)"
         class="choosed"
         @click="choosed">完成</a>
    </mt-picker>
    <div class="mask" v-show="showPicker"></div>
    <Toast :title="toast.title"
           :content="toast.content"
           :comfirm-text="toast.comfirmText"
           :isshow="toast.isshow"
           @comfirm="comfirmBtn">
    </Toast>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import {fixedBody, looseBody} from 'base/utils/unit.js'
export default {
  name: 'ShopAddress',
  props: {
    isview: {
      type: Boolean,
      required: true,
      default: false
    },
    area: {
      type: Object,
      default: {}
    }
  },
  data(){
    return {
      showPicker: false,
      pickerTitle: '',
      showInputClose: false,
      toast: {
        title: '',
        content: '',
        comfirmText: '',
        isshow: false
      }
    }
  },
  computed: {
    ...mapState([
      'pickerSlots',
      'provinceList',
      'pickerChangeValue',
      'isHideDistrict'
    ])
  },
  methods: {
    ...mapActions([
      'getArea',
      'modifyShopInfo',
      'modifyPickerSlot',
      'modifyPickerChangeValue'
    ]),
    chooseProvince(){
      let self = this
      this.pickerTitle = '省份'
      // 如果store有省的数据就不需要区请求了
      if(this.provinceList.length){
        this.modifyPickerSlot({list: this.provinceList, id: this.area.provinceId})
        this.showPicker = true
        fixedBody()
      }
      else{
        this.getArea({sub_area_type: "province", parent_id: '001', id: this.area.provinceId, callback: function(){
          self.showPicker = true
          fixedBody()
        }})
      }
    },
    chooseCity(){
      let self = this
      if(this.area.provinceId){
        this.pickerTitle = '城市'
        this.getArea({sub_area_type: "city", parent_id: this.area.provinceId, id: this.area.cityId, callback: function(){
          self.showPicker = true
          fixedBody()
        }})
      }
      else{
        this.toast = {
          title: '提示',
          content: '省份不能为空',
          comfirmText: '我知道了',
          isshow: true
        }
        fixedBody()
      }
    },
    chooseTown(){
      let self = this
      if(this.area.cityId){
        this.pickerTitle = '区县'
        this.getArea({sub_area_type: "town", parent_id: this.area.cityId, id: this.area.townId, callback: function(){
          self.showPicker = true
          fixedBody()
        }})
      }
      else{
        this.toast = {
          title: '提示',
          content: '城市不能为空',
          comfirmText: '我知道了',
          isshow: true
        }
        fixedBody()
      }
    },
    changeDetailAddress($event){
      this.modifyShopInfo({type: 'detailAddress', value: $event.target.value})
    },
    clearValue(){
      this.modifyShopInfo({type: 'detailAddress', value: ''})
    },
    closePicker(){
      this.showPicker = false
      looseBody()
    },
    choosed(){
      if(this.pickerTitle === '省份'){
        this.modifyShopInfo({type: 'provinceName', value: this.pickerChangeValue.province.name})
        this.modifyShopInfo({type: 'provinceId', value: this.pickerChangeValue.province.id})
        this.modifyShopInfo({type: 'cityName', value: ''})
        this.modifyShopInfo({type: 'cityId', value: ''})
        this.modifyShopInfo({type: 'townName', value: ''})
        this.modifyShopInfo({type: 'townId', value: ''})
        this.modifyPickerChangeValue({type: 'city', value: {}})
        this.modifyPickerChangeValue({type: 'town', value: {}})
      }
      else if(this.pickerTitle === '城市') {
        this.modifyShopInfo({type: 'cityName', value: this.pickerChangeValue.city.name})
        this.modifyShopInfo({type: 'cityId', value: this.pickerChangeValue.city.id})
        this.modifyShopInfo({type: 'townName', value: ''})
        this.modifyShopInfo({type: 'townId', value: ''})
        this.modifyPickerChangeValue({type: 'town', value: {}})
        // 判断市下面是不是街道
        this.getArea({sub_area_type: "town", parent_id: this.pickerChangeValue.city.id, id: this.area.townId})
      }
      else if(this.pickerTitle === '区县'){
        this.modifyShopInfo({type: 'townName', value: this.pickerChangeValue.town.name})
        this.modifyShopInfo({type: 'townId', value: this.pickerChangeValue.town.id})
      }
      this.showPicker = false
      looseBody()
    },
    onValuesChange(picker, values) {
      let arr = [
        {title: '省份', value: 'province'},
        {title: '城市', value: 'city'},
        {title: '区县', value: 'town'}
      ]
      if(values[0] && values[0].name){
        for(let i=0; i<arr.length; i++){
          if(this.pickerTitle === arr[i].title){
            this.modifyPickerChangeValue({type: arr[i].value, value: {name: values[0].name, id: values[0].id}})
            return
          }
        }
      }
    },
    comfirmBtn(){
      this.toast.isshow = false
      looseBody()
    }
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

  input::-webkit-input-placeholder{
    text-align: right;
    font-size: 14PX;
    color: #FF0033;
    letter-spacing: 0;
  }
  input::-moz-placeholder{
    text-align: right;
    font-size: 14PX;
    color: #FF0033;
    letter-spacing: 0;
  }
  input:-ms-input-placeholder{
    text-align: right;
    font-size: 14PX;
    color: #FF0033;
    letter-spacing: 0;
  }

  .address{
    font-size: 15px;
    color: #333333;
    line-height: 20px;
    margin-top: 36px;
    margin-bottom: 10px;
    letter-spacing: 0;
    font-weight: bold;
  }

  .main{

    padding-left: 15px;
    background: #FFFFFF;

    .formitem{
      height: 43px;
      line-height: 43px;
      display: flex;
      justify-content: space-between;
      flex-flow: nowrap row;
      font-size: 15px;

      .title{
        color: #333333;
        letter-spacing: 0;
        height: 43px;
        box-sizing: border-box;
        vertical-align: middle;
      }

      span.value{
        color: #666;
      }

      .mustchoose{
        font-size: 15PX;
        height: 43px;
        color: #FF0033;
        letter-spacing: 0;
        margin-right: 12px;
        flex: 1;
        text-align: right;
        position: relative;
        z-index: 1;

        &:after{
          content: '';
          display: inline-block;
          width: 8px;
          height: 13px;
          background-image: url(https://assets.2dfire.com/frontend/ac8cf450249c33a8aa8cfa19ddd8a977.png);
          background-size: cover;
          margin-left: 10px;
          vertical-align: -1px;
        }
      }

      .detail-address{
        flex: 1;
        margin-right: 15px;
        text-align: right;
        position: relative;
        z-index: 1;

        input{
          width: 80%;
          border: none;
          color: #666666;
          height: 43px;
          background: transparent;
          padding: 0;
          margin-left: 5px;
          letter-spacing: 0;
          text-align: right;
          font-size: 15px;
          box-sizing: border-box;
          margin-top: 0.3px;
          outline: 0;
          margin-right: 0;
        }

        i.closeicon{
          width: 15px;
          height: 15px;
          display: inline-block;
          background-size: cover;
          vertical-align: -3px;
          background-image: url(https://assets.2dfire.com/frontend/cb35d2e0f3e58940fa7ae6e50ff2f7e2.png);
        }
      }
    }
  }

  .picker{
    height: 260px;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: white;
    z-index: 102;
    opacity: 0;
    transform: translateY(260px);
    transition: all 0.4s ease-in-out;

    &.active{
      opacity: 1;
      transform: translateY(0);
    }

    /deep/ .picker-toolbar{
      height: 44px;
      line-height: 44px;
      background: #E1E0E0;
      display: flex;
      justify-content: space-between;
      flex-flow: nowrap row;

      a{
        font-size: 15PX;
        color: #0088FF;
        display: inline-block;
        padding: 0;
      }

      .cancel{
        margin-left: 15px;
        position: relative;
        z-index: 2;
      }

      .title{
        font-size: 15PX;
        color: #333;
      }

      .choosed{
        font-size: 15PX;
        color: #0088FF;
        margin-right: 15px;
        position: relative;
        z-index: 2;
      }
    }

    /deep/ .picker-items{
      height: 216px;

      .picker-slot-wrapper{
        margin-top: 54px;
      }
    }
  }

  .mask{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 4;
  }

  .blue{
    color: #0088FF !important;
  }
</style>
