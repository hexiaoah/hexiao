import React, { PureComponent } from 'react';

import style from'./SliderPreview.css'

export default class SliderEditorPreview extends PureComponent {
  render() {
    const { config } = this.props.value;

    return (
      <div className="zent-design-component-line-preview">
        <div className={style.linePreview} style={createStyle(config)} />
      </div>
    );
  }
}

function createStyle(value) {
  const { height } = value;

  return {
    height: `${height}px`,
  };
}
