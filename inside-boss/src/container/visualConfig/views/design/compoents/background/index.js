import React, { PureComponent } from 'react';
import { Button } from 'antd';
import ImgUpload from '../../common/imgUpload'
import style from './index.css'

export default class backgroundPreview extends PureComponent {

  state = {
    isShowImgUpload: false,
  }

  close = () => {
    this.setState({
      isShowImgUpload: false
    })
  }

  _getImg = (data) => {
    // 获取图片
    const { backgroundChang } = this.props;
    backgroundChang(data)
  }

  uploadImg = () => {
    this.setState({
      isShowImgUpload: !this.state.isShowImgUpload
    })
  }
  render() {
    const { isShowImgUpload }= this.state

    return (
      <div className={style.backgroundPreview}>
       <ImgUpload 
          getImg={this._getImg} 
          isShowImgUpload={isShowImgUpload} 
          close={this.close} 
        />
        <Button onClick={this.uploadImg} className={style.priewBackground} type="primary" shape="round" icon="picture">添加背景</Button>
      </div>
    );
  }
}


