import { Action, Maybe, NodeInfo } from './typings';
import VNode from './node';
declare class GioNode {
    origin: Node;
    action: Action;
    direct: boolean;
    target: Element;
    ignore: boolean;
    vnode: VNode;
    tagName: string;
    private parentIndex;
    constructor(origin: Node, action?: Action, direct?: boolean);
    get content(): Maybe<string>;
    get href(): Maybe<string>;
    /**
     * 获取元素自己的index
     */
    get index(): Maybe<number>;
    /**
     * 推断父元素的index
     */
    private inferParentIndex;
    get xpath(): string;
    get fullXpath(): string;
    get skeleton(): string;
    /**
     * 获取当前节点的信息
     * @param inferIndex 是否推断父级index，默认true
     */
    info(inferIndex?: boolean): NodeInfo;
    /**
     * 判断是不是可追踪的
     */
    traceable(): boolean;
    /**
     * 冒泡获取所有可追踪的节点
     */
    trackNodes(): NodeInfo[];
    /**
     * 获取父节点
     */
    get parentElement(): Maybe<GioNode>;
}
export default GioNode;
