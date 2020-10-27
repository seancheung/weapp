(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var promise_namespaceObject = {};
__webpack_require__.r(promise_namespaceObject);
__webpack_require__.d(promise_namespaceObject, "map", function() { return map; });
__webpack_require__.d(promise_namespaceObject, "serial", function() { return serial; });
__webpack_require__.d(promise_namespaceObject, "promisify", function() { return promisify; });
var canvas_namespaceObject = {};
__webpack_require__.r(canvas_namespaceObject);
__webpack_require__.d(canvas_namespaceObject, "draw", function() { return draw; });
__webpack_require__.d(canvas_namespaceObject, "resolveLayers", function() { return resolveLayers; });
__webpack_require__.d(canvas_namespaceObject, "resolveColor", function() { return resolveColor; });
__webpack_require__.d(canvas_namespaceObject, "resolveAnchor", function() { return resolveAnchor; });
__webpack_require__.d(canvas_namespaceObject, "applyPath", function() { return applyPath; });
__webpack_require__.d(canvas_namespaceObject, "applyTransform", function() { return applyTransform; });
__webpack_require__.d(canvas_namespaceObject, "applyClip", function() { return applyClip; });
__webpack_require__.d(canvas_namespaceObject, "applyRect", function() { return applyRect; });
__webpack_require__.d(canvas_namespaceObject, "applyArc", function() { return applyArc; });
__webpack_require__.d(canvas_namespaceObject, "applyFill", function() { return applyFill; });
__webpack_require__.d(canvas_namespaceObject, "applyStroke", function() { return applyStroke; });
__webpack_require__.d(canvas_namespaceObject, "applyFont", function() { return applyFont; });
__webpack_require__.d(canvas_namespaceObject, "getLayerWidth", function() { return getLayerWidth; });
__webpack_require__.d(canvas_namespaceObject, "getLayerHeight", function() { return getLayerHeight; });
__webpack_require__.d(canvas_namespaceObject, "drawLayer", function() { return drawLayer; });
__webpack_require__.d(canvas_namespaceObject, "drawText", function() { return drawText; });
__webpack_require__.d(canvas_namespaceObject, "drawImage", function() { return drawImage; });
var redux_namespaceObject = {};
__webpack_require__.r(redux_namespaceObject);
__webpack_require__.d(redux_namespaceObject, "createStore", function() { return createStore; });
__webpack_require__.d(redux_namespaceObject, "combineReducers", function() { return combineReducers; });
__webpack_require__.d(redux_namespaceObject, "createProvider", function() { return createProvider; });
__webpack_require__.d(redux_namespaceObject, "createConsumer", function() { return createConsumer; });
__webpack_require__.d(redux_namespaceObject, "Provider", function() { return Provider; });
__webpack_require__.d(redux_namespaceObject, "Consumer", function() { return Consumer; });
var storage_namespaceObject = {};
__webpack_require__.r(storage_namespaceObject);
__webpack_require__.d(storage_namespaceObject, "persist", function() { return persist; });
__webpack_require__.d(storage_namespaceObject, "expire", function() { return expire; });
__webpack_require__.d(storage_namespaceObject, "ttl", function() { return ttl; });
__webpack_require__.d(storage_namespaceObject, "exists", function() { return exists; });
__webpack_require__.d(storage_namespaceObject, "touch", function() { return touch; });
__webpack_require__.d(storage_namespaceObject, "flush", function() { return flush; });
__webpack_require__.d(storage_namespaceObject, "del", function() { return del; });
__webpack_require__.d(storage_namespaceObject, "set", function() { return set; });
__webpack_require__.d(storage_namespaceObject, "get", function() { return get; });
var utils_namespaceObject = {};
__webpack_require__.r(utils_namespaceObject);
__webpack_require__.d(utils_namespaceObject, "saveImageToPhotosAlbum", function() { return saveImageToPhotosAlbum; });
__webpack_require__.d(utils_namespaceObject, "chooseLocation", function() { return chooseLocation; });
__webpack_require__.d(utils_namespaceObject, "getLocation", function() { return getLocation; });
__webpack_require__.d(utils_namespaceObject, "authorize", function() { return authorize; });
__webpack_require__.d(utils_namespaceObject, "encodeQuery", function() { return encodeQuery; });
__webpack_require__.d(utils_namespaceObject, "decodeQuery", function() { return decodeQuery; });
__webpack_require__.d(utils_namespaceObject, "joinUrl", function() { return joinUrl; });
__webpack_require__.d(utils_namespaceObject, "clone", function() { return clone; });
__webpack_require__.d(utils_namespaceObject, "merge", function() { return merge; });

// CONCATENATED MODULE: ./src/promise.ts
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * 对一个数组进行map操作并行执行每个返回的Promise
 * @param values
 * @param mapper
 * @returns 按传入顺序排序的执行结果
 */
function map(values, mapper) {
  return Promise.all(values.map(mapper));
}
/**
 * 顺序执行Promise
 *
 * @param values 要执行的Promise或返回数据
 * @returns 按传入顺序排序的执行结果
 */

function serial(values) {
  return values.reduce(function (p, c) {
    return p.then(function (res) {
      return Promise.resolve(c).then(function (r) {
        return [].concat(_toConsumableArray(res), [r]);
      });
    });
  }, Promise.resolve([]));
}
/**
 * 将一个小程序方法 Promise 化. 需要该方法中接受 success/fail 回调
 *
 * @param func 需要处理的小程序方法(wx.funcName)
 */

function promisify(func) {
  return function (opts) {
    return opts && (opts.success || opts.fail || opts.complete) ? func.call(wx, opts) : new Promise(function (resolve, reject) {
      func.call(wx, _objectSpread({}, opts, {
        success: resolve,
        fail: function fail(res) {
          reject(new Error(res && res.errMsg));
        }
      }));
    });
  };
}
// CONCATENATED MODULE: ./src/wrap.ts

var wrapped = Object.keys(wx).reduce(function (o, k) {
  if (typeof wx[k] === 'function') {
    o[k] = promisify(wx[k]);
  }

  return o;
}, {});
// CONCATENATED MODULE: ./src/canvas.ts
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function canvas_toConsumableArray(arr) { return canvas_arrayWithoutHoles(arr) || canvas_iterableToArray(arr) || canvas_nonIterableSpread(); }

function canvas_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function canvas_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function canvas_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

/**
 * 在 canvas 上绘制图形
 *
 * @param canvasId Canvas ID
 * @param options 选项
 * @returns 导出后的文件路径(需要设置选项中 export 为 true)
 */
var draw = _async(function (canvasId, options) {
  return _await(resolveLayers(options.layers, options.downloader || function (src) {
    return getImageInfo({
      src: src
    });
  }), function (layers) {
    var ctx = wx.createCanvasContext(canvasId);

    if (options.default) {
      var _options$default = options.default,
          _stroke = _options$default.stroke,
          _fill = _options$default.fill,
          _font = _options$default.font;

      if (_stroke) {
        applyStroke(ctx, _stroke);
      }

      if (_fill) {
        applyFill(ctx, _fill);
      }

      if (_font) {
        applyFont(ctx, _font);
      }
    }

    ctx.save();
    layers.forEach(function (layer) {
      return drawLayer(ctx, layer);
    });
    var dump = options.export;
    return _await(new Promise(function (resolve) {
      return ctx.draw(false, resolve);
    }), function () {
      return function () {
        if (dump) {
          return _await(canvasToTempFilePath({
            canvasId: canvasId,
            x: dump.x,
            y: dump.y,
            width: dump.width,
            height: dump.height,
            destWidth: dump.destWidth,
            destHeight: dump.destHeight,
            fileType: dump.fileType,
            quality: dump.quality
          }), function (_ref2) {
            var tempFilePath = _ref2.tempFilePath;
            return tempFilePath;
          });
        }
      }();
    });
  });
});
var resolveLayers = _async(function (layers, downloader) {
  var map = layers.filter(function (l) {
    return l.type === 'image';
  }).reduce(function (t, l) {
    var _ref = l,
        src = _ref.src;

    if (!t[src]) {
      t[src] = null;
    }

    return t;
  }, {});
  return _await(Promise.all(Object.keys(map).map(function (src) {
    return downloader(src).then(function (info) {
      return map[src] = info;
    });
  })), function () {
    return layers.map(function (layer) {
      if (layer.type !== 'image') {
        return Object.assign({
          x: 0,
          y: 0
        }, layer);
      }

      var info = map[layer.src];
      return Object.assign({
        x: 0,
        y: 0,
        width: info.width,
        height: info.height
      }, layer, {
        src: info.path
      });
    });
  });
});

var canvasToTempFilePath = wrapped.canvasToTempFilePath,
    getImageInfo = wrapped.getImageInfo;
function resolveColor(ctx, color) {
  if (typeof color === 'string') {
    return color;
  }

  switch (color.type) {
    case 'linear':
      {
        var gd = ctx.createLinearGradient(color.x0, color.y0, color.x1, color.y1);
        color.stops.forEach(function (s) {
          return gd.addColorStop.apply(gd, canvas_toConsumableArray(s));
        });
        return gd;
      }

    case 'circular':
      {
        var _gd = ctx.createCircularGradient(color.x, color.y, color.radius);

        color.stops.forEach(function (s) {
          return _gd.addColorStop.apply(_gd, canvas_toConsumableArray(s));
        });
        return _gd;
      }

    case 'pattern':
      return ctx.createPattern(color.src, color.repetition);

    default:
      throw new Error('invalid gradiant type');
  }
}
function resolveAnchor(ctx, layer) {
  var _layer$x = layer.x,
      x = _layer$x === void 0 ? 0 : _layer$x,
      _layer$y = layer.y,
      y = _layer$y === void 0 ? 0 : _layer$y;
  var width = layer.width,
      height = layer.height,
      anchor = layer.anchor;

  if (anchor) {
    if (anchor.x) {
      x -= Math.max(Math.min(anchor.x, 1), 0) * width;
    }

    if (anchor.y) {
      y -= Math.max(Math.min(anchor.y, 1), 0) * height;
    }
  }

  return Object.assign({}, layer, {
    x: x,
    y: y,
    width: width,
    height: height
  });
}
function applyPath(ctx, points, close) {
  points.forEach(function (p, i) {
    if (i === 0) {
      if (p.type !== 'linear') {
        throw new Error('invalid beginning point type');
      }

      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    } else {
      switch (p.type) {
        case 'linear':
          ctx.lineTo(p.x, p.y);
          break;

        case 'arc':
          {
            var last = points[i - 1];
            ctx.arcTo(last.x, last.y, p.x, p.y, p.radius);
          }
          break;

        case 'quadratic':
          ctx.quadraticCurveTo(p.cpx, p.cpy, p.x, p.y);
          break;

        case 'cubic':
          ctx.bezierCurveTo(p.cpx0, p.cpy0, p.cpx1, p.cpy1, p.x, p.y);
          break;

        default:
          throw new Error('invalid point type');
      }
    }
  });

  if (close) {
    ctx.closePath();
  }
}
function applyTransform(ctx, transform) {
  var translate = transform.translate,
      rotate = transform.rotate,
      scale = transform.scale;

  if (translate) {
    ctx.translate(translate.x, translate.y);
  }

  if (rotate) {
    ctx.rotate(rotate);
  }

  if (scale) {
    if (typeof scale === 'number') {
      ctx.scale(scale, scale);
    } else {
      ctx.scale(scale.x, scale.y);
    }
  }
}
function applyClip(ctx, clip) {
  switch (clip.type) {
    case 'rect':
      {
        if (clip.radius) {
          var _x = clip.x,
              _y = clip.y,
              w = clip.width,
              h = clip.height,
              r = clip.radius;
          ctx.beginPath();
          ctx.moveTo(_x + r, _y);
          ctx.arcTo(_x + w, _y, _x + w, _y + h, r);
          ctx.arcTo(_x + w, _y + h, _x, _y + h, r);
          ctx.arcTo(_x, _y + h, _x, _y, r);
          ctx.arcTo(_x, _y, _x + w, _y, r);
          ctx.closePath();
          ctx.setStrokeStyle('transparent');
          ctx.setLineWidth(1);
          ctx.stroke();
          ctx.clip();
        } else {
          ctx.beginPath();
          ctx.rect(clip.x, clip.y, clip.width, clip.height);
          ctx.setStrokeStyle('transparent');
          ctx.setLineWidth(1);
          ctx.stroke();
          ctx.clip();
        }
      }
      break;

    case 'circular':
      {
        ctx.beginPath();
        ctx.arc(clip.x, clip.y, clip.radius, 0, 2 * Math.PI);
        ctx.setStrokeStyle('transparent');
        ctx.setLineWidth(1);
        ctx.stroke();
        ctx.clip();
      }
      break;

    case 'path':
      {
        applyPath(ctx, [{
          x: clip.x,
          y: clip.y,
          type: 'linear'
        }].concat(canvas_toConsumableArray(clip.points)));
        ctx.setStrokeStyle('transparent');
        ctx.setLineWidth(1);
        ctx.stroke();
        ctx.clip();
      }
      break;

    default:
      throw new Error('invalid clip type');
  }
}
function applyRect(ctx, layer) {
  if (layer.anchor) {
    layer = resolveAnchor(ctx, layer);
  }

  ctx.beginPath();
  ctx.rect(layer.x, layer.y, layer.width, layer.height);
}
function applyArc(ctx, layer) {
  ctx.beginPath();
  ctx.arc(layer.x, layer.y, layer.radius, layer.startAngle || 0, layer.endAngle || Math.PI * 2, layer.counterClockwise);
}
function applyFill(ctx, fill) {
  var color = fill.color,
      shadow = fill.shadow;

  if (color != null) {
    ctx.setFillStyle(resolveColor(ctx, color));
  }

  if (shadow) {
    var _shadow$x = shadow.x,
        _x2 = _shadow$x === void 0 ? 0 : _shadow$x,
        _shadow$y = shadow.y,
        _y2 = _shadow$y === void 0 ? 0 : _shadow$y,
        _shadow$blur = shadow.blur,
        _blur = _shadow$blur === void 0 ? 0 : _shadow$blur,
        _shadow$color = shadow.color,
        c = _shadow$color === void 0 ? 'black' : _shadow$color;

    ctx.setShadow(_x2, _y2, _blur, c);
  }
}
function applyStroke(ctx, stroke) {
  var _stroke$color = stroke.color,
      color = _stroke$color === void 0 ? 'black' : _stroke$color,
      _stroke$lineWidth = stroke.lineWidth,
      lineWidth = _stroke$lineWidth === void 0 ? 1 : _stroke$lineWidth,
      lineDash = stroke.lineDash,
      lineCap = stroke.lineCap,
      lineJoin = stroke.lineJoin,
      miterLimit = stroke.miterLimit;

  if (color != null) {
    ctx.setStrokeStyle(resolveColor(ctx, color));
  }

  if (lineWidth != null) {
    ctx.setLineWidth(lineWidth);
  }

  if (lineDash) {
    ctx.setLineDash(lineDash.pattern, lineDash.offset);
  }

  if (lineJoin) {
    ctx.setLineJoin(lineJoin);

    if (lineJoin === 'miter' && miterLimit != null) {
      ctx.setMiterLimit(miterLimit);
    }
  }

  if (lineCap) {
    ctx.setLineCap(lineCap);
  }
}
function applyFont(ctx, font) {
  if (font.size != null) {
    ctx.setFontSize(font.size);
  }

  if (font.align) {
    ctx.setTextAlign(font.align);
  }

  if (font.baseline) {
    ctx.setTextBaseline(font.baseline);
  }
}
function getLayerWidth(ctx, layer) {
  switch (layer.type) {
    case 'rect':
    case 'image':
      return layer.width;

    case 'text':
      {
        var _ctx$measureText = ctx.measureText(layer.text),
            _width = _ctx$measureText.width;

        return layer.maxWidth ? Math.min(_width, layer.maxWidth) : _width;
      }

    case 'arc':
      return layer.radius * 2;

    case 'path':
      {
        var axis = layer.points.map(function (p) {
          return p.x;
        });
        return Math.max.apply(Math, canvas_toConsumableArray(axis)) - Math.min.apply(Math, canvas_toConsumableArray(axis));
      }

    default:
      throw new Error('invalid layer type');
  }
}
function getLayerHeight(ctx, layer) {
  switch (layer.type) {
    case 'rect':
    case 'image':
      return layer.height;

    case 'arc':
      return layer.radius * 2;

    case 'path':
      {
        var axis = layer.points.map(function (p) {
          return p.x;
        });
        return Math.max.apply(Math, canvas_toConsumableArray(axis)) - Math.min.apply(Math, canvas_toConsumableArray(axis));
      }

    default:
      throw new Error('invalid layer type');
  }
}
function drawLayer(ctx, layer) {
  ctx.save();

  if (layer.transform) {
    applyTransform(ctx, layer.transform);
  }

  if (layer.clip) {
    applyClip(ctx, layer.clip);
  }

  if (layer.fill && _typeof(layer.fill) === 'object') {
    applyFill(ctx, layer.fill);
  }

  if (layer.stroke && _typeof(layer.stroke) === 'object') {
    applyStroke(ctx, layer.stroke);
  }

  switch (layer.type) {
    case 'rect':
      applyRect(ctx, layer);
      break;

    case 'arc':
      applyArc(ctx, layer);
      break;

    case 'path':
      applyPath(ctx, [{
        x: layer.x,
        y: layer.y,
        type: 'linear'
      }].concat(canvas_toConsumableArray(layer.points)), layer.close);
      break;

    case 'text':
      drawText(ctx, layer);
      return;

    case 'image':
      drawImage(ctx, layer);
      return;

    default:
      throw new Error('invalid layer type');
  }

  if (layer.fill) {
    ctx.fill();
  }

  if (layer.stroke) {
    ctx.stroke();
  }

  ctx.restore();
}
function drawText(ctx, layer) {
  if (layer.font) {
    applyFont(ctx, layer.font);
  }

  if (layer.fill) {
    ctx.fillText(layer.text, layer.x, layer.y, layer.maxWidth);
  }

  if (layer.stroke) {
    ctx.strokeText(layer.text, layer.x, layer.y, layer.maxWidth);
  }

  ctx.restore();
}
function drawImage(ctx, layer) {
  if (layer.anchor) {
    layer = resolveAnchor(ctx, layer);
  }

  var params = [layer.src, layer.x, layer.y, layer.width, layer.height];

  if (layer.crop) {
    var _layer$crop = layer.crop,
        _layer$crop$x = _layer$crop.x,
        _x3 = _layer$crop$x === void 0 ? 0 : _layer$crop$x,
        _layer$crop$y = _layer$crop.y,
        _y3 = _layer$crop$y === void 0 ? 0 : _layer$crop$y,
        _layer$crop$width = _layer$crop.width,
        _width2 = _layer$crop$width === void 0 ? layer.width : _layer$crop$width,
        _layer$crop$height = _layer$crop.height,
        _height = _layer$crop$height === void 0 ? layer.height : _layer$crop$height;

    params.push(_x3, _y3, _width2, _height);
  }

  ctx.drawImage.apply(ctx, params);
  ctx.restore();
}
// CONCATENATED MODULE: ./src/redux.ts
function redux_toConsumableArray(arr) { return redux_arrayWithoutHoles(arr) || redux_iterableToArray(arr) || redux_nonIterableSpread(); }

function redux_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function redux_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function redux_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function redux_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { redux_defineProperty(target, key, source[key]); }); } return target; }

