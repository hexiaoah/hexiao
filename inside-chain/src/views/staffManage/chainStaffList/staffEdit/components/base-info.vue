<template>
    <div>
        <FormItem label="员工姓名：" prop="name">
            <Input style="width:220px" type="text" v-model.trim="formInline.name" ></Input>
        </FormItem>
        <FormItem label="手机号码：" prop="mobile">
            <Input style="width:220px" type="text" v-model="formInline.mobile" ></Input>
        </FormItem>
        <FormItem label="性别：" prop='sex'>
            <RadioGroup v-model="formInline.sex">
                <Radio v-for="item in sexList" :label="item.id" :key="item.id">{{item.name}}</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="入职时间：">
            <DatePicker style="width:220px" type="date" placeholder="" v-model="formInline.entryDate"></DatePicker>
        </FormItem>
        <FormItem label="聘用类型：" >
            <Select v-model="formInline.hireType" class="w-200">
                <Option v-for="item in hireTypeOption" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
        </FormItem>
        <FormItem label="身份证号：" prop='idCard'>
            <Input style="width:220px" type="text" v-model="formInline.idCard" ></Input>
        </FormItem>
    </div>
</template>
<script>

const hireTypeOption = [
    {id: 1, name: '正式员工' },
    {id: 2, name: '临时员工' },
    {id: 3, name: '实习员工' },
    {id: 4, name: '外聘员工' },
]
const sexList = [
    {id: '1', name: '男' },
    {id: '2', name: '女' },
]
export default {
    props:{
        formInline:{
            type: Object,
            default: ()=>({})
        }
    },
    data () {
        return {
            hireTypeOption,sexList
        }
    }
}


</script>

