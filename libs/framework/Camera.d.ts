declare namespace FrameWork {
    interface CameraProps {
        look_origin?: Vec3;
        look_at?: Vec3;
        field_of_view?: number;
        aspect_ratio?: number;
        vup?: Vec3;
        focus_distance?: number;
        aperture?: number;
    }
    export class Camera {
        pos: Vec3;
        asp_ratio: number;
        fov: number;
        vup: Vec3;
        look_at: Vec3;
        vw: number;
        vh: number;
        hor: Vec3;
        ver: Vec3;
        hor_axis: Vec3;
        ver_axis: Vec3;
        left_down: Vec3;
        len_radius: number;
        constructor(prop?: CameraProps);
        GetRay(u: number, v: number): Ray;
    }
    export {};
}
