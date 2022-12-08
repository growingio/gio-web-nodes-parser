export type Maybe<T> = T | undefined | null;
export type Action = 'click' | 'change' | 'submit' | 'hover' | 'self' | null | string;
export declare enum VisibleStatus {
    OUTER = 0,
    INNER_COVERED = 1,
    INNER_SHOW = 2
}
export interface NodeInfo {
    content?: Maybe<string>;
    index?: Maybe<number>;
    href?: Maybe<string>;
    xpath: string;
    fullXpath: string;
    skeleton: string;
}
