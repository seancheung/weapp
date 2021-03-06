declare namespace weuse {
  namespace promise {
    type Promisifed<T extends wx.Options> = (
      opts?: utils.Omit<T, wx.Callbacks>
    ) => Promise<wx.SuccessType<T>>
    /**
     * 对一个数组进行map操作并行执行每个返回的Promise
     * @param values
     * @param mapper
     * @returns 按传入顺序排序的执行结果
     */
    function map<T, R>(
      values: T[],
      mapper: (item?: T, i?: number, items?: T[]) => R | PromiseLike<R>
    ): Promise<R[]>
    /**
     * 顺序执行Promise
     *
     * @param values 要执行的Promise或返回数据
     * @returns 按传入顺序排序的执行结果
     */
    function serial<T>(values: Array<T | PromiseLike<T>>): Promise<T[]>
    /**
     * 顺序执行Promise
     *
     * @param values 要执行的Promise或返回数据
     * @returns 按传入顺序排序的执行结果
     */
    function serial<T1, T2>(
      values: [T1 | PromiseLike<T1> | T2 | PromiseLike<T2>]
    ): Promise<[T1, T2]>
    /**
     * 顺序执行Promise
     *
     * @param values 要执行的Promise或返回数据
     * @returns 按传入顺序排序的执行结果
     */
    function serial<T1, T2, T3>(
      values: [T1 | PromiseLike<T1> | T2 | PromiseLike<T2> | T3 | PromiseLike<T3>]
    ): Promise<[T1, T2, T3]>
    /**
     * 顺序执行Promise
     *
     * @param values 要执行的Promise或返回数据
     * @returns 按传入顺序排序的执行结果
     */
    function serial<T1, T2, T3, T4>(
      values: [
        T1 | PromiseLike<T1> | T2 | PromiseLike<T2> | T3 | PromiseLike<T3> | T4 | PromiseLike<T4>
      ]
    ): Promise<[T1, T2, T3, T4]>
    /**
     * 将一个小程序方法 Promise 化. 需要该方法中接受 success/fail 回调
     *
     * @param func 需要处理的小程序方法(wx.funcName)
     */
    function promisify<T extends wx.Options>(func: wx.Callback<T>): Promisifed<T>
  }
  namespace canvas {
    interface ImageInfo {
      width: number
      height: number
      path: string
    }
    interface Vector2 {
      x: number
      y: number
    }
    namespace Color {
      type GradiantStop = [number, string]
      interface Gradiant {
        type: string
      }
      interface LinearGradiant extends Gradiant {
        type: 'linear'
        x0: number
        y0: number
        x1: number
        y1: number
        stops: GradiantStop[]
      }
      interface CircularGradiant extends Gradiant {
        type: 'circular'
        x: number
        y: number
        radius: number
        stops: GradiantStop[]
      }
      namespace Pattern {
        type Repetition = 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y'
      }
      interface Pattern extends Gradiant {
        type: 'pattern'
        src: string
        repetition?: Pattern.Repetition
      }
    }
    type Color = string | Color.LinearGradiant | Color.CircularGradiant | Color.Pattern
    namespace Stroke {
      interface LineDash {
        pattern: number[]
        offset?: number
      }
      type LineCap = 'butt' | 'round' | 'square'
      type LineJoin = 'bevel' | 'round' | 'miter'
    }
    export interface Stroke {
      color?: Color
      lineWidth?: number
      lineDash?: Stroke.LineDash
      lineCap?: Stroke.LineCap
      lineJoin?: Stroke.LineJoin
      miterLimit?: number
    }
    namespace Fill {
      interface Shadow {
        x?: number
        y?: number
        blur?: number
        color?: string
      }
    }
    export interface Fill {
      color?: Color
      shadow?: Fill.Shadow
    }
    namespace Font {
      type Align = 'left' | 'center' | 'right'
      type Baseline = 'top' | 'bottom' | 'middle' | 'normal'
    }
    export interface Font {
      family?: string
      size: number
      align?: Font.Align
      baseline?: Font.Baseline
    }
    namespace Point {
      interface Base {
        type: string
        x: number
        y: number
      }
      interface Linear extends Base {
        type: 'linear'
      }
      interface Arc extends Base {
        type: 'arc'
        radius: number
      }
      interface Quadratic extends Base {
        type: 'quadratic'
        cpx: number
        cpy: number
      }
      interface Cubic extends Base {
        type: 'cubic'
        cpx0: number
        cpy0: number
        cpx1: number
        cpy1: number
      }
    }
    type Point = Point.Linear | Point.Arc | Point.Quadratic | Point.Cubic
    namespace Clip {
      interface Shape {
        type: string
        x: number
        y: number
      }
      interface Rectangle extends Shape {
        type: 'rect'
        width: number
        height: number
        radius?: number
      }
      interface Circle extends Shape {
        type: 'circular'
        radius: number
      }
      interface Path extends Shape {
        type: 'path'
        points: Point[]
      }
    }
    type Clip = Clip.Rectangle | Clip.Circle | Clip.Path
    export interface Transform {
      translate?: Partial<Vector2>
      rotate?: number
      scale?: Partial<Vector2> | number
    }
    namespace Layer {
      interface Base {
        /**
         * 图层类型
         */
        type: string
        /**
         * 绘制起点x
         */
        x?: number
        /**
         * 绘制起点y
         */
        y?: number
        /**
         * 填充样式. 为 true 进行默认填充
         */
        fill?: Fill | true
        /**
         * 描边样式. 为 true 进行默认描边
         */
        stroke?: Stroke | true
        /**
         * 图层遮罩
         */
        clip?: Clip
        /**
         * 图层变换
         */
        transform?: Transform
      }
      interface Rect extends Base {
        type: 'rect'
        width: number
        height: number
        anchor?: Partial<Vector2>
      }
      interface Arc extends Base {
        type: 'arc'
        radius: number
        startAngle?: number
        endAngle?: number
        counterClockwise?: boolean
      }
      interface Path extends Base {
        type: 'path'
        points: Point[]
        close?: boolean
      }
      namespace Image {
        interface Crop {
          x?: number
          y?: number
          width?: number
          height?: number
        }
      }
      interface Image extends Base {
        type: 'image'
        src: string
        width?: number
        height?: number
        crop?: Image.Crop
        anchor?: Partial<Vector2>
      }
      interface Text extends Base {
        type: 'text'
        text: string
        font?: Font
        maxWidth?: number
      }
    }
    type Layer = Layer.Rect | Layer.Arc | Layer.Image | Layer.Text | Layer.Path
    export interface Style {
      /**
       * 描边
       */
      stroke?: Stroke
      /**
       * 填充
       */
      fill?: Fill
      /**
       * 文字
       */
      font?: Font
    }
    export interface Export {
      /**
       * 指定的画布区域的左上角横坐标
       */
      x?: number
      /**
       * 指定的画布区域的左上角纵坐标
       */
      y?: number
      /**
       * 指定的画布区域的宽度
       */
      width?: number
      /**
       * 指定的画布区域的高度
       */
      height?: number
      /**
       * 输出的图片的宽度
       */
      destWidth?: number
      /**
       * 输出的图片的高度
       */
      destHeight?: number
      /**
       * 目标文件的类型
       */
      fileType?: 'jpg' | 'png'
      /**
       * 图片的质量，目前仅对 jpg 有效。取值范围为 (0, 1]，不在范围内时当作 1.0 处理
       */
      quality?: number
    }
    type Downloader = (src: string) => Promise<ImageInfo>
    export interface Options {
      /**
       * 图层. 从下到上绘制
       */
      layers: Layer[]
      /**
       * 默认样式. 可以在图层中覆盖
       */
      default?: Style
      /**
       * 导出 canvas 到文件
       */
      export?: Export
      /**
       * 图片下载方法(不设置则使用 wx.getImageInfo). 相同地址的资源不会重复下载. 支持本地和远端资源
       */
      downloader?: Downloader
    }
    function resolveLayers(layers: Layer[], downloader: Downloader): Promise<Layer[]>
    function resolveColor(ctx: any, color: Color): any
    function resolveAnchor<T extends Layer.Rect | Layer.Image>(ctx: any, layer: T): T
    function applyPath(ctx: any, points: Point[], close?: boolean): void
    function applyTransform(ctx: any, transform: Transform): void
    function applyClip(ctx: any, clip: Clip): void
    function applyRect(ctx: any, layer: Layer.Rect): void
    function applyArc(ctx: any, layer: Layer.Arc): void
    function applyFill(ctx: any, fill: Fill): void
    function applyStroke(ctx: any, stroke: Stroke): void
    function applyFont(ctx: any, font: Font): void
    function getLayerWidth(ctx: any, layer: Layer): number
    function getLayerHeight(ctx: any, layer: Exclude<Layer, Layer.Text>): number
    function drawLayer(ctx: any, layer: Layer): void
    function drawText(ctx: any, layer: Layer.Text): void
    function drawImage(ctx: any, layer: Layer.Image): void
    /**
     * 在 canvas 上绘制图形
     *
     * @param canvasId Canvas ID
     * @param options 选项
     * @returns 导出后的文件路径(需要设置选项中 export 为 true)
     */
    function draw(canvasId: string, options: Options): Promise<void | string>
  }
  namespace request {
    interface Options {
      /**
       * 远端地址. 若已设置 baseUrl 则可为相对地址
       */
      url: string
      /**
       * querystring
       */
      query?: string | Record<string, any>
      /**
       * 请求体
       */
      data?: string | object | ArrayBuffer
      /**
       * 设置请求的 header, header 中不能设置 Referer. content-type 默认为 application/json
       */
      header?: Record<string, any>
      /**
       * HTTP 请求方法
       */
      method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
      /**
       * 返回的数据格式
       */
      dataType?: string
      /**
       * 响应的数据类型
       */
      responseType?: 'text' | 'arraybuffer'
    }
    interface Response {
      /**
       * 返回的数据
       */
      data: string | object | ArrayBuffer
      /**
       * 返回的 HTTP 状态码
       */
      statusCode: number
      /**
       * 返回的 HTTP Response Header
       */
      header: Record<string, string>
    }
    type Func = (options: string | utils.Omit<Options, 'method'>) => Promise<Response>
    type Verbs = 'options' | 'get' | 'head' | 'post' | 'put' | 'delete' | 'trace' | 'connect'
    interface DownloadOptions {
      /**
       * 下载文件地址
       */
      url: string
      /**
       * 保存路径. 需要有写入权限
       */
      filePath?: string
      /**
       * 分段数
       */
      parts?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
      /**
       * 请求头
       */
      header?: Record<string, any>
      /**
       * querystring
       */
      query?: string | Record<string, any>
    }
    interface DownloadResult {
      /**
       * 下载文件保存路径
       */
      filePath?: string
      /**
       * 下载文件的二进制流
       */
      buffer?: ArrayBuffer
    }
    type Defaults = Partial<
      utils.Omit<Options, 'method' | 'url' | 'data'> & {
        baseUrl: string
      }
    >
  }
  interface request extends Record<request.Verbs, request.Func> {
    /**
     * 发起 HTTP 网络请求
     *
     * @param options 选项
     */
    (options: request.Options): Promise<request.Response>

    /**
     * 下载文件. 支持分段
     *
     * @param options 选项
     */
    download(options: request.DownloadOptions): Promise<request.DownloadResult>

    /**
     * 返回一个包含默认选项的 request 封装. 可以设置 baseUrl, header等. 此方法不会改变当前的 request
     *
     * @param options 默认选项
     * @returns 包含默认选项的 request 对象
     */
    defaults(options: request.Defaults): utils.Omit<request, 'defaults'>
  }
  namespace storage {
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
     * @returns key 对应的内容. Date 将被反序列化
     */
    function get<R = any>(key: string): Promise<R>
    /**
     * 将数据存储在本地缓存中指定的 key 中. 会覆盖掉原来该 key 对应的内容. 注意此接口添加的缓存只能由 get 获取到
     *
     * @param opts 选项
     */
    function set(opts: Options): Promise<void>
    /**
     * 从本地缓存中移除指定 key. 注意此接口只能移除由 set 添加的缓存
     *
     * @param key 本地缓存中指定的 key
     */
    function del(key: string): Promise<void>
    /**
     * 移除所有已过期的缓存. 注意此接口只能移除由 set 添加的缓存
     */
    function flush(): Promise<void>
    /**
     * 检查指定的key是否已过期, 是则移除. 不存在的 key 忽略. 注意此接口只能检查由 set 添加的缓存
     *
     * @param keys 本地缓存中指定的 key
     * @returns 移除掉的 key 数量
     */
    function touch(...keys: string[]): Promise<number>
    /**
     * 检查 key 是否存在. 注意此接口只能检查由 set 添加的缓存
     *
     * @param key 本地缓存中指定的 key
     * @returns Key 是否存在
     */
    function exists(key: string): Promise<boolean>
    /**
     * 获取指定key的剩余有效时间(秒). 注意此接口只能获取由 set 添加的缓存
     *
     * @param key 本地缓存中指定的 key
     * @returns 剩余有效时间(秒). 若key不存在返回-1; 若 key 不会过期返回-2
     */
    function ttl(key: string): Promise<number>
    /**
     * 更新指定 key 的有效时间. 注意此接口只能设置由 set 添加的缓存
     *
     * @param key 本地缓存中指定的 key
     * @param ttl 有效时间(秒)
     * @returns key 存在且设置成功则返回true
     */
    function expire(key: string, ttl: number): Promise<boolean>
    /**
     * 移除指定 key 的有效时间让其不会过期. 注意此接口只能设置由 set 添加的缓存
     *
     * @param key 本地缓存中指定的 key
     * @returns key 存在且设置成功则返回true
     */
    function persist(key: string): Promise<boolean>
  }
  namespace wx {
    interface FailRes {
      errMsg: string
    }
    interface Options<R = any> {
      success?(res: R): void
      fail?(res: FailRes): void
      complete?(): void
    }
    type Callbacks = 'success' | 'fail' | 'complete'
    type SuccessType<T extends Options<any>> = T extends Options<infer R> ? R : never
    type Callback<T extends Options> = (opts?: T) => any
    type Func<T = any> = (options?: T) => any
    type AuthScope =
      | 'scope.userInfo'
      | 'scope.userLocation'
      | 'scope.address'
      | 'scope.invoiceTitle'
      | 'scope.invoice'
      | 'scope.werun'
      | 'scope.record'
      | 'scope.writePhotosAlbum'
      | 'scope.camera'
    type P<T, R = void> = (options?: T & wx.Options<R>) => any
    type Q<R = void> = (options?: wx.Options<R>) => any
    interface internal {
      [x: string]: Func
      request: P<
        {
          url: string
          data?: string | object | ArrayBuffer
          header?: Record<string, any>
          method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
          dataType?: string
          responseType?: 'text' | 'arraybuffer'
        },
        {
          data: string | object | ArrayBuffer
          statusCode: number
          header: Record<string, any>
        }
      >
      downloadFile: P<
        {
          url: string
          header?: Record<string, any>
          filePath?: string
        },
        {
          tempFilePath: string
          statusCode: number
        }
      >
      uploadFile: P<
        {
          url: string
          filePath: string
          name: string
          header?: Record<string, any>
          formData?: object
        },
        {
          data: string
          statusCode: number
        }
      >
      getSetting: Q<{
        authSetting: Record<wx.AuthScope, boolean>
      }>
      openSetting: Q<{
        authSetting: Record<wx.AuthScope, boolean>
      }>
      authorize: P<{
        scope: wx.AuthScope
      }>
      navigateTo: P<{
        url: string
      }>
      switchTab: P<{
        url: string
      }>
      reLaunch: P<{
        url: string
      }>
      redirectTo: P<{
        url: string
      }>
      navigateBack: P<{
        delta: number
      }>
      getStorageInfo: Q<{
        keys: string[]
        currentSize: number
        limitSize: number
      }>
      clearStorage: Q
      removeStorage: P<{
        key: string
      }>
      setStorage: P<{
        key: string
        data: any
      }>
      getStorage: P<
        {
          key: string
        },
        {
          data: any
        }
      >
      compressImage: P<{
        src: string
        quality?: number
      }>
      saveImageToPhotosAlbum: P<{
        filePath: string
      }>
      getImageInfo: P<
        {
          src: string
        },
        {
          width: number
          height: number
          path: string
          orientation: string
          type: string
        }
      >
      chooseImage: P<
        {
          count?: number
          sizeType?: string[]
          sourceType?: string[]
        },
        {
          tempFilePaths: string[]
          tempFiles: Array<{
            path: string
            size: number
          }>
        }
      >
      getLocation: P<
        {
          type?: 'wgs84' | 'gcj02'
          altitude?: boolean
        },
        {
          latitude: number
          longitude: number
          speed: number
          accuracy: number
          altitude: number
          verticalAccuracy: number
          horizontalAccuracy: number
        }
      >
      chooseLocation: Q<{
        name: string
        address: string
        latitude: number
        longitude: number
      }>
      getFileInfo: P<
        {
          filePath: string
          digestAlgorithm?: 'md5' | 'sha1'
        },
        {
          size: number
          digest: string
        }
      >
      getSavedFileInfo: P<
        {
          filePath: string
        },
        {
          size: number
          createTime: number
        }
      >
      saveFile: P<
        {
          tempFilePath: string
        },
        {
          savedFilePath: string
        }
      >
      getSavedFileList: Q<{
        fileList: Array<{
          filePath: string
          size: number
          createTime: number
        }>
      }>
      removeSavedFile: P<{
        filePath: string
      }>
      checkSession: Q
      login: P<
        {
          timeout?: number
        },
        {
          code: string
        }
      >
      navigateToMiniProgram: P<{
        appId: string
        path?: string
        extraData?: object
        envVersion?: 'develop' | 'trail' | 'release'
      }>
      navigateBackMiniProgram: P<{
        extraData?: object
      }>
      getUserInfo: P<
        {
          withCredentials?: boolean
          lang?: 'en' | 'zh_CN' | 'zn_TW'
        },
        {
          userInfo: {
            nickName: string
            avatarUrl: string
            gender: 0 | 1 | 2
            country: string
            province: string
            city: string
            language: 'en' | 'zh_CN' | 'zn_TW'
          }
          rawData: string
          signature: string
          encryptedData: string
          iv: string
        }
      >
      requestPayment: P<{
        timeStamp: string
        nonceStr: string
        package: string
        signType?: 'MD5' | 'HMAC-SHA256'
        paySign: string
      }>
      setClipboardData: P<{
        data: string
      }>
      getClipboardData: Q<{
        data: string
      }>
      getSystemInfo: Q<{
        brand: string
        model: string
        pixelRatio: number
        screenWidth: number
        screenHeight: number
        windowWidth: number
        windowHeight: number
        statusBarHeight: number
        language: string
        version: string
        system: string
        platform: string
        fontSizeSetting: number
        SDKVersion: string
        benchmarkLevel: number
      }>
      showModal: P<
        {
          title: string
          content: string
          showCancel?: boolean
          cancelText?: string
          cancelColor?: string
          confirmText?: string
          confirmColor?: string
        },
        {
          confirm: boolean
          cancel: boolean
        }
      >
      showActionSheet: P<
        {
          itemList: string[]
          itemColor?: string
        },
        {
          tapIndex: number
        }
      >
      showLoading: P<{
        title: string
        mask?: boolean
      }>
      hideLoading: Q
      showToast: P<{
        title: string
        icon?: 'success' | 'loading' | 'none'
        image?: string
        duration?: number
        mask?: boolean
      }>
      hideToast: Q
      updateShareMenu: P<{
        withShareTicket?: boolean
        isUpdatableMessage?: boolean
        activityId?: string
        templateInfo?: {
          parameterList: Array<{
            name: string
            value: string
          }>
        }
      }>
      showShareMenu: P<{
        withShareTicket?: boolean
      }>
      hideShareMenu: Q
      getShareInfo: P<
        {
          shareTicket: string
          timeout?: number
        },
        {
          errMsg: string
          encryptedData: string
          iv: string
        }
      >
      canvasToTempFilePath: P<
        {
          x?: number
          y?: number
          width?: number
          height?: number
          destWidth?: number
          destHeight?: number
          canvasId: string
          fileType?: 'png' | 'jpg'
          quality?: number
        },
        {
          tempFilePath: string
        }
      >
      canvasPutImageData: P<{
        canvasId: string
        data: Uint8ClampedArray
        x: number
        y: number
        width: number
        height: number
      }>
      canvasGetImageData: P<
        {
          canvasId: string
          x: number
          y: number
          width: number
          height: number
        },
        {
          width: number
          height: number
          data: Uint8ClampedArray
        }
      >
    }
    type Wrapped<T extends Record<string, Func>> = {
      readonly [K in keyof T]: T[K] extends Func<infer P> ? promise.Promisifed<P> : never
    }
    namespace Page {
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
    type Page<T extends Record<string, any> = any> = Partial<{
      data: T
      route: string
      setData<K extends keyof T>(
        data: T | Pick<T, K> | Record<string, any>,
        callback?: () => void
      ): void
      onLoad(query?: Record<string, string>): void
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
    namespace App {
      interface LaunchShowOption {
        path: string
        query: Record<string, any>
        scene: number
        shareTicket: string
        referrerInfo?: Record<string, any>
      }
      interface PageNotFoundOption {
        path: string
        query: Record<string, any>
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
  }
  namespace utils {
    type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
    type Parameter<T extends (p: any) => any> = T extends (p: infer P) => any ? P : never
    /**
     * 从 object 创建 querystring
     *
     * @param query 要设置的键值对. 值为 null 或 undefined 的对象不会添加到结果中
     * @returns 生成的 querystring
     */
    function encodeQuery(query: Record<string, any>): string
    /**
     * 解析小程序页面传递的 querystring 对象. 兼容小程序码、二维码、普通链接
     *
     * @param query 从页面 onLoad(options) 中获取的 options
     * @returns 解析后的对象
     */
    function decodeQuery(query: Record<string, string>): Record<string, string>
    /**
     * 连接 url. 会移除重复的 '/' 符号. url 开头跟结尾均可包含或缺省 '/' 符号
     *
     * @param urls 要进行连接的url
     * @returns 连接后的url. 结尾不包含 '/' 符号(除非整体为 '/' )
     */
    function joinUrl(...urls: string[]): string
    /**
     * 查询授权, 如果未授权则进行请求
     *
     * @param scope 权限名
     */
    function authorize(scope: wx.AuthScope): Promise<void>
    type getLocation = typeof wx.getLocation
    /**
     * 检查权限并获取地理定位
     *
     * @param opts 定位选项
     */
    function getLocation(opts: Parameter<getLocation>): ReturnType<getLocation>
    type chooseLocation = typeof wx.chooseLocation
    /**
     * 检查权限并请求地理定位
     *
     * @param opts 定位选项
     */
    function chooseLocation(opts: Parameter<chooseLocation>): ReturnType<chooseLocation>
    type saveImageToPhotosAlbum = typeof wx.saveImageToPhotosAlbum
    /**
     * 检查权限并写入相册
     *
     * @param opts 写入选项
     */
    function saveImageToPhotosAlbum(
      opts: Parameter<saveImageToPhotosAlbum>
    ): ReturnType<saveImageToPhotosAlbum>
    /**
     * 深克隆
     *
     * @param source 对象
     */
    function clone<T>(source: T): T
    /**
     * 递归合并
     *
     * @param source 对象
     * @param target 对象
     */
    function merge(source: any, target: any): any
  }
  namespace redux {
    interface Action<T extends Action.Type> {
      /**
       * 分发消息类别
       */
      type: T
      [x: string]: any
    }
    namespace Action {
      type Type = string | number | symbol
    }
    type Reducer<S, T extends Action.Type> = (state: S, action: Action<T>) => S
    type Subscriber = () => void
    type Unsubscribe = () => void
    type Dispatch<T extends Action.Type, R extends Action<T>> = (action: R) => R
    interface ReducerMap {
      [x: string]: Reducer<any, any>
    }
    type CombinedReducer<M extends ReducerMap> = Reducer<
      {
        [K in keyof M]: M[K] extends Reducer<infer S, any> ? S : never
      },
      {
        [K in keyof M]: M[K] extends Reducer<any, infer T> ? T : never
      }[keyof M]
    >
    /**
     * 用来维持应用所有的`state`树 的一个对象
     */
    interface Store<S, T extends Action.Type> {
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
    function createStore<S, T extends Action.Type>(
      reducer: Reducer<S, T>,
      preloadedState?: S
    ): Store<S, T>
    /**
     * 把一个由多个不同`reducer`函数作为`value`的`object`，合并成一个最终的`reducer`函数
     *
     * @param reducers 多个不同`reducer`组成的对象
     * @returns 一个调用`reducers`对象里所有`reducer`的`reducer`
     */
    function combineReducers<M extends ReducerMap>(reducers: M): CombinedReducer<M>
    /**
     * 提供`store`的生产者
     */
    interface Provider<S = any, T extends Action.Type = any> {
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
    function createProvider<R extends Record<string, any>, S, T extends Action.Type>(
      store: Store<S, T>,
      options: R
    ): R & Provider
    type StateMapper<S, U> = (state: S) => U
    /**
     * 订阅`store`变化的消费者
     */
    interface Consumer<T extends Action.Type = any> {
      /**
       * 分发`action`
       *
       * @param action 描述应用变化的普通对象
       */
      $dispatch(action: Action<T>): void
    }
    /**
     * 创建一个订阅`store`变化的消费者
     *
     * @param options 目标实例
     */ function createConsumer<R extends Record<string, any>, T extends Action.Type>(
      options: R
    ): R & Consumer<T>
    /**
     * 创建一个订阅`store`变化的消费者
     *
     * @param options 目标实例
     * @param stateMapper 状态映射函数
     */
    function createConsumer<R extends Record<string, any>, S, T extends Action.Type, U = any>(
      options: R,
      stateMapper: StateMapper<S, U>
    ): R & Consumer<T>
    /**
     * 将一个类标记为提供`store`的生产者
     *
     * @param store 要注入的`store`实例
     */
    function Provider<S, T extends Action.Type>(store: Store<S, T>): ClassDecorator
    /**
     * 将一个类标记为订阅`store`变化的消费者
     */
    function Consumer(): ClassDecorator
    /**
     * 将一个类标记为订阅`store`变化的消费者
     *
     * @param stateMapper 状态映射函数
     */
    function Consumer<S, U>(stateMapper: StateMapper<S, U>): ClassDecorator
    namespace Consumer {
      /**
       * 子状态绑定对象
       */
      interface Namespace {
        State(name: string): PropertyDecorator
        State(target: Object, propertyKey: string | symbol): void
      }
      /**
       * 将一个属性映射为`store`中的指定状态
       *
       * @param name `store`中对应状态的名称
       */
      function State(name: string): PropertyDecorator
      /**
       * 将一个属性映射为`store`中的指定状态
       */
      function State(target: Object, propertyKey: string | symbol): void
      /**
       * 获取`store`中指定子状态的绑定对象
       *
       * @param name `store`中对应的子状态的名称
       */
      function namespace(name: string): Namespace
    }
  }
  namespace vuex {
    interface Store<S> {
      readonly state: S
      readonly getters: Record<string, any>
      dispatch: Dispatch
      commit: Commit
      subscribe<P extends MutationPayload>(fn: (mutation: P, state: S) => any): () => void
    }
    interface Dispatch {
      (type: string, payload?: any, options?: DispatchOptions): Promise<any>
      <P extends Payload>(payloadWithType: P, options?: DispatchOptions): Promise<any>
    }
    interface Commit {
      (type: string, payload?: any, options?: CommitOptions): void
      <P extends Payload>(payloadWithType: P, options?: CommitOptions): void
    }
    interface ActionContext<S, R> {
      dispatch: Dispatch
      commit: Commit
      state: S
      getters: any
      rootState: R
      rootGetters: any
    }
    interface Payload {
      type: string
    }
    interface MutationPayload extends Payload {
      payload: any
    }
    interface ActionPayload extends Payload {
      payload: any
    }
    interface DispatchOptions {
      root?: boolean
    }
    interface CommitOptions {
      root?: boolean
    }
    interface StoreOptions<S> {
      state?: S | (() => S)
      getters?: GetterTree<S, S>
      actions?: ActionTree<S, S>
      mutations?: MutationTree<S>
      modules?: ModuleTree<S>
    }
    type ActionHandler<S, R> = (this: Store<R>, injectee: ActionContext<S, R>, payload?: any) => any
    interface ActionObject<S, R> {
      root?: boolean
      handler: ActionHandler<S, R>
    }
    type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any
    type Action<S, R> = ActionHandler<S, R> | ActionObject<S, R>
    type Mutation<S> = (state: S, payload?: any) => any
    interface Module<S, R> {
      namespaced?: boolean
      state?: S | (() => S)
      getters?: GetterTree<S, R>
      actions?: ActionTree<S, R>
      mutations?: MutationTree<S>
      modules?: ModuleTree<R>
    }
    interface ModuleOptions {
      preserveState?: boolean
    }
    interface GetterTree<S, R> {
      [key: string]: Getter<S, R>
    }
    interface ActionTree<S, R> {
      [key: string]: Action<S, R>
    }
    interface MutationTree<S> {
      [key: string]: Mutation<S>
    }
    interface ModuleTree<R> {
      [key: string]: Module<any, R>
    }
    /**
     * 创建一个`store`来以存放应用中所有的`state`
     *
     * @param options 选项
     */
    function createStore<S>(options: StoreOptions<S>): Store<S>
    /**
     * 提供`store`的生产者
     */
    interface Provider<S = any> {
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
    function createProvider<R extends Record<string, any>, S>(
      store: Store<S>,
      options: R
    ): R & Provider
    type StateMapper<S> =
      | Array<keyof S>
      | Record<string, keyof S | ((state: S, getters: any) => void)>
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
    /**
     * 创建一个订阅`store`变化的消费者
     *
     * @param options 目标实例
     */
    function createConsumer<R extends Record<string, any>>(options: R): R
    /**
     * 创建一个订阅`store`变化的消费者
     *
     * @param options 目标实例
     * @param mappers 状态绑定
     */
    function createConsumer<R extends Record<string, any>, S>(
      options: R,
      ...mappers: Array<Mapper<S>>
    ): R
    /**
     * 将一个类标记为提供`store`的生产者
     *
     * @param store 要注入的`store`实例
     */
    function Provider<S>(store: Store<S>): ClassDecorator
    /**
     * 将一个类标记为订阅`store`变化的消费者
     */
    function Consumer(): ClassDecorator
    /**
     * 将一个类标记为订阅`store`变化的消费者
     *
     * @param stateMapper 状态映射函数
     */
    function Consumer<S>(...mappers: Array<Mapper<S>>): ClassDecorator
    namespace Consumer {
      /**
       * 子模块绑定对象
       */
      interface Namespace {
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
      function State(name: string): PropertyDecorator
      /**
       * 将一个属性映射为`store`中的指定状态
       *
       * @param func `store`中对应状态的映射方式
       */
      function State(func: (state: any, getters: any) => any): PropertyDecorator
      /**
       * 将一个属性映射为`store`中的指定状态
       */
      function State(target: Object, propertyKey: string | symbol): void
      /**
       * 将一个属性映射为`store`中的指定`getter`
       *
       * @param name `store`中对应`getter`的名称
       */
      function Getter(name: string): PropertyDecorator
      /**
       * 将一个属性映射为`store`中的指定`getter`
       */
      function Getter(target: Object, propertyKey: string | symbol): void
      /**
       * 将一个属性映射为`store`中的指定`mutation`
       *
       * @param name `store`中对应`mutation`的名称
       */
      function Mutation(name: string): PropertyDecorator
      /**
       * 将一个属性映射为`store`中的指定`mutation`
       *
       * @param func `store`中对应`mutation`的映射方式
       */
      function Mutation(func: (commit: Commit, ...args: any[]) => any): PropertyDecorator
      /**
       * 将一个属性映射为`store`中的指定`mutation`
       */
      function Mutation(target: Object, propertyKey: string | symbol): void
      /**
       * 将一个属性映射为`store`中的指定`action`
       *
       * @param name `store`中对应`action`的名称
       */
      function Action(name: string): PropertyDecorator
      /**
       * 将一个属性映射为`store`中的指定`action`
       *
       * @param func `store`中对应`action`的映射方式
       */
      function Action(func: (dispatch: Dispatch, ...args: any[]) => any): PropertyDecorator
      /**
       * 将一个属性映射为`store`中的指定`action`
       */
      function Action(target: Object, propertyKey: string | symbol): void
      /**
       * 获取`store`中指定子模块的绑定对象
       *
       * @param name `store`中对应的子模块的名称
       */
      function namespace(name: string): Namespace
      type MutationMethod = (...args: any[]) => void
      type ActionMethod = (...args: any[]) => Promise<any>
    }
  }
  const request: request
  const wx: wx.Wrapped<wx.internal>
}

export = weuse
