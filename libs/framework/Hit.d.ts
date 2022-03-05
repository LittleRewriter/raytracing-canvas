declare namespace FrameWork {
    class Hit {
        p: Vec3;
        N: Vec3;
        t: number;
        C: Vec3;
        O: Ray | null;
        constructor(p: Vec3, N: Vec3, t: number, C: Vec3, O: Ray | null);
    }
    interface Object {
        Hit(ray: Ray, t_min: number, t_max: number): Hit | null;
    }
}
