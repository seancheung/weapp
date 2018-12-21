import { getImageInfo } from './wrap'

export declare namespace Canvas {
  namespace Color {
    interface GradiantStop {
      stop: number
      color: string
    }
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
  interface Stroke {
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
  interface Fill {
    color?: Color
    shadow?: Fill.Shadow
  }
  namespace Font {
    type Align = 'left' | 'center' | 'right'
    type Baseline = 'top' | 'bottom' | 'middle' | 'normal'
  }
  interface Font {
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
      x: number
      y: number
      type: string
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
  namespace Layer {
    interface Base {
      type: string
      x?: number
      y?: number
      fill?: Fill | true
      stroke?: Stroke | true
      clip?: Clip
    }
    interface Rect extends Base {
      type: 'rect'
      width: number
      height: number
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
    }
    interface Text extends Base {
      type: 'text'
      text: string
      font?: Font
      maxWidth?: number
    }
  }
  type Layer = Layer.Rect | Layer.Arc | Layer.Image | Layer.Text | Layer.Path
  interface Settings {
    stroke?: Canvas.Stroke
    fill?: Canvas.Fill
    font?: Canvas.Font
  }
  interface Export {
    x?: number
    y?: number
    width: number
    height: number
    destWidth?: number
    destHeight?: number
    fileType?: 'jpg' | 'png'
    quality?: number
  }
}
export interface Canvas {
  default?: Canvas.Settings
  layers: Canvas.Layer[]
  dump?: Canvas.Export
}
async function resolveLayers(layers: Canvas.Layer[]): Promise<Canvas.Layer[]> {
  const map: Record<string, wx.ImageInfoResponse> = layers
    .filter(l => l.type === 'image')
    .reduce((t: any, l) => {
      const { src } = l as Canvas.Layer.Image
      if (!t[src]) {
        t[src] = null
      }
      return t
    }, {})
  await Promise.all(
    Object.keys(map).map(src => getImageInfo({ src }).then(info => (map[src] = info)))
  )
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
function resolveColor(ctx: any, color: Canvas.Color): any {
  if (typeof color === 'string') {
    return color
  }
  switch (color.type) {
    case 'linear': {
      const gd = ctx.createLinearGradient(color.x0, color.y0, color.x1, color.y1)
      color.stops.forEach(s => gd.addColorStop(s.stop, s.color))
      return gd
    }
    case 'circular': {
      const gd = ctx.createCircularGradient(color.x, color.y, color.radius)
      color.stops.forEach(s => gd.addColorStop(s.stop, s.color))
      return gd
    }
    case 'pattern':
      return ctx.createPattern(color.src, color.repetition)
    default:
      throw new Error('invalid gradiant type')
  }
}
function applyPath(ctx: any, points: Canvas.Point[], close?: boolean): void {
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
function applyClip(ctx: any, clip: Canvas.Clip): void {
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
function applyRect(ctx: any, layer: Canvas.Layer.Rect): void {
  ctx.beginPath()
  ctx.rect(layer.x, layer.y, layer.width, layer.height)
}
function applyArc(ctx: any, layer: Canvas.Layer.Arc): void {
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
function applyFill(ctx: any, fill: Canvas.Fill): void {
  const { color, shadow } = fill
  if (color != null) {
    ctx.setFillStyle(resolveColor(ctx, color))
  }
  if (shadow) {
    const { x = 0, y = 0, blur = 0, color: c = 'black' } = shadow
    ctx.setShadow(x, y, blur, c)
  }
}
function applyStroke(ctx: any, stroke: Canvas.Stroke): void {
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
function applyFont(ctx: any, font: Canvas.Font): void {
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
function drawLayer(ctx: any, layer: Canvas.Layer): void {
  ctx.save()
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
function drawText(ctx: any, layer: Canvas.Layer.Text): void {
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
function drawImage(ctx: any, layer: Canvas.Layer.Image): void {
  const params = [layer.src, layer.x, layer.y, layer.width, layer.height]
  if (layer.crop) {
    const { x = 0, y = 0, width = layer.width, height = layer.height } = layer.crop
    params.push(x, y, width, height)
  }
  ctx.drawImage(...params)
  ctx.restore()
}
export async function drawPoster(canvasId: string, canvas: Canvas): Promise<void | string> {
  const layers = await resolveLayers(canvas.layers)
  const ctx = wx.createCanvasContext(canvasId)
  if (canvas.default) {
    const { stroke, fill, font } = canvas.default
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
  const { dump } = canvas
  return new Promise((resolve, reject) =>
    ctx.draw(false, () => {
      if (!dump) {
        resolve()
      } else {
        wx.canvasToTempFilePath({
          canvasId,
          x: dump.x || 0,
          y: dump.y || 0,
          width: dump.width,
          height: dump.height,
          destWidth: dump.destWidth || dump.width,
          destHeight: dump.destHeight || dump.height,
          fileType: dump.fileType || 'jpg',
          quality: dump.quality || 1,
          success: (res: any) => resolve(res.tempFilePath),
          fail: (res: any) => reject(new Error(res.errMsg))
        })
      }
    })
  )
}
