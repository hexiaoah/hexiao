import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import cx from 'classnames'
import { Table, Popconfirm, Modal, Button, message } from 'antd'
import QRCode from 'qrcode.react'

import * as actions from '@src/container/visualConfig/store/actions'
import { getPages } from '@src/container/visualConfig/store/selectors'
import checkShopStatus from '@src/container/visualConfig/components/checkShopStatus'
import { Layout, Header, Content } from '@src/container/visualConfig/components/pageParts'
import ImgUpload from '@src/container/visualConfig/views/design/common/imgUpload'
import s from './index.css'

function add0(m) { return m < 10 ? '0' + m : m }
@checkShopStatus
@connect(state => ({
    loadingStatus: state.visualConfig.customPages.loadingStatus,
    pages: getPages(state),
}))
class Pages extends Component {
    state = {
        visible: false,
        defaultImg:'https://assets.2dfire.com/frontend/071bac5b44ade2005ad9091d1be18db6.png',
        isShowImgUpload: false,
        inputLength: 0,
        textareaLeng: 0,
        inputVal: '',
        textareaVal: '',
        img: '',
        qrcodeVisible: false,
        qrcodeLink: null,
        editingPageCode: null,
     };

    componentWillMount() {
        actions.loadCustomPages()
    }

    get pages() {
        return this.props.pages.filter(p => p.manageable)
    }

    // ====================================

    render() {
        const { loadingStatus } = this.props
        const { isShowImgUpload } = this.state

        let content
        if (loadingStatus === null) content = this.statusLoading()
        else if (loadingStatus === false) content = this.statusLoadFailed()
        else content = this.pagesTable()

        return <Layout>
            <Header title="页面管理" />
            <Content className={s.content}>
                {content}
            </Content>
            {this.modalPriew()}
            {this.qrcodePriew()}
            <ImgUpload
                getImg={this._getImg}
                isShowImgUpload={isShowImgUpload}
                close={this.close}
            />
        </Layout>
    }

    onChangeBtn = () => {
        this.setState({
            isShowImgUpload: !this.setState.isShowImgUpload,
        })
    }
    _getImg = (data) => {
        // 获取图片
        this.setState({
            img: data
        })
        console.log('data====', data)
      }
    close = () => {
        this.setState({
          isShowImgUpload: false,
        })
    }

    statusLoading() {
        return <div className={s.loading}>载入中...</div>
    }

    statusLoadFailed() {
        return <div className={s.loadFailed}>
            页面列表加载失败，<a onClick={actions.loadCustomPages}>点此重试</a>
        </div>
    }

    format = (createTime) => {
        // 时间戳转换
        if(!createTime) return false
        var time = new Date(createTime);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
    }

    onChangeInput = (e, str) => {
        // 输入框
        const num = str == 'input' ? 10 : 30
        const type = str == 'input' ? 'inputVal' : 'textareaVal'
        const len = str == 'input' ? 'inputLength' : 'textareaLeng'
        const val = e.target.value.trim()
        if(val.length > num) {
          return
        }
        this.setState({
            [type]: val,
            [len]: val.length
        })
      }

    modalPriew = () => {
        const {visible, defaultImg, inputVal, textareaVal, inputLength, textareaLeng, img, editingPageCode } = this.state
        return(
            <Modal
            title={editingPageCode ? '编辑微页面' : '新建微页面'}
            width ={800}
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
          <div className={s.modalContent}>
            <div className={s.tab}>
                    <div className={s.tabname}>页面名称：</div>
                    <div className={s.priewInput}>
                        <input
                            className={s.input}
                            placeholder='请输入内容'
                            value={inputVal}
                            type="text"
                            onChange={(e) => this.onChangeInput(e, 'input')}
                        />
                        <p className={s.wordNumber}>{inputLength}/10</p>
                    </div>
                </div>
                <div className={cx(s.tab+ ' ' + s.tabMargin)}>
                    <div className={s.tabname}>分享描述：</div>
                    <div className={s.priewTxtarea}>
                        <textarea
                            className={s.textarea}
                            placeholder='请输入内容'
                            value={textareaVal}
                            type="text"
                            onChange={(e) => this.onChangeInput(e, 'textarea')}
                        />
                        <p className={s.wordNumber}>{textareaLeng}/30</p>
                        <p className={s.text}>展示在分享信息中</p>
                    </div>
                </div>
                <div className={cx(s.tab+ ' ' + s.tabMargin)}>
                    <div className={s.tabname}>分享图片：</div>
                    <div className={s.imgLoad}>
                        <img
                            className={s.imgBtn}
                            src={img? img: defaultImg}
                            onClick={this.onChangeBtn}
                        />
                        <p className={s.text}>建议尺寸5:4，仅支持gif、jpg、jpeg、png格式图片，图片大小不超过2M</p>
                    </div>
                </div>
          </div>
          </Modal>
        )
    }
    showModal = () => {
        this.setState({
          visible: true,
          inputLength: 0,
          textareaLeng: 0,
        });
      };

