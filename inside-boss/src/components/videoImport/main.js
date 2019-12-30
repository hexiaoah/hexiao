/**
 * Created by air on 2017/7/10.
 */

import React, { Component } from 'react'
import styles from './style.css'
import Handle from './handle'
import VideoList from './videoList'
import * as action from '../../action'

class Main extends Component {

    componentDidMount(){

        const t =this

        const { dispatch } = t.props

        dispatch(action.getVideoList(1 ,1))

        dispatch(action.changeVideoType(1))
    }


    render () {
        const {data, dispatch ,params} = this.props
        const {length} = data
        return (
            <div className={styles.wraperBox}>
                <div className={styles.viewBox}>
                    <Handle data={data} dispatch={dispatch} params={params}/>
                    {
                        (() => {
                            if (length > 0) {
                                return (
                                    <VideoList data={data} dispatch={dispatch}/>
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
