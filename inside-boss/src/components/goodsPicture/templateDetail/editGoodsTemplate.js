

import React, {Component} from 'react'
import styles from '../style.css'
import {message,Input} from 'antd'
import * as action from "../../../action";
import PreviewTemplate from "./previewTemplate.js";
import ChoicePicture from "./choicePicture.js";
import ButtonList from "./buttonList.js";
import imgURL from '../images/add.png';
import add1 from '../images/add1.png';
import add2 from '../images/add2.png';
import forbid from '../images/forbid.png';
const imgArr=[add1,add2,forbid];
const { TextArea } = Input;


class editGoodsTemplate extends Component{
    constructor(props) {
        super(props)
        this.state={
            goodsName:"",
            goodsImageText:[{
                image:"",
                text:""
            }],
            combineGoods:[{
                images:["","","",""],
                text:""
            }],
            visible:false,//预览图片弹窗
            flag:false,//选择图片弹窗
            curType: 1, //1商品头图2商品详情图
            curIndex: 0, //索引
            childIndex:0,//组合图下面的索引

        }
    }

    componentDidMount() {
        const {dispatch,detail,data} = this.props
        let entityId = data.importData.entityId;
        dispatch(action.getTemplateDetail(detail.templateId, detail.pictureFileId, entityId))
    }

