namespace FrameWork {
    export class Hit {
        p: Vec3;
        N: Vec3;
        t: number;
        O: Ray;
        constructor(p: Vec3, N: Vec3, t: number, O: Ray) {
            this.p = p;
            this.N = N;
            this.t = t;
            this.O = O;
        }
    }
    export interface Object {
        hit(ray: Ray, t_min: number, t_max: number): Hit | null;
    }
}