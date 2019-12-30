import React, { Component } from 'react'
import { connect } from 'react-redux'
import Main from '../../components/customBillDetail/main'
import InitData from './init'
import * as action from '../../action'
import * as bridge from '../../utils/bridge'
import styles from './style.css'
import { INIT_DATA } from '../../constants'

const mapStateToProps = state => ({
  data: state.customBill
})

const mapDispatchToProps = dispatch => ({
  dispatch
})
@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class extends Component {
  componentWillMount() {
    const query = bridge.getInfoAsQuery()
    const { dispatch, params } = this.props
    const data = InitData(params.pageType, query)
    dispatch(action.initDataBill(data))
  }

  componentDidMount() {}

  render() {
    const { data, dispatch, params } = this.props
    if (!data.importData) {
      return false
    } else {
      return (
        <div className={styles.wrapper}>
          <Main data={data} dispatch={dispatch} params={params} />
        </div>
      )
    }
  }
}
