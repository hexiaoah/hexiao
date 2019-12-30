import React, { Component } from 'react'
import { Select } from 'antd'

const Option = Select.Option
import AddPicture from './addPicture'
import styles from './css/main.css'
import * as bridge from '../../utils/bridge'
import cls from 'classnames'


export default class Content extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: {
        CENTER: {
          textAlign: 'center'
        },
        LEFT: {
          textAlign: 'left'
        },
        RIGHT: {
          textAlign: 'right'
        }
      },
      qr_code: 'https://assets.2dfire.com/frontend/e4f32ae6674c9eb8513904afc04b468e.png'
    }
  }

  /**
   * @param obj，必传
   * @param type 节点类型，p/span，必传
   * @param index 当前元素在父节点中的index值,
   * @param sum 当前节点总共长度,
   * @param fistShowIndex 父节点长度值,
   * @return styles style样式
   * **/
  getStyle(obj, type, index, sum, fistShowIndex) {
    let itemStyles = Object.assign({}, this.state.style[obj.style])
    // if (obj.itemCode === 'I_DASHED' && type === 'SHOW'&&obj.itemCode!=='I_SHOP_QRCODE') {
    //   itemStyles['borderBottom'] = '1px dashed #ccc'
    // }
    if (obj.showType === 'HIDDEN') {
      itemStyles.margin = '6px 0'
      itemStyles.pointerEvents = 'none'
      itemStyles.paddingTop = '0px'
      itemStyles.paddingBottom = '0px'
    }
    console.log('output itemStyles.width',sum,obj, itemStyles.width);
    if (sum === 100) {
      itemStyles.width = obj.widthPct + '%'
    }
    else if(sum > 100) {
      console.log('!!!itemStyles',itemStyles)
      itemStyles.width = obj.defWidthPct + '%'
    }
    else {
      if (fistShowIndex === index) {
        itemStyles.width = obj.widthPct + (100 - sum) + '%'
      } else {
        itemStyles.width = (type === 'SHOW' ? obj.widthPct : 0) + '%'
      }
    }
    return itemStyles
  }

  AddUploadLogo(e) {
    console.log(e)
    this.props.AddUploadLogo(e)
  }

  render() {
    const { data, dispatch, params, type } = this.props
    const { itemRowVoList, activeIndex, isActiveEdit } = data
    console.log('output itemRowVoList!!!!',itemRowVoList);
    const width =
      (bridge.getParamsObject().width === '58' ? 32 * 6 + 60 : 48 * 6 + 60) +
      'px'
    return (
      <div
        className={cls(
          styles.center_wrapper,
          type === 'SHOW' ? styles.show_wrapper : ''
        )}
        style={{
          width: width,
          pointerEvents: type === 'SHOW' ? 'none' : 'auto'
        }}
      >
        {itemRowVoList &&
          itemRowVoList.map((item, num) => {
            if (item.columnList.length > 0) {
              let sum = 0,
                fistShowIndex = undefined
              let withArr = item.columnList.map((val, index) => {
                let item = val.showType === 'SHOW' ? val.widthPct : 0
                sum += item
                if (item !== 0 && fistShowIndex === undefined) {
                  fistShowIndex = index
                }
                return item
              })
              return (
                <div key={num} className={styles.content_p}>
                  {item.columnList.map((val, index) => {
                    // 显示内容
                    if (val.showType === 'SHOW') {
                      let font = `${val.dWidth}_${val.dHigh}`
                      return (
                        <span
                          key={`${num}_${index}`}
                          style={this.getStyle(
                            val,
                            'SHOW',
                            index,
                            sum,
                            fistShowIndex
                          )}
                          className={cls(
                            //默认样式
                            styles.content_span,
                            //下划线样式
                            val.itemCode === 'I_DASHED'
                              ? styles.content_dotted
                              : '',
                            //是否需要添加hover样式
                            val.itemCode !== 'I_SHOP_QRCODE' &&
                              val.itemCode !== 'I_SHOP_LOGO'
                              ? styles.content_hover
                              : '',
                            //文字大小
                            styles[
                              `contentCode_${
                                font === '1_1' ? val.itemCode : ''
                              }`
                            ],
                            //文字对齐方式
                            styles[`fontWrapper${font}`],
                            //选中后的样式
                            num + '_' + index === activeIndex &&
                              val.itemCode !== 'I_SHOP_QRCODE' &&
                              val.itemCode !== 'I_SHOP_LOGO'
                              ? styles.content_active
                              : ''
                          )}
                          onClick={
                            type === 'SHOW'
                              ? ''
                              : this.props.contentSelect.bind(
                                  this,
                                  `${num}_${index}`
                                )
                          }
                        >
                          {/*?{val.itemCode.indexOf('QR_')}~~~{val.img}*/}
                          {(() => {
                            // if(num + '_' + index === isActiveEdit){
                            //   {/*编辑状态下*/}
                            //  return  <textarea
                            //     className={cls(styles[`align_${val.style}`])}
                            //     contentEditable="true"
                            //     autoFocus="autofocus"
                            //     value={  `${val.prefix}${val.value}`}
                            //     onInput={this.props.editCustomVal.bind(this)}
                            //   />
                            // }else {
                            // 正常状态下
                            if (val.itemCode.indexOf('QR_') === 0) {//二维码
                            // if (val.itemCode === 'I_SHOP_QRCODE') {//二维码
                              // return <img src={val.img} />
                              return <img className={styles.qr_code} src={this.state.qr_code} />
                            } else if (val.itemCode === 'I_SHOP_LOGO') {//logo
                              return (
                                <AddPicture
                                  data={data.itemRowVoList[num].columnList[index]}
                                  dispatch={dispatch}
                                  type={type}
                                  index={`${num}_${index}`}
                                  AddUploadLogo={this.AddUploadLogo.bind(this)}
                                />
                              )
                            } else {
                              return (
                                <span
                                  className={cls(styles[`align_${val.style}`])}
                                >
                                  {/*可选项||value*/}
                                  {(()=>{
                                    if( val.itemCode === 'I_EMPTY'){
                                      let arr=val.value.split('\n');
                                      return (arr.map((item,i)=>{
                                          return (<div key={i}>{item}<br/></div>)
                                        })
                                      )
                                    }
                                    if(val.optionList.length <= 0 ){
                                      return  (!val.fixedText ? val.prefix || '' : '') + val.value
                                    }else {
                                      return val.optionList.map((items2, index2) => {
                                        if (
                                          items2.choice === true ||
                                          items2.itIsOption === false
                                        ) {
                                          return items2.value
                                        }
                                      })
                                    }
                                  })()}
                                  {/*{val.optionList.length <= 0 ? '' +*/}
                                      {/*(!val.fixedText &&*/}
                                      {/*val.itemCode !== 'I_EMPTY'*/}
                                        {/*? val.prefix || ''*/}
                                        {/*: '') +*/}
                                      {/*val.value.replace(/\n/g,<br/>)*/}
                                    {/*: val.optionList.map((items2, index2) => {*/}
                                        {/*if (*/}
                                          {/*items2.choice === true ||*/}
                                          {/*items2.itIsOption === false*/}
                                        {/*) {*/}
                                          {/*return items2.value*/}
                                        {/*}*/}
                                      {/*})}*/}
                                </span>
                              )
                            }
                            // }
                          })()}
                        </span>
                      )
                      //隐藏内容
                    }
                    // else {
                    // return (
                    //   <span
                    //     key={`${num}_${index}`}
                    //     style={(() => {
                    //       return that.getStyle(val, 'HIDDEN',index,sum,fistShowIndex)
                    //     })(val)}
                    //     className={styles.content_placeholder}
                    //   />
                    // )
                    // }
                  })}
                </div>
              )
            }
          })}
      </div>
    )
  }
}
