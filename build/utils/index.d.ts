import { Possible } from '@/typings';
export declare const consoleText: (msg: string, type?: 'info' | 'success' | 'error' | 'warn') => void;
export declare const hasAttribute: (node: Element, attribute: string) => boolean;
export declare const getAttribute: (node: Possible<Element>, attribute: string) => any;
export declare const getEffectiveNode: (node: Element) => Element;
export declare const isTooDeep: (node: any, threshold?: number, currentDepth?: number) => boolean;
export declare const getChildNodes: (node: Possible<Element>, includeTextNode?: boolean) => Element[];
export declare const getParentNode: (node: Possible<Element>) => HTMLElement;
export declare const isRootNode: (node: Possible<Element>) => boolean;
export declare const containsOnlyIcons: (node: Element) => boolean;
export declare const containsOnlyText: (node: Element) => boolean;
export declare const isLeafNode: (node: Element) => boolean;
export declare const isSecondLeafNode: (node: Possible<Element>) => boolean;
export declare const isIconNode: (node: Possible<Element>) => boolean;
export declare const getDirectText: (node: Possible<Element>) => any;
export declare const processText: (text: Possible<string>, length?: number) => Possible<string>;
