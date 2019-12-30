import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'

import s from './index.css'


// 页面内容容器
export default function Content(props) {
    return <div className={c(s.content, props.className)}>
        {props.children}
    </div>
}

Content.propTypes = {
    className: PropTypes.string,    // 向内容容器指定额外的 class
}
