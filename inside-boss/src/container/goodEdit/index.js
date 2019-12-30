/**
 * Created by xueliu on 2018/02/15.
 * 商品编辑
 */
import React, { Component }from 'react'
import { connect } from 'react-redux'
import InitData from './init'
import * as action from '../../action'
import * as bridge from '../../utils/bridge'
import Main from '../../components/goodEdit/main'
import styles from './style.css'

class goodEditContainer extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        const {dispatch, location} = this.props
        const { query } = location
        const {id} = query
        dispatch(action.getGoodItemDetail(id))
        dispatch(action.getGoodCategory())
        dispatch(action.getGoodSkuList(id, 1))
        dispatch(action.getGoodUnitList(3))
        dispatch(action.getFreightTemplate())
        dispatch(action.getGoodStrategy())
    }
    render() {
        const { data, location, dispatch, params} = this.props
        const { query } = location
        // id 商品id
        // chain 是否是连锁下发的商品
        const {id, chain} = query
        const info = bridge.getInfoAsQuery()
        /**
         * 店铺类型
         * 0 - 单店
         * 1 - 连锁
         * 2 - 连锁下的门店
         * 3 - 分公司
         * 4 - 商圈
         */
        const { entityType, industry } = InitData(params.pageType, info)
        return (
            <div className={styles.goodEdit_container}>
                <Main data={data} menuId={id} chain={chain} dispatch={dispatch} entityType={entityType} industry={industry}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.goodEdit
})

const mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(goodEditContainer)
