// 商品分类 编辑组件
import React from 'react'
import { Radio, Checkbox, Row, Col } from 'antd'
import ImgUpload from '@src/container/visualConfig/views/design/common/imgUpload'
import style from './TmpEditor.css'
import cx from 'classnames'

const RadioGroup = Radio.Group

export default class CateEditor extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            orderIcons: [
                '待付款',
                '进行中',
                '已完成',
                '退款',
            ],
            infoIcons: [
                '我的订单',
                '我的会员卡',
                '我的优惠券',
                '收货地址',
                '个人信息',
            ],
            isShowImgUpload: false,
            typeName:null
        }
    }
    configChang = (obj) => {
        const { value, onChange } = this.props;
        const { config } =  value
        onChange(value, { config: {
          ...config,
          ...obj
        }})
      }

    changeAvatar = (e) => {
        this.configChang({userInfoAlign: e.target.value})
    }

    changePageStyle = (e) => {
        this.configChang({visualStyle: e.target.value})
    }

    _getImg = (data) => {
        // 获取图片
        const { value, onChange } = this.props;
        const { config } =  value
        const {typeName} = this.state
        const icons = Object.assign({}, config.icons)
        icons[typeName] = data
        this.configChang({icons})
    }

    close = () => {
        this.setState({
          isShowImgUpload: false,
        })
      }

    onChangeBtn = (item) => {
        this.setState({
            isShowImgUpload: !this.setState.isShowImgUpload,
            typeName: item,
        })
    }

    render() {
        const { value } = this.props
        const { orderIcons, infoIcons} = this.state
        const { config } = value
        const { userInfoAlign, visualStyle, icons} = config
        const { isShowImgUpload }= this.state;

        return (
            <div className={style.member_editor_container}>
                <ImgUpload
                    getImg={this._getImg}
                    isShowImgUpload={isShowImgUpload}
                    close={this.close}
                />
                <div className={style.member_position}>
                    <div className={style.member_title}>用户信息位置：</div>
                    <RadioGroup value={userInfoAlign}
                                onChange={this.changeAvatar}
                                className={style.radio_group}>
                        <Radio name="mode" value={'center'}>居中</Radio>
                        <Radio name="mode" value={'left'}>居左</Radio>
                    </RadioGroup>
                </div>
                <div className={style.member_position}>
                    <div className={style.member_title}>页面风格：</div>
                    <RadioGroup value={visualStyle}
                                onChange={this.changePageStyle}
                                className={style.radio_group}>
                        <Radio name="mode" value={'卡片式'}>卡片式</Radio>
                        <Radio name="mode" value={'平铺式'}>平铺式</Radio>
                    </RadioGroup>
                </div>
                <div className={style.member_icons_box}>
                    {
                        orderIcons.map( (item, i) => {
                            return (

                                <div className={style.member_flex_icon} key={i}>
                                    <div className={style.member_title}>{ item }：</div>
                                    <div className={style.member_upload} onClick={() => this.onChangeBtn(item)}>
                                        <img className={style.orderImg}  src={icons[item]} alt=""/>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <p className={style.member_upload_tips}>icon尺寸要求：60*60px，支持PNG、JPG格式</p>
                </div>
                <div className={style.member_icons_box}>
                    {
                        infoIcons.map( (item, i) => {
                            return (
                                <div className={style.member_flex_icon} key={i}>
                                    <div className={style.member_title}>{ item }：</div>
                                    <div className={style.member_upload} onClick={() => this.onChangeBtn(item)}>
                                        <img src={icons[item]} alt=""/>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <p className={style.member_upload_tips}>icon尺寸要求：48*48px，支持PNG、JPG格式</p>
                </div>
                <div className={style.member_icons_box}>
                    <div className={style.member_flex_icon}>
                        <div className={style.member_title}>代理中心：</div>
                        <div className={style.member_upload} onClick={() => this.onChangeBtn('代理中心')}>
                            <img src={icons['代理中心']} alt=""/>
                        </div>
                    </div>
                    <p className={style.member_upload_tips}>icon尺寸要求：48*48px，支持PNG、JPG格式</p>
                    <p className={style.member_upload_tips}>只有开通微代理功能后才会展示此项</p>
                </div>
            </div>

        )
    }

    static designType = 'mine'
    static designDescription = '我的页面'

    static getInitialValue() {
        return {
            config: {
                type: 'mine',
                userInfoAlign: 'center', // 用户信息位置 居中：'center'， 居左：'left'
                visualStyle: '卡片式', // 页面风格 卡片式：'card' 平铺式： 'pave'
                icons: { // 各菜单项的图标
                    会员中心: 'https://assets.2dfire.com/frontend/41b4df097e2c94b6d9678a1c664624fd.png',
                    待付款: 'https://assets.2dfire.com/frontend/c39a86a4752d7e4682b61975fe065a14.png',
                    待发货: 'https://assets.2dfire.com/frontend/7bdad89ffdac56c3bd397e785e3c56ec.png',
                    待收货: 'https://assets.2dfire.com/frontend/a8fe06f2a9fd2d31778f3c852ac132c7.png',
                    退款: 'https://assets.2dfire.com/frontend/b11dccab9a76574324ea42ff3cc7effe.png',
                    我的会员卡: 'https://assets.2dfire.com/frontend/ea21f0970b3fecf24d82d71c117c6420.png',
                    我的优惠券: 'https://assets.2dfire.com/frontend/2594320ee9012a3c8e669fabfe01faa5.png',
                    收货地址: 'https://assets.2dfire.com/frontend/d57d4489c19a2df11322332762a6e406.png',
                    个人信息: 'https://assets.2dfire.com/frontend/1972fef81801be620f28d1dd3c8a2e36.png',
                    代理中心: 'https://assets.2dfire.com/frontend/7e02fd5ce8e2036ff9289bcc6a6950fc.png',
                    我的订单: 'https://assets.2dfire.com/frontend/5947312739430077be9bdd641fa6adb2.png',
                }
            }
        }
    }
}

