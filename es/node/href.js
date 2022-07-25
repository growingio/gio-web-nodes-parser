import { normalizePath } from '../utils';
export function getAnchorHref(anchor) {
    if (anchor.hasAttribute('href')) {
        var elemHref = anchor.getAttribute('href');
        if (elemHref && elemHref.indexOf('javascript') !== 0) {
            return normalizePath(elemHref.slice(0, 320));
        }
    }
    return undefined;
}
export function getImgHref(image) {
    if (image.src && image.src.indexOf('data:image') === -1) {
        return image.src;
    }
    return undefined;
}
export function getElementHref(elem) {
    var node = elem;
    if (!node)
        return undefined;
    var name = elem.nodeName.toLowerCase();
    switch (name) {
        case 'a':
            return getAnchorHref(node);
        case 'img':
            return getImgHref(node);
    }
    return undefined;
}
