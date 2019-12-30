<script>
export default {
    props:{
        titleList:{
            type: Array,
            default: ()=>([])
        },
        tableList:{
            type: Array,
            default:()=>([])
        },
        border:{
            type: Boolean,
            default:false
        },
        selection:{
            type: Boolean,
            default: false
        },
        noDataText:{
            type: String,
            default: '暂无数据'
        }
    },
    computed:{
        itemBorder(){
            return  this.border?'1px solid #E5E5E5':'none'
        }
    },
    data () {
        return {
            selectionList:[],
            noDataUrl:'https://assets.2dfire.com/frontend/3be21e322d74bc5d4977a43380e79daf.png'
        }
    },
    methods: {
      handleChenge(item,e){
          if(e){
                this.selectionList.indexOf(item) == -1 && this.selectionList.push(item)
          }else{
              const index = this.selectionList.indexOf(item)
              if(index != '-1') this.selectionList.splice(index,1)
          }
          this.$emit('on-change',this.selectionList,item)
          this.$emit('on-selection-change',this.selectionList)
      },
      handleAllChange(e){
          if(e){
            this.selectionList =  this.tableList.map(i=>i)
          }else{
            this.selectionList = []
          }
          this.$emit('on-allChange',this.selectionList)
          this.$emit('on-selection-change',this.selectionList)
      }
    },
    render: function (h) {
        return h('div',{class:'tableWarp'},[
            h('div',{class:'tableTitle'},[
                this.selection && h('div',{class:'selectionItem'},[
                    h('Checkbox',{
                        props:{
                            value: this.selectionList.length === this.tableList.length && this.tableList.length
                        },
                        on:{
                            "on-change":this.handleAllChange
                        }
                    })
                ]),
                this.titleList.map( item => {
                    const style = {}
                    style['border-right'] = this.itemBorder
                    item.width? style.width=String(item.width).includes('%')?item.width:item.width+'px': style.flex = 1
                        return h('div',{style,class:'tableTitleItem'},[
                            h('span',item.title)
                        ])
                })
            ]),
            h('div',{class:'tableBody'},[
                this.tableList && this.tableList.length ?
                this.tableList.map((item,index)=>{
                    return h('div',{class:{ tableRow:true, itemStripe: index % 2  }},[
                        this.selection && h('div',{class: 'selectionItem'},[
                            h('Checkbox',{
                                props:{
                                    value: this.selectionList.some(i=>i==item)
                                },
                                on:{
                                    "on-change":this.handleChenge.bind(null,item)
                                }
                            })
                        ]),
                        this.titleList.map(v=>{
                            const style = {}
                            style['border-right'] = this.itemBorder
                            v.width? style.width=String(v.width).includes('%')?v.width:v.width+'px': style.flex = 1
                            return h('div',{style,class:'tableItem'},[
                                (v.render && typeof v.render === 'function' ) ? v.render(h,item) : h('span', v.key ? item[v.key]? item[v.key]:'-' :'-')
                            ])
                        })
                    ])
                })
                : h('div',{class:'no-data'},[
                    h('img',{attrs:{src:this.noDataUrl},class:'no-menu'}),
                    h('span',this.noDataText)
                ])
            ])
        ])
    }
}
</script>
<style lang="scss" scoped>
.tableWarp{
    .tableTitle{
        display:flex;
        background: #F1F1F1;
        overflow: hidden;
        border: 1px solid #E5E5E5;
        border-bottom: none;
        .tableTitleItem{
            padding: 10px 15px;
            &:last-child{
                border-right: none !important;
            }
        }
        vertical-align: middle
    }
    .tableBody{
        border: 1px solid #E5E5E5;
        .itemStripe{
            background-color: #F7F7F7;
        }
        .tableRow{
            display:flex;
            flex-wrap: wrap;
            border-bottom: 1px solid #E5E5E5;
            transition:background .5s;
            &:last-child{
                border-bottom: none;
            }
            &:hover{
                background-color: #EBF7FF;
            }
            .tableItem{
                padding: 10px 15px;
                display: flex;
                align-items: center;
                &:last-child{
                    border-right: none !important;
                }
            }
        }
    }
    .itemWarp{
        display: inline-block;
        vertical-align: middle;
    }
    .selectionItem{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
    }
    .no-data {
        text-align: center;
        padding: 15px 10px;
        font-size: 12px;
        color: #999999;

        .no-menu {
            display: block;
            width: 138px;
            height: 83px;
            margin: 27px auto;
        }
    }
}
</style>

