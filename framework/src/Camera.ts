namespace FrameWork {

    interface CameraProps {
        look_origin?: Vec3,
        look_at?: Vec3,
        field_of_view?: number,
        aspect_ratio?: number,
        vup?: Vec3,
        depth_of_view?: number
    }

    export class Camera {
        pos: Vec3;
        dep: number;
        asp_ratio: number;
        fov: number;
        vup: Vec3
        look_at: Vec3;

        constructor(prop: CameraProps) {
            this.asp_ratio = prop.aspect_ratio || 4 / 3.0;
            this.look_at = prop.look_at || new Vec3(0, 0, -1);
            this.dep = prop.depth_of_view || 1;
            this.vup = prop.vup || new Vec3(0, 0, 1);
            this.pos = prop.look_origin || new Vec3(0, 0, 0);
            this.fov = prop.field_of_view || 90;
        }

    }
}