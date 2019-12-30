
function validatePage(content) {
    content.components.forEach(com => {
        const componentValidator = componentValidators[com.type]
        if (componentValidator) componentValidator(com)
    })
}

const componentValidators = {
    title(c) {
        if (!c.text || c.text.length > 20) {
            failed('标题组件：标题内容应在 1 ~ 20 个字之间')
        }
    },
    coupons(c) {
        if (c.source === 'manualAdd' && !c.items.length) {
            failed('优惠券组件：请选择优惠券')
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
        c.items.forEach((item, i) => {
            const no = i + 1
            if (!item.picture) failed(`图片广告 第${no}项：请上传图片`)
        })
    },
    pictureTextNav(c) {
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


// ====================================================


function validateTheme(content) {
    if (content.nav.mode === '经典展开式') {
        if (!content.nav.expandItems.length) failed(`展开式导航：至少要有1个导航项`)
        if (content.nav.expandItems.length > 10) failed(`展开式导航：不能超过10个导航项`)
        content.nav.expandItems.forEach((item, i) => {
            const no = i + 1
            if (!item.icon) failed(`展开式导航 第${no}项：请上传图标`)
            if (!item.linkPage) failed(`展开式导航 第${no}项：请选择要跳转的页面`)
        })
    } else if (content.nav.mode === 'app式') {
        if (!content.nav.appItems.length) failed(`App式导航：至少要有1个导航项`)
        if (content.nav.appItems.length > 10) failed(`App式导航：不能超过4个导航项`)
        content.nav.appItems.forEach((item, i) => {
            const no = i + 1
            if (!item.defaultIcon) failed(`App式导航 第${no}项：请上传默认图标`)
            if (!item.highlightIcon) failed(`App式导航 第${no}项：请上传高亮图标`)
            if (!item.linkPage) failed(`App式导航 第${no}项：请选择要跳转的页面`)
        })
    }
}


// ======================================================


function validate(validator, content) {
    try {
        validator(content)
    } catch(e) {
        if(e.validateMessage) {
            return e.validateMessage
        } else {
            throw e
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

export default {
    page: validate.bind(null, validatePage),
    theme: validate.bind(null, validateTheme),
}
