// tslint:disable:no-invalid-this
import { encodeQuery, joinUrl } from './utils'
import { Omit } from './utils'
import { wrapped } from './wrap'
declare const wx: any

interface Options {
  /**
   * 远端地址. 若已设置 baseUrl 则可为相对地址
   */
  url: string
  /**
   * querystring
   */
  query?: string | Record<string, any>
  /**
   * 请求体
   */
  data?: string | object | ArrayBuffer
  /**
   * 设置请求的 header, header 中不能设置 Referer. content-type 默认为 application/json
   */
  header?: Record<string, any>
  /**
   * HTTP 请求方法
   */
  method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
  /**
   * 返回的数据格式
   */
  dataType?: string
  /**
   * 响应的数据类型
   */
  responseType?: 'text' | 'arraybuffer'
}
interface Response {
  /**
   * 返回的数据
   */
  data: string | object | ArrayBuffer
  /**
   * 返回的 HTTP 状态码
   */
  statusCode: number
  /**
   * 返回的 HTTP Response Header
   */
  header: Record<string, string>
}
type Func = (options: string | Omit<Options, 'method'>) => Promise<Response>
type Verbs = 'options' | 'get' | 'head' | 'post' | 'put' | 'delete' | 'trace' | 'connect'

class HttpError extends Error {
  readonly code: number
  constructor(code: number, message?: string) {
    super(message)
    this.code = code
  }
}

async function send(this: any, options: Options): Promise<Response> {
  const { _defaults = {} }: { _defaults?: Defaults } = this
  const { baseUrl, dataType, header: h, responseType, query: q } = _defaults
  let { url, header, query } = options
  if (baseUrl) {
    url = joinUrl(baseUrl, url)
  }
  if (h) {
    header = { ...h, ...header }
  }
  if (query && q && typeof query !== 'string' && typeof q !== 'string') {
    query = { ...q, ...query }
  }
  if (query) {
    if (typeof query === 'string') {
      url = url + '?' + query
    } else {
      url = url + '?' + encodeQuery(query)
    }
  }

  const { method, data } = options
  const res = await wrapped.request({
    url,
    method,
    header,
    data,
    dataType,
    responseType
  })
  if (res.statusCode >= 400 || res.statusCode < 200) {
    let text: string
    if (typeof res.data === 'string') {
      text = res.data
    } else if (res.data instanceof ArrayBuffer) {
      text = '[bytes]'
    } else if (res.data) {
      text = JSON.stringify(res.data)
    }
    throw new HttpError(res.statusCode, text)
  }
  return res
}

interface DownloadOptions {
  /**
   * 下载文件地址
   */
  url: string
  /**
   * 保存路径. 需要有写入权限
   */
  filePath?: string
  /**
   * 分段数
   */
  parts?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  /**
   * 请求头
   */
  header?: Record<string, any>
  /**
   * querystring
   */
  query?: string | Record<string, any>
}
interface DownloadResult {
  /**
   * 下载文件保存路径
   */
  filePath?: string
  /**
   * 下载文件的二进制流
   */
  buffer?: ArrayBuffer
}
async function download(this: any, options: DownloadOptions): Promise<DownloadResult> {
  const { header } = await send.call(this, {
    ...options,
    method: 'HEAD'
  })
  let length: any = header && header['Content-Length']
  if (length == null) {
    throw new Error('Not Supported')
  }
  length = parseInt(length, 10)
  const { parts = 1 } = options
  const chunkSize = Math.ceil(length / parts)
  const makeTask = async (range: string, opts: DownloadOptions) => {
    const { data } = await send.call(this, {
      url: opts.url,
      header: {
        ...opts.header,
        Range: range
      },
      dataType: 'none',
      responseType: 'arraybuffer'
    })
    return data as ArrayBuffer
  }
  const chunks = await Promise.all(
    Array(Math.ceil(length / chunkSize))
      .fill(null)
      .map((_: any, i: number) =>
        makeTask(`bytes=${i * chunkSize}-${i * chunkSize + chunkSize - 1}/${length}`, options)
      )
  )
  const merged = new Uint8Array(chunks.reduce((s, c) => s + c.byteLength, 0))
  chunks.reduce((o, chunk) => {
    merged.set(new Uint8Array(chunk), o)
    return o + chunk.byteLength
  }, 0)
  if (options.filePath) {
    const fs: any = wx.getFileSystemManager()
    fs.writeFileSync(options.filePath, merged.buffer, 'binary')
    return { filePath: options.filePath }
  }
  return { buffer: merged.buffer }
}

type Defaults = Partial<Omit<Options, 'method' | 'url' | 'data'> & { baseUrl: string }>

interface Wrapped extends Record<Verbs, Func> {
  /**
   * 发起 HTTP 网络请求
   *
   * @param options 选项
   */
  (options: Options): Promise<Response>

  /**
   * 下载文件. 支持分段
   */
  download: typeof download

  /**
   * 返回一个包含默认选项的 request 封装. 可以设置 baseUrl, header等. 此方法不会改变当前的 request
   *
   * @param options 默认选项
   * @returns 包含默认选项的 request 对象
   */
  defaults(options: Defaults): Omit<Wrapped, 'defaults'>
}

function defaults<T extends Wrapped>(options?: Defaults): T {
  const cxt = ['options', 'get', 'head', 'post', 'put', 'delete', 'trace', 'connect'].reduce(
    (o, k) =>
      Object.assign(o, {
        [k](opts: string | Omit<Options, 'method'>) {
          if (typeof opts === 'string') {
            opts = { url: opts }
          }
          return send.call(this, {
            ...opts,
            method: k.toUpperCase() as Options['method']
          })
        }
      }),
    { _defaults: options, download }
  )
  Object.assign(cxt, {
    download(opts: DownloadOptions) {
      const { _defaults = {} }: { _defaults?: Defaults } = this as any
      const { baseUrl, header: h } = _defaults
      let { url, header } = opts
      if (baseUrl) {
        url = joinUrl(baseUrl, url)
      }
      if (h) {
        header = { ...header, ...h }
      }
      return download({ ...opts, url, header })
    }
  })
  return Object.assign(send.bind(cxt), cxt)
}

export const request: Wrapped = Object.assign(defaults(), { defaults })
