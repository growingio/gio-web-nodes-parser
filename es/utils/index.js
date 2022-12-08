"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastFindIndex = exports.findIndex = exports.arrayEquals = exports.rmBlank = exports.normalizePath = exports.splitNoEmpty = exports.filterText = void 0;
var filterText = function (text, cutOff) {
    if (cutOff === void 0) { cutOff = true; }
    if (text) {
        text = text.replace(/[\n \t]+/g, ' ').trim();
        if (text === null || text === void 0 ? void 0 : text.length) {
            return text.slice(0, cutOff ? 50 : undefined);
        }
    }
    return undefined;
};
exports.filterText = filterText;
var splitNoEmpty = function (source, separator) {
    return !source ? [] : source.split(separator).filter(function (v) { return !!v; });
};
exports.splitNoEmpty = splitNoEmpty;
var normalizePath = function (path) {
    var len = path.length;
    if (len > 1 && path.charAt(len - 1) === '/') {
        return path.slice(0, len - 1);
    }
    else {
        return path;
    }
};
exports.normalizePath = normalizePath;
var rmBlank = function (str) {
    return str ? str.replace(/[\n \t]+/g, '') : '';
};
exports.rmBlank = rmBlank;
var arrayEquals = function (source, target) {
    if (!source || !target) {
        return false;
    }
    if (source.length !== target.length) {
        return false;
    }
    for (var i = 0, l = source.length; i < l; i++) {
        if (source[i] !== target[i]) {
            return false;
        }
    }
    return true;
};
exports.arrayEquals = arrayEquals;
var findIndex = function (array, predicate) {
    if (array === null || array === undefined || typeof predicate !== 'function') {
        return -1;
    }
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (predicate.call(undefined, item)) {
            return i;
        }
    }
    return -1;
};
exports.findIndex = findIndex;
var lastFindIndex = function (array, predicate) {
    if (array === null || array === undefined || typeof predicate !== 'function') {
        return -1;
    }
    for (var i = array.length - 1; i >= 0; i--) {
        var item = array[i];
        if (predicate.call(undefined, item)) {
            return i;
        }
    }
    return -1;
};
exports.lastFindIndex = lastFindIndex;
