(function () {
    'use strict';

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
    var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var constant_1 = require("./utils/constant");
    var utils_1 = require("./node/utils");
    var node_1 = __importDefault(require("./node"));
    var GioNode = (function () {
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
                this.target = (0, utils_1.getEffectiveNode)(origin);
            }
            this.ignore = (0, utils_1.isIgnore)(this.target);
            this.vnode = new node_1.default(this.target);
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
            get: function () {
                return this.vnode.index;
            },
            enumerable: false,
            configurable: true
        });
        GioNode.prototype.inferParentIndex = function () {
            var _this = this;
            if (!this.parentIndex) {
                (0, utils_1.findParent)(this.target, function (node) {
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
        GioNode.prototype.traceable = function () {
            if (this.ignore) {
                return false;
            }
            if (this.direct) {
                if (this.action === 'click' || this.action === 'hover') {
                    if (constant_1.UNSUPPORTED_CLICK_TAGS.indexOf(this.target.tagName) !== -1) {
                        return false;
                    }
                    if (this.target.tagName === 'INPUT' && !(0, utils_1.clickableInput)(this.target)) {
                        return false;
                    }
                    if (!(0, utils_1.isContainerTag)(this.target) && !(0, utils_1.depthInside)(this.target, 5)) {
                        return false;
                    }
                }
                return true;
            }
            return this.vnode.container;
        };
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
            get: function () {
                var parent = this.target.parentNode;
                if (parent && parent.nodeName && !(0, utils_1.isRootNode)(parent)) {
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

})();
