// tslint:disable: no-shadowed-variable

export interface Store<S> {
  readonly state: S
  readonly getters: Record<string, any>
  dispatch: Dispatch
  commit: Commit
  subscribe<P extends MutationPayload>(fn: (mutation: P, state: S) => any): () => void
}

export interface Dispatch {
  (type: string, payload?: any, options?: DispatchOptions): Promise<any>
  <P extends Payload>(payloadWithType: P, options?: DispatchOptions): Promise<any>
}

export interface Commit {
  (type: string, payload?: any, options?: CommitOptions): void
  <P extends Payload>(payloadWithType: P, options?: CommitOptions): void
}

export interface ActionContext<S, R> {
  dispatch: Dispatch
  commit: Commit
  state: S
  getters: any
  rootState: R
  rootGetters: any
}

export interface Payload {
  type: string
}

export interface MutationPayload extends Payload {
  payload: any
}

export interface ActionPayload extends Payload {
  payload: any
}

export interface DispatchOptions {
  root?: boolean
}

export interface CommitOptions {
  root?: boolean
}

export interface StoreOptions<S> {
  state?: S | (() => S)
  getters?: GetterTree<S, S>
  actions?: ActionTree<S, S>
  mutations?: MutationTree<S>
  modules?: ModuleTree<S>
}

export type ActionHandler<S, R> = (
  this: Store<R>,
  injectee: ActionContext<S, R>,
  payload?: any
) => any
export interface ActionObject<S, R> {
  root?: boolean
  handler: ActionHandler<S, R>
}

export type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any
export type Action<S, R> = ActionHandler<S, R> | ActionObject<S, R>
export type Mutation<S> = (state: S, payload?: any) => any

export interface Module<S, R> {
  namespaced?: boolean
  state?: S | (() => S)
  getters?: GetterTree<S, R>
  actions?: ActionTree<S, R>
  mutations?: MutationTree<S>
  modules?: ModuleTree<R>
}

export interface ModuleOptions {
  preserveState?: boolean
}

export interface GetterTree<S, R> {
  [key: string]: Getter<S, R>
}

export interface ActionTree<S, R> {
  [key: string]: Action<S, R>
}

export interface MutationTree<S> {
  [key: string]: Mutation<S>
}

export interface ModuleTree<R> {
  [key: string]: Module<any, R>
}

interface Context {
  state: any
  getters: any
  commit: (type: any, payload?: any, options?: any) => void
  dispatch: (type: any, payload?: any, options?: any) => void
}

interface InnerStore {
  _cache: Record<string, any>
  _root: Module<any, any>
  _state: any
  _wrappedGetters: Record<string, (store: Store<any>) => void>
  _getters: any
  _mutations: Record<string, Array<(payload?: any) => void>>
  _actions: Record<string, Array<(payload?: any) => Promise<any>>>
  _subscribers: Array<(mutation: MutationPayload, state: any) => any>
  commit: (type: any, payload?: any, options?: any) => void
  dispatch: (type: any, payload?: any, options?: any) => void
}

function createContext(store: InnerStore, namespace: string, path: string[]): Context {
  const ctx = {
    dispatch: !namespace
      ? store.dispatch
      : (type: any, payload?: any, options?: any) => {
          if (typeof type !== 'string') {
            options = payload
            payload = type
            type = type.type
          }
          if (!options || !options.root) {
            type = namespace + type
          }
          return store.dispatch(type, payload)
        },
    commit: !namespace
      ? store.commit
      : (type: any, payload?: any, options?: any) => {
          if (typeof type !== 'string') {
            options = payload
            payload = type
            type = type.type
          }
          if (!options || !options.root) {
            type = namespace + type
          }
          store.commit(type, payload, options)
        }
  }
  Object.defineProperties(ctx, {
    getters: {
      get: !namespace ? () => store._getters : () => createGetters(store, namespace)
    },
    state: {
      get: () => getNestedState(store._state, path)
    }
  })
  return ctx as any
}

