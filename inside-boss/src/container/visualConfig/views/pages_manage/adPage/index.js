import React, { Component } from 'react'
import cx from 'classnames'
import { Table, Radio, Modal, Button, message, Dropdown, Menu, Icon, Upload  } from 'antd'
import Cookie from '@2dfire/utils/cookie'
import visualApi from '@src/api/visualConfigApi'
import uploadFile from '@src/container/visualConfig/views/design/utils/uploadFile';
import * as actions from '@src/container/visualConfig/store/actions'
import { Layout, Header, Content } from '@src/container/visualConfig/components/pageParts'
import s from './index.css'

const RadioGroup = Radio.Group;
const Dragger = Upload.Dragger;
const entityId = JSON.parse(Cookie.getItem('entrance')).shopInfo.entityId
const items = [
  { key: '请选择', title: '请选择' },
  { key: '店铺主页', title: '店铺主页' },
  { key: '商品分类', title: '商品分类' },
  { key: '购物车', title: '购物车' },
  { key: '我的', title: '我的' },
  { key: '我的会员卡', title: '我的会员卡' },
  { key: '我的优惠券', title: '我的优惠券' },
  { key: '我的订单', title: '我的订单' },
  { key: '收货地址', title: '收货地址' },
  { key: '积分商城', title: '积分商城' },
  { key: '本店优惠', title: '本店优惠' },
]

function add0(m) { return m < 10 ? '0' + m : m }

class Pages extends Component {
    state = {
        visible: false,
        defaultImg:'https://assets.2dfire.com/frontend/d66815c9233151bcd5b4289385563fed.png',
        name: '',
        imageUrl: null,
        namLength: 0,
        menuKey: '请选择',
        materials: [],
        statusType: 1,
        materialId: '',
        buttonType: 'save',
        materialsStatus: []
     };

     dropdownPreview = () => {
      const {menuKey} = this.state
      const menu = (
        <Menu onClick={this.menuClick}>
            {items.map(item => <Menu.Item key={item.key}>{item.title}</Menu.Item>)}
        </Menu>
      )
      return (
        <div className={s.link}>
          <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link" href="#">
              {menuKey} <Icon type="down" />
              </a>
          </Dropdown>
        </div>
      )
     }

    menuClick = ({ key }) => {
      this.setState({
        menuKey: key
      })
    }

    componentWillMount() {
        this.getMaterials()
    }

    getMaterials = () => {
      // 获取列表
      visualApi.getMaterials({
          entityId,
          pageIndex: 1,
          pageSize: 20,
          type: 2,
      }).then(
        res=>{
          const { materials } = res.data
          this.setState({
            materials: materials,
            materialsStatus: materials.filter(v => v.status==1)
          })
         },
        err=>{
          console.log('err', err)
        }
     )
    }

    btnChang = () => {
      const { buttonType } = this.state
      if(buttonType == 'save'){
        this.addEntityMaterial()
      }else {
        this.updateEntityMaterial()
      }
    }

    saveExamine = () => {
      const { statusType, materialsStatus } = this.state
      if(statusType == 1){ // 上架状态
        if(materialsStatus.length >= 8){
          return false
        }
      }
      return true
    }

    addEntityMaterial = () => {
      // 添加图文广告
      const { name, imageUrl, statusType, menuKey } = this.state
      if(!this.saveExamine()) return message.error('最多允许8张广告图片，请重新编辑上下架状态');
      if (!name.length) return message.error('名称不能为空')
      if (!imageUrl) return message.error('图片不能为空')

      const meta = JSON.stringify({
        linkType: 'page',
        linkGoodsId: '',
        linkPage: menuKey == '请选择' ? null : menuKey,
      })
      visualApi.addMaterial({ type: 2, url: imageUrl,  meta, name, status:statusType  }).then(
        res=>{
          if(res.data) {
            this.getMaterials()
            this.setState({
              visible: false,
              name: '',
              imageUrl: null,
              namLength: 0,
              statusType: 1,
              menuKey: '请选择',
            })
          }
         },
        err=>{
          console.log('err', err)
        }
     )
    }

    updateEntityMaterial = () => {
      // 图文广告更新
      const { name, imageUrl, statusType, menuKey, materialId } = this.state
      if(!this.saveExamine()) return message.error('最多允许8张广告图片，请重新编辑上下架状态');
      if (!name.length) return message.error('名称不能为空')

      const meta = JSON.stringify({
        linkType: 'page',
        linkGoodsId: '',
        linkPage: menuKey == '请选择' ? null : menuKey,
      })
      visualApi.updateEntityMaterial({ type: 2, url: imageUrl,  meta, name, materialId, status:statusType  }).then(
        res=>{
          if(res.data) {
            this.getMaterials()
            this.setState({
              visible: false,
              name: '',
              imageUrl: null,
              namLength: 0,
              statusType: 1,
              menuKey: '请选择',
            })
          }
         },
        err=>{
          console.log('err', err)
        }
     )
    }

    swapEntityMaterialSort = (firstId, secondId) => {
      // 交换素材顺序
      visualApi.swapEntityMaterialSort({ entityId, firstMaterialId:firstId, secondMaterialId:secondId }).then(
        res=>{
          if(res.data) {
            this.getMaterials()
          }else {
            message.error(res.message)
          }
         },
        err=>{
          console.log('err', err)
        }
     )
    }

