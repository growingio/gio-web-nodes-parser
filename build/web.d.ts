import { ACTIONTYPES, GIOWEBNODEINFO, XNODE } from './typings';
declare class GioWebNode {
    origin: any;
    action?: ACTIONTYPES;
    lengthThreshold?: number;
    deviceInfo?: any;
    parentNode?: GioWebNode;
    originElement: Element;
    actionType: ACTIONTYPES;
    xpathThreshold: number;
    trackable: boolean;
    xNode: XNODE;
    constructor(origin: any, action?: ACTIONTYPES, lengthThreshold?: number, deviceInfo?: any, parentNode?: GioWebNode);
    trackNodes: () => any[];
    getGioNodeInfo: (node: XNODE) => GIOWEBNODEINFO;
    computeXpath: (xNode: XNODE) => {
        skeleton: string;
        fullXpath: string;
        xcontent: string;
    };
    private _getParent;
}
export default GioWebNode;
