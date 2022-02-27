namespace FrameWork {
    export class Sphere implements Object {
        center: Vec3;
        radius: number;
        constructor(center: Vec3, radius: number) {
            this.center = center;
            this.radius = radius;
        }
        getNormal(p: Vec3) {
            return normalize(minus(p, this.center));
        }
        hit(ray: Ray, t_min: number = 0, t_max: number = 99999999): Hit | null {
            var a = dotProduct(ray.dir, ray.dir);
            var aMinusC = minus(ray.origin, this.center);
            var b = 2 * dotProduct(ray.dir, aMinusC);
            var c = dotProduct(aMinusC, aMinusC) - this.radius * this.radius;
            var delta = b * b - 4 * a * c;
            if (delta < 0) return null;
            var t1 = (-b - Math.sqrt(delta)) / 2 * a;
            var t2 = (-b + Math.sqrt(delta)) / 2 * a;
            if (t1 >= t_min && t1 <= t_max) {
                var np = add(ray.origin, multiply(ray.dir, t1));
                var normal = this.getNormal(np);
                return new Hit(np, normal, t1);
            } else if (t2 >= t_min && t2 <= t_max) {
                var np = add(ray.origin, multiply(ray.dir, t2));
                var normal = this.getNormal(np);
                return new Hit(np, normal, t2);
            }
            return null;
        }
    }
}