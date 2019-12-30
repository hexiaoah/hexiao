import React, { PureComponent } from 'react';
import cx from 'classnames';
import { Button } from 'antd';
import { SketchPicker } from 'react-color';
import style from './banckgrondSelect.css'
export default class BanckgrondSelect extends PureComponent {
  state = {
    type: 'SketchPicker',
    isShow: false,
    backgroundColor:null
  }

  banckgrondChang = (str) => {
    const { value, onChange } = this.props;
    const {config} = value

    if(str == 'SketchPicker'){
      this.setState({
        isShow: !this.state.isShow
      })
    } else {
      this.setState({
        isShow: false
      })
      config.backgroundColor = 'transparent'
      onChange(value, {config})
    }


    this.setState({
      type: str
    })
  }

  handleChangeComplete = (str, color) => {
    // 拾色器的回调
    const { value, onChange } = this.props;
    const {config} = value
    config[str] = color.hex
    onChange(value, {config})
  }

  render() {
    const { type, isShow } = this.state
    const { value } = this.props;
    const { config } = value
    const { backgroundColor } = config

    return (
      <div className={style.titlePickColor}>
        <div className={cx(style.btn, type == 'SketchPicker' && style.boder)} onClick={() => this.banckgrondChang('SketchPicker')}>
          <Button style={{backgroundColor: backgroundColor}} className={style.pickColorBtn} type="primary" />
        </div> 
        <div className={cx(style.transparent, type == 'transparent' && style.boder)} onClick={() => this.banckgrondChang('transparent')}>
          <img src='https://assets.2dfire.com/frontend/b9caea53ef5ec57c1578928f0e0caf36.png' />
        </div>
        {isShow &&
          <SketchPicker
            color={backgroundColor}
            className={style.titleSketchPicker}
            onChangeComplete={(e) => this.handleChangeComplete('backgroundColor', e)}
          />
        }
      </div>
    );
  }
}

