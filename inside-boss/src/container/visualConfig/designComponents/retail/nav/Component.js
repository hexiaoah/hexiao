import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TmpPreview from './TmpPreview'
import TmpEditor from './TmpEditor'


export default class DesignComponent extends Component {
    static propTypes = {
        PreviewWrapper: PropTypes.func.isRequired,
        EditorWrapper: PropTypes.func.isRequired,
        EditPlaceholderWrapper: PropTypes.func.isRequired,
        editing: PropTypes.bool.isRequired,
        config: PropTypes.object.isRequired,
        onUpdate: PropTypes.func.isRequired,
    }

    render() {
        return <Content {...this.props} />
    }
}

// ===== 兼容层 =======

class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: TmpEditor.getInitialValue(),
        }
    }

    onUpdate = (value) => {
        this.setState({ value })
        this.props.onUpdate(value.config.nav)
    }

    render() {
        const { PreviewWrapper, EditorWrapper, editing, config } = this.props
        const value = {
            ...this.state.value,
            config: {
                nav: config,
            },
        }

        return <div>
            <PreviewWrapper>
                <TmpPreview value={value} />
            </PreviewWrapper>

            {editing ? <EditorWrapper>
                <Editor value={value} onUpdate={this.onUpdate} />
            </EditorWrapper> : null}
        </div>
    }
}


class Editor extends Component {
    render() {
        const props = {
            value: this.props.value,
            onChange: (value1, value2) => this.props.onUpdate({
                ...value1,
                config: value2.config,
            }),
            prefix: 'zent',
            validation: {
                hasPadding: false,
            },
        }
        return <TmpEditor {...props} />
    }
}
