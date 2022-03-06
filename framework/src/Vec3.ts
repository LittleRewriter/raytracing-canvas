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
        Negative() {
            this.ele[0] = -this.ele[0];
            this.ele[1] = -this.ele[1];
            this.ele[2] = -this.ele[2];
            this.UpdateSubEles();
        }
        IsZero() {
            var eps = 1e-6;
            return this.ele[0] < eps && this.ele[1] < eps && this.ele[2] < eps;
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
        GammaCorrection() {
            this.ele[0] = Math.pow(this.ele[0], 1 / 2.2);
            this.ele[1] = Math.pow(this.ele[1], 1 / 2.2);
            this.ele[2] = Math.pow(this.ele[2], 1 / 2.2);
            this.UpdateSubEles();
        }
        Clamp() {
            this.ele.forEach(e => {
                if (e > 1) e = 1;
                if (e < 0) e = 0;
                e = Math.trunc(e);
            })
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
    export function multiply(a: Vec3, b: number): Vec3 {
        return new Vec3(a.x * b, a.y * b, a.z * b);
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