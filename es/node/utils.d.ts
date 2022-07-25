import BaseNode from './base-node';
import { Maybe } from '../typings';
export declare const hasValidAttribute: (node: Node, attr: string) => boolean;
export declare const isRootNode: (node: Maybe<Node>) => boolean;
export declare const findParent: <P>(child: Node, filter: (current: Node) => boolean | void) => P;
/**
 * 获取当前元素的所有子元素
 * @param parent
 */
export declare const getDeepChildren: (parent: Maybe<Node>) => Element[];
export declare const getChildren: (parent: Maybe<Node>) => Element[];
export declare const isLeaf: (node: Node) => boolean;
export declare const isParentOfLeaf: (node: Node) => boolean;
export declare const isListTag: (node: Node) => boolean;
export declare const isContainerTag: (node: Node) => boolean;
/**
 * 是支持作为icon的标签
 * @param node 节点
 */
export declare const supportIconTag: (node: Node) => boolean;
/**
 * 判断是不是只包含icon标签
 *  1. 当前节点无值
 *  2. 必有是有子节点(不包括文本节点)的
 *  3. 所有子节点都要是icon节点
 * @param node 节点
 */
export declare const onlyContainsIconChildren: (node: Node) => boolean;
export declare const onlyContainsTextChildren: (node: Node) => boolean;
export declare const clickableInput: (node: Node) => boolean;
export declare const changeableInput: (node: Node) => boolean;
export declare const depthInside: (node: Element, threshold?: number, depth?: number) => boolean;
/**
 * 判断当前节点是不是被忽略追踪
 * 向上继承
 * 1. 不是元素
 * 2. 标记了忽略
 * @param node
 */
export declare const isIgnore: (node: Node) => boolean;
/**
 * 获取有效的节点
 *
 * 1. 不支持的节点会向上进行查找到最近的一个有效节点
 * 2. (a | button) > TEXT_NODE{span,i...} 取值到a|button
 * @type {TEXT_NODE}
 * @param node 当前触发的节点
 */
export declare const getEffectiveNode: (node: Node) => Element;
export declare const getMarkIndex: (node: Node) => Maybe<number>;
/**
 * 计算元素xpath的值
 *
 * xpath截取规则：节点层数>10，最大5层否则最大4层
 *
 * @param target 要计算的元素
 * @return [fullXpath, xpath, skeleton] 完整的xpath 截取后的xpath 完整骨架
 */
export declare const computeXpath: (target: BaseNode) => string[];
/**
 * 去除头尾和target不一样类型的标签
 * 仅仅去除头尾的，遇到一样的标签后就不算头尾了
 * @param elements
 * @param target
 */
export declare const removeDiffTagOnHeadAndTail: (elements: Element[], target: Node) => Element[];
