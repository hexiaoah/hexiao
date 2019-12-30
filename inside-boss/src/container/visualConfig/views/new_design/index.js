import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '@src/container/visualConfig/store/actions'
import { pick } from '@src/container/visualConfig/utils'
import checkShopStatus from '@src/container/visualConfig/components/checkShopStatus'
import { Layout, Content } from '@src/container/visualConfig/components/pageParts'
import DesignHeader from './header/DesignHeader'
import ComList from './list/ComList'
import Editing from './editing/Editing'

import s from './index.css'


@checkShopStatus
@connect(state => pick(state.visualConfig.design, 'configName', 'componentConfigs', 'loadingFailedMessage'))
class Design extends Component {
    componentWillMount() {
        // 若尚未执行过初始化，执行它（从页面管理、备份、模板等页面进入装修时，对应页面会先执行好初始化）
        if (!this.props.configName) {
            actions.initDesign()
        }
    }

    render() {
        const { componentConfigs, loadingFailedMessage } = this.props

        let content
        if (componentConfigs === null) content = this.statusLoading()
        else if (componentConfigs === false) content = this.statusLoadFailed(loadingFailedMessage)
        else content = this.designContent()

        return <Layout>
            <DesignHeader />
            <Content className={s.content}>
                {content}
            </Content>
        </Layout>
    }

    statusLoading() {
        return <div className={s.loading}>载入中...</div>
    }

    statusLoadFailed(message) {
        return <div className={s.loadFailed}>
            {message}，<a onClick={actions.loadDesignConfig}>点此重试</a>
        </div>
    }

    designContent() {
        return <div className={s.designWrapper}>
            <ComList />
            <Editing />
        </div>
    }
}

export default Design
