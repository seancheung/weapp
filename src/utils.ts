import { wrapped } from './wrap'
import { wx } from './wx'

type Parameter<T extends (p: any) => any> = T extends (p: infer P) => any ? P : never

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 * 从 object 创建 querystring
 *
 * @param query 要设置的键值对. 值为 null 或 undefined 的对象不会添加到结果中
 * @returns 生成的 querystring
 */
export function encodeQuery(query: Record<string, any>): string {
  return Object.entries(query)
    .filter(([, v]) => v != null)
    .map(([k, v]) => `${k}=${v}`)
    .join('&')
}

/**
 * 解析小程序页面传递的 querystring 对象. 兼容小程序码、二维码、普通链接
 *
 * @param query 从页面 onLoad(options) 中获取的 options
 * @returns 解析后的对象
 */
export function decodeQuery(query: Record<string, string>): Record<string, string> {
  let qs
  if (query.scene) {
    qs = decodeURIComponent(query.scene)
  } else if (query.q) {
    const url = decodeURIComponent(query.q)
    const [, arg] = url.split('?')
    qs = arg
  } else {
    return query
  }
  return qs
    ? qs
        .split('&')
        .map(i => i.split('='))
        .reduce((o, [k, v]) => Object.assign(o, { [k]: v }), {})
    : {}
}

/**
 * 连接 url. 会移除重复的 '/' 符号. url 开头跟结尾均可包含或缺省 '/' 符号
 *
 * @param urls 要进行连接的url
 * @returns 连接后的url. 结尾不包含 '/' 符号(除非整体为 '/' )
 */
export function joinUrl(...urls: string[]): string {
  return urls
    .join('/')
    .replace(/([^:])\/{2,}/g, '$1/')
    .replace(/\/$/, '')
}

/**
 * 查询授权, 如果未授权则进行请求
 *
 * @param scope 权限名
 */
export async function authorize(scope: wx.AuthScope): Promise<void> {
  const { authSetting } = await wrapped.getSetting()
  if (!authSetting[scope]) {
    await wrapped.authorize({ scope })
  }
}

type getLocation = typeof wrapped.getLocation
/**
 * 检查权限并获取地理定位
 *
 * @param opts 定位选项
 */
export async function getLocation(opts: Parameter<getLocation>): ReturnType<getLocation> {
  await authorize('scope.userLocation')
  return wrapped.getLocation(opts)
}

type chooseLocation = typeof wrapped.chooseLocation
/**
 * 检查权限并请求地理定位
 *
 * @param opts 定位选项
 */
export async function chooseLocation(opts: Parameter<chooseLocation>): ReturnType<chooseLocation> {
  await authorize('scope.userLocation')
  return wrapped.chooseLocation(opts)
}

type saveImageToPhotosAlbum = typeof wrapped.saveImageToPhotosAlbum
/**
 * 检查权限并写入相册
 *
 * @param opts 写入选项
 */
export async function saveImageToPhotosAlbum(
  opts: Parameter<saveImageToPhotosAlbum>
): ReturnType<saveImageToPhotosAlbum> {
  await authorize('scope.writePhotosAlbum')
  return wrapped.saveImageToPhotosAlbum(opts)
}

/**
 * 深克隆
 *
 * @param {any} source 对象
 * @returns {any}
 */
export function clone(source: any) {
    return source != null ? JSON.parse(JSON.stringify(source)) : source;
}

/**
 * 递归克隆
 *
 * @param {any} source 对象
 * @param {any} target 对象
 * @returns {any}
 */
export function merge(source: any, target: any) {
    if (target == null) {
        return clone(source);
    }
    if (source == null) {
        return clone(target);
    }
    if (typeof source !== 'object' || typeof target !== 'object') {
        return clone(target);
    }
    const merge = (source: any, target: any) => {
        Object.keys(target).forEach(key => {
            if (source[key] == null) {
                source[key] = target[key];
            } else if (typeof source[key] === 'object') {
                if (typeof target[key] === 'object') {
                    merge(source[key], target[key]);
                } else {
                    source[key] = target[key];
                }
            } else {
                source[key] = target[key];
            }
        });

        return source;
    };

    return merge(clone(source), clone(target));
}