"use strict";
var FrameWork;
(function (FrameWork) {
    class Ray {
        constructor(origin, dir) {
            this.origin = origin;
            this.dir = dir;
        }
        At(t) {
            return FrameWork.add(this.origin, FrameWork.multiply(this.dir, t));
        }
    }
    FrameWork.Ray = Ray;
})(FrameWork || (FrameWork = {}));
//# sourceMappingURL=Ray.js.map