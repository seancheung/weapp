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
  }
  interface wx {
    canIUse(schema: string): boolean
    request(options: wx.RequestOptions): wx.RequestTask
    downloadFile(options: wx.DownloadOptions): wx.DownloadTask
    uploadFile(options: wx.UploadOptions): wx.UploadTask
    getImageInfo(options: wx.ImageInfoOptions): void
    saveImageToPhotosAlbum(options: wx.SaveImageOptions): void
    canvasToTempFilePath(options: wx.CanvasToFileOptions): void
    createCanvasContext(canvasId: string, context?: any): any
  }
  const wx: wx
}

export * from './utils'
export * from './canvas'
