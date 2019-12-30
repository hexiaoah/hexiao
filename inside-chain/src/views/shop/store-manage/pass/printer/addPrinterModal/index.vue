<template>
  <Modal :value="visible" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel">
    <!-- prettier-ignore -->
    <div slot="footer">
          <Button @click="cancel">
              取消
          </Button>
          <Button type="error" @click="ok">
              确定
          </Button>
      </div>
    <!-- prettier-ignore -->
    <Form v-if="visible" ref="form" :model="printer" :label-width="100" :rules="rules">
        <FormItem label="原打印机IP" prop="originIp">
            <Input v-model="printer.originIp"/>
        </FormItem>
        <FormItem label="备用打印机IP" prop="backupIp">
            <Input v-model="printer.backupIp"/>
        </FormItem>
    </Form>
    <p class="tip">
      当原打印机无法正常工作时，单据自动从备用打印机进行打印，避免漏单对营业造成损失
    </p>
  </Modal>
</template>

<script>
import { ipReg } from '../../common'
const r = [
  {
    required: true,
    message: '必填项，不能为空！',
    trigger: 'blur'
  },
  {
    pattern: ipReg,
    message: '打印机IP地址无效！',
    trigger: 'blur'
  }
]
export default {
  props: {
    visible: Boolean,
    title: String,
    initialForm: Object,
    loading: true
  },
  name: 'addPrinterModal',
  data() {
    return {
      rules: {
        originIp: r,
        backupIp: r,
        printer: {}
      }
    }
  },
  watch: {
    visible(v) {
      if (v) {
        this.printer = Object.assign(
          {
            originIp: '',
            backupIp: ''
          },
          this.initialForm
        )
      }
    }
  },
  methods: {
    ok() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('ok', this.initialForm ? 'update' : 'add', this.printer)
        } else {
          this.$emit('update:loading', false)
          this.$Message.error('请完整填写信息')
          setTimeout(() => {
            this.$emit('update:loading', true)
          })
        }
      })
    },
    cancel() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped>
.tip {
  color: #999;
}
</style>
