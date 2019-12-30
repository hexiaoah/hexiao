import React, {Component} from 'react'
import { DesignEditor, ControlGroup } from '../../editor/DesignEditor';
import { Slider } from 'antd';
import style from './SliderEditor.css'

export default class SliderEditor extends DesignEditor {
  constructor(props) {
    super(props);
    this.state= {}
    }
    onChange = (val) => {
        const { value, onChange } = this.props;
        const {config} = value
        onChange(value, {config:{
          ...config,
          height: val
        }})
      }
    render() {
        const { prefix, value } = this.props;
        const {config} = value
        return (
            <div className={`${prefix}-design-component-line-editor`}>
              <div className={style.componentConfigEditor}>
                <ControlGroup
                    label="留白高度"
                    className={style.groupLabel}
                >
                </ControlGroup>
                <Slider min={10}
                    max={100}
                    onChange={this.onChange}
                    value={config.height} 
                />
        </div>
            </div>
        )
    }
    static designType = 'whitespace';
    static designDescription = '辅助留白';
    static designTemplateType = '其他类';
    static getInitialValue() {
        return {
          config:{
            type: 'whitespace',
            height: 30,   
          }
        }
    }
}