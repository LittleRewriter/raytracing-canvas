"use strict";
var FrameWork;
(function (FrameWork) {
    class GlassMat {
        constructor(index) {
            this.index_ref = index;
        }
        Diffuse(x) {
            return new FrameWork.Vec3(1, 1, 1);
        }
        Reflect(x, N, L) {
            if (FrameWork.dotProduct(L.dir, N) < 0) {
                var out = FrameWork.refractRay(L.dir, N, 1 / this.index_ref);
                out.Normalize();
                return new FrameWork.Ray(x, out);
            }
            else {
                var out = FrameWork.refractRay(L.dir, FrameWork.multiply(N, -1), this.index_ref);
                out.Normalize();
                return new FrameWork.Ray(x, out);
            }
        }
    }
    FrameWork.GlassMat = GlassMat;
})(FrameWork || (FrameWork = {}));
//# sourceMappingURL=Glass.js.map