// 记录一个临时的 config 内容，以在多个页面间传递

const storage = window.sessionStorage
const nameKey = 'visual_config_temp_config'
const contentKey = 'visual_config_temp_content'

export default {
    get() {
        const name = storage.getItem(nameKey) || null
        const content = storage.getItem(contentKey) || null

        storage.removeItem(nameKey)
        storage.removeItem(contentKey)

        if (name && content) {
            return [name, content]
        } else {
            return []
        }
    },

    set(name, content) {
        storage.setItem(nameKey, name)
        storage.setItem(contentKey, content)
    }
}
