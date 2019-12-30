// 商品分类 编辑组件
import React from 'react'
import { Radio } from 'antd'
import ImgUpload from '@src/container/visualConfig/views/design/common/imgUpload'
import { DesignEditor } from '@src/container/visualConfig/views/design/editor/DesignEditor';
import style from './TmpEditor.css'
import cx from 'classnames'

export default class CateEditor extends DesignEditor {
    constructor(props) {
        super(props)
        this.state = {
            orderIcons: [
                '堂食点餐',
                '预售',
                '外卖',
                '排队',
            ],
            infoIcons: [
                '商品列表'
            ],
            isShowImgUpload: false,
            typeName:null,
            obj: null
        }
    }
    configChang = (obj) => {
        const { value, onChange } = this.props;
        const { config } =  value
        onChange(value, { config: {
          ...config,
          ...obj
        }})
      }

    _getImg = (data) => {
        // 获取图片
        const { value } = this.props;
        const { config } =  value
        const {typeName, obj} = this.state
        if(obj == 'mealIcons') {
          let mealIcons = Object.assign({}, config.mealIcons)
          mealIcons[typeName] = data
          this.configChang({mealIcons})
        }else {
          let retailIcons = Object.assign({}, config.retailIcons)
          retailIcons[typeName] = data
          this.configChang({retailIcons})
        }
    }

    close = () => {
        this.setState({
          isShowImgUpload: false,
        })
      }

    onChangeBtn = (item, str) => {
        this.setState({
            isShowImgUpload: !this.setState.isShowImgUpload,
            typeName: item,
            obj: str
        })
    }

    render() {
        const { value } = this.props
        const { orderIcons, infoIcons } = this.state
        const { config } = value
        const { mealIcons, retailIcons} = config
        const { isShowImgUpload }= this.state;

        return (
            <div className={style.member_editor_container}>
                <ImgUpload
                    getImg={this._getImg}
                    isShowImgUpload={isShowImgUpload}
                    close={this.close}
                />
                <p className={style.member_upload_tips}>icon配置(请上传60*52px大小的icon)</p>
                <div className={style.member_icons_box}>
                  <p className={style.member_p}>餐饮店铺相关icon配置：</p>
                    {
                        orderIcons.map( (item, i) => {
                            return (
                                <div className={style.member_flex_icon} key={i}>
                                    <div className={style.member_upload} onClick={() => this.onChangeBtn(item, 'mealIcons')}>
                                        <img className={style.orderImg}  src={mealIcons[item]} alt=""/>
                                        <div className={style.member_title}>{ item }</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {/* <div className={style.member_icons_box}>
                  <p className={style.member_p}>零售店铺相关icon配置：</p>
                    {
                        infoIcons.map( (item, i) => {
                            return (
                                <div className={style.member_flex_icon} key={i}>
                                    <div className={style.member_upload} onClick={() => this.onChangeBtn(item, 'retailIcons')}>
                                        <img className={style.orderImg}  src={retailIcons[item]} alt=""/>
                                        <div className={style.member_title}>{ item }</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div> */}
            </div>

        )
    }
}

