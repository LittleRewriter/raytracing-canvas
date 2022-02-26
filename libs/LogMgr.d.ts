declare namespace FrameWork {
    class LogMgr {
        private static isDebug;
        static info(msg: any): void;
        static warn(msg: any): void;
        static error(msg: any): void;
    }
}
