import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd';

import { ImageUpload } from '@src/container/visualConfig/components/editing'
import s from './BackgroundImage.css'


export default class BackgroundImage extends Component {
    static propTypes = {
        PreviewWrapper: PropTypes.func.isRequired,
        EditorWrapper: PropTypes.func.isRequired,
        EditPlaceholderWrapper: PropTypes.func.isRequired,
        editing: PropTypes.bool.isRequired,
        config: PropTypes.string,
        onUpdate: PropTypes.func.isRequired,
    }

    onUpload = url => this.props.onUpdate(url)

    render() {
        const { EditorWrapper, EditPlaceholderWrapper, editing } = this.props
        return <div>
            <EditPlaceholderWrapper className={s.placeholderWrapper}>{this.placeholder()}</EditPlaceholderWrapper>
            {editing ? <EditorWrapper arrow={false}>{this.editor()}</EditorWrapper> : null}
        </div>
    }

    editor() {
        const { config } = this.props

        return <div className={s.editor}>
            <div className={s.label}>页面背景图:</div>
            <div>
                <ImageUpload current={config} onUpload={this.onUpload} />
                <Button type="primary" className={s.resetBtn} onClick={() => this.onUpload(null)}>重置</Button>
                <div className={s.desc}>建议尺寸：750x1334px，尺寸不匹配时，图片进行压缩或拉伸铺满显示</div>
            </div>
        </div>
    }

    placeholder() {
        return <div className={s.placeholder}>
            <img src="https://assets.2dfire.com/frontend/b08d744e284b62f8d50c06afa14a4685.png" />
            <span>背景图</span>
        </div>
    }
}
