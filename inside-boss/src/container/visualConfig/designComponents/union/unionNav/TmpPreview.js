import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import style from './TmpPreview.css'

export default class unionNav extends PureComponent {
  static propTypes = {
      value: PropTypes.object,
  };

  state = {
    orderIcons: [
        '堂食点餐',
        '预售',
        '外卖',
        '排队',
    ]}

  render() {
    const { config } = this.props.value
    const { mealIcons } = config
    const {orderIcons } = this.state
      return (
          <div className={style.NavPreview}>
            <ul className={style.navList} >
                {orderIcons.map((item, i) => 
                    <li className={style.navLi} key={i}>
                       <img src={mealIcons[item]} />
                       <p>{item}</p>
                    </li>)}
             </ul>
          </div>
      )
  }
}
