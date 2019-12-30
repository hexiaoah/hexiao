/**
 * Created by air on 2017/7/10.
 */
import React, {Component} from 'react'
import Main from '../../components/noOwnerCoupon/main'
import {connect} from 'react-redux'
import * as action from "../../action";
import * as bridge from "../../utils/bridge";
import InitData from "./init";


class noOwnerCoupon extends Component {

    componentWillMount () {
        const query = bridge.getInfoAsQuery()
        const {dispatch, params} = this.props
        const data = InitData(params.pageType, query)
        dispatch(action.initNoOwnerCoupon(data))
    }

    render() {

        const {params, data, dispatch} = this.props

        return (
            <div>
                <Main data={data} dispatch={dispatch} params={params}/>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.noOwnerCoupon,
    }
}


const mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(noOwnerCoupon)


