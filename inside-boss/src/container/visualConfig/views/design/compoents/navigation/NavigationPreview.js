import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'antd';
// debugger
import style from './NavigationPreview.css'

export default class NavPreview extends PureComponent {
  static propTypes = {
    value: PropTypes.object,

    // 用来和 Design 交互
    design: PropTypes.object,

  };

  state = {

  }

  classicPriew = () => {
    return <img className={style.classic} src="https://assets.2dfire.com/frontend/e7806b3785ff1c78c6924f7bd581ac05.png" />
  }

  appPriew = () => {
    const { value } = this.props
    const { config } = value
    return (
      <ul className={style.navList} >
       {config.nav.appItems.map((item) =>
        <li className={style.navLi} style={createStyle(config)}>
          {item.defaultIcon ? <img src={item.defaultIcon} /> : <p className={style.light}></p> }
          <p>导航</p>
        </li>
       )}
      </ul>
    )
  }

  compontItem = () => {
    const { config } = this.props.value;
    switch(config.nav.mode) {
      case '经典展开式':
        return this.classicPriew();
        break;
      case 'app式':
        return this.appPriew();
        break;
      default:  
    }
  }

  render() {
    return (
      <div className={style.NavPreview}>
        {this.compontItem()}
      </div>
    );
  }
}

function createStyle(config) {
  const { nav } = config
  const navWidth = 375
  const navLiWidth = (navWidth / nav.appItems.length) - (3 * (nav.appItems.length - 1))
  return {
    width: nav.appItems.length ==1 ? `${navWidth}px` : `${navLiWidth}px`,
  }   
}
