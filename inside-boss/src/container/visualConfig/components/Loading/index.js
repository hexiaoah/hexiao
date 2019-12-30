import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Spin } from 'antd'

import s from './index.css'


export default function Loading(props) {
    const { tip } = props

    return <Modal visible={true} closable={false} footer={null} centered={true} wrapClassName={s.modal} width="auto">
        <Spin size="large" tip={tip} />
    </Modal>
}

Loading.propTypes = {
    tip: PropTypes.string,
}

Loading.defaultProps = {
    tip: '载入中...',
}
