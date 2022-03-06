"use strict";
var FrameWork;
(function (FrameWork) {
    class RealGlassMat {
        constructor(index) {
            this.index_ref = index;
        }
        Diffuse(x) {
            return new FrameWork.Vec3(1, 1, 1);
        }
        Reflect(x, N, L) {
            var costheta = FrameWork.dotProduct(L.dir, N);
            if (costheta < 0) {
                var out = FrameWork.fresnelRefract(L.dir, N, 1 / this.index_ref);
                out.Normalize();
                return new FrameWork.Ray(x, out);
            }
            else {
                var out = FrameWork.fresnelRefract(L.dir, FrameWork.multiply(N, -1), this.index_ref);
                out.Normalize();
                return new FrameWork.Ray(x, out);
            }
        }
    }
    FrameWork.RealGlassMat = RealGlassMat;
})(FrameWork || (FrameWork = {}));
//# sourceMappingURL=RealGlass.js.map