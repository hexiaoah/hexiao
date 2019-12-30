/**
 * Created by air on 2017/7/10.
 */
import React, { Component }from 'react'
import Main from '../../components/orderPhotos/main'
import InitData from './init'
import { connect } from 'react-redux'
import * as action from '../../action'
import * as bridge from '../../utils/bridge'



class OrderPhotosContainer extends Component {

    componentWillMount () {
        const query = bridge.getInfoAsQuery()
        const {dispatch, params} = this.props
        const data = InitData(params.pageType, query)
        dispatch(action.initOrderData(data))
    }

    render () {

        const {params,data,dispatch} = this.props
        return (
                <div>
                    <Main params={params} data={data} dispatch={dispatch}/>
                </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.orderPhotos
    }
}


const mapDispatchToProps = (dispatch) => ({
    dispatch
})
export default connect(mapStateToProps, mapDispatchToProps)(OrderPhotosContainer)


