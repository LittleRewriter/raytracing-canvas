"use strict";
var FrameWork;
(function (FrameWork) {
    class Mirror {
        constructor(color) {
            this.color = color;
        }
        Diffuse(x) {
            return this.color;
        }
        Reflect(x, N, L) {
            var nRay = FrameWork.reflectRay(L.dir, N);
            nRay.Normalize();
            if (FrameWork.dotProduct(nRay, N) < 0)
                return null;
            return new FrameWork.Ray(x, nRay);
        }
    }
    FrameWork.Mirror = Mirror;
})(FrameWork || (FrameWork = {}));
//# sourceMappingURL=Mirror.js.map