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

export const request = promisify(wx.request)
export const downloadFile = promisify(wx.downloadFile)
export const uploadFile = promisify(wx.uploadFile)
export const canvasToTempFilePath = promisify(wx.canvasToTempFilePath)
export const getSetting = promisify(wx.getSetting)
export const openSetting = promisify(wx.openSetting)
export const authorize = promisify(wx.authorize)
export const navigateTo = promisify(wx.navigateTo)
export const switchTab = promisify(wx.switchTab)
export const reLaunch = promisify(wx.reLaunch)
export const redirectTo = promisify(wx.redirectTo)
export const navigateBack = promisify(wx.navigateBack)
export const getStorageInfo = promisify(wx.getStorageInfo)
export const clearStorage = promisify(wx.clearStorage)
export const removeStorage = promisify(wx.removeStorage)
export const setStorage = promisify(wx.setStorage)
export const getStorage = promisify(wx.getStorage)
export const compressImage = promisify(wx.compressImage)
export const saveImageToPhotosAlbum = promisify(wx.saveImageToPhotosAlbum)
export const getImageInfo = promisify(wx.getImageInfo)
export const chooseImage = promisify(wx.chooseImage)
export const getLocation = promisify(wx.getLocation)
export const chooseLocation = promisify(wx.chooseLocation)
export const updateShareMenu = promisify(wx.updateShareMenu)
export const getFileInfo = promisify(wx.getFileInfo)
export const getSavedFileInfo = promisify(wx.getSavedFileInfo)
export const saveFile = promisify(wx.saveFile)
export const getSavedFileList = promisify(wx.getSavedFileList)
export const removeSavedFile = promisify(wx.removeSavedFile)
export const checkSession = promisify(wx.checkSession)
export const login = promisify(wx.login)
export const navigateToMiniProgram = promisify(wx.navigateToMiniProgram)
export const navigateBackMiniProgram = promisify(wx.navigateBackMiniProgram)
export const getUserInfo = promisify(wx.getUserInfo)
export const requestPayment = promisify(wx.requestPayment)
export const setClipboardData = promisify(wx.setClipboardData)
export const getClipboardData = promisify(wx.getClipboardData)
export const getSystemInfo = promisify(wx.getSystemInfo)
export const showModal = promisify(wx.showModal)
