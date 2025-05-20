"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GROWING_TITLE_OLD = exports.GROWING_TITLE = exports.GROWING_GTITLE = exports.GROWING_CDP_INDEX = exports.GROWING_INDEX_OLD = exports.GROWING_INDEX = exports.GROWING_CONTAINER = exports.GROWING_TRACK = exports.GROWING_IGNORE = exports.VALID_CLASS_SELECTOR = exports.VALID_ID_SELECTOR = exports.INVALID_NUMERIC_RE = exports.INVALID_CAMELCASE_RE = exports.EXCLUDE_CLASS_RE = exports.UNSUPPORTED_TAGS = exports.TEXT_NODE = exports.UNSUPPORTED_CLICK_TAGS = exports.SUPPORTED_ICON_TAGS = exports.SUPPORTED_CHANGE_TYPES = exports.SUPPORTED_CLICK_INPUT_TYPES = exports.SUPPORTED_CONTAINER_TAGS = exports.LIST_TAGS = void 0;
exports.LIST_TAGS = ['TR', 'LI', 'DL'];
exports.SUPPORTED_CONTAINER_TAGS = __spreadArray(['A', 'BUTTON'], exports.LIST_TAGS, true);
exports.SUPPORTED_CLICK_INPUT_TYPES = ['button', 'submit', 'reset'];
exports.SUPPORTED_CHANGE_TYPES = ['radio', 'checkbox', 'search'];
exports.SUPPORTED_ICON_TAGS = ['I', 'EM', 'svg', 'IMG'];
exports.UNSUPPORTED_CLICK_TAGS = ['TEXTAREA', 'HTML', 'BODY'];
exports.TEXT_NODE = ['I', 'SPAN', 'EM', 'B', 'STRONG'];
exports.UNSUPPORTED_TAGS = [
    'tspan',
    'text',
    'g',
    'rect',
    'path',
    'defs',
    'clippath',
    'desc',
    'title',
    'math',
    'use'
];
exports.EXCLUDE_CLASS_RE = /(^| |[^ ]+\-)(clear|clearfix|active|hover|enabled|current|selected|unselected|hidden|display|focus|disabled|undisabled|open|checked|unchecked|undefined|null|ng-|growing-)[^\. ]*/g;
exports.INVALID_CAMELCASE_RE = /^[a-z][A-Za-z]*$/;
exports.INVALID_NUMERIC_RE = /^[0-9]+$/;
exports.VALID_ID_SELECTOR = /^[a-zA-Z-\_][a-zA-Z\-\_0-9]+$/;
exports.VALID_CLASS_SELECTOR = /^([a-zA-Z\-\_0-9]+)$/;
exports.GROWING_IGNORE = 'data-growing-ignore';
exports.GROWING_TRACK = 'data-growing-track';
exports.GROWING_CONTAINER = 'data-growing-container';
exports.GROWING_INDEX = 'data-growing-index';
exports.GROWING_INDEX_OLD = 'data-growing-idx';
exports.GROWING_CDP_INDEX = 'data-index';
exports.GROWING_GTITLE = 'data-growing-title';
exports.GROWING_TITLE = 'data-title';
exports.GROWING_TITLE_OLD = 'growing-title';
