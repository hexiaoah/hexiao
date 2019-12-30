import React, { PureComponent } from 'react';
import { Modal, Table, Input, Icon, Button } from 'antd';
import {formatNumber} from '../utils/index'
import visualApi from '@src/api/visualConfigApi'
const { Column } = Table;

const couponType ={
  'CASH': '全场现金券',
  'DISCOUNT': '全场折扣券',
  'SINGLE_CASH': '单品现金',
  'SINGLE_DISCOUNT': '单品折扣',
  'SALE': '特价券',
  'EXCHANGE': '兑换券'
}
function add0(m) { return m < 10 ? '0' + m : m }
export default class CouponSelectPreview extends PureComponent {

  state = {
    shopInput:'',
    data: [],
    selectedRows: [],
    selectedRowKeys: []
  }
  componentDidMount() {
    this.getRetailCouponList()
  }

  componentWillReceiveProps(nextProps) {
    // 每次重新打开子组件的时候重新请求数据
    if(nextProps.isShowCoupon) {
      this.getRetailCouponList()
    }
  }

  getRetailCouponList = () =>{
     // 获取优惠券列表
     visualApi.getRetailCoupons().then(
      res=>{
          this.setState({
            data: res.data
          })
       },
      err=>{
        console.log('err', err)
      }
   )
  }

  handleOk = () => {
    const {close, getCoupons} = this.props
    const {selectedRows} = this.state
    if(selectedRows.length > 0) {
      getCoupons(selectedRows)
    }
    close()
    this.deleKeys()
  }

  handleCancel = () => {
    const {close} = this.props
    close()
    this.deleKeys()
  }

  deleKeys = () => {
    // 选中重置
    this.setState({
      selectedRows: [],
      selectedRowKeys: []
    });
  }

  onChangeShopInput = (e) => {
    this.setState({ shopInput: e.target.value });
  }

  format = (createTime) => {
    // 时间戳转换
    if(!createTime) return false
    var time = new Date(createTime);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+add0(m)+'-'+add0(d);
  }


  render() {
    const { shopInput, data, selectedRowKeys } =  this.state
    for(var i = 0; i< data.length; i++ ){
      data[i].key = i
      data[i].couponType = couponType[data[i].promoCouponBaseInfoList[0].type]
      let price;
      if(data[i].couponType == '全场现金券') {
        price = `${formatNumber(data[i].promoCouponBaseInfoList[0].worthValue, true)}元`
      } else if(data[i].couponType == '全场折扣券') {
        price = `${data[i].promoCouponBaseInfoList[0].rate / 10}折`
      }
      data[i].price =  price
    }

    const rowSelection = {
      selectedRowKeys,
      type: 'radio',
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows })
      }
    };

    return (
      <div className='zent-couponSelect-preview'>
        <Modal
          title="优惠券选择"
          visible={this.props.isShowCoupon}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width ={800}
        >
          <Table dataSource={data} rowSelection={rowSelection} pagination={{ pageSize: 5 }} >
            <Column
              title="券标题"
              dataIndex="name"
              key="name"
            />
            <Column
              title="券类型"
              dataIndex="couponType"
              key="couponType"
            />
            <Column
              title="价值"
              dataIndex="price"
              key="price"
            />
            <Column
              title="可领取时间"
              dataIndex="promoCouponBaseInfoList"
              key="promoCouponBaseInfoList"
              render={(promoCouponBaseInfoList) => (
                <span>
                  <span>{this.format(Number(promoCouponBaseInfoList[0].ruleInfo.activeDeliverTime.startTime))} ~ {this.format(Number(promoCouponBaseInfoList[0].ruleInfo.activeDeliverTime.endTime))}</span>
                </span>
              )}
            />
             <Column
              title="剩余张数"
              dataIndex="remainNum"
              key="remainNum"
            />
          </Table>
        </Modal>
      </div>
    );
  }
}

function creatStyle() {
  return{
    width: '150px',
    height: '32px',
    margin: '0 0 20px',
  }
}
