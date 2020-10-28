export interface Action<T extends Action.Type> {
  /**
   * 分发消息类别
   */
  type: T
  [x: string]: any
}
export declare namespace Action {
  type Type = string | number | symbol
}
export type Reducer<S, T extends Action.Type> = (state: S, action: Action<T>) => S
export type Subscriber = () => void
export type Unsubscribe = () => void
export type Dispatch<T extends Action.Type, R extends Action<T>> = (action: R) => R
interface ReducerMap {
  [x: string]: Reducer<any, any>
}
type CombinedReducer<M extends ReducerMap> = Reducer<
  { [K in keyof M]: M[K] extends Reducer<infer S, any> ? S : never },
  { [K in keyof M]: M[K] extends Reducer<any, infer T> ? T : never }[keyof M]
>

/**
 * 用来维持应用所有的`state`树 的一个对象
 */
export interface Store<S, T extends Action.Type> {
  /**
   * 返回应用当前的`state`树
   *
   * @returns 应用当前的`state`树
   */
  getState(): S
  /**
   * 分发`action`
   *
   * @param action 描述应用变化的普通对象
   * @returns 要`dispatch`的`action`
   */
  dispatch<R extends Action<T>>(action: R): R
  /**
   * 添加一个变化监听器
   *
   * @param listener 每当`dispatch`的时候都会执行的回调
   * @returns 可以解绑变化监听器的函数
   */
  subscribe(listener: Subscriber): Unsubscribe
  /**
   * 替换`store`当前用来计算`state`的`reducer`
   *
   * @param nextReducer `store`会使用的下一个`reducer`
   */
  replaceReducer(nextReducer: Reducer<S, T>): void
}

/**
 * 创建一个`store`来以存放应用中所有的`state`
 *
 * @param reducer 接收两个参数，分别是当前的`state`树和要处理的`action`，返回新的`state`树
 * @param preloadedState 初始时的`state`
 */
export function createStore<S, T extends Action.Type>(
  reducer: Reducer<S, T>,
  preloadedState?: S
): Store<S, T> {
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }
  let _state = preloadedState
  let _reducer = reducer
  const _listeners: Subscriber[] = []
  let _dispatching = false
  function dispatch<R extends Action<T>>(action: R): R {
    if (!action || typeof action !== 'object') {
      throw new Error('Actions must be plain objects.')
    }
    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?'
      )
    }
    if (_dispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }
    try {
      _dispatching = true
      _state = _reducer.call(null, _state, action)
    } finally {
      _dispatching = false
    }
    const listeners = _listeners.slice()
    for (const listener of listeners) {
      listener.call(null)
    }
    return action
  }
  function getState() {
    if (_dispatching) {
      throw new Error(
        'You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.'
      )
    }
    return _state
  }
  function subscribe(listener: Subscriber): Unsubscribe {
    if (_dispatching) {
      throw new Error(
        'You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.'
      )
    }
    let isSubscribed = true
    _listeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }
      if (_dispatching) {
        throw new Error(
          'You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.'
        )
      }
      isSubscribed = false
      const index = _listeners.indexOf(listener)
      _listeners.splice(index, 1)
    }
  }
  function replaceReducer(nextReducer: Reducer<S, T>): void {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the reducer to be a function.')
    }
    _reducer = nextReducer
    dispatch({ type: '::replace' as T })
  }
  dispatch({ type: '::init' as T })
  return {
    getState,
    dispatch,
    subscribe,
    replaceReducer
  }
}

/**
 * 把一个由多个不同`reducer`函数作为`value`的`object`，合并成一个最终的`reducer`函数
 *
 * @param reducers 多个不同`reducer`组成的对象
 * @returns 一个调用`reducers`对象里所有`reducer`的`reducer`
 */
export function combineReducers<M extends ReducerMap>(reducers: M): CombinedReducer<M> {
  return (state = {} as any, action) => {
    return Object.keys(reducers).reduce((o, k) => {
      o[k] = reducers[k](state[k], action)
      return o
    }, {} as any)
  }
}
/**
 * 提供`store`的生产者
 */
export interface Provider<S = any, T extends Action.Type = any> {
  /**
   * 注入的`store`
   */
  readonly $store: Store<S, T>
}
/**
 * 创建一个提供`store`的生产者
 *
 * @param store 要注入的`store`实例
 * @param options 目标实例
 */
export function createProvider<R extends Record<string, any>, S, T extends Action.Type>(
  store: Store<S, T>,
  options: R
): R & Provider {
  return {
    ...options,
    get $store() {
      return store
    }
  }
}
declare function getApp(): Provider
interface PageContext {
  setData(data: any): void
}
interface PageOptions {
  onLoad(...args: any[]): void
  onUnload(...args: any[]): void
}
/**
 * 订阅`store`变化的消费者
 */
