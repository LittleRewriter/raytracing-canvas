namespace FrameWork {
    export class DiffuseMat implements Material {
        color: Vec3;
        constructor(color: Vec3) {
            this.color = color;
        }

        // cosine importance sampling
        private randHemisphere():Vec3 {
            var U1 = Math.random(), U2 = Math.random();
            var z = Math.abs(1 - 2 * U1);
            var r = Math.sqrt(1 - z * z);
            var phi = 2 * Math.PI * U2;
            var ray = new Vec3(r * Math.cos(phi), r * Math.sin(phi), z);
            return ray;
        }


        private normToWorld(ray: Vec3, N: Vec3): Vec3 {
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

        Diffuse(x: Vec3): Vec3 {
            return this.color;
        }

        private unitSample(N: Vec3): Vec3 {
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

        Reflect(x: Vec3, N: Vec3, L: Ray): Ray | null {
            var hem = this.randHemisphere();
            var dir = this.normToWorld(hem, N);
            //var dir = this.unitSample(N);
            dir.Normalize();
            return new Ray(x, dir);
        }
    }
}