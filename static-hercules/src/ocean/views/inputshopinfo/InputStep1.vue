<template>
    <div class="">
        <section class="main ">
            <h3 class="h3">店铺信息</h3>
            <ul class="input-main border-b border-t">

                <shop-input :title="'店铺名称'"
                            :input-name="'shopName'"
                            :max-length="'50'"
                            :value="applyInfo.shopName"></shop-input>

                <shop-input :title="'店铺简称'"
                            :input-name="'shopSimpleName'"
                            :max-length="'20'"
                            :value="applyInfo.shopSimpleName"
                            :edit-sub-status="true"></shop-input>

                <shop-select :title="'营业模式'"
                             :select-name="'shopKind'"
                             :value="applyInfo.shopKindName"></shop-select>

                <shop-select :title="'商户类型'"
                             :select-name="'merchantType'"
                             :value="merchantTypeName"></shop-select>

                <shop-input :title="'店铺电话'"
                            :input-name="'shopPhone'"
                            :input-type="'tel'"
                            :max-length="'20'"
                            :value="applyInfo.shopPhone"></shop-input>
            </ul>
            <p class="example hint">如需物料，请联系客服获取（4000166588）</p>
        </section>


        <section class="main">
            <h3 class="h3">店铺地址</h3>
            <ul class="input-main  border-b border-t">
                <shop-select :title="'省'"
                             :select-name="'provinceName'"
                             :parent-id="'001'"
                             :value="applyInfo.provinceName"></shop-select>

                <shop-select :title="'市'"
                             :select-name="'cityName'"
                             :parent-id="applyInfo.provinceId"
                             :value="applyInfo.cityName"></shop-select>

                <shop-select :title="'区'"
                             :select-name="'townName'"
                             :parent-id="applyInfo.cityId"
                             :value="applyInfo.townName"></shop-select>

                <shop-input :title="'详细信息'"
                            :input-name="'detailAddress'"
                            :max-length="'128'"
                            :value="applyInfo.detailAddress"></shop-input>
            </ul>
        </section>


        <section class="main">
            <h3 class="h3">联系人信息</h3>
            <ul class="input-main  border-b border-t">
                <shop-input :title="'联系人姓名'"
                            :input-name="'contactName'"
                            :max-length="'256'"
                            :value="applyInfo.contactName"></shop-input>

                <shop-input :title="'联系人手机号'"
                            :input-name="'contactMobile'"
                            :max-length="'20'"
                            :input-type="'tel'"
                            :value="applyInfo.contactMobile"></shop-input>

                <shop-input :title="'邮箱'"
                            :input-name="'contactEmail'"
                            :max-length="'64'"
                            :input-type="'email'"
                            :value="applyInfo.contactEmail"></shop-input>

            </ul>
        </section>
        <button class="btn-submit" @click="nextStep" v-if="viewState!=='detail'">保存，并前往下一步</button>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    import {inputIsOk} from 'src/ocean/libs/rules'
    import errorToast from 'src/ocean/libs/errorToast'
    import {getSaveShopInfo} from 'src/ocean/config/api.js'

    export default {
        name: 'first',
        data() {
            return {
                isNextStep:true,
            }
        },
        computed: {
            ...mapState([
                "viewState",
                "applyInfo",
                "saveId"
            ]),
            ...mapGetters([
                "applyStepFirst",
                "merchantTypeName"
            ])
        },
        created() {
            this.openType = this.$route.query.openType
        },
        methods: {
            ...mapActions([
                'pickerChange'
            ]),
            nextStep() {
                const self = this;
                if (!self.isNextStep) {
                    return false;
                }
                self.isNextStep = false;
                for (let i = 0, leg = this.applyStepFirst.length; i < leg; i++) {
                    let key = this.applyStepFirst[i];
                    const ret = inputIsOk(this.applyInfo[key], key);
                    if (!ret.data) {
                        self.isNextStep = true;
                        errorToast.show(ret.message);
                        return false;
                    }
                }
                getSaveShopInfo(JSON.stringify(self.applyInfo),self.saveId).then(data => {
                    self.isNextStep = true;
                    this.$router.push({path: '/input/second/second'})
                }).catch(e => {
                    self.isNextStep = true;
                    // errorToast.show(e.result.message);
                    console.log(e)
                })
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .example {
        font-size: 13PX;
        color: #999999;
        letter-spacing: 0;
        line-height: 18px;
    }
    .hint{
        padding: 10px 0 0 15px ;
    }
</style>

