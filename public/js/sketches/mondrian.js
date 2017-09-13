define(["require", "exports", "../toolbox/createMainCanvas"], function (require, exports, createMainCanvas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SUBDIVIDE_SIZE_THRESHOLD = 10;
    var createRect = function (x, y, width, height) {
        return { x: x, y: y, width: width, height: height };
    };
    var renderRect = function (rect, fillColor, borderColor, borderSize, p) {
        p.stroke(borderColor);
        p.fill(borderColor);
        p.rect(rect.x, rect.y, rect.width, rect.height);
        p.stroke(fillColor);
        p.fill(fillColor);
        p.rect(rect.x + borderSize, rect.y + borderSize, rect.width - (2 * borderSize), rect.height - (2 * borderSize));
    };
    exports.default = function (title) {
        return function (p) {
            var subdivideRect = function (rect, subdivisionChance) {
                var rand = p.random();
                var shouldSubdivide = rand < subdivisionChance;
                if (!shouldSubdivide) {
                    return [rect];
                }
                var subdivisionType = p.random(['HORIZONTAL', 'VERTICAL', 'BOTH']);
                if (subdivisionType === 'HORIZONTAL') {
                    var y = p.random(rect.y, rect.y + rect.height);
                    if (y - rect.y < SUBDIVIDE_SIZE_THRESHOLD) {
                        return [rect];
                    }
                    return subdivideRect(createRect(rect.x, rect.y, rect.width, y - rect.y), subdivisionChance / 2).concat(subdivideRect(createRect(rect.x, y, rect.width, rect.height + rect.y - y), subdivisionChance / 2));
                }
                else if (subdivisionType === 'VERTICAL') {
                    var x = p.random(rect.x, rect.x + rect.width);
                    if (x - rect.x < SUBDIVIDE_SIZE_THRESHOLD) {
                        return [rect];
                    }
                    return subdivideRect(createRect(rect.x, rect.y, x - rect.x, rect.height), subdivisionChance / 2).concat(subdivideRect(createRect(x, rect.y, rect.x + rect.width - x, rect.height), subdivisionChance / 2));
                }
                else {
                    var x = p.random(rect.x, rect.x + rect.width);
                    var y = p.random(rect.y, rect.y + rect.height);
                    if (x - rect.x < SUBDIVIDE_SIZE_THRESHOLD || y - rect.y < SUBDIVIDE_SIZE_THRESHOLD) {
                        return [rect];
                    }
                    return subdivideRect(createRect(rect.x, rect.y, x - rect.x, y - rect.y), subdivisionChance / 2).concat(subdivideRect(createRect(x, rect.y, rect.x + rect.width - x, y - rect.y), subdivisionChance / 2)).concat(subdivideRect(createRect(rect.x, y, x - rect.x, rect.y + rect.height - y), subdivisionChance / 2)).concat(subdivideRect(createRect(x, y, rect.x + rect.width - x, rect.y + rect.height - y), subdivisionChance / 2));
                }
            };
            var colors = {};
            p.setup = function () {
                colors.yellow = p.color('hsl(51, 78%, 68%)');
                colors.red = p.color('hsl(3, 79%, 48%)');
                colors.blue = p.color('hsl(205, 99%, 31%)');
                colors.black = p.color('hsl(140, 60%, 6%)');
                colors.white = p.color('hsl(60, 4%, 91%)');
                createMainCanvas_1.default(p);
                //            p.randomSeed(title);
                p.noLoop();
                p.background(colors.white);
            };
            p.draw = function () {
                var rects = subdivideRect(createRect(0, 0, p.width, p.height), 2);
                for (var _i = 0, rects_1 = rects; _i < rects_1.length; _i++) {
                    var rect = rects_1[_i];
                    var color = p.random([colors.yellow, colors.red, colors.blue, colors.white, colors.white, colors.white, colors.white]);
                    renderRect(rect, color, colors.black, 20, p);
                }
            };
        };
    };
});
