<template>
  <div class="input-wrapper">
    <div class="note">提示：申请成功后信息不可修改，请谨慎填写。</div>
    <shop-base-info :isview="isview"
                    :base-info="baseInfo"
                    :open-type="openType">
    </shop-base-info>
    <shop-address :isview="isview"
                  :area="area">
    </shop-address>
    <shop-img-set></shop-img-set>
    <div class="photo border-t border-b">
      <!--<shop-img-example :openType="openType"></shop-img-example>-->
      <shop-photo :isview="isview"
                  :title="'门头照'"
                  :img-name="'doorPic'"
                  :img-src="photos.doorPic"
                  :example-img="'https://assets.2dfire.com/frontend/28fdb5827b38f80dfdae2d1513ecf3c6.jpg'"
                  :content="'含完整招牌；门店门口照片清晰可见。'">
      </shop-photo>
      <shop-photo :isview="isview"
                  :title="'收银台'"
                  :img-name="'checkoutCounterPic'"
                  :img-src="photos.checkoutCounterPic"
                  :example-img="'https://assets.2dfire.com/frontend/d91689928928b07c68e78bf9bb2f47cd.jpg'"
                  :content="'含微信支付台牌物料。'">
      </shop-photo>
      <shop-photo :isview="isview"
                  :title="'店内环境照'"
                  :img-name="'shopEvnPic'"
                  :img-src="photos.shopEvnPic"
                  :example-img="'https://assets.2dfire.com/frontend/0c8d3bba26edfbfda5b8b755e4091cba.jpg'"
                  :content="'需可判断具有餐饮营业的环境基础。'">
      </shop-photo>
      <shop-photo :isview="isview"
                  :title="'营业执照'"
                  :img-name="'businessLicensePic'"
                  :img-src="photos.businessLicensePic"
                  :example-img="'https://assets.2dfire.com/frontend/928b9e9da61275b291bbb96eec6f5107.jpg'"
                  :content="'需可判断具有餐饮营业的环境基础'">
      </shop-photo>
      <shop-photo :isview="isview"
                  :img-name="'idCardFrontPic'"
                  v-if="openType !== 'wechat_payment'"
                  :title="'法人身份证'"
                  :img-src="photos.idCardFrontPic"
                  :example-img="'https://assets.2dfire.com/frontend/24ff0d90b610d240a5ee2088eeee0340.jpg'"
                  :content="'正面'">
      </shop-photo>
      <shop-photo :isview="isview"
                  :img-name="'idCardBackPic'"
                  v-if="openType !== 'wechat_payment'"
                  :img-src="photos.idCardBackPic"
                  :content="'反面'">
      </shop-photo>
      <shop-photo :isview="isview"
                  :img-name="'otherPlateformPic'"
                  :title="'其他平台图片'"
                  :img-src="photos.otherPlateformPic"
                  :example-img="'https://assets.2dfire.com/frontend/556194d4757031c8696d41bfbb5c89fa.jpg'"
                  :content="'请上传在任一餐饮平台上（美团、饿了么、口碑、大众点评、百度外卖）的店铺主页图'">
      </shop-photo>



      <shop-photo :isview="isview"
                  :img-name="'saleWithDoorPic'"
                  :title="'商户门头照的合照'"
                  :img-src="photos.saleWithDoorPic"
                  :example-img="'https://assets.2dfire.com/frontend/3637911461d24b5da25b752389825dd0.jpg'"
                  :content="'地推人员/服务商BD与商户门头照的合照'">
      </shop-photo>
      <shop-photo :isview="isview"
                  :img-name="'saleWithActivityPic'"
                  :title="'微信扫码点餐物料'"
                  :img-src="photos.saleWithActivityPic"
                  :example-img="'https://assets.2dfire.com/frontend/e0500eb6df9ded2c8d6856fcc026e667.jpg'"
                  :content="'请在店铺明显位置张贴，方便消费者领取微信优惠即可'">
      </shop-photo>



      <shop-photo :isview="isview"
                  :img-name="'otherCertificationPic1'"
                  :img-src="photos.otherCertificationPic1"
                  :is-can-choose="true"
                  :title="'其他证明（可上传多张）'"
                  :content="''">
      </shop-photo>
      <shop-photo :isview="isview"
                  :img-name="'otherCertificationPic2'"
                  v-show="photos.otherCertificationPic1"
                  :img-src="photos.otherCertificationPic2"
                  :is-can-choose="true"
                  :content="''">
      </shop-photo>
      <shop-photo :isview="isview"
                  :img-name="'otherCertificationPic3'"
                  v-show="photos.otherCertificationPic1 && photos.otherCertificationPic2"
                  :img-src="photos.otherCertificationPic3"
                  :is-can-choose="true"
                  :content="''">
      </shop-photo>
    </div>
    <a href="javascript:void(0)"
       class="submitapply"
       @click="submitApply">提交申请</a>
    <Toast :title="toast.title"
           :content="toast.content"
           :comfirm-text="toast.comfirmText"
           :isshow="toast.isshow"
           @comfirm="comfirmBtn">
    </Toast>
    <shop-img-example></shop-img-example>
  </div>
