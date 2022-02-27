namespace FrameWork {
    export class Ray {
        origin: Vec3;
        dir: Vec3;
        constructor(origin: Vec3, dir: Vec3) {
            this.origin = origin;
            this.dir = dir;
        }
        At(t: number) {
            return add(this.origin, multiply(this.dir, t));
        }
    }
}