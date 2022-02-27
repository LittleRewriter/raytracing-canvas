namespace App {
    import LogMgr = FrameWork.LogMgr;
    import Vec3 = FrameWork.Vec3;
    import Ray = FrameWork.Ray;
    import add = FrameWork.add;
    import wiseProduct = FrameWork.wiseProduct;
    import minus = FrameWork.minus;
    import multiply = FrameWork.multiply;
    import divide = FrameWork.divide;
    import dotProduct = FrameWork.dotProduct;
    import crossProduct = FrameWork.crossProduct;
    import normalize = FrameWork.normalize;
    
    // color of sky to lerp
    const coldown = new Vec3(219, 231, 234);
    const colup = new Vec3(108, 166, 251);
    // scene width, height
    const width = 400;
    const height = 300;
    const asp_ratio = width / height;
    // view of camera size
    const view_w = 2.0;
    const view_h = asp_ratio * view_w;
    // camera position
    const dep = 1.0;
    const origin = new Vec3(0, 0, 0);
    export class App {
        // Calculate the ambient color for sky
        private static ambient(r: Ray): Vec3 {
            var y = r.dir.y;
            var t = (y + view_h / 2) / view_h;
            return add(multiply(coldown, 1 - t), multiply(colup, t));
        }
        public static main() {
            // initialize the canvas
            var canvas = document.getElementsByTagName("canvas")[0];
            var handler = new CanvasHandler(canvas);
            
            // set the canvas parameters
            handler.SetCanvasSize(width, height);
            handler.CreateFrame();
            const ld_vec = minus(origin, new Vec3(view_w / 2, view_h / 2, dep));
            
            // fill the color in canvas
            for (var i = 0; i < height; ++i) {
                for (var j = 0; j < width; ++j) {
                    var hrat = i / (height - 1);
                    var wrat = j / (width - 1);
                    var newvec = add(ld_vec, new Vec3(view_w * wrat, view_h * hrat, 0));
                    var ray = new Ray(origin, newvec);
                    var col = this.ambient(ray);
                    col.Clamp();
                    handler.SetPixel(i, j, col);
                }
            }

            // update canvas status
            handler.UpdateFrame();
        }
    }
    App.main();
}