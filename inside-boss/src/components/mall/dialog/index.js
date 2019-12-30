import React, { Component } from 'react'
import styles from './index.css'
import { Upload, Icon, message, Radio, Button } from 'antd'
import uploadFile from '../../../utils/uploadFile'
import { getRectImageUrl } from '../../../utils/image'

const Dragger = Upload.Dragger

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const RadioGroup = Radio.Group

function filterFile(file, type) {
  let t1 = 'banner'
  if (file === 'activity') {
    t1 = '活动'
  }
  let t2 = '新增'
  if (type === 2) {
    t2 = '编辑'
  }

  const data = {
    theme: t2 + t1,
    title: t1 + '标题',
    img: t1 + '图片'
  }

  return data
}

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 表单数据
      type: 0,
      form: {
        title: '',
        url: '',
        img: '',
        isSelected: 0
      },
      // 展示用图片
      imageUrl: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.form && nextProps.form.id) {
      const form = this.state.form
      this.setState({
        type: 2,
        form: { ...form, ...nextProps.form },
        imageUrl: nextProps.form.img
      })
    } else {
      this.setState({
        type: 1
      })
    }
  }

  beforeUpload(file) {
    if (file && file.size && file.size / (1024 * 1024) > 3) {
      message.warning('您上传的图片太大，请压缩后再试')
      return false
    }
  }

  // 图片上传
  updateImage(info) {
    const status = info.file.status

    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      message.success(`${info.file.name} 上传成功`)
      const { response = {} } = info.file
      if (response && response.code === 1 && response.data) {
        this.updateForm({
          img: getRectImageUrl(response.data, { w: 750, h: 260 })
        })

        getBase64(info.file.originFileObj, imageUrl => {
          this.setState({
            imageUrl
          })
        })
      }
    } else if (status === 'error') {
      message.error(`${info.file.name} 上传失败`)
    }
  }
  // 切换状态 上架/下架
  updateStatus = e => {
    this.updateForm({
      isSelected: e.target.value
    })
  }
  // 更新标题输入框
  updateTitle = e => {
    this.updateForm({
      title: e.target.value
    })
  }
  // 更新链接输入框
  updateUrl = e => {
    this.updateForm({
      url: e.target.value
    })
  }

  // 更新form数据
  updateForm(data = {}) {
    const form = this.state.form
    const updatedForm = { ...form, ...data }
    this.setState({
      form: updatedForm
    })
  }

  // 取消
  cancel() {
    this.props.updateDialog()
    this.setState({
      type: 0,
      form: { title: '', url: '', img: '', isSelected: 0 },
      imageUrl: ''
    })
  }
  // 保存
  change() {
    const _this = this
    const { form = {}, type } = this.state
    const callback = () => {
      _this.setState({
        type: 0,
        form: { title: '', url: '', img: '', isSelected: 0 },
        imageUrl: ''
      })
    }
    this.props.changeContent({ form, type, callback })
  }

  render() {
    const { form, type, imageUrl } = this.state
    const { file, status = 0 } = this.props
    const header = filterFile(file, type)

    const draggerProps = uploadFile()

    return status ? (
      <div className={styles.dialog}>
        <div className={styles.cover} />
        <div className={styles.panel}>
          <h5 className={styles.uddTop}>{header.theme}</h5>
          <div className={styles.uddPan}>
            <div className={styles.uddBox}>
              <div className={styles.uddItem}>
                <span>{header.title}</span>
                <input
                  type="text"
                  className={styles.inputText}
                  value={form.title}
                  maxLength="30"
                  onChange={this.updateTitle.bind(this)}
                />
                <div className={styles.tipText}>标题最多为30个字符</div>
              </div>
            </div>
            <div className={styles.uddBox}>
              <div className={styles.uddItem}>
                <span>链接地址</span>
                <input
                  type="text"
                  className={styles.inputText}
                  value={form.url}
                  onChange={this.updateUrl.bind(this)}
                />
                <div className={styles.tipText}>
                  只支持微信公众号链接或者二维火链接
                </div>
              </div>
            </div>
            <div className={styles.uddBox}>
              <div className={styles.uddItem}>
                <span>{header.img}</span>
                <div className={styles.imageDragger}>
                  <div
                    className={styles.imageUrl}
                    style={{
                      backgroundImage: 'url(' + imageUrl + ')',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <Dragger
                    {...draggerProps}
                    previewVisible={false}
                    beforeUpload={this.beforeUpload.bind(this)}
                    onChange={this.updateImage.bind(this)}
                  />
                </div>
                <div className={styles.tipText}>图片尺寸建议为750*260px</div>
              </div>
            </div>
            <div className={styles.uddBox}>
              <div className={styles.uddItem}>
                <span>是否上架</span>
                <div className={styles.groundSelect}>
                  <RadioGroup
                    onChange={this.updateStatus.bind(this)}
                    value={form.isSelected}
                  >
                    <Radio value={0}>否</Radio>
                    <Radio value={1}>是</Radio>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <Button
              className={styles.uddButton}
              onClick={this.cancel.bind(this)}
            >
              取消
            </Button>
            <Button
              className={styles.uddButton}
              onClick={this.change.bind(this, form)}
              type="primary"
            >
              保存
            </Button>
          </div>
        </div>
      </div>
    ) : null
  }
}

export default Main
