import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
// debugger
import style from './TmpPreview.css'

export default class CouponsPreview extends PureComponent {
  static propTypes = {
      value: PropTypes.object,

  };

  state = {
      data: [],
  }

  singlePreiw = () => {
      const { config } = this.props.value
      const { backgroundColor, items } = config
      return (
          <div className={style.singleCoupons}>
              <div className={style.singleCouponsLeft} style={{ backgroundColor }}>
                  <p className={style.couponsPrice}><span>￥</span>18.8</p>
                  <p className={style.couponsType}>全场满500可用</p>
              </div>
              <div className={style.singleCouponsRight}>立即领取</div>
          </div>
      )
  }

  arrChange = (len) => {
      let arr = []
      for (let i = 0 ; i < len; i++) {
          arr.push(i)
      }
      return arr
  }

  morePreiw = () => {
      const { value } = this.props
      const { config } = value
      const { backgroundColor, fetchLength, source, items } = config
      let arr = []
      if (source == 'manualAdd') {
          arr = this.arrChange(items.length)
      } else {
          arr = this.arrChange(fetchLength)
      }
      return (
          <div className={style.manyCouponsList} style={createStyle(config)}>
              {arr.map((i) =>
                  <div className={style.manyCoupons} key={i}>
                      <div className={style.manyCouponsLeft} style={{ backgroundColor }}>
                          <p className={style.couponsPrice}><span>￥</span>18.8</p>
                          <p className={style.couponsType}>全场满500可用</p>
                      </div>
                      <div className={style.manyCouponsRight}>立即领取</div>
                  </div>,
              )}
          </div>
      )
  }

  initPriew = () => {
      const { config } = this.props.value
      if (config.source == 'manualAdd') { // 手动指定
          if (config.items.length > 1) { // 多个优惠券
              return this.morePreiw()
          }
          return this.singlePreiw()
      }
      if (config.source == 'fetch') { // 手动指定
          if (config.fetchLength == 1) {
              return this.singlePreiw()
          }
          return this.morePreiw()
      }
  }

  render() {

      return (
          <div className={style.couponsPreview}>
              {this.initPriew()}
          </div>
      )
  }
}

function createStyle(config) {
    const { source, fetchLength, items } = config
    const Width = 165
    let couponsWidth = 375
    if (source == 'manualAdd') {
        if (items.length > 1) {
            couponsWidth = Width * items.length
        }
    }
    if (source == 'fetch') {
        if (fetchLength  ==  1) {
            couponsWidth = couponsWidth
        } else {
            couponsWidth = Width * fetchLength
        }
    }
    return {
        width: couponsWidth,
    }
}
