function loadLib(url) {
    var script = document.createElement("script")
    script.async = false
    script.src = url
    document.body.appendChild(script)
}

window.onload = function () {
    loadLib("./js/framework/LogMgr.js")
    loadLib("./js/framework/Vec3.js")
    loadLib("./js/framework/Ray.js")
    loadLib("./js/framework/Hit.js")
    loadLib("./js/framework/Tools.js")
    loadLib("./js/framework/Material.js")
    loadLib("./js/framework/Mirror.js")
    loadLib("./js/framework/Glass.js")
    loadLib("./js/framework/RealGlass.js")
    loadLib("./js/framework/Glossy.js")
    loadLib("./js/framework/Diffuse.js")
    loadLib("./js/framework/Sphere.js")
    loadLib("./js/app/CanvasHandler.js")
    loadLib("./js/app/Scene.js")
    loadLib("./js/app/App.js")
}