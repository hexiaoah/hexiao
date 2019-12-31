
<template>
    <div>
        <OpenTitle :title="pageText.name"></OpenTitle>
        <div class="wrap pwd">
            <!--修改密码-->
            <div class="wrap-content">
               <div class="title row">{{pageText.base}}</div>
                <div class="row">
                    <div class="left">
                        <OpenLabel :text="pageText.userName" :size="'lg'" :type="1"></OpenLabel>
                    </div>
                    <div class="right">
                         <Input class="form-input" v-model.trim="params.userName"  @on-enter="sure_btn" :maxlength="20"></Input>
                    </div>
                </div>
                <div class="row">
                    <div class="left">
                        <OpenLabel :text="pageText.newPwd" :size="'lg'" :type="1"></OpenLabel>
                    </div>
                    <div class="right">
                         <Input  type="password" v-model.trim="params.newPwd" class="form-input" :placeholder="pageText.inputPlaceholder" :maxlength="20"  @on-enter="sure_btn"></Input>
                    </div>
                </div>
                <div class="row">
                    <div class="left">
                        <OpenLabel :text="pageText.renewPwd" :size="'lg'" :type="1"></OpenLabel>
                    </div>
                    <div class="right">
                         <Input type="password" v-model.trim="params.renewPwd" class="form-input" :placeholder="pageText.inputPlaceholder" :maxlength="20"  @on-enter="sure_btn"></Input>
                    </div>
                </div>
                <div class="row" style="text-align:center;margin-top:20px;">
                    <Button type="primary" @click="sure_btn">{{pageText.sureBtn}}</Button>
                </div> 
            </div>

          
        </div>
    </div>
</template>

<script>
import _i from "@/i18n/index";
import Cookie from "@2dfire/utils/cookie";
import Requester from "@/base/requester";
import catchError from "@/base/catchError";
import API from "@/config/api";
import md5 from "md5";

let pageData = {
  pageText: {
    name: _i("SERVER.PWD.NAME"),
    base: _i("SERVER.PWD.BASE"),
    userName: _i("SERVER.PWD.USERNAME"),
    inputPlaceholder: _i("SERVER.PWD.PLACEHOLDER"),
    newPwd: _i("SERVER.PWD.NEWPWD"),
    renewPwd: _i("SERVER.PWD.RENEWPWD"),
    sureBtn: _i("SERVER.PWD.SUREBTN")
  },
  params: {
    userName: "",
    newPwd: "",
    renewPwd: ""
  },
};

export default {
  data() {
    return pageData;
  },
  components: {
    OpenTitle: require("@/components/open-title.vue"),
    OpenLabel: require("@/components/open-label.vue")
  },
  methods: {
    sure_btn() {
      var vm = this;
      let pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+$/;
      if (this.params.userName == "") {
        this.$Message.warning('用户名不能为空');
        return;
      }
      if (this.params.newPwd == "") {
         this.$Message.warning('密码不能为空');
        return;
      } else if (this.params.newPwd.length < 6) {
         this.$Message.warning('密码长度不够');
        return;
      } else if (!pwdReg.test(this.params.newPwd)) {
         this.$Message.warning('密码格式不正确');
        return false;
      }
      if (this.params.renewPwd == "") {
         this.$Message.warning('请重新输入密码');
        return;
      } else if (this.params.renewPwd != this.params.newPwd) {
         this.$Message.warning('两次输入的密码不同');
        return;
      }
      let params = {
        username: this.params.userName,
        password: md5(this.params.newPwd.toUpperCase())
      };
      Requester.get(API.CHANGE_PWD, {params:params})
        .then(data => {
          if (data) {
             // 清空数据
              Cookie.clear();
              this.$Modal.success({
                  title:"温馨提示!",
                  content: "您的密码已修改成功，请重新登录！",
                  onOk(){
                      window.location.href='index.html'
                  }
              });
             
          }else{
             
          }
        })
        .catch(e => {
           catchError(e);
        });
    }
  },
  created() {},
  mounted() {}
};
</script>


<style lang="scss" scoped="">
.wrap {
  min-width: 490px;
  margin: 0 auto;
  padding: 50px 0;
}
.row {
  margin-bottom: 20px;
}
.wrap-content {
  width: 490px;
  margin: 0 auto;
  .title {
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    padding-bottom: 15px;
    color: #333333;
  }
  .left {
    display: inline-block;
    width: 140px;
    vertical-align: top;
  }
  .right {
    display: inline-block;
    width: 339px;
    .form-input {
      width: 339px;
    }
  }
}
</style>