function createGetters(store: InnerStore, namespace: string) {
  if (!store._cache.getters) {
    store._cache.getters = {}
  }
  if (!store._cache.getters[namespace]) {
    const pos = namespace.length
    store._cache.getters[namespace] = Object.keys(store._getters).reduce((proxy, type) => {
      if (type.slice(0, pos) === namespace) {
        const localType = type.slice(pos)
        Object.defineProperty(proxy, localType, {
          get: () => store._getters[type],
          enumerable: true
        })
      }
      return proxy
    }, {})
  }
  return store._cache.getters[namespace]
}
function getNestedState(state: any, path: string[]) {
  return path.reduce((p, c) => p[c], state)
}
function registerMutation(
  this: Store<any>,
  store: InnerStore,
  type: string,
  handler: Mutation<any>,
  ctx: Context
) {
  const entry = store._mutations[type] || (store._mutations[type] = [])
  entry.push(payload => {
    handler.call(this, ctx.state, payload)
  })
}
function registerAction(
  this: Store<any>,
  store: InnerStore,
  type: string,
  handler: ActionHandler<any, any>,
  ctx: Context
) {
  const entry = store._actions[type] || (store._actions[type] = [])
  entry.push(async payload => {
    const res = await handler.call(
      this,
      {
        dispatch: ctx.dispatch,
        commit: ctx.commit,
        getters: ctx.getters,
        state: ctx.state,
        rootGetters: store._getters,
        rootState: store._state
      },
      payload
    )
    return res
  })
}
function registerGetter(
  this: Store<any>,
  store: InnerStore,
  type: string,
  rawGetter: Getter<any, any>,
  ctx: Context
) {
  if (store._wrappedGetters[type]) {
    return
  }
  store._wrappedGetters[type] = root => {
    return rawGetter.call(null, ctx.state, ctx.getters, root.state, root.getters)
  }
  Object.defineProperty(store._getters, type, {
    get: () => store._wrappedGetters[type].call(null, this),
    enumerable: true
  })
}
function installModule(
  this: Store<any>,
  store: InnerStore,
  rootState: any,
  path: string[],
  module: Module<any, any>
) {
  if (path.length) {
    const state = resolveState(module.state)
    path.reduce((p, k, i) => {
      if (p[k] == null) {
        p[k] = {}
      }
      if (i === path.length - 1) {
        Object.assign(p[k], state || {})
      }
      return p
    }, rootState)
  }
  const namespace = getNamespace(store._root, path)
  const ctx = createContext(store, namespace, path)
  const { mutations, getters, actions, modules } = module

  if (mutations) {
    for (const key in mutations) {
      const namespacedType = namespace + key
      registerMutation.call(this, store, namespacedType, mutations[key], ctx)
    }
  }

  if (getters) {
    for (const key in getters) {
      const namespacedType = namespace + key
      registerGetter.call(this, store, namespacedType, getters[key], ctx)
    }
  }

  if (actions) {
    for (const key in actions) {
      const action: any = actions[key]
      const type = action.root ? key : namespace + key
      const handler = action.handler || action
      registerAction.call(this, store, type, handler, ctx)
    }
  }

  if (modules) {
    for (const key in modules) {
      installModule.call(this, store, rootState, path.concat(key), modules[key])
    }
  }
}
function getNamespace(module: Module<any, any>, path: string[]) {
  return path.reduce((ns, k) => {
    module = module.modules[k]
    return ns + (module.namespaced ? k + '/' : '')
  }, '')
}
function resolveState(state: any) {
  return typeof state === 'function' ? state.call(null) : state
}

/**
 * 创建一个`store`来以存放应用中所有的`state`
 *
 * @param options 选项
 */
export function createStore<S>(options: StoreOptions<S>): Store<S> {
  const { state } = options
  const store: Store<S> = {
    get state() {
      return _store._state
    },
    get getters() {
      return _store._getters
    },
    commit,
    dispatch,
    subscribe
  }
  const _store: InnerStore = {
    _cache: {},
    _root: options,
    _state: resolveState(state),
    _wrappedGetters: {},
    _getters: {},
    _mutations: {},
    _actions: {},
    _subscribers: [],
    commit: commit.bind(store),
    dispatch: dispatch.bind(store)
  }
  function commit(this: Store<S>, type: string | Payload, payload?: any) {
    if (typeof type !== 'string') {
      options = payload
      payload = type
      type = type.type
    }
    const entry = _store._mutations[type]
    if (entry) {
      entry.forEach(func => func.call(this, payload))
    }
    const mutation = { type, payload }
    _store._subscribers.slice().forEach(func => func.call(null, mutation, this.state))
  }
  function dispatch(this: Store<S>, type: string | Payload, payload?: any) {
    if (typeof type !== 'string') {
      options = payload
      payload = type
      type = type.type
    }
    const entry = _store._actions[type]
    if (entry) {
      const res =
        entry.length > 1
          ? Promise.all(entry.map(func => func.call(this, payload)))
          : entry[0].call(this, payload)
      return res
    }
  }
  function subscribe(this: Store<S>, listener: (payload: any, state: S) => any) {
    _store._subscribers.push(listener)
    return () => {
      const i = _store._subscribers.indexOf(listener)
      if (i >= 0) {
        _store._subscribers.splice(i, 1)
      }
    }
  }
  installModule.call(store, _store, _store._state, [], options)
  return store
}

