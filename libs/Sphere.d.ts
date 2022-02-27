declare namespace FrameWork {
    class Sphere implements Object {
        center: Vec3;
        radius: number;
        constructor(center: Vec3, radius: number);
        getNormal(p: Vec3): Vec3;
        hit(ray: Ray, t_min?: number, t_max?: number): Hit | null;
    }
}
