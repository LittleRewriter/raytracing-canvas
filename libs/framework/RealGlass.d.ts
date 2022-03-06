declare namespace FrameWork {
    class RealGlassMat implements Material {
        index_ref: number;
        constructor(index: number);
        Diffuse(x: Vec3): Vec3;
        Reflect(x: Vec3, N: Vec3, L: Ray): Ray | null;
    }
}
