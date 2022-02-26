"use strict";
var FrameWork;
(function (FrameWork) {
    class Vec3 {
        constructor(x, y, z) {
            this.ele = [0, 0, 0];
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.ele = [x, y, z];
            this.UpdateSubEles();
        }
        UpdateSubEles() {
            this.x = this.ele[0];
            this.y = this.ele[1];
            this.z = this.ele[2];
            this.r = this.ele[0];
            this.g = this.ele[1];
            this.b = this.ele[2];
        }
        WiseProduct(o) {
            this.ele[0] *= o.x;
            this.ele[1] *= o.y;
            this.ele[2] *= o.z;
            this.UpdateSubEles();
        }
        AddVec(o) {
            this.ele[0] += o.x;
            this.ele[1] += o.y;
            this.ele[2] += o.z;
            this.UpdateSubEles();
        }
        MinusVec(o) {
            this.ele[0] -= o.x;
            this.ele[1] -= o.y;
            this.ele[2] -= o.z;
            this.UpdateSubEles();
        }
        Multiply(o) {
            this.ele[0] *= o;
            this.ele[1] *= o;
            this.ele[2] *= o;
            this.UpdateSubEles();
        }
        DivideScalar(o) {
            this.ele[0] /= o;
            this.ele[1] /= o;
            this.ele[2] /= o;
            this.UpdateSubEles();
        }
        Magnitude() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
        LengthSquared() {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        }
        Normalize() {
            this.DivideScalar(this.Magnitude());
        }
    }
    FrameWork.Vec3 = Vec3;
    function wiseProduct(x, y) {
        let newVec = new Vec3(x.x * y.x, x.y * y.y, x.z * y.z);
        return newVec;
    }
    FrameWork.wiseProduct = wiseProduct;
    function dotProduct(x, y) {
        return x.x * y.x + x.y * y.y + x.z * y.z;
    }
    FrameWork.dotProduct = dotProduct;
    function crossProduct(a, b) {
        return new Vec3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
    }
    FrameWork.crossProduct = crossProduct;
    function add(a, b) {
        return new Vec3(a.x + b.x, a.y + b.y, a.z + b.z);
    }
    FrameWork.add = add;
    function minus(a, b) {
        return new Vec3(a.x - b.x, a.y - b.y, a.z - b.z);
    }
    FrameWork.minus = minus;
    function divide(a, w) {
        return new Vec3(a.x / w, a.y / w, a.z / w);
    }
    FrameWork.divide = divide;
    function normalize(a) {
        return divide(a, a.Magnitude());
    }
    FrameWork.normalize = normalize;
})(FrameWork || (FrameWork = {}));
//# sourceMappingURL=Vec3.js.map