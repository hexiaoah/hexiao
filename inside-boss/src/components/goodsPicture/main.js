/**
 * Created by air on 2017/7/10.
 */

import React, {
    Component
} from 'react'
import styles from './style.css'
import Handle from './handle'
import PictureList from './pictureList'
import PictureDetailList from './pictureDetailList'
import EditGoodsTemplate from './templateDetail/editGoodsTemplate'
import * as action from '../../action'
import {Select} from 'antd'

const Option = Select.Option;

class Main extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            storeName: ''
        }
    }
    
    componentDidMount() {
        const t = this
        const {dispatch} = t.props
        // dispatch(action.getPictureList(1))
    }
    
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        // if (nextProps.data.brandId !== this.state.storeName)
        //     this.setState({
        //         storeName: nextProps.data.brandId
        //     })
    }
    
    handleChange(e) {
        console.log(e);
        this.setState({
            storeName: e,
        });
        const {dispatch} = this.props
        dispatch(action.setBrandId(e));
        // dispatch(action.getPictureList(1))
        dispatch(action.setPageNumber(1))
        dispatch(action.backPictureList())
        dispatch(action.getPictureList(1,'',e))
        dispatch(action.getDuplicatedItems('',e))
        dispatch(action.detailChange({detail:false}))
        dispatch(action.editTemplate({edit:false,templateId:""}))
    }
    
    render() {
        const t = this
        const {
            data,
            dispatch,
            detail
        } = this.props
        // console.log(data)
        const {
            pictureListLength
        } = data
        return (<div className={styles.wraperBox}>
                {
                    data.isShowBrand === "fixed" ? (<div className={styles.select_wrapper}>
                            <span className={styles.select_title}> 品牌: </span>
                            <Select className={styles.base_select}
                                    defaultValue={t.state.storeName || '请选择'}
                                    value={t.state.storeName || '请选择'}
                                    onChange={(e) => t.handleChange(e)}>
                                {
                                    data.brandList ? data.brandList.map(function (val) {
                                        return <Option value={val.entityId} key={val.entityId}>{val.name}</Option>
                                    }) : ''
                                }
                            </Select>
                            <span>
                        {t.state.storeName ? '' : '说明：请先选择品牌。如果没有品牌请在掌柜APP内创建一个品牌。'}
                       </span>
                            {t.state.storeName ? '' : (function () {
                                return <hr/>
                            }())}
                        </div>
                    ) : ""
                }
                {
                (!data.isShowBrand && (data.isShowBrand !== null)) ? '' : (((t.state.storeName && data.isShowBrand === "fixed") || data.isShowBrand !== "fixed") ?
                    (
                    <div className={styles.viewBox}>
                    {
                        !detail.edit&&
                        <Handle data={data} dispatch={dispatch}/>
                    }
                    {
                        !!detail.edit && !detail.detail&&
                        <EditGoodsTemplate data={data} dispatch={dispatch} detail={detail} />
                    }
                    {
                        (() => {
                            if (pictureListLength > 0 && !detail.detail && !detail.edit) {
                                return (
                                    <PictureList data={data} dispatch={dispatch}/>
                                )
                            } else {
                                if (!!detail.detail && !detail.edit) {
                                    return (
                                        <PictureDetailList data={data} dispatch={dispatch} detail={detail}/>
                                    )
                                } else {
                                    return null
                                }
                            }
                        })()
                    }
                </div>
                    ) : '')
            }
            
            </div>
        )
    }
}


export default Main
