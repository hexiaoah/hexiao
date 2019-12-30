import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames';
import { Popconfirm, message } from 'antd';
import style from './DesignPreviewController.css'

export default class DesignPreviewController extends PureComponent {
  static PropTypes = {
    value: PropTypes.array.isRequired,
    // 选中组件事件
    onSelect: PropTypes.func.isRequired,
    // 用来渲染预览的组件
    component: PropTypes.func.isRequired,
    // 是否选中组件
    selected: PropTypes.bool,
  }
  static defaultProps = {
    prefix: 'zent',
  }
  onDelete = () => {
    const { onDelete, index } = this.props
    onDelete(index)
  }
  render() {
    const {
      value,
      onSelect,
      component: PreviewComponent,
      prefix,
      canDelete,
      designMode,
      selected
    } = this.props
    return (
      <div onClick={() => onSelect(value)}>
        <div className={cx(
            style[`${prefix}-design-preview-controller__drag-handle`],
            {
              [style[`${prefix}-design-preview-controller__nav`]]: designMode == '店铺导航',
            }
          )}>
          {selected && <div className = {style.previewControllerSelect} /> }
          <PreviewComponent prefix={prefix} value={value} />
          {canDelete &&(
              <DeleteButton className={style.deleteButton} prefix={prefix} onDelete={this.onDelete} txt="abc" />
            )
          }
        </div>
      </div>
    )
  }
}

function DeleteButton({ prefix, onDelete }) {
  return (
    <Popconfirm
      title="确定删除？"
      trigger="click"
      okText="确认" 
      cancelText="取消"
      onConfirm={onDelete}
      wrapperClassName={style.actionBtnDelete}
    >
    {/* <a href="#">Delete</a> */}
      <img className={style.DeleteImg} src='https://assets.2dfire.com/frontend/73a3ec09ff1b5814aea734d1e7e226cb.png' />
      {/* <IconDelete prefix={prefix} /> */}
    </Popconfirm>
  );
}

class IconDelete extends PureComponent {
  render() {
    const { prefix, onClick } = this.props;
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        className={style.iconDelete}
        onClick={onClick}
      >
        <g fill="none" fillRule="evenodd">
          <circle cx="10" cy="10" r="10" />
          <path
            fill="#FFF"
            d="M13.75 7.188l-.937-.938L10 9.063 7.188 6.25l-.938.937L9.062 10 6.25 12.812l.937.938L10 10.938l2.812 2.812.938-.937L10.938 10"
          />
        </g>
      </svg>
    );
  }
}

function stopEventPropagation(evt) {
  evt && evt.stopPropagation();
}
