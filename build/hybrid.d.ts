import { DeviceInfo, GIOHYBRIDNODEINFO, XNODE } from './typings';
declare class GioHybridNode {
    xNode: XNODE;
    deviceInfo: DeviceInfo;
    xpathThreshold: number;
    private elements;
    private _processedNodes;
    constructor(webviewInfo: {
        webviewLeft: number;
        webviewTop: number;
        webviewWidth: number;
        webviewHeight: number;
        webviewZLevel: number;
        isLimitViewport?: boolean;
    }, lengthThreshold?: number);
    trackNodes: (target: Element, parentInfo: XNODE | null, ignoreDisplay?: boolean) => GIOHYBRIDNODEINFO[];
    private _shouldProcessNode;
    private _getTrackElements;
    private static getPositionZLevelIncrement;
    private _getZLevel;
    private _scaleAndOffsetRect;
    private _getGioHybridNodeInfo;
}
export default GioHybridNode;
