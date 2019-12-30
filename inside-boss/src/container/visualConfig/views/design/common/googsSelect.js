import React, { PureComponent } from 'react';
import { Modal, Table, Input, Icon} from 'antd';
import {formatNumber, entityId} from '../utils/index'
import visualApi from '@src/api/visualConfigApi'
import constants from './constants'

const { Column } = Table;

export default class googsSelectPreview extends PureComponent {

  state = {
    shopInput:'',
    data: [],
    selectedRows: [],
    selectedRowKeys: [],
    radio: this.props.radio || false
  }

  componentDidMount() {
    this.getRetailGoodsList()
  }
  componentWillReceiveProps(nextProps) {
    // 每次重新打开子组件的时候重新请求数据
    if(nextProps.isShowGoods) {
      this.getRetailGoodsList()
    }
  }

  getRetailGoodsList = ({ keyWord } = {}) => {
    // 零售商品列表
    visualApi.getRetailGoodsList({ keyWord }).then(
      res=>{
          this.setState({
            data: res.data
          })
        },
      err=>{
        console.log('err', err)
      }
    )
  }

  handleOk = () => {
    const {close, getGoodsItem} = this.props
    const { selectedRows } = this.state
    if(selectedRows.length > 0) {
      getGoodsItem(selectedRows)
    }
    close()
    this.deleKeys()
  }

  handleCancel = () => {
    const {close} = this.props
    close()
    this.deleKeys()
  }

  deleKeys = () => {
    // 选中重置
    this.setState({
      selectedRows: [],
      selectedRowKeys: []
    });
  }

  onChangeShopInput = (e) => {
    this.setState({ shopInput: e.target.value });
  }

  newDate = (str) => {
    var date, Y, M, D, h, m, s;
      date = new Date(Number(str));
      Y = date.getFullYear() + '-';
      M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      D = date.getDate() + ' ';
      h = date.getHours() + ':';
      m = date.getMinutes();
      s = date.getSeconds();
      return Y + M + D + h + m
  }

  handleKeydown = (e) => {
    // 回车事件
    const { shopInput } = this.state
    if(e.keyCode == 13) {
      this.getRetailGoodsList({ keyWord: shopInput })
    }
  }

  render() {
    const { shopInput, data, selectedRowKeys } =  this.state
    for(var i = 0; i< data.length; i++ ){
      data[i].key = i
    }

    const rowSelection = {
      selectedRowKeys,
      type: this.state.radio ? 'radio' : null,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows })
      }
    };

    return (
      <div className='zent-googsSelect-preview'>
        <Modal
          title="添加商品 > 商品选择"
          visible={this.props.isShowGoods}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width ={800}
        >
          <Input
            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="搜索商品"
            value={shopInput}
            onChange={this.onChangeShopInput}
            style={creatStyle()}
            onKeyDown={this.handleKeydown}
          />
          <Table dataSource={data} rowSelection={rowSelection} pagination={{ pageSize: 5 }} >
            <Column
              title="商品主图"
              dataIndex="imagePath"
              key="imagePath"
              render={(imagePath) => (
                <span>
                  <img src={imagePath || constants.defaultGoodsImg} width='50' height='50'></img>
                </span>
              )}
            />
            <Column
              title="商品名称"
              dataIndex="itemName"
              key="itemName"
            />
            <Column
              title="价格"
              dataIndex="minPrice"
              key="minPrice"
              render={(minPrice) => (
                <span>
                  <span>{formatNumber(minPrice, true)}</span>
                </span>
              )}
            />
            <Column
              title="创建时间"
              dataIndex="createTime"
              key="createTime"
              render={(createTime) => (
                <span>
                  <span>{this.newDate(createTime)}</span>
                </span>
              )}
            />
          </Table>
        </Modal>
      </div>
    );
  }
}

function creatStyle() {
  return{
    width: '150px',
    height: '32px',
    margin: '0 0 20px',
  }
}
