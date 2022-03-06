"use strict";
var FrameWork;
(function (FrameWork) {
    function normToWorld(ray, N) {
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
    FrameWork.normToWorld = normToWorld;
    function randHemisphere() {
        var U1 = Math.random(), U2 = Math.random();
        var z = Math.abs(1 - 2 * U1);
        var r = Math.sqrt(1 - z * z);
        var phi = 2 * Math.PI * U2;
        var ray = new FrameWork.Vec3(r * Math.cos(phi), r * Math.sin(phi), z);
        return ray;
    }
    FrameWork.randHemisphere = randHemisphere;
    function unitSample(N) {
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
    FrameWork.unitSample = unitSample;
    function randCone(theta) {
        var U1 = Math.random(), U2 = Math.random();
        var hradt = theta / 360 * Math.PI;
        var phi = U1 * hradt;
        var th = 2 * Math.PI * U2;
        var ray = new FrameWork.Vec3(Math.sin(phi) * Math.cos(th), Math.sin(phi) * Math.cos(th), Math.cos(phi));
        return ray;
    }
    FrameWork.randCone = randCone;
    function reflectRay(L, N) {
        return FrameWork.minus(L, FrameWork.multiply(N, 2 * FrameWork.dotProduct(L, N)));
    }
    FrameWork.reflectRay = reflectRay;
    function refractRay(L, N, ind_ratio) {
        var cos = Math.min(-FrameWork.dotProduct(L, N), 1.0);
        var sin = Math.sqrt(1 - cos * cos);
        if (ind_ratio * sin > 1) {
            return reflectRay(L, N);
        }
        var r_perp = FrameWork.multiply(FrameWork.add(L, FrameWork.multiply(N, cos)), ind_ratio);
        var r_prep_mag = r_perp.LengthSquared();
        var r_para = FrameWork.multiply(N, -Math.sqrt(1 - r_prep_mag));
        return FrameWork.add(r_perp, r_para);
    }
    FrameWork.refractRay = refractRay;
    function fresnelRefract(L, N, ind_ratio) {
        var cos = Math.min(-FrameWork.dotProduct(L, N), 1.0);
        var sin = Math.sqrt(1 - cos * cos);
        var rfl_item = reflectRay(L, N);
        if (ind_ratio * sin > 1) {
            return rfl_item;
        }
        var r_perp = FrameWork.multiply(FrameWork.add(L, FrameWork.multiply(N, cos)), ind_ratio);
        var r_prep_mag = r_perp.LengthSquared();
        var r_para = FrameWork.multiply(N, -Math.sqrt(1 - r_prep_mag));
        var rfa_item = FrameWork.add(r_perp, r_para);
        var k = schlickApproximation(cos, ind_ratio);
        k = Math.max(k, 1.0);
        if (Math.random() < k) {
            return rfa_item;
        }
        else {
            return rfl_item;
        }
    }
    FrameWork.fresnelRefract = fresnelRefract;
    function schlickApproximation(costheta, ind_ratio) {
        var r0 = (1 - ind_ratio) / (1 + ind_ratio);
        r0 *= r0;
        return r0 + (1 - r0) * Math.pow((1 - costheta), 5);
    }
    FrameWork.schlickApproximation = schlickApproximation;
})(FrameWork || (FrameWork = {}));
//# sourceMappingURL=Tools.js.map