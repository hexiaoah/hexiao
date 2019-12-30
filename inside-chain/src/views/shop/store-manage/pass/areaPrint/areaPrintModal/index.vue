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
    <Form v-if="visible" ref="form" :model="printInfo" :label-width="120" :rules="rules">
            <FormItem label="打印机IP地址" prop="ipAddress">
                <Input v-model="printInfo.ipAddress"/>
            </FormItem>
            <FormItem label="打印纸宽度" prop="paperWidth">
                <Select v-model="printInfo.paperWidth" placeholder="请选择" @on-change="changePaperWidth">
                    <Option :value="58">58mm</Option>
                    <Option :value="76">76mm</Option>
                    <Option :value="80">80mm</Option>
                </Select>
            </FormItem>
            <FormItem label="每行打印字符数" prop="rowNum">
                <Select v-model="printInfo.rowNum" placeholder="请选择">
                    <Option
                        v-for="item of charCountOptions"
                        :value="item"
                        :key="item"
                    >
                        {{item}}个字符
                    </Option>
                </Select>
            </FormItem>
        </Form>
  </Modal>
</template>

<script>
import { ipReg } from '../../common'
export default {
  props: {
    visible: Boolean,
    title: String,
    initialForm: Object
  },
  name: 'areaPrintModal',
  data() {
    return {
      loading: true,
      printInfo: {},
      charCountOptions: [],
      rules: {
        ipAddress: [
          { required: true, message: '必填项，不能为空！', trigger: 'blur' },
          {
            pattern: ipReg,
            message: 'IP地址无效！',
            trigger: 'blur'
          }
        ],
        paperWidth: [
          { type: 'number', required: true, message: '必填项，不能为空！', trigger: 'blur' }
        ],
        rowNum: [{ type: 'number', required: true, message: '必填项，不能为空！', trigger: 'blur' }]
      }
    }
  },
  watch: {
    visible(v) {
      if (v) {
        this.printInfo = Object.assign(
          {
            ipAddress: '',
            paperWidth: '',
            rowNum: ''
          },
          this.initialForm ? this.initialForm : {}
        )
        this.changePaperWidth(this.printInfo.paperWidth || 58)
      }
    }
  },
  methods: {
    changePaperWidth(e) {
      if (e) {
        this.printInfo.paperWidth = e
        this.charCountOptions = {
          58: [32, 33],
          76: [38, 40, 42],
          80: [40, 42, 48, 64]
        }[e]
      }
      this.printInfo.rowNum = {
        58: 32,
        76: 38,
        80: 40
      }[e]
    },
    ok() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('ok', this.initialForm ? 'update' : 'add', this.printInfo)
        } else {
          this.loading = false
          this.$Message.error('请完整填写信息')
          setTimeout(() => {
            this.loading = true
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
