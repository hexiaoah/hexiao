<script>
/**
     面包屑组件 zeqi at 2017/10/31

     自动分析路由，添加展示及跳转url

     在需要面包屑的页面直接引用组件并放在所需位置即可。

     */

import router from "@2dfire/utils/router";

let componentData = {
  crumbs: []
};
let routes = [];
export default {
  data() {
    return {
      componentData: componentData,
      routes: routes
    };
  },
  methods: {
    getItem(name) {
      let item = {};
      this.routes.map(k => {
        if (k.path.split("/")[1] == name) {
          item = k;
        }
      });

      return item;
    },
    getURL(name, index) {
      let url = this.getItem(name).path;
      if (this.$route.query && index > 0) {
        let query = "?" + this.$route.fullPath.split("?")[1];
        url = url + query;
      }
      return url;
    },
    getName(name) {
      return this.getItem(name).name;
    },
    setRoutes() {
      let r = this.$router.options.routes;
      this.routes = r;
    },
    setCrumbs() {
      let hash = window.location.hash;
      let crumb = [];

      if (hash.indexOf("?") > -1) {
        hash = hash.split("?")[0];
      }
      let routes = hash.split("/").splice(1);
      let route_arr = routes[0].split("_");
      let route_length = routes[0].split("_").length;
      for (route_length; route_length > 1; route_length--) {
        crumb.unshift(route_arr.slice(0, route_length).join("_"));
      }
      this.componentData.crumbs = crumb;
    }
  },
  created() {
    this.setRoutes();
    this.setCrumbs();
  }
};
</script>
<template>
    <div class="crumb-wrap">
        <span class="icon icon-crumb"></span>
        <Breadcrumb class="crumb-box" :separator="'-'">
            <Breadcrumb-item v-for="(item,index) in componentData.crumbs" :href="getURL(item,index)" :key="item.id">
                {{getName(item)}}
            </Breadcrumb-item>
        </Breadcrumb>
    </div>
</template>

<style lang="scss" scoped>
/*.crumb-wrap {*/
/*margin: 0 0 18px;*/
/*}*/

.crumb-wrap {
  width: 100%;
  /*height: 55px;*/
  padding: 20px 0 10px 0;

  border-bottom: 2px solid #333333;

//   position: fixed;
//   width: 100%;
//   background: #fff;
//   top: 0;
//   top: 50px;
//   z-index: 50;
}

.crumb-box {
  height: 25px;
  line-height: 25px;
  color: #333333;
  font-size: 18px;
}

.icon {
  width: 17px;
  height: 17px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8.5px;
  background-size: cover;
  float: left;
  margin-top: 4px;
}
</style>


