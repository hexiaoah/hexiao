import React from 'react';
import { Radio, Button, Menu, Dropdown, Icon, message } from 'antd';

import {formatNumber} from '../../utils/index'
import visualApi from '@src/api/visualConfigApi'
import CouponSelect from '../../common/couponSelect'
import { DesignEditor, ControlGroup } from '../../editor/DesignEditor';

import style from './CouponsEditor.css'

const RadioGroup = Radio.Group;

const arr = [1, 2, 3, 4, 5, 6]

const couponType ={
  'CASH': '全场现金券',
  'DISCOUNT': '全场折扣券',
  'SINGLE_CASH': '单品现金',
  'SINGLE_DISCOUNT': '单品折扣',
  'SALE': '特价券',
  'EXCHANGE': '兑换券'
}
export default class CouponsEditor extends DesignEditor {
  state = {
    size: 'large',
    text:'',
    btnBackgroundList: [
      {backgroundColor: '#D83F3F'},
      {backgroundColor: '#33C278'},
      {backgroundColor: '#EFAC30'},
      {backgroundColor: '#4C85E8'},
    ],
    bgIndex: -1,
    isShowCoupon: false,
    data: []
  };

  componentDidMount() {
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

  onChange = (str, e) => {
    const { value, onChange } = this.props;
    const {config} = value

    onChange(value, {config:{
      ...config,
      [str]: e.target.value
  }})
  }


  close = () => {
    this.setState({
      isShowCoupon: false
    })
  }

  closeItem = (index) => {
     // 删除优惠券
     const { value, onChange } = this.props;
     const { config } = value
     let items = [...config.items]
     items.splice(index, 1)

    onChange(value, {config:{
      ...config,
      items
  }})
  }

  getCouponsItem = (data) => {
    // 优惠券选择
    const { value, onChange } = this.props;
    const { config } =  value
    let items = [...config.items]

    const hasCoupons = items.some((c) => c == data[0].id )
    if(hasCoupons) return message.info('该优惠券已存在！');

    items.push(data[0].id)
    onChange(value, {config:{
      ...config,
      items
    }})
  }

  addCoupons = () => {
    this.setState({
      isShowCoupon:!this.state.isShowCoupon
    })
  }

  bgChange = (item, index) => {
    const { value, onChange } = this.props;
    const { config } =  value
    this.setState({
      bgIndex: index
    })

    onChange(value, {config:{
      ...config,
      backgroundColor: item.backgroundColor
    }})
  }

  selectNum = ({key}) => {
    const { value, onChange } = this.props;
    const { config } =  value

    onChange(value, {config:{
      ...config,
      fetchLength: key
    }})
  }

  render(){
    const { value, prefix, validation } = this.props;
    const { size, btnBackgroundList, bgIndex, isShowCoupon, data } = this.state
    const { config } = value

    const couponList = []

    for(var j =0; j < config.items.length; j++) {
      for(var i = 0; i< data.length; i++ ){
        data[i].couponType = couponType[data[i].promoCouponBaseInfoList[0].type]
        let price;
        if(data[i].couponType == '全场现金券') {
          price = `${formatNumber(data[i].promoCouponBaseInfoList[0].worthValue, true)}元`
        } else if(data[i].couponType == '全场折扣券') {
          price = `${data[i].promoCouponBaseInfoList[0].rate / 10}折`
        }
        data[i].price =  price

        if(config.items[j] == data[i].id) {
          couponList.push(data[i])
        }
      }
    }

    // 商品数:
    const shopNumMenu = (
      <Menu onClick={this.selectNum}>
        {arr.map((item) =>
          <Menu.Item key={item}>{item}</Menu.Item>
        )}
      </Menu>
    );

    return (
      <div className={`${prefix}-design-component-coupons-editor`}>
        <CouponSelect
          getCoupons={this.getCouponsItem}
          isShowCoupon={isShowCoupon}
          close={this.close}
         />
        <div className={style.componentCouponsEditor}>
          <ControlGroup
            label="添加方式:"
            error={validation.hasPadding}
            className={style.groupLabel}
          >
          </ControlGroup>
          <div className={style.couponsRadioGroup}>
            <RadioGroup value={value.config.source} className={style.CouponsRelation} onChange={(e) => this.onChange('source', e)}>
              <Radio name="source" value='manualAdd'>手动选择</Radio>
              <Radio name="source" value='fetch'>自动获取</Radio>
            </RadioGroup>
            {config.source == 'manualAdd' && couponList.map((item, index) =>
              <div className={style.couponsTitle}>
                {`${item.name}：${item.price}`}
                <img
                  className={style.closeBtn}
                  src="https://assets.2dfire.com/frontend/73a3ec09ff1b5814aea734d1e7e226cb.png"
                  onClick={() => this.closeItem(index)}
                />
              </div>
            )}
            {config.source == 'manualAdd' && config.items.length < 6 &&
               <Button className={style.couponsAntBtn} onClick={this.addCoupons} type="primary" shape="round" icon="plus" size={size}>选择优惠券</Button>
            }
          </div>
        </div>
        {config.source == 'fetch' &&
          <div className={style.componentCouponsEditor}>
            <ControlGroup
              label="数量："
              error={validation.hasPadding}
              className={style.groupLabel}
            >
            </ControlGroup>
            <Dropdown overlay={shopNumMenu} className={style.couponsDropdown}>
              <Button style={{ marginLeft: 8 }} className={style.dropdownButton}>
                {config.fetchLength} <Icon type="down" />
              </Button>
            </Dropdown>
          </div>
        }
        <div className={style.componentCouponsEditor}>
          <ControlGroup
            label="背景颜色："
            error={validation.hasPadding}
            className={style.groupLabel}
          >
          </ControlGroup>
          {btnBackgroundList.map((item, index) =>
          <div className={style.selectBackground} onClick={(e) =>this.bgChange(item,index,e)}>
            <div className={style.bgBtn} style={{backgroundColor: item.backgroundColor}} />
              {index == bgIndex&&
                <img className={style.selectImg} src="https://assets.2dfire.com/frontend/08bf18cec586c813a2e158ceaf79a9b7.png" />
              }
          </div>
          )}
        </div>
      </div>
    )
  }
  static designType = 'coupons';
  static designDescription = '优惠券';
  static designTemplateType = '互动营销类';
  static getInitialValue() {
    return {
      config: {
        type: 'coupons',
        source: 'manualAdd',    // 数据来源：manualAdd - 手动指定、fetch - 自动获取
        items: [],      // source=manualAdd 时有效且必填，优惠券的 id 列表
        fetchLength: 3,          // source=fetch 时有效。可选值：3 ~ 6
        backgroundColor: '#D83F3F', // 背景色
      }
    };
  }
}
