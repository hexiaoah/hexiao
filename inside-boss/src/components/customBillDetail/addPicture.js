/**
 * Created by air on 2017/7/10.
 */
import React, {Component} from 'react'
import styles from './css/main.css'
import * as bridge from '../../utils/bridge'
import axios from 'axios'
import {errorHandler} from '../../action'

class AddPicture extends Component {
  constructor(props) {
    super(props)
  }

  submitImg() {
    let file = document.getElementById('upload_file').files[0]
    this.imgUpload(file)
  }

  // 图片上传到oss
  imgUpload(file) {
    const {dispatch, params} = this.props
    let that = this
    let formData = new FormData()
    formData.append('file', file)
    formData.append('projectName', 'OssImg')
    formData.append('path', 'customizebill')
    axios
      .post('/api/uploadfile', formData, {
        isUploadImg: true
      })
      .then(response => {
        that.props.AddUploadLogo({
          img: response,
          index: that.props.index
        })
      })
      .catch(err => {
        dispatch(errorHandler(err))
      })
  }

  delLogo() {
    this.props.AddUploadLogo({img: '', index: this.props.index})
  }

  render() {
    const t = this
    const {data} = t.props
    // 是否是编辑页面
    // 编辑页显示右上角删除按钮
    const isEdit = window.location.hash.indexOf('detail')> 0
    return (
      <span>
        {(() => {
          if (!isEdit) {
            return (
              <span className={styles.logoImg}>
                {data.type}
                <img src={data.value}/>
              </span>
            )
          } else {
            if (!data.value) {
              return (
                <label className={styles.btnType2}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={this.submitImg.bind(this)}
                    id="upload_file"
                  />
                  <div className={styles.chooseFile} ref="chooseAndUpload">
                    上传图片
                  </div>
                </label>
              )
            } else {
              return (
                <span className={styles.logoImg}>
                <span
                  className={styles.closeImg}
                  onClick={this.delLogo.bind(this)}
                />
                <img src={data.value}/>
              </span>
              )
            }
          }
        })()}
      </span>
    )
  }
}

export default AddPicture
