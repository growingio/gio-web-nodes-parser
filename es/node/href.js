"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementHref = exports.getImgHref = exports.getAnchorHref = void 0;
var utils_1 = require("../utils");
function getAnchorHref(anchor) {
    if (anchor.hasAttribute('href')) {
        var elemHref = anchor.getAttribute('href');
        if (elemHref && elemHref.indexOf('javascript') !== 0) {
            return (0, utils_1.normalizePath)(elemHref.slice(0, 320));
        }
    }
    return undefined;
}
exports.getAnchorHref = getAnchorHref;
function getImgHref(image) {
    if (image.src && image.src.indexOf('data:image') === -1) {
        return image.src;
    }
    return undefined;
}
exports.getImgHref = getImgHref;
function getElementHref(elem) {
    var node = elem;
    if (!node)
        return undefined;
    var name = elem.nodeName.toLowerCase();
    switch (name) {
        case 'a':
            return getAnchorHref(node);
        case 'img':
            return getImgHref(node);
        default:
    }
    return undefined;
}
exports.getElementHref = getElementHref;
