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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDiffTagOnHeadAndTail = exports.computeXpath = exports.getMarkIndex = exports.getEffectiveNode = exports.isIgnore = exports.depthInside = exports.changeableInput = exports.clickableInput = exports.onlyContainsTextChildren = exports.onlyContainsIconChildren = exports.supportIconTag = exports.isContainerTag = exports.isListTag = exports.isParentOfLeaf = exports.isLeaf = exports.getChildren = exports.getDeepChildren = exports.findParent = exports.isRootNode = exports.hasValidAttribute = void 0;
var utils_1 = require("../utils");
var constant_1 = require("../utils/constant");
var array_from_1 = __importDefault(require("array-from"));
var hasValidAttribute = function (node, attr) {
    return node instanceof Element && node.hasAttribute(attr) && node.getAttribute(attr) !== 'false';
};
exports.hasValidAttribute = hasValidAttribute;
var isRootNode = function (node) {
    return !node || ['BODY', 'HTML', '#document'].indexOf(node.nodeName) !== -1;
};
exports.isRootNode = isRootNode;
var findParent = function (child, filter) {
    var parent = child.parentNode;
    while (parent && !(0, exports.isRootNode)(parent)) {
        if (filter(parent)) {
            return parent;
        }
        parent = parent.parentNode;
    }
    return undefined;
};
exports.findParent = findParent;
var getDeepChildren = function (parent) {
    return (0, array_from_1.default)((parent === null || parent === void 0 ? void 0 : parent.childNodes) || []).reduce(function (result, current) {
        if (current instanceof Element) {
            return __spreadArray(__spreadArray(__spreadArray([], result, true), [current], false), (0, exports.getDeepChildren)(current), true);
        }
        return result;
    }, []);
};
exports.getDeepChildren = getDeepChildren;
var getChildren = function (parent) {
    return (0, array_from_1.default)((parent === null || parent === void 0 ? void 0 : parent.childNodes) || []).filter(function (node) { return node instanceof Element; });
};
exports.getChildren = getChildren;
var isLeaf = function (node) {
    if (node.hasChildNodes() && node.nodeName !== 'svg') {
        return (0, exports.getChildren)(node).length === 0;
    }
    return true;
};
exports.isLeaf = isLeaf;
var isParentOfLeaf = function (node) {
    if (node.hasChildNodes() && node.nodeName !== 'svg') {
        return (0, array_from_1.default)(node.childNodes).filter(function (child) { return !(0, exports.isLeaf)(child); }).length === 0;
    }
    return false;
};
exports.isParentOfLeaf = isParentOfLeaf;
var isListTag = function (node) {
    return constant_1.LIST_TAGS.indexOf(node.nodeName) !== -1;
};
exports.isListTag = isListTag;
var isContainerTag = function (node) {
    return ((0, exports.hasValidAttribute)(node, constant_1.GROWING_CONTAINER) ||
        constant_1.SUPPORTED_CONTAINER_TAGS.indexOf(node.nodeName) !== -1);
};
exports.isContainerTag = isContainerTag;
var supportIconTag = function (node) {
    var name = node.nodeName;
    return constant_1.SUPPORTED_ICON_TAGS.indexOf(name) !== -1;
};
exports.supportIconTag = supportIconTag;
var onlyContainsIconChildren = function (node) {
    if (!!node.textContent) {
        return false;
    }
    var childes = (0, exports.getChildren)(node);
    if (childes.length === 0) {
        return false;
    }
    for (var _i = 0, childes_1 = childes; _i < childes_1.length; _i++) {
        var child = childes_1[_i];
        if (!(0, exports.supportIconTag)(child) && child.nodeName !== 'SPAN') {
            return false;
        }
    }
    return true;
};
exports.onlyContainsIconChildren = onlyContainsIconChildren;
var onlyContainsTextChildren = function (node) {
    if ((0, exports.getChildren)(node).length === 0) {
        return false;
    }
    return !(0, exports.getDeepChildren)(node)
        .map(function (child) { return child.tagName; })
        .some(function (name) { return constant_1.TEXT_NODE.indexOf(name) === -1; });
};
exports.onlyContainsTextChildren = onlyContainsTextChildren;
var clickableInput = function (node) {
    return (node instanceof HTMLInputElement &&
        node.tagName === 'INPUT' &&
        constant_1.SUPPORTED_CLICK_INPUT_TYPES.indexOf(node.type) !== -1);
};
exports.clickableInput = clickableInput;
var changeableInput = function (node) {
    return (node instanceof HTMLInputElement &&
        node.tagName === 'INPUT' &&
        constant_1.SUPPORTED_CHANGE_TYPES.indexOf(node.type) !== -1);
};
exports.changeableInput = changeableInput;
var depthInside = function (node, threshold, depth) {
    if (threshold === void 0) { threshold = 4; }
    if (depth === void 0) { depth = 1; }
    if (depth > threshold) {
        return false;
    }
    var childs = node.tagName === 'svg' ? [] : (0, exports.getChildren)(node);
    for (var i = 0; i < childs.length; i++) {
        var child = childs[i];
        if (!(0, exports.depthInside)(child, threshold, depth + 1)) {
            return false;
        }
    }
    return depth <= threshold;
};
exports.depthInside = depthInside;
var isIgnore = function (node) {
    var ignore = !(node instanceof Element) || (0, exports.hasValidAttribute)(node, constant_1.GROWING_IGNORE);
    if (ignore) {
        return true;
    }
    var parent = node.parentNode;
    while (parent && !(0, exports.isRootNode)(parent)) {
        if ((0, exports.hasValidAttribute)(parent, constant_1.GROWING_IGNORE)) {
            return true;
        }
        parent = parent.parentNode;
    }
    return false;
};
exports.isIgnore = isIgnore;
var getEffectiveNode = function (node) {
    var getName = function (el) { var _a; return (_a = el.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase(); };
    var isSupport = function (n) { return n instanceof Element && constant_1.UNSUPPORTED_TAGS.indexOf(getName(n)) === -1; };
    var isBtnWrapper = function (el) {
        return !false && el.tagName === 'BUTTON' && (0, exports.onlyContainsTextChildren)(el);
    };
    while (node && !isSupport(node) && node.parentNode) {
        node = node.parentNode;
    }
    var parentNode = node.parentNode;
    if (!(0, exports.isRootNode)(parentNode) &&
        ((0, exports.onlyContainsIconChildren)(parentNode) || isBtnWrapper(parentNode))) {
        return parentNode;
    }
    return node;
};
exports.getEffectiveNode = getEffectiveNode;
var getMarkIndex = function (node) {
    if (node instanceof Element) {
        var markIndex = node.getAttribute(constant_1.GROWING_INDEX) ||
            node.getAttribute(constant_1.GROWING_INDEX_OLD) ||
            node.getAttribute(constant_1.GROWING_CDP_INDEX);
        if (markIndex) {
            if (/^\d{1,10}$/.test(markIndex) && +markIndex >= 0 && +markIndex < 2147483647) {
                return +markIndex;
            }
            else {
                !false &&
                    window.console.error('[GioNode]：标记的index不符合规范（index必须是大于等于0且小于2147483647的整数字）。', markIndex);
            }
        }
    }
    return undefined;
};
exports.getMarkIndex = getMarkIndex;
var computeXpath = function (target) {
    var nodePaths = target.parentPaths(true);
    var maxLayers = Math.min(nodePaths.length, 4 + +(nodePaths.length >= 10));
    var xpaths = ['', '', ''];
    for (var i = 0; i < nodePaths.length; i++) {
        var path = nodePaths[i].path;
        var name_1 = nodePaths[i].name;
        xpaths[0] = path + xpaths[0];
        xpaths[2] = "/".concat(name_1) + xpaths[2];
        if (i < maxLayers) {
            xpaths[1] = path + xpaths[1];
        }
    }
    return xpaths;
};
exports.computeXpath = computeXpath;
var removeDiffTagOnHeadAndTail = function (elements, target) {
    var sameNodeName = function (el) { return el.nodeName === target.nodeName; };
    var start = (0, utils_1.findIndex)(elements, sameNodeName);
    var end = (0, utils_1.lastFindIndex)(elements, sameNodeName);
    if (start === -1 || end === -1) {
        return [];
    }
    return elements.slice(start, end + 1);
};
exports.removeDiffTagOnHeadAndTail = removeDiffTagOnHeadAndTail;
