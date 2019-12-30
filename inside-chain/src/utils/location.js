"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var location = window.location;
var history = window.history;

function navigateTo(url) {
    location.href = url;
}
function redirectTo(url) {
    location.replace(url);
}
function navigateBack() {
    var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    history.go(-1 * n);
}

exports.navigateTo = navigateTo;
exports.redirectTo = redirectTo;
exports.navigateBack = navigateBack;
exports.default = {
    navigateTo: navigateTo,
    redirectTo: redirectTo,
    navigateBack: navigateBack,
    get search() {
        return location.search;
    },
    get hash() {
        return location.hash;
    },
    get href() {
        return location.href;
    },
    set href(href) {
        navigateTo(href);
    }
};