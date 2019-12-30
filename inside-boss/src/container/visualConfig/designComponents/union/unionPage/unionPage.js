import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Radio, Input, Modal } from 'antd';
import ImgUpload from '@src/container/visualConfig/views/design/common/imgUpload'
import { SketchPicker } from 'react-color'
import cookie from '@2dfire/utils/cookie'
import s from './unionPage.css'

const RadioGroup = Radio.Group;

export default class unionPage extends Component {
    static propTypes = {
        PreviewWrapper: PropTypes.func.isRequired,
        EditorWrapper: PropTypes.func.isRequired,
        EditPlaceholderWrapper: PropTypes.func.isRequired,
        editing: PropTypes.bool.isRequired,
        config: PropTypes.object,
        onUpdate: PropTypes.func.isRequired,
    }

    state = {
        visible: false,
        isSketchPicker: false,
        isShowImgUpload: false,
        title: '',
        backgroundType: 'color',
        backgroundColor: 'transparent',
        backgroundImage:null,
        shape: null,
        disabled: true,
        announWordLeng: 0
    }

    componentDidMount() {
        const { config } = this.props
        const { title, backgroundType, backgroundColor, backgroundImage } = config
        this.setState({
            title,
            backgroundType, 
            backgroundColor, 
            backgroundImage,
            announWordLeng: !title ? 0 : title.length,
            shape: title == null ? 'square' : 'round'
        })
    }

    onChangeInput = (e) => {
        // 输入框
        const val = e.target.value.trim()
        if (val.length > 20) {
            return
        }
        this.setState({
            title: val,
            announWordLeng: val.length
        })
    }

    handleChangeComplete = (color) => {
        // 拾色器的回调
        this.setState({
            backgroundColor: color.hex
        })
    }

    configChang = (obj) => {
        const { 
            title, backgroundType, backgroundColor, backgroundImage, shape, announWordLeng
        } = this.state
        const { config, onUpdate } =  this.props
        // 这里的title为什么设置 null 和 '',是因为用null表示商家名称，''表示固定名称不输入
        let setTitle = ''
        if( shape == 'round') {
            if(announWordLeng > 0){
                setTitle = title
            }
        } else {
            setTitle = null
        }
        onUpdate({
          ...config,
          title: setTitle, 
          backgroundType, 
          backgroundColor,
          backgroundImage
        })
        this.setState({
          visible: false,
          isSketchPicker: false,
        });
      }

    changeGroup = (val) => {
        this.setState({
            shape: val.target.value,
            disabled: val.target.value == 'round' ? false : true 
        })
     }

     changeColor = (val) => {
        this.setState({
            backgroundType:  val.target.value,
        })
     }

     showIsVisible = () => {
         this.setState({
             visible: true
         })
     }

     handleCancel = () => {
        this.setState({
          visible: false,
        });
      };

    showSkentPick = (str) => {
        this.setState({
            isSketchPicker: !this.state.isSketchPicker,
        })
    }

    _getImg = (data) => {
        // 获取图片
        this.setState({
            backgroundImage: data
        })
    }
    
    imgClose = () => {
        this.setState({
            isShowImgUpload: false
        })
    }

    showImgUpload  = () => {
        this.setState({
            isShowImgUpload: true
        })
    }

    isUnionShop = () => {
        const data = JSON.parse(cookie.getItem('entrance')).shopInfo
        const { entityTypeId, isInLeague } = data // entityTypeId: 3是店铺，10是联盟；isInLeague：1，店铺是属于联盟下的店铺
        if (entityTypeId == '3' && !!isInLeague){ // 联盟或者是联盟下的店铺
            return false
        }
        return true
    }

    render() {
        return <div>
            {this.isUnionShop() && <Button onClick={this.showIsVisible} className={s.placeholderWrapper}>页面基本信息配置</Button>}
            {this.editor()}
        </div>
    }

    editor() {
        const { 
            visible, isSketchPicker, isShowImgUpload, shape, title, backgroundType, backgroundColor, disabled, announWordLeng
        } = this.state

        return(
            <Modal
                title={'页面基本信息配置'}
                width ={800}
                visible={visible}
                footer={null}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <div className={s.editor}>
                <ImgUpload
                    getImg={this._getImg}
                    isShowImgUpload={isShowImgUpload}
                    close={this.imgClose}
                />
                    <div className={s.label}>标题名称：</div>
                    <div className={s.componentTitleEditor}>
                        <div className={s.radioGroup}>
                            <RadioGroup value={shape} className={s.controlGroupControl} onChange={(e) => this.changeGroup(e)}>
                                <Radio name="shape" value='square'>显示商家名称</Radio>
                                <Radio name="shape" value='round'>显示固定名称</Radio>
                            </RadioGroup>
                        </div>
                        <div className={s.titleInput}>
                            <input
                                disabled ={disabled}
                                className={s.input}
                                placeholder='请输入标题内容'
                                value={ !title ? '' : title }
                                type="text"
                                onChange={(e) => this.onChangeInput(e)}
                            />
                             <p className={s.wordNumber}>{announWordLeng}/20</p>
                        </div>
                    </div>
                    <div className={s.label}>背景配置：</div>
                    <div className={s.componentTitleEditor}>
                        <div className={s.changImg}>
                            <div className={s.radioGroup}>
                                <RadioGroup value={backgroundType} className={s.controlGroupControl} onChange={this.changeColor}>
                                    <Radio name="shape" value='image'>使用背景图片</Radio>
                                </RadioGroup>
                                <Button disabled={backgroundType == 'color'} icon="picture" onClick={this.showImgUpload} className={s.uploadImg}>上传背景图片</Button>
                            </div>
                        </div>
                        <div>
                            <div className={s.radioGroup}>
                                <RadioGroup value={backgroundType} className={s.controlGroupControl} onChange={this.changeColor}>
                                    <Radio name="shape" value='color'>使用固定颜色</Radio>
                                </RadioGroup>
                                <div className={s.titlePickColor}>
                                    <Button disabled={backgroundType == 'image'} style={{ backgroundColor: backgroundColor }} className={s.pickColorBtn} onClick={this.showSkentPick} type="primary" />
                                    {isSketchPicker && 
                                        <SketchPicker
                                        color={backgroundColor}
                                        className={s.titleSketchPicker}
                                        onChangeComplete={(color) => this.handleChangeComplete(color)}
                                    />}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.save}>
                        <Button onClick={this.configChang} type="primary">确认</Button>
                    </div>
                </div>
            </Modal>
        )
    }
}
