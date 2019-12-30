/**
 * Created by air on 2017/7/11.
 */
import React, {Component} from 'react'
import {Input, Tree, Modal} from 'antd'
import styles from './style.css'
import * as action from '../../action'

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

class TreeList extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.count = 0

    }

    componentDidUpdate () {
        console.log(this.props)
        const {data} = this.props
        const {treeData, tableData} = data

        if(treeData.length == 1 && this.count < 1) {
            this.autoChecked(treeData, tableData)
            this.count++;
        }
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    dataList = [];
    generateList = (data) => {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const key = node.key;
            const title = node.title;
            this.dataList.push({key, title: title});
            if (node.child) {
                this.generateList(node.child, node.key);
            }
        }

        // this.autoChecked(data)
    };

    autoChecked = (data, tableData) => {
        const t = this;
        const {dispatch} = t.props
        // if(data.length == 1 && data.child.length == 1 && data.child[0].child.length == 1) {
        let tmp = [];
        let tmpTable = [];
        if (data){
            if(data.length == 1){
                // console.log(data.length,data[0].key,'11111')
                tmp.push(data[0].key.toString());

                if(data[0].child && data[0].child.length == 1){
                    // console.log(data[0].child.length ,data[0].child[0].key,'22222')
                    tmp.push(data[0].child[0].key.toString());

                    if(data[0].child[0].child && data[0].child[0].child.length == 1){
                        // console.log(data[0].child[0].child.length ,data[0].child[0].child[0].key,'33333')
                        tmp.push(data[0].child[0].child[0].key.toString());
                        tmpTable.push(
                            {
                                key: data[0].child[0].child[0].key.toString(),
                                type: data[0].child[0].child[0].title + ' (' + data[0].title + ' -> ' + data[0].child[0].title + ')',
                            }
                        )
                    }
                }
            }
            if(tmp.length == 3){
                dispatch(action.checkedType(tmp))
                dispatch(action.delTableItem(tmpTable))

            }
        }


        // }
    }

//获取父key
    getParentKey = (key, tree) => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.child) {
                if (node.child.some(item => item.key === key)) {
                    parentKey = node.key;
                } else if (this.getParentKey(key, node.child)) {
                    parentKey = this.getParentKey(key, node.child);
                }
            }
        }
        return parentKey;
    };
//获取父title
    getParentTitle = (key, tree) => {
        let parentKey;
        let parentTitle;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.child) {
                if (node.child.some(item => item.key === key)) {
                    parentKey = node.key;
                    parentTitle = node.title;
                } else if (this.getParentKey(key, node.child)) {
                    parentKey = this.getParentKey(key, node.child);
                    parentTitle = this.getParentTitle(key, node.child);
                }
            }
        }
        return parentTitle;
    };


//筛选框输入值 回车或点击右侧放大镜 搜索分类
    onSearch = (e) => {
        const t = this;
        console.log(e)
        const {data, dispatch} = t.props;
        const value = e;

        const {treeData} = data;
        // dispatch(action.getCategory(data,value));

        // console.log(e,value,treeData);
        const expandedKeys = this.dataList.map((item) => {
            if (item.title.indexOf(value) > -1) {
                let expandedKey = '';
                if(this.getParentKey(item.key, treeData)){
                    // console.log()
                    expandedKey = this.getParentKey(item.key, treeData).toString()
                }
                return expandedKey;
            }
            return null;
        }).filter((item, i, self) => item && self.indexOf(item) === i);


        if(!e){
            this.setState({
                expandedKeys: [],
                searchValue: value,
                autoExpandParent: true,
            });
        }else{
            this.setState({
                expandedKeys,
                searchValue: value,
                autoExpandParent: true,
            });
        }
    }

    onCheck = (checkedKeys, e) => {
        const t = this;
        const {dispatch, data} = t.props
        const {treeData, checkedList, tableData} = data
        let tmpList = [];
        let tmp = [];
        for (var j = 0; j < checkedKeys.length; j++) {
            for (var k = 0; k < this.dataList.length; k++) {
                if (checkedKeys[j] == this.dataList[k].key && e.checkedNodes[j].props.third) {
                    let father = this.getParentTitle(this.dataList[k].key, treeData);
                    let grandfather = this.getParentTitle(this.getParentKey(this.dataList[k].key, treeData), treeData);
                    tmp.push(
                        {
                            key: this.dataList[k].key.toString(),
                            type: this.dataList[k].title + ' (' + grandfather + ' -> ' + father + ')',
                            father: father,
                            grandfather: grandfather
                        }
                    )
                    tmpList.push(
                        this.dataList[k].key.toString()
                    )
                }
            }
        }
        let maxLimited = tmpList.length
        if(maxLimited > 50){
            Modal.info({
                title: '请注意',

                content: <div>
                    最多可选50个类目
                </div>
            })
        }
        else{
            dispatch(action.checkedType(tmpList))
            dispatch(action.delTableItem(tmp,tableData))
        }


        console.log('check',checkedList)
        // tableData = tmp
        // this.setState({
        //     expandedKeys: checkedList
        // });
    }

    render() {
        const t = this
        const {data} = t.props

        const {treeData,checkedList} = data
        if(treeData){
            this.dataList = [];
            this.generateList(treeData);
        }
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

        const loop = data => data.map((item) => {
            const index = item.title.indexOf(searchValue);
            // const index = -2;
            // let title = ''
            // if(index > -1)
            // {
            //     const beforeStr = item.title.substr(0, index);
            //     const afterStr = item.title.substr(index + searchValue.length);
            //     title = index > -1
            //         ?(<span>{beforeStr}
            //             <span style={{color: '#f50'}}>{searchValue}</span>
            //             {afterStr}</span>)
            //         :<span>{item.title}</span>;
            // }
            // else {
            //     title = <span>{item.title}</span>;
            //
            // }
            let title = []
            if(index > -1){
                const beforeStr = item.title.substr(0, index);
                const afterStr = item.title.substr(index + searchValue.length);
                title = (<span>{beforeStr}<span style={{color: '#f50'}}>{searchValue}</span>{afterStr}</span>)
            }
            else{
                title = <span>{item.title}</span>
            }
            // const title = index > -1
            //     ?(<span>{beforeStr}
            //      <span style={{color: '#f50'}}>{searchValue}</span>
            //      {afterStr}</span>)
            //     :<span>{item.title}</span>;
            // const title = <span>{item.title}</span>;
            if (item.child) {
                return (
                    <TreeNode key={item.key} title={title}>
                        {loop(item.child)}
                    </TreeNode>
                );
            }

            return <TreeNode key={item.key} title={title} third/>;
        });

        return (
            <div>
                <Search style={{marginBottom: 8}} placeholder="三级类目名称" onSearch={this.onSearch}/>
                {treeData ?
                    <Tree
                        {...tree_state}
                        onExpand={this.onExpand}
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}
                        onCheck={this.onCheck}
                        checkedKeys={checkedList}
                    >
                        {loop(treeData)}
                    </Tree> : null
                }
            </div>
        )

    }
}

export default TreeList
