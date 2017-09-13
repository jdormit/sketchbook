define(["require", "exports", "../lib/p5", "../toolbox/createMainCanvas"], function (require, exports, p5, createMainCanvas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function splatter1(seed) {
        return function (p) {
            var debounce = false;
            p.setup = function () {
                p.randomSeed(seed);
                createMainCanvas_1.default(p);
            };
            p.draw = function () {
                if (p.mouseIsPressed && !debounce) {
                    debounce = true;
                    var numRays = p.random(3, 6);
                    for (var i = 0; i < numRays; i++) {
                        var angle = p.random(0, 360);
                        var vec = p5.Vector.fromAngle(p.radians(angle));
                        var slope = vec.y / vec.x;
                        var numCircles = p.random(3, 8);
                        for (var i_1 = 0; i_1 < numCircles; i_1++) {
                            var size = p.random(5, 15);
                            var y = p.mouseY + p.randomGaussian(0, 25);
                            var x = slope * (y - p.mouseY) + p.mouseX;
                            p.ellipse(x, y, size, size);
                        }
                    }
                    setTimeout(function () { return (debounce = false); }, 100);
                }
            };
        };
    }
    exports.default = splatter1;
});
