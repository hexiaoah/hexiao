/**
 * Created by air on 2017/7/11.
 */
import React, { Component } from 'react'
import { Icon, Pagination, Modal } from 'antd'
import styles from './style.css'
import * as action from '../../action'


class VideoList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            videoSrc : '',
            videoTagKey: '',
            videoName :''
        }

    }
    showModal = (url,videoName) => {
        this.setState({
            visible: true,
            videoName : videoName,
            videoSrc: url,
            videoTagKey: new Date().getTime()
        });

    }
    handleCancel = () => {
        this.setState({ visible: false, videoSrc: '', videoTagKey: '' });
        this.refs.video.pause();
    }

    paginationChange(pageNumber){
        console.log('Page: ', pageNumber);

        const t =this

        const { dispatch ,data} = t.props

        const { videoType } = data

        console.log(data)

        dispatch(action.getVideoList(videoType ,pageNumber))
    }

    render () {
        const t = this

        const { visible ,videoSrc ,videoName} = this.state;

        const { data } = t.props

        const { videolist ,total} = data

        return (
            <div className={styles.videoListBox}>
                <div className={styles.videoListBody}>
                    <div className={styles.viedeoListTitle}>
                        <Icon className={styles.videoIcon} type="video-camera"/>
                        <p className={styles.videoTitleWord}>视频库</p>
                    </div>
                    <ul className={styles.videoListUl}>
                        {videolist ?
                            videolist.map((video,index) =>{
                                return(
                                    <li className={styles.videoCard} onClick={this.showModal.bind(this, video.videoUrl,video.name)} key={index}>
                                        <div className={styles.videoImgBox}>
                                            <img className={styles.videoImg} src={video.coverUrl} alt=""/>
                                            <Icon type="play-circle-o" className={styles.videoStartIcon}/>
                                        </div>
                                        <p className={styles.videoName}>{video.name}</p>
                                    </li>
                                  )
                             })

                      :'' }


                    </ul>
                    <div className={styles.paginationBox}>
                        <Pagination  className={styles.paginationHtml} showQuickJumper defaultCurrent={1} total={total} defaultPageSize={24}
                                     pageSize={24} onChange={this.paginationChange.bind(this)} />
                        <p>共{total}条记录</p>
                    </div>
                </div>
                <Modal
                    visible={visible}
                    title={videoName}
                    onCancel={this.handleCancel}
                    footer={'若视频播放出现问题，可能还在转码中，请耐心等待。'}
                >
                    <video ref="video" src={videoSrc} style={{width:'100%'}} controls="controls"></video>
                </Modal>
            </div>
        )

    }
}

export default VideoList
