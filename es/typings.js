/**
 * 元素可见状态
 */
export var VisibleStatus;
(function (VisibleStatus) {
    /**
     * 在视窗外部
     */
    VisibleStatus[VisibleStatus["OUTER"] = 0] = "OUTER";
    /**
     * 在视窗内，但相对被其他元素基本遮挡
     */
    VisibleStatus[VisibleStatus["INNER_COVERED"] = 1] = "INNER_COVERED";
    /**
     * 在视窗内，且相对可见
     */
    VisibleStatus[VisibleStatus["INNER_SHOW"] = 2] = "INNER_SHOW";
})(VisibleStatus || (VisibleStatus = {}));
