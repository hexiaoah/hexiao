import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { Modal, message } from 'antd'

import * as actions from '@src/container/visualConfig/store/actions'
import checkShopStatus from '@src/container/visualConfig/components/checkShopStatus'
import { Layout, Header, Content } from '@src/container/visualConfig/components/pageParts'
import s from './index.css'


@checkShopStatus
@connect(state => ({
    loadingStatus: state.visualConfig.templates.loadingStatus,
    templates: state.visualConfig.templates.list,
}))
class Templates extends Component {
    componentWillMount() {
        actions.loadTemplates()
    }

    useTemplate(item) {
        Modal.confirm({
            title: '确认后将以该模板样式覆盖当前页面样式，是否继续？',
            onOk: () => (
                actions.useTemplate(item).then(result => {
                    if (result) {
                        hashHistory.push('/visual_config_design')
                    } else {
                        message.error('模板应用失败')
                    }
                })
            ),
        })
    }

    // ====================================

    render() {
        const { loadingStatus } = this.props

        let content
        if (loadingStatus === null) content = this.statusLoading()
        else if (loadingStatus === false) content = this.statusLoadFailed()
        else content = this.templates()

        return <Layout>
            <Header title="装修模板" />
            <Content className={s.content}>
                {content}
            </Content>
        </Layout>
    }

    statusLoading() {
        return <div className={s.loading}>载入中...</div>
    }

    statusLoadFailed() {
        return <div className={s.loadFailed}>
            模板列表加载失败，<a onClick={actions.loadTemplates}>点此重试</a>
        </div>
    }

    templates() {
        return <div className={s.templates}>
            {this.props.templates.map(item => this.template(item))}
        </div>
    }

    template(item) {
        return <div key={item.appId} className={s.template}>
            <img className={s.subscript} src="https://assets.2dfire.com/frontend/ed5a1826e1d1d7fa932eb608be188991.png" />
            <div className={s.preview} style={{ backgroundImage: `url(${item.previewImg})` }} />
            <div className={s.info}>
                <div className={s.name}>{item.name}</div>
                <button className={s.useBtn} onClick={() => this.useTemplate(item)}>应用</button>
            </div>
        </div>
    }
}

export default Templates
