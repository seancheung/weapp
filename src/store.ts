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

interface Connected {
  $sync(state: Record<string, any>): void
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

export interface Action {
  type: string
  [x: string]: any
}

export type Reducer<T extends Record<string, any>> = (state: T, action: Action) => T
export type Dispatch = (data: Action) => void
export type Director<T extends Record<string, Function>> = (dispatch: Dispatch) => T

export interface Store<T extends Record<string, any>> {
  state: T
  reducer: Reducer<T>
  dispatch(data: Action): void
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
 * @param reducer 关联的 Reducer
 */
export function createStore<T extends Record<string, any>>(reducer: Reducer<T>): Store<T> {
  return {
    state: {} as T,
    reducer,
    dispatch(data: Action): void {
      const state = this.reducer(this.state, data)
      this.setState(state)
    },
    setState(state: Partial<T>): void {
      Object.assign(this.state, state)
      getCurrentPages().forEach(p => isConnected(p) && p.$sync(this.state))
    }
  }
}

/**
 * 创建一个关联指定 Store 的 App. 用法同 App(). 只能调用一次
 *
 * @param store 关联的 Store
 * @param options App 参数
 */
export function provider<
  TState extends Record<string, any>,
  TApp extends wx.App & Record<string, any>
>(store: Store<TState>, options: wx.App & TApp): void {
  const { onLaunch } = options || ({} as any)
  App({
    ...options,
    store,
    onLaunch(opts?: wx.App.LaunchShowOption): void {
      this.store.dispatch({ type: '::init' })
      if (onLaunch) {
        onLaunch.call(this, opts)
      }
    }
  })
}

/**
 * 创建一个关联 Provider 的 Page
 * @returns Page 构造器
 * @param options Page 参数
 */
export function connect<
  TData extends Record<string, any>,
  TPage extends wx.Page & Record<string, any>
>(options: wx.Page<TData> & TPage): void
/**
 * 创建一个关联 Provider 的 Page
 *
 * @param stateMapper 状态订阅映射
 * @param options Page 参数
 */
export function connect<
  TState extends Record<string, any>,
  TData extends Record<string, any>,
  TPage extends wx.Page & Record<string, any>
>(stateMapper: StateMapper<TState>, options: wx.Page<TData & Partial<TState>> & TPage): void
/**
 * 创建一个关联 Provider 的 Page
 *
 * @param stateMapper 状态订阅映射
 * @param director Director 映射
 * @param options Page 参数
 */
export function connect<
  TState extends Record<string, any>,
  TDirector extends Record<string, Actor>,
  TData extends Record<string, any>,
  TPage extends wx.Page & Record<string, any>
>(
  stateMapper: StateMapper<TState>,
  director: Director<TDirector>,
  options: wx.Page<TData & Partial<TState>> & TPage & MappedDirector<TDirector>
): void

export function connect(
  stateMapper?: StateMapper<any>,
  director?: Director<any>,
  options?: any
): void {
  if (stateMapper) {
    const { onLoad } = options || ({} as any)
    options = {
      ...options,
      $sync(state: any): void {
        this.setData(fix(stateMapper(state)))
      },
      onLoad(query?: any): void {
        const app = getApp<{ store: Store<any> }>()
        if (isConnected(this)) {
          this.$sync(app.store.state)
        }
        if (director) {
          Object.assign(this, director(app.store.dispatch.bind(app.store)))
        }
        if (onLoad) {
          return onLoad.call(this, query)
        }
      }
    }
  }
  Page(options)
}
