import { getStorage, getStorageInfo, removeStorage, setStorage } from './wrap'

/**
 * Get storage
 *
 * @param key Storage key
 */
export async function get<R = any>(key: string): Promise<R> {
  key = `$${key}#`
  try {
    const { data } = await getStorage({ key })
    const [exp, value]: [number, any] = JSON.parse(data)
    if (Date.now() > exp) {
      await removeStorage({ key })
    } else {
      return value
    }
  } catch (error) {
    //
  }
}

/**
 * Set storage by key
 *
 * @param opts Options
 */
export async function set(opts: { key: string; data: any; ttl: number }): Promise<void> {
  const { key, data: value, ttl } = opts
  const data = JSON.stringify([Date.now() + ttl * 1000, value])
  await setStorage({ key: `$${key}#`, data })
}

/**
 * Delete storage by key
 *
 * @param key Key
 */
export async function del(key: string): Promise<void> {
  try {
    await removeStorage({ key: `$${key}#` })
  } catch (error) {
    //
  }
}

/**
 * Flush expired keys
 */
export async function flush(): Promise<void> {
  try {
    const { keys } = await getStorageInfo()
    const array = await Promise.all(
      keys
        .filter(k => /^\$.+#$/.test(k))
        .map(key =>
          (async () => {
            const { data } = await getStorage({ key })
            const [exp]: [number, any] = JSON.parse(data)
            return { key, exp }
          })()
        )
    )
    await Promise.all(
      array.filter(({ exp }) => exp < Date.now()).map(({ key }) => removeStorage({ key }))
    )
  } catch (error) {
    //
  }
}
