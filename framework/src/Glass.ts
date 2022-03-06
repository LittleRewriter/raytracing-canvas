namespace FrameWork {
    export class GlassMat implements Material {
        index_ref: number;

        constructor(index: number) {
            this.index_ref = index;
        }

        Diffuse(x: Vec3): Vec3 {
            return new Vec3(1,1,1);
        }

        Reflect(x: Vec3, N: Vec3, L: Ray): Ray | null {
            if (dotProduct(L.dir, N) < 0) {
                var out = refractRay(L.dir, N, 1 / this.index_ref);
                out.Normalize();
                return new Ray(x, out);
            } else {
                var out = refractRay(L.dir, multiply(N, -1), this.index_ref);
                out.Normalize();
                return new Ray(x, out);
            }
        }
        
    }
}