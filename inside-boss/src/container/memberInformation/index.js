/**
 * Created by air on 2017/7/31.
 */
import React, { Component }from 'react'
import { connect } from 'react-redux'
import Main from '../../components/memberInformation/main'
import InitData from './init'
import * as action from '../../action'
import * as bridge from '../../utils/bridge'
import styles from './style.css'

class memberInformationContainer extends Component {

    componentWillMount () {
        const query = bridge.getInfoAsQuery()
        const {dispatch, params} = this.props
        const data = InitData(params.pageType, query)
        dispatch(action.initMemberData(data))
        dispatch(action.getMemberExportBtn())
    }

    componentDidMount () {
        // sessionStorage.setItem('oldBatchId', '')
        // sessionStorage.setItem('rechargeStatusList', '')
        // sessionStorage.setItem('pageSize', 50)
        // sessionStorage.setItem('startTime', 0)
        // sessionStorage.setItem('endTime', 0)
        // sessionStorage.setItem('pageIndex', 1)
        // sessionStorage.setItem('selectedList', '[]')
        // sessionStorage.setItem('dropDownButtonLock', '')
        // sessionStorage.setItem('currentItem', '{}')
    }

    render () {
        const {data,dispatch} = this.props
        return (
            <div className={styles.wrapper}>
                <Main data={data} dispatch={dispatch}/>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    data: state.memberInformation
})

const mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(memberInformationContainer)

