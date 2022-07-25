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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { findIndex, lastFindIndex } from '../utils';
import { GROWING_CDP_INDEX, GROWING_CONTAINER, GROWING_IGNORE, GROWING_INDEX, GROWING_INDEX_OLD, LIST_TAGS, SUPPORTED_CHANGE_TYPES, SUPPORTED_CLICK_INPUT_TYPES, SUPPORTED_CONTAINER_TAGS, SUPPORTED_ICON_TAGS, TEXT_NODE, UNSUPPORTED_TAGS } from '../utils/constant';
export var hasValidAttribute = function (node, attr) {
    return node instanceof Element && node.hasAttribute(attr) && node.getAttribute(attr) !== 'false';
};
export var isRootNode = function (node) {
    return !node || ['BODY', 'HTML', '#document'].indexOf(node.nodeName) !== -1;
};
export var findParent = function (child, filter) {
    var parent = child.parentNode;
    while (parent && !isRootNode(parent)) {
        if (filter(parent)) {
            return parent;
        }
        parent = parent.parentNode;
    }
    return undefined;
};
/**
 * 获取当前元素的所有子元素
 * @param parent
 */
export var getDeepChildren = function (parent) {
    return Array.from((parent === null || parent === void 0 ? void 0 : parent.childNodes) || []).reduce(function (result, current) {
        if (current instanceof Element) {
            return __spreadArray(__spreadArray(__spreadArray([], __read(result)), [current]), __read(getDeepChildren(current)));
        }
        return result;
    }, []);
};
export var getChildren = function (parent) {
    return Array.from((parent === null || parent === void 0 ? void 0 : parent.childNodes) || []).filter(function (node) { return node instanceof Element; });
};
export var isLeaf = function (node) {
    if (node.hasChildNodes() && node.nodeName !== 'svg') {
        return getChildren(node).length === 0;
    }
    return true;
};
export var isParentOfLeaf = function (node) {
    if (node.hasChildNodes() && node.nodeName !== 'svg') {
        return (Array.from(node.childNodes).filter(function (child) { return !isLeaf(child); }).length === 0);
    }
    return false;
};
export var isListTag = function (node) {
    return LIST_TAGS.indexOf(node.nodeName) !== -1;
};
export var isContainerTag = function (node) {
    return (hasValidAttribute(node, GROWING_CONTAINER) ||
        SUPPORTED_CONTAINER_TAGS.indexOf(node.nodeName) !== -1);
};
/**
 * 是支持作为icon的标签
 * @param node 节点
 */
export var supportIconTag = function (node) {
    var name = node.nodeName;
    return SUPPORTED_ICON_TAGS.indexOf(name) !== -1;
};
/**
 * 判断是不是只包含icon标签
 *  1. 当前节点无值
 *  2. 必有是有子节点(不包括文本节点)的
 *  3. 所有子节点都要是icon节点
 * @param node 节点
 */
