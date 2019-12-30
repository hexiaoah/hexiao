export default {
    name: 'unionPage',
    userName: '页面基本信息配置',
    max: 1,
    config: {
        title: null,                // 页面标题。不指定则使用商家名称
        backgroundType: 'color',    // 页面背景使用背景色还是背景图。可选值：color、image
        backgroundColor: 'transparent',
        backgroundImage: null,      // 可选值：null、"URL"
    },
     bare: true,
    choosable: false,
}
