"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("../utils/constant");
var utils_1 = require("../utils");
var utils_2 = require("./utils");
function getId(elem) {
    var _a;
    if (!(elem instanceof Element))
        return null;
    var id = (_a = elem.id) === null || _a === void 0 ? void 0 : _a.trim();
    return id && constant_1.VALID_ID_SELECTOR.test(id) ? id : null;
}
function getKlass(elem) {
    var _a;
    if (!(elem instanceof Element))
        return [];
    var name = elem.getAttribute('name');
    if (name) {
        return [name];
    }
    if (elem.hasAttribute('class')) {
        var CLASS_SPLIT_RE = /\s+/;
        var classVal = (_a = elem
            .getAttribute('class')) === null || _a === void 0 ? void 0 : _a.replace(constant_1.EXCLUDE_CLASS_RE, '').trim();
        if (classVal === null || classVal === void 0 ? void 0 : classVal.length) {
            return classVal
                .split(CLASS_SPLIT_RE)
                .filter(function (cls) {
                return constant_1.VALID_CLASS_SELECTOR.test(cls) &&
                    !constant_1.INVALID_CAMELCASE_RE.test(cls) &&
                    !constant_1.INVALID_NUMERIC_RE.test(cls);
            })
                .sort();
        }
    }
    return [];
}
var BaseNode = (function () {
    function BaseNode(target) {
        this._parent = null;
        this.node = target;
        this.tagName = this.node.nodeName;
        this.name = this.tagName.toLowerCase();
        this.id = getId(this.node);
        this.classList = getKlass(this.node);
        this.guessListAndIndex();
    }
    BaseNode.prototype.guessListAndIndex = function () {
        var _this = this;
        var _a;
        this._tagList = (0, utils_2.isListTag)(this.node);
        var siblings = (0, utils_2.getChildren)(this.node.parentNode);
        var sameSiblings = (0, utils_2.removeDiffTagOnHeadAndTail)(siblings, this.node);
        var siblingsCount = sameSiblings.length;
        if (this._tagList) {
            var idx = sameSiblings
                .filter(function (v) { return v.tagName === _this.tagName; })
                .indexOf(this.node);
            if (idx !== -1) {
                this._index = idx + 1;
            }
        }
        if (sameSiblings.length >= 3 && !!((_a = this.classList) === null || _a === void 0 ? void 0 : _a.length)) {
            var guessIndex = 0, similarCount = 0;
            var currentTag = this.tagName;
            var currentIndex = -1;
            for (var idx = 1; idx < siblingsCount; idx++) {
                var current = sameSiblings[idx - 1];
                if (!(current instanceof Element))
                    continue;
                if (current.tagName !== currentTag) {
                    similarCount = 0;
                    break;
                }
                var currentClass = getKlass(current);
                if ((0, utils_1.arrayEquals)(this.classList, currentClass)) {
                    similarCount++;
                }
                if (this.node === current) {
                    currentIndex = idx;
                }
            }
            guessIndex = currentIndex;
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
                this._path = "/".concat(this.name);
                if (this.id) {
                    this._path += "#".concat(this.id);
                }
                if ((_a = this.classList) === null || _a === void 0 ? void 0 : _a.length) {
                    this._path += ".".concat(this.classList.join('.'));
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
        get: function () {
            var _a;
            return (_a = (0, utils_2.getMarkIndex)(this.node)) !== null && _a !== void 0 ? _a : this._index;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseNode.prototype, "container", {
        get: function () {
            return (0, utils_2.isContainerTag)(this.node) || this.list;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseNode.prototype, "parent", {
        get: function () {
            var _a;
            if (!((_a = this.node) === null || _a === void 0 ? void 0 : _a.parentNode))
                return null;
            var parentNode = this.node.parentNode;
            var cachedParent = BaseNode._parentCache.get(parentNode);
            var currentId = getId(parentNode);
            var currentClassList = getKlass(parentNode);
            var shouldUpdate = !cachedParent ||
                cachedParent.id !== currentId ||
                !(0, utils_1.arrayEquals)(cachedParent.classList, currentClassList);
            if (shouldUpdate) {
                cachedParent = new BaseNode(parentNode);
                BaseNode._parentCache.set(parentNode, cachedParent);
            }
            this._parent = cachedParent;
            return this._parent;
        },
        enumerable: false,
        configurable: true
    });
    BaseNode.prototype.parentPaths = function (withSelf) {
        if (withSelf === void 0) { withSelf = false; }
        var nodes = withSelf ? [this] : [];
        var pn = this.parent;
        while (pn && !(0, utils_2.isRootNode)(pn.node)) {
            nodes.push(pn);
            pn = pn.parent;
        }
        return nodes;
    };
    BaseNode._parentCache = new WeakMap();
    return BaseNode;
}());
exports.default = BaseNode;
