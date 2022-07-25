import BaseNode from './base-node';
import { Maybe } from '../typings';
declare class VNode extends BaseNode {
    node: Element;
    fullXpath: string;
    xpath: string;
    skeleton: string;
    constructor(node: Element);
    get href(): Maybe<string>;
    get content(): Maybe<string>;
}
export default VNode;
