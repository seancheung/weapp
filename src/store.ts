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
  interface LaunchOption {
    query: number
  }
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
}

type App = Partial<{
  onLaunch(options?: App.LaunchOption): void
  onShow(options?: App.LaunchShowOption): void
  onHide(): void
  onError(error?: string): void
  onPageNotFound(options?: App.PageNotFoundOption): void
}>

declare function Page<T extends object = any, U extends object = any>(options: Page<U> & T): void
declare function App<T extends object = any>(options: App & T): void
declare function GetCurrentPages(): Page[]

export interface Signal {
  type: string
}

export interface Dispatcher<T extends Signal> {
  dispatch(data: T): void
}

export interface Commander<T extends object> {
  $commands: T
}

export interface Observer<T extends object> {
  $setState?(state: Partial<T>): void
}

export function entrypoint<T extends object>(options: App & T & Observer<any>): void {
  App({
    ...options,
    state: {},
    $setState(state: T) {
      //
    }
  })
}

export function connect<T extends object, U extends Page>(
  options: Page<U> & T & Commander<any>,
  mapper?: (state: object) => object
): void {
  Page({
    ...options,
    onload(query?: Record<string, string>): void {
      //
    },
    onUnload(): void {
      //
    },
    $commands: {}
  })
}
