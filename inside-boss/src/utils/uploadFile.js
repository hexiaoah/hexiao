
import { UPLOAD_BASE_URL } from '../utils/env'
import Cookie from '@2dfire/utils/cookie'

// 'mis/temp/' || 'mis/permanent/'

export default function () {
  const bindData = {
        name: 'file',
        multiple: true,
        action: `${ UPLOAD_BASE_URL }/api/uploadfile`,
        data: {
            projectName: 'OssDownload',
            path: 'mis/permanent/'
        },
        headers: {
            'app-id': '200800',
            'session-id': encodeURIComponent(JSON.parse(decodeURIComponent(Cookie.getItem('entrance'))).token),
            'X-Requested-With': null,
        },
  }

  return bindData
}
