var __assign = (this && this.__assign) || function () {
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
import { UNSUPPORTED_CLICK_TAGS } from './utils/constant';
import { clickableInput, depthInside, findParent, getEffectiveNode, isContainerTag, isIgnore, isRootNode } from './node/utils';
import VNode from './node';
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
export default GioNode;
