<script>
  export default {
    name: 'FaceColumn',
    functional: true,
    render(h, context) {
      const _attrs = Object.assign({}, context.data.attrs)
      const attrs = {}

      // 将hyphen-delimited格式转为camelize格式
      Object.keys(_attrs).forEach(key => {
        const value = _attrs[key]
        const camelizeKey = key.replace(/-(\w)/g, (_, c) =>
          (c ? c.toUpperCase() : ''))

        attrs[camelizeKey] = value
      })

      const options = Object.assign({ tagName: 'FaceColumn' }, context.data, {
        attrs
      })
      return h('template', options, context.children)
    }
  }
</script>
