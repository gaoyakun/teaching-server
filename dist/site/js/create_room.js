(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('socket.io-client'), require('jquery')) :
	typeof define === 'function' && define.amd ? define(['exports', 'socket.io-client', 'jquery'], factory) :
	(factory((global.create_room = {}),global.io,global.jQuery));
}(this, (function (exports,socket,jquery) { 'use strict';

	socket = socket && socket.hasOwnProperty('default') ? socket['default'] : socket;
	jquery = jquery && jquery.hasOwnProperty('default') ? jquery['default'] : jquery;

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var toolbox = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var WBEditorToolbox = /** @class */ (function () {
	    function WBEditorToolbox(container, whiteboard, direction) {
	        this._container = container;
	        this._wb = whiteboard;
	        this._tools = [];
	        this._curTool = null;
	        this._direction = direction;
	        this._strokeColor = '#000000';
	        this._fillColor = '#ffffff';
	        this.create(this._container);
	    }
	    WBEditorToolbox.prototype.create = function (container) {
	        this._container = container;
	        container.style.display = 'flex';
	        container.style.flexDirection = this._direction;
	        container.style.flexWrap = 'wrap';
	        container.style.justifyContent = 'flex-start';
	        container.style.alignItems = 'flex-start';
	        container.style.alignContent = 'flex-start';
	    };
	    WBEditorToolbox.prototype.loadTools = function (tools) {
	        var _this = this;
	        tools.forEach(function (tool) {
	            _this._tools.push(tool);
	            var buttonSize = parseInt(tool.fontSize || '60', 10) + 10;
	            var toolButton = document.createElement('div');
	            toolButton.classList.add('flex-h', 'flex-align-x-center', 'flex-align-y-center');
	            tool.elementId = "toolbutton-" + WBEditorToolbox.uniqueId++;
	            toolButton.classList.add('toolbutton');
	            toolButton.id = tool.elementId;
	            toolButton.style.width = buttonSize + "px";
	            toolButton.style.height = buttonSize + "px";
	            toolButton.setAttribute('toolIndex', String(_this._tools.length - 1));
	            var toolIcon = document.createElement('i');
	            toolIcon.style.fontSize = tool.fontSize || '60px';
	            toolIcon.style.color = '#fff';
	            toolIcon.style.lineHeight = tool.fontSize || '60px';
	            tool.iconClass && tool.iconClass.split(' ').forEach(function (cls) {
	                toolIcon.classList.add(cls);
	            });
	            toolButton.appendChild(toolIcon);
	            _this._container.appendChild(toolButton);
	            toolButton.addEventListener('click', function () {
	                var toolIndex = Number(toolButton.getAttribute('toolIndex'));
	                var tool = _this._tools[toolIndex];
	                if (tool !== _this._curTool) {
	                    if (_this._curTool) {
	                        var curToolButton = document.querySelector("#" + _this._curTool.elementId);
	                        curToolButton && curToolButton.classList.remove('active');
	                        _this._curTool = null;
	                    }
	                }
	                if (tool) {
	                    var button = document.querySelector("#" + tool.elementId);
	                    button && button.classList.add('active');
	                    _this._curTool = tool;
	                }
	            });
	        });
	    };
	    WBEditorToolbox.prototype.unloadTools = function () {
	        while (this._container.hasChildNodes()) {
	            this._container.removeChild(this._container.firstChild);
	        }
	        this._tools = [];
	    };
	    WBEditorToolbox.uniqueId = 1;
	    return WBEditorToolbox;
	}());
	exports.WBEditorToolbox = WBEditorToolbox;

	});

	unwrapExports(toolbox);
	var toolbox_1 = toolbox.WBEditorToolbox;

	var point = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function GetTopLeft(rect) {
	    return { x: rect.x, y: rect.y };
	}
	exports.GetTopLeft = GetTopLeft;
	function GetTopRight(rect) {
	    return { x: rect.x + rect.w, y: rect.y };
	}
	exports.GetTopRight = GetTopRight;
	function GetBottomLeft(rect) {
	    return { x: rect.x, y: rect.y + rect.h };
	}
	exports.GetBottomLeft = GetBottomLeft;
	function GetBottomRight(rect) {
	    return { x: rect.x + rect.w, y: rect.y + rect.h };
	}
	exports.GetBottomRight = GetBottomRight;
	function Normalize(v) {
	    var len = VectorLength(v);
	    if (len > 0.0001) {
	        v.x /= len;
	        v.y /= len;
	    }
	}
	exports.Normalize = Normalize;
	function VectorLengthSq(v) {
	    return v.x * v.x + v.y * v.y;
	}
	exports.VectorLengthSq = VectorLengthSq;
	function VectorLength(v) {
	    return Math.sqrt(VectorLengthSq(v));
	}
	exports.VectorLength = VectorLength;
	function DistanceSq(p1, p2) {
	    return VectorLengthSq(GetVector(p1, p2));
	}
	exports.DistanceSq = DistanceSq;
	function Distance(p1, p2) {
	    return VectorLength(GetVector(p1, p2));
	}
	exports.Distance = Distance;
	function DotProduct(v1, v2) {
	    return v1.x * v2.x + v1.y * v2.y;
	}
	exports.DotProduct = DotProduct;
	function CrossProduct(v1, v2) {
	    return v1.x * v2.y - v1.y * v2.x;
	}
	exports.CrossProduct = CrossProduct;
	function GetVector(start, end) {
	    return { x: end.x - start.x, y: end.y - start.y };
	}
	exports.GetVector = GetVector;
	function ClampPoint(pt, ptMin, ptMax) {
	    return { x: Math.max(ptMin.x, Math.min(ptMax.x, pt.x)), y: Math.max(ptMin.y, Math.min(ptMax.y, pt.y)) };
	}
	exports.ClampPoint = ClampPoint;

	});

	unwrapExports(point);
	var point_1 = point.GetTopLeft;
	var point_2 = point.GetTopRight;
	var point_3 = point.GetBottomLeft;
	var point_4 = point.GetBottomRight;
	var point_5 = point.Normalize;
	var point_6 = point.VectorLengthSq;
	var point_7 = point.VectorLength;
	var point_8 = point.DistanceSq;
	var point_9 = point.Distance;
	var point_10 = point.DotProduct;
	var point_11 = point.CrossProduct;
	var point_12 = point.GetVector;
	var point_13 = point.ClampPoint;

	var boundingshape = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var BoundingShape = /** @class */ (function () {
	    function BoundingShape(type) {
	        this.type = type;
	    }
	    return BoundingShape;
	}());
	exports.BoundingShape = BoundingShape;

	});

	unwrapExports(boundingshape);
	var boundingshape_1 = boundingshape.BoundingShape;

	var boundinghull = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });


	var BoundingHull = /** @class */ (function (_super) {
	    __extends(BoundingHull, _super);
	    function BoundingHull(points) {
	        var _this = _super.call(this, BoundingHull.type) || this;
	        _this._points = points || [];
	        _this._boundingbox = null;
	        _this._dirtyFlag = _this._points.length > 0;
	        return _this;
	    }
	    BoundingHull.prototype.addPoint = function (point$$1) {
	        this._points.push(point$$1);
	        this._dirtyFlag = true;
	    };
	    Object.defineProperty(BoundingHull.prototype, "length", {
	        get: function () {
	            return this._points.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BoundingHull.prototype, "boundingbox", {
	        get: function () {
	            this._checkDirty();
	            return this._boundingbox;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BoundingHull.prototype, "points", {
	        get: function () {
	            this._checkDirty();
	            return this._points;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BoundingHull.prototype.getPoint = function (index) {
	        this._checkDirty();
	        return this._points[index];
	    };
	    BoundingHull.prototype.removePoint = function (index) {
	        this._points.splice(index, 1);
	        if (this._points.length === 0) {
	            this._boundingbox = null;
	            this._dirtyFlag = false;
	        }
	        else {
	            this._dirtyFlag = true;
	        }
	    };
	    BoundingHull.prototype.clear = function () {
	        this._points.length = 0;
	        this._boundingbox = null;
	        this._dirtyFlag = false;
	    };
	    BoundingHull.prototype.getBoundingbox = function () {
	        return this.boundingbox;
	    };
	    BoundingHull.prototype.getTransformedShape = function (transform) {
	        if (!transform) {
	            return new BoundingHull(this._points);
	        }
	        else {
	            return new BoundingHull(this._points.map(function (point$$1) {
	                return transform.transformPoint(point$$1);
	            }));
	        }
	    };
	    BoundingHull.prototype._checkDirty = function () {
	        if (this._dirtyFlag) {
	            this._dirtyFlag = false;
	            this._adjustPoints();
	            this._computeBoundingbox();
	        }
	    };
	    BoundingHull.prototype._adjustPoints = function () {
	        var num = this._points.length;
	        if (num < 3) {
	            return;
	        }
	        var adjusted = [this._points[0], this._points[1]];
	        for (var i = 2; i < num; i++) {
	            var last = adjusted.length - 1;
	            while (last > 0) {
	                var v1 = point.GetVector(adjusted[0], adjusted[last]);
	                var v2 = point.GetVector(adjusted[0], this._points[i]);
	                var t = point.CrossProduct(v1, v2);
	                if (t < 0) {
	                    adjusted.splice(last + 1, 0, this._points[i]);
	                    break;
	                }
	                else if (t === 0 && point.VectorLengthSq(v2) > point.VectorLengthSq(v1)) {
	                    adjusted.splice(last + 1, 0, this._points[i]);
	                    break;
	                }
	                last--;
	            }
	            if (last === 0) {
	                adjusted.splice(1, 0, this._points[i]);
	            }
	        }
	        this._points = adjusted;
	    };
	    BoundingHull.prototype._computeBoundingbox = function () {
	        if (this._points.length > 0) {
	            var minx_1 = this._points[0].x;
	            var miny_1 = this._points[0].y;
	            var maxx_1 = minx_1;
	            var maxy_1 = miny_1;
	            this._points.forEach(function (point$$1) {
	                var x = point$$1.x;
	                var y = point$$1.y;
	                if (x < minx_1) {
	                    minx_1 = x;
	                }
	                else if (x > maxx_1) {
	                    maxx_1 = x;
	                }
	                if (y < miny_1) {
	                    miny_1 = y;
	                }
	                else if (y > maxy_1) {
	                    maxy_1 = y;
	                }
	            });
	            this._boundingbox = { x: minx_1, y: miny_1, w: maxx_1 - minx_1 + 1, h: maxy_1 - miny_1 + 1 };
	        }
	        else {
	            this._boundingbox = null;
	        }
	    };
	    BoundingHull.type = 'Hull';
	    return BoundingHull;
	}(boundingshape.BoundingShape));
	exports.BoundingHull = BoundingHull;

	});

	unwrapExports(boundinghull);
	var boundinghull_1 = boundinghull.BoundingHull;

	var boundingbox = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });


	var BoundingBox = /** @class */ (function (_super) {
	    __extends(BoundingBox, _super);
	    function BoundingBox(rect) {
	        var _this = _super.call(this, BoundingBox.type) || this;
	        _this.rect = rect || null;
	        return _this;
	    }
	    BoundingBox.prototype.getBoundingbox = function () {
	        return this.rect;
	    };
	    BoundingBox.prototype.getTransformedShape = function (transform) {
	        if (this.rect === null) {
	            return null;
	        }
	        else if (!transform) {
	            return new BoundingBox(this.rect);
	        }
	        else {
	            var pointLeftTop = { x: this.rect.x, y: this.rect.y };
	            var pointLeftBottom = { x: this.rect.x, y: this.rect.y + this.rect.h - 1 };
	            var pointRightBottom = { x: this.rect.x + this.rect.w - 1, y: this.rect.y + this.rect.h - 1 };
	            var pointRightTop = { x: this.rect.x + this.rect.w - 1, y: this.rect.y };
	            return new boundinghull.BoundingHull([
	                transform.transformPoint(pointLeftTop),
	                transform.transformPoint(pointLeftBottom),
	                transform.transformPoint(pointRightBottom),
	                transform.transformPoint(pointRightTop)
	            ]);
	        }
	    };
	    BoundingBox.type = 'Box';
	    return BoundingBox;
	}(boundingshape.BoundingShape));
	exports.BoundingBox = BoundingBox;

	});

	unwrapExports(boundingbox);
	var boundingbox_1 = boundingbox.BoundingBox;

	var boundingsegment = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });

	var BoundingSegment = /** @class */ (function (_super) {
	    __extends(BoundingSegment, _super);
	    function BoundingSegment(seg) {
	        var _this = _super.call(this, BoundingSegment.type) || this;
	        _this._segment = seg || null;
	        _this._dirty = !!seg;
	        _this._boundingbox = null;
	        return _this;
	    }
	    Object.defineProperty(BoundingSegment.prototype, "start", {
	        get: function () {
	            return this._segment ? this._segment.start : null;
	        },
	        set: function (pt) {
	            if (pt) {
	                if (!this._segment) {
	                    this._segment = { start: pt, end: pt };
	                }
	                else {
	                    this._segment.start = pt;
	                }
	                this._dirty = true;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BoundingSegment.prototype, "end", {
	        get: function () {
	            return this._segment ? this._segment.end : null;
	        },
	        set: function (pt) {
	            if (pt) {
	                if (!this._segment) {
	                    this._segment = { start: pt, end: pt };
	                }
	                else {
	                    this._segment.end = pt;
	                }
	                this._dirty = true;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BoundingSegment.prototype, "segment", {
	        get: function () {
	            return this._segment ? { start: this.start, end: this.end } : null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BoundingSegment.prototype, "boundingbox", {
	        get: function () {
	            this._checkDirty();
	            return this._boundingbox;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BoundingSegment.prototype.getBoundingbox = function () {
	        return this.boundingbox;
	    };
	    BoundingSegment.prototype.getTransformedShape = function (transform) {
	        if (!transform || !this._segment) {
	            return this._segment ? new BoundingSegment(this._segment) : null;
	        }
	        else {
	            return new BoundingSegment({
	                start: transform.transformPoint(this._segment.start),
	                end: transform.transformPoint(this._segment.end)
	            });
	        }
	    };
	    BoundingSegment.prototype._checkDirty = function () {
	        if (this._segment && this._dirty) {
	            this._dirty = false;
	            var minx = this._segment.start.x;
	            var miny = this._segment.start.y;
	            var maxx = this._segment.end.x;
	            var maxy = this._segment.end.y;
	            if (minx > maxx) {
	                var tmp = minx;
	                minx = maxx;
	                maxx = tmp;
	            }
	            if (miny > maxy) {
	                var tmp = miny;
	                miny = maxy;
	                maxy = tmp;
	            }
	            this._boundingbox = { x: minx, y: miny, w: maxx - minx + 1, h: maxy - miny + 1 };
	        }
	    };
	    BoundingSegment.type = 'Segment';
	    return BoundingSegment;
	}(boundingshape.BoundingShape));
	exports.BoundingSegment = BoundingSegment;

	});

	unwrapExports(boundingsegment);
	var boundingsegment_1 = boundingsegment.BoundingSegment;

	var boundingsphere = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });


	var BoundingSphere = /** @class */ (function (_super) {
	    __extends(BoundingSphere, _super);
	    function BoundingSphere(sphere) {
	        var _this = _super.call(this, BoundingSphere.type) || this;
	        _this._sphere = sphere || null;
	        _this._dirty = !!_this._sphere;
	        _this._boundingbox = null;
	        return _this;
	    }
	    Object.defineProperty(BoundingSphere.prototype, "center", {
	        get: function () {
	            return this._sphere ? this._sphere.center : null;
	        },
	        set: function (pt) {
	            if (pt) {
	                if (!this._sphere) {
	                    this._sphere = { center: pt, radius: 1 };
	                }
	                else {
	                    this._sphere.center = pt;
	                }
	                this._dirty = true;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BoundingSphere.prototype, "radius", {
	        get: function () {
	            return this._sphere ? this._sphere.radius : null;
	        },
	        set: function (radius) {
	            if (radius !== null) {
	                if (!this._sphere) {
	                    this._sphere = { center: { x: 0, y: 0 }, radius: radius };
	                }
	                else {
	                    this._sphere.radius = radius;
	                }
	                this._dirty = true;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BoundingSphere.prototype, "sphere", {
	        get: function () {
	            return this._sphere ? { center: this._sphere.center, radius: this._sphere.radius } : null;
	        },
	        set: function (sphere) {
	            this._sphere = sphere;
	            this._dirty = !!sphere;
	            this._boundingbox = null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BoundingSphere.prototype, "boundingbox", {
	        get: function () {
	            this._checkDirty();
	            return this._boundingbox;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BoundingSphere.prototype.getBoundingbox = function () {
	        return this.boundingbox;
	    };
	    BoundingSphere.prototype.getTransformedShape = function (transform) {
	        if (!transform || !this._sphere) {
	            return this._sphere ? new BoundingSphere(this._sphere) : null;
	        }
	        else {
	            var A = Math.PI * 0.125;
	            var D = A * 2;
	            var R = this._sphere.radius / Math.cos(A);
	            var shape_1 = new boundinghull.BoundingHull();
	            for (var angle = A; angle < Math.PI * 2; angle += D) {
	                var pt = transform.transformPoint({ x: R * Math.cos(angle), y: R * Math.sin(angle) });
	                pt.x = Math.round(pt.x);
	                pt.y = Math.round(pt.y);
	                shape_1.addPoint(pt);
	            }
	            return shape_1;
	        }
	    };
	    BoundingSphere.prototype._checkDirty = function () {
	        if (this._sphere && this._dirty) {
	            this._dirty = false;
	            this._boundingbox = {
	                x: this._sphere.center.x - this._sphere.radius + 1,
	                y: this._sphere.center.y - this._sphere.radius + 1,
	                w: 2 * this._sphere.radius - 1,
	                h: 2 * this._sphere.radius - 1
	            };
	        }
	    };
	    BoundingSphere.type = 'sphere';
	    return BoundingSphere;
	}(boundingshape.BoundingShape));
	exports.BoundingSphere = BoundingSphere;

	});

	unwrapExports(boundingsphere);
	var boundingsphere_1 = boundingsphere.BoundingSphere;

	var intersect = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	function IntersectionTestShapeSegment(a, b) {
	    if (!a || !b) {
	        return null;
	    }
	    var box = a.getBoundingbox();
	    if (box) {
	        switch (a.type) {
	            case boundingbox.BoundingBox.type: {
	                return IntersectionTestBoxSegment(a.rect, b);
	            }
	            case boundinghull.BoundingHull.type: {
	                return IntersectionTestHullSegment(a.points, b);
	            }
	            case boundingsegment.BoundingSegment.type: {
	                var pt = IntersectionTestSegmentSegment(a.segment, b);
	                return pt ? [pt] : [];
	            }
	            case boundingsphere.BoundingSphere.type: {
	                return IntersectionTestSphereSegment(a.sphere, b);
	            }
	        }
	    }
	    return null;
	}
	exports.IntersectionTestShapeSegment = IntersectionTestShapeSegment;
	function IntersectionTestShapeBox(a, b) {
	    var box = a.getBoundingbox();
	    if (!box) {
	        return false;
	    }
	    switch (a.type) {
	        case boundingbox.BoundingBox.type: {
	            return IntersectionTestBoxBox(a.rect, b);
	        }
	        case boundinghull.BoundingHull.type: {
	            return IntersectionTestBoxHull(b, a.points);
	        }
	        case boundingsegment.BoundingSegment.type: {
	            return IntersectionTestBoxSegment(b, a.segment) != null;
	        }
	        case boundingsphere.BoundingSphere.type: {
	            return IntersectionTestBoxSphere(b, a.sphere);
	        }
	        default: {
	            return false;
	        }
	    }
	}
	exports.IntersectionTestShapeBox = IntersectionTestShapeBox;
	function IntersectionTestShapeHull(a, b) {
	    var box = a.getBoundingbox();
	    if (!box) {
	        return false;
	    }
	    switch (a.type) {
	        case boundingbox.BoundingBox.type: {
	            return IntersectionTestBoxHull(a.rect, b);
	        }
	        case boundinghull.BoundingHull.type: {
	            return IntersectionTestHullHull(a.points, b);
	        }
	        case boundingsegment.BoundingSegment.type: {
	            return IntersectionTestHullSegment(b, a.segment) != null;
	        }
	        case boundingsphere.BoundingSphere.type: {
	            return IntersectionTestSphereHull(a.sphere, b);
	        }
	        default: {
	            return false;
	        }
	    }
	}
	exports.IntersectionTestShapeHull = IntersectionTestShapeHull;
	function IntersectionTestShapePoint(a, b) {
	    var box = a.getBoundingbox();
	    if (!IntersectionTestBoxPoint(box, b)) {
	        return false;
	    }
	    switch (a.type) {
	        case boundingbox.BoundingBox.type: {
	            return true;
	        }
	        case boundinghull.BoundingHull.type: {
	            return IntersectionTestHullPoint(a.points, b);
	        }
	        case boundingsegment.BoundingSegment.type: {
	            return IntersectionTestSegmentPoint(a.segment, b);
	        }
	        case boundingsphere.BoundingSphere.type: {
	            return IntersectionTestSpherePoint(a.sphere, b);
	        }
	        default: {
	            return false;
	        }
	    }
	}
	exports.IntersectionTestShapePoint = IntersectionTestShapePoint;
	function IntersectionTestShapeShape(a, b) {
	    var boxA = a.getBoundingbox();
	    var boxB = b.getBoundingbox();
	    if (!IntersectionTestBoxBox(boxA, boxB)) {
	        return false;
	    }
	    switch (a.type) {
	        case boundingbox.BoundingBox.type: {
	            switch (b.type) {
	                case boundingbox.BoundingBox.type: {
	                    return true;
	                }
	                case boundinghull.BoundingHull.type: {
	                    return IntersectionTestBoxHull(a.rect, b.points);
	                }
	                case boundingsegment.BoundingSegment.type: {
	                    return IntersectionTestBoxSegment(a.rect, b.segment) != null;
	                }
	                case boundingsphere.BoundingSphere.type: {
	                    return IntersectionTestBoxSphere(a.rect, b.sphere);
	                }
	                default: {
	                    return false;
	                }
	            }
	        }
	        case boundinghull.BoundingHull.type: {
	            switch (b.type) {
	                case boundingbox.BoundingBox.type: {
	                    return IntersectionTestBoxHull(b.rect, a.points);
	                }
	                case boundinghull.BoundingHull.type: {
	                    return IntersectionTestHullHull(a.points, b.points);
	                }
	                case boundingsegment.BoundingSegment.type: {
	                    return IntersectionTestHullSegment(a.points, b.segment) != null;
	                }
	                case boundingsphere.BoundingSphere.type: {
	                    return IntersectionTestSphereHull(b.sphere, a.points);
	                }
	                default: {
	                    return false;
	                }
	            }
	        }
	        case boundingsegment.BoundingSegment.type: {
	            switch (b.type) {
	                case boundingbox.BoundingBox.type: {
	                    return IntersectionTestBoxSegment(b.rect, a.segment) != null;
	                }
	                case boundinghull.BoundingHull.type: {
	                    return IntersectionTestHullSegment(b.points, a.segment) != null;
	                }
	                case boundingsegment.BoundingSegment.type: {
	                    return IntersectionTestSegmentSegment(b.segment, a.segment) != null;
	                }
	                case boundingsphere.BoundingSphere.type: {
	                    return IntersectionTestSphereSegment(b.sphere, a.segment) != null;
	                }
	                default: {
	                    return false;
	                }
	            }
	        }
	        case boundingsphere.BoundingSphere.type: {
	            switch (b.type) {
	                case boundingbox.BoundingBox.type: {
	                    return IntersectionTestBoxSphere(b.rect, a.sphere);
	                }
	                case boundinghull.BoundingHull.type: {
	                    return IntersectionTestSphereHull(a.sphere, b.points);
	                }
	                case boundingsegment.BoundingSegment.type: {
	                    return IntersectionTestSphereSegment(a.sphere, b.segment) != null;
	                }
	                case boundingsphere.BoundingSphere.type: {
	                    return IntersectionTestSphereSphere(a.sphere, b.sphere);
	                }
	                default: {
	                    return false;
	                }
	            }
	        }
	        default: {
	            return false;
	        }
	    }
	}
	exports.IntersectionTestShapeShape = IntersectionTestShapeShape;
	function IntersectionTestBoxBox(a, b) {
	    return !!a && !!b && a.x <= b.x + b.w && a.x + a.w >= b.x && a.y <= b.y + b.h && a.y + a.h >= b.y;
	}
	exports.IntersectionTestBoxBox = IntersectionTestBoxBox;
	function IntersectionTestBoxPoint(a, b) {
	    return !!a && !!b && b.x >= a.x && b.x <= a.x + a.w && b.y >= a.y && b.y <= a.y + a.h;
	}
	exports.IntersectionTestBoxPoint = IntersectionTestBoxPoint;
	function IntersectionTestBoxHull(a, b) {
	    return !!a && !!b && IntersectionTestHullHull([point.GetTopLeft(a), point.GetBottomLeft(a), point.GetBottomRight(a), point.GetTopRight(a)], b);
	}
	exports.IntersectionTestBoxHull = IntersectionTestBoxHull;
	function IntersectionTestBoxSegment(a, b) {
	    return a && b ? IntersectionTestHullSegment([point.GetTopLeft(a), point.GetBottomLeft(a), point.GetBottomRight(a), point.GetTopRight(a)], b) : null;
	}
	exports.IntersectionTestBoxSegment = IntersectionTestBoxSegment;
	function IntersectionTestBoxSphere(a, b) {
	    if (!a || !b) {
	        return false;
	    }
	    var pt = point.ClampPoint(b.center, { x: a.x, y: a.y }, { x: a.x + a.w - 1, y: a.y + a.h - 1 });
	    var v = point.GetVector(pt, b.center);
	    return point.DotProduct(v, v) < b.radius * b.radius;
	}
	exports.IntersectionTestBoxSphere = IntersectionTestBoxSphere;
	function IntersectionTestSphereHull(a, b) {
	    if (!a || !b) {
	        return false;
	    }
	    var r2 = a.radius * a.radius;
	    for (var i = 0; i < b.length; i++) {
	        var dx = a.center.x - b[i].x;
	        var dy = a.center.y - b[i].y;
	        if (dx * dx + dy * dy < r2) {
	            return true;
	        }
	    }
	    for (var i = 0; i < b.length; i++) {
	        var t = IntersectionTestSphereSegment(a, { start: b[i], end: b[(i + 1) % b.length] });
	        if (t !== null && t.length > 0) {
	            return true;
	        }
	    }
	    return IntersectionTestHullPoint(b, a.center);
	}
	exports.IntersectionTestSphereHull = IntersectionTestSphereHull;
	function IntersectionTestHullPoint(a, b) {
	    for (var i = 0; i < a.length; i++) {
	        var v1 = point.GetVector(b, a[i]);
	        var v2 = point.GetVector(b, a[(i + 1) % a.length]);
	        if (point.CrossProduct(v1, v2) > 0) {
	            return false;
	        }
	    }
	    return true;
	}
	exports.IntersectionTestHullPoint = IntersectionTestHullPoint;
	function IntersectionTestSphereSphere(a, b) {
	    if (!a || !b) {
	        return false;
	    }
	    var dx = a.center.x - b.center.x;
	    var dy = a.center.y - b.center.y;
	    var r = a.radius + b.radius;
	    return dx * dx + dy * dy < r * r;
	}
	exports.IntersectionTestSphereSphere = IntersectionTestSphereSphere;
	function IntersectionTestSphereSegment(a, b) {
	    if (!a || !b) {
	        return null;
	    }
	    var d = point.GetVector(b.start, b.end);
	    var f = point.GetVector(a.center, b.start);
	    var A = point.DotProduct(d, d);
	    var B = 2 * point.DotProduct(f, d);
	    var C = point.DotProduct(f, f) - a.radius * a.radius;
	    var discriminant = B * B - 4 * A * C;
	    if (discriminant < 0) {
	        return null;
	    }
	    discriminant = Math.sqrt(discriminant);
	    var t1 = (-B - discriminant) / (2 * A);
	    var t2 = (-B + discriminant) / (2 * A);
	    if (t1 > t2) {
	        var tmp = t1;
	        t1 = t2;
	        t2 = tmp;
	    }
	    var intersectionPoints = [];
	    if (t1 >= 0 && t1 <= 1) {
	        intersectionPoints.push({ x: b.start.x + t1 * d.x, y: b.start.y + t1 * d.y });
	    }
	    if (t2 >= 0 && t2 <= 1) {
	        intersectionPoints.push({ x: b.start.x + t2 * d.x, y: b.start.y + t2 * d.y });
	    }
	    return intersectionPoints;
	}
	exports.IntersectionTestSphereSegment = IntersectionTestSphereSegment;
	function IntersectionTestHullSegment(a, b) {
	    if (!a || !b) {
	        return null;
	    }
	    if (IntersectionTestHullPoint(a, b.start) && IntersectionTestHullPoint(a, b.end)) {
	        return [];
	    }
	    var result = [];
	    for (var i = 0; i < a.length; i++) {
	        var edge = {
	            start: a[i],
	            end: a[(i + 1) % a.length]
	        };
	        var intersectedPoint = IntersectionTestSegmentSegment(edge, b);
	        if (intersectedPoint) {
	            result.push(intersectedPoint);
	        }
	    }
	    if (result.length > 1) {
	        result.sort(function (p, q) {
	            return point.DistanceSq(p, b.start) - point.DistanceSq(q, b.start);
	        });
	    }
	    return result.length > 0 ? result : null;
	}
	exports.IntersectionTestHullSegment = IntersectionTestHullSegment;
	function IntersectionTestHullHull(a, b) {
	    var polygons = [a, b];
	    for (var n = 0; n < 2; n++) {
	        var polygon = polygons[n];
	        var _loop_1 = function (edge) {
	            var edgeX = polygon[(edge + 1) % polygon.length].x - polygon[edge].x;
	            var edgeY = polygon[(edge + 1) % polygon.length].y - polygon[edge].y;
	            var mag = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
	            if (mag < 1) {
	                return "continue";
	            }
	            var nx = -edgeY / mag;
	            var ny = edgeX / mag;
	            var minmax = [{ min: 9999999, max: -9999999 }, { min: 9999999, max: -9999999 }];
	            var _loop_2 = function (i) {
	                polygons[i].forEach(function (point$$1) {
	                    var proj = point$$1.x * nx + point$$1.y * ny;
	                    if (proj < minmax[i].min) {
	                        minmax[i].min = proj;
	                    }
	                    if (proj > minmax[i].max) {
	                        minmax[i].max = proj;
	                    }
	                });
	            };
	            for (var i = 0; i < 2; i++) {
	                _loop_2(i);
	            }
	            if (minmax[0].min > minmax[1].max || minmax[0].max < minmax[1].min) {
	                return { value: false };
	            }
	        };
	        for (var edge = 0; edge < polygon.length; edge++) {
	            var state_1 = _loop_1(edge);
	            if (typeof state_1 === "object")
	                return state_1.value;
	        }
	    }
	    return true;
	}
	exports.IntersectionTestHullHull = IntersectionTestHullHull;
	function IntersectionTestSpherePoint(a, b) {
	    if (!a || !b) {
	        return false;
	    }
	    var dx = a.center.x - b.x;
	    var dy = a.center.y - b.y;
	    return dx * dx + dy * dy < a.radius * a.radius;
	}
	exports.IntersectionTestSpherePoint = IntersectionTestSpherePoint;
	function IntersectionTestSegmentPoint(s, p) {
	    if (!s || !p) {
	        return false;
	    }
	    var minx = s.start.x;
	    var miny = s.start.y;
	    var maxx = s.end.x;
	    var maxy = s.end.y;
	    if (minx > maxx) {
	        var tmp = minx;
	        minx = maxx;
	        maxx = tmp;
	    }
	    if (miny > maxy) {
	        var tmp = miny;
	        miny = maxy;
	        maxy = tmp;
	    }
	    if (p.x < minx || p.x > maxx || p.y < miny || p.y > maxy) {
	        return false;
	    }
	    if (maxx !== minx) {
	        var deltay = Math.round(miny + ((maxy - miny) * (p.x - minx)) / (maxx - minx)) - p.y;
	        return deltay >= -1 && deltay <= 1;
	    }
	    else if (maxy !== miny) {
	        var deltax = Math.round(minx + ((maxx - minx) * (p.y - miny)) / (maxy - miny)) - p.x;
	        return deltax >= -1 && deltax <= 1;
	    }
	    else {
	        return p.x === minx && p.y === miny;
	    }
	}
	exports.IntersectionTestSegmentPoint = IntersectionTestSegmentPoint;
	function IntersectionTestSegmentSegment(s1, s2) {
	    function isSameSign(a, b) {
	        return (a >= 0 && b >= 0) || (a <= 0 && b <= 0);
	    }
	    if (!s1 || !s2) {
	        return null;
	    }
	    var x1 = s1.start.x;
	    var y1 = s1.start.y;
	    var x2 = s1.end.x;
	    var y2 = s1.end.y;
	    var x3 = s2.start.x;
	    var y3 = s2.start.y;
	    var x4 = s2.end.x;
	    var y4 = s2.end.y;
	    var Ax = x2 - x1;
	    var Bx = x3 - x4;
	    var x1lo;
	    var x1hi;
	    var y1lo;
	    var y1hi;
	    var num;
	    var offset;
	    if (Ax < 0) {
	        x1lo = x2;
	        x1hi = x1;
	    }
	    else {
	        x1hi = x2;
	        x1lo = x1;
	    }
	    if (Bx > 0) {
	        if (x1hi < x4 || x3 < x1lo) {
	            return null;
	        }
	    }
	    else {
	        if (x1hi < x3 || x4 < x1lo) {
	            return null;
	        }
	    }
	    var Ay = y2 - y1;
	    var By = y3 - y4;
	    if (Ay < 0) {
	        y1lo = y2;
	        y1hi = y1;
	    }
	    else {
	        y1hi = y2;
	        y1lo = y1;
	    }
	    if (By > 0) {
	        if (y1hi < y4 || y3 < y1lo) {
	            return null;
	        }
	    }
	    else {
	        if (y1hi < y3 || y4 < y1lo) {
	            return null;
	        }
	    }
	    var Cx = x1 - x3;
	    var Cy = y1 - y3;
	    var f = Ay * Bx - Ax * By;
	    if (f === 0) {
	        return null;
	    }
	    var d = By * Cx - Bx * Cy;
	    if (f > 0) {
	        if (d < 0 || d > f) {
	            return null;
	        }
	    }
	    else {
	        if (d > 0 || d < f) {
	            return null;
	        }
	    }
	    var e = Ax * Cy - Ay * Cx;
	    if (f > 0) {
	        if (e < 0 || e > f) {
	            return null;
	        }
	    }
	    else {
	        if (e > 0 || e < f) {
	            return null;
	        }
	    }
	    num = d * Ax;
	    offset = isSameSign(num, f) ? f / 2 : -f / 2;
	    var x = x1 + (((num + offset) / f) >> 0);
	    num = d * Ay;
	    offset = isSameSign(num, f) ? f / 2 : -f / 2;
	    var y = y1 + (((num + offset) / f) >> 0);
	    return { x: x, y: y };
	}
	exports.IntersectionTestSegmentSegment = IntersectionTestSegmentSegment;

	});

	unwrapExports(intersect);
	var intersect_1 = intersect.IntersectionTestShapeSegment;
	var intersect_2 = intersect.IntersectionTestShapeBox;
	var intersect_3 = intersect.IntersectionTestShapeHull;
	var intersect_4 = intersect.IntersectionTestShapePoint;
	var intersect_5 = intersect.IntersectionTestShapeShape;
	var intersect_6 = intersect.IntersectionTestBoxBox;
	var intersect_7 = intersect.IntersectionTestBoxPoint;
	var intersect_8 = intersect.IntersectionTestBoxHull;
	var intersect_9 = intersect.IntersectionTestBoxSegment;
	var intersect_10 = intersect.IntersectionTestBoxSphere;
	var intersect_11 = intersect.IntersectionTestSphereHull;
	var intersect_12 = intersect.IntersectionTestHullPoint;
	var intersect_13 = intersect.IntersectionTestSphereSphere;
	var intersect_14 = intersect.IntersectionTestSphereSegment;
	var intersect_15 = intersect.IntersectionTestHullSegment;
	var intersect_16 = intersect.IntersectionTestHullHull;
	var intersect_17 = intersect.IntersectionTestSpherePoint;
	var intersect_18 = intersect.IntersectionTestSegmentPoint;
	var intersect_19 = intersect.IntersectionTestSegmentSegment;

	var curve = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var SplineType;
	(function (SplineType) {
	    SplineType[SplineType["STEP"] = 1] = "STEP";
	    SplineType[SplineType["LINEAR"] = 2] = "LINEAR";
	    SplineType[SplineType["POLY"] = 3] = "POLY";
	})(SplineType = exports.SplineType || (exports.SplineType = {}));
	var CurveEvaluter = /** @class */ (function () {
	    function CurveEvaluter(cp, clamp) {
	        if (clamp === void 0) { clamp = false; }
	        this.cp = cp;
	        this.clamp = clamp;
	    }
	    CurveEvaluter.prototype.eval = function (x) {
	        return 0;
	    };
	    CurveEvaluter.prototype.evalFirst = function () {
	        return this.cp.length > 0 ? this.cp[0].y : 0;
	    };
	    CurveEvaluter.prototype.evalLast = function () {
	        return this.cp.length > 0 ? this.cp[this.cp.length - 1].y : 0;
	    };
	    return CurveEvaluter;
	}());
	exports.CurveEvaluter = CurveEvaluter;
	var StepEvaluter = /** @class */ (function (_super) {
	    __extends(StepEvaluter, _super);
	    function StepEvaluter(cp, clamp) {
	        if (clamp === void 0) { clamp = false; }
	        var _this = _super.call(this, cp, clamp) || this;
	        _this.h = new Array(cp.length - 1);
	        _this.compute();
	        return _this;
	    }
	    StepEvaluter.prototype.compute = function () {
	        for (var i = 0; i < this.cp.length - 1; ++i) {
	            this.h[i] = this.cp[i + 1].x - this.cp[i].x;
	        }
	    };
	    StepEvaluter.prototype.getSegment = function (x) {
	        var i;
	        for (i = 0; i < this.cp.length - 1; i++) {
	            if (x < this.cp[i + 1].x) {
	                break;
	            }
	        }
	        return i;
	    };
	    StepEvaluter.prototype.eval = function (x) {
	        if (this.clamp) {
	            if (x < 0) {
	                return this.cp[0].y;
	            }
	            if (x > this.cp[this.cp.length - 1].x) {
	                return this.cp[this.cp.length - 1].y;
	            }
	        }
	        var seg = this.getSegment(x);
	        return this.cp[seg].y;
	    };
	    return StepEvaluter;
	}(CurveEvaluter));
	exports.StepEvaluter = StepEvaluter;
	var CoLinearEvaluter = /** @class */ (function (_super) {
	    __extends(CoLinearEvaluter, _super);
	    function CoLinearEvaluter(cp, clamp) {
	        if (clamp === void 0) { clamp = false; }
	        var _this = _super.call(this, cp, clamp) || this;
	        _this.h = new Array(cp.length - 1);
	        _this.cp = cp;
	        _this.compute();
	        return _this;
	    }
	    CoLinearEvaluter.prototype.compute = function () {
	        for (var i = 0; i < this.cp.length - 1; ++i) {
	            this.h[i] = this.cp[i + 1].x - this.cp[i].x;
	        }
	    };
	    CoLinearEvaluter.prototype.getSegment = function (x) {
	        var i;
	        for (i = 0; i < this.cp.length - 1; i++) {
	            if (x < this.cp[i + 1].x) {
	                break;
	            }
	        }
	        if (i === this.cp.length - 1) {
	            i--;
	        }
	        return i;
	    };
	    CoLinearEvaluter.prototype.eval = function (x) {
	        if (this.clamp) {
	            if (x < 0) {
	                return this.cp[0].y;
	            }
	            if (x > this.cp[this.cp.length - 1].x) {
	                return this.cp[this.cp.length - 1].y;
	            }
	        }
	        var seg = this.getSegment(x);
	        var t = x - this.cp[seg].x;
	        return this.cp[seg].y + ((this.cp[seg + 1].y - this.cp[seg].y) * t) / this.h[seg];
	    };
	    return CoLinearEvaluter;
	}(CurveEvaluter));
	exports.CoLinearEvaluter = CoLinearEvaluter;
	var PolynomialsEvaluter = /** @class */ (function (_super) {
	    __extends(PolynomialsEvaluter, _super);
	    function PolynomialsEvaluter(cp, clamp) {
	        if (clamp === void 0) { clamp = false; }
	        var _this = _super.call(this, cp, clamp) || this;
	        _this.a = new Array(cp.length);
	        _this.h = new Array(cp.length);
	        _this.cp = cp;
	        _this.compute();
	        return _this;
	    }
	    PolynomialsEvaluter.prototype.solveTridiag = function (sub, diag, sup) {
	        var n = this.cp.length - 2;
	        for (var i = 2; i <= n; i++) {
	            sub[i] /= diag[i - 1];
	            diag[i] -= sub[i] * sup[i - 1];
	            this.a[i] -= this.a[i - 1] * sub[i];
	        }
	        this.a[n] /= diag[n];
	        for (var i = n - 1; i >= 1; --i) {
	            this.a[i] = (this.a[i] - this.a[i + 1] * sup[i]) / diag[i];
	        }
	    };
	    PolynomialsEvaluter.prototype.compute = function () {
	        var nk = this.cp.length;
	        var sub = new Array(nk - 1);
	        var diag = new Array(nk - 1);
	        var sup = new Array(nk - 1);
	        this.a[0] = 0;
	        this.a[nk - 1] = 0;
	        for (var i = 1; i < nk; ++i) {
	            this.h[i] = this.cp[i].x - this.cp[i - 1].x;
	        }
	        for (var i = 1; i < nk - 1; ++i) {
	            diag[i] = (this.h[i] + this.h[i + 1]) / 3;
	            sup[i] = this.h[i + 1] / 6;
	            sub[i] = this.h[i] / 6;
	            this.a[i] = (this.cp[i + 1].y - this.cp[i].y) / this.h[i + 1] - (this.cp[i].y - this.cp[i - 1].y) / this.h[i];
	        }
	        this.solveTridiag(sub, diag, sup);
	    };
	    PolynomialsEvaluter.prototype.getSegment = function (x) {
	        var i;
	        for (i = 0; i < this.cp.length - 1; i++) {
	            if (x < this.cp[i + 1].x) {
	                break;
	            }
	        }
	        if (i === this.cp.length - 1) {
	            i--;
	        }
	        return i;
	    };
	    PolynomialsEvaluter.prototype.eval = function (x) {
	        if (this.clamp) {
	            if (x < 0) {
	                return this.cp[0].y;
	            }
	            if (x > this.cp[this.cp.length - 1].x) {
	                return this.cp[this.cp.length - 1].y;
	            }
	        }
	        var seg = this.getSegment(x) + 1;
	        var t1 = x - this.cp[seg - 1].x;
	        var t2 = this.h[seg] - t1;
	        return ((((-this.a[seg - 1] / 6.0) * (t2 + this.h[seg]) * t1 + this.cp[seg - 1].y) * t2 + ((-this.a[seg] / 6.0) * (t1 + this.h[seg]) * t2 + this.cp[seg].y) * t1) / this.h[seg]);
	    };
	    return PolynomialsEvaluter;
	}(CurveEvaluter));
	exports.PolynomialsEvaluter = PolynomialsEvaluter;
	var Spline = /** @class */ (function () {
	    function Spline(type, cp, clamp) {
	        if (clamp === void 0) { clamp = false; }
	        this._evalutors = [];
	        this._array = false;
	        if (cp.length > 0) {
	            if (typeof cp[0].y === 'number') {
	                this.initNonArray(type, cp, clamp);
	            }
	            else {
	                this.initArray(type, cp, clamp);
	            }
	        }
	    }
	    Spline.prototype.eval = function (x) {
	        if (this._evalutors.length > 0) {
	            if (this._array) {
	                var result_1 = [];
	                this._evalutors.forEach(function (evalutor) {
	                    result_1.push(evalutor.eval(x));
	                });
	                return result_1;
	            }
	            else {
	                return this._evalutors[0].eval(x);
	            }
	        }
	        else {
	            return 0;
	        }
	    };
	    Spline.prototype.evalFirst = function () {
	        if (this._evalutors.length > 0) {
	            if (this._array) {
	                var result_2 = [];
	                this._evalutors.forEach(function (evalutor) {
	                    result_2.push(evalutor.evalFirst());
	                });
	                return result_2;
	            }
	            else {
	                return this._evalutors[0].evalFirst();
	            }
	        }
	        else {
	            return 0;
	        }
	    };
	    Spline.prototype.evalLast = function () {
	        if (this._evalutors.length > 0) {
	            if (this._array) {
	                var result_3 = [];
	                this._evalutors.forEach(function (evalutor) {
	                    result_3.push(evalutor.evalLast());
	                });
	                return result_3;
	            }
	            else {
	                return this._evalutors[0].evalLast();
	            }
	        }
	        else {
	            return 0;
	        }
	    };
	    Spline.prototype.initArray = function (type, cp, clamp) {
	        var numElements = cp[0].y.length;
	        if (numElements > 0) {
	            for (var i = 0; i < numElements; i++) {
	                var t = [];
	                for (var j = 0; j < cp.length; j++) {
	                    var val = cp[j].y.length > i ? cp[j].y[i] : 0;
	                    t.push({ x: cp[j].x, y: val });
	                }
	                switch (type) {
	                    case SplineType.STEP:
	                        this._evalutors.push(new StepEvaluter(t, clamp));
	                        break;
	                    case SplineType.LINEAR:
	                        this._evalutors.push(new CoLinearEvaluter(t, clamp));
	                        break;
	                    case SplineType.POLY:
	                    default:
	                        this._evalutors.push(new PolynomialsEvaluter(t, clamp));
	                        break;
	                }
	            }
	            this._array = true;
	        }
	    };
	    Spline.prototype.initNonArray = function (type, cp, clamp) {
	        switch (type) {
	            case SplineType.STEP:
	                this._evalutors.push(new StepEvaluter(cp, clamp));
	                break;
	            case SplineType.LINEAR:
	                this._evalutors.push(new CoLinearEvaluter(cp, clamp));
	                break;
	            case SplineType.POLY:
	            default:
	                this._evalutors.push(new PolynomialsEvaluter(cp, clamp));
	                break;
	        }
	        this._array = false;
	    };
	    return Spline;
	}());
	exports.Spline = Spline;

	});

	unwrapExports(curve);
	var curve_1 = curve.SplineType;
	var curve_2 = curve.CurveEvaluter;
	var curve_3 = curve.StepEvaluter;
	var curve_4 = curve.CoLinearEvaluter;
	var curve_5 = curve.PolynomialsEvaluter;
	var curve_6 = curve.Spline;

	var keycode = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var KeyCode;
	(function (KeyCode) {
	    KeyCode[KeyCode["kBackspace"] = 8] = "kBackspace";
	    KeyCode[KeyCode["kTab"] = 9] = "kTab";
	    KeyCode[KeyCode["kClear"] = 12] = "kClear";
	    KeyCode[KeyCode["kEnter"] = 13] = "kEnter";
	    KeyCode[KeyCode["kShift"] = 16] = "kShift";
	    KeyCode[KeyCode["kControl"] = 17] = "kControl";
	    KeyCode[KeyCode["kAlt"] = 18] = "kAlt";
	    KeyCode[KeyCode["kPause"] = 19] = "kPause";
	    KeyCode[KeyCode["kCapsLock"] = 20] = "kCapsLock";
	    KeyCode[KeyCode["kEscape"] = 27] = "kEscape";
	    KeyCode[KeyCode["kSpace"] = 32] = "kSpace";
	    KeyCode[KeyCode["kPageUp"] = 33] = "kPageUp";
	    KeyCode[KeyCode["kPageDown"] = 34] = "kPageDown";
	    KeyCode[KeyCode["kEnd"] = 35] = "kEnd";
	    KeyCode[KeyCode["kHome"] = 36] = "kHome";
	    KeyCode[KeyCode["kLeft"] = 37] = "kLeft";
	    KeyCode[KeyCode["kUp"] = 38] = "kUp";
	    KeyCode[KeyCode["kRight"] = 39] = "kRight";
	    KeyCode[KeyCode["kDown"] = 40] = "kDown";
	    KeyCode[KeyCode["kSelect"] = 41] = "kSelect";
	    KeyCode[KeyCode["kPrint"] = 42] = "kPrint";
	    KeyCode[KeyCode["kExecute"] = 43] = "kExecute";
	    KeyCode[KeyCode["kInsert"] = 45] = "kInsert";
	    KeyCode[KeyCode["kDelete"] = 46] = "kDelete";
	    KeyCode[KeyCode["kHelp"] = 47] = "kHelp";
	    KeyCode[KeyCode["k0"] = 48] = "k0";
	    KeyCode[KeyCode["k1"] = 49] = "k1";
	    KeyCode[KeyCode["k2"] = 50] = "k2";
	    KeyCode[KeyCode["k3"] = 51] = "k3";
	    KeyCode[KeyCode["k4"] = 52] = "k4";
	    KeyCode[KeyCode["k5"] = 53] = "k5";
	    KeyCode[KeyCode["k6"] = 54] = "k6";
	    KeyCode[KeyCode["k7"] = 55] = "k7";
	    KeyCode[KeyCode["k8"] = 56] = "k8";
	    KeyCode[KeyCode["k9"] = 57] = "k9";
	    KeyCode[KeyCode["kA"] = 65] = "kA";
	    KeyCode[KeyCode["kB"] = 66] = "kB";
	    KeyCode[KeyCode["kC"] = 67] = "kC";
	    KeyCode[KeyCode["kD"] = 68] = "kD";
	    KeyCode[KeyCode["kE"] = 69] = "kE";
	    KeyCode[KeyCode["kF"] = 70] = "kF";
	    KeyCode[KeyCode["kG"] = 71] = "kG";
	    KeyCode[KeyCode["kH"] = 72] = "kH";
	    KeyCode[KeyCode["kI"] = 73] = "kI";
	    KeyCode[KeyCode["kJ"] = 74] = "kJ";
	    KeyCode[KeyCode["kK"] = 75] = "kK";
	    KeyCode[KeyCode["kL"] = 76] = "kL";
	    KeyCode[KeyCode["kM"] = 77] = "kM";
	    KeyCode[KeyCode["kN"] = 78] = "kN";
	    KeyCode[KeyCode["kO"] = 79] = "kO";
	    KeyCode[KeyCode["kP"] = 80] = "kP";
	    KeyCode[KeyCode["kQ"] = 81] = "kQ";
	    KeyCode[KeyCode["kR"] = 82] = "kR";
	    KeyCode[KeyCode["kS"] = 83] = "kS";
	    KeyCode[KeyCode["kT"] = 84] = "kT";
	    KeyCode[KeyCode["kU"] = 85] = "kU";
	    KeyCode[KeyCode["kV"] = 86] = "kV";
	    KeyCode[KeyCode["kW"] = 87] = "kW";
	    KeyCode[KeyCode["kX"] = 88] = "kX";
	    KeyCode[KeyCode["kY"] = 89] = "kY";
	    KeyCode[KeyCode["kZ"] = 90] = "kZ";
	    KeyCode[KeyCode["kLeftMeta"] = 91] = "kLeftMeta";
	    KeyCode[KeyCode["kRightMeta"] = 92] = "kRightMeta";
	    KeyCode[KeyCode["kMenu"] = 93] = "kMenu";
	    KeyCode[KeyCode["kKP0"] = 96] = "kKP0";
	    KeyCode[KeyCode["kKP1"] = 97] = "kKP1";
	    KeyCode[KeyCode["kKP2"] = 98] = "kKP2";
	    KeyCode[KeyCode["kKP3"] = 99] = "kKP3";
	    KeyCode[KeyCode["kKP4"] = 100] = "kKP4";
	    KeyCode[KeyCode["kKP5"] = 101] = "kKP5";
	    KeyCode[KeyCode["kKP6"] = 102] = "kKP6";
	    KeyCode[KeyCode["kKP7"] = 103] = "kKP7";
	    KeyCode[KeyCode["kKP8"] = 104] = "kKP8";
	    KeyCode[KeyCode["kKP9"] = 105] = "kKP9";
	    KeyCode[KeyCode["kKPMul"] = 106] = "kKPMul";
	    KeyCode[KeyCode["kKPAdd"] = 107] = "kKPAdd";
	    KeyCode[KeyCode["kKPSep"] = 108] = "kKPSep";
	    KeyCode[KeyCode["kKPSub"] = 109] = "kKPSub";
	    KeyCode[KeyCode["kKPDec"] = 110] = "kKPDec";
	    KeyCode[KeyCode["kKPDiv"] = 111] = "kKPDiv";
	    KeyCode[KeyCode["kF1"] = 112] = "kF1";
	    KeyCode[KeyCode["kF2"] = 113] = "kF2";
	    KeyCode[KeyCode["kF3"] = 114] = "kF3";
	    KeyCode[KeyCode["kF4"] = 115] = "kF4";
	    KeyCode[KeyCode["kF5"] = 116] = "kF5";
	    KeyCode[KeyCode["kF6"] = 117] = "kF6";
	    KeyCode[KeyCode["kF7"] = 118] = "kF7";
	    KeyCode[KeyCode["kF8"] = 119] = "kF8";
	    KeyCode[KeyCode["kF9"] = 120] = "kF9";
	    KeyCode[KeyCode["kF10"] = 121] = "kF10";
	    KeyCode[KeyCode["kF11"] = 122] = "kF11";
	    KeyCode[KeyCode["kF12"] = 123] = "kF12";
	    KeyCode[KeyCode["kNumLock"] = 144] = "kNumLock";
	    KeyCode[KeyCode["kScrollLock"] = 145] = "kScrollLock";
	    KeyCode[KeyCode["kAdd"] = 187] = "kAdd";
	    KeyCode[KeyCode["kComma"] = 188] = "kComma";
	    KeyCode[KeyCode["kMinus"] = 189] = "kMinus";
	    KeyCode[KeyCode["kPeriod"] = 190] = "kPeriod";
	    KeyCode[KeyCode["kApostrophe"] = 192] = "kApostrophe";
	    KeyCode[KeyCode["kLeftBrace"] = 219] = "kLeftBrace";
	    KeyCode[KeyCode["kRightBrace"] = 221] = "kRightBrace";
	    KeyCode[KeyCode["kBackSlash"] = 220] = "kBackSlash";
	    KeyCode[KeyCode["kQuot"] = 222] = "kQuot";
	    KeyCode[KeyCode["kSemicolon"] = 186] = "kSemicolon";
	    KeyCode[KeyCode["kSlash"] = 191] = "kSlash";
	})(KeyCode = exports.KeyCode || (exports.KeyCode = {}));

	});

	unwrapExports(keycode);
	var keycode_1 = keycode.KeyCode;

	var transform = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Matrix2d = /** @class */ (function () {
	    function Matrix2d() {
	        this.a = 1;
	        this.b = 0;
	        this.c = 0;
	        this.d = 1;
	        this.e = 0;
	        this.f = 0;
	    }
	    Matrix2d.getIdentity = function () {
	        return new Matrix2d();
	    };
	    Matrix2d.getTranslate = function (x, y) {
	        return new Matrix2d().makeTranslate(x, y);
	    };
	    Matrix2d.getScale = function (x, y) {
	        return new Matrix2d().makeScale(x, y);
	    };
	    Matrix2d.getRotate = function (theta) {
	        return new Matrix2d().makeRotate(theta);
	    };
	    Matrix2d.transform = function (t1, t2) {
	        return new Matrix2d().copyFrom(t1).transform(t2);
	    };
	    Matrix2d.translate = function (t, x, y) {
	        return new Matrix2d().copyFrom(t).translate(x, y);
	    };
	    Matrix2d.scale = function (t, x, y) {
	        return new Matrix2d().copyFrom(t).scale(x, y);
	    };
	    Matrix2d.rotate = function (t, theta) {
	        return new Matrix2d().copyFrom(t).rotate(theta);
	    };
	    Matrix2d.invert = function (t) {
	        return new Matrix2d().copyFrom(t).invert();
	    };
	    Matrix2d.prototype.set = function (a, b, c, d, e, f) {
	        this.a = a;
	        this.b = b;
	        this.c = c;
	        this.d = d;
	        this.e = e;
	        this.f = f;
	        return this;
	    };
	    Matrix2d.prototype.makeIdentity = function () {
	        return this.set(1, 0, 0, 1, 0, 0);
	    };
	    Matrix2d.prototype.makeTranslate = function (x, y) {
	        return this.set(1, 0, 0, 1, x, y);
	    };
	    Matrix2d.prototype.makeScale = function (x, y) {
	        return this.set(x, 0, 0, y, 0, 0);
	    };
	    Matrix2d.prototype.makeRotate = function (theta) {
	        var s = Math.sin(theta);
	        var c = Math.cos(theta);
	        return this.set(c, s, -s, c, 0.0, 0.0);
	    };
	    Matrix2d.prototype.copyFrom = function (otherTransform) {
	        return this.set(otherTransform.a, otherTransform.b, otherTransform.c, otherTransform.d, otherTransform.e, otherTransform.f);
	    };
	    Matrix2d.prototype.transform = function (right) {
	        return this.set(this.a * right.a + this.c * right.b, this.b * right.a + this.d * right.b, this.a * right.c + this.c * right.d, this.b * right.c + this.d * right.d, this.a * right.e + this.c * right.f + this.e, this.b * right.e + this.d * right.f + this.f);
	    };
	    Matrix2d.prototype.transformPoint = function (point) {
	        return {
	            x: Math.round(this.a * point.x + this.c * point.y + this.e),
	            y: Math.round(this.b * point.x + this.d * point.y + this.f)
	        };
	    };
	    Matrix2d.prototype.translate = function (x, y) {
	        return this.transform(Matrix2d.getTranslate(x, y));
	    };
	    Matrix2d.prototype.scale = function (x, y) {
	        return this.transform(Matrix2d.getScale(x, y));
	    };
	    Matrix2d.prototype.rotate = function (theta) {
	        return this.transform(Matrix2d.getRotate(theta));
	    };
	    Matrix2d.prototype.invert = function () {
	        var a00 = this.a;
	        var a01 = this.b;
	        var a02 = 0;
	        var a10 = this.c;
	        var a11 = this.d;
	        var a12 = 0;
	        var a20 = this.e;
	        var a21 = this.f;
	        var a22 = 1;
	        var b01 = a22 * a11 - a12 * a21;
	        var b11 = -a22 * a10 + a12 * a20;
	        var b21 = a21 * a10 - a11 * a20;
	        var det = a00 * b01 + a01 * b11 + a02 * b21;
	        if (!det) {
	            return this;
	        }
	        det = 1.0 / det;
	        this.a = b01 * det;
	        this.b = (-a22 * a01 + a02 * a21) * det;
	        this.c = b11 * det;
	        this.d = (a22 * a00 - a02 * a20) * det;
	        this.e = b21 * det;
	        this.f = (-a21 * a00 + a01 * a20) * det;
	        return this;
	    };
	    Matrix2d.prototype.getTranslationPart = function () {
	        return { x: this.e, y: this.f };
	    };
	    Matrix2d.prototype.setTranslationPart = function (t) {
	        this.e = t.x;
	        this.f = t.y;
	    };
	    Matrix2d.prototype.getScalePart = function () {
	        return {
	            x: Math.sqrt(this.a * this.a + this.b * this.b),
	            y: Math.sqrt(this.c * this.c + this.d * this.d)
	        };
	    };
	    Matrix2d.prototype.setScalePart = function (s) {
	        var sc = this.getScalePart();
	        var s1 = s.x / sc.x;
	        this.a *= s1;
	        this.b *= s1;
	        var s2 = s.y / sc.y;
	        this.c *= s2;
	        this.d *= s2;
	    };
	    Matrix2d.prototype.getRotationPart = function () {
	        var sc = Math.sqrt(this.a * this.a + this.b * this.b);
	        if (sc === 0) {
	            return 0;
	        }
	        var ac = Math.max(Math.min(this.a / sc, 1), -1);
	        var as = Math.max(Math.min(this.b / sc, 1), -1);
	        var angle = Math.acos(ac);
	        return as >= 0 ? angle : 2 * Math.PI - angle;
	    };
	    Matrix2d.prototype.setRotationPart = function (r) {
	        var sc = this.getScalePart();
	        var sin = Math.sin(r);
	        var cos = Math.cos(r);
	        this.a = sc.x * cos;
	        this.b = sc.x * sin;
	        this.c = -sc.y * sin;
	        this.d = sc.y * cos;
	    };
	    return Matrix2d;
	}());
	exports.Matrix2d = Matrix2d;

	});

	unwrapExports(transform);
	var transform_1 = transform.Matrix2d;

	var core = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });


	var EventListenerOrder;
	(function (EventListenerOrder) {
	    EventListenerOrder[EventListenerOrder["FIRST"] = 1] = "FIRST";
	    EventListenerOrder[EventListenerOrder["LAST"] = 2] = "LAST";
	})(EventListenerOrder = exports.EventListenerOrder || (exports.EventListenerOrder = {}));
	var BaseEvent = /** @class */ (function () {
	    function BaseEvent(type) {
	        this.type = type;
	        this.eaten = false;
	    }
	    BaseEvent.prototype.eat = function () {
	        this.eaten = true;
	    };
	    return BaseEvent;
	}());
	exports.BaseEvent = BaseEvent;
	var EvtComponentBeforeAttach = /** @class */ (function (_super) {
	    __extends(EvtComponentBeforeAttach, _super);
	    function EvtComponentBeforeAttach(object) {
	        var _this = _super.call(this, EvtComponentBeforeAttach.type) || this;
	        _this.object = object;
	        _this.allow = true;
	        return _this;
	    }
	    EvtComponentBeforeAttach.type = '@componentBeforeAttach';
	    return EvtComponentBeforeAttach;
	}(BaseEvent));
	exports.EvtComponentBeforeAttach = EvtComponentBeforeAttach;
	var EvtComponentAttached = /** @class */ (function (_super) {
	    __extends(EvtComponentAttached, _super);
	    function EvtComponentAttached() {
	        return _super.call(this, EvtComponentAttached.type) || this;
	    }
	    EvtComponentAttached.type = '@componentAttached';
	    return EvtComponentAttached;
	}(BaseEvent));
	exports.EvtComponentAttached = EvtComponentAttached;
	var EvtComponentBeforeDetach = /** @class */ (function (_super) {
	    __extends(EvtComponentBeforeDetach, _super);
	    function EvtComponentBeforeDetach() {
	        var _this = _super.call(this, EvtComponentBeforeDetach.type) || this;
	        _this.allow = true;
	        return _this;
	    }
	    EvtComponentBeforeDetach.type = '@componentBeforeDetach';
	    return EvtComponentBeforeDetach;
	}(BaseEvent));
	exports.EvtComponentBeforeDetach = EvtComponentBeforeDetach;
	var EvtComponentDetached = /** @class */ (function (_super) {
	    __extends(EvtComponentDetached, _super);
	    function EvtComponentDetached() {
	        return _super.call(this, EvtComponentDetached.type) || this;
	    }
	    EvtComponentDetached.type = '@componentDetached';
	    return EvtComponentDetached;
	}(BaseEvent));
	exports.EvtComponentDetached = EvtComponentDetached;
	var EvtUpdate = /** @class */ (function (_super) {
	    __extends(EvtUpdate, _super);
	    function EvtUpdate(deltaTime, elapsedTime, frameStamp) {
	        var _this = _super.call(this, EvtUpdate.type) || this;
	        _this.deltaTime = deltaTime;
	        _this.elapsedTime = elapsedTime;
	        _this.frameStamp = frameStamp;
	        return _this;
	    }
	    EvtUpdate.type = '@update';
	    return EvtUpdate;
	}(BaseEvent));
	exports.EvtUpdate = EvtUpdate;
	var EvtCull = /** @class */ (function (_super) {
	    __extends(EvtCull, _super);
	    function EvtCull(w, h) {
	        var _this = _super.call(this, EvtCull.type) || this;
	        _this.canvasWidth = w;
	        _this.canvasHeight = h;
	        _this.result = {};
	        return _this;
	    }
	    EvtCull.prototype.addObject = function (object, z, transform$$1) {
	        var objectList = this.result[z] || [];
	        objectList.push({ object: object, z: z, transform: transform$$1 });
	        this.result[z] = objectList;
	    };
	    EvtCull.type = '@cull';
	    return EvtCull;
	}(BaseEvent));
	exports.EvtCull = EvtCull;
	var EvtDraw = /** @class */ (function (_super) {
	    __extends(EvtDraw, _super);
	    function EvtDraw(canvas, z, transform$$1) {
	        var _this = _super.call(this, EvtDraw.type) || this;
	        _this.canvas = canvas;
	        _this.z = z;
	        _this.transform = transform$$1;
	        return _this;
	    }
	    EvtDraw.type = '@draw';
	    return EvtDraw;
	}(BaseEvent));
	exports.EvtDraw = EvtDraw;
	var EvtHitTest = /** @class */ (function (_super) {
	    __extends(EvtHitTest, _super);
	    function EvtHitTest(x, y) {
	        var _this = _super.call(this, EvtHitTest.type) || this;
	        _this.x = x;
	        _this.y = y;
	        _this.result = false;
	        return _this;
	    }
	    EvtHitTest.type = '@hittest';
	    return EvtHitTest;
	}(BaseEvent));
	exports.EvtHitTest = EvtHitTest;
	var EvtGetBoundingShape = /** @class */ (function (_super) {
	    __extends(EvtGetBoundingShape, _super);
	    function EvtGetBoundingShape() {
	        return _super.call(this, EvtGetBoundingShape.type) || this;
	    }
	    EvtGetBoundingShape.type = '@getboundingshape';
	    return EvtGetBoundingShape;
	}(BaseEvent));
	exports.EvtGetBoundingShape = EvtGetBoundingShape;
	var EvtFrame = /** @class */ (function (_super) {
	    __extends(EvtFrame, _super);
	    function EvtFrame(deltaTime, elapsedTime, frameStamp) {
	        var _this = _super.call(this, EvtFrame.type) || this;
	        _this.deltaTime = deltaTime;
	        _this.elapsedTime = elapsedTime;
	        _this.frameStamp = frameStamp;
	        return _this;
	    }
	    EvtFrame.type = '@frame';
	    return EvtFrame;
	}(BaseEvent));
	exports.EvtFrame = EvtFrame;
	var EvtFocus = /** @class */ (function (_super) {
	    __extends(EvtFocus, _super);
	    function EvtFocus(focus) {
	        var _this = _super.call(this, EvtFocus.type) || this;
	        _this.focus = focus;
	        return _this;
	    }
	    EvtFocus.type = '@focus';
	    return EvtFocus;
	}(BaseEvent));
	exports.EvtFocus = EvtFocus;
	var EvtKeyboard = /** @class */ (function (_super) {
	    __extends(EvtKeyboard, _super);
	    function EvtKeyboard(type, key, code, shift, alt, ctrl, meta) {
	        var _this = _super.call(this, type) || this;
	        _this.key = key;
	        _this.keyCode = code;
	        _this.shiftDown = shift;
	        _this.altDown = alt;
	        _this.ctrlDown = ctrl;
	        _this.metaDown = meta;
	        return _this;
	    }
	    return EvtKeyboard;
	}(BaseEvent));
	exports.EvtKeyboard = EvtKeyboard;
	var EvtKeyDown = /** @class */ (function (_super) {
	    __extends(EvtKeyDown, _super);
	    function EvtKeyDown(key, code, shift, alt, ctrl, meta) {
	        return _super.call(this, EvtKeyDown.type, key, code, shift, alt, ctrl, meta) || this;
	    }
	    EvtKeyDown.type = '@keydown';
	    return EvtKeyDown;
	}(EvtKeyboard));
	exports.EvtKeyDown = EvtKeyDown;
	var EvtKeyUp = /** @class */ (function (_super) {
	    __extends(EvtKeyUp, _super);
	    function EvtKeyUp(key, code, shift, alt, ctrl, meta) {
	        return _super.call(this, EvtKeyUp.type, key, code, shift, alt, ctrl, meta) || this;
	    }
	    EvtKeyUp.type = '@keyup';
	    return EvtKeyUp;
	}(EvtKeyboard));
	exports.EvtKeyUp = EvtKeyUp;
	var EvtKeyPress = /** @class */ (function (_super) {
	    __extends(EvtKeyPress, _super);
	    function EvtKeyPress(key, code, shift, alt, ctrl, meta) {
	        return _super.call(this, EvtKeyPress.type, key, code, shift, alt, ctrl, meta) || this;
	    }
	    EvtKeyPress.type = '@keypress';
	    return EvtKeyPress;
	}(EvtKeyboard));
	exports.EvtKeyPress = EvtKeyPress;
	var EvtMouse = /** @class */ (function (_super) {
	    __extends(EvtMouse, _super);
	    function EvtMouse(type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) {
	        var _this = _super.call(this, type) || this;
	        _this.x = x;
	        _this.y = y;
	        _this.button = button;
	        _this.shiftDown = shiftDown;
	        _this.altDown = altDown;
	        _this.ctrlDown = ctrlDown;
	        _this.metaDown = metaDown;
	        _this.bubble = true;
	        return _this;
	    }
	    EvtMouse.prototype.cancelBubble = function () {
	        this.bubble = false;
	    };
	    return EvtMouse;
	}(BaseEvent));
	exports.EvtMouse = EvtMouse;
	var EvtMouseDown = /** @class */ (function (_super) {
	    __extends(EvtMouseDown, _super);
	    function EvtMouseDown(x, y, button, shiftDown, altDown, ctrlDown, metaDown) {
	        return _super.call(this, EvtMouseDown.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
	    }
	    EvtMouseDown.type = '@mousedown';
	    return EvtMouseDown;
	}(EvtMouse));
	exports.EvtMouseDown = EvtMouseDown;
	var EvtMouseUp = /** @class */ (function (_super) {
	    __extends(EvtMouseUp, _super);
	    function EvtMouseUp(x, y, button, shiftDown, altDown, ctrlDown, metaDown) {
	        return _super.call(this, EvtMouseUp.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
	    }
	    EvtMouseUp.type = '@mouseup';
	    return EvtMouseUp;
	}(EvtMouse));
	exports.EvtMouseUp = EvtMouseUp;
	var EvtMouseMove = /** @class */ (function (_super) {
	    __extends(EvtMouseMove, _super);
	    function EvtMouseMove(x, y, button, shiftDown, altDown, ctrlDown, metaDown) {
	        return _super.call(this, EvtMouseMove.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
	    }
	    EvtMouseMove.type = '@mousemove';
	    return EvtMouseMove;
	}(EvtMouse));
	exports.EvtMouseMove = EvtMouseMove;
	var EvtMouseEnter = /** @class */ (function (_super) {
	    __extends(EvtMouseEnter, _super);
	    function EvtMouseEnter() {
	        return _super.call(this, EvtMouseEnter.type) || this;
	    }
	    EvtMouseEnter.type = '@mouseenter';
	    return EvtMouseEnter;
	}(BaseEvent));
	exports.EvtMouseEnter = EvtMouseEnter;
	var EvtMouseLeave = /** @class */ (function (_super) {
	    __extends(EvtMouseLeave, _super);
	    function EvtMouseLeave() {
	        return _super.call(this, EvtMouseLeave.type) || this;
	    }
	    EvtMouseLeave.type = '@mouseleave';
	    return EvtMouseLeave;
	}(BaseEvent));
	exports.EvtMouseLeave = EvtMouseLeave;
	var EvtClick = /** @class */ (function (_super) {
	    __extends(EvtClick, _super);
	    function EvtClick(x, y, button, shiftDown, altDown, ctrlDown, metaDown) {
	        return _super.call(this, EvtClick.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
	    }
	    EvtClick.type = '@click';
	    return EvtClick;
	}(EvtMouse));
	exports.EvtClick = EvtClick;
	var EvtDblClick = /** @class */ (function (_super) {
	    __extends(EvtDblClick, _super);
	    function EvtDblClick(x, y, button, shiftDown, altDown, ctrlDown, metaDown) {
	        return _super.call(this, EvtDblClick.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
	    }
	    EvtDblClick.type = '@dblclick';
	    return EvtDblClick;
	}(EvtMouse));
	exports.EvtDblClick = EvtDblClick;
	var EvtDragBegin = /** @class */ (function (_super) {
	    __extends(EvtDragBegin, _super);
	    function EvtDragBegin(x, y, button, shiftDown, altDown, ctrlDown, metaDown) {
	        var _this = _super.call(this, EvtDragBegin.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
	        _this.data = null;
	        return _this;
	    }
	    EvtDragBegin.type = '@dragbegin';
	    return EvtDragBegin;
	}(EvtMouse));
	exports.EvtDragBegin = EvtDragBegin;
	var EvtDragEnd = /** @class */ (function (_super) {
	    __extends(EvtDragEnd, _super);
	    function EvtDragEnd(x, y, button, shiftDown, altDown, ctrlDown, metaDown, data) {
	        var _this = _super.call(this, EvtDragEnd.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
	        _this.data = data;
	        return _this;
	    }
	    EvtDragEnd.type = '@dragend';
	    return EvtDragEnd;
	}(EvtMouse));
	exports.EvtDragEnd = EvtDragEnd;
	var EvtDragging = /** @class */ (function (_super) {
	    __extends(EvtDragging, _super);
	    function EvtDragging(x, y, button, shiftDown, altDown, ctrlDown, metaDown, data) {
	        var _this = _super.call(this, EvtDragging.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
	        _this.data = data;
	        return _this;
	    }
	    EvtDragging.type = '@dragging';
	    return EvtDragging;
	}(EvtMouse));
	exports.EvtDragging = EvtDragging;
	var EvtDragOver = /** @class */ (function (_super) {
	    __extends(EvtDragOver, _super);
	    function EvtDragOver(x, y, button, shiftDown, altDown, ctrlDown, metaDown, object, data) {
	        var _this = _super.call(this, EvtDragOver.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
	        _this.object = object;
	        _this.data = data;
	        return _this;
	    }
	    EvtDragOver.type = '@dragover';
	    return EvtDragOver;
	}(EvtMouse));
	exports.EvtDragOver = EvtDragOver;
	var EvtDragDrop = /** @class */ (function (_super) {
	    __extends(EvtDragDrop, _super);
	    function EvtDragDrop(x, y, button, shiftDown, altDown, ctrlDown, metaDown, object, data) {
	        var _this = _super.call(this, EvtDragDrop.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
	        _this.object = object;
	        _this.data = data;
	        return _this;
	    }
	    EvtDragDrop.type = '@dragdrop';
	    return EvtDragDrop;
	}(EvtMouse));
	exports.EvtDragDrop = EvtDragDrop;
	var EvtResize = /** @class */ (function (_super) {
	    __extends(EvtResize, _super);
	    function EvtResize() {
	        return _super.call(this, EvtResize.type) || this;
	    }
	    EvtResize.type = '@resize';
	    return EvtResize;
	}(BaseEvent));
	exports.EvtResize = EvtResize;
	var EvtCanvasResize = /** @class */ (function (_super) {
	    __extends(EvtCanvasResize, _super);
	    function EvtCanvasResize(view) {
	        var _this = _super.call(this, EvtCanvasResize.type) || this;
	        _this.view = view;
	        return _this;
	    }
	    EvtCanvasResize.type = '@canvasresize';
	    return EvtCanvasResize;
	}(BaseEvent));
	exports.EvtCanvasResize = EvtCanvasResize;
	var EvtGetProp = /** @class */ (function (_super) {
	    __extends(EvtGetProp, _super);
	    function EvtGetProp(propName) {
	        var _this = _super.call(this, EvtGetProp.type) || this;
	        _this.propName = propName;
	        _this.propValue = undefined;
	        return _this;
	    }
	    EvtGetProp.type = '@getprop';
	    return EvtGetProp;
	}(BaseEvent));
	exports.EvtGetProp = EvtGetProp;
	var EvtSetProp = /** @class */ (function (_super) {
	    __extends(EvtSetProp, _super);
	    function EvtSetProp(propName, propValue) {
	        var _this = _super.call(this, EvtSetProp.type) || this;
	        _this.propName = propName;
	        _this.propValue = propValue;
	        return _this;
	    }
	    EvtSetProp.type = '@setprop';
	    return EvtSetProp;
	}(BaseEvent));
	exports.EvtSetProp = EvtSetProp;
	var EvtSysInfo = /** @class */ (function () {
	    function EvtSysInfo() {
	    }
	    EvtSysInfo.isWindows = function () {
	        return this._isWindows;
	    };
	    EvtSysInfo.isMac = function () {
	        return this._isMac;
	    };
	    EvtSysInfo.isUnix = function () {
	        return this._isX11 && !this._isWindows && !this._isMac;
	    };
	    EvtSysInfo.isLinux = function () {
	        return this._isLinux;
	    };
	    EvtSysInfo.isAndroid = function () {
	        return this._isLinux && this._isAndroid;
	    };
	    EvtSysInfo._isWindows = navigator.platform === 'Win32' || navigator.platform === 'Windows';
	    EvtSysInfo._isMac = navigator.platform === 'Mac68K' || navigator.platform === 'MacPPC' || navigator.platform === 'Macintosh' || navigator.platform === 'MacIntel';
	    EvtSysInfo._isX11 = navigator.platform === 'X11';
	    EvtSysInfo._isLinux = String(navigator.platform).indexOf('Linux') >= 0;
	    EvtSysInfo._isAndroid = (navigator.userAgent.toLowerCase().match(/android/i) || []).indexOf('android') >= 0;
	    return EvtSysInfo;
	}());
	exports.EvtSysInfo = EvtSysInfo;
	var EventObserver = /** @class */ (function () {
	    function EventObserver() {
	    }
	    EventObserver.prototype.on = function (type, handler, order) {
	        App.addEventListener(type, this, handler, order || EventListenerOrder.FIRST);
	    };
	    EventObserver.prototype.off = function (type, handler) {
	        App.removeEventListener(type, this, handler);
	    };
	    EventObserver.prototype.trigger = function (evt) {
	        App.triggerEvent(this, evt);
	    };
	    EventObserver.prototype.triggerEx = function (evt) {
	        this.trigger(evt);
	    };
	    EventObserver.prototype.post = function (evt) {
	        App.postEvent(this, evt);
	    };
	    return EventObserver;
	}());
	exports.EventObserver = EventObserver;
	var App = /** @class */ (function () {
	    function App() {
	    }
	    App.postEvent = function (target, evt) {
	        this.eventQueue.push({ evt: evt, target: target });
	    };
	    App.triggerEvent = function (target, evt) {
	        this.processEvent(evt, target);
	    };
	    App.processPendingEvents = function () {
	        var _this = this;
	        var events = this.eventQueue;
	        this.eventQueue = [];
	        events.forEach(function (evt) {
	            _this.processEvent(evt.evt, evt.target);
	        });
	    };
	    App.addEventListener = function (eventType, bindObject, handler, order) {
	        var handlerList = this.eventListeners[eventType] || [];
	        for (var i = 0; i < handlerList.length; i++) {
	            if (handlerList[i].bindObject === bindObject) {
	                if (order === EventListenerOrder.FIRST) {
	                    handlerList[i].handlers = {
	                        handler: handler,
	                        next: handlerList[i].handlers
	                    };
	                }
	                else {
	                    var h = handlerList[i].handlers;
	                    if (h) {
	                        while (h.next) {
	                            h = h.next;
	                        }
	                        h.next = { handler: handler, next: null };
	                    }
	                }
	                return;
	            }
	        }
	        handlerList.push({
	            bindObject: bindObject,
	            handlers: {
	                handler: handler,
	                next: null
	            }
	        });
	        this.eventListeners[eventType] = handlerList;
	    };
	    App.removeEventListener = function (eventType, bindObject, handler) {
	        var handlerList = this.eventListeners[eventType] || [];
	        for (var i = 0; i < handlerList.length; i++) {
	            if (handlerList[i].bindObject === bindObject) {
	                if (handler) {
	                    var h = handlerList[i].handlers;
	                    var ph = null;
	                    while (h && h.handler !== handler) {
	                        ph = h;
	                        h = h.next;
	                    }
	                    if (h) {
	                        if (ph) {
	                            ph.next = h.next;
	                        }
	                        else {
	                            handlerList[i].handlers = h.next;
	                        }
	                    }
	                    if (!handlerList[i].handlers) {
	                        handlerList.splice(i, 1);
	                    }
	                }
	                else {
	                    handlerList.splice(i, 1);
	                    break;
	                }
	            }
	        }
	    };
	    App.run = function () {
	        function frame(ts) {
	            if (App.running) {
	                if (App.lastFrameTime === 0) {
	                    App.lastFrameTime = ts;
	                    App.firstFrameTime = ts;
	                }
	                App.deltaTime = ts - App.lastFrameTime;
	                App.elapsedTime = ts - App.firstFrameTime;
	                App.lastFrameTime = ts;
	                App.frameStamp++;
	                App.processPendingEvents();
	                App.triggerEvent(null, new EvtFrame(App.deltaTime, App.elapsedTime, App.frameStamp));
	                if (App.running) {
	                    requestAnimationFrame(frame);
	                }
	            }
	        }
	        if (!this.running) {
	            this.running = true;
	            this.lastFrameTime = 0;
	            this.firstFrameTime = 0;
	            this.elapsedTime = 0;
	            this.deltaTime = 0;
	            this.frameStamp = 0;
	            this.init();
	            requestAnimationFrame(frame);
	        }
	    };
	    App.addView = function (view) {
	        if (view && view.canvas && !this.findView(view.canvas.canvas)) {
	            this.views.push(view);
	            if (!this.focusView) {
	                this.setFocusView(view);
	            }
	            return true;
	        }
	        return false;
	    };
	    App.addCanvas = function (canvas, doubleBuffer) {
	        if (!this.findView(canvas)) {
	            var view = new SceneView(canvas, doubleBuffer === undefined ? false : doubleBuffer);
	            return this.addView(view) ? view : null;
	        }
	        return null;
	    };
	    App.setFocusView = function (view) {
	        if (this.focusView !== view) {
	            if (this.focusView) {
	                this.focusView.trigger(new EvtFocus(false));
	            }
	            this.focusView = view;
	            if (this.focusView) {
	                this.focusView.trigger(new EvtFocus(true));
	            }
	        }
	    };
	    App.findView = function (canvas) {
	        for (var i = 0; i < this.views.length; i++) {
	            if (this.views[i].canvas.canvas === canvas) {
	                return this.views[i];
	            }
	        }
	        return null;
	    };
	    App.removeView = function (canvas) {
	        for (var i = 0; i < this.views.length; i++) {
	            if (this.views[i].canvas.canvas === canvas) {
	                this.views.splice(i, 1);
	            }
	        }
	    };
	    App.setCapture = function (view) {
	        this.capturedView = view;
	    };
	    App.init = function () {
	        this.initEventListeners();
	    };
	    App.processEvent = function (evt, target) {
	        var handlerList = this.eventListeners[evt.type];
	        if (handlerList) {
	            for (var i = 0; i < handlerList.length; i++) {
	                var entry = handlerList[i];
	                if (!target || entry.bindObject === target) {
	                    var h = entry.handlers;
	                    while (h) {
	                        h.handler.call(entry.bindObject, evt);
	                        if (evt.eaten) {
	                            break;
	                        }
	                        h = h.next;
	                    }
	                    if (target) {
	                        break;
	                    }
	                }
	            }
	        }
	    };
	    App.hitView = function (x, y) {
	        if (this.capturedView !== null) {
	            return this.capturedView;
	        }
	        for (var i = 0; i < this.views.length; i++) {
	            var view = this.views[i];
	            var rc = view.canvas.viewport_rect;
	            if (x >= rc.x && x < rc.x + rc.w && y >= rc.y && y < rc.y + rc.h) {
	                return view;
	            }
	        }
	        return null;
	    };
	    App.resizeHandler = function () {
	        var e = new EvtResize();
	        this.views.forEach(function (view) {
	            view.triggerEx(e);
	        });
	    };
	    App.mouseDownHandler = function (ev) {
	        this.clickTick = Date.now();
	        var view = this.hitView(ev.clientX, ev.clientY);
	        if (view !== null) {
	            view.handleMouseDown(ev);
	        }
	    };
	    App.mouseUpHandler = function (ev) {
	        var view = this.hitView(ev.clientX, ev.clientY);
	        if (view !== null) {
	            var tick = Date.now();
	            if (tick < this.clickTick + this.clickTime) {
	                if (tick < this.dblClickTick + this.dblclickTime) {
	                    view.handleDblClick(ev);
	                    this.dblClickTick = 0;
	                }
	                else {
	                    view.handleClick(ev);
	                    this.dblClickTick = tick;
	                }
	            }
	            else {
	                this.dblClickTick = 0;
	            }
	            view.handleMouseUp(ev);
	            this.clickTick = 0;
	        }
	        else {
	            this.clickTick = 0;
	            this.dblClickTick = 0;
	        }
	    };
	    App.mouseMoveHandler = function (ev) {
	        var view = this.hitView(ev.clientX, ev.clientY);
	        if (view !== this.hoverView) {
	            if (this.hoverView) {
	                this.hoverView.triggerEx(new EvtMouseLeave());
	                this.hoverView = null;
	            }
	            if (view !== null) {
	                this.hoverView = view;
	                view.triggerEx(new EvtMouseEnter());
	            }
	        }
	        if (view !== null) {
	            var rc = view.canvas.viewport_rect;
	            view.updateHitObjects(ev.clientX - rc.x, ev.clientY - rc.y);
	            view.handleMouseMove(ev);
	        }
	    };
	    App.keyDownHandler = function (ev) {
	        if (this.focusView) {
	            this.focusView.trigger(new EvtKeyDown(ev.key, ev.keyCode, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey));
	        }
	    };
	    App.keyUpHandler = function (ev) {
	        if (this.focusView) {
	            this.focusView.trigger(new EvtKeyUp(ev.key, ev.keyCode, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey));
	        }
	    };
	    App.keyPressHandler = function (ev) {
	        if (this.focusView) {
	            this.focusView.trigger(new EvtKeyPress(ev.key, ev.keyCode, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey));
	        }
	    };
	    App.initEventListeners = function () {
	        window.addEventListener('resize', this.resizeHandler.bind(this));
	        window.addEventListener(window.onpointerdown ? 'pointerdown' : 'mousedown', this.mouseDownHandler.bind(this));
	        window.addEventListener(window.onpointerup ? 'pointerup' : 'mouseup', this.mouseUpHandler.bind(this));
	        window.addEventListener(window.onpointermove ? 'pointermove' : 'mousemove', this.mouseMoveHandler.bind(this));
	        window.addEventListener('keydown', this.keyDownHandler.bind(this));
	        window.addEventListener('keyup', this.keyUpHandler.bind(this));
	        window.addEventListener('keypress', this.keyPressHandler.bind(this));
	    };
	    App.elapsedTime = 0;
	    App.deltaTime = 0;
	    App.eventQueue = [];
	    App.eventListeners = {};
	    App.running = false;
	    App.lastFrameTime = 0;
	    App.firstFrameTime = 0;
	    App.frameStamp = 0;
	    App.capturedView = null;
	    App.hoverView = null;
	    App.focusView = null;
	    App.views = [];
	    App.clickTick = 0;
	    App.dblClickTick = 0;
	    App.clickTime = 400;
	    App.dblclickTime = 400;
	    return App;
	}());
	exports.App = App;
	var Component = /** @class */ (function (_super) {
	    __extends(Component, _super);
	    function Component(type) {
	        var _this = _super.call(this) || this;
	        _this.type = type;
	        _this.object = null;
	        return _this;
	    }
	    Component.prototype.toString = function () {
	        return "<Component: " + this.type + ">";
	    };
	    return Component;
	}(EventObserver));
	exports.Component = Component;
	var BaseObject = /** @class */ (function (_super) {
	    __extends(BaseObject, _super);
	    function BaseObject() {
	        var _this = _super.call(this) || this;
	        _this.components = {};
	        return _this;
	    }
	    BaseObject.prototype.toString = function () {
	        return '<BaseObject>';
	    };
	    BaseObject.prototype.addComponent = function (component) {
	        if (component.object === null) {
	            var componentArray = this.components[component.type] || [];
	            if (componentArray.indexOf(component) < 0) {
	                var ev = new EvtComponentBeforeAttach(this);
	                component.trigger(ev);
	                ev.object = null;
	                if (ev.allow) {
	                    componentArray.push(component);
	                    component.object = this;
	                    component.trigger(new EvtComponentAttached());
	                }
	            }
	            this.components[component.type] = componentArray;
	        }
	        return this;
	    };
	    BaseObject.prototype.removeComponent = function (component) {
	        if (component.object === this) {
	            var index = this.components[component.type].indexOf(component);
	            this.removeComponentByIndex(component.type, index);
	        }
	        return this;
	    };
	    BaseObject.prototype.removeComponentByIndex = function (type, index) {
	        var components = this.components[type];
	        if (components && index >= 0 && index < components.length) {
	            var ev = new EvtComponentBeforeDetach();
	            components[index].trigger(ev);
	            if (ev.allow) {
	                components[index].trigger(new EvtComponentDetached());
	                components[index].object = null;
	                components.splice(index, 1);
	            }
	        }
	        return this;
	    };
	    BaseObject.prototype.removeComponentsByType = function (type) {
	        var components = this.components[type];
	        while (components && components.length > 0) {
	            this.removeComponentByIndex(type, components.length - 1);
	        }
	        return this;
	    };
	    BaseObject.prototype.removeAllComponents = function () {
	        var _this = this;
	        Object.keys(this.components).forEach(function (type) {
	            _this.removeComponentsByType(type);
	        });
	        return this;
	    };
	    BaseObject.prototype.getComponent = function (type, index) {
	        if (index === void 0) { index = 0; }
	        var componentArray = this.components[type];
	        if (componentArray === undefined || index < 0 || componentArray.length <= index) {
	            return null;
	        }
	        return componentArray[index];
	    };
	    BaseObject.prototype.getComponents = function (type) {
	        return this.components[type];
	    };
	    BaseObject.prototype.triggerEx = function (evt) {
	        _super.prototype.trigger.call(this, evt);
	        for (var c in this.components) {
	            if (this.components.hasOwnProperty(c)) {
	                this.components[c].forEach(function (comp) {
	                    comp.trigger(evt);
	                });
	            }
	        }
	    };
	    BaseObject.prototype.post = function (evt) {
	        App.postEvent(this, evt);
	    };
	    return BaseObject;
	}(EventObserver));
	exports.BaseObject = BaseObject;
	var SceneObject = /** @class */ (function (_super) {
	    __extends(SceneObject, _super);
	    function SceneObject(parent) {
	        var _this = _super.call(this) || this;
	        _this._view = null;
	        _this._parent = null;
	        _this._z = 0;
	        _this._visible = true;
	        _this._children = [];
	        _this._localTransform = new transform.Matrix2d();
	        _this._worldTranslation = null;
	        _this._worldRotation = null;
	        _this._worldScale = null;
	        _this._anchorPoint = { x: 0, y: 0 };
	        if (parent) {
	            parent.addChild(_this);
	        }
	        _this.on(EvtCull.type, function (evt) {
	            evt.addObject(_this, _this.z, _this.worldTransform);
	        });
	        _this.on(EvtHitTest.type, function (evt) {
	            var shape = _this.boundingShape;
	            evt.result = shape ? intersect.IntersectionTestShapePoint(shape, { x: evt.x, y: evt.y }) : false;
	        });
	        _this.on(EvtGetProp.type, function (ev) {
	            switch (ev.propName) {
	                case 'z':
	                    ev.propValue = _this.z;
	                    ev.eat();
	                    break;
	                case 'visible':
	                    ev.propValue = _this.visible;
	                    ev.eat();
	                    break;
	                case 'transform':
	                    ev.propValue = _this.localTransform;
	                    ev.eat();
	                    break;
	                case 'translation':
	                    var t = _this.translation;
	                    ev.propValue = [t.x, t.y];
	                    ev.eat();
	                    break;
	                case 'scale':
	                    var s = _this.scale;
	                    ev.propValue = [s.x, s.y];
	                    ev.eat();
	                    break;
	                case 'rotation':
	                    ev.propValue = _this.rotation;
	                    ev.eat();
	                    break;
	                case 'anchorPoint':
	                    ev.propValue = _this.anchorPoint;
	                    ev.eat();
	                    break;
	                default:
	                    break;
	            }
	        });
	        _this.on(EvtSetProp.type, function (ev) {
	            switch (ev.propName) {
	                case 'z':
	                    _this.z = ev.propValue;
	                    ev.eat();
	                    break;
	                case 'visible':
	                    _this.visible = ev.propValue;
	                    ev.eat();
	                    break;
	                case 'transform':
	                    _this.localTransform = ev.propValue;
	                    ev.eat();
	                    break;
	                case 'translation':
	                    var t = ev.propValue;
	                    _this.translation = { x: Math.round(t[0]), y: Math.round(t[1]) };
	                    break;
	                case 'scale':
	                    var s = ev.propValue;
	                    _this.scale = { x: s[0], y: s[1] };
	                    break;
	                case 'rotation':
	                    _this.rotation = ev.propValue;
	                    break;
	                case 'anchorPoint':
	                    _this.anchorPoint = ev.propValue;
	                    break;
	                default:
	                    break;
	            }
	        });
	        return _this;
	    }
	    Object.defineProperty(SceneObject.prototype, "boundingShape", {
	        get: function () {
	            var ev = new EvtGetBoundingShape();
	            this.triggerEx(ev);
	            return ev.shape || null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SceneObject.prototype, "view", {
	        get: function () {
	            return this._view;
	        },
	        set: function (v) {
	            this._view = v;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SceneObject.prototype, "parent", {
	        get: function () {
	            return this._parent;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SceneObject.prototype, "z", {
	        get: function () {
	            return this._z;
	        },
	        set: function (value) {
	            this.setZ(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SceneObject.prototype.setZ = function (value) {
	        this._z = value;
	    };
	    Object.defineProperty(SceneObject.prototype, "visible", {
	        get: function () {
	            return this._visible;
	        },
	        set: function (value) {
	            this.setVisible(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SceneObject.prototype.setVisible = function (value) {
	        this._visible = value;
	    };
	    Object.defineProperty(SceneObject.prototype, "localTransform", {
	        get: function () {
	            return this._localTransform;
	        },
	        set: function (t) {
	            this.setLocalTransform(t);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SceneObject.prototype.setLocalTransform = function (t) {
	        this._localTransform = t;
	    };
	    Object.defineProperty(SceneObject.prototype, "translation", {
	        get: function () {
	            return this.localTransform.getTranslationPart();
	        },
	        set: function (t) {
	            this.setTranslation(t);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SceneObject.prototype.setTranslation = function (t) {
	        this.localTransform.setTranslationPart(t);
	    };
	    Object.defineProperty(SceneObject.prototype, "scale", {
	        get: function () {
	            return this.localTransform.getScalePart();
	        },
	        set: function (s) {
	            this.setScale(s);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SceneObject.prototype.setScale = function (s) {
	        this.localTransform.setScalePart(s);
	    };
	    Object.defineProperty(SceneObject.prototype, "rotation", {
	        get: function () {
	            return this.localTransform.getRotationPart();
	        },
	        set: function (r) {
	            this.setRotation(r);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SceneObject.prototype.setRotation = function (r) {
	        this.localTransform.setRotationPart(r);
	    };
	    Object.defineProperty(SceneObject.prototype, "worldTransform", {
	        get: function () {
	            var t = this.parent ? transform.Matrix2d.transform(this.parent.worldTransform, this.localTransform) : this.localTransform;
	            if (this._worldTranslation !== null) {
	                t.setTranslationPart(this._worldTranslation);
	            }
	            if (this._worldRotation !== null) {
	                t.setRotationPart(this._worldRotation);
	            }
	            if (this._worldScale !== null) {
	                t.setScalePart(this._worldScale);
	            }
	            return t;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SceneObject.prototype, "worldTranslation", {
	        get: function () {
	            return this._worldTranslation;
	        },
	        set: function (value) {
	            this.setWorldTranslation(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SceneObject.prototype.setWorldTranslation = function (value) {
	        this._worldTranslation = value === null ? null : { x: Math.round(value.x), y: Math.round(value.y) };
	    };
	    Object.defineProperty(SceneObject.prototype, "worldRotation", {
	        get: function () {
	            return this._worldRotation;
	        },
	        set: function (value) {
	            this.setWorldRotation(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SceneObject.prototype.setWorldRotation = function (value) {
	        this._worldRotation = value;
	    };
	    Object.defineProperty(SceneObject.prototype, "worldScale", {
	        get: function () {
	            return this._worldScale;
	        },
	        set: function (value) {
	            this.setWorldScale(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SceneObject.prototype.setWorldScale = function (value) {
	        this._worldScale = value;
	    };
	    Object.defineProperty(SceneObject.prototype, "anchorPoint", {
	        get: function () {
	            return this._anchorPoint;
	        },
	        set: function (pt) {
	            this.setAnchorPoint(pt);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SceneObject.prototype.setAnchorPoint = function (pt) {
	        this._anchorPoint = pt;
	    };
	    Object.defineProperty(SceneObject.prototype, "numChildren", {
	        get: function () {
	            return this._children.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SceneObject.prototype.collapseTransform = function () {
	        var wt = this.worldTransform;
	        this.worldTranslation = null;
	        this.worldRotation = null;
	        this.worldScale = null;
	        if (this.parent) {
	            this.localTransform = transform.Matrix2d.invert(this.parent.worldTransform).transform(wt);
	        }
	        else {
	            this.localTransform = wt;
	        }
	        this.localTransform.e = Math.round(this.localTransform.e);
	        this.localTransform.f = Math.round(this.localTransform.f);
	    };
	    SceneObject.prototype.getLocalPoint = function (x, y) {
	        return transform.Matrix2d.invert(this.worldTransform).transformPoint({ x: x, y: y });
	    };
	    SceneObject.prototype.childAt = function (index) {
	        return this._children[index];
	    };
	    SceneObject.prototype.forEachChild = function (callback) {
	        this._children.forEach(callback);
	    };
	    SceneObject.prototype.addChild = function (child) {
	        if (child._parent === null) {
	            child._parent = this;
	            child._view = this._view;
	            this._children.push(child);
	        }
	    };
	    SceneObject.prototype.removeChild = function (child) {
	        if (child._parent === this) {
	            var index = this._children.indexOf(child);
	            this.removeChildAt(index);
	        }
	    };
	    SceneObject.prototype.removeChildAt = function (index) {
	        if (index >= 0 && index < this._children.length) {
	            var child = this._children[index];
	            this._children.splice(index, 1);
	            child._parent = null;
	            child._view = null;
	        }
	    };
	    SceneObject.prototype.removeChildren = function () {
	        while (this._children.length > 0) {
	            this.removeChildAt(0);
	        }
	    };
	    SceneObject.prototype.unrefChildren = function () {
	        while (this._children.length > 0) {
	            this._children[0].unrefChildren();
	            this.removeChildAt(0);
	        }
	    };
	    SceneObject.prototype.remove = function () {
	        if (this._parent) {
	            this._parent.removeChild(this);
	        }
	    };
	    SceneObject.prototype.triggerRecursive = function (evt) {
	        _super.prototype.trigger.call(this, evt);
	        this.forEachChild(function (child, index) {
	            child.triggerRecursive(evt);
	        });
	    };
	    SceneObject.prototype.triggerRecursiveEx = function (evt) {
	        _super.prototype.triggerEx.call(this, evt);
	        this.forEachChild(function (child, index) {
	            child.triggerRecursiveEx(evt);
	        });
	    };
	    SceneObject.prototype.setCapture = function () {
	        this._view && this._view.setCaptureObject(this);
	    };
	    SceneObject.prototype.releaseCapture = function () {
	        this._view && this._view.captureObject === this && this._view.setCaptureObject(null);
	    };
	    SceneObject.prototype.toString = function () {
	        return '<SceneObject>';
	    };
	    return SceneObject;
	}(BaseObject));
	exports.SceneObject = SceneObject;
	var SceneView = /** @class */ (function (_super) {
	    __extends(SceneView, _super);
	    function SceneView(canvas, doubleBuffer) {
	        if (doubleBuffer === void 0) { doubleBuffer = false; }
	        var _this = _super.call(this) || this;
	        _this._canvas = new Canvas(_this, canvas, doubleBuffer);
	        _this._captureObject = null;
	        _this._hitObjects = [];
	        _this._rootNode = new SceneObject();
	        _this._rootNode.view = _this;
	        _this.on(EvtFrame.type, function (ev) {
	            var updateEvent = new EvtUpdate(ev.deltaTime, ev.elapsedTime, ev.frameStamp);
	            _this.rootNode.triggerRecursiveEx(updateEvent);
	            _this.canvas.clear();
	            _this.triggerEx(new EvtDraw(_this.canvas, 0, new transform.Matrix2d()));
	            _this.canvas.flip();
	        });
	        _this.on(EvtDraw.type, function (ev) {
	            var cullEvent = new EvtCull(ev.canvas.width, ev.canvas.height);
	            _this.rootNode.triggerRecursiveEx(cullEvent);
	            for (var i in cullEvent.result) {
	                var group = cullEvent.result[i];
	                for (var j = 0; j < group.length; j++) {
	                    ev.canvas.context.save();
	                    ev.canvas.applyTransform(group[j].transform);
	                    ev.canvas.context.translate(0.5, 0.5);
	                    group[j].object.triggerEx(new EvtDraw(ev.canvas, group[j].z, group[j].transform));
	                    ev.canvas.context.restore();
	                }
	            }
	        });
	        return _this;
	    }
	    SceneView.prototype.updateHitObjects = function (x, y) {
	        var hitTestResult = this.hitTest(x, y);
	        for (var i = 0; i < this._hitObjects.length;) {
	            if (hitTestResult.indexOf(this._hitObjects[i]) < 0) {
	                this._hitObjects[i].trigger(new EvtMouseLeave());
	                this._hitObjects.splice(i, 1);
	            }
	            else {
	                i++;
	            }
	        }
	        for (var i = 0; i < hitTestResult.length; i++) {
	            if (this._hitObjects.indexOf(hitTestResult[i]) < 0) {
	                hitTestResult[i].trigger(new EvtMouseEnter());
	            }
	        }
	        this._hitObjects = hitTestResult;
	        this._hitObjects.push(this.rootNode);
	    };
	    Object.defineProperty(SceneView.prototype, "rootNode", {
	        get: function () {
	            return this._rootNode;
	        },
	        set: function (node) {
	            if (node !== this._rootNode) {
	                this._captureObject = null;
	                this._hitObjects.length = 0;
	                this._rootNode = node;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SceneView.prototype, "canvas", {
	        get: function () {
	            return this._canvas;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SceneView.prototype, "captureObject", {
	        get: function () {
	            return this._captureObject;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SceneView.prototype, "hitObjects", {
	        get: function () {
	            return this._hitObjects;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SceneView.prototype.setCaptureObject = function (object) {
	        this._captureObject = object;
	    };
	    SceneView.prototype.handleMouseDown = function (ev) {
	        var rc = this.canvas.viewport_rect;
	        var e = new EvtMouseDown(ev.clientX - rc.x, ev.clientY - rc.y, ev.button, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey);
	        if (this.isValidObject(this._captureObject)) {
	            this._captureObject.triggerEx(e);
	        }
	        else {
	            for (var i = 0; i < this._hitObjects.length; i++) {
	                var obj = this._hitObjects[i];
	                if (this.isValidObject(obj)) {
	                    obj.triggerEx(e);
	                    if (!e.bubble) {
	                        break;
	                    }
	                }
	            }
	            if (e.bubble) {
	                this.triggerEx(e);
	            }
	        }
	    };
	    SceneView.prototype.handleMouseUp = function (ev) {
	        var rc = this.canvas.viewport_rect;
	        var e = new EvtMouseUp(ev.clientX - rc.x, ev.clientY - rc.y, ev.button, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey);
	        if (this.isValidObject(this._captureObject)) {
	            this._captureObject.triggerEx(e);
	        }
	        else {
	            for (var i = 0; i < this._hitObjects.length; i++) {
	                var obj = this._hitObjects[i];
	                if (this.isValidObject(obj)) {
	                    obj.triggerEx(e);
	                    if (!e.bubble) {
	                        break;
	                    }
	                }
	            }
	            if (e.bubble) {
	                this.triggerEx(e);
	            }
	        }
	    };
	    SceneView.prototype.handleMouseMove = function (ev) {
	        var rc = this.canvas.viewport_rect;
	        var e = new EvtMouseMove(ev.clientX - rc.x, ev.clientY - rc.y, ev.button, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey);
	        if (this.isValidObject(this._captureObject)) {
	            this._captureObject.triggerEx(e);
	        }
	        else {
	            for (var i = 0; i < this._hitObjects.length; i++) {
	                var obj = this._hitObjects[i];
	                if (this.isValidObject(obj)) {
	                    obj.triggerEx(e);
	                    if (!e.bubble) {
	                        break;
	                    }
	                }
	            }
	            if (e.bubble) {
	                this.triggerEx(e);
	            }
	        }
	    };
	    SceneView.prototype.handleClick = function (ev) {
	        var rc = this.canvas.viewport_rect;
	        var e = new EvtClick(ev.clientX - rc.x, ev.clientY - rc.y, ev.button, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey);
	        for (var i = 0; i < this._hitObjects.length; i++) {
	            var obj = this._hitObjects[i];
	            if (this.isValidObject(obj)) {
	                obj.triggerEx(e);
	                if (!e.bubble) {
	                    break;
	                }
	            }
	        }
	        if (e.bubble) {
	            this.triggerEx(e);
	        }
	    };
	    SceneView.prototype.handleDblClick = function (ev) {
	        var rc = this.canvas.viewport_rect;
	        var e = new EvtDblClick(ev.clientX - rc.x, ev.clientY - rc.y, ev.button, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey);
	        for (var i = 0; i < this._hitObjects.length; i++) {
	            var obj = this._hitObjects[i];
	            if (this.isValidObject(obj)) {
	                obj.triggerEx(e);
	                if (!e.bubble) {
	                    break;
	                }
	            }
	        }
	        if (e.bubble) {
	            this.triggerEx(e);
	        }
	    };
	    SceneView.prototype.setFocus = function () {
	        App.setFocusView(this);
	    };
	    SceneView.prototype.hitTest = function (x, y) {
	        function hitTest_r(object, result) {
	            var pos = transform.Matrix2d.invert(object.worldTransform).transformPoint({ x: x, y: y });
	            var e = new EvtHitTest(pos.x, pos.y);
	            object.triggerEx(e);
	            if (e.result) {
	                result.push(object);
	            }
	            object.forEachChild(function (child, index) {
	                hitTest_r(child, result);
	            });
	        }
	        var hitTestResult = [];
	        hitTest_r(this.rootNode, hitTestResult);
	        hitTestResult.sort(function (a, b) {
	            return b.z - a.z;
	        });
	        return hitTestResult;
	    };
	    SceneView.prototype.isValidObject = function (object) {
	        return object && object.view === this;
	    };
	    return SceneView;
	}(BaseObject));
	exports.SceneView = SceneView;
	function ResizeSensor(element, callback) {
	    var zIndex = parseInt(window.getComputedStyle(element).zIndex || '0', 10);
	    if (isNaN(zIndex)) {
	        zIndex = 0;
	    }
	    zIndex--;
	    var expand = document.createElement('div');
	    expand.style.position = 'absolute';
	    expand.style.left = '0px';
	    expand.style.top = '0px';
	    expand.style.right = '0px';
	    expand.style.bottom = '0px';
	    expand.style.overflow = 'hidden';
	    expand.style.zIndex = String(zIndex);
	    expand.style.visibility = 'hidden';
	    var expandChild = document.createElement('div');
	    expandChild.style.position = 'absolute';
	    expandChild.style.left = '0px';
	    expandChild.style.top = '0px';
	    expandChild.style.width = '10000000px';
	    expandChild.style.height = '10000000px';
	    expand.appendChild(expandChild);
	    var shrink = document.createElement('div');
	    shrink.style.position = 'absolute';
	    shrink.style.left = '0px';
	    shrink.style.top = '0px';
	    shrink.style.right = '0px';
	    shrink.style.bottom = '0px';
	    shrink.style.overflow = 'hidden';
	    shrink.style.zIndex = String(zIndex);
	    shrink.style.visibility = 'hidden';
	    var shrinkChild = document.createElement('div');
	    shrinkChild.style.position = 'absolute';
	    shrinkChild.style.left = '0px';
	    shrinkChild.style.top = '0px';
	    shrinkChild.style.width = '200%';
	    shrinkChild.style.height = '200%';
	    shrink.appendChild(shrinkChild);
	    element.appendChild(expand);
	    element.appendChild(shrink);
	    function setScroll() {
	        expand.scrollLeft = 10000000;
	        expand.scrollTop = 10000000;
	        shrink.scrollLeft = 10000000;
	        shrink.scrollTop = 10000000;
	    }
	    setScroll();
	    var size = element.getBoundingClientRect();
	    var currentWidth = size.width;
	    var currentHeight = size.height;
	    var onScroll = function () {
	        var size = element.getBoundingClientRect();
	        var newWidth = size.width;
	        var newHeight = size.height;
	        if (newWidth !== currentWidth || newHeight !== currentHeight) {
	            currentWidth = newWidth;
	            currentHeight = newHeight;
	            callback();
	        }
	        setScroll();
	    };
	    expand.addEventListener('scroll', onScroll);
	    shrink.addEventListener('scroll', onScroll);
	}
	exports.ResizeSensor = ResizeSensor;
	var Canvas = /** @class */ (function (_super) {
	    __extends(Canvas, _super);
	    function Canvas(view, canvas, doubleBuffer) {
	        if (doubleBuffer === void 0) { doubleBuffer = false; }
	        var _this = _super.call(this) || this;
	        _this._view = view;
	        _this._canvas = canvas;
	        _this._buffer = null;
	        _this._screenCtx = null;
	        _this._offscreenCtx = null;
	        _this._width = 0;
	        _this._height = 0;
	        if (_this._canvas) {
	            _this.adjustCanvasSize(_this._canvas);
	            if (_this._canvas.parentElement) {
	                ResizeSensor(_this._canvas.parentElement, function () {
	                    _this.adjustCanvasSize(_this._canvas);
	                });
	            }
	        }
	        _this._mouseOver = false;
	        _this._doubleBuffer = false; // doubleBuffer;
	        return _this;
	    }
	    Object.defineProperty(Canvas.prototype, "canvas", {
	        get: function () {
	            return this._canvas;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Canvas.prototype, "width", {
	        get: function () {
	            return this._width;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Canvas.prototype, "height", {
	        get: function () {
	            return this._height;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Canvas.prototype, "context", {
	        get: function () {
	            return (this._doubleBuffer ? this._offscreenCtx : this._screenCtx);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Canvas.prototype, "viewport_rect", {
	        get: function () {
	            var rc = this._canvas.getBoundingClientRect();
	            var x = rc.left - document.documentElement.clientLeft;
	            var y = rc.top - document.documentElement.clientTop;
	            var w = rc.right - rc.left;
	            var h = rc.bottom - rc.top;
	            return { x: x, y: y, w: w, h: h };
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Canvas.prototype.clear = function (rect) {
	        var x = rect ? rect.x : 0;
	        var y = rect ? rect.y : 0;
	        var w = rect ? rect.w : this._width;
	        var h = rect ? rect.h : this._height;
	        this.context.setTransform(1, 0, 0, 1, 0, 0);
	        this.context.clearRect(x, y, w, h);
	        if (this._doubleBuffer && this._screenCtx) {
	            this._screenCtx.clearRect(x, y, w, h);
	        }
	    };
	    Canvas.prototype.applyTransform = function (transform$$1) {
	        this.context.setTransform(transform$$1.a, transform$$1.b, transform$$1.c, transform$$1.d, Math.round(transform$$1.e), Math.round(transform$$1.f));
	    };
	    Canvas.prototype.flip = function () {
	        if (this._doubleBuffer && this._screenCtx && this._buffer) {
	            this._screenCtx.drawImage(this._buffer, 0, 0);
	        }
	    };
	    Canvas.prototype.adjustCanvasSize = function (canvas) {
	        if (canvas.parentElement) {
	            var computedStyle = window.getComputedStyle(canvas);
	            this._width = canvas.clientWidth;
	            this._height = canvas.clientHeight;
	            this._canvas.width = this._width;
	            this._canvas.height = this._height;
	            this._screenCtx = this._canvas.getContext('2d');
	            this._buffer = document.createElement('canvas');
	            this._buffer.width = this._width;
	            this._buffer.height = this._height;
	            this._offscreenCtx = this._buffer.getContext('2d');
	            App.triggerEvent(null, new EvtCanvasResize(this._view));
	        }
	    };
	    return Canvas;
	}(BaseObject));
	exports.Canvas = Canvas;

	});

	unwrapExports(core);
	var core_1 = core.EventListenerOrder;
	var core_2 = core.BaseEvent;
	var core_3 = core.EvtComponentBeforeAttach;
	var core_4 = core.EvtComponentAttached;
	var core_5 = core.EvtComponentBeforeDetach;
	var core_6 = core.EvtComponentDetached;
	var core_7 = core.EvtUpdate;
	var core_8 = core.EvtCull;
	var core_9 = core.EvtDraw;
	var core_10 = core.EvtHitTest;
	var core_11 = core.EvtGetBoundingShape;
	var core_12 = core.EvtFrame;
	var core_13 = core.EvtFocus;
	var core_14 = core.EvtKeyboard;
	var core_15 = core.EvtKeyDown;
	var core_16 = core.EvtKeyUp;
	var core_17 = core.EvtKeyPress;
	var core_18 = core.EvtMouse;
	var core_19 = core.EvtMouseDown;
	var core_20 = core.EvtMouseUp;
	var core_21 = core.EvtMouseMove;
	var core_22 = core.EvtMouseEnter;
	var core_23 = core.EvtMouseLeave;
	var core_24 = core.EvtClick;
	var core_25 = core.EvtDblClick;
	var core_26 = core.EvtDragBegin;
	var core_27 = core.EvtDragEnd;
	var core_28 = core.EvtDragging;
	var core_29 = core.EvtDragOver;
	var core_30 = core.EvtDragDrop;
	var core_31 = core.EvtResize;
	var core_32 = core.EvtCanvasResize;
	var core_33 = core.EvtGetProp;
	var core_34 = core.EvtSetProp;
	var core_35 = core.EvtSysInfo;
	var core_36 = core.EventObserver;
	var core_37 = core.App;
	var core_38 = core.Component;
	var core_39 = core.BaseObject;
	var core_40 = core.SceneObject;
	var core_41 = core.SceneView;
	var core_42 = core.ResizeSensor;
	var core_43 = core.Canvas;

	var components = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });



	var CoKeyframeAnimation = /** @class */ (function (_super) {
	    __extends(CoKeyframeAnimation, _super);
	    function CoKeyframeAnimation(options) {
	        var _this = _super.call(this, CoKeyframeAnimation.type) || this;
	        _this._tracks = {};
	        _this._duration = 0;
	        _this._startTime = 0;
	        _this._round = 0;
	        var opt = options || {};
	        _this._delay = opt.delay === undefined ? 0 : opt.delay;
	        _this._repeat = opt.repeat === undefined ? 0 : opt.repeat;
	        _this._autoRemove = opt.autoRemove === undefined ? true : opt.autoRemove;
	        _this._exclusive = !!opt.exclusive;
	        if (opt.tracks) {
	            for (var trackName in opt.tracks) {
	                if (opt.tracks.hasOwnProperty(trackName)) {
	                    var trackinfo = opt.tracks[trackName];
	                    var type = trackinfo.type === undefined ? curve.SplineType.POLY : trackinfo.type;
	                    var clamp = trackinfo.clamp === undefined ? true : trackinfo.clamp;
	                    _this.setTrack(trackName, type, clamp, trackinfo.cp);
	                }
	            }
	        }
	        _this.on(core.EvtComponentBeforeAttach.type, function (ev) {
	            if (ev.object && _this._exclusive) {
	                ev.object.removeComponentsByType(_this.type);
	            }
	        });
	        _this.on(core.EvtUpdate.type, function (e) {
	            var timeNow = e.elapsedTime;
	            if (_this._startTime === 0) {
	                _this._startTime = timeNow;
	            }
	            if (_this._startTime + _this._delay > timeNow) {
	                return;
	            }
	            var t = timeNow - _this._startTime - _this._delay;
	            for (var track in _this._tracks) {
	                if (_this._tracks.hasOwnProperty(track)) {
	                    _this._tracks[track].value = _this._tracks[track].evalutor.eval(t);
	                }
	            }
	            if (_this.object) {
	                for (var prop in _this._tracks) {
	                    if (_this._tracks.hasOwnProperty(prop)) {
	                        _this.object.triggerEx(new core.EvtSetProp(prop, _this._tracks[prop].value));
	                    }
	                }
	            }
	            if (t >= _this._duration) {
	                _this._round++;
	                if (_this._repeat === 0 || _this._round < _this._repeat) {
	                    _this._startTime = timeNow + t - _this._duration;
	                }
	                else if (_this._autoRemove) {
	                    _this.object && _this.object.removeComponent(_this);
	                }
	            }
	        });
	        return _this;
	    }
	    Object.defineProperty(CoKeyframeAnimation.prototype, "repeat", {
	        get: function () {
	            return this._repeat;
	        },
	        set: function (val) {
	            this._repeat = val;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CoKeyframeAnimation.prototype, "autoRemove", {
	        get: function () {
	            return this._autoRemove;
	        },
	        set: function (val) {
	            this._autoRemove = val;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CoKeyframeAnimation.prototype, "delay", {
	        get: function () {
	            return this._delay;
	        },
	        set: function (delay) {
	            this._delay = delay;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    CoKeyframeAnimation.prototype.setTrack = function (name, type, clamp, keyFrames) {
	        if (keyFrames.length > 0) {
	            if (keyFrames[keyFrames.length - 1].x > this._duration) {
	                this._duration = keyFrames[keyFrames.length - 1].x;
	            }
	            this._tracks[name] = { evalutor: new curve.Spline(type, keyFrames, clamp), value: null };
	        }
	    };
	    CoKeyframeAnimation.prototype.finish = function () {
	        for (var track in this._tracks) {
	            this._tracks[track].value = this._tracks[track].evalutor.evalLast();
	        }
	        if (this.object) {
	            for (var prop in this._tracks) {
	                this.object.triggerEx(new core.EvtSetProp(prop, this._tracks[prop].value));
	            }
	        }
	        this._round++;
	        if (this._repeat === 0 || this._round < this._repeat) {
	            this._startTime = core.App.elapsedTime;
	        }
	        else if (this._autoRemove) {
	            this.object && this.object.removeComponent(this);
	        }
	    };
	    CoKeyframeAnimation.type = 'KeyframeAnimation';
	    return CoKeyframeAnimation;
	}(core.Component));
	exports.CoKeyframeAnimation = CoKeyframeAnimation;
	var CoDraggable = /** @class */ (function (_super) {
	    __extends(CoDraggable, _super);
	    function CoDraggable() {
	        var _this = _super.call(this, CoDraggable.type) || this;
	        _this._dragging = false;
	        _this._draggingData = null;
	        _this.on(core.EvtMouseDown.type, function (e) {
	            var obj = _this.object;
	            obj.setCapture();
	            _this._dragging = true;
	            var dragBeginEvent = new core.EvtDragBegin(e.x, e.y, e.button, e.shiftDown, e.altDown, e.ctrlDown, e.metaDown);
	            obj.triggerEx(dragBeginEvent);
	            _this._draggingData = dragBeginEvent.data;
	            e.cancelBubble();
	        });
	        _this.on(core.EvtMouseUp.type, function (e) {
	            var obj = _this.object;
	            obj.releaseCapture();
	            if (obj.view && _this._dragging) {
	                var dragendEvent = new core.EvtDragEnd(e.x, e.y, e.button, e.shiftDown, e.altDown, e.ctrlDown, e.metaDown, _this._draggingData);
	                obj.triggerEx(dragendEvent);
	                _this._dragging = false;
	                obj.view.updateHitObjects(e.x, e.y);
	                var dragDropEvent = new core.EvtDragDrop(e.x, e.y, e.button, e.shiftDown, e.altDown, e.ctrlDown, e.metaDown, obj, _this._draggingData);
	                for (var i = 0; i < obj.view.hitObjects.length; i++) {
	                    var hitObj = obj.view.hitObjects[i];
	                    if (hitObj !== obj && hitObj.z <= obj.z) {
	                        hitObj.triggerEx(dragDropEvent);
	                        if (!dragDropEvent.bubble) {
	                            break;
	                        }
	                    }
	                }
	                if (dragDropEvent.bubble) {
	                    obj.view.triggerEx(dragDropEvent);
	                }
	                _this._draggingData = null;
	                e.cancelBubble();
	            }
	        });
	        _this.on(core.EvtMouseMove.type, function (e) {
	            if (_this.object && _this._dragging) {
	                var draggingEvent = new core.EvtDragging(e.x, e.y, e.button, e.shiftDown, e.altDown, e.ctrlDown, e.metaDown, _this._draggingData);
	                _this.object.triggerEx(draggingEvent);
	                var obj = _this.object;
	                if (obj.view) {
	                    obj.view.updateHitObjects(e.x, e.y);
	                    var dragOverEvent = new core.EvtDragOver(e.x, e.y, e.button, e.shiftDown, e.altDown, e.ctrlDown, e.metaDown, obj, _this._draggingData);
	                    for (var i = 0; i < obj.view.hitObjects.length; i++) {
	                        var hitObj = obj.view.hitObjects[i];
	                        if (hitObj !== obj && hitObj.z <= obj.z) {
	                            hitObj.triggerEx(dragOverEvent);
	                            if (!dragOverEvent.bubble) {
	                                break;
	                            }
	                        }
	                    }
	                    if (dragOverEvent.bubble) {
	                        obj.view.triggerEx(dragOverEvent);
	                    }
	                    e.cancelBubble();
	                }
	            }
	        });
	        return _this;
	    }
	    CoDraggable.type = 'Draggable';
	    return CoDraggable;
	}(core.Component));
	exports.CoDraggable = CoDraggable;
	var CoDroppable = /** @class */ (function (_super) {
	    __extends(CoDroppable, _super);
	    function CoDroppable() {
	        return _super.call(this, CoDroppable.type) || this;
	    }
	    CoDroppable.type = 'Droppable';
	    return CoDroppable;
	}(core.Component));
	exports.CoDroppable = CoDroppable;
	var CoImage = /** @class */ (function (_super) {
	    __extends(CoImage, _super);
	    function CoImage(filename, width, height) {
	        if (filename === void 0) { filename = null; }
	        if (width === void 0) { width = 0; }
	        if (height === void 0) { height = 0; }
	        var _this = _super.call(this, CoImage.type) || this;
	        _this._image = new Image();
	        if (filename) {
	            _this._image.src = filename;
	        }
	        if (width) {
	            _this._image.width = width;
	            _this._width = width;
	        }
	        else {
	            _this._width = _this._image.complete ? _this._image.width : 0;
	        }
	        if (height) {
	            _this._image.height = height;
	            _this._height = height;
	        }
	        else {
	            _this._height = _this._image.complete ? _this._image.height : 0;
	        }
	        if (!_this._image.complete) {
	            _this._loaded = false;
	            _this._image.onload = function () {
	                if (_this._width === 0) {
	                    _this._width = _this._image.width;
	                }
	                if (_this._height === 0) {
	                    _this._height = _this._image.height;
	                }
	                _this._loaded = true;
	            };
	        }
	        else {
	            _this._loaded = true;
	        }
	        _this.on(core.EvtCull.type, function (evt) {
	            if (_this._loaded) {
	                var node = _this.object;
	                evt.addObject(_this, node.z, node.worldTransform);
	            }
	        });
	        _this.on(core.EvtGetBoundingShape.type, function (evt) {
	            if (_this.object && _this._loaded) {
	                evt.shape = new boundingbox.BoundingBox({ x: -_this._width * _this.object.anchorPoint.x, y: -_this._height * _this.object.anchorPoint.y, w: _this._width, h: _this._height });
	            }
	        });
	        _this.on(core.EvtDraw.type, function (evt) {
	            if (_this.object && _this._loaded) {
	                evt.canvas.context.drawImage(_this._image, -Math.round(_this._width * _this.object.anchorPoint.x) - 0.5, -Math.round(_this._height * _this.object.anchorPoint.y) - 0.5, _this._width, _this._height);
	            }
	        });
	        _this.on(core.EvtGetProp.type, function (ev) {
	            switch (ev.propName) {
	                case 'width':
	                    ev.propValue = _this._width;
	                    ev.eat();
	                    break;
	                case 'height':
	                    ev.propValue = _this._height;
	                    ev.eat();
	                    break;
	                default:
	                    break;
	            }
	        });
	        _this.on(core.EvtSetProp.type, function (ev) {
	            switch (ev.propName) {
	                case 'width':
	                    _this._width = ev.propValue;
	                    _this._image.width = _this._width;
	                    ev.eat();
	                    break;
	                case 'height':
	                    _this._height = ev.propValue;
	                    _this._image.height = _this._height;
	                    ev.eat();
	                    break;
	                default:
	                    break;
	            }
	        });
	        return _this;
	    }
	    CoImage.type = 'Image';
	    return CoImage;
	}(core.Component));
	exports.CoImage = CoImage;

	});

	unwrapExports(components);
	var components_1 = components.CoKeyframeAnimation;
	var components_2 = components.CoDraggable;
	var components_3 = components.CoDroppable;
	var components_4 = components.CoImage;

	var paint = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function setPixel(imageData, w, h, x, y, r, g, b) {
	    var i = (y * w + x) * 4;
	    imageData[i] = r;
	    imageData[i + 1] = g;
	    imageData[i + 2] = b;
	    imageData[i + 3] = 255;
	}
	function blendImageData(imageData, buffer) {
	    for (var i = 0; i < imageData.length / 4; i++) {
	        var alpha = buffer[i * 4 + 3] / 255;
	        var invalpha = 1 - alpha;
	        imageData[i * 4] = imageData[i * 4] * invalpha + buffer[i * 4];
	        imageData[i * 4 + 1] = imageData[i * 4 + 1] * invalpha + buffer[i * 4 + 1];
	        imageData[i * 4 + 2] = imageData[i * 4 + 2] * invalpha + buffer[i * 4 + 2];
	        if (imageData[i * 4 + 3] < buffer[i * 4 + 3]) {
	            imageData[i * 4 + 3] = buffer[i * 4 + 3];
	        }
	    }
	}
	var buffer = null;
	function fillCircle(imageData, w, h, x0, y0, radius, r, g, b) {
	    if (buffer === null || buffer.length < imageData.length) {
	        buffer = new Uint8ClampedArray(imageData.length);
	    }
	    function plot(x, y) {
	        // setPixel (imageData, w, h, x, y, r, g, b);
	        var buf = buffer;
	        var dx = x - x0;
	        var dy = y - y0;
	        var f = 1 - Math.sqrt((dx * dx + dy * dy) / (radius * radius));
	        var i = (y * w + x) * 4;
	        buf[i] = r * f;
	        buf[i + 1] = g * f;
	        buf[i + 2] = b * f;
	        buf[i + 3] = f * 255;
	        // const f = 1.0 - Math.max(Math.min(1.0, (dx * dx + dy * dy) / (radius * radius)), 0.0);
	        // blendPixel (imageData, w, h, x, y, r, g, b, f/255)
	        // setPixel (imageData, w, h, x, y, f * 255, f * 255, f * 255);
	        // const r1 = Math.floor(255 * f);
	        // const g1 = Math.floor(255 * f);
	        // const b1 = Math.floor(255 * f);
	        // setPixel (imageData, w, h, x, y, r1, g1, b1);
	    }
	    var x = 0;
	    var y = radius;
	    var dx = 3;
	    var dy = 2 - radius - radius;
	    var d = 1 - radius;
	    var xi;
	    plot(x + x0, y + y0);
	    plot(x + x0, -y + y0);
	    for (xi = -radius + x0; xi <= radius + x0; xi++) {
	        plot(xi, y0);
	    }
	    while (x < y) {
	        if (d < 0) {
	            d += dx;
	            dx += 2;
	            x++;
	        }
	        else {
	            d += dx + dy;
	            dx += 2;
	            dy += 2;
	            x++;
	            y--;
	        }
	        for (xi = -x + x0; xi <= x + x0; xi++) {
	            plot(xi, -y + y0);
	            plot(xi, y + y0);
	        }
	        for (xi = -y + x0; xi <= y + x0; xi++) {
	            plot(xi, -x + y0);
	            plot(xi, x + y0);
	        }
	    }
	    blendImageData(imageData, buffer);
	}
	function bresenhamDrawLine(imageData, w, h, x1, y1, x2, y2, r, g, b) {
	    var dx = Math.abs(x2 - x1);
	    var dy = Math.abs(y2 - y1);
	    var yy = 0;
	    var t;
	    if (dx < dy) {
	        yy = 1;
	        t = x1;
	        x1 = y1;
	        y1 = t;
	        t = x2;
	        x2 = y2;
	        y2 = t;
	        t = dx;
	        dx = dy;
	        dy = t;
	    }
	    var ix = x2 > x1 ? 1 : -1;
	    var iy = y2 > y1 ? 1 : -1;
	    var cx = x1;
	    var cy = y1;
	    var n2dy = dy * 2;
	    var n2dydx = (dy - dx) * 2;
	    var d = dy * 2 - dx;
	    if (yy === 1) {
	        while (cx !== x2) {
	            if (d < 0) {
	                d += n2dy;
	            }
	            else {
	                cy += iy;
	                d += n2dydx;
	            }
	            setPixel(imageData, w, h, cy, cx, r, g, b);
	            cx += ix;
	        }
	    }
	    else {
	        while (cx !== x2) {
	            if (d < 0) {
	                d += n2dy;
	            }
	            else {
	                cy += iy;
	                d += n2dydx;
	            }
	            setPixel(imageData, w, h, cx, cy, r, g, b);
	            cx += ix;
	        }
	    }
	}
	function parseColorRGBA(rgba) {
	    var result = {
	        r: 255,
	        g: 255,
	        b: 255,
	        a: 255
	    };
	    var c = [];
	    var t = 0;
	    var s = rgba.toLowerCase();
	    var d1 = '0'.charCodeAt(0);
	    var d2 = '9'.charCodeAt(0);
	    var h1 = 'a'.charCodeAt(0);
	    var h2 = 'f'.charCodeAt(0);
	    for (var i = 1; i < rgba.length; i++) {
	        var ch = rgba.charCodeAt(i);
	        var val = 0;
	        if (ch >= d1 && ch <= d2) {
	            val = ch - d1;
	        }
	        else if (ch >= h1 && ch <= h2) {
	            val = 10 + ch - h1;
	        }
	        if (i % 2 === 1) {
	            t = val;
	        }
	        else {
	            c.push(t * 16 + val);
	        }
	    }
	    if (c.length > 0) {
	        result.r = c[0];
	    }
	    if (c.length > 1) {
	        result.g = c[1];
	    }
	    if (c.length > 2) {
	        result.b = c[2];
	    }
	    if (c.length > 3) {
	        result.a = c[3];
	    }
	    return result;
	}
	function DrawLine(context, x1, y1, x2, y2, color) {
	    var rgba = parseColorRGBA(color);
	    var xmin = x1 > x2 ? x2 : x1;
	    var ymin = y1 > y2 ? y2 : y1;
	    var xmax = x1 > x2 ? x1 : x2;
	    var ymax = y1 > y2 ? y1 : y2;
	    var imageData = context.getImageData(xmin, ymin, xmax - xmin + 1, ymax - ymin + 1);
	    bresenhamDrawLine(imageData.data, imageData.width, imageData.height, x1 - xmin, y1 - ymin, x2 - xmin, y2 - ymin, rgba.r, rgba.g, rgba.b);
	    context.putImageData(imageData, xmin, ymin);
	}
	exports.DrawLine = DrawLine;
	function FillCircle(context, x0, y0, radius, color) {
	    var rgba = parseColorRGBA(color);
	    var imageData = context.getImageData(x0 - radius, y0 - radius, 2 * radius + 1, 2 * radius + 1);
	    fillCircle(imageData.data, imageData.width, imageData.height, radius, radius, radius, rgba.r, rgba.g, rgba.b);
	    context.putImageData(imageData, x0 - radius, y0 - radius);
	}
	exports.FillCircle = FillCircle;

	});

	unwrapExports(paint);
	var paint_1 = paint.DrawLine;
	var paint_2 = paint.FillCircle;

	var catk = createCommonjsModule(function (module, exports) {
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(point);
	__export(boundingshape);
	__export(boundingbox);
	__export(boundinghull);
	__export(boundingsegment);
	__export(boundingsphere);
	__export(intersect);
	__export(curve);
	__export(keycode);
	__export(transform);
	__export(core);
	__export(components);
	__export(paint);

	});

	unwrapExports(catk);

	var aspromise = asPromise;

	/**
	 * Callback as used by {@link util.asPromise}.
	 * @typedef asPromiseCallback
	 * @type {function}
	 * @param {Error|null} error Error, if any
	 * @param {...*} params Additional arguments
	 * @returns {undefined}
	 */

	/**
	 * Returns a promise from a node-style callback function.
	 * @memberof util
	 * @param {asPromiseCallback} fn Function to call
	 * @param {*} ctx Function context
	 * @param {...*} params Function arguments
	 * @returns {Promise<*>} Promisified function
	 */
	function asPromise(fn, ctx/*, varargs */) {
	    var params  = new Array(arguments.length - 1),
	        offset  = 0,
	        index   = 2,
	        pending = true;
	    while (index < arguments.length)
	        params[offset++] = arguments[index++];
	    return new Promise(function executor(resolve, reject) {
	        params[offset] = function callback(err/*, varargs */) {
	            if (pending) {
	                pending = false;
	                if (err)
	                    reject(err);
	                else {
	                    var params = new Array(arguments.length - 1),
	                        offset = 0;
	                    while (offset < params.length)
	                        params[offset++] = arguments[offset];
	                    resolve.apply(null, params);
	                }
	            }
	        };
	        try {
	            fn.apply(ctx || null, params);
	        } catch (err) {
	            if (pending) {
	                pending = false;
	                reject(err);
	            }
	        }
	    });
	}

	var base64_1 = createCommonjsModule(function (module, exports) {

	/**
	 * A minimal base64 implementation for number arrays.
	 * @memberof util
	 * @namespace
	 */
	var base64 = exports;

	/**
	 * Calculates the byte length of a base64 encoded string.
	 * @param {string} string Base64 encoded string
	 * @returns {number} Byte length
	 */
	base64.length = function length(string) {
	    var p = string.length;
	    if (!p)
	        return 0;
	    var n = 0;
	    while (--p % 4 > 1 && string.charAt(p) === "=")
	        ++n;
	    return Math.ceil(string.length * 3) / 4 - n;
	};

	// Base64 encoding table
	var b64 = new Array(64);

	// Base64 decoding table
	var s64 = new Array(123);

	// 65..90, 97..122, 48..57, 43, 47
	for (var i = 0; i < 64;)
	    s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;

	/**
	 * Encodes a buffer to a base64 encoded string.
	 * @param {Uint8Array} buffer Source buffer
	 * @param {number} start Source start
	 * @param {number} end Source end
	 * @returns {string} Base64 encoded string
	 */
	base64.encode = function encode(buffer, start, end) {
	    var parts = null,
	        chunk = [];
	    var i = 0, // output index
	        j = 0, // goto index
	        t;     // temporary
	    while (start < end) {
	        var b = buffer[start++];
	        switch (j) {
	            case 0:
	                chunk[i++] = b64[b >> 2];
	                t = (b & 3) << 4;
	                j = 1;
	                break;
	            case 1:
	                chunk[i++] = b64[t | b >> 4];
	                t = (b & 15) << 2;
	                j = 2;
	                break;
	            case 2:
	                chunk[i++] = b64[t | b >> 6];
	                chunk[i++] = b64[b & 63];
	                j = 0;
	                break;
	        }
	        if (i > 8191) {
	            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
	            i = 0;
	        }
	    }
	    if (j) {
	        chunk[i++] = b64[t];
	        chunk[i++] = 61;
	        if (j === 1)
	            chunk[i++] = 61;
	    }
	    if (parts) {
	        if (i)
	            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
	        return parts.join("");
	    }
	    return String.fromCharCode.apply(String, chunk.slice(0, i));
	};

	var invalidEncoding = "invalid encoding";

	/**
	 * Decodes a base64 encoded string to a buffer.
	 * @param {string} string Source string
	 * @param {Uint8Array} buffer Destination buffer
	 * @param {number} offset Destination offset
	 * @returns {number} Number of bytes written
	 * @throws {Error} If encoding is invalid
	 */
	base64.decode = function decode(string, buffer, offset) {
	    var start = offset;
	    var j = 0, // goto index
	        t;     // temporary
	    for (var i = 0; i < string.length;) {
	        var c = string.charCodeAt(i++);
	        if (c === 61 && j > 1)
	            break;
	        if ((c = s64[c]) === undefined)
	            throw Error(invalidEncoding);
	        switch (j) {
	            case 0:
	                t = c;
	                j = 1;
	                break;
	            case 1:
	                buffer[offset++] = t << 2 | (c & 48) >> 4;
	                t = c;
	                j = 2;
	                break;
	            case 2:
	                buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
	                t = c;
	                j = 3;
	                break;
	            case 3:
	                buffer[offset++] = (t & 3) << 6 | c;
	                j = 0;
	                break;
	        }
	    }
	    if (j === 1)
	        throw Error(invalidEncoding);
	    return offset - start;
	};

	/**
	 * Tests if the specified string appears to be base64 encoded.
	 * @param {string} string String to test
	 * @returns {boolean} `true` if probably base64 encoded, otherwise false
	 */
	base64.test = function test(string) {
	    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
	};
	});

	var eventemitter = EventEmitter;

	/**
	 * Constructs a new event emitter instance.
	 * @classdesc A minimal event emitter.
	 * @memberof util
	 * @constructor
	 */
	function EventEmitter() {

	    /**
	     * Registered listeners.
	     * @type {Object.<string,*>}
	     * @private
	     */
	    this._listeners = {};
	}

	/**
	 * Registers an event listener.
	 * @param {string} evt Event name
	 * @param {function} fn Listener
	 * @param {*} [ctx] Listener context
	 * @returns {util.EventEmitter} `this`
	 */
	EventEmitter.prototype.on = function on(evt, fn, ctx) {
	    (this._listeners[evt] || (this._listeners[evt] = [])).push({
	        fn  : fn,
	        ctx : ctx || this
	    });
	    return this;
	};

	/**
	 * Removes an event listener or any matching listeners if arguments are omitted.
	 * @param {string} [evt] Event name. Removes all listeners if omitted.
	 * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
	 * @returns {util.EventEmitter} `this`
	 */
	EventEmitter.prototype.off = function off(evt, fn) {
	    if (evt === undefined)
	        this._listeners = {};
	    else {
	        if (fn === undefined)
	            this._listeners[evt] = [];
	        else {
	            var listeners = this._listeners[evt];
	            for (var i = 0; i < listeners.length;)
	                if (listeners[i].fn === fn)
	                    listeners.splice(i, 1);
	                else
	                    ++i;
	        }
	    }
	    return this;
	};

	/**
	 * Emits an event by calling its listeners with the specified arguments.
	 * @param {string} evt Event name
	 * @param {...*} args Arguments
	 * @returns {util.EventEmitter} `this`
	 */
	EventEmitter.prototype.emit = function emit(evt) {
	    var listeners = this._listeners[evt];
	    if (listeners) {
	        var args = [],
	            i = 1;
	        for (; i < arguments.length;)
	            args.push(arguments[i++]);
	        for (i = 0; i < listeners.length;)
	            listeners[i].fn.apply(listeners[i++].ctx, args);
	    }
	    return this;
	};

	var float_1 = factory(factory);

	/**
	 * Reads / writes floats / doubles from / to buffers.
	 * @name util.float
	 * @namespace
	 */

	/**
	 * Writes a 32 bit float to a buffer using little endian byte order.
	 * @name util.float.writeFloatLE
	 * @function
	 * @param {number} val Value to write
	 * @param {Uint8Array} buf Target buffer
	 * @param {number} pos Target buffer offset
	 * @returns {undefined}
	 */

	/**
	 * Writes a 32 bit float to a buffer using big endian byte order.
	 * @name util.float.writeFloatBE
	 * @function
	 * @param {number} val Value to write
	 * @param {Uint8Array} buf Target buffer
	 * @param {number} pos Target buffer offset
	 * @returns {undefined}
	 */

	/**
	 * Reads a 32 bit float from a buffer using little endian byte order.
	 * @name util.float.readFloatLE
	 * @function
	 * @param {Uint8Array} buf Source buffer
	 * @param {number} pos Source buffer offset
	 * @returns {number} Value read
	 */

	/**
	 * Reads a 32 bit float from a buffer using big endian byte order.
	 * @name util.float.readFloatBE
	 * @function
	 * @param {Uint8Array} buf Source buffer
	 * @param {number} pos Source buffer offset
	 * @returns {number} Value read
	 */

	/**
	 * Writes a 64 bit double to a buffer using little endian byte order.
	 * @name util.float.writeDoubleLE
	 * @function
	 * @param {number} val Value to write
	 * @param {Uint8Array} buf Target buffer
	 * @param {number} pos Target buffer offset
	 * @returns {undefined}
	 */

	/**
	 * Writes a 64 bit double to a buffer using big endian byte order.
	 * @name util.float.writeDoubleBE
	 * @function
	 * @param {number} val Value to write
	 * @param {Uint8Array} buf Target buffer
	 * @param {number} pos Target buffer offset
	 * @returns {undefined}
	 */

	/**
	 * Reads a 64 bit double from a buffer using little endian byte order.
	 * @name util.float.readDoubleLE
	 * @function
	 * @param {Uint8Array} buf Source buffer
	 * @param {number} pos Source buffer offset
	 * @returns {number} Value read
	 */

	/**
	 * Reads a 64 bit double from a buffer using big endian byte order.
	 * @name util.float.readDoubleBE
	 * @function
	 * @param {Uint8Array} buf Source buffer
	 * @param {number} pos Source buffer offset
	 * @returns {number} Value read
	 */

	// Factory function for the purpose of node-based testing in modified global environments
	function factory(exports) {

	    // float: typed array
	    if (typeof Float32Array !== "undefined") (function() {

	        var f32 = new Float32Array([ -0 ]),
	            f8b = new Uint8Array(f32.buffer),
	            le  = f8b[3] === 128;

	        function writeFloat_f32_cpy(val, buf, pos) {
	            f32[0] = val;
	            buf[pos    ] = f8b[0];
	            buf[pos + 1] = f8b[1];
	            buf[pos + 2] = f8b[2];
	            buf[pos + 3] = f8b[3];
	        }

	        function writeFloat_f32_rev(val, buf, pos) {
	            f32[0] = val;
	            buf[pos    ] = f8b[3];
	            buf[pos + 1] = f8b[2];
	            buf[pos + 2] = f8b[1];
	            buf[pos + 3] = f8b[0];
	        }

	        /* istanbul ignore next */
	        exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
	        /* istanbul ignore next */
	        exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;

	        function readFloat_f32_cpy(buf, pos) {
	            f8b[0] = buf[pos    ];
	            f8b[1] = buf[pos + 1];
	            f8b[2] = buf[pos + 2];
	            f8b[3] = buf[pos + 3];
	            return f32[0];
	        }

	        function readFloat_f32_rev(buf, pos) {
	            f8b[3] = buf[pos    ];
	            f8b[2] = buf[pos + 1];
	            f8b[1] = buf[pos + 2];
	            f8b[0] = buf[pos + 3];
	            return f32[0];
	        }

	        /* istanbul ignore next */
	        exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
	        /* istanbul ignore next */
	        exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;

	    // float: ieee754
	    })(); else (function() {

	        function writeFloat_ieee754(writeUint, val, buf, pos) {
	            var sign = val < 0 ? 1 : 0;
	            if (sign)
	                val = -val;
	            if (val === 0)
	                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos);
	            else if (isNaN(val))
	                writeUint(2143289344, buf, pos);
	            else if (val > 3.4028234663852886e+38) // +-Infinity
	                writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
	            else if (val < 1.1754943508222875e-38) // denormal
	                writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);
	            else {
	                var exponent = Math.floor(Math.log(val) / Math.LN2),
	                    mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
	                writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
	            }
	        }

	        exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
	        exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);

	        function readFloat_ieee754(readUint, buf, pos) {
	            var uint = readUint(buf, pos),
	                sign = (uint >> 31) * 2 + 1,
	                exponent = uint >>> 23 & 255,
	                mantissa = uint & 8388607;
	            return exponent === 255
	                ? mantissa
	                ? NaN
	                : sign * Infinity
	                : exponent === 0 // denormal
	                ? sign * 1.401298464324817e-45 * mantissa
	                : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
	        }

	        exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
	        exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);

	    })();

	    // double: typed array
	    if (typeof Float64Array !== "undefined") (function() {

	        var f64 = new Float64Array([-0]),
	            f8b = new Uint8Array(f64.buffer),
	            le  = f8b[7] === 128;

	        function writeDouble_f64_cpy(val, buf, pos) {
	            f64[0] = val;
	            buf[pos    ] = f8b[0];
	            buf[pos + 1] = f8b[1];
	            buf[pos + 2] = f8b[2];
	            buf[pos + 3] = f8b[3];
	            buf[pos + 4] = f8b[4];
	            buf[pos + 5] = f8b[5];
	            buf[pos + 6] = f8b[6];
	            buf[pos + 7] = f8b[7];
	        }

	        function writeDouble_f64_rev(val, buf, pos) {
	            f64[0] = val;
	            buf[pos    ] = f8b[7];
	            buf[pos + 1] = f8b[6];
	            buf[pos + 2] = f8b[5];
	            buf[pos + 3] = f8b[4];
	            buf[pos + 4] = f8b[3];
	            buf[pos + 5] = f8b[2];
	            buf[pos + 6] = f8b[1];
	            buf[pos + 7] = f8b[0];
	        }

	        /* istanbul ignore next */
	        exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
	        /* istanbul ignore next */
	        exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;

	        function readDouble_f64_cpy(buf, pos) {
	            f8b[0] = buf[pos    ];
	            f8b[1] = buf[pos + 1];
	            f8b[2] = buf[pos + 2];
	            f8b[3] = buf[pos + 3];
	            f8b[4] = buf[pos + 4];
	            f8b[5] = buf[pos + 5];
	            f8b[6] = buf[pos + 6];
	            f8b[7] = buf[pos + 7];
	            return f64[0];
	        }

	        function readDouble_f64_rev(buf, pos) {
	            f8b[7] = buf[pos    ];
	            f8b[6] = buf[pos + 1];
	            f8b[5] = buf[pos + 2];
	            f8b[4] = buf[pos + 3];
	            f8b[3] = buf[pos + 4];
	            f8b[2] = buf[pos + 5];
	            f8b[1] = buf[pos + 6];
	            f8b[0] = buf[pos + 7];
	            return f64[0];
	        }

	        /* istanbul ignore next */
	        exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
	        /* istanbul ignore next */
	        exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;

	    // double: ieee754
	    })(); else (function() {

	        function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
	            var sign = val < 0 ? 1 : 0;
	            if (sign)
	                val = -val;
	            if (val === 0) {
	                writeUint(0, buf, pos + off0);
	                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos + off1);
	            } else if (isNaN(val)) {
	                writeUint(0, buf, pos + off0);
	                writeUint(2146959360, buf, pos + off1);
	            } else if (val > 1.7976931348623157e+308) { // +-Infinity
	                writeUint(0, buf, pos + off0);
	                writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
	            } else {
	                var mantissa;
	                if (val < 2.2250738585072014e-308) { // denormal
	                    mantissa = val / 5e-324;
	                    writeUint(mantissa >>> 0, buf, pos + off0);
	                    writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
	                } else {
	                    var exponent = Math.floor(Math.log(val) / Math.LN2);
	                    if (exponent === 1024)
	                        exponent = 1023;
	                    mantissa = val * Math.pow(2, -exponent);
	                    writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
	                    writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
	                }
	            }
	        }

	        exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
	        exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);

	        function readDouble_ieee754(readUint, off0, off1, buf, pos) {
	            var lo = readUint(buf, pos + off0),
	                hi = readUint(buf, pos + off1);
	            var sign = (hi >> 31) * 2 + 1,
	                exponent = hi >>> 20 & 2047,
	                mantissa = 4294967296 * (hi & 1048575) + lo;
	            return exponent === 2047
	                ? mantissa
	                ? NaN
	                : sign * Infinity
	                : exponent === 0 // denormal
	                ? sign * 5e-324 * mantissa
	                : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
	        }

	        exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
	        exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);

	    })();

	    return exports;
	}

	// uint helpers

	function writeUintLE(val, buf, pos) {
	    buf[pos    ] =  val        & 255;
	    buf[pos + 1] =  val >>> 8  & 255;
	    buf[pos + 2] =  val >>> 16 & 255;
	    buf[pos + 3] =  val >>> 24;
	}

	function writeUintBE(val, buf, pos) {
	    buf[pos    ] =  val >>> 24;
	    buf[pos + 1] =  val >>> 16 & 255;
	    buf[pos + 2] =  val >>> 8  & 255;
	    buf[pos + 3] =  val        & 255;
	}

	function readUintLE(buf, pos) {
	    return (buf[pos    ]
	          | buf[pos + 1] << 8
	          | buf[pos + 2] << 16
	          | buf[pos + 3] << 24) >>> 0;
	}

	function readUintBE(buf, pos) {
	    return (buf[pos    ] << 24
	          | buf[pos + 1] << 16
	          | buf[pos + 2] << 8
	          | buf[pos + 3]) >>> 0;
	}

	var inquire_1 = inquire;

	/**
	 * Requires a module only if available.
	 * @memberof util
	 * @param {string} moduleName Module to require
	 * @returns {?Object} Required module if available and not empty, otherwise `null`
	 */
	function inquire(moduleName) {
	    try {
	        var mod = eval("quire".replace(/^/,"re"))(moduleName); // eslint-disable-line no-eval
	        if (mod && (mod.length || Object.keys(mod).length))
	            return mod;
	    } catch (e) {} // eslint-disable-line no-empty
	    return null;
	}

	var utf8_1 = createCommonjsModule(function (module, exports) {

	/**
	 * A minimal UTF8 implementation for number arrays.
	 * @memberof util
	 * @namespace
	 */
	var utf8 = exports;

	/**
	 * Calculates the UTF8 byte length of a string.
	 * @param {string} string String
	 * @returns {number} Byte length
	 */
	utf8.length = function utf8_length(string) {
	    var len = 0,
	        c = 0;
	    for (var i = 0; i < string.length; ++i) {
	        c = string.charCodeAt(i);
	        if (c < 128)
	            len += 1;
	        else if (c < 2048)
	            len += 2;
	        else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
	            ++i;
	            len += 4;
	        } else
	            len += 3;
	    }
	    return len;
	};

	/**
	 * Reads UTF8 bytes as a string.
	 * @param {Uint8Array} buffer Source buffer
	 * @param {number} start Source start
	 * @param {number} end Source end
	 * @returns {string} String read
	 */
	utf8.read = function utf8_read(buffer, start, end) {
	    var len = end - start;
	    if (len < 1)
	        return "";
	    var parts = null,
	        chunk = [],
	        i = 0, // char offset
	        t;     // temporary
	    while (start < end) {
	        t = buffer[start++];
	        if (t < 128)
	            chunk[i++] = t;
	        else if (t > 191 && t < 224)
	            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
	        else if (t > 239 && t < 365) {
	            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
	            chunk[i++] = 0xD800 + (t >> 10);
	            chunk[i++] = 0xDC00 + (t & 1023);
	        } else
	            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
	        if (i > 8191) {
	            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
	            i = 0;
	        }
	    }
	    if (parts) {
	        if (i)
	            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
	        return parts.join("");
	    }
	    return String.fromCharCode.apply(String, chunk.slice(0, i));
	};

	/**
	 * Writes a string as UTF8 bytes.
	 * @param {string} string Source string
	 * @param {Uint8Array} buffer Destination buffer
	 * @param {number} offset Destination offset
	 * @returns {number} Bytes written
	 */
	utf8.write = function utf8_write(string, buffer, offset) {
	    var start = offset,
	        c1, // character 1
	        c2; // character 2
	    for (var i = 0; i < string.length; ++i) {
	        c1 = string.charCodeAt(i);
	        if (c1 < 128) {
	            buffer[offset++] = c1;
	        } else if (c1 < 2048) {
	            buffer[offset++] = c1 >> 6       | 192;
	            buffer[offset++] = c1       & 63 | 128;
	        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
	            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
	            ++i;
	            buffer[offset++] = c1 >> 18      | 240;
	            buffer[offset++] = c1 >> 12 & 63 | 128;
	            buffer[offset++] = c1 >> 6  & 63 | 128;
	            buffer[offset++] = c1       & 63 | 128;
	        } else {
	            buffer[offset++] = c1 >> 12      | 224;
	            buffer[offset++] = c1 >> 6  & 63 | 128;
	            buffer[offset++] = c1       & 63 | 128;
	        }
	    }
	    return offset - start;
	};
	});

	var pool_1 = pool;

	/**
	 * An allocator as used by {@link util.pool}.
	 * @typedef PoolAllocator
	 * @type {function}
	 * @param {number} size Buffer size
	 * @returns {Uint8Array} Buffer
	 */

	/**
	 * A slicer as used by {@link util.pool}.
	 * @typedef PoolSlicer
	 * @type {function}
	 * @param {number} start Start offset
	 * @param {number} end End offset
	 * @returns {Uint8Array} Buffer slice
	 * @this {Uint8Array}
	 */

	/**
	 * A general purpose buffer pool.
	 * @memberof util
	 * @function
	 * @param {PoolAllocator} alloc Allocator
	 * @param {PoolSlicer} slice Slicer
	 * @param {number} [size=8192] Slab size
	 * @returns {PoolAllocator} Pooled allocator
	 */
	function pool(alloc, slice, size) {
	    var SIZE   = size || 8192;
	    var MAX    = SIZE >>> 1;
	    var slab   = null;
	    var offset = SIZE;
	    return function pool_alloc(size) {
	        if (size < 1 || size > MAX)
	            return alloc(size);
	        if (offset + size > SIZE) {
	            slab = alloc(SIZE);
	            offset = 0;
	        }
	        var buf = slice.call(slab, offset, offset += size);
	        if (offset & 7) // align to 32 bit
	            offset = (offset | 7) + 1;
	        return buf;
	    };
	}

	var longbits = LongBits;



	/**
	 * Constructs new long bits.
	 * @classdesc Helper class for working with the low and high bits of a 64 bit value.
	 * @memberof util
	 * @constructor
	 * @param {number} lo Low 32 bits, unsigned
	 * @param {number} hi High 32 bits, unsigned
	 */
	function LongBits(lo, hi) {

	    // note that the casts below are theoretically unnecessary as of today, but older statically
	    // generated converter code might still call the ctor with signed 32bits. kept for compat.

	    /**
	     * Low bits.
	     * @type {number}
	     */
	    this.lo = lo >>> 0;

	    /**
	     * High bits.
	     * @type {number}
	     */
	    this.hi = hi >>> 0;
	}

	/**
	 * Zero bits.
	 * @memberof util.LongBits
	 * @type {util.LongBits}
	 */
	var zero = LongBits.zero = new LongBits(0, 0);

	zero.toNumber = function() { return 0; };
	zero.zzEncode = zero.zzDecode = function() { return this; };
	zero.length = function() { return 1; };

	/**
	 * Zero hash.
	 * @memberof util.LongBits
	 * @type {string}
	 */
	var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";

	/**
	 * Constructs new long bits from the specified number.
	 * @param {number} value Value
	 * @returns {util.LongBits} Instance
	 */
	LongBits.fromNumber = function fromNumber(value) {
	    if (value === 0)
	        return zero;
	    var sign = value < 0;
	    if (sign)
	        value = -value;
	    var lo = value >>> 0,
	        hi = (value - lo) / 4294967296 >>> 0;
	    if (sign) {
	        hi = ~hi >>> 0;
	        lo = ~lo >>> 0;
	        if (++lo > 4294967295) {
	            lo = 0;
	            if (++hi > 4294967295)
	                hi = 0;
	        }
	    }
	    return new LongBits(lo, hi);
	};

	/**
	 * Constructs new long bits from a number, long or string.
	 * @param {Long|number|string} value Value
	 * @returns {util.LongBits} Instance
	 */
	LongBits.from = function from(value) {
	    if (typeof value === "number")
	        return LongBits.fromNumber(value);
	    if (minimal.isString(value)) {
	        /* istanbul ignore else */
	        if (minimal.Long)
	            value = minimal.Long.fromString(value);
	        else
	            return LongBits.fromNumber(parseInt(value, 10));
	    }
	    return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
	};

	/**
	 * Converts this long bits to a possibly unsafe JavaScript number.
	 * @param {boolean} [unsigned=false] Whether unsigned or not
	 * @returns {number} Possibly unsafe number
	 */
	LongBits.prototype.toNumber = function toNumber(unsigned) {
	    if (!unsigned && this.hi >>> 31) {
	        var lo = ~this.lo + 1 >>> 0,
	            hi = ~this.hi     >>> 0;
	        if (!lo)
	            hi = hi + 1 >>> 0;
	        return -(lo + hi * 4294967296);
	    }
	    return this.lo + this.hi * 4294967296;
	};

	/**
	 * Converts this long bits to a long.
	 * @param {boolean} [unsigned=false] Whether unsigned or not
	 * @returns {Long} Long
	 */
	LongBits.prototype.toLong = function toLong(unsigned) {
	    return minimal.Long
	        ? new minimal.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
	        /* istanbul ignore next */
	        : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
	};

	var charCodeAt = String.prototype.charCodeAt;

	/**
	 * Constructs new long bits from the specified 8 characters long hash.
	 * @param {string} hash Hash
	 * @returns {util.LongBits} Bits
	 */
	LongBits.fromHash = function fromHash(hash) {
	    if (hash === zeroHash)
	        return zero;
	    return new LongBits(
	        ( charCodeAt.call(hash, 0)
	        | charCodeAt.call(hash, 1) << 8
	        | charCodeAt.call(hash, 2) << 16
	        | charCodeAt.call(hash, 3) << 24) >>> 0
	    ,
	        ( charCodeAt.call(hash, 4)
	        | charCodeAt.call(hash, 5) << 8
	        | charCodeAt.call(hash, 6) << 16
	        | charCodeAt.call(hash, 7) << 24) >>> 0
	    );
	};

	/**
	 * Converts this long bits to a 8 characters long hash.
	 * @returns {string} Hash
	 */
	LongBits.prototype.toHash = function toHash() {
	    return String.fromCharCode(
	        this.lo        & 255,
	        this.lo >>> 8  & 255,
	        this.lo >>> 16 & 255,
	        this.lo >>> 24      ,
	        this.hi        & 255,
	        this.hi >>> 8  & 255,
	        this.hi >>> 16 & 255,
	        this.hi >>> 24
	    );
	};

	/**
	 * Zig-zag encodes this long bits.
	 * @returns {util.LongBits} `this`
	 */
	LongBits.prototype.zzEncode = function zzEncode() {
	    var mask =   this.hi >> 31;
	    this.hi  = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
	    this.lo  = ( this.lo << 1                   ^ mask) >>> 0;
	    return this;
	};

	/**
	 * Zig-zag decodes this long bits.
	 * @returns {util.LongBits} `this`
	 */
	LongBits.prototype.zzDecode = function zzDecode() {
	    var mask = -(this.lo & 1);
	    this.lo  = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
	    this.hi  = ( this.hi >>> 1                  ^ mask) >>> 0;
	    return this;
	};

	/**
	 * Calculates the length of this longbits when encoded as a varint.
	 * @returns {number} Length
	 */
	LongBits.prototype.length = function length() {
	    var part0 =  this.lo,
	        part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
	        part2 =  this.hi >>> 24;
	    return part2 === 0
	         ? part1 === 0
	           ? part0 < 16384
	             ? part0 < 128 ? 1 : 2
	             : part0 < 2097152 ? 3 : 4
	           : part1 < 16384
	             ? part1 < 128 ? 5 : 6
	             : part1 < 2097152 ? 7 : 8
	         : part2 < 128 ? 9 : 10;
	};

	var minimal = createCommonjsModule(function (module, exports) {
	var util = exports;

	// used to return a Promise where callback is omitted
	util.asPromise = aspromise;

	// converts to / from base64 encoded strings
	util.base64 = base64_1;

	// base class of rpc.Service
	util.EventEmitter = eventemitter;

	// float handling accross browsers
	util.float = float_1;

	// requires modules optionally and hides the call from bundlers
	util.inquire = inquire_1;

	// converts to / from utf8 encoded strings
	util.utf8 = utf8_1;

	// provides a node-like buffer pool in the browser
	util.pool = pool_1;

	// utility to work with the low and high bits of a 64 bit value
	util.LongBits = longbits;

	// global object reference
	util.global = typeof window !== "undefined" && window
	           || typeof commonjsGlobal !== "undefined" && commonjsGlobal
	           || typeof self   !== "undefined" && self
	           || commonjsGlobal; // eslint-disable-line no-invalid-this

	/**
	 * An immuable empty array.
	 * @memberof util
	 * @type {Array.<*>}
	 * @const
	 */
	util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */ []; // used on prototypes

	/**
	 * An immutable empty object.
	 * @type {Object}
	 * @const
	 */
	util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */ {}; // used on prototypes

	/**
	 * Whether running within node or not.
	 * @memberof util
	 * @type {boolean}
	 * @const
	 */
	util.isNode = Boolean(util.global.process && util.global.process.versions && util.global.process.versions.node);

	/**
	 * Tests if the specified value is an integer.
	 * @function
	 * @param {*} value Value to test
	 * @returns {boolean} `true` if the value is an integer
	 */
	util.isInteger = Number.isInteger || /* istanbul ignore next */ function isInteger(value) {
	    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
	};

	/**
	 * Tests if the specified value is a string.
	 * @param {*} value Value to test
	 * @returns {boolean} `true` if the value is a string
	 */
	util.isString = function isString(value) {
	    return typeof value === "string" || value instanceof String;
	};

	/**
	 * Tests if the specified value is a non-null object.
	 * @param {*} value Value to test
	 * @returns {boolean} `true` if the value is a non-null object
	 */
	util.isObject = function isObject(value) {
	    return value && typeof value === "object";
	};

	/**
	 * Checks if a property on a message is considered to be present.
	 * This is an alias of {@link util.isSet}.
	 * @function
	 * @param {Object} obj Plain object or message instance
	 * @param {string} prop Property name
	 * @returns {boolean} `true` if considered to be present, otherwise `false`
	 */
	util.isset =

	/**
	 * Checks if a property on a message is considered to be present.
	 * @param {Object} obj Plain object or message instance
	 * @param {string} prop Property name
	 * @returns {boolean} `true` if considered to be present, otherwise `false`
	 */
	util.isSet = function isSet(obj, prop) {
	    var value = obj[prop];
	    if (value != null && obj.hasOwnProperty(prop)) // eslint-disable-line eqeqeq, no-prototype-builtins
	        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
	    return false;
	};

	/**
	 * Any compatible Buffer instance.
	 * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
	 * @interface Buffer
	 * @extends Uint8Array
	 */

	/**
	 * Node's Buffer class if available.
	 * @type {Constructor<Buffer>}
	 */
	util.Buffer = (function() {
	    try {
	        var Buffer = util.inquire("buffer").Buffer;
	        // refuse to use non-node buffers if not explicitly assigned (perf reasons):
	        return Buffer.prototype.utf8Write ? Buffer : /* istanbul ignore next */ null;
	    } catch (e) {
	        /* istanbul ignore next */
	        return null;
	    }
	})();

	// Internal alias of or polyfull for Buffer.from.
	util._Buffer_from = null;

	// Internal alias of or polyfill for Buffer.allocUnsafe.
	util._Buffer_allocUnsafe = null;

	/**
	 * Creates a new buffer of whatever type supported by the environment.
	 * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
	 * @returns {Uint8Array|Buffer} Buffer
	 */
	util.newBuffer = function newBuffer(sizeOrArray) {
	    /* istanbul ignore next */
	    return typeof sizeOrArray === "number"
	        ? util.Buffer
	            ? util._Buffer_allocUnsafe(sizeOrArray)
	            : new util.Array(sizeOrArray)
	        : util.Buffer
	            ? util._Buffer_from(sizeOrArray)
	            : typeof Uint8Array === "undefined"
	                ? sizeOrArray
	                : new Uint8Array(sizeOrArray);
	};

	/**
	 * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
	 * @type {Constructor<Uint8Array>}
	 */
	util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */ : Array;

	/**
	 * Any compatible Long instance.
	 * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
	 * @interface Long
	 * @property {number} low Low bits
	 * @property {number} high High bits
	 * @property {boolean} unsigned Whether unsigned or not
	 */

	/**
	 * Long.js's Long class if available.
	 * @type {Constructor<Long>}
	 */
	util.Long = /* istanbul ignore next */ util.global.dcodeIO && /* istanbul ignore next */ util.global.dcodeIO.Long
	         || /* istanbul ignore next */ util.global.Long
	         || util.inquire("long");

	/**
	 * Regular expression used to verify 2 bit (`bool`) map keys.
	 * @type {RegExp}
	 * @const
	 */
	util.key2Re = /^true|false|0|1$/;

	/**
	 * Regular expression used to verify 32 bit (`int32` etc.) map keys.
	 * @type {RegExp}
	 * @const
	 */
	util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;

	/**
	 * Regular expression used to verify 64 bit (`int64` etc.) map keys.
	 * @type {RegExp}
	 * @const
	 */
	util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;

	/**
	 * Converts a number or long to an 8 characters long hash string.
	 * @param {Long|number} value Value to convert
	 * @returns {string} Hash
	 */
	util.longToHash = function longToHash(value) {
	    return value
	        ? util.LongBits.from(value).toHash()
	        : util.LongBits.zeroHash;
	};

	/**
	 * Converts an 8 characters long hash string to a long or number.
	 * @param {string} hash Hash
	 * @param {boolean} [unsigned=false] Whether unsigned or not
	 * @returns {Long|number} Original value
	 */
	util.longFromHash = function longFromHash(hash, unsigned) {
	    var bits = util.LongBits.fromHash(hash);
	    if (util.Long)
	        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
	    return bits.toNumber(Boolean(unsigned));
	};

	/**
	 * Merges the properties of the source object into the destination object.
	 * @memberof util
	 * @param {Object.<string,*>} dst Destination object
	 * @param {Object.<string,*>} src Source object
	 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
	 * @returns {Object.<string,*>} Destination object
	 */
	function merge(dst, src, ifNotSet) { // used by converters
	    for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
	        if (dst[keys[i]] === undefined || !ifNotSet)
	            dst[keys[i]] = src[keys[i]];
	    return dst;
	}

	util.merge = merge;

	/**
	 * Converts the first character of a string to lower case.
	 * @param {string} str String to convert
	 * @returns {string} Converted string
	 */
	util.lcFirst = function lcFirst(str) {
	    return str.charAt(0).toLowerCase() + str.substring(1);
	};

	/**
	 * Creates a custom error constructor.
	 * @memberof util
	 * @param {string} name Error name
	 * @returns {Constructor<Error>} Custom error constructor
	 */
	function newError(name) {

	    function CustomError(message, properties) {

	        if (!(this instanceof CustomError))
	            return new CustomError(message, properties);

	        // Error.call(this, message);
	        // ^ just returns a new error instance because the ctor can be called as a function

	        Object.defineProperty(this, "message", { get: function() { return message; } });

	        /* istanbul ignore next */
	        if (Error.captureStackTrace) // node
	            Error.captureStackTrace(this, CustomError);
	        else
	            Object.defineProperty(this, "stack", { value: (new Error()).stack || "" });

	        if (properties)
	            merge(this, properties);
	    }

	    (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;

	    Object.defineProperty(CustomError.prototype, "name", { get: function() { return name; } });

	    CustomError.prototype.toString = function toString() {
	        return this.name + ": " + this.message;
	    };

	    return CustomError;
	}

	util.newError = newError;

	/**
	 * Constructs a new protocol error.
	 * @classdesc Error subclass indicating a protocol specifc error.
	 * @memberof util
	 * @extends Error
	 * @template T extends Message<T>
	 * @constructor
	 * @param {string} message Error message
	 * @param {Object.<string,*>} [properties] Additional properties
	 * @example
	 * try {
	 *     MyMessage.decode(someBuffer); // throws if required fields are missing
	 * } catch (e) {
	 *     if (e instanceof ProtocolError && e.instance)
	 *         console.log("decoded so far: " + JSON.stringify(e.instance));
	 * }
	 */
	util.ProtocolError = newError("ProtocolError");

	/**
	 * So far decoded message instance.
	 * @name util.ProtocolError#instance
	 * @type {Message<T>}
	 */

	/**
	 * A OneOf getter as returned by {@link util.oneOfGetter}.
	 * @typedef OneOfGetter
	 * @type {function}
	 * @returns {string|undefined} Set field name, if any
	 */

	/**
	 * Builds a getter for a oneof's present field name.
	 * @param {string[]} fieldNames Field names
	 * @returns {OneOfGetter} Unbound getter
	 */
	util.oneOfGetter = function getOneOf(fieldNames) {
	    var fieldMap = {};
	    for (var i = 0; i < fieldNames.length; ++i)
	        fieldMap[fieldNames[i]] = 1;

	    /**
	     * @returns {string|undefined} Set field name, if any
	     * @this Object
	     * @ignore
	     */
	    return function() { // eslint-disable-line consistent-return
	        for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)
	            if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null)
	                return keys[i];
	    };
	};

	/**
	 * A OneOf setter as returned by {@link util.oneOfSetter}.
	 * @typedef OneOfSetter
	 * @type {function}
	 * @param {string|undefined} value Field name
	 * @returns {undefined}
	 */

	/**
	 * Builds a setter for a oneof's present field name.
	 * @param {string[]} fieldNames Field names
	 * @returns {OneOfSetter} Unbound setter
	 */
	util.oneOfSetter = function setOneOf(fieldNames) {

	    /**
	     * @param {string} name Field name
	     * @returns {undefined}
	     * @this Object
	     * @ignore
	     */
	    return function(name) {
	        for (var i = 0; i < fieldNames.length; ++i)
	            if (fieldNames[i] !== name)
	                delete this[fieldNames[i]];
	    };
	};

	/**
	 * Default conversion options used for {@link Message#toJSON} implementations.
	 *
	 * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
	 *
	 * - Longs become strings
	 * - Enums become string keys
	 * - Bytes become base64 encoded strings
	 * - (Sub-)Messages become plain objects
	 * - Maps become plain objects with all string keys
	 * - Repeated fields become arrays
	 * - NaN and Infinity for float and double fields become strings
	 *
	 * @type {IConversionOptions}
	 * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
	 */
	util.toJSONOptions = {
	    longs: String,
	    enums: String,
	    bytes: String,
	    json: true
	};

	// Sets up buffer utility according to the environment (called in index-minimal)
	util._configure = function() {
	    var Buffer = util.Buffer;
	    /* istanbul ignore if */
	    if (!Buffer) {
	        util._Buffer_from = util._Buffer_allocUnsafe = null;
	        return;
	    }
	    // because node 4.x buffers are incompatible & immutable
	    // see: https://github.com/dcodeIO/protobuf.js/pull/665
	    util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from ||
	        /* istanbul ignore next */
	        function Buffer_from(value, encoding) {
	            return new Buffer(value, encoding);
	        };
	    util._Buffer_allocUnsafe = Buffer.allocUnsafe ||
	        /* istanbul ignore next */
	        function Buffer_allocUnsafe(size) {
	            return new Buffer(size);
	        };
	};
	});

	var writer = Writer;



	var BufferWriter; // cyclic

	var LongBits$1  = minimal.LongBits,
	    base64    = minimal.base64,
	    utf8      = minimal.utf8;

	/**
	 * Constructs a new writer operation instance.
	 * @classdesc Scheduled writer operation.
	 * @constructor
	 * @param {function(*, Uint8Array, number)} fn Function to call
	 * @param {number} len Value byte length
	 * @param {*} val Value to write
	 * @ignore
	 */
	function Op(fn, len, val) {

	    /**
	     * Function to call.
	     * @type {function(Uint8Array, number, *)}
	     */
	    this.fn = fn;

	    /**
	     * Value byte length.
	     * @type {number}
	     */
	    this.len = len;

	    /**
	     * Next operation.
	     * @type {Writer.Op|undefined}
	     */
	    this.next = undefined;

	    /**
	     * Value to write.
	     * @type {*}
	     */
	    this.val = val; // type varies
	}

	/* istanbul ignore next */
	function noop() {} // eslint-disable-line no-empty-function

	/**
	 * Constructs a new writer state instance.
	 * @classdesc Copied writer state.
	 * @memberof Writer
	 * @constructor
	 * @param {Writer} writer Writer to copy state from
	 * @ignore
	 */
	function State(writer) {

	    /**
	     * Current head.
	     * @type {Writer.Op}
	     */
	    this.head = writer.head;

	    /**
	     * Current tail.
	     * @type {Writer.Op}
	     */
	    this.tail = writer.tail;

	    /**
	     * Current buffer length.
	     * @type {number}
	     */
	    this.len = writer.len;

	    /**
	     * Next state.
	     * @type {State|null}
	     */
	    this.next = writer.states;
	}

	/**
	 * Constructs a new writer instance.
	 * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
	 * @constructor
	 */
	function Writer() {

	    /**
	     * Current length.
	     * @type {number}
	     */
	    this.len = 0;

	    /**
	     * Operations head.
	     * @type {Object}
	     */
	    this.head = new Op(noop, 0, 0);

	    /**
	     * Operations tail
	     * @type {Object}
	     */
	    this.tail = this.head;

	    /**
	     * Linked forked states.
	     * @type {Object|null}
	     */
	    this.states = null;

	    // When a value is written, the writer calculates its byte length and puts it into a linked
	    // list of operations to perform when finish() is called. This both allows us to allocate
	    // buffers of the exact required size and reduces the amount of work we have to do compared
	    // to first calculating over objects and then encoding over objects. In our case, the encoding
	    // part is just a linked list walk calling operations with already prepared values.
	}

	/**
	 * Creates a new writer.
	 * @function
	 * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
	 */
	Writer.create = minimal.Buffer
	    ? function create_buffer_setup() {
	        return (Writer.create = function create_buffer() {
	            return new BufferWriter();
	        })();
	    }
	    /* istanbul ignore next */
	    : function create_array() {
	        return new Writer();
	    };

	/**
	 * Allocates a buffer of the specified size.
	 * @param {number} size Buffer size
	 * @returns {Uint8Array} Buffer
	 */
	Writer.alloc = function alloc(size) {
	    return new minimal.Array(size);
	};

	// Use Uint8Array buffer pool in the browser, just like node does with buffers
	/* istanbul ignore else */
	if (minimal.Array !== Array)
	    Writer.alloc = minimal.pool(Writer.alloc, minimal.Array.prototype.subarray);

	/**
	 * Pushes a new operation to the queue.
	 * @param {function(Uint8Array, number, *)} fn Function to call
	 * @param {number} len Value byte length
	 * @param {number} val Value to write
	 * @returns {Writer} `this`
	 * @private
	 */
	Writer.prototype._push = function push(fn, len, val) {
	    this.tail = this.tail.next = new Op(fn, len, val);
	    this.len += len;
	    return this;
	};

	function writeByte(val, buf, pos) {
	    buf[pos] = val & 255;
	}

	function writeVarint32(val, buf, pos) {
	    while (val > 127) {
	        buf[pos++] = val & 127 | 128;
	        val >>>= 7;
	    }
	    buf[pos] = val;
	}

	/**
	 * Constructs a new varint writer operation instance.
	 * @classdesc Scheduled varint writer operation.
	 * @extends Op
	 * @constructor
	 * @param {number} len Value byte length
	 * @param {number} val Value to write
	 * @ignore
	 */
	function VarintOp(len, val) {
	    this.len = len;
	    this.next = undefined;
	    this.val = val;
	}

	VarintOp.prototype = Object.create(Op.prototype);
	VarintOp.prototype.fn = writeVarint32;

	/**
	 * Writes an unsigned 32 bit value as a varint.
	 * @param {number} value Value to write
	 * @returns {Writer} `this`
	 */
	Writer.prototype.uint32 = function write_uint32(value) {
	    // here, the call to this.push has been inlined and a varint specific Op subclass is used.
	    // uint32 is by far the most frequently used operation and benefits significantly from this.
	    this.len += (this.tail = this.tail.next = new VarintOp(
	        (value = value >>> 0)
	                < 128       ? 1
	        : value < 16384     ? 2
	        : value < 2097152   ? 3
	        : value < 268435456 ? 4
	        :                     5,
	    value)).len;
	    return this;
	};

	/**
	 * Writes a signed 32 bit value as a varint.
	 * @function
	 * @param {number} value Value to write
	 * @returns {Writer} `this`
	 */
	Writer.prototype.int32 = function write_int32(value) {
	    return value < 0
	        ? this._push(writeVarint64, 10, LongBits$1.fromNumber(value)) // 10 bytes per spec
	        : this.uint32(value);
	};

	/**
	 * Writes a 32 bit value as a varint, zig-zag encoded.
	 * @param {number} value Value to write
	 * @returns {Writer} `this`
	 */
	Writer.prototype.sint32 = function write_sint32(value) {
	    return this.uint32((value << 1 ^ value >> 31) >>> 0);
	};

	function writeVarint64(val, buf, pos) {
	    while (val.hi) {
	        buf[pos++] = val.lo & 127 | 128;
	        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
	        val.hi >>>= 7;
	    }
	    while (val.lo > 127) {
	        buf[pos++] = val.lo & 127 | 128;
	        val.lo = val.lo >>> 7;
	    }
	    buf[pos++] = val.lo;
	}

	/**
	 * Writes an unsigned 64 bit value as a varint.
	 * @param {Long|number|string} value Value to write
	 * @returns {Writer} `this`
	 * @throws {TypeError} If `value` is a string and no long library is present.
	 */
	Writer.prototype.uint64 = function write_uint64(value) {
	    var bits = LongBits$1.from(value);
	    return this._push(writeVarint64, bits.length(), bits);
	};

	/**
	 * Writes a signed 64 bit value as a varint.
	 * @function
	 * @param {Long|number|string} value Value to write
	 * @returns {Writer} `this`
	 * @throws {TypeError} If `value` is a string and no long library is present.
	 */
	Writer.prototype.int64 = Writer.prototype.uint64;

	/**
	 * Writes a signed 64 bit value as a varint, zig-zag encoded.
	 * @param {Long|number|string} value Value to write
	 * @returns {Writer} `this`
	 * @throws {TypeError} If `value` is a string and no long library is present.
	 */
	Writer.prototype.sint64 = function write_sint64(value) {
	    var bits = LongBits$1.from(value).zzEncode();
	    return this._push(writeVarint64, bits.length(), bits);
	};

	/**
	 * Writes a boolish value as a varint.
	 * @param {boolean} value Value to write
	 * @returns {Writer} `this`
	 */
	Writer.prototype.bool = function write_bool(value) {
	    return this._push(writeByte, 1, value ? 1 : 0);
	};

	function writeFixed32(val, buf, pos) {
	    buf[pos    ] =  val         & 255;
	    buf[pos + 1] =  val >>> 8   & 255;
	    buf[pos + 2] =  val >>> 16  & 255;
	    buf[pos + 3] =  val >>> 24;
	}

	/**
	 * Writes an unsigned 32 bit value as fixed 32 bits.
	 * @param {number} value Value to write
	 * @returns {Writer} `this`
	 */
	Writer.prototype.fixed32 = function write_fixed32(value) {
	    return this._push(writeFixed32, 4, value >>> 0);
	};

	/**
	 * Writes a signed 32 bit value as fixed 32 bits.
	 * @function
	 * @param {number} value Value to write
	 * @returns {Writer} `this`
	 */
	Writer.prototype.sfixed32 = Writer.prototype.fixed32;

	/**
	 * Writes an unsigned 64 bit value as fixed 64 bits.
	 * @param {Long|number|string} value Value to write
	 * @returns {Writer} `this`
	 * @throws {TypeError} If `value` is a string and no long library is present.
	 */
	Writer.prototype.fixed64 = function write_fixed64(value) {
	    var bits = LongBits$1.from(value);
	    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
	};

	/**
	 * Writes a signed 64 bit value as fixed 64 bits.
	 * @function
	 * @param {Long|number|string} value Value to write
	 * @returns {Writer} `this`
	 * @throws {TypeError} If `value` is a string and no long library is present.
	 */
	Writer.prototype.sfixed64 = Writer.prototype.fixed64;

	/**
	 * Writes a float (32 bit).
	 * @function
	 * @param {number} value Value to write
	 * @returns {Writer} `this`
	 */
	Writer.prototype.float = function write_float(value) {
	    return this._push(minimal.float.writeFloatLE, 4, value);
	};

	/**
	 * Writes a double (64 bit float).
	 * @function
	 * @param {number} value Value to write
	 * @returns {Writer} `this`
	 */
	Writer.prototype.double = function write_double(value) {
	    return this._push(minimal.float.writeDoubleLE, 8, value);
	};

	var writeBytes = minimal.Array.prototype.set
	    ? function writeBytes_set(val, buf, pos) {
	        buf.set(val, pos); // also works for plain array values
	    }
	    /* istanbul ignore next */
	    : function writeBytes_for(val, buf, pos) {
	        for (var i = 0; i < val.length; ++i)
	            buf[pos + i] = val[i];
	    };

	/**
	 * Writes a sequence of bytes.
	 * @param {Uint8Array|string} value Buffer or base64 encoded string to write
	 * @returns {Writer} `this`
	 */
	Writer.prototype.bytes = function write_bytes(value) {
	    var len = value.length >>> 0;
	    if (!len)
	        return this._push(writeByte, 1, 0);
	    if (minimal.isString(value)) {
	        var buf = Writer.alloc(len = base64.length(value));
	        base64.decode(value, buf, 0);
	        value = buf;
	    }
	    return this.uint32(len)._push(writeBytes, len, value);
	};

	/**
	 * Writes a string.
	 * @param {string} value Value to write
	 * @returns {Writer} `this`
	 */
	Writer.prototype.string = function write_string(value) {
	    var len = utf8.length(value);
	    return len
	        ? this.uint32(len)._push(utf8.write, len, value)
	        : this._push(writeByte, 1, 0);
	};

	/**
	 * Forks this writer's state by pushing it to a stack.
	 * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
	 * @returns {Writer} `this`
	 */
	Writer.prototype.fork = function fork() {
	    this.states = new State(this);
	    this.head = this.tail = new Op(noop, 0, 0);
	    this.len = 0;
	    return this;
	};

	/**
	 * Resets this instance to the last state.
	 * @returns {Writer} `this`
	 */
	Writer.prototype.reset = function reset() {
	    if (this.states) {
	        this.head   = this.states.head;
	        this.tail   = this.states.tail;
	        this.len    = this.states.len;
	        this.states = this.states.next;
	    } else {
	        this.head = this.tail = new Op(noop, 0, 0);
	        this.len  = 0;
	    }
	    return this;
	};

	/**
	 * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
	 * @returns {Writer} `this`
	 */
	Writer.prototype.ldelim = function ldelim() {
	    var head = this.head,
	        tail = this.tail,
	        len  = this.len;
	    this.reset().uint32(len);
	    if (len) {
	        this.tail.next = head.next; // skip noop
	        this.tail = tail;
	        this.len += len;
	    }
	    return this;
	};

	/**
	 * Finishes the write operation.
	 * @returns {Uint8Array} Finished buffer
	 */
	Writer.prototype.finish = function finish() {
	    var head = this.head.next, // skip noop
	        buf  = this.constructor.alloc(this.len),
	        pos  = 0;
	    while (head) {
	        head.fn(head.val, buf, pos);
	        pos += head.len;
	        head = head.next;
	    }
	    // this.head = this.tail = null;
	    return buf;
	};

	Writer._configure = function(BufferWriter_) {
	    BufferWriter = BufferWriter_;
	};

	var writer_buffer = BufferWriter$1;

	// extends Writer

	(BufferWriter$1.prototype = Object.create(writer.prototype)).constructor = BufferWriter$1;



	var Buffer = minimal.Buffer;

	/**
	 * Constructs a new buffer writer instance.
	 * @classdesc Wire format writer using node buffers.
	 * @extends Writer
	 * @constructor
	 */
	function BufferWriter$1() {
	    writer.call(this);
	}

	/**
	 * Allocates a buffer of the specified size.
	 * @param {number} size Buffer size
	 * @returns {Buffer} Buffer
	 */
	BufferWriter$1.alloc = function alloc_buffer(size) {
	    return (BufferWriter$1.alloc = minimal._Buffer_allocUnsafe)(size);
	};

	var writeBytesBuffer = Buffer && Buffer.prototype instanceof Uint8Array && Buffer.prototype.set.name === "set"
	    ? function writeBytesBuffer_set(val, buf, pos) {
	        buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
	                           // also works for plain array values
	    }
	    /* istanbul ignore next */
	    : function writeBytesBuffer_copy(val, buf, pos) {
	        if (val.copy) // Buffer values
	            val.copy(buf, pos, 0, val.length);
	        else for (var i = 0; i < val.length;) // plain array values
	            buf[pos++] = val[i++];
	    };

	/**
	 * @override
	 */
	BufferWriter$1.prototype.bytes = function write_bytes_buffer(value) {
	    if (minimal.isString(value))
	        value = minimal._Buffer_from(value, "base64");
	    var len = value.length >>> 0;
	    this.uint32(len);
	    if (len)
	        this._push(writeBytesBuffer, len, value);
	    return this;
	};

	function writeStringBuffer(val, buf, pos) {
	    if (val.length < 40) // plain js is faster for short strings (probably due to redundant assertions)
	        minimal.utf8.write(val, buf, pos);
	    else
	        buf.utf8Write(val, pos);
	}

	/**
	 * @override
	 */
	BufferWriter$1.prototype.string = function write_string_buffer(value) {
	    var len = Buffer.byteLength(value);
	    this.uint32(len);
	    if (len)
	        this._push(writeStringBuffer, len, value);
	    return this;
	};

	var reader = Reader;



	var BufferReader; // cyclic

	var LongBits$2  = minimal.LongBits,
	    utf8$1      = minimal.utf8;

	/* istanbul ignore next */
	function indexOutOfRange(reader, writeLength) {
	    return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
	}

	/**
	 * Constructs a new reader instance using the specified buffer.
	 * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
	 * @constructor
	 * @param {Uint8Array} buffer Buffer to read from
	 */
	function Reader(buffer) {

	    /**
	     * Read buffer.
	     * @type {Uint8Array}
	     */
	    this.buf = buffer;

	    /**
	     * Read buffer position.
	     * @type {number}
	     */
	    this.pos = 0;

	    /**
	     * Read buffer length.
	     * @type {number}
	     */
	    this.len = buffer.length;
	}

	var create_array = typeof Uint8Array !== "undefined"
	    ? function create_typed_array(buffer) {
	        if (buffer instanceof Uint8Array || Array.isArray(buffer))
	            return new Reader(buffer);
	        throw Error("illegal buffer");
	    }
	    /* istanbul ignore next */
	    : function create_array(buffer) {
	        if (Array.isArray(buffer))
	            return new Reader(buffer);
	        throw Error("illegal buffer");
	    };

	/**
	 * Creates a new reader using the specified buffer.
	 * @function
	 * @param {Uint8Array|Buffer} buffer Buffer to read from
	 * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
	 * @throws {Error} If `buffer` is not a valid buffer
	 */
	Reader.create = minimal.Buffer
	    ? function create_buffer_setup(buffer) {
	        return (Reader.create = function create_buffer(buffer) {
	            return minimal.Buffer.isBuffer(buffer)
	                ? new BufferReader(buffer)
	                /* istanbul ignore next */
	                : create_array(buffer);
	        })(buffer);
	    }
	    /* istanbul ignore next */
	    : create_array;

	Reader.prototype._slice = minimal.Array.prototype.subarray || /* istanbul ignore next */ minimal.Array.prototype.slice;

	/**
	 * Reads a varint as an unsigned 32 bit value.
	 * @function
	 * @returns {number} Value read
	 */
	Reader.prototype.uint32 = (function read_uint32_setup() {
	    var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
	    return function read_uint32() {
	        value = (         this.buf[this.pos] & 127       ) >>> 0; if (this.buf[this.pos++] < 128) return value;
	        value = (value | (this.buf[this.pos] & 127) <<  7) >>> 0; if (this.buf[this.pos++] < 128) return value;
	        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0; if (this.buf[this.pos++] < 128) return value;
	        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0; if (this.buf[this.pos++] < 128) return value;
	        value = (value | (this.buf[this.pos] &  15) << 28) >>> 0; if (this.buf[this.pos++] < 128) return value;

	        /* istanbul ignore if */
	        if ((this.pos += 5) > this.len) {
	            this.pos = this.len;
	            throw indexOutOfRange(this, 10);
	        }
	        return value;
	    };
	})();

	/**
	 * Reads a varint as a signed 32 bit value.
	 * @returns {number} Value read
	 */
	Reader.prototype.int32 = function read_int32() {
	    return this.uint32() | 0;
	};

	/**
	 * Reads a zig-zag encoded varint as a signed 32 bit value.
	 * @returns {number} Value read
	 */
	Reader.prototype.sint32 = function read_sint32() {
	    var value = this.uint32();
	    return value >>> 1 ^ -(value & 1) | 0;
	};

	/* eslint-disable no-invalid-this */

	function readLongVarint() {
	    // tends to deopt with local vars for octet etc.
	    var bits = new LongBits$2(0, 0);
	    var i = 0;
	    if (this.len - this.pos > 4) { // fast route (lo)
	        for (; i < 4; ++i) {
	            // 1st..4th
	            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
	            if (this.buf[this.pos++] < 128)
	                return bits;
	        }
	        // 5th
	        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
	        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >>  4) >>> 0;
	        if (this.buf[this.pos++] < 128)
	            return bits;
	        i = 0;
	    } else {
	        for (; i < 3; ++i) {
	            /* istanbul ignore if */
	            if (this.pos >= this.len)
	                throw indexOutOfRange(this);
	            // 1st..3th
	            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
	            if (this.buf[this.pos++] < 128)
	                return bits;
	        }
	        // 4th
	        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
	        return bits;
	    }
	    if (this.len - this.pos > 4) { // fast route (hi)
	        for (; i < 5; ++i) {
	            // 6th..10th
	            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
	            if (this.buf[this.pos++] < 128)
	                return bits;
	        }
	    } else {
	        for (; i < 5; ++i) {
	            /* istanbul ignore if */
	            if (this.pos >= this.len)
	                throw indexOutOfRange(this);
	            // 6th..10th
	            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
	            if (this.buf[this.pos++] < 128)
	                return bits;
	        }
	    }
	    /* istanbul ignore next */
	    throw Error("invalid varint encoding");
	}

	/* eslint-enable no-invalid-this */

	/**
	 * Reads a varint as a signed 64 bit value.
	 * @name Reader#int64
	 * @function
	 * @returns {Long} Value read
	 */

	/**
	 * Reads a varint as an unsigned 64 bit value.
	 * @name Reader#uint64
	 * @function
	 * @returns {Long} Value read
	 */

	/**
	 * Reads a zig-zag encoded varint as a signed 64 bit value.
	 * @name Reader#sint64
	 * @function
	 * @returns {Long} Value read
	 */

	/**
	 * Reads a varint as a boolean.
	 * @returns {boolean} Value read
	 */
	Reader.prototype.bool = function read_bool() {
	    return this.uint32() !== 0;
	};

	function readFixed32_end(buf, end) { // note that this uses `end`, not `pos`
	    return (buf[end - 4]
	          | buf[end - 3] << 8
	          | buf[end - 2] << 16
	          | buf[end - 1] << 24) >>> 0;
	}

	/**
	 * Reads fixed 32 bits as an unsigned 32 bit integer.
	 * @returns {number} Value read
	 */
	Reader.prototype.fixed32 = function read_fixed32() {

	    /* istanbul ignore if */
	    if (this.pos + 4 > this.len)
	        throw indexOutOfRange(this, 4);

	    return readFixed32_end(this.buf, this.pos += 4);
	};

	/**
	 * Reads fixed 32 bits as a signed 32 bit integer.
	 * @returns {number} Value read
	 */
	Reader.prototype.sfixed32 = function read_sfixed32() {

	    /* istanbul ignore if */
	    if (this.pos + 4 > this.len)
	        throw indexOutOfRange(this, 4);

	    return readFixed32_end(this.buf, this.pos += 4) | 0;
	};

	/* eslint-disable no-invalid-this */

	function readFixed64(/* this: Reader */) {

	    /* istanbul ignore if */
	    if (this.pos + 8 > this.len)
	        throw indexOutOfRange(this, 8);

	    return new LongBits$2(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
	}

	/* eslint-enable no-invalid-this */

	/**
	 * Reads fixed 64 bits.
	 * @name Reader#fixed64
	 * @function
	 * @returns {Long} Value read
	 */

	/**
	 * Reads zig-zag encoded fixed 64 bits.
	 * @name Reader#sfixed64
	 * @function
	 * @returns {Long} Value read
	 */

	/**
	 * Reads a float (32 bit) as a number.
	 * @function
	 * @returns {number} Value read
	 */
	Reader.prototype.float = function read_float() {

	    /* istanbul ignore if */
	    if (this.pos + 4 > this.len)
	        throw indexOutOfRange(this, 4);

	    var value = minimal.float.readFloatLE(this.buf, this.pos);
	    this.pos += 4;
	    return value;
	};

	/**
	 * Reads a double (64 bit float) as a number.
	 * @function
	 * @returns {number} Value read
	 */
	Reader.prototype.double = function read_double() {

	    /* istanbul ignore if */
	    if (this.pos + 8 > this.len)
	        throw indexOutOfRange(this, 4);

	    var value = minimal.float.readDoubleLE(this.buf, this.pos);
	    this.pos += 8;
	    return value;
	};

	/**
	 * Reads a sequence of bytes preceeded by its length as a varint.
	 * @returns {Uint8Array} Value read
	 */
	Reader.prototype.bytes = function read_bytes() {
	    var length = this.uint32(),
	        start  = this.pos,
	        end    = this.pos + length;

	    /* istanbul ignore if */
	    if (end > this.len)
	        throw indexOutOfRange(this, length);

	    this.pos += length;
	    if (Array.isArray(this.buf)) // plain array
	        return this.buf.slice(start, end);
	    return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
	        ? new this.buf.constructor(0)
	        : this._slice.call(this.buf, start, end);
	};

	/**
	 * Reads a string preceeded by its byte length as a varint.
	 * @returns {string} Value read
	 */
	Reader.prototype.string = function read_string() {
	    var bytes = this.bytes();
	    return utf8$1.read(bytes, 0, bytes.length);
	};

	/**
	 * Skips the specified number of bytes if specified, otherwise skips a varint.
	 * @param {number} [length] Length if known, otherwise a varint is assumed
	 * @returns {Reader} `this`
	 */
	Reader.prototype.skip = function skip(length) {
	    if (typeof length === "number") {
	        /* istanbul ignore if */
	        if (this.pos + length > this.len)
	            throw indexOutOfRange(this, length);
	        this.pos += length;
	    } else {
	        do {
	            /* istanbul ignore if */
	            if (this.pos >= this.len)
	                throw indexOutOfRange(this);
	        } while (this.buf[this.pos++] & 128);
	    }
	    return this;
	};

	/**
	 * Skips the next element of the specified wire type.
	 * @param {number} wireType Wire type received
	 * @returns {Reader} `this`
	 */
	Reader.prototype.skipType = function(wireType) {
	    switch (wireType) {
	        case 0:
	            this.skip();
	            break;
	        case 1:
	            this.skip(8);
	            break;
	        case 2:
	            this.skip(this.uint32());
	            break;
	        case 3:
	            while ((wireType = this.uint32() & 7) !== 4) {
	                this.skipType(wireType);
	            }
	            break;
	        case 5:
	            this.skip(4);
	            break;

	        /* istanbul ignore next */
	        default:
	            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
	    }
	    return this;
	};

	Reader._configure = function(BufferReader_) {
	    BufferReader = BufferReader_;

	    var fn = minimal.Long ? "toLong" : /* istanbul ignore next */ "toNumber";
	    minimal.merge(Reader.prototype, {

	        int64: function read_int64() {
	            return readLongVarint.call(this)[fn](false);
	        },

	        uint64: function read_uint64() {
	            return readLongVarint.call(this)[fn](true);
	        },

	        sint64: function read_sint64() {
	            return readLongVarint.call(this).zzDecode()[fn](false);
	        },

	        fixed64: function read_fixed64() {
	            return readFixed64.call(this)[fn](true);
	        },

	        sfixed64: function read_sfixed64() {
	            return readFixed64.call(this)[fn](false);
	        }

	    });
	};

	var reader_buffer = BufferReader$1;

	// extends Reader

	(BufferReader$1.prototype = Object.create(reader.prototype)).constructor = BufferReader$1;



	/**
	 * Constructs a new buffer reader instance.
	 * @classdesc Wire format reader using node buffers.
	 * @extends Reader
	 * @constructor
	 * @param {Buffer} buffer Buffer to read from
	 */
	function BufferReader$1(buffer) {
	    reader.call(this, buffer);

	    /**
	     * Read buffer.
	     * @name BufferReader#buf
	     * @type {Buffer}
	     */
	}

	/* istanbul ignore else */
	if (minimal.Buffer)
	    BufferReader$1.prototype._slice = minimal.Buffer.prototype.slice;

	/**
	 * @override
	 */
	BufferReader$1.prototype.string = function read_string_buffer() {
	    var len = this.uint32(); // modifies pos
	    return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len));
	};

	var service = Service;



	// Extends EventEmitter
	(Service.prototype = Object.create(minimal.EventEmitter.prototype)).constructor = Service;

	/**
	 * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
	 *
	 * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
	 * @typedef rpc.ServiceMethodCallback
	 * @template TRes extends Message<TRes>
	 * @type {function}
	 * @param {Error|null} error Error, if any
	 * @param {TRes} [response] Response message
	 * @returns {undefined}
	 */

	/**
	 * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
	 * @typedef rpc.ServiceMethod
	 * @template TReq extends Message<TReq>
	 * @template TRes extends Message<TRes>
	 * @type {function}
	 * @param {TReq|Properties<TReq>} request Request message or plain object
	 * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
	 * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
	 */

	/**
	 * Constructs a new RPC service instance.
	 * @classdesc An RPC service as returned by {@link Service#create}.
	 * @exports rpc.Service
	 * @extends util.EventEmitter
	 * @constructor
	 * @param {RPCImpl} rpcImpl RPC implementation
	 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
	 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
	 */
	function Service(rpcImpl, requestDelimited, responseDelimited) {

	    if (typeof rpcImpl !== "function")
	        throw TypeError("rpcImpl must be a function");

	    minimal.EventEmitter.call(this);

	    /**
	     * RPC implementation. Becomes `null` once the service is ended.
	     * @type {RPCImpl|null}
	     */
	    this.rpcImpl = rpcImpl;

	    /**
	     * Whether requests are length-delimited.
	     * @type {boolean}
	     */
	    this.requestDelimited = Boolean(requestDelimited);

	    /**
	     * Whether responses are length-delimited.
	     * @type {boolean}
	     */
	    this.responseDelimited = Boolean(responseDelimited);
	}

	/**
	 * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
	 * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
	 * @param {Constructor<TReq>} requestCtor Request constructor
	 * @param {Constructor<TRes>} responseCtor Response constructor
	 * @param {TReq|Properties<TReq>} request Request message or plain object
	 * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
	 * @returns {undefined}
	 * @template TReq extends Message<TReq>
	 * @template TRes extends Message<TRes>
	 */
	Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {

	    if (!request)
	        throw TypeError("request must be specified");

	    var self = this;
	    if (!callback)
	        return minimal.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);

	    if (!self.rpcImpl) {
	        setTimeout(function() { callback(Error("already ended")); }, 0);
	        return undefined;
	    }

	    try {
	        return self.rpcImpl(
	            method,
	            requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
	            function rpcCallback(err, response) {

	                if (err) {
	                    self.emit("error", err, method);
	                    return callback(err);
	                }

	                if (response === null) {
	                    self.end(/* endedByRPC */ true);
	                    return undefined;
	                }

	                if (!(response instanceof responseCtor)) {
	                    try {
	                        response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
	                    } catch (err) {
	                        self.emit("error", err, method);
	                        return callback(err);
	                    }
	                }

	                self.emit("data", response, method);
	                return callback(null, response);
	            }
	        );
	    } catch (err) {
	        self.emit("error", err, method);
	        setTimeout(function() { callback(err); }, 0);
	        return undefined;
	    }
	};

	/**
	 * Ends this service and emits the `end` event.
	 * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
	 * @returns {rpc.Service} `this`
	 */
	Service.prototype.end = function end(endedByRPC) {
	    if (this.rpcImpl) {
	        if (!endedByRPC) // signal end to rpcImpl
	            this.rpcImpl(null, null, null);
	        this.rpcImpl = null;
	        this.emit("end").off();
	    }
	    return this;
	};

	var rpc_1 = createCommonjsModule(function (module, exports) {

	/**
	 * Streaming RPC helpers.
	 * @namespace
	 */
	var rpc = exports;

	/**
	 * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
	 * @typedef RPCImpl
	 * @type {function}
	 * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
	 * @param {Uint8Array} requestData Request data
	 * @param {RPCImplCallback} callback Callback function
	 * @returns {undefined}
	 * @example
	 * function rpcImpl(method, requestData, callback) {
	 *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
	 *         throw Error("no such method");
	 *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
	 *         callback(err, responseData);
	 *     });
	 * }
	 */

	/**
	 * Node-style callback as used by {@link RPCImpl}.
	 * @typedef RPCImplCallback
	 * @type {function}
	 * @param {Error|null} error Error, if any, otherwise `null`
	 * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
	 * @returns {undefined}
	 */

	rpc.Service = service;
	});

	var roots = {};

	var indexMinimal = createCommonjsModule(function (module, exports) {
	var protobuf = exports;

	/**
	 * Build type, one of `"full"`, `"light"` or `"minimal"`.
	 * @name build
	 * @type {string}
	 * @const
	 */
	protobuf.build = "minimal";

	// Serialization
	protobuf.Writer       = writer;
	protobuf.BufferWriter = writer_buffer;
	protobuf.Reader       = reader;
	protobuf.BufferReader = reader_buffer;

	// Utility
	protobuf.util         = minimal;
	protobuf.rpc          = rpc_1;
	protobuf.roots        = roots;
	protobuf.configure    = configure;

	/* istanbul ignore next */
	/**
	 * Reconfigures the library according to the environment.
	 * @returns {undefined}
	 */
	function configure() {
	    protobuf.Reader._configure(protobuf.BufferReader);
	    protobuf.util._configure();
	}

	// Set up buffer utility according to the environment
	protobuf.Writer._configure(protobuf.BufferWriter);
	configure();
	});

	var minimal$1 = indexMinimal;

	// Common aliases
	var $Reader = minimal$1.Reader, $Writer = minimal$1.Writer, $util = minimal$1.util;
	// Exported root namespace
	var $root = minimal$1.roots["default"] || (minimal$1.roots["default"] = {});
	$root.base = (function () {
	    /**
	     * Namespace base.
	     * @exports base
	     * @namespace
	     */
	    var base = {};
	    /**
	     * MessageID enum.
	     * @name base.MessageID
	     * @enum {string}
	     * @property {number} Start=10000 Start value
	     */
	    base.MessageID = (function () {
	        var valuesById = {}, values = Object.create(valuesById);
	        values[valuesById[10000] = "Start"] = 10000;
	        return values;
	    })();
	    base.UberMessage = (function () {
	        /**
	         * Properties of an UberMessage.
	         * @memberof base
	         * @interface IUberMessage
	         * @property {Array.<Uint8Array>|null} [subMessages] UberMessage subMessages
	         */
	        /**
	         * Constructs a new UberMessage.
	         * @memberof base
	         * @classdesc Represents an UberMessage.
	         * @implements IUberMessage
	         * @constructor
	         * @param {base.IUberMessage=} [properties] Properties to set
	         */
	        function UberMessage(properties) {
	            this.subMessages = [];
	            if (properties)
	                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
	                    if (properties[keys[i]] != null)
	                        this[keys[i]] = properties[keys[i]];
	        }
	        /**
	         * UberMessage subMessages.
	         * @member {Array.<Uint8Array>} subMessages
	         * @memberof base.UberMessage
	         * @instance
	         */
	        UberMessage.prototype.subMessages = $util.emptyArray;
	        /**
	         * Creates a new UberMessage instance using the specified properties.
	         * @function create
	         * @memberof base.UberMessage
	         * @static
	         * @param {base.IUberMessage=} [properties] Properties to set
	         * @returns {base.UberMessage} UberMessage instance
	         */
	        UberMessage.create = function create(properties) {
	            return new UberMessage(properties);
	        };
	        /**
	         * Encodes the specified UberMessage message. Does not implicitly {@link base.UberMessage.verify|verify} messages.
	         * @function encode
	         * @memberof base.UberMessage
	         * @static
	         * @param {base.IUberMessage} message UberMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        UberMessage.encode = function encode(message, writer) {
	            if (!writer)
	                writer = $Writer.create();
	            if (message.subMessages != null && message.subMessages.length)
	                for (var i = 0; i < message.subMessages.length; ++i)
	                    writer.uint32(/* id 1, wireType 2 =*/ 10).bytes(message.subMessages[i]);
	            return writer;
	        };
	        /**
	         * Encodes the specified UberMessage message, length delimited. Does not implicitly {@link base.UberMessage.verify|verify} messages.
	         * @function encodeDelimited
	         * @memberof base.UberMessage
	         * @static
	         * @param {base.IUberMessage} message UberMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        UberMessage.encodeDelimited = function encodeDelimited(message, writer) {
	            return this.encode(message, writer).ldelim();
	        };
	        /**
	         * Decodes an UberMessage message from the specified reader or buffer.
	         * @function decode
	         * @memberof base.UberMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @param {number} [length] Message length if known beforehand
	         * @returns {base.UberMessage} UberMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        UberMessage.decode = function decode(reader, length) {
	            if (!(reader instanceof $Reader))
	                reader = $Reader.create(reader);
	            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.UberMessage();
	            while (reader.pos < end) {
	                var tag = reader.uint32();
	                switch (tag >>> 3) {
	                    case 1:
	                        if (!(message.subMessages && message.subMessages.length))
	                            message.subMessages = [];
	                        message.subMessages.push(reader.bytes());
	                        break;
	                    default:
	                        reader.skipType(tag & 7);
	                        break;
	                }
	            }
	            return message;
	        };
	        /**
	         * Decodes an UberMessage message from the specified reader or buffer, length delimited.
	         * @function decodeDelimited
	         * @memberof base.UberMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @returns {base.UberMessage} UberMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        UberMessage.decodeDelimited = function decodeDelimited(reader) {
	            if (!(reader instanceof $Reader))
	                reader = new $Reader(reader);
	            return this.decode(reader, reader.uint32());
	        };
	        /**
	         * Verifies an UberMessage message.
	         * @function verify
	         * @memberof base.UberMessage
	         * @static
	         * @param {Object.<string,*>} message Plain object to verify
	         * @returns {string|null} `null` if valid, otherwise the reason why it is not
	         */
	        UberMessage.verify = function verify(message) {
	            if (typeof message !== "object" || message === null)
	                return "object expected";
	            if (message.subMessages != null && message.hasOwnProperty("subMessages")) {
	                if (!Array.isArray(message.subMessages))
	                    return "subMessages: array expected";
	                for (var i = 0; i < message.subMessages.length; ++i)
	                    if (!(message.subMessages[i] && typeof message.subMessages[i].length === "number" || $util.isString(message.subMessages[i])))
	                        return "subMessages: buffer[] expected";
	            }
	            return null;
	        };
	        /**
	         * Creates an UberMessage message from a plain object. Also converts values to their respective internal types.
	         * @function fromObject
	         * @memberof base.UberMessage
	         * @static
	         * @param {Object.<string,*>} object Plain object
	         * @returns {base.UberMessage} UberMessage
	         */
	        UberMessage.fromObject = function fromObject(object) {
	            if (object instanceof $root.base.UberMessage)
	                return object;
	            var message = new $root.base.UberMessage();
	            if (object.subMessages) {
	                if (!Array.isArray(object.subMessages))
	                    throw TypeError(".base.UberMessage.subMessages: array expected");
	                message.subMessages = [];
	                for (var i = 0; i < object.subMessages.length; ++i)
	                    if (typeof object.subMessages[i] === "string")
	                        $util.base64.decode(object.subMessages[i], message.subMessages[i] = $util.newBuffer($util.base64.length(object.subMessages[i])), 0);
	                    else if (object.subMessages[i].length)
	                        message.subMessages[i] = object.subMessages[i];
	            }
	            return message;
	        };
	        /**
	         * Creates a plain object from an UberMessage message. Also converts values to other types if specified.
	         * @function toObject
	         * @memberof base.UberMessage
	         * @static
	         * @param {base.UberMessage} message UberMessage
	         * @param {$protobuf.IConversionOptions} [options] Conversion options
	         * @returns {Object.<string,*>} Plain object
	         */
	        UberMessage.toObject = function toObject(message, options) {
	            if (!options)
	                options = {};
	            var object = {};
	            if (options.arrays || options.defaults)
	                object.subMessages = [];
	            if (message.subMessages && message.subMessages.length) {
	                object.subMessages = [];
	                for (var j = 0; j < message.subMessages.length; ++j)
	                    object.subMessages[j] = options.bytes === String ? $util.base64.encode(message.subMessages[j], 0, message.subMessages[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.subMessages[j]) : message.subMessages[j];
	            }
	            return object;
	        };
	        /**
	         * Converts this UberMessage to JSON.
	         * @function toJSON
	         * @memberof base.UberMessage
	         * @instance
	         * @returns {Object.<string,*>} JSON object
	         */
	        UberMessage.prototype.toJSON = function toJSON() {
	            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
	        };
	        return UberMessage;
	    })();
	    return base;
	})();
	$root.room = (function () {
	    /**
	     * Namespace room.
	     * @exports room
	     * @namespace
	     */
	    var room = {};
	    /**
	     * MessageID enum.
	     * @name room.MessageID
	     * @enum {string}
	     * @property {number} Start=20000 Start value
	     */
	    room.MessageID = (function () {
	        var valuesById = {}, values = Object.create(valuesById);
	        values[valuesById[20000] = "Start"] = 20000;
	        return values;
	    })();
	    room.RoomUser = (function () {
	        /**
	         * Properties of a RoomUser.
	         * @memberof room
	         * @interface IRoomUser
	         * @property {number|null} [userId] RoomUser userId
	         * @property {string|null} [name] RoomUser name
	         */
	        /**
	         * Constructs a new RoomUser.
	         * @memberof room
	         * @classdesc Represents a RoomUser.
	         * @implements IRoomUser
	         * @constructor
	         * @param {room.IRoomUser=} [properties] Properties to set
	         */
	        function RoomUser(properties) {
	            if (properties)
	                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
	                    if (properties[keys[i]] != null)
	                        this[keys[i]] = properties[keys[i]];
	        }
	        /**
	         * RoomUser userId.
	         * @member {number} userId
	         * @memberof room.RoomUser
	         * @instance
	         */
	        RoomUser.prototype.userId = 0;
	        /**
	         * RoomUser name.
	         * @member {string} name
	         * @memberof room.RoomUser
	         * @instance
	         */
	        RoomUser.prototype.name = "";
	        /**
	         * Creates a new RoomUser instance using the specified properties.
	         * @function create
	         * @memberof room.RoomUser
	         * @static
	         * @param {room.IRoomUser=} [properties] Properties to set
	         * @returns {room.RoomUser} RoomUser instance
	         */
	        RoomUser.create = function create(properties) {
	            return new RoomUser(properties);
	        };
	        /**
	         * Encodes the specified RoomUser message. Does not implicitly {@link room.RoomUser.verify|verify} messages.
	         * @function encode
	         * @memberof room.RoomUser
	         * @static
	         * @param {room.IRoomUser} message RoomUser message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        RoomUser.encode = function encode(message, writer) {
	            if (!writer)
	                writer = $Writer.create();
	            if (message.userId != null && message.hasOwnProperty("userId"))
	                writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.userId);
	            if (message.name != null && message.hasOwnProperty("name"))
	                writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.name);
	            return writer;
	        };
	        /**
	         * Encodes the specified RoomUser message, length delimited. Does not implicitly {@link room.RoomUser.verify|verify} messages.
	         * @function encodeDelimited
	         * @memberof room.RoomUser
	         * @static
	         * @param {room.IRoomUser} message RoomUser message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        RoomUser.encodeDelimited = function encodeDelimited(message, writer) {
	            return this.encode(message, writer).ldelim();
	        };
	        /**
	         * Decodes a RoomUser message from the specified reader or buffer.
	         * @function decode
	         * @memberof room.RoomUser
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @param {number} [length] Message length if known beforehand
	         * @returns {room.RoomUser} RoomUser
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        RoomUser.decode = function decode(reader, length) {
	            if (!(reader instanceof $Reader))
	                reader = $Reader.create(reader);
	            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.room.RoomUser();
	            while (reader.pos < end) {
	                var tag = reader.uint32();
	                switch (tag >>> 3) {
	                    case 1:
	                        message.userId = reader.uint32();
	                        break;
	                    case 2:
	                        message.name = reader.string();
	                        break;
	                    default:
	                        reader.skipType(tag & 7);
	                        break;
	                }
	            }
	            return message;
	        };
	        /**
	         * Decodes a RoomUser message from the specified reader or buffer, length delimited.
	         * @function decodeDelimited
	         * @memberof room.RoomUser
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @returns {room.RoomUser} RoomUser
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        RoomUser.decodeDelimited = function decodeDelimited(reader) {
	            if (!(reader instanceof $Reader))
	                reader = new $Reader(reader);
	            return this.decode(reader, reader.uint32());
	        };
	        /**
	         * Verifies a RoomUser message.
	         * @function verify
	         * @memberof room.RoomUser
	         * @static
	         * @param {Object.<string,*>} message Plain object to verify
	         * @returns {string|null} `null` if valid, otherwise the reason why it is not
	         */
	        RoomUser.verify = function verify(message) {
	            if (typeof message !== "object" || message === null)
	                return "object expected";
	            if (message.userId != null && message.hasOwnProperty("userId"))
	                if (!$util.isInteger(message.userId))
	                    return "userId: integer expected";
	            if (message.name != null && message.hasOwnProperty("name"))
	                if (!$util.isString(message.name))
	                    return "name: string expected";
	            return null;
	        };
	        /**
	         * Creates a RoomUser message from a plain object. Also converts values to their respective internal types.
	         * @function fromObject
	         * @memberof room.RoomUser
	         * @static
	         * @param {Object.<string,*>} object Plain object
	         * @returns {room.RoomUser} RoomUser
	         */
	        RoomUser.fromObject = function fromObject(object) {
	            if (object instanceof $root.room.RoomUser)
	                return object;
	            var message = new $root.room.RoomUser();
	            if (object.userId != null)
	                message.userId = object.userId >>> 0;
	            if (object.name != null)
	                message.name = String(object.name);
	            return message;
	        };
	        /**
	         * Creates a plain object from a RoomUser message. Also converts values to other types if specified.
	         * @function toObject
	         * @memberof room.RoomUser
	         * @static
	         * @param {room.RoomUser} message RoomUser
	         * @param {$protobuf.IConversionOptions} [options] Conversion options
	         * @returns {Object.<string,*>} Plain object
	         */
	        RoomUser.toObject = function toObject(message, options) {
	            if (!options)
	                options = {};
	            var object = {};
	            if (options.defaults) {
	                object.userId = 0;
	                object.name = "";
	            }
	            if (message.userId != null && message.hasOwnProperty("userId"))
	                object.userId = message.userId;
	            if (message.name != null && message.hasOwnProperty("name"))
	                object.name = message.name;
	            return object;
	        };
	        /**
	         * Converts this RoomUser to JSON.
	         * @function toJSON
	         * @memberof room.RoomUser
	         * @instance
	         * @returns {Object.<string,*>} JSON object
	         */
	        RoomUser.prototype.toJSON = function toJSON() {
	            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
	        };
	        return RoomUser;
	    })();
	    room.JoinRoomMessage = (function () {
	        /**
	         * Properties of a JoinRoomMessage.
	         * @memberof room
	         * @interface IJoinRoomMessage
	         * @property {room.IRoomUser|null} [user] JoinRoomMessage user
	         */
	        /**
	         * Constructs a new JoinRoomMessage.
	         * @memberof room
	         * @classdesc Represents a JoinRoomMessage.
	         * @implements IJoinRoomMessage
	         * @constructor
	         * @param {room.IJoinRoomMessage=} [properties] Properties to set
	         */
	        function JoinRoomMessage(properties) {
	            if (properties)
	                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
	                    if (properties[keys[i]] != null)
	                        this[keys[i]] = properties[keys[i]];
	        }
	        /**
	         * JoinRoomMessage user.
	         * @member {room.IRoomUser|null|undefined} user
	         * @memberof room.JoinRoomMessage
	         * @instance
	         */
	        JoinRoomMessage.prototype.user = null;
	        /**
	         * Creates a new JoinRoomMessage instance using the specified properties.
	         * @function create
	         * @memberof room.JoinRoomMessage
	         * @static
	         * @param {room.IJoinRoomMessage=} [properties] Properties to set
	         * @returns {room.JoinRoomMessage} JoinRoomMessage instance
	         */
	        JoinRoomMessage.create = function create(properties) {
	            return new JoinRoomMessage(properties);
	        };
	        /**
	         * Encodes the specified JoinRoomMessage message. Does not implicitly {@link room.JoinRoomMessage.verify|verify} messages.
	         * @function encode
	         * @memberof room.JoinRoomMessage
	         * @static
	         * @param {room.IJoinRoomMessage} message JoinRoomMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        JoinRoomMessage.encode = function encode(message, writer) {
	            if (!writer)
	                writer = $Writer.create();
	            if (message.user != null && message.hasOwnProperty("user"))
	                $root.room.RoomUser.encode(message.user, writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim();
	            return writer;
	        };
	        /**
	         * Encodes the specified JoinRoomMessage message, length delimited. Does not implicitly {@link room.JoinRoomMessage.verify|verify} messages.
	         * @function encodeDelimited
	         * @memberof room.JoinRoomMessage
	         * @static
	         * @param {room.IJoinRoomMessage} message JoinRoomMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        JoinRoomMessage.encodeDelimited = function encodeDelimited(message, writer) {
	            return this.encode(message, writer).ldelim();
	        };
	        /**
	         * Decodes a JoinRoomMessage message from the specified reader or buffer.
	         * @function decode
	         * @memberof room.JoinRoomMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @param {number} [length] Message length if known beforehand
	         * @returns {room.JoinRoomMessage} JoinRoomMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        JoinRoomMessage.decode = function decode(reader, length) {
	            if (!(reader instanceof $Reader))
	                reader = $Reader.create(reader);
	            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.room.JoinRoomMessage();
	            while (reader.pos < end) {
	                var tag = reader.uint32();
	                switch (tag >>> 3) {
	                    case 1:
	                        message.user = $root.room.RoomUser.decode(reader, reader.uint32());
	                        break;
	                    default:
	                        reader.skipType(tag & 7);
	                        break;
	                }
	            }
	            return message;
	        };
	        /**
	         * Decodes a JoinRoomMessage message from the specified reader or buffer, length delimited.
	         * @function decodeDelimited
	         * @memberof room.JoinRoomMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @returns {room.JoinRoomMessage} JoinRoomMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        JoinRoomMessage.decodeDelimited = function decodeDelimited(reader) {
	            if (!(reader instanceof $Reader))
	                reader = new $Reader(reader);
	            return this.decode(reader, reader.uint32());
	        };
	        /**
	         * Verifies a JoinRoomMessage message.
	         * @function verify
	         * @memberof room.JoinRoomMessage
	         * @static
	         * @param {Object.<string,*>} message Plain object to verify
	         * @returns {string|null} `null` if valid, otherwise the reason why it is not
	         */
	        JoinRoomMessage.verify = function verify(message) {
	            if (typeof message !== "object" || message === null)
	                return "object expected";
	            if (message.user != null && message.hasOwnProperty("user")) {
	                var error = $root.room.RoomUser.verify(message.user);
	                if (error)
	                    return "user." + error;
	            }
	            return null;
	        };
	        /**
	         * Creates a JoinRoomMessage message from a plain object. Also converts values to their respective internal types.
	         * @function fromObject
	         * @memberof room.JoinRoomMessage
	         * @static
	         * @param {Object.<string,*>} object Plain object
	         * @returns {room.JoinRoomMessage} JoinRoomMessage
	         */
	        JoinRoomMessage.fromObject = function fromObject(object) {
	            if (object instanceof $root.room.JoinRoomMessage)
	                return object;
	            var message = new $root.room.JoinRoomMessage();
	            if (object.user != null) {
	                if (typeof object.user !== "object")
	                    throw TypeError(".room.JoinRoomMessage.user: object expected");
	                message.user = $root.room.RoomUser.fromObject(object.user);
	            }
	            return message;
	        };
	        /**
	         * Creates a plain object from a JoinRoomMessage message. Also converts values to other types if specified.
	         * @function toObject
	         * @memberof room.JoinRoomMessage
	         * @static
	         * @param {room.JoinRoomMessage} message JoinRoomMessage
	         * @param {$protobuf.IConversionOptions} [options] Conversion options
	         * @returns {Object.<string,*>} Plain object
	         */
	        JoinRoomMessage.toObject = function toObject(message, options) {
	            if (!options)
	                options = {};
	            var object = {};
	            if (options.defaults)
	                object.user = null;
	            if (message.user != null && message.hasOwnProperty("user"))
	                object.user = $root.room.RoomUser.toObject(message.user, options);
	            return object;
	        };
	        /**
	         * Converts this JoinRoomMessage to JSON.
	         * @function toJSON
	         * @memberof room.JoinRoomMessage
	         * @instance
	         * @returns {Object.<string,*>} JSON object
	         */
	        JoinRoomMessage.prototype.toJSON = function toJSON() {
	            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
	        };
	        return JoinRoomMessage;
	    })();
	    room.LeaveRoomMessage = (function () {
	        /**
	         * Properties of a LeaveRoomMessage.
	         * @memberof room
	         * @interface ILeaveRoomMessage
	         * @property {room.IRoomUser|null} [user] LeaveRoomMessage user
	         */
	        /**
	         * Constructs a new LeaveRoomMessage.
	         * @memberof room
	         * @classdesc Represents a LeaveRoomMessage.
	         * @implements ILeaveRoomMessage
	         * @constructor
	         * @param {room.ILeaveRoomMessage=} [properties] Properties to set
	         */
	        function LeaveRoomMessage(properties) {
	            if (properties)
	                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
	                    if (properties[keys[i]] != null)
	                        this[keys[i]] = properties[keys[i]];
	        }
	        /**
	         * LeaveRoomMessage user.
	         * @member {room.IRoomUser|null|undefined} user
	         * @memberof room.LeaveRoomMessage
	         * @instance
	         */
	        LeaveRoomMessage.prototype.user = null;
	        /**
	         * Creates a new LeaveRoomMessage instance using the specified properties.
	         * @function create
	         * @memberof room.LeaveRoomMessage
	         * @static
	         * @param {room.ILeaveRoomMessage=} [properties] Properties to set
	         * @returns {room.LeaveRoomMessage} LeaveRoomMessage instance
	         */
	        LeaveRoomMessage.create = function create(properties) {
	            return new LeaveRoomMessage(properties);
	        };
	        /**
	         * Encodes the specified LeaveRoomMessage message. Does not implicitly {@link room.LeaveRoomMessage.verify|verify} messages.
	         * @function encode
	         * @memberof room.LeaveRoomMessage
	         * @static
	         * @param {room.ILeaveRoomMessage} message LeaveRoomMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        LeaveRoomMessage.encode = function encode(message, writer) {
	            if (!writer)
	                writer = $Writer.create();
	            if (message.user != null && message.hasOwnProperty("user"))
	                $root.room.RoomUser.encode(message.user, writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim();
	            return writer;
	        };
	        /**
	         * Encodes the specified LeaveRoomMessage message, length delimited. Does not implicitly {@link room.LeaveRoomMessage.verify|verify} messages.
	         * @function encodeDelimited
	         * @memberof room.LeaveRoomMessage
	         * @static
	         * @param {room.ILeaveRoomMessage} message LeaveRoomMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        LeaveRoomMessage.encodeDelimited = function encodeDelimited(message, writer) {
	            return this.encode(message, writer).ldelim();
	        };
	        /**
	         * Decodes a LeaveRoomMessage message from the specified reader or buffer.
	         * @function decode
	         * @memberof room.LeaveRoomMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @param {number} [length] Message length if known beforehand
	         * @returns {room.LeaveRoomMessage} LeaveRoomMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        LeaveRoomMessage.decode = function decode(reader, length) {
	            if (!(reader instanceof $Reader))
	                reader = $Reader.create(reader);
	            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.room.LeaveRoomMessage();
	            while (reader.pos < end) {
	                var tag = reader.uint32();
	                switch (tag >>> 3) {
	                    case 1:
	                        message.user = $root.room.RoomUser.decode(reader, reader.uint32());
	                        break;
	                    default:
	                        reader.skipType(tag & 7);
	                        break;
	                }
	            }
	            return message;
	        };
	        /**
	         * Decodes a LeaveRoomMessage message from the specified reader or buffer, length delimited.
	         * @function decodeDelimited
	         * @memberof room.LeaveRoomMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @returns {room.LeaveRoomMessage} LeaveRoomMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        LeaveRoomMessage.decodeDelimited = function decodeDelimited(reader) {
	            if (!(reader instanceof $Reader))
	                reader = new $Reader(reader);
	            return this.decode(reader, reader.uint32());
	        };
	        /**
	         * Verifies a LeaveRoomMessage message.
	         * @function verify
	         * @memberof room.LeaveRoomMessage
	         * @static
	         * @param {Object.<string,*>} message Plain object to verify
	         * @returns {string|null} `null` if valid, otherwise the reason why it is not
	         */
	        LeaveRoomMessage.verify = function verify(message) {
	            if (typeof message !== "object" || message === null)
	                return "object expected";
	            if (message.user != null && message.hasOwnProperty("user")) {
	                var error = $root.room.RoomUser.verify(message.user);
	                if (error)
	                    return "user." + error;
	            }
	            return null;
	        };
	        /**
	         * Creates a LeaveRoomMessage message from a plain object. Also converts values to their respective internal types.
	         * @function fromObject
	         * @memberof room.LeaveRoomMessage
	         * @static
	         * @param {Object.<string,*>} object Plain object
	         * @returns {room.LeaveRoomMessage} LeaveRoomMessage
	         */
	        LeaveRoomMessage.fromObject = function fromObject(object) {
	            if (object instanceof $root.room.LeaveRoomMessage)
	                return object;
	            var message = new $root.room.LeaveRoomMessage();
	            if (object.user != null) {
	                if (typeof object.user !== "object")
	                    throw TypeError(".room.LeaveRoomMessage.user: object expected");
	                message.user = $root.room.RoomUser.fromObject(object.user);
	            }
	            return message;
	        };
	        /**
	         * Creates a plain object from a LeaveRoomMessage message. Also converts values to other types if specified.
	         * @function toObject
	         * @memberof room.LeaveRoomMessage
	         * @static
	         * @param {room.LeaveRoomMessage} message LeaveRoomMessage
	         * @param {$protobuf.IConversionOptions} [options] Conversion options
	         * @returns {Object.<string,*>} Plain object
	         */
	        LeaveRoomMessage.toObject = function toObject(message, options) {
	            if (!options)
	                options = {};
	            var object = {};
	            if (options.defaults)
	                object.user = null;
	            if (message.user != null && message.hasOwnProperty("user"))
	                object.user = $root.room.RoomUser.toObject(message.user, options);
	            return object;
	        };
	        /**
	         * Converts this LeaveRoomMessage to JSON.
	         * @function toJSON
	         * @memberof room.LeaveRoomMessage
	         * @instance
	         * @returns {Object.<string,*>} JSON object
	         */
	        LeaveRoomMessage.prototype.toJSON = function toJSON() {
	            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
	        };
	        return LeaveRoomMessage;
	    })();
	    room.ListUsersMessage = (function () {
	        /**
	         * Properties of a ListUsersMessage.
	         * @memberof room
	         * @interface IListUsersMessage
	         * @property {Array.<room.IRoomUser>|null} [users] ListUsersMessage users
	         */
	        /**
	         * Constructs a new ListUsersMessage.
	         * @memberof room
	         * @classdesc Represents a ListUsersMessage.
	         * @implements IListUsersMessage
	         * @constructor
	         * @param {room.IListUsersMessage=} [properties] Properties to set
	         */
	        function ListUsersMessage(properties) {
	            this.users = [];
	            if (properties)
	                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
	                    if (properties[keys[i]] != null)
	                        this[keys[i]] = properties[keys[i]];
	        }
	        /**
	         * ListUsersMessage users.
	         * @member {Array.<room.IRoomUser>} users
	         * @memberof room.ListUsersMessage
	         * @instance
	         */
	        ListUsersMessage.prototype.users = $util.emptyArray;
	        /**
	         * Creates a new ListUsersMessage instance using the specified properties.
	         * @function create
	         * @memberof room.ListUsersMessage
	         * @static
	         * @param {room.IListUsersMessage=} [properties] Properties to set
	         * @returns {room.ListUsersMessage} ListUsersMessage instance
	         */
	        ListUsersMessage.create = function create(properties) {
	            return new ListUsersMessage(properties);
	        };
	        /**
	         * Encodes the specified ListUsersMessage message. Does not implicitly {@link room.ListUsersMessage.verify|verify} messages.
	         * @function encode
	         * @memberof room.ListUsersMessage
	         * @static
	         * @param {room.IListUsersMessage} message ListUsersMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        ListUsersMessage.encode = function encode(message, writer) {
	            if (!writer)
	                writer = $Writer.create();
	            if (message.users != null && message.users.length)
	                for (var i = 0; i < message.users.length; ++i)
	                    $root.room.RoomUser.encode(message.users[i], writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim();
	            return writer;
	        };
	        /**
	         * Encodes the specified ListUsersMessage message, length delimited. Does not implicitly {@link room.ListUsersMessage.verify|verify} messages.
	         * @function encodeDelimited
	         * @memberof room.ListUsersMessage
	         * @static
	         * @param {room.IListUsersMessage} message ListUsersMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        ListUsersMessage.encodeDelimited = function encodeDelimited(message, writer) {
	            return this.encode(message, writer).ldelim();
	        };
	        /**
	         * Decodes a ListUsersMessage message from the specified reader or buffer.
	         * @function decode
	         * @memberof room.ListUsersMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @param {number} [length] Message length if known beforehand
	         * @returns {room.ListUsersMessage} ListUsersMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        ListUsersMessage.decode = function decode(reader, length) {
	            if (!(reader instanceof $Reader))
	                reader = $Reader.create(reader);
	            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.room.ListUsersMessage();
	            while (reader.pos < end) {
	                var tag = reader.uint32();
	                switch (tag >>> 3) {
	                    case 1:
	                        if (!(message.users && message.users.length))
	                            message.users = [];
	                        message.users.push($root.room.RoomUser.decode(reader, reader.uint32()));
	                        break;
	                    default:
	                        reader.skipType(tag & 7);
	                        break;
	                }
	            }
	            return message;
	        };
	        /**
	         * Decodes a ListUsersMessage message from the specified reader or buffer, length delimited.
	         * @function decodeDelimited
	         * @memberof room.ListUsersMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @returns {room.ListUsersMessage} ListUsersMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        ListUsersMessage.decodeDelimited = function decodeDelimited(reader) {
	            if (!(reader instanceof $Reader))
	                reader = new $Reader(reader);
	            return this.decode(reader, reader.uint32());
	        };
	        /**
	         * Verifies a ListUsersMessage message.
	         * @function verify
	         * @memberof room.ListUsersMessage
	         * @static
	         * @param {Object.<string,*>} message Plain object to verify
	         * @returns {string|null} `null` if valid, otherwise the reason why it is not
	         */
	        ListUsersMessage.verify = function verify(message) {
	            if (typeof message !== "object" || message === null)
	                return "object expected";
	            if (message.users != null && message.hasOwnProperty("users")) {
	                if (!Array.isArray(message.users))
	                    return "users: array expected";
	                for (var i = 0; i < message.users.length; ++i) {
	                    var error = $root.room.RoomUser.verify(message.users[i]);
	                    if (error)
	                        return "users." + error;
	                }
	            }
	            return null;
	        };
	        /**
	         * Creates a ListUsersMessage message from a plain object. Also converts values to their respective internal types.
	         * @function fromObject
	         * @memberof room.ListUsersMessage
	         * @static
	         * @param {Object.<string,*>} object Plain object
	         * @returns {room.ListUsersMessage} ListUsersMessage
	         */
	        ListUsersMessage.fromObject = function fromObject(object) {
	            if (object instanceof $root.room.ListUsersMessage)
	                return object;
	            var message = new $root.room.ListUsersMessage();
	            if (object.users) {
	                if (!Array.isArray(object.users))
	                    throw TypeError(".room.ListUsersMessage.users: array expected");
	                message.users = [];
	                for (var i = 0; i < object.users.length; ++i) {
	                    if (typeof object.users[i] !== "object")
	                        throw TypeError(".room.ListUsersMessage.users: object expected");
	                    message.users[i] = $root.room.RoomUser.fromObject(object.users[i]);
	                }
	            }
	            return message;
	        };
	        /**
	         * Creates a plain object from a ListUsersMessage message. Also converts values to other types if specified.
	         * @function toObject
	         * @memberof room.ListUsersMessage
	         * @static
	         * @param {room.ListUsersMessage} message ListUsersMessage
	         * @param {$protobuf.IConversionOptions} [options] Conversion options
	         * @returns {Object.<string,*>} Plain object
	         */
	        ListUsersMessage.toObject = function toObject(message, options) {
	            if (!options)
	                options = {};
	            var object = {};
	            if (options.arrays || options.defaults)
	                object.users = [];
	            if (message.users && message.users.length) {
	                object.users = [];
	                for (var j = 0; j < message.users.length; ++j)
	                    object.users[j] = $root.room.RoomUser.toObject(message.users[j], options);
	            }
	            return object;
	        };
	        /**
	         * Converts this ListUsersMessage to JSON.
	         * @function toJSON
	         * @memberof room.ListUsersMessage
	         * @instance
	         * @returns {Object.<string,*>} JSON object
	         */
	        ListUsersMessage.prototype.toJSON = function toJSON() {
	            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
	        };
	        return ListUsersMessage;
	    })();
	    room.MediaOptionMessage = (function () {
	        /**
	         * Properties of a MediaOptionMessage.
	         * @memberof room
	         * @interface IMediaOptionMessage
	         * @property {boolean|null} [publish] MediaOptionMessage publish
	         * @property {number|null} [roomId] MediaOptionMessage roomId
	         * @property {number|null} [userId] MediaOptionMessage userId
	         * @property {Array.<string>|null} [turnServers] MediaOptionMessage turnServers
	         * @property {boolean|null} [video] MediaOptionMessage video
	         * @property {boolean|null} [audio] MediaOptionMessage audio
	         */
	        /**
	         * Constructs a new MediaOptionMessage.
	         * @memberof room
	         * @classdesc Represents a MediaOptionMessage.
	         * @implements IMediaOptionMessage
	         * @constructor
	         * @param {room.IMediaOptionMessage=} [properties] Properties to set
	         */
	        function MediaOptionMessage(properties) {
	            this.turnServers = [];
	            if (properties)
	                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
	                    if (properties[keys[i]] != null)
	                        this[keys[i]] = properties[keys[i]];
	        }
	        /**
	         * MediaOptionMessage publish.
	         * @member {boolean} publish
	         * @memberof room.MediaOptionMessage
	         * @instance
	         */
	        MediaOptionMessage.prototype.publish = false;
	        /**
	         * MediaOptionMessage roomId.
	         * @member {number} roomId
	         * @memberof room.MediaOptionMessage
	         * @instance
	         */
	        MediaOptionMessage.prototype.roomId = 0;
	        /**
	         * MediaOptionMessage userId.
	         * @member {number} userId
	         * @memberof room.MediaOptionMessage
	         * @instance
	         */
	        MediaOptionMessage.prototype.userId = 0;
	        /**
	         * MediaOptionMessage turnServers.
	         * @member {Array.<string>} turnServers
	         * @memberof room.MediaOptionMessage
	         * @instance
	         */
	        MediaOptionMessage.prototype.turnServers = $util.emptyArray;
	        /**
	         * MediaOptionMessage video.
	         * @member {boolean} video
	         * @memberof room.MediaOptionMessage
	         * @instance
	         */
	        MediaOptionMessage.prototype.video = false;
	        /**
	         * MediaOptionMessage audio.
	         * @member {boolean} audio
	         * @memberof room.MediaOptionMessage
	         * @instance
	         */
	        MediaOptionMessage.prototype.audio = false;
	        /**
	         * Creates a new MediaOptionMessage instance using the specified properties.
	         * @function create
	         * @memberof room.MediaOptionMessage
	         * @static
	         * @param {room.IMediaOptionMessage=} [properties] Properties to set
	         * @returns {room.MediaOptionMessage} MediaOptionMessage instance
	         */
	        MediaOptionMessage.create = function create(properties) {
	            return new MediaOptionMessage(properties);
	        };
	        /**
	         * Encodes the specified MediaOptionMessage message. Does not implicitly {@link room.MediaOptionMessage.verify|verify} messages.
	         * @function encode
	         * @memberof room.MediaOptionMessage
	         * @static
	         * @param {room.IMediaOptionMessage} message MediaOptionMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        MediaOptionMessage.encode = function encode(message, writer) {
	            if (!writer)
	                writer = $Writer.create();
	            if (message.publish != null && message.hasOwnProperty("publish"))
	                writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.publish);
	            if (message.roomId != null && message.hasOwnProperty("roomId"))
	                writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.roomId);
	            if (message.userId != null && message.hasOwnProperty("userId"))
	                writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.userId);
	            if (message.turnServers != null && message.turnServers.length)
	                for (var i = 0; i < message.turnServers.length; ++i)
	                    writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.turnServers[i]);
	            if (message.video != null && message.hasOwnProperty("video"))
	                writer.uint32(/* id 5, wireType 0 =*/ 40).bool(message.video);
	            if (message.audio != null && message.hasOwnProperty("audio"))
	                writer.uint32(/* id 6, wireType 0 =*/ 48).bool(message.audio);
	            return writer;
	        };
	        /**
	         * Encodes the specified MediaOptionMessage message, length delimited. Does not implicitly {@link room.MediaOptionMessage.verify|verify} messages.
	         * @function encodeDelimited
	         * @memberof room.MediaOptionMessage
	         * @static
	         * @param {room.IMediaOptionMessage} message MediaOptionMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        MediaOptionMessage.encodeDelimited = function encodeDelimited(message, writer) {
	            return this.encode(message, writer).ldelim();
	        };
	        /**
	         * Decodes a MediaOptionMessage message from the specified reader or buffer.
	         * @function decode
	         * @memberof room.MediaOptionMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @param {number} [length] Message length if known beforehand
	         * @returns {room.MediaOptionMessage} MediaOptionMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        MediaOptionMessage.decode = function decode(reader, length) {
	            if (!(reader instanceof $Reader))
	                reader = $Reader.create(reader);
	            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.room.MediaOptionMessage();
	            while (reader.pos < end) {
	                var tag = reader.uint32();
	                switch (tag >>> 3) {
	                    case 1:
	                        message.publish = reader.bool();
	                        break;
	                    case 2:
	                        message.roomId = reader.uint32();
	                        break;
	                    case 3:
	                        message.userId = reader.uint32();
	                        break;
	                    case 4:
	                        if (!(message.turnServers && message.turnServers.length))
	                            message.turnServers = [];
	                        message.turnServers.push(reader.string());
	                        break;
	                    case 5:
	                        message.video = reader.bool();
	                        break;
	                    case 6:
	                        message.audio = reader.bool();
	                        break;
	                    default:
	                        reader.skipType(tag & 7);
	                        break;
	                }
	            }
	            return message;
	        };
	        /**
	         * Decodes a MediaOptionMessage message from the specified reader or buffer, length delimited.
	         * @function decodeDelimited
	         * @memberof room.MediaOptionMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @returns {room.MediaOptionMessage} MediaOptionMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        MediaOptionMessage.decodeDelimited = function decodeDelimited(reader) {
	            if (!(reader instanceof $Reader))
	                reader = new $Reader(reader);
	            return this.decode(reader, reader.uint32());
	        };
	        /**
	         * Verifies a MediaOptionMessage message.
	         * @function verify
	         * @memberof room.MediaOptionMessage
	         * @static
	         * @param {Object.<string,*>} message Plain object to verify
	         * @returns {string|null} `null` if valid, otherwise the reason why it is not
	         */
	        MediaOptionMessage.verify = function verify(message) {
	            if (typeof message !== "object" || message === null)
	                return "object expected";
	            if (message.publish != null && message.hasOwnProperty("publish"))
	                if (typeof message.publish !== "boolean")
	                    return "publish: boolean expected";
	            if (message.roomId != null && message.hasOwnProperty("roomId"))
	                if (!$util.isInteger(message.roomId))
	                    return "roomId: integer expected";
	            if (message.userId != null && message.hasOwnProperty("userId"))
	                if (!$util.isInteger(message.userId))
	                    return "userId: integer expected";
	            if (message.turnServers != null && message.hasOwnProperty("turnServers")) {
	                if (!Array.isArray(message.turnServers))
	                    return "turnServers: array expected";
	                for (var i = 0; i < message.turnServers.length; ++i)
	                    if (!$util.isString(message.turnServers[i]))
	                        return "turnServers: string[] expected";
	            }
	            if (message.video != null && message.hasOwnProperty("video"))
	                if (typeof message.video !== "boolean")
	                    return "video: boolean expected";
	            if (message.audio != null && message.hasOwnProperty("audio"))
	                if (typeof message.audio !== "boolean")
	                    return "audio: boolean expected";
	            return null;
	        };
	        /**
	         * Creates a MediaOptionMessage message from a plain object. Also converts values to their respective internal types.
	         * @function fromObject
	         * @memberof room.MediaOptionMessage
	         * @static
	         * @param {Object.<string,*>} object Plain object
	         * @returns {room.MediaOptionMessage} MediaOptionMessage
	         */
	        MediaOptionMessage.fromObject = function fromObject(object) {
	            if (object instanceof $root.room.MediaOptionMessage)
	                return object;
	            var message = new $root.room.MediaOptionMessage();
	            if (object.publish != null)
	                message.publish = Boolean(object.publish);
	            if (object.roomId != null)
	                message.roomId = object.roomId >>> 0;
	            if (object.userId != null)
	                message.userId = object.userId >>> 0;
	            if (object.turnServers) {
	                if (!Array.isArray(object.turnServers))
	                    throw TypeError(".room.MediaOptionMessage.turnServers: array expected");
	                message.turnServers = [];
	                for (var i = 0; i < object.turnServers.length; ++i)
	                    message.turnServers[i] = String(object.turnServers[i]);
	            }
	            if (object.video != null)
	                message.video = Boolean(object.video);
	            if (object.audio != null)
	                message.audio = Boolean(object.audio);
	            return message;
	        };
	        /**
	         * Creates a plain object from a MediaOptionMessage message. Also converts values to other types if specified.
	         * @function toObject
	         * @memberof room.MediaOptionMessage
	         * @static
	         * @param {room.MediaOptionMessage} message MediaOptionMessage
	         * @param {$protobuf.IConversionOptions} [options] Conversion options
	         * @returns {Object.<string,*>} Plain object
	         */
	        MediaOptionMessage.toObject = function toObject(message, options) {
	            if (!options)
	                options = {};
	            var object = {};
	            if (options.arrays || options.defaults)
	                object.turnServers = [];
	            if (options.defaults) {
	                object.publish = false;
	                object.roomId = 0;
	                object.userId = 0;
	                object.video = false;
	                object.audio = false;
	            }
	            if (message.publish != null && message.hasOwnProperty("publish"))
	                object.publish = message.publish;
	            if (message.roomId != null && message.hasOwnProperty("roomId"))
	                object.roomId = message.roomId;
	            if (message.userId != null && message.hasOwnProperty("userId"))
	                object.userId = message.userId;
	            if (message.turnServers && message.turnServers.length) {
	                object.turnServers = [];
	                for (var j = 0; j < message.turnServers.length; ++j)
	                    object.turnServers[j] = message.turnServers[j];
	            }
	            if (message.video != null && message.hasOwnProperty("video"))
	                object.video = message.video;
	            if (message.audio != null && message.hasOwnProperty("audio"))
	                object.audio = message.audio;
	            return object;
	        };
	        /**
	         * Converts this MediaOptionMessage to JSON.
	         * @function toJSON
	         * @memberof room.MediaOptionMessage
	         * @instance
	         * @returns {Object.<string,*>} JSON object
	         */
	        MediaOptionMessage.prototype.toJSON = function toJSON() {
	            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
	        };
	        return MediaOptionMessage;
	    })();
	    return room;
	})();
	$root.whiteboard = (function () {
	    /**
	     * Namespace whiteboard.
	     * @exports whiteboard
	     * @namespace
	     */
	    var whiteboard = {};
	    /**
	     * MessageID enum.
	     * @name whiteboard.MessageID
	     * @enum {string}
	     * @property {number} Start=30000 Start value
	     */
	    whiteboard.MessageID = (function () {
	        var valuesById = {}, values = Object.create(valuesById);
	        values[valuesById[30000] = "Start"] = 30000;
	        return values;
	    })();
	    /**
	     * StrokeType enum.
	     * @name whiteboard.StrokeType
	     * @enum {string}
	     * @property {number} Draw=1 Draw value
	     * @property {number} Erase=2 Erase value
	     */
	    whiteboard.StrokeType = (function () {
	        var valuesById = {}, values = Object.create(valuesById);
	        values[valuesById[1] = "Draw"] = 1;
	        values[valuesById[2] = "Erase"] = 2;
	        return values;
	    })();
	    whiteboard.CommandMessage = (function () {
	        /**
	         * Properties of a CommandMessage.
	         * @memberof whiteboard
	         * @interface ICommandMessage
	         * @property {string|null} [command] CommandMessage command
	         */
	        /**
	         * Constructs a new CommandMessage.
	         * @memberof whiteboard
	         * @classdesc Represents a CommandMessage.
	         * @implements ICommandMessage
	         * @constructor
	         * @param {whiteboard.ICommandMessage=} [properties] Properties to set
	         */
	        function CommandMessage(properties) {
	            if (properties)
	                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
	                    if (properties[keys[i]] != null)
	                        this[keys[i]] = properties[keys[i]];
	        }
	        /**
	         * CommandMessage command.
	         * @member {string} command
	         * @memberof whiteboard.CommandMessage
	         * @instance
	         */
	        CommandMessage.prototype.command = "";
	        /**
	         * Creates a new CommandMessage instance using the specified properties.
	         * @function create
	         * @memberof whiteboard.CommandMessage
	         * @static
	         * @param {whiteboard.ICommandMessage=} [properties] Properties to set
	         * @returns {whiteboard.CommandMessage} CommandMessage instance
	         */
	        CommandMessage.create = function create(properties) {
	            return new CommandMessage(properties);
	        };
	        /**
	         * Encodes the specified CommandMessage message. Does not implicitly {@link whiteboard.CommandMessage.verify|verify} messages.
	         * @function encode
	         * @memberof whiteboard.CommandMessage
	         * @static
	         * @param {whiteboard.ICommandMessage} message CommandMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        CommandMessage.encode = function encode(message, writer) {
	            if (!writer)
	                writer = $Writer.create();
	            if (message.command != null && message.hasOwnProperty("command"))
	                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.command);
	            return writer;
	        };
	        /**
	         * Encodes the specified CommandMessage message, length delimited. Does not implicitly {@link whiteboard.CommandMessage.verify|verify} messages.
	         * @function encodeDelimited
	         * @memberof whiteboard.CommandMessage
	         * @static
	         * @param {whiteboard.ICommandMessage} message CommandMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        CommandMessage.encodeDelimited = function encodeDelimited(message, writer) {
	            return this.encode(message, writer).ldelim();
	        };
	        /**
	         * Decodes a CommandMessage message from the specified reader or buffer.
	         * @function decode
	         * @memberof whiteboard.CommandMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @param {number} [length] Message length if known beforehand
	         * @returns {whiteboard.CommandMessage} CommandMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        CommandMessage.decode = function decode(reader, length) {
	            if (!(reader instanceof $Reader))
	                reader = $Reader.create(reader);
	            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.CommandMessage();
	            while (reader.pos < end) {
	                var tag = reader.uint32();
	                switch (tag >>> 3) {
	                    case 1:
	                        message.command = reader.string();
	                        break;
	                    default:
	                        reader.skipType(tag & 7);
	                        break;
	                }
	            }
	            return message;
	        };
	        /**
	         * Decodes a CommandMessage message from the specified reader or buffer, length delimited.
	         * @function decodeDelimited
	         * @memberof whiteboard.CommandMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @returns {whiteboard.CommandMessage} CommandMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        CommandMessage.decodeDelimited = function decodeDelimited(reader) {
	            if (!(reader instanceof $Reader))
	                reader = new $Reader(reader);
	            return this.decode(reader, reader.uint32());
	        };
	        /**
	         * Verifies a CommandMessage message.
	         * @function verify
	         * @memberof whiteboard.CommandMessage
	         * @static
	         * @param {Object.<string,*>} message Plain object to verify
	         * @returns {string|null} `null` if valid, otherwise the reason why it is not
	         */
	        CommandMessage.verify = function verify(message) {
	            if (typeof message !== "object" || message === null)
	                return "object expected";
	            if (message.command != null && message.hasOwnProperty("command"))
	                if (!$util.isString(message.command))
	                    return "command: string expected";
	            return null;
	        };
	        /**
	         * Creates a CommandMessage message from a plain object. Also converts values to their respective internal types.
	         * @function fromObject
	         * @memberof whiteboard.CommandMessage
	         * @static
	         * @param {Object.<string,*>} object Plain object
	         * @returns {whiteboard.CommandMessage} CommandMessage
	         */
	        CommandMessage.fromObject = function fromObject(object) {
	            if (object instanceof $root.whiteboard.CommandMessage)
	                return object;
	            var message = new $root.whiteboard.CommandMessage();
	            if (object.command != null)
	                message.command = String(object.command);
	            return message;
	        };
	        /**
	         * Creates a plain object from a CommandMessage message. Also converts values to other types if specified.
	         * @function toObject
	         * @memberof whiteboard.CommandMessage
	         * @static
	         * @param {whiteboard.CommandMessage} message CommandMessage
	         * @param {$protobuf.IConversionOptions} [options] Conversion options
	         * @returns {Object.<string,*>} Plain object
	         */
	        CommandMessage.toObject = function toObject(message, options) {
	            if (!options)
	                options = {};
	            var object = {};
	            if (options.defaults)
	                object.command = "";
	            if (message.command != null && message.hasOwnProperty("command"))
	                object.command = message.command;
	            return object;
	        };
	        /**
	         * Converts this CommandMessage to JSON.
	         * @function toJSON
	         * @memberof whiteboard.CommandMessage
	         * @instance
	         * @returns {Object.<string,*>} JSON object
	         */
	        CommandMessage.prototype.toJSON = function toJSON() {
	            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
	        };
	        return CommandMessage;
	    })();
	    whiteboard.EventMessage = (function () {
	        /**
	         * Properties of an EventMessage.
	         * @memberof whiteboard
	         * @interface IEventMessage
	         * @property {Uint8Array|null} [message] EventMessage message
	         * @property {string|null} [object] EventMessage object
	         */
	        /**
	         * Constructs a new EventMessage.
	         * @memberof whiteboard
	         * @classdesc Represents an EventMessage.
	         * @implements IEventMessage
	         * @constructor
	         * @param {whiteboard.IEventMessage=} [properties] Properties to set
	         */
	        function EventMessage(properties) {
	            if (properties)
	                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
	                    if (properties[keys[i]] != null)
	                        this[keys[i]] = properties[keys[i]];
	        }
	        /**
	         * EventMessage message.
	         * @member {Uint8Array} message
	         * @memberof whiteboard.EventMessage
	         * @instance
	         */
	        EventMessage.prototype.message = $util.newBuffer([]);
	        /**
	         * EventMessage object.
	         * @member {string} object
	         * @memberof whiteboard.EventMessage
	         * @instance
	         */
	        EventMessage.prototype.object = "";
	        /**
	         * Creates a new EventMessage instance using the specified properties.
	         * @function create
	         * @memberof whiteboard.EventMessage
	         * @static
	         * @param {whiteboard.IEventMessage=} [properties] Properties to set
	         * @returns {whiteboard.EventMessage} EventMessage instance
	         */
	        EventMessage.create = function create(properties) {
	            return new EventMessage(properties);
	        };
	        /**
	         * Encodes the specified EventMessage message. Does not implicitly {@link whiteboard.EventMessage.verify|verify} messages.
	         * @function encode
	         * @memberof whiteboard.EventMessage
	         * @static
	         * @param {whiteboard.IEventMessage} message EventMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        EventMessage.encode = function encode(message, writer) {
	            if (!writer)
	                writer = $Writer.create();
	            if (message.message != null && message.hasOwnProperty("message"))
	                writer.uint32(/* id 1, wireType 2 =*/ 10).bytes(message.message);
	            if (message.object != null && message.hasOwnProperty("object"))
	                writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.object);
	            return writer;
	        };
	        /**
	         * Encodes the specified EventMessage message, length delimited. Does not implicitly {@link whiteboard.EventMessage.verify|verify} messages.
	         * @function encodeDelimited
	         * @memberof whiteboard.EventMessage
	         * @static
	         * @param {whiteboard.IEventMessage} message EventMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        EventMessage.encodeDelimited = function encodeDelimited(message, writer) {
	            return this.encode(message, writer).ldelim();
	        };
	        /**
	         * Decodes an EventMessage message from the specified reader or buffer.
	         * @function decode
	         * @memberof whiteboard.EventMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @param {number} [length] Message length if known beforehand
	         * @returns {whiteboard.EventMessage} EventMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        EventMessage.decode = function decode(reader, length) {
	            if (!(reader instanceof $Reader))
	                reader = $Reader.create(reader);
	            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.EventMessage();
	            while (reader.pos < end) {
	                var tag = reader.uint32();
	                switch (tag >>> 3) {
	                    case 1:
	                        message.message = reader.bytes();
	                        break;
	                    case 2:
	                        message.object = reader.string();
	                        break;
	                    default:
	                        reader.skipType(tag & 7);
	                        break;
	                }
	            }
	            return message;
	        };
	        /**
	         * Decodes an EventMessage message from the specified reader or buffer, length delimited.
	         * @function decodeDelimited
	         * @memberof whiteboard.EventMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @returns {whiteboard.EventMessage} EventMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        EventMessage.decodeDelimited = function decodeDelimited(reader) {
	            if (!(reader instanceof $Reader))
	                reader = new $Reader(reader);
	            return this.decode(reader, reader.uint32());
	        };
	        /**
	         * Verifies an EventMessage message.
	         * @function verify
	         * @memberof whiteboard.EventMessage
	         * @static
	         * @param {Object.<string,*>} message Plain object to verify
	         * @returns {string|null} `null` if valid, otherwise the reason why it is not
	         */
	        EventMessage.verify = function verify(message) {
	            if (typeof message !== "object" || message === null)
	                return "object expected";
	            if (message.message != null && message.hasOwnProperty("message"))
	                if (!(message.message && typeof message.message.length === "number" || $util.isString(message.message)))
	                    return "message: buffer expected";
	            if (message.object != null && message.hasOwnProperty("object"))
	                if (!$util.isString(message.object))
	                    return "object: string expected";
	            return null;
	        };
	        /**
	         * Creates an EventMessage message from a plain object. Also converts values to their respective internal types.
	         * @function fromObject
	         * @memberof whiteboard.EventMessage
	         * @static
	         * @param {Object.<string,*>} object Plain object
	         * @returns {whiteboard.EventMessage} EventMessage
	         */
	        EventMessage.fromObject = function fromObject(object) {
	            if (object instanceof $root.whiteboard.EventMessage)
	                return object;
	            var message = new $root.whiteboard.EventMessage();
	            if (object.message != null)
	                if (typeof object.message === "string")
	                    $util.base64.decode(object.message, message.message = $util.newBuffer($util.base64.length(object.message)), 0);
	                else if (object.message.length)
	                    message.message = object.message;
	            if (object.object != null)
	                message.object = String(object.object);
	            return message;
	        };
	        /**
	         * Creates a plain object from an EventMessage message. Also converts values to other types if specified.
	         * @function toObject
	         * @memberof whiteboard.EventMessage
	         * @static
	         * @param {whiteboard.EventMessage} message EventMessage
	         * @param {$protobuf.IConversionOptions} [options] Conversion options
	         * @returns {Object.<string,*>} Plain object
	         */
	        EventMessage.toObject = function toObject(message, options) {
	            if (!options)
	                options = {};
	            var object = {};
	            if (options.defaults) {
	                if (options.bytes === String)
	                    object.message = "";
	                else {
	                    object.message = [];
	                    if (options.bytes !== Array)
	                        object.message = $util.newBuffer(object.message);
	                }
	                object.object = "";
	            }
	            if (message.message != null && message.hasOwnProperty("message"))
	                object.message = options.bytes === String ? $util.base64.encode(message.message, 0, message.message.length) : options.bytes === Array ? Array.prototype.slice.call(message.message) : message.message;
	            if (message.object != null && message.hasOwnProperty("object"))
	                object.object = message.object;
	            return object;
	        };
	        /**
	         * Converts this EventMessage to JSON.
	         * @function toJSON
	         * @memberof whiteboard.EventMessage
	         * @instance
	         * @returns {Object.<string,*>} JSON object
	         */
	        EventMessage.prototype.toJSON = function toJSON() {
	            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
	        };
	        return EventMessage;
	    })();
	    whiteboard.CreateObjectMessage = (function () {
	        /**
	         * Properties of a CreateObjectMessage.
	         * @memberof whiteboard
	         * @interface ICreateObjectMessage
	         * @property {string|null} [type] CreateObjectMessage type
	         * @property {number|null} [x] CreateObjectMessage x
	         * @property {number|null} [y] CreateObjectMessage y
	         * @property {string|null} [paramsJson] CreateObjectMessage paramsJson
	         */
	        /**
	         * Constructs a new CreateObjectMessage.
	         * @memberof whiteboard
	         * @classdesc Represents a CreateObjectMessage.
	         * @implements ICreateObjectMessage
	         * @constructor
	         * @param {whiteboard.ICreateObjectMessage=} [properties] Properties to set
	         */
	        function CreateObjectMessage(properties) {
	            if (properties)
	                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
	                    if (properties[keys[i]] != null)
	                        this[keys[i]] = properties[keys[i]];
	        }
	        /**
	         * CreateObjectMessage type.
	         * @member {string} type
	         * @memberof whiteboard.CreateObjectMessage
	         * @instance
	         */
	        CreateObjectMessage.prototype.type = "";
	        /**
	         * CreateObjectMessage x.
	         * @member {number} x
	         * @memberof whiteboard.CreateObjectMessage
	         * @instance
	         */
	        CreateObjectMessage.prototype.x = 0;
	        /**
	         * CreateObjectMessage y.
	         * @member {number} y
	         * @memberof whiteboard.CreateObjectMessage
	         * @instance
	         */
	        CreateObjectMessage.prototype.y = 0;
	        /**
	         * CreateObjectMessage paramsJson.
	         * @member {string} paramsJson
	         * @memberof whiteboard.CreateObjectMessage
	         * @instance
	         */
	        CreateObjectMessage.prototype.paramsJson = "";
	        /**
	         * Creates a new CreateObjectMessage instance using the specified properties.
	         * @function create
	         * @memberof whiteboard.CreateObjectMessage
	         * @static
	         * @param {whiteboard.ICreateObjectMessage=} [properties] Properties to set
	         * @returns {whiteboard.CreateObjectMessage} CreateObjectMessage instance
	         */
	        CreateObjectMessage.create = function create(properties) {
	            return new CreateObjectMessage(properties);
	        };
	        /**
	         * Encodes the specified CreateObjectMessage message. Does not implicitly {@link whiteboard.CreateObjectMessage.verify|verify} messages.
	         * @function encode
	         * @memberof whiteboard.CreateObjectMessage
	         * @static
	         * @param {whiteboard.ICreateObjectMessage} message CreateObjectMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        CreateObjectMessage.encode = function encode(message, writer) {
	            if (!writer)
	                writer = $Writer.create();
	            if (message.type != null && message.hasOwnProperty("type"))
	                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.type);
	            if (message.x != null && message.hasOwnProperty("x"))
	                writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.x);
	            if (message.y != null && message.hasOwnProperty("y"))
	                writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.y);
	            if (message.paramsJson != null && message.hasOwnProperty("paramsJson"))
	                writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.paramsJson);
	            return writer;
	        };
	        /**
	         * Encodes the specified CreateObjectMessage message, length delimited. Does not implicitly {@link whiteboard.CreateObjectMessage.verify|verify} messages.
	         * @function encodeDelimited
	         * @memberof whiteboard.CreateObjectMessage
	         * @static
	         * @param {whiteboard.ICreateObjectMessage} message CreateObjectMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        CreateObjectMessage.encodeDelimited = function encodeDelimited(message, writer) {
	            return this.encode(message, writer).ldelim();
	        };
	        /**
	         * Decodes a CreateObjectMessage message from the specified reader or buffer.
	         * @function decode
	         * @memberof whiteboard.CreateObjectMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @param {number} [length] Message length if known beforehand
	         * @returns {whiteboard.CreateObjectMessage} CreateObjectMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        CreateObjectMessage.decode = function decode(reader, length) {
	            if (!(reader instanceof $Reader))
	                reader = $Reader.create(reader);
	            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.CreateObjectMessage();
	            while (reader.pos < end) {
	                var tag = reader.uint32();
	                switch (tag >>> 3) {
	                    case 1:
	                        message.type = reader.string();
	                        break;
	                    case 2:
	                        message.x = reader.uint32();
	                        break;
	                    case 3:
	                        message.y = reader.uint32();
	                        break;
	                    case 4:
	                        message.paramsJson = reader.string();
	                        break;
	                    default:
	                        reader.skipType(tag & 7);
	                        break;
	                }
	            }
	            return message;
	        };
	        /**
	         * Decodes a CreateObjectMessage message from the specified reader or buffer, length delimited.
	         * @function decodeDelimited
	         * @memberof whiteboard.CreateObjectMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @returns {whiteboard.CreateObjectMessage} CreateObjectMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        CreateObjectMessage.decodeDelimited = function decodeDelimited(reader) {
	            if (!(reader instanceof $Reader))
	                reader = new $Reader(reader);
	            return this.decode(reader, reader.uint32());
	        };
	        /**
	         * Verifies a CreateObjectMessage message.
	         * @function verify
	         * @memberof whiteboard.CreateObjectMessage
	         * @static
	         * @param {Object.<string,*>} message Plain object to verify
	         * @returns {string|null} `null` if valid, otherwise the reason why it is not
	         */
	        CreateObjectMessage.verify = function verify(message) {
	            if (typeof message !== "object" || message === null)
	                return "object expected";
	            if (message.type != null && message.hasOwnProperty("type"))
	                if (!$util.isString(message.type))
	                    return "type: string expected";
	            if (message.x != null && message.hasOwnProperty("x"))
	                if (!$util.isInteger(message.x))
	                    return "x: integer expected";
	            if (message.y != null && message.hasOwnProperty("y"))
	                if (!$util.isInteger(message.y))
	                    return "y: integer expected";
	            if (message.paramsJson != null && message.hasOwnProperty("paramsJson"))
	                if (!$util.isString(message.paramsJson))
	                    return "paramsJson: string expected";
	            return null;
	        };
	        /**
	         * Creates a CreateObjectMessage message from a plain object. Also converts values to their respective internal types.
	         * @function fromObject
	         * @memberof whiteboard.CreateObjectMessage
	         * @static
	         * @param {Object.<string,*>} object Plain object
	         * @returns {whiteboard.CreateObjectMessage} CreateObjectMessage
	         */
	        CreateObjectMessage.fromObject = function fromObject(object) {
	            if (object instanceof $root.whiteboard.CreateObjectMessage)
	                return object;
	            var message = new $root.whiteboard.CreateObjectMessage();
	            if (object.type != null)
	                message.type = String(object.type);
	            if (object.x != null)
	                message.x = object.x >>> 0;
	            if (object.y != null)
	                message.y = object.y >>> 0;
	            if (object.paramsJson != null)
	                message.paramsJson = String(object.paramsJson);
	            return message;
	        };
	        /**
	         * Creates a plain object from a CreateObjectMessage message. Also converts values to other types if specified.
	         * @function toObject
	         * @memberof whiteboard.CreateObjectMessage
	         * @static
	         * @param {whiteboard.CreateObjectMessage} message CreateObjectMessage
	         * @param {$protobuf.IConversionOptions} [options] Conversion options
	         * @returns {Object.<string,*>} Plain object
	         */
	        CreateObjectMessage.toObject = function toObject(message, options) {
	            if (!options)
	                options = {};
	            var object = {};
	            if (options.defaults) {
	                object.type = "";
	                object.x = 0;
	                object.y = 0;
	                object.paramsJson = "";
	            }
	            if (message.type != null && message.hasOwnProperty("type"))
	                object.type = message.type;
	            if (message.x != null && message.hasOwnProperty("x"))
	                object.x = message.x;
	            if (message.y != null && message.hasOwnProperty("y"))
	                object.y = message.y;
	            if (message.paramsJson != null && message.hasOwnProperty("paramsJson"))
	                object.paramsJson = message.paramsJson;
	            return object;
	        };
	        /**
	         * Converts this CreateObjectMessage to JSON.
	         * @function toJSON
	         * @memberof whiteboard.CreateObjectMessage
	         * @instance
	         * @returns {Object.<string,*>} JSON object
	         */
	        CreateObjectMessage.prototype.toJSON = function toJSON() {
	            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
	        };
	        return CreateObjectMessage;
	    })();
	    whiteboard.DeleteObjectMessage = (function () {
	        /**
	         * Properties of a DeleteObjectMessage.
	         * @memberof whiteboard
	         * @interface IDeleteObjectMessage
	         * @property {string|null} [name] DeleteObjectMessage name
	         */
	        /**
	         * Constructs a new DeleteObjectMessage.
	         * @memberof whiteboard
	         * @classdesc Represents a DeleteObjectMessage.
	         * @implements IDeleteObjectMessage
	         * @constructor
	         * @param {whiteboard.IDeleteObjectMessage=} [properties] Properties to set
	         */
	        function DeleteObjectMessage(properties) {
	            if (properties)
	                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
	                    if (properties[keys[i]] != null)
	                        this[keys[i]] = properties[keys[i]];
	        }
	        /**
	         * DeleteObjectMessage name.
	         * @member {string} name
	         * @memberof whiteboard.DeleteObjectMessage
	         * @instance
	         */
	        DeleteObjectMessage.prototype.name = "";
	        /**
	         * Creates a new DeleteObjectMessage instance using the specified properties.
	         * @function create
	         * @memberof whiteboard.DeleteObjectMessage
	         * @static
	         * @param {whiteboard.IDeleteObjectMessage=} [properties] Properties to set
	         * @returns {whiteboard.DeleteObjectMessage} DeleteObjectMessage instance
	         */
	        DeleteObjectMessage.create = function create(properties) {
	            return new DeleteObjectMessage(properties);
	        };
	        /**
	         * Encodes the specified DeleteObjectMessage message. Does not implicitly {@link whiteboard.DeleteObjectMessage.verify|verify} messages.
	         * @function encode
	         * @memberof whiteboard.DeleteObjectMessage
	         * @static
	         * @param {whiteboard.IDeleteObjectMessage} message DeleteObjectMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        DeleteObjectMessage.encode = function encode(message, writer) {
	            if (!writer)
	                writer = $Writer.create();
	            if (message.name != null && message.hasOwnProperty("name"))
	                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.name);
	            return writer;
	        };
	        /**
	         * Encodes the specified DeleteObjectMessage message, length delimited. Does not implicitly {@link whiteboard.DeleteObjectMessage.verify|verify} messages.
	         * @function encodeDelimited
	         * @memberof whiteboard.DeleteObjectMessage
	         * @static
	         * @param {whiteboard.IDeleteObjectMessage} message DeleteObjectMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        DeleteObjectMessage.encodeDelimited = function encodeDelimited(message, writer) {
	            return this.encode(message, writer).ldelim();
	        };
	        /**
	         * Decodes a DeleteObjectMessage message from the specified reader or buffer.
	         * @function decode
	         * @memberof whiteboard.DeleteObjectMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @param {number} [length] Message length if known beforehand
	         * @returns {whiteboard.DeleteObjectMessage} DeleteObjectMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        DeleteObjectMessage.decode = function decode(reader, length) {
	            if (!(reader instanceof $Reader))
	                reader = $Reader.create(reader);
	            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.DeleteObjectMessage();
	            while (reader.pos < end) {
	                var tag = reader.uint32();
	                switch (tag >>> 3) {
	                    case 1:
	                        message.name = reader.string();
	                        break;
	                    default:
	                        reader.skipType(tag & 7);
	                        break;
	                }
	            }
	            return message;
	        };
	        /**
	         * Decodes a DeleteObjectMessage message from the specified reader or buffer, length delimited.
	         * @function decodeDelimited
	         * @memberof whiteboard.DeleteObjectMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @returns {whiteboard.DeleteObjectMessage} DeleteObjectMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        DeleteObjectMessage.decodeDelimited = function decodeDelimited(reader) {
	            if (!(reader instanceof $Reader))
	                reader = new $Reader(reader);
	            return this.decode(reader, reader.uint32());
	        };
	        /**
	         * Verifies a DeleteObjectMessage message.
	         * @function verify
	         * @memberof whiteboard.DeleteObjectMessage
	         * @static
	         * @param {Object.<string,*>} message Plain object to verify
	         * @returns {string|null} `null` if valid, otherwise the reason why it is not
	         */
	        DeleteObjectMessage.verify = function verify(message) {
	            if (typeof message !== "object" || message === null)
	                return "object expected";
	            if (message.name != null && message.hasOwnProperty("name"))
	                if (!$util.isString(message.name))
	                    return "name: string expected";
	            return null;
	        };
	        /**
	         * Creates a DeleteObjectMessage message from a plain object. Also converts values to their respective internal types.
	         * @function fromObject
	         * @memberof whiteboard.DeleteObjectMessage
	         * @static
	         * @param {Object.<string,*>} object Plain object
	         * @returns {whiteboard.DeleteObjectMessage} DeleteObjectMessage
	         */
	        DeleteObjectMessage.fromObject = function fromObject(object) {
	            if (object instanceof $root.whiteboard.DeleteObjectMessage)
	                return object;
	            var message = new $root.whiteboard.DeleteObjectMessage();
	            if (object.name != null)
	                message.name = String(object.name);
	            return message;
	        };
	        /**
	         * Creates a plain object from a DeleteObjectMessage message. Also converts values to other types if specified.
	         * @function toObject
	         * @memberof whiteboard.DeleteObjectMessage
	         * @static
	         * @param {whiteboard.DeleteObjectMessage} message DeleteObjectMessage
	         * @param {$protobuf.IConversionOptions} [options] Conversion options
	         * @returns {Object.<string,*>} Plain object
	         */
	        DeleteObjectMessage.toObject = function toObject(message, options) {
	            if (!options)
	                options = {};
	            var object = {};
	            if (options.defaults)
	                object.name = "";
	            if (message.name != null && message.hasOwnProperty("name"))
	                object.name = message.name;
	            return object;
	        };
	        /**
	         * Converts this DeleteObjectMessage to JSON.
	         * @function toJSON
	         * @memberof whiteboard.DeleteObjectMessage
	         * @instance
	         * @returns {Object.<string,*>} JSON object
	         */
	        DeleteObjectMessage.prototype.toJSON = function toJSON() {
	            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
	        };
	        return DeleteObjectMessage;
	    })();
	    whiteboard.DeleteObjectsMessage = (function () {
	        /**
	         * Properties of a DeleteObjectsMessage.
	         * @memberof whiteboard
	         * @interface IDeleteObjectsMessage
	         * @property {Array.<string>|null} [names] DeleteObjectsMessage names
	         */
	        /**
	         * Constructs a new DeleteObjectsMessage.
	         * @memberof whiteboard
	         * @classdesc Represents a DeleteObjectsMessage.
	         * @implements IDeleteObjectsMessage
	         * @constructor
	         * @param {whiteboard.IDeleteObjectsMessage=} [properties] Properties to set
	         */
	        function DeleteObjectsMessage(properties) {
	            this.names = [];
	            if (properties)
	                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
	                    if (properties[keys[i]] != null)
	                        this[keys[i]] = properties[keys[i]];
	        }
	        /**
	         * DeleteObjectsMessage names.
	         * @member {Array.<string>} names
	         * @memberof whiteboard.DeleteObjectsMessage
	         * @instance
	         */
	        DeleteObjectsMessage.prototype.names = $util.emptyArray;
	        /**
	         * Creates a new DeleteObjectsMessage instance using the specified properties.
	         * @function create
	         * @memberof whiteboard.DeleteObjectsMessage
	         * @static
	         * @param {whiteboard.IDeleteObjectsMessage=} [properties] Properties to set
	         * @returns {whiteboard.DeleteObjectsMessage} DeleteObjectsMessage instance
	         */
	        DeleteObjectsMessage.create = function create(properties) {
	            return new DeleteObjectsMessage(properties);
	        };
	        /**
	         * Encodes the specified DeleteObjectsMessage message. Does not implicitly {@link whiteboard.DeleteObjectsMessage.verify|verify} messages.
	         * @function encode
	         * @memberof whiteboard.DeleteObjectsMessage
	         * @static
	         * @param {whiteboard.IDeleteObjectsMessage} message DeleteObjectsMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        DeleteObjectsMessage.encode = function encode(message, writer) {
	            if (!writer)
	                writer = $Writer.create();
	            if (message.names != null && message.names.length)
	                for (var i = 0; i < message.names.length; ++i)
	                    writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.names[i]);
	            return writer;
	        };
	        /**
	         * Encodes the specified DeleteObjectsMessage message, length delimited. Does not implicitly {@link whiteboard.DeleteObjectsMessage.verify|verify} messages.
	         * @function encodeDelimited
	         * @memberof whiteboard.DeleteObjectsMessage
	         * @static
	         * @param {whiteboard.IDeleteObjectsMessage} message DeleteObjectsMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        DeleteObjectsMessage.encodeDelimited = function encodeDelimited(message, writer) {
	            return this.encode(message, writer).ldelim();
	        };
	        /**
	         * Decodes a DeleteObjectsMessage message from the specified reader or buffer.
	         * @function decode
	         * @memberof whiteboard.DeleteObjectsMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @param {number} [length] Message length if known beforehand
	         * @returns {whiteboard.DeleteObjectsMessage} DeleteObjectsMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        DeleteObjectsMessage.decode = function decode(reader, length) {
	            if (!(reader instanceof $Reader))
	                reader = $Reader.create(reader);
	            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.DeleteObjectsMessage();
	            while (reader.pos < end) {
	                var tag = reader.uint32();
	                switch (tag >>> 3) {
	                    case 1:
	                        if (!(message.names && message.names.length))
	                            message.names = [];
	                        message.names.push(reader.string());
	                        break;
	                    default:
	                        reader.skipType(tag & 7);
	                        break;
	                }
	            }
	            return message;
	        };
	        /**
	         * Decodes a DeleteObjectsMessage message from the specified reader or buffer, length delimited.
	         * @function decodeDelimited
	         * @memberof whiteboard.DeleteObjectsMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @returns {whiteboard.DeleteObjectsMessage} DeleteObjectsMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        DeleteObjectsMessage.decodeDelimited = function decodeDelimited(reader) {
	            if (!(reader instanceof $Reader))
	                reader = new $Reader(reader);
	            return this.decode(reader, reader.uint32());
	        };
	        /**
	         * Verifies a DeleteObjectsMessage message.
	         * @function verify
	         * @memberof whiteboard.DeleteObjectsMessage
	         * @static
	         * @param {Object.<string,*>} message Plain object to verify
	         * @returns {string|null} `null` if valid, otherwise the reason why it is not
	         */
	        DeleteObjectsMessage.verify = function verify(message) {
	            if (typeof message !== "object" || message === null)
	                return "object expected";
	            if (message.names != null && message.hasOwnProperty("names")) {
	                if (!Array.isArray(message.names))
	                    return "names: array expected";
	                for (var i = 0; i < message.names.length; ++i)
	                    if (!$util.isString(message.names[i]))
	                        return "names: string[] expected";
	            }
	            return null;
	        };
	        /**
	         * Creates a DeleteObjectsMessage message from a plain object. Also converts values to their respective internal types.
	         * @function fromObject
	         * @memberof whiteboard.DeleteObjectsMessage
	         * @static
	         * @param {Object.<string,*>} object Plain object
	         * @returns {whiteboard.DeleteObjectsMessage} DeleteObjectsMessage
	         */
	        DeleteObjectsMessage.fromObject = function fromObject(object) {
	            if (object instanceof $root.whiteboard.DeleteObjectsMessage)
	                return object;
	            var message = new $root.whiteboard.DeleteObjectsMessage();
	            if (object.names) {
	                if (!Array.isArray(object.names))
	                    throw TypeError(".whiteboard.DeleteObjectsMessage.names: array expected");
	                message.names = [];
	                for (var i = 0; i < object.names.length; ++i)
	                    message.names[i] = String(object.names[i]);
	            }
	            return message;
	        };
	        /**
	         * Creates a plain object from a DeleteObjectsMessage message. Also converts values to other types if specified.
	         * @function toObject
	         * @memberof whiteboard.DeleteObjectsMessage
	         * @static
	         * @param {whiteboard.DeleteObjectsMessage} message DeleteObjectsMessage
	         * @param {$protobuf.IConversionOptions} [options] Conversion options
	         * @returns {Object.<string,*>} Plain object
	         */
	        DeleteObjectsMessage.toObject = function toObject(message, options) {
	            if (!options)
	                options = {};
	            var object = {};
	            if (options.arrays || options.defaults)
	                object.names = [];
	            if (message.names && message.names.length) {
	                object.names = [];
	                for (var j = 0; j < message.names.length; ++j)
	                    object.names[j] = message.names[j];
	            }
	            return object;
	        };
	        /**
	         * Converts this DeleteObjectsMessage to JSON.
	         * @function toJSON
	         * @memberof whiteboard.DeleteObjectsMessage
	         * @instance
	         * @returns {Object.<string,*>} JSON object
	         */
	        DeleteObjectsMessage.prototype.toJSON = function toJSON() {
	            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
	        };
	        return DeleteObjectsMessage;
	    })();
	    whiteboard.SetObjectPropertyMessage = (function () {
	        /**
	         * Properties of a SetObjectPropertyMessage.
	         * @memberof whiteboard
	         * @interface ISetObjectPropertyMessage
	         * @property {string|null} [name] SetObjectPropertyMessage name
	         * @property {string|null} [propName] SetObjectPropertyMessage propName
	         * @property {string|null} [propValueJson] SetObjectPropertyMessage propValueJson
	         */
	        /**
	         * Constructs a new SetObjectPropertyMessage.
	         * @memberof whiteboard
	         * @classdesc Represents a SetObjectPropertyMessage.
	         * @implements ISetObjectPropertyMessage
	         * @constructor
	         * @param {whiteboard.ISetObjectPropertyMessage=} [properties] Properties to set
	         */
	        function SetObjectPropertyMessage(properties) {
	            if (properties)
	                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
	                    if (properties[keys[i]] != null)
	                        this[keys[i]] = properties[keys[i]];
	        }
	        /**
	         * SetObjectPropertyMessage name.
	         * @member {string} name
	         * @memberof whiteboard.SetObjectPropertyMessage
	         * @instance
	         */
	        SetObjectPropertyMessage.prototype.name = "";
	        /**
	         * SetObjectPropertyMessage propName.
	         * @member {string} propName
	         * @memberof whiteboard.SetObjectPropertyMessage
	         * @instance
	         */
	        SetObjectPropertyMessage.prototype.propName = "";
	        /**
	         * SetObjectPropertyMessage propValueJson.
	         * @member {string} propValueJson
	         * @memberof whiteboard.SetObjectPropertyMessage
	         * @instance
	         */
	        SetObjectPropertyMessage.prototype.propValueJson = "";
	        /**
	         * Creates a new SetObjectPropertyMessage instance using the specified properties.
	         * @function create
	         * @memberof whiteboard.SetObjectPropertyMessage
	         * @static
	         * @param {whiteboard.ISetObjectPropertyMessage=} [properties] Properties to set
	         * @returns {whiteboard.SetObjectPropertyMessage} SetObjectPropertyMessage instance
	         */
	        SetObjectPropertyMessage.create = function create(properties) {
	            return new SetObjectPropertyMessage(properties);
	        };
	        /**
	         * Encodes the specified SetObjectPropertyMessage message. Does not implicitly {@link whiteboard.SetObjectPropertyMessage.verify|verify} messages.
	         * @function encode
	         * @memberof whiteboard.SetObjectPropertyMessage
	         * @static
	         * @param {whiteboard.ISetObjectPropertyMessage} message SetObjectPropertyMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        SetObjectPropertyMessage.encode = function encode(message, writer) {
	            if (!writer)
	                writer = $Writer.create();
	            if (message.name != null && message.hasOwnProperty("name"))
	                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.name);
	            if (message.propName != null && message.hasOwnProperty("propName"))
	                writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.propName);
	            if (message.propValueJson != null && message.hasOwnProperty("propValueJson"))
	                writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.propValueJson);
	            return writer;
	        };
	        /**
	         * Encodes the specified SetObjectPropertyMessage message, length delimited. Does not implicitly {@link whiteboard.SetObjectPropertyMessage.verify|verify} messages.
	         * @function encodeDelimited
	         * @memberof whiteboard.SetObjectPropertyMessage
	         * @static
	         * @param {whiteboard.ISetObjectPropertyMessage} message SetObjectPropertyMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        SetObjectPropertyMessage.encodeDelimited = function encodeDelimited(message, writer) {
	            return this.encode(message, writer).ldelim();
	        };
	        /**
	         * Decodes a SetObjectPropertyMessage message from the specified reader or buffer.
	         * @function decode
	         * @memberof whiteboard.SetObjectPropertyMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @param {number} [length] Message length if known beforehand
	         * @returns {whiteboard.SetObjectPropertyMessage} SetObjectPropertyMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        SetObjectPropertyMessage.decode = function decode(reader, length) {
	            if (!(reader instanceof $Reader))
	                reader = $Reader.create(reader);
	            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.SetObjectPropertyMessage();
	            while (reader.pos < end) {
	                var tag = reader.uint32();
	                switch (tag >>> 3) {
	                    case 1:
	                        message.name = reader.string();
	                        break;
	                    case 2:
	                        message.propName = reader.string();
	                        break;
	                    case 3:
	                        message.propValueJson = reader.string();
	                        break;
	                    default:
	                        reader.skipType(tag & 7);
	                        break;
	                }
	            }
	            return message;
	        };
	        /**
	         * Decodes a SetObjectPropertyMessage message from the specified reader or buffer, length delimited.
	         * @function decodeDelimited
	         * @memberof whiteboard.SetObjectPropertyMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @returns {whiteboard.SetObjectPropertyMessage} SetObjectPropertyMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        SetObjectPropertyMessage.decodeDelimited = function decodeDelimited(reader) {
	            if (!(reader instanceof $Reader))
	                reader = new $Reader(reader);
	            return this.decode(reader, reader.uint32());
	        };
	        /**
	         * Verifies a SetObjectPropertyMessage message.
	         * @function verify
	         * @memberof whiteboard.SetObjectPropertyMessage
	         * @static
	         * @param {Object.<string,*>} message Plain object to verify
	         * @returns {string|null} `null` if valid, otherwise the reason why it is not
	         */
	        SetObjectPropertyMessage.verify = function verify(message) {
	            if (typeof message !== "object" || message === null)
	                return "object expected";
	            if (message.name != null && message.hasOwnProperty("name"))
	                if (!$util.isString(message.name))
	                    return "name: string expected";
	            if (message.propName != null && message.hasOwnProperty("propName"))
	                if (!$util.isString(message.propName))
	                    return "propName: string expected";
	            if (message.propValueJson != null && message.hasOwnProperty("propValueJson"))
	                if (!$util.isString(message.propValueJson))
	                    return "propValueJson: string expected";
	            return null;
	        };
	        /**
	         * Creates a SetObjectPropertyMessage message from a plain object. Also converts values to their respective internal types.
	         * @function fromObject
	         * @memberof whiteboard.SetObjectPropertyMessage
	         * @static
	         * @param {Object.<string,*>} object Plain object
	         * @returns {whiteboard.SetObjectPropertyMessage} SetObjectPropertyMessage
	         */
	        SetObjectPropertyMessage.fromObject = function fromObject(object) {
	            if (object instanceof $root.whiteboard.SetObjectPropertyMessage)
	                return object;
	            var message = new $root.whiteboard.SetObjectPropertyMessage();
	            if (object.name != null)
	                message.name = String(object.name);
	            if (object.propName != null)
	                message.propName = String(object.propName);
	            if (object.propValueJson != null)
	                message.propValueJson = String(object.propValueJson);
	            return message;
	        };
	        /**
	         * Creates a plain object from a SetObjectPropertyMessage message. Also converts values to other types if specified.
	         * @function toObject
	         * @memberof whiteboard.SetObjectPropertyMessage
	         * @static
	         * @param {whiteboard.SetObjectPropertyMessage} message SetObjectPropertyMessage
	         * @param {$protobuf.IConversionOptions} [options] Conversion options
	         * @returns {Object.<string,*>} Plain object
	         */
	        SetObjectPropertyMessage.toObject = function toObject(message, options) {
	            if (!options)
	                options = {};
	            var object = {};
	            if (options.defaults) {
	                object.name = "";
	                object.propName = "";
	                object.propValueJson = "";
	            }
	            if (message.name != null && message.hasOwnProperty("name"))
	                object.name = message.name;
	            if (message.propName != null && message.hasOwnProperty("propName"))
	                object.propName = message.propName;
	            if (message.propValueJson != null && message.hasOwnProperty("propValueJson"))
	                object.propValueJson = message.propValueJson;
	            return object;
	        };
	        /**
	         * Converts this SetObjectPropertyMessage to JSON.
	         * @function toJSON
	         * @memberof whiteboard.SetObjectPropertyMessage
	         * @instance
	         * @returns {Object.<string,*>} JSON object
	         */
	        SetObjectPropertyMessage.prototype.toJSON = function toJSON() {
	            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
	        };
	        return SetObjectPropertyMessage;
	    })();
	    whiteboard.Point = (function () {
	        /**
	         * Properties of a Point.
	         * @memberof whiteboard
	         * @interface IPoint
	         * @property {number|null} [x] Point x
	         * @property {number|null} [y] Point y
	         */
	        /**
	         * Constructs a new Point.
	         * @memberof whiteboard
	         * @classdesc Represents a Point.
	         * @implements IPoint
	         * @constructor
	         * @param {whiteboard.IPoint=} [properties] Properties to set
	         */
	        function Point(properties) {
	            if (properties)
	                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
	                    if (properties[keys[i]] != null)
	                        this[keys[i]] = properties[keys[i]];
	        }
	        /**
	         * Point x.
	         * @member {number} x
	         * @memberof whiteboard.Point
	         * @instance
	         */
	        Point.prototype.x = 0;
	        /**
	         * Point y.
	         * @member {number} y
	         * @memberof whiteboard.Point
	         * @instance
	         */
	        Point.prototype.y = 0;
	        /**
	         * Creates a new Point instance using the specified properties.
	         * @function create
	         * @memberof whiteboard.Point
	         * @static
	         * @param {whiteboard.IPoint=} [properties] Properties to set
	         * @returns {whiteboard.Point} Point instance
	         */
	        Point.create = function create(properties) {
	            return new Point(properties);
	        };
	        /**
	         * Encodes the specified Point message. Does not implicitly {@link whiteboard.Point.verify|verify} messages.
	         * @function encode
	         * @memberof whiteboard.Point
	         * @static
	         * @param {whiteboard.IPoint} message Point message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        Point.encode = function encode(message, writer) {
	            if (!writer)
	                writer = $Writer.create();
	            if (message.x != null && message.hasOwnProperty("x"))
	                writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.x);
	            if (message.y != null && message.hasOwnProperty("y"))
	                writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.y);
	            return writer;
	        };
	        /**
	         * Encodes the specified Point message, length delimited. Does not implicitly {@link whiteboard.Point.verify|verify} messages.
	         * @function encodeDelimited
	         * @memberof whiteboard.Point
	         * @static
	         * @param {whiteboard.IPoint} message Point message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        Point.encodeDelimited = function encodeDelimited(message, writer) {
	            return this.encode(message, writer).ldelim();
	        };
	        /**
	         * Decodes a Point message from the specified reader or buffer.
	         * @function decode
	         * @memberof whiteboard.Point
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @param {number} [length] Message length if known beforehand
	         * @returns {whiteboard.Point} Point
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        Point.decode = function decode(reader, length) {
	            if (!(reader instanceof $Reader))
	                reader = $Reader.create(reader);
	            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.Point();
	            while (reader.pos < end) {
	                var tag = reader.uint32();
	                switch (tag >>> 3) {
	                    case 1:
	                        message.x = reader.uint32();
	                        break;
	                    case 2:
	                        message.y = reader.uint32();
	                        break;
	                    default:
	                        reader.skipType(tag & 7);
	                        break;
	                }
	            }
	            return message;
	        };
	        /**
	         * Decodes a Point message from the specified reader or buffer, length delimited.
	         * @function decodeDelimited
	         * @memberof whiteboard.Point
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @returns {whiteboard.Point} Point
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        Point.decodeDelimited = function decodeDelimited(reader) {
	            if (!(reader instanceof $Reader))
	                reader = new $Reader(reader);
	            return this.decode(reader, reader.uint32());
	        };
	        /**
	         * Verifies a Point message.
	         * @function verify
	         * @memberof whiteboard.Point
	         * @static
	         * @param {Object.<string,*>} message Plain object to verify
	         * @returns {string|null} `null` if valid, otherwise the reason why it is not
	         */
	        Point.verify = function verify(message) {
	            if (typeof message !== "object" || message === null)
	                return "object expected";
	            if (message.x != null && message.hasOwnProperty("x"))
	                if (!$util.isInteger(message.x))
	                    return "x: integer expected";
	            if (message.y != null && message.hasOwnProperty("y"))
	                if (!$util.isInteger(message.y))
	                    return "y: integer expected";
	            return null;
	        };
	        /**
	         * Creates a Point message from a plain object. Also converts values to their respective internal types.
	         * @function fromObject
	         * @memberof whiteboard.Point
	         * @static
	         * @param {Object.<string,*>} object Plain object
	         * @returns {whiteboard.Point} Point
	         */
	        Point.fromObject = function fromObject(object) {
	            if (object instanceof $root.whiteboard.Point)
	                return object;
	            var message = new $root.whiteboard.Point();
	            if (object.x != null)
	                message.x = object.x >>> 0;
	            if (object.y != null)
	                message.y = object.y >>> 0;
	            return message;
	        };
	        /**
	         * Creates a plain object from a Point message. Also converts values to other types if specified.
	         * @function toObject
	         * @memberof whiteboard.Point
	         * @static
	         * @param {whiteboard.Point} message Point
	         * @param {$protobuf.IConversionOptions} [options] Conversion options
	         * @returns {Object.<string,*>} Plain object
	         */
	        Point.toObject = function toObject(message, options) {
	            if (!options)
	                options = {};
	            var object = {};
	            if (options.defaults) {
	                object.x = 0;
	                object.y = 0;
	            }
	            if (message.x != null && message.hasOwnProperty("x"))
	                object.x = message.x;
	            if (message.y != null && message.hasOwnProperty("y"))
	                object.y = message.y;
	            return object;
	        };
	        /**
	         * Converts this Point to JSON.
	         * @function toJSON
	         * @memberof whiteboard.Point
	         * @instance
	         * @returns {Object.<string,*>} JSON object
	         */
	        Point.prototype.toJSON = function toJSON() {
	            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
	        };
	        return Point;
	    })();
	    whiteboard.StrokeMessage = (function () {
	        /**
	         * Properties of a StrokeMessage.
	         * @memberof whiteboard
	         * @interface IStrokeMessage
	         * @property {string|null} [entityName] StrokeMessage entityName
	         * @property {whiteboard.StrokeType|null} [type] StrokeMessage type
	         * @property {Array.<whiteboard.IPoint>|null} [points] StrokeMessage points
	         * @property {number|null} [lineWidth] StrokeMessage lineWidth
	         * @property {string|null} [color] StrokeMessage color
	         * @property {number|null} [size] StrokeMessage size
	         */
	        /**
	         * Constructs a new StrokeMessage.
	         * @memberof whiteboard
	         * @classdesc Represents a StrokeMessage.
	         * @implements IStrokeMessage
	         * @constructor
	         * @param {whiteboard.IStrokeMessage=} [properties] Properties to set
	         */
	        function StrokeMessage(properties) {
	            this.points = [];
	            if (properties)
	                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
	                    if (properties[keys[i]] != null)
	                        this[keys[i]] = properties[keys[i]];
	        }
	        /**
	         * StrokeMessage entityName.
	         * @member {string} entityName
	         * @memberof whiteboard.StrokeMessage
	         * @instance
	         */
	        StrokeMessage.prototype.entityName = "";
	        /**
	         * StrokeMessage type.
	         * @member {whiteboard.StrokeType} type
	         * @memberof whiteboard.StrokeMessage
	         * @instance
	         */
	        StrokeMessage.prototype.type = 1;
	        /**
	         * StrokeMessage points.
	         * @member {Array.<whiteboard.IPoint>} points
	         * @memberof whiteboard.StrokeMessage
	         * @instance
	         */
	        StrokeMessage.prototype.points = $util.emptyArray;
	        /**
	         * StrokeMessage lineWidth.
	         * @member {number} lineWidth
	         * @memberof whiteboard.StrokeMessage
	         * @instance
	         */
	        StrokeMessage.prototype.lineWidth = 0;
	        /**
	         * StrokeMessage color.
	         * @member {string} color
	         * @memberof whiteboard.StrokeMessage
	         * @instance
	         */
	        StrokeMessage.prototype.color = "";
	        /**
	         * StrokeMessage size.
	         * @member {number} size
	         * @memberof whiteboard.StrokeMessage
	         * @instance
	         */
	        StrokeMessage.prototype.size = 0;
	        /**
	         * Creates a new StrokeMessage instance using the specified properties.
	         * @function create
	         * @memberof whiteboard.StrokeMessage
	         * @static
	         * @param {whiteboard.IStrokeMessage=} [properties] Properties to set
	         * @returns {whiteboard.StrokeMessage} StrokeMessage instance
	         */
	        StrokeMessage.create = function create(properties) {
	            return new StrokeMessage(properties);
	        };
	        /**
	         * Encodes the specified StrokeMessage message. Does not implicitly {@link whiteboard.StrokeMessage.verify|verify} messages.
	         * @function encode
	         * @memberof whiteboard.StrokeMessage
	         * @static
	         * @param {whiteboard.IStrokeMessage} message StrokeMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        StrokeMessage.encode = function encode(message, writer) {
	            if (!writer)
	                writer = $Writer.create();
	            if (message.entityName != null && message.hasOwnProperty("entityName"))
	                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.entityName);
	            if (message.type != null && message.hasOwnProperty("type"))
	                writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.type);
	            if (message.points != null && message.points.length)
	                for (var i = 0; i < message.points.length; ++i)
	                    $root.whiteboard.Point.encode(message.points[i], writer.uint32(/* id 3, wireType 2 =*/ 26).fork()).ldelim();
	            if (message.lineWidth != null && message.hasOwnProperty("lineWidth"))
	                writer.uint32(/* id 4, wireType 0 =*/ 32).uint32(message.lineWidth);
	            if (message.color != null && message.hasOwnProperty("color"))
	                writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.color);
	            if (message.size != null && message.hasOwnProperty("size"))
	                writer.uint32(/* id 6, wireType 0 =*/ 48).uint32(message.size);
	            return writer;
	        };
	        /**
	         * Encodes the specified StrokeMessage message, length delimited. Does not implicitly {@link whiteboard.StrokeMessage.verify|verify} messages.
	         * @function encodeDelimited
	         * @memberof whiteboard.StrokeMessage
	         * @static
	         * @param {whiteboard.IStrokeMessage} message StrokeMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        StrokeMessage.encodeDelimited = function encodeDelimited(message, writer) {
	            return this.encode(message, writer).ldelim();
	        };
	        /**
	         * Decodes a StrokeMessage message from the specified reader or buffer.
	         * @function decode
	         * @memberof whiteboard.StrokeMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @param {number} [length] Message length if known beforehand
	         * @returns {whiteboard.StrokeMessage} StrokeMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        StrokeMessage.decode = function decode(reader, length) {
	            if (!(reader instanceof $Reader))
	                reader = $Reader.create(reader);
	            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.StrokeMessage();
	            while (reader.pos < end) {
	                var tag = reader.uint32();
	                switch (tag >>> 3) {
	                    case 1:
	                        message.entityName = reader.string();
	                        break;
	                    case 2:
	                        message.type = reader.int32();
	                        break;
	                    case 3:
	                        if (!(message.points && message.points.length))
	                            message.points = [];
	                        message.points.push($root.whiteboard.Point.decode(reader, reader.uint32()));
	                        break;
	                    case 4:
	                        message.lineWidth = reader.uint32();
	                        break;
	                    case 5:
	                        message.color = reader.string();
	                        break;
	                    case 6:
	                        message.size = reader.uint32();
	                        break;
	                    default:
	                        reader.skipType(tag & 7);
	                        break;
	                }
	            }
	            return message;
	        };
	        /**
	         * Decodes a StrokeMessage message from the specified reader or buffer, length delimited.
	         * @function decodeDelimited
	         * @memberof whiteboard.StrokeMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @returns {whiteboard.StrokeMessage} StrokeMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        StrokeMessage.decodeDelimited = function decodeDelimited(reader) {
	            if (!(reader instanceof $Reader))
	                reader = new $Reader(reader);
	            return this.decode(reader, reader.uint32());
	        };
	        /**
	         * Verifies a StrokeMessage message.
	         * @function verify
	         * @memberof whiteboard.StrokeMessage
	         * @static
	         * @param {Object.<string,*>} message Plain object to verify
	         * @returns {string|null} `null` if valid, otherwise the reason why it is not
	         */
	        StrokeMessage.verify = function verify(message) {
	            if (typeof message !== "object" || message === null)
	                return "object expected";
	            if (message.entityName != null && message.hasOwnProperty("entityName"))
	                if (!$util.isString(message.entityName))
	                    return "entityName: string expected";
	            if (message.type != null && message.hasOwnProperty("type"))
	                switch (message.type) {
	                    default:
	                        return "type: enum value expected";
	                    case 1:
	                    case 2:
	                        break;
	                }
	            if (message.points != null && message.hasOwnProperty("points")) {
	                if (!Array.isArray(message.points))
	                    return "points: array expected";
	                for (var i = 0; i < message.points.length; ++i) {
	                    var error = $root.whiteboard.Point.verify(message.points[i]);
	                    if (error)
	                        return "points." + error;
	                }
	            }
	            if (message.lineWidth != null && message.hasOwnProperty("lineWidth"))
	                if (!$util.isInteger(message.lineWidth))
	                    return "lineWidth: integer expected";
	            if (message.color != null && message.hasOwnProperty("color"))
	                if (!$util.isString(message.color))
	                    return "color: string expected";
	            if (message.size != null && message.hasOwnProperty("size"))
	                if (!$util.isInteger(message.size))
	                    return "size: integer expected";
	            return null;
	        };
	        /**
	         * Creates a StrokeMessage message from a plain object. Also converts values to their respective internal types.
	         * @function fromObject
	         * @memberof whiteboard.StrokeMessage
	         * @static
	         * @param {Object.<string,*>} object Plain object
	         * @returns {whiteboard.StrokeMessage} StrokeMessage
	         */
	        StrokeMessage.fromObject = function fromObject(object) {
	            if (object instanceof $root.whiteboard.StrokeMessage)
	                return object;
	            var message = new $root.whiteboard.StrokeMessage();
	            if (object.entityName != null)
	                message.entityName = String(object.entityName);
	            switch (object.type) {
	                case "Draw":
	                case 1:
	                    message.type = 1;
	                    break;
	                case "Erase":
	                case 2:
	                    message.type = 2;
	                    break;
	            }
	            if (object.points) {
	                if (!Array.isArray(object.points))
	                    throw TypeError(".whiteboard.StrokeMessage.points: array expected");
	                message.points = [];
	                for (var i = 0; i < object.points.length; ++i) {
	                    if (typeof object.points[i] !== "object")
	                        throw TypeError(".whiteboard.StrokeMessage.points: object expected");
	                    message.points[i] = $root.whiteboard.Point.fromObject(object.points[i]);
	                }
	            }
	            if (object.lineWidth != null)
	                message.lineWidth = object.lineWidth >>> 0;
	            if (object.color != null)
	                message.color = String(object.color);
	            if (object.size != null)
	                message.size = object.size >>> 0;
	            return message;
	        };
	        /**
	         * Creates a plain object from a StrokeMessage message. Also converts values to other types if specified.
	         * @function toObject
	         * @memberof whiteboard.StrokeMessage
	         * @static
	         * @param {whiteboard.StrokeMessage} message StrokeMessage
	         * @param {$protobuf.IConversionOptions} [options] Conversion options
	         * @returns {Object.<string,*>} Plain object
	         */
	        StrokeMessage.toObject = function toObject(message, options) {
	            if (!options)
	                options = {};
	            var object = {};
	            if (options.arrays || options.defaults)
	                object.points = [];
	            if (options.defaults) {
	                object.entityName = "";
	                object.type = options.enums === String ? "Draw" : 1;
	                object.lineWidth = 0;
	                object.color = "";
	                object.size = 0;
	            }
	            if (message.entityName != null && message.hasOwnProperty("entityName"))
	                object.entityName = message.entityName;
	            if (message.type != null && message.hasOwnProperty("type"))
	                object.type = options.enums === String ? $root.whiteboard.StrokeType[message.type] : message.type;
	            if (message.points && message.points.length) {
	                object.points = [];
	                for (var j = 0; j < message.points.length; ++j)
	                    object.points[j] = $root.whiteboard.Point.toObject(message.points[j], options);
	            }
	            if (message.lineWidth != null && message.hasOwnProperty("lineWidth"))
	                object.lineWidth = message.lineWidth;
	            if (message.color != null && message.hasOwnProperty("color"))
	                object.color = message.color;
	            if (message.size != null && message.hasOwnProperty("size"))
	                object.size = message.size;
	            return object;
	        };
	        /**
	         * Converts this StrokeMessage to JSON.
	         * @function toJSON
	         * @memberof whiteboard.StrokeMessage
	         * @instance
	         * @returns {Object.<string,*>} JSON object
	         */
	        StrokeMessage.prototype.toJSON = function toJSON() {
	            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
	        };
	        return StrokeMessage;
	    })();
	    whiteboard.DrawMessage = (function () {
	        /**
	         * Properties of a DrawMessage.
	         * @memberof whiteboard
	         * @interface IDrawMessage
	         * @property {string|null} [entityName] DrawMessage entityName
	         * @property {number|null} [lineWidth] DrawMessage lineWidth
	         * @property {string|null} [color] DrawMessage color
	         * @property {boolean|null} [newStroke] DrawMessage newStroke
	         * @property {Array.<whiteboard.IPoint>|null} [points] DrawMessage points
	         */
	        /**
	         * Constructs a new DrawMessage.
	         * @memberof whiteboard
	         * @classdesc Represents a DrawMessage.
	         * @implements IDrawMessage
	         * @constructor
	         * @param {whiteboard.IDrawMessage=} [properties] Properties to set
	         */
	        function DrawMessage(properties) {
	            this.points = [];
	            if (properties)
	                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
	                    if (properties[keys[i]] != null)
	                        this[keys[i]] = properties[keys[i]];
	        }
	        /**
	         * DrawMessage entityName.
	         * @member {string} entityName
	         * @memberof whiteboard.DrawMessage
	         * @instance
	         */
	        DrawMessage.prototype.entityName = "";
	        /**
	         * DrawMessage lineWidth.
	         * @member {number} lineWidth
	         * @memberof whiteboard.DrawMessage
	         * @instance
	         */
	        DrawMessage.prototype.lineWidth = 0;
	        /**
	         * DrawMessage color.
	         * @member {string} color
	         * @memberof whiteboard.DrawMessage
	         * @instance
	         */
	        DrawMessage.prototype.color = "";
	        /**
	         * DrawMessage newStroke.
	         * @member {boolean} newStroke
	         * @memberof whiteboard.DrawMessage
	         * @instance
	         */
	        DrawMessage.prototype.newStroke = false;
	        /**
	         * DrawMessage points.
	         * @member {Array.<whiteboard.IPoint>} points
	         * @memberof whiteboard.DrawMessage
	         * @instance
	         */
	        DrawMessage.prototype.points = $util.emptyArray;
	        /**
	         * Creates a new DrawMessage instance using the specified properties.
	         * @function create
	         * @memberof whiteboard.DrawMessage
	         * @static
	         * @param {whiteboard.IDrawMessage=} [properties] Properties to set
	         * @returns {whiteboard.DrawMessage} DrawMessage instance
	         */
	        DrawMessage.create = function create(properties) {
	            return new DrawMessage(properties);
	        };
	        /**
	         * Encodes the specified DrawMessage message. Does not implicitly {@link whiteboard.DrawMessage.verify|verify} messages.
	         * @function encode
	         * @memberof whiteboard.DrawMessage
	         * @static
	         * @param {whiteboard.IDrawMessage} message DrawMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        DrawMessage.encode = function encode(message, writer) {
	            if (!writer)
	                writer = $Writer.create();
	            if (message.entityName != null && message.hasOwnProperty("entityName"))
	                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.entityName);
	            if (message.lineWidth != null && message.hasOwnProperty("lineWidth"))
	                writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.lineWidth);
	            if (message.color != null && message.hasOwnProperty("color"))
	                writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.color);
	            if (message.newStroke != null && message.hasOwnProperty("newStroke"))
	                writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message.newStroke);
	            if (message.points != null && message.points.length)
	                for (var i = 0; i < message.points.length; ++i)
	                    $root.whiteboard.Point.encode(message.points[i], writer.uint32(/* id 5, wireType 2 =*/ 42).fork()).ldelim();
	            return writer;
	        };
	        /**
	         * Encodes the specified DrawMessage message, length delimited. Does not implicitly {@link whiteboard.DrawMessage.verify|verify} messages.
	         * @function encodeDelimited
	         * @memberof whiteboard.DrawMessage
	         * @static
	         * @param {whiteboard.IDrawMessage} message DrawMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        DrawMessage.encodeDelimited = function encodeDelimited(message, writer) {
	            return this.encode(message, writer).ldelim();
	        };
	        /**
	         * Decodes a DrawMessage message from the specified reader or buffer.
	         * @function decode
	         * @memberof whiteboard.DrawMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @param {number} [length] Message length if known beforehand
	         * @returns {whiteboard.DrawMessage} DrawMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        DrawMessage.decode = function decode(reader, length) {
	            if (!(reader instanceof $Reader))
	                reader = $Reader.create(reader);
	            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.DrawMessage();
	            while (reader.pos < end) {
	                var tag = reader.uint32();
	                switch (tag >>> 3) {
	                    case 1:
	                        message.entityName = reader.string();
	                        break;
	                    case 2:
	                        message.lineWidth = reader.uint32();
	                        break;
	                    case 3:
	                        message.color = reader.string();
	                        break;
	                    case 4:
	                        message.newStroke = reader.bool();
	                        break;
	                    case 5:
	                        if (!(message.points && message.points.length))
	                            message.points = [];
	                        message.points.push($root.whiteboard.Point.decode(reader, reader.uint32()));
	                        break;
	                    default:
	                        reader.skipType(tag & 7);
	                        break;
	                }
	            }
	            return message;
	        };
	        /**
	         * Decodes a DrawMessage message from the specified reader or buffer, length delimited.
	         * @function decodeDelimited
	         * @memberof whiteboard.DrawMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @returns {whiteboard.DrawMessage} DrawMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        DrawMessage.decodeDelimited = function decodeDelimited(reader) {
	            if (!(reader instanceof $Reader))
	                reader = new $Reader(reader);
	            return this.decode(reader, reader.uint32());
	        };
	        /**
	         * Verifies a DrawMessage message.
	         * @function verify
	         * @memberof whiteboard.DrawMessage
	         * @static
	         * @param {Object.<string,*>} message Plain object to verify
	         * @returns {string|null} `null` if valid, otherwise the reason why it is not
	         */
	        DrawMessage.verify = function verify(message) {
	            if (typeof message !== "object" || message === null)
	                return "object expected";
	            if (message.entityName != null && message.hasOwnProperty("entityName"))
	                if (!$util.isString(message.entityName))
	                    return "entityName: string expected";
	            if (message.lineWidth != null && message.hasOwnProperty("lineWidth"))
	                if (!$util.isInteger(message.lineWidth))
	                    return "lineWidth: integer expected";
	            if (message.color != null && message.hasOwnProperty("color"))
	                if (!$util.isString(message.color))
	                    return "color: string expected";
	            if (message.newStroke != null && message.hasOwnProperty("newStroke"))
	                if (typeof message.newStroke !== "boolean")
	                    return "newStroke: boolean expected";
	            if (message.points != null && message.hasOwnProperty("points")) {
	                if (!Array.isArray(message.points))
	                    return "points: array expected";
	                for (var i = 0; i < message.points.length; ++i) {
	                    var error = $root.whiteboard.Point.verify(message.points[i]);
	                    if (error)
	                        return "points." + error;
	                }
	            }
	            return null;
	        };
	        /**
	         * Creates a DrawMessage message from a plain object. Also converts values to their respective internal types.
	         * @function fromObject
	         * @memberof whiteboard.DrawMessage
	         * @static
	         * @param {Object.<string,*>} object Plain object
	         * @returns {whiteboard.DrawMessage} DrawMessage
	         */
	        DrawMessage.fromObject = function fromObject(object) {
	            if (object instanceof $root.whiteboard.DrawMessage)
	                return object;
	            var message = new $root.whiteboard.DrawMessage();
	            if (object.entityName != null)
	                message.entityName = String(object.entityName);
	            if (object.lineWidth != null)
	                message.lineWidth = object.lineWidth >>> 0;
	            if (object.color != null)
	                message.color = String(object.color);
	            if (object.newStroke != null)
	                message.newStroke = Boolean(object.newStroke);
	            if (object.points) {
	                if (!Array.isArray(object.points))
	                    throw TypeError(".whiteboard.DrawMessage.points: array expected");
	                message.points = [];
	                for (var i = 0; i < object.points.length; ++i) {
	                    if (typeof object.points[i] !== "object")
	                        throw TypeError(".whiteboard.DrawMessage.points: object expected");
	                    message.points[i] = $root.whiteboard.Point.fromObject(object.points[i]);
	                }
	            }
	            return message;
	        };
	        /**
	         * Creates a plain object from a DrawMessage message. Also converts values to other types if specified.
	         * @function toObject
	         * @memberof whiteboard.DrawMessage
	         * @static
	         * @param {whiteboard.DrawMessage} message DrawMessage
	         * @param {$protobuf.IConversionOptions} [options] Conversion options
	         * @returns {Object.<string,*>} Plain object
	         */
	        DrawMessage.toObject = function toObject(message, options) {
	            if (!options)
	                options = {};
	            var object = {};
	            if (options.arrays || options.defaults)
	                object.points = [];
	            if (options.defaults) {
	                object.entityName = "";
	                object.lineWidth = 0;
	                object.color = "";
	                object.newStroke = false;
	            }
	            if (message.entityName != null && message.hasOwnProperty("entityName"))
	                object.entityName = message.entityName;
	            if (message.lineWidth != null && message.hasOwnProperty("lineWidth"))
	                object.lineWidth = message.lineWidth;
	            if (message.color != null && message.hasOwnProperty("color"))
	                object.color = message.color;
	            if (message.newStroke != null && message.hasOwnProperty("newStroke"))
	                object.newStroke = message.newStroke;
	            if (message.points && message.points.length) {
	                object.points = [];
	                for (var j = 0; j < message.points.length; ++j)
	                    object.points[j] = $root.whiteboard.Point.toObject(message.points[j], options);
	            }
	            return object;
	        };
	        /**
	         * Converts this DrawMessage to JSON.
	         * @function toJSON
	         * @memberof whiteboard.DrawMessage
	         * @instance
	         * @returns {Object.<string,*>} JSON object
	         */
	        DrawMessage.prototype.toJSON = function toJSON() {
	            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
	        };
	        return DrawMessage;
	    })();
	    whiteboard.EraseMessage = (function () {
	        /**
	         * Properties of an EraseMessage.
	         * @memberof whiteboard
	         * @interface IEraseMessage
	         * @property {string|null} [entityName] EraseMessage entityName
	         * @property {number|null} [size] EraseMessage size
	         * @property {boolean|null} [newErase] EraseMessage newErase
	         * @property {Array.<whiteboard.IPoint>|null} [points] EraseMessage points
	         */
	        /**
	         * Constructs a new EraseMessage.
	         * @memberof whiteboard
	         * @classdesc Represents an EraseMessage.
	         * @implements IEraseMessage
	         * @constructor
	         * @param {whiteboard.IEraseMessage=} [properties] Properties to set
	         */
	        function EraseMessage(properties) {
	            this.points = [];
	            if (properties)
	                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
	                    if (properties[keys[i]] != null)
	                        this[keys[i]] = properties[keys[i]];
	        }
	        /**
	         * EraseMessage entityName.
	         * @member {string} entityName
	         * @memberof whiteboard.EraseMessage
	         * @instance
	         */
	        EraseMessage.prototype.entityName = "";
	        /**
	         * EraseMessage size.
	         * @member {number} size
	         * @memberof whiteboard.EraseMessage
	         * @instance
	         */
	        EraseMessage.prototype.size = 0;
	        /**
	         * EraseMessage newErase.
	         * @member {boolean} newErase
	         * @memberof whiteboard.EraseMessage
	         * @instance
	         */
	        EraseMessage.prototype.newErase = false;
	        /**
	         * EraseMessage points.
	         * @member {Array.<whiteboard.IPoint>} points
	         * @memberof whiteboard.EraseMessage
	         * @instance
	         */
	        EraseMessage.prototype.points = $util.emptyArray;
	        /**
	         * Creates a new EraseMessage instance using the specified properties.
	         * @function create
	         * @memberof whiteboard.EraseMessage
	         * @static
	         * @param {whiteboard.IEraseMessage=} [properties] Properties to set
	         * @returns {whiteboard.EraseMessage} EraseMessage instance
	         */
	        EraseMessage.create = function create(properties) {
	            return new EraseMessage(properties);
	        };
	        /**
	         * Encodes the specified EraseMessage message. Does not implicitly {@link whiteboard.EraseMessage.verify|verify} messages.
	         * @function encode
	         * @memberof whiteboard.EraseMessage
	         * @static
	         * @param {whiteboard.IEraseMessage} message EraseMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        EraseMessage.encode = function encode(message, writer) {
	            if (!writer)
	                writer = $Writer.create();
	            if (message.entityName != null && message.hasOwnProperty("entityName"))
	                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.entityName);
	            if (message.size != null && message.hasOwnProperty("size"))
	                writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.size);
	            if (message.newErase != null && message.hasOwnProperty("newErase"))
	                writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.newErase);
	            if (message.points != null && message.points.length)
	                for (var i = 0; i < message.points.length; ++i)
	                    $root.whiteboard.Point.encode(message.points[i], writer.uint32(/* id 4, wireType 2 =*/ 34).fork()).ldelim();
	            return writer;
	        };
	        /**
	         * Encodes the specified EraseMessage message, length delimited. Does not implicitly {@link whiteboard.EraseMessage.verify|verify} messages.
	         * @function encodeDelimited
	         * @memberof whiteboard.EraseMessage
	         * @static
	         * @param {whiteboard.IEraseMessage} message EraseMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        EraseMessage.encodeDelimited = function encodeDelimited(message, writer) {
	            return this.encode(message, writer).ldelim();
	        };
	        /**
	         * Decodes an EraseMessage message from the specified reader or buffer.
	         * @function decode
	         * @memberof whiteboard.EraseMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @param {number} [length] Message length if known beforehand
	         * @returns {whiteboard.EraseMessage} EraseMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        EraseMessage.decode = function decode(reader, length) {
	            if (!(reader instanceof $Reader))
	                reader = $Reader.create(reader);
	            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.EraseMessage();
	            while (reader.pos < end) {
	                var tag = reader.uint32();
	                switch (tag >>> 3) {
	                    case 1:
	                        message.entityName = reader.string();
	                        break;
	                    case 2:
	                        message.size = reader.uint32();
	                        break;
	                    case 3:
	                        message.newErase = reader.bool();
	                        break;
	                    case 4:
	                        if (!(message.points && message.points.length))
	                            message.points = [];
	                        message.points.push($root.whiteboard.Point.decode(reader, reader.uint32()));
	                        break;
	                    default:
	                        reader.skipType(tag & 7);
	                        break;
	                }
	            }
	            return message;
	        };
	        /**
	         * Decodes an EraseMessage message from the specified reader or buffer, length delimited.
	         * @function decodeDelimited
	         * @memberof whiteboard.EraseMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @returns {whiteboard.EraseMessage} EraseMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        EraseMessage.decodeDelimited = function decodeDelimited(reader) {
	            if (!(reader instanceof $Reader))
	                reader = new $Reader(reader);
	            return this.decode(reader, reader.uint32());
	        };
	        /**
	         * Verifies an EraseMessage message.
	         * @function verify
	         * @memberof whiteboard.EraseMessage
	         * @static
	         * @param {Object.<string,*>} message Plain object to verify
	         * @returns {string|null} `null` if valid, otherwise the reason why it is not
	         */
	        EraseMessage.verify = function verify(message) {
	            if (typeof message !== "object" || message === null)
	                return "object expected";
	            if (message.entityName != null && message.hasOwnProperty("entityName"))
	                if (!$util.isString(message.entityName))
	                    return "entityName: string expected";
	            if (message.size != null && message.hasOwnProperty("size"))
	                if (!$util.isInteger(message.size))
	                    return "size: integer expected";
	            if (message.newErase != null && message.hasOwnProperty("newErase"))
	                if (typeof message.newErase !== "boolean")
	                    return "newErase: boolean expected";
	            if (message.points != null && message.hasOwnProperty("points")) {
	                if (!Array.isArray(message.points))
	                    return "points: array expected";
	                for (var i = 0; i < message.points.length; ++i) {
	                    var error = $root.whiteboard.Point.verify(message.points[i]);
	                    if (error)
	                        return "points." + error;
	                }
	            }
	            return null;
	        };
	        /**
	         * Creates an EraseMessage message from a plain object. Also converts values to their respective internal types.
	         * @function fromObject
	         * @memberof whiteboard.EraseMessage
	         * @static
	         * @param {Object.<string,*>} object Plain object
	         * @returns {whiteboard.EraseMessage} EraseMessage
	         */
	        EraseMessage.fromObject = function fromObject(object) {
	            if (object instanceof $root.whiteboard.EraseMessage)
	                return object;
	            var message = new $root.whiteboard.EraseMessage();
	            if (object.entityName != null)
	                message.entityName = String(object.entityName);
	            if (object.size != null)
	                message.size = object.size >>> 0;
	            if (object.newErase != null)
	                message.newErase = Boolean(object.newErase);
	            if (object.points) {
	                if (!Array.isArray(object.points))
	                    throw TypeError(".whiteboard.EraseMessage.points: array expected");
	                message.points = [];
	                for (var i = 0; i < object.points.length; ++i) {
	                    if (typeof object.points[i] !== "object")
	                        throw TypeError(".whiteboard.EraseMessage.points: object expected");
	                    message.points[i] = $root.whiteboard.Point.fromObject(object.points[i]);
	                }
	            }
	            return message;
	        };
	        /**
	         * Creates a plain object from an EraseMessage message. Also converts values to other types if specified.
	         * @function toObject
	         * @memberof whiteboard.EraseMessage
	         * @static
	         * @param {whiteboard.EraseMessage} message EraseMessage
	         * @param {$protobuf.IConversionOptions} [options] Conversion options
	         * @returns {Object.<string,*>} Plain object
	         */
	        EraseMessage.toObject = function toObject(message, options) {
	            if (!options)
	                options = {};
	            var object = {};
	            if (options.arrays || options.defaults)
	                object.points = [];
	            if (options.defaults) {
	                object.entityName = "";
	                object.size = 0;
	                object.newErase = false;
	            }
	            if (message.entityName != null && message.hasOwnProperty("entityName"))
	                object.entityName = message.entityName;
	            if (message.size != null && message.hasOwnProperty("size"))
	                object.size = message.size;
	            if (message.newErase != null && message.hasOwnProperty("newErase"))
	                object.newErase = message.newErase;
	            if (message.points && message.points.length) {
	                object.points = [];
	                for (var j = 0; j < message.points.length; ++j)
	                    object.points[j] = $root.whiteboard.Point.toObject(message.points[j], options);
	            }
	            return object;
	        };
	        /**
	         * Converts this EraseMessage to JSON.
	         * @function toJSON
	         * @memberof whiteboard.EraseMessage
	         * @instance
	         * @returns {Object.<string,*>} JSON object
	         */
	        EraseMessage.prototype.toJSON = function toJSON() {
	            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
	        };
	        return EraseMessage;
	    })();
	    whiteboard.SwapObjectMessage = (function () {
	        /**
	         * Properties of a SwapObjectMessage.
	         * @memberof whiteboard
	         * @interface ISwapObjectMessage
	         * @property {string|null} [name1] SwapObjectMessage name1
	         * @property {string|null} [name2] SwapObjectMessage name2
	         * @property {number|null} [duration] SwapObjectMessage duration
	         */
	        /**
	         * Constructs a new SwapObjectMessage.
	         * @memberof whiteboard
	         * @classdesc Represents a SwapObjectMessage.
	         * @implements ISwapObjectMessage
	         * @constructor
	         * @param {whiteboard.ISwapObjectMessage=} [properties] Properties to set
	         */
	        function SwapObjectMessage(properties) {
	            if (properties)
	                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
	                    if (properties[keys[i]] != null)
	                        this[keys[i]] = properties[keys[i]];
	        }
	        /**
	         * SwapObjectMessage name1.
	         * @member {string} name1
	         * @memberof whiteboard.SwapObjectMessage
	         * @instance
	         */
	        SwapObjectMessage.prototype.name1 = "";
	        /**
	         * SwapObjectMessage name2.
	         * @member {string} name2
	         * @memberof whiteboard.SwapObjectMessage
	         * @instance
	         */
	        SwapObjectMessage.prototype.name2 = "";
	        /**
	         * SwapObjectMessage duration.
	         * @member {number} duration
	         * @memberof whiteboard.SwapObjectMessage
	         * @instance
	         */
	        SwapObjectMessage.prototype.duration = 0;
	        /**
	         * Creates a new SwapObjectMessage instance using the specified properties.
	         * @function create
	         * @memberof whiteboard.SwapObjectMessage
	         * @static
	         * @param {whiteboard.ISwapObjectMessage=} [properties] Properties to set
	         * @returns {whiteboard.SwapObjectMessage} SwapObjectMessage instance
	         */
	        SwapObjectMessage.create = function create(properties) {
	            return new SwapObjectMessage(properties);
	        };
	        /**
	         * Encodes the specified SwapObjectMessage message. Does not implicitly {@link whiteboard.SwapObjectMessage.verify|verify} messages.
	         * @function encode
	         * @memberof whiteboard.SwapObjectMessage
	         * @static
	         * @param {whiteboard.ISwapObjectMessage} message SwapObjectMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        SwapObjectMessage.encode = function encode(message, writer) {
	            if (!writer)
	                writer = $Writer.create();
	            if (message.name1 != null && message.hasOwnProperty("name1"))
	                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.name1);
	            if (message.name2 != null && message.hasOwnProperty("name2"))
	                writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.name2);
	            if (message.duration != null && message.hasOwnProperty("duration"))
	                writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.duration);
	            return writer;
	        };
	        /**
	         * Encodes the specified SwapObjectMessage message, length delimited. Does not implicitly {@link whiteboard.SwapObjectMessage.verify|verify} messages.
	         * @function encodeDelimited
	         * @memberof whiteboard.SwapObjectMessage
	         * @static
	         * @param {whiteboard.ISwapObjectMessage} message SwapObjectMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        SwapObjectMessage.encodeDelimited = function encodeDelimited(message, writer) {
	            return this.encode(message, writer).ldelim();
	        };
	        /**
	         * Decodes a SwapObjectMessage message from the specified reader or buffer.
	         * @function decode
	         * @memberof whiteboard.SwapObjectMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @param {number} [length] Message length if known beforehand
	         * @returns {whiteboard.SwapObjectMessage} SwapObjectMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        SwapObjectMessage.decode = function decode(reader, length) {
	            if (!(reader instanceof $Reader))
	                reader = $Reader.create(reader);
	            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.SwapObjectMessage();
	            while (reader.pos < end) {
	                var tag = reader.uint32();
	                switch (tag >>> 3) {
	                    case 1:
	                        message.name1 = reader.string();
	                        break;
	                    case 2:
	                        message.name2 = reader.string();
	                        break;
	                    case 3:
	                        message.duration = reader.uint32();
	                        break;
	                    default:
	                        reader.skipType(tag & 7);
	                        break;
	                }
	            }
	            return message;
	        };
	        /**
	         * Decodes a SwapObjectMessage message from the specified reader or buffer, length delimited.
	         * @function decodeDelimited
	         * @memberof whiteboard.SwapObjectMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @returns {whiteboard.SwapObjectMessage} SwapObjectMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        SwapObjectMessage.decodeDelimited = function decodeDelimited(reader) {
	            if (!(reader instanceof $Reader))
	                reader = new $Reader(reader);
	            return this.decode(reader, reader.uint32());
	        };
	        /**
	         * Verifies a SwapObjectMessage message.
	         * @function verify
	         * @memberof whiteboard.SwapObjectMessage
	         * @static
	         * @param {Object.<string,*>} message Plain object to verify
	         * @returns {string|null} `null` if valid, otherwise the reason why it is not
	         */
	        SwapObjectMessage.verify = function verify(message) {
	            if (typeof message !== "object" || message === null)
	                return "object expected";
	            if (message.name1 != null && message.hasOwnProperty("name1"))
	                if (!$util.isString(message.name1))
	                    return "name1: string expected";
	            if (message.name2 != null && message.hasOwnProperty("name2"))
	                if (!$util.isString(message.name2))
	                    return "name2: string expected";
	            if (message.duration != null && message.hasOwnProperty("duration"))
	                if (!$util.isInteger(message.duration))
	                    return "duration: integer expected";
	            return null;
	        };
	        /**
	         * Creates a SwapObjectMessage message from a plain object. Also converts values to their respective internal types.
	         * @function fromObject
	         * @memberof whiteboard.SwapObjectMessage
	         * @static
	         * @param {Object.<string,*>} object Plain object
	         * @returns {whiteboard.SwapObjectMessage} SwapObjectMessage
	         */
	        SwapObjectMessage.fromObject = function fromObject(object) {
	            if (object instanceof $root.whiteboard.SwapObjectMessage)
	                return object;
	            var message = new $root.whiteboard.SwapObjectMessage();
	            if (object.name1 != null)
	                message.name1 = String(object.name1);
	            if (object.name2 != null)
	                message.name2 = String(object.name2);
	            if (object.duration != null)
	                message.duration = object.duration >>> 0;
	            return message;
	        };
	        /**
	         * Creates a plain object from a SwapObjectMessage message. Also converts values to other types if specified.
	         * @function toObject
	         * @memberof whiteboard.SwapObjectMessage
	         * @static
	         * @param {whiteboard.SwapObjectMessage} message SwapObjectMessage
	         * @param {$protobuf.IConversionOptions} [options] Conversion options
	         * @returns {Object.<string,*>} Plain object
	         */
	        SwapObjectMessage.toObject = function toObject(message, options) {
	            if (!options)
	                options = {};
	            var object = {};
	            if (options.defaults) {
	                object.name1 = "";
	                object.name2 = "";
	                object.duration = 0;
	            }
	            if (message.name1 != null && message.hasOwnProperty("name1"))
	                object.name1 = message.name1;
	            if (message.name2 != null && message.hasOwnProperty("name2"))
	                object.name2 = message.name2;
	            if (message.duration != null && message.hasOwnProperty("duration"))
	                object.duration = message.duration;
	            return object;
	        };
	        /**
	         * Converts this SwapObjectMessage to JSON.
	         * @function toJSON
	         * @memberof whiteboard.SwapObjectMessage
	         * @instance
	         * @returns {Object.<string,*>} JSON object
	         */
	        SwapObjectMessage.prototype.toJSON = function toJSON() {
	            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
	        };
	        return SwapObjectMessage;
	    })();
	    whiteboard.MoveObjectMessage = (function () {
	        /**
	         * Properties of a MoveObjectMessage.
	         * @memberof whiteboard
	         * @interface IMoveObjectMessage
	         * @property {string|null} [name] MoveObjectMessage name
	         * @property {number|null} [x1] MoveObjectMessage x1
	         * @property {number|null} [y1] MoveObjectMessage y1
	         * @property {number|null} [x2] MoveObjectMessage x2
	         * @property {number|null} [y2] MoveObjectMessage y2
	         */
	        /**
	         * Constructs a new MoveObjectMessage.
	         * @memberof whiteboard
	         * @classdesc Represents a MoveObjectMessage.
	         * @implements IMoveObjectMessage
	         * @constructor
	         * @param {whiteboard.IMoveObjectMessage=} [properties] Properties to set
	         */
	        function MoveObjectMessage(properties) {
	            if (properties)
	                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
	                    if (properties[keys[i]] != null)
	                        this[keys[i]] = properties[keys[i]];
	        }
	        /**
	         * MoveObjectMessage name.
	         * @member {string} name
	         * @memberof whiteboard.MoveObjectMessage
	         * @instance
	         */
	        MoveObjectMessage.prototype.name = "";
	        /**
	         * MoveObjectMessage x1.
	         * @member {number} x1
	         * @memberof whiteboard.MoveObjectMessage
	         * @instance
	         */
	        MoveObjectMessage.prototype.x1 = 0;
	        /**
	         * MoveObjectMessage y1.
	         * @member {number} y1
	         * @memberof whiteboard.MoveObjectMessage
	         * @instance
	         */
	        MoveObjectMessage.prototype.y1 = 0;
	        /**
	         * MoveObjectMessage x2.
	         * @member {number} x2
	         * @memberof whiteboard.MoveObjectMessage
	         * @instance
	         */
	        MoveObjectMessage.prototype.x2 = 0;
	        /**
	         * MoveObjectMessage y2.
	         * @member {number} y2
	         * @memberof whiteboard.MoveObjectMessage
	         * @instance
	         */
	        MoveObjectMessage.prototype.y2 = 0;
	        /**
	         * Creates a new MoveObjectMessage instance using the specified properties.
	         * @function create
	         * @memberof whiteboard.MoveObjectMessage
	         * @static
	         * @param {whiteboard.IMoveObjectMessage=} [properties] Properties to set
	         * @returns {whiteboard.MoveObjectMessage} MoveObjectMessage instance
	         */
	        MoveObjectMessage.create = function create(properties) {
	            return new MoveObjectMessage(properties);
	        };
	        /**
	         * Encodes the specified MoveObjectMessage message. Does not implicitly {@link whiteboard.MoveObjectMessage.verify|verify} messages.
	         * @function encode
	         * @memberof whiteboard.MoveObjectMessage
	         * @static
	         * @param {whiteboard.IMoveObjectMessage} message MoveObjectMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        MoveObjectMessage.encode = function encode(message, writer) {
	            if (!writer)
	                writer = $Writer.create();
	            if (message.name != null && message.hasOwnProperty("name"))
	                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.name);
	            if (message.x1 != null && message.hasOwnProperty("x1"))
	                writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.x1);
	            if (message.y1 != null && message.hasOwnProperty("y1"))
	                writer.uint32(/* id 3, wireType 0 =*/ 24).int32(message.y1);
	            if (message.x2 != null && message.hasOwnProperty("x2"))
	                writer.uint32(/* id 4, wireType 0 =*/ 32).int32(message.x2);
	            if (message.y2 != null && message.hasOwnProperty("y2"))
	                writer.uint32(/* id 5, wireType 0 =*/ 40).int32(message.y2);
	            return writer;
	        };
	        /**
	         * Encodes the specified MoveObjectMessage message, length delimited. Does not implicitly {@link whiteboard.MoveObjectMessage.verify|verify} messages.
	         * @function encodeDelimited
	         * @memberof whiteboard.MoveObjectMessage
	         * @static
	         * @param {whiteboard.IMoveObjectMessage} message MoveObjectMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        MoveObjectMessage.encodeDelimited = function encodeDelimited(message, writer) {
	            return this.encode(message, writer).ldelim();
	        };
	        /**
	         * Decodes a MoveObjectMessage message from the specified reader or buffer.
	         * @function decode
	         * @memberof whiteboard.MoveObjectMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @param {number} [length] Message length if known beforehand
	         * @returns {whiteboard.MoveObjectMessage} MoveObjectMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        MoveObjectMessage.decode = function decode(reader, length) {
	            if (!(reader instanceof $Reader))
	                reader = $Reader.create(reader);
	            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.MoveObjectMessage();
	            while (reader.pos < end) {
	                var tag = reader.uint32();
	                switch (tag >>> 3) {
	                    case 1:
	                        message.name = reader.string();
	                        break;
	                    case 2:
	                        message.x1 = reader.int32();
	                        break;
	                    case 3:
	                        message.y1 = reader.int32();
	                        break;
	                    case 4:
	                        message.x2 = reader.int32();
	                        break;
	                    case 5:
	                        message.y2 = reader.int32();
	                        break;
	                    default:
	                        reader.skipType(tag & 7);
	                        break;
	                }
	            }
	            return message;
	        };
	        /**
	         * Decodes a MoveObjectMessage message from the specified reader or buffer, length delimited.
	         * @function decodeDelimited
	         * @memberof whiteboard.MoveObjectMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @returns {whiteboard.MoveObjectMessage} MoveObjectMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        MoveObjectMessage.decodeDelimited = function decodeDelimited(reader) {
	            if (!(reader instanceof $Reader))
	                reader = new $Reader(reader);
	            return this.decode(reader, reader.uint32());
	        };
	        /**
	         * Verifies a MoveObjectMessage message.
	         * @function verify
	         * @memberof whiteboard.MoveObjectMessage
	         * @static
	         * @param {Object.<string,*>} message Plain object to verify
	         * @returns {string|null} `null` if valid, otherwise the reason why it is not
	         */
	        MoveObjectMessage.verify = function verify(message) {
	            if (typeof message !== "object" || message === null)
	                return "object expected";
	            if (message.name != null && message.hasOwnProperty("name"))
	                if (!$util.isString(message.name))
	                    return "name: string expected";
	            if (message.x1 != null && message.hasOwnProperty("x1"))
	                if (!$util.isInteger(message.x1))
	                    return "x1: integer expected";
	            if (message.y1 != null && message.hasOwnProperty("y1"))
	                if (!$util.isInteger(message.y1))
	                    return "y1: integer expected";
	            if (message.x2 != null && message.hasOwnProperty("x2"))
	                if (!$util.isInteger(message.x2))
	                    return "x2: integer expected";
	            if (message.y2 != null && message.hasOwnProperty("y2"))
	                if (!$util.isInteger(message.y2))
	                    return "y2: integer expected";
	            return null;
	        };
	        /**
	         * Creates a MoveObjectMessage message from a plain object. Also converts values to their respective internal types.
	         * @function fromObject
	         * @memberof whiteboard.MoveObjectMessage
	         * @static
	         * @param {Object.<string,*>} object Plain object
	         * @returns {whiteboard.MoveObjectMessage} MoveObjectMessage
	         */
	        MoveObjectMessage.fromObject = function fromObject(object) {
	            if (object instanceof $root.whiteboard.MoveObjectMessage)
	                return object;
	            var message = new $root.whiteboard.MoveObjectMessage();
	            if (object.name != null)
	                message.name = String(object.name);
	            if (object.x1 != null)
	                message.x1 = object.x1 | 0;
	            if (object.y1 != null)
	                message.y1 = object.y1 | 0;
	            if (object.x2 != null)
	                message.x2 = object.x2 | 0;
	            if (object.y2 != null)
	                message.y2 = object.y2 | 0;
	            return message;
	        };
	        /**
	         * Creates a plain object from a MoveObjectMessage message. Also converts values to other types if specified.
	         * @function toObject
	         * @memberof whiteboard.MoveObjectMessage
	         * @static
	         * @param {whiteboard.MoveObjectMessage} message MoveObjectMessage
	         * @param {$protobuf.IConversionOptions} [options] Conversion options
	         * @returns {Object.<string,*>} Plain object
	         */
	        MoveObjectMessage.toObject = function toObject(message, options) {
	            if (!options)
	                options = {};
	            var object = {};
	            if (options.defaults) {
	                object.name = "";
	                object.x1 = 0;
	                object.y1 = 0;
	                object.x2 = 0;
	                object.y2 = 0;
	            }
	            if (message.name != null && message.hasOwnProperty("name"))
	                object.name = message.name;
	            if (message.x1 != null && message.hasOwnProperty("x1"))
	                object.x1 = message.x1;
	            if (message.y1 != null && message.hasOwnProperty("y1"))
	                object.y1 = message.y1;
	            if (message.x2 != null && message.hasOwnProperty("x2"))
	                object.x2 = message.x2;
	            if (message.y2 != null && message.hasOwnProperty("y2"))
	                object.y2 = message.y2;
	            return object;
	        };
	        /**
	         * Converts this MoveObjectMessage to JSON.
	         * @function toJSON
	         * @memberof whiteboard.MoveObjectMessage
	         * @instance
	         * @returns {Object.<string,*>} JSON object
	         */
	        MoveObjectMessage.prototype.toJSON = function toJSON() {
	            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
	        };
	        return MoveObjectMessage;
	    })();
	    whiteboard.ClearPageMessage = (function () {
	        /**
	         * Properties of a ClearPageMessage.
	         * @memberof whiteboard
	         * @interface IClearPageMessage
	         * @property {string|null} [pageName] ClearPageMessage pageName
	         */
	        /**
	         * Constructs a new ClearPageMessage.
	         * @memberof whiteboard
	         * @classdesc Represents a ClearPageMessage.
	         * @implements IClearPageMessage
	         * @constructor
	         * @param {whiteboard.IClearPageMessage=} [properties] Properties to set
	         */
	        function ClearPageMessage(properties) {
	            if (properties)
	                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
	                    if (properties[keys[i]] != null)
	                        this[keys[i]] = properties[keys[i]];
	        }
	        /**
	         * ClearPageMessage pageName.
	         * @member {string} pageName
	         * @memberof whiteboard.ClearPageMessage
	         * @instance
	         */
	        ClearPageMessage.prototype.pageName = "";
	        /**
	         * Creates a new ClearPageMessage instance using the specified properties.
	         * @function create
	         * @memberof whiteboard.ClearPageMessage
	         * @static
	         * @param {whiteboard.IClearPageMessage=} [properties] Properties to set
	         * @returns {whiteboard.ClearPageMessage} ClearPageMessage instance
	         */
	        ClearPageMessage.create = function create(properties) {
	            return new ClearPageMessage(properties);
	        };
	        /**
	         * Encodes the specified ClearPageMessage message. Does not implicitly {@link whiteboard.ClearPageMessage.verify|verify} messages.
	         * @function encode
	         * @memberof whiteboard.ClearPageMessage
	         * @static
	         * @param {whiteboard.IClearPageMessage} message ClearPageMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        ClearPageMessage.encode = function encode(message, writer) {
	            if (!writer)
	                writer = $Writer.create();
	            if (message.pageName != null && message.hasOwnProperty("pageName"))
	                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.pageName);
	            return writer;
	        };
	        /**
	         * Encodes the specified ClearPageMessage message, length delimited. Does not implicitly {@link whiteboard.ClearPageMessage.verify|verify} messages.
	         * @function encodeDelimited
	         * @memberof whiteboard.ClearPageMessage
	         * @static
	         * @param {whiteboard.IClearPageMessage} message ClearPageMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        ClearPageMessage.encodeDelimited = function encodeDelimited(message, writer) {
	            return this.encode(message, writer).ldelim();
	        };
	        /**
	         * Decodes a ClearPageMessage message from the specified reader or buffer.
	         * @function decode
	         * @memberof whiteboard.ClearPageMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @param {number} [length] Message length if known beforehand
	         * @returns {whiteboard.ClearPageMessage} ClearPageMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        ClearPageMessage.decode = function decode(reader, length) {
	            if (!(reader instanceof $Reader))
	                reader = $Reader.create(reader);
	            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.ClearPageMessage();
	            while (reader.pos < end) {
	                var tag = reader.uint32();
	                switch (tag >>> 3) {
	                    case 1:
	                        message.pageName = reader.string();
	                        break;
	                    default:
	                        reader.skipType(tag & 7);
	                        break;
	                }
	            }
	            return message;
	        };
	        /**
	         * Decodes a ClearPageMessage message from the specified reader or buffer, length delimited.
	         * @function decodeDelimited
	         * @memberof whiteboard.ClearPageMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @returns {whiteboard.ClearPageMessage} ClearPageMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        ClearPageMessage.decodeDelimited = function decodeDelimited(reader) {
	            if (!(reader instanceof $Reader))
	                reader = new $Reader(reader);
	            return this.decode(reader, reader.uint32());
	        };
	        /**
	         * Verifies a ClearPageMessage message.
	         * @function verify
	         * @memberof whiteboard.ClearPageMessage
	         * @static
	         * @param {Object.<string,*>} message Plain object to verify
	         * @returns {string|null} `null` if valid, otherwise the reason why it is not
	         */
	        ClearPageMessage.verify = function verify(message) {
	            if (typeof message !== "object" || message === null)
	                return "object expected";
	            if (message.pageName != null && message.hasOwnProperty("pageName"))
	                if (!$util.isString(message.pageName))
	                    return "pageName: string expected";
	            return null;
	        };
	        /**
	         * Creates a ClearPageMessage message from a plain object. Also converts values to their respective internal types.
	         * @function fromObject
	         * @memberof whiteboard.ClearPageMessage
	         * @static
	         * @param {Object.<string,*>} object Plain object
	         * @returns {whiteboard.ClearPageMessage} ClearPageMessage
	         */
	        ClearPageMessage.fromObject = function fromObject(object) {
	            if (object instanceof $root.whiteboard.ClearPageMessage)
	                return object;
	            var message = new $root.whiteboard.ClearPageMessage();
	            if (object.pageName != null)
	                message.pageName = String(object.pageName);
	            return message;
	        };
	        /**
	         * Creates a plain object from a ClearPageMessage message. Also converts values to other types if specified.
	         * @function toObject
	         * @memberof whiteboard.ClearPageMessage
	         * @static
	         * @param {whiteboard.ClearPageMessage} message ClearPageMessage
	         * @param {$protobuf.IConversionOptions} [options] Conversion options
	         * @returns {Object.<string,*>} Plain object
	         */
	        ClearPageMessage.toObject = function toObject(message, options) {
	            if (!options)
	                options = {};
	            var object = {};
	            if (options.defaults)
	                object.pageName = "";
	            if (message.pageName != null && message.hasOwnProperty("pageName"))
	                object.pageName = message.pageName;
	            return object;
	        };
	        /**
	         * Converts this ClearPageMessage to JSON.
	         * @function toJSON
	         * @memberof whiteboard.ClearPageMessage
	         * @instance
	         * @returns {Object.<string,*>} JSON object
	         */
	        ClearPageMessage.prototype.toJSON = function toJSON() {
	            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
	        };
	        return ClearPageMessage;
	    })();
	    whiteboard.ClearBoardMessage = (function () {
	        /**
	         * Properties of a ClearBoardMessage.
	         * @memberof whiteboard
	         * @interface IClearBoardMessage
	         */
	        /**
	         * Constructs a new ClearBoardMessage.
	         * @memberof whiteboard
	         * @classdesc Represents a ClearBoardMessage.
	         * @implements IClearBoardMessage
	         * @constructor
	         * @param {whiteboard.IClearBoardMessage=} [properties] Properties to set
	         */
	        function ClearBoardMessage(properties) {
	            if (properties)
	                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
	                    if (properties[keys[i]] != null)
	                        this[keys[i]] = properties[keys[i]];
	        }
	        /**
	         * Creates a new ClearBoardMessage instance using the specified properties.
	         * @function create
	         * @memberof whiteboard.ClearBoardMessage
	         * @static
	         * @param {whiteboard.IClearBoardMessage=} [properties] Properties to set
	         * @returns {whiteboard.ClearBoardMessage} ClearBoardMessage instance
	         */
	        ClearBoardMessage.create = function create(properties) {
	            return new ClearBoardMessage(properties);
	        };
	        /**
	         * Encodes the specified ClearBoardMessage message. Does not implicitly {@link whiteboard.ClearBoardMessage.verify|verify} messages.
	         * @function encode
	         * @memberof whiteboard.ClearBoardMessage
	         * @static
	         * @param {whiteboard.IClearBoardMessage} message ClearBoardMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        ClearBoardMessage.encode = function encode(message, writer) {
	            if (!writer)
	                writer = $Writer.create();
	            return writer;
	        };
	        /**
	         * Encodes the specified ClearBoardMessage message, length delimited. Does not implicitly {@link whiteboard.ClearBoardMessage.verify|verify} messages.
	         * @function encodeDelimited
	         * @memberof whiteboard.ClearBoardMessage
	         * @static
	         * @param {whiteboard.IClearBoardMessage} message ClearBoardMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        ClearBoardMessage.encodeDelimited = function encodeDelimited(message, writer) {
	            return this.encode(message, writer).ldelim();
	        };
	        /**
	         * Decodes a ClearBoardMessage message from the specified reader or buffer.
	         * @function decode
	         * @memberof whiteboard.ClearBoardMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @param {number} [length] Message length if known beforehand
	         * @returns {whiteboard.ClearBoardMessage} ClearBoardMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        ClearBoardMessage.decode = function decode(reader, length) {
	            if (!(reader instanceof $Reader))
	                reader = $Reader.create(reader);
	            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.ClearBoardMessage();
	            while (reader.pos < end) {
	                var tag = reader.uint32();
	                switch (tag >>> 3) {
	                    default:
	                        reader.skipType(tag & 7);
	                        break;
	                }
	            }
	            return message;
	        };
	        /**
	         * Decodes a ClearBoardMessage message from the specified reader or buffer, length delimited.
	         * @function decodeDelimited
	         * @memberof whiteboard.ClearBoardMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @returns {whiteboard.ClearBoardMessage} ClearBoardMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        ClearBoardMessage.decodeDelimited = function decodeDelimited(reader) {
	            if (!(reader instanceof $Reader))
	                reader = new $Reader(reader);
	            return this.decode(reader, reader.uint32());
	        };
	        /**
	         * Verifies a ClearBoardMessage message.
	         * @function verify
	         * @memberof whiteboard.ClearBoardMessage
	         * @static
	         * @param {Object.<string,*>} message Plain object to verify
	         * @returns {string|null} `null` if valid, otherwise the reason why it is not
	         */
	        ClearBoardMessage.verify = function verify(message) {
	            if (typeof message !== "object" || message === null)
	                return "object expected";
	            return null;
	        };
	        /**
	         * Creates a ClearBoardMessage message from a plain object. Also converts values to their respective internal types.
	         * @function fromObject
	         * @memberof whiteboard.ClearBoardMessage
	         * @static
	         * @param {Object.<string,*>} object Plain object
	         * @returns {whiteboard.ClearBoardMessage} ClearBoardMessage
	         */
	        ClearBoardMessage.fromObject = function fromObject(object) {
	            if (object instanceof $root.whiteboard.ClearBoardMessage)
	                return object;
	            return new $root.whiteboard.ClearBoardMessage();
	        };
	        /**
	         * Creates a plain object from a ClearBoardMessage message. Also converts values to other types if specified.
	         * @function toObject
	         * @memberof whiteboard.ClearBoardMessage
	         * @static
	         * @param {whiteboard.ClearBoardMessage} message ClearBoardMessage
	         * @param {$protobuf.IConversionOptions} [options] Conversion options
	         * @returns {Object.<string,*>} Plain object
	         */
	        ClearBoardMessage.toObject = function toObject() {
	            return {};
	        };
	        /**
	         * Converts this ClearBoardMessage to JSON.
	         * @function toJSON
	         * @memberof whiteboard.ClearBoardMessage
	         * @instance
	         * @returns {Object.<string,*>} JSON object
	         */
	        ClearBoardMessage.prototype.toJSON = function toJSON() {
	            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
	        };
	        return ClearBoardMessage;
	    })();
	    whiteboard.UndoMessage = (function () {
	        /**
	         * Properties of an UndoMessage.
	         * @memberof whiteboard
	         * @interface IUndoMessage
	         */
	        /**
	         * Constructs a new UndoMessage.
	         * @memberof whiteboard
	         * @classdesc Represents an UndoMessage.
	         * @implements IUndoMessage
	         * @constructor
	         * @param {whiteboard.IUndoMessage=} [properties] Properties to set
	         */
	        function UndoMessage(properties) {
	            if (properties)
	                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
	                    if (properties[keys[i]] != null)
	                        this[keys[i]] = properties[keys[i]];
	        }
	        /**
	         * Creates a new UndoMessage instance using the specified properties.
	         * @function create
	         * @memberof whiteboard.UndoMessage
	         * @static
	         * @param {whiteboard.IUndoMessage=} [properties] Properties to set
	         * @returns {whiteboard.UndoMessage} UndoMessage instance
	         */
	        UndoMessage.create = function create(properties) {
	            return new UndoMessage(properties);
	        };
	        /**
	         * Encodes the specified UndoMessage message. Does not implicitly {@link whiteboard.UndoMessage.verify|verify} messages.
	         * @function encode
	         * @memberof whiteboard.UndoMessage
	         * @static
	         * @param {whiteboard.IUndoMessage} message UndoMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        UndoMessage.encode = function encode(message, writer) {
	            if (!writer)
	                writer = $Writer.create();
	            return writer;
	        };
	        /**
	         * Encodes the specified UndoMessage message, length delimited. Does not implicitly {@link whiteboard.UndoMessage.verify|verify} messages.
	         * @function encodeDelimited
	         * @memberof whiteboard.UndoMessage
	         * @static
	         * @param {whiteboard.IUndoMessage} message UndoMessage message or plain object to encode
	         * @param {$protobuf.Writer} [writer] Writer to encode to
	         * @returns {$protobuf.Writer} Writer
	         */
	        UndoMessage.encodeDelimited = function encodeDelimited(message, writer) {
	            return this.encode(message, writer).ldelim();
	        };
	        /**
	         * Decodes an UndoMessage message from the specified reader or buffer.
	         * @function decode
	         * @memberof whiteboard.UndoMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @param {number} [length] Message length if known beforehand
	         * @returns {whiteboard.UndoMessage} UndoMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        UndoMessage.decode = function decode(reader, length) {
	            if (!(reader instanceof $Reader))
	                reader = $Reader.create(reader);
	            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.UndoMessage();
	            while (reader.pos < end) {
	                var tag = reader.uint32();
	                switch (tag >>> 3) {
	                    default:
	                        reader.skipType(tag & 7);
	                        break;
	                }
	            }
	            return message;
	        };
	        /**
	         * Decodes an UndoMessage message from the specified reader or buffer, length delimited.
	         * @function decodeDelimited
	         * @memberof whiteboard.UndoMessage
	         * @static
	         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
	         * @returns {whiteboard.UndoMessage} UndoMessage
	         * @throws {Error} If the payload is not a reader or valid buffer
	         * @throws {$protobuf.util.ProtocolError} If required fields are missing
	         */
	        UndoMessage.decodeDelimited = function decodeDelimited(reader) {
	            if (!(reader instanceof $Reader))
	                reader = new $Reader(reader);
	            return this.decode(reader, reader.uint32());
	        };
	        /**
	         * Verifies an UndoMessage message.
	         * @function verify
	         * @memberof whiteboard.UndoMessage
	         * @static
	         * @param {Object.<string,*>} message Plain object to verify
	         * @returns {string|null} `null` if valid, otherwise the reason why it is not
	         */
	        UndoMessage.verify = function verify(message) {
	            if (typeof message !== "object" || message === null)
	                return "object expected";
	            return null;
	        };
	        /**
	         * Creates an UndoMessage message from a plain object. Also converts values to their respective internal types.
	         * @function fromObject
	         * @memberof whiteboard.UndoMessage
	         * @static
	         * @param {Object.<string,*>} object Plain object
	         * @returns {whiteboard.UndoMessage} UndoMessage
	         */
	        UndoMessage.fromObject = function fromObject(object) {
	            if (object instanceof $root.whiteboard.UndoMessage)
	                return object;
	            return new $root.whiteboard.UndoMessage();
	        };
	        /**
	         * Creates a plain object from an UndoMessage message. Also converts values to other types if specified.
	         * @function toObject
	         * @memberof whiteboard.UndoMessage
	         * @static
	         * @param {whiteboard.UndoMessage} message UndoMessage
	         * @param {$protobuf.IConversionOptions} [options] Conversion options
	         * @returns {Object.<string,*>} Plain object
	         */
	        UndoMessage.toObject = function toObject() {
	            return {};
	        };
	        /**
	         * Converts this UndoMessage to JSON.
	         * @function toJSON
	         * @memberof whiteboard.UndoMessage
	         * @instance
	         * @returns {Object.<string,*>} JSON object
	         */
	        UndoMessage.prototype.toJSON = function toJSON() {
	            return this.constructor.toObject(this, minimal$1.util.toJSONOptions);
	        };
	        return UndoMessage;
	    })();
	    return whiteboard;
	})();
	var protocols = $root;

	var protolist = createCommonjsModule(function (module, exports) {
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });

	var MsgType;
	(function (MsgType) {
	    MsgType[MsgType["base_UberMessage"] = 10000] = "base_UberMessage";
	    MsgType[MsgType["room_RoomUser"] = 20000] = "room_RoomUser";
	    MsgType[MsgType["room_JoinRoomMessage"] = 20001] = "room_JoinRoomMessage";
	    MsgType[MsgType["room_LeaveRoomMessage"] = 20002] = "room_LeaveRoomMessage";
	    MsgType[MsgType["room_ListUsersMessage"] = 20003] = "room_ListUsersMessage";
	    MsgType[MsgType["room_MediaOptionMessage"] = 20004] = "room_MediaOptionMessage";
	    MsgType[MsgType["whiteboard_StrokeType"] = 30000] = "whiteboard_StrokeType";
	    MsgType[MsgType["whiteboard_CommandMessage"] = 30001] = "whiteboard_CommandMessage";
	    MsgType[MsgType["whiteboard_EventMessage"] = 30002] = "whiteboard_EventMessage";
	    MsgType[MsgType["whiteboard_CreateObjectMessage"] = 30003] = "whiteboard_CreateObjectMessage";
	    MsgType[MsgType["whiteboard_DeleteObjectMessage"] = 30004] = "whiteboard_DeleteObjectMessage";
	    MsgType[MsgType["whiteboard_DeleteObjectsMessage"] = 30005] = "whiteboard_DeleteObjectsMessage";
	    MsgType[MsgType["whiteboard_SetObjectPropertyMessage"] = 30006] = "whiteboard_SetObjectPropertyMessage";
	    MsgType[MsgType["whiteboard_Point"] = 30007] = "whiteboard_Point";
	    MsgType[MsgType["whiteboard_StrokeMessage"] = 30008] = "whiteboard_StrokeMessage";
	    MsgType[MsgType["whiteboard_DrawMessage"] = 30009] = "whiteboard_DrawMessage";
	    MsgType[MsgType["whiteboard_EraseMessage"] = 30010] = "whiteboard_EraseMessage";
	    MsgType[MsgType["whiteboard_SwapObjectMessage"] = 30011] = "whiteboard_SwapObjectMessage";
	    MsgType[MsgType["whiteboard_MoveObjectMessage"] = 30012] = "whiteboard_MoveObjectMessage";
	    MsgType[MsgType["whiteboard_ClearPageMessage"] = 30013] = "whiteboard_ClearPageMessage";
	    MsgType[MsgType["whiteboard_ClearBoardMessage"] = 30014] = "whiteboard_ClearBoardMessage";
	    MsgType[MsgType["whiteboard_UndoMessage"] = 30015] = "whiteboard_UndoMessage";
	})(MsgType = exports.MsgType || (exports.MsgType = {}));
	var msgMap = {
	    10000: protocols.base.UberMessage,
	    20000: protocols.room.RoomUser,
	    20001: protocols.room.JoinRoomMessage,
	    20002: protocols.room.LeaveRoomMessage,
	    20003: protocols.room.ListUsersMessage,
	    20004: protocols.room.MediaOptionMessage,
	    30000: protocols.whiteboard.StrokeType,
	    30001: protocols.whiteboard.CommandMessage,
	    30002: protocols.whiteboard.EventMessage,
	    30003: protocols.whiteboard.CreateObjectMessage,
	    30004: protocols.whiteboard.DeleteObjectMessage,
	    30005: protocols.whiteboard.DeleteObjectsMessage,
	    30006: protocols.whiteboard.SetObjectPropertyMessage,
	    30007: protocols.whiteboard.Point,
	    30008: protocols.whiteboard.StrokeMessage,
	    30009: protocols.whiteboard.DrawMessage,
	    30010: protocols.whiteboard.EraseMessage,
	    30011: protocols.whiteboard.SwapObjectMessage,
	    30012: protocols.whiteboard.MoveObjectMessage,
	    30013: protocols.whiteboard.ClearPageMessage,
	    30014: protocols.whiteboard.ClearBoardMessage,
	    30015: protocols.whiteboard.UndoMessage,
	};
	exports.msgMap = msgMap;
	__export(protocols);

	});

	unwrapExports(protolist);
	var protolist_1 = protolist.MsgType;
	var protolist_2 = protolist.msgMap;

	var whiteboard = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });


	var executors = {};
	executors[protolist.MsgType.whiteboard_CreateObjectMessage] = {
	    execute: function (whiteboard, command, results) {
	        var data = command.event.messageData;
	        command.context = whiteboard.createEntity(data.type, data.x, data.y, data.paramsJson ? JSON.parse(data.paramsJson) : {});
	        if (results) {
	            results.objectCreated = command.context;
	        }
	    },
	    unexecute: function (whiteboard, command) {
	        if (command.context) {
	            command.context.unrefChildren();
	            command.context.remove();
	        }
	    },
	};
	executors[protolist.MsgType.whiteboard_DeleteObjectMessage] = {
	    execute: function (whiteboard, command, results) {
	        var data = command.event.messageData;
	        var obj = whiteboard.findEntity(data.name);
	        if (obj && obj.parent) {
	            command.context = {
	                parent: obj.parent,
	                object: obj
	            };
	            whiteboard.deleteEntity(data.name);
	        }
	    },
	    unexecute: function (whiteboard, command) {
	        whiteboard.addEntity(command.context.parent, command.context.object);
	    }
	};
	executors[protolist.MsgType.whiteboard_DeleteObjectsMessage] = {
	    execute: function (whiteboard, command, results) {
	        var data = command.event.messageData;
	        command.context.parents = [];
	        command.context.objects = [];
	        data.names.forEach(function (name) {
	            var obj = whiteboard.findEntity(name);
	            if (obj && obj.parent) {
	                command.context.parents.push(obj.parent);
	                command.context.objects.push(obj);
	                whiteboard.deleteEntity(name);
	            }
	        });
	    },
	    unexecute: function (whiteboard, command) {
	        for (var i = 0; i < command.context.objects.length; i++) {
	            whiteboard.addEntity(command.context.parents[i], command.context.objects[i]);
	        }
	    }
	};
	executors[protolist.MsgType.whiteboard_SwapObjectMessage] = {
	    execute: function (whiteboard, command, results) {
	        var object1 = whiteboard.findEntity(command.event.messageData.name1);
	        var object2 = whiteboard.findEntity(command.event.messageData.name2);
	        if (object1 && object2) {
	            command.context = {
	                object1: object1,
	                translation1: object1.translation,
	                object2: object2,
	                translation2: object2.translation
	            };
	            if (command.event.broadcast) {
	                var t1 = object1.translation;
	                object1.translation = object2.translation;
	                object2.translation = t1;
	            }
	            else {
	                var t1 = object1.translation;
	                var t2 = object2.translation;
	                (object2.getComponents(catk.CoKeyframeAnimation.type) || []).forEach(function (comp) {
	                    comp.finish();
	                    object2.removeComponentsByType(catk.CoKeyframeAnimation.type);
	                });
	                object2.addComponent(new catk.CoKeyframeAnimation({
	                    delay: 0,
	                    repeat: 1,
	                    exclusive: true,
	                    tracks: {
	                        translation: {
	                            cp: [{ x: 0, y: [t2.x, t2.y] }, { x: command.event.messageData.duration, y: [t1.x, t1.y] }],
	                            type: catk.SplineType.LINEAR
	                        }
	                    }
	                }));
	                object1.addComponent(new catk.CoKeyframeAnimation({
	                    delay: 0,
	                    repeat: 1,
	                    exclusive: true,
	                    tracks: {
	                        translation: {
	                            cp: [{ x: 0, y: [t1.x, t1.y] }, { x: command.event.messageData.duration, y: [t2.x, t2.y] }],
	                            type: catk.SplineType.LINEAR
	                        }
	                    }
	                }));
	            }
	        }
	    },
	    unexecute: function (whiteboard, command) {
	        command.context.object1.translation = command.context.translation1;
	        command.context.object2.translation = command.context.translation2;
	    }
	};
	executors[protolist.MsgType.whiteboard_MoveObjectMessage] = {
	    execute: function (whiteboard, command, results) {
	        var obj = whiteboard.findEntity(command.event.messageData.name);
	        if (obj) {
	            command.context = {
	                object: obj,
	                x1: command.event.messageData.x1,
	                y1: command.event.messageData.y1,
	                x2: command.event.messageData.x2,
	                y2: command.event.messageData.y2
	            };
	            obj.translation = { x: command.event.messageData.x2, y: command.event.messageData.y2 };
	        }
	    },
	    unexecute: function (whiteboard, command) {
	        if (command.context) {
	            command.context.object.translation = { x: command.context.x1, y: command.context.y1 };
	        }
	    }
	};
	executors[protolist.MsgType.whiteboard_SetObjectPropertyMessage] = {
	    execute: function (whiteboard, command, results) {
	        var data = command.event.messageData;
	        var obj = whiteboard.findEntity(data.name);
	        if (obj) {
	            var evGet = new WBGetPropertyEvent(data.propName);
	            obj.triggerEx(evGet);
	            command.context = {
	                object: obj,
	                propName: data.propName,
	                value: evGet.value
	            };
	            var ev = new WBSetPropertyEvent(data.propName, JSON.parse(data.propValueJson));
	            obj.triggerEx(ev);
	        }
	    },
	    unexecute: function (whiteboard, command) {
	        var ev = new WBSetPropertyEvent(command.context.propName, command.context.value);
	        command.context.object.triggerEx(ev);
	    }
	};
	executors[protolist.MsgType.whiteboard_ClearBoardMessage] = {
	    execute: function (whiteboard, command, results) {
	        command.context = whiteboard.view.rootNode;
	        command.context.view = null;
	        whiteboard.view.rootNode = new catk.SceneObject();
	        whiteboard.view.rootNode.view = whiteboard.view;
	    },
	    unexecute: function (whiteboard, command) {
	        whiteboard.view.rootNode = command.context;
	        whiteboard.view.rootNode.view = whiteboard.view;
	    }
	};
	executors[protolist.MsgType.whiteboard_StrokeMessage] = {
	    execute: function (whiteboard, command, results) {
	        var freeDraw = whiteboard.findEntityByType('FreeDraw');
	        if (!freeDraw) {
	            freeDraw = whiteboard.createEntity('FreeDraw', 0, 0, {});
	        }
	        freeDraw.triggerEx(command.event);
	    },
	    unexecute: function (whiteboard, command) {
	        var freedrawNode = whiteboard.findEntity(command.event.messageData.entityName);
	        if (freedrawNode) {
	            freedrawNode.unstroke();
	        }
	    }
	};
	var EvtSocketMessage = /** @class */ (function (_super) {
	    __extends(EvtSocketMessage, _super);
	    function EvtSocketMessage(messageType, messageData) {
	        var _this = _super.call(this, EvtSocketMessage.type) || this;
	        _this.messageType = messageType;
	        _this.messageData = messageData;
	        return _this;
	    }
	    EvtSocketMessage.type = '@socketMessage';
	    return EvtSocketMessage;
	}(catk.BaseEvent));
	exports.EvtSocketMessage = EvtSocketMessage;
	var WBComponent = /** @class */ (function (_super) {
	    __extends(WBComponent, _super);
	    function WBComponent() {
	        var _this = _super.call(this, WBComponent.type) || this;
	        _this.on(WBToolActivateEvent.type, function (ev) {
	            ev.tool.activateObject(_this.object);
	        });
	        _this.on(WBToolDeactivateEvent.type, function (ev) {
	            ev.tool.deactivateObject(_this.object);
	        });
	        _this.on(WBSetPropertyEvent.type, function (ev) {
	            var object = _this.object;
	            switch (ev.name) {
	                case 'localx': {
	                    var t = object.translation;
	                    t.x = Number(ev.value);
	                    object.translation = t;
	                    break;
	                }
	                case 'localy': {
	                    var t = object.translation;
	                    t.y = Number(ev.value);
	                    object.translation = t;
	                    break;
	                }
	                case 'anchorx': {
	                    var t = object.anchorPoint;
	                    t.x = Number(ev.value);
	                    object.anchorPoint = t;
	                    break;
	                }
	                case 'anchory': {
	                    var t = object.anchorPoint;
	                    t.y = Number(ev.value);
	                    object.anchorPoint = t;
	                    break;
	                }
	            }
	        });
	        _this.on(WBGetPropertyEvent.type, function (ev) {
	            var object = _this.object;
	            switch (ev.name) {
	                case 'localx': {
	                    ev.value = object.translation.x;
	                    break;
	                }
	                case 'localy': {
	                    ev.value = object.translation.y;
	                    break;
	                }
	                case 'anchorx': {
	                    ev.value = object.anchorPoint.x;
	                    break;
	                }
	                case 'anchory': {
	                    ev.value = object.anchorPoint.y;
	                    break;
	                }
	                case 'entityType': {
	                    ev.value = object.entityType;
	                    break;
	                }
	            }
	        });
	        _this.on(WBGetPropertyListEvent.type, function (ev) {
	            ev.properties = ev.properties || {};
	            ev.properties.general = ev.properties.general || { desc: '通用', properties: [] };
	            ev.properties.general.properties.push({
	                name: 'entityType',
	                desc: '类型',
	                readonly: true,
	                type: 'string',
	                value: _this.object ? _this.object.entityType : null
	            });
	            ev.properties.general.properties.push({
	                name: 'localx',
	                desc: '位置X',
	                readonly: false,
	                type: 'number',
	                value: _this.object ? _this.object.translation.x : null
	            });
	            ev.properties.general.properties.push({
	                name: 'localy',
	                desc: '位置Y',
	                readonly: false,
	                type: 'number',
	                value: _this.object ? _this.object.translation.y : null
	            });
	            ev.properties.general.properties.push({
	                name: 'anchorx',
	                desc: '锚点X',
	                readonly: false,
	                type: 'number',
	                value: _this.object ? _this.object.anchorPoint.x : null
	            });
	            ev.properties.general.properties.push({
	                name: 'anchory',
	                desc: '锚点Y',
	                readonly: false,
	                type: 'number',
	                value: _this.object ? _this.object.anchorPoint.y : null
	            });
	        });
	        return _this;
	    }
	    WBComponent.type = 'WBComponent';
	    return WBComponent;
	}(catk.Component));
	exports.WBComponent = WBComponent;
	var WBFactory = /** @class */ (function () {
	    function WBFactory(name) {
	        this.name = name;
	    }
	    WBFactory.prototype.createEntity = function (x, y, options) {
	        var entity = this._createEntity(options);
	        if (entity === null) {
	            return null;
	        }
	        entity.addComponent(new WBComponent());
	        entity.translation = { x: x, y: y };
	        return entity;
	    };
	    WBFactory.prototype.getCreationProperties = function () {
	        return [];
	    };
	    return WBFactory;
	}());
	exports.WBFactory = WBFactory;
	var WBToolActivateEvent = /** @class */ (function (_super) {
	    __extends(WBToolActivateEvent, _super);
	    function WBToolActivateEvent(tool) {
	        var _this = _super.call(this, WBToolActivateEvent.type) || this;
	        _this.tool = tool;
	        return _this;
	    }
	    WBToolActivateEvent.type = '@WBToolActivate';
	    return WBToolActivateEvent;
	}(catk.BaseEvent));
	exports.WBToolActivateEvent = WBToolActivateEvent;
	var WBToolDeactivateEvent = /** @class */ (function (_super) {
	    __extends(WBToolDeactivateEvent, _super);
	    function WBToolDeactivateEvent(tool) {
	        var _this = _super.call(this, WBToolDeactivateEvent.type) || this;
	        _this.tool = tool;
	        return _this;
	    }
	    WBToolDeactivateEvent.type = '@WBToolDeactivate';
	    return WBToolDeactivateEvent;
	}(catk.BaseEvent));
	exports.WBToolDeactivateEvent = WBToolDeactivateEvent;
	var WBGetPropertyListEvent = /** @class */ (function (_super) {
	    __extends(WBGetPropertyListEvent, _super);
	    function WBGetPropertyListEvent() {
	        return _super.call(this, WBGetPropertyListEvent.type) || this;
	    }
	    WBGetPropertyListEvent.type = '@WBGetObjectPropertyList';
	    return WBGetPropertyListEvent;
	}(catk.BaseEvent));
	exports.WBGetPropertyListEvent = WBGetPropertyListEvent;
	var WBSetPropertyEvent = /** @class */ (function (_super) {
	    __extends(WBSetPropertyEvent, _super);
	    function WBSetPropertyEvent(name, value) {
	        var _this = _super.call(this, WBSetPropertyEvent.type) || this;
	        _this.name = name;
	        _this.value = value;
	        return _this;
	    }
	    WBSetPropertyEvent.type = '@WBSetObjectPropertyEvent';
	    return WBSetPropertyEvent;
	}(catk.BaseEvent));
	exports.WBSetPropertyEvent = WBSetPropertyEvent;
	var WBGetPropertyEvent = /** @class */ (function (_super) {
	    __extends(WBGetPropertyEvent, _super);
	    function WBGetPropertyEvent(name) {
	        var _this = _super.call(this, WBGetPropertyEvent.type) || this;
	        _this.name = name;
	        return _this;
	    }
	    WBGetPropertyEvent.type = '@WBGetObjectPropertyEvent';
	    return WBGetPropertyEvent;
	}(catk.BaseEvent));
	exports.WBGetPropertyEvent = WBGetPropertyEvent;
	var WBGetObjectEvent = /** @class */ (function (_super) {
	    __extends(WBGetObjectEvent, _super);
	    function WBGetObjectEvent(name) {
	        var _this = _super.call(this, WBGetObjectEvent.type) || this;
	        _this.name = name;
	        return _this;
	    }
	    WBGetObjectEvent.type = '@WBGetObject';
	    return WBGetObjectEvent;
	}(catk.BaseEvent));
	exports.WBGetObjectEvent = WBGetObjectEvent;
	var WBMessageEvent = /** @class */ (function (_super) {
	    __extends(WBMessageEvent, _super);
	    function WBMessageEvent(type, data, results, object) {
	        var _this = _super.call(this, WBMessageEvent.type) || this;
	        _this.messageType = type;
	        _this.messageData = data;
	        _this.results = results;
	        _this.object = object;
	        _this.broadcast = false;
	        return _this;
	    }
	    WBMessageEvent.type = '@WBMessage';
	    return WBMessageEvent;
	}(catk.BaseEvent));
	exports.WBMessageEvent = WBMessageEvent;
	var WBTool = /** @class */ (function (_super) {
	    __extends(WBTool, _super);
	    function WBTool(name, whiteboard, desc) {
	        var _this = _super.call(this) || this;
	        _this.name = name;
	        _this.desc = desc || name;
	        _this._wb = whiteboard;
	        _this.on(WBGetPropertyEvent.type, function (ev) {
	            switch (ev.name) {
	                case 'desc': {
	                    ev.value = _this.desc;
	                    break;
	                }
	            }
	        });
	        _this.on(WBGetPropertyListEvent.type, function (ev) {
	            ev.properties = ev.properties || {};
	        });
	        return _this;
	    }
	    WBTool.prototype.activate = function (options) {
	        catk.App.triggerEvent(null, new WBToolActivateEvent(this));
	    };
	    WBTool.prototype.deactivate = function () {
	        catk.App.triggerEvent(null, new WBToolDeactivateEvent(this));
	    };
	    WBTool.prototype.activateObject = function (object) {
	    };
	    WBTool.prototype.deactivateObject = function (object) {
	    };
	    WBTool.prototype.handleMessage = function (ev) {
	    };
	    return WBTool;
	}(catk.EventObserver));
	exports.WBTool = WBTool;
	var WhiteBoard = /** @class */ (function (_super) {
	    __extends(WhiteBoard, _super);
	    function WhiteBoard(canvas, doubleBuffer) {
	        if (doubleBuffer === void 0) { doubleBuffer = false; }
	        var _this = _super.call(this) || this;
	        _this.view = null;
	        _this.view = catk.App.addCanvas(canvas, doubleBuffer);
	        _this._factories = {};
	        _this._tools = {};
	        _this._nameIndex = 1;
	        _this._commandStack = [];
	        _this._currentTool = '';
	        _this._entities = {};
	        _this.on(WBGetObjectEvent.type, function (ev) {
	            ev.object = _this.findEntity(ev.name);
	        });
	        _this.on(WBMessageEvent.type, function (ev) {
	            _this._handleMessage(ev);
	        });
	        if (_this.view) {
	            _this.view.on(catk.EvtKeyDown.type, function (ev) {
	                if (_this._currentTool !== '') {
	                    var tool = _this._tools[_this._currentTool];
	                    tool.trigger(ev);
	                }
	            });
	            _this.view.on(catk.EvtKeyUp.type, function (ev) {
	                if (_this._currentTool !== '') {
	                    var tool = _this._tools[_this._currentTool];
	                    tool.trigger(ev);
	                }
	            });
	            _this.view.on(catk.EvtKeyPress.type, function (ev) {
	                if (_this._currentTool !== '') {
	                    var tool = _this._tools[_this._currentTool];
	                    tool.trigger(ev);
	                }
	            });
	            _this.view.on(catk.EvtMouseDown.type, function (ev) {
	                if (_this._currentTool !== '') {
	                    var tool = _this._tools[_this._currentTool];
	                    tool.trigger(ev);
	                }
	            });
	            _this.view.on(catk.EvtMouseUp.type, function (ev) {
	                if (_this._currentTool !== '') {
	                    var tool = _this._tools[_this._currentTool];
	                    tool.trigger(ev);
	                }
	            });
	            _this.view.on(catk.EvtMouseMove.type, function (ev) {
	                if (_this._currentTool !== '') {
	                    var tool = _this._tools[_this._currentTool];
	                    tool.trigger(ev);
	                }
	            });
	            _this.view.on(catk.EvtClick.type, function (ev) {
	                if (_this._currentTool !== '') {
	                    var tool = _this._tools[_this._currentTool];
	                    tool.trigger(ev);
	                }
	            });
	            _this.view.on(catk.EvtDblClick.type, function (ev) {
	                if (_this._currentTool !== '') {
	                    var tool = _this._tools[_this._currentTool];
	                    tool.trigger(ev);
	                }
	            });
	            _this.view.on(catk.EvtDraw.type, function (ev) {
	                if (_this._currentTool !== '') {
	                    var tool = _this._tools[_this._currentTool];
	                    tool.trigger(ev);
	                }
	            }, catk.EventListenerOrder.LAST);
	        }
	        return _this;
	    }
	    WhiteBoard.prototype.addTool = function (tool) {
	        this._tools[tool.name] = tool;
	    };
	    WhiteBoard.prototype.useTool = function (name, params) {
	        if (this._currentTool !== '') {
	            var prevTool = this._tools[this._currentTool];
	            prevTool.deactivate();
	        }
	        this._currentTool = '';
	        if (name) {
	            var newTool = this._tools[name];
	            if (newTool) {
	                this._currentTool = name;
	                // const args = ev.messageData.paramsJson ? JSON.parse(ev.messageData.paramsJson) : {};
	                newTool.activate(params);
	            }
	        }
	    };
	    WhiteBoard.prototype.addFactory = function (factory) {
	        this._factories[factory.name] = factory;
	    };
	    WhiteBoard.prototype.getFactory = function (name) {
	        return this._factories[name] || null;
	    };
	    WhiteBoard.prototype.genEntityName = function (type) {
	        return "" + type.toLowerCase() + this._nameIndex++;
	    };
	    WhiteBoard.prototype.createEntity = function (type, x, y, options) {
	        var entity = null;
	        var name = this.genEntityName(type);
	        var factory = this._factories[type];
	        if (factory) {
	            entity = factory.createEntity(x, y, options);
	            if (entity) {
	                entity.entityName = name;
	                entity.entityType = type;
	                if (this.view && this.view.rootNode) {
	                    this.view.rootNode.addChild(entity);
	                }
	                this._entities[name] = entity;
	                if (this._currentTool !== '') {
	                    var curTool = this._tools[this._currentTool];
	                    if (curTool) {
	                        entity.triggerEx(new WBToolActivateEvent(curTool));
	                    }
	                }
	            }
	        }
	        return entity;
	    };
	    WhiteBoard.prototype.deleteEntity = function (name) {
	        var entity = this.findEntity(name);
	        if (entity) {
	            entity.remove();
	            delete this._entities[name];
	        }
	    };
	    WhiteBoard.prototype.addEntity = function (parent, entity) {
	        if (this.findEntity(entity.entityName)) {
	            throw new Error('ERR: [addEntity] Entity already exists');
	        }
	        parent.addChild(entity);
	        this._entities[entity.entityName] = entity;
	    };
	    WhiteBoard.prototype.findEntity = function (name) {
	        return this._entities[name] || null;
	    };
	    WhiteBoard.prototype.findEntityByType = function (type, rootNode) {
	        if (this.view) {
	            var root = rootNode || this.view.rootNode;
	            if (root) {
	                if (root.entityType === type) {
	                    return root;
	                }
	                else {
	                    for (var i = 0; i < root.numChildren; i++) {
	                        var result = this.findEntityByType(type, root.childAt(i));
	                        if (result) {
	                            return result;
	                        }
	                    }
	                }
	            }
	        }
	        return null;
	    };
	    WhiteBoard.prototype._handleMessage = function (ev) {
	        if (ev.object) {
	            var obj = this.findEntity(ev.object);
	            if (obj) {
	                obj.triggerEx(ev);
	            }
	        }
	        else if (ev.messageType === protolist.MsgType.whiteboard_UndoMessage) {
	            if (this._commandStack.length > 0) {
	                var cmd = this._commandStack.pop();
	                executors[cmd.type].unexecute(this, cmd);
	            }
	        }
	        else if (executors[ev.messageType]) {
	            var cmd = {
	                type: ev.messageType,
	                event: ev,
	                context: null
	            };
	            this._commandStack.push(cmd);
	            executors[ev.messageType].execute(this, cmd, ev.results);
	        }
	        /*
	        const type = ev.messageType;
	        const data = ev.messageData;
	        const results = ev.results;
	        const cmd = data||{};
	        if (ev.object) {
	            const obj = this.findEntity (ev.object);
	            if (obj) {
	                obj.triggerEx (ev);
	            }
	        } else if (type === MsgType.whiteboard_UseToolMessage) {
	            if (this._currentTool !== '') {
	                const prevTool = this._tools[this._currentTool];
	                prevTool.deactivate();
	            }
	            this._currentTool = '';
	            if (cmd.name) {
	                const newTool = this._tools[cmd.name];
	                if (newTool) {
	                    this._currentTool = cmd.name;
	                    const args = cmd.paramsJson ? JSON.parse(cmd.paramsJson) : {};
	                    newTool.activate(args);
	                }
	            }
	        } else if (type === MsgType.whiteboard_CreateObjectMessage) {
	            const type = cmd.type;
	            const params = cmd.paramsJson ? JSON.parse(cmd.paramsJson) : {};
	            const obj = this.createEntity (type, cmd.x, cmd.y, params);
	            if (results) {
	                results.objectCreated = obj;
	            }
	        } else if (type === MsgType.whiteboard_DeleteObjectMessage) {
	            this.deleteEntity (cmd.name);
	        } else if (type === MsgType.whiteboard_DeleteObjectsMessage) {
	            if (cmd.names) {
	                cmd.names.forEach ((name:string) => {
	                    this.deleteEntity (name);
	                });
	            }
	        } else if (type === MsgType.whiteboard_AlignObjectsLeftMessage) {
	            if (cmd.names && cmd.names.length > 1) {
	                const objects: lib.SceneObject[] = cmd.names.map ((name:string) => this.findEntity(name));
	                let minx = objects[0].worldTransform.e;
	                for (let i = 1; i < objects.length; i++) {
	                    const x = objects[i].worldTransform.e;
	                    if (x < minx) {
	                        minx = x;
	                    }
	                }
	                objects.forEach (obj => {
	                    obj.worldTranslation = { x:minx, y:obj.worldTransform.f };
	                    obj.collapseTransform ();
	                });
	            }
	        } else if (type === MsgType.whiteboard_AlignObjectsRightMessage) {
	            if (cmd.names && cmd.names.length > 1) {
	                const objects: lib.SceneObject[] = cmd.names.map ((name:string) => this.findEntity(name));
	                let maxx = objects[0].worldTransform.e;
	                for (let i = 1; i < objects.length; i++) {
	                    const x = objects[i].worldTransform.e;
	                    if (x > maxx) {
	                        maxx = x;
	                    }
	                }
	                objects.forEach (obj => {
	                    obj.worldTranslation = { x:maxx, y:obj.worldTransform.f };
	                    obj.collapseTransform ();
	                });
	            }
	        } else if (type === MsgType.whiteboard_AlignObjectsTopMessage) {
	            if (cmd.names && cmd.names.length > 1) {
	                const objects: lib.SceneObject[] = cmd.names.map ((name:string) => this.findEntity(name));
	                let miny = objects[0].worldTransform.f;
	                for (let i = 1; i < objects.length; i++) {
	                    const y = objects[i].worldTransform.f;
	                    if (y < miny) {
	                        miny = y;
	                    }
	                }
	                objects.forEach (obj => {
	                    obj.worldTranslation = { x:obj.worldTransform.e, y:miny };
	                    obj.collapseTransform ();
	                });
	            }
	        } else if (type === MsgType.whiteboard_AlignObjectsBottomMessage) {
	            if (cmd.names && cmd.names.length > 1) {
	                const objects: lib.SceneObject[] = cmd.names.map ((name:string) => this.findEntity(name));
	                let maxy = objects[0].worldTransform.f;
	                for (let i = 1; i < objects.length; i++) {
	                    const y = objects[i].worldTransform.f;
	                    if (y > maxy) {
	                        maxy = y;
	                    }
	                }
	                objects.forEach (obj => {
	                    obj.worldTranslation = { x:obj.worldTransform.e, y:maxy };
	                    obj.collapseTransform ();
	                });
	            }
	        } else if (type === MsgType.whiteboard_ArrangeObjectsHorizontalMessage) {
	            if (cmd.names && cmd.names.length > 2) {
	                const objects: lib.SceneObject[] = cmd.names.map ((name:string) => this.findEntity(name));
	                objects.sort ((a, b) => {
	                    return a.worldTransform.e - b.worldTransform.e;
	                });
	                const posStart = objects[0].worldTransform.e;
	                const gap = (objects[objects.length-1].worldTransform.e - posStart) / (objects.length - 1);
	                for (let i = 1; i < objects.length - 1; i++) {
	                    objects[i].worldTranslation = { x:posStart + i * gap, y:objects[i].worldTransform.f };
	                    objects[i].collapseTransform ();
	                }
	            }
	        } else if (type === MsgType.whiteboard_ArrangeObjectsVerticalMessage) {
	            if (cmd.names && cmd.names.length > 2) {
	                const objects: lib.SceneObject[] = cmd.names.map ((name:string) => this.findEntity(name));
	                objects.sort ((a, b) => {
	                    return a.worldTransform.f - b.worldTransform.f;
	                });
	                const posStart = objects[0].worldTransform.f;
	                const gap = (objects[objects.length-1].worldTransform.f - posStart) / (objects.length - 1);
	                for (let i = 1; i < objects.length - 1; i++) {
	                    objects[i].worldTranslation = { x:objects[i].worldTransform.e, y:posStart + i * gap };
	                    objects[i].collapseTransform ();
	                }
	            }
	        } else if (type === MsgType.whiteboard_SetObjectPropertyMessage) {
	            const obj = this.findEntity (cmd.name);
	            if (obj) {
	                const ev = new WBSetPropertyEvent (cmd.propName, JSON.parse(cmd.propValueJson));
	                obj.triggerEx (ev);
	                if (obj.entityName !== cmd.name) {
	                    if (this.findEntity(obj.entityName)) {
	                        obj.entityName = cmd.name;
	                    } else {
	                        delete this._entities[cmd.name];
	                        this._entities[obj.entityName] = obj;
	                    }
	                }
	            }
	        } else if (type === MsgType.whiteboard_ClearBoardMessage) {
	            this.view!.rootNode.unrefChildren ();
	        } else if (this._currentTool) {
	            this._tools[this._currentTool].handleMessage (ev);
	        } else {
	            return;
	        }
	        */
	    };
	    return WhiteBoard;
	}(catk.EventObserver));
	exports.WhiteBoard = WhiteBoard;

	});

	unwrapExports(whiteboard);
	var whiteboard_1 = whiteboard.EvtSocketMessage;
	var whiteboard_2 = whiteboard.WBComponent;
	var whiteboard_3 = whiteboard.WBFactory;
	var whiteboard_4 = whiteboard.WBToolActivateEvent;
	var whiteboard_5 = whiteboard.WBToolDeactivateEvent;
	var whiteboard_6 = whiteboard.WBGetPropertyListEvent;
	var whiteboard_7 = whiteboard.WBSetPropertyEvent;
	var whiteboard_8 = whiteboard.WBGetPropertyEvent;
	var whiteboard_9 = whiteboard.WBGetObjectEvent;
	var whiteboard_10 = whiteboard.WBMessageEvent;
	var whiteboard_11 = whiteboard.WBTool;
	var whiteboard_12 = whiteboard.WhiteBoard;

	var editor = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	var WBToolPalette = /** @class */ (function () {
	    function WBToolPalette(editor, container) {
	        this._editor = editor;
	        this._container = container;
	    }
	    WBToolPalette.prototype.unload = function () {
	        while (this._container.hasChildNodes()) {
	            this._container.removeChild(this._container.firstChild);
	        }
	    };
	    WBToolPalette.prototype.loadToolPalette = function () {
	        var that = this;
	        $(this._container).toolbar({
	            groupMain: {
	                toggle: 'single',
	                name: 'main',
	                tools: [{
	                        id: 'tb-text',
	                        icon: '/images/toolbar-text.png',
	                        text: '标签',
	                        callback: function (tool) {
	                            that._editor.whiteboard.useTool('Create', {
	                                createType: 'Label',
	                                text: '标签',
	                                textColor: '#000000'
	                            });
	                        }
	                    }, {
	                        id: 'tb-select',
	                        icon: '/images/toolbar-select.png',
	                        text: '选择',
	                        callback: function (tool) {
	                            that._editor.whiteboard.useTool('Select');
	                        }
	                    }, {
	                        id: 'tb-swap',
	                        icon: '/images/toolbar-swap.png',
	                        text: '交换',
	                        callback: function (tool) {
	                            that._editor.whiteboard.useTool('Swap');
	                        }
	                    }, {
	                        id: 'tb-connect',
	                        icon: '/images/toolbar-connect.png',
	                        text: '联结',
	                        callback: function (tool) {
	                            that._editor.whiteboard.useTool('Connect');
	                        }
	                    }, {
	                        id: '',
	                        icon: '',
	                        text: '',
	                        subTools: [{
	                                id: 'tb-draw',
	                                icon: '/images/toolbar-draw.png',
	                                text: '绘图',
	                                callback: function (tool) {
	                                    that._editor.whiteboard.useTool('HandWriting', {
	                                        mode: 'draw'
	                                    });
	                                }
	                            }, {
	                                id: 'tb-erase',
	                                icon: '/images/toolbar-erase.png',
	                                text: '擦除',
	                                callback: function (tool) {
	                                    that._editor.whiteboard.useTool('HandWriting', {
	                                        mode: 'erase'
	                                    });
	                                }
	                            }]
	                    }]
	            },
	            groupEdit: {
	                toggle: 'none',
	                name: 'edit',
	                tools: [{
	                        id: 'tb-undo',
	                        icon: '/images/toolbar-undo.png',
	                        text: '撤销',
	                        callback: function (tool) {
	                            that._editor.handleMessage(protolist.MsgType.whiteboard_UndoMessage, {});
	                        }
	                    }]
	            }
	        });
	        /*
	        const that = this;
	        const toollist:{[id:string]: (this:Element)=>void} = {
	            '#tb-text': function (this:Element) {
	                $(this).siblings().removeClass ('selected');
	                $(this).addClass ('selected');
	                that._editor.whiteboard.useTool ('Create', {
	                    createType: 'Label',
	                    text: '标签',
	                    textColor: '#000000'
	                });
	            },
	            '#tb-select': function (this:Element) {
	                $(this).siblings().removeClass ('selected');
	                $(this).addClass ('selected');
	                that._editor.whiteboard.useTool ('Select');
	            },
	            '#tb-swap': function (this:Element) {
	                $(this).siblings().removeClass ('selected');
	                $(this).addClass ('selected');
	                that._editor.whiteboard.useTool ('Swap');
	            },
	            '#tb-connect': function (this:Element) {
	                $(this).siblings().removeClass ('selected');
	                $(this).addClass ('selected');
	                that._editor.whiteboard.useTool ('Connect');
	            },
	            '#tb-draw': function (this:Element) {
	                $(this).siblings().removeClass ('selected');
	                $(this).addClass ('selected');
	                that._editor.whiteboard.useTool ('HandWriting', {
	                    mode: 'draw'
	                });
	            },
	            '#tb-erase': function (this:Element) {
	                $(this).siblings().removeClass ('selected');
	                $(this).addClass ('selected');
	                that._editor.whiteboard.useTool ('HandWriting', {
	                    mode: 'erase'
	                });
	            },
	            '#tb-undo': function (this:Element) {
	                that._editor.handleMessage (proto.MsgType.whiteboard_UndoMessage, {});
	            }
	        }
	        for (const tool in toollist) {
	            $(tool).on ('click', function (){
	                toollist[tool].call (this);
	            });
	        }
	        */
	    };
	    return WBToolPalette;
	}());
	exports.WBToolPalette = WBToolPalette;
	var WBPropertyGrid = /** @class */ (function () {
	    function WBPropertyGrid(editor, container, id) {
	        this._editor = editor;
	        this._container = container;
	        this._tableId = id;
	        this._object = null;
	    }
	    WBPropertyGrid.prototype.addGroup = function (name) {
	    };
	    WBPropertyGrid.prototype.addButton = function (text, callback) {
	        var btn = document.createElement('a');
	        btn.classList.add('btn');
	        this._container.appendChild(btn);
	        btn.innerHTML = text;
	        btn.href = 'javascript:void(0);';
	        btn.onclick = function () {
	            callback && callback();
	        };
	    };
	    WBPropertyGrid.prototype.addTextAttribute = function (name, value, readonly, changeCallback, laterChange) {
	        var label = document.createElement('label');
	        label.innerHTML = name + ':';
	        this._container.appendChild(label);
	        var input = document.createElement('input');
	        input.type = 'text';
	        if (value) {
	            input.value = value;
	        }
	        input.style.boxSizing = 'border-box';
	        input.readOnly = readonly;
	        input.disabled = readonly;
	        if (changeCallback) {
	            if (laterChange) {
	                input.onchange = input.onblur = function () {
	                    input.value = String(changeCallback(input.value));
	                };
	            }
	            else {
	                input.oninput = function () {
	                    input.value = String(changeCallback(input.value));
	                };
	            }
	        }
	        this._container.appendChild(input);
	    };
	    WBPropertyGrid.prototype.addToggleAttribute = function (name, value, readonly, changeCallback) {
	        var label = document.createElement('label');
	        label.innerHTML = name + ':';
	        this._container.appendChild(label);
	        var input = document.createElement('input');
	        input.type = 'checkbox';
	        input.checked = value;
	        input.readOnly = readonly;
	        input.disabled = readonly;
	        if (changeCallback) {
	            input.onchange = function () {
	                input.checked = Boolean(changeCallback(input.checked));
	            };
	        }
	        this._container.appendChild(input);
	    };
	    WBPropertyGrid.prototype.addNumberAttribute = function (name, value, readonly, changeCallback) {
	        var label = document.createElement('label');
	        label.innerHTML = name + ':';
	        this._container.appendChild(label);
	        var input = document.createElement('input');
	        input.type = 'number';
	        input.value = String(value);
	        input.readOnly = readonly;
	        input.disabled = readonly;
	        input.style.boxSizing = 'border-box';
	        if (changeCallback) {
	            input.oninput = function () {
	                input.value = String(changeCallback(Number(input.value)));
	            };
	        }
	        this._container.appendChild(input);
	    };
	    WBPropertyGrid.prototype.addChoiceAttribute = function (name, values, value, readonly, changeCallback) {
	        var label = document.createElement('label');
	        label.innerHTML = name + ':';
	        this._container.appendChild(label);
	        var input = document.createElement('select');
	        values.forEach(function (opt) {
	            var option = document.createElement('option');
	            option.value = String(opt.value);
	            option.innerText = String(opt.desc);
	            input.add(option);
	        });
	        if (value) {
	            input.value = String(value);
	        }
	        input.disabled = readonly;
	        input.style.boxSizing = 'border-box';
	        if (changeCallback) {
	            input.onchange = function () {
	                input.value = String(changeCallback(input.value));
	            };
	        }
	        this._container.appendChild(input);
	    };
	    WBPropertyGrid.prototype.addColorAttribute = function (name, value, readonly, changeCallback) {
	        var label = document.createElement('label');
	        label.innerHTML = name + ':';
	        this._container.appendChild(label);
	        var input = document.createElement('input');
	        input.type = 'color';
	        input.value = value;
	        input.readOnly = readonly;
	        input.disabled = readonly;
	        input.style.boxSizing = 'border-box';
	        if (changeCallback) {
	            input.onchange = function () {
	                input.value = String(changeCallback(input.value));
	            };
	        }
	        this._container.appendChild(input);
	    };
	    WBPropertyGrid.prototype.getToolProperty = function (name) {
	        if (this._object) {
	            var ev = new whiteboard.WBGetPropertyEvent(name);
	            this._object.triggerEx(ev);
	            return ev.value;
	        }
	    };
	    WBPropertyGrid.prototype.setToolProperty = function (name, value) {
	        if (this._object) {
	            var ev = new whiteboard.WBSetPropertyEvent(name, value);
	            this._object.triggerEx(ev);
	        }
	    };
	    WBPropertyGrid.prototype.addToolProperty = function (prop) {
	        var _this = this;
	        var propName = prop.name;
	        var propType = prop.type;
	        var propReadonly = prop.readonly;
	        if (prop.enum) {
	            this.addChoiceAttribute(prop.desc, prop.enum, this.getToolProperty(propName), propReadonly, function (value) {
	                switch (propType) {
	                    case 'string':
	                        _this.setToolProperty(propName, value);
	                        return _this.getToolProperty(propName);
	                    case 'number':
	                        _this.setToolProperty(propName, Number(value));
	                        return _this.getToolProperty(propName);
	                    case 'boolean':
	                        _this.setToolProperty(propName, Boolean(value));
	                        return _this.getObjectProperty(propName);
	                    case 'color':
	                        _this.setToolProperty(propName, value);
	                        return _this.getToolProperty(propName);
	                }
	            });
	        }
	        else {
	            switch (propType) {
	                case 'string':
	                    this.addTextAttribute(prop.desc, this.getToolProperty(propName), propReadonly, function (value) {
	                        _this.setToolProperty(propName, value);
	                        return _this.getToolProperty(propName);
	                    });
	                    break;
	                case 'number':
	                    this.addNumberAttribute(prop.desc, this.getToolProperty(propName), propReadonly, function (value) {
	                        _this.setToolProperty(propName, value);
	                        return _this.getToolProperty(propName);
	                    });
	                    break;
	                case 'boolean':
	                    this.addToggleAttribute(prop.desc, this.getToolProperty(propName), propReadonly, function (value) {
	                        _this.setToolProperty(propName, value);
	                        return _this.getToolProperty(propName);
	                    });
	                    break;
	                case 'color':
	                    this.addColorAttribute(prop.desc, this.getToolProperty(propName), propReadonly, function (value) {
	                        _this.setToolProperty(propName, value);
	                        return _this.getToolProperty(propName);
	                    });
	                    break;
	            }
	        }
	    };
	    WBPropertyGrid.prototype.getObjectProperty = function (name) {
	        if (this._object) {
	            var ev = new whiteboard.WBGetPropertyEvent(name);
	            this._object.triggerEx(ev);
	            return ev.value;
	        }
	    };
	    WBPropertyGrid.prototype.setObjectProperty = function (name, value) {
	        if (this._object) {
	            this._editor.handleMessage(protolist.MsgType.whiteboard_SetObjectPropertyMessage, {
	                name: this._object.entityName,
	                propName: name,
	                propValueJson: JSON.stringify(value)
	            });
	        }
	    };
	    WBPropertyGrid.prototype.addObjectProperty = function (prop) {
	        var _this = this;
	        var propName = prop.name;
	        var propType = prop.type;
	        var propReadonly = prop.readonly;
	        if (prop.enum) {
	            this.addChoiceAttribute(prop.desc, prop.enum, this.getObjectProperty(propName), propReadonly, function (value) {
	                switch (propType) {
	                    case 'string':
	                        _this.setObjectProperty(propName, value);
	                        return _this.getObjectProperty(propName);
	                    case 'number':
	                        _this.setObjectProperty(propName, Number(value));
	                        return _this.getObjectProperty(propName);
	                    case 'boolean':
	                        _this.setObjectProperty(propName, Boolean(value));
	                        return _this.getObjectProperty(propName);
	                    case 'color':
	                        _this.setObjectProperty(propName, value);
	                        return _this.getObjectProperty(propName);
	                }
	            });
	        }
	        else {
	            switch (propType) {
	                case 'string':
	                    this.addTextAttribute(prop.desc, this.getObjectProperty(propName), propReadonly, function (value) {
	                        _this.setObjectProperty(propName, value);
	                        return _this.getObjectProperty(propName);
	                    });
	                    break;
	                case 'number':
	                    this.addNumberAttribute(prop.desc, this.getObjectProperty(propName), propReadonly, function (value) {
	                        _this.setObjectProperty(propName, value);
	                        return _this.getObjectProperty(propName);
	                    });
	                    break;
	                case 'boolean':
	                    this.addToggleAttribute(prop.desc, this.getObjectProperty(propName), propReadonly, function (value) {
	                        _this.setObjectProperty(propName, value);
	                        return _this.getObjectProperty(propName);
	                    });
	                    break;
	                case 'color':
	                    this.addColorAttribute(prop.desc, this.getObjectProperty(propName), propReadonly, function (value) {
	                        _this.setObjectProperty(propName, value);
	                        return _this.getObjectProperty(propName);
	                    });
	                    break;
	            }
	        }
	    };
	    WBPropertyGrid.prototype.clear = function () {
	        while (this._container.firstChild) {
	            var el = this._container.firstChild;
	            if (el.onchange) {
	                el.onchange = null;
	            }
	            if (el.onclick) {
	                el.onclick = null;
	            }
	            el.remove();
	        }
	        /*
	        const inputs = document.querySelectorAll (`table#${this._tableId} input`);
	        for (let i = 0; i < inputs.length; i++) {
	            (inputs[i] as HTMLInputElement).onchange = null;
	        };
	        const selects = document.querySelectorAll (`table#${this._tableId} select`);
	        for (let i = 0; i < selects.length; i++) {
	            (selects[i] as HTMLSelectElement).onchange = null;
	        }
	        const tbody = document.querySelector (`table#${this._tableId} tbody`);
	        while (tbody && tbody.hasChildNodes()) {
	            tbody.removeChild (tbody.firstChild as Node);
	        }
	        */
	        this._object = null;
	    };
	    WBPropertyGrid.prototype.reloadToolProperties = function () {
	        var obj = this._object;
	        this.clear();
	        obj && this.loadToolProperties(obj);
	    };
	    WBPropertyGrid.prototype.loadToolProperties = function (object) {
	        var _this = this;
	        if (this._object !== object) {
	            this.clear();
	            this._object = object;
	            if (this._object) {
	                var ev = new whiteboard.WBGetPropertyListEvent();
	                this._object.triggerEx(ev);
	                if (ev.properties) {
	                    for (var groupName in ev.properties) {
	                        var group = ev.properties[groupName];
	                        this.addGroup(group.desc);
	                        group.properties.forEach(function (value) {
	                            _this.addToolProperty(value);
	                        });
	                    }
	                }
	            }
	        }
	    };
	    WBPropertyGrid.prototype.reloadObjectProperties = function () {
	        var obj = this._object;
	        this.clear();
	        obj && this.loadObjectProperties(obj);
	    };
	    WBPropertyGrid.prototype.loadObjectProperties = function (object) {
	        var _this = this;
	        if (this._object !== object) {
	            this.clear();
	            this._object = object;
	            if (this._object) {
	                var ev = new whiteboard.WBGetPropertyListEvent();
	                this._object.triggerEx(ev);
	                if (ev.properties) {
	                    for (var groupName in ev.properties) {
	                        var group = ev.properties[groupName];
	                        this.addGroup(group.desc);
	                        group.properties.forEach(function (value) {
	                            _this.addObjectProperty(value);
	                        });
	                    }
	                }
	            }
	        }
	    };
	    WBPropertyGrid.prototype.createRow = function () {
	        var tbody = document.querySelector("#" + this._tableId + " tbody");
	        var tr = document.createElement('tr');
	        if (tbody && tr) {
	            tbody.appendChild(tr);
	        }
	        return tr;
	    };
	    WBPropertyGrid.prototype.createCell = function (tr) {
	        var td = document.createElement('td');
	        td.style.color = '#000';
	        td.style.fontWeight = 'bold';
	        td.style.overflow = 'hidden';
	        td.style.whiteSpace = 'nowrap';
	        td.style.textOverflow = 'ellipsis';
	        td.style.height = '24px';
	        tr.appendChild(td);
	        return td;
	    };
	    WBPropertyGrid.prototype.createGroupCell = function (tr, name) {
	        var td = this.createCell(tr);
	        td.style.paddingLeft = '5px';
	        td.setAttribute('colspan', '2');
	        td.innerText = name;
	        return td;
	    };
	    WBPropertyGrid.prototype.createPropCell = function (tr) {
	        var td = this.createCell(tr);
	        td.style.paddingLeft = '5px';
	        td.style.border = 'dotted 1px #ccc';
	        td.style.color = '#000';
	        return td;
	    };
	    return WBPropertyGrid;
	}());
	exports.WBPropertyGrid = WBPropertyGrid;
	var WBEditor = /** @class */ (function () {
	    function WBEditor(WB, toolPaletteElement, objectPropGridElement, toolPropGridElement) {
	        this._strokeColor = '#00000000';
	        this._fillColor = 'red';
	        this._toolFontSize = 14;
	        this._wb = WB;
	        this._toolPalette = new WBToolPalette(this, toolPaletteElement);
	        this._toolPalette.loadToolPalette();
	        this._objectPropGrid = new WBPropertyGrid(this, objectPropGridElement, 'wb-object');
	        this._toolPropGrid = new WBPropertyGrid(this, toolPropGridElement, 'wb-tool');
	    }
	    Object.defineProperty(WBEditor.prototype, "whiteboard", {
	        get: function () {
	            return this._wb;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WBEditor.prototype, "toolPalette", {
	        get: function () {
	            return this._toolPalette;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WBEditor.prototype, "objectPropertyGrid", {
	        get: function () {
	            return this._objectPropGrid;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WBEditor.prototype, "toolPropertyGrid", {
	        get: function () {
	            return this._toolPropGrid;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WBEditor.prototype, "strokeColor", {
	        get: function () {
	            return this._strokeColor;
	        },
	        set: function (value) {
	            this._strokeColor = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WBEditor.prototype, "fillColor", {
	        get: function () {
	            return this._fillColor;
	        },
	        set: function (value) {
	            this._fillColor = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WBEditor.prototype, "toolFontSize", {
	        get: function () {
	            return this._toolFontSize;
	        },
	        set: function (value) {
	            this._toolFontSize = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    WBEditor.prototype.handleMessage = function (msgType, args) {
	        catk.App.triggerEvent(null, new whiteboard.WBMessageEvent(msgType, args));
	    };
	    return WBEditor;
	}());
	exports.WBEditor = WBEditor;

	});

	unwrapExports(editor);
	var editor_1 = editor.WBToolPalette;
	var editor_2 = editor.WBPropertyGrid;
	var editor_3 = editor.WBEditor;

	var editor$2 = createCommonjsModule(function (module, exports) {
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(toolbox);
	__export(editor);

	});

	unwrapExports(editor$2);

	var label = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });


	var WBLabel = /** @class */ (function (_super) {
	    __extends(WBLabel, _super);
	    function WBLabel(parent, params) {
	        if (params === void 0) { params = null; }
	        var _this = _super.call(this, parent || undefined) || this;
	        var opt = params || {};
	        _this._width = Number(opt.width || 0);
	        _this._height = Number(opt.height || 0);
	        _this._fontSize = Number(opt.fontSize || 16);
	        _this._fontStyle = opt.fontStyle || 'normal';
	        _this._fontVariant = opt.fontVariant || 'normal';
	        _this._fontWeight = opt.fontWeight || 'normal';
	        _this._fontFamily = opt.fontFamily || 'PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Source Han Sans CN,sans-serif';
	        _this._font = '';
	        _this._text = opt.text ? _this.parseText(opt.text) : '';
	        _this._measure = null;
	        _this._minwidth = 10;
	        _this._textcolor = opt.textColor || '#000';
	        _this._bkColor = opt.bkColor || '#f00';
	        _this._bkShape = opt.bkShape || 'rect';
	        _this._boundingShape = null;
	        _this.anchorPoint = { x: 0.5, y: 0.5 };
	        _this.on(catk.EvtUpdate.type, function (evt) {
	            _this.update();
	        });
	        _this.on(catk.EvtGetBoundingShape.type, function (evt) {
	            if (_this._boundingShape) {
	                evt.shape = _this._boundingShape;
	            }
	        });
	        _this.on(catk.EvtDraw.type, function (evt) {
	            if (_this._measure) {
	                var width = _this._measure.width;
	                if (width < _this._minwidth) {
	                    width = _this._minwidth;
	                }
	                var height = _this._fontSize;
	                var boundingWidth = Math.max(_this._width, width);
	                var boundingHeight = Math.max(_this._height, height);
	                switch (_this._bkShape) {
	                    case 'rect':
	                        evt.canvas.context.fillStyle = _this._bkColor;
	                        evt.canvas.context.fillRect(-boundingWidth * _this.anchorPoint.x, -boundingHeight * _this.anchorPoint.y, boundingWidth, boundingHeight);
	                        break;
	                    case 'ellipse':
	                        evt.canvas.context.fillStyle = _this._bkColor;
	                        evt.canvas.context.beginPath();
	                        evt.canvas.context.ellipse(-boundingWidth * _this.anchorPoint.x + boundingWidth / 2, -boundingHeight * _this.anchorPoint.y + boundingHeight / 2, boundingWidth / 2, boundingHeight / 2, 0, 0, Math.PI * 2);
	                        evt.canvas.context.closePath();
	                        evt.canvas.context.fill();
	                        break;
	                }
	                var x = (boundingWidth - width) / 2 - boundingWidth * _this.anchorPoint.x;
	                var y = (boundingHeight - height) / 2 - boundingHeight * _this.anchorPoint.y;
	                evt.canvas.context.fillStyle = _this._textcolor;
	                evt.canvas.context.textAlign = 'left';
	                evt.canvas.context.textBaseline = 'hanging';
	                evt.canvas.context.font = _this._font;
	                evt.canvas.context.fillText(_this._text, x, y, width);
	            }
	        });
	        _this.on(whiteboard.WBGetPropertyEvent.type, function (ev) {
	            switch (ev.name) {
	                case 'text': {
	                    ev.value = _this.text;
	                    break;
	                }
	                case 'textColor': {
	                    ev.value = _this._textcolor;
	                    break;
	                }
	                case 'fontSize': {
	                    ev.value = _this.fontSize;
	                    break;
	                }
	                case 'fontWeight': {
	                    ev.value = _this.fontWeight;
	                    break;
	                }
	                case 'fontStyle': {
	                    ev.value = _this.fontStyle;
	                    break;
	                }
	                case 'width': {
	                    ev.value = _this._width;
	                    break;
	                }
	                case 'height': {
	                    ev.value = _this._height;
	                    break;
	                }
	                case 'bkColor': {
	                    ev.value = _this.bkColor;
	                    break;
	                }
	                case 'bkShape': {
	                    ev.value = _this.bkShape;
	                    break;
	                }
	            }
	        });
	        _this.on(whiteboard.WBSetPropertyEvent.type, function (ev) {
	            switch (ev.name) {
	                case 'text': {
	                    _this.text = ev.value;
	                    break;
	                }
	                case 'textColor': {
	                    _this._textcolor = ev.value;
	                    break;
	                }
	                case 'fontSize': {
	                    _this.fontSize = Number(ev.value);
	                    break;
	                }
	                case 'fontWeight': {
	                    _this.fontWeight = String(ev.value);
	                    break;
	                }
	                case 'fontStyle': {
	                    _this.fontStyle = String(ev.value);
	                    break;
	                }
	                case 'width': {
	                    _this.width = Number(ev.value);
	                    break;
	                }
	                case 'height': {
	                    _this.height = Number(ev.value);
	                    break;
	                }
	                case 'bkColor': {
	                    _this.bkColor = String(ev.value);
	                    break;
	                }
	                case 'bkShape': {
	                    _this.bkShape = String(ev.value);
	                    break;
	                }
	            }
	        });
	        _this.on(whiteboard.WBGetPropertyListEvent.type, function (ev) {
	            ev.properties = ev.properties || {};
	            ev.properties[_this.entityType] = ev.properties[_this.entityType] || { desc: _this.entityType, properties: [] };
	            ev.properties[_this.entityType].properties.push({
	                name: 'text',
	                desc: '文字内容',
	                readonly: false,
	                type: 'string',
	                value: _this.text
	            });
	            ev.properties[_this.entityType].properties.push({
	                name: 'textColor',
	                desc: '文字颜色',
	                readonly: false,
	                type: 'color',
	                value: _this._textcolor
	            });
	            ev.properties[_this.entityType].properties.push({
	                name: 'fontSize',
	                desc: '字体大小',
	                readonly: false,
	                type: 'number',
	                value: _this.fontSize
	            });
	            ev.properties[_this.entityType].properties.push({
	                name: 'fontWeight',
	                desc: '字体粗细',
	                readonly: false,
	                type: 'string',
	                value: _this._fontWeight,
	                enum: [{
	                        value: 'normal',
	                        desc: '正常'
	                    }, {
	                        value: 'bold',
	                        desc: '粗体'
	                    }, {
	                        value: 'bolder',
	                        desc: '加粗'
	                    }, {
	                        value: 'lighter',
	                        desc: '纤细'
	                    }]
	            });
	            ev.properties[_this.entityType].properties.push({
	                name: 'fontStyle',
	                desc: '字体样式',
	                readonly: false,
	                type: 'string',
	                value: _this._fontStyle,
	                enum: [{
	                        value: 'normal',
	                        desc: '正常'
	                    }, {
	                        value: 'italic',
	                        desc: '斜体'
	                    }]
	            });
	            ev.properties[_this.entityType].properties.push({
	                name: 'width',
	                desc: '宽度',
	                readonly: false,
	                type: 'number',
	                value: _this.width
	            });
	            ev.properties[_this.entityType].properties.push({
	                name: 'height',
	                desc: '高度',
	                readonly: false,
	                type: 'number',
	                value: _this.height
	            });
	            ev.properties[_this.entityType].properties.push({
	                name: 'bkColor',
	                desc: '背景颜色',
	                readonly: false,
	                type: 'color',
	                value: _this.bkColor
	            });
	            ev.properties[_this.entityType].properties.push({
	                name: 'bkShape',
	                desc: '背景样式',
	                readonly: false,
	                type: 'string',
	                value: _this.bkShape,
	                enum: [{
	                        value: 'none',
	                        desc: '无'
	                    }, {
	                        value: 'rect',
	                        desc: '矩形'
	                    }, {
	                        value: 'ellipse',
	                        desc: '圆形'
	                    }]
	            });
	        });
	        return _this;
	    }
	    Object.defineProperty(WBLabel.prototype, "text", {
	        get: function () {
	            return this._text;
	        },
	        set: function (value) {
	            var newText = this.parseText(value);
	            if (newText !== this._text) {
	                this._text = newText;
	                this._measure = null;
	                this._boundingShape = null;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    WBLabel.prototype.setAnchorPoint = function (pt) {
	        _super.prototype.setAnchorPoint.call(this, pt);
	        this._boundingShape = null;
	    };
	    Object.defineProperty(WBLabel.prototype, "fontSize", {
	        get: function () {
	            return this._fontSize;
	        },
	        set: function (value) {
	            if (value !== this._fontSize) {
	                this._fontSize = value;
	                this._font = '';
	                this._measure = null;
	                this._boundingShape = null;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WBLabel.prototype, "fontWeight", {
	        get: function () {
	            return this._fontWeight;
	        },
	        set: function (value) {
	            if (value !== this._fontWeight) {
	                this._fontWeight = value;
	                this._font = '';
	                this._measure = null;
	                this._boundingShape = null;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WBLabel.prototype, "fontStyle", {
	        get: function () {
	            return this._fontStyle;
	        },
	        set: function (value) {
	            if (value !== this._fontStyle) {
	                this._fontStyle = value;
	                this._font = '';
	                this._measure = null;
	                this._boundingShape = null;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WBLabel.prototype, "width", {
	        get: function () {
	            return this._width;
	        },
	        set: function (value) {
	            if (value !== this._width) {
	                this._width = value;
	                this._boundingShape = null;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WBLabel.prototype, "height", {
	        get: function () {
	            return this._height;
	        },
	        set: function (value) {
	            if (value !== this._height) {
	                this._height = value;
	                this._boundingShape = null;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WBLabel.prototype, "bkColor", {
	        get: function () {
	            return this._bkColor;
	        },
	        set: function (value) {
	            this._bkColor = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WBLabel.prototype, "bkShape", {
	        get: function () {
	            return this._bkShape;
	        },
	        set: function (value) {
	            this._bkShape = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    WBLabel.prototype.parseText = function (value) {
	        var regexp = /\{\{[^\{\}]*\}\}/g;
	        var k = value.split(regexp);
	        if (k.length === 1) {
	            return value;
	        }
	        var pos = 1;
	        while (true) {
	            var s = regexp.exec(value);
	            if (s === null) {
	                break;
	            }
	            var val = String((new Function('return ' + s[0].slice(2, s[0].length - 2)))());
	            k.splice(pos, 0, val);
	        }
	        return k.join('');
	    };
	    WBLabel.prototype.update = function () {
	        if (this._font === '') {
	            this._font = this._fontStyle + " " + this._fontVariant + " " + this._fontWeight + " " + this._fontSize + "px " + this._fontFamily;
	            this._boundingShape = null;
	        }
	        if (this._measure === null) {
	            this.view.canvas.context.textAlign = 'left';
	            this.view.canvas.context.textBaseline = 'hanging';
	            this.view.canvas.context.font = this._font;
	            this._measure = this.view.canvas.context.measureText(this._text);
	            this._boundingShape = null;
	        }
	        if (this._measure && !this._boundingShape) {
	            var width = Math.max(this._measure.width, this._minwidth);
	            var height = this._fontSize;
	            var boundingWidth = Math.max(width, this._width);
	            var boundingHeight = Math.max(height, this._height);
	            this._boundingShape = new catk.BoundingBox({ x: -boundingWidth * this.anchorPoint.x, y: -boundingHeight * this.anchorPoint.y, w: boundingWidth, h: boundingHeight });
	        }
	    };
	    return WBLabel;
	}(catk.SceneObject));
	exports.WBLabel = WBLabel;
	var WBLabelFactory = /** @class */ (function (_super) {
	    __extends(WBLabelFactory, _super);
	    function WBLabelFactory() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    WBLabelFactory.prototype.getCreationProperties = function () {
	        return [{
	                name: 'text',
	                desc: '文字内容',
	                readonly: false,
	                type: 'string',
	                value: '标签'
	            }, {
	                name: 'textColor',
	                desc: '文字颜色',
	                readonly: false,
	                type: 'color',
	                value: '#000'
	            }, {
	                name: 'fontSize',
	                desc: '字体大小',
	                readonly: false,
	                type: 'number',
	                value: 16
	            }, {
	                name: 'fontWeight',
	                desc: '字体粗细',
	                readonly: false,
	                type: 'string',
	                value: 'normal',
	                enum: [{
	                        value: 'normal',
	                        desc: '正常'
	                    }, {
	                        value: 'bold',
	                        desc: '粗体'
	                    }, {
	                        value: 'bolder',
	                        desc: '加粗'
	                    }, {
	                        value: 'lighter',
	                        desc: '纤细'
	                    }]
	            }, {
	                name: 'fontStyle',
	                desc: '字体样式',
	                readonly: false,
	                type: 'string',
	                value: 'normal',
	                enum: [{
	                        value: 'normal',
	                        desc: '正常'
	                    }, {
	                        value: 'italic',
	                        desc: '斜体'
	                    }]
	            }, {
	                name: 'width',
	                desc: '宽度',
	                readonly: false,
	                type: 'number',
	                value: 0
	            }, {
	                name: 'height',
	                desc: '高度',
	                readonly: false,
	                type: 'number',
	                value: 0
	            }, {
	                name: 'bkColor',
	                desc: '背景颜色',
	                readonly: false,
	                type: 'color',
	                value: '#0000ff'
	            }, {
	                name: 'bkShape',
	                desc: '背景样式',
	                readonly: false,
	                type: 'string',
	                value: 'none',
	                enum: [{
	                        value: 'none',
	                        desc: '无'
	                    }, {
	                        value: 'rect',
	                        desc: '矩形'
	                    }, {
	                        value: 'ellipse',
	                        desc: '圆形'
	                    }]
	            }];
	    };
	    WBLabelFactory.prototype._createEntity = function (options) {
	        return new WBLabel(null, options);
	    };
	    return WBLabelFactory;
	}(whiteboard.WBFactory));
	exports.WBLabelFactory = WBLabelFactory;

	});

	unwrapExports(label);
	var label_1 = label.WBLabel;
	var label_2 = label.WBLabelFactory;

	var arrow = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });


	var WBArrow = /** @class */ (function (_super) {
	    __extends(WBArrow, _super);
	    function WBArrow(parent, params) {
	        if (params === void 0) { params = null; }
	        var _this = _super.call(this, parent || undefined) || this;
	        var opt = params || {};
	        _this._lineWidth = Number(opt.lineWidth || 1);
	        _this._arrowLen = Number(opt.arrowLen || 15);
	        _this._style = opt.style || 'single';
	        _this._color = opt.color || '#000000';
	        _this._objectFrom = opt.objectFrom || null;
	        _this._positionFrom = { x: opt.positionFromX === undefined ? 0 : Number(opt.positionFromX), y: opt.positionFromY === undefined ? 0 : Number(opt.positionFromY) };
	        _this._objectTo = opt.objectTo || null;
	        _this._positionTo = { x: opt.positionToX === undefined ? 0 : Number(opt.positionToX), y: opt.positionToY === undefined ? 0 : Number(opt.positionToY) };
	        _this._segment = null;
	        _this._boundingShape = null;
	        _this.on(catk.EvtUpdate.type, function (evt) {
	            _this.update();
	        });
	        _this.on(catk.EvtGetBoundingShape.type, function (evt) {
	            if (!_this._boundingShape) {
	                _this.update();
	            }
	            if (_this._boundingShape) {
	                evt.shape = _this._boundingShape;
	            }
	        });
	        _this.on(catk.EvtDraw.type, function (evt) {
	            if (_this._segment) {
	                if (_this._style === 'none') {
	                    evt.canvas.context.strokeStyle = _this._color;
	                    evt.canvas.context.lineWidth = _this._lineWidth;
	                    evt.canvas.context.beginPath();
	                    evt.canvas.context.moveTo(_this._segment.start.x, _this._segment.start.y);
	                    evt.canvas.context.lineTo(_this._segment.end.x, _this._segment.end.y);
	                    evt.canvas.context.stroke();
	                }
	                else {
	                    var double = _this._style === 'double';
	                    _this.drawArrow(evt.canvas.context, _this._segment.end.x, _this._segment.end.y, _this._segment.start.x, _this._segment.start.y, 30, _this._arrowLen, _this._lineWidth, _this._color, double);
	                }
	            }
	        });
	        _this.on(whiteboard.WBGetPropertyEvent.type, function (ev) {
	            switch (ev.name) {
	                case 'lineWidth': {
	                    ev.value = _this._lineWidth;
	                    break;
	                }
	                case 'arrowLen': {
	                    ev.value = _this._arrowLen;
	                    break;
	                }
	                case 'style': {
	                    ev.value = _this._style;
	                    break;
	                }
	                case 'color': {
	                    ev.value = _this._color;
	                    break;
	                }
	                case 'objectFrom': {
	                    ev.value = _this._objectFrom || '';
	                    break;
	                }
	                case 'positionFromX': {
	                    ev.value = _this._positionFrom ? _this._positionFrom.x : null;
	                    break;
	                }
	                case 'positionFromY': {
	                    ev.value = _this._positionFrom ? _this._positionFrom.y : null;
	                    break;
	                }
	                case 'objectTo': {
	                    ev.value = _this._objectTo || '';
	                    break;
	                }
	                case 'positionToX': {
	                    ev.value = _this._positionTo ? _this._positionTo.x : null;
	                    break;
	                }
	                case 'positionToY': {
	                    ev.value = _this._positionTo ? _this._positionTo.y : null;
	                    break;
	                }
	            }
	        });
	        _this.on(whiteboard.WBSetPropertyEvent.type, function (ev) {
	            switch (ev.name) {
	                case 'lineWidth': {
	                    _this._lineWidth = Number(ev.value);
	                    break;
	                }
	                case 'arrowLen': {
	                    _this._arrowLen = Number(ev.value);
	                    break;
	                }
	                case 'style': {
	                    _this._style = String(ev.value);
	                    break;
	                }
	                case 'color': {
	                    _this._color = String(ev.value);
	                    break;
	                }
	                case 'objectFrom': {
	                    _this._objectFrom = ev.value === '' ? null : String(ev.value);
	                    break;
	                }
	                case 'positionFromX': {
	                    if (!_this._positionFrom) {
	                        _this._positionFrom = { x: 0, y: 0 };
	                    }
	                    _this._positionFrom.x = Number(ev.value);
	                    break;
	                }
	                case 'positionFromY': {
	                    if (!_this._positionFrom) {
	                        _this._positionFrom = { x: 0, y: 0 };
	                    }
	                    _this._positionFrom.y = Number(ev.value);
	                    break;
	                }
	                case 'objectTo': {
	                    _this._objectTo = ev.value === '' ? null : String(ev.value);
	                    break;
	                }
	                case 'positionToX': {
	                    if (!_this._positionTo) {
	                        _this._positionTo = { x: 0, y: 0 };
	                    }
	                    _this._positionTo.x = Number(ev.value);
	                    break;
	                }
	                case 'positionToY': {
	                    if (!_this._positionTo) {
	                        _this._positionTo = { x: 0, y: 0 };
	                    }
	                    _this._positionTo.y = Number(ev.value);
	                    break;
	                }
	            }
	        });
	        _this.on(whiteboard.WBGetPropertyListEvent.type, function (ev) {
	            ev.properties = ev.properties || {};
	            ev.properties[_this.entityType] = ev.properties[_this.entityType] || { desc: _this.entityType, properties: [] };
	            ev.properties[_this.entityType].properties.push({
	                name: 'lineWidth',
	                desc: '线宽',
	                readonly: false,
	                type: 'number',
	                value: _this._lineWidth
	            });
	            ev.properties[_this.entityType].properties.push({
	                name: 'arrowLen',
	                desc: '箭头长度',
	                readonly: false,
	                type: 'number',
	                value: _this._arrowLen
	            });
	            ev.properties[_this.entityType].properties.push({
	                name: 'style',
	                desc: '箭头样式',
	                readonly: false,
	                type: 'string',
	                value: _this._style,
	                enum: [{
	                        value: 'none',
	                        desc: '无'
	                    }, {
	                        value: 'single',
	                        desc: '单向箭头'
	                    }, {
	                        value: 'double',
	                        desc: '双向箭头'
	                    }]
	            });
	            ev.properties[_this.entityType].properties.push({
	                name: 'color',
	                desc: '颜色',
	                readonly: false,
	                type: 'color',
	                value: _this._color
	            });
	            ev.properties[_this.entityType].properties.push({
	                name: 'objectFrom',
	                desc: '绑定出发节点',
	                readonly: false,
	                type: 'string',
	                value: _this._objectFrom || ''
	            });
	            ev.properties[_this.entityType].properties.push({
	                name: 'positionFromX',
	                desc: '出发点X坐标',
	                readonly: false,
	                type: 'number',
	                value: _this._positionFrom ? _this._positionFrom.x : null
	            });
	            ev.properties[_this.entityType].properties.push({
	                name: 'positionFromY',
	                desc: '出发点Y坐标',
	                readonly: false,
	                type: 'number',
	                value: _this._positionFrom ? _this._positionFrom.y : null
	            });
	            ev.properties[_this.entityType].properties.push({
	                name: 'objectTo',
	                desc: '绑定到达节点',
	                readonly: false,
	                type: 'string',
	                value: _this._objectTo || ''
	            });
	            ev.properties[_this.entityType].properties.push({
	                name: 'positionToX',
	                desc: '到达点X坐标',
	                readonly: false,
	                type: 'number',
	                value: _this._positionTo ? _this._positionTo.x : null
	            });
	            ev.properties[_this.entityType].properties.push({
	                name: 'positionToY',
	                desc: '到达点Y坐标',
	                readonly: false,
	                type: 'number',
	                value: _this._positionTo ? _this._positionTo.y : null
	            });
	        });
	        return _this;
	    }
	    WBArrow.prototype.getSegment = function () {
	        if (!this._positionFrom || !this._positionTo) {
	            return null;
	        }
	        var t = this.worldTransform;
	        var posFrom = t.transformPoint(this._positionFrom);
	        var posTo = t.transformPoint(this._positionTo);
	        var result = { start: { x: posFrom.x, y: posFrom.y }, end: { x: posTo.x, y: posTo.y } };
	        var objectFrom = null;
	        var transformFrom = null;
	        var objectTo = null;
	        var transformTo = null;
	        if (this._objectFrom) {
	            var ev = new whiteboard.WBGetObjectEvent(this._objectFrom);
	            catk.App.triggerEvent(null, ev);
	            objectFrom = ev.object || null;
	            if (objectFrom) {
	                transformFrom = objectFrom.worldTransform;
	                result.start.x = transformFrom.e;
	                result.start.y = transformFrom.f;
	            }
	        }
	        if (this._objectTo) {
	            var ev = new whiteboard.WBGetObjectEvent(this._objectTo);
	            catk.App.triggerEvent(null, ev);
	            objectTo = ev.object || null;
	            if (objectTo) {
	                transformTo = objectTo.worldTransform;
	                result.end.x = transformTo.e;
	                result.end.y = transformTo.f;
	            }
	        }
	        if (objectFrom && transformFrom) {
	            var boundingShape = objectFrom.boundingShape;
	            var ptList = boundingShape ? catk.IntersectionTestShapeSegment(boundingShape.getTransformedShape(transformFrom), result) : null;
	            if (ptList && ptList.length > 0) {
	                result.start = ptList[0];
	            }
	        }
	        if (objectTo && transformTo) {
	            var boundingShape = objectTo.boundingShape;
	            var ptList = boundingShape ? catk.IntersectionTestShapeSegment(boundingShape.getTransformedShape(transformTo), result) : null;
	            if (ptList && ptList.length > 0) {
	                result.end = ptList[0];
	            }
	        }
	        var it = catk.Matrix2d.invert(t);
	        result.start = it.transformPoint(result.start);
	        result.end = it.transformPoint(result.end);
	        return result;
	    };
	    WBArrow.prototype.drawArrow = function (ctx, fromX, fromY, toX, toY, theta, headlen, width, color, double) {
	        // 计算各角度和对应的P2,P3坐标 
	        var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI, angle1 = (angle + theta) * Math.PI / 180, angle2 = (angle - theta) * Math.PI / 180, topX = headlen * Math.cos(angle1), topY = headlen * Math.sin(angle1), botX = headlen * Math.cos(angle2), botY = headlen * Math.sin(angle2);
	        ctx.beginPath();
	        var arrowX = fromX - topX;
	        var arrowY = fromY - topY;
	        ctx.moveTo(arrowX, arrowY);
	        ctx.lineTo(fromX, fromY);
	        arrowX = fromX - botX;
	        arrowY = fromY - botY;
	        ctx.lineTo(arrowX, arrowY);
	        ctx.moveTo(fromX, fromY);
	        ctx.lineTo(toX, toY);
	        if (double) {
	            arrowX = toX + topX;
	            arrowY = toY + topY;
	            ctx.moveTo(arrowX, arrowY);
	            ctx.lineTo(toX, toY);
	            arrowX = toX + botX;
	            arrowY = toY + botY;
	            ctx.lineTo(arrowX, arrowY);
	        }
	        ctx.strokeStyle = color;
	        ctx.lineWidth = width;
	        ctx.stroke();
	    };
	    WBArrow.prototype.update = function () {
	        // Compute segment and bounding shape
	        this._segment = this.getSegment();
	        if (this._segment) {
	            var v = catk.GetVector(this._segment.start, this._segment.end);
	            var d = catk.VectorLength(v);
	            var w = Math.floor(this._lineWidth / 2 + 3);
	            var dx = w * v.y / d;
	            var dy = -w * v.x / d;
	            if (this._boundingShape === null) {
	                this._boundingShape = new catk.BoundingHull();
	            }
	            else {
	                this._boundingShape.clear();
	            }
	            this._boundingShape.addPoint({ x: this._segment.start.x + dx, y: this._segment.start.y + dy });
	            this._boundingShape.addPoint({ x: this._segment.start.x - dx, y: this._segment.start.y - dy });
	            this._boundingShape.addPoint({ x: this._segment.end.x - dx, y: this._segment.end.y - dy });
	            this._boundingShape.addPoint({ x: this._segment.end.x + dx, y: this._segment.end.y + dy });
	        }
	    };
	    return WBArrow;
	}(catk.SceneObject));
	exports.WBArrow = WBArrow;
	var WBArrowFactory = /** @class */ (function (_super) {
	    __extends(WBArrowFactory, _super);
	    function WBArrowFactory() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    WBArrowFactory.prototype.getCreationProperties = function () {
	        return [{
	                name: 'lineWidth',
	                desc: '线宽',
	                readonly: false,
	                type: 'number',
	                value: 3
	            }, {
	                name: 'arrowLen',
	                desc: '箭头长度',
	                readonly: false,
	                type: 'number',
	                value: 15
	            }, {
	                name: 'style',
	                desc: '箭头样式',
	                readonly: false,
	                type: 'string',
	                value: 'single',
	                enum: [{
	                        value: 'none',
	                        desc: '无'
	                    }, {
	                        value: 'single',
	                        desc: '单向箭头'
	                    }, {
	                        value: 'double',
	                        desc: '双向箭头'
	                    }]
	            }, {
	                name: 'color',
	                desc: '颜色',
	                readonly: false,
	                type: 'color',
	                value: '#000000'
	            }];
	    };
	    WBArrowFactory.prototype._createEntity = function (options) {
	        return new WBArrow(null, options);
	    };
	    return WBArrowFactory;
	}(whiteboard.WBFactory));
	exports.WBArrowFactory = WBArrowFactory;

	});

	unwrapExports(arrow);
	var arrow_1 = arrow.WBArrow;
	var arrow_2 = arrow.WBArrowFactory;

	var freedraw = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
	    if (m) return m.call(o);
	    return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	};
	Object.defineProperty(exports, "__esModule", { value: true });



	var WBFreeDraw = /** @class */ (function (_super) {
	    __extends(WBFreeDraw, _super);
	    function WBFreeDraw(parent, params) {
	        if (params === void 0) { params = null; }
	        var _this = _super.call(this, parent || undefined) || this;
	        _this._canvas = null;
	        _this._boundingShape = null;
	        _this._action = false;
	        var opt = params || {};
	        _this._lineWidth = Number(opt.lineWidth || 1);
	        _this._color = opt.color || '#000000';
	        _this._mode = opt.mode || 'draw';
	        _this._mousePosX = 0;
	        _this._mousePosY = 0;
	        _this._strokeInfo = [];
	        _this._lastPoint = null;
	        _this._eraseSize = opt.eraseSize || 20;
	        _this.on(catk.EvtCanvasResize.type, function (evt) {
	            if (evt.view === _this.view && _this._canvas) {
	                var context = _this._canvas.getContext('2d');
	                var imageData = context.getImageData(0, 0, _this._canvas.width, _this._canvas.height);
	                _this._canvas.width = evt.view.canvas.width;
	                _this._canvas.height = evt.view.canvas.height;
	                context = _this._canvas.getContext('2d');
	                context.putImageData(imageData, 0, 0);
	                _this._boundingShape.rect = { x: 0, y: 0, w: _this._canvas.width, h: _this._canvas.height };
	            }
	        });
	        _this.on(catk.EvtGetBoundingShape.type, function (evt) {
	            return null;
	        });
	        _this.on(catk.EvtDraw.type, function (evt) {
	            var w = _this.canvas.width;
	            var h = _this.canvas.height;
	            evt.canvas.context.drawImage(_this.canvas, -Math.round(w * _this.anchorPoint.x) - 0.5, -Math.round(h * _this.anchorPoint.y) - 0.5, w, h);
	            if (_this._mode === 'erase') {
	                evt.canvas.context.strokeStyle = '#000000';
	                evt.canvas.context.strokeRect(Math.round(_this._mousePosX - _this._eraseSize / 2), Math.round(_this._mousePosY - _this._eraseSize / 2), _this._eraseSize, _this._eraseSize);
	            }
	        });
	        _this.on(whiteboard.WBMessageEvent.type, function (ev) {
	            var context = _this.canvas.getContext('2d');
	            if (context) {
	                var type = ev.messageType;
	                var data = ev.messageData;
	                if (type === protolist.MsgType.whiteboard_StrokeMessage && ev.broadcast) {
	                    var stroke = {
	                        entityName: _this.entityName,
	                        type: data.type,
	                        points: data.points,
	                        lineWidth: data.lineWidth,
	                        color: data.color,
	                        size: data.size
	                    };
	                    _this._strokeInfo.push(stroke);
	                    _this.stroke(stroke);
	                }
	            }
	        });
	        _this.on(catk.EvtMouseDown.type, function (ev) {
	            if (!_this._action) {
	                _this._action = true;
	                var pt = catk.Matrix2d.invert(_this.worldTransform).transformPoint({ x: ev.x, y: ev.y });
	                if (_this._mode === 'draw') {
	                    var stroke = {
	                        entityName: _this.entityName,
	                        type: protolist.whiteboard.StrokeType.Draw,
	                        lineWidth: _this._lineWidth,
	                        color: _this._color,
	                        points: [{ x: pt.x, y: pt.y }]
	                    };
	                    _this._strokeInfo.push(stroke);
	                    var ctx = _this.canvas.getContext('2d');
	                    ctx.lineWidth = stroke.lineWidth;
	                    ctx.strokeStyle = stroke.color;
	                    ctx.lineCap = 'round';
	                    ctx.lineJoin = 'round';
	                    ctx.beginPath();
	                    ctx.moveTo(pt.x + 0.5, pt.y + 0.5);
	                }
	                else {
	                    var stroke = {
	                        entityName: _this.entityName,
	                        type: protolist.whiteboard.StrokeType.Erase,
	                        size: _this._eraseSize,
	                        points: [{ x: pt.x, y: pt.y }]
	                    };
	                    _this._strokeInfo.push(stroke);
	                    var ctx = _this.canvas.getContext('2d');
	                    ctx.clearRect(pt.x - _this._eraseSize / 2, pt.y - _this._eraseSize / 2, _this._eraseSize, _this._eraseSize);
	                }
	            }
	        });
	        _this.on(catk.EvtMouseMove.type, function (ev) {
	            _this._mousePosX = ev.x;
	            _this._mousePosY = ev.y;
	            if (_this._action) {
	                var pt = catk.Matrix2d.invert(_this.worldTransform).transformPoint({ x: ev.x, y: ev.y });
	                _this._strokeInfo[_this._strokeInfo.length - 1].points.push(pt);
	                var context = _this._canvas.getContext('2d');
	                if (_this._mode === 'draw') {
	                    context.lineTo(pt.x + 0.5, pt.y + 0.5);
	                    context.stroke();
	                }
	                else {
	                    context.clearRect(pt.x - _this._eraseSize / 2, pt.y - _this._eraseSize / 2, _this._eraseSize, _this._eraseSize);
	                }
	            }
	        });
	        _this.on(catk.EvtMouseUp.type, function (ev) {
	            if (_this._action) {
	                _this._action = false;
	                _this.repaint();
	                catk.App.triggerEvent(null, new whiteboard.WBMessageEvent(protolist.MsgType.whiteboard_StrokeMessage, _this._strokeInfo[_this._strokeInfo.length - 1]));
	            }
	        });
	        return _this;
	    }
	    Object.defineProperty(WBFreeDraw.prototype, "lineWidth", {
	        get: function () {
	            return this._lineWidth;
	        },
	        set: function (val) {
	            this._lineWidth = val;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WBFreeDraw.prototype, "color", {
	        get: function () {
	            return this._color;
	        },
	        set: function (val) {
	            this._color = val;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WBFreeDraw.prototype, "eraseSize", {
	        get: function () {
	            return this._eraseSize;
	        },
	        set: function (val) {
	            this._eraseSize = val;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WBFreeDraw.prototype, "mode", {
	        get: function () {
	            return this._mode;
	        },
	        set: function (value) {
	            this.reset();
	            this._mode = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WBFreeDraw.prototype, "canvas", {
	        get: function () {
	            if (this._canvas === null) {
	                this._canvas = document.createElement('canvas');
	                this._canvas.style.backgroundColor = '#00000000';
	                this._canvas.width = this.view.canvas.width;
	                this._canvas.height = this.view.canvas.height;
	                this._boundingShape = new catk.BoundingBox({ x: 0, y: 0, w: this._canvas.width, h: this._canvas.height });
	            }
	            return this._canvas;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    WBFreeDraw.prototype.clear = function () {
	        if (this._canvas) {
	            var context = this._canvas.getContext('2d');
	            context && context.clearRect(0, 0, this._canvas.width, this._canvas.height);
	        }
	    };
	    WBFreeDraw.prototype.repaint = function () {
	        var e_1, _a;
	        this.clear();
	        try {
	            for (var _b = __values(this._strokeInfo), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var stroke = _c.value;
	                this.stroke(stroke);
	            }
	        }
	        catch (e_1_1) { e_1 = { error: e_1_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_1) throw e_1.error; }
	        }
	    };
	    WBFreeDraw.prototype.unstroke = function (ev) {
	        if (this._strokeInfo.length > 0) {
	            this._strokeInfo.pop();
	            this.repaint();
	        }
	    };
	    WBFreeDraw.prototype.stroke = function (data) {
	        var e_2, _a;
	        var context = this.canvas.getContext('2d');
	        var pt = data.points;
	        if (data.type === protolist.whiteboard.StrokeType.Draw) {
	            context.lineWidth = data.lineWidth;
	            context.strokeStyle = data.color;
	            context.lineCap = 'round';
	            context.lineJoin = 'round';
	            context.beginPath();
	            context.moveTo(pt[0].x + 0.5, pt[0].y + 0.5);
	            for (var i = 1; i < pt.length; i++) {
	                context.lineTo(pt[i].x + 0.5, pt[i].y + 0.5);
	            }
	            context.stroke();
	        }
	        else {
	            try {
	                for (var pt_1 = __values(pt), pt_1_1 = pt_1.next(); !pt_1_1.done; pt_1_1 = pt_1.next()) {
	                    var p = pt_1_1.value;
	                    context.clearRect(p.x - data.size / 2, p.y - data.size / 2, data.size, data.size);
	                }
	            }
	            catch (e_2_1) { e_2 = { error: e_2_1 }; }
	            finally {
	                try {
	                    if (pt_1_1 && !pt_1_1.done && (_a = pt_1.return)) _a.call(pt_1);
	                }
	                finally { if (e_2) throw e_2.error; }
	            }
	        }
	    };
	    WBFreeDraw.prototype.reset = function () {
	        this._action = false;
	    };
	    return WBFreeDraw;
	}(catk.SceneObject));
	exports.WBFreeDraw = WBFreeDraw;
	var WBFreeDrawFactory = /** @class */ (function (_super) {
	    __extends(WBFreeDrawFactory, _super);
	    function WBFreeDrawFactory() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    WBFreeDrawFactory.prototype._createEntity = function (options) {
	        return new WBFreeDraw(null, options);
	    };
	    return WBFreeDrawFactory;
	}(whiteboard.WBFactory));
	exports.WBFreeDrawFactory = WBFreeDrawFactory;

	});

	unwrapExports(freedraw);
	var freedraw_1 = freedraw.WBFreeDraw;
	var freedraw_2 = freedraw.WBFreeDrawFactory;

	var factory$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	function installFactories(wb) {
	    wb.addFactory(new label.WBLabelFactory('Label'));
	    wb.addFactory(new arrow.WBArrowFactory('Arrow'));
	    wb.addFactory(new freedraw.WBFreeDrawFactory('FreeDraw'));
	}
	exports.installFactories = installFactories;

	});

	unwrapExports(factory$1);
	var factory_1 = factory$1.installFactories;

	var objects = createCommonjsModule(function (module, exports) {
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(label);
	__export(arrow);
	__export(freedraw);
	__export(factory$1);

	});

	unwrapExports(objects);

	var select = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });



	var WBSelectEvent = /** @class */ (function (_super) {
	    __extends(WBSelectEvent, _super);
	    function WBSelectEvent() {
	        return _super.call(this, WBSelectEvent.type) || this;
	    }
	    WBSelectEvent.type = '@WBSelect';
	    return WBSelectEvent;
	}(catk.BaseEvent));
	exports.WBSelectEvent = WBSelectEvent;
	var WBDeselectEvent = /** @class */ (function (_super) {
	    __extends(WBDeselectEvent, _super);
	    function WBDeselectEvent() {
	        return _super.call(this, WBDeselectEvent.type) || this;
	    }
	    WBDeselectEvent.type = '@WBDeselect';
	    return WBDeselectEvent;
	}(catk.BaseEvent));
	exports.WBDeselectEvent = WBDeselectEvent;
	var WBObjectSelectedEvent = /** @class */ (function (_super) {
	    __extends(WBObjectSelectedEvent, _super);
	    function WBObjectSelectedEvent(object) {
	        var _this = _super.call(this, WBObjectSelectedEvent.type) || this;
	        _this.object = object;
	        return _this;
	    }
	    WBObjectSelectedEvent.type = '@WBObjectSelected';
	    return WBObjectSelectedEvent;
	}(catk.BaseEvent));
	exports.WBObjectSelectedEvent = WBObjectSelectedEvent;
	var WBObjectDeselectedEvent = /** @class */ (function (_super) {
	    __extends(WBObjectDeselectedEvent, _super);
	    function WBObjectDeselectedEvent(object) {
	        var _this = _super.call(this, WBObjectDeselectedEvent.type) || this;
	        _this.object = object;
	        return _this;
	    }
	    WBObjectDeselectedEvent.type = '@WBObjectDeselected';
	    return WBObjectDeselectedEvent;
	}(catk.BaseEvent));
	exports.WBObjectDeselectedEvent = WBObjectDeselectedEvent;
	var WBSelectComponent = /** @class */ (function (_super) {
	    __extends(WBSelectComponent, _super);
	    function WBSelectComponent(tool) {
	        var _this = _super.call(this, WBSelectComponent.type) || this;
	        _this.tool = tool;
	        _this._selected = false;
	        _this.on(catk.EvtDraw.type, function (evt) {
	            if (_this._selected) {
	                var shape = _this.object.boundingShape;
	                if (shape) {
	                    var bbox = shape.getBoundingbox();
	                    if (bbox) {
	                        if (!WBSelectComponent.selectPattern && !WBSelectComponent.patternImage) {
	                            WBSelectComponent.patternImage = new Image();
	                            WBSelectComponent.patternImage.src = '/images/dragger-4x4.gif';
	                            WBSelectComponent.patternImage.onload = function () {
	                                WBSelectComponent.selectPattern = evt.canvas.context.createPattern(WBSelectComponent.patternImage, 'repeat');
	                                WBSelectComponent.patternImage = null;
	                            };
	                        }
	                        evt.canvas.context.strokeStyle = '#000';
	                        evt.canvas.context.lineWidth = 1;
	                        if (WBSelectComponent.selectPattern) {
	                            evt.canvas.context.imageSmoothingEnabled = false;
	                            evt.canvas.context.fillStyle = WBSelectComponent.selectPattern;
	                            evt.canvas.context.fillRect(bbox.x - 16, bbox.y - 16, bbox.w + 32, bbox.h + 32);
	                        }
	                        evt.canvas.context.strokeRect(bbox.x, bbox.y, bbox.w, bbox.h);
	                    }
	                }
	            }
	        }, catk.EventListenerOrder.FIRST);
	        _this.on(WBSelectEvent.type, function (evt) {
	            _this._selected = true;
	        });
	        _this.on(WBDeselectEvent.type, function (evt) {
	            _this._selected = false;
	        });
	        return _this;
	    }
	    WBSelectComponent.type = 'WBSelect';
	    WBSelectComponent.selectPattern = null;
	    WBSelectComponent.patternImage = null;
	    return WBSelectComponent;
	}(catk.Component));
	exports.WBSelectComponent = WBSelectComponent;
	var WBSelectTool = /** @class */ (function (_super) {
	    __extends(WBSelectTool, _super);
	    function WBSelectTool(whiteboard$$1) {
	        var _this = _super.call(this, WBSelectTool.toolname, whiteboard$$1) || this;
	        _this._selectedObject = null;
	        _this._moving = false;
	        _this._mouseStartPosX = 0;
	        _this._mouseStartPosY = 0;
	        _this._objectLastPos = { x: 0, y: 0 };
	        _this._lastMoveTime = 0;
	        return _this;
	    }
	    Object.defineProperty(WBSelectTool.prototype, "selectedObject", {
	        get: function () {
	            return this._selectedObject;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    WBSelectTool.prototype.activate = function (options) {
	        var _this = this;
	        _super.prototype.activate.call(this, options);
	        this._selectedObject = null;
	        this.on(catk.EvtKeyDown.type, function (ev) {
	            if (_this._selectedObject) {
	                _this._selectedObject.triggerEx(ev);
	            }
	        });
	        this.on(catk.EvtKeyUp.type, function (ev) {
	            if (_this._selectedObject) {
	                _this._selectedObject.triggerEx(ev);
	            }
	        });
	        this.on(catk.EvtKeyPress.type, function (ev) {
	            if (_this._selectedObject) {
	                _this._selectedObject.triggerEx(ev);
	            }
	        });
	        this.on(catk.EvtMouseDown.type, function (ev) {
	            _this._mouseStartPosX = ev.x;
	            _this._mouseStartPosY = ev.y;
	            var view = _this._wb.view;
	            if (view) {
	                var hitObjects = view.hitObjects;
	                if (hitObjects.length > 1) {
	                    _this.selectObject(hitObjects[0], ev);
	                    _this._moving = true;
	                    _this._lastMoveTime = Date.now();
	                    _this._objectLastPos = _this._selectedObject.translation;
	                }
	                else {
	                    _this.deselect();
	                    _this._moving = false;
	                }
	            }
	        });
	        this.on(catk.EvtMouseMove.type, function (ev) {
	            if (_this._moving) {
	                var dx = ev.x - _this._mouseStartPosX;
	                var dy = ev.y - _this._mouseStartPosY;
	                _this._mouseStartPosX = ev.x;
	                _this._mouseStartPosY = ev.y;
	                if (_this._selectedObject) {
	                    var _a = _this._selectedObject.translation, x = _a.x, y = _a.y;
	                    _this._selectedObject.translation = { x: x + dx, y: y + dy };
	                    var ts = Date.now();
	                    if (ts > _this._lastMoveTime + 1000) {
	                        _this._lastMoveTime = ts;
	                        catk.App.triggerEvent(null, new whiteboard.WBMessageEvent(protolist.MsgType.whiteboard_MoveObjectMessage, {
	                            name: _this._selectedObject.entityName,
	                            x1: _this._objectLastPos.x,
	                            y1: _this._objectLastPos.y,
	                            x2: x + dx,
	                            y2: y + dy
	                        }));
	                        _this._objectLastPos.x = x + dx;
	                        _this._objectLastPos.y = y + dy;
	                    }
	                }
	            }
	        });
	        this.on(catk.EvtMouseUp.type, function (ev) {
	            if (_this._moving && _this._selectedObject) {
	                var _a = _this._selectedObject.translation, x = _a.x, y = _a.y;
	                if (x !== _this._objectLastPos.x || y !== _this._objectLastPos.y) {
	                    catk.App.triggerEvent(null, new whiteboard.WBMessageEvent(protolist.MsgType.whiteboard_MoveObjectMessage, {
	                        name: _this._selectedObject.entityName,
	                        x1: _this._objectLastPos.x,
	                        y1: _this._objectLastPos.y,
	                        x2: x,
	                        y2: y
	                    }));
	                }
	            }
	            _this._moving = false;
	        });
	    };
	    WBSelectTool.prototype.deactivate = function () {
	        this.off(catk.EvtKeyDown.type);
	        this.off(catk.EvtKeyUp.type);
	        this.off(catk.EvtKeyPress.type);
	        this.off(catk.EvtMouseDown.type);
	        this.off(catk.EvtMouseMove.type);
	        this.off(catk.EvtMouseUp.type);
	        this.off(catk.EvtDraw.type);
	        this.deselect();
	        _super.prototype.deactivate.call(this);
	    };
	    WBSelectTool.prototype.activateObject = function (object) {
	        this.deactivateObject(object);
	        object.addComponent(new WBSelectComponent(this));
	    };
	    WBSelectTool.prototype.deactivateObject = function (object) {
	        var components = object.getComponents(WBSelectComponent.type);
	        if (components && components.length > 0) {
	            object.removeComponentsByType(WBSelectComponent.type);
	        }
	    };
	    WBSelectTool.prototype.selectObject = function (object, ev) {
	        if (this._selectedObject !== object) {
	            this.deselect();
	            this._selectedObject = object;
	            object.triggerEx(new WBSelectEvent());
	            catk.App.triggerEvent(null, new WBObjectSelectedEvent(this._selectedObject));
	        }
	    };
	    WBSelectTool.prototype.deselect = function () {
	        if (this._selectedObject) {
	            this._selectedObject.triggerEx(new WBDeselectEvent());
	            catk.App.triggerEvent(null, new WBObjectDeselectedEvent(this._selectedObject));
	            this._selectedObject = null;
	        }
	    };
	    WBSelectTool.toolname = 'Select';
	    return WBSelectTool;
	}(whiteboard.WBTool));
	exports.WBSelectTool = WBSelectTool;

	});

	unwrapExports(select);
	var select_1 = select.WBSelectEvent;
	var select_2 = select.WBDeselectEvent;
	var select_3 = select.WBObjectSelectedEvent;
	var select_4 = select.WBObjectDeselectedEvent;
	var select_5 = select.WBSelectComponent;
	var select_6 = select.WBSelectTool;

	var swap = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });




	var WBSwapComponent = /** @class */ (function (_super) {
	    __extends(WBSwapComponent, _super);
	    function WBSwapComponent(tool) {
	        var _this = _super.call(this, WBSwapComponent.type) || this;
	        _this.tool = tool;
	        _this.selected = false;
	        _this.on(catk.EvtMouseDown.type, function (ev) {
	            if (_this.tool.currentObject) {
	                _this.tool.currentObject.getComponent(WBSwapComponent.type, 0).selected = false;
	            }
	            else {
	                _this.selected = true;
	            }
	            _this.tool.selectObject(_this.object, ev);
	        });
	        _this.on(catk.EvtDraw.type, function (evt) {
	            if (_this.selected) {
	                var shape = _this.object.boundingShape;
	                if (shape) {
	                    var bbox = shape.getBoundingbox();
	                    if (bbox) {
	                        evt.canvas.context.strokeStyle = '#000';
	                        evt.canvas.context.lineWidth = 1;
	                        evt.canvas.context.strokeRect(bbox.x, bbox.y, bbox.w, bbox.h);
	                    }
	                }
	            }
	        });
	        return _this;
	    }
	    WBSwapComponent.type = 'WBSwap';
	    return WBSwapComponent;
	}(catk.Component));
	exports.WBSwapComponent = WBSwapComponent;
	var WBSwapTool = /** @class */ (function (_super) {
	    __extends(WBSwapTool, _super);
	    function WBSwapTool(whiteboard$$1) {
	        var _this = _super.call(this, WBSwapTool.toolname, whiteboard$$1) || this;
	        _this._curObject = null;
	        return _this;
	    }
	    Object.defineProperty(WBSwapTool.prototype, "currentObject", {
	        get: function () {
	            return this._curObject;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    WBSwapTool.prototype.activate = function (options) {
	        _super.prototype.activate.call(this, options);
	        this._curObject = null;
	    };
	    WBSwapTool.prototype.deactivate = function () {
	        if (this._curObject) {
	            this._curObject.triggerEx(new select.WBDeselectEvent());
	            this._curObject = null;
	        }
	        _super.prototype.deactivate.call(this);
	    };
	    WBSwapTool.prototype.activateObject = function (object) {
	        this.deactivateObject(object);
	        object.addComponent(new WBSwapComponent(this));
	    };
	    WBSwapTool.prototype.deactivateObject = function (object) {
	        object.removeComponentsByType(WBSwapComponent.type);
	    };
	    WBSwapTool.prototype.selectObject = function (object, ev) {
	        if (this._curObject == null) {
	            this._curObject = object;
	        }
	        else if (this._curObject !== object) {
	            catk.App.triggerEvent(null, new whiteboard.WBMessageEvent(protolist.MsgType.whiteboard_SwapObjectMessage, {
	                name1: this._curObject.entityName,
	                name2: object.entityName,
	                duration: 200
	            }));
	            // this.swapObject (this._curObject, object, 200);
	            this._curObject = null;
	        }
	        else {
	            this._curObject = null;
	        }
	    };
	    WBSwapTool.toolname = 'Swap';
	    return WBSwapTool;
	}(whiteboard.WBTool));
	exports.WBSwapTool = WBSwapTool;

	});

	unwrapExports(swap);
	var swap_1 = swap.WBSwapComponent;
	var swap_2 = swap.WBSwapTool;

	var create = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });



	var WBCreateTool = /** @class */ (function (_super) {
	    __extends(WBCreateTool, _super);
	    function WBCreateTool(whiteboard$$1) {
	        var _this = _super.call(this, WBCreateTool.toolname, whiteboard$$1) || this;
	        _this.options = {};
	        _this._factoryProperties = [];
	        _this._creationParams = {};
	        return _this;
	    }
	    WBCreateTool.prototype.activate = function (options) {
	        var _this = this;
	        if (options) {
	            this.options = options;
	            if (this._creationParams[options.createType] === undefined) {
	                this._creationParams[options.createType] = {};
	                this._factoryProperties = this._wb.getFactory(options.createType).getCreationProperties();
	                if (this._factoryProperties) {
	                    this._factoryProperties.forEach(function (prop) {
	                        _this._creationParams[options.createType][prop.name] = prop.value;
	                    });
	                }
	            }
	        }
	        this.on(catk.EvtMouseDown.type, function (ev) {
	            /*
	            const args: any  = {
	                type: this.options.createType,
	                name: null,
	            };
	            for (const arg in this.options) {
	                if (arg !== 'command' && arg !== 'createType' && arg !== 'type') {
	                    args[arg] = this.options[arg];
	                }
	            }
	            args.x = ev.x;
	            args.y = ev.y;
	            args.params = this._creationParams[this.options.createType];
	            lib.App.triggerEvent (null, new wb.WBCommandEvent('CreateObject', args));
	            */
	            catk.App.triggerEvent(null, new whiteboard.WBMessageEvent(protolist.MsgType.whiteboard_CreateObjectMessage, {
	                type: _this.options.createType,
	                x: ev.x,
	                y: ev.y,
	                paramsJson: JSON.stringify(_this._creationParams[_this.options.createType])
	            }));
	        });
	        this.on(whiteboard.WBGetPropertyEvent.type, function (ev) {
	            if (ev.name in _this._creationParams[_this.options.createType]) {
	                ev.value = _this._creationParams[_this.options.createType][ev.name];
	            }
	        });
	        this.on(whiteboard.WBSetPropertyEvent.type, function (ev) {
	            if (ev.name in _this._creationParams[_this.options.createType]) {
	                _this._creationParams[_this.options.createType][ev.name] = ev.value;
	            }
	        });
	        this.on(whiteboard.WBGetPropertyListEvent.type, function (ev) {
	            if (_this._factoryProperties && _this._factoryProperties.length > 0) {
	                ev.properties = ev.properties || {};
	                ev.properties[_this.options.createType] = ev.properties[_this.options.createType] || { desc: _this.options.createType, properties: [] };
	                ev.properties[_this.options.createType].properties = _this._factoryProperties;
	            }
	        });
	        _super.prototype.activate.call(this, options);
	    };
	    WBCreateTool.prototype.deactivate = function () {
	        this.off(catk.EvtMouseDown.type);
	        _super.prototype.deactivate.call(this);
	    };
	    WBCreateTool.toolname = 'Create';
	    return WBCreateTool;
	}(whiteboard.WBTool));
	exports.WBCreateTool = WBCreateTool;

	});

	unwrapExports(create);
	var create_1 = create.WBCreateTool;

	var connect = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });



	var WBConnectTool = /** @class */ (function (_super) {
	    __extends(WBConnectTool, _super);
	    function WBConnectTool(whiteboard$$1) {
	        var _this = _super.call(this, WBConnectTool.toolname, whiteboard$$1) || this;
	        _this._createParams = {
	            lineWidth: 3,
	            arrowLen: 15,
	            style: 'single',
	            color: '#000000',
	            objectFrom: null,
	            positionFromX: 0,
	            positionFromY: 0,
	            objectTo: null,
	            positionToX: 0,
	            positionToY: 0
	        };
	        _this._moving = false;
	        _this.on(whiteboard.WBGetPropertyEvent.type, function (ev) {
	            if (ev.name in _this._createParams) {
	                ev.value = _this._createParams[ev.name];
	            }
	        });
	        _this.on(whiteboard.WBSetPropertyEvent.type, function (ev) {
	            if (ev.name in _this._createParams) {
	                _this._createParams[ev.name] = ev.value;
	            }
	        });
	        _this.on(whiteboard.WBGetPropertyListEvent.type, function (ev) {
	            ev.properties = ev.properties || {};
	            ev.properties[_this.name] = ev.properties[_this.name] || { desc: '画笔工具', properties: [] };
	            ev.properties[_this.name].properties.push({
	                name: 'lineWidth',
	                desc: '线宽',
	                readonly: false,
	                type: 'number',
	                value: _this._createParams.lineWidth
	            });
	            ev.properties[_this.name].properties.push({
	                name: 'arrowLen',
	                desc: '箭头长度',
	                readonly: false,
	                type: 'number',
	                value: _this._createParams.arrowLen
	            });
	            ev.properties[_this.name].properties.push({
	                name: 'style',
	                desc: '箭头样式',
	                readonly: false,
	                type: 'string',
	                value: _this._createParams.style,
	                enum: [{
	                        value: 'none',
	                        desc: '无'
	                    }, {
	                        value: 'single',
	                        desc: '单向箭头'
	                    }, {
	                        value: 'double',
	                        desc: '双向箭头'
	                    }]
	            });
	            ev.properties[_this.name].properties.push({
	                name: 'color',
	                desc: '颜色',
	                readonly: false,
	                type: 'color',
	                value: _this._createParams.color
	            });
	        });
	        return _this;
	    }
	    WBConnectTool.prototype.activate = function (options) {
	        var _this = this;
	        _super.prototype.activate.call(this, options);
	        this._moving = false;
	        this.on(catk.EvtMouseDown.type, function (ev) {
	            var view = _this._wb.view;
	            if (view) {
	                _this._moving = true;
	                _this._createParams.objectFrom = null;
	                _this._createParams.objectTo = null;
	                _this._createParams.positionToX = ev.x;
	                _this._createParams.positionToY = ev.y;
	                var hitObjects = view.hitObjects;
	                if (hitObjects.length > 1 && hitObjects[0].entityType !== 'Arrow') {
	                    _this._createParams.objectFrom = hitObjects[0];
	                }
	                else {
	                    _this._createParams.positionFromX = ev.x;
	                    _this._createParams.positionFromY = ev.y;
	                }
	            }
	        });
	        this.on(catk.EvtMouseMove.type, function (ev) {
	            if (_this._moving) {
	                var view = _this._wb.view;
	                if (view) {
	                    var hitObjects = view.hitObjects;
	                    if (hitObjects.length > 1 && hitObjects[0] !== _this._createParams.objectFrom && hitObjects[0].entityType !== 'Arrow') {
	                        _this._createParams.objectTo = hitObjects[0];
	                    }
	                    else {
	                        _this._createParams.objectTo = null;
	                        _this._createParams.positionToX = ev.x;
	                        _this._createParams.positionToY = ev.y;
	                    }
	                }
	            }
	        });
	        this.on(catk.EvtMouseUp.type, function (ev) {
	            _this._moving = false;
	            var x = 0, y = 0;
	            if (_this._createParams.objectFrom && _this._createParams.objectTo) {
	                _this._createParams.objectFrom = _this._createParams.objectFrom.entityName;
	                _this._createParams.objectTo = _this._createParams.objectTo.entityName;
	            }
	            else if (_this._createParams.objectFrom) {
	                _this._createParams.objectFrom = _this._createParams.objectFrom.entityName;
	                x = _this._createParams.positionToX;
	                y = _this._createParams.positionToY;
	                _this._createParams.positionToX = 0;
	                _this._createParams.positionToY = 0;
	            }
	            else if (_this._createParams.objectTo) {
	                _this._createParams.objectTo = _this._createParams.objectTo.entityName;
	                x = _this._createParams.positionFromX;
	                y = _this._createParams.positionFromY;
	                _this._createParams.positionFromX = 0;
	                _this._createParams.positionFromY = 0;
	            }
	            else {
	                x = _this._createParams.positionFromX;
	                y = _this._createParams.positionFromY;
	                _this._createParams.positionToX -= x;
	                _this._createParams.positionToY -= y;
	                _this._createParams.positionFromX = 0;
	                _this._createParams.positionFromY = 0;
	            }
	            /*
	            lib.App.triggerEvent (null, new wb.WBCommandEvent('CreateObject', {
	                type: 'Arrow',
	                name: null,
	                x: x,
	                y: y,
	                params: this._createParams
	            }));
	            */
	            catk.App.triggerEvent(null, new whiteboard.WBMessageEvent(protolist.MsgType.whiteboard_CreateObjectMessage, {
	                type: 'Arrow',
	                x: x,
	                y: y,
	                paramsJson: JSON.stringify(_this._createParams)
	            }));
	        });
	        this.on(catk.EvtDraw.type, function (ev) {
	            if (_this._moving) {
	                ev.canvas.context.save();
	                ev.canvas.context.setTransform(1, 0, 0, 1, 0.5, 0.5);
	                ev.canvas.context.strokeStyle = '#000';
	                ev.canvas.context.lineWidth = 1;
	                ev.canvas.context.setLineDash([6, 3]);
	                ev.canvas.context.beginPath();
	                if (_this._createParams.objectFrom) {
	                    var t = _this._createParams.objectFrom.worldTransform;
	                    ev.canvas.context.moveTo(t.e, t.f);
	                }
	                else {
	                    ev.canvas.context.moveTo(_this._createParams.positionFromX, _this._createParams.positionFromY);
	                }
	                if (_this._createParams.objectTo) {
	                    var t = _this._createParams.objectTo.worldTransform;
	                    ev.canvas.context.lineTo(t.e, t.f);
	                }
	                else {
	                    ev.canvas.context.lineTo(_this._createParams.positionToX, _this._createParams.positionToY);
	                }
	                ev.canvas.context.stroke();
	                ev.canvas.context.restore();
	            }
	        });
	    };
	    WBConnectTool.prototype.deactivate = function () {
	        this.off(catk.EvtMouseDown.type);
	        this.off(catk.EvtMouseMove.type);
	        this.off(catk.EvtMouseUp.type);
	        _super.prototype.deactivate.call(this);
	    };
	    WBConnectTool.prototype.activateObject = function (object) {
	        _super.prototype.activateObject.call(this, object);
	    };
	    WBConnectTool.prototype.deactivateObject = function (object) {
	        _super.prototype.deactivateObject.call(this, object);
	    };
	    WBConnectTool.toolname = 'Connect';
	    return WBConnectTool;
	}(whiteboard.WBTool));
	exports.WBConnectTool = WBConnectTool;

	});

	unwrapExports(connect);
	var connect_1 = connect.WBConnectTool;

	var handwriting = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });

	var WBHandWritingTool = /** @class */ (function (_super) {
	    __extends(WBHandWritingTool, _super);
	    function WBHandWritingTool(whiteboard$$1) {
	        var _this = _super.call(this, WBHandWritingTool.toolname, whiteboard$$1) || this;
	        _this._freedrawNode = null;
	        _this._mode = 'draw';
	        _this._paramsDraw = {
	            color: '#000',
	            lineWidth: 2,
	        };
	        _this._paramsErase = {
	            eraseSize: 20
	        };
	        _this.on(whiteboard.WBGetPropertyEvent.type, function (ev) {
	            var params = null;
	            if (_this._mode === 'draw') {
	                params = _this._paramsDraw;
	            }
	            else if (_this._mode === 'erase') {
	                params = _this._paramsErase;
	            }
	            if (params && ev.name in params) {
	                ev.value = params[ev.name];
	            }
	        });
	        _this.on(whiteboard.WBSetPropertyEvent.type, function (ev) {
	            var params = null;
	            if (_this._mode === 'draw') {
	                params = _this._paramsDraw;
	            }
	            else if (_this._mode === 'erase') {
	                params = _this._paramsErase;
	            }
	            if (params && ev.name in params) {
	                params[ev.name] = ev.value;
	                _this.applyProperties(params);
	            }
	        });
	        _this.on(whiteboard.WBGetPropertyListEvent.type, function (ev) {
	            ev.properties = ev.properties || {};
	            if (_this._mode === 'draw') {
	                ev.properties[_this.name] = ev.properties[_this.name] || { desc: '画笔工具', properties: [] };
	                ev.properties[_this.name].properties.push({
	                    name: 'color',
	                    desc: '画笔颜色',
	                    readonly: false,
	                    type: 'color',
	                    value: _this._paramsDraw.color
	                });
	                ev.properties[_this.name].properties.push({
	                    name: 'lineWidth',
	                    desc: '画笔粗细',
	                    readonly: false,
	                    type: 'number',
	                    value: _this._paramsDraw.lineWidth
	                });
	            }
	            else if (_this._mode === 'erase') {
	                ev.properties[_this.name] = ev.properties[_this.name] || { desc: '橡皮工具', properties: [] };
	                ev.properties[_this.name].properties.push({
	                    name: 'eraseSize',
	                    desc: '橡皮大小',
	                    readonly: false,
	                    type: 'number',
	                    value: _this._paramsErase.eraseSize
	                });
	            }
	        });
	        return _this;
	    }
	    WBHandWritingTool.prototype.activate = function (options) {
	        if (options) {
	            this._mode = options.mode || 'draw';
	        }
	        this._freedrawNode = this.findFreedrawNode();
	        if (!this._freedrawNode) {
	            this._freedrawNode = this._wb.createEntity('FreeDraw', 0, 0, {});
	        }
	        else {
	            this._freedrawNode.reset();
	        }
	        this._freedrawNode.mode = this._mode;
	        this._freedrawNode.setCapture();
	        this.applyProperties(this._paramsDraw);
	        this.applyProperties(this._paramsErase);
	        _super.prototype.activate.call(this, options);
	    };
	    WBHandWritingTool.prototype.deactivate = function () {
	        if (this._freedrawNode) {
	            this._freedrawNode.releaseCapture();
	            this._freedrawNode.reset();
	            this._freedrawNode.mode = 'none';
	            this._freedrawNode = null;
	        }
	        _super.prototype.deactivate.call(this);
	    };
	    WBHandWritingTool.prototype.activateObject = function (object) {
	        _super.prototype.activateObject.call(this, object);
	    };
	    WBHandWritingTool.prototype.deactivateObject = function (object) {
	        _super.prototype.deactivateObject.call(this, object);
	    };
	    WBHandWritingTool.prototype.applyProperties = function (props) {
	        if (this._freedrawNode) {
	            props.lineWidth !== undefined && (this._freedrawNode.lineWidth = props.lineWidth);
	            props.color !== undefined && (this._freedrawNode.color = props.color);
	            props.eraseSize !== undefined && (this._freedrawNode.eraseSize = props.eraseSize);
	        }
	    };
	    WBHandWritingTool.prototype.findFreedrawNode = function () {
	        var node = this._wb.findEntityByType('FreeDraw');
	        return node ? node : null;
	    };
	    WBHandWritingTool.toolname = 'HandWriting';
	    return WBHandWritingTool;
	}(whiteboard.WBTool));
	exports.WBHandWritingTool = WBHandWritingTool;

	});

	unwrapExports(handwriting);
	var handwriting_1 = handwriting.WBHandWritingTool;

	var tool = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	function installTools(whiteboard) {
	    whiteboard.addTool(new select.WBSelectTool(whiteboard));
	    whiteboard.addTool(new swap.WBSwapTool(whiteboard));
	    whiteboard.addTool(new create.WBCreateTool(whiteboard));
	    whiteboard.addTool(new connect.WBConnectTool(whiteboard));
	    whiteboard.addTool(new handwriting.WBHandWritingTool(whiteboard));
	}
	exports.installTools = installTools;

	});

	unwrapExports(tool);
	var tool_1 = tool.installTools;

	var tools = createCommonjsModule(function (module, exports) {
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(select);
	__export(swap);
	__export(create);
	__export(connect);
	__export(handwriting);
	__export(tool);

	});

	unwrapExports(tools);

	var whiteboard$2 = createCommonjsModule(function (module, exports) {
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(editor$2);
	__export(objects);
	__export(tools);
	__export(whiteboard);

	});

	unwrapExports(whiteboard$2);

	var protoutils = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	function getUint32(array, offset) {
	    var result = array[offset] << 24;
	    result += array[offset + 1] << 16;
	    result += array[offset + 2] << 8;
	    result += array[offset + 3];
	    return result;
	}
	function setUint32(array, offset, num) {
	    array[offset] = (num >> 24) & 0xff;
	    array[offset + 1] = (num >> 16) & 0xff;
	    array[offset + 2] = (num >> 8) & 0xff;
	    array[offset + 3] = num & 0xff;
	}
	var Packet = /** @class */ (function () {
	    function Packet(buffer) {
	        this._buffer = buffer || null;
	    }
	    Packet.create = function (msgId, data) {
	        var packet = new Packet();
	        packet.encode(msgId, data);
	        return packet;
	    };
	    Object.defineProperty(Packet.prototype, "buffer", {
	        get: function () {
	            return this._buffer;
	            // return this._buffer ? this._buffer.buffer.slice (this._buffer.byteOffset, this._buffer.byteOffset + this._buffer.byteLength) : null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Packet.prototype.getMsgData = function () {
	        if ((!this._buffer) || this._buffer.byteLength < 8) {
	            return null;
	        }
	        var length = getUint32(this._buffer, 0);
	        if (this._buffer.byteLength < length + 4) {
	            return null;
	        }
	        var msgId = getUint32(this._buffer, 4);
	        var msgData = { type: msgId };
	        if (this._buffer.byteLength > 8) {
	            var cls = protolist.msgMap[msgId];
	            var content = cls.decode(this._buffer.subarray(8, length + 4));
	            if (content) {
	                msgData.data = cls.toObject(content);
	            }
	        }
	        return msgData;
	    };
	    Packet.prototype.encode = function (msgId, data) {
	        var cls = protolist.msgMap[msgId];
	        var tmpBuffer = cls.encode(cls.create(data)).finish();
	        this._buffer = new Uint8Array(4 + 4 + tmpBuffer.length);
	        setUint32(this._buffer, 0, tmpBuffer.length + 4);
	        setUint32(this._buffer, 4, msgId);
	        this._buffer.set(tmpBuffer, 8);
	    };
	    return Packet;
	}());
	exports.Packet = Packet;
	var MessageAssembler = /** @class */ (function () {
	    function MessageAssembler() {
	        this.BUFFER_INCR_SIZE = 1024;
	        this._buffer = new Uint8Array(this.BUFFER_INCR_SIZE);
	        this._offset = 0;
	        this._length = 0;
	        this._messages = [];
	    }
	    MessageAssembler.prototype.put = function (data) {
	        if (this._buffer.byteLength - this._offset - this._length >= data.byteLength) {
	            this._buffer.set(data, this._offset + this._length);
	        }
	        else if (this._buffer.byteLength - this._length >= data.byteLength) {
	            this._buffer.copyWithin(0, this._offset, this._offset + this._length);
	            this._offset = 0;
	            this._buffer.set(data, this._length);
	        }
	        else {
	            var len = this._buffer.byteLength;
	            while (len - this._length < data.byteLength) {
	                len += this.BUFFER_INCR_SIZE;
	            }
	            var newBuffer = new Uint8Array(len);
	            newBuffer.set(this._buffer.subarray(this._offset, this._offset + this._length), 0);
	            newBuffer.set(data, this._length);
	            this._buffer = newBuffer;
	            this._offset = 0;
	        }
	        this._length += data.byteLength;
	        while (true) {
	            var message = this._get();
	            if (!message) {
	                break;
	            }
	            this._messages.push(message);
	        }
	    };
	    MessageAssembler.prototype.getMessage = function () {
	        return this._messages.shift() || null;
	    };
	    MessageAssembler.prototype._get = function () {
	        if (this._length < 4) {
	            return null;
	        }
	        var packetLen = getUint32(this._buffer, this._offset);
	        if (!packetLen) {
	            return null;
	        }
	        packetLen += 4;
	        if (this._length < packetLen) {
	            return null;
	        }
	        var packetData = this._buffer.subarray(this._offset, this._offset + packetLen);
	        this._offset += packetLen;
	        this._length -= packetLen;
	        return new Packet(packetData).getMsgData();
	    };
	    return MessageAssembler;
	}());
	exports.MessageAssembler = MessageAssembler;

	});

	unwrapExports(protoutils);
	var protoutils_1 = protoutils.Packet;
	var protoutils_2 = protoutils.MessageAssembler;

	var cmdserver = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });





	var SocketStateEvent = /** @class */ (function (_super) {
	    __extends(SocketStateEvent, _super);
	    function SocketStateEvent(state) {
	        var _this = _super.call(this, SocketStateEvent.type) || this;
	        _this.state = state;
	        return _this;
	    }
	    SocketStateEvent.type = '@SocketState';
	    return SocketStateEvent;
	}(catk.BaseEvent));
	exports.SocketStateEvent = SocketStateEvent;
	var SocketCommandServer = /** @class */ (function (_super) {
	    __extends(SocketCommandServer, _super);
	    function SocketCommandServer(wb, uri) {
	        var _this = _super.call(this) || this;
	        _this._uri = uri;
	        _this._wb = wb;
	        _this._socket = null;
	        _this._assembler = new protoutils.MessageAssembler();
	        return _this;
	    }
	    Object.defineProperty(SocketCommandServer.prototype, "socket", {
	        get: function () {
	            return this._socket;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SocketCommandServer.prototype.start = function () {
	        var _this = this;
	        console.log("Trying connect to " + this._uri);
	        this._socket = socket(this._uri, {
	            transports: ['websocket'],
	            reconnection: false
	        });
	        this._socket.on('connect', function () {
	            _this.onConnect();
	        });
	        this._socket.on('message', function (data) {
	            var buf = data;
	            var u8arr = new Uint8Array(buf);
	            _this._assembler.put(u8arr);
	            while (true) {
	                var msg = _this._assembler.getMessage();
	                if (msg) {
	                    if (msg.type === protolist.MsgType.whiteboard_EventMessage) {
	                        var msgData = new protoutils.Packet(msg.data.message).getMsgData();
	                        if (msgData) {
	                            var ev = new whiteboard.WBMessageEvent(msgData.type, msgData.data, {}, msg.data.object);
	                            ev.broadcast = true;
	                            _this._wb.triggerEx(ev);
	                        }
	                    }
	                    else {
	                        var ev = new whiteboard.WBMessageEvent(msg.type, msg.data, {});
	                        ev.broadcast = true;
	                        _this._wb.triggerEx(ev);
	                    }
	                }
	                else {
	                    break;
	                }
	            }
	        });
	        this._socket.on('disconnect', function (reason) {
	            console.log("Disconnected: " + reason);
	            _this.onDisconnect();
	        });
	        this.on(whiteboard.WBMessageEvent.type, function (ev) {
	            if (_this._socket && _this._socket.connected) {
	                var data = {
	                    message: protoutils.Packet.create(ev.messageType, ev.messageData).buffer
	                };
	                if (ev.object) {
	                    data.object = ev.object;
	                }
	                var wrapPacket = protoutils.Packet.create(protolist.MsgType.whiteboard_EventMessage, data);
	                _this._socket.binary(true).emit('message', wrapPacket.buffer);
	            }
	        });
	        return true;
	    };
	    SocketCommandServer.prototype.stop = function () {
	        if (this._socket) {
	            this._socket.close();
	        }
	        return true;
	    };
	    SocketCommandServer.prototype.onConnect = function () {
	        catk.App.triggerEvent(null, new SocketStateEvent('connected'));
	    };
	    SocketCommandServer.prototype.onEvent = function (data) {
	        catk.App.triggerEvent(null, new SocketStateEvent('event'));
	    };
	    SocketCommandServer.prototype.onDisconnect = function () {
	        catk.App.triggerEvent(null, new SocketStateEvent('disconnected'));
	    };
	    return SocketCommandServer;
	}(catk.EventObserver));
	exports.SocketCommandServer = SocketCommandServer;

	});

	unwrapExports(cmdserver);
	var cmdserver_1 = cmdserver.SocketStateEvent;
	var cmdserver_2 = cmdserver.SocketCommandServer;

	var create_room = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	function init(uri) {
	    var WB = new whiteboard$2.WhiteBoard(document.querySelector('#playground-canvas'), true);
	    var server = new cmdserver.SocketCommandServer(WB, uri);
	    server.start();
	    whiteboard$2.installTools(WB);
	    whiteboard$2.installFactories(WB);
	    var toolToolboxDiv = document.querySelector('#tool-toolbox');
	    var objPropGridDiv = document.querySelector('#object-propgrid');
	    var toolPropGridDiv = document.querySelector('#tool-propgrid');
	    var editor = new whiteboard$2.WBEditor(WB, toolToolboxDiv, objPropGridDiv, toolPropGridDiv);
	    WB.on(cmdserver.SocketStateEvent.type, function (ev) {
	        jquery('#net-state').html(ev.state);
	    });
	    WB.on(whiteboard$2.WBObjectSelectedEvent.type, function (ev) {
	        if (ev.object) {
	            editor.objectPropertyGrid.loadObjectProperties(ev.object);
	        }
	    });
	    WB.on(whiteboard$2.WBObjectDeselectedEvent.type, function (ev) {
	        if (ev.object) {
	            editor.objectPropertyGrid.loadObjectProperties(ev.object);
	        }
	    });
	    WB.on(whiteboard$2.WBToolActivateEvent.type, function (ev) {
	        editor.toolPropertyGrid.loadToolProperties(ev.tool);
	    });
	    WB.on(whiteboard$2.WBToolDeactivateEvent.type, function (ev) {
	        editor.toolPropertyGrid.clear();
	    });
	    catk.App.run();
	}
	exports.init = init;

	});

	var create_room$1 = unwrapExports(create_room);
	var create_room_1 = create_room.init;

	exports.default = create_room$1;
	exports.init = create_room_1;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
