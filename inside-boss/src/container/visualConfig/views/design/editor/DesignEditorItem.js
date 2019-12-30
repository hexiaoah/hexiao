import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import PropTypes from 'prop-types';
import style from './DesignEditorItem.css'

export default class DesignEditorItem extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,

    disabled: PropTypes.bool,

    prefix: PropTypes.string,

    className: PropTypes.string,

    move: PropTypes.bool,

    compName: PropTypes.string,

    index: PropTypes.number
  };

  static defaultProps = {
    disabled: false,
    move: false,
    compName: '',
    index: -1
  };

  render() {
    const { disabled, prefix, move, compName, handleClickBySortUp, handleClickBySortDown, index, onCloseEditor } = this.props;
    return (
      <div className={cx(style.editorItem)}>
        {disabled && <div className={`${prefix}-design__disabled-mask`} />}
        {move && <div className={style.disabledMove}>
          <span className={style.editorItemName}>{compName}</span>
          <span className={style.editorItemUp} onClick={(e) => handleClickBySortUp(index, e)}></span>
          <span className={style.editorItemDown} onClick={(e) => handleClickBySortDown(index, e)}></span>
          <span className={style.editorItemDele} onClick={(e) => onCloseEditor()}></span>
        </div>}
        <div className={style.editorComponentEditor}>{this.props.children}</div>
      </div>
    );
  }

  getBoundingBox() {
    const node = findDOMNode(this);
    return node && node.getBoundingClientRect();
  }
}
