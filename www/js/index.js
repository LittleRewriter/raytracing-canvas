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
    loadLib("./js/framework/Sphere.js")
    loadLib("./js/app/CanvasHandler.js")
    loadLib("./js/app/Scene.js")
    loadLib("./js/app/App.js")
}