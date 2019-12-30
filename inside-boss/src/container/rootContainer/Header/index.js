import React, { Component } from 'react'
import styles from '../style.css'
import { observer } from 'mobx-react'
import store from '../store'
@observer
export default class extends Component {
    render() {
        const {
            header: { menuName }
        } = store
        return menuName ? (
            <div className={styles.header}>
                <p className={styles.title}>{menuName}</p>
            </div>
        ) : null
    }
}
