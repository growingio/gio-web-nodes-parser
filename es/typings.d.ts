export declare type Maybe<T> = T | undefined;
/**
 * 元素计算触发类型
 * hover: 圈选时的鼠标hover
 * self: 表示不向上查找元素，如在热图中
 */
export declare type Action = 'click' | 'change' | 'submit' | 'hover' | 'self' | null | string;
/**
 * 元素可见状态
 */
export declare enum VisibleStatus {
    /**
     * 在视窗外部
     */
    OUTER = 0,
    /**
     * 在视窗内，但相对被其他元素基本遮挡
     */
    INNER_COVERED = 1,
    /**
     * 在视窗内，且相对可见
     */
    INNER_SHOW = 2
}
export interface NodeInfo {
    /**
     * 内容
     */
    content?: Maybe<string>;
    /**
     * index序号
     */
    index?: Maybe<number>;
    /**
     * 元素链接
     */
    href?: Maybe<string>;
    /**
     * 截取后的xpath
     */
    xpath: string;
    /**
     * 完整的xpath
     */
    fullXpath: string;
    /**
     * 完整的xpath骨架
     */
    skeleton: string;
}
