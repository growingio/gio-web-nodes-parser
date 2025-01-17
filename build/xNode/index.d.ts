import { DeviceInfo, Possible, Rect, XNODE } from '@/typings';
declare class xNode implements XNODE {
    originNode: any;
    deviceInfo?: DeviceInfo;
    actionType?: string;
    isTrackable: boolean;
    parentNodes: XNODE[];
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
    isLimitViewport: boolean;
    triggerEvent: 'VIEW_CLICK' | 'VIEW_CHANGE';
    rect: Rect;
    viewStatus: 'DISPLAYED' | 'OBSCURED' | 'OUTSIDE' | 'HIDDEN';
    zLevel: number;
    private _pureList;
    private _pseudoList;
    constructor(originNode: any, deviceInfo?: DeviceInfo, actionType?: string, isTrackable?: boolean, parentNodes?: XNODE[]);
    private _getIndex;
    private _getSiblingNode;
    private _getIsPureList;
    private _getIsInPseudoList;
    private _getClassList;
    private _getCurrentXpath;
    private _getIsContainer;
    _getContent: () => void;
    private _getIsOutFlow;
    private _getRect;
    private _getListItemViewStatus;
    private _getViewStatus;
    private _getTriggerEvent;
    private _getXParents;
}
export default xNode;
