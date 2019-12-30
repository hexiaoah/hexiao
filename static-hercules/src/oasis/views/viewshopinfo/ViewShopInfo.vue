<template>
  <div class="view-wrapper">
    <shop-base-info
      :isview="isview"
      :base-info="baseInfo"
      :open-type="openType">
    </shop-base-info>
    <shop-address :isview="isview"
                  :area="area">
    </shop-address>
    <shop-img-set></shop-img-set>
    <div class="photo border-t border-b">
      <shop-img-example :open-type="openType"></shop-img-example>
      <shop-photo :isview="isview"
                  :title="'门头照'"
                  :img-src="photos.doorPic"
                  :content="'含完整招牌；门店门口照片清晰可见。'">
      </shop-photo>
      <shop-photo :isview="isview"
                  :title="'收银台'"
                  :img-src="photos.checkoutCounterPic"
                  :content="'含微信支付台牌物料。'">
      </shop-photo>
      <shop-photo :isview="isview"
                  :title="'店内环境照'"
                  :img-src="photos.shopEvnPic"
                  :content="'需可判断具有餐饮营业的环境基础。'">
      </shop-photo>
      <shop-photo :isview="isview"
                  :title="'营业执照'"
                  :img-src="photos.businessLicensePic"
                  :content="'需可判断具有餐饮营业的环境基础'">
      </shop-photo>
      <shop-photo :isview="isview"
                  :img-src="photos.idCardFrontPic"
                  v-if="openType !== 'wechat_payment'"
                  :title="'法人身份证'"
                  :content="'正面'">
      </shop-photo>
      <shop-photo :isview="isview"
                  :img-src="photos.idCardBackPic"
                  v-if="openType !== 'wechat_payment'"
                  :content="'反面'">
      </shop-photo>
      <shop-photo :isview="isview"
                  :img-src="photos.otherPlateformPic"
                  :title="'其他平台图片'"
                  :content="'请上传在任一餐饮平台上（美团、饿了么、口碑、大众点评、百度外卖）的店铺主页图'">
      </shop-photo>
      <shop-photo :isview="isview"
                  v-if="photos.otherCertificationPic1"
                  :img-src="photos.otherCertificationPic1"
                  :title="'其他证明'"
                  :is-can-choose="true"
                  :content="''">
      </shop-photo>
      <shop-photo :isview="isview"
                  v-if="photos.otherCertificationPic2"
                  :title="photos.otherCertificationPic1 ? '' : '其他证明'"
                  :img-src="photos.otherCertificationPic2"
                  :is-can-choose="true"
                  :content="''">
      </shop-photo>
      <shop-photo :isview="isview"
                  v-if="photos.otherCertificationPic3"
                  :title="(photos.otherCertificationPic1 && photos.otherCertificationPic2) ? '' : '其他证明'"
                  :img-src="photos.otherCertificationPic3"
                  :is-can-choose="true"
                  :content="''">
      </shop-photo>
    </div>
  </div>
</template>

<script>
import ShopBaseInfo from 'src/oasis/components/ShopBaseInfo.vue'
import ShopAddress from 'src/oasis/components/ShopAddress.vue'
import ShopImgSet from 'src/oasis/components/ShopImgSet.vue'
import ShopImgExample from 'src/oasis/components/ShopImgExample.vue'
import ShopPhoto from 'src/oasis/components/ShopPhoto.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'ViewShopInfo',
  data() {
    return {
      openType: '',
      isview: true
    }
  },
  created(){
    this.openType = this.$route.query.openType
    this.getApplyInfo({type: this.openType, isview: true})
  },
  computed: {
    ...mapGetters([
      "baseInfo",
      "area",
      "photos"
    ])
  },
  methods: {
    ...mapActions({
      getApplyInfo: 'getApplyInfo'
    })
  },
  components: {
    ShopBaseInfo,
    ShopAddress,
    ShopImgSet,
    ShopImgExample,
    ShopPhoto
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

  .view-wrapper{
    padding: 36px 0 88px;

    .photo{
      background: #FFFFFF;
      margin-bottom: 10px;
    }
  }
</style>