function redux_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function redux_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { redux_typeof = function _typeof(obj) { return typeof obj; }; } else { redux_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return redux_typeof(obj); }

/**
 * 用来维持应用所有的`state`树 的一个对象
 */

/**
 * 创建一个`store`来以存放应用中所有的`state`
 *
 * @param reducer 接收两个参数，分别是当前的`state`树和要处理的`action`，返回新的`state`树
 * @param preloadedState 初始时的`state`
 */
function createStore(reducer, preloadedState) {
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var $currentState = preloadedState;
  var $currentReducer = reducer;
  var $currentListeners = [];
  var $nextListeners = $currentListeners;
  var $isDispatching = false;

  function ensureListeners() {
    if ($nextListeners === $currentListeners) {
      $nextListeners = $currentListeners.slice();
    }
  }

  function dispatch(action) {
    if (!action || redux_typeof(action) !== 'object') {
      throw new Error('Actions must be plain objects.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if ($isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      $isDispatching = true;
      $currentState = $currentReducer.call(null, $currentState, action);
    } finally {
      $isDispatching = false;
    }

    var listeners = $currentListeners = $nextListeners;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _listener = _step.value;

        _listener.call(null);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return action;
  }

  function getState() {
    if ($isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.');
    }

    return $currentState;
  }

  function subscribe(listener) {
    if ($isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.');
    }

    var isSubscribed = true;
    ensureListeners();
    $nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if ($isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.');
      }

      isSubscribed = false;
      ensureListeners();
      var index = $nextListeners.indexOf(listener);
      $nextListeners.splice(index, 1);
      $currentListeners = null;
    };
  }

  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the reducer to be a function.');
    }

    $currentReducer = nextReducer;
    dispatch({
      type: '::replace'
    });
  }

  dispatch({
    type: '::init'
  });
  return {
    getState: getState,
    dispatch: dispatch,
    subscribe: subscribe,
    replaceReducer: replaceReducer
  };
}
/**
 * 把一个由多个不同`reducer`函数作为`value`的`object`，合并成一个最终的`reducer`函数
 *
 * @param reducers 多个不同`reducer`组成的对象
 * @returns 一个调用`reducers`对象里所有`reducer`的`reducer`
 */

