/**
 * 图片上传按钮
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TmpUploadChoose from './TmpUploadChoose'
import s from './ImageUpload.css'


class ImageUpload extends Component {
    static propTypes = {
        current: PropTypes.string,              // 当前图片
        onUpload: PropTypes.func.isRequired,  // 图片上传完成后调用此回调。 (finalURL) => {}
    }

    constructor(props) {
        super(props)

        this.state = {
            handling: false,
        }
    }

    upload = () => this.setState({ handling: true })
    cancelUpload = () => this.setState({ handling: false })
    uploaded = url => this.props.onUpload(url)

    render() {
        const { current } = this.props
        const { handling } = this.state

        return <div className={s.wrapper} onClick={this.upload}>
            {current ? this.preview(current) : this.placeholder()}
            {handling && <TmpUploadChoose getImg={this.uploaded} isShowImgUpload={handling} close={this.cancelUpload} />}
        </div>
    }

    preview(url) {
        return <div className={s.imgWrapper}>
            <img src={url} />
        </div>
    }

    placeholder() {
        return <div className={s.placeholder}>+</div>
    }
}


export default ImageUpload