/**
 * 提供`store`的生产者
 */
export interface Provider<S = any> {
  /**
   * 注入的`store`
   */
  readonly $store: Store<S>
}
/**
 * 创建一个提供`store`的生产者
 *
 * @param store 要注入的`store`实例
 * @param options 目标实例
 */
export function createProvider<R extends Record<string, any>, S>(
  store: Store<S>,
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
type StateMapper<S> = Array<keyof S> | Record<string, keyof S | ((state: S, getters: any) => void)>
type GetterMapper<S> = Array<keyof S> | Record<string, keyof S>
type MutationMapper<S> =
  | Array<keyof S>
  | Record<string, keyof S | ((commit: Commit, ...args: any[]) => void)>
type ActionMapper<S> =
  | Array<keyof S>
  | Record<string, keyof S | ((dispatch: Dispatch, ...args: any[]) => void)>
interface Mapper<S> {
  namespace?: string
  state?: StateMapper<S>
  getters?: GetterMapper<S>
  mutations?: MutationMapper<S>
  actions?: ActionMapper<S>
}
interface ResolvedMapper<S> {
  state?: Record<string, (state: S, getters: any) => void>
  getters?: Record<string, keyof S>
  mutations?: Record<string, (commit: Commit, ...args: any[]) => void>
  actions?: Record<string, (dispatch: Dispatch, ...args: any[]) => void>
}
/**
 * 创建一个订阅`store`变化的消费者
 *
 * @param options 目标实例
 */
export function createConsumer<R extends Record<string, any>>(options: R): R
/**
 * 创建一个订阅`store`变化的消费者
 *
 * @param options 目标实例
 * @param mappers 状态绑定
 */
export function createConsumer<R extends Record<string, any>, S>(
  options: R,
  ...mappers: Array<Mapper<S>>
): R
export function createConsumer(options: PageOptions, ...mappers: Array<Mapper<any>>): any {
  const { onLoad, onUnload } = options
  let _disconn: () => void
  const resolvedMappers = mappers.map(m => resolveMapper(m))
  const methods = resolveMethods(resolvedMappers)
  const reducer = resolvedMappers.length ? resolveReducer(resolvedMappers) : null
  function _onLoad(this: Provider & PageContext, ...args: any[]) {
    const store = this.$store || getApp().$store
    if (store && _disconn == null && typeof reducer === 'function') {
      const listener = () => {
        const data = reducer(store.state, store.getters)
        if (data && Object.keys(data).length) {
          this.setData(data)
        }
      }
      _disconn = store.subscribe(listener)
      listener.call(null)
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
    ...methods,
    onLoad: _onLoad,
    onUnload: _onUnload
  }
}
function resolveReducer(mappers: Array<ResolvedMapper<any>>): (state: any, getters: any) => any {
  return (state, getters) => {
    return mappers.reduce((data, mapper) => {
      if (mapper.state) {
        Object.entries(mapper.state).forEach(([k, v]) => {
          data[k] = v(state, getters)
        })
      }
      if (mapper.getters) {
        Object.entries(mapper.getters).forEach(([k, v]) => {
          data[k] = getters[v]
        })
      }
      return data
    }, {} as any)
  }
}
function resolveMethods(mappers: Array<ResolvedMapper<any>>): Record<string, Function> {
  return mappers.reduce((p, mapper) => {
    if (mapper.mutations) {
      Object.entries(mapper.mutations).forEach(([k, v]) => {
        p[k] = function (this: Provider, ...args: any[]) {
          const store = this.$store || getApp().$store
          return v(store.commit, ...args)
        }
      })
    }
    if (mapper.actions) {
      Object.entries(mapper.actions).forEach(([k, v]) => {
        p[k] = function (this: Provider, ...args: any[]) {
          const store = this.$store || getApp().$store
          return v(store.dispatch, ...args)
        }
      })
    }
    return p
  }, {} as Record<string, Function>)
}
function resolveMapper(mapper: Mapper<any>) {
  const res: ResolvedMapper<any> = {}
  if (mapper.state) {
    if (Array.isArray(mapper.state)) {
      res.state = mapper.state.reduce((p, k) => {
        p[k] = mapper.namespace
          ? (state: any) => state[mapper.namespace][k]
          : (state: any) => state[k]
        return p
      }, {} as any)
    } else {
      res.state = Object.entries(mapper.state).reduce((p, [k, v]) => {
        if (typeof v === 'string') {
          p[k] = mapper.namespace
            ? (state: any) => state[mapper.namespace][v]
            : (state: any) => state[v]
        } else {
          p[k] = v
        }
        return p
      }, {} as any)
    }
  }
  if (mapper.getters) {
    if (Array.isArray(mapper.getters)) {
      res.getters = mapper.getters.reduce((p, k: any) => {
        p[k] = mapper.namespace ? mapper.namespace + '/' + k : k
        return p
      }, {} as any)
    } else {
      res.getters = mapper.getters
    }
  }
  if (mapper.mutations) {
    if (Array.isArray(mapper.mutations)) {
      res.mutations = mapper.mutations.reduce((p, k: any) => {
        p[k] = mapper.namespace
          ? (commit: Commit, ...args: any[]) => commit(mapper.namespace + '/' + k, ...args)
          : (commit: Commit, ...args: any[]) => commit(k, ...args)
        return p
      }, {} as any)
    } else {
      res.mutations = Object.entries(mapper.mutations).reduce((p, [k, v]) => {
        if (typeof v === 'string') {
          p[k] = mapper.namespace
            ? (commit: Commit, ...args: any[]) => commit(mapper.namespace + '/' + v, ...args)
            : (commit: Commit, ...args: any[]) => commit(v, ...args)
        } else {
          p[k] = v
        }
        return p
      }, {} as any)
    }
  }
  if (mapper.actions) {
    if (Array.isArray(mapper.actions)) {
      res.actions = mapper.actions.reduce((p, k: any) => {
        p[k] = mapper.namespace
          ? (dispatch: Dispatch, ...args: any[]) => dispatch(mapper.namespace + '/' + k, ...args)
          : (dispatch: Dispatch, ...args: any[]) => dispatch(k, ...args)
        return p
      }, {} as any)
    } else {
      res.actions = Object.entries(mapper.actions).reduce((p, [k, v]) => {
        if (typeof v === 'string') {
          p[k] = mapper.namespace
            ? (dispatch: Dispatch, ...args: any[]) => dispatch(mapper.namespace + '/' + v, ...args)
            : (dispatch: Dispatch, ...args: any[]) => dispatch(v, ...args)
        } else {
          p[k] = v
        }
        return p
      }, {} as any)
    }
  }
  return res
}

/**
 * 将一个类标记为提供`store`的生产者
 *
 * @param store 要注入的`store`实例
 */
export function Provider<S>(store: Store<S>): ClassDecorator
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
export function Consumer<S>(...mappers: Array<Mapper<S>>): ClassDecorator
export function Consumer(...mappers: Array<Mapper<any>>): Function {
  return (target: Function) => {
    const _mappers: Array<Mapper<any>> = mappers
    const bindings: Array<Mapper<any>> = target.prototype[$mapper]
    if (bindings) {
      _mappers.unshift(...bindings)
    }
    const options = createConsumer(
      { onLoad: target.prototype.onLoad, onUnload: target.prototype.onUnload },
      ..._mappers
    )
    Object.assign(target.prototype, options)
  }
}
export namespace Consumer {
  /**
   * 子模块绑定对象
   */
  export interface Namespace {
    State(name: string): PropertyDecorator
    State(func: (state: any, getters: any) => any): PropertyDecorator
    State(target: Object, propertyKey: string | symbol): void
    Getter(name: string): PropertyDecorator
    Getter(target: Object, propertyKey: string | symbol): void
    Mutation(name: string): PropertyDecorator
    Mutation(func: (commit: Commit, ...args: any[]) => any): PropertyDecorator
    Mutation(target: Object, propertyKey: string | symbol): void
    Action(name: string): PropertyDecorator
    Action(func: (dispatch: Dispatch, ...args: any[]) => any): PropertyDecorator
    Action(target: Object, propertyKey: string | symbol): void
  }
  /**
   * 将一个属性映射为`store`中的指定状态
   *
   * @param name `store`中对应状态的名称
   */
  export function State(name: string): PropertyDecorator
  /**
   * 将一个属性映射为`store`中的指定状态
   *
   * @param func `store`中对应状态的映射方式
   */
  export function State(func: (state: any, getters: any) => any): PropertyDecorator
  /**
   * 将一个属性映射为`store`中的指定状态
   */
  export function State(target: Object, propertyKey: string | symbol): void
  export function State(arg1: any, propertyKey?: any) {
    return bindMap('state', undefined, arg1, propertyKey)
  }
  /**
   * 将一个属性映射为`store`中的指定`getter`
   *
   * @param name `store`中对应`getter`的名称
   */
  export function Getter(name: string): PropertyDecorator
  /**
   * 将一个属性映射为`store`中的指定`getter`
   */
  export function Getter(target: Object, propertyKey: string | symbol): void
  export function Getter(arg1: any, propertyKey?: any) {
    return bindMap('getters', undefined, arg1, propertyKey)
  }
  /**
   * 将一个属性映射为`store`中的指定`mutation`
   *
   * @param name `store`中对应`mutation`的名称
   */
  export function Mutation(name: string): PropertyDecorator
  /**
   * 将一个属性映射为`store`中的指定`mutation`
   *
   * @param func `store`中对应`mutation`的映射方式
   */
  export function Mutation(func: (commit: Commit, ...args: any[]) => any): PropertyDecorator
  /**
   * 将一个属性映射为`store`中的指定`mutation`
   */
  export function Mutation(target: Object, propertyKey: string | symbol): void
  export function Mutation(arg1: any, propertyKey?: any) {
    return bindMap('mutations', undefined, arg1, propertyKey)
  }
  /**
   * 将一个属性映射为`store`中的指定`action`
   *
   * @param name `store`中对应`action`的名称
   */
  export function Action(name: string): PropertyDecorator
  /**
   * 将一个属性映射为`store`中的指定`action`
   *
   * @param func `store`中对应`action`的映射方式
   */
  export function Action(func: (dispatch: Dispatch, ...args: any[]) => any): PropertyDecorator
  /**
   * 将一个属性映射为`store`中的指定`action`
   */
  export function Action(target: Object, propertyKey: string | symbol): void
  export function Action(arg1: any, propertyKey?: any) {
    return bindMap('actions', undefined, arg1, propertyKey)
  }
  /**
   * 获取`store`中指定子模块的绑定对象
   *
   * @param name `store`中对应的子模块的名称
   */
  export function namespace(name: string): Namespace {
    return {
      State(arg1: any, propertyKey?: any) {
        return bindMap('state', name, arg1, propertyKey)
      },
      Getter(arg1: any, propertyKey?: any) {
        return bindMap('getters', name, arg1, propertyKey)
      },
      Mutation(arg1: any, propertyKey?: any) {
        return bindMap('mutations', name, arg1, propertyKey)
      },
      Action(arg1: any, propertyKey?: any) {
        return bindMap('actions', name, arg1, propertyKey)
      }
    }
  }
  export type MutationMethod = (...args: any[]) => void
  export type ActionMethod = (...args: any[]) => Promise<any>
}
function bindMap(
  type: 'state' | 'getters' | 'mutations' | 'actions',
  ns: string,
  arg1: any,
  propertyKey?: any
): any {
  if (!propertyKey) {
    return (target: any, key: any) => {
      if (!target[$mapper]) {
        Object.defineProperty(target, $mapper, {
          value: [],
          enumerable: false
        })
      }
      target[$mapper].push({
        namespace: ns,
        [type]: {
          [key]: arg1
        }
      })
    }
  }
  if (!arg1[$mapper]) {
    Object.defineProperty(arg1, $mapper, {
      value: [],
      enumerable: false
    })
  }
  arg1[$mapper].push({
    namespace: ns,
    [type]: {
      [propertyKey]: propertyKey
    }
  })
}
