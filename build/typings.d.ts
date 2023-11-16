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
    rect?: Rect;
    zLevel?: number;
    viewStatus?: 'DISPLAYED' | 'OBSCURED' | 'OUTSIDE' | 'HIDDEN';
    triggerEvent: 'VIEW_CLICK' | 'VIEW_CHANGE';
    trackable?: boolean;
}
export interface GIOWEBNODEINFO {
    xpath: string;
    fullXpath: string;
    skeleton: string;
    xcontent: string;
    triggerEvent: 'VIEW_CLICK' | 'VIEW_CHANGE';
    originNode: Node;
    content?: Possible<string>;
    index?: Possible<number>;
    hyperlink?: Possible<string>;
    peerNodes?: Possible<any[]>;
}
export interface GIOHYBRIDNODEINFO extends GIOWEBNODEINFO {
    top: number;
    left: number;
    width: number;
    height: number;
    zLevel: number;
    outFlow: boolean;
    href?: Possible<string>;
    parentXPath?: Possible<string>;
}
export interface GIOWEBNODE {
    originElement: Element;
    actionType: ACTIONTYPES;
    xpathThreshold: number;
    xNode: XNODE;
    trackable: boolean;
    trackNodes: () => GIOWEBNODEINFO[];
    getGioNodeInfo: (node: XNODE) => GIOWEBNODEINFO;
    computeXpath: (xNode: XNODE) => any;
}
export interface GIOHYBRIDNODE {
    deviceInfo: any;
    xpathThreshold: number;
    xNode: XNODE;
    trackNodes: (target: Element, parentInfo: any, ignoreDisplay: boolean) => GIOHYBRIDNODEINFO[];
}
