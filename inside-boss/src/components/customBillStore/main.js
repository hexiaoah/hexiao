import React, {Component} from 'react'
import {Select, Switch, Button, Modal} from 'antd'

const Option = Select.Option
import styles from './css/main.css'
import cls from 'classnames'
import SelectStore from './content'
import {message} from 'antd/lib/index'
import * as bridge from '../../utils/bridge'
import apiNetwork from '../../api/networkApi'
import * as action from '../../action'
import {errorHandler} from '../../action'
import {hashHistory, Link} from 'react-router'

export default class Main extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      isSwitch: true,
      shopActiveIndex: null
    }
  }

  componentDidMount() {
    const t = this
    const {dispatch, params, data} = t.props
    const {importData, entityType} = data
    apiNetwork.getUseStoreList({
      tmplId: params.id,
      entityId: importData.entityId
    }).then(
      res => {
        console.log(res)
        this.setState({
          shopActiveIndex: res.data.applyShopList,
          isSwitch: res.data.applyAll
        })
        dispatch(action.setBillActiveShop(res.data.applyShopList))
      },
      err => dispatch(errorHandler(err))
    )
      .then()
  }

  switchChange(e) {
    this.setState({
      isSwitch: e
    })
  }

  //门店选择
  storeListEdit(e) {
    const type = e.target.dataset.type
    if (type === 'chooseShop') {
      const index = Number(e.target.dataset.index)
      if (this.state.shopActiveIndex === index) {
        this.setState({
          shopActiveIndex: ''
        })
      } else {
        this.setState({
          shopActiveIndex: index
        })
      }

    } else if (type === 'closeBtn') {
      const index = Number(e.target.dataset.index)
      this.delShop(index)
    }
  }

  /**
   * 删除门店
   * @param index 删除门店的index值
   */
  delShop(index) {
    const {data, dispatch, params} = this.props
    const {activeShopList} = data
    let shopList = activeShopList.concat()
    shopList.splice(index, 1)
    dispatch(action.setBillActiveShop(shopList))
    this.setState({
      shopActiveIndex: null
    })
  }

  //选择门店
  chooseStore() {
    const {dispatch} = this.props
    dispatch(action.billStoreModelSet({visible: true}))
    dispatch(action.getAllShopList())
    dispatch(action.getBranch())
    dispatch(action.getAllProvince())
  }

  //清空
  storeDelAll() {
    const {dispatch} = this.props
    dispatch(action.setBillActiveShop([]))
    this.setState({
      shopActiveIndex: null
    })
  }

  //保存
  saveBill() {
    const {data, dispatch, params} = this.props
    let {importData} = data
    let entityList = []
    if(data.activeShopList && data.activeShopList.length > 0)
    {
      entityList= data.activeShopList.map(val => val.entityId)
    }
    if (this.state.isSwitch) {
      apiNetwork
        .saveUseStore({
          applyTmplBo: JSON.stringify({
            tmplId: params.id,
            applyAll: this.state.isSwitch,
            entityId: importData.entityId,
            applyEntityIdList: entityList
          })
        })
        .then(
          res => {
            if (res.data) {
              message.success('保存成功')
              hashHistory.push(`/CUSTOM_BILL/main`);
            }
          },
          err => dispatch(errorHandler(err))
        )
        .then()
    }else{
      // if (!data.activeShopList || data.activeShopList.length <= 0) {
      // if (!data.activeShopList) {
      //   message.error('请选择需要下发的门店')
      //   return false
      // } else {
        apiNetwork
          .saveUseStore({
            applyTmplBo: JSON.stringify({
              tmplId: params.id,
              applyAll: this.state.isSwitch,
              entityId: importData.entityId,
              applyEntityIdList: entityList
            })
          })
          .then(
            res => {
              if (res.data) {
                message.success('保存成功')
                hashHistory.push(`/CUSTOM_BILL/main`);
              }
            },
            err => dispatch(errorHandler(err))
          )
          .then()
      // }
    }


  }

  // ================================render
  render() {
    const {data, dispatch, params} = this.props
    const {activeShopList} = data
    return (
      <div className={styles.main_wrapper}>
        <div className={styles.content_wrapper}>
          <div className={styles.switch_wrapper}>
            全部门店使用此模板
            <Switch
              checked={this.state.isSwitch}
              onChange={this.switchChange.bind(this)}
              className={styles.switch}
            />
          </div>
          {!this.state.isSwitch && (
            <div className={styles.store_wrapper}>
              <div className={styles.title}>
                <span
                  className={styles.btn_add_store}
                  onClick={this.chooseStore.bind(this)}
                >
                  选择门店
                </span>
                已选择下列门店：共{activeShopList ? activeShopList.length : 0}家
                <span
                  className={styles.btn_clear_store}
                  onClick={this.storeDelAll.bind(this)}
                >
                  清空
                </span>
              </div>
              <ul
                className={styles.store_list}
                onClick={this.storeListEdit.bind(this)}
              >
                {activeShopList && activeShopList.length > 0 &&
                activeShopList.map((val, index) => {
                  return (
                    <li key={val.entityId}
                        className={cls(
                          this.state.shopActiveIndex === index
                            ? styles.store_list_active
                            : ''
                        )}
                    >
                        <span data-type="chooseShop"
                              data-index={index}>{val.name}</span>
                      <i data-type="closeBtn" data-index={index}/>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
        <div className={styles.btn_wrapper}>
          <Link to="/CUSTOM_BILL/main">
            <Button className={styles.btn_back}>返回</Button>
          </Link>
          <Button className={styles.btn_save} type="primary" onClick={this.saveBill.bind(this)}>
            保存
          </Button>
        </div>
        <SelectStore data={data} dispatch={dispatch}/>
      </div>
    )
  }
}
