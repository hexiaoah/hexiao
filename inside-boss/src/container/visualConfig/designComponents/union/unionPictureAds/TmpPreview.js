import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'antd'
import style from './TmpPreview.css'

export default class AdPreview extends PureComponent {
  static propTypes = {
      value: PropTypes.object,
  };

  state = {
      img: 'https://assets.2dfire.com/frontend/2d64253f7654e785d1ab5b24802fce9b.png'
  }

  render() {
    const { config } = this.props.value
    const { img } = this.state
      return (
          <div className={style.adPreview}>
              {config.mode == '单图' ? 
                <img src={img} /> :
                <Carousel>
                    <div>
                    <img src={img} /> 
                    </div>
                    <div>
                    <img src={img} /> 
                    </div>
                    <div>
                    <img src={img} /> 
                    </div>
                </Carousel>
            }
          </div>
      )
  }
}
