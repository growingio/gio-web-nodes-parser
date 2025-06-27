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
    isTrackable: boolean;
    isUpgrade: boolean;
    xNode: XNODE;
    constructor(origin: any, action?: ACTIONTYPES, lengthThreshold?: number, deviceInfo?: any, parentNode?: GioWebNode);
    private static xpathCache;
    private updateNodesIndex;
    trackNodes: () => GIOWEBNODEINFO[];
    private static nodeInfoCache;
    getGioNodeInfo: (node: XNODE) => GIOWEBNODEINFO;
    computeXpath: (xNode: XNODE) => {
        skeleton: string;
        fullXpath: string;
        xcontent: string;
    };
    private static parentCache;
    private _getParent;
}
export default GioWebNode;
