define(["require", "exports", "../toolbox/createMainCanvas"], function (require, exports, createMainCanvas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var particles = function (seed) {
        return function (p) {
            p.setup = function () {
                p.randomSeed(seed);
                var cvs = createMainCanvas_1.default(p);
            };
            p.draw = function () { };
        };
    };
});
