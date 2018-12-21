declare global {
  namespace wx {
    type Callbacks = 'success' | 'fail' | 'complete'
    interface CallbackOptions<TSuccess = any, TFail = any> {
      success?(res: TSuccess): void
      fail?(error: TFail): void
      complete?(): void
    }
    type CallbackFunc<
      TOptions extends CallbackOptions<TSuccess, TFail>,
      TSuccess = any,
      TFail = any
    > = (opts?: TOptions) => any

    interface RequestOptions extends CallbackOptions<Response> {
      url: string
      data?: string | object | ArrayBuffer
      header?: Record<string, string>
      method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
      dataType?: string
      responseType?: 'text' | 'arraybuffer'
    }
    interface HeaderResponse {
      header: Record<string, string>
    }
    interface RequestTask {
      abort(): void
      onHeadersReceived(cb: (res: HeaderResponse) => void): void
      offHeadersReceived(cb: Function): void
    }
    interface Response {
      data: string | object | ArrayBuffer
      statusCode: number
      header: Record<string, string>
    }
    interface DownloadResponse {
      tempFilePath: string
      statusCode: number
    }
    interface DownloadProgressResponse {
      progress: number
      totalBytesWritten: number
      totalBytesExpectedToWrite: number
    }
    interface DownloadTask {
      abort(): void
      onProgressUpdate(cb: (res: DownloadProgressResponse) => void): void
      offProgressUpdate(cb: Function): void
      onHeadersReceived(cb: (res: HeaderResponse) => void): void
      offHeadersReceived(cb: Function): void
    }
    interface DownloadOptions extends CallbackOptions<DownloadResponse> {
      url: string
      header?: Record<string, string>
      filePath?: string
    }
    interface UploadProgressResponse {
      progress: number
      totalBytesSent: number
      totalBytesExpectedToSend: number
    }
    interface UploadTask {
      abort(): void
      onProgressUpdate(cb: (res: UploadProgressResponse) => void): void
      offProgressUpdate(cb: Function): void
      onHeadersReceived(cb: (res: HeaderResponse) => void): void
      offHeadersReceived(cb: Function): void
    }
    interface UploadResponse {
      data: string
      statusCode: number
    }
    interface UploadOptions extends CallbackOptions<UploadResponse> {
      url: string
      filePath: string
      name: string
      header?: Record<string, string>
      formData?: object
    }
    interface ImageInfoResponse {
      width: number
      height: number
      path: string
      orientation: string
      type: string
    }
    interface ImageInfoOptions extends CallbackOptions<ImageInfoResponse> {
      src: string
    }
    interface SaveImageOptions extends CallbackOptions<void> {
      filePath: string
    }
    interface CanvasToFileResponse {
      tempFilePath: string
    }
    interface CanvasToFileOptions extends CallbackOptions<CanvasToFileResponse> {
      x?: number
      y?: number
      width?: number
      height?: number
      destWidth?: number
      destHeight?: number
      canvasId: string
      fileType?: 'png' | 'jpg'
      quality?: number
    }
    interface AuthorizeOptions extends CallbackOptions<void> {
      scope: string
    }
    interface GetSettingResponse {
      authSetting: Record<string, boolean>
    }
    interface GetSettingOptions extends CallbackOptions<GetSettingResponse> {}
  }
  interface wx {
    canIUse(schema: string): boolean
    request(options: wx.RequestOptions): wx.RequestTask
    downloadFile(options: wx.DownloadOptions): wx.DownloadTask
    uploadFile(options: wx.UploadOptions): wx.UploadTask
    getImageInfo(options: wx.ImageInfoOptions): void
    saveImageToPhotosAlbum(options: wx.SaveImageOptions): void
    getSetting(options: wx.GetSettingOptions): void
    authorize(options: wx.AuthorizeOptions): void
    canvasToTempFilePath(options: wx.CanvasToFileOptions): void
    createCanvasContext(canvasId: string, context?: any): any
  }
  const wx: wx
}

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
export const getSetting = promisify<wx.GetSettingOptions, wx.GetSettingResponse>(wx.getSetting)
export const authorize = promisify<wx.AuthorizeOptions, void>(wx.authorize)
