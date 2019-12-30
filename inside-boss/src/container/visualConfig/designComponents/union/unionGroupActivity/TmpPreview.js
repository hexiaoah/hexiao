import React, { PureComponent } from 'react'
import style from './TmpPreview.css'


export default class BannerPreview extends PureComponent {

  render() {
    return (
          <div className={style.configPreview}
          >
              <img src='https://assets.2dfire.com/frontend/59879ca26bc53a7500aa339ce57d5d5e.png'/>
          </div>
      )
  }
}

