"use strict";
var FrameWork;
(function (FrameWork) {
    class DiffuseMat {
        constructor(color) {
            this.color = color;
        }
        randHemisphere() {
            var U1 = Math.random(), U2 = Math.random();
            var z = Math.abs(1 - 2 * U1);
            var r = Math.sqrt(1 - z * z);
            var phi = 2 * Math.PI * U2;
            var ray = new FrameWork.Vec3(r * Math.cos(phi), r * Math.sin(phi), z);
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
        diffuse(x) {
            return this.color;
        }
        unitSample(N) {
            var v;
            while (true) {
                var x = Math.random() * 2 - 1, y = Math.random() * 2 - 1, z = Math.random() * 2 - 1;
                if (x * x + y * y + z * z >= 1)
                    continue;
                v = new FrameWork.Vec3(x, y, z);
                break;
            }
            v.Normalize();
            if (FrameWork.dotProduct(v, N) > 0)
                return v;
            else {
                v.Negative();
                return v;
            }
        }
        reflect(x, N) {
            var hem = this.randHemisphere();
            var dir = this.normToWorld(hem, N);
            dir.Normalize();
            return new FrameWork.Ray(x, dir);
        }
    }
    FrameWork.DiffuseMat = DiffuseMat;
})(FrameWork || (FrameWork = {}));
//# sourceMappingURL=Diffuse.js.map