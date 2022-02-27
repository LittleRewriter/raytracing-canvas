declare namespace FrameWork {
    class Hit {
        p: Vec3;
        N: Vec3;
        t: number;
        constructor(p: Vec3, N: Vec3, t: number);
    }
    interface Object {
        hit(ray: Ray, t_min: number, t_max: number): Hit | null;
    }
}
