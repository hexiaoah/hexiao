import React, { Component } from 'react'
import {} from 'antd'
import styles from  './style.css'
import * as action from '../../action'
import { hashHistory } from 'react-router'
import { Modal, message } from 'antd'
import Cookie from '@2dfire/utils/cookie'
const confirm = Modal.confirm
const entityId = JSON.parse(Cookie.getItem('entrance')).shopInfo.entityId
class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showCopyExcessConfirm: false,
        }
    }
    componentWillMount() {
        const { dispatch } = this.props
        // 获取所有模板
        dispatch(action.getPriceTagModule({ param:{entityId: entityId }}))
    }
    copyModule(id) {
        const { dispatch,data} = this.props
        const moduleNum = data.priceTagModuleList.length
        if (moduleNum>=25) {
            this.warning()
            return
        }
        // 复制模板
        dispatch(action.copyPriceTagModule({param: { id: id, entityId: entityId }}))
        this.success()
    }
    editModule(id) {
        // 编辑模板
        hashHistory.push(`/PRICE_TAG_EDIT/?id=${id}&entityId=${entityId}`)
    }
    showDeleteConfirm(item) {
        // 删除模板
        const t = this
        confirm({
            title: '是否删除当前模板?',
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                t.deleteModule(item)
            },
            onCancel() {
                console.log('Cancel')
            }
        })
    }
    warning() {
        Modal.warning({
            title: '',
            content: '自定义模板数量不能超过20个！'
        })
    }
    success() {
        message.success('复制成功',1);
    };
    // 删除调接口
    deleteModule(item){
        const { dispatch } = this.props
        const { id, entityId } = item
        // 删除模板
        dispatch(action.updatePriceTagModule({param: { id: id, entityId: entityId, isVaild:0}}))
        setTimeout(() => {
            location.reload()
        }, 200)
    }
    // 模板的尺寸
    moduleSize={
        1:'80mm*40mm',
        2:'75mm*30mm',
        3:'60mm*40mm',
        4:'40mm*30mm',
        5:'25mm*15mm'
    }
    // 模板图片的宽度
    imageWidth={
        1:'324px',
        2:'325px',
        3:'243px',
        4:'163px',
        5:'148px'
    }
    getLocalTime(time) {
        const newTime = new Date(time),
            y = newTime.getFullYear(),
            m = newTime.getMonth() + 1,
            d = newTime.getDate()
            return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + newTime.toTimeString().substr(0, 8);
    }
    render() {
        const { data } = this.props
        const {priceTagModuleList=[]} = data
        return (
            <div className={styles.goodTag}>
                {priceTagModuleList.map((item, key) => {
                    return (
                        <div className={styles.card} key={key}>
                            <div className={styles.cardHead}>
                                <div className={styles.cardTitle}>
                                    {item.templateName}
                                </div>
                                {item.isDefault === 0 && (
                                    <div className={styles.systemCardTag}>
                                        系统
                                    </div>
                                )}
                                {item.isDefault === 1 && (
                                    <div className={styles.customCardTag}>
                                        自定义
                                    </div>
                                )}
                            </div>
                            <div className={styles.cardSize}>
                                <span>尺寸：
                                    {this.moduleSize[item.templateType]}
                                </span>
                                {item.isDefault === 1 && (
                                    <span className={styles.dateTime}>
                                        {
                                            this.getLocalTime(item.createTime)
                                        }
                                    </span>
                                )}
                            </div>
                            <div className={styles.cardImg}>
                                <img src={item.templateImageUrl} style={{width:this.imageWidth[item.templateType]}}/>
                            </div>
                            {item.isDefault === 0 && (
                                <button className={styles.copyBtn} onClick={this.copyModule.bind(this,item.id)}>
                                    复制
                                </button>
                            )}
                            {item.isDefault === 1 && (
                                <div className={styles.allCustomBtn}>
                                    <button className={styles.customBtn} onClick={this.editModule.bind(this,item.id)}>
                                        编辑
                                    </button>
                                    <button className={styles.customBtn} onClick={this.showDeleteConfirm.bind(this,item)} >
                                        删除
                                    </button>
                                    <button className={styles.customBtn} onClick={this.copyModule.bind(this,item.id)}>
                                        复制
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Main
