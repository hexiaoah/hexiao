
import React, { PureComponent } from 'react';
import { Collapse } from 'antd';
import style from './DesignEditorAddComponent.css'

const Panel = Collapse.Panel;
export default class DesignEditorAddComponent extends PureComponent {

  static defaultProps = {
    fromSelected: false,
    prefix: 'zent',
  };

  onAdd(component) {
    const { fromSelected, onAddComponent } = this.props;
    onAddComponent(component, fromSelected)
  }



  render() {
    const { components, prefix, designMode } = this.props;
    const basicsComp = [] // 基础类
    const marketComp = [] // 互动营销类
    const otherComp = [] // 其他类

    for (let i = 0; i < components.length; i++) {
      if(components[i].editor.designTemplateType == '基础类') {
        basicsComp.push(components[i])
      }
      if(components[i].editor.designTemplateType == '互动营销类') {
        marketComp.push(components[i])
      }
      if(components[i].editor.designTemplateType == '其他类') {
        otherComp.push(components[i])
      }
    }

    return (
      <div
        className={`${prefix}-design-editor-add-component ${prefix}-design-editor-add-component--mixed`}
      >
      {(designMode == '微店铺首页' || designMode == '商品分类页') &&
          <Collapse bordered={false} defaultActiveKey={['1', '2', '3']}>
            <Panel header='基础类' key="1">
              <div className={style.designAddList}>
                {basicsComp.map((c, i) =>{
                  return(
                  <div onClick={() => this.onAdd(c)} className={style.designAddBtn} key={i}>
                    {c.editor.designDescription}</div>
                  )
                })}
              </div>
            </Panel>
            <Panel header='互动营销类' key="2">
              <div className={style.designAddList}>
                {marketComp.map((c, i) =>{
                  return(
                  <div onClick={() => this.onAdd(c)} className={style.designAddBtn} key={i}>
                    {c.editor.designDescription}</div>
                  )
                })}
              </div>
            </Panel>
            <Panel header='其他类' key="3">
            <div className={style.designAddList}>
                {otherComp.map((c, i) =>{
                  return(
                  <div onClick={() => this.onAdd(c)} className={style.designAddBtn} key={i}>
                    {c.editor.designDescription}</div>
                  )
                })}
              </div>
            </Panel>
          </Collapse>
        }
      </div>
    );
  }
}
