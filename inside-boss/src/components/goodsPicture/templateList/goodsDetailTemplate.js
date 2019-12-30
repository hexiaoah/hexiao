import React, {Component} from 'react'
import styles from '../style.css'
import {Modal} from 'antd'
import * as action from "../../../action";
import Preview from "./preview";
class GoodsDetailTemplate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            destory:true,
            previewCover:""
        }
    }
    // 预览
    preview = (url)=>{
        this.setState({
            destory: false,
            previewCover: url
        })
    }
    // 关闭预览弹窗
    closePreview =()=>{
        this.setState({
            destory: true,
        })
    }
    // 使用
    userTemplate =(type,id)=>{
        const { dispatch ,detail,data} = this.props;
        let itemId = detail.pictureFileId;
        if (type == 2) { // 新模板跳转到编辑模板页
            dispatch(action.detailChange({detail:false,pictureFileId:itemId}))
            dispatch(action.editTemplate({edit:true,templateId:id}))
        }else{//默认、老模板直接改变使用状态
            let entityId = data.importData.entityId;
            let ItemDetailVO = {
                entityId: entityId,
                itemDetailJson: "",
                itemId: itemId,
                templateId: id || ""
            };
            dispatch(action.saveTemplate(ItemDetailVO, 1, itemId,entityId))
        }

    }

    render() {
        let {data} =this.props;
        let templateList = data.goodsDetailTemplate;
        return (
            <div>
                <div className={styles.pictureDetailListTitle} style={{background: '#fff'}}>
                    <p className={styles.chooseNum}>商品详情页模板</p>
                </div>
                <ul className={styles.pictureListUl} style={{marginLeft: '-40px'}}>
                    {
                        templateList&&templateList.length>0&&
                        templateList.map((item,index)=>{
                            return (
                                <li className={styles.goodsItemStyle} key={index}>
                                    <p className={styles.goodsTitle}>{item.templateName || "默认"}</p>
                                    <div className={styles.goodsPictureBox}>
                                        <img className={styles.goodsPicture} src={item.templateImage || require("../images/default.png")} alt={item.templateName}/>
                                        {
                                            !!item.useTemplate &&
                                            <div className={styles.userLabel}></div>
                                        }
                                    </div>
                                    <div className={styles.btnBox}>
                                        {
                                            !!item.oldTemplate &&
                                            <a onClick={()=>this.preview(item.templatePreview)}>预览</a>
                                        }
                                        {
                                            (item.oldTemplate == 2 || (item.oldTemplate == 1 && item.useTemplate == 0)) &&
                                            <span>|</span>
                                        }
                                        {
                                            !item.useTemplate &&
                                            <a onClick={()=>this.userTemplate(item.oldTemplate,item.templateId)}>使用</a>
                                        }
                                        {
                                            (item.oldTemplate == 2 && item.useTemplate == 1) &&
                                            <a onClick={()=>this.userTemplate(item.oldTemplate,item.templateId)}>编辑</a>
                                        }
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <Preview logo={this.state.previewCover} destory={this.state.destory} closePreview={this.closePreview}/>
            </div>
        )
    }
}

export default GoodsDetailTemplate
