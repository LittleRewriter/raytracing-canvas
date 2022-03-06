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
            this.len_radius = (prop.aperture || 0) / 2;
            var deg_fov = this.fov / 180 * Math.PI;
            var h = Math.tan(deg_fov / 2);
            this.vh = 2 * h;
            this.vw = this.asp_ratio * this.vh;
            var w = FrameWork.normalize(this.look_at);
            var u = FrameWork.normalize(FrameWork.crossProduct(this.vup, w));
            var v = FrameWork.crossProduct(w, u);
            this.hor_axis = u;
            this.ver_axis = v;
            var focus = prop.focus_distance || 1;
            this.hor = FrameWork.multiply(u, this.vw);
            this.ver = FrameWork.multiply(v, this.vh);
            this.left_down = FrameWork.minus(FrameWork.minus(FrameWork.minus(this.pos, FrameWork.divide(this.hor, 2)), FrameWork.divide(this.ver, 2)), w);
        }
        GetRay(u, v) {
            var samp = FrameWork.multiply(FrameWork.sampleDisk(), this.len_radius);
            var off = FrameWork.add(FrameWork.multiply(this.hor_axis, samp.x), FrameWork.multiply(this.ver_axis, samp.y));
            var np = this.pos;
            var np = FrameWork.add(this.pos, off);
            var ndir = FrameWork.minus(FrameWork.add(FrameWork.add(this.left_down, FrameWork.multiply(this.ver, u)), FrameWork.multiply(this.hor, v)), np);
            return new FrameWork.Ray(np, ndir);
        }
    }
    FrameWork.Camera = Camera;
})(FrameWork || (FrameWork = {}));
//# sourceMappingURL=Camera.js.map