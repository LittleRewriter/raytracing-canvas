namespace FrameWork {
    interface CameraProps {
        look_origin?: Vec3,
        look_at?: Vec3,
        field_of_view?: number,
        aspect_ratio?: number,
        vup?: Vec3,
        focus_distance?: number,
        aperture?: number
    }

    export class Camera {
        pos: Vec3;
        asp_ratio: number;
        fov: number;
        vup: Vec3
        look_at: Vec3;
        vw: number;
        vh: number;
        hor: Vec3;
        ver: Vec3;
        hor_axis: Vec3;
        ver_axis: Vec3;
        left_down: Vec3;
        len_radius: number;

        
        constructor(prop: CameraProps = {}) {
            this.asp_ratio = prop.aspect_ratio || 4 / 3.0;
            this.look_at = prop.look_at || new Vec3(0, 0, 1);
            this.vup = prop.vup || new Vec3(0, 1, 0);
            this.pos = prop.look_origin || new Vec3(0, 0, 0);
            this.fov = prop.field_of_view || 90;
            this.len_radius = (prop.aperture || 0) / 2;

            var deg_fov = this.fov / 180 * Math.PI;
            var h = Math.tan(deg_fov / 2);
            this.vh = 2 * h;
            this.vw = this.asp_ratio * this.vh;

            var w = normalize(this.look_at);
            var u = normalize(crossProduct(this.vup, w));
            var v = crossProduct(w, u);
            this.hor_axis = u;
            this.ver_axis = v;
            var focus = prop.focus_distance || 1;

            this.hor = multiply(u, this.vw);
            this.ver = multiply(v, this.vh);
            this.left_down = minus(minus(minus(this.pos, divide(this.hor, 2)), divide(this.ver, 2)), w);
        }

        GetRay(u: number, v: number): Ray {
            var samp = multiply(sampleDisk(), this.len_radius);
            var off = add(multiply(this.hor_axis, samp.x), multiply(this.ver_axis, samp.y));
            var np = this.pos;
            var np = add(this.pos, off);
            var ndir = minus(add(add(this.left_down, multiply(this.ver, u)), multiply(this.hor, v)), np);
            return new Ray(np, ndir);
        } 

    }
}