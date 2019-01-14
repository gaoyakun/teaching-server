(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.create_whiteboard = {})));
}(this, (function (exports) { 'use strict';

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
	var EvtSceneViewPageWillChange = /** @class */ (function (_super) {
	    __extends(EvtSceneViewPageWillChange, _super);
	    function EvtSceneViewPageWillChange(view, oldPage, newPage) {
	        var _this = _super.call(this, EvtSceneViewPageWillChange.type) || this;
	        _this.view = view;
	        _this.oldPage = oldPage;
	        _this.newPage = newPage;
	        return _this;
	    }
	    EvtSceneViewPageWillChange.type = '@scenviewpagewillchange';
	    return EvtSceneViewPageWillChange;
	}(BaseEvent));
	exports.EvtSceneViewPageWillChange = EvtSceneViewPageWillChange;
	var EvtSceneViewPageChanged = /** @class */ (function (_super) {
	    __extends(EvtSceneViewPageChanged, _super);
	    function EvtSceneViewPageChanged(view, oldPage, newPage) {
	        var _this = _super.call(this, EvtSceneViewPageChanged.type) || this;
	        _this.view = view;
	        _this.oldPage = oldPage;
	        _this.newPage = newPage;
	        return _this;
	    }
	    EvtSceneViewPageChanged.type = '@sceneviewpagechanged';
	    return EvtSceneViewPageChanged;
	}(BaseEvent));
	exports.EvtSceneViewPageChanged = EvtSceneViewPageChanged;
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
	        _this._currentPage = null;
	        _this._pages = {};
	        var rootNode = new SceneObject();
	        rootNode.view = _this;
	        _this.addPage({
	            name: 'page1',
	            rootNode: rootNode,
	            bkImageUrl: null,
	            bkImageRepeat: null,
	            bkImageSize: null,
	            bkImageAttachment: null,
	            bkColor: '#ffffff'
	        });
	        _this.selectPage('page1');
	        _this.on(EvtFrame.type, function (ev) {
	            var updateEvent = new EvtUpdate(ev.deltaTime, ev.elapsedTime, ev.frameStamp);
	            if (_this.rootNode) {
	                _this.rootNode.triggerRecursiveEx(updateEvent);
	            }
	            _this.canvas.clear();
	            _this.triggerEx(new EvtDraw(_this.canvas, 0, new transform.Matrix2d()));
	            _this.canvas.flip();
	        });
	        _this.on(EvtDraw.type, function (ev) {
	            if (_this.rootNode) {
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
	            }
	        });
	        return _this;
	    }
	    SceneView.prototype.forEachPage = function (callback) {
	        if (callback) {
	            for (var name_1 in this._pages) {
	                callback({
	                    name: name_1,
	                    rootNode: this._pages[name_1].rootNode,
	                    bkImageUrl: this._pages[name_1].bkImageUrl,
	                    bkImageRepeat: this._pages[name_1].bkImageRepeat,
	                    bkImageAttachment: this._pages[name_1].bkImageAttachment,
	                    bkImageSize: this._pages[name_1].bkImageSize,
	                    bkColor: this._pages[name_1].bkColor
	                });
	            }
	        }
	    };
	    SceneView.prototype.addPage = function (page) {
	        var defaultPage = {
	            name: null,
	            rootNode: null,
	            bkImageUrl: null,
	            bkImageRepeat: 'repeat',
	            bkImageAttachment: 'scroll',
	            bkImageSize: 'auto',
	            bkColor: '#ffffff'
	        };
	        var p = page || defaultPage;
	        var name = p.name || this.genPageName();
	        if (name in this._pages) {
	            return null;
	        }
	        this._pages[name] = {
	            name: name,
	            rootNode: p.rootNode,
	            bkImageUrl: p.bkImageUrl,
	            bkImageRepeat: p.bkImageRepeat || defaultPage.bkImageRepeat,
	            bkImageAttachment: p.bkImageAttachment || defaultPage.bkImageAttachment,
	            bkImageSize: p.bkImageSize || defaultPage.bkImageSize,
	            bkColor: p.bkColor || defaultPage.bkColor
	        };
	        return name;
	    };
	    SceneView.prototype.removePage = function (name) {
	        if (name in this._pages) {
	            if (name === this._currentPage) {
	                var b = false;
	                for (var n in this._pages) {
	                    if (n !== name) {
	                        this.selectPage(n);
	                        b = true;
	                    }
	                }
	                if (!b) {
	                    return false;
	                }
	            }
	            var rootNode = this._pages[name].rootNode;
	            if (rootNode) {
	                rootNode.unrefChildren();
	                rootNode.view = null;
	                this._pages[name].rootNode = null;
	            }
	            delete this._pages[name];
	            return true;
	        }
	        return false;
	    };
	    SceneView.prototype.selectPage = function (name) {
	        var oldName = this._currentPage;
	        if (name in this._pages && name !== oldName) {
	            App.triggerEvent(null, new EvtSceneViewPageWillChange(this, oldName, name));
	            this._currentPage = name;
	            this._captureObject = null;
	            this._hitObjects.length = 0;
	            this.applyPage(this._pages[this._currentPage]);
	            App.triggerEvent(null, new EvtSceneViewPageChanged(this, oldName, name));
	        }
	    };
	    SceneView.prototype.renamePage = function (oldName, newName) {
	        if (oldName in this._pages && newName && newName !== oldName && !(newName in this._pages)) {
	            var page = this._pages[oldName];
	            delete this._pages[oldName];
	            page.name = newName;
	            this._pages[newName] = page;
	            if (oldName === this._currentPage) {
	                this._currentPage = newName;
	            }
	        }
	    };
	    Object.defineProperty(SceneView.prototype, "currentPage", {
	        get: function () {
	            return this._currentPage;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SceneView.prototype, "pageImage", {
	        get: function () {
	            return this._currentPage ? this._pages[this._currentPage].bkImageUrl : null;
	        },
	        set: function (image) {
	            if (this._currentPage && image !== this._pages[this._currentPage].bkImageUrl) {
	                this._pages[this._currentPage].bkImageUrl = image;
	                this.applyPage(this._pages[this._currentPage]);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SceneView.prototype, "pageImageRepeat", {
	        get: function () {
	            return this._currentPage ? this._pages[this._currentPage].bkImageRepeat : null;
	        },
	        set: function (value) {
	            var repeat = value || 'repeat';
	            if (this._currentPage && repeat !== this._pages[this._currentPage].bkImageRepeat) {
	                this._pages[this._currentPage].bkImageRepeat = repeat;
	                this.applyPage(this._pages[this._currentPage]);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SceneView.prototype, "pageImageAttachment", {
	        get: function () {
	            return this._currentPage ? this._pages[this._currentPage].bkImageAttachment : null;
	        },
	        set: function (value) {
	            var attach = value || 'scroll';
	            if (this._currentPage && attach !== this._pages[this._currentPage].bkImageAttachment) {
	                this._pages[this._currentPage].bkImageAttachment = attach;
	                this.applyPage(this._pages[this._currentPage]);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SceneView.prototype, "pageImageSize", {
	        get: function () {
	            return this._currentPage ? this._pages[this._currentPage].bkImageSize : null;
	        },
	        set: function (value) {
	            var size = value || 'auto';
	            if (this._currentPage && size !== this._pages[this._currentPage].bkImageSize) {
	                this._pages[this._currentPage].bkImageSize = size;
	                this.applyPage(this._pages[this._currentPage]);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SceneView.prototype, "pageColor", {
	        get: function () {
	            return this._currentPage ? this._pages[this._currentPage].bkColor : null;
	        },
	        set: function (color) {
	            if (this._currentPage && color !== this._pages[this._currentPage].bkColor) {
	                this._pages[this._currentPage].bkColor = color;
	                this.applyPage(this._pages[this._currentPage]);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
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
	        if (this.rootNode) {
	            this._hitObjects.push(this.rootNode);
	        }
	    };
	    Object.defineProperty(SceneView.prototype, "rootNode", {
	        get: function () {
	            if (this._currentPage) {
	                var node = this._pages[this._currentPage].rootNode;
	                if (!node) {
	                    node = new SceneObject();
	                    node.view = this;
	                    this._pages[this._currentPage].rootNode = node;
	                }
	                return node;
	            }
	            else {
	                return null;
	            }
	        },
	        set: function (node) {
	            if (this._currentPage && this._pages[this._currentPage].rootNode !== node) {
	                this._pages[this._currentPage].rootNode = node;
	                this._hitObjects.length = 0;
	                this._captureObject = null;
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
	        if (this.rootNode) {
	            hitTest_r(this.rootNode, hitTestResult);
	            hitTestResult.sort(function (a, b) {
	                return b.z - a.z;
	            });
	        }
	        return hitTestResult;
	    };
	    SceneView.prototype.isValidObject = function (object) {
	        return object && object.view === this;
	    };
	    SceneView.prototype.genPageName = function () {
	        var n = 1;
	        while (true) {
	            var name_2 = "page" + n++;
	            if (!(name_2 in this._pages)) {
	                return name_2;
	            }
	        }
	    };
	    SceneView.prototype.applyPage = function (page) {
	        var color = page.bkColor || '';
	        var url = (page.bkImageUrl && "url(" + page.bkImageUrl + ")") || '';
	        var bkrepeat = page.bkImageRepeat || 'repeat';
	        var bkattach = page.bkImageAttachment || 'scroll';
	        var bkpos = '0% 0%';
	        var bksize = page.bkImageSize || 'auto';
	        this._canvas.canvas.style.background = color + " " + url + " " + bkrepeat + " " + bkattach + " " + bkpos + " / " + bksize;
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
	        _this._doubleBuffer = doubleBuffer;
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
	            var computedStyle = window.getComputedStyle(canvas.parentElement);
	            this._width = canvas.parentElement.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight);
	            this._height = canvas.parentElement.clientHeight - parseFloat(computedStyle.paddingTop) - parseFloat(computedStyle.paddingBottom);
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
	var core_35 = core.EvtSceneViewPageWillChange;
	var core_36 = core.EvtSceneViewPageChanged;
	var core_37 = core.EvtSysInfo;
	var core_38 = core.EventObserver;
	var core_39 = core.App;
	var core_40 = core.Component;
	var core_41 = core.BaseObject;
	var core_42 = core.SceneObject;
	var core_43 = core.SceneView;
	var core_44 = core.ResizeSensor;
	var core_45 = core.Canvas;

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
	                case 'entityName': {
	                    object.entityName = ev.value;
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
	                case 'entityName': {
	                    ev.value = object.entityName;
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
	                name: 'entityName',
	                desc: '名称',
	                readonly: false,
	                type: 'string',
	                value: _this.object ? _this.object.entityName : null
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
	var WBCommandEvent = /** @class */ (function (_super) {
	    __extends(WBCommandEvent, _super);
	    function WBCommandEvent(command, args, results, object) {
	        var _this = _super.call(this, WBCommandEvent.type) || this;
	        _this.command = command;
	        _this.args = args;
	        _this.results = results;
	        _this.object = object;
	        return _this;
	    }
	    WBCommandEvent.type = '@WBCommand';
	    return WBCommandEvent;
	}(catk.BaseEvent));
	exports.WBCommandEvent = WBCommandEvent;
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
	    WBTool.prototype.executeCommand = function (command, args) {
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
	        _this._currentTool = '';
	        _this._entities = {};
	        _this.on(WBGetObjectEvent.type, function (ev) {
	            ev.object = _this.findEntity(ev.name);
	        });
	        _this.on(catk.EvtSceneViewPageWillChange.type, function (ev) {
	            var tool = _this._tools[_this._currentTool];
	            if (tool) {
	                tool.deactivate();
	            }
	        });
	        _this.on(catk.EvtSceneViewPageChanged.type, function (ev) {
	            var tool = _this._tools[_this._currentTool];
	            if (tool) {
	                tool.activate();
	            }
	        });
	        _this.on(WBCommandEvent.type, function (ev) {
	            _this._executeCommand(ev.command, ev.args, ev.results, ev.object);
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
	    WhiteBoard.prototype.addFactory = function (factory) {
	        this._factories[factory.name] = factory;
	    };
	    WhiteBoard.prototype.getFactory = function (name) {
	        return this._factories[name] || null;
	    };
	    WhiteBoard.prototype.createEntity = function (type, name, failOnExists, x, y, options) {
	        var entity = null;
	        if (name === null) {
	            var id = 1;
	            while (true) {
	                name = "" + type.toLowerCase() + id++;
	                if (this.findEntity(name) === null) {
	                    break;
	                }
	            }
	        }
	        else {
	            entity = this.findEntity(name);
	            if (entity !== null) {
	                return failOnExists ? null : entity;
	            }
	        }
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
	    WhiteBoard.prototype.encodeCommand = function (cmd) {
	        return JSON.stringify(cmd);
	        /*
	        let str = command;
	        for (const name in cmd) {
	            if (name !== 'command') {
	                str += ` ${name}=${cmd[name]}`;
	            }
	        }
	        return str;
	        */
	    };
	    WhiteBoard.prototype._executeCommand = function (command, args, results, object) {
	        var _this = this;
	        var cmd = args || {};
	        if (object) {
	            var obj = this.findEntity(object);
	            if (obj) {
	                obj.triggerEx(new WBCommandEvent(command, args, results, object));
	            }
	        }
	        else if (command === 'UseTool') {
	            if (this._currentTool !== cmd.name) {
	                if (this._currentTool !== '') {
	                    var prevTool = this._tools[this._currentTool];
	                    prevTool.deactivate();
	                }
	                this._currentTool = '';
	                if (cmd.name) {
	                    var newTool = this._tools[cmd.name];
	                    if (newTool) {
	                        this._currentTool = cmd.name;
	                        newTool.activate(cmd.args || {});
	                    }
	                }
	            }
	        }
	        else if (command === 'CreateObject') {
	            var type = cmd.type;
	            var name_1 = cmd.name || null;
	            var failOnExists = !!cmd.failOnExists;
	            var params = cmd.params || {};
	            var obj = this.createEntity(type, name_1, failOnExists, cmd.x, cmd.y, params);
	            if (results) {
	                results.objectCreated = obj;
	            }
	        }
	        else if (command === 'DeleteObject') {
	            this.deleteEntity(cmd.name);
	        }
	        else if (command === 'DeleteObjects') {
	            if (cmd.objects) {
	                cmd.objects.forEach(function (name) {
	                    _this.deleteEntity(name);
	                });
	            }
	        }
	        else if (command === 'AlignObjectsLeft') {
	            if (cmd.objects && cmd.objects.length > 1) {
	                var objects = cmd.objects.map(function (name) { return _this.findEntity(name); });
	                var minx_1 = objects[0].worldTransform.e;
	                for (var i = 1; i < objects.length; i++) {
	                    var x = objects[i].worldTransform.e;
	                    if (x < minx_1) {
	                        minx_1 = x;
	                    }
	                }
	                objects.forEach(function (obj) {
	                    obj.worldTranslation = { x: minx_1, y: obj.worldTransform.f };
	                    obj.collapseTransform();
	                });
	            }
	        }
	        else if (command === 'AlignObjectsRight') {
	            if (cmd.objects && cmd.objects.length > 1) {
	                var objects = cmd.objects.map(function (name) { return _this.findEntity(name); });
	                var maxx_1 = objects[0].worldTransform.e;
	                for (var i = 1; i < objects.length; i++) {
	                    var x = objects[i].worldTransform.e;
	                    if (x > maxx_1) {
	                        maxx_1 = x;
	                    }
	                }
	                objects.forEach(function (obj) {
	                    obj.worldTranslation = { x: maxx_1, y: obj.worldTransform.f };
	                    obj.collapseTransform();
	                });
	            }
	        }
	        else if (command === 'AlignObjectsTop') {
	            if (cmd.objects && cmd.objects.length > 1) {
	                var objects = cmd.objects.map(function (name) { return _this.findEntity(name); });
	                var miny_1 = objects[0].worldTransform.f;
	                for (var i = 1; i < objects.length; i++) {
	                    var y = objects[i].worldTransform.f;
	                    if (y < miny_1) {
	                        miny_1 = y;
	                    }
	                }
	                objects.forEach(function (obj) {
	                    obj.worldTranslation = { x: obj.worldTransform.e, y: miny_1 };
	                    obj.collapseTransform();
	                });
	            }
	        }
	        else if (command === 'AlignObjectsBottom') {
	            if (cmd.objects && cmd.objects.length > 1) {
	                var objects = cmd.objects.map(function (name) { return _this.findEntity(name); });
	                var maxy_1 = objects[0].worldTransform.f;
	                for (var i = 1; i < objects.length; i++) {
	                    var y = objects[i].worldTransform.f;
	                    if (y > maxy_1) {
	                        maxy_1 = y;
	                    }
	                }
	                objects.forEach(function (obj) {
	                    obj.worldTranslation = { x: obj.worldTransform.e, y: maxy_1 };
	                    obj.collapseTransform();
	                });
	            }
	        }
	        else if (command === 'AlignObjectsHorizontal') {
	            if (cmd.objects && cmd.objects.length > 1) {
	                var firstObject = this.findEntity(cmd.objects[0]);
	                if (firstObject) {
	                    var y = firstObject.worldTransform.f;
	                    for (var i = 1; i < cmd.objects.length; i++) {
	                        var obj = this.findEntity(cmd.objects[i]);
	                        if (obj) {
	                            obj.worldTranslation = { x: obj.worldTransform.e, y: y };
	                            obj.collapseTransform();
	                        }
	                    }
	                }
	            }
	        }
	        else if (command === 'ArrangeObjectsHorizontal') {
	            if (cmd.objects && cmd.objects.length > 2) {
	                var objects = cmd.objects.map(function (name) { return _this.findEntity(name); });
	                objects.sort(function (a, b) {
	                    return a.worldTransform.e - b.worldTransform.e;
	                });
	                var posStart = objects[0].worldTransform.e;
	                var gap = (objects[objects.length - 1].worldTransform.e - posStart) / (objects.length - 1);
	                for (var i = 1; i < objects.length - 1; i++) {
	                    objects[i].worldTranslation = { x: posStart + i * gap, y: objects[i].worldTransform.f };
	                    objects[i].collapseTransform();
	                }
	            }
	        }
	        else if (command === 'ArrangeObjectsVertical') {
	            if (cmd.objects && cmd.objects.length > 2) {
	                var objects = cmd.objects.map(function (name) { return _this.findEntity(name); });
	                objects.sort(function (a, b) {
	                    return a.worldTransform.f - b.worldTransform.f;
	                });
	                var posStart = objects[0].worldTransform.f;
	                var gap = (objects[objects.length - 1].worldTransform.f - posStart) / (objects.length - 1);
	                for (var i = 1; i < objects.length - 1; i++) {
	                    objects[i].worldTranslation = { x: objects[i].worldTransform.e, y: posStart + i * gap };
	                    objects[i].collapseTransform();
	                }
	            }
	        }
	        else if (command === 'SetObjectProperty') {
	            var obj = this.findEntity(cmd.objectName);
	            if (obj) {
	                var ev = new WBSetPropertyEvent(cmd.propName, cmd.propValue);
	                obj.triggerEx(ev);
	                if (obj.entityName !== cmd.objectName) {
	                    if (this.findEntity(obj.entityName)) {
	                        obj.entityName = cmd.objectName;
	                    }
	                    else {
	                        delete this._entities[cmd.objectName];
	                        this._entities[obj.entityName] = obj;
	                    }
	                }
	            }
	        }
	        else if (command === 'AddPage') {
	            this.view && this.view.addPage();
	        }
	        else if (command === 'RenamePage') {
	            this.view && this.view.currentPage && this.view.renamePage(this.view.currentPage, cmd.newName);
	        }
	        else if (this._currentTool) {
	            this._tools[this._currentTool].executeCommand(command, cmd);
	        }
	        else {
	            return;
	        }
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
	var whiteboard_10 = whiteboard.WBCommandEvent;
	var whiteboard_11 = whiteboard.WBTool;
	var whiteboard_12 = whiteboard.WhiteBoard;

	var editor = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var WBToolPalette = /** @class */ (function () {
	    function WBToolPalette(editor, container) {
	        this._editor = editor;
	        this._container = container;
	        this._tools = [];
	        this._curTool = null;
	    }
	    WBToolPalette.prototype.unload = function () {
	        while (this._container.hasChildNodes()) {
	            this._container.removeChild(this._container.firstChild);
	        }
	        this._tools = [];
	    };
	    WBToolPalette.prototype.loadToolPalette = function (toolPalette) {
	        var _this = this;
	        var _loop_1 = function (toolname) {
	            var tooldef = this_1.getOpTool(toolPalette, toolname);
	            var toolButton = this_1.createToolButton(tooldef);
	            if (toolButton) {
	                toolButton.addEventListener('click', function () {
	                    var toolIndex = Number(toolButton.getAttribute('toolIndex'));
	                    var tool = _this._tools[toolIndex];
	                    if (tool !== _this._curTool) {
	                        if (_this._curTool) {
	                            var curToolButton = document.querySelector("#" + _this._curTool.elementId);
	                            curToolButton && curToolButton.classList.remove('active');
	                            _this._editor.executeCommand('UseTool');
	                            _this._curTool = null;
	                        }
	                    }
	                    if (tool) {
	                        var button = document.querySelector("#" + tool.elementId);
	                        button && button.classList.add('active');
	                        _this._editor.executeCommand(tool.command, tool.args);
	                        _this._curTool = tool;
	                    }
	                });
	            }
	        };
	        var this_1 = this;
	        for (var toolname in toolPalette) {
	            _loop_1(toolname);
	        }
	    };
	    WBToolPalette.prototype.loadOpPalette = function (opPalette) {
	        var _this = this;
	        var _loop_2 = function (op) {
	            var tooldef = this_2.getOpTool(opPalette, op);
	            var toolButton = this_2.createToolButton(tooldef);
	            if (toolButton) {
	                toolButton.addEventListener('click', function () {
	                    var toolIndex = Number(toolButton.getAttribute('toolIndex'));
	                    var tool = _this._tools[toolIndex];
	                    _this._editor.executeCommand(tool.command, tool.args);
	                });
	            }
	        };
	        var this_2 = this;
	        for (var op in opPalette) {
	            _loop_2(op);
	        }
	    };
	    WBToolPalette.prototype.getOpTool = function (tool, name) {
	        return {
	            command: tool[name].command,
	            args: tool[name].args,
	            iconClass: tool[name].iconClass
	        };
	    };
	    WBToolPalette.prototype.createToolButton = function (tooldef) {
	        this._tools.push(tooldef);
	        var buttonSize = this._editor.toolFontSize + 6;
	        var toolButton = null;
	        if (typeof tooldef.iconClass === 'function') {
	            toolButton = tooldef.iconClass(this._editor);
	            toolButton && toolButton.classList.add('toolbutton');
	        }
	        else {
	            toolButton = document.createElement('div');
	            toolButton.classList.add('flex-h', 'flex-align-x-center', 'flex-align-y-center');
	            toolButton.classList.add('toolbutton');
	            var toolIcon_1 = document.createElement('i');
	            toolIcon_1.style.fontSize = this._editor.toolFontSize + "px";
	            toolIcon_1.style.color = '#fff';
	            tooldef.iconClass.split(' ').forEach(function (cls) {
	                toolIcon_1.classList.add(cls);
	            });
	            toolButton.appendChild(toolIcon_1);
	        }
	        if (toolButton) {
	            tooldef.elementId = "toolbutton-" + WBToolPalette.uniqueId++;
	            toolButton.setAttribute('id', tooldef.elementId);
	            toolButton.style.width = buttonSize + "px";
	            toolButton.style.height = buttonSize + "px";
	            toolButton.setAttribute('toolIndex', String(this._tools.length - 1));
	            this._container.appendChild(toolButton);
	        }
	        return toolButton;
	    };
	    WBToolPalette.uniqueId = 1;
	    return WBToolPalette;
	}());
	exports.WBToolPalette = WBToolPalette;
	var WBPropertyGrid = /** @class */ (function () {
	    function WBPropertyGrid(editor, container, id) {
	        this._editor = editor;
	        this._container = container;
	        this._tableId = id;
	        this._object = null;
	        var table = document.createElement('table');
	        table.style.border = 'solid 1px #95B8E7';
	        table.style.borderSpacing = '0px';
	        table.style.margin = '0px';
	        table.style.fontSize = '12px';
	        table.style.fontFamily = 'verdana';
	        table.style.width = '100%';
	        table.style.tableLayout = 'fixed';
	        table.style.backgroundColor = '#fff';
	        table.setAttribute('id', this._tableId);
	        var tbody = document.createElement('tbody');
	        table.appendChild(tbody);
	        this._container.appendChild(table);
	    }
	    WBPropertyGrid.prototype.addGroup = function (name) {
	        var tr = this.createRow();
	        tr.style.backgroundColor = '#E0ECFF';
	        tr.style.fontWeight = 'bold';
	        this.createGroupCell(tr, name);
	    };
	    WBPropertyGrid.prototype.addButton = function (text, callback) {
	        var tr = this.createRow();
	        var td = this.createCell(tr);
	        td.style.padding = '5px';
	        td.style.textAlign = 'center';
	        td.setAttribute('colspan', '2');
	        var btn = document.createElement('button');
	        btn.innerText = text;
	        btn.style.width = '100%';
	        btn.style.padding = '5px';
	        btn.onclick = function () {
	            callback && callback();
	        };
	        td.appendChild(btn);
	    };
	    WBPropertyGrid.prototype.addTextAttribute = function (name, value, readonly, changeCallback, laterChange) {
	        var tr = this.createRow();
	        this.createPropCell(tr).innerText = name;
	        var input = document.createElement('input');
	        input.type = 'text';
	        if (value) {
	            input.value = value;
	        }
	        input.style.width = '100%';
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
	        this.createPropCell(tr).appendChild(input);
	    };
	    WBPropertyGrid.prototype.addToggleAttribute = function (name, value, readonly, changeCallback) {
	        var tr = this.createRow();
	        this.createPropCell(tr).innerText = name;
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
	        this.createPropCell(tr).appendChild(input);
	    };
	    WBPropertyGrid.prototype.addNumberAttribute = function (name, value, readonly, changeCallback) {
	        var tr = this.createRow();
	        this.createPropCell(tr).innerText = name;
	        var input = document.createElement('input');
	        input.type = 'number';
	        input.value = String(value);
	        input.readOnly = readonly;
	        input.disabled = readonly;
	        input.style.width = '100%';
	        input.style.boxSizing = 'border-box';
	        if (changeCallback) {
	            input.oninput = function () {
	                input.value = String(changeCallback(Number(input.value)));
	            };
	        }
	        this.createPropCell(tr).appendChild(input);
	    };
	    WBPropertyGrid.prototype.addChoiceAttribute = function (name, values, value, readonly, changeCallback) {
	        var tr = this.createRow();
	        this.createPropCell(tr).innerText = name;
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
	        input.style.width = '100%';
	        input.style.boxSizing = 'border-box';
	        if (changeCallback) {
	            input.onchange = function () {
	                input.value = String(changeCallback(input.value));
	            };
	        }
	        this.createPropCell(tr).appendChild(input);
	    };
	    WBPropertyGrid.prototype.addColorAttribute = function (name, value, readonly, changeCallback) {
	        var tr = this.createRow();
	        this.createPropCell(tr).innerText = name;
	        var input = document.createElement('input');
	        input.type = 'color';
	        input.value = value;
	        input.readOnly = readonly;
	        input.disabled = readonly;
	        input.style.width = '100%';
	        input.style.boxSizing = 'border-box';
	        if (changeCallback) {
	            input.onchange = function () {
	                input.value = String(changeCallback(input.value));
	            };
	        }
	        this.createPropCell(tr).appendChild(input);
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
	            this._editor.executeCommand('SetObjectProperty', {
	                objectName: this._object.entityName,
	                propName: name,
	                propValue: value
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
	        var inputs = document.querySelectorAll("table#" + this._tableId + " input");
	        for (var i = 0; i < inputs.length; i++) {
	            inputs[i].onchange = null;
	        }
	        var selects = document.querySelectorAll("table#" + this._tableId + " select");
	        for (var i = 0; i < selects.length; i++) {
	            selects[i].onchange = null;
	        }
	        var tbody = document.querySelector("table#" + this._tableId + " tbody");
	        while (tbody && tbody.hasChildNodes()) {
	            tbody.removeChild(tbody.firstChild);
	        }
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
	    WBPropertyGrid.prototype.loadPageProperties = function () {
	        var _this = this;
	        this.clear();
	        var pageList = [];
	        var view = this._editor.whiteboard.view;
	        if (view) {
	            view.forEachPage(function (page) {
	                pageList.push({
	                    value: page.name,
	                    desc: page.name
	                });
	            });
	            this.addChoiceAttribute('页面列表', pageList, view.currentPage, false, function (value) {
	                view.selectPage(value);
	                _this.loadPageProperties();
	                return view.currentPage;
	            });
	            this.addTextAttribute('页面名称', view.currentPage, false, function (value) {
	                if (value !== view.currentPage) {
	                    _this._editor.executeCommand('RenamePage', {
	                        newName: value
	                    });
	                    _this.loadPageProperties();
	                    return view.currentPage;
	                }
	            }, true);
	            this.addTextAttribute('页面背景图像', view.pageImage, false, function (value) {
	                view.pageImage = (value === '') ? null : value;
	                return value;
	            }, true);
	            this.addChoiceAttribute('页面背景重复', [{
	                    value: 'repeat',
	                    desc: '重复'
	                }, {
	                    value: 'repeat-x',
	                    desc: '横向重复'
	                }, {
	                    value: 'repeat-y',
	                    desc: '纵向重复'
	                }, {
	                    value: 'no-repeat',
	                    desc: '不重复'
	                }], view.pageImageRepeat, false, function (value) {
	                view.pageImageRepeat = value;
	                return value;
	            });
	            this.addToggleAttribute('页面背景固定', view.pageImageAttachment === 'fixed', false, function (value) {
	                view.pageImageAttachment = value ? 'fixed' : 'scroll';
	                return value;
	            });
	            this.addTextAttribute('页面背景大小', view.pageImageSize, false, function (value) {
	                view.pageImageSize = value;
	                return value;
	            });
	            this.addColorAttribute('页面背景颜色', view.pageColor || '', false, function (value) {
	                view.pageColor = (value === '') ? null : value;
	                return value;
	            });
	            this.addButton('新建页面', function () {
	                _this._editor.executeCommand('AddPage');
	                _this.loadPageProperties();
	            });
	            this.addButton('删除页面', function () {
	                _this._editor.executeCommand('DeletePage');
	                _this.loadPageProperties();
	            });
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
	    function WBEditor(WB, toolset, toolPaletteElement, opPaletteElement, objectPropGridElement, toolPropGridElement) {
	        this._strokeColor = '#00000000';
	        this._fillColor = 'red';
	        this._toolFontSize = 14;
	        this._wb = WB;
	        this._toolset = toolset;
	        this._toolPalette = new WBToolPalette(this, toolPaletteElement);
	        this._toolPalette.loadToolPalette(toolset.tools);
	        this._opPalette = new WBToolPalette(this, opPaletteElement);
	        this._opPalette.loadOpPalette(toolset.operations);
	        this._objectPropGrid = new WBPropertyGrid(this, objectPropGridElement, 'wb-object');
	        this._toolPropGrid = new WBPropertyGrid(this, toolPropGridElement, 'wb-tool');
	        this._objectPropGrid.loadPageProperties();
	    }
	    Object.defineProperty(WBEditor.prototype, "whiteboard", {
	        get: function () {
	            return this._wb;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WBEditor.prototype, "toolSet", {
	        get: function () {
	            return this._toolset;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WBEditor.prototype, "opPalette", {
	        get: function () {
	            return this._opPalette;
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
	    WBEditor.prototype.executeCommand = function (command, args) {
	        catk.App.triggerEvent(null, new whiteboard.WBCommandEvent(command, args));
	    };
	    return WBEditor;
	}());
	exports.WBEditor = WBEditor;

	});

	unwrapExports(editor);
	var editor_1 = editor.WBToolPalette;
	var editor_2 = editor.WBPropertyGrid;
	var editor_3 = editor.WBEditor;

	var toolset = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WBDefaultToolSet = {
	    tools: {
	        CreateLabel: {
	            iconClass: 'fas fa-font fa-fw',
	            command: 'UseTool',
	            args: {
	                name: 'Create',
	                args: {
	                    createType: 'Label',
	                    text: '标签',
	                    textColor: '#000000'
	                }
	            }
	        },
	        Select: {
	            iconClass: 'fas fa-mouse-pointer fa-fw',
	            command: 'UseTool',
	            args: {
	                name: 'Select'
	            }
	        },
	        Swap: {
	            iconClass: 'fas fa-exchange-alt fa-fw',
	            command: 'UseTool',
	            args: {
	                name: 'Swap'
	            }
	        },
	        Connect: {
	            iconClass: 'fas fa-arrow-right fa-fw',
	            command: 'UseTool',
	            args: {
	                name: 'Connect'
	            }
	        },
	        Write: {
	            iconClass: 'fas fa-pen fa-fw',
	            command: 'UseTool',
	            args: {
	                name: 'HandWriting',
	                args: {
	                    mode: 'draw'
	                }
	            }
	        },
	        Erase: {
	            iconClass: 'fas fa-eraser fa-fw',
	            command: 'UseTool',
	            args: {
	                name: 'HandWriting',
	                args: {
	                    mode: 'erase'
	                }
	            }
	        }
	    },
	    operations: {
	        Delete: {
	            iconClass: 'fas fa-trash-alt fa-fw',
	            command: 'DeleteSelected'
	        },
	        Clone: {
	            iconClass: 'fas fa-clone fa-fw',
	            command: 'CloneSelected'
	        },
	        AlignLeft: {
	            iconClass: 'fas fa-align-left fa-fw',
	            command: 'AlignSelected',
	            args: {
	                mode: 'Left'
	            }
	        },
	        AlignRight: {
	            iconClass: 'fas fa-align-right fa-fw',
	            command: 'AlignSelected',
	            args: {
	                mode: 'Right'
	            }
	        },
	        AlignTop: {
	            iconClass: 'fas fa-align-right fa-rotate-270 fa-fw',
	            command: 'AlignSelected',
	            args: {
	                mode: 'Top'
	            }
	        },
	        AlignBottom: {
	            iconClass: 'fas fa-align-right fa-rotate-90 fa-fw',
	            command: 'AlignSelected',
	            args: {
	                mode: 'Bottom'
	            }
	        },
	        ArrangeH: {
	            iconClass: 'fas fa-arrows-alt-h fa-fw',
	            command: 'ArrangeSelected',
	            args: {
	                mode: 'Horizontal'
	            }
	        },
	        ArrangeV: {
	            iconClass: 'fas fa-arrows-alt-v fa-fw',
	            command: 'ArrangeSelected',
	            args: {
	                mode: 'Vertical'
	            }
	        },
	    }
	};

	});

	unwrapExports(toolset);
	var toolset_1 = toolset.WBDefaultToolSet;

	var editor$2 = createCommonjsModule(function (module, exports) {
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(toolbox);
	__export(editor);
	__export(toolset);

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
	        if (this.view && this._measure === null) {
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
	Object.defineProperty(exports, "__esModule", { value: true });


	var WBFreeDraw = /** @class */ (function (_super) {
	    __extends(WBFreeDraw, _super);
	    function WBFreeDraw(parent, params) {
	        if (params === void 0) { params = null; }
	        var _this = _super.call(this, parent || undefined) || this;
	        _this._canvas = null;
	        _this._boundingShape = null;
	        _this._cp = [];
	        _this._lastMoveTime = 0;
	        _this._action = false;
	        var opt = params || {};
	        _this._lineWidth = Number(opt.lineWidth || 1);
	        _this._color = opt.color || '#000000';
	        _this._mode = opt.mode || 'draw';
	        _this._mousePosX = 0;
	        _this._mousePosY = 0;
	        _this._eraseSize = opt.eraseSize || 20;
	        _this._curveMode = opt.curveMode || 0;
	        _this.on(catk.EvtCanvasResize.type, function (evt) {
	            if (evt.view === _this.view && _this._canvas) {
	                _this._canvas.width = evt.view.canvas.width;
	                _this._canvas.height = evt.view.canvas.height;
	                if (_this._boundingShape) {
	                    _this._boundingShape.rect = { x: 0, y: 0, w: _this._canvas.width, h: _this._canvas.height };
	                }
	            }
	        });
	        _this.on(catk.EvtGetBoundingShape.type, function (evt) {
	            if (_this._boundingShape === null && _this.canvas) {
	                _this._boundingShape = new catk.BoundingBox({ x: 0, y: 0, w: _this.canvas.width, h: _this.canvas.height });
	            }
	            if (_this._boundingShape) {
	                evt.shape = _this._boundingShape;
	            }
	        });
	        _this.on(catk.EvtHitTest.type, function (evt) {
	            var canvas = _this.canvas;
	            if (canvas && evt.x >= 0 && evt.x < canvas.width && evt.y >= 0 && evt.y < canvas.height) {
	                var ctx = canvas.getContext('2d');
	                if (ctx) {
	                    var data = ctx.getImageData(evt.x, evt.y, 1, 1);
	                    if (data && data.data[3] > 0) {
	                        evt.result = true;
	                    }
	                }
	            }
	            evt.eat();
	        });
	        _this.on(catk.EvtDraw.type, function (evt) {
	            if (_this.canvas) {
	                var w = _this.canvas.width;
	                var h = _this.canvas.height;
	                evt.canvas.context.drawImage(_this.canvas, -Math.round(w * _this.anchorPoint.x) - 0.5, -Math.round(h * _this.anchorPoint.y) - 0.5, w, h);
	                if (_this._mode === 'erase') {
	                    evt.canvas.context.strokeStyle = '#000000';
	                    evt.canvas.context.strokeRect(Math.round(_this._mousePosX - _this._eraseSize / 2), Math.round(_this._mousePosY - _this._eraseSize / 2), _this._eraseSize, _this._eraseSize);
	                }
	            }
	        });
	        _this.on(whiteboard.WBCommandEvent.type, function (ev) {
	            if (_this.canvas) {
	                var context = _this.canvas.getContext('2d');
	                if (context) {
	                    if (ev.command === 'StartDraw') {
	                        context.lineWidth = _this._lineWidth;
	                        context.strokeStyle = _this._color;
	                        context.lineCap = 'round';
	                        context.lineJoin = 'round';
	                        context.beginPath();
	                        context.moveTo(ev.args.x + 0.5, ev.args.y + 0.5);
	                    }
	                    else if (ev.command === 'Drawing') {
	                        if (ev.args.curveMode === 0) {
	                            context.lineTo(ev.args.x + 0.5, ev.args.y + 0.5);
	                            context.stroke();
	                        }
	                        else if (ev.args.curveMode === 1) {
	                            if (ev.args.cp.length === 1) {
	                                context.quadraticCurveTo(ev.args.cp[0].x + 0.5, ev.args.cp[0].y + 0.5, ev.args.x + 0.5, ev.args.y + 0.5);
	                                context.stroke();
	                            }
	                        }
	                        else if (ev.args.curveMode === 2) {
	                            if (ev.args.cp.length === 2) {
	                                context.bezierCurveTo(ev.args.cp[0].x + 0.5, ev.args.cp[0].y + 0.5, ev.args.cp[1].x + 0.5, ev.args.cp[1].y + 0.5, ev.args.x + 0.5, ev.args.y + 0.5);
	                                context.stroke();
	                            }
	                        }
	                    }
	                    else if (ev.command === 'EndDraw') {
	                        if (ev.args.cp.length > 0) {
	                            if (ev.args.cp.length === 1) {
	                                context.lineTo(ev.args.cp[0].x + 0.5, ev.args.cp[0].y + 0.5);
	                            }
	                            else if (ev.args.cp.length) {
	                                context.quadraticCurveTo(ev.args.cp[0].x + 0.5, ev.args.cp[0].y + 0.5, ev.args.cp[1].x + 0.5, ev.args.cp[1].y + 0.5);
	                            }
	                            context.stroke();
	                        }
	                    }
	                    else if (ev.command === 'Erase') {
	                        context.clearRect(ev.args.x - ev.args.size / 2, ev.args.y - ev.args.size / 2, ev.args.size, ev.args.size);
	                    }
	                }
	            }
	        });
	        _this.on(catk.EvtMouseDown.type, function (ev) {
	            var pt = catk.Matrix2d.invert(_this.worldTransform).transformPoint({ x: ev.x, y: ev.y });
	            if (_this.canvas) {
	                if (_this._mode === 'draw') {
	                    catk.App.triggerEvent(null, new whiteboard.WBCommandEvent('StartDraw', {
	                        x: pt.x,
	                        y: pt.y
	                    }, undefined, _this.entityName));
	                    _this._cp.length = 0;
	                    _this._action = true;
	                    /*
	                    const context = this.canvas.getContext('2d');
	                    if (context) {
	                        context.lineWidth = this._lineWidth;
	                        context.strokeStyle = this._color;
	                        context.lineCap = 'round';
	                        context.lineJoin = 'round';
	                        context.beginPath ();
	                        context.moveTo (pt.x + 0.5, pt.y + 0.5);
	                        this._cp.length = 0;
	                        this._action = true;
	                    }
	                    */
	                }
	                else if (_this._mode === 'erase') {
	                    catk.App.triggerEvent(null, new whiteboard.WBCommandEvent('Erase', {
	                        x: pt.x,
	                        y: pt.y,
	                        size: _this._eraseSize
	                    }, undefined, _this.entityName));
	                    _this._action = true;
	                    /*
	                    const context = this.canvas.getContext('2d');
	                    if (context) {
	                        context.clearRect (pt.x - this._eraseSize / 2, pt.y - this._eraseSize / 2, this._eraseSize, this._eraseSize);
	                        this._action = true;
	                    }
	                    */
	                }
	            }
	        });
	        _this.on(catk.EvtMouseMove.type, function (ev) {
	            _this._mousePosX = ev.x;
	            _this._mousePosY = ev.y;
	            if (_this._action && _this.canvas) {
	                var pt = catk.Matrix2d.invert(_this.worldTransform).transformPoint({ x: ev.x, y: ev.y });
	                if (_this._mode === 'draw') {
	                    catk.App.triggerEvent(null, new whiteboard.WBCommandEvent('Drawing', {
	                        curveMode: _this._curveMode,
	                        x: pt.x,
	                        y: pt.y,
	                        cp: _this._cp,
	                    }, undefined, _this.entityName));
	                    if (_this._curveMode === 1) {
	                        if (_this._cp.length === 1) {
	                            _this._cp.length = 0;
	                        }
	                        else {
	                            _this._cp.push({ x: pt.x, y: pt.y });
	                            _this._lastMoveTime = Date.now();
	                        }
	                    }
	                    else if (_this._curveMode === 2) {
	                        if (_this._cp.length === 2) {
	                            _this._cp.length = 0;
	                        }
	                        else {
	                            _this._cp.push({ x: pt.x, y: pt.y });
	                            _this._lastMoveTime = Date.now();
	                        }
	                    }
	                    /*
	                    const context = this.canvas.getContext('2d');
	                    if (context) {
	                        if (this._curveMode === 0) {
	                            context.lineTo (pt.x + 0.5, pt.y + 0.5);
	                            context.stroke ();
	                        } else if (this._curveMode === 1) {
	                            if (this._cp.length === 1) {
	                                context.quadraticCurveTo (this._cp[0].x + 0.5, this._cp[0].y + 0.5, pt.x + 0.5, pt.y + 0.5);
	                                context.stroke ();
	                                this._cp.length = 0;
	                            } else {
	                                this._cp.push ({x: pt.x, y: pt.y});
	                                this._lastMoveTime = Date.now();
	                            }
	                        } else if (this._curveMode === 2) {
	                            if (this._cp.length === 2) {
	                                context.bezierCurveTo (this._cp[0].x + 0.5, this._cp[0].y + 0.5, this._cp[1].x + 0.5, this._cp[1].y + 0.5, pt.x + 0.5, pt.y + 0.5);
	                                context.stroke ();
	                                this._cp.length = 0;
	                            } else {
	                                this._cp.push ({x: pt.x, y: pt.y});
	                                this._lastMoveTime = Date.now();
	                            }
	                        }
	                    }
	                    */
	                }
	                else if (_this._mode === 'erase') {
	                    catk.App.triggerEvent(null, new whiteboard.WBCommandEvent('Erase', {
	                        x: pt.x,
	                        y: pt.y,
	                        size: _this._eraseSize
	                    }, undefined, _this.entityName));
	                    /*
	                    const context = this.canvas.getContext('2d');
	                    context && context.clearRect (pt.x - this._eraseSize / 2, pt.y - this._eraseSize / 2, this._eraseSize, this._eraseSize);
	                    */
	                }
	            }
	        });
	        _this.on(catk.EvtFrame.type, function (ev) {
	            if (_this._mode === 'draw' && _this._action) {
	                var t = Date.now();
	                if (t > _this._lastMoveTime + 250) {
	                    _this.finishDraw();
	                }
	            }
	        });
	        _this.on(catk.EvtMouseUp.type, function (ev) {
	            if (_this._mode === 'draw' && _this._action) {
	                _this.finishDraw();
	            }
	            _this._action = false;
	        });
	        _this.on(whiteboard.WBGetPropertyEvent.type, function (ev) {
	            switch (ev.name) {
	                case 'lineWidth': {
	                    ev.value = _this._lineWidth;
	                    break;
	                }
	                case 'color': {
	                    ev.value = _this._color;
	                    break;
	                }
	                case 'curveMode': {
	                    ev.value = _this._curveMode;
	                    break;
	                }
	                case 'eraseSize': {
	                    ev.value = _this._eraseSize;
	                    break;
	                }
	                case 'mode': {
	                    ev.value = _this._mode;
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
	                case 'color': {
	                    _this._color = String(ev.value);
	                    break;
	                }
	                case 'curveMode': {
	                    _this._curveMode = Number(ev.value);
	                    break;
	                }
	                case 'eraseSize': {
	                    _this._eraseSize = Number(ev.value);
	                    break;
	                }
	                case 'mode': {
	                    _this._mode = String(ev.value);
	                    break;
	                }
	            }
	        });
	        _this.on(whiteboard.WBGetPropertyListEvent.type, function (ev) {
	            ev.properties = ev.properties || {};
	            ev.properties[_this.entityType] = ev.properties[_this.entityType] || { desc: _this.entityType, properties: [] };
	            ev.properties[_this.entityType].properties.push({
	                name: 'lineWidth',
	                desc: '画笔宽度',
	                readonly: false,
	                type: 'number',
	                value: _this._lineWidth
	            });
	            ev.properties[_this.entityType].properties.push({
	                name: 'color',
	                desc: '画笔颜色',
	                readonly: false,
	                type: 'color',
	                value: _this._color
	            });
	            ev.properties[_this.entityType].properties.push({
	                name: 'curveMode',
	                desc: '平滑模式',
	                readonly: false,
	                type: 'number',
	                value: _this._curveMode,
	                enum: [{
	                        value: 0,
	                        desc: '无'
	                    }, {
	                        value: 1,
	                        desc: '二次样条'
	                    }, {
	                        value: 2,
	                        desc: '三次样条'
	                    }]
	            });
	            ev.properties[_this.entityType].properties.push({
	                name: 'eraseSize',
	                desc: '橡皮宽度',
	                readonly: false,
	                type: 'number',
	                value: _this._eraseSize
	            });
	            ev.properties[_this.entityType].properties.push({
	                name: 'mode',
	                desc: '操作模式',
	                readonly: false,
	                type: 'string',
	                value: _this._mode,
	                enum: [{
	                        value: 'draw',
	                        desc: '绘制'
	                    }, {
	                        value: 'erase',
	                        desc: '擦除'
	                    }, {
	                        value: 'none',
	                        desc: '无'
	                    }]
	            });
	        });
	        return _this;
	    }
	    Object.defineProperty(WBFreeDraw.prototype, "mode", {
	        get: function () {
	            return this._mode;
	        },
	        set: function (value) {
	            if (this._mode !== value) {
	                if (this._mode === 'draw') {
	                    this.finishDraw();
	                }
	                this._action = false;
	                this._mode = value;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WBFreeDraw.prototype, "canvas", {
	        get: function () {
	            if (this._canvas === null && this.view) {
	                this._canvas = document.createElement('canvas');
	                this._canvas.style.backgroundColor = '#00000000';
	                this._canvas.width = this.view.canvas.width;
	                this._canvas.height = this.view.canvas.height;
	                if (this._boundingShape) {
	                    this._boundingShape = new catk.BoundingBox({ x: 0, y: 0, w: this._canvas.width, h: this._canvas.height });
	                }
	            }
	            return this._canvas;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    WBFreeDraw.prototype.finishDraw = function () {
	        if (this.canvas && this._mode === 'draw' && this._cp.length > 0) {
	            catk.App.triggerEvent(null, new whiteboard.WBCommandEvent('EndDraw', {
	                cp: this._cp
	            }, undefined, this.entityName));
	            this._cp.length = 0;
	            /*
	            const context = this.canvas.getContext('2d');
	            if (context) {
	                if (this._cp.length === 1) {
	                    context.lineTo (this._cp[0].x + 0.5, this._cp[0].y + 0.5);
	                } else if (this._cp.length) {
	                    context.quadraticCurveTo (this._cp[0].x + 0.5, this._cp[0].y + 0.5, this._cp[1].x + 0.5, this._cp[1].y + 0.5);
	                }
	                context.stroke ();
	                this._cp.length = 0;
	            }
	            */
	        }
	    };
	    return WBFreeDraw;
	}(catk.SceneObject));
	exports.WBFreeDraw = WBFreeDraw;
	var WBFreeDrawFactory = /** @class */ (function (_super) {
	    __extends(WBFreeDrawFactory, _super);
	    function WBFreeDrawFactory() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    WBFreeDrawFactory.prototype.getCreationProperties = function () {
	        return [{
	                name: 'lineWidth',
	                desc: '画笔宽度',
	                readonly: false,
	                type: 'number',
	                value: 3
	            }, {
	                name: 'color',
	                desc: '颜色',
	                readonly: false,
	                type: 'color',
	                value: '#000000'
	            }, {
	                name: 'curveMode',
	                desc: '平滑模式',
	                readonly: false,
	                type: 'number',
	                value: 0,
	                enum: [{
	                        value: 0,
	                        desc: '无'
	                    }, {
	                        value: 1,
	                        desc: '二次样条'
	                    }, {
	                        value: 2,
	                        desc: '三次样条'
	                    }]
	            }, {
	                name: 'eraseSize',
	                desc: '橡皮宽度',
	                readonly: false,
	                type: 'number',
	                value: 20
	            }];
	    };
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

	var factory = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	function installFactories(wb) {
	    wb.addFactory(new label.WBLabelFactory('Label'));
	    wb.addFactory(new arrow.WBArrowFactory('Arrow'));
	    wb.addFactory(new freedraw.WBFreeDrawFactory('FreeDraw'));
	}
	exports.installFactories = installFactories;

	});

	unwrapExports(factory);
	var factory_1 = factory.installFactories;

	var objects = createCommonjsModule(function (module, exports) {
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(label);
	__export(arrow);
	__export(freedraw);
	__export(factory);

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
	    function WBSelectEvent(selectIndex) {
	        var _this = _super.call(this, WBSelectEvent.type) || this;
	        _this.selectIndex = selectIndex;
	        return _this;
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
	    function WBObjectSelectedEvent(objects) {
	        var _this = _super.call(this, WBObjectSelectedEvent.type) || this;
	        _this.objects = objects;
	        return _this;
	    }
	    WBObjectSelectedEvent.type = '@WBObjectSelected';
	    return WBObjectSelectedEvent;
	}(catk.BaseEvent));
	exports.WBObjectSelectedEvent = WBObjectSelectedEvent;
	var WBObjectMovedEvent = /** @class */ (function (_super) {
	    __extends(WBObjectMovedEvent, _super);
	    function WBObjectMovedEvent(objects) {
	        var _this = _super.call(this, WBObjectMovedEvent.type) || this;
	        _this.objects = objects;
	        return _this;
	    }
	    WBObjectMovedEvent.type = '@WBObjectMoved';
	    return WBObjectMovedEvent;
	}(catk.BaseEvent));
	exports.WBObjectMovedEvent = WBObjectMovedEvent;
	var WBObjectDeselectedEvent = /** @class */ (function (_super) {
	    __extends(WBObjectDeselectedEvent, _super);
	    function WBObjectDeselectedEvent(object, objects) {
	        var _this = _super.call(this, WBObjectDeselectedEvent.type) || this;
	        _this.object = object;
	        _this.objects = objects;
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
	                        evt.canvas.context.strokeStyle = '#000';
	                        evt.canvas.context.lineWidth = 1;
	                        evt.canvas.context.strokeRect(bbox.x, bbox.y, bbox.w, bbox.h);
	                    }
	                }
	            }
	        });
	        _this.on(WBSelectEvent.type, function (evt) {
	            _this._selected = true;
	        });
	        _this.on(WBDeselectEvent.type, function (evt) {
	            _this._selected = false;
	        });
	        return _this;
	    }
	    WBSelectComponent.type = 'WBSelect';
	    return WBSelectComponent;
	}(catk.Component));
	exports.WBSelectComponent = WBSelectComponent;
	var WBSelectTool = /** @class */ (function (_super) {
	    __extends(WBSelectTool, _super);
	    function WBSelectTool(whiteboard$$1) {
	        var _this = _super.call(this, WBSelectTool.toolname, whiteboard$$1) || this;
	        _this._selectedObjects = [];
	        _this._moving = false;
	        _this._rangeSelecting = false;
	        _this._mouseStartPosX = 0;
	        _this._mouseStartPosY = 0;
	        _this._mouseCurrentPosX = 0;
	        _this._mouseCurrentPosY = 0;
	        return _this;
	    }
	    Object.defineProperty(WBSelectTool.prototype, "selectedObjects", {
	        get: function () {
	            return this._selectedObjects;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    WBSelectTool.prototype.activate = function (options) {
	        var _this = this;
	        _super.prototype.activate.call(this, options);
	        this._selectedObjects.length = 0;
	        this.on(catk.EvtKeyDown.type, function (ev) {
	            if (_this._selectedObjects.length === 1) {
	                _this._selectedObjects[0].triggerEx(ev);
	            }
	        });
	        this.on(catk.EvtKeyUp.type, function (ev) {
	            if (_this._selectedObjects.length === 1) {
	                _this._selectedObjects[0].triggerEx(ev);
	            }
	        });
	        this.on(catk.EvtKeyPress.type, function (ev) {
	            if (_this._selectedObjects.length === 1) {
	                _this._selectedObjects[0].triggerEx(ev);
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
	                    _this._rangeSelecting = false;
	                }
	                else {
	                    _this.deselectAll();
	                    _this._rangeSelecting = true;
	                    _this._moving = false;
	                    _this._mouseCurrentPosX = ev.x;
	                    _this._mouseCurrentPosY = ev.y;
	                }
	            }
	        });
	        this.on(catk.EvtMouseMove.type, function (ev) {
	            if (_this._moving) {
	                var dx_1 = ev.x - _this._mouseStartPosX;
	                var dy_1 = ev.y - _this._mouseStartPosY;
	                _this._mouseStartPosX = ev.x;
	                _this._mouseStartPosY = ev.y;
	                _this._selectedObjects.forEach(function (obj) {
	                    var t = obj.translation;
	                    //obj.translation = { x: t.x + dx, y: t.y + dy };
	                    catk.App.triggerEvent(null, new whiteboard.WBCommandEvent('SetObjectProperty', {
	                        objectName: obj.entityName,
	                        propName: 'localx',
	                        propValue: t.x + dx_1
	                    }));
	                    catk.App.triggerEvent(null, new whiteboard.WBCommandEvent('SetObjectProperty', {
	                        objectName: obj.entityName,
	                        propName: 'localy',
	                        propValue: t.y + dy_1
	                    }));
	                });
	            }
	            else if (_this._rangeSelecting) {
	                var view = _this._wb.view;
	                if (view && view.rootNode) {
	                    _this.rangeSelectR(view.rootNode, _this._mouseStartPosX, _this._mouseStartPosY, ev.x - _this._mouseStartPosX, ev.y - _this._mouseStartPosY);
	                    _this._mouseCurrentPosX = ev.x;
	                    _this._mouseCurrentPosY = ev.y;
	                }
	            }
	        });
	        this.on(catk.EvtMouseUp.type, function (ev) {
	            if (_this._moving && _this._selectedObjects && _this._selectedObjects.length > 0) {
	                catk.App.triggerEvent(null, new WBObjectMovedEvent(_this._selectedObjects));
	            }
	            _this._moving = false;
	            _this._rangeSelecting = false;
	        });
	        this.on(catk.EvtDraw.type, function (ev) {
	            if (_this._rangeSelecting) {
	                ev.canvas.context.save();
	                ev.canvas.context.setTransform(1, 0, 0, 1, 0.5, 0.5);
	                ev.canvas.context.strokeStyle = '#000';
	                ev.canvas.context.lineWidth = 1;
	                ev.canvas.context.setLineDash([6, 3]);
	                ev.canvas.context.beginPath();
	                ev.canvas.context.moveTo(_this._mouseStartPosX, _this._mouseStartPosY);
	                ev.canvas.context.lineTo(_this._mouseCurrentPosX, _this._mouseStartPosY);
	                ev.canvas.context.lineTo(_this._mouseCurrentPosX, _this._mouseCurrentPosY);
	                ev.canvas.context.moveTo(_this._mouseStartPosX, _this._mouseStartPosY);
	                ev.canvas.context.lineTo(_this._mouseStartPosX, _this._mouseCurrentPosY);
	                ev.canvas.context.lineTo(_this._mouseCurrentPosX, _this._mouseCurrentPosY);
	                ev.canvas.context.stroke();
	                ev.canvas.context.restore();
	            }
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
	        _super.prototype.deactivate.call(this);
	    };
	    WBSelectTool.prototype.activateObject = function (object) {
	        this.deactivateObject(object);
	        object.addComponent(new WBSelectComponent(this));
	    };
	    WBSelectTool.prototype.deactivateObject = function (object) {
	        var components = object.getComponents(WBSelectComponent.type);
	        if (components && components.length > 0) {
	            this.deselectObject(object);
	            object.removeComponentsByType(WBSelectComponent.type);
	        }
	    };
	    WBSelectTool.prototype.executeCommand = function (command, args) {
	        if (command === 'GetSelected') {
	            args.selectedObjects = this._selectedObjects;
	        }
	        else if (command === 'DeleteSelected') {
	            if (this._selectedObjects.length > 0) {
	                catk.App.triggerEvent(null, new whiteboard.WBCommandEvent('DeleteObjects', {
	                    objects: this._selectedObjects.map(function (obj) { return obj.entityName; })
	                }));
	            }
	        }
	        else if (command === 'AlignSelected') {
	            var mode = args.mode;
	            if (this._selectedObjects.length > 0) {
	                catk.App.triggerEvent(null, new whiteboard.WBCommandEvent("AlignObjects" + mode, {
	                    objects: this._selectedObjects.map(function (obj) { return obj.entityName; })
	                }));
	            }
	        }
	        else if (command === 'ArrangeSelected') {
	            var mode = args.mode;
	            if (this._selectedObjects.length > 0) {
	                catk.App.triggerEvent(null, new whiteboard.WBCommandEvent("ArrangeObjects" + mode, {
	                    objects: this._selectedObjects.map(function (obj) { return obj.entityName; })
	                }));
	            }
	        }
	    };
	    WBSelectTool.prototype.selectObject = function (object, ev) {
	        if (this._selectedObjects.indexOf(object) < 0) {
	            var metaDown = ev ? catk.EvtSysInfo.isMac() ? ev.metaDown : ev.ctrlDown : true;
	            if (!metaDown) {
	                this.deselectAll();
	            }
	            this.selectedObjects.push(object);
	            object.triggerEx(new WBSelectEvent(this.selectedObjects.length));
	            catk.App.triggerEvent(null, new WBObjectSelectedEvent(this._selectedObjects));
	        }
	    };
	    WBSelectTool.prototype.deselectObject = function (object) {
	        var index = this._selectedObjects.indexOf(object);
	        if (index >= 0) {
	            object.triggerEx(new WBDeselectEvent());
	            this.selectedObjects.splice(index, 1);
	            catk.App.triggerEvent(null, new WBObjectDeselectedEvent(object, this._selectedObjects));
	        }
	    };
	    WBSelectTool.prototype.deselectAll = function () {
	        while (this.selectedObjects.length > 0) {
	            this.deselectObject(this.selectedObjects[this.selectedObjects.length - 1]);
	        }
	    };
	    WBSelectTool.prototype.rangeSelectR = function (root, x, y, w, h) {
	        var _this = this;
	        root.forEachChild(function (child) {
	            if (w === 0 || h === 0) {
	                _this.deselectObject(child);
	            }
	            else {
	                var shape = child.boundingShape;
	                if (shape) {
	                    var t = catk.Matrix2d.invert(child.worldTransform);
	                    var rectObject = [
	                        t.transformPoint({ x: x, y: y }),
	                        t.transformPoint({ x: x, y: y + h }),
	                        t.transformPoint({ x: x + w, y: y + h }),
	                        t.transformPoint({ x: x + w, y: y })
	                    ];
	                    if (catk.IntersectionTestShapeHull(shape, rectObject)) {
	                        _this.selectObject(child, null);
	                    }
	                    else {
	                        _this.deselectObject(child);
	                    }
	                }
	                _this.rangeSelectR(child, x, y, w, h);
	            }
	        });
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
	var select_4 = select.WBObjectMovedEvent;
	var select_5 = select.WBObjectDeselectedEvent;
	var select_6 = select.WBSelectComponent;
	var select_7 = select.WBSelectTool;

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
	            this.swapObject(this._curObject, object, 200);
	            this._curObject = null;
	        }
	        else {
	            this._curObject = null;
	        }
	    };
	    WBSwapTool.prototype.swapObject = function (object1, object2, animationDuration) {
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
	                    cp: [{ x: 0, y: [t2.x, t2.y] }, { x: animationDuration, y: [t1.x, t1.y] }],
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
	                    cp: [{ x: 0, y: [t1.x, t1.y] }, { x: animationDuration, y: [t2.x, t2.y] }],
	                    type: catk.SplineType.LINEAR
	                }
	            }
	        }));
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
	            var args = {
	                type: _this.options.createType,
	                name: null,
	            };
	            for (var arg in _this.options) {
	                if (arg !== 'command' && arg !== 'createType' && arg !== 'type') {
	                    args[arg] = _this.options[arg];
	                }
	            }
	            args.x = ev.x;
	            args.y = ev.y;
	            args.params = _this._creationParams[_this.options.createType];
	            catk.App.triggerEvent(null, new whiteboard.WBCommandEvent('CreateObject', args));
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
	        this.options = {};
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
	            catk.App.triggerEvent(null, new whiteboard.WBCommandEvent('CreateObject', {
	                type: 'Arrow',
	                name: null,
	                x: x,
	                y: y,
	                params: _this._createParams
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
	            curveMode: 0
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
	                _this.applyProperty(ev.name, ev.value);
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
	                ev.properties[_this.name].properties.push({
	                    name: 'curveMode',
	                    desc: '平滑模式',
	                    readonly: false,
	                    type: 'number',
	                    value: _this._paramsDraw.curveMode,
	                    enum: [{
	                            value: 0,
	                            desc: '无'
	                        }, {
	                            value: 1,
	                            desc: '二次样条'
	                        }, {
	                            value: 2,
	                            desc: '三次样条'
	                        }]
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
	            var args = {
	                type: 'FreeDraw',
	                name: null,
	                x: 0,
	                y: 0
	            };
	            var results = {};
	            catk.App.triggerEvent(null, new whiteboard.WBCommandEvent('CreateObject', args, results));
	            this._freedrawNode = results.objectCreated;
	        }
	        if (this._freedrawNode) {
	            catk.App.triggerEvent(null, new whiteboard.WBCommandEvent('SetObjectProperty', {
	                objectName: this._freedrawNode.entityName,
	                propName: 'mode',
	                propValue: this._mode
	            }));
	            // this._freedrawNode.mode = this._mode;
	            this._freedrawNode.setCapture();
	            this.applyProperties(this._paramsDraw);
	            this.applyProperties(this._paramsErase);
	            _super.prototype.activate.call(this, options);
	        }
	    };
	    WBHandWritingTool.prototype.deactivate = function () {
	        if (this._freedrawNode) {
	            this._freedrawNode.releaseCapture();
	            catk.App.triggerEvent(null, new whiteboard.WBCommandEvent('SetObjectProperty', {
	                objectName: this._freedrawNode.entityName,
	                propName: 'mode',
	                propValue: 'none'
	            }));
	            // this._freedrawNode.mode = 'none';
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
	    WBHandWritingTool.prototype.applyProperty = function (name, value) {
	        if (this._freedrawNode) {
	            catk.App.triggerEvent(null, new whiteboard.WBCommandEvent('SetObjectProperty', {
	                objectName: this._freedrawNode.entityName,
	                propName: name,
	                propValue: value
	            }));
	            // this._freedrawNode.triggerEx (new wb.WBSetPropertyEvent (name, value));
	        }
	    };
	    WBHandWritingTool.prototype.applyProperties = function (props) {
	        for (var prop in props) {
	            this.applyProperty(prop, props[prop]);
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

	var commands = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var WBCommandParser = /** @class */ (function () {
	    function WBCommandParser() {
	    }
	    WBCommandParser.parse = function (command) {
	        var s = WBCommandParser.trimLeft(command);
	        var result = { command: '' };
	        var lexData = {
	            str: s,
	            token: ''
	        };
	        WBCommandParser.lexical(lexData);
	        result.command = lexData.token;
	        while (true) {
	            WBCommandParser.lexical(lexData);
	            if (lexData.token === '') {
	                break;
	            }
	            var arr = lexData.token.split('=');
	            if (arr.length === 1) {
	                result[arr[0]] = true;
	            }
	            else {
	                var val = arr[1];
	                if (val.length > 1 && val.charAt(0) === '[' && val.charAt(val.length - 1) === ']') {
	                    val = val.substr(1, val.length - 2).split(',');
	                }
	                result[arr[0]] = val;
	            }
	        }
	        return result;
	    };
	    WBCommandParser.trimLeft = function (s) {
	        var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
	        var pos = 0;
	        while (pos < s.length && whitespace.indexOf(s.charAt(pos)) >= 0) {
	            pos++;
	        }
	        return s.substring(pos, s.length - pos);
	    };
	    WBCommandParser.trimRight = function (s) {
	        var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
	        var pos = s.length - 1;
	        while (pos >= 0 && whitespace.indexOf(s.charAt(pos)) >= 0) {
	            pos--;
	        }
	        return s.substring(0, pos + 1);
	    };
	    WBCommandParser.trim = function (s) {
	        return this.trimRight(this.trimLeft(s));
	    };
	    WBCommandParser.lexical = function (lexData) {
	        var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
	        var pos = 0;
	        while (pos < lexData.str.length && whitespace.indexOf(lexData.str.charAt(pos)) >= 0) {
	            pos++;
	        }
	        lexData.str = lexData.str.substr(pos, lexData.str.length - pos);
	        pos = 0;
	        while (pos < lexData.str.length && whitespace.indexOf(lexData.str.charAt(pos)) < 0) {
	            pos++;
	        }
	        lexData.token = lexData.str.substr(0, pos);
	        lexData.str = lexData.str.substr(pos, lexData.str.length - pos);
	    };
	    return WBCommandParser;
	}());
	exports.WBCommandParser = WBCommandParser;

	});

	unwrapExports(commands);
	var commands_1 = commands.WBCommandParser;

	var whiteboard$2 = createCommonjsModule(function (module, exports) {
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(editor$2);
	__export(objects);
	__export(tools);
	__export(commands);
	__export(whiteboard);

	});

	unwrapExports(whiteboard$2);

	var create_whiteboard = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	function init() {
	    var WB = new whiteboard$2.WhiteBoard(document.querySelector('#playground-canvas'), true);
	    whiteboard$2.installTools(WB);
	    whiteboard$2.installFactories(WB);
	    var toolToolboxDiv = document.querySelector('#tool-toolbox');
	    var opToolboxDiv = document.querySelector('#op-toolbox');
	    var objPropGridDiv = document.querySelector('#object-propgrid');
	    var toolPropGridDiv = document.querySelector('#tool-propgrid');
	    var editor = new whiteboard$2.WBEditor(WB, whiteboard$2.WBDefaultToolSet, toolToolboxDiv, opToolboxDiv, objPropGridDiv, toolPropGridDiv);
	    WB.on(whiteboard$2.WBObjectSelectedEvent.type, function (ev) {
	        if (ev.objects.length === 1) {
	            editor.objectPropertyGrid.loadObjectProperties(ev.objects[0]);
	        }
	        else {
	            editor.objectPropertyGrid.loadPageProperties();
	        }
	    });
	    WB.on(whiteboard$2.WBObjectDeselectedEvent.type, function (ev) {
	        if (ev.objects.length === 1) {
	            editor.objectPropertyGrid.loadObjectProperties(ev.objects[0]);
	        }
	        else {
	            editor.objectPropertyGrid.loadPageProperties();
	        }
	    });
	    WB.on(whiteboard$2.WBObjectMovedEvent.type, function (ev) {
	        editor.objectPropertyGrid.reloadObjectProperties();
	    });
	    WB.on(whiteboard$2.WBToolActivateEvent.type, function (ev) {
	        editor.toolPropertyGrid.loadToolProperties(ev.tool);
	        if (ev.tool.name === whiteboard$2.WBSelectTool.toolname) {
	            editor.objectPropertyGrid.loadPageProperties();
	        }
	    });
	    WB.on(whiteboard$2.WBToolDeactivateEvent.type, function (ev) {
	        editor.toolPropertyGrid.clear();
	        if (ev.tool.name === whiteboard$2.WBSelectTool.toolname) {
	            editor.objectPropertyGrid.loadPageProperties();
	        }
	    });
	    catk.App.run();
	}
	exports.init = init;

	});

	var create_whiteboard$1 = unwrapExports(create_whiteboard);
	var create_whiteboard_1 = create_whiteboard.init;

	exports.default = create_whiteboard$1;
	exports.init = create_whiteboard_1;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
