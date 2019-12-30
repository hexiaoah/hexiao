import React from 'react';
import { DesignEditor } from '@src/container/visualConfig/views/design/editor/DesignEditor';

export default class BannerPreview extends DesignEditor {
  render(){
    const { prefix } = this.props;
    return (
      <div className={`${prefix}-design-component-config-editor`}>
      </div>
    )
  }
}