    componentWillReceiveProps(newProps) {
        let l1 = newProps.data.templateDetail.trace;
        let l2 = newProps.data.templateDetail.cook;
        let result = [],arr=[],g1,g2;

        if(l2.length>0){
            if(!l2[0].images){//老格式数据兼容
                for (let i = 0; i < l2.length; i++) {
                    result.push(l2.slice(i, (i + 1)))
                }
                for (let i = 0; i < result.length; i++) {
                    let item = {};
                    let images = [result[i][0].image, "", "", ""];
                    let text = result[i][0].text;
                    item.images = images;
                    item.text = text;
                    arr.push(item);
                }
                l2 = [...arr];
            }
        }
        g1=l1.length>0?l1:this.state.goodsImageText;
        g2=l2.length>0?l2:this.state.combineGoods;

        this.setState({
            goodsName: newProps.data.templateDetail.title[0].text || newProps.data.pictureName,
            goodsImageText: g1,
            combineGoods: g2
        })
    }
    // 控制输入的长度
    controlLength =(e,len)=>{
        if(len&&e.target.value.length<=len){
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }
    // 计数器
    handleChange = (e, index, len) => {
        let length = e.target.value.length
        if (len && length <= len) {
            let obj = JSON.parse(JSON.stringify(this.state[e.target.name]));
            obj.map((item,i)=>{
                if(i==index){
                    item.text=e.target.value;
                }
            })
            this.setState({
                [e.target.name]: obj,
            })
        }
    }

    // 删除模板
    delTemplate=(index,target)=>{
        let obj = JSON.parse(JSON.stringify(this.state[target]));
        obj.splice(index,1);
        this.setState({
            [target]: obj
        })
    }

    // 添加模板
    addTemplate = (target,type) => {
        if(this.state[target].length>=8){
            message.info('图文最多不能超过8组。');
            return;
        }
        let obj = JSON.parse(JSON.stringify(this.state[target]));
        let item={};
        if(type==1){
            item={
                image: "",
                text: ""
            }
        }else{
            item={
                images: ["", "", "", ""],
                text: ""
            }
        }
        obj.push(item);
        let curIndex=obj.length-1;
        this.setState({
            [target]: obj,
            flag:true,
            curIndex: curIndex,
            curType:type,
            childIndex:0
        })
    }
    // 取消模板
    handleCancel =()=>{
        let {dispatch,detail} =this.props
        dispatch(action.detailChange({detail:true,pictureFileId:detail.pictureFileId}))
        dispatch(action.editTemplate({edit:false}))
    }
    // 预览模板
    handlePreview =()=>{
        this.setState({
            visible: true
        })
    }
    // 保存模板
    saveTemplate =()=>{
        let {dispatch,data,detail} =this.props;
        let entityId = data.importData.entityId;
        let traceTemp = JSON.parse(JSON.stringify(this.state.goodsImageText));
        let cookTemp = JSON.parse(JSON.stringify(this.state.combineGoods));
        let trace=[],cook=[];
        traceTemp.map((item,index)=>{
            if(item.image==''&&item.text=='')return;
            else trace.push(item);
        })
        cookTemp.map((item,index)=>{
            let arr=item.images;
            if(arr[0]==''&&arr[1]==''&&arr[2]==''&&arr[3]==''&&item.text=='')return;
            else cook.push(item)
        })
        let itemDetailJson={
            version: 1,
            modules: {
                title: [{
                    image:null,
                    text: this.state.goodsName
                }],
                trace: trace,
                cook: cook
            }
        }
        let itemId = detail.pictureFileId;
        let templateId = detail.templateId;
        let ItemDetailVO={
            entityId: entityId,
            itemDetailJson: JSON.stringify(itemDetailJson),
            itemId: itemId,
            templateId: templateId
        };
        dispatch(action.saveTemplate(ItemDetailVO, 2, itemId, entityId))
    }
    // 选择图片
    choicePicture=(type,index,childIndex)=>{
        if (type == 1) {
            this.setState({
                flag: true,
                curType: type,
                curIndex: index
            })
        }else{
            let flag;
            let arr = this.state.combineGoods[index].images;

            if(childIndex==0){
                flag=true;
            }
            for(let i=1;i<arr.length;i++){
                if(childIndex==i){
                    if(arr[i-1]=="")flag=false;
                    else flag=true;
                    break;
                }
            }
            this.setState({
                flag: flag,
                curType: type,
                curIndex: index,
                childIndex: childIndex
            })
        }
    }
    // 关闭弹窗
    closePopup=(url)=>{
        if(url){
            if(this.state.curType==1){
                let list = JSON.parse(JSON.stringify(this.state.goodsImageText));
                list[this.state.curIndex].image=url;
                this.setState({
                    goodsImageText:list
                })
            }else{
                let list2 = JSON.parse(JSON.stringify(this.state.combineGoods));
                list2[this.state.curIndex].images[this.state.childIndex]=url;
                this.setState({
                    combineGoods: list2
                })
            }
        }
        this.setState({
            flag: false,
            visible: false
        })
    }

    forbidFlag=(list)=>{
        list.map(item=>{
            let arr=item.images;

            if(arr[0]==""){
                arr[0]=imgArr[0]
                arr[1]=arr[2]=arr[3]=imgArr[2];
            }
            if(arr[0]!==""&&arr[1]==""){
                arr[1]=imgArr[1]
                arr[2] = arr[3] = imgArr[2];
            }

            if(arr[1]!==""&&arr[2]==""){
                arr[2] = imgArr[1];
                arr[3] = imgArr[2];
            }

            if(arr[2]!==""&&arr[3]==""){
                arr[3] = imgArr[1];
            }
            if(item.text=="null" || item.text==null){
                item.text="";
            }
        })
        return list;
    }

    render(){
        let {data} =this.props;
        let list = JSON.parse(JSON.stringify(this.state.goodsImageText));
        let list2 = JSON.parse(JSON.stringify(this.state.combineGoods));
        list.map(item=>{
            if (item.image == "" || item.image=="null") {
                item.image = imgURL;
            }
            if(item.text=="null" || item.text==null){
                item.text="";
            }
        })
        this.forbidFlag(list2);
        return (
            <div>
                <div className={styles.editTemplateBox}>
                    <div className={styles.goodsNameBox}>
                        <span className={styles.goodsName}>商品名称</span>
                        <Input className={styles.inputStyle}  name="goodsName" value={this.state.goodsName} onChange={(e)=>this.controlLength(e,21)}/>
                    </div>
                    <div className={styles.goodsNameBox}>
                        <span className={styles.goodsName}>商品图文</span>
                        <div className={styles.imageTextBox}>
                            <ul>
                                {
                                    list&&
                                    list.map((item,index)=>{
                                        return (
                                            <li key={index} className={styles.itemStyle}>
                                                <img className={styles.goodsPicture} src={item.image} onClick={()=>this.choicePicture(1,index)}/>
                                                <div className={styles.goodsTextBox}>
                                                    <TextArea autosize={false} className={styles.textAreaStyle} name="goodsImageText"  value={item.text} placeholder="请输入文本描述，不填写则不展示文字" onChange={(e)=>this.handleChange(e,index,60)}/>
                                                    <span className={styles.inputNumber}>{item.text?item.text.length:0}/60</span>
                                                    <a className={styles.delTemplate} onClick={() => this.delTemplate(index, "goodsImageText")}>删除</a>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <div className={styles.addGoods} onClick={()=>this.addTemplate("goodsImageText",1)}><span>+</span>添加</div>
                        </div>
                    </div>
                    <div className={styles.goodsNameBox}>
                        <span className={styles.goodsName}>组合商品图</span>
                        <div className={styles.imageTextBox}>
                            <ul>
                                {
                                    list2&&
                                    list2.map((item,index)=>{
                                        return (
                                            <li key={index} className={styles.itemStyle}>
                                                <div className={styles.combineImageBox}>
                                                    <img src={item.images[0]} className={styles.combineTop} onClick={()=>this.choicePicture(2,index,0)}/>
                                                    <img src={item.images[1]} className={styles.combineBottom} onClick={()=>this.choicePicture(2,index,1)}/>
                                                    <img src={item.images[2]} className={styles.combineLeft} onClick={()=>this.choicePicture(2,index,2)} />
                                                    <img src={item.images[3]} className={styles.combineRight} onClick={()=>this.choicePicture(2,index,3)}/>
                                                </div>
                                                <div className={styles.goodsTextBox}>
                                                    <TextArea autosize={false} className={styles.textAreaStyle} name="combineGoods" value={item.text} placeholder="请输入文本描述，不填写则不展示文字" onChange={(e)=>this.handleChange(e,index,60)}/>
                                                    <span className={styles.inputNumber}>{item.text?item.text.length:0}/60</span>
                                                    <a className={styles.delTemplate} onClick={() => this.delTemplate(index, "combineGoods")}>删除</a>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <div className={styles.addGoods} onClick={()=>this.addTemplate("combineGoods",2)}><span>+</span>添加</div>
                        </div>
                    </div>
                </div>
                <ButtonList handlePreview={this.handlePreview} saveTemplate={this.saveTemplate} handleCancel={this.handleCancel}/>
                <PreviewTemplate goodsName={this.state.goodsName} goodsImageText={this.state.goodsImageText} combineGoods={this.state.combineGoods} visible={this.state.visible} closePopup={this.closePopup}/>
                <ChoicePicture data={data} flag={this.state.flag} closePopup={this.closePopup}/>
            </div>

        )
    }

}
export default editGoodsTemplate
