import React, { Component } from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'

import ComItem from './ComItem'
import s from './ComGroup.css'


export default class ComGroup extends Component {
    static propTypes = {
        group: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props)

        this.state = {
            closed: false,
        }
    }

    switchOpen = () => {
        this.setState({
            closed: !this.state.closed,
        })
    }

    render() {
        const { name, list } = this.props.group
        const { closed } = this.state

        return <div className={s.wrapper}>
            <div className={s.header} onClick={this.switchOpen}>
                <span className={s.groupName}>{name}</span>
                <span className={c(s.switchBtn, closed && s.close)} />
            </div>
            {this.renderComponents(list, closed)}
        </div>
    }

    renderComponents(componentNames, closed) {
        return <div className={c(s.components, closed && s.close)}>
            {componentNames.map(name => <ComItem key={name} name={name} />)}
        </div>
    }
}
