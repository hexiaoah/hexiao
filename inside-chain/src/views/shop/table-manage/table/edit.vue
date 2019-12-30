<template>
    <div>
        <crumbBar>
            <Crumb second="编辑桌位"></Crumb>
        </crumbBar>
        <div class="content">
            <TableBase :info="params" @on-save="save"></TableBase>
        </div>
    </div>
</template>
<script>
    // 组件引入
    import TableBase from '../components/table-base'
    import crumbBar from '@/components/layout/crumb-bar'
    import Crumb from "../components/crumb";
    import API from "@/config/api_table"

    import shopModule from "@/store/modules/shop/index"

    let params = {
        area: '',
        name: '',
        number: 0,
        type: '',
        code: '',
        lastVer: '',
        sortCode: ''
    }

    export default {
        data() {
            return {
                params,
                seatId: ''
            }
        },
        methods: {
            async save(form){
            //    updateSeat
                let self = this;
                let seat_params = {
                    id: self.seatId,
                    areaId: form.area,
                    name: form.name,
                    code: form.code,
                    adviseNum: form.number,
                    seatKind: form.type,
                    // 后端需要的参数
                    lastVer: self.params.lastVer,
                    sortCode: self.params.sortCode
                }
                const {success} = await API.updateSeat({
                    req: JSON.stringify(seat_params)
                })

                if (success) {
                    self.$Message.success('修改成功')
                    const entityId = self.$route.query.entityId
                    self.$router.push({
                        path: '/shop_table_manage',
                        query: {
                            entityId
                        }
                    })
                }
            },
            async getSeatDetail(){
                let self = this;
                const {success, data} = await API.getSeatDetail({
                    seat_id: self.seatId
                })
                if(success) {
                    self.params = {
                        area: data.areaId,
                        name: data.name,
                        number: data.adviseNum.toString(),
                        type: data.seatKind.toString(),
                        code: data.code,
                        lastVer: data.lastVer,
                        sortCode: data.sortCode
                    }
                }
            },
            initEditPage() {
                let self = this;
                self.seatId = self.$route.query.id
                self.getSeatDetail()
            }

        },
        created() {
            let self = this;
            self.$store.dispatch("leftNav/showShopNav", 6);

            // 设置当前桌位id & 获取当前桌位信息
            self.initEditPage()
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
