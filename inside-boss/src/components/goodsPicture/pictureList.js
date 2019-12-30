/**
 * Created by air on 2017/7/11.
 */
import React, { Component } from 'react'
import { Icon, Pagination, Button } from 'antd'
import { connect } from 'react-redux'
import styles from './style.css'
import * as action from '../../action'

class PictureList extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }

        const { 
            getDuplicatedItems,
            data : {
                name,
                brandId,
            }
         } = this.props;
        getDuplicatedItems(name, brandId);
    }

    paginationChange(pageNumber){
        console.log('Page: ', pageNumber);

        const t =this

        const { dispatch ,data} = t.props

        const { name='', brandId='' } = data

        console.log(data)
        this.setState({
            current: pageNumber,
        });

        dispatch(action.setPageNumber(pageNumber))

        dispatch(action.getPictureList(pageNumber,name,brandId))
    }

    detailChange(id,name,isInclude){
        const t =this
        const thisProps=t.props

        thisProps.data.pictureName=name
        thisProps.data.isInclude=isInclude

        const { dispatch } = thisProps

        dispatch(action.detailChange({detail:true,pictureFileId:id}))
    }

    backImageLibrary = () => {
        const { 
            getDuplicatedItems,
            backPictureList,
            data : {
                name,
                brandId,
            }
         } = this.props;
        backPictureList();
        getDuplicatedItems(name, brandId);
        this.paginationChange(this.state.pageNumber || 1);
    }

    getDuplicatedItems = () => {
        const { 
            getDuplicatedItems,
            data : {
                name,
                brandId,
            }
         } = this.props;
        getDuplicatedItems(name, brandId);
    }

    listDuplicatedItems = () => {
        const { listDuplicatedItems } = this.props;
        listDuplicatedItems();
    }

    renderDuplicatedView() {
        const { 
            duplicated, // 浏览重名商品状态
            hasDuplicatedItems, // 是否有重名商品
        } = this.props
        const showDuplicatedButton = hasDuplicatedItems && !duplicated

        return (
            <div>
                {
                    showDuplicatedButton && 
                    (
                        <Button className={styles.duplicationNameButton} onClick={this.listDuplicatedItems}>*存在重名商品</Button>
                    )
                }
                {
                    duplicated &&
                    (
                        <div className={styles.backImageLibraryBox} onClick={this.backImageLibrary}>
                            <Icon className={styles.pictureIcon} type="left-circle-o"/>
                            <p className={styles.pictureTitleWord}>返回图片库</p>
                        </div>
                    )
                }
            </div>
        )
    }

    pictureTitle() {
        const { duplicated } = this.props;
        return duplicated ? '重名商品' : '图片库';
    }

    renderPictureList() {
        const { duplicated, pictureList } = this.props;
        return (
            <div>
                {
                    pictureList &&
                    pictureList.map((picture, index) =>{
                        const iconClassName = picture.hasDetailPic ? styles.fileIcon : styles.fileIconGray;
                        const fileClassName = picture.hasHeadPic ? styles.fileNameRed : styles.fileName;
                       
                        return(
                            <li className={styles.pictureCard} onDoubleClick={this.detailChange.bind(this,picture.id,picture.name,picture.isInclude)} key={index}>
                                <Icon type="folder-open" className={iconClassName}/>
                                <p className={fileClassName}>{picture.name}</p>
                            </li>
                        )
                    })
                }
            </div>
        )
    }

    render () {
        const t = this

        const { 
            data, 
            duplicated, // 浏览重名商品状态
        } = t.props

        const total = data.pictureListTotal

        const pageNumber = data.pageNumber

        return (
            <div className={styles.pictureListBox}>
                <div className={styles.pictureListBody}>
                    <div className={styles.pictureListTitle}>
                        <div className={styles.turnBtn}>
                            <Icon className={styles.pictureIcon} type="picture"/>
                            <p className={styles.pictureTitleWord}>{ this.pictureTitle() }</p>
                        </div>
                        {this.renderDuplicatedView()}
                    </div>
                    <ul className={styles.pictureListUl}>
                        {this.renderPictureList()}
                    </ul>
                    { 
                        !duplicated && (
                            <div className={styles.paginationBox}>
                                <Pagination  className={styles.paginationHtml} showQuickJumper current={pageNumber} total={total} defaultPageSize={24}
                                            pageSize={24} onChange={this.paginationChange.bind(this)} />
                                <p>共{total}条记录</p>
                            </div>
                        )
                    }
                </div>
            </div>
        )

    }
}

function mapStateToProps(state) {
    const { 
        goodsPicture: 
        { 
            pictureReducers : {
                pictureList, 
                duplicated,
                hasDuplicatedItems,
            }
        } 
    } = state;
    return {
        ...state,
        pictureList, 
        duplicated,
        hasDuplicatedItems,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        backPictureList: () => dispatch(action.backPictureList()),
        getDuplicatedItems: (name, id) => dispatch(action.getDuplicatedItems(name, id)),
        listDuplicatedItems: () => dispatch(action.listDuplicatedItems()),
        getPictureList: (page, name, id) => dispatch(action.getPictureList(page, name, id)),   
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps,
)(PictureList);
