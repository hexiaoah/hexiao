import React, { Component } from 'react'
import { connect } from 'react-redux'
import cookie from '@2dfire/utils/cookie'
import { getPageDesignComponentGroups } from '@src/container/visualConfig/store/selectors'
import ComGroup from './ComGroup'
import s from './ComList.css'


@connect(state => ({
    groups: getPageDesignComponentGroups(state),
}))
class ComList extends Component {
    isUnionShop = () => {
        const data = JSON.parse(cookie.getItem('entrance')).shopInfo
        const { entityTypeId, isInLeague } = data // entityTypeId: 3是店铺，10是联盟；isInLeague：1，店铺是属于联盟下的店铺
        if (entityTypeId == '3' && !!isInLeague){ // 联盟或者是联盟下的店铺
            return false
        }
        return true
    }   
    render() {
        const { groups } = this.props
        const groupElements = this.isUnionShop() ? groups.map(group => <ComGroup key={group.name} group={group} />): []
        return groupElements.length
            ? <div className={s.wrapper}>{groupElements}</div>
            : null
    }
}

export default ComList
