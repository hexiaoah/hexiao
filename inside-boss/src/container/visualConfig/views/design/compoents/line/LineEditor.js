import React, {Component} from 'react'
import { DesignEditor, ControlGroup } from '../../editor/DesignEditor';
import { Radio } from 'antd';
import './LineEditor.scss'

const RadioGroup = Radio.Group;
const DEFAULT_COLOR = '#e5e5e5';

export default class LineEditor extends DesignEditor {
  constructor(props) {
    super(props);
    this.state= {}
    }
    onChange = (str, e) => {
        const { value, onChange } = this.props;
        onChange(value, {[str]:e.target.value})
        // console.log('radio checked',{[str]:e.target.value} );
      }
    render() {
        const { prefix, value, showError, validation } = this.props;
        return (
            <div className={`${prefix}-design-component-line-editor`}>
                <ControlGroup
                    label="边距:"
                    // showError={showError || this.getMetaProperty('hasPadding', 'touched')}
                    error={validation.hasPadding}
                >
                    <RadioGroup value={value.hasPadding} onChange={(e) => this.onChange('hasPadding', e)}>
                        <Radio name="hasPadding" value={false}>
                        无边距
                        </Radio>
                        <Radio name="hasPadding" value>
                        左右留边
                        </Radio>
                    </RadioGroup>
                </ControlGroup>
                <ControlGroup
                    label="样式:"
                    // showError={showError || this.getMetaProperty('lineType', 'touched')}
                    error={validation.lineType}
                >
                    <RadioGroup value={value.lineType} onChange={(e) => this.onChange('lineType', e)}>
                        <Radio name="lineType" value="solid">
                        实线
                        </Radio>
                        <Radio name="lineType" value="dashed">
                        虚线
                        </Radio>
                        <Radio name="lineType" value="dotted">
                        点线
                        </Radio>
                    </RadioGroup>
                </ControlGroup>
            </div>
        )
    }
    static designType = 'line';
    static designDescription = '辅助线';
    static getInitialValue() {
        return {
            color: DEFAULT_COLOR,
            hasPadding: false,
            lineType: 'solid'
        }
    }
}