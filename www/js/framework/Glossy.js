"use strict";
var FrameWork;
(function (FrameWork) {
    class GlossyMat {
        constructor(color, theta) {
            this.color = color;
            this.theta = theta;
        }
        randCone() {
            var U1 = Math.random(), U2 = Math.random();
            var hradt = this.theta / 360 * Math.PI;
            var phi = U1 * hradt;
            var th = 2 * Math.PI * U2;
            var ray = new FrameWork.Vec3(Math.sin(phi) * Math.cos(th), Math.sin(phi) * Math.cos(th), Math.cos(phi));
            return ray;
        }
        normToWorld(ray, N) {
            var C;
            if (Math.abs(N.x) > Math.abs(N.y)) {
                var invLen = 1.0 / Math.sqrt(N.x * N.x + N.z * N.z);
                C = new FrameWork.Vec3(N.z * invLen, .0, -N.x * invLen);
            }
            else {
                var invLen = 1.0 / Math.sqrt(N.y * N.y + N.z * N.z);
                C = new FrameWork.Vec3(.0, N.z * invLen, -N.y * invLen);
            }
            var B = FrameWork.crossProduct(C, N);
            return FrameWork.add(FrameWork.add(FrameWork.multiply(B, ray.x), FrameWork.multiply(C, ray.y)), FrameWork.multiply(N, ray.z));
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
            var hem = this.randCone();
            var dir = this.normToWorld(hem, nRay);
            dir.Normalize();
            return new FrameWork.Ray(x, dir);
        }
    }
    FrameWork.GlossyMat = GlossyMat;
})(FrameWork || (FrameWork = {}));
//# sourceMappingURL=Glossy.js.map