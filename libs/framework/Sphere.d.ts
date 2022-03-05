declare namespace FrameWork {
    class Sphere implements Object {
        center: Vec3;
        radius: number;
        material: Material;
        constructor(center: Vec3, radius: number, material: Material);
        GetNormal(p: Vec3): Vec3;
        Hit(ray: Ray, t_min?: number, t_max?: number): Hit | null;
    }
}
