import React, { Component } from 'react'
import styles from './card.css'

const Card = ( {title, children}) => {
    return (
        <div className={styles.baseInfo_wrapper}>
            <div className={styles.title}>{title}</div>
            {children}
        </div>  
    ) 
}

export default Card