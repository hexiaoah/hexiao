import React, { Component } from 'react'
import { Select } from 'antd'

const Option = Select.Option
import styles from './css/main.css'
import cls from 'classnames'
// import { data } from './data'
export default class Left extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { data, dispatch, params } = this.props
    const { itemTypeVoList } = data
    return (
      <div className={styles.left}>
        <ul>
          {itemTypeVoList&&itemTypeVoList.map((item,num) => {
            return (
              <li key={item.itemTypeCode}>
                <div className={styles.left_title}>{item.itemTypeName}</div>
                <ul className={styles.left_content}>
                  {item.optionList.map((val,index) => {
                    return (
                      <li key={val.itemCode}
                        className={cls(
                          styles.left_li,
                          val.choice ? styles.left_li_active : ''
                        )}
                        data-code={val.itemCode}
                        data-index={index}
                        data-parent={num}
                        onClick={this.props.handleSelect}
                      >
                        <span className={styles.left_li_span}>
                          <span className={styles.left_li_2}
                                style={{"-webkit-box-orient": "vertical"}}
                          >
                                {val.name}
                          </span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
