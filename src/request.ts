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

export const wrapped: Record<Verbs, Func> & { send: typeof send } = [
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
      [k]: (opts: Omit<Options, 'method'>) =>
        send({ ...opts, method: k.toUpperCase() as Options['method'] })
    }),
  { send } as any
)
