"use strict";
var App;
(function (App_1) {
    class App {
        static main() {
            var canvas = document.getElementsByTagName("canvas")[0];
            var handler = new App_1.CanvasHandler(canvas);
            handler.SetCanvasSize(400, 400);
            handler.CreateTestCanvas();
        }
    }
    App_1.App = App;
    App.main();
})(App || (App = {}));
//# sourceMappingURL=App.js.map