function combineReducers(reducers) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;
    return Object.keys(reducers).reduce(function (o, k) {
      o[k] = reducers[k](state[k], action);
      return o;
    }, {});
  };
}
/**
 * 提供`store`的生产者
 */

/**
 * 创建一个提供`store`的生产者
 *
 * @param store 要注入的`store`实例
 * @param options 目标实例
 */
function createProvider(store, options) {
  return redux_objectSpread({}, options, {
    get $store() {
      return store;
    }

  });
}
function createConsumer(options, stateMapper) {
  var onLoad = options.onLoad,
      onUnload = options.onUnload;
  var _stateMapper = stateMapper;

  var _disconn;

  function _dispatch(action) {
    var store = this.$store || getApp().$store;

    if (store) {
      return store.dispatch(action);
    }
  }

  function _onLoad() {
    var _this = this;

    var store = this.$store || getApp().$store;

    if (store && typeof _stateMapper === 'function' && _disconn == null) {
      _disconn = store.subscribe(function () {
        var state = store.getState();

        var data = _stateMapper.call(null, state);

        _this.setData(data);
      });
      store.dispatch({
        type: '::connect'
      });
    }

    if (typeof onLoad === 'function') {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      onLoad.apply(this, args);
    }
  }

  function _onUnload() {
    if (typeof _disconn === 'function') {
      _disconn.call(null);

      _disconn = undefined;
    }

    if (typeof onUnload === 'function') {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      onUnload.apply(this, args);
    }
  }

  return redux_objectSpread({}, options, {
    $dispatch: _dispatch,
    onLoad: _onLoad,
    onUnload: _onUnload
  });
}
/**
 * 将一个类标记为提供`store`的生产者
 *
 * @param store 要注入的`store`实例
 */

