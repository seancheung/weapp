export declare namespace wx {
  type Callbacks = 'success' | 'fail' | 'complete'
  interface FailRes {
    errMsg: string
  }
  interface Options<R = any> {
    success?(res: R): void
    fail?(res: FailRes): void
    complete?(): void
  }
  type Func<T = any> = (options?: T) => any
  type AuthScope =
    | 'scope.userInfo'
    | 'scope.userLocation'
    | 'scope.address'
    | 'scope.invoiceTitle'
    | 'scope.invoice'
    | 'scope.werun'
    | 'scope.record'
    | 'scope.writePhotosAlbum'
    | 'scope.camera'
}
type P<T, R = void> = (options?: T & wx.Options<R>) => any
type Q<R = void> = (options?: wx.Options<R>) => any
export interface wx {
  [x: string]: wx.Func
  request: P<
    {
      url: string
      data?: string | object | ArrayBuffer
      header?: Record<string, any>
      method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
      dataType?: string
      responseType?: 'text' | 'arraybuffer'
    },
    {
      data: string | object | ArrayBuffer
      statusCode: number
      header: Record<string, any>
    }
  >
  downloadFile: P<
    {
      url: string
      header?: Record<string, any>
      filePath?: string
    },
    {
      tempFilePath: string
      statusCode: number
    }
  >
  uploadFile: P<
    {
      url: string
      filePath: string
      name: string
      header?: Record<string, any>
      formData?: object
    },
    {
      data: string
      statusCode: number
    }
  >
  getSetting: Q<{
    authSetting: Record<wx.AuthScope, boolean>
  }>
  openSetting: Q<{
    authSetting: Record<wx.AuthScope, boolean>
  }>
  authorize: P<{ scope: wx.AuthScope }>
  navigateTo: P<{ url: string }>
  switchTab: P<{ url: string }>
  reLaunch: P<{ url: string }>
  redirectTo: P<{ url: string }>
  navigateBack: P<{ delta: number }>
  getStorageInfo: Q<{
    keys: string[]
    currentSize: number
    limitSize: number
  }>
  clearStorage: Q
  removeStorage: P<{ key: string }>
  setStorage: P<{ key: string; data: any }>
  getStorage: P<{ key: string }, { data: any }>
  compressImage: P<{ src: string; quality?: number }>
  saveImageToPhotosAlbum: P<{
    filePath: string
  }>
  getImageInfo: P<
    { src: string },
    {
      width: number
      height: number
      path: string
      orientation: string
      type: string
    }
  >
  chooseImage: P<
    { count?: number; sizeType?: string[]; sourceType?: string[] },
    {
      tempFilePaths: string[]
      tempFiles: Array<{
        path: string
        size: number
      }>
    }
  >
  getLocation: P<
    { type?: 'wgs84' | 'gcj02'; altitude?: boolean },
    {
      latitude: number
      longitude: number
      speed: number
      accuracy: number
      altitude: number
      verticalAccuracy: number
      horizontalAccuracy: number
    }
  >
  chooseLocation: Q<{
    name: string
    address: string
    latitude: number
    longitude: number
  }>
  getFileInfo: P<
    { filePath: string; digestAlgorithm?: 'md5' | 'sha1' },
    {
      size: number
      digest: string
    }
  >
  getSavedFileInfo: P<
    { filePath: string },
    {
      size: number
      createTime: number
    }
  >
  saveFile: P<
    { tempFilePath: string },
    {
      savedFilePath: string
    }
  >
  getSavedFileList: Q<{
    fileList: Array<{
      filePath: string
      size: number
      createTime: number
    }>
  }>
  removeSavedFile: P<{
    filePath: string
  }>
  checkSession: Q
  login: P<
    {
      timeout?: number
    },
    { code: string }
  >
  navigateToMiniProgram: P<{
    appId: string
    path?: string
    extraData?: object
    envVersion?: 'develop' | 'trail' | 'release'
  }>
  navigateBackMiniProgram: P<{
    extraData?: object
  }>
  getUserInfo: P<
    { withCredentials?: boolean; lang?: 'en' | 'zh_CN' | 'zn_TW' },
    {
      userInfo: {
        nickName: string
        avatarUrl: string
        gender: 0 | 1 | 2
        country: string
        province: string
        city: string
        language: 'en' | 'zh_CN' | 'zn_TW'
      }
      rawData: string
      signature: string
      encryptedData: string
      iv: string
    }
  >
  requestPayment: P<{
    timeStamp: string
    nonceStr: string
    package: string
    signType?: 'MD5' | 'HMAC-SHA256'
    paySign: string
  }>
  setClipboardData: P<{
    data: string
  }>
  getClipboardData: Q<{
    data: string
  }>
  getSystemInfo: Q<{
    brand: string
    model: string
    pixelRatio: number
    screenWidth: number
    screenHeight: number
    windowWidth: number
    windowHeight: number
    statusBarHeight: number
    language: string
    version: string
    system: string
    platform: string
    fontSizeSetting: number
    SDKVersion: string
    benchmarkLevel: number
  }>
  showModal: P<
    {
      title: string
      content: string
      showCancel?: boolean
      cancelText?: string
      cancelColor?: string
      confirmText?: string
      confirmColor?: string
    },
    {
      confirm: boolean
      cancel: boolean
    }
  >
  showActionSheet: P<{ itemList: string[]; itemColor?: string }, { tapIndex: number }>
  showLoading: P<{ title: string; mask?: boolean }>
  hideLoading: Q
  showToast: P<{
    title: string
    icon?: 'success' | 'loading' | 'none'
    image?: string
    duration?: number
    mask?: boolean
  }>
  hideToast: Q
  updateShareMenu: P<{
    withShareTicket?: boolean
    isUpdatableMessage?: boolean
    activityId?: string
    templateInfo?: {
      parameterList: Array<{ name: string; value: string }>
    }
  }>
  showShareMenu: P<{ withShareTicket?: boolean }>
  hideShareMenu: Q
  getShareInfo: P<
    { shareTicket: string; timeout?: number },
    { errMsg: string; encryptedData: string; iv: string }
  >
  canvasToTempFilePath: P<
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
  >
  canvasPutImageData: P<{
    canvasId: string
    data: Uint8ClampedArray
    x: number
    y: number
    width: number
    height: number
  }>
  canvasGetImageData: P<
    {
      canvasId: string
      x: number
      y: number
      width: number
      height: number
    },
    {
      width: number
      height: number
      data: Uint8ClampedArray
    }
  >
}
export declare const wx: wx
