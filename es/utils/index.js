"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastFindIndex = exports.findIndex = exports.arrayEquals = exports.rmBlank = exports.normalizePath = exports.splitNoEmpty = exports.filterText = void 0;
var WHITESPACE_REGEX = /\s+/g;
var filterText = function (text, cutOff) {
    if (cutOff === void 0) { cutOff = true; }
    if (!text)
        return '';
    var processed = text.replace(WHITESPACE_REGEX, ' ').trim();
    return cutOff && processed.length > 50 ? processed.slice(0, 50) : processed;
};
exports.filterText = filterText;
var splitNoEmpty = function (source, separator) {
    return !source ? [] : source.split(separator).filter(function (v) { return !!v; });
};
exports.splitNoEmpty = splitNoEmpty;
var normalizePath = function (path) { return path.replace(/\/+$/g, '') || '/'; };
exports.normalizePath = normalizePath;
var rmBlank = function (str) {
    return str ? str.replace(/[\n \t]+/g, '') : '';
};
exports.rmBlank = rmBlank;
var arrayEquals = function (source, target) {
    return (!!source &&
        !!target &&
        source.length === target.length &&
        source.every(function (val, i) { return val === target[i]; }));
};
exports.arrayEquals = arrayEquals;
var findIndex = function (array, predicate) {
    if (!Array.isArray(array) || typeof predicate !== 'function')
        return -1;
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (predicate(item)) {
            return i;
        }
    }
    return -1;
};
exports.findIndex = findIndex;
var lastFindIndex = function (array, predicate) {
    if (array === null ||
        array === undefined ||
        typeof predicate !== 'function') {
        return -1;
    }
    for (var i = array.length - 1; i >= 0; i--) {
        var item = array[i];
        if (predicate(item)) {
            return i;
        }
    }
    return -1;
};
exports.lastFindIndex = lastFindIndex;
