/**
 * Created by huaixi on 2019/5/7.
 */

export const permissionMap = state => {
    const map = {}
        state.permissionList.forEach(item => {
            map[item.code] = item.name
        })
        return map
}

export const grantedActionIdList = state => {
    var array = []
    state.permissionList.forEach(item => {
        let actionList = item.actionVOList
        actionList.forEach(listItem => {
            if (listItem.selected) {
                array.push(listItem.id)
            }
        })
    })
    return array.sort()
}

export const rankName = state => {
    return state.rank.name
}

export const StaffInfoFirst = state => {
    return [
        'userName',
        'mobile',
        'roleName',
    ]
}

export const extraActionsInfoFirst = state => {
    return [
        'maxLimitSubZero',
    ]
}
