// 商品属性 管理 模块
import React, { Component } from 'react'
import styles from "./goodsProperty.css";
import * as action from "../../action";
import { Button, Modal } from "antd";


class GoodsProperty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowAddSpecPop: false, // 是否显示添加规格弹窗
            isShowAddUnitPop: false, // 是否显示添加单位弹窗
            specName: '', // 新增的规格名称
            specModifyFlag: false, // 规格名称是否只读
            specId: '', // 新增的规格Id
            unitName: '', // 新增的规格名称
            isShowConfirmModal: false, // 是否显示确认弹框
            propertyTabs:  [{
                name: '规格管理',
                active: true,
            }, {
                name: '单位管理',
                active: false,
            }],
            addSpecList: [{
                key: '规格值1',
                value: '',
            }],
            currentDeleteUnit: {}, // 当前删除的单位
        }
    }
    
    componentWillMount() {
        const { data, dispatch } = this.props
        const { industry } = data
        dispatch(action.getSpecList(industry))
        dispatch(action.getUnitList(industry))
    }
    
    /**
     * 切换商品属性的tab项
     * @param item
     * @private
     */
    _switchTab(data) {
        const { propertyTabs } = this.state
        
        propertyTabs.map(function(item){
            item.active = false
            if(item.name === data.name) {
                item.active = true
            }
        })
        this.setState({
            propertyTabs
        })
    }
    
    /**
     * 切换规格分类的展开状态
     * @param item
     * @private
     */
    _toggleFoldSpec(params) {
        const { data } = this.props
        const { specList=[] } = data
        const { id, isFold } = params
        
        specList.map(function(item) {
            if(item.id === id) {
                item.isFold = !isFold
            }
        })
        this.setState({
            specList
        })
    }
    
    /**
     * 显示添加规格值
     * @private
     */
    _isShowAddSpecPop(flag, item={}) {
        if(!flag) { // 隐藏
            this.setState({
                specName: '',
                specModifyFlag: false,
                addSpecList: [{key: '规格值1', value: ''}]
            })
        } else {
            const { name='', id } = item
            if(Object.keys(item).length === 0) { // 新增规格值
                console.log('新增规格值')
            } else { // 新增规格项
                this.setState({
                    specName: name,
                    specId: id,
                    specModifyFlag: true,
                })
    
            }
        }
        
        this.setState({
            isShowAddSpecPop: flag
        })
    }
    
    /**
     * 编辑规格名称
     * @param name
     * @private
     */
    _handleSpecName(event) {
        this.setState({specName: event.target.value})
    }
    
    /**
     * 编辑规格项
     * @private
     */
    _handleSpecItem(i, event) {
        
        const { addSpecList } = this.state
        addSpecList[i].value = event.target.value
        this.setState({
            addSpecList,
        })
    }
    
    /**
     * 添加规格项
     * @private
     */
    _addSpecItem() {
        const { addSpecList } = this.state
        if(addSpecList.length>0) {
        
        }
        addSpecList.push({
            key: `规格值${addSpecList.length+1}`,
            value: '',
        })
        this.setState({
            addSpecList,
        })
    }
    
    /**
     * 保存规格
     * @private
     */
    _saveSpec() {
        const { dispatch, data } = this.props
        const { industry } = data
        const { specName='', addSpecList, specId } = this.state
    
        if(specName.toString().trim().length === 0) {
            dispatch(action.errorHandler({message: '规格名称不能为空!'}))
            return
        }
    
        const list = addSpecList.map(item => {
            return item.value
        })
    
        for(let i=0; i<addSpecList.length; i++) {
            const index = list.indexOf(addSpecList[i].value)
            if(i === index) continue
            if(index > -1 && addSpecList[i].value !== '') {
                dispatch(action.errorHandler({message: `规格值${index+1} 和 规格值${i+1} 存在重复, 添加失败!`}))
                return
            }
    
        }
        
        list.forEach( (item, i) => {
            // 删除数组中的空项
            if(item.trim() === '') {
                list.splice(i, 1)
            }
        })
        
        
        const args = { industry, specName, specId, addSpecList: list }
        dispatch(action.saveSpecName(args))
        this._isShowAddSpecPop(false)
    }
    
    /**
     * 切换 规格值 启用或者 禁用状态
     * @param item
     * @param mode name-切换名称 item-切换属性值
     * @private
     */
    _switchSpec(item, mode) {
        const { id, enable } = item
        const { dispatch, data } = this.props
        const { industry, specList } = data
        const args = { industry, id, flag: enable ? 0 : 1, specList }
        if(mode === 'item') {
            dispatch(action.switchSpecItemStatus(args))
        } else if(mode === 'name') {
            dispatch(action.switchSpecNameStatus(args))
        }
    }
    
    /**
     * 删除单位
     * @param item
     * @private
     */
    _deleteUnit(item) {
        if(item.unitType === 0) return
        
        this.setState({
            isShowConfirmModal: true,
            currentDeleteUnit: item,
        })
    }
    
    /**
     * 点击确认按钮
     * @private
     */
    _handleOk() {
        const { id } = this.state.currentDeleteUnit
        const { dispatch, data } = this.props
        const { industry } = data
        const args = {
            id,
            industry
        }
        dispatch(action.deleteUnit(args))
        this._handleCancel()
    }
    
    /**
     * 点击取消按钮
     * @private
     */
    _handleCancel() {
        this.setState({
            isShowConfirmModal: false,
            currentDeleteUnit: {},
        })
    }
    
    /**
     * 保存新的单位
     * @private
     */
    _saveUnit() {
        const { dispatch, data } = this.props
        const { unitName='' } = this.state
        
        if(unitName.toString().trim().length === 0) {
            dispatch(action.errorHandler({message: '单位名称不能为空!'}))
            return
        }
        
        const { industry } = data
        const args = {
            industry,
            unitName,
        }
        dispatch(action.addUnit(args))
        this._isShowAddUnitPop(false)
    }
    
    /**
     * 显示单位弹窗
     * @param flag
     * @private
     */
    _isShowAddUnitPop(flag) {
        this.setState({
            isShowAddUnitPop: flag,
        })
        if(!flag) {
            this.setState({
                unitName: '',
            })
        }
    }
    
    /**
     * 更新单位名称
     * @param e
     * @private
     */
    _handleUnitName(e) {
        this.setState({
            unitName: e.target.value,
        })
    }
    
    
    render() {
        const { propertyTabs, isShowAddSpecPop, addSpecList, specName, unitName, isShowAddUnitPop, specModifyFlag, isShowConfirmModal, currentDeleteUnit } = this.state
        const { data } = this.props
        const { unitList=[], specList=[] } = data
        
        return (
            <div className={styles.property_manage_body}>
    
                <div className={styles.property_tabs}>
                    {
                        propertyTabs.map((item, i) => {
                            return (
                                <span key={i}
                                      onClick={() => this._switchTab(item)}
                                      className={item.active ? styles.active : ''}
                                >
                                    {item.name}
                                </span>
                            )
                        })
                    }
                </div>
                {
                    propertyTabs[0].active &&
                    <div className={styles.spec_manage_box}>
    
                        <Button type="primary"
                                className={styles.add_spec_absolute}
                                onClick={() => this._isShowAddSpecPop(true)}>
                            添加规格
                        </Button>
                        <div className={styles.spec_body_title}>
                            <span>规格名称</span>
                            <span>操作</span>
                        </div>
                        <ul className={styles.spec_list_box}>
                            {
                                specList.map( (item, i) => {
                                    return (
                                        <li className={styles.spec_list}  key={i*2}>
                                            <div className={styles.spec_title}>
                                                <div className={styles.table_title_name} onClick={()=> this._toggleFoldSpec(item)}>
                                                    <span className={item.isFold ? styles.fold : styles.unfold}></span>
                                                    <span>{item.name}</span>
                                                </div>
                                                <div className={styles.spec_opt}>
                                                    <span className={styles.spec_add} onClick={() => {this._isShowAddSpecPop(true, item)}}>添加规格值</span>
                                                    <span className={styles.spec_add} onClick={() => {this._switchSpec(item, 'name')}}>{item.enable ? '停用' : '启用'}</span>
                                                </div>
                                            </div>
                                            {
                                                item.isFold &&
                                                <ul className={styles.spec_group}>
                                                    {
                                                        item.list && item.list.map((data, j) => {
                                                            return (
                                                                <li className={styles.spec_item} key={j*3}>
                                                                    <div className={styles.spec_name}>{data.name}</div>
                                                                    <div className={styles.spec_item_opt} onClick={() => this._switchSpec(data, 'item')}>{data.enable ? '停用' : '启用'}</div>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                }
                {
                    propertyTabs[1].active &&
                    <div className={styles.unit_manage_box}>
                        <Button type="primary"
                                className={styles.add_unit_absolute}
                                onClick={() => this._isShowAddUnitPop(true)}>
                            添加单位
                        </Button>
                        <div className={styles.unit_body_title}>
                            <span>单位名称</span>
                            <span>操作</span>
                        </div>
                        <ul className={styles.unit_list_box}>
                            {
                                unitList.map((item) => {
                                    return (
                                        <li className={styles.unit_item} key={item.id}>
                                            <div className={styles.unit_name}>
                                                {item.name} {item.unitType===0 && <i>(系统默认)</i>} { item.chain && <i className={styles.chain_bg}>连锁</i> }
                                            </div>
                                            <div className={item.unitType === 0 ? styles.unit_group_disable : styles.unit_group} onClick={()=>this._deleteUnit(item)}>删除</div>
                                        </li>
                                    )
                                } )
                            }
                        </ul>
                    </div>
                }
    
                {
                    isShowAddSpecPop &&
                    <div className={styles.add_spec_container}>
                        <div className={styles.box_bg} onClick={() => this._isShowAddSpecPop(false)}></div>
                        <div className={styles.add_spec_box}>
                            <div className={styles.add_title}>添加规格</div>
                            <div className={styles.spec_list}>
                                <div className={styles.add_spec_name}>
                                    <span>*规格名称</span>
                                    <input type="text" maxLength="10" value={specName} readOnly={specModifyFlag} onChange={this._handleSpecName.bind(this)}/>
                                </div>
                                {
                                    addSpecList.map( (item, i) => {
                                        return (
                                            <div className={styles.add_spec_value} key={i}>
                                                <span>{item.key}</span>
                                                <input type="text"  maxLength="8" value={item.value} onChange={this._handleSpecItem.bind(this, i)}/>
                                            </div>
                                        )
                                    })
                                }
                                
                            </div>
                            {
                                addSpecList.length <=14 &&
                                <div className={styles.add_spec_btn} onClick={() => this._addSpecItem()}>
                                    <span className={styles.icon_add}></span>
                                    <span className={styles.text}>添加规格值</span>
                                </div>
                                
                            }
                            <div className={styles.add_spec_bottom}>
                                <div className={styles.btn_cancel} onClick={() => this._isShowAddSpecPop(false)}>取消</div>
                                <div className={styles.btn_save} onClick={() => this._saveSpec()}>保存</div>
                            </div>
                        </div>
                    </div>
                }
                {
                    isShowAddUnitPop &&
                    <div className={styles.add_spec_container}>
                        <div className={styles.box_bg} onClick={() => this._isShowAddUnitPop(false)}></div>
                        <div className={styles.add_spec_box}>
                            <div className={styles.add_title}>添加单位</div>
                            <div className={styles.add_spec_name}>
                                <span>单位名称</span>
                                <input type="text" value={unitName} onChange={this._handleUnitName.bind(this)}/>
                            </div>
                        
                            <div className={styles.add_spec_bottom}>
                                <div className={styles.btn_cancel} onClick={() => this._isShowAddUnitPop(false)}>取消</div>
                                <div className={styles.btn_save} onClick={() => this._saveUnit()}>保存</div>
                            </div>
                        </div>
                    </div>
                }
                {
                    <Modal
                        title="确认弹窗"
                        visible={isShowConfirmModal}
                        onOk={() => this._handleOk()}
                        onCancel={() => this._handleCancel()}
                    >
                        确认要删除 [{currentDeleteUnit.name}] 吗？
                    </Modal>
                }
                
            </div>
        )
    }
}

export default GoodsProperty
