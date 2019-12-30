export default self => [
    {
        title:'门店名称',
        key:'name',
    },
    {
        title:'品牌',
        key:'plateName',
    },
    {
        title:'店铺编码',
        key:'code',
    },
    {
        title:'操作',
        render: (h, params) => {
            return h('span',{
                style: {
                    cursor: 'pointer',
                    color: '#5599FF'
                },
                on: {
                    click: () => {
                        self.goInfo(params.row)
                    }
                }
            },'进入店铺')
        }
    },
]