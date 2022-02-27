namespace FrameWork {
    export class Hit {
        p: Vec3;
        N: Vec3;
        t: number;
        constructor(p: Vec3, N: Vec3, t: number) {
            this.p = p;
            this.N = N;
            this.t = t;
        }
    }
    export interface Object {
        hit(ray: Ray, t_min: number, t_max: number): Hit | null;
    }
}