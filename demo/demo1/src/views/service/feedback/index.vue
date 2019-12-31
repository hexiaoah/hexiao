
<template>
    <div>
        <OpenTitle :title="pageText.name"></OpenTitle>
        <div class="wrap feedback">
            <!--意见反馈-->
            <div class="wrap-content">
               <div class="title row">{{pageText.title}}</div>
               <div class="row">
                  <RadioGroup v-model="params.title">
                    <Radio :label="pageText.prosug"></Radio>
                    <Radio :label="pageText.meetbug"></Radio>
                  </RadioGroup>
               </div>
              <div class="row text-wrap">
                 <textarea class="text-box ivu-input " v-model.trim="params.content" :maxlength="200" :placeholder="pageText.textPlaceholder ">
                 </textarea>
                  <span class="characters">{{params.content.length}}/200</span>
              </div>
              <div class="row">
                 <div class="input-box">
                    <Input v-model.trim="params.email"  :maxlength="30" :placeholder="pageText.inputPlaceholder" style="width: 365px"
                       class="search-input"
                       @on-enter="submit_btn"></Input>
                    <Button class="submit-btn" @click="submit_btn" type="primary">{{pageText.subBtn}}</Button>
                </div>
              </div>
              <!-- <div class="errorTip" style="margin:6px 0 4px;">
                    <span v-show="errorTip">{{errorTip}}</span>
                </div> -->
            </div>
          
        </div>
    </div>
</template>

<script>
import _i from "@/i18n/index";
import Requester from "@/base/requester";
import catchError from "@/base/catchError";
import API from "@/config/api";

let pageData = {
  pageText: {
    name:_i('FEEDBACK.NAME'),
    title:_i('FEEDBACK.TITLE'),
    prosug:_i('FEEDBACK.PROSUG'),
    meetbug:_i('FEEDBACK.MEETBUG'),
    textPlaceholder:_i('FEEDBACK.TXT.PLACEHOLDER'),
    inputPlaceholder:_i('FEEDBACK.CONTACT.PLACEHOLDER'),
    subBtn:_i('FEEDBACK.subBtn')
  },
  params: {
    title: "",
    content: "",
    email: ""
  },
  errorTip: ""
};

export default {
  data() {
    return pageData;
  },
  components: {
    OpenTitle: require("@/components/open-title.vue")
  },
  methods: {
    submit_btn() {
      let emailReg = /^([a-zA-Z0-9_\.-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (this.params.title == "") {
        this.$Message.warning(_i('FEEDBACK.WARNING.MISSING.FEEDBACK.TYPE'));
        return;
      }
      if (this.params.content == "") {
        this.$Message.warning(_i('FEEDBACK.WARNING.MISSING.FEEDBACK.CONTENT'));
        return;
      }
      if (this.params.email == "") {
        this.$Message.warning(_i('FEEDBACK.WARNING.MISSING.FEEDBACK.CONTACT'));
        return;
      }
      Requester.get(API.FEED_BACK, { params: this.params })
        .then(data => {
          if (data) {
             this.$Modal.success({
                  title: _i('FEEDBACK.INFO.FEEDBACK.SUBMITTED'),
                  content: _i('FEEDBACK.INFO.FEEDBACK.RECEIVED')
              });
              // 清空信息
              this.params.content = "";
              this.params.email = "";
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
  min-width: 450px;
  margin: 0 auto;
  padding: 50px 0;
}
.row {
  margin-bottom: 20px;
}
.errorTip {
  height: 18px;
  text-align: right;
  font-size: 12px;
  color: #c42022;
  margin-bottom: 9px;
}
.wrap-content {
  width: 450px;
  margin: 0 auto;
  .title {
    font-weight: bold;
    font-size: 16px;
    padding-bottom: 15px;
    border-bottom: 1px solid #dedede;
    color: #333333;
  }
  .text-wrap {
    position: relative;
  }
  .text-box {
    font-size: 12px;
    border-radius: 2px;
    width: 450px;
    height: 136px;
    resize: none;
  }
  .characters {
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 12px;
    color: #999999;
  }
  .input-box {
    .submit-btn {
      margin-left: 8px;
    }
  }
}
</style>

