"use strict";
var FrameWork;
(function (FrameWork) {
    class GlossyMat {
        constructor(color, theta) {
            this.color = color;
            this.theta = theta;
        }
        Diffuse(x) {
            return this.color;
        }
        Reflect(x, N, L) {
            var nRay = FrameWork.reflectRay(L.dir, N);
            nRay.Normalize();
            if (FrameWork.dotProduct(nRay, N) < 0)
                return null;
            var hem = FrameWork.randCone(this.theta);
            var dir = FrameWork.normToWorld(hem, nRay);
            dir.Normalize();
            return new FrameWork.Ray(x, dir);
        }
    }
    FrameWork.GlossyMat = GlossyMat;
})(FrameWork || (FrameWork = {}));
//# sourceMappingURL=Glossy.js.map