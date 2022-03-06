"use strict";
var App;
(function (App_1) {
    var LogMgr = FrameWork.LogMgr;
    var Vec3 = FrameWork.Vec3;
    var Camera = FrameWork.Camera;
    var Sphere = FrameWork.Sphere;
    var Mirror = FrameWork.Mirror;
    var Glass = FrameWork.RealGlassMat;
    var Glossy = FrameWork.GlossyMat;
    var Diffuse = FrameWork.DiffuseMat;
    var add = FrameWork.add;
    App_1.width = 400;
    App_1.height = 300;
    App_1.asp_ratio = App_1.width / App_1.height;
    App_1.view_w = 2.0;
    App_1.view_h = App_1.view_w / App_1.asp_ratio;
    App_1.dep = 1.0;
    App_1.origin = new Vec3(0, 0, 0);
    App_1.MSAA_amount = 70;
    App_1.bounce_deep = 30;
    class App {
        static main() {
            var canvas = document.getElementsByTagName("canvas")[0];
            var handler = new App_1.CanvasHandler(canvas);
            handler.SetCanvasSize(App_1.width, App_1.height);
            handler.CreateFrame();
            var camera = new Camera({
                look_origin: new Vec3(-2, 2, 1),
                look_at: new Vec3(-1, 0, 1),
                field_of_view: 120,
                focus_distance: new Vec3(2, -2, 2.5).Magnitude(),
                aperture: .2
            });
            var scene = new App_1.Scene();
            var mat_ground = new Diffuse(new Vec3(.8, .8, 0));
            var mat_center = new Mirror(new Vec3(1.0, 1.0, 1.0));
            var mat_left = new Glass(1.5);
            var mat_right = new Glossy(new Vec3(.8, .6, .2), 100);
            var ground = new Sphere(new Vec3(0, -100.5, -1.5), 100, mat_ground);
            var sph_left = new Sphere(new Vec3(-1, 0, -1.5), .5, mat_left);
            var sph_left_bub = new Sphere(new Vec3(-1, 0, -1.5), -.4, mat_left);
            var sph_right = new Sphere(new Vec3(1, 0, -1.5), .5, mat_right);
            var sph_mid = new Sphere(new Vec3(0, 0, -1.5), .5, mat_center);
            scene.AddObject(ground);
            scene.AddObject(sph_left);
            scene.AddObject(sph_left_bub);
            scene.AddObject(sph_mid);
            scene.AddObject(sph_right);
            for (var i = 0; i < App_1.height; ++i) {
                for (var j = 0; j < App_1.width; ++j) {
                    var sumcol = new Vec3(0, 0, 0);
                    for (var spp = 0; spp < App_1.MSAA_amount; ++spp) {
                        var hrat = (i + Math.random()) / (App_1.height - 1);
                        var wrat = (j + Math.random()) / (App_1.width - 1);
                        var ray = camera.GetRay(hrat, wrat);
                        ray.dir.Normalize();
                        var col = scene.GetColor(ray, App_1.bounce_deep);
                        col.Clamp();
                        sumcol = add(sumcol, col);
                    }
                    sumcol.DivideScalar(App_1.MSAA_amount);
                    sumcol.GammaCorrection();
                    sumcol.Clamp();
                    sumcol.Multiply(255.999);
                    handler.SetPixel(i, j, sumcol);
                }
                if (i % 10 === 0) {
                    LogMgr.info(i);
                }
            }
            handler.UpdateFrame();
        }
    }
    App_1.App = App;
    App.main();
})(App || (App = {}));
//# sourceMappingURL=App.js.map