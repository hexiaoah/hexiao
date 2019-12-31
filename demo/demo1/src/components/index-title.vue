<template>
    <div class="title" id="title">
        <span class="hr-solid" :class="getClass"></span>
        <span>{{name}}</span>
        <span class="hr-solid" :class="getClass"></span>
    </div>
</template>
<script>
    import _i from '@/i18n/index';

    let pageData = {
        copyright: _i('FOOTER.DESC.COPYRIGHT'),
        office: _i('FOOTER.NAV.OFFICE')
    };

    export default {
       props: ["name","type"],
       computed: {
        getClass() {
            let style = "";
            switch (this.type) {
                case '0':
                    style = "red";
                    break;
                case '1':
                    style = "purple";
                    break;
                case '2':
                    style = "red";
                    break;
                default:
                    style = "red";
                    break;
            }
            return style;
        }
    }
    };
</script>
<style lang="scss" scoped>
.title {
  padding-top:60px;
  letter-spacing: 0;
  font-size: 26px;
  color: #333333;
  text-align: center;
  .hr-solid {
    height: 2PX;
    width: 25px;
    display: inline-block;
    vertical-align: middle;
    margin: 0 15px;
  }
}
.red{
   background:#CC1A2D;
}
.purple{
   background: #5C38BA;
}
.blue{
   background: #2D5EF7;
}
</style>


