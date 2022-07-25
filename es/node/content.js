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
import { changeableInput, clickableInput, findParent, hasValidAttribute, supportIconTag, isIgnore, isLeaf, isParentOfLeaf, onlyContainsIconChildren } from './utils';
import { getAnchorHref, getImgHref } from './href';
import { GROWING_GTITLE, GROWING_TITLE, GROWING_TITLE_OLD, GROWING_TRACK } from '../utils/constant';
import BaseNode from './base-node';
import { filterText } from '../utils';
var getFor = function (label) {
    return label.htmlFor || label.getAttribute('for');
};
var getTitle = function (node) {
    var title = node.getAttribute(GROWING_GTITLE) ||
        node.getAttribute(GROWING_TITLE) ||
        node.getAttribute(GROWING_TITLE_OLD) ||
        node.getAttribute('title');
    return (title === null || title === void 0 ? void 0 : title.trim()) || undefined;
};
/**
 * 获取a标签的内容
 * @param anchor
 */
function getAnchorContent(anchor) {
    if ((isLeaf(anchor) || onlyContainsIconChildren(anchor)) && anchor.textContent) {
        var text = filterText(anchor.textContent);
        if (text) {
            return text;
        }
    }
    var href = getAnchorHref(anchor);
    if (href) {
        var index = href.indexOf('?');
        if (index > -1) {
            return href.slice(0, index);
        }
        return href;
    }
    return undefined;
}
/**
 * 获取button的内容
 * @param button
 */
function getButtonContent(button) {
    var _a;
    if (!!((_a = button.name) === null || _a === void 0 ? void 0 : _a.length)) {
        return button.name;
    }
    var text = filterText(button.textContent);
    if (text) {
        return text;
    }
    return getBestChildContent(button);
}
/**
 * 获取img的内容
 * @param image
 */
function getImgContent(image) {
    if (image.alt) {
        return image.alt;
    }
    var href = getImgHref(image);
    if (href) {
        var imageParts = href.split('?')[0].split('/');
        if (imageParts.length > 0) {
            return imageParts[imageParts.length - 1];
        }
    }
    return undefined;
}
/**
 * 获取input的内容
 * @param input
 */
function getInputContent(input) {
    if (clickableInput(input)) {
        return input.value;
    }
    if (input.type !== 'password' && hasValidAttribute(input, GROWING_TRACK)) {
        return input.value;
    }
    if (changeableInput(input)) {
        // 查找与该input有关的label标签，拼接内容作为最终值
        var inputLabel = findParent(input, function (node) { return node.nodeName === 'LABEL'; });
        // 查找for属性和id一致的label
        if (!inputLabel && input.id) {
            var labels = document.body.getElementsByTagName('label');
            for (var i = 0; i < labels.length; i++) {
                var label = labels[i];
                if (getFor(label) === input.id) {
                    inputLabel = label;
                    break;
                }
            }
        }
        if (inputLabel) {
            var labelText = getLabelContent(new BaseNode(inputLabel));
            if (labelText && labelText.length > 0) {
                return labelText + ' (' + input.checked + ')';
            }
        }
        return input.value;
    }
    return undefined;
}
/**
 * 获取label的内容
 * @param node
 */
function getLabelContent(node) {
    var label = node.node;
    if (node.list) {
        return getBestChildContent(label);
    }
    var text = filterText(label.textContent);
    if (text) {
        return text;
    }
    return undefined;
}
/**
 * 获取select的内容
 * @param select
 */
function getSelectContent(select) {
    return (Array.from(select.options)
        .filter(function (opt) { return opt.selected; })
        .map(function (opt) { return opt.label; })
        .join(', ') || select.value);
}
/**
 * 获取svg的内容
 * @param svg
 */
