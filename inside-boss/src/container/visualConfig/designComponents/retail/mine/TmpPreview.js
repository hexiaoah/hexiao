import React from 'react'
import style from './TmpPreview.css'
import cx from 'classnames'

export default class MyPreview extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    state = {
        orderList:['待付款', '进行中', '已完成', '退款'],
        infoList: ['我的会员卡', '我的优惠券', '收货地址', '个人信息', '代理中心']
    }

    render() {
        const {value} = this.props
        const {config} = value
        const {userInfoAlign, visualStyle, icons} = config
        const { orderList, infoList } = this.state

        let memberInfoStyle = null
        let memberAvator = null
        let memberName = null
        let memberListBox = null
        let memberItem = null
        let memberShadowBox = null
        let memberListWrapper = null

        if(userInfoAlign === 'center') {
            memberInfoStyle = style.member_info
            memberAvator = style.member_avator
            memberName = style.member_name
        } else {
            memberInfoStyle = style.left_member_info
            memberAvator = style.left_member_avator
            memberName = style.left_member_name
        }

        if(visualStyle === '平铺式') {
            memberListBox = style.member_list_box
            memberItem = style.member_item
            memberListWrapper = style.member_list_wrapper

        } else {
            memberListBox = style.left_member_list_box
            memberItem = style.left_member_item
            memberShadowBox = style.left_member_box
            memberListWrapper = style.left_member_box
        }

        return (
            <div className={style.member_center_container}>
                <div className={memberInfoStyle}>
                    <img className={memberAvator}
                         src="https://assets.2dfire.com/frontend/c3b65b54aae4165be8d342eba77c2ace.png"></img>
                    <div className={memberName}>贪吃小鲨鱼</div>
                </div>
                <ul className={memberListBox}>
                    {/* <li className={`${memberItem} ${memberShadowBox} ${style.member_list_radius}`}>
                        <img src={icons['会员中心']} className={cx(style.icon , style.iconMarge)} />
                    会员中心
                    </li> */}
                    {
                        userInfoAlign === 'left' &&
                        <li className={`${memberItem} ${memberShadowBox} ${style.member_list_radius}`}>
                         <img src={icons['我的订单']} className={cx(style.icon , style.iconMarge)} />
                        我的订单</li>

                    }
                    <li className={`${memberShadowBox} ${style.member_list_radius}`}>
                        {
                            userInfoAlign === 'center' &&
                            <div className={`${memberItem} ${memberShadowBox}`}>
                            <img src={icons['我的订单']} className={cx(style.icon , style.iconMarge)} />
                            我的订单
                            </div>
                        }
                        <ul className={style.member_order_list}>
                        {orderList.map((item) =>
                            <li className={style.member_order_item}>
                                <img className={style.order_item_icon} src={icons[item]} />
                                <span className={style.order_item_text}>{item}</span>
                            </li>
                        )}
                        </ul>
                    </li>
                    <li>
                        <ul className={memberListWrapper}>
                        {infoList.map((item) =>
                          <li className={`${memberItem} ${style.member_r0}`}>
                            <img src={icons[item]} className={style.icon} />
                            {item}
                           </li>
                        )}
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}
