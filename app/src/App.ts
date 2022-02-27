namespace App {
    import LogMgr = FrameWork.LogMgr;
    import Vec3 = FrameWork.Vec3;
    import Ray = FrameWork.Ray;
    import Sphere = FrameWork.Sphere;
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
    export const MSAA_amount = 30;
    export class App {
        
        public static main() {
            // initialize the canvas
            var canvas = document.getElementsByTagName("canvas")[0];
            var handler = new CanvasHandler(canvas);
            
            // set the canvas parameters
            handler.SetCanvasSize(width, height);
            handler.CreateFrame();
            const ld_vec = minus(origin, new Vec3(view_w / 2, view_h / 2, dep));

            // create scene and add
            var scene = new Scene();
            var sphere = new Sphere(new Vec3(0, 0, -1), .3);
            var sphere2 = new Sphere(new Vec3(0, -100.5, -1), 100);
            scene.AddObject(sphere);
            scene.AddObject(sphere2);
            
            // fill the color in canvas
            for (var i = 0; i < height; ++i) {
                for (var j = 0; j < width; ++j) {
                    var sumcol = new Vec3(0, 0, 0);
                    for (var spp = 0; spp < MSAA_amount; ++spp) {
                        var hrat = (i + Math.random()) / (height - 1);
                        var wrat = (j + Math.random()) / (width - 1);
                        var newvec = add(ld_vec, new Vec3(view_w * wrat, view_h * hrat, 0));
                        var ray = new Ray(origin, newvec);
                        ray.dir.Normalize();
                        var hit = scene.HitObjects(ray);
                        var col = scene.GetColor(newvec, hit);
                        col.Clamp();
                        sumcol = add(sumcol, col);
                    }
                    sumcol.DivideScalar(MSAA_amount);
                    handler.SetPixel(i, j, sumcol);
                }
            }

            // update canvas status
            handler.UpdateFrame();
        }
    }
    App.main();
}