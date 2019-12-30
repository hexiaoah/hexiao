import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { Modal, message } from 'antd'

import * as actions from '@src/container/visualConfig/store/actions'
import { getPages } from '@src/container/visualConfig/store/selectors'
import { first } from '@src/container/visualConfig/utils'
import checkShopStatus from '@src/container/visualConfig/components/checkShopStatus'
import { Layout, Header, Content } from '@src/container/visualConfig/components/pageParts'
import s from './index.css'


@checkShopStatus
@connect(state => ({
    loadingStatus: state.visualConfig.backups.loadingStatus,
    backups: state.visualConfig.backups.list,
    pages: getPages(state),
}))
class Backups extends Component {
    componentWillMount() {
        actions.loadBackups()
    }

    recover(item) {
        Modal.confirm({
            title: '确定要恢复此备份内容吗？',
            onOk: () => (
                actions.recoverBackup(item).then(result => {
                    if (result) {
                        hashHistory.push('/visual_config_design')
                    } else {
                        message.error('备份恢复失败')
                    }
                })
            ),
        })
    }

    remove(item) {
        Modal.confirm({
            title: '确定要删除此备份吗？',
            onOk: () => (
                actions.removeBackup(item).then(result => {
                    if (result) {
                        message.info('备份删除成功')
                    } else {
                        message.error('备份删除失败')
                    }
                })
            ),
        })
    }

    // =======================================

    render() {
        const { loadingStatus } = this.props

        let content
        if (loadingStatus === null) content = this.statusLoading()
        else if (loadingStatus === false) content = this.statusLoadFailed()
        else content = this.table()

        return <Layout>
            <Header title="备份" />
            <Content className={s.content}>
                <div className={s.body}>{content}</div>
            </Content>
        </Layout>
    }

    statusLoading() {
        return <div className={s.loading}>载入中...</div>
    }

    statusLoadFailed() {
        return <div className={s.loadFailed}>
            备份列表加载失败，<a onClick={actions.loadBackups}>点此重试</a>
        </div>
    }

    table() {
        return <table className={s.table}>
            <thead><tr>
                <th>备份名称</th>
                <th>备份类型</th>
                <th>备份时间</th>
                <th>操作</th>
            </tr></thead>
            <tbody>
                {this.items()}
            </tbody>
        </table>
    }

    items() {
        const { backups } = this.props
        if (!backups.length) {
            return <tr><td className={s.noBackup} colSpan="4">无备份内容</td></tr>
        }

        return backups.map(item => {
            const recover = () => this.recover(item)
            const remove = () => this.remove(item)

            return (<tr key={item.configId}>
                <td>应用模板备份</td>
                <td>{this.getName(item.name)}</td>
                <td>{this.formatBackupTime(item.createTime)}</td>
                <td>
                    <div className={`${s.btn} ${s.recover}`} onClick={recover}>恢复</div>
                    <div className={`${s.btn} ${s.remove}`} onClick={remove}>删除</div>
                </td>
            </tr>)
        })
    }

    getName(configName) {
        const page = first(this.props.pages, p => p.configName === configName)
        return page ? page.name : configName
    }

    formatBackupTime(time) {
        const pad = v => (v >= 10 ? v.toString() : '0' + v.toString())
        const d = new Date(time)

        const year = pad(d.getFullYear())
        const month = pad(d.getMonth() + 1)
        const date = pad(d.getDate())
        const hours = pad(d.getHours())
        const minutes = pad(d.getMinutes())
        const seconds = pad(d.getSeconds())

        return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
    }
}

export default Backups
