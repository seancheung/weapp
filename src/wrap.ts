import { Promisifed, promisify } from './promise'
import { wx as types } from './wx'
declare const wx: any

type Wrapped<T extends Record<string, types.Func>> = {
  readonly [K in keyof T]: T[K] extends types.Func<infer P> ? Promisifed<P> : never
}

export const wrapped: Wrapped<types> = Object.keys(wx).reduce((o: any, k) => {
  if (typeof wx[k] === 'function') {
    o[k] = promisify(wx[k])
  }
  return o
}, {})