function Provider(store) {
  return function (target) {
    // NOTE: 此处只能通过`prototype`修改且不能使用`Object.defineProperty`否则`App`与`Page`构造器无法复制
    target.prototype.$store = store;
  };
}
var $mapper = '__mappers__';
/**
 * 将一个类标记为订阅`store`变化的消费者
 */

function Consumer(stateMapper) {
  return function (target) {
    var _stateMapper = stateMapper;
    var mapper = target.prototype[$mapper];

    if (mapper) {
      var initMapper = stateMapper;

      _stateMapper = function _stateMapper(state) {
        return mapper.reduce(function (p, c) {
          return Object.assign(p, redux_defineProperty({}, c.key, c.path.reduce(function (o, k) {
            return o[k];
          }, state)));
        }, initMapper ? initMapper.call(null, state) : {});
      };
    }

    var options = createConsumer({
      onLoad: target.prototype.onLoad,
      onUnload: target.prototype.onUnload
    }, _stateMapper);
    Object.assign(target.prototype, options);
  };
}

(function (_Consumer) {
  /**
   * 子状态绑定对象
   */

  /**
   * 将一个属性映射为`store`中的指定状态
   *
   * @param name `store`中对应状态的名称
   */

  /**
   * 将一个属性映射为`store`中的指定状态
   */
  function State(arg1, propertyKey) {
    return bindState([], arg1, propertyKey);
  }

  _Consumer.State = State;

  function namespace(name) {
    return {
      State: function State(arg1, propertyKey) {
        return bindState([name], arg1, propertyKey);
      }
    };
  }

  _Consumer.namespace = namespace;
})(Consumer || (Consumer = {}));

