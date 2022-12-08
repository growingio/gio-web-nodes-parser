import { Action, Maybe, NodeInfo } from './typings';
declare class GioNode {
    origin: Node;
    action: Action;
    direct: boolean;
    target: Element;
    ignore: boolean;
    vnode: any;
    tagName: string;
    private parentIndex;
    constructor(origin: Node, action?: Action, direct?: boolean);
    get content(): Maybe<string>;
    get href(): Maybe<string>;
    get index(): Maybe<number>;
    private inferParentIndex;
    get xpath(): string;
    get fullXpath(): string;
    get skeleton(): string;
    info(inferIndex?: boolean): NodeInfo;
    traceable(): boolean;
    trackNodes(): NodeInfo[];
    get parentElement(): Maybe<GioNode>;
}
export default GioNode;
