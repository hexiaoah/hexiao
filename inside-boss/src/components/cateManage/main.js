import React, { Component } from 'react'
import styles from './cateList.css'
import { Modal, Button, Select } from 'antd'
import * as action from '../../action'
import CateTable from "../cateTable"
const { Option } = Select

// 商品分类管理组件
class CateManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowAddCatePop: false, // 是否显示添加弹窗的标识
            currentCate: {
                mode: '', // 模式（新增-edit、更新-addChild）
                classifyId: '', // 销售额归类Id
                parentId: '', // 上级分类
                name: '', // 商品分类
                code: '', // 分类编码
                parentDisabled: false, // 上级分类是否可选
                classifyName: '', // 销售额归类名称
            }, // 当前弹窗的分类信息
            isShowConfirmModal: false, // 是否显示确认弹唱
            currentDeleteCate: {}, // 当前要删除的分类
            cateList: [], // 分类列表
        }
    }
    
    componentWillMount() {
        const { dispatch } = this.props
        dispatch(action.getCategoryList())
    }
    
    /**
     * 编辑或者新增分类
     */
    _editCate(data, mode) {
        const { currentCate } = this.state
        const { id, name, parentId="", code, groupCategoryId } = data
        
        this._toggleCatePop(true)
        // debugger
        if(mode === 'edit') { // 编辑
    
            const { cateFlat=[] } = this.props.data
            let parentName = '无上级分类'
            let classifyName = '不设置'
    
            cateFlat.forEach(function(item) {
                if(item.id === parentId) {
                    parentName = item.name
                }
                if(item.id === groupCategoryId) {
                    classifyName = item.name
                }
            })
    
            currentCate.id = id
            currentCate.parentName = parentName
            currentCate.name = name
            currentCate.parentId = parentId
            currentCate.code = code
            currentCate.classifyId = groupCategoryId
            currentCate.classifyName = classifyName
        } else if (mode === 'addChild') { // 新增子类
            currentCate.parentId = id
            currentCate.parentName = name
            currentCate.name = ''
            currentCate.parentDisabled = true
            currentCate.classifyId = groupCategoryId
        } else if(mode === 'addCate') { // 新增分类
            currentCate.parentId = id
            currentCate.parentName = name
            currentCate.name = ''
            currentCate.parentDisabled = false
            currentCate.classifyId = groupCategoryId
        }
        
        currentCate.mode = mode
        
        this.setState({
            currentCate,
        })
    }
    
    /**
     * 切换添加分类弹窗的显示状态
     */
    _toggleCatePop(flag) {
        if(!flag) {
            const obj = {
                classifyId: '',
                parentId: '',
                name: '',
                code: '',
            }
            this.setState({
                currentCate: obj,
            })
        }
        this.setState({
            isShowAddCatePop: flag,
        })
    }
    
    /**
     * 删除分类
     */
    _deleteCate(item) {
        this.setState({
            isShowConfirmModal: true,
            currentDeleteCate: item,
        })
    }
    
    /**
     * 改变商品分类
     */
    _changeCateName(e) {
        const { currentCate } = this.state
        currentCate.name = e.target.value
        this.setState({
            currentCate,
        })
    }
    
    /**
     * 修改分类编码
     */
    _changeCateCode(e) {
        const { currentCate } = this.state
        currentCate.code = e.target.value
        this.setState({
            currentCate,
        })
    }
    
    // 点击弹窗确认事件
    handleOk() {
        this.setState({
            isShowConfirmModal: false
        })
        const { data, dispatch } = this.props
        const { industry } = data
        const { currentDeleteCate } = this.state
        const args = {
            industry,
            req: JSON.stringify({
                id: currentDeleteCate.id
            })
        }
        dispatch(action.deleteCate(args))
    }
    
    // 弹窗取消事件
    handleCancel() {
        this.setState({
            isShowConfirmModal: false,
            currentDeleteCate: {}
        })
    }
    
    // 上级分类
    _handleAddCateSelect(value) {
        console.log(value)
        const parentId = value
        const { cateFlat=[] } = this.props.data
        let parentName = ''
        
        cateFlat.forEach(function(item) {
            if(item.id === parentId) {
                parentName = item.name
            }
        })
        
        const { currentCate } = this.state
        currentCate.parentId = parentId
        currentCate.parentName = parentName
        this.setState({
            currentCate,
        })
    }
    
    // 销售额归属分类
    _handleAddCateClassify(value) {
        const { currentCate } = this.state
        currentCate.classifyId = value
        this.setState({
            currentCate,
        })
    }
    
    /**
     * 保存商品分类信息
     */
    _saveCate() {
        const { dispatch } = this.props
        const { currentCate } = this.state
        const { industry } = this.props.data
        const { id='', code, name='', classifyId, parentId, mode } = currentCate
        if(name.toString().trim().length === 0) {
            dispatch(action.errorHandler({message: '分类名称不能为空!'}))
            return
        }
        const args = {
            industry,
            req: JSON.stringify({
                code: code,
                name: name,
                parentId: parentId,
                groupCategoryId: classifyId,
                id,
            })
        }
        if(mode === 'addChild' || mode == 'addCate') {
            delete args.id
            dispatch(action.addCate(args))
        } else if(mode === 'edit') {
            dispatch(action.updateCate(args))
        }
        this._toggleCatePop(false)
    }
   
    render() {
        const { cateList=[], cateFlat=[], } = this.props.data
        const { isShowAddCatePop, currentCate, isShowConfirmModal, currentDeleteCate, } = this.state
        
        return (
                <div className={styles.cate_content}>
                    <Button type="primary"
                            className={styles.add_cate_btn}
                            onClick={() => this._editCate(currentCate, 'addCate')}>
                        添加商品分类
                    </Button>
                    <div className={styles.cate_manage_body}>
                        <CateTable dataSource={cateList} editCate={this._editCate.bind(this)} deleteCate={this._deleteCate.bind(this)}/>
                    </div>
                    {
                        isShowAddCatePop &&
                        <div className={styles.add_cate_container}>
                            <div className={styles.add_cate_bg} onClick={() => this._toggleCatePop(false)}></div>
                            <div className={styles.add_cate_box}>
                                <div className={styles.add_cate_title}>商品分类添加</div>
                                <div className={styles.add_base_conf}>基础设置</div>
                                <div className={styles.add_cate_item}>
                                    <span>*商品分类</span>
                                    <input type="text" maxLength="40" value={currentCate.name || ''} onChange={this._changeCateName.bind(this)}/>
                                </div>
                                <div className={styles.add_cate_item}>
                                    <span>上级分类</span>
                                    <Select
                                        placeholder="无上级分类"
                                        defaultValue={currentCate.parentName}
                                        // value={currentCate.parentName}
                                        style={{width: '200px', fontSize: '12px'}}
                                        disabled={currentCate.parentDisabled}
                                        onChange={this._handleAddCateSelect.bind(this)}
                                    >
                                        <Option value="">无上级分类</Option>
                                        {
                                            cateFlat.map( item => {
                                                if(!item.chain) { // 不展示连锁下发的分类
                                                    return (
                                                        <Option value={item.id} key={item.id}>{item.name}</Option>
                                                    )
                                                }
                                            })
                                        }
                                    </Select>
                                </div>
                                <div className={styles.add_cate_item}>
                                    <span>分类编码</span>
                                    <input type="text" value={currentCate.code || ''} onChange={this._changeCateCode.bind(this)}/>
                                </div>
                                <div className={styles.add_high_conf}>高级设置</div>
                                <div className={styles.add_cate_item}>
                                    <span>销售额归到其他分类</span>
    
                                    <Select
                                        placeholder="不设置"
                                        defaultValue={currentCate.classifyName}
                                        style={{width: '200px', fontSize: '12px'}}
                                        onChange={this._handleAddCateClassify.bind(this)}
                                    >
                                        <option value="">不设置</option>
                                        {
                                            cateFlat.map( item => {
                                                return (
                                                    <Option value={item.id} key={item.id}>{item.name}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </div>
                                <div className={styles.add_cate_bottom}>
                                    <div className={styles.btn_cancel} onClick={() => this._toggleCatePop(false)}>取消</div>
                                    <div className={styles.btn_save} onClick={() => this._saveCate()}>保存</div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        <Modal
                            title="确认弹窗"
                            visible={isShowConfirmModal}
                            onOk={() => this.handleOk()}
                            onCancel={() => this.handleCancel()}
                        >
                            确认要删除 [{currentDeleteCate.name}] 吗？
                        </Modal>
                    }
                </div>
        )
    }
}

export default CateManage
