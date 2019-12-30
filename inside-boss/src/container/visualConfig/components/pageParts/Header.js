import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'

import s from './index.css'


// 页首组件
export default function Header(props) {
    const titleElm = props.title ? <div className={c(s.title, 'title')}>{props.title}</div> : null
    return <div className={c(s.header, props.className)}>
        {titleElm}
        {props.children}
    </div>
}

Header.propTypes = {
    className: PropTypes.string,    // 向 header 指定额外的 class
    title: PropTypes.node,          // 页面标题
    children: PropTypes.node,       // 通过此 props 向页首内附加内容
}
