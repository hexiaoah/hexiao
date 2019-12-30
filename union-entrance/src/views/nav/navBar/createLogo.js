/**
 *
 * 创建左侧logo模块
 * logo模块包含:
 *   1. logo
 *   2. 名称
 *
 */
export default function createLogo(config) {
    const { logo } = config;
    const { icon, name } = logo || {};
    return logo
        ? `<div class="logo"><img src="${icon}" class="logo-img" alt=""/><span class="logo-name">${name}</span></div>`
        : "";
}
