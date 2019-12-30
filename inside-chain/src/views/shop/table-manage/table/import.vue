<template>
    <div>
        <crumbBar>
            <Crumb second="桌位批量导入"></Crumb>
        </crumbBar>
        <div class="content">
            <BaseCard>
                <Button type="ghost" class="v-top" @click="downDemo">下载空白模板</Button>
                <div class="v-divider v-top"></div>
                <div class="upload-wrap v-top">
                    <ExcelUpload :limit-size="200"
                                 @upload-success="getFileUrl"
                                 @upload-del="delFile"
                    >
                    </ExcelUpload>
                </div>
                <Button type="primary" :loading="loading" @click="commitFile" :disabled="!fileUrl">
                    <span v-if="!loading">导入</span>
                    <span v-else>正在导入</span>
                </Button>

            </BaseCard>
        </div>
    </div>
</template>
<script>
    // 组件引入
    import BaseCard from '@/components/layout/base-card'
    import crumbBar from '@/components/layout/crumb-bar'
    import ExcelUpload from '@/components/upload/excel-upload'
    import Crumb from "../components/crumb";

    import shopModule from "@/store/modules/shop/index"
    import API from "@/config/api_table"

    export default {
        data() {
            return {
                loading: false,
                fileUrl: ''
            }
        },
        methods: {
            getFileUrl(res) {
                let self = this;
                self.fileUrl = res.data
            },
            delFile() {
                let self = this;
                self.fileUrl = ''
            },
            commitFile() {
                let self = this;
                self.loading = true
                self.importSeatExcel()
            },
            async importSeatExcel() {
                let self = this;

                const {success} = await API.importSeatExcel({
                    path: self.fileUrl
                })
                self.loading = false

                if(success){
                    self.$Modal.success({
                        title: '导入信息',
                        content: '文件导入成功',
                        okText: '知道了',
                        onOk: ()=>{
                            self.$router.push({
                                path: '/shop_table_manage',
                                query: self.$route.query
                            })
                        }
                    })
                }
            },
            // 下载空白模板
            async downDemo(){
               const {data} = await API.getStencilUrl()
               window.location.href = data
            }

        },
        created() {
            let self = this;
            self.$store.dispatch("leftNav/showShopNav", 6);
        },
        components: {
            Crumb, crumbBar, BaseCard, ExcelUpload
        },
        beforeCreate() {
//            动态注册module
            let self = this;

            let {shop = {}} = self.$store.state

            if (Object.keys(shop).length <= 0) {
                self.$store.registerModule('shop', shopModule)
            }
        }
    };
</script>
<style lang="scss" scoped>
    .content {
        padding: 30px;
    }

    .v-top {
        vertical-align: top;
    }

    .v-divider {
        display: inline-block;
        font-size: 0;
        width: 1px;
        height: 32px;
        background: #d8d8d8;
        margin: 0 20px;
    }

    .upload-wrap {
        width: 360px;
        display: inline-block;
    }
</style>
