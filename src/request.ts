// tslint:disable:no-invalid-this
import { joinUrl } from './utils'
import { Omit, wrapped } from './wrap'
declare const wx: any

interface Options {
  url: string
  data?: string | object | ArrayBuffer
  header?: Record<string, any>
  method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
  dataType?: string
  responseType?: 'text' | 'arraybuffer'
}
interface Response {
  data: string | object | ArrayBuffer
  statusCode: number
  header: Record<string, any>
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

async function send(options: Options): Promise<Response> {
  const res = await wrapped.request(options)
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
  url: string
  filePath?: string
  parts?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  header?: Record<string, any>
}
interface DownloadResult {
  filePath?: string
  buffer?: ArrayBuffer
}
async function download(options: DownloadOptions): Promise<DownloadResult> {
  const { header } = await send({
    ...options,
    method: 'HEAD'
  })
  let length = header && header['Content-Length']
  if (length == null) {
    throw new Error('Not Supported')
  }
  length = parseInt(length, 10)
  const chunkSize = Math.ceil(length / options.parts)
  const makeTask = async (range: string, opts: DownloadOptions) => {
    const { data } = await send({
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
  (options: Options): Promise<Response>
  download: typeof download
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
          const { _defaults = {} }: { _defaults?: Defaults } = this as any
          const { baseUrl, dataType, header: h, responseType } = _defaults
          let { url, header } = opts
          if (baseUrl) {
            url = joinUrl(baseUrl, url)
          }
          if (h) {
            header = { ...header, ...h }
          }
          return send({
            dataType,
            responseType,
            ...opts,
            url,
            header,
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
