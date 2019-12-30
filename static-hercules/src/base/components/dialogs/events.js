const Vue = require('vue');

const bus = new Vue({
    methods: {
        showDialog: function (name, options) {
            options = Object.assign({}, options || {});
            if (!('show' in options)) {
                options.show = true;
            }
            this.emitDialogEvent(name, options);
        },
        hideDialog: function (name) {
            this.emitDialogEvent(name, { show: false });
        },
        emitDialogEvent: function (name, options) {
            this.$emit('dialog-change', {
                name, options
            });
        }
    },
    created(){
    }
});

const showDialogCreate = name => options => bus.showDialog(name, options);
const hideDialogCreate = name => () => bus.hideDialog(name);
const hideAll = () => bus.hideAll();
// const showDialogCreate = function (name, options) {
//     bus.showDialog(name, options);
// }
// const hideDialogCreate = function (name) {
//     bus.hideDialog(name);
// }
// const hideAll = function () { bus.hideAll() };

let tipIndex = 0;

module.exports = {
    $on(...args) {
        bus.$on(...args);
    },
    hideAll() {
        bus.hideDialog('tip');
        bus.hideDialog('confirm');
        bus.hideDialog('alert');
        bus.hideDialog('warning');
        bus.hideDialog('bindPhone');
    },
    bindPhone: {
        show: showDialogCreate('bindPhone'),
        hide: hideDialogCreate('bindPhone')
    },
    tip: {
        show(options) {
            tipIndex++;
            if (typeof options === 'string') {
                options = { content: options };
            }
            bus.showDialog('tip', Object.assign({ index: tipIndex }, options));
        },
        hide: hideDialogCreate('tip')
    },
    confirm: {
        show: showDialogCreate('confirm'),
        hide: hideDialogCreate('confirm')
    },
    alert: {
        show: showDialogCreate('alert'),
        hide: hideDialogCreate('alert')
    },
    warning: {
        showFail(content, options = { canClose: true }) {
            bus.showDialog('warning', {
                content,
                type: 'fail',
                canClose: options.canClose
            });
        },
        showError(content, options = { canClose: true }) {
            bus.showDialog('warning', {
                content,
                type: 'error',
                canClose: options.canClose
            });
        },
        showSuccess(content, options = { canClose: true }) {
            bus.showDialog('warning', {
                content,
                type: 'success',
                canClose: options.canClose
            });
        },
        showNetworkError() {
            bus.showDialog('warning', {
                type: 'networkerror',
                canClose: false
            });
        },
        show: showDialogCreate('warning'),
        hide: hideDialogCreate('warning')
    }
};
