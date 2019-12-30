/**
 * Created by air on 2017/7/10.
 */

import React, { Component } from 'react'
import styles from './style.css'
import Handle from './handle'
import RechargeList from './rechargeList'
import {  Spin } from 'antd'



class Main extends Component {

    render () {
        const {data, dispatch ,params} = this.props

        const {total,showSpin} = data

        // console.log(data)
        return (
            <div className={styles.wraperBox}>
                <div className={styles.viewBox}>
                    <Handle data={data} dispatch={dispatch} params={params}/>
                    {
                        (() => {
                            if (total > 0) {
                                return (
                                    <RechargeList data={data} dispatch={dispatch}/>
                                )
                            } else {
                                return null
                            }
                        })()
                    }
                </div>
                {
                    showSpin && showSpin.bool ? (
                        <div className={styles.cover}>
                            <Spin tip={showSpin.content} style={{marginTop: 160, marginLeft: -160}} size="large"></Spin>
                        </div>
                    ) : null
                }

            </div>
        )
    }
}



export default Main
