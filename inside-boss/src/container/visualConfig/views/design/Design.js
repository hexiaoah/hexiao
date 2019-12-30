import React, { PureComponent } from 'react';
import find from 'lodash/find';
import uuid from 'uuid';
import assign from 'lodash/assign';
import { message } from 'antd';

import DesignPreiew from './preview/DesignPreview'
import style from './design.css'

import {
  isExpectedDesginType,
} from './utils/design-type';

const UUID_KEY = '__zent-design-uuid__';

export default class Design extends PureComponent {
  static defaultProps = {
    preview: DesignPreiew,
    value: [], //
    defaultSelectedIndex: -1, // 默认选中的组件下标
    prefix: 'zent',
  };

  constructor(props) {
    super(props)
    const { value, defaultSelectedIndex } = this.props

    const safeValueIndex = getSafeSelectedValueIndex(
      defaultSelectedIndex,
      value
    )
    const selectedValue = value[safeValueIndex];
    this.state = {
      showAddComponentOverlay: false,// 是否显示添加组件的浮层
      settings: {}, // 外面没传的时候用 state 上的 settings
      selectedUUID: this.getUUIDFromValue(selectedValue),
      validations: {},// 当前所有组件的 validation 信息，key 是 value 的 UUID
    }
  }

  setMaxCompont = (val, title) => {
    // 组件最大数
    const { compontmaxNum } = this.props
    let index = 0 // 计数
    if (val.length == 0) return

    const _valLength = val.length
    for (let i=0; i < _valLength; i++) {
      if(title == val[i].title) index++
    }

    const maxNum = compontmaxNum[title]
    if(maxNum == index) {
      return true
    }

  }

  // 添加一个新组件
  onAdd = (component, fromSelected) => {
    const { value, settings, onChange, compontmaxNum, designMode} = this.props
    const { editor, defaultType } = component;
    const instance = editor.getInitialValue()

    instance.canDelete = true // 是否可以删除
    instance.type = editor.designType
    instance.title = editor.designDescription

    const maxNum = compontmaxNum[instance.title]
    if (this.setMaxCompont(value, instance.title)) {
      message.info(`该组件最大可以添加${maxNum}个`);
      return
    }
    const id = uuid();
    this.setUUIDForValue(instance, id);

    let newValue;
    if(designMode == '商品分类页'){
      //无论添加什么组件，只允许添加在商品分类组件上方。
      newValue = this.cateValue(value, instance)
    } else {
      newValue = value.concat(instance);
    }
    onChange(newValue)
    this.onSelect(instance)
  }

  cateValue = (value, instance) => {
    const newVal =  [...value];
    const index = newVal.findIndex((c) => c.type == "cateList")
    newVal.splice(index, 0, instance)
    return newVal
  }

  //点击向上排序按钮事件
  handleClickBySortUp = (index, e) => {
    const { value, onChange } = this.props
    e.stopPropagation();
    let newValue = [...value];
    if (index == 0 ) return false
    let temp = newValue[index - 1];
    newValue[index - 1] = newValue[index];
    newValue[index] = temp;
    onChange(newValue)
  }
  //点击向下排序按钮事件
  handleClickBySortDown =(index, e) => {
    const { value, onChange } = this.props
    e.stopPropagation();
    let newValue = [...value];
    if (index == newValue.length - 1) return false
    let temp = newValue[index + 1];
        newValue[index + 1] = newValue[index];
        newValue[index] = temp;
        onChange(newValue)
  }
  // 选中一个组件
  onSelect = component => {
    const id = this.getUUIDFromValue(component);
    const { showAddComponentOverlay } = this.state;
    if (this.isSelected(component) && !showAddComponentOverlay) {
      return;
    }
    this.setState({
      selectedUUID: id,
      showAddComponentOverlay: false,
    });
  }
  // 关闭组件
  onCloseEditor= () =>{
    this.setState({
      selectedUUID: '',
    });
  }
  // 删除一个组件
  onDelete = index => {
    const { value, onChange } = this.props
    let newValue = [...value];
    newValue.splice(index, 1)
    onChange(newValue)
  };
  onComponentValueChange = (identity, diff, replace = false)=> {
    // 组件样式调整
    const { value } = this.props;
    const newComponentValue = replace
     ? assign({ [UUID_KEY]: this.getUUIDFromValue(identity) }, diff)
    : assign({}, identity, diff);
    const newValue = value.map(v => (v === identity ? newComponentValue : v));
    this.trackValueChange(newValue)
  };

    // 调用 onChange 的统一入口，用于处理一些需要知道有没有修改过值的情况
    trackValueChange(newValue, writeCache = true) {
      const { onChange } = this.props;
      onChange(newValue);
    }

  validateComponentValue = (value, prevValue, changedProps) => {
    const { type } = value;
    const { components } = this.props;
    const comp = find(components, c => isExpectedDesginType(c, type));
    const { validate } = comp.editor;
    const p = validate(value, prevValue, changedProps);

    return p;
  };

  render() {
    const { preview, value, prefix } = this.props

    return (
      <div className={style.zentDesign}>
        {this.renderPreview(preview)}
      </div>
    );
  }

  getUUIDFromValue(value) {
    return value && value[UUID_KEY];
  }

  setUUIDForValue(value, id) {
    if (value) {
      value[UUID_KEY] = id;
    }

    return value;
  }

  isSelected = value => {
    const { selectedUUID } = this.state;
    return this.getUUIDFromValue(value) === selectedUUID;
  };

  renderPreview(preview){
    const { components, prefix, value, backgroundChang, backgroundImage, designMode } = this.props
    const {selectedUUID} = this.state
    const { showAddComponentOverlay, settings, validations } = this.state
    return React.createElement(preview, {
      components,
      prefix,
      value,
      designMode,
      backgroundChang,
      backgroundImage,
      showAddComponentOverlay,
      settings,
      onAddComponent: this.onAdd,
      handleClickBySortUp: this.handleClickBySortUp,
      handleClickBySortDown: this.handleClickBySortDown,
      selectedUUID,
      getUUIDFromValue: this.getUUIDFromValue,
      onSelect: this.onSelect,
      validations,
      onDelete: this.onDelete,
      onCloseEditor: this.onCloseEditor,
      onComponentValueChange: this.onComponentValueChange,
    })
  }
}


function getSafeSelectedValueIndex(index, value) {
  return Math.min(index, value.length - 1)
}
