<template>
<div class="code" >
  <table>
  <tr>
    <td v-for='i in codeNum'>{{i}}</td>
  </tr>
</table>
<h4>
 {{pageData.text}}
</h4>
</div>
</template>
<script>
let pageData={
  text:' 收银离线登录验证码用于员工在本店收银机无外网状态下登录收银，正常工作。验证码10分钟内有效，超时未登录请在收银上重新扫码。',
}
export default {
  data() {
    return {
      pageData
    };
  },
  props:['code'],
  methods: {},
  computed:{
    codeNum(){
      return this.code.split('')
    }
  },
  components: {},
};
</script>
<style lang="scss" scoped>
.code {
  height: 100%;
  padding: 30px;
  font-size: 32px;
  h4 {
    color: #000000;
    text-align: center;
    font-weight: 600;
  }
}
  .code table {
    margin: 122px 0px 162px 0px;
    text-align: center;
    background: #ffffff;
    border: 1PX solid #d0d0d0;
    border-radius: 6px;
    border-collapse: collapse;
    line-height: 92px;
    width: 100%;
  }
  td {
    border: 1PX solid #d0d0d0;
    font-size: 40px;

  }
</style>

