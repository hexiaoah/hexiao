import React, {Component} from 'react'
import {DragSource, DropTarget, DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import update from 'immutability-helper'
// import PropTypes from 'prop-types'
// import {findDOMNode} from 'react-dom'
import styles from './style.css'
import Card from './haveDropPic'

import {Icon, message, Checkbox, Button, Modal} from 'antd'
import AddPictureBtn from './addPictureBtn'
import api from "../../api";
import * as action from "../../action";
// import HaveDropPic from './picDetailListBox'


const ItemTypes = {
    CARD: 'card',
}

@DragDropContext(HTML5Backend)

class HaveDropPic extends Component {
    constructor(props) {
        super(props)
        this.moveCard = this.moveCard.bind(this)
        this.state = {
            type: this.props.type,//3为头图，1为详情图
            title: this.props.type === '1' ? '商品详情图' : '商品主图',
            cards: this.props.type === "1" ? this.props.data.pictureDetailList : this.props.data.pictureHeaderList,//数据内容
            isDrop: false,//当前是否在可拖动排序状态
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        let cards = nextProps.type === "1" ? nextProps.data.pictureDetailList : nextProps.data.pictureHeaderList;//数据内容
        this.setState({
            cards: cards
        })
    }

    //点击全选按钮
    onCheckAllChange(e) {
        if (this.state.isDrop) {
            message.info('处于排序状态，暂不支持全选');
            return false
        }
        const t = this
        const picList = t.state.cards
        const plainOptions = []
        for (let i = 0; i < picList.length; i++) {
            plainOptions.push(picList[i].id)
        }
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    }


    //图片checkbox发生变化
    onChange(checkedList) {
        const t = this

        const {data} = t.props

        const {pictureDetailListLength} = data

        const pictureDetailList = data.pictureDetailList

        const plainOptions = []

        for (let i = 0; i < pictureDetailListLength; i++) {

            plainOptions.push(pictureDetailList[i].id)
        }
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
            checkAll: checkedList.length === plainOptions.length,
        });
    }

    //点击删除按钮
    pictureDetailDelete() {
        if (this.state.isDrop) {
            message.info('处于排序状态，暂不支持删除');
            return false
        }
        const t = this

        const {dispatch, detail} = t.props

        const {pictureFileId} = detail

        const liArr = document.getElementsByClassName("ant-checkbox-checked")

        const idArr = [];

        for (let i = 0; i < liArr.length; i++) {

            const id = liArr[i].parentNode.parentNode.getAttribute('data-index')

            if (id) {
                idArr.push(id);
            }

        }
        if (idArr.length > 0) {
            const idSting = idArr.join(',');
            Modal.confirm({
                title: '确定要删除所选图片?',
                onOk() {
                    api.deletePicture({
                        menuId: pictureFileId,
                        imageIds: idSting,
                        img_type: t.state.type
                    }).then(
                        res => {
                            if (res === null) {
                                message.success('图片删除成功');

                                dispatch(action.getPictureDetailList(detail.pictureFileId))
                            } else {
                                message.error('图片删除失败');

                                dispatch(action.getPictureDetailList(detail.pictureFileId))
                            }
                        },
                        err => {
                            dispatch(action.errorHandler(err))
                        }
                    )
                },
                onCancel() {
                },
            });
        } else {
            message.error('请先选择商品图片再删除。');
        }

    }

    returnAddPicture(resp, type) {
        const {detail, dispatch} = this.props;
        dispatch(action.getPictureDetailList(detail.pictureFileId))
        console.log(resp);
        console.log(type)
    }


    moveCard(dragIndex, hoverIndex) {
        const {cards} = this.state
        const dragCard = cards[dragIndex]
        this.setState(
            update(this.state, {
                cards: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
                },
            }),
        )
    }

    //转化为排序
    toSort() {
        if (this.state.cards.length < 2) {
            message.info('当前图片少于2张，暂不支持排序')
            return false
        }
        this.setState({
            isDrop: true
        })
    }

    //排序完成
    finishSort() {
        const picture = this.state.cards
        this.setState({
            isDrop: false
        })
        const oldPic = this.props.type === "1" ? this.props.data.pictureDetailList : this.props.data.pictureHeaderList;
        if (picture === oldPic) {

            message.success('排序完成，图片顺序未修改')
            return false
        }
        let changePic = JSON.stringify(picture.map((item, index, arr) => {
            return {
                id: item.id,
                sortCode: index + 1
            }
        }));
        const {dispatch, detail} = this.props
        dispatch(action.changeListSort(changePic, function (res) {
            if (res) {
                message.success('图片排序成功');
            } else {
                message.success('图片排序失败');
            }
            dispatch(action.getPictureDetailList(detail.pictureFileId))
        }))

    }

    render() {
        const pictureList = this.state.cards
        const {data, dispatch} = this.props
        return (
            <div>
                <div className={styles.pictureDetailListTitle} style={{background: '#fff'}}>
                    <p className={styles.chooseNum}>{this.state.title}</p>
                    <p className={styles.chooseNum}>已选{this.state.checkedList ? this.state.checkedList.length : '0'}条</p>
                    <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange.bind(this)}
                        checked={this.state.checkAll}
                        className={styles.checkall}>
                        全选
                    </Checkbox>
                    {(() => {
                        if (this.state.isDrop) {
                            return (
                                <span className={styles.hint}>请拖动商品图片对图片重新排序，排序结束后点击完成进行保存。</span>
                            )
                        }
                    })()}
                    <Button className={styles.deleteBtn}
                            onClick={this.pictureDetailDelete.bind(this)}>删除</Button>
                    <Button onClick={this.state.isDrop ? this.finishSort.bind(this) : this.toSort.bind(this)}
                            className={styles.deleteBtn}>{this.state.isDrop ? '完成' : '排序'}</Button>
                </div>
                {(() => {
                        if (!this.state.isDrop) {
                            return (
                                <ul className={styles.pictureListUl} style={{marginLeft: '-40px'}}>
                                    <Checkbox.Group onChange={this.onChange.bind(this)}
                                                    value={this.state.checkedList}>
                                        {(pictureList && pictureList.length > 0) ? pictureList.map((picture, index) => {
                                            let url;
                                            if (picture.server === 'zmfile.2dfire-daily.com'
                                                || picture.server === 'rest3.zm1717.com' ||
                                                picture.server === 'assets.2dfire.com') {
                                                url = 'http://' + picture.server + '/upload_files/' + picture.path
                                            } else {
                                                url = 'http://' + picture.server + '/' + picture.path
                                            }
                                            return (
                                                <li className={styles.pictureDetailListcard}
                                                    key={index}
                                                    data-index={picture.id}>
                                                    <img className={styles.picturnDetailImg}
                                                         src={url}
                                                         alt={picture.name}/>
                                                    <Checkbox className={styles.picturnDetailName}
                                                              value={picture.id}>
                                                        {picture.sortCode}
                                                    </Checkbox>
                                                </li>
                                            )
                                        }) : ''}
                                    </Checkbox.Group>
                                    {(() => {
                                        if ((this.state.type === '3' && pictureList && pictureList.length < 5) || (this.state.type === '1' && pictureList && pictureList.length < 24)) {
                                            return (
                                                <AddPictureBtn data={data}
                                                               dispatch={dispatch}
                                                               imgType={this.state.type}
                                                               loadType="2"
                                                               returnAddPicture={this.returnAddPicture.bind(this)}
                                                />
                                            )
                                        }
                                    })()}

                                    {/*<AddPictureBtn data={data}*/}
                                    {/*dispatch={dispatch}*/}
                                    {/*imgType={this.state.type}*/}
                                    {/*loadType="2"*/}
                                    {/*returnAddPicture={this.returnAddPicture.bind(this)}*/}
                                    {/*/>*/}

                                </ul>)
                        } else {
                            return (
                                <ul className={styles.pictureListUl} style={{marginLeft: '-40px'}}>
                                    <Checkbox.Group onChange={this.onChange.bind(this)}
                                                    value={this.state.checkedList}>
                                        {pictureList ? pictureList.map((card, i) => {
                                            let url;
                                            if (card.server === 'zmfile.2dfire-daily.com'
                                                || card.server === 'rest3.zm1717.com' ||
                                                card.server === 'assets.2dfire.com') {
                                                url = 'http://' + card.server + '/upload_files/' + card.path
                                            } else {
                                                url = 'http://' + card.server + '/' + card.path
                                            }
                                            return (<Card
                                                key={card.id}
                                                index={i}
                                                id={card.id}
                                                path={url}
                                                moveCard={this.moveCard}
                                            />)
                                        }) : ''}
                                    </Checkbox.Group>
                                </ul>
                            )
                        }
                    }
                )()}


            </div>
        )
    }
}

export default HaveDropPic
