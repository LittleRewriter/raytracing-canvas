declare namespace FrameWork {
    class DiffuseMat implements Material {
        color: Vec3;
        constructor(color: Vec3);
        Diffuse(x: Vec3): Vec3;
        Reflect(x: Vec3, N: Vec3, L: Ray): Ray | null;
    }
}
