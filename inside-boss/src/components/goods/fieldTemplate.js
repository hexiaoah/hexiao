import React, {Component} from 'react'
import { Modal, Checkbox, Row, Col, Button, Icon, Popover } from 'antd'
import * as action from '../../action'
import cx from 'classnames'
import style from './style.css'
const CheckGroup = Checkbox.Group
const ButtonGroup = Button.Group

const VariableBtn = (props)=>{
    let { num = 1, maxNum = Infinity , minNum = -Infinity, handleComputed, disabled, size='small' } = props
    disabled = false
	return(
		<ButtonGroup>
			<Button className={style.defaultStyle} onClick = {handleComputed.bind(null,-1)} disabled = { disabled || num <= minNum } size={size}><Icon type="minus" /></Button>
			<Button className={style.defaultStyle} disabled= {disabled} size={size} >{num}</Button>
			<Button className={style.defaultStyle} onClick = {handleComputed.bind(null,1)} disabled = { disabled || num >= maxNum } size={size}><Icon type="plus" /></Button>
		</ButtonGroup>
	)
}

class view extends Component {
    componentWillMount(){
        // this.props.dispatch(action.getTableFieldsList(testDate))
    }
    onChange({id,toggleList},list){
        toggleList.map(i=>{
            // if(!list.includes(i.parentKey)){
            if( list.indexOf(i.parentKey) == '-1' ){
                const index = list.indexOf(i.childKey)
                if(index > -1) list.splice(index,1)
            }
        })
        this.props.dispatch(action.setTableOptionKey(id,list))
    }
    allSelect(id,data,e){
        let list = []
        if(e.target.checked){
            list = [].concat(data.allList)
        }else{
            list = [].concat(data.defaultList)
        }
        this.props.dispatch(action.setTableOptionKey(id,list))

    }
    handleComputed=(item,value)=>{
        // this.setState(()=>({variable:{...this.state.variable,[item.name]:this.state.variable[item.name] + value}}))
        // console.log(item,value)
    }
    render(){
        const { data, visible = false, handleOk, handleCancel, children } = this.props
        const tableOptions = data.tableFieldsOptions
        return(
            <div>
                <Modal
                    wrapClassName = {style.templateSelectWarp}
                    width={780}
                    title='表格字段设置'
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={children}
                >
                    <div>
                        {
                            data.tableFieldsList && data.tableFieldsList.map(item=>{
                                return(
                                    <div className={style.boxItem} key={item.groupName}>
                                        <div className={style.itemTitle}>
                                            <Checkbox 
                                                onChange={this.allSelect.bind(this,item.groupName,tableOptions[item.groupName])} 
                                                checked={ tableOptions[item.groupName]['selectedList'].length === tableOptions[item.groupName]['allList'].length }
                                                >
                                            </Checkbox>
                                            <span style={{fontSize:'16px',color:'#333'}}>{item.groupCaption}</span>
                                        </div>
                                        <CheckGroup 
                                            value={tableOptions[item.groupName]['selectedList']} 
                                            onChange={this.onChange.bind(this,{id:item.groupName,toggleList:tableOptions[item.groupName].toggleList})} 
                                        >
                                            <Row>
                                            {
                                                item.fields.map(i=>(
                                                    <Col className={i.relType == 22 || i.visibleHide ? style.itemHide : ''} key={i.gridFieldId} span={ 24 / item.layout }>
                                                        {
                                                            i.gridFieldDisplayName == '双语名称' && i.isDisabled ?
                                                            <Popover trigger="hover" content = '请前往掌柜APP--点餐流程设置模块中启用该功能'>
                                                                <Checkbox 
                                                                    className={style.itemColor} 
                                                                    disabled={i.isDisabled || (i.parentFieldId && i.parentFieldId != '0' && !tableOptions[item.groupName]['selectedList'].some(h=>h===i.parentFieldId)) }
                                                                    value={i.gridFieldId}>
                                                                    {i.gridFieldDisplayName}
                                                                </Checkbox>
                                                            </Popover>
                                                            :
                                                            <Checkbox 
                                                            className={style.itemColor} 
                                                            disabled={i.isDisabled || (i.parentFieldId && i.parentFieldId != '0' && !tableOptions[item.groupName]['selectedList'].some(h=>h===i.parentFieldId)) }
                                                            value={i.gridFieldId}>
                                                            {i.gridFieldDisplayName}
                                                            {i.promptMes ? <span style={{color: '#d52632',margin:'0 2px'}}>({i.promptMes})</span> :'' }
                                                            </Checkbox>
                                                        }
                                                        {
                                                            // i.variable && 暂未上线，敬请期待！
                                                            (i.gridFieldDisplayName == '规格' || i.gridFieldDisplayName == '做法') && !i.custom &&
                                                            <Popover trigger="hover" content = '暂未上线，敬请期待！'>
                                                                <div style={{display:'inline-block'}}>
                                                                    <VariableBtn
                                                                    disabled={i.isDisabled || !tableOptions[item.groupName]['selectedList'].some(h=>h===i.gridFieldId) } 
                                                                    handleComputed={this.handleComputed.bind(null,i)}>
                                                                    </VariableBtn>
                                                                </div>
                                                            </Popover>
                                                        }
                                                    </Col>
                                                    ))
                                                }
                                            </Row>
                                            <div>
                                                <Row>
                                                    {
                                                    item.children && item.children.map(i=>(
                                                        <Col span={ 24 / i.layout} key={i.groupName}>
                                                            <span>{i.groupCaption}：</span>
                                                            <Row>
                                                            {
                                                            i.fields.map(v=>(
                                                                <Col className={v.relType == 22 || v.visibleHide ? style.itemHide : ''} key={v.gridFieldId} span={ 24 / i.fields.length}>
                                                                <Checkbox className={cx(style.itemColor)} disabled={v.isDisabled} value={v.gridFieldId} key={v.gridFieldId}>
                                                                {v.gridFieldDisplayName}
                                                                {v.promptMes ? <span style={{color: '#d52632',margin:'0 2px'}}>({v.promptMes})</span> :'' }
                                                                </Checkbox>
                                                                </Col>
                                                                ))
                                                            }
                                                            </Row>
                                                        </Col>
                                                    ))
                                                    }
                                                </Row>
                                            </div>
                                        </CheckGroup>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Modal>
            </div>
        )
    }
}


export default view