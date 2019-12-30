/**
 * Created by shantaohua on 2018/02/15.
 * 组合商品编辑
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Main from '../../components/goodCombinedEdit/main'
import * as action from '../../action'
import * as bridge from '../../utils/bridge'
import styles from './style.css'
import InitData from './init'

class combinedGoodsEdit extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        const { dispatch, location } = this.props
        const { query } = location
        const { id='' } = query
        if(id){
            dispatch(action.getCombinedGoodDetail(id))
        }else{
            dispatch(action.setCombinedGoodDetail([]))
            dispatch(action.setSelectCombinedGoodsList([]))
            dispatch(action.setHeadPicture([]))
        }
        dispatch(action.getGoodUnitList(3))
        dispatch(action.getGoodCategory())
        dispatch(action.getItemList(1))
        dispatch(action.getFreightTemplate())

    }
    render() {
        const { data, dispatch, location } = this.props
        const { query } = location
        const { id } = query
        return (
            <div>
                <Main data={data} menuId={id} dispatch={dispatch} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data: state.combinedGoodsEdit
})

const mapDispatchToProps = dispatch => ({
    dispatch
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(combinedGoodsEdit)
