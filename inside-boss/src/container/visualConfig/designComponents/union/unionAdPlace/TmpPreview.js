import React, { PureComponent } from 'react'
import style from './TmpPreview.css'


export default class BannerPreview extends PureComponent {

  render() {
    return (
          <div className={style.configPreview}
          >
              <img src='https://assets.2dfire.com/frontend/b945f5ffea74f1c6a393338b369d0fd5.png'/>
          </div>
      )
  }
}

