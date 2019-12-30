<template>
    <div>
        <crumbBar>
            <Crumb second="添加桌位"></Crumb>
        </crumbBar>
        <div class="content">
            <TableBase @on-save="save"></TableBase>
        </div>
    </div>
</template>
<script>
    // 组件引入
    import TableBase from '../components/table-base'
    import crumbBar from '@/components/layout/crumb-bar'
    import Crumb from "../components/crumb";

    import shopModule from "@/store/modules/shop/index"
    import API from "@/config/api_table"

    let params = {
        area_id: '',
        name: '',
        number: 0,
        type: '',
        code: ''
    }

    export default {
        data() {
            return {
                params,
            }
        },
        methods: {
            async save(form){
                let self = this;
                console.log('output add', form);
                let seat_params = {
                    areaId: form.area,
                    name: form.name,
                    code: form.code,
                    adviseNum: form.number,
                    seatKind: form.type
                }
                const {success} = await API.addSeat({
                    req: JSON.stringify(seat_params)
                })

                if (success) {
                    self.$Message.success('添加桌位成功')
                    const entityId = self.$route.query.entityId
                    self.$router.push({
                        path: '/shop_table_manage',
                        query: {
                            entityId
                        }
                    })
                }
            }
        },
        created() {
            let self = this;
            self.$store.dispatch("leftNav/showShopNav", 6);
        },
        components: {
            Crumb, crumbBar, TableBase
        },
        beforeCreate() {
//            动态注册module
            let {shop = {}} = this.$store.state

            if (Object.keys(shop).length <= 0) {
                this.$store.registerModule('shop', shopModule)
            }
        }
    };
</script>
<style lang="scss" scoped>
    .content {
        padding: 30px;
    }

</style>
