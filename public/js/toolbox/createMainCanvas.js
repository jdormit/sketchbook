define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var calculateAdjSize = function (width, height, p) {
        var adjWidth = window.innerWidth - 20 < width ? window.innerWidth - 20 : width;
        var adjHeight = window.innerWidth - 20 < width
            ? Math.floor(height / width * adjWidth)
            : height;
        return [adjWidth, adjHeight];
    };
    function createMainCanvas(p, width, height) {
        if (width === void 0) { width = 1024; }
        if (height === void 0) { height = 768; }
        var maybeCvs = document.getElementById("mainCanvas");
        if (maybeCvs && maybeCvs.parentElement) {
            maybeCvs.parentElement.removeChild(maybeCvs);
        }
        var _a = calculateAdjSize(width, height, p), adjWidth = _a[0], adjHeight = _a[1];
        var cvs = p.createCanvas(adjWidth, adjHeight);
        cvs.elt.id = "mainCanvas";
        p.windowResized = function () {
            var _a = calculateAdjSize(width, height, p), adjWidth = _a[0], adjHeight = _a[1];
            if (adjWidth !== p.width || adjHeight !== p.height) {
                p.resizeCanvas(adjWidth, adjHeight);
            }
        };
        return cvs;
    }
    exports.default = createMainCanvas;
});
