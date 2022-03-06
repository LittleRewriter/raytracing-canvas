namespace FrameWork {
    /**
     * （其实也不）真实的玻璃材质
     * 考虑Fresnel term。
     */
    export class RealGlassMat implements Material {
        index_ref: number;

        constructor(index: number) {
            this.index_ref = index;
        }

        Diffuse(x: Vec3): Vec3 {
            return new Vec3(1,1,1);
        }

        Reflect(x: Vec3, N: Vec3, L: Ray): Ray | null {
            var costheta = dotProduct(L.dir, N);
            if (costheta < 0) {
                var out = fresnelRefract(L.dir, N, 1 / this.index_ref);
                out.Normalize();
                return new Ray(x, out);
            } else {
                var out = fresnelRefract(L.dir, multiply(N, -1), this.index_ref);
                out.Normalize();
                return new Ray(x, out);
            }
        }
        
    }
}