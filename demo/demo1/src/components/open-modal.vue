<!--
    申请模态框  updateBy zeqi@2dfire  2017/10/31
    @props
        show  // 是否显示弹框
    @v-on
        close 关闭窗口
 -->
<template>
    <Modal :value="show" :closable="false" :mask-closable="false" class="modal" width="388px">
        <!-- 商户登录 模块 -->
        <div class="body Mclogin" v-if="data.type=='MClogin'">
            <div class="header">
                  <div> {{pageData.McloginText.title}} </div>
                  <button class="close-btn" @click="handleCancel()"></button>
            </div>
            <p class="notic-info">{{pageData.McloginText.noticInfo}}</p>
            <form class="form_wrap">
                 <Row class="form_item">
                   <Icon type="coffee" class="icon"></Icon>
                    <Select v-model="pageData.Mclogin.kind">
                        <Option value="0" selected="selected">{{pageData.McloginText.dining}}</Option>
                        <Option value="1">{{pageData.McloginText.retail}}</Option>
                    </Select>
                </Row>
                <Row class="form_item">
                    <Icon type="bookmark" class="icon" style="margin:0 18px;font-size:19px;"></Icon>
                    <input type="text" v-model.trim="pageData.Mclogin.number" :placeholder="pageData.McloginText.number" @keydown.enter="McL_handleSubmit" maxlength="20" onkeyup="value=value.replace(/\s/g,'')"></input>
                </Row>
                 <Row class="form_item">
                    <Icon type="person" class="icon"></Icon>
                    <input  type="text" v-model.trim="pageData.Mclogin.username" :placeholder="pageData.McloginText.username" @keydown.enter="McL_handleSubmit" maxlength="20" onkeyup="value=value.replace(/\s/g,'')"></input>
                </Row>
                <Row class="form_item">
                    <Icon type="locked" class="icon"></Icon>
                    <input type="password" v-model.trim="pageData.Mclogin.password"  :placeholder="pageData.CommonText.password" @keydown.enter="McL_handleSubmit" maxlength="20" onkeyup="value=value.replace(/\s/g,'')"></input>
                </Row>
                <div class="errorTip">
                    <span v-show="errorTip">{{errorTip}}</span>
                </div>
                <a class="btn" @click="McL_handleSubmit()">{{pageData.McloginText.loginBtn}}</a>
            </form>
             <div class="footer">
                <span class="authorization">{{pageData.CommonText.authorization}}</span>
                <a class="developer-login" @click="DL_login">{{pageData.McloginText.dlLink}}</a>
            </div> 
        </div>

        <!-- 开发者注册 模块 -->
         <div class="body" v-if="data.type=='DLreg'">
              <div class="header">
                  <div>{{pageData.DLregText.title}} </div>
                  <button class="close-btn" @click="handleCancel()"></button>
            </div>
            <p class="notic-info"></p>
            <form class="form_wrap">
                <Row class="form_item">
                     <Icon type="email"  class="icon" style="margin:0 14px;"></Icon>
                    <input  type="text" v-model.trim="pageData.DLreg.email" :placeholder="pageData.DLregText.email" @keydown.enter="DlR_handleSubmit" maxlength="45" onkeyup="value=value.replace(/\s/g,'')"></input>
                </Row>
                 <Row class="form_item">
                    <Icon type="person" class="icon"></Icon>
                    <input  type="text" v-model.trim="pageData.DLreg.username" :placeholder="pageData.DLregText.username" @keydown.enter="DlR_handleSubmit" maxlength="20" onkeyup="value=value.replace(/\s/g,'')"></input>
                </Row>
                 <Row class="form_item">
                    <Icon type="locked" class="icon"></Icon>
                    <input type="password" v-model.trim="pageData.DLreg.password" :placeholder="pageData.CommonText.password" @keydown.enter="DlR_handleSubmit" maxlength="20" onkeyup="value=value.replace(/\s/g,'')"></input>
                </Row>
                <Row class="form_item">
                    <Icon type="locked" class="icon"></Icon>
                    <input type="password" v-model.trim="pageData.DLreg.repassword" :placeholder="pageData.CommonText.confirmpassword" @keydown.enter="DlR_handleSubmit" maxlength="20" onkeyup="value=value.replace(/\s/g,'')"></input>
                </Row>
                <div class="errorTip">
                    <span v-show="errorTip">{{errorTip}}</span>
                </div>
                <a class="btn" @click="DlR_handleSubmit()">{{pageData.DLregText.dlregBtn}}</a>
            </form>
            <div class="footer" style="border-top:0px;"></div> 
         </div> 

         <!-- 开发者登录 模块 -->
         <div class="body DLlogin" v-if="data.type=='DLlogin'">
              <div class="header">
                  <button class="close-btn" @click="handleCancel()"></button>
            </div>
            <img src="../images/logo-l.png" class="logo1" alt="">
            <p class="title">{{pageData.DLloginText.title}}</p>
            <p class="notic-info"></p>
            <form class="form_wrap">
                 <Row class="form_item">
                    <Icon type="person" class="icon"></Icon>
                    <input  type="text" v-model.trim="pageData.DLlogin.username" :placeholder="pageData.DLloginText.username" @keydown.enter="DlL_handleSubmit" maxlength="20" onkeyup="value=value.replace(/\s/g,'')"></input>
                </Row>
                 <Row class="form_item">
                    <Icon type="locked" class="icon"></Icon>
                    <input type="password" v-model.trim="pageData.DLlogin.password"  :placeholder="pageData.CommonText.password" @keydown.enter="DlL_handleSubmit" maxlength="20" onkeyup="value=value.replace(/\s/g,'')"></input>
                </Row>
                <div class="link">
                    <a @click="Mcloginbtn()" class="left">{{pageData.DLloginText.mcLink}}</a>
                    <div class="right">
                        <a class="dl-login" @click="dl_reg()">{{pageData.DLloginText.dlregBtn}}</a>
                        <i class="line"></i>
                        <a class="forget-psd" @click="forget_psd()">{{pageData.DLloginText.fgpsd}}</a>
                    </div>
                </div>
                <div class="errorTip" style="margin:6px 0 4px;">
                    <span v-show="errorTip">{{errorTip}}</span>
                </div>
                <a class="btn" @click="DlL_handleSubmit()">{{pageData.DLloginText.dlLoginBtn}}</a>
            </form>
            <div class="footer">
                   <span class="authorization">{{pageData.CommonText.authorization}}</span>
            </div> 
         </div> 

          <!-- 忘记密码 模块 -->
         <div class="body forget-psd" v-if="data.type=='Forgetpsd'">
              <div class="header">
                  <div>{{pageData.FGpsdText.title}}</div>
                  <button class="close-btn" @click="handleCancel()"></button>
            </div>
            <p class="notic-info"></p>
            <form class="form_wrap">
                 <Row class="form_item">
                    <Icon type="person" class="icon"></Icon>
                    <input  type="text" v-model.trim="pageData.FGpsd.username" :placeholder="pageData.FGpsdText.username" @keydown.enter="FgP_handleSubmit"  maxlength="20" onkeyup="value=value.replace(/\s/g,'')"></input>
                </Row>
                 <Row class="form_item">
                   <Icon type="email"  class="icon" style="margin:0 14px;"></Icon>
                    <input type="text" v-model.trim="pageData.FGpsd.email"  :placeholder="pageData.FGpsdText.email" @keydown.enter="FgP_handleSubmit" maxlength="45" onkeyup="value=value.replace(/\s/g,'')"></input>
                </Row>
                 <div class="errorTip">
                    <span v-show="errorTip">{{errorTip}}</span>
                </div>
                <a class="btn" @click="FgP_handleSubmit()">{{pageData.FGpsdText.findpsdBtn}}</a>
                <p class="forget-info">{{pageData.FGpsdText.friendInfo}}</p>
            </form>
            <div class="footer">
                   <a class="authorization" @click="had_account()">{{pageData.FGpsdText.hadaccount}}</a>
            </div> 
         </div> 
    </Modal>
