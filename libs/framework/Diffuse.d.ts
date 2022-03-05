declare namespace FrameWork {
    class DiffuseMat implements Material {
        color: Vec3;
        constructor(color: Vec3);
        private randHemisphere;
        private normToWorld;
        diffuse(x: Vec3): Vec3;
        private unitSample;
        reflect(x: Vec3, N: Vec3): Ray;
    }
}
