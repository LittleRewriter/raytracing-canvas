"use strict";
var App;
(function (App) {
    var Vec3 = FrameWork.Vec3;
    var add = FrameWork.add;
    var multiply = FrameWork.multiply;
    const coldown = new Vec3(219, 231, 234);
    const colup = new Vec3(108, 166, 251);
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
            var t = (y + App.view_h / 2) / App.view_h;
            return add(multiply(coldown, 1 - t), multiply(colup, t));
        }
        GetColor(scenePos, hit) {
            if (hit === null) {
                return this.ambient(scenePos);
            }
            else {
                var ncolor = multiply(hit.N, 255.999);
                ncolor.Clamp();
                return ncolor;
            }
        }
    }
    App.Scene = Scene;
})(App || (App = {}));
//# sourceMappingURL=Scene.js.map