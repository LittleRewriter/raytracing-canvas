namespace FrameWork {
    export class Mirror implements Material {
        color: Vec3;
        constructor(color: Vec3) {
            this.color = color;
        }

        Diffuse(x: Vec3): Vec3 {
            return this.color;
        }

        Reflect(x: Vec3, N: Vec3, L: Ray): Ray | null {
            var nRay = reflectRay(L.dir, N);
            nRay.Normalize();
            if (dotProduct(nRay, N) < 0) return null;
            return new Ray(x, nRay);
        }

    }
}