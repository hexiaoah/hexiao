<template>
    <div class="">
        <section class="main">
            <h3 class="h3">法人信息</h3>
            <ul class="input-main border-b border-t">
                <shop-input :title="'法人姓名'"
                            :input-name="'corporationName'"
                            :max-length="'256'"
                            :value="applyInfo.corporationName"></shop-input>

                <shop-input :title="'联系电话'"
                            :input-name="'corporationLinkTel'"
                            :max-length="'32'"
                            :input-type="'number'"
                            :value="applyInfo.corporationLinkTel"></shop-input>

                <shop-select :title="'证件类型'"
                             :select-name="'certificateType'"
                             :value="'身份证'"></shop-select>

                <shop-input :title="'证件号码'"
                            :input-name="'certificateNum'"
                            :max-length="'32'"
                            :value="applyInfo.certificateNum"></shop-input>

                <li class="input-list photo required">
                    <div class="name">
                        <span class="title">证件照片</span>
                        <span class="content"
                              v-if="!canEdit&&(!applyInfo.certificateFrontPic||!applyInfo.certificateBackPic)">必传</span>
                    </div>
                    <shop-photo :title="'正面'"
                                :img-name="'certificateFrontPic'"
                                :img-src="applyInfo.certificateFrontPic||''"></shop-photo>

                    <shop-photo :title="'反面'"
                                :img-name="'certificateBackPic'"
                                :img-src="applyInfo.certificateBackPic||''"></shop-photo>
                </li>
            </ul>
        </section>


        <section class="main">
            <h3 class="h3">营业执照</h3>
            <ul class="input-main border-b border-t">
                <shop-input :title="'统一社会信用代码'"
                            :input-name="'creditCode'"
                            :max-length="'32'"
                            :value="applyInfo.creditCode"></shop-input>

                <shop-input :title="'营业执照名称'"
                            :input-name="'businessLicenseName'"
                            :max-length="'265'"
                            :value="applyInfo.businessLicenseName"></shop-input>

                <li class="input-list photo required">
                    <div class="name">
                        <span class="title">营业执照</span>
                        <span class="content" v-if="!canEdit&&!applyInfo.businessLicensePic">必传</span>
                    </div>
                    <shop-photo :title="'需可判断具有餐饮营业的环境基础（须为餐饮类营业执照）'"
                                :img-name="'businessLicensePic'"
                                :img-src="applyInfo.businessLicensePic||''"></shop-photo>
                </li>

                <li class="input-list photo required" v-if="getMerchantType==3">
                    <div class="name">
                        <span class="title">开户许可证</span>
                        <span class="content" v-if="!canEdit&&!applyInfo.businessCert">必传</span>
                    </div>
                    <shop-photo :title="''"
                                :img-name="'businessCert'"
                                :img-src="applyInfo.businessCert||''"></shop-photo>
                </li>
                <li class="input-list photo ">
                    <div class="name">
                        <span class="title">其他证明</span>
                        <span class="content" v-if="!canEdit&&!applyInfo.otherCertificationPic">选传</span>
                    </div>
                    <shop-photo :title="''"
                                :img-name="'otherCertificationPic'"
                                :img-src="applyInfo.otherCertificationPic||''"></shop-photo>
                </li>
            </ul>
        </section>
        <button v-if="viewState!=='detail'" class="btn-submit" @click="nextStep">保存，并前往下一步</button>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    import {inputIsOk} from 'src/ocean/libs/rules'
    import errorToast from 'src/ocean/libs/errorToast'
    import {getSaveShopInfo} from 'src/ocean/config/api.js'

    export default {
        name: 'second',
        data() {
            return {
                isNextStep:true,
            }
        },
        computed: {
            ...mapState([
                "viewState",
                "applyInfo",
                "saveId",
                "subStatus"
            ]),
            ...mapGetters([
                "applyStepSecond",
                "getMerchantType"
            ]),
            canEdit(){
                return this.viewState === 'detail' || this.subStatus === 31
            }
        },
        created() {
        },
        methods: {
            ...mapActions([
                'modifyShopInfo'
            ]),
            nextStep() {
                const self = this;
                if (!self.isNextStep) {
                    return false;
                }
                self.isNextStep = false;
                for (let i = 0, leg = this.applyStepSecond.length; i < leg; i++) {
                    let key = this.applyStepSecond[i];
                    const ret = inputIsOk(this.applyInfo[key], key);
                    if (!ret.data) {
                        self.isNextStep = true;
                        errorToast.show(ret.message);
                        return false;
                    }
                }

                if (this.getMerchantType == 3) {
                    if (!this.applyInfo['businessCert']) {
                        errorToast.show('开户许可证不能为空');
                        self.isNextStep = true;
                        return false;
                    }
                }
                getSaveShopInfo(JSON.stringify(self.applyInfo), self.saveId).then(data => {
                    self.isNextStep = true;
                    this.$router.push({path: '/input/third/third'})
                }).catch(e => {
                    self.isNextStep = true;
                    // errorToast.show(e.result.message);
                    console.log(e)
                })
            },
            getPhoto() {
            },
            removeImg() {
            },
        },

        components: {}
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
</style>

