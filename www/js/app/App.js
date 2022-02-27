"use strict";
var App;
(function (App_1) {
    var Vec3 = FrameWork.Vec3;
    var Ray = FrameWork.Ray;
    var add = FrameWork.add;
    var minus = FrameWork.minus;
    var multiply = FrameWork.multiply;
    const coldown = new Vec3(219, 231, 234);
    const colup = new Vec3(108, 166, 251);
    const width = 400;
    const height = 300;
    const asp_ratio = width / height;
    const view_w = 2.0;
    const view_h = asp_ratio * view_w;
    const dep = 1.0;
    const origin = new Vec3(0, 0, 0);
    class App {
        static ambient(r) {
            var y = r.dir.y;
            var t = (y + view_h / 2) / view_h;
            return add(multiply(coldown, 1 - t), multiply(colup, t));
        }
        static main() {
            var canvas = document.getElementsByTagName("canvas")[0];
            var handler = new App_1.CanvasHandler(canvas);
            handler.SetCanvasSize(width, height);
            handler.CreateFrame();
            const ld_vec = minus(origin, new Vec3(view_w / 2, view_h / 2, dep));
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
            handler.UpdateFrame();
        }
    }
    App_1.App = App;
    App.main();
})(App || (App = {}));
//# sourceMappingURL=App.js.map