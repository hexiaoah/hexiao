/**
 * Created by air on 2017/7/10.
 */
import React, { Component }from 'react'
import Main from '../../components/couponPush/main'
import { connect } from 'react-redux'



class couponPushContainer extends Component {



    render () {

        const {params,data,dispatch} = this.props

        return (
                <div>
                    <Main data={data} dispatch={dispatch} params={params}/>
                </div>
        )
    }

}
const mapStateToProps = (state) => {

    return {
        data: state.couponPush,
    }
}


const mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(couponPushContainer)


