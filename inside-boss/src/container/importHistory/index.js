import React, { Component }from 'react'
import { connect } from 'react-redux'
import Main from '../../components/importHistory/main'
import InitData from './init'
import * as action from '../../action'
import * as bridge from '../../utils/bridge'
import styles from './style.css'

class commContainer extends Component {
    
    componentWillMount () {
        const query = bridge.getInfoAsQuery()
        const {dispatch,params} = this.props
        console.log('output',params.pageType, query);
        const data = InitData(params.pageType, query)
        dispatch(action.initDataImportHostory(data));
        dispatch(action.getImportHistoryList({
            pageNum:1
        }));
    }
    
    render () {
        const {data, dispatch} = this.props
        return (
            <div className={styles.wrapper}>
                <Main data={data} dispatch={dispatch}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.importHistory
})

const mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(commContainer)

