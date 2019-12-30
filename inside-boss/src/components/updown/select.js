import React, { Component } from 'react'
import { Dropdown, Menu, Button, Icon, Popconfirm } from 'antd'
import * as action from '../../action'
import styles from './select.css'
import cx from 'classnames'

const MySelect = ({ content, onClickLeft, onClickRight }) => (
    <div style={{ overflow: 'hidden', height: '100%' }}>
        <div onClick={onClickLeft} className={styles.options_left}>
            {content}
        </div>
        <Popconfirm title="是否确认删除该文件?" onConfirm={onClickRight}>
            <div className={styles.options_right}>
                <Icon type="close" />
            </div>
        </Popconfirm>
    </div>
)

class BatchSelector extends Component {
    onClick() {
        const buttonLock = sessionStorage.getItem('dropDownButtonLock')
        if (buttonLock === 'loading') {
            return false
        }
        const { dispatch } = this.props
        dispatch(action.fetchBatchList)
    }

    handleClickDropdownItem(position, index) {
        const { dispatch } = this.props
        const { batchList } = this.props.data
        const { id } = batchList[index]
        const rechargeBatchId = id
        const startTime = 0
        const endTime = 0
        const rechargeStatusList = ''
        const pageSize = 50
        const pageIndex = 1
        if (position === 'left') {
            const tag = 'fromBatchSelector'
            dispatch(
                action.fetchRechargeList({
                    rechargeBatchId,
                    startTime,
                    endTime,
                    rechargeStatusList,
                    pageSize,
                    pageIndex,
                    tag
                })
            )
        } else if (position === 'right') {
            dispatch(action.deleteBatch(id))
        }
    }

    render() {
        const t = this
        const { batchList, name } = this.props.data
        const menu = (
            <Menu className={cx(styles.dropdown_wrapper)}>
                {batchList.map((e, i) => {
                    return (
                        <Menu.Item key={i} className={cx(styles.dropdown_item)}>
                            <MySelect
                                content={e.name}
                                onClickLeft={t.handleClickDropdownItem.bind(
                                    t,
                                    'left',
                                    i
                                )}
                                onClickRight={t.handleClickDropdownItem.bind(
                                    t,
                                    'right',
                                    i
                                )}
                            />
                        </Menu.Item>
                    )
                })}
            </Menu>
        )
        return (
            <Dropdown overlay={menu} trigger={['click']}>
                <Button
                    className={cx(styles.select_btn)}
                    onClick={t.onClick.bind(t)}
                >
                    <span className={styles.sel_text}>
                        {name ? name : '选择已上传的文件'}
                    </span>
                    <Icon type="down" className={cx(styles.icon)} />
                </Button>
            </Dropdown>
        )
    }
}

export default BatchSelector