export interface Consumer<T extends Action.Type = any> {
  /**
   * 分发`action`
   *
   * @param action 描述应用变化的普通对象
   */
  $dispatch(action: Action<T>): void
}
export type StateMapper<S, U> = (state: S) => U
/**
 * 创建一个订阅`store`变化的消费者
 *
 * @param options 目标实例
 */
export function createConsumer<R extends Record<string, any>, T extends Action.Type>(
  options: R
): R & Consumer<T>
/**
 * 创建一个订阅`store`变化的消费者
 *
 * @param options 目标实例
 * @param stateMapper 状态映射函数
 */
export function createConsumer<R extends Record<string, any>, S, T extends Action.Type, U = any>(
  options: R,
  stateMapper: StateMapper<S, U>
): R & Consumer<T>
export function createConsumer(options: PageOptions, stateMapper?: any): any {
  const { onLoad, onUnload } = options
  const _stateMapper: StateMapper<any, any> = stateMapper
  let _disconn: () => void
  function _dispatch(this: Provider, action: Action<any>) {
    const store = this.$store || getApp().$store
    if (store) {
      return store.dispatch(action)
    }
  }
  function _onLoad(this: Provider & PageContext, ...args: any[]) {
    const store = this.$store || getApp().$store
    if (store && typeof _stateMapper === 'function' && _disconn == null) {
      _disconn = store.subscribe(() => {
        const state = store.getState()
        const data = _stateMapper.call(null, state)
        this.setData(data)
      })
      store.dispatch({ type: '::connect' })
    }
    if (typeof onLoad === 'function') {
      onLoad.apply(this, args)
    }
  }
  function _onUnload(this: PageContext, ...args: any[]) {
    if (typeof _disconn === 'function') {
      _disconn.call(null)
      _disconn = undefined
    }
    if (typeof onUnload === 'function') {
      onUnload.apply(this, args)
    }
  }
  return {
    ...options,
    $dispatch: _dispatch,
    onLoad: _onLoad,
    onUnload: _onUnload
  }
}

/**
 * 将一个类标记为提供`store`的生产者
 *
 * @param store 要注入的`store`实例
 */
export function Provider<S, T extends Action.Type>(store: Store<S, T>): ClassDecorator
export function Provider(store: any): Function {
  return (target: Function) => {
    // NOTE: 此处只能通过`prototype`修改且不能使用`Object.defineProperty`否则`App`与`Page`构造器无法复制
    target.prototype.$store = store
  }
}

const $mapper = '__mappers__'
/**
 * 将一个类标记为订阅`store`变化的消费者
 */
export function Consumer(): ClassDecorator
/**
 * 将一个类标记为订阅`store`变化的消费者
 *
 * @param stateMapper 状态映射函数
 */
export function Consumer<S, U>(stateMapper: StateMapper<S, U>): ClassDecorator
export function Consumer(stateMapper?: StateMapper<any, any>): Function {
  return (target: Function) => {
    let _stateMapper: StateMapper<any, any> = stateMapper
    const mapper: Array<{ key: string; path: string[] }> = target.prototype[$mapper]
    if (mapper) {
      const initMapper = stateMapper
      _stateMapper = (state: any) =>
        mapper.reduce(
          (p, c) => Object.assign(p, { [c.key]: c.path.reduce((o, k) => o[k], state) }),
          initMapper ? initMapper.call(null, state) : {}
        )
    }
    const options = createConsumer(
      { onLoad: target.prototype.onLoad, onUnload: target.prototype.onUnload },
      _stateMapper
    )
    Object.assign(target.prototype, options)
  }
}
export namespace Consumer {
  /**
   * 子状态绑定对象
   */
  export interface Namespace {
    State(name: string): PropertyDecorator
    State(target: Object, propertyKey: string | symbol): void
  }
  /**
   * 将一个属性映射为`store`中的指定状态
   *
   * @param name `store`中对应状态的名称
   */
  export function State(name: string): PropertyDecorator
  /**
   * 将一个属性映射为`store`中的指定状态
   */
  export function State(target: Object, propertyKey: string | symbol): void
  export function State(arg1: any, propertyKey?: any) {
    return bindState([], arg1, propertyKey)
  }
  /**
   * 获取`store`中指定子状态的绑定对象
   *
   * @param name `store`中对应的子状态的名称
   */
  export function namespace(name: string): Namespace {
    return {
      State(arg1: any, propertyKey?: any) {
        return bindState([name], arg1, propertyKey)
      }
    }
  }
}
function bindState(ns: string[], arg1: any, propertyKey?: any): any {
  if (!propertyKey) {
    return (target: any, key: any) => {
      if (!target[$mapper]) {
        Object.defineProperty(target, $mapper, {
          value: [],
          enumerable: false
        })
      }
      target[$mapper].push({ key, path: [...ns, arg1 || key] })
    }
  }
  if (!arg1[$mapper]) {
    Object.defineProperty(arg1, $mapper, {
      value: [],
      enumerable: false
    })
  }
  arg1[$mapper].push({ key: propertyKey, path: [...ns, propertyKey] })
}
