/**
 * Created by air on 2017/7/10.
 */
import React, { Component }from 'react'
import Main from '../../components/videoImport/main'
import { connect } from 'react-redux'

class VideoImportContainer extends Component {

    render () {

        const {params,data,dispatch} = this.props
        return (
                <div>
                    <Main data={data} params={params} dispatch={dispatch}/>
                </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.videoImport
    }
}


const mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoImportContainer)


