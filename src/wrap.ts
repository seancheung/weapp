import { wx } from './wx'

type SuccessType<T extends wx.Options<any>> = T extends wx.Options<infer R> ? R : never
type Callback<T extends wx.Options> = (opts?: T) => any
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type Promisifed<T extends wx.Options> = (opts?: Omit<T, wx.Callbacks>) => Promise<SuccessType<T>>
type Wrapped<T extends Record<string, wx.Func>> = {
  readonly [K in keyof T]: T[K] extends wx.Func<infer P> ? Promisifed<P> : never
}
/**
 * Promisify a wechat function
 *
 * @param func wx function
 */
export function promisify<T extends wx.Options>(func: Callback<T>): Promisifed<T> {
  return (opts?: wx.Options) =>
    opts && (opts.success || opts.fail || opts.complete)
      ? func.call(wx, opts)
      : new Promise((resolve, reject) => {
          func.call(wx, {
            ...opts,
            success: resolve,
            fail: (res?: wx.FailRes) => {
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

export const wrapped: Wrapped<wx> = Object.keys(wx).reduce((o: any, k) => {
  if (typeof wx[k] === 'function') {
    o[k] = promisify(wx[k])
  }
  return o
}, {})
