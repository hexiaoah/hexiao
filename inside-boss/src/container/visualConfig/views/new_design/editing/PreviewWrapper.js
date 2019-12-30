import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Popconfirm } from 'antd'
import c from 'classnames'
import cookie from '@2dfire/utils/cookie'

import * as actions from '@src/container/visualConfig/store/actions'
import s from './PreviewWrapper.css'


class PreviewWrapper extends Component {
    static contextTypes = {
        designId: PropTypes.string.isRequired,
        designEditing: PropTypes.bool.isRequired,
        designDefinition: PropTypes.object.isRequired,
    }

    get removeable() { return this.context.designDefinition.choosable }
    get editing() { return this.context.designEditing }
    get id() { return this.context.designId }

    isUnionShop = () => {
        const data = JSON.parse(cookie.getItem('entrance')).shopInfo
        const { entityTypeId, isInLeague } = data // entityTypeId: 3是店铺，10是联盟；isInLeague：1，店铺是属于联盟下的店铺
        if (entityTypeId == '3' && !!isInLeague){ // 联盟或者是联盟下的店铺
            return false
        }
        return true
    }    
    
    edit = e => {
        if(this.isUnionShop()) {
            if (e.target.dataset.removeBtn) return
            actions.designEditComponent(this.id)
        }
    }

    remove = () => actions.designRemoveComponent(this.id)

    render() {
        return <div className={c(s.previewWrapper, this.editing && s.editing)} onClick={this.edit}>
            {this.props.children}
            {this.isUnionShop() && this.removeable && this.removeBtn()}
        </div>
    }

    removeBtn() {
        return <Popconfirm
            title="确定删除？"
            wrapperClassName={s.actionBtnDelete}
            trigger="click"
            onConfirm={this.remove}
        >
            <img data-remove-btn="1" className={s.removeBtn} src="https://assets.2dfire.com/frontend/73a3ec09ff1b5814aea734d1e7e226cb.png" />
        </Popconfirm>
    }
}

export default PreviewWrapper
