import Requester from '@/base/requester'
import API from '@/config/api'
import Object from '@2dfire/utils/object'
export default token =>
  new Promise((resolve, reject) => {
    let params = {
      menuVersion: 11 //菜单版本号
    }
    const headers = {
      token: token,
    }

    Requester.get(API.GET_USER_INFO, {
      params: params,
      headers: headers
    })
      .then(data => {
        // 数据处理
        let datas = data.data
        console.log(datas)
        var userInfo = {
          name: datas.name,
          picture:
            datas.picture ||
            'https://assets.2dfire.com/frontend/31648f04d3ceb9ce7b776bb46c729d0c.png',
          mobile: datas.mobile,
          countryCode: datas.countryCode,
          userId: datas.userId,
          memberId: datas.membereId
        }
        if (datas.entityVo) {
          var shopInfo = {
            entityId: datas.entityVo.entityId,
            entityName: datas.entityVo.entityName,
            entityType: datas.entityVo.entityType,
            industry: datas.entityVo.industry,
            loginEntityId: datas.loginEntityId,
            entityTypeId: datas.entityVo.entityTypeId,
            isInLeague: datas.entityVo.isInLeague,
            logo:
              datas.entityVo.logo ||
              'https://assets.2dfire.com/frontend/8ffcc382dc07323a2dc4cb8f2c6ef468.png',
            roleName: ''
          }
          if (!Object.isEmpty(datas.roleVo)) {
            shopInfo.roleName = datas.roleVo.roleName
          }
          if (datas.entityVo.entityCode) {
            shopInfo.entityCode = datas.entityVo.entityCode
          }
        }
        if (datas.rootMenuList) {
          var menuIdList = []
          datas.rootMenuList.forEach(function (item) {
            menuIdList.push(item.menuId)
          })
        }
        // 将登陆有关的信息存入到entrance中
        // const entrance = {
        //     userInfo: userInfo,
        //     shopInfo: shopInfo,
        //     menuIdList: menuIdList,
        //     loginType: datas.loginType
        // }
        // Cookie.setItem("entrance", JSON.stringify(entrance));
        let entrance = {
          userInfo: userInfo,
          shopInfo: shopInfo,
          menuIdList: menuIdList,
          token: token
        }

        // 判断为手机号登录
        if (datas.loginType == 2) {
          entrance.loginType = datas.loginType
        } else {
          entrance.loginType = 1
        }
        resolve(entrance)
        //self.jump('welcome.html')
      })
      .catch(e => {
        //self.$Message.error(e.result.message)
        reject(e)
      })
  })
