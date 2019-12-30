/**
 * Created by air on 2017/7/10.
 */

import React, {Component} from 'react'
import styles from './style.css'
import Export from './export'
import Set from './set'
import List from './list'
import SetList from './setList'
import Search from './search'
import {Tabs} from 'antd';
import * as action from "../../action";

const TabPane = Tabs.TabPane;

function callback(key) {
}

class Main extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const {dispatch} = this.props
        dispatch(action.getNoOwnerCoupon())
    }

    render() {
        const {data, dispatch, params} = this.props
        if (!data.select) {
            return false
        }
        let setPageIsShow=data.setPageIsShow;
        return (
            <div className={styles.wraperBox}>
                <div className={styles.viewBox} >
                    {setPageIsShow?
                        <SetList data={data} dispatch={dispatch}></SetList>
                        : <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="券码导出/停用操作" key="1">
                            <Export data={data} dispatch={dispatch}/>
                            <Set data={data} dispatch={dispatch}/>
                        </TabPane>
                        <TabPane tab="不记名优惠券报表" key="2">
                            <Search data={data} dispatch={dispatch}/>
                            <List data={data} dispatch={dispatch}/>
                        </TabPane>
                    </Tabs>}

                </div>
            </div>
        )
    }
}


export default Main
