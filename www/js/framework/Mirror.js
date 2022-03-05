"use strict";
var FrameWork;
(function (FrameWork) {
    class Mirror {
        constructor(color) {
            this.color = color;
        }
        reflectRay(L, N) {
            return FrameWork.minus(L, FrameWork.multiply(N, 2 * FrameWork.dotProduct(L, N)));
        }
        Diffuse(x) {
            return this.color;
        }
        Reflect(x, N, L) {
            var nRay = this.reflectRay(L.dir, N);
            nRay.Normalize();
            if (FrameWork.dotProduct(nRay, N) < 0)
                return null;
            return new FrameWork.Ray(x, nRay);
        }
    }
    FrameWork.Mirror = Mirror;
})(FrameWork || (FrameWork = {}));
//# sourceMappingURL=Mirror.js.map