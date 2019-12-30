import React, {Component} from 'react'
import { Radio, Button, Input } from 'antd';
import { SketchPicker } from 'react-color';
import style from './TmpEditor.css'
import { DesignEditor, ControlGroup } from '@src/container/visualConfig/views/design/editor/DesignEditor';
import BanckgrondSelect from '@src/container/visualConfig/views/design/common/banckgrondSelect'

const RadioGroup = Radio.Group;

export default class SeachEditor extends DesignEditor {
  constructor(props) {
    super(props);
      this.state= {
        isSketchPicker: false,
        isSketchPickerbg: false,
        textColor: '#000000',
        backgroundColor: '#fff',
        text:'',
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
        const {config} = value

        const { backgroundColor } = config
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
                <RadioGroup value={value.config.shape} className={style.controlGroupControl} onChange={(e) => this.changeGroup('shape', e)}>
                    <Radio name="shape" value='square'>方形</Radio>
                    <Radio name="shape" value='round'>圆形</Radio>
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
                <RadioGroup value={config.textAlign} className={style.controlGroupControl} onChange={(e) => this.changeGroup('textAlign', e)}>
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
                  <Button style={{backgroundColor: config.textColor}} className={style.pickColorBtn} onClick={() => this.showSkentPick('isSketchPicker')} type="primary" />
                  {isSketchPicker &&
                    <SketchPicker
                      color={config.textColor}
                      className={style.titleSketchPicker}
                      onChangeComplete={(e) => this.handleChangeComplete('textColor', e)}
                    />}
                </div>
              </div>
            </div>
        )
    }
    static designType = 'searchInput';
    static designDescription = '商品搜索框';
    static designTemplateType = '其他类';
    static getInitialValue() {
        return {
          config: {
            type: 'searchInput',
            shape: 'square',            // 框体形状。可选值：square - 方形；round - 圆角
            backgroundColor: '#FAFAFA', // 背景色。
            textAlign: 'left',          // 文字位置。可选值：left、center
            textColor: '#b4b4b4',       // 文字颜色
          }
        }
    }
}