function getSvgContent(svg) {
    var e_1, _a;
    try {
        for (var _b = __values(Array.from(svg.childNodes)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var child = _c.value;
            if (child.nodeType === Node.ELEMENT_NODE &&
                child.tagName.toLowerCase() === 'use' &&
                child.hasAttribute('xlink:href')) {
                return child.getAttribute('xlink:href');
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return undefined;
}
/**
 * 获取叶子节点的内容
 * @param leaf
 */
function getLeafContent(leaf) {
    var text = filterText(leaf.textContent);
    if (text) {
        return text;
    }
    return undefined;
}
/**
 * 获取二级子节点的内容
 * @param node
 */
function getParentOfLeafContent(node) {
    var e_2, _a;
    var content = '';
    try {
        for (var _b = __values(Array.from(node.childNodes)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var childNode = _c.value;
            content +=
                (childNode.nodeType === Node.TEXT_NODE && childNode.textContent
                    ? childNode.textContent.trim()
                    : '') + ' ';
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return filterText(content, false);
}
/**
 * 获取一个最合适的子元素作为内容
 * @param elem
 */
function getBestChildContent(elem) {
    var e_3, _a;
    var iconContent = undefined, _isIcon = false;
    try {
        for (var _b = __values(Array.from(elem.childNodes)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var childNode = _c.value;
            if (childNode.nodeType === Node.TEXT_NODE) {
                var content = filterText(childNode.textContent);
                if (content) {
                    return content;
                }
            }
            if (childNode.nodeType !== Node.ELEMENT_NODE ||
                ['INPUT', 'SELECT'].indexOf(childNode.nodeName) !== -1) {
                continue;
            }
            // 子节点中存在伪列表，则无内容
            if (new BaseNode(childNode).pseudoList) {
                return undefined;
            }
            _isIcon = onlyContainsIconChildren(childNode) || supportIconTag(childNode);
            var childContent = getElementContent(childNode);
            if (_isIcon) {
                iconContent = childContent;
                _isIcon = false;
            }
            else {
                if (!childContent) {
                    childContent = getBestChildContent(childNode);
                }
                if (childContent) {
                    return childContent;
                }
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return iconContent;
}
/**
 * 获取表单的内容，仅在submit中使用
 * @param form
 */
export function getFormContent(form) {
    var e_4, _a;
    var inputs = form.getElementsByTagName('input');
    try {
        for (var _b = __values(Array.from(inputs)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var inputElement = _c.value;
            if (inputElement.type === 'search' ||
                (inputElement.type === 'text' &&
                    (inputElement.id === 'q' ||
                        inputElement.id.indexOf('search') !== -1 ||
                        inputElement.name === 'q' ||
                        inputElement.name.indexOf('search') !== -1))) {
                if (!isIgnore(inputElement)) {
                    var content = getElementContent(inputElement);
                    if (content) {
                        return content;
                    }
                }
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return undefined;
}
/**
 * 获取元素内容
 * @param elem
 */
function _getElementContent(elem) {
    var node = elem;
    if (!node)
        return undefined;
    var title = getTitle(node);
    if (title) {
        return title;
    }
    var baseNode = new BaseNode(elem);
    var tagName = elem.nodeName.toLowerCase();
    switch (tagName) {
        case 'a':
            return getAnchorContent(node);
        case 'svg':
            return getSvgContent(node);
        case 'button':
            return getButtonContent(node);
        case 'img':
            return getImgContent(node);
        case 'label':
            return getLabelContent(baseNode);
        case 'input':
            return getInputContent(node);
        case 'select':
            return getSelectContent(node);
        case 'form':
            return getFormContent(node);
    }
    if (isLeaf(node)) {
        return getLeafContent(node);
    }
    else if (isParentOfLeaf(node) && !onlyContainsIconChildren(node)) {
        return getParentOfLeafContent(node);
    }
    if (baseNode.container || onlyContainsIconChildren(elem)) {
        return getBestChildContent(node);
    }
    return undefined;
}
export function getElementContent(elem) {
    var content = _getElementContent(elem);
    return content || undefined;
}
