import { Maybe } from '../typings';
export declare const filterText: (text: Maybe<string>, cutOff?: boolean) => Maybe<string>;
export declare const splitNoEmpty: (source: string, separator: string | RegExp) => string[];
export declare const normalizePath: (path: string) => string;
export declare const rmBlank: (str: Maybe<string>) => string;
export declare const arrayEquals: (source: Maybe<any[]>, target: Maybe<any[]>) => boolean;
export declare const findIndex: <T>(array: T[], predicate: (item: T) => boolean) => number;
export declare const lastFindIndex: <T>(array: T[], predicate: (item: T) => boolean) => number;
