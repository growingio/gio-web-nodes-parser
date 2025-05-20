"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDiffTagOnHeadAndTail = exports.computeXpath = exports.getMarkIndex = exports.getEffectiveNode = exports.isIgnore = exports.depthInside = exports.changeableInput = exports.clickableInput = exports.onlyContainsTextChildren = exports.onlyContainsIconChildren = exports.supportIconTag = exports.isContainerTag = exports.isListTag = exports.isParentOfLeaf = exports.isLeaf = exports.getChildren = exports.getDeepChildren = exports.findParent = exports.isRootNode = exports.hasValidAttribute = exports.arrayFrom = void 0;
var utils_1 = require("../utils");
var constant_1 = require("../utils/constant");
var arrayFrom = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return Array.prototype.slice.call(args);
};
exports.arrayFrom = arrayFrom;
var hasValidAttribute = function (node, attr) {
    if (!(node instanceof Element))
        return false;
    var value = node.getAttribute(attr);
    return value !== null && value !== 'false';
};
exports.hasValidAttribute = hasValidAttribute;
var isRootNode = function (node) {
    if (!node)
        return true;
    var rootNames = ['BODY', 'HTML', '#document'];
    return rootNames.includes(node.nodeName);
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
    var children = [];
    var queue = [];
    var initialChildren = (0, exports.getChildren)(parent);
    queue.push.apply(queue, initialChildren);
    var index = 0;
    while (index < queue.length) {
        var current = queue[index++];
        children.push(current);
        queue.push.apply(queue, (0, exports.getChildren)(current));
    }
    return children;
};
exports.getDeepChildren = getDeepChildren;
var getChildren = function (parent) {
    try {
        if (!(parent === null || parent === void 0 ? void 0 : parent.childNodes))
            return [];
        return (0, exports.arrayFrom)(parent.childNodes).filter(function (node) { return node.nodeType === Node.ELEMENT_NODE; });
    }
    catch (error) {
        return [];
    }
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
        return ((0, exports.arrayFrom)(node.childNodes).filter(function (child) { return !(0, exports.isLeaf)(child); }).length === 0);
    }
    return false;
};
exports.isParentOfLeaf = isParentOfLeaf;
var isListTag = function (node) {
    return constant_1.LIST_TAGS.includes(node.nodeName);
};
exports.isListTag = isListTag;
var isContainerTag = function (node) {
    return ((0, exports.hasValidAttribute)(node, constant_1.GROWING_CONTAINER) ||
        constant_1.SUPPORTED_CONTAINER_TAGS.includes(node.nodeName));
};
exports.isContainerTag = isContainerTag;
var supportIconTag = function (node) {
    return constant_1.SUPPORTED_ICON_TAGS.includes(node.nodeName);
};
exports.supportIconTag = supportIconTag;
var onlyContainsIconChildren = function (node) {
    if (node.textContent) {
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
        .some(function (name) { return !constant_1.TEXT_NODE.includes(name); });
};
exports.onlyContainsTextChildren = onlyContainsTextChildren;
var clickableInput = function (node) {
    return (node instanceof HTMLInputElement &&
        constant_1.SUPPORTED_CLICK_INPUT_TYPES.includes(node.type));
};
exports.clickableInput = clickableInput;
var changeableInput = function (node) {
    return (node instanceof HTMLInputElement &&
        constant_1.SUPPORTED_CHANGE_TYPES.includes(node.type));
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
    var isSupport = function (n) {
        return n instanceof Element && !constant_1.UNSUPPORTED_TAGS.includes(getName(n));
    };
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
    if (!(node instanceof Element))
        return undefined;
    var attributes = [constant_1.GROWING_INDEX, constant_1.GROWING_INDEX_OLD, constant_1.GROWING_CDP_INDEX];
    for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
        var attr = attributes_1[_i];
        var value = node.getAttribute(attr);
        if (value === null)
            continue;
        if (/^\d{1,10}$/.test(value)) {
            var numValue = Number(value);
            if (numValue >= 0 && numValue < 2147483647) {
                return numValue;
            }
        }
        if (!false) {
            window.console.error('[GioNode]：标记的index不符合规范（index必须是大于等于0且小于2147483647的整数字）。', value);
        }
        break;
    }
    return undefined;
};
exports.getMarkIndex = getMarkIndex;
var computeXpath = function (target) {
    if (!target) {
        console.error('Invalid target node');
        return ['', '', ''];
    }
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
    var hasSameNodeName = function (el) { return el.nodeName === target.nodeName; };
    var start = (0, utils_1.findIndex)(elements, hasSameNodeName);
    if (start === -1)
        return [];
    var end = (0, utils_1.lastFindIndex)(elements, hasSameNodeName);
    if (end === -1)
        return [];
    return elements.slice(start, end + 1);
};
exports.removeDiffTagOnHeadAndTail = removeDiffTagOnHeadAndTail;
