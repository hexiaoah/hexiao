import React, { Component } from 'react'
import { Select, Checkbox, Input, Button } from 'antd'

const { TextArea } = Input
const Option = Select.Option
import styles from './css/main.css'
import cls from 'classnames'
import { message } from 'antd/lib/index'

export default class Right extends Component {
  constructor(props) {
    super(props)
    this.state = {
      placeholder: {
        '1_1': '1倍宽*1倍高',
        '1_2': '1倍宽*2倍高',
        '2_1': '2倍宽*1倍高',
        '2_2': '2倍宽*2倍高',
        // '2_4': '2倍宽*4倍高',
        '4_4': '4倍宽*4倍高'
      },
      align: {
        left: 'LEFT',
        center: 'CENTER',
        right: 'RIGHT'
      }
    }
    this.getOptionHtml = this.getOptionHtml.bind(this)
    this.getAlign = this.getAlign.bind(this)
  }

  //字体下拉框html内容获取
  getOptionHtml() {
    let option = []
    for (let i in this.state.placeholder) {
      option.push(
        <Option value={i} key={i}>
          {this.state.placeholder[i]}
        </Option>
      )
    }
    return option
  }

  //字体对齐方式html内容获取
  getAlign() {
    const { activeItem } = this.props.data
    let align = []
    for (let i in this.state.align) {
      align.push(
        <span
          key={i}
          className={cls(
            styles.align_box,
            styles[`align_${i}`],
            activeItem.style === this.state.align[i] ? styles.align_active : ''
          )}
          onClick={this.alignSelect.bind(this, this.state.align[i])}
        />
      )
    }
    return align
  }

  /**
   * 对齐方式
   * @param type 对齐方式值LEFT/CENTER/RIGHT
   * */
  alignSelect(type) {
    try {
      let obj = Object.assign({}, this.props.data)
      const { activeItemIndex, activeColumnIndex, data } = obj
      data.tmplVo.itemRowVoList[activeItemIndex].columnList[
        activeColumnIndex
      ].style = type
      this.props.editState({ data: data })
    } catch (e) {
      message.error('修改失败')
    }
  }

  /**
   * 字体大小
   * @param fontSize 字体大小 1_1
   * */
  fontSelectChange(fontSize) {
    try {
      let font = fontSize.split('_')
      let obj = Object.assign({}, this.props.data)
      const { activeItemIndex, activeColumnIndex, data } = obj
      data.tmplVo.itemRowVoList[activeItemIndex].columnList[
        activeColumnIndex
      ].dWidth = Number(font[0])
      data.tmplVo.itemRowVoList[activeItemIndex].columnList[
        activeColumnIndex
      ].dHigh = Number(font[1])
      this.props.editState({ data: data })
    } catch (e) {
      message.error('修改失败')
    }
  }

  /**
   * 添加前缀
   * */
  prefixChange(e) {
    let val = e.target.value
    try {
      let obj = Object.assign({}, this.props.data)
      const { activeItemIndex, activeColumnIndex, data } = obj
      data.tmplVo.itemRowVoList[activeItemIndex].columnList[
        activeColumnIndex
      ].prefix = val
      this.props.editState({ data: data })
    } catch (e) {
      message.error('修改失败')
    }
  }

  /**
   * 添加前缀
   * */
  valueChange(e) {
    let val = e.target.value
    try {
      let obj = Object.assign({}, this.props.data)
      const { activeItemIndex, activeColumnIndex, data } = obj
      data.tmplVo.itemRowVoList[activeItemIndex].columnList[
        activeColumnIndex
      ].value = val
      this.props.editState({ data: data })
    } catch (e) {
      message.error('修改失败')
    }
  }

