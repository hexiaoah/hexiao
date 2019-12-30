import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import c from 'classnames'

import { indexOf } from '@src/container/visualConfig/utils'
import * as actions from '@src/container/visualConfig/store/actions'
import { getMoveableRange } from '@src/container/visualConfig/store/selectors'
import s from './EditorWrapper.css'

@connect(state => ({
    moveableRange: getMoveableRange(state),
    configs: state.visualConfig.design.componentConfigs,
}))
class EditorWrapper extends Component {
    static contextTypes = {
        designId: PropTypes.string.isRequired,
        designDefinition: PropTypes.object.isRequired,
    }

    static propTypes = {
        className: PropTypes.any,       // 附加自定义的 className
        arrow: PropTypes.bool,          // 是否显示一个向左的小箭头
    }

    static defaultProps = {
        arrow: true,
    }

    get definition() {
        return this.context.designDefinition
    }

    get id() {
        return this.context.designId
    }

    get index() {
        return indexOf(this.props.configs, item => item.id === this.id)
    }

    get canMoveUp() {
        return !this.definition.position && this.index > this.props.moveableRange[0]
    }

    get canMoveDown() {
        return !this.definition.position && this.index < this.props.moveableRange[1]
    }

    moveUp = () => {
        actions.designMoveComponent(this.id, this.index - 1)
    }

    moveDown = () => {
        actions.designMoveComponent(this.id, this.index + 1)
    }

    leave = () => {
        actions.designLeaveComponent()
    }

    render() {
        const { className, arrow } = this.props
        const { description } = this.definition

        return <div className={c(s.wrapper, arrow && s.arrow, className)}>
            <div className={s.inner}>
                <div className={s.header}>
                    <div className={s.desc}>{description}</div>
                    {this.canMoveUp && <span className={s.moveUp} onClick={this.moveUp} />}
                    {this.canMoveDown && <span className={s.moveDown} onClick={this.moveDown} />}
                    <span className={s.leave} onClick={this.leave} />
                </div>

                <div className={s.body}>
                    {this.props.children}
                </div>
            </div>
        </div>
    }
}

export default EditorWrapper