</template>

<script>
import { PROJECT_ENV } from "apiConfig";
import Cookie from "@2dfire/utils/cookie";
import Tool from "@/base/tools";
import _i from "@/i18n/index";
import catchError from "@/base/catchError";
import API from "@/config/api";
import Requester from "@/base/requester";
import md5 from "md5";
let pageData = {
  CommonText: {
    authorization: _i("REGLOG.COMMON.AUTHORIZATION"),
    password: _i("REGLOG.COMMON.PASSWORD"),
    confirmpassword: _i("REGLOG.COMMON.CONFIRMPASSWORD")
  },
  McloginText: {
    title: _i("MCLOGIN.TITLE"),
    noticInfo: _i("MCLOGIN.NOTICINFO"),
    dining: _i("MCLOGIN.DINING"),
    retail: _i("MCLOGIN.RETAIL"),
    number: _i("MCLOGIN.NUMBER"),
    username: _i("MCLOGIN.USERNAME"),
    loginBtn: _i("MCLOGIN.LOGINBTN"),
    dlLink: _i("MCLOGIN.DLLINK")
  },
  DLregText: {
    title: _i("DLREG.TITLE"),
    email: _i("DLREG.EMAIL"),
    username: _i("DLREG.USERNAME"),
    dlregBtn: _i("DLREG.DLREGBTN")
  },
  DLloginText: {
    title: _i("DLLOGIN.TITLE"),
    username: _i("DLLOGIN.USERNAME"),
    mcLink: _i("DLLOGIN.MCLINK"),
    dlregBtn: _i("DLLOGIN.DLREGBTN"),
    fgpsd: _i("DLLOGIN.FGPSD"),
    dlLoginBtn: _i("DLLOGIN.DLLOGINBTN")
  },
  FGpsdText: {
    title: _i("FGPSD.TITLE"),
    username: _i("FGPSD.USERNAME"),
    email: _i("FGPSD.EMAIL"),
    findpsdBtn: _i("FGPSD.FINDPSDBTN"),
    friendInfo: _i("FGPSD.FRIENDINFO"),
    hadaccount: _i("FGPSD.HADACCOUNT")
  },

  Mclogin: {
    kind: "0",
    number: "",
    username: "",
    password: ""
  },
  DLreg: {
    email: "",
    username: "",
    password: "",
    repassword: ""
  },
  DLlogin: {
    username: "",
    password: ""
  },
  FGpsd: {
    username: "",
    email: ""
  }
};

