// tslint:disable:no-invalid-this no-shadowed-variable
import { wx } from './wx'

declare function Page<T extends wx.Page & Record<string, any>, U extends Record<string, any>>(
  options: wx.Page<U> & T
): void
declare function App<T extends wx.App & Record<string, any>>(options: wx.App & T): void
declare function getApp<T extends Record<string, any>>(options?: wx.App.GetAppOptions): wx.App & T
declare function getCurrentPages(): wx.Page[]
type StateMapper<T> = (state: Record<string, any>) => T
type Actor = (...args: any[]) => (dispatch: Dispatch) => any
type MappedDirector<T extends Record<string, Actor>> = {
  [K in keyof T]?: (...args: Parameters<T[K]>) => ReturnType<ReturnType<T[K]>>
}

interface Connected extends ConnectedPage {
  $sync(state: Record<string, any>, cb?: () => void): void
}

function isConnected(page: any): page is Connected {
  return typeof page.$sync === 'function'
}
function fix<T extends Record<string, any>>(data: T): T {
  return Object.keys(data).reduce((o: any, k) => {
    o[k] = data[k]
    if (o[k] === undefined) {
      o[k] = null
    }
    return o
  }, {})
}
function shallowEql(objA: Record<string, any>, objB: Record<string, any>): boolean {
  if (objA === objB) {
    return true
  }
  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)
  if (keysA.length !== keysB.length) {
    return false
  }
  return Array.from(new Set([...keysA, ...keysB])).every(k => objA[k] === objB[k])
}

export interface Action {
  type: string
  [x: string]: any
}

export type Reducer<T extends Record<string, any>> = (state: T, action: Action) => T
export type Dispatch = (action: Action) => void
export type Director<T extends Record<string, Function>> = (dispatch: Dispatch) => T

export interface ConnectedPage {
  /**
   * 停止接收被动同步
   */
  $stopSync?: boolean
  /**
   * 主动同步订阅的 state
   *
   * @param cb 完成后回调
   */
  $sync?(cb?: () => void): void
}

export interface Store<T extends Record<string, any>> {
  /**
   * 状态
   */
  state: T
  /**
   * 处理状态的 Reducer
   */
  reducer: Reducer<T>
  /**
   * 触发一个 Action
   *
   * @param action 移交给 Reducer 的 Action
   */
  dispatch(action: Action): void
  /**
   * 更新状态
   *
   * @param state 新状态
   */
  setState(state: Partial<T>): void
}

/**
 * 合并多个 Reducers
 *
 * @param reducers 要进行合并的 Reducer
 * @returns 合并后的 Reducer
 */
export function combineReducers<T extends Record<string, any>>(
  reducers: Record<string, Reducer<any>>
): Reducer<T> {
  return (state: Record<string, any> = {}, action: Action): T => {
    return Object.keys(reducers).reduce(
      (o: any, k) => {
        o[k] = reducers[k](state, action)
        return o
      },
      {} as T
    )
  }
}

/**
 * 创建一个 Director
 *
 * @param actors 要转换的 Actors
 * @returns Director
 */
export function createDirector<T extends Record<string, Actor>>(actors?: T): Director<T> {
  return (dispatch: Dispatch) =>
    Object.entries(actors).reduce(
      (t, [k, func]) => Object.assign(t, { [k]: (...args: any[]) => func(...args)(dispatch) }),
      {} as T
    )
}

/**
 * 创建一个 Store
 *
 * @param reducer 关联的 Reducer
 * @returns Store
 */
export function createStore<T extends Record<string, any>>(reducer: Reducer<T>): Store<T> {
  return {
    state: {} as T,
    reducer,
    dispatch(action: Action): void {
      const state = this.reducer(this.state, action)
      this.setState(state)
    },
    setState(state: Partial<T>): void {
      if (!shallowEql(this.state, state)) {
        Object.assign(this.state, state)
        getCurrentPages().forEach(p => isConnected(p) && !p.$stopSync && p.$sync(this.state))
      }
    }
  }
}

/**
 * 创建一个关联指定 Store 的 App
 *
 * @param store 关联的 Store
 * @returns App 构造器
 */
export function provider<TState extends Record<string, any>>(
  store: Store<TState>
): <TApp extends wx.App & Record<string, any>>(options: wx.App & TApp) => void {
  return <TApp extends wx.App & Record<string, any>>(options: wx.App & TApp): void => {
    const { onLaunch } = options || ({} as any)
    App({
      ...options,
      store,
      onLaunch(opts?: any): void {
        this.store.dispatch({ type: '::init' })
        if (onLaunch) {
          onLaunch.call(this, opts)
        }
      }
    })
  }
}

/**
 * 创建一个关联默认 Provider 的 Page
 *
 * @returns Page 构造器
 */
export function connect(): <
  TData extends Record<string, any>,
  TPage extends wx.Page & Record<string, any>
>(
  options: wx.Page<TData> & TPage
) => void
/**
 * 创建一个关联默认 Provider 的 Page
 *
 * @param stateMapper 状态订阅映射
 * @returns Page 构造器
 */
export function connect<TState extends Record<string, any>>(
  stateMapper: StateMapper<TState>
): <TData extends Record<string, any>, TPage extends wx.Page & Record<string, any>>(
  options: wx.Page<TData & Partial<TState>> & TPage & ConnectedPage
) => void
/**
 * 创建一个关联默认 Provider 的 Page
 *
 * @param stateMapper 状态订阅映射
 * @param director Director 映射
 * @returns Page 构造器
 */
export function connect<
  TState extends Record<string, any>,
  TDirector extends Record<string, Actor>
>(
  stateMapper: StateMapper<TState>,
  director: Director<TDirector>
): <TData extends Record<string, any>, TPage extends wx.Page & Record<string, any>>(
  options: wx.Page<TData & Partial<TState>> & TPage & ConnectedPage & MappedDirector<TDirector>
) => void

export function connect(stateMapper?: StateMapper<any>, director?: Director<any>): any {
  return <TData extends Record<string, any>, TPage extends wx.Page & Record<string, any>>(
    options: wx.Page<TData> & TPage & ConnectedPage
  ): void => {
    if (stateMapper) {
      const { onLoad } = options || ({} as any)
      options = {
        ...options,
        $sync(state?: any, cb?: any): void {
          if (typeof state === 'function') {
            cb = state
            state = null
          }
          if (state == null) {
            const app = getApp<{ store: Store<any> }>()
            state = app.store.state
          }
          const data = fix(stateMapper(state))
          if (Object.keys(data).length > 0) {
            this.setData(data, cb)
          } else if (cb) {
            cb()
          }
        },
        onLoad(this: Connected, query?: any): void {
          this.$sync(() => {
            if (onLoad) {
              onLoad.call(this, query)
            }
          })
        }
      }
    }
    if (director) {
      const { onLoad } = options || ({} as any)
      options = {
        ...options,
        onLoad(query?: any): void {
          const app = getApp<{ store: Store<any> }>()
          Object.assign(this, director(app.store.dispatch.bind(app.store)))
          if (onLoad) {
            onLoad.call(this, query)
          }
        }
      }
    }
    Page(options)
  }
}
