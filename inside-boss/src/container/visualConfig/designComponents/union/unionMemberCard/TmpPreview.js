import React, { PureComponent } from 'react'
import style from './TmpPreview.css'


export default class BannerPreview extends PureComponent {

  render() {
    return (
          <div className={style.configPreview}
          >
              <img src='https://assets.2dfire.com/frontend/efeb643c543af61dc5963633045b230f.png'/>
          </div>
      )
  }
}

