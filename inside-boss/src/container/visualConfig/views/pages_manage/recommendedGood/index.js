import React, { Component } from 'react'
import { Table, Button, message, Icon,  } from 'antd'
import Cookie from '@2dfire/utils/cookie'
import visualApi from '@src/api/visualConfigApi'
import * as actions from '@src/container/visualConfig/store/actions'
import GoogsSelect from '@src/container/visualConfig/views/design/common/googsSelect'
import { Layout, Header, Content } from '@src/container/visualConfig/components/pageParts'
import s from './index.css'

const entityId = JSON.parse(Cookie.getItem('entrance')).shopInfo.entityId

class Pages extends Component {
    state = {
        materials: [],
        isShowGoods: false,
     };

    componentWillMount() {
        this.getMaterials()
    }

    getMaterials = () => {
      // 获取列表
      visualApi.getMaterials({
          entityId,
          pageIndex: 1,
          pageSize: 20,
          type: 3,
      }).then(
        res=>{
          const { materials } = res.data
          this.setState({
            materials: materials,
          })
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
        const { isShowGoods }= this.state;
        let content
        if (loadingStatus === null) content = this.statusLoading()
        else if (loadingStatus === false) content = this.statusLoadFailed()
        else content = this.pagesTable()

        return <Layout>
            <Header title="页面管理" />
            <Content className={s.content}>
              {this.pagesTable()}
            </Content>
            <GoogsSelect
              radio
              getGoodsItem={this.addEntityMaterial}
              isShowGoods={isShowGoods}
              close={this.close}
            />
        </Layout>
    }

    addEntityMaterial = (data) => {
      // 添加图文广告
      const meta = JSON.stringify({
        linkType: 'goods',
        linkGoodsId: data[0].itemId,
        linkPage: '',
      })
      visualApi.addMaterial({ type: 3,  meta, name:data[0].itemName, }).then(
        res=>{
          if(res.data) {
            this.getMaterials()
            this.setState({
              isShowGoods: false
            })
          }
         },
        err=>{
          console.log('err', err)
        }
     )
    }

    deleteEntityMaterial = (e, id) => {
      // 删除推荐商品
      visualApi.deleteEntityMaterial({ entityId,  materialId: id, }).then(
        res=>{
          if(res.data) {
            this.getMaterials()
          }
         },
        err=>{
          console.log('err', err)
        }
     )
    }

    statusLoading() {
        return <div className={s.loading}>载入中...</div>
    }

    statusLoadFailed() {
        return <div className={s.loadFailed}>
            页面列表加载失败，<a onClick={actions.loadCustomPages}>点此重试</a>
        </div>
    }

    close = () => {
      this.setState({
        isShowGoods: false,
      })
    }

    showGoodsItem = () => {
      this.setState({
        isShowGoods: true,
      })
    }

    pagesTable() {
        const { materials } = this.state
        const columns = [
            {
              title: '名称',
              dataIndex: 'name',
            },
            {
              title: '操作',
              render: (text, record, index) => {
                return (
                  <span>
                    <a className={s.btn} onClick={(e) =>this.deleteEntityMaterial(e, record.materialId) } href="javascript:;">删除</a>
                    { index != 0 && <a className={s.btn} onClick={() => this.swapEntityMaterialSort(record.materialId, materials[index - 1].materialId )}  href="javascript:;">上移</a>}
                    { (index != materials.length-1) && <a onClick={() => this.swapEntityMaterialSort(materials[index + 1].materialId, record.materialId)} className={s.btn} href="javascript:;">下移</a>}
                  </span>
                )
              },
            },
          ];

        return (
          <div className={s.pageManage}>
            <Button className={s.addPage} icon="plus" type="primary" onClick={this.showGoodsItem}>添加推荐商品</Button>
            <Table columns={columns} rowKey={record => record.materialId} dataSource={materials} />
          </div>
        )}
}

export default Pages
