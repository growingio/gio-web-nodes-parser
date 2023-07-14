export type Possible<T> = T | undefined | null;
export type ACTIONTYPES = 'click' | 'change' | 'hover' | null | string;
export interface DeviceInfo {
    scale: number;
    winWidth: number;
    winHeight: number;
    webviewTop: number;
    webviewLeft: number;
    webviewWidth: number;
    webviewHeight: number;
    webviewZLevel: number;
}
export interface Rect {
    top: number;
    left: number;
    width: number;
    height: number;
}
export interface XNODE {
    originNode: Node;
    index: number;
    tagName: string;
    id: string;
    classList: string[];
    content: Possible<string>;
    hyperlink: Possible<string>;
    currentXpath: string;
    isIgnored: boolean;
    isPseudoList: boolean;
    isPureList: boolean;
    isContainer: boolean;
    peerNodes: Element[];
    xParents: XNODE[];
    isOutFlow: boolean;
    isVisible: boolean;
    rect?: Rect;
    zLevel?: number;
    viewStatus?: 'IN_SHOW' | 'IN_COVERED' | 'OUT';
    triggerEvent: 'VIEW_CLICK' | 'VIEW_CHANGE';
}
export interface GIONODEINFO {
    xpath: string;
    fullXpath: string;
    skeleton: string;
    xcontent: string;
    outFlow: boolean;
    triggerEvent: 'VIEW_CLICK' | 'VIEW_CHANGE';
    content?: Possible<string>;
    index?: Possible<number>;
    hyperlink?: Possible<string>;
    peerNodes?: Possible<any[]>;
}
export interface GIOHYBRIDNODEINFO extends GIONODEINFO {
    top: number;
    left: number;
    width: number;
    height: number;
    zLevel: number;
    nodeType: string;
    href?: Possible<string>;
    parentXPath?: Possible<string>;
}
export interface GIONODE {
    originElement: Element;
    actionType: ACTIONTYPES;
    xpathThreshold: number;
    xNode: XNODE;
    trackable: (targetElement: any) => boolean;
    trackNodes: () => GIONODEINFO[];
    getGioNodeInfo: (node: XNODE) => GIONODEINFO;
    computeXpath: (xNode: XNODE) => any;
}
export interface GIOHYBRIDNODE {
    deviceInfo: any;
    xpathThreshold: number;
    xNode: XNODE;
    trackNodes: (target: Element, parentInfo: XNODE) => GIOHYBRIDNODEINFO[];
}
