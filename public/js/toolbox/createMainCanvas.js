define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createMainCanvas(p, width, height) {
        if (width === void 0) { width = 1024; }
        if (height === void 0) { height = 768; }
        var maybeCvs = document.getElementById("mainCanvas");
        if (maybeCvs && maybeCvs.parentElement) {
            maybeCvs.parentElement.removeChild(maybeCvs);
        }
        var cvs = p.createCanvas(width, height);
        cvs.elt.id = "mainCanvas";
        return cvs;
    }
    exports.default = createMainCanvas;
});
