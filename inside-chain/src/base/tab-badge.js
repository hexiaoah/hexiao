// Created by zeqi
// 直接应用于TabPane的徽标render函数
//      使用了render函数，自定义创建了tab头显示内容

// 传入参数:
//      name: tabPane名称，String
//      count: 显示的数量，String or Number, 为 0 时，不显示徽标
//      max: 显示的最大数值，默认'99'，超出显示'99+'

// Usage:
//   <Tabs>
//      <TabPane :label="label"></TabPane>
//   </Tabs>
//   ...
//   computed: {
//     label(){
//       return tabBadge('主料', 10)
//     }
//   }
//

function tabBadge(name, count, max) {
    return (h) => {
        return h('div', [
                h('span', name || ''),
                h('Badge', {
                    props: {
                        count: count,
                        'class-name': 'tab-badge',
                        'overflow-count': max || 99
                    }
                }),
            ]
        )
    }
}

export default tabBadge
