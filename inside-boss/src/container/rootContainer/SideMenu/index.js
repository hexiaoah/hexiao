import React, { Component } from 'react'
import styles from '../style.css'
import { Menu } from 'antd'
import store from '../store'
import { observer } from 'mobx-react'
const SubMenu = Menu.SubMenu
const Item = Menu.Item
@observer
export default class extends Component {
  componentDidMount() {
    store.getMenuList()
  }
  loopMenu = list =>
    list.map(item => {
      let { children, menuName, pageType, menuId } = item
      //高铁和掌柜的优惠券批量发放不一样
      if (
        pageType === 'PC_ISSUE_COUPON' ||
        pageType === 'PC_BRAND_ISSUE_COUPON'
      ) {
        pageType = 'PC_BRAND_ISSUE_COUPON'
      }
      if (pageType === this.getPath()) {
        this.activeItem = item
        this.openKey = [item.parentId]
      }
      if (pageType === 'node') {
        return children && children.length ? (
          <SubMenu key={menuId} title={menuName}>
            {this.loopMenu(children)}
          </SubMenu>
        ) : null
      }
      return (
        <Item key={pageType} info={item}>
          {menuName}
        </Item>
      )
    })
  selectMenu = ({ item }) => {
    const info = item.props.info || {}
    this.activeItem = info
    store.linkRoute(info)
  }
  getMenu = list => {
    if (!this.menu || !this.menu.length) {
      this.menu = this.loopMenu(list)
    }
    return this.menu
  }
  menuChange = keys => {
    this.openKey = keys
    this.forceUpdate()
  }
  componentDidUpdate() {
    store.setHeader(this.activeItem)
  }
  getPath = () => {
    const pathname = this.props.pathname || ''
    if (pathname.indexOf('/') > -1) {
      return pathname.substring(0, pathname.indexOf('/'))
    }
    this.pathname = pathname
    return pathname
  }
  render() {
    const pathname = this.getPath()
    if (!pathname) {
      this.activeItem = null
    }
    const { menuList } = store
    const menu = this.getMenu(menuList)
    return (
      <div className={styles.menu}>
        {menu && (
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[pathname]}
            onSelect={this.selectMenu}
            openKeys={this.openKey}
            onOpenChange={this.menuChange}
          >
            {menu}
          </Menu>
        )}
      </div>
    )
  }
}
