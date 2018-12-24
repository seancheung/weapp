// tslint:disable:no-invalid-this
import { Omit, wrapped as wx } from './wrap'

type Options = Parameters<typeof wx.request>[0]
type Func = (options: Omit<Options, 'method'>) => ReturnType<typeof wx.request>
type Verbs = 'options' | 'get' | 'head' | 'post' | 'put' | 'delete' | 'trace' | 'connect'

class HttpError extends Error {
  readonly code: number
  constructor(code: number, message?: string) {
    super(message)
    this.code = code
  }
}

async function send(options: Options) {
  const res = await wx.request(options)
  if (res.statusCode >= 400) {
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
}

type Defaults = Partial<Omit<Options, 'method' | 'url' | 'data'> & { baseUrl: string }>

interface Wrapped extends Record<Verbs, Func> {
  send: typeof send
  defaults(options: Defaults): Omit<Wrapped, 'defaults'>
}

function defaults<T extends Wrapped>(this: T, options: Defaults): T {
  return { ...this, _defaults: options }
}

export const wrapped: Wrapped = [
  'options',
  'get',
  'head',
  'post',
  'put',
  'delete',
  'trace',
  'connect'
].reduce(
  (o, k) =>
    Object.assign(o, {
      [k](opts: Omit<Options, 'method'>) {
        const { _defaults = {} }: { _defaults?: Defaults } = this
        const { baseUrl, dataType, header: h, responseType } = _defaults
        let { url, header } = opts
        if (baseUrl) {
          url = (baseUrl + '/' + url).replace(/\/{2,}/g, '')
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
  { send, defaults } as any
)
