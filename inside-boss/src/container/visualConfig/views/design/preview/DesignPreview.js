import React, { PureComponent } from 'react';
import find from 'lodash/find';
import DesignPreviewItem from './DesignPreviewItem'
import DesignEditorItem from '../editor/DesignEditorItem';
import DesignPreviewController from './DesignPreviewController'
import DesignEditorAddComponent from '../editor/DesignEditorAddComponent';
import BackgroundPreview from '../compoents/background';
import { isExpectedDesginType } from '../utils/design-type';

import style from './DesignPreview.css'

export default class DesignPreview extends PureComponent {
  static defaultProps = {
    background: '#f9f9f9',
    disabled: false,
    appendableComponents: [],
    prefix: 'zent',
  };

  imgHeight = (url) => {
    var img = new Image()
    img.src = url
    img.onload =() => {
      return `${img.height}px`
    }
  }

  render() {
    const {
      components,
      prefix,
      value,
      showAddComponentOverlay,
      onAddComponent,
      settings,
      getUUIDFromValue,
      selectedUUID,
      onSelect,
      onComponentValueChange,
      validations,
      handleClickBySortUp,
      handleClickBySortDown,
      onDelete,
      onCloseEditor,
      backgroundChang,
      backgroundImage,
      designMode
    } = this.props

    return (
      <div className={style.Designpreview}>
        <div className={style.DesignEditorItem}
        >
          <DesignEditorAddComponent
            prefix={prefix}
            fromSelected
            designMode={designMode}
            components={components}
            onAddComponent={onAddComponent}
          />
        </div>
        <div className={style.previewMain}>
          <p className={style.previewTitle}>{designMode}</p>
          <div className={style.arrPreviewItem}>
            <img className={style.previewItemHeadImg} src="https://assets.2dfire.com/frontend/204a5c5b98152b85c9350640d0865e2c.png"></img>
            <div className={style.arrPreviewBg} style={{backgroundImage: 'url('+backgroundImage+')', height: this.imgHeight(backgroundImage)}}>
              {value.map((v, index) => {
                const valueType = v.type;
                const comp = find(components, c=>
                  isExpectedDesginType(c, valueType)
                  )
                const PreviewItem = comp.previewItem || DesignPreviewItem;
                const EditorItem = comp.editorItem || DesignEditorItem;
                const id = getUUIDFromValue(v);
                const selected = id === selectedUUID;

                return (
                  <PreviewItem key={id}>
                    <DesignPreviewController
                      value={v}
                      prefix={prefix}
                      selected = {selected}
                      onSelect = {onSelect}
                      component = {comp.preview}
                      canDelete = {v.canDelete}
                      onDelete = {onDelete}
                      index = {index}
                      designMode={designMode}
                    />
                    {selected &&
                      !showAddComponentOverlay && (
                      <EditorItem
                        move
                        prefix={prefix}
                        compName = {v.title}
                        handleClickBySortUp = {handleClickBySortUp}
                        handleClickBySortDown = {handleClickBySortDown}
                        index = {index}
                        value={v}
                        onCloseEditor = {onCloseEditor}
                      >
                        <comp.editor
                          value={v}
                          settings={settings}
                          prefix={prefix}
                          onChange={onComponentValueChange}
                          validation={validations[id] || {}}
                        />
                      </EditorItem>
                      )}
                  </PreviewItem>
                )
              })}
            </div>
          </div>
          {designMode == '微店铺首页' && <BackgroundPreview backgroundChang={backgroundChang} />}
        </div>
      </div>
    );
  }
}

