/**
 * Created by air on 2017/7/10.
 */
import React, { Component } from 'react'
import { Menu } from 'antd'
import styles from './style.css'

    class Title extends Component {
    state = {
        current: 'video',
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render () {
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
            >
                <Menu.Item key="video" className={styles.select}>视频导入</Menu.Item>
            </Menu>
        )

    }
}

export default Title
