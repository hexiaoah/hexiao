<template>
    <div>
        <Form ref="formInline">
            <FormItem :label-width="120" label="营业状态">
                <Select v-model="shop_info.status" style="width:200px">
                    <Option v-for="item in shopStatus" :value="item.id" :key="item.id">{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem v-if="shop_info.status == 2 && false" :label-width="120" label="停业类型">
                <Select v-model="shop_info.closeType" style="width:200px">
                     <Option v-for="item in closeType" :value="item.id" :key="item.id">{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem v-if="shop_info.status == 2 && false" :label-width="120" label="备注">
                <Input v-model="shop_info.notes" type="textarea" :autosize="{minRows: 3,maxRows: 5}" style="width:200px"></Input>
            </FormItem>
        </Form>
    </div>
</template>
<script>
export default {
    data () {
        return {
            shopStatus:[
                {id:1,name:'正常营业'},
                {id:2,name:'停业'}
            ],
            closeType:[
                {id:'1',name:'经营原因'},
                {id:'2',name:'店铺装修'},
                {id:'3',name:'管理整顿'},
                {id:'4',name:'其他'},
            ]
        }
    },
    props:{
        shop_info:{
            type: Object,
            default: ()=>({})
        }
    },
    created(){
        console.log(this.shop_info)
    }
}
</script>
<style lang="scss" scoped>

</style>