define(["require", "exports", "../toolbox/createMainCanvas"], function (require, exports, createMainCanvas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MIN_SIZE = 30;
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
                    var height = Math.max(MIN_SIZE, p.randomGaussian(rect.height / 2, rect.height / 4));
                    if (height > rect.height) {
                        // If we get an invalid height, try again
                        return subdivideRect(rect, subdivisionChance);
                    }
                    return subdivideRect(createRect(rect.x, rect.y, rect.width, height), subdivisionChance / 2).concat(subdivideRect(createRect(rect.x, rect.y + height, rect.width, rect.height - height), subdivisionChance / 2));
                }
                else if (subdivisionType === 'VERTICAL') {
                    var width = Math.max(MIN_SIZE, p.randomGaussian(rect.width / 2, rect.width / 4));
                    if (width > rect.width) {
                        // Try again
                        return subdivideRect(rect, subdivisionChance);
                    }
                    return subdivideRect(createRect(rect.x, rect.y, width, rect.height), subdivisionChance / 2).concat(subdivideRect(createRect(rect.x + width, rect.y, rect.width - width, rect.height), subdivisionChance / 2));
                }
                else {
                    var width = Math.max(MIN_SIZE, p.randomGaussian(rect.width / 2, rect.width / 4));
                    var height = Math.max(MIN_SIZE, p.randomGaussian(rect.height / 2, rect.height / 4));
                    if (width > rect.width || height > rect.height) {
                        // Try again
                        return subdivideRect(rect, subdivisionChance);
                    }
                    return subdivideRect(createRect(rect.x, rect.y, width, height), subdivisionChance / 2).concat(subdivideRect(createRect(rect.x + width, rect.y, rect.width - width, height), subdivisionChance / 2)).concat(subdivideRect(createRect(rect.x, rect.y + height, width, rect.height - height), subdivisionChance / 2)).concat(subdivideRect(createRect(rect.x + width, rect.height + height, rect.width - width, rect.height - height), subdivisionChance / 2));
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
