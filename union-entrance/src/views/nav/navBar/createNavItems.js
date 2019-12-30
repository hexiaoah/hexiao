import util from '../util'
import navList from './navData'
//menuIdList是权限的id集合
const { menuIdList = [] } = util.getCookie('entrance')
//判断有无权限显示
function hasPermission(id) {
  return menuIdList.indexOf(id) !== -1
}
function getNavItems(items, active) {
  let navItems = ''
  items.forEach(({ url, target, name, id, children }) => {
    //当存在二级菜单
    if (children && children.length) {
      //只要有其中一个二级菜单有权限就显示父节点
      if (children.some(item => hasPermission(item.id))) {
        navItems += `<div class="nav-item-parent">
                        <span class="nav-item-parent-title">${name}</span>
                        <div class="nav-item-child">${getNavItems(
          children,
          active
        )}</div>
                    </div>`
      }
    } else if (hasPermission(id)) {
      const flag = name === active
      navItems += `<a class="nav-item${flag ? ' nav-active' : ''}" go="${
        flag ? '-' : url || ''
        }" target="${target || '__self'}">${name}</a>`
    }
  })
  return navItems
}
export default function createNavBar(config) {
  const { navBar } = config
  if (!navBar) {
    return ''
  }
  const isChangePage = location.pathname.indexOf('page/change.html') !== -1
  const active = util.getCookie('active', false)
  return `<div class="nav-bar"style="${
    isChangePage ? 'display:none;' : ''
    }" id="common-nav-bar">${getNavItems(
      navList.filter(function (item) {
        return !item.hidden
      }),
      active
    )}</div>`
}
