import React, { PureComponent } from 'react';
import cx from 'classnames'
import { Icon } from 'antd';

import style from'./SeachPreview.css'

export default class SeachPreview extends PureComponent {
  render() {
    const { config } = this.props.value;
    const { shape, backgroundColor } = config
    return (
      <div className="zent-design-component-title-preview">
        <div className={style.seachPreview} style={{backgroundColor: backgroundColor}} >
          <div style={createStyle(config)} className = {cx(style.seachinput +' '+ style[`seach${shape}`])}><Icon type="search" />&nbsp;&nbsp;搜索内容</div>
        </div>
      </div>
    );
  }
}

function createStyle(value) {
  const { textColor, textAlign } = value;

  return {
    color: textColor,
    textAlign: textAlign,
  };
}
