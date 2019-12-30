import React, {Component} from 'react'
import { Modal, Checkbox, Row, Col, Button, Icon } from 'antd'
import * as action from '../../action'
import cx from 'classnames'
import style from './style.css'
const CheckGroup = Checkbox.Group
const ButtonGroup = Button.Group;


const VariableBtn = (props)=>{
	const { num = 1, maxNum = Infinity , minNum = -Infinity, handleComputed, disabled, size='small' } = props
	return(
		<ButtonGroup>
			<Button onClick = {handleComputed.bind(null,-1)} disabled = { disabled || num <= minNum } size={size}><Icon type="minus" /></Button>
			<Button disabled= {disabled} size={size} >{num}</Button>
			<Button onClick = {handleComputed.bind(null,1)} disabled = { disabled || num >= maxNum } size={size}><Icon type="plus" /></Button>
		</ButtonGroup>
	)
}

const CreateForm = (props) => {
      const { visible, onCancel, handleChange, handleCheckAll, data, title, footer, handleComputed, state } = props;
      return (
        <Modal
          wrapClassName = {style.templateSelectWarp}
          width={780}
          visible={visible}
          title={title}
          footer={null}
          onCancel={onCancel}
        >
          <div>
            {
              data.fromFieldsList && data.fromFieldsList.map(item=>(
                <div className={style.boxItem} key={item.baseName}>
                  <div className={style.itemTitle}>
                    <Checkbox checked={item.allChecked} onChange={handleCheckAll.bind(null,item.baseName)}></Checkbox>
                    <span style={{fontSize:'16px',color:'#333'}}>{item.baseName}</span>
                  </div>
                  <CheckGroup onChange={handleChange.bind(null,item.baseName)} value={item.selected} >
                  <Row>
                    {
                      item.baseList.map(i=>(
                          <Col key={i.name} span={item.span}>
                            <Checkbox className={style.itemColor} disabled={i.disabled && !item.selected.includes(i.toggle) } value={i.name}>{i.name}</Checkbox>
                          </Col>
                      ))
                    }
				          </Row>
				          <div>
                    <Row>
                    {
                      item.variable && item.variable.map(i=>(
                        <Col span={i.span} key={i.name}>
                          <Checkbox className={style.itemColor} disabled={i.disabled} value={i.name}>{i.name}</Checkbox>
                          <VariableBtn 
                            num={state.variable[i.name]} 
                            maxNum = {i.maxNum} 
                            minNum ={i.minNum } 
                            handleComputed = { handleComputed.bind(null,i) } 
                            disabled={ i.disabled || !item.selected.includes(i.name) } >
                          </VariableBtn>
                        </Col>
                      ))
                    }
                  </Row>
				        </div>
                <div>
                  <Row>
                    {
                      item.categroy.map(i=>(
                        <Col span={i.span} key={i.name}>
                            <span>{i.name}：</span>
                            <Row>
                            {
                              i.list.map(v=>(
                                <Col key={v.name} span={v.span}>
                                <Checkbox className={cx(style.categroy,style.itemColor)} disabled={v.disabled} value={v.name} key={v.name}>{v.name}</Checkbox>
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
                ))
            }
          </div>
          <div className={style.itemFooter}>
            {footer}
          </div>
        </Modal>
      );
    }

class view extends Component{

      constructor(){
        super()
        this.state={
          variable:{}
        }
      }

      handleComputed=(item,value)=>{
        this.setState(()=>({variable:{...this.state.variable,[item.name]:this.state.variable[item.name] + value}}))
      }

      handleChange=(baseName,value)=>{

      }
      handleCheckAll=(baseName,e)=>{
        
      }
      componentWillReceiveProps(nextProps){
        if(this.props.data.fromFieldsList !== nextProps.data.fromFieldsList){
          let obj = {}
          nextProps.data.fromFieldsList.map(item=>{
              if(item.variable && item.variable.length > 0 ){
                item.variable.map(i=>{
                  if(item.selected.includes(i.name)){
                    obj[i.name] = this.state.variable[i.name]?this.state.variable[i.name]:i.value
                  }else{
                    obj[i.name] = i.value
                  }
                })
              }
          })
          this.setState(()=>({variable:{...obj,}}))
        }
      }

      render() {
        const { data = [], title = '表头字段设置', children, visible, handleHide } = this.props
        return (
            <CreateForm
              data={data}
              state={this.state}
              title={title}
              footer={children}
              handleComputed={this.handleComputed}
              handleChange={this.handleChange}
              handleCheckAll={this.handleCheckAll}
              visible={visible}
              onCancel = {handleHide}
            />
        );
      }
}

export default view