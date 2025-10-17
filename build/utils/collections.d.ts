export declare class gWeakMap<K extends object, V> {
    private _id;
    private _wm?;
    constructor();
    set(key: K, value: V): this;
    get(key: K): V | undefined;
    has(key: K): boolean;
    delete(key: K): boolean;
}
export declare class gSet<T> {
    private _values;
    private _set?;
    constructor(iterable?: T[]);
    add(value: T): this;
    has(value: T): boolean;
    delete(value: T): boolean;
    clear(): void;
    get size(): number;
    forEach(callback: (value: T, value2: T, set: this) => void): void;
}
export declare class gMap<K, V> {
    private _keys;
    private _values;
    private _map?;
    constructor(iterable?: [K, V][]);
    set(key: K, value: V): this;
    get(key: K): V | undefined;
    has(key: K): boolean;
    delete(key: K): boolean;
    clear(): void;
    get size(): number;
    forEach(callback: (value: V, key: K, map: this) => void): void;
}
