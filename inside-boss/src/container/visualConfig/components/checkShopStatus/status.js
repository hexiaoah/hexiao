import React from 'react'
import PropTypes from 'prop-types'

import { Layout } from '../pageParts'
import s from './status.css'


export function Loading() {
    return <Layout>
        <div className={s.loading}>载入中...</div>
    </Layout>
}

export function LoadFailed(props) {
    return <Layout>
        <div className={s.loadFailed}>店铺信息加载失败，<a onClick={props.retry}>点此重试</a></div>
    </Layout>
}
LoadFailed.propTypes = {
    retry: PropTypes.func.isRequired,
}

export function CanNotConfig() {
    return <Layout>
        <div className={s.canNotConfig}>
            <img src="https://assets.2dfire.com/frontend/d1c6655544ff586486ae23fb3f60790f.png" />
            <div className={s.text}>当前未开通该功能，需在掌柜APP-高级服务商城-微店铺装修PC版开通后可正常使用</div>
        </div>
    </Layout>
}
