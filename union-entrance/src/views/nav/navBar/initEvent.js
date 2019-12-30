import util from '../util'
import modal from '../modal'
export default function() {
  //切换店铺
  util.getDom('#common-nav-shift-shop').addEventListener('click', function() {
    util.goToShiftShop()
  })
  util.getDom('#common-nav-logout').addEventListener('click', function() {
    modal.notic({
      title: '请注意',
      content: '确定要退出当前登录的账号吗？',
      onOk() {
        util.logout()
      }
    })
  })
  //点击导航栏每一项
  const navItems = util.getDom('.nav-item', true)
  for (let i = 0; i < navItems.length; i++) {
    const item = navItems[i]
    const url = item.getAttribute('go')
    const target = item.getAttribute('target')
    item.addEventListener('click', function() {
      if (url) {
        if (url !== '-') {
          if (target === '__blank') {
            window.open(url)
          } else {
            util.setCookie('active', item.innerText)
            window.location.href = url
          }
        }
      } else {
        modal.message({
          content: '正在开发中，敬请期待。如有需要，请在二维火掌柜APP进行操作',
          top: 100,
          duration: 1500
        })
      }
    })
  }
}
