import React, {Component} from 'react'
import {Table, Pagination} from 'antd'
import styles from './style.css'
import InitData from "../../container/goods/init";
import * as bridge from "../../utils/bridge";
import * as action from "../../action";
import {setGoodsList} from "../../action";
import {showSpin} from "../../action";
import {errorHandler} from "../../action";
import api from "../../api";

class Specification extends Component {
    constructor(props) {
        super(props)
        this.paginationChange = this.paginationChange.bind(this)
        this.state = {
            columns: [
                // {
                //     title: '规格名称1',
                //     dataIndex: 'specification1',
                //     key: 'specification1',
                // },
                // {
                //     title: '规格名称2',
                //     dataIndex: 'specification2',
                //     key: 'specification2',
                // },
                // {
                //     title: '规格名称3',
                //     dataIndex: 'specification3',
                //     key: 'specification3',
                // },
                {
                    title: '规格条码',
                    dataIndex: 'code',
                    key: 'code',
                },
                {
                    title: '单价（元）',
                    dataIndex: 'price',
                    key: 'price',
                },
                {
                    title: '会员价（元）',
                    dataIndex: 'vipPrice',
                    key: 'vipPrice',
                },
                {
                    title: '库存',
                    dataIndex: 'inventory',
                    key: 'inventory',
                }
            ],
            records: [],
            totalRecord: 0,
            current: 1,
            id: ''
        }
    }

    componentWillMount() {
        const id = this.props.data
        console.log(id)
        this.setState({
            id: id,
        });
        this.paginationChange(1)
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps.data, this.state.id)
        if (newProps.data !== this.state.id) {
            this.setState({
                id: newProps.data,
                current: 1,
                totalRecord: 0
            });
            this.paginationChange(1, newProps.data)
        }

    }

    paginationChange(pageNum, id) {
        this.setState({
            current: pageNum,
        });
        console.log(this.props.data, this.state.id)
        api.getSpecification({
            id: id || this.props.data,
            pageNum: pageNum,
            pageSize: 10
        }).then(
            res => {
                // res = {
                //     "records": [
                //         {
                //             "code": "测试内容e2mj",
                //             "id": "测试内容t141",
                //             "inventory": 51106,
                //             "price": 61258,
                //             "specification1": "测试内容9046",
                //             "specification2": "测试内容4i52",
                //             "specification3": "测试内容4488",
                //             "vipPrice": 78650
                //         }
                //     ],
                //     "totalRecord": 35753
                // }
                res.records.map(item => {
                    if (item.props && item.props.length > 0) {
                        item.props.map(sub => {
                            item[sub.propertyId] = sub.itemValue.name
                        })
                    }

                    return item
                })

                let autoCol = [];
                if (res.titles && res.titles.length > 0) {
                    res.titles.map(item => {
                        autoCol.push({
                            title: item.propertyName,
                            dataIndex: item.propertyId
                        })
                    })
                }

                let tmp_col = [
                    {
                        title: '规格条码',
                        dataIndex: 'code',
                        key: 'code',
                    },
                    {
                        title: '单价（元）',
                        dataIndex: 'price',
                        key: 'price',
                    },
                    {
                        title: '会员价（元）',
                        dataIndex: 'vipPrice',
                        key: 'vipPrice',
                    },
                    {
                        title: '库存',
                        dataIndex: 'inventory',
                        key: 'inventory',
                    }
                ]

                autoCol = autoCol.concat(tmp_col)

                this.setState(res);
                this.setState({
                    columns: autoCol
                });
            },
            err => {
                errorHandler(err)
            }
        )
    }


    render() {
        const t = this
        const {data} = t.props
        const columns = this.state.columns
        console.log(data)
        return (
            <div>
                <Table dataSource={this.state.records} columns={columns} pagination={false}
                       rowKey={records => records.id}
                       className={styles.specificationTable}
                />
                {/*<div className={styles.paginationBox}>*/}

                    {/*<Pagination className={styles.paginationHtml} showQuickJumper*/}
                                {/*current={this.state.current}*/}
                                {/*total={this.state.totalRecord}*/}
                                {/*defaultPageSize={10}*/}
                                {/*pageSize={10} onChange={this.paginationChange.bind(this)}/>*/}
                    {/*<p>共{this.state.totalRecord}条,每页10条</p>*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default Specification
