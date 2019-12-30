import React from 'react';
import { Radio, Button } from 'antd';
import { SketchPicker } from 'react-color';
import { DesignEditor, ControlGroup } from '@src/container/visualConfig/views/design/editor/DesignEditor';
import ImgUpload from '@src/container/visualConfig/views/design/common/imgUpload'
import Dropdown from '@src/container/visualConfig/views/design/common/dropdown'
import style from './TmpEditor.css'
const RadioGroup = Radio.Group;

export default class NavEditor extends DesignEditor {
  state = {
    size: 'large',
    defaultImg:'https://assets.2dfire.com/frontend/071bac5b44ade2005ad9091d1be18db6.png',
    navIndex: -1,
    isShowImgUpload: false,
    imgType: '默认',
    isShowColorPicker: false,
  };

  onChange = (str, e) => {
    const { value, onChange } = this.props;
    const { config } = value
    config.nav[str] = e.target.value
    onChange(value, {config})
  }

  getItems = () => {
    const config = this.props.value.config
    return config.nav.mode === '经典展开式' ? config.nav.expandItems : config.nav.appItems
  }

  closeItem = (index) => {
    // 删除组件
    const { value, onChange } = this.props;
    const { config } = value
    this.getItems().splice(index, 1)
    onChange(value, {config})
  }

  addItem = () => {
    // 添加编辑组件
    const { value, onChange } = this.props;
    const { config } = value

    const item = config.mode === '经典展开式'
      ? { icon: null, linkPage: null }
      : {
        defaultIcon: null,      // 默认状态下的 icon URL。必填
        highlightIcon: null,    // 高亮状态下的 icon URL。必填
        linkPage: null,         // 链接到哪个页面。必填
      }

    this.getItems().push(item)
    onChange(value, {config})
  }

  _selectLink = (data) => {
    // 页面链接选择
    const { value, onChange } = this.props;
    const { config } =  value
    const { navIndex } = this.state
    this.getItems()[navIndex].linkPage = data
    onChange(value,{config})
  }

  onChangnavIndex = (index) => {
    this.setState({
      navIndex: index
    })
  }

  _getImg = (data) => {
    // 获取图片
    const { value, onChange } = this.props;
    const { config } =  value
    const { navIndex, imgType } = this.state

    if(config.nav.mode == '经典展开式') {
      config.nav.expandItems[navIndex].icon = data
    } else {
      if(imgType == '默认') {
        config.nav.appItems[navIndex].defaultIcon = data
      } else{
        config.nav.appItems[navIndex].highlightIcon = data
      }
    }
    onChange(value, {config})
  }

  close = () => {
    this.setState({
      isShowImgUpload: false,
    })
  }

  onChangeBtn = (index) => {
    this.setState({
      isShowImgUpload: !this.setState.isShowImgUpload,
      navIndex: index
    })
  }

  imgTypeChange = (str) => {
    this.setState({
      imgType: str,
    })
  }

  showColorPicker() {
    this.setState({ isShowColorPicker: !this.state.isShowColorPicker })
  }

  choosedColor(e) {
    const { value, onChange } = this.props;
    value.config.nav.backgroundColor = e.hex
    onChange(value)
    this.setState({ isShowColorPicker: false })
  }

  render(){
    const { value, prefix, validation } = this.props;
    const { config } = value
    const { defaultImg, size, isShowImgUpload, isShowColorPicker } = this.state
    const appItems = config.nav.mode == '经典展开式' ? config.nav.expandItems : config.nav.appItems
    const maxLen = config.nav.mode == '经典展开式' ? 10 : 4

    return (
      <div className={`${prefix}-design-component-config-editor`}>
        {config.nav.mode === 'app式' && <div className={style.row}>
          <ControlGroup
              label="背景颜色："
              error={validation.hasPadding}
              className={style.groupLabel}
            ></ControlGroup>
          <div className={style.navPickColor}>
            <Button style={{backgroundColor: config.nav.backgroundColor}} className={style.pickColorBtn} onClick={() => this.showColorPicker()} type="primary" />
            {isShowColorPicker &&
              <SketchPicker
                className={style.navSketchPicker}
                onChangeComplete={(e) => this.choosedColor(e)}
              />}
          </div>
        </div>}

        <ImgUpload
          getImg={this._getImg}
          isShowImgUpload={isShowImgUpload}
          close={this.close}
        />
        <div className={style.componentConfigEditor}>
          <ControlGroup
            label="选择模板:"
            error={validation.hasPadding}
            className={style.groupLabel}
          >
          </ControlGroup>
          <div className={style.right}>
            <RadioGroup value={config.nav.mode} className={style.controlGroupControl} onChange={(e) => this.onChange('mode', e)}>
              <Radio name="mode" value='经典展开式'>经典展开式</Radio>
              <Radio name="mode" value='app式'>app式</Radio>
            </RadioGroup>

            {appItems.map((item, index) =>
            <div className={style.upload}>
              <div className={style.uplodInfo} onClick={() => this.imgTypeChange('默认')}>
                <p>默认</p>
                <img onClick={(e) => this.onChangeBtn(index, e)} src={(item.defaultIcon || item.icon) ? (item.defaultIcon || item.icon) : defaultImg}></img>
              </div>
              {config.nav.mode == 'app式' &&
                <div className={style.uplodInfo} onClick={() => this.imgTypeChange('高亮')}>
                  <p>高亮</p>
                  <img onClick={(e) => this.onChangeBtn(index, e)} src={item.highlightIcon ? item.highlightIcon : defaultImg}></img>
                </div>
              }
              <p className={style.uploadTip}>图片尺寸要求（支持png格式）图片尺寸要求（支持png格式）50x50px</p>
              <div className={style.navEditor} onClick={() => this.onChangnavIndex(index)}>
                <div className={style.text}>链接：</div>
                <Dropdown selectLink={this._selectLink} current={item.linkPage} />
              </div>
              <img
                className={style.closeBtn}
                src="https://assets.2dfire.com/frontend/73a3ec09ff1b5814aea734d1e7e226cb.png"
                onClick={() => this.closeItem(index)}
              />
            </div>
            )}
            { appItems.length < maxLen && <Button onClick={this.addItem} className={style.adAntBtn} type="primary" shape="round" icon="plus" size={size}>添加导航项</Button> }
          </div>
        </div>
      </div>
    )
  }

  static designType = 'navigation';
  static designDescription = '导航';
  // static designTemplateType = '基础类';
}
