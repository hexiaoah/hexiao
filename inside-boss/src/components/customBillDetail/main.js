import React, {Component} from 'react'
import {Select, Switch, Button, Modal, Row, Col} from 'antd'
import {hashHistory, Link} from 'react-router'
import * as bridge from '../../utils/bridge'

const Option = Select.Option
import styles from './css/main.css'
import cls from 'classnames'
import Left from './left'
import Content from './content'
import Right from './right'
// import { data } from './data'
import {message} from 'antd/lib/index'
import apiNetwork from '../../api/networkApi'
import {errorHandler} from '../../action'
import NameEditAlert from '../customBill/createAlert'
import * as action from "../../action";

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.contentSelect = this.contentSelect.bind(this)
    this.state = {
      data: {},
      activeItemIndex: '', //当前选中的itemRowVoList的Index
      activeColumnIndex: '', //当前选中的columnList的Index
      activeNextIsDashed: false, //当前选中是否有下划线
      isActiveEdit: '', //编辑的行，例子：1_1
      optionList: [],
      createVisible: false
    }
  }

  componentDidMount = () => {
    const {dispatch, params, data} = this.props
    const {importData} = this.props.data
    dispatch(action.getEntityType({entityId: data.importData.entityId}))
    console.log('output@@@@@@@');
    // this.setState({
    //     data: data
    // })
    apiNetwork
      .getEditTmpl({
        id: params.id,
        entityId: importData.entityId
      })
      .then(
        res => {
          this.setState({
            data: res.data,
            oldData: res.data
          })
        },
        err => dispatch(errorHandler(err))
      )

  }

  componentWillReceiveProps() {
  }

  // =====================================================================左侧事件
  /**
   * 左侧侧内容点击事件
   * */
  handleSelect(event) {
    let code = event.target.dataset.code
    let parentIndex = event.target.dataset.parent
    let index = event.target.dataset.index
    let data = Object.assign({}, this.state.data)
    let nowIsShow = !data.itemTypeVoList[parentIndex].optionList[index]
      .choice
    data.itemTypeVoList[parentIndex].optionList[index].choice = nowIsShow
    data.tmplVo.itemRowVoList = this.changeData(code, nowIsShow)
    this.setState({data: data})
    let selected_item = data.itemTypeVoList[parentIndex].optionList[index]
    console.log('output selected_item', selected_item);
    let allLength = data.tmplVo.itemRowVoList.length;
    let rowIndex = 0;
    let colIndex = 0;
    for (let i = 0; i < allLength; i++) {
      let pList = data.tmplVo.itemRowVoList[i];
      for (let j = 0; j < pList.columnList.length; j++) {
        if (pList.columnList && pList.columnList[j].itemCode === selected_item.itemCode) {
          rowIndex = i;
          colIndex = j;
        }
      }
    }
    this.contentSelect(`${rowIndex}_${colIndex}`)

  }

  changeData(type, isShow) {
    let itemRowVoList = Object.assign({}, this.state.data.tmplVo)
      .itemRowVoList
    itemRowVoList.forEach((item, num) => {
      item.columnList.forEach((val, index) => {
        if (val.itemCode === type) {
          itemRowVoList[num].columnList[index].showType = isShow
            ? 'SHOW'
            : 'HIDDEN'
        }
      })
    })
    return itemRowVoList
  }

  // =============================================================================中间事件
  /**
   * 中间内容点击事件
   * */
  contentSelect(active) {
    try {
      active = active.split('_')
      let isActive = `${active[0]}_${active[1]}`
      this.setState({
        activeItemIndex: active[0],
        activeColumnIndex: active[1],
        isActiveEdit:
          isActive === this.state.isActiveEdit ? isActive : ''
      })
      let val = Object.assign(
        {},
        this.state.data.tmplVo.itemRowVoList[active[0]].columnList[
          active[1]
          ]
      )
      this.setState({
        activeItem: val,
        nextIsDashed: this.state.data.tmplVo.itemRowVoList[active[0]]
          .nextIsDashed
      })
    } catch (e) {
      message.error('内容未选中', active)
    }
  }

  //自定义内容修改
  editCustomVal(e) {
    try {
      let value = e.target.value
      let data = Object.assign({}, this.state.data)
      let activeItemIndex = this.state.activeItemIndex
      let activeColumnIndex = this.state.activeColumnIndex
      data.tmplVo.itemRowVoList[activeItemIndex].columnList[
        activeColumnIndex
        ].value = value
      this.setState({data: data})
    } catch (e) {
      message.error('修改失败')
    }
  }

  //添加Logo
  AddUploadLogo(e) {
    try {
      let active = e.index.split('_')
      let data = Object.assign({}, this.state.data)
      data.tmplVo.itemRowVoList[active[0]].columnList[
        active[1]
        ].img = e.img
      data.tmplVo.itemRowVoList[active[0]].columnList[
        active[1]
        ].value = e.img
      this.setState({data: data})
    } catch (e) {
      message.error('未找到logo元素')
    }
  }

  // ===============================================================================右侧事件
  //返回
  backToList = () => {
    if (this.state.data !== this.state.oldData) {
      Modal.confirm({
        title: '提示',
        content: '当前模板尚未保存，确认要退出吗？',
        onOk() {
          hashHistory.replace(`/CUSTOM_BILL/main?index=1_1`);
        },
        onCancel() {
        },
      });
    } else {
      hashHistory.replace(`/CUSTOM_BILL/main?index=1_1`);
    }
  }

  /**
   * 保存
   * @param type save/save_use 保存/保存并使用
   * */
  saveEditTmpl(type) {
    const {data, dispatch, params} = this.props
    const {query} = hashHistory.getCurrentLocation()
    const {importData, entityType} = data
    const tmplVo = Object.assign({}, this.state.data.tmplVo)
    if (tmplVo.itemRowVoList && tmplVo.itemRowVoList.length > 0) {
      tmplVo.itemRowVoList.forEach(item => {
        if (item.columnList.length > 0) {
          let sum = 0,
            fistShowIndex = undefined
          let withArr = item.columnList.map((val, index) => {
            let item = val.showType === 'SHOW' ? val.defWidthPct : 0
            sum += item
            if (item !== 0 && fistShowIndex === undefined) {
              fistShowIndex = index
            }
            return item
          })

          if (sum !== 100 && sum !== 0) {
            console.log(item.columnList[fistShowIndex])
            item.columnList[fistShowIndex].widthPct =
              item.columnList[fistShowIndex].defWidthPct + (100 - sum)
          }
        }
      })
    }

    let useTmpl = false;
    // 保存并使用 且 不为连锁 传true
    if (type === 'save_use' && query.entityType !== '2') {
      useTmpl = true
    }
    apiNetwork.saveTmpl({
      tmplId: params.id,
      entityId: importData.entityId,
      useTmpl: useTmpl,
      itemRowList: tmplVo.itemRowVoList
    }).then(res => {
      if (res.data) {
        if (query.entityType === '5') {
          message.success('模板保存成功')
          hashHistory.replace(`/CUSTOM_BILL/store/main/${params.id}`);
        } else if (query.entityType === '2' && type === 'save_use') {
          message.success('模板保存成功')
          hashHistory.replace(`/CUSTOM_BILL/store/main/${params.id}`)
        } else {
          message.success('模板保存成功')
          hashHistory.push(`/CUSTOM_BILL/main`);
        }
      }
    }, err => dispatch(errorHandler(err)))
    // }
  }

  editTmplName() {
    this.setState({
      createVisible: true
    })
  }

  createHandleCancel(name) {
    this.setState({
      createVisible: false
    })
    if (name) {
      let data = Object.assign({}, this.state.data)
      data.tmplVo.name = name
      this.setState({
        data: data,
      })
    }
  }

  editState(data, blankIndex) {
    try {
      this.setState(data)
      if (blankIndex)
        this.contentSelect(`${blankIndex}_0`)
    } catch (e) {
      message.success('修改失败')
    }
  }

  // ================================render
  render() {
    const {data, dispatch, params} = this.props
    const {importData, entityType} = data
    let activeItemIndex = this.state.activeItemIndex
    let activeColumnIndex = this.state.activeColumnIndex
    console.log('output detail!!!', this.props);

    return (
      <div className={styles.main_wrapper}>
        <div
          className={cls(styles.nameEdit)}>{this.state.data.tmplVo && this.state.data.tmplVo.width}MM
          - {this.state.data.tmplVo && this.state.data.tmplVo.name} <Button className={styles.btn}
                                                                            onClick={this.editTmplName.bind(this)}>修改</Button>
        </div>
        <div className={styles.main}>
          <Row>
            <Col xs={9} sm={9} md={9} lg={9} xl={8}>
              {' '}
              <Left
                data={this.state.data}
                dispatch={dispatch}
                params={params}
                handleSelect={this.handleSelect.bind(this)}
              />
            </Col>
            <Col xs={9} sm={9} md={9} lg={9} xl={10}>
              <div className={styles.center}>
                <Content
                  data={Object.assign({},
                    this.state.data.tmplVo,
                    {
                      activeIndex: `${activeItemIndex}_${activeColumnIndex}`,
                      isActiveEdit: this.state.isActiveEdit
                    }
                  )}
                  dispatch={dispatch}
                  params={params}
                  contentSelect={this.contentSelect.bind(this)}
                  editCustomVal={this.editCustomVal.bind(this)}
                  AddUploadLogo={this.AddUploadLogo.bind(this)}
                />
              </div>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              {' '}
              <Right
                data={Object.assign(
                  {},
                  {
                    data: this.state.data,
                    activeItemIndex: this.state.activeItemIndex,
                    activeColumnIndex: this.state.activeColumnIndex,
                    activeItem: activeItemIndex
                      ? this.state.data.tmplVo
                        .itemRowVoList[
                        activeItemIndex
                        ].columnList[activeColumnIndex]
                      : {
                        style: 'CENTER',
                        font: '1_1',
                        prefix: ''
                      },
                    nextIsDashed: activeItemIndex
                      ? this.state.data.tmplVo
                        .itemRowVoList[
                        activeItemIndex
                        ].nextIsDashed
                      : false
                  }
                )}
                dispatch={dispatch}
                params={params}
                editState={this.editState.bind(this)}
              />
            </Col>
          </Row>
        </div>
        <div className={styles.btn_wrapper}>
          <Button className={styles.btn_back} onClick={this.backToList.bind(this)}>返回</Button>
          <Button
            className={styles.btn_back}
            onClick={this.saveEditTmpl.bind(this, 'save')}
          >
            保存
          </Button>
          <Button
            className={styles.btn_save}
            type="primary"
            onClick={this.saveEditTmpl.bind(this, 'save_use')}
          >
            保存并使用此模板
          </Button>
        </div>
        {this.state.data.tmplVo &&
        <NameEditAlert
          data={
            Object.assign({},
              {tmpl: this.state.data.tmplVo},
              {
                visible: this.state.createVisible,
                type: 'EDIT', importData: importData
              })
          }
          createHandleCancel={this.createHandleCancel.bind(this)}
          dispatch={dispatch}
        />}
      </div>
    )
  }
}
