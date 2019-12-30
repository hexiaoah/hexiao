import React from 'react';
import { DesignEditor } from '@src/container/visualConfig/views/design/editor/DesignEditor';

export default class TmpEditor extends DesignEditor {
  render(){
    const { prefix } = this.props;
    return (
      <div className={`${prefix}-design-component-coupons-editor`}>
      </div>
    )
  }
}