    render() {
        const { loadingStatus } = this.props
        let content
        if (loadingStatus === null) content = this.statusLoading()
        else if (loadingStatus === false) content = this.statusLoadFailed()
        else content = this.pagesTable()

        return <Layout>
            <Header title="页面管理" />
            <Content className={s.content}>
              {this.pagesTable()}
            </Content>
            {this.modalPriew()}
        </Layout>
    }

    onChangeBtn = () => {
        this.setState({
            isShowImgUpload: !this.setState.isShowImgUpload,
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

    onChangeInput = (e) => {
        // 输入框
        const val = e.target.value.trim()
        if(val.length > 20) {
          return
        }
        this.setState({
          name: val,
          namLength: val.length
        })
      }

      _selectType = e => {
        // 状态选择
        this.setState({
          statusType: e.target.value,
        });
      }


    modalPriew = () => {
      const {visible, defaultImg, name, namLength, imageUrl, editingPageCode, statusType } = this.state

        return(
            <Modal
            title={editingPageCode ? '编辑图片广告管理' : '新建图片广告管理'}
            width ={800}
            visible={visible}
            footer={null}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
          <div className={s.modalContent}>
            <div className={s.tab}>
              <div className={s.tabname}>名称：</div>
              <div className={s.priewInput}>
                  <input
                      className={s.input}
                      placeholder='请输入内容'
                      value={name}
                      type="text"
                      onChange={(e) => this.onChangeInput(e)}
                  />
                  <p className={s.wordNumber}>{namLength}/20</p>
              </div>
            </div>
            <div className={cx(s.tab+ ' ' + s.tabMargin)}>
              <div className={s.tabname}>图片：</div>
              <div className={s.imgLoad}>
                <Dragger
                  {...uploadFile()}
                  className={s.dragContainer}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange}
                  >
                    <img className={s.imgBtn} src={imageUrl ? imageUrl: defaultImg}/>
                </Dragger>
              </div>
            </div>
            <div className={s.EditInfo}>
              <div className={s.picturEditor}>
                <div className={s.text}>链接：</div>
                <RadioGroup value={'page'} className={s.picturRelation}>
                    {/* <Radio name="linkType" value='goods' className={s.radio}>商品</Radio> */}
                    <Radio name="linkType" value='page' className={s.radio}>页面</Radio>
                </RadioGroup>
                <div className={s.picturLink}>
                  {this.dropdownPreview()}
                </div>
              </div>
            </div>
            <div className={s.EditInfo}>
              <div className={s.picturEditor}>
                <div className={s.text}>状态：</div>
                <RadioGroup value={statusType} className={s.picturRelation} onChange={this._selectType}>
                    <Radio name="linkType" value={1} className={s.radio}>上架</Radio>
                    <Radio name="linkType" value={0} className={s.radio}>下架</Radio>
                </RadioGroup>
              </div>
            </div>
            <div className={s.save}>
              <Button onClick={this.btnChang} type="primary">保存</Button>
            </div>
          </div>
          </Modal>
        )
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
        return;
      }
      if (status === 'done') {
          message.success(`${info.file.name} 上传成功`)
          const { response = {} } = info.file
          if (response && response.code === 1 && response.data) {
              this.setState({
                imageUrl: response.data,
              })
          }
      } else if (status === 'error') {
          message.error(`${info.file.name} 上传失败`)
      }
    }

    showModal = () => {
        this.setState({
          visible: true,
          namLength: 0,
          buttonType: 'save'
        });
      };

      handleCancel = () => {
        this.setState({
          visible: false,
          name: '',
          imageUrl: null,
          menuKey: '请选择'
        });
      };

      changeEdit = (e, record) => {
        const meta = JSON.parse(record.meta)
        this.setState({
          visible: true,
          name: record.name,
          imageUrl: record.url,
          namLength: record.name.length,
          menuKey: meta.linkPage ? meta.linkPage : '请选择' ,
          statusType: record.status,
          materialId: record.materialId,
          buttonType: 'edit'
        })
      }

    pagesTable() {
        const { materials } = this.state
        const columns = [
            {
              title: 'id',
              dataIndex: 'materialId',
            },
            {
              title: '图片',
              dataIndex: 'url',
              render: (text, record) => (
                  <span>
                    <img className={s.adImg} src={record.url} />
                  </span>
              ),
            },
            {
              title: '名称',
              dataIndex: 'name',
            },
            {
              title: '状态',
              dataIndex: 'status',
              render: (text, record) => (
                <span>
                  {record.status ? '上架' : '下架'}
                </span>
              ),
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                render: createTime => <span>{this.format(Number(createTime))}</span>
            },
            {
              title: '操作',
              render: (text, record, index) => {
                return (
                  <span>
                    <a className={s.btn} onClick={(e) =>this.changeEdit(e,record) } href="javascript:;">编辑</a>
                    { index != 0 && <a className={s.btn} onClick={() => this.swapEntityMaterialSort(record.materialId, materials[index - 1].materialId )}  href="javascript:;">上移</a>}
                    { (index != materials.length-1) && <a onClick={() => this.swapEntityMaterialSort(materials[index + 1].materialId, record.materialId)} className={s.btn} href="javascript:;">下移</a>}
                  </span>
                )
              },
            },
          ];

        return (
          <div className={s.pageManage}>
            <Button className={s.addPage} type="primary" onClick={this.showModal}>新增图片广告配置</Button>
            <Table columns={columns} rowKey={record => record.materialId} dataSource={materials} />
          </div>
        )}
}

export default Pages
