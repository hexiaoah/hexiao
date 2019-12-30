import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getCurrentPage, getPageDesignComponentMap } from '@src/container/visualConfig/store/selectors'
import cx from 'classnames'
import EditItem from './EditItem'
import s from './Editing.css'


@connect(state => ({
    componentConfigs: state.visualConfig.design.componentConfigs,
    page: getCurrentPage(state),
    comMap: getPageDesignComponentMap(state),
}))
class Editing extends Component {
    render() {
        const { componentConfigs, page, comMap } = this.props

        const editItems = componentConfigs.map(item => (
            <EditItem
                key={item.id}
                id={item.id}
                config={item.config}
                designComponent={comMap[item.name]}
            />
        ))

        return <div className={s.wrapper}>
            <div className={s.innerWrapper}>
                <div className={s.pageDesc}>{page.name}</div>

                <div className={s.previewPanel}>
                    <div className={s.previewHeader} />
                    <div className={s.previewComponents}>
                        {editItems}
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Editing
