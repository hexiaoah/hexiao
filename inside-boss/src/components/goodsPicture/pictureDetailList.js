/**
 * Created by air on 2017/8/4.
 */
/**
 * Created by air on 2017/7/11.
 */
import React, {Component} from 'react'
import {Icon, message, Checkbox, Button, Modal} from 'antd'
import styles from './style.css'
import * as action from '../../action'
import api from '../../api'
import AddPictureBtn from './addPictureBtn'
import HaveDropPic from './picDetailListBox'
import GoodsDetailTemplate from './templateList/goodsDetailTemplate.js'
import getUserInfo from '../../utils/getUserInfo'

// import DustbinCopyOrMove from "./haveDropPic";


class PictureDetailList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            plainOptions: [],
            checkedList: [],
            indeterminate: false,
            checkAll: false,
            page: 1
        }
    }
    componentDidMount() {
        const t = this

        const {dispatch, detail,data} = t.props
        let entityId = data.importData.entityId;

        dispatch(action.getPictureDetailList(detail.pictureFileId))
        if(data.isInclude==1)return;
        dispatch(action.getTemplateList(entityId, detail.pictureFileId));
    }

    //返回按钮
    backPictureList() {
        const t = this
        const {dispatch} = t.props
        dispatch(action.detailChange({detail: false}))
    }

    goodsDetailPriew = (data, dispatch, detail) => {
         // industry:3是零售店铺,不展示
         const { shopInfo } = getUserInfo();
         const { industry } = shopInfo || {};

        if(industry == 3) return false
        return !data.isInclude && <GoodsDetailTemplate data={data} dispatch={dispatch}  detail={detail} />
    }

    render() {
        const t = this
        const { dispatch, detail} = t.props
        let {data}= t.props
        data.importData.memberId=detail.pictureFileId
        const total = data.pictureDetailListTotal

        return (
            <div className={styles.pictureDetailListBox}>
                <div className={styles.pictureListBody}>
                    <div className={styles.pictureListTitle}>
                        <div className={styles.turnBtn} onClick={this.backPictureList.bind(this)}>
                            <Icon className={styles.pictureIcon} type="left-circle-o"/>
                            {/*<p className={styles.pictureTitleWord}>返回</p>*/}
                        </div>
                        <span className={styles.chooseNum}>{data.pictureName}</span>
                    </div>
                    {/*3为主图，1为详情图*/}
                    <HaveDropPic data={data} type={'3'} dispatch={dispatch} detail={detail}/>
                    <HaveDropPic data={data} type={'1'} dispatch={dispatch} detail={detail}/>
                    {/* 商品详情模板*/}
                    { this.goodsDetailPriew(data, dispatch, detail) }
                </div>
            </div>
        )
    }
}

export default PictureDetailList
