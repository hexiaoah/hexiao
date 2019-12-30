import React, { PureComponent } from 'react';
import style from'./TmpPreview.css'

export default class HotGoodsPreview extends PureComponent {
  render() {
    const { config } = this.props.value;
    const { title, description } = config
    return (
      <div className="zent-design-component-title-preview">
        <div className={style.hotGoodsPreview}>
          <div className={style.header}>
            <div>
              <span className={style.title}>{title}</span>
              <img className={style.icon} src="https://assets.2dfire.com/frontend/8c287a78003e1b3d59bd146acbb5ee62.png"></img>
            </div>
            <div className={style.description}>{description}</div>
          </div>
        </div>
      </div>
    );
  }
}

