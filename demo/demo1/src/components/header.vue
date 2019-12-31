<template>
    <div class="header" id="header">
        <nav>
            <div class="nav-bar">
                <div class="fl-left logo"></div>
                <div class="fl-left platform">
                    {{platformName}}
                </div>
                <div class="menu">
                    <a v-for="item in nav" :key="item.id" class="menu-item" :class="{'active':isActive(item.path)}"
                       @click="jumpUrl(item.path, item.route)">{{item.name}}</a>
                </div>
                <div class="account fl-right" v-if="!state.token">
                    <a class="account-item" @click="showModal('DLlogin')">{{account.login}}</a>
                    <a class="account-item" @click="showModal('DLreg')">{{account.reg}}</a>
                </div>

                <div class="account fl-right" v-if="state.token">
                    <a class="account-item">{{state.token}}</a>
                    <a class="account-item" @click="exit">{{exit_link}}</a>
                </div>
            </div>
        </nav>
        <OpenModal :show="state.showModal" :data="modalData" @close="hideModal" @isShow="switcher"></OpenModal>
    </div>
</template>
<script>
import { IFRAME_SRC } from "apiConfig";
import Cookie from "@2dfire/utils/cookie";
import Tool from "@/base/tools";
import _i from "@/i18n/index";
import { LANG } from "apiConfig";

let pageData = {
  platformName: _i("HEADER.NAV.NAME"),
  exit_link: _i("HEADER.NAV.EXIT"),
  nav: [
    {
      name: _i("HEADER.NAV.INDEX"),
      path: "index"
    },
    {
      name: _i("HEADER.NAV.DOCUMENT"),
      path: "file"
    },
    {
      name: _i("HEADER.NAV.SERVICE"),
      path: "service"
    },
    {
      name: _i("HEADER.NAV.WORKERCENTER"),
      path: "workercenter"
    }
  ],
  account: {
    login: _i("ACCOUNT.BUTTON.LOGIN"),
    reg: _i("ACCOUNT.BUTTON.REG")
  },
  state: {
    token: "",
    showModal: false,
    showName: true
  },
  modalData: {
    type: "",
    footer: false
  }
};

export default {
  data() {
    return pageData;
  },
  methods: {
    // 导航选中选择
    isActive(name) {
      let page = Tool.getPageName();
      if (name == page) {
        return true;
      }
      return false;
    },
    jumpUrl(url, router) {
      let self = this;
      if (url == "service") {
        const token = Cookie.getItem("token");
        if (token) {
          window.location.href = url + ".html";
        } else {
          self.showModal("DLlogin");
        }
      } 
      else {
        let path =  router || "";
        window.location.href = url + ".html#/" + path;
        if(url === "workercenter"){
          let iframeEl = document.getElementById("iframeEl")
          iframeEl.setAttribute('src', IFRAME_SRC)
        }
      }
    },
    // 显示登录/注册弹窗
    showModal(type) {
      this.state.showModal = true;
      this.modalData.type = type;
    },
    hideModal(data) {
      this.state.showModal = false;
    },
    switcher() {
      const token = Cookie.getItem("token");
      if (token) {
        this.state.token = token;
      }
    },
    exit() {
      Cookie.clear();
      // Cookie.removeItem("token");
      // Cookie.removeItem("authJoinType");
      this.state.token = "";
      window.location.href = "index.html";
    }
  },
  components: {
    OpenModal: require("@/components/open-modal.vue")
  },
  created() {
    this.switcher();

    if (LANG != 'cn') {
        this.nav.splice(3, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2f2f2f;
  font-size: 14px;
  color: #ffffff;
  padding: 0 30px;
  .nav-bar {
    text-align: center;
    a {
      color: #ffffff;
      &:hover {
        color: #f55f4f;
      }
    }
    .menu {
      display: inline-block;
      max-width: 1000px;

      .menu-item {
        padding: 0 50px;
        border-right: 1px solid rgba(255, 255, 255, 0.2);

        &:last-child {
          border-right: 0;
        }
      }
    }
    .account {
      .account-item {
        padding: 0 15px;
        border-right: 1px solid rgba(255, 255, 255, 0.2);
        &:last-child {
          border-right: 0;
        }
      }
    }
  }
}

.platform {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
}

.logo {
  width: 41px;
  height: 40px;
  margin: 5px 15px 5px 0;
  display: inline-block;
  background: url("../images/logo.png");
  background-size: cover;
}
</style>

