import React, { Component } from 'react'
import { Select, Switch, Button, Modal, Input, Checkbox } from 'antd'
const Search = Input.Search
const CheckboxGroup = Checkbox.Group
import { message } from 'antd/lib/index'
const Option = Select.Option
import styles from './css/content.css'
import cls from 'classnames'
import * as action from '../../action'
const defaultCheckedList = []
export default class SelectStore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmLoading: false,
      checkedList: defaultCheckedList,//店铺选中内容
      classifyIsShow: false,//是否不显示类型选择
      indeterminate: true,
      checkAll: false,//是否全选
      keyword: '', //搜索内容
      typeActive: '-1',//类型当前选中
      //地区选中
      provinceActive: [
        {
          index: 0,
          name: '全部',
          isEnd: false,
          id: 0
        }
      ],
      //机构选中
      branchActive: [
        {
          index: 0,
          branchName: '全部',
          isEnd: false,
          id: 0
        }
      ],
      joinModes: [
        {
          name: '全部',
          entityId: '-1'
        },
        {
          name: '加盟',
          entityId: 0
        },
        {
          name: '直营',
          entityId: 1
        },
        {
          name: '合作',
          entityId: 2
        },
        {
          name: '合营',
          entityId: 3
        }
      ]
    }
  }
  //关键词搜索
  search(e) {
    this.setState(
      {
        keyword: e
      },
      () => {
        this.getShopList()
      }
    )
  }
  
  
  //单选
  onChange = checkedList => {
    const { shopList } = this.props.data
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < shopList.length,
      checkAll: checkedList.length === shopList.length
    })
  }
  //全选
  onCheckAllChange = e => {
    const { shopList } = this.props.data
    this.setState({
      checkedList: e.target.checked ? shopList.map(val => val.name) : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  }
  // 查询
  getShopList() {
    const { dispatch } = this.props
    dispatch(
      action.getAllShopList({
        keyword: this.state.keyword,
        joinMode: this.state.typeActive,
        branchEntityId:
          this.state.branchActive[this.state.branchActive.length - 1].id || '',
        provinceId: this.state.provinceActive[1]
          ? this.state.provinceActive[1].id
          : '',
        cityId: this.state.provinceActive[2]
          ? this.state.provinceActive[2].id
          : '',
        townId: this.state.provinceActive[3]
          ? this.state.provinceActive[3].id
          : ''
      })
    )
  }
  //类型选择
  typeChange(entityId) {
    this.setState(
      {
        typeActive: entityId
      },
      () => {
        this.getShopList()
      }
    )
  }
  /**
   * 选择类型点击事件
   * @param i 当前属于第几次
   * @param id  当前选中值再当前层出的index值
   * @param name  名字
   * @param type 类型，值为province、branch
   * @param isEnd 当前选中是否为最后层，值为true、false
   * @param value 搜索时所需要的值
   * */
  menuChange(i, id, name, type, isEnd, value) {
    let menuActive = type + 'Active',
      menuName = type === 'province' ? 'name' : 'branchName'
    let menuActiveList = this.state[menuActive].concat()
    //如果没有返回名字
    if (!name) {
      menuActiveList.splice(i + 1, menuActiveList.length)
    }
    //如果是最后一层
    else if (menuActiveList[menuActiveList.length - 1].isEnd) {
      menuActiveList.splice(i - 2, 1, {
        index: id,
        [menuName]: name,
        isEnd: isEnd,
        id: value
      })
    } else {
      menuActiveList.push({
        index: id,
        [menuName]: name,
        isEnd: isEnd,
        id: value
      })
    }
    this.setState(
      {
        [menuActive]: menuActiveList
      },
      () => {
        this.getShopList()
      }
    )
  }
  /**
   * 获取类型选择html
   * @param type province地址选择、branch机构选择
   * */
  getMenuHtml(type) {
    const { data } = this.props
    const { branch, province } = data
    let menu = type === 'province' ? province : branch,
      menuActive = type + 'Active',
      menuName = type === 'province' ? 'name' : 'branchName',
      menuChild = type === 'province' ? 'subList' : 'children',
      menuValue = type === 'province' ? 'id' : 'entityId'
    let i = 1,
      itemList = menu && menu.concat()
    if (!itemList) return
    while (i <= this.state[menuActive].length) {
      itemList =
        i > 1 && this.state[menuActive][i - 1].isEnd === false
          ? itemList[this.state[menuActive][i - 1].index][menuChild]
          : itemList
      i++
    }
    return (
      itemList &&
      itemList.map((val, index) => {
        return (
          <span
            className={cls(
              styles.search_span,
              val[menuValue] ===
              this.state[menuActive][this.state[menuActive].length - 1].id
                ? styles.search_active
                : ''
            )}
            key={index}
            onClick={this.menuChange.bind(
              this,
              i,
              index,
              val[menuName],
              type,
              !val[menuChild],
              val[menuValue]
            )}
          >
            {val[menuName]}
          </span>
        )
      })
    )
  }
  //筛选按钮，是否隐藏筛选条件
  classifyBtnChange() {
    this.setState({
      classifyIsShow: !this.state.classifyIsShow
    })
  }
  //确定事件
  handleOk = () => {
    const { data,dispatch } = this.props
    const { shopList,activeShopList } = data
    let checkedList=shopList.filter(val=>{
        if(this.state.checkedList.indexOf(val.name)>-1){
          return val
        }
      }
    )
    // 合并已选和新选的门店
    let allList = activeShopList?activeShopList.concat(checkedList):checkedList.concat();
    // 选择门店去重 ***
    let hash = {};
    let new_list = allList.reduce(function (item, next) {
      hash[next.name] ? '' : hash[next.name] = true && item.push(next);
      return item
    }, []);
    let allCount=checkedList?checkedList.length:0
    let repeatCount=(allList?allList.length:0)-new_list.length
   
    // 判断三种情况 全部重复、部分重复、无重复
    if (repeatCount === allCount) {
      message.info("您添加了" + allCount + "个门店，其中重复" + repeatCount + "个，已自动为您合并。")
    } else if (repeatCount > 0 && repeatCount !== allCount) {
      message.info("您添加了" + allCount + "个门店，其中重复" + repeatCount + "个，已自动为您合并。")
    }
    dispatch(action.setBillActiveShop(new_list))
    // 确定事件
    this.setState({
      confirmLoading: true
    })
    setTimeout(() => {
      dispatch(action.billStoreModelSet({ visible: false }))
      this.setState({
        confirmLoading: false
      })
      // this.init()
    }, 500)
  }
  //取消事件
  handleCancel = () => {
    const { dispatch } = this.props
    dispatch(action.billStoreModelSet({ visible: false }))
    // this.init()
  }
  //选中或者取消后的初始化
  init(){
    this.setState({
      checkedList: [],
      classifyIsShow: false,
      indeterminate: true,
      checkAll: false,
      keyword: '', //搜索内容
      typeActive: '-1',
      provinceActive: [
        {
          index: 0,
          name: '全部',
          isEnd: false,
          id: 0
        }
      ],
      //机构选中
      branchActive: [
        {
          index: 0,
          branchName: '全部',
          isEnd: false,
          id: 0
        }
      ]
    })
  }
  
  render() {
    const { data } = this.props
    const { shopList } = data
    return (
      <div>
        <Modal
          title="选择门店"
          visible={data && data.visible}
          onOk={this.handleOk}
          okText="保存"
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          className={styles.modal_wrapper}
          afterClose={this.init.bind(this)}
          bodyStyle={{
            height:'640px',
            overflowY:'auto'
          }}
        >
          <div className={styles.search_wrapper}>
            <Search
              placeholder="门店名称"
              onSearch={this.search.bind(this)}
              style={{ width: 200 }}
            />
            <Button
              className={cls(styles.btn_filtrate)}
              onClick={this.classifyBtnChange.bind(this)}
            >
              筛选
              <span
                className={cls(
                  this.state.classifyIsShow
                    ? styles.arrow_bottom
                    : styles.arrow_top
                )}
              />
            </Button>
          </div>
          <content className={cls(styles.arrow)} style={this.state.classifyIsShow?{display:'none'}:{}}>
            <ul className={styles.search_classify}>
              <li className={styles.search_list}>
                <span className={styles.search_name}>类型:</span>
                <span>
                  {this.state.joinModes.map(val => {
                    return (
                      <span
                        className={cls(
                          styles.search_span,
                          this.state.typeActive === val.entityId &&
                            styles.search_active
                        )}
                        onClick={this.typeChange.bind(this, val.entityId)}
                        key={val.name}
                      >
                        {val.name}
                      </span>
                    )
                  })}
                </span>
              </li>
              {/*=============地区&&机构=====================*/}
              {[
                { type: 'province', item: this.state.provinceActive },
                { type: 'branch', item: this.state.branchActive }
              ].map(val => {
                let title = val.type === 'province' ? '地区:' : '机构:'
                let menuName = val.type === 'province' ? 'name' : 'branchName'
                return (
                  <li className={styles.search_list} key={val.type}>
                    <span className={styles.search_name}>{title}</span>
                    <span className={styles.search_active_list}>
                      {val.item &&
                        val.item.map((item, index, arr) => {
                          return item.isEnd === false ? (
                            <span key={index}>
                              {index === 0 ? '' : '>'}
                              <span
                                className={cls(
                                  styles.search_menu,
                                  index + 2 > arr.length && styles.search_active
                                )}
                                onClick={this.menuChange.bind(
                                  this,
                                  index,
                                  null,
                                  null,
                                  val.type
                                )}
                              >
                                {item[menuName]}
                              </span>
                            </span>
                          ) : (
                            ''
                          )
                        })}
                    </span>
                    <span>{this.getMenuHtml(val.type)}</span>
                  </li>
                )
              })}
            </ul>
          </content>
          {/*==================================*/}
          <div className={styles.search_total}>
            当前符合条件门店总数：
            {shopList && shopList.length}
          </div>
          {/*================门店选择==================*/}
          <div className={styles.result_wrapper}>
            <div className={styles.result_all}>
              <Checkbox
                indeterminate={this.state.indeterminate}
                onChange={this.onCheckAllChange}
                checked={this.state.checkAll}
              >
                全选
              </Checkbox>
            </div>
            <CheckboxGroup
              options={
                shopList &&
                shopList.map(val => {
                  return val.name
                })
              }
              value={this.state.checkedList}
              className={styles.result_checkbox_wrapper}
              onChange={this.onChange}
            />
          </div>
        </Modal>
      </div>
    )
  }
}
