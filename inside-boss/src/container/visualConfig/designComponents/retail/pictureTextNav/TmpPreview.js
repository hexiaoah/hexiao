import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames'
// debugger
import style from './TmpPreview.css'

export default class pictureTextPreview extends PureComponent {
  static propTypes = {
    value: PropTypes.object,

  };

  state= {
    defaultImg: 'https://img.yzcdn.cn/public_files/2018/03/08/837f3d12e14b299778ae5fea5c05a3a3.png'
  }

  render() {
    const { config } = this.props.value
    const { mode, items } = config
    const { defaultImg} = this.state
    return (
      <div className="zent-design-component-pictureText-preview">
        <div className={style.pictureTextList}>
          {items.map((item) =>
            mode == '文字导航'? <div style={createStyle(config)} className={style.listText}>{item.text}</div>:
              <div className={style.pictureTextInfo} style={createStyle(config)}>
                <div className={cx(style.pictureTextLi, 'desigeCove')} style={{backgroundImage:`url(${item.picture ? item.picture : defaultImg})`}}></div>
                {mode == '图文导航' && <p className={style.pictureTextName}>{ item.text }</p>}
              </div>
            )}
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
    color: textColor,

  }
}
