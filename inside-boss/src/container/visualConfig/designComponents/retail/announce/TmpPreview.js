import React, { PureComponent } from 'react';
import cx from 'classnames'
import { Icon } from 'antd';

import style from'./TmpPreview.css'

export default class AnnouncePreview extends PureComponent {
  render() {
    const { config } = this.props.value;
    const { text } = config
    return (
      <div className="zent-design-component-Announce-preview">
        <div className={style.AnnouncePreview} style={createStyle(config)} >
          <img className={style.Icon} src="https://assets.2dfire.com/frontend/6729d47fd2ada8dbf6b49478726eb79f.png" />{text ? text : '公告内容过长时会滚动展示'}
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
