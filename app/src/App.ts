namespace App {
    import LogMgr = FrameWork.LogMgr;
    import Vec3 = FrameWork.Vec3;
    export class App {
        public static main() {
            var canvas = document.getElementsByTagName("canvas")[0];
            var handler = new CanvasHandler(canvas);
            handler.SetCanvasSize(400, 400);
            handler.CreateTestCanvas();
        }
    }
    App.main();
}