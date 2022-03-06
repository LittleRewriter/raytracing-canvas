declare namespace FrameWork {
    class GlossyMat implements Material {
        color: Vec3;
        theta: number;
        constructor(color: Vec3, theta: number);
        Diffuse(x: Vec3): Vec3;
        Reflect(x: Vec3, N: Vec3, L: Ray): Ray | null;
    }
}
