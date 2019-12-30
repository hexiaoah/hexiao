import { currentUrlUploadRul, currentIMGProject } from '../../utils/env'
import Cookie from '@2dfire/utils/cookie'

// 'mis/temp/' || 'mis/permanent/'

export default function () {
    const entityId = JSON.parse(Cookie.getItem('entrance')).shopInfo.entityId
    const bindData = {
        name: 'file',
        multiple: true,
        action: `${currentUrlUploadRul}/api/uploadfile`,
        data: {
            projectName: currentIMGProject,
            path: `${entityId}/menu`
        },
        headers: {
            'app-id': '200800',
            'session-id': encodeURIComponent(JSON.parse(decodeURIComponent(Cookie.getItem('entrance'))).token),
            'X-Requested-With': null,
        },
    }

    return bindData
}