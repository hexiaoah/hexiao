import React, { Component } from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'

import * as actions from '@src/container/visualConfig/store/actions'
import s from './EditPlaceholderWrapper.css'


class EditPlaceholderWrapper extends Component {
    static contextTypes = {
        designId: PropTypes.string.isRequired,
        designDefinition: PropTypes.object.isRequired,
    }

    static propTypes = {
        className: PropTypes.any,       // 附加自定义的 className
    }

    edit = () => {
        actions.designEditComponent(this.context.designId)
    }

    render() {
        const { className } = this.props
        return <div className={c(s.wrapper, className)} onClick={this.edit}>
            <div className={s.inner}>
                {this.props.children}
            </div>
        </div>
    }
}

export default EditPlaceholderWrapper
