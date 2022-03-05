namespace FrameWork {
    export class GlossyMat implements Material {
        color: Vec3;
        theta: number;
        /**
         * 有模糊的镜面材质
         * @param color 材质漫反射颜色
         * @param theta 反射角的大小，使用角度值
         */
        constructor(color: Vec3, theta: number) {
            this.color = color;
            this.theta = theta;
        }

        // cosine importance sampling
        private randCone():Vec3 {
            var U1 = Math.random(), U2 = Math.random();
            var hradt = this.theta / 360 * Math.PI;
            var phi = U1 * hradt;
            var th = 2 * Math.PI * U2;
            var ray = new Vec3(Math.sin(phi) * Math.cos(th), Math.sin(phi) * Math.cos(th), Math.cos(phi));
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

        private reflectRay(L: Vec3, N: Vec3): Vec3 {
            return minus(L, multiply(N, 2 * dotProduct(L, N)));
        }

        Diffuse(x: Vec3): Vec3 {
            return this.color;
        }

        Reflect(x: Vec3, N: Vec3, L: Ray): Ray | null {
            var nRay = this.reflectRay(L.dir, N);
            nRay.Normalize();
            if (dotProduct(nRay, N) < 0) return null;
            var hem = this.randCone();
            var dir = this.normToWorld(hem, nRay);
            dir.Normalize();
            return new Ray(x, dir);
        }
    }
}