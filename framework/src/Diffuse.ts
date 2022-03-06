namespace FrameWork {
    export class DiffuseMat implements Material {
        color: Vec3;
        constructor(color: Vec3) {
            this.color = color;
        }

        Diffuse(x: Vec3): Vec3 {
            return this.color;
        }

        Reflect(x: Vec3, N: Vec3, L: Ray): Ray | null {
            var hem = randHemisphere();
            var dir = normToWorld(hem, N);
            //var dir = this.unitSample(N);
            dir.Normalize();
            return new Ray(x, dir);
        }
    }
}