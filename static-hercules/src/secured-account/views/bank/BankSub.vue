<template>
    <div class="bank-sub-wrapper">
        <div class="search">
            <input type="search" placeholder="请输入支行关键词" @input="getBankSubFilter($event)"/>
        </div>
        <div class="label-wrapper">
            <label class="label" v-for="key in newBankSubList" :key="key.subBankNo">
                <span class="input-wrapper">
                    <input type="radio" name="bankList"
                           :value="key.subBankName"
                           v-model='checkBankSub'
                           @change="bankClick(key.subBankNo)"/>
                        <i class="icon"></i>
                    </span>
                <span class="bank">{{key.subBankName}}</span>
            </label>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    import API from 'src/secured-account/config/api.js'

    export default {
        name: 'BankSub',
        props: {},
        data() {
            return {
                bankList: [],
                checkBankSub: '',
                search: ''
            }
        },
        computed: {
            ...mapGetters([
                'bankSub',
                'getAccountSubBank'
            ]),
            newBankSubList() {
                let self = this;
                if (!this.search) {
                    return this.bankList
                } else {
                    return this.bankList.filter(val => !!val.subBankName.match(self.search))
                }
            }
        },
        created() {//subBankName subBankNo
            let self = this;
            this.checkBankSub = this.getAccountSubBank || ''
            API.getSubBanks({
                bankName:self.bankSub.bankCode,
                cityNo:self.bankSub.bankCityId
            }).then(data => {
                self.bankList = data;
            }).catch(e => {
                console.log(e)
            })
        },
        methods: {
            ...mapActions([
                "modifyInputInfo"
            ]),
            getBankSubFilter($event) {
                this.search = $event.target.value;
            },
            bankClick(id) {
                this.modifyInputInfo({type: 'accountSubBank', value: this.checkBankSub});
                this.modifyInputInfo({type: 'accountSubBankCode', value: id});
                window.history.go(-1)
                // this.$router.replace({
                //     path: '/input/third/third', query: {
                //         type: 'noRefresh'
                //     }
                // })
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    input::-webkit-input-placeholder {
        text-align: center;
        color: #999;
    }

    input::-moz-placeholder {
        text-align: center;
        color: #999;
    }

    input:-ms-input-placeholder {
        text-align: center;
        color: #999;
    }

    .bank-sub-wrapper {
        .search {
            /*position: fixed;*/
            /*top: 0;*/
            /*left: 0;*/
            /*right: 0;*/
            height: 44PX;
            background: #dfe0e5;
            padding: 6PX 10PX;
            z-index: 1;
            input {
                outline: 0;
                display: block;
                width: 100%;
                height: 30PX;
                line-height: 30PX;
                border: 0;
                border-radius: 4PX;
                text-align: center;
            }
        }
        .label-wrapper {
            background: white;
            /*margin-top: 44PX;*/
            border-bottom: 1px solid #e5e4e4;
            .label {
                display: block;
                line-height: 44PX;
                font-size: 16PX;
                position: relative;
            }
            .input-wrapper {
                width: 50PX;
                position: absolute;
                left: 0;
                top: 0;
                .icon {
                    display: inline-block;
                    vertical-align: middle;
                    margin-top: -3PX;
                    width: 50PX;
                    height: 44PX;
                    background: url("https://assets.2dfire.com/frontend/98b1ffb4e490cf765122e9c4382f1a26.png") no-repeat center;
                    background-size: 20PX;
                    transition: .2s;
                }
                input {
                    position: absolute;
                    opacity: 0;
                    width: 0;
                    &:checked + i.icon {
                        background: url("https://assets.2dfire.com/frontend/c1418b70b132bf3e72f1c787ed6f3eeb.png") no-repeat center;
                        background-size: 20PX;
                    }
                }

            }
            .bank {
                display: block;
                margin-left: 50PX;
                line-height: 20PX;
                padding: 12PX 15PX 12PX 0;
                border-bottom: 1px solid #e5e4e4;
            }
            .label:last-child .bank {
                border-bottom: 0;
            }

        }
    }
</style>
