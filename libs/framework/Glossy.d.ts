declare namespace FrameWork {
    class GlossyMat implements Material {
        color: Vec3;
        theta: number;
        constructor(color: Vec3, theta: number);
        private randCone;
        private normToWorld;
        private reflectRay;
        Diffuse(x: Vec3): Vec3;
        Reflect(x: Vec3, N: Vec3, L: Ray): Ray | null;
    }
}
