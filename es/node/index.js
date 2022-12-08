"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_node_1 = __importDefault(require("./base-node"));
var href_1 = require("./href");
var content_1 = require("./content");
var utils_1 = require("./utils");
var VNode = (function (_super) {
    __extends(VNode, _super);
    function VNode(node) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        var _a = (0, utils_1.computeXpath)(_this), fullXpath = _a[0], xpath = _a[1], skeleton = _a[2];
        _this.fullXpath = fullXpath;
        _this.xpath = xpath;
        _this.skeleton = skeleton;
        return _this;
    }
    Object.defineProperty(VNode.prototype, "href", {
        get: function () {
            return (0, href_1.getElementHref)(this.node);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VNode.prototype, "content", {
        get: function () {
            return (0, content_1.getElementContent)(this.node);
        },
        enumerable: false,
        configurable: true
    });
    return VNode;
}(base_node_1.default));
exports.default = VNode;
