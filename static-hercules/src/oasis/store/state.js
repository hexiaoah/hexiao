/**
 * Created by zyj on 2018/4/3.
 */
export default{
  // 从接口返回的数据
  shopInfo: {

  },
  // 因为省永远不会变动，所以只需要请求一次就可以了
  provinceList: [],
  // picker里面的内容
  pickerSlots: [
    {
      flex: 1,
      values: [],
      defaultIndex: 0
    }
  ],
  // 是否要隐藏区， 因为有些市下面没有区和县
  isHideDistrict: false,
  // picker上当前滚动到的值,放到store的原因是因为每次要获取数据是异步的
  pickerChangeValue: {
    province: {
      name: '',
      id: ''
    },
    city: {
      name: '',
      id: ''
    },
    town: {
      name: '',
      id: ''
    },
    street: {
      name: '',
      id: ''
    }
  },
    //图片展示
    examplePhoto:{
        img:'',
        isShow:false
    },
}