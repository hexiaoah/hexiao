import * as bridge from '@src/utils/bridge'

export default function validate(content) {
    try {
        return executeValidate(content)
    } catch (e) {
        if (e.validateMessage) {
            return e.validateMessage
        } else {
            throw e
        }
    }
}

function executeValidate(content) {
    // entityType: 0=单店 1=连锁总部 2=连锁下的门店 3=分公司 4=商圈
    const { industry, entityType } = bridge.getInfoAsQuery()
    if (industry == 3 && (entityType == 0 || entityType == 2)){
        //bare 组件
        if (content.nav) validateNav(content.nav)

        // 非 bare 组件
        if (content.components) {
            content.components.forEach(com => {
                const componentValidator = validators[com.type]
                if (componentValidator) componentValidator(com)
            })
        }
    }
}

// 使用方式：
// 在发现错误的地方，failed(message)
function failed(message) {
    const err = new Error('validate_failed')
    err.validateMessage = message
    throw err
}

const validators = {
    title(c) {
        if (!c.text || c.text.length > 20) {
            failed('标题组件：标题内容应在 1 ~ 20 个字之间')
        }
    },
    coupons(c) {
        if (c.source === 'manualAdd') {
            if (!c.items.length) failed('优惠券组件：请选择优惠券')
            if (c.items.length > 6) failed('优惠券组件：最多选择 6 张优惠券')
        }
    },
    announce(c) {
        if (!c.text || c.text.length > 20) {
            failed('公告信息：信息内容应在 1 ~ 20 个字之间')
        }
    },
    goodsList(c) {
        if (!c.goodsList.length) {
            failed('商品列表：请选择商品')
        }
        if (c.showFields.indexOf('角标') !== -1 && c.subscript.type === 'image' && !c.subscript.image) {
            failed('商品列表：请上传角标图片')
        }
    },
    goodsRanking(c) {
        if (c.showFields.indexOf('角标') !== -1 && c.subscript.type === 'image' && !c.subscript.image) {
            failed('商品排行：请上传角标图片')
        }
    },
    pictureAds(c) {
        if (!c.items.length) failed('图片广告：请添加图片')
        if (c.items.length > 5) failed('图片广告：最多添加 5 张图片')

        c.items.forEach((item, i) => {
            const no = i + 1
            if (!item.picture) failed(`图片广告 第${no}项：请上传图片`)
        })
    },
    pictureTextNav(c) {
        if (!c.items.length) failed('图文导航：请添加导航项')
        if (c.items.length > 5) failed('图文导航：最多添加 4 个导航项')

        c.items.forEach((item, i) => {
            const no = i + 1
            if (c.mode === '图片导航' || c.mode === '图文导航') {
                if (!item.picture) failed(`图文导航 第${no}项：请上传图片`)
            }
            if (c.mode === '文字导航' || c.mode === '图文导航') {
                if (!item.text) failed(`图文导航 第${no}项：请填写文字内容`)
            }
        })
    },
}

function validateNav(nav) {
    if (nav.mode === '经典展开式') {
        if (!nav.expandItems.length) failed('展开式导航：至少要有1个导航项')
        if (nav.expandItems.length > 10) failed('展开式导航：不能超过10个导航项')
        nav.expandItems.forEach((item, i) => {
            const no = i + 1
            if (!item.icon) failed(`展开式导航 第${no}项：请上传图标`)
            if (!item.linkPage) failed(`展开式导航 第${no}项：请选择要跳转的页面`)
        })
    } else if (nav.mode === 'app式') {
        if (!nav.appItems.length) failed('App式导航：至少要有1个导航项')
        if (nav.appItems.length > 10) failed('App式导航：不能超过4个导航项')
        nav.appItems.forEach((item, i) => {
            const no = i + 1
            if (!item.defaultIcon) failed(`App式导航 第${no}项：请上传默认图标`)
            if (!item.highlightIcon) failed(`App式导航 第${no}项：请上传高亮图标`)
            if (!item.linkPage) failed(`App式导航 第${no}项：请选择要跳转的页面`)
        })
    }
}
