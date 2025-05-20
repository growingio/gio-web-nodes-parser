"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementContent = exports.getFormContent = void 0;
var utils_1 = require("./utils");
var href_1 = require("./href");
var constant_1 = require("../utils/constant");
var base_node_1 = __importDefault(require("./base-node"));
var utils_2 = require("../utils");
var getFor = function (label) {
    return label.htmlFor || label.getAttribute('for');
};
var getTitle = function (node) {
    var title = node.getAttribute(constant_1.GROWING_GTITLE) ||
        node.getAttribute(constant_1.GROWING_TITLE) ||
        node.getAttribute(constant_1.GROWING_TITLE_OLD) ||
        node.getAttribute('title');
    return title === null || title === void 0 ? void 0 : title.trim();
};
function getAnchorContent(anchor) {
    if (((0, utils_1.isLeaf)(anchor) || (0, utils_1.onlyContainsIconChildren)(anchor)) &&
        anchor.textContent) {
        var text = (0, utils_2.filterText)(anchor.textContent);
        if (text) {
            return text;
        }
    }
    var href = (0, href_1.getAnchorHref)(anchor);
    if (href) {
        var index = href.indexOf('?');
        if (index > -1) {
            return href.slice(0, index);
        }
        return href;
    }
    return undefined;
}
function getButtonContent(button) {
    var _a;
    if ((_a = button.name) === null || _a === void 0 ? void 0 : _a.length) {
        return button.name;
    }
    var text = (0, utils_2.filterText)(button.textContent);
    if (text) {
        return text;
    }
    return getBestChildContent(button);
}
function getImgContent(image) {
    if (image.alt) {
        return image.alt;
    }
    var href = (0, href_1.getImgHref)(image);
    if (href) {
        var imageParts = href.split('?')[0].split('/');
        if (imageParts.length > 0) {
            return imageParts[imageParts.length - 1];
        }
    }
    return undefined;
}
function getInputContent(input) {
    if ((0, utils_1.clickableInput)(input)) {
        return input.value;
    }
    if (input.type !== 'password' && (0, utils_1.hasValidAttribute)(input, constant_1.GROWING_TRACK)) {
        return input.value;
    }
    if ((0, utils_1.changeableInput)(input)) {
        var inputLabel = (0, utils_1.findParent)(input, function (node) { return node.nodeName === 'LABEL'; });
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
            var labelText = getLabelContent(new base_node_1.default(inputLabel));
            if (labelText && labelText.length > 0) {
                return labelText + ' (' + input.checked + ')';
            }
        }
        return input.value;
    }
    return undefined;
}
function getLabelContent(node) {
    var label = node.node;
    if (node.list) {
        return getBestChildContent(label);
    }
    var text = (0, utils_2.filterText)(label.textContent);
    if (text) {
        return text;
    }
    return undefined;
}
function getSelectContent(select) {
    return ((0, utils_1.arrayFrom)(select.options)
        .filter(function (opt) { return opt.selected; })
        .map(function (opt) { return opt.label; })
        .join(', ') || select.value);
}
function getSvgContent(svg) {
    for (var _i = 0, _a = (0, utils_1.arrayFrom)(svg.childNodes); _i < _a.length; _i++) {
        var child = _a[_i];
        if (child.nodeType === Node.ELEMENT_NODE &&
            child.tagName.toLowerCase() === 'use' &&
            child.hasAttribute('xlink:href')) {
            return child.getAttribute('xlink:href');
        }
    }
    return undefined;
}
function getLeafContent(leaf) {
    var text = (0, utils_2.filterText)(leaf.textContent);
    if (text) {
        return text;
    }
    return undefined;
}
function getParentOfLeafContent(node) {
    var content = '';
    for (var _i = 0, _a = (0, utils_1.arrayFrom)(node.childNodes); _i < _a.length; _i++) {
        var childNode = _a[_i];
        content +=
            (childNode.nodeType === Node.TEXT_NODE && childNode.textContent
                ? childNode.textContent.trim()
                : '') + ' ';
    }
    return (0, utils_2.filterText)(content, false);
}
function getBestChildContent(elem) {
    var iconContent;
    var _isIcon = false;
    for (var _i = 0, _a = (0, utils_1.arrayFrom)(elem.childNodes); _i < _a.length; _i++) {
        var childNode = _a[_i];
        if (childNode.nodeType === Node.TEXT_NODE) {
            var content = (0, utils_2.filterText)(childNode.textContent);
            if (content) {
                return content;
            }
        }
        if (childNode.nodeType !== Node.ELEMENT_NODE ||
            ['INPUT', 'SELECT'].indexOf(childNode.nodeName) !== -1) {
            continue;
        }
        if (new base_node_1.default(childNode).pseudoList) {
            return undefined;
        }
        _isIcon = (0, utils_1.onlyContainsIconChildren)(childNode) || (0, utils_1.supportIconTag)(childNode);
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
    return iconContent;
}
function getFormContent(form) {
    var inputs = form.getElementsByTagName('input');
    for (var _i = 0, _a = (0, utils_1.arrayFrom)(inputs); _i < _a.length; _i++) {
        var inputElement = _a[_i];
        if (inputElement.type === 'search' ||
            (inputElement.type === 'text' &&
                (inputElement.id === 'q' ||
                    inputElement.id.indexOf('search') !== -1 ||
                    inputElement.name === 'q' ||
                    inputElement.name.indexOf('search') !== -1))) {
            if (!(0, utils_1.isIgnore)(inputElement)) {
                var content = getElementContent(inputElement);
                if (content) {
                    return content;
                }
            }
        }
    }
    return undefined;
}
exports.getFormContent = getFormContent;
function _getElementContent(elem) {
    var node = elem;
    if (!node)
        return undefined;
    var title = getTitle(node);
    if (title) {
        return title;
    }
    var baseNode = new base_node_1.default(elem);
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
        default:
    }
    if ((0, utils_1.isLeaf)(node)) {
        return getLeafContent(node);
    }
    else if ((0, utils_1.isParentOfLeaf)(node) && !(0, utils_1.onlyContainsIconChildren)(node)) {
        return getParentOfLeafContent(node);
    }
    if (baseNode.container || (0, utils_1.onlyContainsIconChildren)(elem)) {
        return getBestChildContent(node);
    }
    return undefined;
}
function getElementContent(elem) {
    var content = _getElementContent(elem);
    return content || undefined;
}
exports.getElementContent = getElementContent;
