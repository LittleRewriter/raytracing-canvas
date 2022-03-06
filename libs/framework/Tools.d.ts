declare namespace FrameWork {
    function normToWorld(ray: Vec3, N: Vec3): Vec3;
    function randHemisphere(): Vec3;
    function unitSample(N: Vec3): Vec3;
    function sampleDisk(): Vec3;
    function randCone(theta: number): Vec3;
    function reflectRay(L: Vec3, N: Vec3): Vec3;
    function refractRay(L: Vec3, N: Vec3, ind_ratio: number): Vec3;
    function fresnelRefract(L: Vec3, N: Vec3, ind_ratio: number): Vec3;
    function schlickApproximation(costheta: number, ind_ratio: number): number;
}
