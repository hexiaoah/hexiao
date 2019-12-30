/**
 * Created by air on 2017/7/10.
 */

import React, { Component } from 'react'
import styles from './style.css'
import Handle from './handle'
import OrderList from './orderList'
import * as action from '../../action'

class Main extends Component {

    componentDidMount(){

        const t =this

        const { dispatch ,data} = t.props

        dispatch(action.getOrderList(1 ,1))

        dispatch(action.changeOrderType(1))

    }


    render () {
        const {data, dispatch ,params} = this.props
        const {length} = data
        console.log(data)
        return (
            <div className={styles.wraperBox}>
                <div className={styles.viewBox}>
                    <Handle data={data} dispatch={dispatch} params={params}/>
                    {
                        (() => {
                            if (length > 0) {
                                return (
                                    <OrderList data={data} dispatch={dispatch}/>
                                )
                            } else {
                                return null
                            }
                        })()
                    }
                </div>

            </div>
        )
    }
}



export default Main
