"use strict";
var FrameWork;
(function (FrameWork) {
    class Sphere {
        constructor(center, radius, material) {
            this.center = center;
            this.radius = radius;
            this.material = material;
        }
        getNormal(p) {
            return FrameWork.normalize(FrameWork.minus(p, this.center));
        }
        hit(ray, t_min = 0, t_max = 99999999) {
            var a = FrameWork.dotProduct(ray.dir, ray.dir);
            var aMinusC = FrameWork.minus(ray.origin, this.center);
            var b = 2 * FrameWork.dotProduct(ray.dir, aMinusC);
            var c = FrameWork.dotProduct(aMinusC, aMinusC) - this.radius * this.radius;
            var delta = b * b - 4 * a * c;
            if (delta < 0)
                return null;
            var t1 = (-b - Math.sqrt(delta)) / 2 * a;
            var t2 = (-b + Math.sqrt(delta)) / 2 * a;
            if (t1 >= t_min && t1 <= t_max) {
                var np = FrameWork.add(ray.origin, FrameWork.multiply(ray.dir, t1));
                var normal = this.getNormal(np);
                var ref = this.material.reflect(np, normal);
                return new FrameWork.Hit(np, normal, t1, ref);
            }
            else if (t2 >= t_min && t2 <= t_max) {
                var np = FrameWork.add(ray.origin, FrameWork.multiply(ray.dir, t2));
                var normal = this.getNormal(np);
                var ref = this.material.reflect(np, normal);
                return new FrameWork.Hit(np, normal, t2, ref);
            }
            return null;
        }
    }
    FrameWork.Sphere = Sphere;
})(FrameWork || (FrameWork = {}));
//# sourceMappingURL=Sphere.js.map