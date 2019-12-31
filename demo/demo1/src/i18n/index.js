import Vue from 'vue'
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

import i18n from 'i18n-helper';
import zhApp from './langs/zh-CN';
import enApp from './langs/en-US'
import zhLocale from 'iview/dist/locale/zh-CN';
import enLocale from 'iview/dist/locale/en-US';

export const LOCALE = () => {
    var browserLang = (navigator.language || navigator.browserLanguage).toLowerCase();
    if (browserLang.indexOf('zh') > -1)
        return 'zh-CN';
    else if (browserLang.indexOf('en') > -1)
        return 'en-US';
    else
        return 'en-US';
};

let local = LOCALE();

const langs = {
    'zh-CN': zhApp,
    'en-US': enApp
};
Vue.locale('zh-CN', Object.assign(zhApp, zhLocale))
Vue.locale('en-US', Object.assign(enApp, enLocale))

export default i18n(langs[local]);

