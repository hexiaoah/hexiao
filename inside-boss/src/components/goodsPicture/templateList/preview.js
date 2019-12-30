import React, {Component} from 'react'
import styles from '../style.css'
import {Modal} from 'antd'

class Preview extends Component{
    constructor(props){
        super(props),
        this.state={
            visible:true,
            destory:true
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            destory: newProps.destory
        })
    }
    // 关闭
    handleCancel = () => {
        this.setState({
            destory: true,
        },()=>{
            this.props.closePreview();
        })
    }

    render(){
        let {logo}=this.props;
        return(
            <div>
                {
                    !this.state.destory&&
                    <Modal
                        title={null}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        width={375}
                        footer={null}
                        >
                        <div className={styles.previewLogoBox}>
                            <img src={logo} className={styles.previewLogo}/>
                        </div>
                    </Modal>
                }
            </div>

    )
    }
}

export default Preview


