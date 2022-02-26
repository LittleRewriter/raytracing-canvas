"use strict";
var FrameWork;
(function (FrameWork) {
    class LogMgr {
        static info(msg) {
            if (this.isDebug) {
                console.log(msg);
            }
        }
        static warn(msg) {
            if (this.isDebug) {
                console.warn(msg);
            }
        }
        static error(msg) {
            if (this.isDebug) {
                console.warn(msg);
            }
        }
    }
    LogMgr.isDebug = true;
    FrameWork.LogMgr = LogMgr;
})(FrameWork || (FrameWork = {}));
//# sourceMappingURL=LogMgr.js.map