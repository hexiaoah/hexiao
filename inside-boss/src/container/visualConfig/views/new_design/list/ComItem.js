import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import c from 'classnames'

import { getPageDesignComponentMap, getDesignComponentCount } from '@src/container/visualConfig/store/selectors'
import * as actions from '@src/container/visualConfig/store/actions'
import s from './ComItem.css'


@connect((state, props) => ({
    definition: getPageDesignComponentMap(state)[props.name].definition,
    count: getDesignComponentCount(state, props.name),
}))
class ComItem extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
    }

    // 是否还能往页面上添加此组件
    get addable() {
        const { definition, count } = this.props
        return !definition.max || count < definition.max
    }

    add = () => {
        if (!this.addable) return
        actions.designAddComponent(this.props.name, null)
    }

    render() {
        const { addable } = this
        const { userName } = this.props.definition
        return <div className={c(s.wrapper, !addable && s.disable)} onClick={this.add}>{userName}</div>
    }
}

export default ComItem
