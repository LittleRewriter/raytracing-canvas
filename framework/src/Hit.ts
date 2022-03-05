namespace FrameWork {
    export class Hit {
        p: Vec3; 
        N: Vec3;
        t: number;
        C: Vec3;
        O: Ray | null;
        /**
         * Hit的构造器
         * @param p 交点
         * @param N 法线
         * @param t 距离
         * @param C 颜色
         * @param O 反射光线
         */
        constructor(p: Vec3, N: Vec3, t: number, C: Vec3, O: Ray | null) {
            this.p = p;
            this.N = N;
            this.t = t;
            this.C = C;
            this.O = O;
        }
    }
    export interface Object {
        Hit(ray: Ray, t_min: number, t_max: number): Hit | null;
    }
}