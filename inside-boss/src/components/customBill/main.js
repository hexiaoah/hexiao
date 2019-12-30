/**
 * Created by air on 2017/7/31.
 */
import React, { Component } from 'react'
import styles from './css/main.css'
import { message, Button, Modal, Spin, Select, Row, Col, Input } from 'antd'
import cls from 'classnames'
const Option = Select.Option
import Bill from '../customBillDetail/content'
import BillList from './billList'
import { Link } from 'react-router'
import * as action from '../../action'
import { setUseStoreList } from '../../action'
class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      importLock: false,
      exportLock: false,
      previewText: '请上传excel文件',
      storeName: '',
      typeActive: '0_0',
      typeActiveCode: '',
      billTitle: ''
    }
  }
  componentDidMount() {
    const t = this
    const { dispatch ,data} = t.props
    dispatch(action.getAllTmplType({entityId:data.importData.entityId}))
    dispatch(action.getEntityType({entityId:data.importData.entityId}))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.brandId !== this.state.storeName)
      this.setState({
        storeName: nextProps.data.brandId
      })
  }

  /**
   * 左侧列表选择
   * @param index1
   * @param index2
   * @param code itemCode 用于获取
   * @param title
   * **/
  typeListChange(index1, index2, code, title) {
    const { dispatch ,data} = this.props
    console.log('output',title);
    this.setState({
      typeActive: index1 + '_' + index2,
      typeActiveCode: code,
    })
    dispatch(action.getTypeTmplList({ tmplCode: code,entityId:data.importData.entityId,codeName:title }))

    window.scrollTo(0, 0)
  }

  render() {
    const t = this
    const { dispatch, data } = t.props
    const { allTmplType, typeTmplList, importData ,entityType} = data
    console.log('output bill!!!', data);

    return (
      <div className={styles.main_wrapper}>
        <Row>
          {/*===========================left*/}
          <Col span={6} className={styles.bill_type}>
            <h2 className={styles.bill_type_title}>单据类型</h2>
            <ul className={styles.type_ul}>
              {allTmplType &&
                allTmplType.map((val, index) => {
                  return (
                    <li key={index}>
                      <div className={styles.type_name}>{val.typeName}</div>
                      <ul>
                        {val.tmplCodeList &&
                          val.tmplCodeList.map((item, i) => {
                            return (
                              <li
                                className={cls(
                                  styles.type_li,
                                  this.state.typeActive === `${index}_${i}`
                                    ? styles.type_li_active
                                    : ''
                                )}
                                key={i}
                                onClick={this.typeListChange.bind(
                                  this,
                                  index,
                                  i,
                                  item.tmplCode,
                                  item.codeName
                                )}
                              >
                                {item.codeName}
                              </li>
                            )
                          })}
                      </ul>
                    </li>
                  )
                })}
            </ul>
          </Col>

          <Col span={18}>
            <div className={styles.main}>
              <h3 className={styles.main_title}>{data.billTitle}</h3>
              <Row className={styles.main_center}>
                {/*===========================center*/}
                <Col span={24}>
                  <BillList
                    data={{
                      typeTmplList: typeTmplList,
                      importData,
                      entityType,
                      typeActiveCode: this.state.typeActiveCode
                    }}
                    dispatch={dispatch}
                  />
                </Col>
                {/*===========================right*/}
                {/*<Col span={12}>*/}
                  {/*<ul>*/}
                    {/*{typeTmplList &&*/}
                      {/*typeTmplList.map(val => {*/}
                        {/*if (val.using) {*/}
                          {/*return (*/}
                            {/*<li key={val.id}>*/}
                              {/*<div className={styles.main_list_title}>*/}
                                {/*{val.name}*/}
                              {/*</div>*/}
                              {/*<div className={styles.bill}>*/}
                                {/*<div className={styles.use_icon}>使用中</div>*/}
                                {/*<Bill data={val} type='SHOW'/>*/}
                              {/*</div>*/}
                            {/*</li>*/}
                          {/*)*/}
                        {/*}*/}
                      {/*})}*/}
                  {/*</ul>*/}
                {/*</Col>*/}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Main