  /**
   *添加下划线
   * @param type ADD 添加 DEL 删除
   * */
  editCutOff(type) {
    try {
      let obj = Object.assign({}, this.props.data)
      const { activeItemIndex, activeColumnIndex, data } = obj
      let nextIndex = Number(activeItemIndex) + 1
      if (type === 'ADD') {
        data.tmplVo.itemRowVoList[activeItemIndex].nextIsDashed = true
        if (
          data.tmplVo.itemRowVoList[nextIndex].columnList[0].itemCode ===
          'I_DASHED'
        ) {
          data.tmplVo.itemRowVoList[nextIndex].columnList[0].showType = 'SHOW'
        } else {
          const cutOffLine = {
            columnList: [
              {
                charNum: 0,
                dHigh: 1,
                dWidth: 1,
                id: "0",
                index: 0,
                itemCode: 'I_DASHED',
                name: '虚线',
                optionList: [],
                parentId: '0',
                prefix: '',
                showType: 'SHOW',
                style: 'CENTER',
                type: 'IT_OTHER',
                value: '',
                widthPct: 100
              }
            ],
            nextIsDashed: false
          }
          data.tmplVo.itemRowVoList.splice(nextIndex, 0, cutOffLine)
        }
        this.props.editState({
          data: data,
          activeItemIndex: '',
          activeColumnIndex: ''
        })
      } else if (type === 'DEL') {
        data.tmplVo.itemRowVoList[activeItemIndex - 1].nextIsDashed = false
        if (
          data.tmplVo.itemRowVoList[nextIndex - 1].columnList[0].itemCode ===
          'I_DASHED'
        ) {
          data.tmplVo.itemRowVoList.splice(nextIndex - 1, 1)
          // data.tmplVo.itemRowVoList[nextIndex-1].columnList[0].showType = 'HIDDEN'
        }
        this.props.editState({
          data: data,
          activeItemIndex: '',
          activeColumnIndex: ''
        })
      }
    } catch (e) {
      message.error('修改失败')
    }
  }

