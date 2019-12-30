import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import c from 'classnames'

import s from './index.css'


/*
inside-boss 对页面样式的控制不够灵活
1. 无法对 header 部分进行自定义，例如增加一些控件、按钮
2. 不能让内容区域自动填满整个可视空间，也不能自定义内容区域的 padding

此组件通过把内容渲染到更上一级，来绕过限制，可以自定义实现 header，且组件直接填满了整个空间

参考：https://www.cnblogs.com/rubylouvre/p/7016685.html
*/
export default class Layout extends Component {
    static propTypes = {
        className: PropTypes.string,
    }

    componentDidMount() {
        this.mountParent()
        this.renderContent()
    }

    componentDidUpdate() {
        this.renderContent()
    }

    componentWillUnmount() {
        this.unmountParent()
    }

    // =================================

    mountParent() {
        this.parent = document.createElement('div')
        this.parent.className = c(s.layout, this.props.className)
        this.baseElm.parentNode.parentNode.appendChild(this.parent)
    }

    unmountParent() {
        this.parent.parentNode.removeChild(this.parent)
    }

    renderContent() {
        ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            <div>{this.props.children}</div>,
            this.parent,
        )
    }

    // =================================

    render() {
        return <div ref={baseElm => this.baseElm = baseElm} />
    }
}
