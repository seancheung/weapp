import { wrapped as wx } from './wrap'

type Parameter<T extends (p: any) => any> = T extends (p: infer P) => any ? P : never

/**
 * Encode query string
 *
 * @param query Query object
 * @returns Encoded query string
 */
export function encodeQuery(query: Record<string, any>): string {
  return Object.entries(query)
    .filter(([, v]) => v != null)
    .map(([k, v]) => `${k}=${v}`)
    .join('&')
}

/**
 * Decod query object
 *
 * @param query Query object
 * @returns Decoded query object
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
 * Check settings and authorize if required
 *
 * @param scope Scope
 */
export async function authorize(scope: string): Promise<void> {
  const { authSetting } = await wx.getSetting()
  if (!authSetting[scope]) {
    await wx.authorize({ scope })
  }
}

type getLocation = typeof wx.getLocation
/**
 * Authorize and get location
 *
 * @param opts options
 */
export async function getLocation(opts: Parameter<getLocation>): ReturnType<getLocation> {
  await authorize('scope.userLocation')
  return wx.getLocation(opts)
}
