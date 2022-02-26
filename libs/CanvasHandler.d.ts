declare namespace App {
    import Vec3 = FrameWork.Vec3;
    class CanvasHandler {
        canvasElement: HTMLCanvasElement;
        canvasContext: CanvasRenderingContext2D;
        tempData?: ImageData;
        width: number;
        height: number;
        constructor(canvasElement: HTMLCanvasElement);
        CreateTestCanvas(): void;
        SetCanvasSize(w: number, h: number): void;
        CreateFrame(): void;
        SetPixel(y: number, x: number, col: Vec3): void;
        UpdateFrame(): void;
    }
}
