var GioNode = (function (exports) {
    'use strict';

    var __read = (undefined && undefined.__read) || function (o, n) {
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
    var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    };
    // 默认的列表类标签: 'TR', 'LI', 'DL'
    var LIST_TAGS = ['TR', 'LI', 'DL'];
    // 默认被认为是容器的标签: 'A', 'BUTTON', 'TR', 'LI', 'DL'
    var SUPPORTED_CONTAINER_TAGS = __spreadArray(['A', 'BUTTON'], __read(LIST_TAGS));
    // 支持点击的input类型: 'button', 'submit', 'reset'
    var SUPPORTED_CLICK_INPUT_TYPES = ['button', 'submit', 'reset'];
    // 支持change事件的input类型: 'radio', 'checkbox', 'search'
    var SUPPORTED_CHANGE_TYPES = ['radio', 'checkbox', 'search'];
    // 支持用作icon的: 'I', 'EM', 'svg', 'IMG'
    var SUPPORTED_ICON_TAGS = ['I', 'EM', 'svg', 'IMG'];
    // 不支持点击: 'TEXTAREA', 'HTML', 'BODY'
    var UNSUPPORTED_CLICK_TAGS = ['TEXTAREA', 'HTML', 'BODY'];
    // 支持纯文本的标签: 'I', 'SPAN', 'EM', 'B', 'STRONG'
    var TEXT_NODE = ['I', 'SPAN', 'EM', 'B', 'STRONG'];
    // 不支持的标签
    var UNSUPPORTED_TAGS = [
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
    var EXCLUDE_CLASS_RE = /(^| |[^ ]+\-)(clear|clearfix|active|hover|enabled|current|selected|unselected|hidden|display|focus|disabled|undisabled|open|checked|unchecked|undefined|null|ng-|growing-)[^\. ]*/g;
    var VALID_ID_SELECTOR = /^[a-zA-Z-\_][a-zA-Z\-\_0-9]+$/;
    var VALID_CLASS_SELECTOR = /^([a-zA-Z\-\_0-9]+)$/;
    // gio忽略标记
    var GROWING_IGNORE = 'data-growing-ignore';
    var GROWING_TRACK = 'data-growing-track';
    var GROWING_CONTAINER = 'data-growing-container';
    var GROWING_INDEX = 'data-growing-index';
    var GROWING_INDEX_OLD = 'data-growing-idx';
    var GROWING_CDP_INDEX = 'data-index';
    var GROWING_GTITLE = 'data-growing-title';
    var GROWING_TITLE = 'data-title';
    var GROWING_TITLE_OLD = 'growing-title';

    var filterText = function (text, cutOff) {
        if (cutOff === void 0) { cutOff = true; }
        if (text) {
            text = text.replace(/[\n \t]+/g, ' ').trim();
            if (text === null || text === void 0 ? void 0 : text.length) {
                return text.slice(0, cutOff ? 50 : undefined);
            }
        }
        return undefined;
    };
    var normalizePath = function (path) {
        var len = path.length;
        if (len > 1 && path.charAt(len - 1) === '/') {
            return path.slice(0, len - 1);
        }
        else {
            return path;
        }
    };
    var arrayEquals = function (source, target) {
        if (!source || !target) {
            return false;
        }
        if (source.length !== target.length) {
            return false;
        }
        for (var i = 0, l = source.length; i < l; i++) {
            if (source[i] !== target[i]) {
                return false;
            }
        }
        return true;
    };
    var findIndex = function (array, predicate) {
        if (array === null || array === undefined || typeof predicate !== 'function') {
            return -1;
        }
        for (var i = 0; i < array.length; i++) {
            var item = array[i];
            if (predicate.call(undefined, item)) {
                return i;
            }
        }
        return -1;
    };
    var lastFindIndex = function (array, predicate) {
        if (array === null || array === undefined || typeof predicate !== 'function') {
            return -1;
        }
        for (var i = array.length - 1; i >= 0; i--) {
            var item = array[i];
            if (predicate.call(undefined, item)) {
                return i;
            }
        }
        return -1;
    };

    var __read$1 = (undefined && undefined.__read) || function (o, n) {
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
    var __spreadArray$1 = (undefined && undefined.__spreadArray) || function (to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    };
    var __values = (undefined && undefined.__values) || function(o) {
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
    var hasValidAttribute = function (node, attr) {
        return node instanceof Element && node.hasAttribute(attr) && node.getAttribute(attr) !== 'false';
    };
    var isRootNode = function (node) {
        return !node || ['BODY', 'HTML', '#document'].indexOf(node.nodeName) !== -1;
    };
    var findParent = function (child, filter) {
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
    var getDeepChildren = function (parent) {
        return Array.from((parent === null || parent === void 0 ? void 0 : parent.childNodes) || []).reduce(function (result, current) {
            if (current instanceof Element) {
                return __spreadArray$1(__spreadArray$1(__spreadArray$1([], __read$1(result)), [current]), __read$1(getDeepChildren(current)));
            }
            return result;
        }, []);
    };
    var getChildren = function (parent) {
        return Array.from((parent === null || parent === void 0 ? void 0 : parent.childNodes) || []).filter(function (node) { return node instanceof Element; });
    };
    var isLeaf = function (node) {
        if (node.hasChildNodes() && node.nodeName !== 'svg') {
            return getChildren(node).length === 0;
        }
        return true;
    };
    var isParentOfLeaf = function (node) {
        if (node.hasChildNodes() && node.nodeName !== 'svg') {
            return Array.from(node.childNodes).filter(function (child) { return !isLeaf(child); }).length === 0;
        }
        return false;
    };
    var isListTag = function (node) {
        return LIST_TAGS.indexOf(node.nodeName) !== -1;
    };
    var isContainerTag = function (node) {
        return (hasValidAttribute(node, GROWING_CONTAINER) ||
            SUPPORTED_CONTAINER_TAGS.indexOf(node.nodeName) !== -1);
    };
    /**
     * 是支持作为icon的标签
     * @param node 节点
     */
    var supportIconTag = function (node) {
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
    var onlyContainsIconChildren = function (node) {
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
    var onlyContainsTextChildren = function (node) {
        if (getChildren(node).length === 0) {
            return false;
        }
        return !getDeepChildren(node)
            .map(function (child) { return child.tagName; })
            .some(function (name) { return TEXT_NODE.indexOf(name) === -1; });
    };
    var clickableInput = function (node) {
        return (node instanceof HTMLInputElement &&
            node.tagName === 'INPUT' &&
            SUPPORTED_CLICK_INPUT_TYPES.indexOf(node.type) !== -1);
    };
    var changeableInput = function (node) {
        return (node instanceof HTMLInputElement &&
            node.tagName === 'INPUT' &&
            SUPPORTED_CHANGE_TYPES.indexOf(node.type) !== -1);
    };
    var depthInside = function (node, threshold, depth) {
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
    var isIgnore = function (node) {
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
    var getEffectiveNode = function (node) {
        var getName = function (el) { var _a; return (_a = el.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase(); };
        var isSupport = function (n) { return n instanceof Element && UNSUPPORTED_TAGS.indexOf(getName(n)) === -1; };
        var isBtnWrapper = function (el) {
            return  el.tagName === 'BUTTON' && onlyContainsTextChildren(el);
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
    var getMarkIndex = function (node) {
        if (node instanceof Element) {
            var markIndex = node.getAttribute(GROWING_INDEX) ||
                node.getAttribute(GROWING_INDEX_OLD) ||
                // @TODO 取data-index作为值，后期将会删除
                node.getAttribute(GROWING_CDP_INDEX);
            if (markIndex) {
                if (/^\d{1, 10}$/.test(markIndex) && +markIndex !== 0 && +markIndex < 2147483647) {
                    return +markIndex;
                }
                else {
                    
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
    var computeXpath = function (target) {
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
    var removeDiffTagOnHeadAndTail = function (elements, target) {
        var sameNodeName = function (el) { return el.nodeName === target.nodeName; };
        var start = findIndex(elements, sameNodeName);
        var end = lastFindIndex(elements, sameNodeName);
        if (start === -1 || end === -1) {
            return [];
        }
        return elements.slice(start, end + 1);
    };

    function getId(elem) {
        if (elem.id && VALID_ID_SELECTOR.test(elem.id)) {
            return elem.id;
        }
        return null;
    }
    function getKlass(elem) {
        var _a;
        if (elem instanceof Element) {
            // 优先使用name
            var name_1 = elem.getAttribute('name');
            if (name_1) {
                return [name_1];
            }
            if (elem.hasAttribute('class')) {
                var classVal = (_a = elem.getAttribute('class')) === null || _a === void 0 ? void 0 : _a.replace(EXCLUDE_CLASS_RE, '').trim();
                if (classVal === null || classVal === void 0 ? void 0 : classVal.length) {
                    return classVal
                        .split(/\s+/)
                        .filter(function (cls) {
                        return VALID_CLASS_SELECTOR.test(cls) &&
                            !cls.match(/[a-z][A-Z][a-z][A-Z]/) &&
                            !cls.match(/[0-9][0-9][0-9][0-9]/);
                    })
                        .sort();
                }
            }
        }
        return [];
    }
    var BaseNode = /** @class */ (function () {
        function BaseNode(target) {
            this.node = target;
            this.tagName = this.node.nodeName;
            this.name = this.tagName.toLowerCase();
            this.id = getId(this.node);
            this.classList = getKlass(this.node);
            this.guessListAndIndex();
        }
        /**
         * 推测节点是不是list和其在list中的index值
         * 一、是不是list
         *    1. 是标记为list的标签
         *    2. 连续有相同class的同类标签，大于等于3的时候为伪列表
         * 二、index值
         *    1. 是list，在list中的索引
         *    2. index从1开始
         */
        BaseNode.prototype.guessListAndIndex = function () {
            var _this = this;
            var _a;
            this._tagList = isListTag(this.node);
            var sameSiblings = removeDiffTagOnHeadAndTail(getChildren(this.node.parentNode), this.node);
            if (this._tagList) {
                var idx = sameSiblings.filter(function (v) { return v.tagName === _this.tagName; }).indexOf(this.node);
                if (idx !== -1) {
                    this._index = idx + 1;
                }
            }
            if (sameSiblings.length >= 3 && !!((_a = this.classList) === null || _a === void 0 ? void 0 : _a.length)) {
                var guessIndex = 0, similarCount = 0;
                for (var idx = 1; idx <= sameSiblings.length; idx++) {
                    var current = sameSiblings[idx - 1];
                    if (current.tagName !== this.tagName) {
                        similarCount = 0;
                        break;
                    }
                    if (arrayEquals(this.classList, getKlass(current))) {
                        similarCount += 1;
                    }
                    if (this.node === current) {
                        guessIndex = idx;
                    }
                }
                if (similarCount >= 3) {
                    this._pseudoList = true;
                    this._index = this._index || guessIndex;
                }
            }
        };
        Object.defineProperty(BaseNode.prototype, "path", {
            get: function () {
                var _a;
                if (!this._path) {
                    this._path = "/" + this.name;
                    if (this.id) {
                        this._path += "#" + this.id;
                    }
                    if ((_a = this.classList) === null || _a === void 0 ? void 0 : _a.length) {
                        this._path += "." + this.classList.join('.');
                    }
                }
                return this._path;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "pseudoList", {
            get: function () {
                return !!this._pseudoList;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "list", {
            get: function () {
                return !!this._tagList || !!this._pseudoList;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "index", {
            /**
             * 当前的index不会继承父级的index
             */
            get: function () {
                return getMarkIndex(this.node) || this._index;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "container", {
            get: function () {
                return isContainerTag(this.node) || this.list;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "parent", {
            get: function () {
                if (this.node.parentNode) {
                    return new BaseNode(this.node.parentNode);
                }
                return null;
            },
            enumerable: false,
            configurable: true
        });
        BaseNode.prototype.parentPaths = function (withSelf) {
            if (withSelf === void 0) { withSelf = false; }
            var nodes = withSelf ? [this] : [];
            var pn = this.parent;
            while (pn && !isRootNode(pn.node)) {
                nodes.push(pn);
                pn = pn.parent;
            }
            return nodes;
        };
        return BaseNode;
    }());

    function getAnchorHref(anchor) {
        if (anchor.hasAttribute('href')) {
            var elemHref = anchor.getAttribute('href');
            if (elemHref && elemHref.indexOf('javascript') !== 0) {
                return normalizePath(elemHref.slice(0, 320));
            }
        }
        return undefined;
    }
    function getImgHref(image) {
        if (image.src && image.src.indexOf('data:image') === -1) {
            return image.src;
        }
        return undefined;
    }
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
        }
        return undefined;
    }

    var __values$1 = (undefined && undefined.__values) || function(o) {
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
            for (var _b = __values$1(Array.from(svg.childNodes)), _c = _b.next(); !_c.done; _c = _b.next()) {
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
            for (var _b = __values$1(Array.from(node.childNodes)), _c = _b.next(); !_c.done; _c = _b.next()) {
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
            for (var _b = __values$1(Array.from(elem.childNodes)), _c = _b.next(); !_c.done; _c = _b.next()) {
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
    function getFormContent(form) {
        var e_4, _a;
        var inputs = form.getElementsByTagName('input');
        try {
            for (var _b = __values$1(Array.from(inputs)), _c = _b.next(); !_c.done; _c = _b.next()) {
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
    function getElementContent(elem) {
        var content = _getElementContent(elem);
        return content || undefined;
    }

    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __read$2 = (undefined && undefined.__read) || function (o, n) {
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
    var VNode = /** @class */ (function (_super) {
        __extends(VNode, _super);
        function VNode(node) {
            var _this = _super.call(this, node) || this;
            _this.node = node;
            var _a = __read$2(computeXpath(_this), 3), fullXpath = _a[0], xpath = _a[1], skeleton = _a[2];
            _this.fullXpath = fullXpath;
            _this.xpath = xpath;
            _this.skeleton = skeleton;
            return _this;
        }
        Object.defineProperty(VNode.prototype, "href", {
            get: function () {
                return getElementHref(this.node);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VNode.prototype, "content", {
            get: function () {
                return getElementContent(this.node);
            },
            enumerable: false,
            configurable: true
        });
        return VNode;
    }(BaseNode));

    var __assign = (undefined && undefined.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var GioNode = /** @class */ (function () {
        function GioNode(origin, action, direct) {
            if (action === void 0) { action = null; }
            if (direct === void 0) { direct = true; }
            this.origin = origin;
            this.action = action;
            this.direct = direct;
            if ('self' === action) {
                this.target = origin;
            }
            else {
                this.target = getEffectiveNode(origin);
            }
            this.ignore = isIgnore(this.target);
            this.vnode = new VNode(this.target);
            this.tagName = this.vnode.tagName;
        }
        Object.defineProperty(GioNode.prototype, "content", {
            get: function () {
                return this.vnode.content;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GioNode.prototype, "href", {
            get: function () {
                return this.vnode.href;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GioNode.prototype, "index", {
            /**
             * 获取元素自己的index
             */
            get: function () {
                return this.vnode.index;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 推断父元素的index
         */
        GioNode.prototype.inferParentIndex = function () {
            var _this = this;
            if (!this.parentIndex) {
                findParent(this.target, function (node) {
                    var gn = new GioNode(node, _this.action, false);
                    if (gn.traceable() && gn.index) {
                        _this.parentIndex = gn.index;
                    }
                });
            }
            return this.parentIndex;
        };
        Object.defineProperty(GioNode.prototype, "xpath", {
            get: function () {
                return this.vnode.xpath;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GioNode.prototype, "fullXpath", {
            get: function () {
                return this.vnode.fullXpath;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GioNode.prototype, "skeleton", {
            get: function () {
                return this.vnode.skeleton;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 获取当前节点的信息
         * @param inferIndex 是否推断父级index，默认true
         */
        GioNode.prototype.info = function (inferIndex) {
            if (inferIndex === void 0) { inferIndex = true; }
            inferIndex && this.inferParentIndex();
            return {
                skeleton: this.skeleton,
                fullXpath: this.fullXpath,
                xpath: this.xpath,
                content: this.content,
                href: this.href,
                index: this.parentIndex || this.index
            };
        };
        /**
         * 判断是不是可追踪的
         */
        GioNode.prototype.traceable = function () {
            if (this.ignore) {
                return false;
            }
            if (this.direct) {
                if (this.action === 'click' || this.action === 'hover') {
                    if (UNSUPPORTED_CLICK_TAGS.indexOf(this.target.tagName) !== -1) {
                        return false;
                    }
                    // 不是可点击的input
                    if (this.target.tagName === 'INPUT' && !clickableInput(this.target)) {
                        return false;
                    }
                    // 如div，内部深度大于5
                    if (!isContainerTag(this.target) && !depthInside(this.target, 5)) {
                        return false;
                    }
                }
                return true;
            }
            return this.vnode.container;
        };
        /**
         * 冒泡获取所有可追踪的节点
         */
        GioNode.prototype.trackNodes = function () {
            if (!this.traceable()) {
                return [];
            }
            var trackNodes = [this];
            if ('submit' !== this.action) {
                var parent_1 = this.parentElement;
                while (parent_1) {
                    if (parent_1.ignore) {
                        return [];
                    }
                    if (parent_1.traceable()) {
                        trackNodes.unshift(parent_1);
                    }
                    parent_1 = parent_1.parentElement;
                }
            }
            var parentIndex = undefined;
            return trackNodes.map(function (gn) {
                var info = gn.info(false);
                var selfIndex = info.index;
                if (!parentIndex && selfIndex) {
                    parentIndex = selfIndex;
                }
                return __assign(__assign({}, info), { index: parentIndex || selfIndex });
            });
        };
        Object.defineProperty(GioNode.prototype, "parentElement", {
            /**
             * 获取父节点
             */
            get: function () {
                var parent = this.target.parentNode;
                if (parent && parent.nodeName && !isRootNode(parent)) {
                    return new GioNode(parent, this.action, false);
                }
                return undefined;
            },
            enumerable: false,
            configurable: true
        });
        return GioNode;
    }());

    exports.default = GioNode;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
