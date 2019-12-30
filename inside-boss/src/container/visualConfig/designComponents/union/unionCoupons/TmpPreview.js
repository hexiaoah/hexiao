import React, { PureComponent } from 'react'
import style from './TmpPreview.css'


export default class BannerPreview extends PureComponent {

  render() {
    return (
          <div className={style.couponsPreview}
          >
              <img src='https://assets.2dfire.com/frontend/1bb1ea4f10562f0ed82e92b382e6adb2.png'/>
          </div>
      )
  }
}

