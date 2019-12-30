import React from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'
import Root from '../rootContainer'

let loadingHide = null
let globalMessage = null

const mapStateToProps = (state) => {

    switch (state.global.type) {
        case 'loading':

            if (loadingHide) {
                return
            }
            loadingHide = message.loading('加载中', 0)
            setTimeout(loadingHide, 5000) // 5 秒后自动移除
            break

        case 'loadingHide':
            return loadingHide()

        case 'error':
        case 'success':
            if (!globalMessage) {
                globalMessage = message[state.global.type](state.global.message, 0)
                setTimeout(() => {
                    globalMessage()
                    globalMessage = null
                }, 1500) // 1.5 秒后自动移除
            }
            return

        default:
            return state
    }

    return {}
}

export default connect(mapStateToProps)(Root)
