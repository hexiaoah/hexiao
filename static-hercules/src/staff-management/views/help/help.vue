<template>
    <div class="help-wrapper">
      <div class="help-content-wrapper border-t">
        <div class="help-title">{{helpTitle}}</div>
        <div class="content">{{helpContent}}</div>
        <div class="more-help-title" v-show='moreHelpTitle'>{{moreHelpTitle}}</div>
        <div class="content" v-show="moreHelpContent">{{moreHelpContent}}</div>
      </div>
    </div>
</template>

<script>

  export default {
    data() {
        return {
          helpType: this.$route.query.helpType
        }
    },
    components: {
     
    },
    computed: {
      helpTitle() {
        console.log(this.helpType)
        if(this.helpType === 'staffManage' || this.helpType === '' || this.helpType === undefined) {  // 员工管理，根据类型展示不同的文案信息
          return '员工登录店铺方式，为什么一定要录入员工的手机号码？'
        } else if(this.helpType === 'addStaff') { // 添加员工
          
        } else if(this.helpType === 'rank') {
          return '什么员工的职级和权限？'
        }
      },
      helpContent() {
        if(this.helpType === 'staffManage' || this.helpTitle === '' || this.helpType === undefined) {
          return '登录店铺方式为：掌柜账户统一来绑定所有员工的手机和店铺建立关系（例如钉钉员工模式），这样员工注册后，无须再输入店铺编码用户名密码来，而是直接来到了已绑定的店铺中，' + 
            '马上即可开始工作。一个员工一个手机号，不可多人使用一个账号，分开管理更安全便捷。'
        } else if(this.helpType === 'addStaff') {
        
        } else if(this.helpType === 'rank') {
          return '针对店铺不同员工，可以设计不同职级开放对应的权限。例如，添加一个店长职级，可以添加只允许店长来管理的部分权限。员工权限和职级权限是分开管理的，若仅有员工权限，则只允许编辑员工信息内容，而无法去管理职级。如有职级权限，则可以赋予自己拥有的职级给其他员工。掌柜账户默认有最高权限。'
        }
      },
      moreHelpTitle() {
        if (this.helpType === 'rank') {
          return "什么是默认职级？"
        }
      },
      moreHelpContent() {
        if (this.helpType === 'rank') {
          return '根据店铺的类型，会设定几个默认的职级。例如常用的工种，收银员、店长、财务等。每个职级配置了默认的权限。根据每个店不同情况，也可以相应做调整。'
        }
      }
    }
  }
</script>

<style lang="less" scoped>

  .help-content-wrapper {
    margin-top: 72px;
    background-color: white;
    padding: 30px;
    border-bottom: 1Px solid #e6e6e6;

    .help-title {
      width: 100%;
      font-size: 34px;
      color: #333333;
      font-weight: bold;
    }
    
    .more-help-title {
      margin-top: 30px;
      width: 100%;
      font-size: 34px;
      color: #333333;
      font-weight: bold;
    }

    .content {
      position: relative;
      margin-top: 20px;
      color: #333333;
      font-size: 26px;
    }
  }
    
</style>
