import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as action from '../../action'
import Main from '../../components/goodTagEdit/main'

class priceTagEditContainer extends Component {

    componentWillMount() {
           const { dispatch, location } = this.props
           const { query } = location
           const { id, entityId } = query
           dispatch(action.getModuleDetail(({param: { id: id, entityId: entityId}})))
    }
    render() {
        const { data, dispatch } = this.props
        return <Main data={data} dispatch={dispatch} />
    }
}

const mapStateToProps = state => ({
    data: state.priceTagEdit,
})

const mapDispatchToProps = dispatch => ({
    dispatch
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(priceTagEditContainer)
