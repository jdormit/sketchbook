define(["require", "exports", "../toolbox/createMainCanvas"], function (require, exports, createMainCanvas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function randomCircles(seed) {
        return function (p) {
            p.setup = function () {
                p.noLoop();
                p.randomSeed(seed);
                var cvs = createMainCanvas_1.default(p);
            };
            p.draw = function () {
                for (var i = 0; i < 100; i++) {
                    p.ellipse(p.randomGaussian(p.width / 2, p.width / 4), p.randomGaussian(p.height / 2, p.height / 4), p.random(10, 40));
                }
            };
        };
    }
    exports.default = randomCircles;
});
