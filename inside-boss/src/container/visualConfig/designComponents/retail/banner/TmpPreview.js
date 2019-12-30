import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import style from './TmpPreview.css'


export default class ConfigPreview extends PureComponent {
  static propTypes = {
      value: PropTypes.object,

  };

  modePriew = () => {
      const { config } = this.props.value
    return (config.mode == '1'
      ? <img className={style.configLogo} src='https://assets.2dfire.com/frontend/4fd023969fc79ca01056fa728be7b685.png'/>
      :      <div className={style.configInfo}>
              <div className={style.top}>
                  <img className={style.configInfoLogo} src='https://assets.2dfire.com/frontend/4fd023969fc79ca01056fa728be7b685.png'/>
                  <div className={style.configAdress}>二维火智能超市（教工路店）</div>
              </div>
              <div className={style.main}>
                  <div className={style.company}>
                      <p className={style.time}>营业时间：周一至周日9:00-22:00</p>
                      <p><span className={style.environment} />二维火科技大厦</p>
                  </div>
              </div>
          </div>
      )
  }


  render() {
      const { value } = this.props
    const { config } = value

    return (
          <div className={style.configPreview}
          >
              <div
                  className={cx(style.configBanner, 'desigeCove')}
                  style={createStyle(config)}
              />
              {this.modePriew()}
          </div>
      )
  }
}

function createStyle(value) {
    const { mode } = value
  return {
        height: mode == '1' ? '140px' : '190px',
        backgroundImage: value.backgroundImage ?  `url(${value.backgroundImage})` : "url('https://assets.2dfire.com/frontend/63b8d3cc92e8047f9fca0c1fdc8a9f31.png')",
    }
}

