import React, { PureComponent } from 'react';
import { Modal, Button, Pagination, Upload, Icon, message } from 'antd';
import visualApi from '@src/api/visualConfigApi'
import style from './imgUpload.css'
import uploadFile from '../utils/uploadFile';

const Dragger = Upload.Dragger;

const data = [];
for (let i = 0; i < 21; i++) {
  data.push(i);
}
export default class imgUploadPreview extends PureComponent {

  state = {
    selectionIndex: -1, // 图片列表选中的值
    mode: '我的图片',
    loading: false,
    title:"我的图片",
    imgList:[], //图片列表
    totalPage: 1, // 总条数
    isDisabled: true,
    selectImg: '',
    current: 1
  }

  componentDidMount() {
    this.getMaterials(1)
  }

  componentWillReceiveProps(nextProps) {
    // 每次重新打开子组件的时候重新请求数据
    if(nextProps.isShowImgUpload) {
      this.getMaterials(1)
    }
}

  handleOk = (e) => {
    const {close, getImg} = this.props
    const {selectImg} = this.state
    close()
    getImg(selectImg)
    this.setState({
      selectionIndex: -1,
      current: 1
    })
  }

  handleCancel = (e) => {
    const {close} = this.props
    close()
    setTimeout(() => {
      this.setState({
        mode: '我的图片',
        imageUrl: null,
        selectionIndex: -1,
        current: 1
      })
    })
  }

  onPagina = (page) => {
    // 分页回调
    this.getMaterials(page)
  }

  _SelectionImg = (item, index) => {
    this.setState({
      selectionIndex: index,
      selectImg: item
    })
  }

  onChange = () => {
    this.setState({
      mode: '上传图片',
      title:"我的图片 > 上传图片",
      isDisabled: true
    })

  }

  _uploadSucess = () => {
    // 确认按钮
    const { getImg } =this.props
    const { imageUrl } = this.state
    this.handleCancel()
    this.setState({
      mode: '我的图片',
      isDisabled: true,
      selectionIndex: 0,
      imageUrl: null
    })
    getImg(imageUrl)
  }

  beforeUpload = (file)=> {
    // 图片上传之前校验
    if (file && file.size && file.size / (1024 * 1024) > 2) {
      message.warning('您上传的图片太大，请压缩后再试')
      return false
    }
  }

  handleChange = (info) => {
    // 图片上传
    const status = info.file.status
    if (status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (status === 'done') {
        message.success(`${info.file.name} 上传成功`)
        const { response = {} } = info.file
        if (response && response.code === 1 && response.data) {
            this.addMaterial(response.data)
            this.setState({
              imageUrl: response.data,
              loading: false,
            })
        }
    } else if (status === 'error') {
        message.error(`${info.file.name} 上传失败`)
    }
  }

  getMaterials = (pageIndex) => {
    // 获取图片列表
    visualApi.getMaterials({
        pageIndex: pageIndex,
        pageSize: 20,
        type: 1,
    }).then(
      res=>{
        const { materials, totalPage } = res.data
        this.setState({
          imgList: materials,
          totalPage,
          current:pageIndex
        })
       },
      err=>{
        console.log('err', err)
      }
   )
  }

  addMaterial = (imageUrl) => {
    // 添加素材
    visualApi.addMaterial({ type: 1, url: imageUrl }).then(
      res=>{
        this.setState({
          isDisabled: false
        })
       },
      err=>{
        console.log('err', err)
      }
   )
  }

  imgListPriew = () => {
    const { selectionIndex, imgList, totalPage, current } =  this.state
    return(
      <div>
        <p className={style.tit}>我的图片</p>
        <p className={style.titUnderline}></p>
        <ul className={style.imgUl}>
          {imgList.map((item, index) =>
            <li className={style.imgList} onClick={(e) => this._SelectionImg(item.url, index, e)} key={index}>
              <img className={style.img} src={item.url} />
              {selectionIndex == index && <img className={style.SelectionImg} src="https://assets.2dfire.com/frontend/2e694861b860cc8bbd4bc3b1c706e9e1.png" />}
            </li>
          )}
        </ul>
        <Button type="primary" className={style.uploadBtn} onClick={this.onChange}>上传图片</Button>
        <Pagination current={current} onChange={this.onPagina} className={style.uploadPagination} hideOnSinglePage={true} total={totalPage * 10} />
      </div>
    )
  }

  uploadPriew = () => {
    const imageUrl = this.state.imageUrl;
    const { isDisabled } = this.state
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
      </div>
    );
    return(
      <div className={style.avatar}>
        <p className={style.uploadText}>本地上传：</p>
        <div className={style.avataruploader}>
          <Dragger
            {...uploadFile()}
            className={style.dragContainer}
            beforeUpload={this.beforeUpload}
            onChange={this.handleChange}
          >
          {imageUrl ? <img src={imageUrl} className={style.imageUrl} alt="avatar" /> : uploadButton}
        </Dragger>
        <p className={style.uploadTip}>仅支持gif、jpg、jpeg、png格式图片，图片大小不超过2M</p>
      </div>
      <Button type="primary" disabled={isDisabled} className={style.sureBtn} onClick={this._uploadSucess}>确认</Button>
    </div>
    )
  }

  initPriew = () => {
    const { mode } =  this.state
    switch(mode){
      case '我的图片':
        return this.imgListPriew();
        break;
      case '上传图片':
        return this.uploadPriew();
        break;
      default:
    }
  }

  render() {
    const { mode, title } =  this.state
    return (
      <div className='zent-uoload-preview'>
        <Modal
          title={title}
          visible={this.props.isShowImgUpload}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width ={800}
          footer={mode =='我的图片' ? undefined : null}
        >
          {this.initPriew()}
        </Modal>
      </div>
    );
  }
}
