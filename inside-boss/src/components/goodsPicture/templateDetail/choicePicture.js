import React, {Component} from 'react'
import styles from '../style.css'
import {Modal,Button,message} from 'antd'
import FileUpload from 'react-fileupload'
import classnames from 'classnames'
import imgUrl from '../images/add.png'
import * as bridge from '../../../utils/bridge'

class ChoicePicture extends Component{
    constructor(props) {
        super(props)
        this.state = {
            flag: props.flag,
            pictureDetailList: props.data.pictureDetailList,
            pictureHeaderList: props.data.pictureHeaderList,
            choicePicture:"",//选中的图片
            uploadPicture:imgUrl,//本地上传的图片
            uploadShow:false,
            loading:false
        }
    }

    componentWillReceiveProps(newProps) {
        let detail = newProps.data.pictureDetailList;
        let header = newProps.data.pictureHeaderList;
        detail.map(item=>{
            item.show=false;
        })
        header.map(item => {
            item.show = false;
        })
        this.setState({
            flag: newProps.flag,
            pictureDetailList: detail,
            pictureHeaderList: header,
        })
    }
    // 取消
    handleCancel = () => {
        this.setState({
            flag: false,
            choicePicture:"",
            uploadPicture:imgUrl,
            uploadShow:false,
        },()=>{
            this.props.closePopup();
        })
    }
    // 保存
    handleOk =()=>{
        if(this.state.choicePicture==""){
            message.info("请选中一张图片，再保存~");
            return;
        }
        this.props.closePopup(this.state.choicePicture);
        this.setState({
            flag: false,
            choicePicture:"",
            uploadPicture: imgUrl,
            uploadShow: false,
        })
    }
    // 选中图片
    choicePicture =(index,url,target,other)=>{
        let temp=JSON.parse(JSON.stringify(this.state[target]));
        let temp2=this.handleData(other);
        temp.map((item,i)=>{
            if(i==index) item.show=true;
            else  item.show=false;
        })
        this.setState({
            [target]:temp,
            [other]:temp2,
            uploadShow: false,
            choicePicture:url
        })
    }

    handleData = (target) => {
        let temp = JSON.parse(JSON.stringify(this.state[target]));
        temp.map((item) => {
            item.show=false;
        })
        return temp;
    }

   option() {
        const t = this

        const {dispatch, data} = t.props

        const {uploadUrl} = data
        const importData = {...this.props.data.importData}

        const query = bridge.getInfoAsQuery()

        const {token} = query
        return {
            baseUrl: uploadUrl ? uploadUrl : '',
            param: importData,
            fileFieldName: 'file',
            dataType: 'json',
            wrapperDisplay: 'inline-block',
            multiple: false,
            numberLimit: 1,
            accept: 'image/jpg,image/png,image/jpeg,image/gif,image/bmp',
            timeout: 0,
            chooseAndUpload: true,
            withCredentials: false,
            requestHeaders: {
                'X-Token': token
            },
            chooseFile: function (files) {
            },
            beforeUpload: function (files, mill) {
                if(files.length>0){

                    if (files.size > 1024 * 1024 * 5){
                        message.warning("图片太大了，请控制在5M之内")
                        return false
                    }
                }
            },
            doUpload: function (files, mill) {
            },
            uploading: function (progress) {
                const p = progress.loaded * 100 / progress.total
                t.setState({
                    loading:true,
                    uploadShow:false,
                })
            },
            uploadSuccess: function (resp) {
                let code = resp.code;
                if (code === 1) {
                      let url = "https://assets.2dfire.com/" + resp.data.data;
                      let temp1 = t.handleData("pictureHeaderList");
                      let temp2 = t.handleData("pictureDetailList");
                      t.setState({
                          loading:false,
                          pictureHeaderList:temp1,
                          pictureDetailList:temp2,
                          uploadShow:true,
                          choicePicture:url,
                          uploadPicture: url
                      })
                }

            },

            uploadError: function (err) {
                if (err.errorCode === '401') {
                    bridge.callParent('logout')
                    return
                }
                message.error(err.message);
            },

            uploadFail: function (resp) {
                message.error("上传失败");
            },
        }
    }


    render(){
        let pictureHeaderList = this.state.pictureHeaderList;
        let pictureDetailList = this.state.pictureDetailList;
        return(
            <div>
                <Modal
                    title="选择图片"
                    visible={this.state.flag}
                    onCancel={()=>this.handleCancel()}
                    onOk={()=>this.handleOk()}
                    okText="保存"
                    width={720}
                    closable={false}
                    >
                    <div className={styles.choicePictureBox}>
                        <div className={styles.choiceHeadPictureBox}>
                            <p className={styles.choiceTitle}>选择一张商品主图</p>
                            <ul className={styles.choicePictureList}>
                                {
                                    pictureHeaderList&&
                                    pictureHeaderList.map((item,index)=>{
                                        return (
                                            <li key = {index} className = {classnames({[styles.active]: item.show})}   onClick = {() => this.choicePicture(index, item.imagePath, "pictureHeaderList", "pictureDetailList") } >
                                                <img src={item.imagePath}/>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className={styles.choiceHeadPictureBox}>
                            <p className={styles.choiceTitle}>或选择一张商品详情图</p>
                            <ul className={styles.choicePictureList}>
                                {
                                    pictureDetailList &&
                                    pictureDetailList.map((item, index) => {
                                        return (
                                            <li key={index} className={classnames({[styles.active]:item.show})} onClick={()=>this.choicePicture(index,item.imagePath,"pictureDetailList","pictureHeaderList")}>
                                                <img src={item.imagePath}/>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className={styles.choiceHeadPictureBox}>
                            <p className={styles.choiceTitle}>或进行本地上传</p>
                            <FileUpload options={this.option()}>
                                <Button loading={this.state.loading} className = {
                                    classnames([styles.uploadPictureBox], {
                                        [styles.active]:this.state.uploadShow
                                    })
                                }
                                ref = "chooseAndUpload" >
                                {
                                    !this.state.loading &&
                                    <img src={this.state.uploadPicture} className={styles.uploadPicture}/>
                                }
                                </Button>
                            </FileUpload>
                            <p className={styles.uploadTip}>图片格式为：png，bmp，jpeg，jpg，gif.</p>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default ChoicePicture
