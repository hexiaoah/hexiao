
import React, { Component }from 'react'
import { connect } from 'react-redux'
import Main from '../../components/mall'
import { initBannerList, editBannerIndex, editBannerItem } from '../../action'
import Cookie from '@2dfire/utils/cookie'

class container extends Component {
    render () {
        const baseInfo = this.props.baseInfo
        return (
            <div>
                <Main
                    module='banner'
                    contentList={ this.props.bannerList }
                    initList={ this.props.initBannerList(baseInfo) }
                    editItem={ this.props.editBannerItem(baseInfo) }
                    editBannerIndex={ this.props.editBannerIndex(baseInfo) }
                />
            </div>            
        )
    }
}

const mapStateToProps = (state) => {
    const { bannerList = [] } = state.mallBannerManager || {}
    const entrance = JSON.parse(decodeURIComponent(Cookie.getItem('entrance')))
    const baseInfo = {
        entityId: entrance.shopInfo.entityId,
        userId: entrance.userInfo.memberId,
    }

    return {
        baseInfo,
        bannerList
    }
}

const mapDispatchToProps = { 
    initBannerList,    
    editBannerItem,
    editBannerIndex,
}

export default connect(mapStateToProps, mapDispatchToProps)(container)


