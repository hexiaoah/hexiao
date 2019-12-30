import React, { Component } from 'react'
import { connect } from 'react-redux'

import Main from '../../components/goodTag/main'

class goodTagContainer extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { data, dispatch } = this.props
        return <Main data={data} dispatch={dispatch} />
    }
}

const mapStateToProps = state => ({
    data: state.priceTag
})

const mapDispatchToProps = dispatch => ({
    dispatch
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(goodTagContainer)
