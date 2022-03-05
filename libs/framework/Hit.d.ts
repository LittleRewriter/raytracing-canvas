declare namespace FrameWork {
    class Hit {
        p: Vec3;
        N: Vec3;
        t: number;
        O: Ray;
        constructor(p: Vec3, N: Vec3, t: number, O: Ray);
    }
    interface Object {
        hit(ray: Ray, t_min: number, t_max: number): Hit | null;
    }
}
