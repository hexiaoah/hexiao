
import React, { Component } from 'react'
import styles from './index.css'
import { Pagination, Button, Input, message, Modal, Tooltip } from 'antd';
import Dialog from './dialog'
import { bridgeItem } from '../../format/mall';

const ModalConfirm = Modal.confirm;

function filterModule(module) {
    let data = {
        addButton: '新增banner',
        file: 'banner',
    }
    if (module === 'activity') {
        data = {
            addButton: '新增活动',
            file: 'activity'
        }
    }

    return data
}

function checkForm(form = {}) {
    return form.title ? form.url ? form.img ? '' : '图片' : '链接' : '标题'
}

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            size: 20,

            // 0:正常模式 1:排序模式
            mode: 0,

            // 弹窗状态是否开启
            dialogStatus: 0,
            dialogForm: {},

            // 临时保存列表
            peList: [],
            peVos: {},

            visible: false
        }
    }

    componentWillMount() {
        const page = this.state.page
        this.initList(page)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.contentList && nextProps.contentList.length) {
            this.setState({
                peList: JSON.parse(JSON.stringify(nextProps.contentList)) || [],
                peVos: {},
            })
        }
    }

    // 获取列表
    initList(page) {
        const size = this.state.size
        this.props.initList({ page, size })
    }

    // 切换序号模式 普通 or 排序
    updateSort() {
        const mode = this.state.mode
        this.setState({
            mode: mode === 1 ? 0 : 1
        })
    }
    updateIndex(index, e) {
        const { peList, peVos } = this.state
        if (peList[index]) {
            peVos[index] = true
            peList[index].index = e.target.value
            this.setState({
                peVos,
                peList,
            })
        }
    }
    // 保存序号变动
    changeIndex() {
        const _this = this
        const { peVos, peList } = this.state
        const editList = Object.keys(peVos).map((e) => {
            if (peList[e]) {
                return bridgeItem(peList[e])
            }
        })

        this.props.editBannerIndex({
            data: { editList },
            success: () => {
                message.success('修改序号成功')
                _this.setState({
                    peVos: {},
                })
            },
            failure: () => { 
                message.error('修改序号失败') 
                // 序列数据还原
                const contentList = _this.props.contentList
                _this.setState({
                    peList: JSON.parse(JSON.stringify(contentList)) || [],
                    peVos: {},
                })
            }
        })
        this.updateSort()
    }

    // 切换内容变更弹窗
    updateDialog(form) {
        const dialogStatus = this.state.dialogStatus
        const data = {
            dialogStatus: !dialogStatus,
        }
        if (form) {
            data.dialogForm = form
        } else {
            data.dialogForm = {}
        }

        this.setState(data)
    }
    // 保存内容变更
    changeContent({ form, type = 1, callback }) {
        const _this = this
        const tip = checkForm(form)

        if (!tip) {
            this.props.editItem({
                data: {
                    form: bridgeItem(form),
                    type,
                },
                success: () => {
                    message.success('保存成功')
                    const page = _this.state.page
                    this.initList(page)
                    callback && callback()                    
                },
                failure: (err) => {
                    if (err && !err.code && err.errorCode === '1002') {
                        message.warning(err.message)
                    } else {
                        message.error('保存失败')
                    }                
                }
            })
            this.updateDialog()
        } else {
            message.warning(`${tip}不允许为空`)
        }
    }

    changeItem({ data, success, failure }) {
        this.props.editItem({ data, success, failure })
    }
    // 编辑
    editItem(data = {}) {
        this.updateDialog(data)
    }
    // 切换 上架下架
    switchItem(data = {}) {
        const _this = this
        this.changeItem({
            data: {
                form: bridgeItem(data),
                type: data.isSelected ? 4 : 3,
            },
            success: () => {
                const page = _this.state.page
                _this.initList(page)
            },
            failure: (err) => {
                if (err && !err.code && err.errorCode === '1002') {
                    message.warning(err.message)
                }
            }
        })
    }
    // 删除
    deleteItem(data = {}) {
        const _this = this
        this.changeItem({
            data: {
                form: bridgeItem(data),
                type: 5,
            },
            success: () => {
                const page = _this.state.page
                _this.initList(page)
            },
        })
    }
    // 置顶/取消置顶
    stickItem(data = {}) {
        const _this = this
        
        if (data.isSelected) {
            this.changeItem({
                data: {
                    form: bridgeItem(data),
                    type: data.isTop ? 7 : 6,
                },
                success: () => {
                    const page = _this.state.page
                    _this.initList(page)
                },
                failure: (err) => {
                    if (err && !err.code && err.errorCode === '1002') {
                        message.warning(err.message)
                    }
                }
            })   
        } else {
            message.warning('请先上架再进行置顶与取消操作')
        }
    }

    showDialog(e) {
        const _this = this
        ModalConfirm({
            title: '删除',
            content: '确定删除该条记录',
            centered: true,
            onOk() {
                return new Promise((resolve, reject) => {
                    _this.deleteItem(e)
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        })
    }    

    render() {
        const { mode, size, dialogStatus, dialogForm, peList } = this.state
        const { module, contentList = [] } = this.props

        const header = filterModule(module)
        const totalNum = contentList.length ? contentList[0].totalNum : 0        

        return (
            <div className={ styles.mainWrapper }>                
                <Dialog { ...{
                    file: header.file,
                    status: dialogStatus,
                    form: dialogForm,
                }}
                    updateDialog={ this.updateDialog.bind(this) }
                    changeContent={ this.changeContent.bind(this) }
                />
                <div className={ styles.mwTop }>
                    {
                        module === 'banner' && contentList.length ? mode === 1 ? (
                            <Button className={ styles.mwBtn } type='primary' onClick={ this.changeIndex.bind(this) }>保存</Button>
                        ) : (
                            <Button className={ styles.mwBtn } type='primary' onClick={ this.updateSort.bind(this) }>调整排序</Button>
                        ) : null
                    }

                    <Button className={ styles.mwBtn } type='primary' onClick={ this.updateDialog.bind(this) }>{ header.addButton }</Button>
                </div>
                <div className={ styles.mwPan }>
                    <div className={ styles.mwTit }>
                        <ul>
                            <li>顺序</li><li>头图</li><li>标题</li><li>链接</li><li>操作</li><li>状态</li>
                        </ul>
                    </div>
                    <div className={ styles.mwTxt }>
                        {
                            peList.map((e, i) => (
                                <ul key={e.id}>
                                    <li>
                                        {
                                            module === 'banner' ? mode === 1 ? (
                                                <Input className={ styles.mwIndex } value={ e.index } onChange={ this.updateIndex.bind(this, i) } />
                                            ) : e.index : e.udInde
                                        }
                                    </li>
                                    <li className={ styles.mwImg }><div className={ styles.img } style={{ backgroundImage: 'url(' + e.img + ')', backgroundSize: 'cover', backgroundPosition: 'center' }}></div></li>
                                    <li className={ styles.mwTxtEll }>
                                        <Tooltip placement="topLeft" title={ e.title }>
                                            { e.title }
                                        </Tooltip>
                                    </li>
                                    <li className={ styles.mwTxtEll }>
                                        <Tooltip placement="topLeft" title={ e.url }>
                                            { e.url }
                                        </Tooltip>
                                    </li>
                                    <li className={ styles.mwOpe }>
                                        <div className={ styles.mwOpeList }>
                                            <div className={ styles.mwOpeItem } onClick={ this.editItem.bind(this, e) }>编辑</div>
                                            <div className={ styles.mwOpeItem } onClick={ this.switchItem.bind(this, e) }>
                                                {
                                                    e.isSelected ? '下架' : '上架'
                                                }
                                            </div>
                                            <div className={ styles.mwOpeItem } onClick={ this.showDialog.bind(this, e) }>删除</div>
                                            {
                                                module === 'activity' ? (
                                                    <div className={ styles.mwOpeItem } onClick={ this.stickItem.bind(this, e) }>                                                        
                                                        <span className={ !e.isSelected ? styles.forbidden : '' }>{
                                                            e.isTop ? '取消置顶' : '置顶 '
                                                        }</span>
                                                    </div>
                                                ) : null
                                            }                                            
                                        </div>
                                    </li>
                                    <li>{ e.isSelected ? '有效' : '无效' }</li>
                                </ul>
                            ))
                        }
                    </div>

                    <div className={ styles.mwPagination }>
                        <Pagination defaultCurrent={1} pageSize={ size } showTotal={() => `共 ${ totalNum } 条，每页 ${size} 条`} total={ totalNum || 1 } onChange={ this.initList.bind(this) } />
                    </div>                    
                </div>
            </div>
        )
    }
}

export default Main





