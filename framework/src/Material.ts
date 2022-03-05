namespace FrameWork {
    export interface Material {
        Diffuse(x: Vec3): Vec3;
        Reflect(x: Vec3, N: Vec3, L: Ray): Ray | null;
    }
}