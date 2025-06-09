import { DeviceInfo, XNODE } from './typings';
declare class GioHybridNode {
    xNode: XNODE;
    deviceInfo: DeviceInfo;
    xpathThreshold: number;
    private elements;
    constructor(webviewInfo: any, lengthThreshold?: number);
    trackNodes: (target: Element, parentInfo: any, ignoreDisplay?: boolean) => any[];
    private _getTrackElements;
    private readonly positionZLevelMap;
    private _getZLevel;
    private _getGioHybridNodeInfo;
}
export default GioHybridNode;
