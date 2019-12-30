import * as bridge from '@src/utils/bridge'


export function getEntityId() {
    const { entityId } = bridge.getInfoAsQuery()
    return entityId
}
