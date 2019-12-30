import React, {Component} from 'react'
import { Radio, Button, Input } from 'antd';
import { SketchPicker } from 'react-color';
import style from './TmpEditor.css'
import { DesignEditor, ControlGroup } from '@src/container/visualConfig/views/design/editor/DesignEditor';
import BanckgrondSelect from '@src/container/visualConfig/views/design/common/banckgrondSelect'

const RadioGroup = Radio.Group;

export default class TelephoneEditor extends DesignEditor {
  constructor(props) {
    super(props);
      this.state= {
        isSketchPicker: false,
        isSketchPickerbg: false,
      }
    }

    configChang = (obj) => {
      const { value, onChange } = this.props;
      const { config } =  value
      onChange(value, { config: {
        ...config,
        ...obj
      }})
    }

    changeGroup = (str, val) => {
      this.configChang({[str]: val.target.value})
    }

    showSkentPick = (str) => {
      this.setState({
        [str]: !this.state[str]
      })
    }

    handleChangeComplete = (str, color) => {
      // 拾色器的回调
      this.configChang({[str]: color.hex})
    }

    render() {
        const { value, prefix, validation, onChange } = this.props;
        const { config } = value
        const { textColor, backgroundColor, mode } = config
        const { isSketchPicker, isSketchPickerbg } = this.state
        return (
            <div className={`${prefix}-design-component-line-editor`}>
              <div className={style.componentTitleEditor}>
                <ControlGroup
                  label="框体样式："
                  error={validation.hasPadding}
                  className={style.groupLabel}
                >
                </ControlGroup>
                <RadioGroup value={mode} className={style.controlGroupControl} onChange={(e) => this.changeGroup('mode', e)}>
                    <Radio name="mode" value='1'>样式一</Radio>
                    {/* <Radio name="mode" value='2'>圆角</Radio> */}
                </RadioGroup>
              </div>
              <div className={style.componentTitleEditor}>
                <ControlGroup
                  label="框体颜色："
                  error={validation.hasPadding}
                  className={style.groupLabel}
                >
                </ControlGroup>
                <BanckgrondSelect
                  value = {value}
                  onChange = {onChange}
                  backgroundColor = {backgroundColor}
                  isSketchPickerbg= {isSketchPickerbg}
                  showSkentPick = {this.showSkentPick}
                 />
              </div>
              <div className={style.componentTitleEditor}>
                <ControlGroup
                  label="文本位置："
                  error={validation.hasPadding}
                  className={style.groupLabel}
                >
                </ControlGroup>
                <RadioGroup value={value.config.textAlign} className={style.controlGroupControl} onChange={(e) => this.changeGroup('textAlign', e)}>
                    <Radio name="textAlign" value='left'>居左</Radio>
                    <Radio name="textAlign" value='center'>居中</Radio>
                </RadioGroup>
              </div>
              <div className={style.componentTitleEditor}>
                <ControlGroup
                  label="文本颜色："
                  error={validation.hasPadding}
                  className={style.groupLabel}
                >
                </ControlGroup>
                <div className={style.titlePickColor}>
                  <Button style={{backgroundColor: textColor}} className={style.pickColorBtn} onClick={() => this.showSkentPick('isSketchPicker')} type="primary" />
                  {isSketchPicker &&
                    <SketchPicker
                      className={style.titleSketchPicker}
                      onChangeComplete={(e) => this.handleChangeComplete('textColor', e)}
                    />}
                </div>
              </div>
            </div>
        )
    }
    static designType = 'hotline';
    static designDescription = '客服电话';
    static designTemplateType = '其他类';
    static getInitialValue() {
        return {
          config: {
            type: 'hotline',
            mode: '1',                  // 显示样式。可选值：'1'（暂时只支持这一个值）
            backgroundColor: '#f5f5f5', // 背景色
            textAlign: 'left',          // 文字位置。可选值：left、center
            textColor: '#5a5a5a',       // 文字颜色
          }
        }
    }
}