function bindState(ns, arg1, propertyKey) {
  if (!propertyKey) {
    return function (target, key) {
      if (!target[$mapper]) {
        Object.defineProperty(target, $mapper, {
          value: [],
          enumerable: false
        });
      }

      target[$mapper].push({
        key: key,
        path: [].concat(redux_toConsumableArray(ns), [arg1 || key])
      });
    };
  }

  if (!arg1[$mapper]) {
    Object.defineProperty(arg1, $mapper, {
      value: [],
      enumerable: false
    });
  }

  arg1[$mapper].push({
    key: propertyKey,
    path: [].concat(redux_toConsumableArray(ns), [propertyKey])
  });
}
// CONCATENATED MODULE: ./src/storage.ts
function _continue(value, then) {
  return value && value.then ? value.then(then) : then(value);
}

function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

function storage_toConsumableArray(arr) { return storage_arrayWithoutHoles(arr) || storage_iterableToArray(arr) || storage_nonIterableSpread(); }

function storage_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function storage_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function storage_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _call(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }

  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function storage_async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

function storage_await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

function _awaitIgnored(value, direct) {
  if (!direct) {
    return value && value.then ? value.then(_empty) : Promise.resolve();
  }
}

function _empty() {}

/**
 * 移除指定 key 的有效时间让其不会过期. 注意此接口只能设置由 set 添加的缓存
 *
 * @param key 本地缓存中指定的 key
 * @returns key 存在且设置成功则返回true
 */
var persist = storage_async(function (key) {
  key = "$".concat(key, "#");
  return storage_await(safeGetStorage(key), function (data) {
    if (!data) {
      return false;
    }

    var _JSON$parse11 = JSON.parse(data, reviver),
        _JSON$parse12 = _slicedToArray(_JSON$parse11, 2),
        exp = _JSON$parse12[0],
        value = _JSON$parse12[1];

    if (!exp) {
      return false;
    }

    if (exp < Date.now()) {
      return storage_await(removeStorage({
        key: key
      }), function () {
        return false;
      });
    } else {
      var v = JSON.stringify([0, value]);
      return storage_await(setStorage({
        key: "$".concat(key, "#"),
        data: v
      }), function () {
        return true;
      });
    }
  });
});

/**
 * 更新指定 key 的有效时间. 注意此接口只能设置由 set 添加的缓存
 *
 * @param key 本地缓存中指定的 key
 * @param ttl 有效时间(秒)
 * @returns key 存在且设置成功则返回true
 */
var expire = storage_async(function (key, ttl) {
  if (!ttl || typeof ttl !== 'number' || ttl < 0) {
    throw new Error('Invalid ttl value');
  }

  key = "$".concat(key, "#");
  return storage_await(safeGetStorage(key), function (data) {
    if (!data) {
      return false;
    }

    var _JSON$parse9 = JSON.parse(data, reviver),
        _JSON$parse10 = _slicedToArray(_JSON$parse9, 2),
        exp = _JSON$parse10[0],
        value = _JSON$parse10[1];

    if (exp && exp < Date.now()) {
      return storage_await(removeStorage({
        key: key
      }), function () {
        return false;
      });
    } else {
      var p = ttl ? Date.now() + ttl * 1000 : 0;
      var v = JSON.stringify([p, value]);
      return storage_await(setStorage({
        key: "$".concat(key, "#"),
        data: v
      }), function () {
        return true;
      });
    }
  });
});

