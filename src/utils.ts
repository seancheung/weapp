export function encodeQuery(query: Record<string, any>): string {
  return Object.entries(query)
    .filter(([, v]) => v != null)
    .map(([k, v]) => `${k}=${v}`)
    .join('&')
}
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
