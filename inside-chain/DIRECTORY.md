## 项目目录说明

#### src为开发主目录

    base
        |
        |---config       各个环境对应参数
                |
                |---daily.js  其中ENV需要修改为开发变更对应的ENV
                |---dev.js

    config
        |
        |---api_xxx.js   模块对应api接口配置
         
    const                映射常量
    
    router
        |
        |---index.js     路由配置
        
    store
        |
        |---modules
             |
             |---xxx      功能模块名
                  |
                  |---actions.js
                  |---getters.js
                  |---mutations.js
                  |---state.js
             |---index.js  store入口
             
    components             项目公用组件
        |
        |---brand-select   品牌选择
        |---shop-select    门店选择
        |---  
           
    views
        |
        |---xxx            功能模块页文件夹
            |
            |---components 该功能用组件
            |---xxx-a     
                |
                |---index.vue
