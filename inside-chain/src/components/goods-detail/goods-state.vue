<template>
    <Form :label-width="215" class="sale-fee">
        <FormItem label="商品上架">
            <i-switch v-model="state" size="default" @on-change="changeGoodsStateVal"></i-switch>
        </FormItem>
    </Form>
</template>

<script>
    import {mapGetters, mapActions} from "vuex"
    export default {
        data() {
            return {
                state: true
            }
        },
        computed: {
            ...mapGetters({
                goodsDetailToBackGoodsState: "setting/goodsDetailToBackGoodsState",
            })
        },
        watch: {
            goodsDetailToBackGoodsState(newval){
                this.state = Boolean(newval)
            }
        },
        methods: {
            ...mapActions({
                _changeGoodsItemVal: 'setting/changeGoodsItemVal'
            }),
            changeGoodsStateVal(val){
                this._changeGoodsItemVal({attr: 'state', val: Number(val)})
            }
        }
    }
</script>
