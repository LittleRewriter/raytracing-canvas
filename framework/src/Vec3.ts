namespace FrameWork {
    export class Vec3 {
        ele: number[] = [0, 0, 0];
        x = 0; y = 0; z = 0;
        r = 0; g = 0; b = 0;
        UpdateSubEles() {
            this.x = this.ele[0];
            this.y = this.ele[1];
            this.z = this.ele[2];
            this.r = this.ele[0];
            this.g = this.ele[1];
            this.b = this.ele[2];
        }
        constructor(x: number, y: number, z: number) {
            this.ele = [x, y, z];
            this.UpdateSubEles();
        }
        WiseProduct(o: Vec3) {
            this.ele[0] *= o.x;
            this.ele[1] *= o.y;
            this.ele[2] *= o.z;
            this.UpdateSubEles();
        }
        AddVec(o: Vec3) {
            this.ele[0] += o.x;
            this.ele[1] += o.y;
            this.ele[2] += o.z;
            this.UpdateSubEles();
        }
        MinusVec(o: Vec3) {
            this.ele[0] -= o.x;
            this.ele[1] -= o.y;
            this.ele[2] -= o.z;
            this.UpdateSubEles();
        }
        Multiply(o: number) {
            this.ele[0] *= o;
            this.ele[1] *= o;
            this.ele[2] *= o;
            this.UpdateSubEles();
        }
        DivideScalar(o: number) {
            this.ele[0] /= o;
            this.ele[1] /= o;
            this.ele[2] /= o;
            this.UpdateSubEles();
        }
        Magnitude(): number {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
        LengthSquared(): number {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        }
        Normalize() {
            this.DivideScalar(this.Magnitude())
        }
    }
    export function wiseProduct(x: Vec3, y: Vec3): Vec3 {
        let newVec = new Vec3(x.x * y.x, x.y * y.y, x.z * y.z);
        return newVec;
    }
    export function dotProduct(x: Vec3, y: Vec3): number {
        return x.x * y.x + x.y * y.y + x.z * y.z;
    }
    export function crossProduct(a: Vec3, b: Vec3): Vec3 {
        return new Vec3(
            a.y * b.z - a.z * b.y,
            a.z * b.x - a.x * b.z,
            a.x * b.y - a.y * b.x
        )
    }
    export function add(a: Vec3, b: Vec3): Vec3 {
        return new Vec3(a.x + b.x, a.y + b.y, a.z + b.z);
    }
    export function minus(a: Vec3, b: Vec3): Vec3 {
        return new Vec3(a.x - b.x, a.y - b.y, a.z - b.z);
    }
    export function divide(a: Vec3, w: number): Vec3 {
        return new Vec3(a.x / w, a.y / w, a.z / w);
    }
    export function normalize(a: Vec3): Vec3 {
        return divide(a, a.Magnitude());
    }
}