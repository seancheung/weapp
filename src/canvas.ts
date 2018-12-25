import { wrapped } from './wrap'
const { canvasToTempFilePath, getImageInfo } = wrapped
declare const wx: any

interface ImageInfo {
  width: number
  height: number
  path: string
}
interface Vector2 {
  x: number
  y: number
}

export declare namespace Color {
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
export type Color = string | Color.LinearGradiant | Color.CircularGradiant | Color.Pattern
export declare namespace Stroke {
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
export declare namespace Fill {
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
export declare namespace Font {
  type Align = 'left' | 'center' | 'right'
  type Baseline = 'top' | 'bottom' | 'middle' | 'normal'
}
export interface Font {
  family?: string
  size: number
  align?: Font.Align
  baseline?: Font.Baseline
}
export declare namespace Point {
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
export type Point = Point.Linear | Point.Arc | Point.Quadratic | Point.Cubic
export declare namespace Clip {
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
export type Clip = Clip.Rectangle | Clip.Circle | Clip.Path
export interface Transform {
  translate?: Partial<Vector2>
  rotate?: number
  scale?: Partial<Vector2> | number
}
export declare namespace Layer {
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
export type Layer = Layer.Rect | Layer.Arc | Layer.Image | Layer.Text | Layer.Path
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
export type Downloader = (src: string) => Promise<ImageInfo>
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
export async function resolveLayers(layers: Layer[], downloader: Downloader): Promise<Layer[]> {
  type M = Record<string, ImageInfo>
  const map: M = layers
    .filter(l => l.type === 'image')
    .reduce((t: M, l) => {
      const { src } = l as Layer.Image
      if (!t[src]) {
        t[src] = null
      }
      return t
    }, {})
  await Promise.all(Object.keys(map).map(src => downloader(src).then(info => (map[src] = info))))
  return layers.map(layer => {
    if (layer.type !== 'image') {
      return Object.assign({ x: 0, y: 0 }, layer)
    }
    const info = map[layer.src]
    return Object.assign({ x: 0, y: 0, width: info.width, height: info.height }, layer, {
      src: info.path
    })
  })
}
export function resolveColor(ctx: any, color: Color): any {
  if (typeof color === 'string') {
    return color
  }
  switch (color.type) {
    case 'linear': {
      const gd = ctx.createLinearGradient(color.x0, color.y0, color.x1, color.y1)
      color.stops.forEach(s => gd.addColorStop(...s))
      return gd
    }
    case 'circular': {
      const gd = ctx.createCircularGradient(color.x, color.y, color.radius)
      color.stops.forEach(s => gd.addColorStop(...s))
      return gd
    }
    case 'pattern':
      return ctx.createPattern(color.src, color.repetition)
    default:
      throw new Error('invalid gradiant type')
  }
}
export function resolveAnchor<T extends Layer.Rect | Layer.Image>(ctx: any, layer: T): T {
  let { x = 0, y = 0 } = layer
  const { width, height, anchor } = layer
  if (anchor) {
    if (anchor.x) {
      x -= Math.max(Math.min(anchor.x, 1), 0) * width
    }
    if (anchor.y) {
      y -= Math.max(Math.min(anchor.y, 1), 0) * height
    }
  }
  return Object.assign({}, layer, { x, y, width, height })
}
export function applyPath(ctx: any, points: Point[], close?: boolean): void {
  points.forEach((p, i) => {
    if (i === 0) {
      if (p.type !== 'linear') {
        throw new Error('invalid beginning point type')
      }
      ctx.beginPath()
      ctx.moveTo(p.x, p.y)
    } else {
      switch (p.type) {
        case 'linear':
          ctx.lineTo(p.x, p.y)
          break
        case 'arc':
          {
            const last = points[i - 1]
            ctx.arcTo(last.x, last.y, p.x, p.y, p.radius)
          }
          break
        case 'quadratic':
          ctx.quadraticCurveTo(p.cpx, p.cpy, p.x, p.y)
          break
        case 'cubic':
          ctx.bezierCurveTo(p.cpx0, p.cpy0, p.cpx1, p.cpy1, p.x, p.y)
          break
        default:
          throw new Error('invalid point type')
      }
    }
  })
  if (close) {
    ctx.closePath()
  }
}
export function applyTransform(ctx: any, transform: Transform): void {
  const { translate, rotate, scale } = transform
  if (translate) {
    ctx.translate(translate.x, translate.y)
  }
  if (rotate) {
    ctx.rotate(rotate)
  }
  if (scale) {
    if (typeof scale === 'number') {
      ctx.scale(scale, scale)
    } else {
      ctx.scale(scale.x, scale.y)
    }
  }
}
export function applyClip(ctx: any, clip: Clip): void {
  switch (clip.type) {
    case 'rect':
      {
        if (clip.radius) {
          const { x, y, width: w, height: h, radius: r } = clip
          ctx.beginPath()
          ctx.moveTo(x + r, y)
          ctx.arcTo(x + w, y, x + w, y + h, r)
          ctx.arcTo(x + w, y + h, x, y + h, r)
          ctx.arcTo(x, y + h, x, y, r)
          ctx.arcTo(x, y, x + w, y, r)
          ctx.closePath()
          ctx.setStrokeStyle('transparent')
          ctx.setLineWidth(1)
          ctx.stroke()
          ctx.clip()
        } else {
          ctx.beginPath()
          ctx.rect(clip.x, clip.y, clip.width, clip.height)
          ctx.setStrokeStyle('transparent')
          ctx.setLineWidth(1)
          ctx.stroke()
          ctx.clip()
        }
      }
      break
    case 'circular':
      {
        ctx.beginPath()
        ctx.arc(clip.x, clip.y, clip.radius, 0, 2 * Math.PI)
        ctx.setStrokeStyle('transparent')
        ctx.setLineWidth(1)
        ctx.stroke()
        ctx.clip()
      }
      break
    case 'path':
      {
        applyPath(ctx, [{ x: clip.x, y: clip.y, type: 'linear' }, ...clip.points])
        ctx.setStrokeStyle('transparent')
        ctx.setLineWidth(1)
        ctx.stroke()
        ctx.clip()
      }
      break
    default:
      throw new Error('invalid clip type')
  }
}
export function applyRect(ctx: any, layer: Layer.Rect): void {
  if (layer.anchor) {
    layer = resolveAnchor(ctx, layer)
  }
  ctx.beginPath()
  ctx.rect(layer.x, layer.y, layer.width, layer.height)
}
export function applyArc(ctx: any, layer: Layer.Arc): void {
  ctx.beginPath()
  ctx.arc(
    layer.x,
    layer.y,
    layer.radius,
    layer.startAngle || 0,
    layer.endAngle || Math.PI * 2,
    layer.counterClockwise
  )
}
export function applyFill(ctx: any, fill: Fill): void {
  const { color, shadow } = fill
  if (color != null) {
    ctx.setFillStyle(resolveColor(ctx, color))
  }
  if (shadow) {
    const { x = 0, y = 0, blur = 0, color: c = 'black' } = shadow
    ctx.setShadow(x, y, blur, c)
  }
}
export function applyStroke(ctx: any, stroke: Stroke): void {
  const { color = 'black', lineWidth = 1, lineDash, lineCap, lineJoin, miterLimit } = stroke
  if (color != null) {
    ctx.setStrokeStyle(resolveColor(ctx, color))
  }
  if (lineWidth != null) {
    ctx.setLineWidth(lineWidth)
  }
  if (lineDash) {
    ctx.setLineDash(lineDash.pattern, lineDash.offset)
  }
  if (lineJoin) {
    ctx.setLineJoin(lineJoin)
    if (lineJoin === 'miter' && miterLimit != null) {
      ctx.setMiterLimit(miterLimit)
    }
  }
  if (lineCap) {
    ctx.setLineCap(lineCap)
  }
}
export function applyFont(ctx: any, font: Font): void {
  if (font.size != null) {
    ctx.setFontSize(font.size)
  }
  if (font.align) {
    ctx.setTextAlign(font.align)
  }
  if (font.baseline) {
    ctx.setTextBaseline(font.baseline)
  }
}
export function getLayerWidth(ctx: any, layer: Layer): number {
  switch (layer.type) {
    case 'rect':
    case 'image':
      return layer.width
    case 'text': {
      const { width } = ctx.measureText(layer.text)
      return layer.maxWidth ? Math.min(width, layer.maxWidth) : width
    }
    case 'arc':
      return layer.radius * 2
    case 'path': {
      const axis = layer.points.map(p => p.x)
      return Math.max(...axis) - Math.min(...axis)
    }
    default:
      throw new Error('invalid layer type')
  }
}
export function getLayerHeight(ctx: any, layer: Exclude<Layer, Layer.Text>): number {
  switch (layer.type) {
    case 'rect':
    case 'image':
      return layer.height
    case 'arc':
      return layer.radius * 2
    case 'path': {
      const axis = layer.points.map(p => p.x)
      return Math.max(...axis) - Math.min(...axis)
    }
    default:
      throw new Error('invalid layer type')
  }
}
export function drawLayer(ctx: any, layer: Layer): void {
  ctx.save()
  if (layer.transform) {
    applyTransform(ctx, layer.transform)
  }
  if (layer.clip) {
    applyClip(ctx, layer.clip)
  }
  if (layer.fill && typeof layer.fill === 'object') {
    applyFill(ctx, layer.fill)
  }
  if (layer.stroke && typeof layer.stroke === 'object') {
    applyStroke(ctx, layer.stroke)
  }
  switch (layer.type) {
    case 'rect':
      applyRect(ctx, layer)
      break
    case 'arc':
      applyArc(ctx, layer)
      break
    case 'path':
      applyPath(ctx, [{ x: layer.x, y: layer.y, type: 'linear' }, ...layer.points], layer.close)
      break
    case 'text':
      drawText(ctx, layer)
      return
    case 'image':
      drawImage(ctx, layer)
      return
    default:
      throw new Error('invalid layer type')
  }
  if (layer.fill) {
    ctx.fill()
  }
  if (layer.stroke) {
    ctx.stroke()
  }
  ctx.restore()
}
export function drawText(ctx: any, layer: Layer.Text): void {
  if (layer.font) {
    applyFont(ctx, layer.font)
  }
  if (layer.fill) {
    ctx.fillText(layer.text, layer.x, layer.y, layer.maxWidth)
  }
  if (layer.stroke) {
    ctx.strokeText(layer.text, layer.x, layer.y, layer.maxWidth)
  }
  ctx.restore()
}
export function drawImage(ctx: any, layer: Layer.Image): void {
  if (layer.anchor) {
    layer = resolveAnchor(ctx, layer)
  }
  const params = [layer.src, layer.x, layer.y, layer.width, layer.height]
  if (layer.crop) {
    const { x = 0, y = 0, width = layer.width, height = layer.height } = layer.crop
    params.push(x, y, width, height)
  }
  ctx.drawImage(...params)
  ctx.restore()
}
/**
 * 在 canvas 上绘制图形
 *
 * @param canvasId Canvas ID
 * @param options 选项
 * @returns 导出后的文件路径(需要设置选项中 export 为 true)
 */
export async function draw(canvasId: string, options: Options): Promise<void | string> {
  const layers = await resolveLayers(
    options.layers,
    options.downloader || (src => getImageInfo({ src }))
  )
  const ctx = wx.createCanvasContext(canvasId)
  if (options.default) {
    const { stroke, fill, font } = options.default
    if (stroke) {
      applyStroke(ctx, stroke)
    }
    if (fill) {
      applyFill(ctx, fill)
    }
    if (font) {
      applyFont(ctx, font)
    }
  }
  ctx.save()
  layers.forEach(layer => drawLayer(ctx, layer))
  const { export: dump } = options
  await new Promise(resolve => ctx.draw(false, resolve))
  if (dump) {
    const { tempFilePath } = await canvasToTempFilePath({
      canvasId,
      x: dump.x,
      y: dump.y,
      width: dump.width,
      height: dump.height,
      destWidth: dump.destWidth,
      destHeight: dump.destHeight,
      fileType: dump.fileType,
      quality: dump.quality
    })
    return tempFilePath
  }
}
