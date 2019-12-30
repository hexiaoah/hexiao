import React, { PureComponent } from 'react'
import style from './TmpPreview.css'


export default class BannerPreview extends PureComponent {

  render() {
    return (
          <div className={style.configPreview}
          >
              <img src='https://assets.2dfire.com/frontend/2e38d3ff1eadf38e6efc5772084ce20f.png'/>
          </div>
      )
  }
}