      handleOk = () => {
        const { editingPageCode, inputVal, textareaVal, img } = this.state

        if (!inputVal || !inputVal.trim()) return message.error('页面名称不能为空')
        if (!textareaVal || !textareaVal.trim()) return message.error('分享描述不能为空')
        if (!img) return message.error('必须上传分享图片')

        if (!editingPageCode) {
          actions.addCustomPage({
            pageName: inputVal,
            shareImage: img,
            shareText: textareaVal,
          }).then(res => {
            if (!res.result) message.error(res.message)
            actions.loadCustomPages()
          })
        } else {
          actions.updateCustomPage(editingPageCode, {
            pageName: inputVal,
            shareImage: img,
            shareText: textareaVal,
          }).then(res => {
            if (!res.result) message.error(res.message)
            actions.loadCustomPages()
          })
        }


        this.setState({
          visible: false,
          qrcodeVisible: false,
          inputVal: '',
          textareaVal: '',
          editingPageCode: null,
          img: '',
        });
      };

      handleCancel = () => {
        this.setState({
          visible: false,
          editingPageCode: null,
          qrcodeVisible: false,
          inputVal: '',
          textareaVal: '',
          img: '',
        });
      };

    handleDelete = data => {
      actions.removeCustomPage(data.pageCode).then(res => {
        if (!res.result) {
          message.error(res.message)
        }
        actions.loadCustomPages()
      })
    };

    changeEdit = (e, str) =>{
      console.log('str===', str)
      // 编辑
      actions.initDesign(str)
      hashHistory.push('/visual_config_design')
    }
    changePromotion = (e, link) =>{
      console.log('link===', link)
      // 推广
      this.setState({
        qrcodeVisible: true,
        qrcodeLink: link()
      })
    }

    editShare = (record) => {
      this.setState({
          inputLength: record.name.length,
          textareaLeng: record.shareText.length,
          visible: true,
          editingPageCode: record.pageCode,
          inputVal: record.name,
          textareaVal: record.shareText,
          img: record.shareImage,
      })
    }

    qrcodePriew = () => {
      const { qrcodeVisible, qrcodeLink } = this.state
      return(
        <Modal
          title="推广二维码"
          visible={qrcodeVisible}
          onCancel={this.handleCancel}
          footer={null}
          width ={800}
        >
          <div className={s.qrcodeModal}>
            <p className={s.text}>用户通过扫描该二维码将直达该页面，满足不同场景的定制化展示需求。</p>
            <QRCode value={qrcodeLink} className={s.img} id='qrCode' />
             <a download="二维码.jpg" id="downloadLink"></a>
            <Button type="primary" className={s.download} onClick={() => this.downLoad()}>下载</Button>
          </div>
        </Modal>
      )
    }
    downLoad = () => {
      // 二维码下载
      const canvas = document.getElementById('qrCode')
      const url = canvas.toDataURL('image/jpeg');
      const downloadLink = document.getElementById('downloadLink')
      downloadLink.setAttribute('href', url)
      downloadLink.click();
    }
    pagesTable() {
        const { pages } = this
        const columns = [
            {
              title: '页面名称',
              dataIndex: 'name',
            },
            {
              title: '页面类型',
              dataIndex: 'isSystem',
              render: isSystem => <span>{isSystem ? '系统页面' : '活动页面'}</span>
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                render: createTime => <span>{this.format(Number(createTime))}</span>
            },
            {
                title: '浏览量',
                dataIndex: 'viewCount',
            },
            {
              title: '操作',
              render: (text, record) => (
                  <span>
                    <a className={s.btn} onClick={(e) =>this.changeEdit(e, record.configName) } href="javascript:;">编辑</a>
                    {text.link == null ? null : <a onClick={(e) =>this.changePromotion(e, record.link) } className={s.btn} href="javascript:;">推广</a>}
                    {!text.isSystem && <a className={s.btn} href="javascript:;" onClick={() => this.editShare(record)}>分享信息</a>}
                    {!text.isSystem &&
                        <Popconfirm title="确定删除吗?" onConfirm={() => this.handleDelete(record)}>
                            <a className={cx(s.closeBtn, s.btn)} href="javascript:;">删除</a>
                        </Popconfirm>}
                  </span>
              ),
            },
          ];

        return (
          <div className={s.pageManage}>
            <Button className={s.addPage} type="primary" onClick={this.showModal}>新建微页面</Button>
            <Table columns={columns} dataSource={pages} />
            </div>
        )}
}

export default Pages
