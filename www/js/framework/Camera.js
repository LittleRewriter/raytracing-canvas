"use strict";
var FrameWork;
(function (FrameWork) {
    class Camera {
        constructor(prop = {}) {
            this.asp_ratio = prop.aspect_ratio || 4 / 3.0;
            this.look_at = prop.look_at || new FrameWork.Vec3(0, 0, 1);
            this.vup = prop.vup || new FrameWork.Vec3(0, 1, 0);
            this.pos = prop.look_origin || new FrameWork.Vec3(0, 0, 0);
            this.fov = prop.field_of_view || 90;
            var deg_fov = this.fov / 180 * Math.PI;
            var h = Math.tan(deg_fov / 2);
            this.vh = 2 * h;
            this.vw = this.asp_ratio * this.vh;
            var w = FrameWork.normalize(this.look_at);
            var u = FrameWork.normalize(FrameWork.crossProduct(this.vup, w));
            var v = FrameWork.crossProduct(w, u);
            this.hor = FrameWork.multiply(u, this.vw);
            this.ver = FrameWork.multiply(v, this.vh);
            this.left_down = FrameWork.minus(FrameWork.minus(FrameWork.minus(this.pos, FrameWork.divide(this.hor, 2)), FrameWork.divide(this.ver, 2)), w);
            console.log(this.left_down);
        }
        GetRay(u, v) {
            var ndir = FrameWork.minus(FrameWork.add(FrameWork.add(this.left_down, FrameWork.multiply(this.ver, u)), FrameWork.multiply(this.hor, v)), this.pos);
            if (u < .001 && v < .001) {
                console.log(this);
                console.log(ndir);
            }
            ;
            return new FrameWork.Ray(this.pos, ndir);
        }
    }
    FrameWork.Camera = Camera;
})(FrameWork || (FrameWork = {}));
//# sourceMappingURL=Camera.js.map