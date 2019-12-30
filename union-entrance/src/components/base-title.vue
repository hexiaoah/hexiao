<template>
    <div :class="single?'single title':'title'" id="page-title">
        <slot></slot>
        <span :class="getClass">{{name}}</span>
    </div>
</template>
<script>
    export default {
       props: ["name","size","single"], //single:true/false 是否超出一行隐藏
       computed: {
        getClass() {
            let style = "";
            switch (this.size) {
                case 's':
                    style = "s";
                    break;
                case 'md':
                    style = "md";
                    break;
                case 'lg':
                    style = "lg";
                    break;
                default:
                    style = "s";
                    break;
            }
            return style;
        }
     }
    };
</script>
<style lang="scss" scoped>
.title {
  width: 100%;
  text-align: center;
  letter-spacing: 0;
  font-size: 18px;
  color: #333333;
  position: relative;
 .s{
     font-size: 18px;
  }
  .md{
     font-size: 20px;
  } 
  .lg{
     font-size: 24px; 
  }  
}
.single.title span{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
}
</style>


