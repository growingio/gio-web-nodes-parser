import { ACTIONTYPES, GIOWEBNODEINFO, XNODE, DeviceInfo, XPathResult } from './typings';
declare class GioWebNode {
    origin: Element | any;
    action?: ACTIONTYPES;
    lengthThreshold?: number;
    deviceInfo?: DeviceInfo;
    parentNode?: GioWebNode;
    originElement: Element;
    actionType: ACTIONTYPES;
    xpathThreshold: number;
    isTrackable: boolean;
    isUpgrade: boolean;
    xNode: XNODE;
    constructor(origin: Element | any, action?: ACTIONTYPES, lengthThreshold?: number, deviceInfo?: DeviceInfo, parentNode?: GioWebNode);
    private updateNodesIndex;
    trackNodes: () => GIOWEBNODEINFO[];
    private static nodeInfoCache;
    getGioNodeInfo: (node: XNODE) => GIOWEBNODEINFO;
    private static xpathCache;
    computeXpath: (xNode: XNODE) => XPathResult;
    private static parentCache;
    private _getParent;
}
export default GioWebNode;