  /**
   * 添加空白行
   * */
  addEmpty() {
    try {
      let obj = Object.assign({}, this.props.data)
      const { activeItemIndex, activeColumnIndex, data } = obj
      const cutOffLine = {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: "0",
            index: 0,
            itemCode: 'I_EMPTY',
            name: '空白行',
            optionList: [],
            parentId: '0',
            prefix: '',
            showType: 'SHOW',
            style: 'LEFT',
            type: '',
            value: '',
            widthPct: 100
          }
        ],
        nextIsDashed: false
      }
      data.tmplVo.itemRowVoList.splice(
        Number(activeItemIndex) + 1,
        0,
        cutOffLine
      )
      let blankIndex = Number(activeItemIndex) + 1;
      this.props.editState({ data: data},blankIndex)
    } catch (e) {
      message.error('修改失败')
    }
  }

  /**
   * 删除空白行
   * */
  delEmpty() {
    try {
      let obj = Object.assign({}, this.props.data)
      const { activeItemIndex, activeColumnIndex, data } = obj
      if (
        data.tmplVo.itemRowVoList[activeItemIndex].columnList[0].itemCode !==
        'I_EMPTY'
      ) {
        message.error('当前选中的行不是空行，不能删除')
        return false
      }
      data.tmplVo.itemRowVoList.splice(Number(activeItemIndex), 1)
      this.props.editState({
        data: data,
        activeItemIndex: '',
        activeColumnIndex: ''
      })
    } catch (e) {
      message.error('修改失败')
    }
  }

  /**
   * 添加自定义内容
   * */
  editCustom(e) {
    let val = e.target.value
    // console.log(e.target.value.replace("\n","2222"))
    try {
      let obj = Object.assign({}, this.props.data)
      const { activeItemIndex, activeColumnIndex, data } = obj
      if (
        data.tmplVo.itemRowVoList[activeItemIndex].columnList[0].itemCode ===
        'I_EMPTY'
      ) {
        data.tmplVo.itemRowVoList[activeItemIndex].columnList[
          activeColumnIndex
        ].value = val
        this.props.editState({ data: data })
      } else {
        message.error('当前选中的行不是空行，无法加入自定义内容')
      }
    } catch (e) {
      message.error('修改失败')
    }
  }

  /**
   * 可选内容
   * */
  optionSelect(e) {
    try {
      let obj = Object.assign({}, this.props.data)
      const { activeItemIndex, activeColumnIndex, data } = obj
      data.tmplVo.itemRowVoList[activeItemIndex].columnList[
        activeColumnIndex
      ].optionList = data.tmplVo.itemRowVoList[activeItemIndex].columnList[
        activeColumnIndex
      ].optionList.map(val => {
        if (e.includes(val.value)) {
          return {
            ...val,
            choice: true
          }
        } else {
          return {
            ...val,
            choice: false
          }
        }
      })
      this.props.editState({ data: data })
      // this.setState({ data: data })
    } catch (e) {
      message.error('修改失败')
    }
  }

  render() {
    const { data, dispatch, params } = this.props
    const { activeItem, nextIsDashed } = data
    let font =
      activeItem.dWidth && activeItem.dHigh
        ? '' + activeItem.dWidth + '_' + activeItem.dHigh
        : '1_1'
    return (
      <ul className={styles.right}>
        <li>
          <div className={styles.right_title}>字体</div>
          <Select
            showSearch
            placeholder={this.state.placeholder[font]}
            optionFilterProp="children"
            value={font}
            onChange={this.fontSelectChange.bind(this)}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            className={styles.right_input}
          >
            {this.getOptionHtml()}
          </Select>
        </li>
        <li>
          <div className={styles.right_title}>对齐</div>
          <div>{this.getAlign()}</div>
        </li>
        {(() => {
          if (!!activeItem.optionList && activeItem.optionList.length > 0) {
            let optionList = activeItem.optionList
            let activeOption = optionList.map(val => {
              if (!!val.choice) {
                return val.value
              }
            })
            return (
              <li>
                <div className={styles.right_title}>可选内容</div>
                <Checkbox.Group
                  style={{ width: '100%' }}
                  defaultValue={activeOption}
                  onChange={this.optionSelect.bind(this)}
                >
                  {activeItem.optionList.length > 0 &&
                    activeItem.optionList.map((val, index) => {
                      return (
                        val.itIsOption && (
                          <p className={styles.right_select} key={index}>
                            <Checkbox value={val.value} checked={!!val.choice}>
                              {val.name}
                            </Checkbox>
                          </p>
                        )
                      )
                    })}
                </Checkbox.Group>
              </li>
            )
          }
        })()}
        {(() => {
          if (
            !activeItem.fixedText &&
            activeItem.itemCode !== 'I_EMPTY' &&
            activeItem.itemCode !== 'I_DASHED'
          ) {
            return (
              <li>
                <div className={styles.right_title}>前缀</div>
                <Input
                  value={activeItem.prefix}
                  className={styles.right_input}
                  onChange={this.prefixChange.bind(this)}
                  maxLength="10"
                />
              </li>
            )
          }
        })()}

        {(() => {
          if (activeItem.fixedText) {
            return (
              <li>
                <div className={styles.right_title}>文字内容</div>
                <Input
                  value={activeItem.value}
                  className={styles.right_input}
                  onChange={this.valueChange.bind(this)}
                />
              </li>
            )
          }
        })()}
        {(() => {
          if (activeItem.itemCode === 'I_EMPTY') {
            return (
              <li>
                <div className={styles.right_title}>自定义内容</div>
                <TextArea
                  value={activeItem.value}
                  className={cls(styles.right_input,styles.right_textArea)}
                  onChange={this.editCustom.bind(this)}
                  maxLength="150"
                />
              </li>
            )
          }
        })()}
        <li>
          <Button
            className={cls(styles.right_input, styles.right_btn)}
            onClick={this.addEmpty.bind(this)}
          >
            在下方增加空行
          </Button>
        </li>
        {nextIsDashed ? (
          ''
        ) : (
          <li>
            <Button
              className={cls(styles.right_input, styles.right_btn)}
              onClick={this.editCutOff.bind(
                this,
                activeItem.itemCode !== 'I_DASHED' ? 'ADD' : 'DEL'
              )}
            >
              {activeItem.itemCode !== 'I_DASHED'
                ? '在下方添加分隔符'
                : '删除分隔符'}
            </Button>
          </li>
        )}
        {activeItem.itemCode !== 'I_EMPTY' ? (
          ''
        ) : (
          <li>
            <Button
              className={cls(styles.right_input, styles.right_btn)}
              onClick={this.delEmpty.bind(this)}
            >
              删除空行
            </Button>
          </li>
        )}
      </ul>
    )
  }
}
