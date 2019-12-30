import React from 'react'
import style from './TmpEditor.css'
import { DesignEditor, ControlGroup } from '@src/container/visualConfig/views/design/editor/DesignEditor'

export default class RecommendGoodsEditor extends DesignEditor {
    constructor(props) {
        super(props)
    }

    onChangeInput = (e, str, num) => {
        // 输入框
        const { value, onChange } = this.props
        const val = e.target.value.trim()
        if (val.length > num) {
            return
        }

        // TODO: 这句虽然不合法，但是不能删，删了文本框就不能输入中文
        this.props.value.config[str] = val
        onChange(value, {
            config: {
                ...value.config,
                [str]: val,
            },
        })
    }

    render() {
        const {
            value,
            prefix,
            validation,
        } = this.props
        const {
            config,
        } = value
        const { title, description } = config
        return (
            <div className={`${prefix}-design-component-line-editor`}>
                <div className={style.componentTitleEditor}>
                    <ControlGroup
                        label="标题内容："
                        error={validation.hasPadding}
                        className={style.groupLabel}
                    >
                    </ControlGroup>
                    <div className={style.titleInput}>
                        <input
                            className={style.input}
                            placeholder='请输入标题内容'
                            value={title}
                            type="text"
                            onChange={(e) => this.onChangeInput(e, 'title', 10)}
                        />
                    </div>
                </div>
                <div className={style.componentTitleEditor}>
                    <ControlGroup
                        label="标题下方描述："
                        error={validation.hasPadding}
                        className={style.groupLabel}
                    >
                    </ControlGroup>
                    <div className={style.titleInput}>
                        <input
                            className={style.input}
                            placeholder='请输入描述内容'
                            value={description}
                            type="text"
                            onChange={(e) => this.onChangeInput(e, 'description', 20)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
