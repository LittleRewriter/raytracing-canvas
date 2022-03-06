"use strict";
var FrameWork;
(function (FrameWork) {
    class DiffuseMat {
        constructor(color) {
            this.color = color;
        }
        Diffuse(x) {
            return this.color;
        }
        Reflect(x, N, L) {
            var hem = FrameWork.randHemisphere();
            var dir = FrameWork.normToWorld(hem, N);
            dir.Normalize();
            return new FrameWork.Ray(x, dir);
        }
    }
    FrameWork.DiffuseMat = DiffuseMat;
})(FrameWork || (FrameWork = {}));
//# sourceMappingURL=Diffuse.js.map