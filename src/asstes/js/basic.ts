export const extend = Object.assign
export type PromiseFn<T = any> = (...arg: any[]) => Promise<T | void | undefined>
