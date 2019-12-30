/**
 * Created by air on 2017/7/31.
 */
import React, {Component} from 'react'
import styles from './style.css'
import {message, Button, Modal, Spin, Tree, Table, Input} from 'antd'

import * as action from '../../action'
import * as bridge from '../../utils/bridge'
import saveAs from '../../utils/saveAs'


import TreeList from './treeList'
import {setPageNumber} from "../../action/index";

// 使用到的antD组件
const TreeNode = Tree.TreeNode;
const Search = Input.Search;


class Main extends Component {

    constructor(props) {
        super(props)
    }

    //表格 表头
    columns = [{
        title: '序号',
        dataIndex: 'no',
        width: 100,
        render: (text, record, index) => (
            <span>
                {index + 1}
            </span>
        )
    }, {
        title: '类目',
        dataIndex: 'type'
    }, {
        title: '操作',
        dataIndex: 'key',
        width: 100,
        render: (text, record) => (
            <span>
            <a onClick={() => {
                this.del(text,record)
            }}>删除</a>
        </span>
        ),
    }];

    handleExport (url) {
        const t = this
        const {token} = bridge.getInfoAsQuery()


        saveAs(url, token).then(
            filename => message.success('导出成功!'), // 成功返回文件名
            err => {
                if (err.code === 0) {

                    if (err.errorCode === '401') {
                        bridge.callParent('logout')
                        return
                    }

                    message.error(err.message || '导出失败')
                }

            }
        ).then(e => this.setState({exportLock: false}))
    }

    json2url (json) {
        var url = ''
        var arr = []
        for (let i in json) {
            arr.push(i + '=' + json[i])
        }
        url = arr.join('&')
        return url
    }

    del =(text,record)=> {
        console.log(text,record);
        const {data, dispatch} = this.props;
        const {tableData, checkedList} = data;
        let tmp =  [].concat(checkedList);
        let tmpBlank =  [];
        let j=0,k=0 ;
        for(let i =0; i< tableData.length; i++){
            if(tableData[i].key == text){
                j = i;
            }
        }
        for(let m =0; m< checkedList.length; m++){
            if(checkedList[m] == text){
                k = m;
            }
        }
        tableData.splice(j,1);
        console.log(tmp,'tmp',k,tmp.splice(k,1));
        dispatch(action.delTableItem(tableData));
        dispatch(action.checkedType(tmp));
        if(tableData.length == 0){
            console.log('blank table~')
            dispatch(action.checkedType([]));

        }
    };

    // 本组件状态，可以在当前组件内setState（异步）修改数据
    state = {
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
    }

    //展开
    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    //筛选框输入值
    onChange = (e) => {
        const value = e.target.value;
        console.log(e.target);
        console.log(value)
        // const expandedKeys = dataList.map((item) => {
        //     if (item.title.indexOf(value) > -1) {
        //         return getParentKey(item.key, treeData);
        //     }
        //     return null;
        // }).filter((item, i, self) => item && self.indexOf(item) === i);
        // this.setState({
        //     expandedKeys,
        //     searchValue: value,
        //     autoExpandParent: true,
        // });
    }


    render() {
        const t = this
        const {dispatch, data} = t.props

        const {tableData, exportUrl, exportData, checkedList} = data;

        let final = exportData;

        let categoryIds = checkedList ? checkedList.toString() : null;

        final = Object.assign({}, exportData, {categoryIds: categoryIds})
//         const _exportUrl = exportUrl + '?' + t.json2url(final)
        const _exportUrl = exportUrl + '?' + t.json2url(final)

        //table 属性控制
        const table_state = {
            pagination: false,
            bordered: true,
            size: "middle",
            scroll: {
                y: 390
            }
        }
        //tree 属性控制
        const tree_state = {
            checkable: true,
            multiple: true,
            showLine: true,
            showIcon: false
        }
        const {
            searchValue,
            expandedKeys,
            autoExpandParent
        } = this.state;
        const loop = (data) => {
            if(data){
                console.log(data)
                data.map((item) => {
                    const index = item.title.indexOf(searchValue);
                    const beforeStr = item.title.substr(0, index);
                    const afterStr = item.title.substr(index + searchValue.length);
                    const title = index > -1 ? (
                        <span>
                    {beforeStr}
                            <span style={{color: '#f50'}}>{searchValue}</span>
                            {afterStr}
                </span>
                    ) : <span>{item.title}</span>;

                    if (item.children) {
                        return (
                            <TreeNode key={item.key} title={title}>
                                {loop(item.children)}
                            </TreeNode>
                        );
                    }

                    return <TreeNode key={item.key} title={title} third/>;
                });
            }
        }
        return (
            <div className={styles.main_wrapper}>
                <div className={styles.top_line}>

                    <div className={styles.treeSelect}>
                        <p className={styles.title}>请选择需要导入的类目，一次不超过50个：</p>
                        <div className={styles.tree}>
                            <div>
                                {<TreeList data={data} dispatch={dispatch}/>}
                            </div>
                        </div>
                    </div>
                    <div className={styles.selectedList}>
                        <p className={styles.title}>已选择类目：{tableData?tableData.length:0}</p>

                        {
                            <Table {...table_state} columns={this.columns} dataSource={tableData}/>
                        }

                        <Button type="primary" className={styles.downBtn} onClick={t.handleExport.bind(t, _exportUrl)} disabled={tableData == ''}>确认并下载模板</Button>
                    </div>
                </div>
                {/*{*/}
                {/*showSpin && showSpin.bool ? (*/}
                {/*<div className={styles.cover}>*/}
                {/*<Spin tip={showSpin.content} style={{marginTop: 160, marginLeft: -160}} size="large"></Spin>*/}
                {/*</div>*/}
                {/*) : null*/}
                {/*}*/}
            </div>
        )
    }
}

export default Main





