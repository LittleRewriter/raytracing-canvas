namespace FrameWork {

    export function normToWorld(ray: Vec3, N: Vec3): Vec3 {
        var C: Vec3;
        if (Math.abs(N.x) > Math.abs(N.y)) {
            var invLen = 1.0 / Math.sqrt(N.x * N.x + N.z * N.z);
            C = new Vec3(N.z * invLen, .0, -N.x * invLen);
        } else {
            var invLen = 1.0 / Math.sqrt(N.y * N.y + N.z * N.z);
            C = new Vec3(.0, N.z * invLen, -N.y * invLen);
        }
        var B = crossProduct(C, N);
        return add(add(multiply(B, ray.x), multiply(C, ray.y)), multiply(N, ray.z));
    }

    export function randHemisphere():Vec3 {
        var U1 = Math.random(), U2 = Math.random();
        var z = Math.abs(1 - 2 * U1);
        var r = Math.sqrt(1 - z * z);
        var phi = 2 * Math.PI * U2;
        var ray = new Vec3(r * Math.cos(phi), r * Math.sin(phi), z);
        return ray;
    }

    export function unitSample(N: Vec3): Vec3 {
        var v: Vec3;
        while (true) {
            var x = Math.random() * 2 - 1, y = Math.random() * 2 - 1, z = Math.random() * 2 - 1;
            if (x * x + y * y + z * z >= 1) continue;
            v = new Vec3(x, y, z);
            break;
        }
        v.Normalize();
        if (dotProduct(v, N) > 0) return v;
        else {
            v.Negative();
            return v;
        }
    }

    export function sampleDisk(): Vec3 {
        while (true) {
            var x = Math.random();
            var y = Math.random();
            if (x * x + y * y < 1)
                return new Vec3(x, y, 0);
        }
    }

    export function randCone(theta: number):Vec3 {
        var U1 = Math.random(), U2 = Math.random();
        var hradt = theta / 360 * Math.PI;
        var phi = U1 * hradt;
        var th = 2 * Math.PI * U2;
        var ray = new Vec3(Math.sin(phi) * Math.cos(th), Math.sin(phi) * Math.cos(th), Math.cos(phi));
        return ray;
    }

    export function reflectRay(L: Vec3, N: Vec3): Vec3 {
        return minus(L, multiply(N, 2 * dotProduct(L, N)));
    }
    
    export function refractRay(L: Vec3, N: Vec3, ind_ratio: number): Vec3 {
        var cos = Math.min(-dotProduct(L, N), 1.0);
        var sin = Math.sqrt(1 - cos * cos);
        if (ind_ratio * sin > 1) {
            return reflectRay(L, N);
        }
        var r_perp = multiply(add(L, multiply(N, cos)), ind_ratio);
        var r_prep_mag = r_perp.LengthSquared();
        var r_para = multiply(N, -Math.sqrt(1 - r_prep_mag));
        return add(r_perp, r_para);
    }

    export function fresnelRefract(L: Vec3, N: Vec3, ind_ratio: number): Vec3 {
        var cos = Math.min(-dotProduct(L, N), 1.0);
        var sin = Math.sqrt(1 - cos * cos);
        var rfl_item = reflectRay(L, N);
        if (ind_ratio * sin > 1) {
            return rfl_item;
        }
        var r_perp = multiply(add(L, multiply(N, cos)), ind_ratio);
        var r_prep_mag = r_perp.LengthSquared();
        var r_para = multiply(N, -Math.sqrt(1 - r_prep_mag));
        var rfa_item = add(r_perp, r_para);
        var k = schlickApproximation(cos, ind_ratio);
        k = Math.max(k, 1.0);
        if (Math.random() < k) {
            return rfa_item;
        } else {
            return rfl_item;
        }
    }

    export function schlickApproximation(costheta: number, ind_ratio: number): number {
        var r0 = (1 - ind_ratio) / (1 + ind_ratio);
        r0 *= r0;
        return r0 + (1 - r0) * Math.pow((1 - costheta), 5);
    }

}