/**
 * 获取指定key的剩余有效时间(秒). 注意此接口只能获取由 set 添加的缓存
 *
 * @param key 本地缓存中指定的 key
 * @returns 剩余有效时间(秒). 若key不存在返回-1; 若 key 不会过期返回-2
 */
var ttl = storage_async(function (key) {
  key = "$".concat(key, "#");
  return storage_await(safeGetStorage(key), function (data) {
    if (!data) {
      return -2;
    }

    var _JSON$parse7 = JSON.parse(data),
        _JSON$parse8 = _slicedToArray(_JSON$parse7, 1),
        exp = _JSON$parse8[0];

    if (!exp) {
      return -1;
    }

    var val = exp - Date.now();
    return function () {
      if (val <= 0) {
        return _awaitIgnored(removeStorage({
          key: key
        }));
      } else {
        return Math.floor(val / 1000);
      }
    }();
  });
});

/**
 * 检查 key 是否存在. 注意此接口只能检查由 set 添加的缓存
 *
 * @param key 本地缓存中指定的 key
 * @returns Key 是否存在
 */
var exists = storage_async(function (key) {
  key = "$".concat(key, "#");
  return storage_await(safeGetStorage(key), function (data) {
    if (!data) {
      return false;
    }

    var _JSON$parse5 = JSON.parse(data),
        _JSON$parse6 = _slicedToArray(_JSON$parse5, 1),
        exp = _JSON$parse6[0];

    if (!exp) {
      return true;
    }

    if (exp < Date.now()) {
      return storage_await(removeStorage({
        key: key
      }), function () {
        return false;
      });
    } else {
      return true;
    }
  });
});

/**
 * 检查指定的key是否已过期, 是则移除. 不存在的 key 忽略. 注意此接口只能检查由 set 添加的缓存
 *
 * @param keys 本地缓存中指定的 key
 * @returns 移除掉的 key 数量
 */
var touch = storage_async(function () {
  for (var _len = arguments.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
    keys[_key] = arguments[_key];
  }

  return storage_await(Promise.all(keys.filter(function (k) {
    return /^\$.+#$/.test(k);
  }).map(function (key) {
    return storage_async(function () {
      return storage_await(safeGetStorage(key), function (data) {
        if (!data) {
          return;
        }

        var _JSON$parse3 = JSON.parse(data),
            _JSON$parse4 = _slicedToArray(_JSON$parse3, 1),
            exp = _JSON$parse4[0];

        return {
          key: key,
          exp: exp
        };
      });
    })();
  })), function (array) {
    var expired = array.filter(function (i) {
      return i;
    }).filter(function (_ref2) {
      var exp = _ref2.exp;
      return exp && exp < Date.now();
    });
    return storage_await(Promise.all(expired.map(function (_ref3) {
      var key = _ref3.key;
      return removeStorage({
        key: key
      });
    })), function () {
      return expired.length;
    });
  });
});

/**
 * 移除所有已过期的缓存. 注意此接口只能移除由 set 添加的缓存
 */
var flush = function flush() {
  return _call(getStorageInfo, function (_ref) {
    var keys = _ref.keys;
    return _awaitIgnored(touch.apply(void 0, storage_toConsumableArray(keys)));
  });
};

/**
 * 从本地缓存中移除指定 key. 注意此接口只能移除由 set 添加的缓存
 *
 * @param key 本地缓存中指定的 key
 */
var del = storage_async(function (key) {
  return _awaitIgnored(removeStorage({
    key: "$".concat(key, "#")
  }));
});

/**
 * 将数据存储在本地缓存中指定的 key 中. 会覆盖掉原来该 key 对应的内容. 注意此接口添加的缓存只能由 get 获取到
 *
 * @param opts 选项
 */
var set = storage_async(function (opts) {
  var key = opts.key,
      value = opts.data,
      ttl = opts.ttl;

  if (ttl && (typeof ttl !== 'number' || ttl < 0)) {
    throw new Error('Invalid ttl value');
  }

  var exp = ttl ? Date.now() + ttl * 1000 : 0;
  var data = JSON.stringify([exp, value]);
  return _awaitIgnored(setStorage({
    key: "$".concat(key, "#"),
    data: data
  }));
});

/**
 * 从本地缓存中获取指定 key 的内容. key不存在或已过期则返回 undefined. 注意此接口只能获取到由 set 添加的缓存
 *
 * @param key 本地缓存中指定的 key
 * @returns key 对应的内容. Date 将被反序列化
 */
var get = storage_async(function (key) {
  key = "$".concat(key, "#");
  return storage_await(safeGetStorage(key), function (data) {
    if (!data) {
      return;
    }

    var _JSON$parse = JSON.parse(data, reviver),
        _JSON$parse2 = _slicedToArray(_JSON$parse, 2),
        exp = _JSON$parse2[0],
        value = _JSON$parse2[1];

    return function () {
      if (exp && exp < Date.now()) {
        return _awaitIgnored(removeStorage({
          key: key
        }));
      } else {
        return value;
      }
    }();
  });
});

var safeGetStorage = storage_async(function (key) {
  var _exit = false;
  var res;
  return _continue(_catch(function () {
    return storage_await(getStorage({
      key: key
    }), function (_getStorage) {
      res = _getStorage;
    });
  }, function (error) {
    if (!/not found/i.test(error.message)) {
      throw error;
    }
  }), function (_result3) {
    return _exit ? _result3 : res && res.data;
  });
});

// tslint:disable:no-shadowed-variable

var getStorage = wrapped.getStorage,
    getStorageInfo = wrapped.getStorageInfo,
    removeStorage = wrapped.removeStorage,
    setStorage = wrapped.setStorage;
var dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

function reviver(key, value) {
  if (typeof value === 'string' && dateFormat.test(value)) {
    return new Date(value);
  }

  return value;
}
/**
 * 缓存选项
 */
// CONCATENATED MODULE: ./src/utils.ts
function utils_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { utils_typeof = function _typeof(obj) { return typeof obj; }; } else { utils_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return utils_typeof(obj); }

function utils_async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

function utils_await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

function _invokeIgnored(body) {
  var result = body();

  if (result && result.then) {
    return result.then(utils_empty);
  }
}

function utils_awaitIgnored(value, direct) {
  if (!direct) {
    return value && value.then ? value.then(utils_empty) : Promise.resolve();
  }
}

function utils_empty() {}

function utils_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function utils_slicedToArray(arr, i) { return utils_arrayWithHoles(arr) || utils_iterableToArrayLimit(arr, i) || utils_nonIterableRest(); }

function utils_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function utils_iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function utils_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * 检查权限并写入相册
 *
 * @param opts 写入选项
 */
var saveImageToPhotosAlbum = utils_async(function (opts) {
  return utils_await(authorize('scope.writePhotosAlbum'), function () {
    return wrapped.saveImageToPhotosAlbum(opts);
  });
});
/**
 * 深克隆
 *
 * @param {any} source 对象
 * @returns {any}
 */

/**
 * 检查权限并请求地理定位
 *
 * @param opts 定位选项
 */
var chooseLocation = utils_async(function (opts) {
  return utils_await(authorize('scope.userLocation'), function () {
    return wrapped.chooseLocation(opts);
  });
});

/**
 * 检查权限并获取地理定位
 *
 * @param opts 定位选项
 */
var getLocation = utils_async(function (opts) {
  return utils_await(authorize('scope.userLocation'), function () {
    return wrapped.getLocation(opts);
  });
});

/**
 * 查询授权, 如果未授权则进行请求
 *
 * @param scope 权限名
 */
var authorize = utils_async(function (scope) {
  return utils_await(wrapped.getSetting(), function (_ref7) {
    var authSetting = _ref7.authSetting;
    return _invokeIgnored(function () {
      if (!authSetting[scope]) {
        return utils_awaitIgnored(wrapped.authorize({
          scope: scope
        }));
      }
    });
  });
});


/**
 * 从 object 创建 querystring
 *
 * @param query 要设置的键值对. 值为 null 或 undefined 的对象不会添加到结果中
 * @returns 生成的 querystring
 */
function encodeQuery(query) {
  return Object.entries(query).filter(function (_ref) {
    var _ref2 = utils_slicedToArray(_ref, 2),
        v = _ref2[1];

    return v != null;
  }).map(function (_ref3) {
    var _ref4 = utils_slicedToArray(_ref3, 2),
        k = _ref4[0],
        v = _ref4[1];

    return "".concat(k, "=").concat(v);
  }).join('&');
}
/**
 * 解析小程序页面传递的 querystring 对象. 兼容小程序码、二维码、普通链接
 *
 * @param query 从页面 onLoad(options) 中获取的 options
 * @returns 解析后的对象
 */

function decodeQuery(query) {
  var qs;

  if (query.scene) {
    qs = decodeURIComponent(query.scene);
  } else if (query.q) {
    var url = decodeURIComponent(query.q);

    var _url$split = url.split('?'),
        _url$split2 = utils_slicedToArray(_url$split, 2),
        arg = _url$split2[1];

    qs = arg;
  } else {
    return query;
  }

  return qs ? qs.split('&').map(function (i) {
    return i.split('=');
  }).reduce(function (o, _ref5) {
    var _ref6 = utils_slicedToArray(_ref5, 2),
        k = _ref6[0],
        v = _ref6[1];

    return Object.assign(o, utils_defineProperty({}, k, v));
  }, {}) : {};
}
/**
 * 连接 url. 会移除重复的 '/' 符号. url 开头跟结尾均可包含或缺省 '/' 符号
 *
 * @param urls 要进行连接的url
 * @returns 连接后的url. 结尾不包含 '/' 符号(除非整体为 '/' )
 */

function joinUrl() {
  for (var _len = arguments.length, urls = new Array(_len), _key = 0; _key < _len; _key++) {
    urls[_key] = arguments[_key];
  }

  return urls.join('/').replace(/([^:])\/{2,}/g, '$1/').replace(/\/$/, '');
}
function clone(source) {
  return source != null ? JSON.parse(JSON.stringify(source)) : source;
}
/**
 * 递归克隆
 *
 * @param {any} source 对象
 * @param {any} target 对象
 * @returns {any}
 */

function merge(source, target) {
  if (target == null) {
    return clone(source);
  }

  if (source == null) {
    return clone(target);
  }

  if (utils_typeof(source) !== 'object' || utils_typeof(target) !== 'object') {
    return clone(target);
  }

  var merge = function merge(source, target) {
    Object.keys(target).forEach(function (key) {
      if (source[key] == null) {
        source[key] = target[key];
      } else if (utils_typeof(source[key]) === 'object') {
        if (utils_typeof(target[key]) === 'object') {
          merge(source[key], target[key]);
        } else {
          source[key] = target[key];
        }
      } else {
        source[key] = target[key];
      }
    });
    return source;
  };

  return merge(clone(source), clone(target));
}
// CONCATENATED MODULE: ./src/request.ts
function request_async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

function request_await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

function request_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { request_defineProperty(target, key, source[key]); }); } return target; }

