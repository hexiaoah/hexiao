<template>
    <li class="input-list border-b" :class="!canEdit?'no-edit':''">
        <span class="title">{{title}}</span>
        <span class="content" v-if="canEdit">
        <input placeholder="必填"
               :type="inputType==='number'?'tel':inputType"
               :maxLength="maxLength"
               :value="value"
               @input="changeInput($event)"
               @focus="isCloseShow=true"
               @blur="isCloseShow=false"
        />
    </span>
        <span v-if="canEdit">
        <i class="closeicon" v-show="isCloseShow" @click="clearInput($event)"></i>
    </span>
        <span class="content" v-if="!canEdit">{{value}}</span>
    </li>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'ShopBaseInfo',
        props: {
            inputName: {
                type: String,
                required: true,
                default: false
            },
            title: {
                type: String,
                required: true,
                default: false
            },
            value: {
                type: String,
                required: false,
                default: ''
            },
            inputType: {
                type: String,
                required: false,
                default: 'text'
            },
            maxLength: {
                type: String,
                required: false,
                default: ''
            },
            editSubStatus: {
                required: false,
            }
        },
        data() {
            return {
                isCloseShow: false,//是否显示close
            }
        },
        computed: {
            ...mapState(["viewState", "subStatus"]),
            canEdit() {
                if (this.viewState === 'detail') {
                    return false
                } else if (this.viewState === 'edit') {
                    return true
                } else {
                    if (this.editSubStatus) {
                        return true
                    } else {
                        if (this.subStatus === 31) {
                            return false
                        } else {
                            return true
                        }
                    }
                }
            }
        },
        methods: {
            ...mapActions([
                'modifyShopInfo'
            ]),
            changeInput($event) {
                const self = this;
                self.modifyShopInfo({type: self.inputName, value: $event.target.value})
            },
            clearInput($event) {
                const self = this;
                self.modifyShopInfo({type: self.inputName, value: ''})
                $event.target.parentNode.parentNode.querySelector('input').focus();
            },
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>


</style>
