declare namespace FrameWork {
    class Vec3 {
        ele: number[];
        x: number;
        y: number;
        z: number;
        r: number;
        g: number;
        b: number;
        UpdateSubEles(): void;
        constructor(x: number, y: number, z: number);
        WiseProduct(o: Vec3): void;
        AddVec(o: Vec3): void;
        MinusVec(o: Vec3): void;
        Multiply(o: number): void;
        Negative(): void;
        IsZero(): boolean;
        DivideScalar(o: number): void;
        Magnitude(): number;
        LengthSquared(): number;
        Normalize(): void;
        GammaCorrection(): void;
        Clamp(): void;
    }
    function wiseProduct(x: Vec3, y: Vec3): Vec3;
    function dotProduct(x: Vec3, y: Vec3): number;
    function crossProduct(a: Vec3, b: Vec3): Vec3;
    function multiply(a: Vec3, b: number): Vec3;
    function add(a: Vec3, b: Vec3): Vec3;
    function minus(a: Vec3, b: Vec3): Vec3;
    function divide(a: Vec3, w: number): Vec3;
    function normalize(a: Vec3): Vec3;
}
