import React from 'react'
import { Radio, Button, Icon } from 'antd'
import { SketchPicker } from 'react-color'
import visualApi from '@src/api/visualConfigApi'
import style from './TmpEditor.css'
import { DesignEditor, ControlGroup } from '@src/container/visualConfig/views/design/editor/DesignEditor'
import GoogsSelect from '@src/container/visualConfig/views/design/common/googsSelect'
import Dropdown from '@src/container/visualConfig/views/design/common/dropdown'
import BanckgrondSelect from '@src/container/visualConfig/views/design/common/banckgrondSelect'

const RadioGroup = Radio.Group


export default class TitleEditor extends DesignEditor {
    constructor(props) {
        super(props)
        this.state = {
            isSketchPicker: false,
            isSketchPickerbg: false,
            isShowImgUpload: false,
            isShowGoods: false,
            goodsNames: [],
            announWordLeng: props.value.config.text.length,
        }
    }

    componentDidMount() {
        const {
            config,
        } = this.props.value
        const {
            linkGoodsId,
        } = config
        this.getSpecifyRetailGoodsList(linkGoodsId)
    }


    getSpecifyRetailGoodsList(id) {
        // 通用接口，通过ID来查询信息接口
        visualApi.getSpecifyRetailGoodsList({
            idList: [id],
        }).then(
            res => {
                this.setState({
                    goodsNames: res.data,
                })
            },
            err => {
                console.log('err', err)
            },
        )
    }
    configChang = (obj) => {
        const { value, onChange } = this.props
        onChange(value, {
            config: {
                ...value.config,
                ...obj,
            },
        })
    }
    changeGroup = (str, val) => {
        this.configChang({
            [str]: val.target.value,
        })
    }

    showSkentPick = (str) => {
        this.setState({
            [str]: !this.state[str],
        })
    }

    handleChangeComplete = (str, color) => {
        // 拾色器的回调
        this.configChang({
            [str]: color.hex,
        })
    }

    onChangeInput = (e) => {
        // 输入框
        const val = e.target.value.trim()
        if (val.length > 20) {
            return
        }

        // TODO: 这句虽然不合法，但是不能删，删了文本框就不能输入中文
        this.props.value.config.text = val

        this.setState({
            announWordLeng: val.length,
        })
        this.configChang({
            text: val,
        })
    }

    close = () => {
        this.setState({
            isShowImgUpload: false,
            isShowGoods: false,
        })
    }

    _onChangGoods = () => {
        this.setState({
            isShowGoods: true,
        })
    }

    getGoodsItem = (data) => {
        // 商品选择
        this.configChang({
            linkGoodsId: data[0].itemId,
        })
    }

    _selectLink = (data) => {
        // 页面链接选择
        this.configChang({
            linkPage: data,
        })
    }

    getlinkGoodsName = (id, index) => {
        const { goodsNames } = this.state
        const name = (goodsNames.find(c => id === c.itemId) || {}).itemName
        return <div onClick = {this._onChangGoods} className = {style.link}>
            {name || '选择商品的链接'}
            <Icon type = "down" />
        </div>
    }

    render() {
        const {
            value,
            prefix,
            validation,
            onChange,
        } = this.props
        const {
            config,
        } = value
        const {
            textColor,
            backgroundColor,
            text,
            linkGoodsId,
        } = config
        const {
            isSketchPicker,
            isSketchPickerbg,
            isShowGoods,
            announWordLeng,
        } = this.state
        return (
            <div className={`${prefix}-design-component-line-editor`}>
                <GoogsSelect
                    getGoodsItem={this.getGoodsItem}
                    isShowGoods={isShowGoods}
                    close={this.close}
                    radio
                />
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
                            value={text}
                            type="text"
                            onChange={(e) => this.onChangeInput(e)}
                        />
                        <p className={style.wordNumber}>{announWordLeng}/20</p>
                    </div>
                </div>
                <div className={style.componentTitleEditor}>
                    <ControlGroup
                        label="文字大小："
                        error={validation.hasPadding}
                        className={style.groupLabel}
                    >
                    </ControlGroup>
                    <RadioGroup value={value.config.size} className={style.controlGroupControl} onChange={(e) => this.changeGroup('size', e)}>
                        <Radio name="size" value='large'>大</Radio>
                        <Radio name="size" value='medium'>中</Radio>
                        <Radio name="size" value='small'>小</Radio>
                    </RadioGroup>
                </div>
                <div className={style.componentTitleEditor}>
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
                <div className={style.componentTitleEditor}>
                    <ControlGroup
                        label="文本颜色："
                        error={validation.hasPadding}
                        className={style.groupLabel}
                    >
                    </ControlGroup>
                    <div className={style.titlePickColor}>
                        <Button style={{ backgroundColor: textColor }} className={style.pickColorBtn} onClick={() => this.showSkentPick('isSketchPicker')} type="primary" />
                        {isSketchPicker
                    && <SketchPicker
                        color={textColor}
                        className={style.titleSketchPicker}
                        onChangeComplete={(e) => this.handleChangeComplete('textColor', e)}
                    />}
                    </div>
                </div>
                <div className={style.componentTitleEditor}>
                    <ControlGroup
                        label="背景颜色："
                        error={validation.hasPadding}
                        className={style.groupLabel}
                    >
                    </ControlGroup>
                    <BanckgrondSelect
                        value = {value}
                        onChange = {onChange}
                        backgroundColor = {backgroundColor}
                        isSketchPickerbg= {isSketchPickerbg}
                        showSkentPick = {this.showSkentPick}
                    />
                </div>
                <div className={style.componentTitleEditor}>
                    <ControlGroup
                        label="链接："
                        error={validation.hasPadding}
                        className={style.groupLabel}
                    >
                    </ControlGroup>
                    <RadioGroup value={value.config.linkType} className={style.controlGroupControl} onChange={(e) => this.changeGroup('linkType', e)}>
                        <Radio name="linkType" value='goods'>商品</Radio>
                        <Radio name="linkType" value='page'>页面</Radio>
                    </RadioGroup>
                    {value.config.linkType == 'goods'
                        ? this.getlinkGoodsName(linkGoodsId)
                        : <Dropdown className={style.link} selectLink={this._selectLink} current={value.config.linkPage} />}
                </div>
            </div>
        )
    }
    static designType = 'title'; static designDescription = '标题'; static designTemplateType = '基础类'; static getInitialValue() {
        return {
            config: {
                type: 'title',
                text: '', // 标题内容。必填。1 ~ 25个字。
                size: 'medium', // 标题大小。可选值：large、medium、small
                textAlign: 'left', // 文字对齐方式。可选值：left、center（注意，不支持 right）
                textColor: '#000000', // 文字颜色
                backgroundColor: '#fff', // 背景色
                linkType: 'goods', // 链接到哪里。可选值：goods（商品）、page（页面）
                linkGoodsId: '', // 链接到的商品 id，在 linkType 为 goods 时有效。可不填
                linkPage: '', // 链接到的页面路径，在 linkType 为 page 时有效。可不填
            },
        }
    }
}
