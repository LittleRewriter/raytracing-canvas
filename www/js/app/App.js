"use strict";
var App;
(function (App_1) {
    var Vec3 = FrameWork.Vec3;
    var Ray = FrameWork.Ray;
    var Sphere = FrameWork.Sphere;
    var add = FrameWork.add;
    var minus = FrameWork.minus;
    App_1.width = 400;
    App_1.height = 300;
    App_1.asp_ratio = App_1.width / App_1.height;
    App_1.view_w = 2.0;
    App_1.view_h = App_1.view_w / App_1.asp_ratio;
    App_1.dep = 1.0;
    App_1.origin = new Vec3(0, 0, 0);
    App_1.MSAA_amount = 30;
    class App {
        static main() {
            var canvas = document.getElementsByTagName("canvas")[0];
            var handler = new App_1.CanvasHandler(canvas);
            handler.SetCanvasSize(App_1.width, App_1.height);
            handler.CreateFrame();
            const ld_vec = minus(App_1.origin, new Vec3(App_1.view_w / 2, App_1.view_h / 2, App_1.dep));
            var scene = new App_1.Scene();
            var sphere = new Sphere(new Vec3(0, 0, -1), .3);
            var sphere2 = new Sphere(new Vec3(0, -100.5, -1), 100);
            scene.AddObject(sphere);
            scene.AddObject(sphere2);
            for (var i = 0; i < App_1.height; ++i) {
                for (var j = 0; j < App_1.width; ++j) {
                    var hrat = i / (App_1.height - 1);
                    var wrat = j / (App_1.width - 1);
                    var newvec = add(ld_vec, new Vec3(App_1.view_w * wrat, App_1.view_h * hrat, 0));
                    var ray = new Ray(App_1.origin, newvec);
                    ray.dir.Normalize();
                    var hit = scene.HitObjects(ray);
                    var col = scene.GetColor(newvec, hit);
                    col.Clamp();
                    handler.SetPixel(i, j, col);
                }
            }
            handler.UpdateFrame();
        }
    }
    App_1.App = App;
    App.main();
})(App || (App = {}));
//# sourceMappingURL=App.js.map