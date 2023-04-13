"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("../utils/constant");
var utils_1 = require("../utils");
var utils_2 = require("./utils");
function getId(elem) {
    if (elem.id && constant_1.VALID_ID_SELECTOR.test(elem.id)) {
        return elem.id;
    }
    return null;
}
function getKlass(elem) {
    var _a;
    if (elem instanceof Element) {
        var name_1 = elem.getAttribute('name');
        if (name_1) {
            return [name_1];
        }
        if (elem.hasAttribute('class')) {
            var classVal = (_a = elem.getAttribute('class')) === null || _a === void 0 ? void 0 : _a.replace(constant_1.EXCLUDE_CLASS_RE, '').trim();
            if (classVal === null || classVal === void 0 ? void 0 : classVal.length) {
                return classVal
                    .split(/\s+/)
                    .filter(function (cls) {
                    return constant_1.VALID_CLASS_SELECTOR.test(cls) &&
                        !cls.match(/[a-z][A-Z][a-z][A-Z]/) &&
                        !cls.match(/[0-9][0-9][0-9][0-9]/);
                })
                    .sort();
            }
        }
    }
    return [];
}
var BaseNode = (function () {
    function BaseNode(target) {
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
        var sameSiblings = (0, utils_2.removeDiffTagOnHeadAndTail)((0, utils_2.getChildren)(this.node.parentNode), this.node);
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
                if ((0, utils_1.arrayEquals)(this.classList, getKlass(current))) {
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
        while (pn && !(0, utils_2.isRootNode)(pn.node)) {
            nodes.push(pn);
            pn = pn.parent;
        }
        return nodes;
    };
    return BaseNode;
}());
exports.default = BaseNode;
