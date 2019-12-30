import React, { PureComponent } from 'react';
import style from './DesignpreviewItem.css'

export default class DesignPreviewItem extends PureComponent {
  render() {
    const { children } = this.props;
    return <div className={style.designPreviewItem}>{children}</div>;
  }
}