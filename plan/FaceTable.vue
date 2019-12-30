<script>
  export default {
    name: 'FaceTable',
    functional: true,
    /* eslint-disable */
    render(h, context) {
      let data = []
      let columns = []

      if (context.children instanceof Array) {
        context.children.forEach(child => {
          // 只处理tagName是FaceColumn的标签
          if (child.tag === 'template' && child.data.tagName === 'FaceColumn') {
            const props = child.data.attrs || {}
            const children = child.children
            const scopedSlots = child.data.scopedSlots
            const hasDefaultScopedSlots =
              scopedSlots && typeof scopedSlots.default === 'function'
            let column = {}

            if (children || hasDefaultScopedSlots) {
              column = Object.assign({}, props, {
                render(h, column) {
                  const vnodes = []

                  // 优先使用table的括槽渲染，如果没有括槽但有子集vnode，使用子集vnode
                  // NOTO slot和children不能同时使用，因为无法确定他们的顺序
                  if (hasDefaultScopedSlots) {
                    vnodes.push(...child.data.scopedSlots.default(column.row))
                  } else if (children) {
                    vnodes.push(...children)
                  }

                  return vnodes
                }
              })
            } else {
              column = Object.assign({}, props, {
                key: props.prop
              })
            }

            delete column['prop']
            columns.push(column)
          }
        })
      }

      const props = Object.assign({ width: '100%' }, context.props, { columns })
      const options = Object.assign({}, context.data, { props })

      return h('Table', options)
    }
  }
</script>
