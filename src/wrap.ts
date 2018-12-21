type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type WrappedFunc<TOptions extends wx.CallbackOptions<TSuccess>, TSuccess> = (
  opts?: Omit<TOptions, wx.Callbacks>
) => Promise<TSuccess>
type Promisifed<TOptions extends wx.CallbackOptions<TSuccess>, TSuccess> = WrappedFunc<
  TOptions,
  TSuccess
>
/**
 * Promisify a wechat function
 *
 * @param func wx function
 */
export function promisify<TOptions extends wx.CallbackOptions<TSuccess>, TSuccess>(
  func: wx.CallbackFunc<TOptions, TSuccess>
): Promisifed<TOptions, TSuccess> {
  return (opts: wx.CallbackOptions) =>
    opts.success || opts.fail || opts.complete
      ? func.call(wx, opts)
      : new Promise((resolve, reject) => {
          func.call(wx, {
            ...opts,
            success: resolve,
            fail: (res: any) => {
              if (res != null && !(res instanceof Error)) {
                if (typeof res === 'string') {
                  res = new Error(res)
                } else {
                  res = new Error(res.errMsg || JSON.stringify(res))
                }
              }
              reject(res)
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

export const request = promisify<wx.RequestOptions, wx.Response>(wx.request)
export const downloadFile = promisify<wx.DownloadOptions, wx.DownloadResponse>(wx.downloadFile)
export const uploadFile = promisify<wx.UploadOptions, wx.UploadResponse>(wx.uploadFile)
export const getImageInfo = promisify<wx.ImageInfoOptions, wx.ImageInfoResponse>(wx.getImageInfo)
export const saveImageToPhotosAlbum = promisify<wx.SaveImageOptions, void>(
  wx.saveImageToPhotosAlbum
)
export const canvasToTempFilePath = promisify<wx.CanvasToFileOptions, wx.CanvasToFileResponse>(
  wx.canvasToTempFilePath
)
