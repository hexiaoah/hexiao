import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'antd';
// debugger
import style from './pictureTextPreview.css'

export default class pictureTextPreview extends PureComponent {
  static propTypes = {
    value: PropTypes.object,

    // 用来和 Design 交互
    design: PropTypes.object,

  };

  state= {
    defaultImg: 'https://img.yzcdn.cn/public_files/2018/03/08/837f3d12e14b299778ae5fea5c05a3a3.png'
  }

  textPriew = () => {
    return  <div className={style.listText}>aaa</div>
  }

  initPreiw = () => {
    const { config } = this.props.value
    const { mode, items } = config
    const { defaultImg} = this.state

    return(
      items.map((item) =>
      mode == '文字导航'?
        <div style={createStyle(config)} className={style.listText}>{item.text}</div>: 
        <div className={style.pictureTextInfo} style={createStyle(config)}>
          <img className={style.pictureTextLi} style={createStyle(config)} src={item.picture ? item.picture : defaultImg} />
          {mode == '图文导航' && <p className={style.pictureTextName}>{ item.text }</p>}
        </div>
      )
    )
  }

  render() {
    return (
      <div className="zent-design-component-pictureText-preview">
        <div className={style.pictureTextList}>
          {this.initPreiw()}
        </div>
      </div>
    );
  }
}


function createStyle(config) {
  const { items, textColor } = config
  const pictureWidth = 375
  const pictureLiWidth = (pictureWidth / items.length) - (3 * (items.length - 1))
  return {
    width: items.length ==1 ? `${pictureWidth}px` : `${pictureLiWidth}px`,
    color: textColor
  }   
}
