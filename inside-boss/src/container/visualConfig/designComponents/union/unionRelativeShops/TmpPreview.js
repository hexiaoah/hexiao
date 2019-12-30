import React, { PureComponent } from 'react'
import style from './TmpPreview.css'


export default class BannerPreview extends PureComponent {

  render() {
    return (
          <div className={style.configPreview}
          >
              <img src='https://assets.2dfire.com/frontend/2c452fc0435300460c37373b5c4c81e9.png'/>
          </div>
      )
  }
}

