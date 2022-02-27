namespace App {
    import Object = FrameWork.Object;
    import Hit = FrameWork.Hit;
    import Ray = FrameWork.Ray;
    import Vec3 = FrameWork.Vec3;
    import add = FrameWork.add;
    import multiply = FrameWork.multiply;
    
    // color of sky to lerp
    const coldown = new Vec3(219, 231, 234);
    const colup = new Vec3(108, 166, 251);

    export class Scene {
        objs: Object[] = []
        AddObject(obj: Object) {
            this.objs.push(obj);
        }
        HitObjects(ray: Ray, t_min: number = 0, t_max: number = 99999999): Hit | null {
            var hit: Hit | null = null;
            this.objs.forEach(obj => {
                var temp_hit = obj.hit(ray, t_min, t_max);
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
            var t = (y + view_h / 2) / view_h;
            return add(multiply(coldown, 1 - t), multiply(colup, t));
        }

        GetColor(scenePos: Vec3,hit: Hit|null):Vec3 {
            if (hit === null) {
                return this.ambient(scenePos);
            } else {
                var ncolor = multiply(hit.N, 255.999);
                ncolor.Clamp();
                return ncolor;
            }
        }
    }
}