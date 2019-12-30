// 引入工具方法
var Cookie = require('@2dfire/utils/cookie');

// 默认参数
var default_config = {
    // 默认二维火logo
    logo: 'https://assets.2dfire.com/frontend/11dfef885ad8f93b77397febcdd8e127.png',
    // 默认导航栏名称
    name: '商家管理后台',
    // 默认账户模块图标
    account_icon: 'https://assets.2dfire.com/frontend/efc0bc4b8617669f9722c4a5be419cc7.png',
    // 默认账户模块名称
    account_name: '我的账户',
    // 默认账户模块下拉提示箭头
    account_arrow: 'https://assets.2dfire.com/frontend/b8253aea45e20bc6c116ca1e01ad7a6e.png'
};

var action = {
    // 切换店铺
    shiftShop: function () {
        console.log('shiftShop')
    },
    // 退出登录
    logout: function () {
        console.log('logout')
    }
}

var nav = {

    // 操作 DOM 元素，把 content 显示到网页上

    createNav: function () {
        /**
         *
         * 创建顶部导航条元素
         * 导航条包含:
         *   1. 左侧logo/名称
         *   2. 右侧<导航栏>(nav-bar)
         *   3. 右侧<我的账户>(account) 包含下拉
         *
         */
        var nav = document.createElement('div');

        // 为导航条添加样式类名
        nav.setAttribute('class', 'nav');

        var wrap = document.createElement('div');

        // 为导航条添加样式类名
        wrap.setAttribute('class', 'wrap');

        /**
         *
         * 创建左侧logo模块
         * logo模块包含:
         *   1. logo
         *   2. 名称
         *
         */
        var logo = document.createElement('div');
        logo.setAttribute('class', 'logo');

        // 创建logo图片
        var logo_img = document.createElement('img');
        // 赋予logo图片地址及样式
        logo_img.setAttribute('src', default_config.logo);
        logo_img.setAttribute('class', 'logo-img');
        // 创建后台名称，置于LOGO右侧
        var logo_name = document.createElement('span');
        logo_name.innerText = default_config.name;
        logo_name.setAttribute('class', 'logo-name');

        // 将图片/名称分别加入logo模块中
        logo.appendChild(logo_img);
        logo.appendChild(logo_name);
        // logo模块 创建结束

        /**
         *
         * 创建导航栏元素(nav-bar)
         *
         * 1. 从cookie中获取导航条参数
         *
         * 2. 从当前URL中获取参数，确定当前所在项目
         *    url: biz.2dfire.com/<project>/xxxx
         *    <project>:
         *      chain: "连锁管理"
         *      data: "数据中心"
         *
         */
        var navBar = document.createElement('div');
        navBar.setAttribute('class', 'nav-bar');

        // test start 塞入测试数据
        var test_nav = '[{"name": "连锁管理","url": "http://www.163.com","tag":"chain"},{"name": "数据中心","url": "http://www.qq.com","tag":"data"}]';
        Cookie.setItem('nav', test_nav);
        // test end

        var navList = JSON.parse(Cookie.getItem('nav') || '');
        var _i = 0;
        var navItems = '';

        // 判断当前项目 显示active
        var path_array = window.location.pathname.split('/');
        var current_item = '';

        // 判断 如果有/<project>/,path_array将被切割为['','<project>','',... ...]
        //
        if (path_array.length > 2) {
            current_item = path_array[1];
        }

        // 当前URL test
        current_item = 'chain';

        for (_i; _i < navList.length; _i++) {

            // 判断选中
            if (navList[_i].tag == current_item) {
                navItems += '<a class="nav-item nav-active" href="' + navList[_i].url + '">' + navList[_i].name + '</a>'
            } else {
                navItems += '<a class="nav-item" href="' + navList[_i].url + '">' + navList[_i].name + '</a>'
            }
        }

        navBar.innerHTML = navItems;
        // 导航条 结束


        /**
         *
         * 我的账号模块
         * 包含一个展示用户信息的下拉框
         *
         *
         *
         * */

        // 创建 我的账号模块
        var account = document.createElement('div');
        account.setAttribute('class', 'account');

        // 小图标
        var account_icon = document.createElement('span');
        account_icon.setAttribute('class', 'account-icon');
        account_icon.setAttribute('style', 'background-image: url("' + default_config.account_icon + '")');

        // 小箭头
        var account_arrow = document.createElement('span');
        account_arrow.setAttribute('class', 'account-arrow');
        account_arrow.setAttribute('style', 'background-image: url("' + default_config.account_arrow + '")');

        // 显示文案
        var account_name = document.createElement('span');
        account_name.innerHTML = default_config.account_name;

        // 导航栏显示 我的账户
        var account_bar = document.createElement('div');
        account_bar.setAttribute('class','account-bar');

        // 组合账号栏
        account_bar.appendChild(account_icon)
        account_bar.appendChild(account_name)
        account_bar.appendChild(account_arrow)

        // 创建账户弹窗
        var account_pop = document.createElement('div');
        account_pop.setAttribute('class', 'account-pop');

        // 创建展示用户信息模块
        var account_info_user = document.createElement('div');
        account_info_user.setAttribute('class', 'pop-info');

        // 创建用户头像框
        var info_user_avatar = document.createElement('div');
        info_user_avatar.setAttribute('class', 'info-avatar');

        // 用户头像icon
        var avatar_icon = account_icon.cloneNode(true);
        avatar_icon.setAttribute('class', 'avatar-icon');
        info_user_avatar.appendChild(avatar_icon);

        var info_user_wrap = document.createElement('div');
        info_user_wrap.setAttribute('class', 'info-user');
        var info_user_name = document.createElement('p');
        info_user_name.setAttribute('class', 'user-name');
        info_user_name.innerText = '测试'

        var info_user_phone = document.createElement('p');
        info_user_phone.setAttribute('class', 'user-phone');
        info_user_phone.innerText = '+86 13066668888'

        info_user_wrap.appendChild(info_user_name);
        info_user_wrap.appendChild(info_user_phone);

        account_info_user.appendChild(info_user_avatar);
        account_info_user.appendChild(info_user_wrap);


        // 创建展示商铺信息模块
        var account_info_shop = document.createElement('div');
        account_info_shop.setAttribute('class', 'pop-info');

        // 店铺名称
        var info_shop_name = document.createElement('p');
        info_shop_name.setAttribute('class', 'info-shop');
        info_shop_name.innerText = '店铺: ';

        // 用户职级
        var info_shop_level = document.createElement('p');
        info_shop_level.setAttribute('class', 'info-level');
        info_shop_level.innerText = '职级: ';

        account_info_shop.appendChild(info_shop_name);
        account_info_shop.appendChild(info_shop_level);

        // 创建弹窗底部按钮模块
        var account_pop_footer = document.createElement('div');
        account_pop_footer.setAttribute('class', 'pop-footer');

        var btn_shift = document.createElement('a');
        btn_shift.setAttribute('class', 'pop-btn pop-btn-shift');
        btn_shift.innerHTML = '切换店铺';
        btn_shift.addEventListener('click', function () {
            action.shiftShop()
        });

        var btn_logout = document.createElement('a');
        btn_logout.setAttribute('class', 'pop-btn pop-btn-logout');
        btn_logout.innerHTML = '退出登录';
        btn_logout.addEventListener('click', function () {
            action.logout()
        });

        var clear = document.createElement('div');
        clear.setAttribute('class', 'clear');

        account_pop_footer.appendChild(btn_shift);
        account_pop_footer.appendChild(btn_logout);
        account_pop_footer.appendChild(clear);

        // 弹窗模块组装
        account_pop.appendChild(account_info_user);
        account_pop.appendChild(account_info_shop);
        account_pop.appendChild(account_pop_footer);

        // 组合账户模块
        // account.appendChild(account_icon)
        // account.appendChild(account_name)
        // account.appendChild(account_arrow)
        account.appendChild(account_bar)
        account.appendChild(account_pop)


        // 向导航中添加各个模块
        wrap.appendChild(logo);
        wrap.appendChild(account);
        wrap.appendChild(navBar);
        // wrap.appendChild(account_pop);

        nav.appendChild(wrap);

        // 将元素添加至<body>内
        document.body.appendChild(nav);
    }
}

// 开始创建
nav.createNav()

// 通过 CommonJS 规范导出 show 函数
module.exports = nav;