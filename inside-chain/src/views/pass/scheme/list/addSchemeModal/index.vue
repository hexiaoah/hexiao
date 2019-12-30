<template>
  <Modal
    :value="visible"
    :title="title"
    :loading="loading"
    @on-ok="ok"
    @on-cancel="cancel"
    ok-text="保存"
    :width="450"
  >
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
    <Form v-if="visible" ref="form" :model="scheme" :label-width="120">
      <FormItem label="传菜方案名称" prop="name" :rules="rules.name">
        <!-- prettier-ignore -->
        <Input v-model="scheme.name" placeholder='传菜方案名称'/>
      </FormItem>
      <FormItem label="传菜设备">
        <!-- prettier-ignore -->
        <Input :disabled="true" v-model="scheme.pantryDevOption" placeholder="传菜设备"/>
      </FormItem>
      <FormItem label="打印机类型">
        <!-- prettier-ignore -->
        <Select v-model="scheme.printerType" placeholder="请选择">
            <Option
                v-for="item of printerTypeOptions"
                :value="item.val"
                :key="item.val"
            >
                {{item.name}}
            </Option>
        </Select>
      </FormItem>
      <FormItem label="打印机IP" prop="printerIp" :rules="rules.printerIp">
        <!-- prettier-ignore -->
        <Input v-model="scheme.printerIp" placeholder="打印机IP"/>
      </FormItem>
      <FormItem label="打印纸宽度" prop="paperWidth" :rules="rules.paperWidth">
        <!-- prettier-ignore -->
        <Select v-model="scheme.paperWidth" placeholder="请选择" @on-change="changePaperWidth">
            <Option :value="58">58mm</Option>
            <Option :value="76">76mm</Option>
            <Option :value="80">80mm</Option>
        </Select>
      </FormItem>
      <FormItem label="每行打印字符数" prop="charCount" :rules="rules.charCount">
        <!-- prettier-ignore -->
        <Select v-model="scheme.charCount" placeholder="请选择">
            <Option
                v-for="item of charCountOptions"
                :value="item"
                :key="item"
            >
                {{item}}个字符
            </Option>
        </Select>
      </FormItem>
      <FormItem label="打印份数" prop="printNum" :rules="rules.printNum">
        <!-- prettier-ignore -->
        <Select v-model="scheme.printNum" placeholder="请选择">
            <Option :value="1">1份</Option>
            <Option :value="2">2份</Option>
            <Option :value="3">3份</Option>
            <Option :value="2">4份</Option>
            <Option :value="3">5份</Option>
        </Select>
      </FormItem>
      <FormItem label="一菜一切" prop="isCut" :rules="rules.isCut">
        <!-- prettier-ignore -->
        <Select v-model="scheme.isCut" placeholder="请选择" @on-change="changeCut">
            <Option :value="1">是</Option>
            <Option :value="0">否</Option>
        </Select>
      </FormItem>
        <FormItem label="打印菜肴条码" prop="printMenuCode" :rules="rules.printMenuCode" v-if="changeFlag">
            <!-- prettier-ignore -->
            <Select v-model="scheme.printMenuCode" placeholder="请选择">
                <Option :value="1">是</Option>
                <Option :value="0">否</Option>
            </Select>
        </FormItem>
        <FormItem label="同时打印一份总单" prop="isTotalPrint" :rules="rules.isTotalPrint" v-if="changeFlag">
            <!-- prettier-ignore -->
            <Select v-model="scheme.isTotalPrint" placeholder="请选择">
                <Option :value="1">是</Option>
                <Option :value="0">否</Option>
            </Select>
        </FormItem>
    </Form>
  </Modal>
</template>

<script>
import API from '@/config/api_pass'
const r = { type: 'number', required: true, message: '必填项，不能为空！', trigger: 'blur' }
const ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/

export default {
  props: {
    visible: Boolean,
    title: String,
    initialForm: Object
  },
  name: 'addSchemeModal',
  data() {
    return {
      loading: true,
      changeFlag: false,
      charCountOptions: [],
      printerTypeOptions: [],
      rules: {
        name: [
          { required: true, message: '必填项，不能为空！', trigger: 'blur' },
          {
            type: 'string',
            max: 20,
            message: '传菜方案名称最多只能输入20个字符！',
            trigger: 'blur'
          }
        ],
        printerIp: [
          {
            pattern: ipReg,
            message: '打印机IP地址无效！',
            trigger: 'blur'
          }
        ],
        paperWidth: [r],
        charCount: [r],
        printNum: [r],
        isCut: [r],
        printMenuCode: [r],
        isTotalPrint: [r]
      },
      scheme: {}
    }
  },
  created() {
    this.getPrinterSys()
  },
  watch: {
    visible(v) {
      if (v) {
        this.scheme = Object.assign(
          {
            name: '',
            printerType: '',
            printerIp: '',
            paperWidth: 58,
            charCount: '',
            printNum: 1,
            isCut: 0,
            printMenuCode: 0,
            isTotalPrint: 0
          },
          this.initialForm ? this.initialForm : {},
          {
            pantryDevOption: '小票打印机'
          }
        )
        this.changeFlag = this.scheme.isCut === 1
        this.changePaperWidth(this.scheme.paperWidth || 58)
      }
    }
  },
  methods: {
    async getPrinterSys() {
      const { data } = await API.getPrinterSys({ dic_code: 'PRINTER_TYPE' })
      this.printerTypeOptions = data
    },
    changePaperWidth(e) {
      this.charCountOptions = {
        58: [32, 33],
        76: [38, 40, 42],
        80: [40, 42, 48, 64]
      }[e]
        this.scheme.charCount = {
            58: 32,
            76: 38,
            80: 40
        }[e]
    },
    changeCut(e) {
      console.log(e)
      this.changeFlag = e === 1
    },
    ok() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('ok', this.initialForm ? 'update' : 'add', this.scheme)
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

<style scoped></style>
