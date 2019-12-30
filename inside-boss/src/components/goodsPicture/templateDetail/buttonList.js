import React, {Component} from 'react'
import styles from '../style.css'
import {Button} from 'antd'

const  ButtonList =(props)=>{
    return(
        <div className={styles.buttonGrop}>
            <Button type="danger" ghost  className={styles.buttonItem} onClick={props.handlePreview}>预览</Button>
            <Button type="primary" className={styles.buttonItem} onClick={props.saveTemplate}>保存</Button>
            <Button type="danger"  ghost className={styles.buttonItem} onClick={props.handleCancel}>取消</Button>
        </div>
    )
}
export default ButtonList
