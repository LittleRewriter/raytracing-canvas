namespace App {
    import Object = FrameWork.Object;
    import Hit = FrameWork.Hit;
    import Ray = FrameWork.Ray;
    import Vec3 = FrameWork.Vec3;
    import add = FrameWork.add;
    import multiply = FrameWork.multiply;
    import wiseProduct = FrameWork.wiseProduct;
    
    // color of sky to lerp
    const coldown = new Vec3(1, 1, 1);
    const colup = new Vec3(0.5, 0.7, 1);

    export class Scene {
        objs: Object[] = []
        AddObject(obj: Object) {
            this.objs.push(obj);
        }
        HitObjects(ray: Ray, t_min: number = 0, t_max: number = 99999999): Hit | null {
            var hit: Hit | null = null;
            this.objs.forEach(obj => {
                var temp_hit = obj.Hit(ray, t_min, t_max);
                if (temp_hit !== null) {
                    if (hit === null || temp_hit.t < hit.t){
                        hit = temp_hit;
                    }
                }
            })
            return hit;
        }
        
        // Calculate the ambient color for sky
        private ambient(scenePos: Vec3): Vec3 {
            var y = scenePos.y;
            var t = (y + 1.0) * .5;
            return add(multiply(coldown, 1 - t), multiply(colup, t));
        }
        GetColor(ray: Ray, dep: number): Vec3 {
            var hit = this.HitObjects(ray, .001);
            if (dep < 0) {
                return new Vec3(0, 0, 0);
            }
            if (hit !== null) {
                var nr = hit.O;
                if (nr === null) {
                    return new Vec3(0, 0, 0);
                } else {
                    var col = hit.C;
                    return wiseProduct(this.GetColor(nr, dep - 1), col);
                }
            }
            return this.ambient(ray.dir);
        }

    }
}