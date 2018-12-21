type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type WrappedFunc<TOptions extends wx.CallbackOptions<TSuccess, TFail>, TSuccess, TFail> = (
  opts?: Omit<TOptions, wx.Callbacks>
) => Promise<TSuccess>
type Promisifed<
  TOptions extends wx.CallbackOptions<TSuccess, TFail>,
  TSuccess,
  TFail
> = WrappedFunc<TOptions, TSuccess, TFail>
/**
 * Promisify a wx function
 *
 * @param func wx function
 * @param context Context
 */
export function promisify<
  TOptions extends wx.CallbackOptions<TSuccess, TFail>,
  TSuccess = any,
  TFail = any
>(
  func: wx.CallbackFunc<TOptions, TSuccess, TFail>,
  context?: any
): Promisifed<TOptions, TSuccess, TFail> {
  return (opts: wx.CallbackOptions) =>
    opts.success || opts.fail || opts.complete
      ? func.call(context, opts)
      : new Promise((resolve, reject) => {
          func.call(context, {
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

export const request = promisify<wx.RequestOptions, wx.Response>(wx.request, wx)
export const downloadFile = promisify<wx.DownloadOptions, wx.DownloadResponse>(wx.downloadFile, wx)
export const uploadFile = promisify<wx.UploadOptions, wx.UploadResponse>(wx.uploadFile, wx)
export const getImageInfo = promisify<wx.ImageInfoOptions, wx.ImageInfoResponse>(
  wx.getImageInfo,
  wx
)
export function saveToAlbum(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    wx.saveImageToPhotosAlbum({
      filePath,
      success: () => {
        resolve()
      },
      fail: () => {
        reject(new Error())
      }
    })
  })
}
