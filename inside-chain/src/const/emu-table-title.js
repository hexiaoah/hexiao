export const goodsTableTitle = [
    {
        name: '商品',
        width: '35%'
    },
    {
        name: '所属分类',
        width: '20%'
    },
    {
        name: '所属菜单',
        width: '15%'
    },
    {
        name: '门店上架',
        width: '15%'
    },
    {
        name: '操作',
        width: '15%'
    }
]

export const singleShopTableTitle = [
    {
        name: '商品',
        width: '35%'
    },
    {
        name: '所属分类',
        width: '25%'
    },
    {
        name: '商品状态',
        width: '25%'
    },
    {
        name: '操作',
        width: '15%'
    }
]

export const suitTableTitle = [
    {
        name: '套餐',
        width: '35%'
    },
    {
        name: '所属分类',
        width: '20%'
    },
    {
        name: '所属菜单',
        width: '15%'
    },
    {
        name: '门店上架',
        width: '15%'
    },
    {
        name: '操作',
        width: '15%'
    }
]

export const singleSuitTableTitle = [
    {
        name: '套餐',
        width: '35%'
    },
    {
        name: '所属分类',
        width: '25%'
    },
    {
        name: '门店上架',
        width: '25%'
    },
    {
        name: '操作',
        width: '15%'
    }
]

export const suitGroupTitle = [
    {
        name: '商品名称',
        width: '31%'
    },
    {
        name: '规格',
        width: '23%'
    },
    {
        name: '商品加价(¥)',
        width: '23%'
    },
    {
        name: '限点数量',
        width: '23%'
    }
]

export const suitGroupTitleChoosedAll = [
    {
        name: '商品名称',
        width: '40%'
    },
    {
        name: '规格',
        width: '30%'
    },
    {
        name: '商品数量',
        width: '30%'
    }
]

export const cashierMonitorTitle = [
    {
        name:'店铺名称',
        width:'20%'
    },
    {
        name:'门店编码',
        width:'20%'
    },
    {
        name:'主收银软件版本',
        width:'20%'
    },
    {
        name:'主收银运行状态',
        width:'20%'
    },
    {
        name:'主副收银版本是否一致',
        width:'20%'
    },
]

export const shopTitle = [
    {
        name:'名称',
        width:'20%'
    },
    {
        name:'品牌',
        width:'15%'
    },
    {
        name:'店铺编码',
        width:'15%'
    },
    {
        name:'门店类型',
        width:'15%'
    },
    {
        name:'营业状态',
        width:'15%'
    },
    {
        name:'门店地址',
        width:'30%'
    },
]

export const roleTitle =(t)=>([
    {
        title:'职级名称',
        key:'name',
        width:180

    },
    {
        title:'权限设置',
        render: (h,data)=>{
            return h('div',{class:'tableRow'},[
                data.row.actionGroupVOList.map(item=>{
                    return h('span',{class:'tableItem'},`${item.name}: ${item.rote}`)
                })
            ],)
        },
    },
    {
        title:'操作',
        render: (h,data)=>{
            return h('div',[
                h('a',{
                    on:{
                        click:()=>{
                            t.editGroup(data.row)
                        }
                    },
                    class:'edit-button'
                },'编辑'),
                h('a',{
                    on:{
                        click:()=>{
                            t.delItem(data.row)
                        }
                    },
                    class:'edit-button'
                },'删除')
            ])
        },
        width:150
    }
])

export const chainStaffTitle =(t)=>([
    {
        title:'员工',
        width:'25%',
        render:(h,data)=>{
            return h('div',{style:{overflow:'hidden',display: 'flex'}},[
                h('div',{style:{float:'left',position:'relative', 'background-color': '#f1f1f1'}},[
                    h('img',{attrs:{src:data.avatarUrl},style:{width:'80px',height:'80px',display:'block'}}),
                    h('div',{class:'tilt',style:{opacity: data.frozenStatus?'0.6':'0' }}),
                    h('div',{class:'tilt',style:{opacity: data.frozenStatus?'1':'0',background:'transparent',color:'#FFF' }},'已冻结')
                ]),
                h('div',{class:'ItemStaffName'},[
                    h('div',{class:'itemUserName'},data.name),
                    h('div',data.mobile ? `${data.countryCode} ${data.mobile}`:'-')
                ])
            ])
        }
    },
    {
        title:'管辖范围',
        key:'scope',
        render: (h,data)=>{
            return h('div',{},[
                // h('div',{style:{'text-align':'left','min-width':'20%'}},[h('p',{style:{'text-align':'center'}},data.shopCount)]),
                // h('div',{style:{'text-align':'left','min-width':'20%'}},[h('p',{style:{'text-align':'center'}},data.brand)]),
                // h('div',{style:{'text-align':'left','min-width':'20%'}},[h('p',{style:{'text-align':'center'}},data.organization)]),
                h('div',{}, data.isAllShop?'全部门店': data.shopCount === 0 ?'无可管理门店': `${data.shopCount}家门店`),
                h('div',{}, data.isAllPlate?'全部品牌': data.plateCount === 0 ?'无可管理品牌': `${data.plateCount}个品牌`   ),
                h('div',{}, data.isAllBranch?'全部分支机构': data.branchCount === 0 ?'无可管理分支结构': `${data.branchCount}个分支机构`),

            ])
        }
    },
    {
        title:'职级',
        key:'roleName'
    },
    {
        title:'聘用类型',
        key:'hireType'
    },
    {
        title:'入职时间',
        key:'entryDate'
    },
    {
        title:'操作',
        render: (h,data)=>{
            return h('div',[
                h('a',{
                    on:{
                        click:()=>{
                            t.handleEdit(data)
                        }
                    },
                    class:'edit-button'
                },'编辑'),
                h('a',{
                    on:{
                        click:()=>{
                            t.deleteUser(data)
                        }
                    },
                    class:'edit-button'
                },'删除'),
                h('a',{
                    on:{
                        click:()=>{
                            t.handleFrozen(data)
                        }
                    },
                    class:'edit-button'
                },data.frozenStatus?'恢复':'冻结')
            ])
        },
        width:'15%'
    }
])
export const chainRoleTitle =(t)=>([
    {
        title:'职级名称',
        key:'name',
        width:'15%'

    },
    {
        title:'权限设置',
        render: (h,data)=>{
            return h('div',{class:'chainTableRow'},[
                data.actionGroupVOList.map(item=>{
                    return h('span',{class:'chainTableItem'},`${item.name}：${item.rote}`)
                })
            ])
        },
    },
    {
        title:'操作',
        render: (h,data)=>{
            return h('div',[
                h('a',{
                    on:{
                        click:()=>{
                            t.editGroup(data)
                        }
                    },
                    class:'edit-button'
                },'编辑'),
                h('a',{
                    on:{
                        click:()=>{
                            t.delItem(data)
                        }
                    },
                    class:'edit-button'
                },'删除')
            ])
        },
        width:'15%'
    }
])
