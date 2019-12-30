import React, { Component } from 'react'
import styles from './style.css'
import SideMenu from './SideMenu'
import Header from './Header'
import getUserInfo from '../../utils/getUserInfo'
import { goToChangePage } from '../../utils/jump'
export default class extends Component {
  constructor(p) {
    super(p)
    const { shopInfo } = getUserInfo()
    const { entityId } = shopInfo || {}
    //没有选择任何店铺，就跳转到选择店铺页面
    if (!entityId) {
      goToChangePage()
    }
  }
  shouldComponentUpdate(nextProps) {
    const {
      location: { pathname }
    } = this.props
    if(pathname.split('/')[1] === 'EXTERNAL_LINK' ) return true
    return nextProps.location.pathname !== pathname
  }
  render() {
    const {
      location: { pathname },
      children
    } = this.props
    return (
      <div className={styles.main}>
        <SideMenu pathname={pathname.substring(1)} />
        <div className={styles.container}>
          <Header />
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    )
  }
}
