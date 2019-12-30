
import React, { Component }from 'react'
import { connect } from 'react-redux'
import Main from '../../components/mall'
import { initActivityList, editActivityItem } from '../../action'
import Cookie from '@2dfire/utils/cookie'

class container extends Component {
    render () {
        const baseInfo = this.props.baseInfo
        return (
            <div>
                <Main
                    module='activity'
                    contentList={ this.props.activityList }
                    initList={ this.props.initActivityList(baseInfo) }                    
                    editItem={ this.props.editActivityItem(baseInfo) }
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { activityList = [] } = state.mallActivityManager || {}
    const entrance = JSON.parse(decodeURIComponent(Cookie.getItem('entrance')))
    const baseInfo = {
        entityId: entrance.shopInfo.entityId,
        userId: entrance.userInfo.memberId,
    }

    return {
        baseInfo,
        activityList
    }
}

const mapDispatchToProps = { 
    initActivityList,    
    editActivityItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(container)


