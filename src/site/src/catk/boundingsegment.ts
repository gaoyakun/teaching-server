import * as point from './point';
import * as shape from './boundingshape';
import * as transform from './transform';

export class BoundingSegment extends shape.BoundingShape {
    public static readonly type: string = 'Segment';
    private _segment: point.ISegment2d|null;
    private _dirty: boolean;
    private _boundingbox: point.IRect2d|null;
    constructor(seg?: point.ISegment2d) {
        super(BoundingSegment.type);
        this._segment = seg || null;
        this._dirty = !!seg;
        this._boundingbox = null;
    }
    get start():point.IPoint2d|null {
        return this._segment ? this._segment.start : null;
    }
    set start(pt: point.IPoint2d|null) {
        if (pt) {
            if (!this._segment) {
                this._segment = { start: pt, end: pt };
            } else {
                this._segment.start = pt;
            }
            this._dirty = true;
        }
    }
    get end():point.IPoint2d|null {
        return this._segment ? this._segment.end : null;
    }
    set end(pt: point.IPoint2d|null) {
        if (pt) {
            if (!this._segment) {
                this._segment = { start: pt, end: pt };
            } else {
                this._segment.end = pt;
            }
            this._dirty = true;
        }
    }
    get segment(): point.ISegment2d|null {
        return this._segment ? { start: this.start as point.IPoint2d, end: this.end as point.IPoint2d } : null;
    }
    get boundingbox() {
        this._checkDirty();
        return this._boundingbox;
    }
    getBoundingbox(): point.IRect2d|null {
        return this.boundingbox;
    }
    getTransformedShape(transform: transform.Matrix2d): shape.BoundingShape|null {
        if (!transform || !this._segment) {
            return this._segment ? new BoundingSegment(this._segment) : null;
        } else {
            return new BoundingSegment({
                start: transform.transformPoint(this._segment.start),
                end: transform.transformPoint(this._segment.end)
            });
        }
    }
    private _checkDirty() {
        if (this._segment && this._dirty) {
            this._dirty = false;
            let minx = this._segment.start.x;
            let miny = this._segment.start.y;
            let maxx = this._segment.end.x;
            let maxy = this._segment.end.y;
            if (minx > maxx) {
                const tmp = minx;
                minx = maxx;
                maxx = tmp;
            }
            if (miny > maxy) {
                const tmp = miny;
                miny = maxy;
                maxy = tmp;
            }
            this._boundingbox = { x: minx, y: miny, w: maxx - minx + 1, h: maxy - miny + 1 };
        }
    }
}
