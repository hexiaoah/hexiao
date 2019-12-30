import util from '../util'
export default function createAccountBar(config) {
    const { accountBar } = config;
    if (!accountBar) {
        return "";
    } else {
        const { icon, name, arrow } = accountBar || {};
        const {userInfo={},shopInfo,loginType} = util.getCookie('entrance')
        const {picture,mobile,countryCode}=userInfo||{}
        const {entityName,roleName}=shopInfo||{}
        const pathName = window.location.pathname;
        const flag1=loginType === 2||(loginType === 1 && pathName.search(/change/) >= 0)
        const flag2=loginType === 1 && pathName.search(/change/) >= 0
        return  `
            <div class="account">
                <div class="account-bar">
                    <span class="account-icon" style="background-image: url(${icon})"></span>
                    <span>${name}</span>
                    <span class="account-arrow" style="background-image: url(${arrow})"></span>
                </div>
                <div class="account-pop">
                    <div class="pop-info">
                        <div class="info-avatar" style="background-image: url(${picture?picture:''})">
                            <span class="avatar-icon" style="display:${picture?'none':''}"></span>
                        </div>
                        <div class="info-user">
                            <p class="user-name">${userInfo.name||'-'}</p>
                            <p class="user-phone">${countryCode&&mobile?countryCode+'  '+mobile:'-  -'}</p>
                        </div>
                    </div>
                    <div class="pop-info">
                        <p class="info-shop">店铺: ${(flag2?'-':entityName)||'-'}</p>
                        <p class="info-level">职级: ${(flag2?'-':roleName)||'-'}</p>
                    </div>
                    <div class="pop-footer">
                        <a class="pop-btn pop-btn-shift" id="common-nav-shift-shop" style="display: ${flag1?'none':''}">切换店铺</a>
                        <a class="pop-btn pop-btn-logout" id="common-nav-logout">退出登录</a>
                        <div class="clear"></div>
                    </div>
                </div>
            </div>
            `;
    }
}
