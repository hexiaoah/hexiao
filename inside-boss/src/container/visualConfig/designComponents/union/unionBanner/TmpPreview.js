import React, { PureComponent } from 'react'
import style from './TmpPreview.css'


export default class BannerPreview extends PureComponent {

  render() {
    return (
          <div className={style.configPreview}
          >
              <img src='https://assets.2dfire.com/frontend/297aa28fedca82bf80b1290e5de50099.png'/>
          </div>
      )
  }
}

