import React from 'react'
import style from './CatePreview.css'

export default class CatePreview extends React.PureComponent {
    state = {
        arr: [1, 2]
    }
    
    render() {
        const { value } = this.props
        const { config } = value
        const { seeLevel, orderButton } = config
        const { orderStyle, cartStyle, mode } = orderButton
        const { arr } = this.state
    
        let orderStyleClass = null
        let cartStyleClass = null

        let isShopButton = config.showFields.indexOf('下单按钮') > -1 // 是否显示商品按钮
        switch(orderStyle) {
            case '1':
                orderStyleClass =  style.immediate_order_1
                break
            case '2':
                orderStyleClass = style.immediate_order_2
                break
            default:
                orderStyleClass =  style.immediate_order_1
                console.log('未能识别的 orderStyle')
        }
        switch(cartStyle) {
            case '1':
                cartStyleClass = style.add_cart_btn1
                break
            case '2':
                cartStyleClass = style.add_cart_btn2
                break
            case '3':
                cartStyleClass = style.add_cart_btn3
                break
            default:
                cartStyleClass = style.add_cart_btn1
                console.log('未能识别的的 cartStyle')
        }
        
        return (
            <div className={style.cate_preview_contianer}>
                <ul className={style.cate_first_wrapper}>
                    <li className={ `${style.first_item} ${style.item_active}`}>店铺优惠</li>
                    <li className={style.first_item}>店铺热销</li>
                    <li className={style.first_item}>韩风式</li>
                    <li className={style.first_item}>浪漫唯美风</li>
                    <li className={style.first_item}>高端礼盒装</li>
                    <li className={style.first_item}>求婚告白</li>
                </ul>
                <ul className={style.cate_goods_list}>
                    <li>
                        {
                            seeLevel==='2' &&
                            <ul className={style.cate_second_wrapper}>
                                <li className={style.second_cate_list}>二级分类</li>
                                <li className={style.second_cate_list}>二级分类</li>
                                <li className={style.second_cate_list}>二级分类</li>
                            </ul>
                        }
                    </li>
                    <li>
                        <ul className={style.cate_item_list}>
                            <li className={style.cate_name}>热销商品</li>
                            {arr.map(() => 
                                <li className={style.cate_goods_box}>
                                    <div className={style.goods_img}></div>
                                    <div className={style.goods_detail}>
                                        <div className={style.goods_name}>羊肉泡馍</div>
                                        <div className={style.goods_price_opt}>
                                            <div className={style.goods_price}>￥98.00</div>
                                            <div className={style.goods_opt}></div>
                                        </div>
                                        {!isShopButton ? null : 
                                            <div>
                                                {
                                                    mode === '立即下单' && <div className={orderStyleClass}>立即下单</div>
                                                }
                                                {
                                                    mode === '加入购物车' && <div className={cartStyleClass}></div>
                                                }
                                            </div> 
                                        }
            
                                    </div>
                                </li>
                            )}
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}

