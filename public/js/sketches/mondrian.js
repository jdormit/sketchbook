define(["require", "exports", "../toolbox/createMainCanvas"], function (require, exports, createMainCanvas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = function (title) {
        return function (p) {
            var colors = {};
            p.setup = function () {
                colors.yellow = p.color('hsl(51, 78%, 68%)');
                colors.red = p.color('hsl(3, 79%, 48%)');
                colors.blue = p.color('hsl(205, 99%, 31%)');
                colors.black = p.color('hsl(140, 60%, 6%)');
                colors.white = p.color('hsl(60, 4%, 91%)');
                createMainCanvas_1.default(p);
                p.randomSeed(title);
                p.noLoop();
                p.background(colors.white);
            };
            p.draw = function () {
                p.fill(colors.red);
                p.stroke(colors.red);
                p.rect(0, 0, 512, 512);
            };
        };
    };
});
