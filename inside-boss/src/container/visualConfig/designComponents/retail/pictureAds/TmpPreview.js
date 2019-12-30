import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'antd'
import cx from 'classnames'
import style from './TmpPreview.css'

export default class AdPreview extends PureComponent {
  static propTypes = {
      value: PropTypes.object,
  };

  state = {
      arrImg: [],
      fistImgHeight: 0,
  }
  componentDidMount() {
      this.init(this.props)
  }
  componentWillReceiveProps(nextProps) {
      this.init(nextProps)
  }

  init(props) {
      const { config } = props.value
    const { items } = config
      const length = items.length
      let arr = []
    for (let i = 0; i < length; i++) {
          if (items[i].picture !== '') {
              arr.push(items[i].picture)
          }
      }
      this.getImgHeight(arr)
      this.setState({
          arrImg: arr,
      })
  }

  getImgHeight = (arr) => {
      // 获取图片的第一图的高度，设置等比例高度
      let w
      let h
      const img = new Image()
      img.src = arr[0]
      img.onload = () => {
          w = img.width
          h = img.height
          this.setState({
              fistImgHeight: Math.round(h * 375 / w),
          })
      }
  }

  sigleItem = () => {
      const { config } = this.props.value
    const { items } = config
      let hasPicture = false
      if (items.length > 0) {
          hasPicture = true
      }
      if (items.length ==  0) {
          hasPicture = false
      }

      return hasPicture ? <img className={style.sigleImg} src={items[0].picture} /> : <div className={style.defulatImg}><p>点击进行图片广告编辑<br />建议宽度750像素</p></div>
  }

  swiperItem = (arrImg) => {
      const { fistImgHeight } = this.state
      return (
          <Carousel>
              {arrImg.length
          ? arrImg.map((item) => <div>
                          <div className={cx(style.list, 'desigeCove')} style={{ height: fistImgHeight + 'px', backgroundImage: `url(${item})` }}></div>
                      </div>,)
        : <div className={style.defulatImg}><p>点击进行图片广告编辑<br />建议宽度750像素</p></div>
              }
          </Carousel>
      )
  }

  render() {
      const { config } = this.props.value
    const { arrImg } = this.state
      return (
          <div className={style.adPreview}>
              {config.mode == '单图' ? this.sigleItem() : this.swiperItem(arrImg)}
          </div>
      )
  }
}
