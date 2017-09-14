define(["require", "exports", "../toolbox/createMainCanvas"], function (require, exports, createMainCanvas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MIN_SIZE = 50;
    var SUBDIVISION_FACTOR = 0.75;
    var BORDER_SIZE = 10;
    var SMALL_BORDER_THRESHOLD = 512;
    var PERCENT_COLOR = 0.2;
    var createRect = function (x, y, width, height) {
        return { x: x, y: y, width: width, height: height };
    };
    var renderRect = function (rect, fillColor, borderColor, borderSize, p) {
        p.stroke(borderColor);
        p.fill(borderColor);
        p.rect(rect.x, rect.y, rect.width, rect.height);
        p.stroke(fillColor);
        p.fill(fillColor);
        p.rect(rect.x + borderSize, rect.y + borderSize, rect.width - 2 * borderSize, rect.height - 2 * borderSize);
    };
    exports.default = function (seed) {
        return function (p) {
            var subdivideRect = function (rect, subdivisionChance) {
                var rand = p.random();
                var shouldSubdivide = rand < subdivisionChance;
                if (!shouldSubdivide) {
                    return [rect];
                }
                var subdivisionType = p.random([
                    "HORIZONTAL",
                    "VERTICAL",
                    "BOTH"
                ]);
                if (subdivisionType === "HORIZONTAL") {
                    var height = Math.max(MIN_SIZE, p.randomGaussian(rect.height / 2, rect.height / 4));
                    if (height > rect.height ||
                        height < MIN_SIZE ||
                        rect.height - height < MIN_SIZE) {
                        // If we get an invalid height, try again
                        return subdivideRect(rect, subdivisionChance);
                    }
                    return subdivideRect(createRect(rect.x, rect.y, rect.width, height), subdivisionChance * SUBDIVISION_FACTOR).concat(subdivideRect(createRect(rect.x, rect.y + height, rect.width, rect.height - height), subdivisionChance * SUBDIVISION_FACTOR));
                }
                else if (subdivisionType === "VERTICAL") {
                    var width = Math.max(MIN_SIZE, p.randomGaussian(rect.width / 2, rect.width / 4));
                    if (width > rect.width ||
                        width < MIN_SIZE ||
                        rect.width - width < MIN_SIZE) {
                        // Try again
                        return subdivideRect(rect, subdivisionChance);
                    }
                    return subdivideRect(createRect(rect.x, rect.y, width, rect.height), subdivisionChance * SUBDIVISION_FACTOR).concat(subdivideRect(createRect(rect.x + width, rect.y, rect.width - width, rect.height), subdivisionChance * SUBDIVISION_FACTOR));
                }
                else {
                    var width = Math.max(MIN_SIZE, p.randomGaussian(rect.width / 2, rect.width / 4));
                    var height = Math.max(MIN_SIZE, p.randomGaussian(rect.height / 2, rect.height / 4));
                    if (width > rect.width ||
                        height > rect.height ||
                        width < MIN_SIZE ||
                        height < MIN_SIZE ||
                        rect.width - width < MIN_SIZE ||
                        rect.height - height < MIN_SIZE) {
                        // Try again
                        return subdivideRect(rect, subdivisionChance);
                    }
                    return subdivideRect(createRect(rect.x, rect.y, width, height), subdivisionChance * SUBDIVISION_FACTOR)
                        .concat(subdivideRect(createRect(rect.x + width, rect.y, rect.width - width, height), subdivisionChance * SUBDIVISION_FACTOR))
                        .concat(subdivideRect(createRect(rect.x, rect.y + height, width, rect.height - height), subdivisionChance * SUBDIVISION_FACTOR))
                        .concat(subdivideRect(createRect(rect.x + width, rect.y + height, rect.width - width, rect.height - height), subdivisionChance * SUBDIVISION_FACTOR));
                }
            };
            var colors = {};
            p.setup = function () {
                colors.yellow = p.color("hsl(51, 78%, 68%)");
                colors.red = p.color("hsl(3, 79%, 48%)");
                colors.blue = p.color("hsl(205, 99%, 31%)");
                colors.black = p.color("hsl(140, 60%, 6%)");
                colors.white = p.color("hsl(60, 4%, 91%)");
                p.randomSeed(seed);
                console.log("Seed: " + seed);
                createMainCanvas_1.default(p);
                p.noLoop();
            };
            p.draw = function () {
                p.background(colors.black);
                var borderSize = window.innerWidth < SMALL_BORDER_THRESHOLD
                    ? BORDER_SIZE / 2
                    : BORDER_SIZE;
                var rects = subdivideRect(createRect(borderSize, borderSize, p.width - borderSize * 2, p.height - borderSize * 2), 1);
                var numColored = Math.floor(rects.length * PERCENT_COLOR);
                var colorIdxs = [];
                while (numColored > 0) {
                    var idx = p.random(rects.map(function (rect, i) { return i; }));
                    if (colorIdxs.indexOf(idx) === -1) {
                        colorIdxs.push(idx);
                        numColored--;
                    }
                }
                rects.forEach(function (rect, i) {
                    var color = colors.white;
                    if (colorIdxs.indexOf(i) !== -1) {
                        color = p.random([colors.yellow, colors.blue, colors.red]);
                    }
                    renderRect(rect, color, colors.black, borderSize, p);
                });
            };
        };
    };
});
