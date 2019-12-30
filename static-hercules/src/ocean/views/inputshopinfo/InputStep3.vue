<template>
    <div class="">
        <section class="main">
            <h3 class="h3">收款银行卡信息</h3>
            <ul class="input-main border-b border-t">
                <li class="input-list no-input border-b">
                    <span class="title">账户类型</span>
                    <span class="content">{{getAccountType}}</span>
                </li>
                <shop-input :title="'开户人名称'"
                            :input-name="'accountName'"
                            :max-length="'256'"
                            :value="applyInfo.accountName"></shop-input>

                <shop-select :title="'开户银行'"
                             :select-name="'bankName'"
                             :value="applyInfo.bankName"></shop-select>

                <shop-select :title="'开户省份'"
                             :select-name="'bankProvince'"
                             :parent-id="applyInfo.bankCode"
                             :value="applyInfo.bankProvince"></shop-select>

                <shop-select :title="'开户城市'"
                             :select-name="'bankCity'"
                             :parent-id="applyInfo.bankCode+'&&'+applyInfo.bankProvinceId"
                             :value="applyInfo.bankCity"></shop-select>

                <shop-select :title="'开户支行'"
                             :select-name="'bankSubName'"
                             :parent-id="applyInfo.bankCode+'&&'+applyInfo.bankCityId"
                             :value="applyInfo.bankSubName"></shop-select>

                <shop-select :title="'开户人证件类型'"
                             :select-name="'idType'"
                             :value="'身份证'"></shop-select>

                <shop-input :title="'开户人证件号码'"
                            :input-name="'idNumber'"
                            :max-length="'256'"
                            :value="applyInfo.idNumber"></shop-input>


                <li class="input-list photo required">
                    <div class="name">
                        <span class="title">开户人证件照片</span>
                        <span class="content" v-if="!canEdit&&(!applyInfo.idCardFrontPic||!applyInfo.idCardBackPic)">必传</span>
                    </div>

                    <shop-photo :title="'正面'"
                                :img-name="'idCardFrontPic'"
                                :img-src="applyInfo.idCardFrontPic||''"></shop-photo>

                    <shop-photo :title="'反面'"
                                :img-name="'idCardBackPic'"
                                :img-src="applyInfo.idCardBackPic||''"></shop-photo>
                </li>

                <shop-input :title="'收款银行账号'"
                            :input-name="'accountNumber'"
                            :max-length="'32'"
                            :input-type="'number'"
                            :value="applyInfo.accountNumber"></shop-input>

                <shop-input :title="'收款银行账号预留手机'"
                            :input-name="'accountMobile'"
                            :max-length="'20'"
                            :input-type="'number'"
                            :value="applyInfo.accountMobile"></shop-input>

            </ul>
        </section>
        <button class="btn-submit" v-if="viewState!=='detail'" @click="nextStep">保存，并前往下一步</button>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    import {inputIsOk} from 'src/ocean/libs/rules'
    import errorToast from 'src/ocean/libs/errorToast'
    import {getSaveShopInfo} from 'src/ocean/config/api.js'

    export default {
        name: 'third',
        data() {
            return {
                isNextStep:true,
            }
        },
        computed: {
            ...mapState([
                'viewState',
                'applyInfo',
                "saveId",
                "subStatus"
            ]),
            ...mapGetters([
                "applyStepThird",
                'getAccountType'
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
                for (let i = 0, leg = this.applyStepThird.length; i < leg; i++) {
                    let key = this.applyStepThird[i];
                    const ret = inputIsOk(this.applyInfo[key], key);
                    if (!ret.data) {
                        errorToast.show(ret.message);
                        self.isNextStep = true;
                        return false;
                    }
                }
                getSaveShopInfo(JSON.stringify(self.applyInfo),self.saveId).then(data => {
                    self.isNextStep = true;
                    this.$router.push({path: '/input/fourth/fourth'})
                }).catch(e => {
                    self.isNextStep = true;
                    // errorToast.show(e.result.message);
                    console.log(e)
                })
            },
        },

        components: {}

    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
</style>

