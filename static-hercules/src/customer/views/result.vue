<template>
  <div class="dingding">
    <div class="result">
      <textarea placeholder="必填项" class="dd_textarea" v-model="content" maxlength="100"></textarea>
      <div class="tips">{{tips}}</div>
      <div class="confirm" @click="ok">确认</div>
    </div>
  </div>
</template>

<script>
const DFRouter = require("@2dfire/utils/router");
import API from '../config/api';
export default {
  name: 'result',
  data(){
    return{
      content:'',
      tips:'提示:在上面输入框内填写具体的维护结果'
    }
  },
  created(){
    var that=this;
    API.getQueryLastRecord({dingId:DFRouter.route.query["dingId"]}).then((res)=>{
      if(res.success){
        if(res.model.detail){
          that.content=res.model.detail
        }
      }
    })
  },
  methods:{
    ok(){
      if(this.content==""){
        this.tips='巡店结果不能为空'
      }else {
        const params={
          uuid:encodeURIComponent(DFRouter.route.query["uuid"]) || '',
          dingId:DFRouter.route.query["dingId"] || '',
          entityId:encodeURIComponent(DFRouter.route.query["eid"]) || '',
          kind:2,
          detail:this.content
        }
        API.staffAttendance(params).then((res)=>{
          this.$router.push({path:'/index/result/cardResult',query:{successFalg:res.success,msg:res.message}})
        })
      }
    }
  }
}
</script>

<style scoped>
  .dingding{
    position: fixed;
    top:0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }
  .result{
    width: 690px;
    margin: 0 auto;
    margin-top: 30px;
  }
  .dd_textarea{
    width: 690px;
    height: 312px;
    border-radius: 6px;
    border-color: #D9D9D9;
    color: #666666;
    padding: 10px;
  }
  .tips{
    font-size: 24px;
    color: #E62424;
  }
  .confirm{
    margin-top: 30px;
    width: 690px;
    height: 76px;
    border-radius: 6px;
    background-color: #0088FF;
    border: none;
    color: #fff;
    line-height: 76px;
    text-align: center;
    font-size: 28px;
  }
  textarea:focus{
    outline: none;
  }
</style>