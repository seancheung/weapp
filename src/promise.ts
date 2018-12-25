import { Omit } from './utils'
import { wx as types } from './wx'
declare const wx: any

export type Promisifed<T extends types.Options> = (
  opts?: Omit<T, types.Callbacks>
) => Promise<types.SuccessType<T>>

/**
 * 对一个数组进行map操作并行执行每个返回的Promise
 * @param values
 * @param mapper
 * @returns 按传入顺序排序的执行结果
 */
export function map<T, R>(
  values: T[],
  mapper: (item?: T, i?: number, items?: T[]) => R | PromiseLike<R>
): Promise<R[]> {
  return Promise.all(values.map(mapper))
}

/**
 * 顺序执行Promise
 *
 * @param values 要执行的Promise或返回数据
 * @returns 按传入顺序排序的执行结果
 */
export function serial<T>(values: Array<T | PromiseLike<T>>): Promise<T[]>
/**
 * 顺序执行Promise
 *
 * @param values 要执行的Promise或返回数据
 * @returns 按传入顺序排序的执行结果
 */
export function serial<T1, T2>(
  values: [T1 | PromiseLike<T1> | T2 | PromiseLike<T2>]
): Promise<[T1, T2]>
/**
 * 顺序执行Promise
 *
 * @param values 要执行的Promise或返回数据
 * @returns 按传入顺序排序的执行结果
 */
export function serial<T1, T2, T3>(
  values: [T1 | PromiseLike<T1> | T2 | PromiseLike<T2> | T3 | PromiseLike<T3>]
): Promise<[T1, T2, T3]>
/**
 * 顺序执行Promise
 *
 * @param values 要执行的Promise或返回数据
 * @returns 按传入顺序排序的执行结果
 */
export function serial<T1, T2, T3, T4>(
  values: [
    T1 | PromiseLike<T1> | T2 | PromiseLike<T2> | T3 | PromiseLike<T3> | T4 | PromiseLike<T4>
  ]
): Promise<[T1, T2, T3, T4]>

export function serial(values: any[]): Promise<any[]> {
  return values.reduce(
    (p: Promise<any[]>, c: any) =>
      p.then((res: any[]) => Promise.resolve(c).then((r: any) => [...res, r])),
    Promise.resolve([])
  )
}

/**
 * 将一个小程序方法 Promise 化. 需要该方法中接受 success/fail 回调
 *
 * @param func 需要处理的小程序方法(wx.funcName)
 */
export function promisify<T extends types.Options>(func: types.Callback<T>): Promisifed<T> {
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
