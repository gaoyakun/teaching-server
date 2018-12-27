export class Matrix2d {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    constructor() {
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.e = 0;
        this.f = 0;
    }
    static getIdentity() {
        return new Matrix2d();
    }
    static getTranslate(x: number, y: number) {
        return new Matrix2d().makeTranslate(x, y);
    }
    static getScale(x: number, y: number) {
        return new Matrix2d().makeScale(x, y);
    }
    static getRotate(theta: number) {
        return new Matrix2d().makeRotate(theta);
    }
    static transform(t1: Matrix2d, t2: Matrix2d) {
        return new Matrix2d().copyFrom(t1).transform(t2);
    }
    static translate(t: Matrix2d, x: number, y: number) {
        return new Matrix2d().copyFrom(t).translate(x, y);
    }
    static scale(t: Matrix2d, x: number, y: number) {
        return new Matrix2d().copyFrom(t).scale(x, y);
    }
    static rotate(t: Matrix2d, theta: number) {
        return new Matrix2d().copyFrom(t).rotate(theta);
    }
    static invert(t: Matrix2d) {
        return new Matrix2d().copyFrom(t).invert();
    }
    set(a: number, b: number, c: number, d: number, e: number, f: number) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
        return this;
    }
    makeIdentity() {
        return this.set(1, 0, 0, 1, 0, 0);
    }
    makeTranslate(x: number, y: number) {
        return this.set(1, 0, 0, 1, x, y);
    }
    makeScale(x: number, y: number) {
        return this.set(x, 0, 0, y, 0, 0);
    }
    makeRotate(theta: number) {
        let s = Math.sin(theta);
        let c = Math.cos(theta);
        return this.set(c, s, -s, c, 0.0, 0.0);
    }
    copyFrom(otherTransform: Matrix2d) {
        return this.set(otherTransform.a, otherTransform.b, otherTransform.c, otherTransform.d, otherTransform.e, otherTransform.f);
    }
    transform(right: Matrix2d) {
        return this.set(
            this.a * right.a + this.c * right.b,
            this.b * right.a + this.d * right.b,
            this.a * right.c + this.c * right.d,
            this.b * right.c + this.d * right.d,
            this.a * right.e + this.c * right.f + this.e,
            this.b * right.e + this.d * right.f + this.f
        );
    }
    transformPoint(point: { x: number; y: number }) {
        return {
            x: Math.round(this.a * point.x + this.c * point.y + this.e),
            y: Math.round(this.b * point.x + this.d * point.y + this.f)
        };
    }
    translate(x: number, y: number) {
        return this.transform(Matrix2d.getTranslate(x, y));
    }
    scale(x: number, y: number) {
        return this.transform(Matrix2d.getScale(x, y));
    }
    rotate(theta: number) {
        return this.transform(Matrix2d.getRotate(theta));
    }
    invert() {
        let a00 = this.a;
        let a01 = this.b;
        let a02 = 0;
        let a10 = this.c;
        let a11 = this.d;
        let a12 = 0;
        let a20 = this.e;
        let a21 = this.f;
        let a22 = 1;
        let b01 = a22 * a11 - a12 * a21;
        let b11 = -a22 * a10 + a12 * a20;
        let b21 = a21 * a10 - a11 * a20;
        let det = a00 * b01 + a01 * b11 + a02 * b21;
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
    }
    getTranslationPart(): { x: number; y: number } {
        return { x: this.e, y: this.f };
    }
    setTranslationPart(t: { x: number; y: number }) {
        this.e = t.x;
        this.f = t.y;
    }
    getScalePart(): { x: number; y: number } {
        return {
            x: Math.sqrt(this.a * this.a + this.b * this.b),
            y: Math.sqrt(this.c * this.c + this.d * this.d)
        };
    }
    setScalePart(s: { x: number; y: number }) {
        let sc = this.getScalePart();
        let s1 = s.x / sc.x;
        this.a *= s1;
        this.b *= s1;
        let s2 = s.y / sc.y;
        this.c *= s2;
        this.d *= s2;
    }
    getRotationPart(): number {
        let sc = Math.sqrt(this.a * this.a + this.b * this.b);
        if (sc === 0) {
            return 0;
        }
        let ac = Math.max(Math.min(this.a / sc, 1), -1);
        let as = Math.max(Math.min(this.b / sc, 1), -1);
        let angle = Math.acos(ac);
        return as >= 0 ? angle : 2 * Math.PI - angle;
    }
    setRotationPart(r: number) {
        let sc = this.getScalePart();
        let sin = Math.sin(r);
        let cos = Math.cos(r);
        this.a = sc.x * cos;
        this.b = sc.x * sin;
        this.c = -sc.y * sin;
        this.d = sc.y * cos;
    }
}
