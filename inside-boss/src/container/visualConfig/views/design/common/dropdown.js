import React, { PureComponent } from 'react'
import { Menu, Dropdown, Icon } from 'antd'
import { connect } from 'react-redux'

import { first } from '@src/container/visualConfig/utils/lang'
import style from './dropdown.css'

@connect(state => ({
    customPages: state.visualConfig.customPages.list,
}))
class DropdownPreview extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {}
    }

    onClick = ({ key }) => {
        const value = key === '请选择' ? null : key
        this.props.selectLink(value)
    }

    render() {
        const { current, customPages } = this.props

        // key: title
        const items = [
            { key: '请选择', title: '请选择' },
            { key: '店铺主页', title: '店铺主页' },
            { key: '商品分类', title: '商品分类' },
            { key: '购物车', title: '购物车' },
            { key: '我的', title: '我的' },
            { key: '我的会员卡', title: '我的会员卡' },
            { key: '我的优惠券', title: '我的优惠券' },
            { key: '我的订单', title: '我的订单' },
            { key: '收货地址', title: '收货地址' },
            { key: '积分商城', title: '积分商城' },
            { key: '本店优惠', title: '本店优惠' },
            ...customPages.map(item => ({ key: `page:custom:${item.code}`, title: item.name })),
        ]

        const menu = (
            <Menu onClick={this.onClick}>
                {items.map(item => <Menu.Item key={item.key}>{item.title}</Menu.Item>)}
            </Menu>
        )

        const currentItem = first(items, item => item.key === current)
        const currentTitle = currentItem ? currentItem.title : '选择跳转的链接'

        return (
            <div className={style.link}>
                <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">
                        {currentTitle} <Icon type="down" />
                    </a>
                </Dropdown>
            </div>
        )
    }
}

export default DropdownPreview
