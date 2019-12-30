import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, message, Modal, Popover } from 'antd'
import QRCode from 'qrcode.react'

import * as actions from '@src/container/visualConfig/store/actions'
import { pick } from '@src/container/visualConfig/utils'
import { Header } from '@src/container/visualConfig/components/pageParts'
import Loading from '@src/container/visualConfig/components/Loading'
import ChoosePage from '@src/container/visualConfig/components/ChoosePage'
import cookie from '@2dfire/utils/cookie'
import s from './DesignHeader.css'

@connect(state => pick(state.visualConfig.design, 'configName', 'componentConfigs', 'previewUrl'))
class DesignHeader extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loadingTip: null,
        }
    }

    // ===== getters =====

    get disabled() {
        // config 载入中时不允许执行操作
        return this.props.componentConfigs === null
    }

    // ===== 公共函数 =====

    loading(tip, promise) {
        this.setState({ loadingTip: tip })
        promise.then(
            () => this.setState({ loadingTip: null }),
            () => this.setState({ loadingTip: null }),
        )
        return promise
    }

    // ==== 业务函数 =====

    switchConfig = (configName) => {
        actions.initDesign(configName)
    }

    publish = () => {
        // TODO: 表单校验
        const promise = this.loading('上架中...', actions.designPublish())
        promise.then(res => {
            if (res.result) {
                message.success('上架成功')
            } else {
                message.error(res.message)
            }
        })
    }

    switchPreviewQRCode = (shouldVisible) => {
        if (shouldVisible) {
            this.preview()
        } else {
            actions.designLeavePreview()
        }
    }
    preview = () => {
        // TODO: 表单校验
        const promise = this.loading('保存中...', actions.designPreview())
        promise.then(res => {
            if (!res.result) message.error(res.message)
        })
    }

    backup = () => {
        this.loading('备份中...', this.executeBackup())
    }
    executeBackup = async (force = false) => {
        const ret = await actions.designBackup(force)
        if (ret.result) {
            message.success('备份成功')
        } else if (ret.forceable) {
            return new Promise(resolve => {
                Modal.confirm({
                    title: ret.message,
                    onOk: () => {
                        this.executeBackup(true).then(
                            () => resolve(),
                            () => resolve(),
                        )
                    },
                    onCancel: () => resolve()
                })
            })
        } else {
            message.error(`备份失败：${ret.message}`)
        }
        return  null
    }

    isUnionShop = () => {
        const data = JSON.parse(cookie.getItem('entrance')).shopInfo
        const { entityTypeId, isInLeague } = data // entityTypeId: 3是店铺，10是联盟；isInLeague：1，店铺是属于联盟下的店铺
        if (entityTypeId == '3' && !!isInLeague){ // 联盟或者是联盟下的店铺
            return false
        }
        return true
    }    

    // ===========================================

    render() {
        const { configName, previewUrl } = this.props
        const disabled = this.disabled
        const { loadingTip } = this.state
        // const title = <span>自定义装修（拖拽相应的组件至页面期望位置即可）</span>
        const title = <span>自定义装修</span>
        return <Header title={title}>
            <div className={s.chooseWrap}>
                <ChoosePage current={configName} onChange={this.switchConfig} disabled={disabled} />
            </div>
            <div className={s.actions}>
                {this.isUnionShop() && <Button type="primary" size="large" disabled={disabled} onClick={this.publish}>上架</Button>}
                {this.isUnionShop() && <Button size="large" disabled={disabled} onClick={this.backup}>备份</Button>}
                <Popover
                    content={<PreviewQRCode url={previewUrl} />}
                    placement="bottom"
                    trigger="click"
                    visible={!!previewUrl}
                    onVisibleChange={this.switchPreviewQRCode}
                >
                    <Button size="large" disabled={disabled}>预览</Button>
                </Popover>
            </div>

            {loadingTip && <Loading tip={loadingTip} />}
        </Header>
    }
}

/**
 * qrcode 是放在 Popover 里显示的，Popover 收起时会有一段过场动画。
 * 若 url 为空时立刻不再渲染 qrcode 内容，那么 Popover 收起时会有一瞬间处于无内容、缩小的状态，不好看。
 * 因此这里处理成 url 为空时依然渲染上一次的 url 内容。
 */
class PreviewQRCode extends Component {
    static propTypes = {
        url: PropTypes.string,
    }

    constructor(props) {
        super(props)

        this.state = {
            cachedUrl: props.url,
        }
    }

    componentWillReceiveProps(nextProps) {
        // nextProps.url 为空时，不更新 state.cachedUrl
        const { url } = nextProps
        if (url) this.setState({ cachedUrl: url })
    }

    render() {
        const { cachedUrl } = this.state
        if (!cachedUrl) return null
        return <QRCode value={cachedUrl} />
    }
}

export default DesignHeader
