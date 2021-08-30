export const FUNC_KEY = Symbol('FUNC_KEY');

export interface Func<T> {
    (...args: any[]): any;
    [FUNC_KEY]?: T;
}
