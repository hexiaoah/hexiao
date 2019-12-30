import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { connect } from 'react-redux'

import { getPages } from '@src/container/visualConfig/store/selectors'
import s from './index.css'


@connect(state => ({
    pages: getPages(state),
}))
class ChoosePage extends Component {
    static propTypes = {
        current: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        disabled: PropTypes.bool,
    }

    static defaultProps = {
        disabled: false,
    }

    render() {
        const { current, disabled, onChange } = this.props

        return <div className={s.wrap}>
            <Select
                size="large"
                value={current}
                onChange={onChange}
                disabled={disabled}
            >
                {this.options()}
            </Select>
        </div>
    }

    options() {
        return this.props.pages.map(page => (
            <Select.Option key={page.configName} value={page.configName}>{page.name}</Select.Option>
        ))
    }
}

export default ChoosePage
