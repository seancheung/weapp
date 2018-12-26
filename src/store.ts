// tslint:disable:no-invalid-this no-shadowed-variable
declare namespace Page {
  interface ShareAppMessageOption {
    from: 'button' | 'menu' | string
    target: any
    webViewUrl?: string
  }
  interface CustomShareContent {
    title?: string
    path?: string
    imageUrl?: string
  }
  interface TabItemTapOption {
    index: string
    pagePath: string
    text: string
  }
  interface PageScrollOption {
    scrollTop: number
  }
}

type Page<T extends object = any> = Partial<{
  data: T
  route: string

  setData<K extends keyof T>(data: T | Pick<T, K> | object, callback?: () => void): void
  onload(query?: Record<string, string>): void
  onShow(): void
  onReady(): void
  onHide(): void
  onUnload(): void
  onPullDownRefresh(): void
  onReachBottom(): void
  onShareAppMessage(options?: Page.ShareAppMessageOption): Page.CustomShareContent
  onPageScroll(options?: Page.PageScrollOption): void
  onTabItemTap(options?: Page.TabItemTapOption): void
}>

declare namespace App {
  interface LaunchShowOption {
    path: string
    query: object
    scene: number
    shareTicket: string
    referrerInfo?: object
  }
  interface PageNotFoundOption {
    path: string
    query: object
    isEntryPage: boolean
  }
  interface GetAppOptions {
    allowDefault: boolean
  }
}

type App = Partial<{
  onLaunch(options?: App.LaunchShowOption): void
  onShow(options?: App.LaunchShowOption): void
  onHide(): void
  onError(error?: string): void
  onPageNotFound(options?: App.PageNotFoundOption): void
}>

declare function Page<T extends Page = any, U extends object = any>(options: Page<U> & T): void
declare function App<T extends App = any>(options: App & T): void
declare function getApp<T extends object>(options?: App.GetAppOptions): App & T
declare function GetCurrentPages(): Page[]

export interface Action {
  type: string
  [x: string]: any
}

export type Reducer<T extends object> = (state: T, action: Action) => T

/**
 * 合并多个 Reducers
 *
 * @param reducers 要进行合并的 Reducer
 * @returns 合并后的 Reducer
 */
export function combineReducers<T extends object>(
  reducers: Record<string, Reducer<any>>
): Reducer<T> {
  return (state: object = {}, action: Action): T => {
    return Object.keys(reducers).reduce(
      (o: any, k) => {
        o[k] = reducers[k](state, action)
        return o
      },
      {} as T
    )
  }
}

export interface Store<T extends object> {
  state: T
  reducer: Reducer<T>
  dispatch(data: Action): void
  setState(state: Partial<T>): void
}

/**
 * 创建一个 Store
 * @param reducer 关联的 Reducer
 */
export function createStore<T extends object>(reducer: Reducer<T>): Store<T> {
  return {
    state: {} as T,
    reducer,
    dispatch(data: Action): void {
      const state = this.reducer(this.state, data)
      this.setState(state)
    },
    setState(state: Partial<T>): void {
      Object.assign(this.state, state)
      GetCurrentPages().forEach(p => isConnected(p) && p.$sync(this.state))
    }
  }
}

type Dispatch = (data: Action) => void
type Actor = (...args: any[]) => Promise<void>
interface Director<T extends Record<string, Actor>> {
  $director: T
}
interface Connected {
  $sync(state: object): void
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

/**
 * 创建一个关联指定 Store 的 App. 用法同 App(). 只能调用一次
 *
 * @param options App 参数
 * @param store 关联的 Store
 */
export function provider<T extends object, TState extends object>(
  options: App & T,
  store: Store<TState>
): void {
  const { onLaunch } = options
  App({
    ...options,
    store,
    onLaunch(opts?: App.LaunchShowOption): void {
      this.store.dispatch({ type: '::init' })
      if (onLaunch) {
        onLaunch.call(this, opts)
      }
    }
  })
}

/**
 * 创建一个关联 Provider 的 Page. 用法同 Page()
 *
 * @param options Page 参数
 */
export function connect<T extends Page, TData extends object>(options: Page<TData> & T): void
/**
 * 创建一个关联 Provider 的 Page. 用法同 Page()
 *
 * @param options Page 参数
 * @param stateMapper 状态订阅映射
 */
export function connect<T extends Page, TData extends object, TState extends object>(
  options: Page<TData & TState> & T,
  stateMapper: (state: object) => TState
): void
/**
 * 创建一个关联 Provider 的 Page. 用法同 Page()
 *
 * @param options Page 参数
 * @param stateMapper 状态订阅映射
 * @param directorMapper Director 映射
 */
export function connect<
  T extends Page,
  TData extends object,
  TState extends object,
  TDirector extends Record<string, Actor>
>(
  options: Page<TData & TState> & T & Director<TDirector>,
  stateMapper: (state: object) => TState,
  directorMapper: (dispatch: Dispatch) => TDirector
): void
export function connect<
  T extends Page,
  TData extends object,
  TState extends object,
  TDirector extends Record<string, Actor>
>(
  options: Page<TData & TState> & T & Director<TDirector>,
  stateMapper?: (state: object) => TState,
  directorMapper?: (dispatch: Dispatch) => TDirector
): void {
  const { onload } = options
  let { data = {} } = options
  if (stateMapper) {
    data = { ...data, ...fix(stateMapper({})) }
  }
  Page({
    ...options,
    data,
    onload(query?: Record<string, string>): void {
      const app = getApp<{ store: Store<any> }>()
      if (directorMapper) {
        this.$director = directorMapper(app.store.dispatch.bind(app.store))
      }
      if (stateMapper) {
        const sync = (state: any) => this.setData(fix(stateMapper(state)))
        Object.assign(this, { $sync: sync })
      }
      if (isConnected(this)) {
        this.$sync(app.store.state)
      }
      if (onload) {
        return onload.call(this, query)
      }
    }
  })
}
