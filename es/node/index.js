var __extends = (this && this.__extends) || (function () {
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
import BaseNode from './base-node';
import { getElementHref } from './href';
import { getElementContent } from './content';
import { computeXpath } from './utils';
var VNode = /** @class */ (function (_super) {
    __extends(VNode, _super);
    function VNode(node) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        var _a = __read(computeXpath(_this), 3), fullXpath = _a[0], xpath = _a[1], skeleton = _a[2];
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
export default VNode;
