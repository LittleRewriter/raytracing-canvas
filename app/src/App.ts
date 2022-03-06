namespace App {
    import LogMgr = FrameWork.LogMgr;
    import Vec3 = FrameWork.Vec3;
    import Ray = FrameWork.Ray;
    import Camera = FrameWork.Camera;
    import Sphere = FrameWork.Sphere;
    import Mirror = FrameWork.Mirror;
    import Glass = FrameWork.RealGlassMat;
    import Glossy = FrameWork.GlossyMat;
    import Diffuse = FrameWork.DiffuseMat;
    import add = FrameWork.add;
    import wiseProduct = FrameWork.wiseProduct;
    import minus = FrameWork.minus;
    import multiply = FrameWork.multiply;
    import divide = FrameWork.divide;
    import dotProduct = FrameWork.dotProduct;
    import crossProduct = FrameWork.crossProduct;
    import normalize = FrameWork.normalize;
    
    // scene width, height
    export const width = 400;
    export const height = 300;
    export const asp_ratio = width / height;
    // view of camera size
    export const view_w = 2.0;
    export const view_h = view_w / asp_ratio;
    // camera position
    export const dep = 1.0;
    export const origin = new Vec3(0, 0, 0);
    export const MSAA_amount = 70;
    export const bounce_deep = 30;
    export class App {

        public static main() {
            // initialize the canvas
            var canvas = document.getElementsByTagName("canvas")[0];
            var handler = new CanvasHandler(canvas);
            
            // set the canvas parameters
            handler.SetCanvasSize(width, height);
            handler.CreateFrame();

            var camera = new Camera({
                look_origin: new Vec3(-2, 2, 1),
                look_at: new Vec3(-1, 0, 1),
                field_of_view: 120,
                focus_distance: new Vec3(2, -2, 2.5).Magnitude(),
                aperture: .2
            });

            // create scene and add
            var scene = new Scene();

            var mat_ground = new Diffuse(new Vec3(.8, .8, 0));
            //var mat_center = new Diffuse(new Vec3(.7, .3, .3));
            //var mat_left = new Glossy(new Vec3(.8, .8, .8), 20);
            //var mat_center = new Glass(1.5);
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
            
            // fill the color in canvas
            for (var i = 0; i < height; ++i) {
                for (var j = 0; j < width; ++j) {
                    var sumcol = new Vec3(0, 0, 0);
                    for (var spp = 0; spp < MSAA_amount; ++spp) {
                        var hrat = (i + Math.random()) / (height - 1);
                        var wrat = (j + Math.random()) / (width - 1);
                        var ray = camera.GetRay(hrat, wrat);
                        ray.dir.Normalize();
                        var col = scene.GetColor(ray, bounce_deep);
                        col.Clamp();
                        sumcol = add(sumcol, col);
                    }
                    sumcol.DivideScalar(MSAA_amount);
                    sumcol.GammaCorrection();
                    sumcol.Clamp();
                    sumcol.Multiply(255.999);
                    handler.SetPixel(i, j, sumcol);
                }
                if (i % 10 === 0) {
                    LogMgr.info(i);
                }
            }
            // update canvas status
            handler.UpdateFrame();
        }
    }
    App.main();
}