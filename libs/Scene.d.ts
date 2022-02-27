declare namespace App {
    import Object = FrameWork.Object;
    import Hit = FrameWork.Hit;
    import Ray = FrameWork.Ray;
    import Vec3 = FrameWork.Vec3;
    class Scene {
        objs: Object[];
        AddObject(obj: Object): void;
        HitObjects(ray: Ray, t_min?: number, t_max?: number): Hit | null;
        private ambient;
        GetColor(scenePos: Vec3, hit: Hit | null): Vec3;
    }
}
