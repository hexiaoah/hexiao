import { isPlainObj, isFunc } from '../utils'
export default {
  data() {
    return {
      __list: [],
      __loading: false,
      __pagination: {
        current: 1,
        total: 0
      },
      __listApi: () => ({}),
      __params: {}
    }
  },
  methods: {
    __paging(p) {
      console.log(p)
    },
    async __getList(pageNo = this.__pagination.current, params) {
      this.__loading = true
      if (isPlainObj(pageNo)) {
        params = pageNo
        pageNo = this.__pagination.current
      }
      const resParams = {
        pageIndex: pageNo,
        ...this.__getParams(this.__pagination),
        ...params
      }
      const data = await this.__getListApi()(resParams)
      this.__afterGetList(data, pageNo)
    },
    __getParams() {
      return this.__params
    },
    __getListApi() {
      return this.__listApi
    },
    __afterGetList(res, page) {
      if (isFunc(this.__listFormat)) {
        res = this.__listFormat(res, page)
      }
      const { list, total } = res || {}
      this.__list = list || []
      this.__pagination.total = total
      this.__pagination.current = page
      this.__loading = false
      isFunc(this.__extraListOp) && this.__extraListOp(res, page)
    }
  }
}
