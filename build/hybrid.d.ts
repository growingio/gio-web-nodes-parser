import { DeviceInfo, XNODE } from './typings';
declare class GioHybridNode {
    xNode: XNODE;
    deviceInfo: DeviceInfo;
    xpathThreshold: number;
    constructor(webviewInfo: any, lengthThreshold?: number);
    trackNodes: (target: Element, parentInfo: XNODE) => any[];
    private _getTrackElements;
    private _getZLevel;
    private _getGioHybridNodeInfo;
}
export default GioHybridNode;
