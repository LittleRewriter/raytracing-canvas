namespace App {
    import LogMgr = FrameWork.LogMgr;
    import Vec3 = FrameWork.Vec3; 
    export class CanvasHandler {
        canvasElement: HTMLCanvasElement;
        canvasContext: CanvasRenderingContext2D;
        tempData?: ImageData;
        width: number;
        height: number;
        constructor(canvasElement: HTMLCanvasElement) {
            this.canvasElement = canvasElement;
            this.canvasContext = canvasElement.getContext("2d")!;
            this.width = canvasElement.width;
            this.height = canvasElement.height;
        }
        CreateTestCanvas() {
            this.CreateFrame();
            for (var i = 0; i < this.height; ++i) {
                for (var j = 0; j < this.width; ++j) {
                    var r = j / (this.width - 1);
                    var g = i / (this.height - 1);
                    var b = .25;
                    var col = new Vec3(
                        Math.trunc(r * 255.999),
                        Math.trunc(g * 255.999),
                        Math.trunc(b * 255.999));
                    this.SetPixel(i, j, col);
                }
            }
            this.UpdateFrame();
        }
        SetCanvasSize(w: number, h: number) {
            this.canvasElement.width = w;
            this.canvasElement.height = h;
            this.width = w;
            this.height = h;
        }
        CreateFrame() {
            var height = this.height;
            var width = this.width;
            var dataArr = this.canvasContext.createImageData(width, height);
            this.tempData = dataArr;
            for (var i = 0; i < dataArr.data.length; i += 4) {
                var id = i / 4;
                dataArr.data[id * 4 + 3] = 255;
            }
        }
        SetPixel(y: number, x: number, col: Vec3) {
            // reverse in vertical
            var revy = this.height - 1 - y;
            var id = revy * this.width + x;
            if (this.tempData === undefined) {
                this.CreateFrame()
            }
            this.tempData!.data[id * 4] = col.r;
            this.tempData!.data[id * 4 + 1] = col.g;
            this.tempData!.data[id * 4 + 2] = col.b;
        }
        UpdateFrame() {
            if (this.tempData !== undefined) {
                this.canvasContext.putImageData(this.tempData, 0, 0);
            }
        }
    }
}