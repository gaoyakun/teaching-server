export class LibPlugin {
    static ctxSaveStates (ctx:CanvasRenderingContext2D) {
        ctx.save ();
    }
    static ctxRestoreStates (ctx:CanvasRenderingContext2D) {
        ctx.restore ();
    }
    static ctxSetPenColor (ctx:CanvasRenderingContext2D, color:string) {
        ctx.strokeStyle = color;
    }
    static ctxGetPenColor (ctx:CanvasRenderingContext2D): string {
        return ctx.strokeStyle as string;
    }
    static ctxSetFillColor (ctx:CanvasRenderingContext2D, color:string) {
        ctx.fillStyle = color;
    }
    static ctxGetFillColor (ctx:CanvasRenderingContext2D): string {
        return ctx.fillStyle as string;
    }
    static fillRect (ctx:CanvasRenderingContext2D, left:number, top:number, width:number, height:number) {
        ctx.fillRect (left, top, width, height);
    }
    static drawLines (ctx:CanvasRenderingContext2D, points:{x:number,y:number}[], close?:boolean) {
        if (points.length > 1) {
            ctx.beginPath ();
            ctx.moveTo (points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo (points[i].x, points[i].y);
            }
            if (close) {
                ctx.closePath ();
            }
            ctx.stroke ();
        }
    }
    static drawArc (ctx:CanvasRenderingContext2D, cx:number, cy:number, radius:number, startAngle:number, endAngle:number, close?:boolean) {
        ctx.beginPath ();
        ctx.arc (cx, cy, radius, startAngle, endAngle);
        if (close) {
            ctx.closePath ();
        }
        ctx.stroke ();
    }
    static fillArc (ctx:CanvasRenderingContext2D, cx:number, cy:number, radius:number, startAngle:number, endAngle:number, close?:boolean) {
        ctx.beginPath ();
        ctx.arc (cx, cy, radius, startAngle, endAngle);
        if (close) {
            ctx.closePath ();
        }
        ctx.fill ();
    }
}