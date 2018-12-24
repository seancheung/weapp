import { wrapped } from './wrap'
const { getStorage, getStorageInfo, removeStorage, setStorage } = wrapped

/**
 * 缓存选项
 */
interface Options {
  /**
   * 本地缓存中指定的 key
   */
  key: string
  /**
   * 需要存储的内容. 只支持原生类型、Date、及能够通过 JSON.stringify 序列化的对象
   */
  data: any
  /**
   * 有效时间(秒). 为空或0则不会过期
   */
  ttl?: number
}

/**
 * 从本地缓存中获取指定 key 的内容. key不存在或已过期则返回 undefined. 注意此接口只能获取到由 set 添加的缓存
 *
 * @param key 本地缓存中指定的 key
 * @returns key对应的内容
 */
export async function get<R = any>(key: string): Promise<R> {
  key = `$${key}#`
  try {
    const { data } = await getStorage({ key })
    const [exp, value]: [number, any] = JSON.parse(data)
    if (exp && exp < Date.now()) {
      await removeStorage({ key })
    } else {
      return value
    }
  } catch (error) {
    //
  }
}

/**
 * 将数据存储在本地缓存中指定的 key 中. 会覆盖掉原来该 key 对应的内容. 注意此接口添加的缓存只能由 get 获取到
 *
 * @param opts 选项
 */
export async function set(opts: Options): Promise<void> {
  const { key, data: value, ttl } = opts
  const exp = ttl ? Date.now() + ttl * 1000 : 0
  const data = JSON.stringify([exp, value])
  await setStorage({ key: `$${key}#`, data })
}

/**
 * 从本地缓存中移除指定 key
 *
 * @param key 本地缓存中指定的 key
 */
export async function del(key: string): Promise<void> {
  try {
    await removeStorage({ key: `$${key}#` })
  } catch (error) {
    //
  }
}

/**
 * 移除所有已过期的缓存
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
      array.filter(({ exp }) => exp && exp < Date.now()).map(({ key }) => removeStorage({ key }))
    )
  } catch (error) {
    //
  }
}
