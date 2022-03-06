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

        Diffuse(x: Vec3): Vec3 {
            return this.color;
        }

        Reflect(x: Vec3, N: Vec3, L: Ray): Ray | null {
            var nRay = reflectRay(L.dir, N);
            nRay.Normalize();
            if (dotProduct(nRay, N) < 0) return null;
            var hem = randCone(this.theta);
            var dir = normToWorld(hem, nRay);
            dir.Normalize();
            return new Ray(x, dir);
        }
    }
}