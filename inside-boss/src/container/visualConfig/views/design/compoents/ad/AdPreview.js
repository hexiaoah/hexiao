import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import style from './AdPreview.css'

export default class AdPreview extends PureComponent {
  static propTypes = {
    value: PropTypes.object,
    // 用来和 Design 交互
    design: PropTypes.object,

  };

  sigleItem = () => {
    const { config } = this.props.value;
    const { items } = config
    let picture = false
    if(items.length > 0) {
      if(items[0].picture){
        picture = true
      } else {
        picture = false
      }
    }  
    if(items.length ==  0){
        picture = false
    }

    return picture ? <img className={style.sigleImg} src={items[0].picture} /> : <div className={style.defulatImg}><p>点击进行图片广告编辑<br />建议宽度750像素</p></div>
  }

  swiperItem = () => {
    const { config } = this.props.value;
    const { items } = config
    const length = items.length
    let arrImg = [];
    for(var i=0; i < length; i++){
      if(items[i].picture !== '') {
        arrImg.push(items[i].picture)
      }
    }
    const imgList = (
      arrImg.map((item) => 
          <div><img src={item} alt="" /></div>
        )
    )
    return (
      <Carousel>
        {arrImg.length ? imgList :
        <div className={style.defulatImg}><p>点击进行图片广告编辑<br />建议宽度750像素</p></div>
        }
      </Carousel> 
    )
  }

  compontItem = () => {
    const { config } = this.props.value;
    switch(config.mode) {
      case '单图':
        return this.sigleItem();
        break;
      case '轮播图':
        return this.swiperItem();
        break;
      default:  
    }
  }

  render() {

    return (
      <div className={style.adPreview}>
        {this.compontItem()}
      </div>
    );
  }
}
