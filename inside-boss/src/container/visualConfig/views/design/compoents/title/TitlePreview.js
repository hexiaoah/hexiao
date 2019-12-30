import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import cx from 'classnames'

import style from'./TitlePreview.css'

export default class TitleEditorPreview extends PureComponent {
  render() {
    const { config } = this.props.value;
    const { text, size, linkGoodsId, linkPage } = config
    return (
      <div className="zent-design-component-title-preview">
        <div className={cx(style.titlePreview  + ' ' + style[`title${size}`] )} style={createStyle(config)} >
          <p>{text ? text : '请输入标题内容' }</p>
          {(linkGoodsId || linkPage) && <Icon type="right" />}
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
