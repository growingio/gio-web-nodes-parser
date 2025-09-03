import { DeviceInfo, XNODE } from './typings';
declare class GioHybridNode {
    xNode: XNODE;
    deviceInfo: DeviceInfo;
    xpathThreshold: number;
    private elements;
    private _processedNodes;
    constructor(webviewInfo: any, lengthThreshold?: number);
    trackNodes: (target: Element, parentNodes?: XNODE[] | XNODE, ignoreDisplay?: boolean) => any[];
    private _shouldProcessNode;
    private _getTrackElements;
    private static getPositionZLevelIncrement;
    private _getZLevel;
    private _scaleAndOffsetRect;
    private _getGioHybridNodeInfo;
}
export default GioHybridNode;
