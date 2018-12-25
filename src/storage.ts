// tslint:disable:no-shadowed-variable
import { wrapped } from './wrap'
const { getStorage, getStorageInfo, removeStorage, setStorage } = wrapped

const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/

function reviver(key: any, value: any) {
  if (typeof value === 'string' && dateFormat.test(value)) {
    return new Date(value)
  }

  return value
}

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

async function safeGetStorage<R = any>(key: string): Promise<R> {
  let res: any
  try {
    res = await getStorage({ key })
  } catch (error) {
    if (!/not found/i.test(error.message)) {
      throw error
    }
  }
  return res && res.data
}

/**
 * 从本地缓存中获取指定 key 的内容. key不存在或已过期则返回 undefined. 注意此接口只能获取到由 set 添加的缓存
 *
 * @param key 本地缓存中指定的 key
 * @returns key 对应的内容. Date 将被反序列化
 */
export async function get<R = any>(key: string): Promise<R> {
  key = `$${key}#`
  const data = await safeGetStorage(key)
  if (!data) {
    return
  }
  const [exp, value]: [number, any] = JSON.parse(data, reviver)
  if (exp && exp < Date.now()) {
    await removeStorage({ key })
  } else {
    return value
  }
}

/**
 * 将数据存储在本地缓存中指定的 key 中. 会覆盖掉原来该 key 对应的内容. 注意此接口添加的缓存只能由 get 获取到
 *
 * @param opts 选项
 */
export async function set(opts: Options): Promise<void> {
  const { key, data: value, ttl } = opts
  if (ttl && (typeof ttl !== 'number' || ttl < 0)) {
    throw new Error('Invalid ttl value')
  }
  const exp = ttl ? Date.now() + ttl * 1000 : 0
  const data = JSON.stringify([exp, value])
  await setStorage({ key: `$${key}#`, data })
}

/**
 * 从本地缓存中移除指定 key. 注意此接口只能移除由 set 添加的缓存
 *
 * @param key 本地缓存中指定的 key
 */
export async function del(key: string): Promise<void> {
  await removeStorage({ key: `$${key}#` })
}

/**
 * 移除所有已过期的缓存. 注意此接口只能移除由 set 添加的缓存
 */
export async function flush(): Promise<void> {
  const { keys } = await getStorageInfo()
  await touch(...keys)
}

/**
 * 检查指定的key是否已过期, 是则移除. 不存在的 key 忽略. 注意此接口只能检查由 set 添加的缓存
 *
 * @param keys 本地缓存中指定的 key
 * @returns 移除掉的 key 数量
 */
export async function touch(...keys: string[]): Promise<number> {
  const array = await Promise.all(
    keys
      .filter(k => /^\$.+#$/.test(k))
      .map(key =>
        (async () => {
          const data = await safeGetStorage(key)
          if (!data) {
            return
          }
          const [exp]: [number, any] = JSON.parse(data)
          return { key, exp }
        })()
      )
  )
  const expired = array.filter(i => i).filter(({ exp }) => exp && exp < Date.now())
  await Promise.all(expired.map(({ key }) => removeStorage({ key })))
  return expired.length
}

/**
 * 检查 key 是否存在. 注意此接口只能检查由 set 添加的缓存
 *
 * @param key 本地缓存中指定的 key
 * @returns Key 是否存在
 */
export async function exists(key: string): Promise<boolean> {
  key = `$${key}#`
  const data = await safeGetStorage(key)
  if (!data) {
    return false
  }
  const [exp]: [number] = JSON.parse(data)
  if (!exp) {
    return true
  }
  if (exp < Date.now()) {
    await removeStorage({ key })
    return false
  } else {
    return true
  }
}

/**
 * 获取指定key的剩余有效时间(秒). 注意此接口只能获取由 set 添加的缓存
 *
 * @param key 本地缓存中指定的 key
 * @returns 剩余有效时间(秒). 若key不存在返回-1; 若 key 不会过期返回-2
 */
export async function ttl(key: string): Promise<number> {
  key = `$${key}#`
  const data = await safeGetStorage(key)
  if (!data) {
    return -2
  }
  const [exp]: [number] = JSON.parse(data)
  if (!exp) {
    return -1
  }
  const val = exp - Date.now()
  if (val <= 0) {
    await removeStorage({ key })
  } else {
    return Math.floor(val / 1000)
  }
}

/**
 * 更新指定 key 的有效时间. 注意此接口只能设置由 set 添加的缓存
 *
 * @param key 本地缓存中指定的 key
 * @param ttl 有效时间(秒)
 * @returns key 存在且设置成功则返回true
 */
export async function expire(key: string, ttl: number): Promise<boolean> {
  if (!ttl || typeof ttl !== 'number' || ttl < 0) {
    throw new Error('Invalid ttl value')
  }
  key = `$${key}#`
  const data = await safeGetStorage(key)
  if (!data) {
    return false
  }
  const [exp, value]: [number, any] = JSON.parse(data, reviver)
  if (exp && exp < Date.now()) {
    await removeStorage({ key })
    return false
  } else {
    const p = ttl ? Date.now() + ttl * 1000 : 0
    const v = JSON.stringify([p, value])
    await setStorage({ key: `$${key}#`, data: v })
    return true
  }
}

/**
 * 移除指定 key 的有效时间让其不会过期. 注意此接口只能设置由 set 添加的缓存
 *
 * @param key 本地缓存中指定的 key
 * @returns key 存在且设置成功则返回true
 */
export async function persist(key: string): Promise<boolean> {
  key = `$${key}#`
  const data = await safeGetStorage(key)
  if (!data) {
    return false
  }
  const [exp, value]: [number, any] = JSON.parse(data, reviver)
  if (!exp) {
    return false
  }
  if (exp < Date.now()) {
    await removeStorage({ key })
    return false
  } else {
    const v = JSON.stringify([0, value])
    await setStorage({ key: `$${key}#`, data: v })
    return true
  }
}
