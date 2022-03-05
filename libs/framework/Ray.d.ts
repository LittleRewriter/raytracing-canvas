declare namespace FrameWork {
    class Ray {
        origin: Vec3;
        dir: Vec3;
        constructor(origin: Vec3, dir: Vec3);
        At(t: number): Vec3;
    }
}
