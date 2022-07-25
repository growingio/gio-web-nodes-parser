import { Maybe } from '../typings';
declare class BaseNode {
    node: Node;
    name: string;
    tagName: string;
    id: Maybe<string>;
    classList: Maybe<string[]>;
    private _path;
    private _tagList;
    private _pseudoList;
    private _index;
    constructor(target: Node);
    /**
     * 推测节点是不是list和其在list中的index值
     * 一、是不是list
     *    1. 是标记为list的标签
     *    2. 连续有相同class的同类标签，大于等于3的时候为伪列表
     * 二、index值
     *    1. 是list，在list中的索引
     *    2. index从1开始
     */
    private guessListAndIndex;
    get path(): string;
    get pseudoList(): boolean;
    get list(): boolean;
    /**
     * 当前的index不会继承父级的index
     */
    get index(): Maybe<number>;
    get container(): boolean;
    get parent(): Maybe<BaseNode>;
    parentPaths(withSelf?: boolean): BaseNode[];
}
export default BaseNode;
