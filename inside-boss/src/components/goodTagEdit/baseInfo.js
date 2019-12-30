import React, { Component } from 'react'
import { Input, Form } from 'antd'
const FormItem = Form.Item
import styles from './baseInfo.css'
const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 14 }
}
class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            moduleNameValue: '', //模板名称
            moduleNameErrorTip: '' //模板名称错误提示
        }
    }
    // 模板名称编辑value
    handleNameInputChange(e) {
        this.setState({
            moduleNameValue: e.target.value
        })
    }
    moduleSize = {
        1: '80mm*40mm',
        2: '75mm*30mm',
        3: '60mm*40mm',
        4: '40mm*30mm',
        5: '25mm*15mm'
    }

    render() {
        const { getFieldDecorator,moduleDetail={},templateNameError} = this.props
        const { templateName } = moduleDetail
        return (
            <div className={styles.baseSettings}>
                <div className={styles.goodEditTitle}>基本设置</div>
                <FormItem label="模板名称" {...formItemLayout} colon={false}>
                    {getFieldDecorator('moduleName', {
                        initialValue: templateName
                    })(
                        <Input
                            style={{ width: 200, marginLeft: 8 }}
                            maxLength="20"
                            placeholder="请输入模板名称"
                        />
                    )}
                </FormItem>
                {templateNameError && (
                    <FormItem label=" "colon={false}{...formItemLayout}style={{marginTop: -5,color: '#D83F3F',marginLeft: 8}}>
                        {templateNameError}
                    </FormItem>
                )}
                <FormItem label="模板尺寸" {...formItemLayout} style={{ marginTop: -10 }} colon={false}>
                    <span className={styles.moduleSize}>{this.moduleSize[moduleDetail.templateType]}</span>
                </FormItem>
            </div>
        )
    }
}

export default Form.create()(Main)
