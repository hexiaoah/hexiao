import React, { PureComponent } from 'react';
import { Radio, Upload, Icon } from 'antd';
import ImgUpload from '@src/container/visualConfig/views/design/common/imgUpload'
import { DesignEditor, ControlGroup } from '@src/container/visualConfig/views/design/editor/DesignEditor';
import style from './TmpEditor.css'

const RadioGroup = Radio.Group;

export default class ConfigEditor extends DesignEditor {
  state = {
    isShowImgUpload: false,
    defaultImg:'https://assets.2dfire.com/frontend/071bac5b44ade2005ad9091d1be18db6.png'
  };

  configChang = (obj) => {
    const { value, onChange } = this.props;
    const { config } =  value
    onChange(value, { config: {
      ...config,
      ...obj
    }})
  }
  close = () => {
    this.setState({
      isShowImgUpload: false,
    })
  }
  _getImg = (data) => {
    // 获取图片
    this.configChang({backgroundImage : data})
  }

  ChangeGroup = (str, e) => {
    this.configChang({[str]: e.target.value})
  }

  onChangeBtn = () => {
    this.setState({
      isShowImgUpload: !this.setState.isShowImgUpload
    })
  }
  render(){
    const { value, prefix, validation } = this.props;
    const {mode, backgroundImage} = value.config
    const { isShowImgUpload, defaultImg }= this.state
    return (
      <div className={`${prefix}-design-component-config-editor`}>
        <ImgUpload
          getImg={this._getImg}
          isShowImgUpload={isShowImgUpload}
          close={this.close}
        />
        <div className={style.componentConfigEditor}>
          <ControlGroup
            label="样式选择："
            error={validation.hasPadding}
            className={style.groupLabel}
          >
          </ControlGroup>
          <RadioGroup value={mode} className={style.controlGroupControl} onChange={(e) => this.ChangeGroup('mode', e)}>
              <Radio name="mode" value='1'>样式一</Radio>
              <Radio name="mode" value='2'>样式二</Radio>
          </RadioGroup>
        </div>
        <div className={style.componentConfigEditor}>
          <ControlGroup
            label="店招背景图："
            error={validation.hasPadding}
            className={style.groupLabel}
          >
          </ControlGroup>
          <div className={style.uploadInfo}>
            <img onClick={this.onChangeBtn} className={style.uploadBtn} src={backgroundImage? backgroundImage: defaultImg}></img>
            <p className={style.uploadTip}>建议尺寸：900x500px，尺寸不匹配时，图片进行压缩或拉伸铺满显示</p>
          </div>
        </div>
      </div>
    )
  }
  static designType = 'banner';
  static designDescription = '店招';
  static designTemplateType = '基础类';
  static getInitialValue() {
    return {
      config: {
        type: 'banner',
        mode: '1',                // 可选值：'1'、'2'
        backgroundImage: null,  // 可选值：null、"URL"
      }
    };
  }
}
