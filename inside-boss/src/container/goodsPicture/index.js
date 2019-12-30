/**
 * Created by air on 2017/7/10.
 */
import React, { Component }from 'react'
import Main from '../../components/goodsPicture/main'
import { connect } from 'react-redux'
import InitData from './init'
import * as action from '../../action'
import * as bridge from '../../utils/bridge'


class GoodsPictureContainer extends Component {

    componentWillMount () {
        const query = bridge.getInfoAsQuery()
        const {dispatch, params} = this.props
        const data = InitData(params.pageType, query)
        dispatch(action.initPictureData(data))
        dispatch(action.detailChange({detail:false}))
        dispatch(action.getIsShowBrand(1))
        dispatch(action.editTemplate({edit:false,templateId:""}))
    }

    render () {
        const { data , dispatch ,detail} = this.props
        return (
                <div>
                    <Main data={data} dispatch={dispatch} detail={detail}/>
                </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        data: state.goodsPicture.pictureReducers,
        detail : state.goodsPicture.pictureDetailReducers
    }
}


const mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(GoodsPictureContainer)


