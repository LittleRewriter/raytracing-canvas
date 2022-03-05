"use strict";
var App;
(function (App) {
    var Vec3 = FrameWork.Vec3;
    var add = FrameWork.add;
    var multiply = FrameWork.multiply;
    const coldown = new Vec3(255, 255, 255);
    const colup = new Vec3(128, 179, 255);
    class Scene {
        constructor() {
            this.objs = [];
        }
        AddObject(obj) {
            this.objs.push(obj);
        }
        HitObjects(ray, t_min = 0, t_max = 99999999) {
            var hit = null;
            this.objs.forEach(obj => {
                var temp_hit = obj.hit(ray, t_min, t_max);
                if (temp_hit !== null) {
                    if (hit === null || temp_hit.t < hit.t) {
                        hit = temp_hit;
                    }
                }
            });
            return hit;
        }
        ambient(scenePos) {
            var y = scenePos.y;
            var t = (y + 1.0) * .5;
            return add(multiply(coldown, 1 - t), multiply(colup, t));
        }
        GetColor(ray, dep) {
            var hit = this.HitObjects(ray, .01);
            if (dep < 0) {
                return new Vec3(0, 0, 0);
            }
            if (hit !== null) {
                var nr = hit.O;
                return multiply(this.GetColor(nr, dep - 1), .5);
            }
            return this.ambient(ray.dir);
        }
    }
    App.Scene = Scene;
})(App || (App = {}));
//# sourceMappingURL=Scene.js.map