function request_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function request_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { request_typeof = function _typeof(obj) { return typeof obj; }; } else { request_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return request_typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (request_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var download = request_async(function (options) {
  var _this3 = this;

  return request_await(send.call(_this3, request_objectSpread({}, options, {
    method: 'HEAD'
  })), function (_ref2) {
    var header = _ref2.header;
    var length = header && header['Content-Length'];

    if (length == null) {
      throw new Error('Not Supported');
    }

    length = parseInt(length, 10);
    var _options$parts = options.parts,
        parts = _options$parts === void 0 ? 1 : _options$parts;
    var chunkSize = Math.ceil(length / parts);

    var makeTask = request_async(function (range, opts) {
      return request_await(send.call(_this3, {
        url: opts.url,
        header: request_objectSpread({}, opts.header, {
          Range: range
        }),
        dataType: 'none',
        responseType: 'arraybuffer'
      }), function (_ref3) {
        var data = _ref3.data;
        return data;
      });
    });

    return request_await(Promise.all(Array(Math.ceil(length / chunkSize)).fill(null).map(function (_, i) {
      return makeTask("bytes=".concat(i * chunkSize, "-").concat(i * chunkSize + chunkSize - 1, "/").concat(length), options);
    })), function (chunks) {
      var merged = new Uint8Array(chunks.reduce(function (s, c) {
        return s + c.byteLength;
      }, 0));
      chunks.reduce(function (o, chunk) {
        merged.set(new Uint8Array(chunk), o);
        return o + chunk.byteLength;
      }, 0);

      if (options.filePath) {
        var fs = wx.getFileSystemManager();
        fs.writeFileSync(options.filePath, merged.buffer, 'binary');
        return {
          filePath: options.filePath
        };
      }

      return {
        buffer: merged.buffer
      };
    });
  });
});

var send = request_async(function (options) {
  var _this2 = this;

  var _this2$_defaults = _this2._defaults,
      _defaults = _this2$_defaults === void 0 ? {} : _this2$_defaults;

  var baseUrl = _defaults.baseUrl,
      dataType = _defaults.dataType,
      h = _defaults.header,
      responseType = _defaults.responseType,
      q = _defaults.query;
  var url = options.url,
      header = options.header,
      query = options.query;

  if (baseUrl) {
    url = joinUrl(baseUrl, url);
  }

  if (h) {
    header = request_objectSpread({}, h, header);
  }

  if (query && q && typeof query !== 'string' && typeof q !== 'string') {
    query = request_objectSpread({}, q, query);
  }

  if (query) {
    if (typeof query === 'string') {
      url = url + '?' + query;
    } else {
      url = url + '?' + encodeQuery(query);
    }
  }

  var method = options.method,
      data = options.data;
  return request_await(wrapped.request({
    url: url,
    method: method,
    header: header,
    data: data,
    dataType: dataType,
    responseType: responseType
  }), function (res) {
    if (res.statusCode >= 400 || res.statusCode < 200) {
      var text;

      if (typeof res.data === 'string') {
        text = res.data;
      } else if (res.data instanceof ArrayBuffer) {
        text = '[bytes]';
      } else if (res.data) {
        text = JSON.stringify(res.data);
      }

      throw new HttpError(res.statusCode, text);
    }

    return res;
  });
});

// tslint:disable:no-invalid-this



var HttpError =
/*#__PURE__*/
function (_Error) {
  _inherits(HttpError, _Error);

  function HttpError(code, message) {
    var _this;

    _classCallCheck(this, HttpError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HttpError).call(this, message));
    _this.code = code;
    return _this;
  }

  return HttpError;
}(_wrapNativeSuper(Error));

function defaults(options) {
  var cxt = ['options', 'get', 'head', 'post', 'put', 'delete', 'trace', 'connect'].reduce(function (o, k) {
    return Object.assign(o, request_defineProperty({}, k, function (opts) {
      if (typeof opts === 'string') {
        opts = {
          url: opts
        };
      }

      return send.call(this, request_objectSpread({}, opts, {
        method: k.toUpperCase()
      }));
    }));
  }, {
    _defaults: options,
    download: download
  });
  Object.assign(cxt, {
    download: function (_download) {
      function download(_x) {
        return _download.apply(this, arguments);
      }

      download.toString = function () {
        return _download.toString();
      };

      return download;
    }(function (opts) {
      var _ref = this,
          _ref$_defaults = _ref._defaults,
          _defaults = _ref$_defaults === void 0 ? {} : _ref$_defaults;

      var baseUrl = _defaults.baseUrl,
          h = _defaults.header;
      var url = opts.url,
          header = opts.header;

      if (baseUrl) {
        url = joinUrl(baseUrl, url);
      }

      if (h) {
        header = request_objectSpread({}, header, h);
      }

      return download(request_objectSpread({}, opts, {
        url: url,
        header: header
      }));
    })
  });
  return Object.assign(send.bind(cxt), cxt);
}

var request = Object.assign(defaults(), {
  defaults: defaults
});
// CONCATENATED MODULE: ./src/index.ts
/* concated harmony reexport request */__webpack_require__.d(__webpack_exports__, "request", function() { return request; });
/* concated harmony reexport wx */__webpack_require__.d(__webpack_exports__, "wx", function() { return wrapped; });
/* concated harmony reexport promise */__webpack_require__.d(__webpack_exports__, "promise", function() { return promise_namespaceObject; });
/* concated harmony reexport canvas */__webpack_require__.d(__webpack_exports__, "canvas", function() { return canvas_namespaceObject; });
/* concated harmony reexport storage */__webpack_require__.d(__webpack_exports__, "storage", function() { return storage_namespaceObject; });
/* concated harmony reexport utils */__webpack_require__.d(__webpack_exports__, "utils", function() { return utils_namespaceObject; });
/* concated harmony reexport redux */__webpack_require__.d(__webpack_exports__, "redux", function() { return redux_namespaceObject; });









/***/ })
/******/ ])));