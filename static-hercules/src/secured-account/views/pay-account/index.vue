<template>
    <div v-show="visible" class="pay-account">
        <div v-if="status == 2 || status == 1">
            <!-- 已绑卡|审核中 -->
            <CardInfo @click="handClick" :list="list"></CardInfo>
        </div>
        <div v-else>
            <!-- 未绑卡 -->
            <Unbound @click='jump'></Unbound> 
        </div>
    </div>
</template>
<script>
import Unbound from './components/unbound';
import CardInfo from './components/card-info';
import { mapGetters, mapActions } from 'vuex'
import Obj from '@2dfire/utils/object'
import API from '../../config/api'

const cardInfo = {
    '1':{
        imgPath:'https://assets.2dfire.com/frontend/668b1df4a3fa35f44c026a1e7049288d.png',
        statusInfo:'绑卡申请审核中',
        mesInfo:['您已提交绑定担保交易渠道专用收款账户的申请，预计1-2个工作日完成审核'],
        btnValue:[
            {name:'撤回申请',type:'revokeBindCardAccount'}
        ],
        mesTitle:'确定撤回',
        mesBody:'撤回绑卡不会保存提交的资料。'
    },
    '2':{ 
        imgPath:'https://assets.2dfire.com/frontend/0592284ad3be81413de6cc6d9d165cd6.png',
        statusInfo:'您已绑定担保交易收款专用银行卡',
        mesInfo:['担保交易渠道资金结算时将结算到您绑定的这一张担保交易收款专用银行卡。'],
        btnValue:[
            {name:'解除绑定',type:'unBindCardAccount'}
        ],
        mesTitle:'确定解绑',
        mesBody:'解绑银行卡不可逆，确认解绑吗？'
    }
}
const backInfo = {
        backName:'',
        backNumber:'',
        accountName:'',
        account:'',
}
export default {
    components:{
        Unbound, CardInfo
    },
    data(){
        return{
            status:'',
            visible: false,
            account:{
                1:'企业对公账户',
                2:'个人对私账户'
            },
            cardInfo,
            backInfo
        }
    },
    computed:{
        ...mapGetters(['clearList']),
        list(){
            return this.status ? { ...this.cardInfo[this.status],backInfo: this.backInfo}:{}
        }
    },
    methods:{
        ...mapActions(['modifyInputInfo']),
        //查询专用收款账户信息
        getBindCardInfo(){
            const entityId = sessionStorage.getItem('entityId')
            API.getBindCardInfo({entityId}).then(data=>{
                if(!Obj.isEmpty(data)){
                    this.status = data.checkStatus
                    this.backInfo.backName = data.accountBank
                    this.backInfo.backNumber = data.bankCardNo
                    this.backInfo.accountName = data.accountName
                    this.backInfo.account = this.account[data.bankAccountProp]
                }
                this.visible =  true
            }).catch(e=>{
                this.visible =  true
                console.log(e)
            })
            
        },
        handClick(type){
            this.type = type
            this.$confirm({
                title: this.cardInfo[this.status].mesTitle,
                content: this.cardInfo[this.status].mesBody,
                confirm: this.confirm
            })
        },
        confirm(){
            const self = this
            const params = {
                entityId: sessionStorage.getItem('entityId')
            }
            API[this.type](params).then(data=>{
                if(data){
                    this.getBindCardInfo()
                }else{
                    self.$toast('操作失败，请再次尝试')
                }
            }).catch(e=>{
                console.log(e)
            })
        },
        jump(path){
            this.clearList.map(item=>{
                this.modifyInputInfo({type: item, value: ''})
            })
            this.$router.push(path)
        }
    },
    created () {
        this.getBindCardInfo()
    }
}
</script>
<style lang="scss" scoped>

</style>