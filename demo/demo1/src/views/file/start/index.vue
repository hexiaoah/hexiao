<template>
  <div>
        <Crumb></Crumb>
        <div class="start">
          <h3 class="flow-chart">{{flowChart}}</h3>
          <ul class="flow">
            <li v-for='list in listInfo'>
              <p>{{list}}</p>
              <img src="../../../images/new-1.png" alt="">
            </li>
          </ul>
          <p class="title">
            {{enterDev}}
          </p>
          <p class="content" v-for='list in listDev'> 
            {{list}}
          </p>
          <img src="../../../images/new-4.png" alt="">
          <img src="../../../images/new-3.png" alt="">
          <p class="content">{{devWord}}</p>

          <p class="title">
            {{verfy}}
          </p>
          <p class="content"> 
            {{verfySub}}
          </p>
          <img src="../../../images/new-2.png" alt="">
          <img src="../../../images/new-9.png" alt="">
          <p class="content"> 
            {{verfyDev}}
          </p>
          <img src="../../../images/new-6.png" alt="">
          <p class="title">
            {{createApp}}
          </p>
          <p class="content"> 
            {{appDetail}}
          </p>
          <img src="../../../images/new-5.png" alt="">
          <img src="../../../images/new-7.png" alt="">

           <p class="title">
            {{devAudit}}
          </p>
          <p class="content"> 
            {{auditDetail}}
          </p>

          <p class="title">
            {{shopAceeredit}}
          </p>
          <p class="content"> 
            {{accreditDetail}}
          </p>
          <img src="../../../images/new-8.png" alt="">

          <p class="title">
            {{devDebug}}
          </p>
          <a href="http://open.2dfire.com/doc/" class="content" style="color: #1AA2F8;">
          {{debugApi}}
          </a>
          <p class="content">
            {{debugUse}}
          </p>
          <img src="../../../images/new-12.png" alt="">
          <p class="content">
            {{debugUrl}}
          </p>
          <img src="../../../images/new-11.png" alt="">

          <p class="title">
            {{troShoot}}
          </p>
          <p class="content"> 
            {{faq}}
          </p>
          <img src="../../../images/new-10.png" alt="">
        </div>
  </div>
</template>

<script>
    import _i from "@/i18n/index";

    let pageData = {
        flowChart:_i('FILE.START.FLOW.CHART'),
        listInfo:{
                developer:_i('FILE.START.FIRST'),
                approve:_i('FILE.START.SECOND'),
                apply:_i('FILE.START.THIRD'),
                audit:_i('FILE.START.FOURTH'),
                accredit:_i('FILE.START.FIFTH'),
        },

        enterDev:_i('FILE.START.LIST.FIRST'),
        listDev:{
               devTitle:_i('FILE.START.FIRST.TITLE'),
               devOne:_i('FILE.START.FIRST.ONE'),
               devTwo:_i('FILE.START.FIRST.TWO'),
               devFlow:_i('FILE.START.REG.FLOW'),
               devUrl:_i('FILE.START.OPEN.URL'),
               devePwd:_i('FILE.START.REG.PWD'),
        },
        devWord:_i('FILE.START.LOOK.WORD'),

        verfy:_i('FILE.START.LIST.SECOND'),
        verfySub:_i('FILE.START.SECOND.ONE'),
        verfyDev:_i('FILE.START.SECOND.TWO'),

        createApp:_i('FILE.START.LIST.THIRD'),
        appDetail:_i('FILE.START.THIRD.TITLE'),
        
        devAudit:_i('FILE.START.LIST.FOURTH'),
        auditDetail:_i('FILE.START.FOURTH.TITLE'),

        shopAceeredit:_i('FILE.START.LIST.FIFTH'),
        accreditDetail:_i('FILE.START.FIFTH.TITLE'),

        devDebug:_i('FILE.START.LIST.SIXTH'),
        debugApi:_i('FILE.START.SIXTH.ONE'),
        debugUse:_i('FILE.START.SIXTH.TWO'),
        debugUrl:_i('FILE.START.SIXTH.THREE'),

        troShoot:_i('FILE.START.LIST.SEVENTH'),
        faq:_i('FILE.START.SEVENTH.TITLE'),


    };
    export default {
        data() {
            return pageData;
        },
        components: {
            Crumb: require("@/components/crumb.vue"),
        },
        methods: {
        },
        created() {
           
    }
    }
</script>


<style lang="scss" scoped="">
.start{
  width: 100%;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  max-width: 1270px;
  min-width: 820px;
  padding-bottom: 60px;
  img{
    width: 100%;
    margin:5px 0;
  }

}
.flow-chart{
  color: #333333;
  margin: 20px 0 15px 0;
}
.flow{
  overflow: hidden;
}
.flow li{
  float: left;
  width: 20%;
  position: relative;
  text-align: center;

  p{
    position: absolute;
    left:0;
    right:0;
    color: #FFFFFF;
    bottom:0;
    top:0;
    height: 30px;
    margin:auto;
  }
}
.flow li img{
  width: 100%;
}
.title{
  margin-top: 20px;
  font-weight: bold;
}
.content{
  font-size: 14px;
  color: #333333;
  line-height: 30px;
}
</style>
