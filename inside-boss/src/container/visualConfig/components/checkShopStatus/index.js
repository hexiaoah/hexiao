import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadBaseInfo } from '@src/container/visualConfig/store/actions'
import { getBaseInfoStatus } from '@src/container/visualConfig/store/selectors'
import { Loading, LoadFailed, CanNotConfig } from './status'
import cookie from '@2dfire/utils/cookie'


/*
根据店铺状态显示提示信息，仅在店铺可配置的情况下挂载、渲染被装饰的组件。

使用方法：
@checkShopStatus
class SomeComponent {
    ...
}
*/
export default function checkShopStatus(WrappedComponent) {
    return function Decorated(props) {
        return <ShopStatusWrapper>
            <WrappedComponent {...props} />
        </ShopStatusWrapper>
    }
}


@connect(state => ({
    baseInfoStatus: getBaseInfoStatus(state),
    shopInfo: state.visualConfig.shopInfo,
}))
class ShopStatusWrapper extends Component {
    componentWillMount() {
        // baseInfo 未载入或载入失败时，执行加载
        if (!this.props.baseInfoStatus) {
            loadBaseInfo()
        }
    }

    render() {
        const { baseInfoStatus, shopInfo } = this.props
        const data = JSON.parse(cookie.getItem('entrance')).shopInfo
        const { entityTypeId, isInLeague } = data // entityTypeId: 3是店铺，10是联盟；isInLeague：1，店铺是属于联盟下的店铺

        if (baseInfoStatus === null) return <Loading />
        if (baseInfoStatus === false) return <LoadFailed retry={loadBaseInfo} />
        if (entityTypeId == '10' || (entityTypeId == '3' && isInLeague)) return this.props.children
        if (!shopInfo.canConfig) return <CanNotConfig />

        // 仅在 shopInfo 可用且允许配置时渲染实际页面内容
        return this.props.children
    }
}
