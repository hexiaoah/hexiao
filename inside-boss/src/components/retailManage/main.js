import React, {Component} from 'react'

import CateList from '../cateManage/main'
import GoodsProperty from '../goodsProperty/main'
import ItemList from '../itemList/main'
import styles from './main.css'

class RetailMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabs: [{
                name: '商品管理',
                active: true,
            }, {
                name: '分类管理',
                active: false,
            }, {
                name: '商品属性',
                active: false,
            }, ]
        }
    }

    /**
     * 切换tab标签
     * @param item
     * @private
     */
    _switchTab(item) {
        const { name } = item
        const { tabs } = this.state
        tabs.map(function(data) {
            data.active = false
            if(data.name === name){
                data.active = true
            }
        })

        this.setState({
            tabs,
        })
    }

    render() {
        const { tabs=[] } = this.state
        const { data, dispatch } = this.props

        return (
            <div className={styles.retail_manage_container}>
                <ul className={styles.goods_cate_tab}>
                    {
                        tabs.map((item, i) => {
                            return (
                                <li key={i}
                                    className={item.active ? styles.active : ''}
                                    onClick={() => this._switchTab(item)}
                                >
                                    {item.name}
                                </li>
                            )
                        })
                    }
                </ul>
                {
                    tabs[0].active === true && <ItemList data={data} dispatch={dispatch} _switchTab={this._switchTab.bind(this, {name: '分类管理',active: true})}></ItemList>
                }
                {
                    tabs[1].active === true && <CateList data={data} dispatch={dispatch}></CateList>
                }
                {
                    tabs[2].active === true && <GoodsProperty data={data} dispatch={dispatch}>商品属性</GoodsProperty>
                }
            </div>
        )
    }
}
export default RetailMain
