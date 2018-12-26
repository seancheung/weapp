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
  }
  namespace store {
    type StateMapper<T> = (state: Record<string, any>) => T
    type Actor = (...args: any[]) => (dispatch: Dispatch) => any
    type MappedDirector<T extends Record<string, Actor>> = {
      [K in keyof T]?: (...args: Parameters<T[K]>) => ReturnType<ReturnType<T[K]>>
    }
    interface Action {
      type: string
      [x: string]: any
    }
    type Reducer<T extends Record<string, any>> = (state: T, action: Action) => T
    type Dispatch = (data: Action) => void
    type Director<T extends Record<string, Function>> = (dispatch: Dispatch) => T
    interface Store<T extends Record<string, any>> {
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
    function combineReducers<T extends Record<string, any>>(
      reducers: Record<string, Reducer<any>>
    ): Reducer<T>
    /**
     * 创建一个 Director
     *
     * @param actors 要转换的 Actors
     */
    function createDirector<T extends Record<string, Actor>>(actors?: T): Director<T>
    /**
     * 创建一个 Store
     * @param reducer 关联的 Reducer
     */
    function createStore<T extends Record<string, any>>(reducer: Reducer<T>): Store<T>
    /**
     * 创建一个关联指定 Store 的 App. 用法同 App(). 只能调用一次
     *
     * @param store 关联的 Store
     * @param options App 参数
     */
    function provider<
      TState extends Record<string, any>,
      TApp extends wx.App & Record<string, any>
    >(store: Store<TState>, options: wx.App & TApp): void
    /**
     * 创建一个关联 Provider 的 Page
     * @returns Page 构造器
     * @param options Page 参数
     */
    function connect<
      TData extends Record<string, any>,
      TPage extends wx.Page & Record<string, any>
    >(options: wx.Page<TData> & TPage): void
    /**
     * 创建一个关联 Provider 的 Page
     *
     * @param stateMapper 状态订阅映射
     * @param options Page 参数
     */
    function connect<
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
    function connect<
      TState extends Record<string, any>,
      TDirector extends Record<string, Actor>,
      TData extends Record<string, any>,
      TPage extends wx.Page & Record<string, any>
    >(
      stateMapper: StateMapper<TState>,
      director: Director<TDirector>,
      options: wx.Page<TData & Partial<TState>> & TPage & MappedDirector<TDirector>
    ): void
  }
  const request: request
  const wx: wx.Wrapped<wx.internal>
}

export = weuse
