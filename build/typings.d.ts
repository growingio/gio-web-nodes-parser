export type Possible<T> = T | undefined | null;
export type NonNullable<T> = T extends null | undefined ? never : T;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export type ACTIONTYPES = 'click' | 'change' | 'hover' | 'circleClick' | 'circleChange' | null | string;
export type ViewStatus = 'DISPLAYED' | 'OBSCURED' | 'OUTSIDE' | 'HIDDEN';
export type TriggerEventType = 'VIEW_CLICK' | 'VIEW_CHANGE';
export type PositionType = 'static' | 'relative' | 'sticky' | 'absolute' | 'fixed';
export type ListTagType = 'tr' | 'li' | 'dt' | 'dd';
export type SupportedClickInputType = 'button' | 'reset' | 'submit' | 'file';
export type SupportedChangeInputType = 'checkbox' | 'color' | 'radio' | 'range' | 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'text' | 'time' | 'week';
export type GioAttributeType = 'data-growing-ignore' | 'data-growing-track' | 'data-growing-container' | 'data-growing-index' | 'data-growing-title';
export type SpecialTagType = 'circle-shape' | 'circle-page' | 'heatmap-page';
export interface DeviceInfo {
    scale: number;
    winWidth: number;
    winHeight: number;
    webviewTop: number;
    webviewLeft: number;
    webviewWidth: number;
    webviewHeight: number;
    webviewZLevel: number;
    isLimitViewport?: boolean;
}
export interface Rect {
    top: number;
    left: number;
    width: number;
    height: number;
}
export interface XPathResult {
    skeleton: string;
    fullXpath: string;
    xcontent: string;
}
export interface TrackingConfig {
    ignoreDisplay?: boolean;
    includeChildren?: boolean;
    maxDepth?: number;
    filter?: (element: Element) => boolean;
}
export interface GioError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    element?: Element;
}
export interface GioWebNodeOptions {
    action?: ACTIONTYPES;
    lengthThreshold?: number;
    deviceInfo?: DeviceInfo;
    parentNode?: XNODE;
}
export interface XNODE {
    originNode: Node;
    index?: number;
    isMarkedIndex: boolean;
    tagName: string;
    id?: string;
    classList?: string[];
    content?: Possible<string>;
    hyperlink?: Possible<string>;
    currentXpath?: string;
    isIgnored?: boolean;
    isPseudoList?: boolean;
    isPureList?: boolean;
    isContainer?: boolean;
    isLimitViewport?: boolean;
    peerNodes?: Element[];
    xParents?: XNODE[];
    isOutFlow?: boolean;
    rect?: Rect;
    zLevel?: number;
    viewStatus?: ViewStatus;
    triggerEvent?: TriggerEventType;
    isTrackable?: boolean;
    isUpgrade?: boolean;
}
export interface GIOWEBNODEINFO {
    xpath: string;
    fullXpath: string;
    skeleton: string;
    xcontent: string;
    triggerEvent: TriggerEventType;
    originNode: Node;
    content?: Possible<string>;
    index?: Possible<number>;
    isMarkedIndex: boolean;
    hyperlink?: Possible<string>;
    peerNodes?: Possible<Element[]>;
    isPseudoList?: boolean;
    isPureList?: boolean;
    isContainer?: boolean;
}
export interface GIOHYBRIDNODEINFO extends GIOWEBNODEINFO {
    top: number;
    left: number;
    width: number;
    height: number;
    zLevel: number;
    outFlow: boolean;
    href?: Possible<string>;
}
export interface GIOWEBNODE {
    originElement: Element;
    actionType: ACTIONTYPES;
    xpathThreshold: number;
    xNode: XNODE;
    isTrackable: boolean;
    isUpgrade: boolean;
    trackNodes: () => GIOWEBNODEINFO[];
    getGioNodeInfo: (node: XNODE) => GIOWEBNODEINFO;
    computeXpath: (xNode: XNODE) => XPathResult;
}
export interface GIOHYBRIDNODE {
    deviceInfo: DeviceInfo;
    xpathThreshold: number;
    xNode: XNODE;
    trackNodes: (target: Element, parentNodes: XNODE[], ignoreDisplay: boolean) => GIOHYBRIDNODEINFO[];
}
