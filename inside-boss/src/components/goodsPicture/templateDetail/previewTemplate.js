import React, {Component} from 'react'
import styles from '../style.css'
import {Modal} from 'antd'
import classnames from 'classnames'

class PreviewTemplate extends Component{
    constructor(props) {
        super(props)
        this.state = {
            visible:props.visible
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({
            visible: newProps.visible
        })
    }
    // 关闭弹窗
    handleCancel =()=>{
        this.setState({
            visible:false
        },()=>{
            this.props.closePopup();
        })
    }
    render(){
        let {goodsName,goodsImageText,combineGoods}=this.props

        return (
            <div>
                <Modal
                    title={null}
                    visible={this.state.visible}
                    onCancel={()=>this.handleCancel()}
                    footer={null}
                    width={375}
                    >
                    <div className={styles.previewBox}>
                        <p className={styles.previewName}>{goodsName}</p>
                        <ul>
                            {
                                 goodsImageText&&
                                 goodsImageText.map((item, index) => {
                                     return (
                                        <li key={index}>
                                            {
                                                item.image &&
                                                <img src={item.image} className={styles.previewImg}/>
                                            }
                                            {
                                                item.text&&
                                                <p className={styles.previewText}>{item.text}</p>
                                            }
                                        </li>
                                     )
                                 })

                            }
                        </ul>
                        <ul>
                            {
                                combineGoods &&
                                combineGoods.map((item, index) => {
                                    return (
                                        <li key={index} className={styles.itemStyle}>
                                            <div className={styles.previewImageBox}>
                                                {
                                                    item.images[0]&&
                                                    <img src={item.images[0]} className={styles.combineTop}/>
                                                }
                                                {
                                                    item.images[2]&&
                                                    <img src={item.images[2]} className={styles.combineLeft} />
                                                }
                                                {
                                                    item.images[1]&&
                                                    <img src={item.images[1]} className={classnames([styles.combineBottom],{[styles.active]:item.images[2]==""})} />
                                                }
                                                {
                                                    item.images[3]&&
                                                    <img src={item.images[3]} className={styles.combineRight} />
                                                }
                                            </div>
                                            {
                                                item.text&&
                                                <p className={styles.previewText}>{item.text}</p>
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>

                    </div>
                </Modal>
            </div>
        )
    }
}

export default PreviewTemplate
