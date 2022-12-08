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
    private guessListAndIndex;
    get path(): string;
    get pseudoList(): boolean;
    get list(): boolean;
    get index(): Maybe<number>;
    get container(): boolean;
    get parent(): Maybe<BaseNode>;
    parentPaths(withSelf?: boolean): BaseNode[];
}
export default BaseNode;
