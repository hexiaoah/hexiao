import { Table } from 'antd'
import React, { Component }from 'react'
import styles from "../cateManage/cateList.css";

class CateTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [{ // 分类列表 表头数据定义
                title: '分类名称',
                dataIndex: 'name',
                width: '30%',
                render: (text, row, index) => {
                    
                    return {
                        children: <a href="javascript:;">{text} { row.chain && <i className={styles.chain_bg}>连锁</i> }</a>
                    };
                },
            }, {
                title: '类型',
                dataIndex: 'type',
                width: '30%',
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {},
                    };
                    return obj
                },
            }, {
                title: '操作',
                dataIndex: 'id',
                width: '40%',
                render: (item, row) => {
                    return (
                        <div className={styles.cate_opt}>
                            { row.tier !== 4 && !row.chain && <span className={styles.cate_add} onClick={() => props.editCate(row, 'addChild')}>新增子类</span>}
                            { !row.chain && <span className={styles.cate_edit} onClick={() => props.editCate(row, 'edit')}>编辑</span>}
                            <span className={styles.cate_del} onClick={() => props.deleteCate(row)}>删除</span>
                        </div>
                    )
            
                },
            }],
        }
    }
    
    render() {
        const { columns } = this.state
        const { dataSource } = this.props
        
        return (
            <div>
                <Table columns={columns} dataSource={dataSource} />
            </div>
        )
    }
}

export default CateTable
