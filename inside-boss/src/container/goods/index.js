/**
 * Created by air on 2017/7/31.
 */
import React, { Component }from 'react'
import { connect } from 'react-redux'
import Main from '../../components/goods/main'
import RetailMain from '../../components/retailManage/main'
import InitData from './init'
import * as action from '../../action'
import * as bridge from '../../utils/bridge'
import styles from './style.css'

class goodsContainer extends Component {

    componentWillMount () {
        const query = bridge.getInfoAsQuery()
        const { dispatch, params } = this.props
        const data = InitData(params.pageType, query)
        dispatch(action.initData(data))
        dispatch(action.checkWhiteList())
    }

    componentDidMount () {
        sessionStorage.setItem('oldBatchId', '')
        sessionStorage.setItem('rechargeStatusList', '')
        sessionStorage.setItem('pageSize', 50)
        sessionStorage.setItem('startTime', 0)
        sessionStorage.setItem('endTime', 0)
        sessionStorage.setItem('pageIndex', 1)
        sessionStorage.setItem('selectedList', '[]')
        sessionStorage.setItem('dropDownButtonLock', '')
        sessionStorage.setItem('currentItem', '{}')
    }

    render () {
        const { data, dispatch,location={} } = this.props
        const { query } = location
        const { routeSource = '' } = query
        const { industry, inWhite } = data

        return (
            <div className={styles.wrapper}>
                { industry === 3 && !!inWhite ? <RetailMain data={data} source={routeSource} dispatch={dispatch}></RetailMain> : <Main data={data} dispatch={dispatch}/>}
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    data: state.goods
})

const mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(goodsContainer)

