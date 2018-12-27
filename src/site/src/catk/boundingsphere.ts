import * as point from './point';
import * as shape from './boundingshape';
import * as boundinghull from './boundinghull';
import * as transform from './transform';

export class BoundingSphere extends shape.BoundingShape {
    public static readonly type: string = 'sphere';
    private _sphere: point.ISphere2d|null;
    private _dirty: boolean;
    private _boundingbox: point.IRect2d|null;
    constructor(sphere?: point.ISphere2d) {
        super(BoundingSphere.type);
        this._sphere = sphere || null;
        this._dirty = !!this._sphere;
        this._boundingbox = null;
    }
    get center(): point.IPoint2d|null {
        return this._sphere ? this._sphere.center : null;
    }
    get radius(): number|null {
        return this._sphere ? this._sphere.radius : null;
    }
    set center(pt: point.IPoint2d|null) {
        if (pt) {
            if (!this._sphere) {
                this._sphere = { center: pt, radius: 1 };
            } else {
                this._sphere.center = pt;
            }
            this._dirty = true;
        }
    }
    set radius(radius: number|null) {
        if (radius !== null) {
            if (!this._sphere) {
                this._sphere = { center: { x: 0, y: 0 }, radius: radius };
            } else {
                this._sphere.radius = radius;
            }
            this._dirty = true;
        }
    }
    get sphere(): point.ISphere2d|null {
        return this._sphere ? { center: this._sphere.center, radius: this._sphere.radius } : null;
    }
    set sphere(sphere: point.ISphere2d|null) {
        this._sphere = sphere;
        this._dirty = !!sphere;
        this._boundingbox = null;
    }
    get boundingbox() {
        this._checkDirty();
        return this._boundingbox;
    }
    getBoundingbox(): point.IRect2d|null {
        return this.boundingbox;
    }
    getTransformedShape(transform: transform.Matrix2d): shape.BoundingShape|null {
        if (!transform || !this._sphere) {
            return this._sphere ? new BoundingSphere(this._sphere) : null;
        } else {
            const A = Math.PI * 0.125;
            const D = A * 2;
            const R = this._sphere.radius / Math.cos(A);
            const shape = new boundinghull.BoundingHull();
            for (let angle = A; angle < Math.PI * 2; angle += D) {
                const pt = transform.transformPoint({ x: R * Math.cos(angle), y: R * Math.sin(angle) });
                pt.x = Math.round(pt.x);
                pt.y = Math.round(pt.y);
                shape.addPoint(pt);
            }
            return shape;
        }
    }
    private _checkDirty() {
        if (this._sphere && this._dirty) {
            this._dirty = false;
            this._boundingbox = {
                x: this._sphere.center.x - this._sphere.radius + 1,
                y: this._sphere.center.y - this._sphere.radius + 1,
                w: 2 * this._sphere.radius - 1,
                h: 2 * this._sphere.radius - 1
            };
        }
    }
}
