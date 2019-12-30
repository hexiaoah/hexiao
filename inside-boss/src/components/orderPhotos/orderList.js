/**
 * Created by air on 2017/7/11.
 */
import React, { Component } from 'react'
import { Pagination ,Modal ,Spin} from 'antd'
import styles from './style.css'
import * as action from '../../action'


class VideoList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            visible:false,
            img:'',
            pageNumber:1
        }

    }

    paginationChange(pageNumber){

        const t =this

        const { dispatch ,data} = t.props

        const { orderType,startValue,endValue} = data

        this.setState({
            pageNumber: pageNumber,
        });

        console.log(data)
        let val1 = startValue
        let val2 = endValue
        if(!val1){
            val1 = ''
        }

        if(!val2){
            val2 = ''
        }
        dispatch(action.getOrderList(orderType ,pageNumber,val1,val2))
    }

    showModal = (url) => {
        this.setState({
            visible: true,
            img: url,
        });

    }

    hideModal = () => {
        this.setState({
            visible: false,
        });
    }

    getDate = (data) => {

        let time = new Date(data);
        let y = time.getFullYear();
        let m = time.getMonth()+1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
    }

    add0 = (m) => {

        return m<10?'0'+m:m;
    }

    render () {
        const t = this

        const { data } = t.props

        const { orderList ,total, showSpin} = data

        const { visible ,img ,pageNumber} = this.state;

        let orderName

        if(orderList[0].billType === 1){
            orderName = 'Receipt slip'
        }else if(orderList[0].billType === 2){
            orderName = 'Void slip'
        }else if(orderList[0].billType === 3){
            orderName = 'Financial Report By Terminal Slip'
        }else if(orderList[0].billType === 4){
            orderName = 'Sales Statistics By Terminal Slip'
        }
        return (
            <Spin spinning={showSpin && showSpin.bool} tip={showSpin.content}>
                <div className={styles.orderListBox}>
                    <div style={{overflow:'auto'}}>
                        <ul className={styles.orderListUl}>
                            <li className={styles.orderTitle}>
                                <p>No.</p>
                                <p>POS ID</p>
                                <p>{orderName}</p>
                                <p>Time</p>
                                <p>URL</p>
                            </li>
                            {orderList ?
                                orderList.map((order,index) =>{
                                    return(
                                        <li className={styles.orderLi} key={index}>
                                            <p>{index+1}</p>
                                            <p>{order.posId}</p>
                                            <p>
                                                <img src={order.imageUrl} onClick={this.showModal.bind(this, order.imageUrl)} style={{width:'200px',marginTop:'20px'}}/>
                                            </p>
                                            <p>{this.getDate(order.orderTime)}</p>
                                            <p><a href={order.url} target="_blank">{order.url}</a></p>
                                        </li>
                                    )
                                })

                                :'' }

                        </ul>
                    </div>
                    <div className={styles.paginationBox}>
                        <Pagination  className={styles.paginationHtml} showQuickJumper current={pageNumber} total={total} defaultPageSize={10}
                                     pageSize={10} onChange={this.paginationChange.bind(this)} />
                        <p>共{total}条记录</p>
                    </div>
                    <Modal
                        visible={visible}
                        onCancel={this.hideModal}
                        footer={null}
                    >
                        <img ref="img" src={img} style={{width:'100%'}} controls="controls"/>
                    </Modal>
                </div>
            </Spin>
        )

    }
}

export default VideoList