</template>

<script>
import ShopBaseInfo from 'src/oasis/components/ShopBaseInfo.vue'
import ShopAddress from 'src/oasis/components/ShopAddress.vue'
import ShopImgSet from 'src/oasis/components/ShopImgSet.vue'
import ShopImgExample from 'src/oasis/components/ShopImgExample.vue'
import ShopPhoto from 'src/oasis/components/ShopPhoto.vue'
import {oneToFifteen, twoToTen, oneToForty, checkTel} from 'src/oasis/libs/rules.js'
import {mapState, mapGetters, mapActions} from 'vuex'
import {submitShopInfo} from 'src/oasis/config/api'
import {fixedBody, looseBody} from 'base/utils/unit.js'
import errorToast from 'src/oasis/libs/errorToast'
export default {
  name: 'InputShopInfo',
  data() {
    return {
      openType: '',
      isview: false,
      toast: {
        title: '提示',
        content: '',
        comfirmText: '我知道了',
        isshow: false
      }
    }
  },
  computed: {
    ...mapState([
      'shopInfo',
      'isHideDistrict'
    ]),
    ...mapGetters([
      "baseInfo",
      "area",
      "photos"
    ])
  },
  created(){
    this.openType = this.$route.query.openType
    this.getApplyInfo({type: this.openType, isview: false})
  },
  methods: {
    ...mapActions([
      'getApplyInfo'
    ]),
    comfirmBtn(){
      this.toast.isshow = false
      looseBody()
    },
    submitApply(){
      let { shopName, shopCode, businessLicenseName, creditCode, contactName, contactMobile, wechatMerId,
            contactEmail, otherPlateformName, provinceName, provinceId, cityName, cityId,
            streetName, streetId, townName, townId, detailAddress, doorPic, checkoutCounterPic, shopEvnPic,
            businessLicensePic, idCardFrontPic, idCardBackPic, otherPlateformPic, otherCertificationPic1, otherCertificationPic2, otherCertificationPic3,
          saleWithDoorPic,saleWithActivityPic
      } = this.shopInfo

      let filterA = Boolean(contactName) && (contactName.length >= 2 || contactName.length <= 10) // 联系人
      let filterB = checkTel.test(contactMobile) //手机
      let filterC = Boolean(contactEmail) && (contactEmail.length >= 1 || contactEmail.length) <= 40// 邮箱
      let filterD = Boolean(otherPlateformName) && (otherPlateformName.length >= 1 || otherPlateformName.length <= 40) // 其他平台名
      let filterE = Boolean(detailAddress) && (detailAddress.length >= 1 || detailAddress.length <= 40) // 详细地址
      let filterF = Boolean(provinceName) && provinceName.length > 0 // 省
      let filterG = Boolean(cityName) && cityName.length > 0 // 市
      let filterH = this.isHideDistrict || (Boolean(townName) && townName.length > 0)// 区县
      let filterI = Boolean(creditCode) && (creditCode.length >= 2 || creditCode.length <= 40)
      let filterJ = Boolean(doorPic) && doorPic.length > 0 // 门头照片
      let filterK = Boolean(checkoutCounterPic) && checkoutCounterPic.length > 0 // 收银台
      let filterL = Boolean(shopEvnPic) && shopEvnPic.length > 0 // 店内照
      let filterM = Boolean(businessLicensePic) && businessLicensePic.length > 0 //营业执照
      let filterN = Boolean(idCardFrontPic) && idCardFrontPic.length > 0 // 正面
      let filterO = Boolean(idCardBackPic) && idCardBackPic.length > 0 // 负面
      let filterP = Boolean(otherPlateformPic) && otherPlateformPic.length > 0 // 其他平台照片
      let filterQ = Boolean(businessLicenseName) && businessLicenseName.length > 0 // 营业执照名称
      let filterR = Boolean(saleWithDoorPic) && saleWithDoorPic.length > 0  // 商户门头照的合照
      let filterS = Boolean(saleWithActivityPic) && saleWithActivityPic.length > 0 // 商户摇摇乐活动合照
      // 直联
      if(this.openType === 'wechat_payment'){
        let obj = [
          {
            isTrue: filterD,
            content: '其他平台店名不能为空'
          },
          {
            isTrue: filterF,
            content: '省不能为空'
          },
          {
            isTrue: filterG,
            content: '市不能为空'
          },
          {
            isTrue: filterH,
            content: '区县不能为空'
          },
          {
            isTrue: filterE,
            content: '详细地址不能为空'
          },
          {
            isTrue: filterJ,
            content: '门头照不能为空'
          },
          {
            isTrue: filterK,
            content: '收银台照片不能为空'
          },
          {
            isTrue: filterL,
            content: '店内环境照不能为空'
          },
          {
            isTrue: filterM,
            content: '营业执照不能为空'
          },
          {
            isTrue: filterP,
            content: '其他平台照片不能为空'
          },
            {
                isTrue: filterR,
                content: '商户门头照的合照不能为空'
            },
            {
                isTrue: filterS,
                content: '微信扫码点餐物料不能为空'
            }
        ]
        for(let i=0; i<obj.length; i++){
          if(obj[i].isTrue === false){
            fixedBody()
            this.toast.content = obj[i]['content']
            this.toast.isshow = true
            return
          }
        }
        this.submitShopInfo(JSON.stringify(this.shopInfo), this.openType)
      }
      else{
        let obj = [
          {
            isTrue: filterQ,
            content: '营业执照名称不能为空！'
          },
          {
            isTrue: filterI,
            content: '统一社会信用代码不能为空！'
          },
          {
            isTrue: filterA,
            content: '联系人不能为空'
          },
          {
            isTrue: filterB,
            content: '联系人手机填写有误！'
          },
          {
            isTrue: filterC,
            content: '联系人邮箱有误！'
          },
          {
            isTrue: filterD,
            content: '其他平台店名不能为空'
          },
          {
            isTrue: filterF,
            content: '省不能为空'
          },
          {
            isTrue: filterG,
            content: '市不能为空'
          },
          {
            isTrue: filterH,
            content: '区县不能为空'
          },
          {
            isTrue: filterE,
            content: '详细地址不能为空'
          },
          {
            isTrue: filterJ,
            content: '门头照不能为空'
          },
          {
            isTrue: filterK,
            content: '收银台照片不能为空'
          },
          {
            isTrue: filterL,
            content: '店内环境照不能为空'
          },
          {
            isTrue: filterM,
            content: '营业执照不能为空'
          },
          {
            isTrue: filterN,
            content: '法人身份证正面不能为空'
          },
          {
            isTrue: filterO,
            content: '法人身份证反面不能为空'
          },
          {
            isTrue: filterP,
            content: '其他平台照片不能为空'
          },
            {
                isTrue: filterR,
                content: '商户门头照的合照不能为空'
            },
            {
                isTrue: filterS,
                content: '微信扫码点餐物料不能为空'
            }
        ]
        for(let i=0; i<obj.length; i++){
          if(obj[i].isTrue === false){
            fixedBody()
            this.toast.content = obj[i]['content']
            this.toast.isshow = true
            return
          }
        }
        this.submitShopInfo(JSON.stringify(this.shopInfo), this.openType)
      }
    },
    submitShopInfo(a, b){
      submitShopInfo(a, b)
        .then(data => {
          localStorage.removeItem('baseInfo')
          localStorage.removeItem('area')
          localStorage.removeItem('photos')
          this.$router.push({
            path: '/entrance'
          })
        })
        .catch(e => {
          // errorToast.show(e.result.message)
          console.log(e)
        })
    }
  },
  components: {
    ShopBaseInfo,
    ShopAddress,
    ShopImgSet,
    ShopImgExample,
    ShopPhoto
  },
  beforeRouteLeave(to, from, next){
    let baseInfo = JSON.stringify(this.baseInfo)
    let area = JSON.stringify(this.area)
    let photos = JSON.stringify(this.photos)
    localStorage.removeItem('baseInfo')
    localStorage.removeItem('area')
    localStorage.removeItem('photos')
    localStorage.setItem("baseInfo", baseInfo)
    localStorage.setItem("area", area)
    localStorage.setItem("photos", photos)
    next()
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

  .input-wrapper{
    padding: 10px 0 88px;

    .note{
      padding-left: 15px;
      font-size: 13PX;
      color: #FF0033;
      letter-spacing: 0;
      margin-bottom: 36px;
    }

    .photo{
      background: #FFFFFF;
      margin-bottom: 10px;
    }

    .submitapply{
      width: 300px;
      height: 44px;
      background: #0088FF;
      border-radius: 6px;
      font-size: 15PX;
      color: #FFFFFF;
      line-height: 44px;
      margin: auto;
      text-align: center;
      display: block;
      margin-top: 36px;
    }
  }
</style>

