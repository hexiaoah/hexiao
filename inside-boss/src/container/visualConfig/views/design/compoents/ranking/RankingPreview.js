import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import style from './RankingPreview.css'

const ItemClass = {
  '大图': 'Big',
  '详细列表': 'Detailed',
  '双列小图':  'Double'
}
export default class RankingPreview extends PureComponent {
  static propTypes = {
    value: PropTypes.object,

    // 用来和 Design 交互
    design: PropTypes.object,

  };

  state = {
    superscriptList : {
      '新品': 'https://assets.2dfire.com/frontend/d8bb4ca9cc57fbcd02173f9ae478c5da.png',
      '热卖': 'https://assets.2dfire.com/frontend/72ff61facf07a6dd4f622a25a30caa97.png',
      'NEW': 'https://assets.2dfire.com/frontend/990bd6c197ca2da87bd561dd982b6b28.png',
      'HOT': 'https://assets.2dfire.com/frontend/2a3c27f8b2cd467bc40f96f53edb19e6.png'
    }
  }

  shopButtonPreview = () => {
    const { config } = this.props.value;
    const { orderButton } = config
     if(orderButton.mode == '立即下单') {
      return <p className={style[`rankOrderBut${orderButton.orderStyle}`]}>{orderButton.mode}</p>
    }
    return <p className={style[`rankCartBut${orderButton.cartStyle}`]} />
  }
  superscriptType = () => {
    const { value } = this.props;
    const { config } =  value
    let superscriptType = 1
    const text = config.subscript.text
    if(text == 'NEW' || text == 'HOT' || text == '自定义') {
      superscriptType =2
    }
    return superscriptType
  }

  superscripIcon = () => {
    const { superscriptList } = this.state
    const { config } = this.props.value;
    if (config.subscript.text == '自定义') {
      return <img className={style.rankSuperscript2} src={config.subscript.image ? config.subscript.image : ''} />
    }
    return <img className={style[`rankSuperscript${this.superscriptType()}`]} src={superscriptList[config.subscript.text]} />
  }

  previewType = () => {
    const { config } = this.props.value;

    let isShopName = config.showFields.indexOf('名称') > -1 // 是否显示商品名称
    let isShopPrice = config.showFields.indexOf('价格') > -1 // 是否显示商品价格
    let isShopButton = config.showFields.indexOf('下单按钮') > -1 // 是否显示商品按钮
    let isShowSuperscript = config.showFields.indexOf('角标') > -1 // 角标是否显示

    const arrGoodsList = []
    for(var i = 0; i < config.rankingLimit; i++){
      arrGoodsList.push(i)
    }

    return (
      arrGoodsList.map(() =>
        <div className={style[`rank${ItemClass[config.mode]}Img`]}>
            <div className={style[`rank${ItemClass[config.mode]}List`]}>
              <div className={style.defultImg}>
                <img className={style.logo} src="https://assets.2dfire.com/frontend/970fdb540e5b0f40621b14ba11e28601.png" />
                {isShowSuperscript && this.superscripIcon()}
              </div>
              <div className={style[`rank${ItemClass[config.mode]}Info`]}>
                <p className={style.rankShopName}>{isShopName &&'此处显示商品名称此'}</p>
                <div className={style.rankOrder}>
                  <p className={style.rankPrice}>{isShopPrice &&'¥ 99.99'}</p>
                  {isShopButton && this.shopButtonPreview()}
                </div>
              </div>
            </div>
        </div>
      )
    )
  }

  render() {
    return (
      <div className={style.rankingPreview}>
        <div className={style.rankImg}>
          {this.previewType()}
        </div>
      </div>
    );
  }
}