export default {
  props: ["data", "show"],
  data() {
    return {
      pageData,
      errorTip: ""
    };
  },
  methods: {
    // 商户登陆
    McL_handleSubmit() {
      if (this.MCL_verify()) {
        let params = {
          entityType: this.pageData.Mclogin.kind,
          entityCode: this.pageData.Mclogin.number,
          username: this.pageData.Mclogin.username,
          password: md5(this.pageData.Mclogin.password.toUpperCase())
        };
        Requester.get(API.MC_LOGIN, { params: params })
          .then(data => {
            this.errorTip = "";
            if (data.userName) {
              Cookie.setItem("userName", data.userName, { domain: PROJECT_ENV });
              Cookie.setItem("userId", data.authId, { domain: PROJECT_ENV });
              Cookie.setItem("token", data.userName);
              Cookie.setItem("authJoinType", data.authJoinType);
              // 冒个泡
              this.$emit("isShow", data);
              this.handleCancel();
              this.$Message.success("登陆成功");
              window.location.reload();
            }
          })
          .catch(e => {
            this.$Message.error(e.result.message);
            // catchError(e);
          });
      }
    },
    // 开发者注册
    DlR_handleSubmit() {
      if (this.DLR_verify()) {
        let params = {
          email: this.pageData.DLreg.email,
          username: this.pageData.DLreg.username,
          password: md5(this.pageData.DLreg.password.toUpperCase())
        };
        Requester.post(API.DL_REG, params, { emulateJSON: true })
          .then(data => {
            this.errorTip = "";
            if (data == true) {
              // 跳转到登录页
              this.$Message.success("注册成功，请登录");
              this.data.type = "DLlogin";
              //  清空登录信息
              this.pageData.DLreg.email = "";
              this.pageData.DLreg.username = "";
              this.pageData.DLreg.password = "";
              this.pageData.DLreg.repassword = "";
            }
          })
          .catch(e => {
            this.$Message.error(e.result.message);
            // catchError(e);
          });
      }
    },

    // 开发者登录
    DlL_handleSubmit() {
      if (this.DLL_verify()) {
        let params = {
          username: this.pageData.DLlogin.username,
          password: md5(this.pageData.DLlogin.password.toUpperCase())
        };
        Requester.get(API.DL_LOGIN, { params: params })
          .then(data => {
            this.errorTip = "";
            if (data.userName) {
              Cookie.setItem("userName", data.userName, { domain: PROJECT_ENV });
              Cookie.setItem("userId", data.authId, { domain: PROJECT_ENV });
              Cookie.setItem("token", data.userName);
              Cookie.setItem("authJoinType", data.authJoinType);
              this.$emit("isShow");
              this.handleCancel();
              this.$Message.success("登陆成功");
              window.location.reload();
            }
          })
          .catch(e => {
            this.$Message.error(e.result.message);
            // catchError(e);
          });
      }
    },

    // 忘记密码
    FgP_handleSubmit() {
      let vm = this;
      if (this.FGP_verify()) {
        Requester.get(API.FG_PASSWORD, { params: this.pageData.FGpsd })
          .then(data => {
            if (data) {
              this.errorTip = "";
              this.pageData.FGpsd.username = "";
              this.pageData.FGpsd.email = "";
              this.$Modal.success({
                title: "温馨提示!",
                content: "密码已发送至邮箱,请及时查看",
                onOk: function() {
                  vm.data.type = "DLlogin";
                }
              });
            }
          })
          .catch(e => {
            this.$Message.error(e.result.message);
          });
      }
    },

    // 商户登陆时验证
    MCL_verify() {
      let nullReg = /\s*\S+/; //匹配输入全为空格
      if (this.pageData.Mclogin.kind == "") {
        this.errorTip = "商家行业不能为空";
        return false;
      }
      if (this.pageData.Mclogin.number == "") {
        this.errorTip = "商家编号不能为空";
        return false;
      } else if (!nullReg.test(this.pageData.Mclogin.number)) {
        this.errorTip = "商家编号不能为空";
        return false;
      }
      if (this.pageData.Mclogin.username == "") {
        this.errorTip = "管理员账号不能为空";
        return false;
      } else if (!nullReg.test(this.pageData.Mclogin.username)) {
        this.errorTip = "管理员账号不能为空";
        return false;
      }
      if (this.pageData.Mclogin.password == "") {
        this.errorTip = "密码不能为空";
        return false;
      } else if (!nullReg.test(this.pageData.Mclogin.password)) {
        this.errorTip = "密码不能为空";
        return false;
      }
      return true;
    },

    // 开发者注册时验证
    DLR_verify() {
      let nullReg = /\s*\S+/; //匹配输入全为空格
      let pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+$/;
      let emailReg = /^([a-zA-Z0-9_\.-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (this.pageData.DLreg.email == "") {
        this.errorTip = "邮箱不能为空";
        return false;
      } else if (!emailReg.test(this.pageData.DLreg.email)) {
        this.errorTip = "邮箱格式不正确";
        return false;
      }
      if (this.pageData.DLreg.username == "") {
        this.errorTip = "账号不能为空";
        return false;
      } else if (!nullReg.test(this.pageData.DLreg.username)) {
        this.errorTip = "账号不能为空";
        return false;
      }
      if (this.pageData.DLreg.password == "") {
        this.errorTip = "密码不能为空";
        return false;
      } else if (!nullReg.test(this.pageData.DLreg.password)) {
        this.errorTip = "密码不能为空";
        return false;
      } else if (!pwdReg.test(this.pageData.DLreg.password)) {
        this.errorTip = "密码格式不正确,请输入数字加字母";
        return false;
      } else if(this.pageData.DLreg.password.length<6){
        this.errorTip = "密码必须包含数字、字母、至少6位";
        return false;
      }
      if (this.pageData.DLreg.repassword == "") {
        this.errorTip = "请重新输入密码";
        return false;
      } else if (
        this.pageData.DLreg.repassword != this.pageData.DLreg.password
      ) {
        this.errorTip = "两次输入的密码不同";
        return false;
      }
      return true;
    },
    // 开发者登录时验证
    DLL_verify() {
      let nullReg = /\s*\S+/; //匹配输入全为空格
      if (this.pageData.DLlogin.username == "") {
        this.errorTip = "账号不能为空";
        return false;
      } else if (!nullReg.test(this.pageData.DLlogin.username)) {
        this.errorTip = "账号不能为空";
        return false;
      }
      if (this.pageData.DLlogin.password == "") {
        this.errorTip = "密码不能为空";
        return false;
      }
      return true;
    },
    // 忘记密码时验证
    FGP_verify() {
      let nullReg = /\s*\S+/; //匹配输入全为空格
      let emailReg = /^([a-zA-Z0-9_\.-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (this.pageData.FGpsd.username == "") {
        this.errorTip = "账号不能为空";
        return false;
      } else if (!nullReg.test(this.pageData.FGpsd.username)) {
        this.errorTip = "账号不能为空";
        return false;
      }
      if (this.pageData.FGpsd.email == "") {
        this.errorTip = "邮箱地址不能为空";
        return false;
      } else if (!nullReg.test(this.pageData.FGpsd.email)) {
        this.errorTip = "邮箱地址不能为空";
        return false;
      } else if (!emailReg.test(this.pageData.FGpsd.email)) {
        this.errorTip = "邮箱格式不正确";
        return false;
      }
      return true;
    },
    // 开发者登录按钮
    DL_login() {
      this.clear();
      this.data.type = "DLlogin";
    },
    // 忘记密码按钮
    forget_psd() {
      this.clear();
      this.data.type = "Forgetpsd";
    },
    // 商家账号登录按钮
    Mcloginbtn() {
      this.clear();
      this.data.type = "MClogin";
    },
    // 开发者注册按钮
    dl_reg() {
      this.clear();
      this.data.type = "DLreg";
    },
    // 已要账号登录按钮
    had_account() {
      this.clear();
      this.data.type = "DLlogin";
    },
    // 关闭按钮
    handleCancel() {
      this.clear();
      this.$emit("close");
    },
    // 清除所有账号信息
    clear() {
      // 清空商户登录信息
      this.pageData.Mclogin.number = "";
      this.pageData.Mclogin.username = "";
      this.pageData.Mclogin.password = "";
      //  清空开发者注册信息
      this.pageData.DLreg.email = "";
      this.pageData.DLreg.username = "";
      this.pageData.DLreg.password = "";
      this.pageData.DLreg.repassword = "";
      //  清空开发者登录信息
      this.pageData.DLlogin.username = "";
      this.pageData.DLlogin.password = "";
      //  清空忘记密码信息
      this.pageData.FGpsd.username = "";
      this.pageData.FGpsd.email = "";
      // 清空提示信息
      this.errorTip = "";
    }
  },
  components: {},
  created() {}
};
</script>
<style lang="scss" scoped>
.modal {
  letter-spacing: 0;
  .header {
    position: absolute;
    top: 0;
    left: -34px;
    width: 388px;
    background: linear-gradient(-180deg, #ffffff 0%, #f5f5f5 85%);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.08);
    text-align: center;
    line-height: 59px;
    font-size: 16px;
    color: #333333;
    .close-btn {
      position: absolute;
      top: 26px;
      right: 25px;
      width: 13px;
      height: 13px;
      background: url("../images/close_btn.png") no-repeat center;
    }
  }
  .body {
    position: relative;
    padding-top: 59px;
    width: 320px;
    margin: 0 auto;
    .notic-info {
      padding-top: 2px;
      height: 38px;
      line-height: 38px;
      font-size: 12px;
      color: #999999;
    }
    .form_wrap {
      .form_item {
        width: 320px;
        height: 42px;
        border: 1px solid #dedede;
        background: #fbfbfb;
        border-radius: 5px;
        margin-bottom: 12px;
        position: relative;
        .icon {
          font-size: 17px;
          color: #d8d8d8;
          margin: 0 15px;
          vertical-align: -3px;
        }
        .icon-close {
          position: absolute;
          right: 10px;
          top: 7px;
          cursor: pointer;
          font-size: 25px;
          color: #e17776;
          background-color: #fff;
        }
        input {
          border-left: 1px solid #dedede;
          box-sizing: border-box;
          padding: 0 12px;
          background: #ffffff;
          width: 271px;
          line-height: 40px;
          height: 40px;
          border-radius: 0 5px 5px 0;
          &::-webkit-input-placeholder {
            color: #999999;
          }
        }
      }
      .errorTip {
        height: 18px;
        text-align: right;
        font-size: 12px;
        color: #c42022;
        margin-bottom: 9px;
      }
    }
    .btn {
      display: block;
      text-align: center;
      line-height: 42px;
      background-image: linear-gradient(-180deg, #de4040 2%, #a42525 99%);
      border-radius: 5px;
      font-size: 14px;
      width: 320px;
      height: 42px;
      color: #ffffff;
    }
    .footer {
      width: 320px;
      height: 52px;
      line-height: 52px;
      margin: 38px auto 0;
      border-top: 1px solid #d9d9d9;
    }
  }
  .Mclogin {
    .footer {
      overflow: hidden;
      .authorization {
        float: left;
        font-size: 12px;
        color: #999999;
      }
      .developer-login {
        float: right;
        font-size: 12px;
        color: #c42022;
      }
    }
  }
  .DLlogin {
    .logo1 {
      display: block;
      width: 65px;
      margin: 6px auto 25px;
    }
    .title {
      text-align: center;
      font-size: 16px;
      color: #333333;
    }
    .link {
      overflow: hidden;
      margin-top: 9px;
      font-size: 12px;
      a {
        color: #c42022;
      }
      .left {
        float: left;
      }
      .right {
        float: right;
        .line {
          margin: 0 7px;
          display: inline-block;
          height: 10px;
          width: 1px;
          background: #dedede;
        }
      }
    }
    .footer {
      margin-top: 25px;
      text-align: center;
      line-height: 52px;
      .authorization {
        float: none;
        color: #999999;
      }
    }
  }
  .forget-psd {
    .forget-info {
      margin-top: 20px;
      padding-bottom: 92px;
      font-size: 12px;
      color: #999999;
    }
    .footer {
      margin-top: 0;
      line-height: 52px;
      text-align: center;
      .authorization {
        float: none;
        color: #c42022;
      }
    }
  }
  .tip {
    margin-top: 10px;
    color: #d83f3f;
  }
}
</style>
