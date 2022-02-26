namespace FrameWork {
    export class LogMgr {
        private static isDebug : boolean = true;
        public static info(msg: any) {
            if (this.isDebug) {
                console.log(msg);
            }
        }
        public static warn(msg: any) {
            if (this.isDebug) {
                console.warn(msg);                
            }
        }
        public static error(msg: any) {
            if (this.isDebug) {
                console.warn(msg);
            }
        }
    }
}