define(["require", "exports", "../toolbox/createMainCanvas"], function (require, exports, createMainCanvas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function randomCircles(title) {
        return function (p) {
            p.setup = function () {
                p.noLoop();
                p.randomSeed(title);
                p.noFill();
                var cvs = createMainCanvas_1.default(p, 1024, 768);
            };
            p.draw = function () {
                for (var i = 0; i < 100; i++) {
                    p.ellipse(p.randomGaussian(0, p.width / 2), p.randomGaussian(0, p.height / 2), p.random(30, 80), p.random(30, 80));
                }
            };
        };
    }
    exports.default = randomCircles;
});
