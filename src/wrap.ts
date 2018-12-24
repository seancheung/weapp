import { wx as types } from './wx'
declare const wx: any

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type SuccessType<T extends types.Options<any>> = T extends types.Options<infer R> ? R : never
type Callback<T extends types.Options> = (opts?: T) => any
type Promisifed<T extends types.Options> = (
  opts?: Omit<T, types.Callbacks>
) => Promise<SuccessType<T>>
type Wrapped<T extends Record<string, types.Func>> = {
  readonly [K in keyof T]: T[K] extends types.Func<infer P> ? Promisifed<P> : never
}
/**
 * 将一个小程序方法 Promise 化. 需要该方法中接受 success/fail 回调
 *
 * @param func 需要处理的小程序方法(wx.funcName)
 */
export function promisify<T extends types.Options>(func: Callback<T>): Promisifed<T> {
  return (opts?: types.Options) =>
    opts && (opts.success || opts.fail || opts.complete)
      ? func.call(wx, opts)
      : new Promise((resolve, reject) => {
          func.call(wx, {
            ...opts,
            success: resolve,
            fail: (res?: types.FailRes) => {
              reject(new Error(res && res.errMsg))
            }
          })
        })
}

type PromiseFunc<R> = (...args: any[]) => Promise<R>
/**
 * Promisify a function
 *
 * @param func Function with a standard callback
 * @param context Context
 */
export function promisee<R>(func: Function, context?: any): PromiseFunc<R> {
  return (...args: any[]) =>
    new Promise((resolve, reject) => {
      func.call(context, ...args, (err: Error, res: R) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
}
/**
 * Promisify a function without rejection
 *
 * @param func Function with a non-standard callback
 * @param context Context
 */
export function wait<R>(func: Function, context?: any): PromiseFunc<R> {
  return (...args: any[]) =>
    new Promise(resolve => {
      func.call(context, ...args, (res: R) => {
        resolve(res)
      })
    })
}

export const wrapped: Wrapped<types> = Object.keys(wx).reduce((o: any, k) => {
  if (typeof wx[k] === 'function') {
    o[k] = promisify(wx[k])
  }
  return o
}, {})