export var onlyContainsIconChildren = function (node) {
    var e_1, _a;
    if (!!node.textContent) {
        return false;
    }
    var childes = getChildren(node);
    if (childes.length === 0) {
        return false;
    }
    try {
        for (var childes_1 = __values(childes), childes_1_1 = childes_1.next(); !childes_1_1.done; childes_1_1 = childes_1.next()) {
            var child = childes_1_1.value;
            if (!supportIconTag(child) && child.nodeName !== 'SPAN') {
                return false;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (childes_1_1 && !childes_1_1.done && (_a = childes_1.return)) _a.call(childes_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return true;
};
export var onlyContainsTextChildren = function (node) {
    if (getChildren(node).length === 0) {
        return false;
    }
    return !getDeepChildren(node)
        .map(function (child) { return child.tagName; })
        .some(function (name) { return TEXT_NODE.indexOf(name) === -1; });
};
export var clickableInput = function (node) {
    return (node instanceof HTMLInputElement &&
        node.tagName === 'INPUT' &&
        SUPPORTED_CLICK_INPUT_TYPES.indexOf(node.type) !== -1);
};
export var changeableInput = function (node) {
    return (node instanceof HTMLInputElement &&
        node.tagName === 'INPUT' &&
        SUPPORTED_CHANGE_TYPES.indexOf(node.type) !== -1);
};
export var depthInside = function (node, threshold, depth) {
    if (threshold === void 0) { threshold = 4; }
    if (depth === void 0) { depth = 1; }
    if (depth > threshold) {
        return false;
    }
    // svg认为是一个整体
    var childs = node.tagName === 'svg' ? [] : getChildren(node);
    for (var i = 0; i < childs.length; i++) {
        var child = childs[i];
        if (!depthInside(child, threshold, depth + 1)) {
            return false;
        }
    }
    return depth <= threshold;
};
/**
 * 判断当前节点是不是被忽略追踪
 * 向上继承
 * 1. 不是元素
 * 2. 标记了忽略
 * @param node
 */
export var isIgnore = function (node) {
    var ignore = !(node instanceof Element) || hasValidAttribute(node, GROWING_IGNORE);
    if (ignore) {
        return true;
    }
    var parent = node.parentNode;
    while (parent && !isRootNode(parent)) {
        if (hasValidAttribute(parent, GROWING_IGNORE)) {
            return true;
        }
        parent = parent.parentNode;
    }
    return false;
};
/**
 * 获取有效的节点
 *
 * 1. 不支持的节点会向上进行查找到最近的一个有效节点
 * 2. (a | button) > TEXT_NODE{span,i...} 取值到a|button
 * @type {TEXT_NODE}
 * @param node 当前触发的节点
 */
export var getEffectiveNode = function (node) {
    var getName = function (el) { var _a; return (_a = el.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase(); };
    var isSupport = function (n) { return n instanceof Element && UNSUPPORTED_TAGS.indexOf(getName(n)) === -1; };
    var isBtnWrapper = function (el) {
        return !false && el.tagName === 'BUTTON' && onlyContainsTextChildren(el);
    };
    while (node && !isSupport(node) && node.parentNode) {
        node = node.parentNode;
    }
    var parentNode = node.parentNode;
    if (!isRootNode(parentNode) &&
        (onlyContainsIconChildren(parentNode) || isBtnWrapper(parentNode))) {
        return parentNode;
    }
    return node;
};
export var getMarkIndex = function (node) {
    if (node instanceof Element) {
        var markIndex = node.getAttribute(GROWING_INDEX) ||
            node.getAttribute(GROWING_INDEX_OLD) ||
            // @TODO 取data-index作为值，后期将会删除
            node.getAttribute(GROWING_CDP_INDEX);
        if (markIndex) {
            if (/^\d{1,10}$/.test(markIndex) && +markIndex > 0 && +markIndex < 2147483647) {
                return +markIndex;
            }
            else {
                !false &&
                    window.console.error('[GioNode]：标记的index不符合规范（index必须是大于0且小于2147483647的整数字）。', markIndex);
            }
        }
    }
    return undefined;
};
/**
 * 计算元素xpath的值
 *
 * xpath截取规则：节点层数>10，最大5层否则最大4层
 *
 * @param target 要计算的元素
 * @return [fullXpath, xpath, skeleton] 完整的xpath 截取后的xpath 完整骨架
 */
export var computeXpath = function (target) {
    /**
     * <div>
     *   <p>
     *     <span></span>
     *   </p>
     * </div>
     * span的paths为 span p div
     */
    var nodePaths = target.parentPaths(true);
    var maxLayers = Math.min(nodePaths.length, 4 + +(nodePaths.length >= 10));
    var xpaths = ['', '', ''];
    for (var i = 0; i < nodePaths.length; i++) {
        var path = nodePaths[i].path;
        var name_1 = nodePaths[i].name;
        xpaths[0] = path + xpaths[0];
        xpaths[2] = "/" + name_1 + xpaths[2];
        if (i < maxLayers) {
            xpaths[1] = path + xpaths[1];
        }
    }
    return xpaths;
};
/**
 * 去除头尾和target不一样类型的标签
 * 仅仅去除头尾的，遇到一样的标签后就不算头尾了
 * @param elements
 * @param target
 */
export var removeDiffTagOnHeadAndTail = function (elements, target) {
    var sameNodeName = function (el) { return el.nodeName === target.nodeName; };
    var start = findIndex(elements, sameNodeName);
    var end = lastFindIndex(elements, sameNodeName);
    if (start === -1 || end === -1) {
        return [];
    }
    return elements.slice(start, end + 1);
};
