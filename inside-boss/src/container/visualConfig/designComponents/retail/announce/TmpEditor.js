import React, { Component } from 'react'
import { Radio, Button, Input } from 'antd'
import { SketchPicker } from 'react-color'
import style from './TmpEditor.css'
import { DesignEditor, ControlGroup } from '@src/container/visualConfig/views/design/editor/DesignEditor'

const RadioGroup = Radio.Group

export default class AnnounceEditor extends DesignEditor {
    constructor(props) {
        super(props)
        this.state = {
            isSketchPicker: false,
            isSketchPickerbg: false,
            announWordLeng: 0,
        }
    }
    componentDidMount() {
        this.getTextLength()
    }

    configChang = (obj) => {
        const { value, onChange } = this.props
        const { config } =  value
        onChange(value, { config: {
            ...config,
            ...obj,
        } })
    }

    changeGroup = (str, val) => {
        this.configChang({ [str]: val.target.value })
    }

    showSkentPick = (str) => {
        this.setState({
            [str]: !this.state[str],
        })
    }

    handleChangeComplete = (str, color) => {
        // 拾色器的回调
        this.configChang({ [str]: color.hex })
    }

    getTextLength = () => {
        const { value } = this.props
        const { config } =  value
        this.setState({
            announWordLeng: config.text.length,
        })
    }

    onChangeInput = (e) => {
        const val = e.target.value.trim()
        if (val.length > 20) {
            return
        }

        // TODO: 这句虽然不合法，但是不能删，删了文本框就不能输入中文
        this.props.value.config.text = val

        this.setState({
            announWordLeng: val.length,
        })
        this.configChang({ text: val })
    }

    render() {
        const { value, prefix, validation } = this.props
        const { config } = value
        const { text } = config
        const { isSketchPicker, isSketchPickerbg, announWordLeng } = this.state
        return (
            <div className={`${prefix}-design-component-Announce-editor`}>
                <div className={style.componentAnnounceEditor}>
                    <ControlGroup
                        label="标题内容："
                        error={validation.hasPadding}
                        className={style.groupLabel}
                    >
                    </ControlGroup>
                    <div className={style.AnnouncInput}>
                        <input
                            className={style.input}
                            placeholder='请输入公告内容'
                            value={text}
                            type="text"
                            onChange={(e) => this.onChangeInput(e)}
                        />
                        <p className={style.wordNumber}>{announWordLeng}/20</p>
                    </div>
                </div>
                <div className={style.componentAnnounceEditor}>
                    <ControlGroup
                        label="框体样式："
                        error={validation.hasPadding}
                        className={style.groupLabel}
                    >
                    </ControlGroup>
                    <RadioGroup value={value.config.mode} className={style.controlGroupControl} onChange={(e) => this.changeGroup('mode', e)}>
                        <Radio name="shape" value='1'>样式一</Radio>
                        {/* <Radio name="shape" value='round'>圆角</Radio> */}
                    </RadioGroup>
                </div>
                <div className={style.componentAnnounceEditor}>
                    <ControlGroup
                        label="背景颜色："
                        error={validation.hasPadding}
                        className={style.groupLabel}
                    >
                    </ControlGroup>
                    <div className={style.titlePickColor}>
                        <Button style={{ backgroundColor: value.config.backgroundColor }} className={style.pickColorBtn} onClick={() => this.showSkentPick('isSketchPickerbg')} type="primary" />
                        {isSketchPickerbg
                    && <SketchPicker
                        color={value.config.backgroundColor}
                        className={style.titleSketchPicker}
                        onChangeComplete={(e) => this.handleChangeComplete('backgroundColor', e)}
                    />}
                    </div>
                </div>
                <div className={style.componentAnnounceEditor}>
                    <ControlGroup
                        label="文本位置："
                        error={validation.hasPadding}
                        className={style.groupLabel}
                    >
                    </ControlGroup>
                    <RadioGroup value={value.config.textAlign} className={style.controlGroupControl} onChange={(e) => this.changeGroup('textAlign', e)}>
                        <Radio name="textAlign" value='left'>居左</Radio>
                        <Radio name="textAlign" value='center'>居中</Radio>
                    </RadioGroup>
                </div>
                <div className={style.componentAnnounceEditor}>
                    <ControlGroup
                        label="文本颜色："
                        error={validation.hasPadding}
                        className={style.groupLabel}
                    >
                    </ControlGroup>
                    <div className={style.titlePickColor}>
                        <Button style={{ backgroundColor: value.config.textColor }} className={style.pickColorBtn} onClick={() => this.showSkentPick('isSketchPicker')} type="primary" />
                        {isSketchPicker
                    && <SketchPicker
                        color={value.config.textColor}
                        className={style.titleSketchPicker}
                        onChangeComplete={(e) => this.handleChangeComplete('textColor', e)}
                    />}
                    </div>
                </div>
            </div>
        )
    }
    static designType = 'announce';
    static designDescription = '公告信息';
    static designTemplateType = '其他类';
    static getInitialValue() {
        return {
            announWordLeng: 0,
            config: {
                type: 'announce',
                text: '',                   // 公告内容。必填。1 ~ 20个字
                mode: '1',                  // 公告样式。可选值：'1'（暂时只支持这一个值）
                backgroundColor: '#ffedca', // 背景色
                textAlign: 'left',          // 文字位置。可选值：left、center
                textColor: '#f86e21',       // 文字颜色
            },
        }
    }
}
