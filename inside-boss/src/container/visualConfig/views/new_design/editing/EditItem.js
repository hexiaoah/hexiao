import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as actions from '@src/container/visualConfig/store/actions'
import { getComponentEditing } from '@src/container/visualConfig/store/selectors'
import PreviewWrapper from './PreviewWrapper'
import EditorWrapper from './EditorWrapper'
import EditPlaceholderWrapper from './EditPlaceholderWrapper'
import s from './EditItem.css'


@connect((state, props) => ({
    editing: getComponentEditing(state, props.id),
}))
class EditItem extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        config: PropTypes.any,      // 因为值有可能为 null，不能标记为 required
        designComponent: PropTypes.object.isRequired,
    }

    static childContextTypes = {
        designId: PropTypes.string.isRequired,
        designEditing: PropTypes.bool.isRequired,
        designDefinition: PropTypes.object.isRequired,
    }

    getChildContext() {
        return {
            designId: this.props.id,
            designEditing: this.props.editing,
            designDefinition: this.props.designComponent.definition,
        }
    }

    updateConfig = (config) => {
        actions.designUpdateComponentConfig(
            this.props.id,
            config,
        )
    }

    render() {
        const { config, editing } = this.props
        const DesignComponent = this.props.designComponent.component

        return <div className={s.editItem}>
            <DesignComponent
                PreviewWrapper={PreviewWrapper}
                EditorWrapper={EditorWrapper}
                EditPlaceholderWrapper={EditPlaceholderWrapper}
                editing={editing}
                config={config}
                onUpdate={this.updateConfig}
            />
        </div>
    }
}


export default EditItem
