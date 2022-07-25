import { Maybe } from '../typings';
/**
 * 获取表单的内容，仅在submit中使用
 * @param form
 */
export declare function getFormContent(form: HTMLFormElement): Maybe<string>;
export declare function getElementContent(elem: Element): Maybe<string>;
