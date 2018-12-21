declare const wx: any

type Callbacks = 'success' | 'fail' | 'complete'
interface CallbackRes {
  errMsg: string
}
interface Options<R = any> {
  success?(res: R): void
  fail?(res: CallbackRes): void
  complete?(): void
}
type Callback<T extends Options<R>, R = any> = (opts?: T) => any
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type WrappedFunc<T extends Options<R>, R> = (opts?: Omit<T, Callbacks>) => Promise<R>
type Promisifed<T extends Options<R>, R> = WrappedFunc<T, R>
type P<T = object, R = void> = (opts?: T) => Promise<R>
type Q<R = void> = () => Promise<R>
/**
 * Promisify a wechat function
 *
 * @param func wx function
 */
export function promisify<T extends Options<R>, R>(func: Callback<T, R>): Promisifed<T, R> {
  return (opts?: Options) =>
    opts && (opts.success || opts.fail || opts.complete)
      ? func.call(wx, opts)
      : new Promise((resolve, reject) => {
          func.call(wx, {
            ...opts,
            success: resolve,
            fail: (res: CallbackRes) => {
              reject(new Error(res.errMsg))
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
export const request: P<
  {
    url: string
    data?: string | object | ArrayBuffer
    header?: Record<string, string>
    method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
    dataType?: string
    responseType?: 'text' | 'arraybuffer'
  },
  {
    data: string | object | ArrayBuffer
    statusCode: number
    header: Record<string, string>
  }
> = promisify(wx.request)
export const downloadFile: P<
  {
    url: string
    header?: Record<string, string>
    filePath?: string
  },
  {
    tempFilePath: string
    statusCode: number
  }
> = promisify(wx.downloadFile)
export const uploadFile: P<
  {
    url: string
    filePath: string
    name: string
    header?: Record<string, string>
    formData?: object
  },
  {
    data: string
    statusCode: number
  }
> = promisify(wx.uploadFile)
export const getImageInfo: P<
  { src: string },
  {
    width: number
    height: number
    path: string
    orientation: string
    type: string
  }
> = promisify(wx.getImageInfo)
export declare namespace saveImageToPhotosAlbum {
  interface Opt extends Options<void> {
    filePath: string
  }
}
export const saveImageToPhotosAlbum: P<{
  filePath: string
}> = promisify(wx.saveImageToPhotosAlbum)
export const canvasToTempFilePath: P<
  {
    x?: number
    y?: number
    width?: number
    height?: number
    destWidth?: number
    destHeight?: number
    canvasId: string
    fileType?: 'png' | 'jpg'
    quality?: number
  },
  {
    tempFilePath: string
  }
> = promisify(wx.canvasToTempFilePath)
export const getSetting: Q<{
  authSetting: Record<string, boolean>
}> = promisify(wx.getSetting)
export const authorize: P<{ scope: string }> = promisify(wx.authorize)
export const navigateTo: P<{ url: string }> = promisify(wx.navigateTo)
export const switchTab: P<{ url: string }> = promisify(wx.switchTab)
export const reLaunch: P<{ url: string }> = promisify(wx.reLaunch)
export const redirectTo: P<{ url: string }> = promisify(wx.redirectTo)
export const navigateBack: P<{ delta: number }> = promisify(wx.navigateBack)
export const getStorageInfo: Q<{
  keys: string[]
  currentSize: number
  limitSize: number
}> = promisify(wx.getStorageInfo)
export const clearStorage: Q = promisify(wx.clearStorage)
