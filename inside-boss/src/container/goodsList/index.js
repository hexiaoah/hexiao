import React, { Component }from 'react'
import { connect } from 'react-redux'

import Main from '../../components/itemList/main'

class goodListContainer extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { data , dispatch} = this.props
        return (
            <Main data={data} dispatch={dispatch} />
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.good
})

const mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(goodListContainer)
