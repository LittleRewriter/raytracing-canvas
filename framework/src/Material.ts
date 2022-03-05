namespace FrameWork {
    export interface Material {
        diffuse(x: Vec3): Vec3;
        reflect(x: Vec3, N: Vec3): Ray;
    }
}