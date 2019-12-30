import React, { PureComponent } from 'react';
import cx from 'classnames'
import { Icon } from 'antd';

import style from'./TmpPreview.css'

export default class TelephonePreview extends PureComponent {
  render() {
    const { config } = this.props.value;
    return (
      <div className="zent-design-component-telephone-preview">
           <div className={style.TelephonePreview} style={createStyle(config)} >
          <img className={style.Icon} src="https://assets.2dfire.com/frontend/41927c4973cbc6a238e992fe880c6407.png" />客服电话：+ 86-88886666
        </div>
      </div>
    );
  }
}

function createStyle(value) {
  const { textColor, textAlign, backgroundColor } = value;

  return {
    color: textColor,
    textAlign: textAlign,
    backgroundColor: backgroundColor
  };
}
