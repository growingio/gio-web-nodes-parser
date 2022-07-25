var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
// 默认的列表类标签: 'TR', 'LI', 'DL'
export var LIST_TAGS = ['TR', 'LI', 'DL'];
// 默认被认为是容器的标签: 'A', 'BUTTON', 'TR', 'LI', 'DL'
export var SUPPORTED_CONTAINER_TAGS = __spreadArray(['A', 'BUTTON'], __read(LIST_TAGS));
// 支持点击的input类型: 'button', 'submit', 'reset'
export var SUPPORTED_CLICK_INPUT_TYPES = ['button', 'submit', 'reset'];
// 支持change事件的input类型: 'radio', 'checkbox', 'search'
export var SUPPORTED_CHANGE_TYPES = ['radio', 'checkbox', 'search'];
// 支持用作icon的: 'I', 'EM', 'svg', 'IMG'
export var SUPPORTED_ICON_TAGS = ['I', 'EM', 'svg', 'IMG'];
// 不支持点击: 'TEXTAREA', 'HTML', 'BODY'
export var UNSUPPORTED_CLICK_TAGS = ['TEXTAREA', 'HTML', 'BODY'];
// 支持纯文本的标签: 'I', 'SPAN', 'EM', 'B', 'STRONG'
export var TEXT_NODE = ['I', 'SPAN', 'EM', 'B', 'STRONG'];
// 不支持的标签
export var UNSUPPORTED_TAGS = [
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
// class值过滤
export var EXCLUDE_CLASS_RE = /(^| |[^ ]+\-)(clear|clearfix|active|hover|enabled|current|selected|unselected|hidden|display|focus|disabled|undisabled|open|checked|unchecked|undefined|null|ng-|growing-)[^\. ]*/g;
export var VALID_ID_SELECTOR = /^[a-zA-Z-\_][a-zA-Z\-\_0-9]+$/;
export var VALID_CLASS_SELECTOR = /^([a-zA-Z\-\_0-9]+)$/;
// gio忽略标记
export var GROWING_IGNORE = 'data-growing-ignore';
export var GROWING_TRACK = 'data-growing-track';
export var GROWING_CONTAINER = 'data-growing-container';
export var GROWING_INDEX = 'data-growing-index';
export var GROWING_INDEX_OLD = 'data-growing-idx';
export var GROWING_CDP_INDEX = 'data-index';
export var GROWING_GTITLE = 'data-growing-title';
export var GROWING_TITLE = 'data-title';
export var GROWING_TITLE_OLD = 'growing-title';
