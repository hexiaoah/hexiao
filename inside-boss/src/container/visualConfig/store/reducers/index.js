import shopInfoReducer from './shopInfo'
import customPagesReducer from './customPages'
import backupsReducer from './backups'
import templatesReducer from './templates'
import designReducer from './design'


export default function visualConfigReducer(state, action) {
    if (!state) state = {}

    return {
        shopInfo: shopInfoReducer(state.shopInfo, action),
        customPages: customPagesReducer(state.customPages, action),
        backups: backupsReducer(state.backups, action, state),
        templates: templatesReducer(state.templates, action),
        design: designReducer(state.design, action),
    }
}
