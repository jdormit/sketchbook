import createMainCanvas from "../toolbox/createMainCanvas";

/*
  The idea here is a rectangle subdivision algorithm. It starts with one big rectangle, the whole canvas.
  It subdivides that rectangle into either 2 or 4 sub-rectangles of a random size. Each of these subdivisions
  has a chance to get subdivided. This chance decreases with the number of iterations. Once the algorithm has
  finished, the rectangles get rendered. The rendering algorithm goes something like, choose either white (likely),
  red, blue, or yellow (much less likely). Render a black rectangle the full size of the rectangle, then a {color}
  rectangle x pixels smaller, where x is the desired border size.

  TODO things to improve:
  - Color picking: I'm thinking about an algorithm where one square is initially selected to be colored, then it
  traversed the graph of neighbors. Each neighbor has a chance to get colored, that chance starts low but gets higher
  it its neighbors are not colored
*/

interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

type SubdivisionType = "HORIZONTAL" | "VERTICAL" | "BOTH";

const MIN_SIZE = 50;
const SUBDIVISION_FACTOR = 0.75;
const BORDER_SIZE = 10;
const SMALL_BORDER_THRESHOLD = 512;
const PERCENT_COLOR = 0.3;

const createRect = (
    x: number,
    y: number,
    width: number,
    height: number
): Rect => {
    return { x, y, width, height };
};

const renderRect = (
    rect: Rect,
    fillColor: any,
    borderColor: any,
    borderSize: number,
    p: any
) => {
    p.stroke(borderColor);
    p.fill(borderColor);
    p.rect(rect.x, rect.y, rect.width, rect.height);
    p.stroke(fillColor);
    p.fill(fillColor);
    p.rect(
        rect.x + borderSize,
        rect.y + borderSize,
        rect.width - 2 * borderSize,
        rect.height - 2 * borderSize
    );
};

export default (seed: string) => {
    return p => {
        const subdivideRect = (
            rect: Rect,
            subdivisionChance: number
        ): Rect[] => {
            const rand = p.random();
            const shouldSubdivide = rand < subdivisionChance;
            if (!shouldSubdivide) {
                return [rect];
            }
            const subdivisionType: SubdivisionType = p.random([
                "HORIZONTAL",
                "VERTICAL",
                "BOTH"
            ]);
            if (subdivisionType === "HORIZONTAL") {
                const height = Math.max(
                    MIN_SIZE,
                    p.randomGaussian(rect.height / 2, rect.height / 4)
                );
                if (
                    height > rect.height ||
                    height < MIN_SIZE ||
                    rect.height - height < MIN_SIZE
                ) {
                    // If we get an invalid height, try again
                    return subdivideRect(rect, subdivisionChance);
                }
                return subdivideRect(
                    createRect(rect.x, rect.y, rect.width, height),
                    subdivisionChance * SUBDIVISION_FACTOR
                ).concat(
                    subdivideRect(
                        createRect(
                            rect.x,
                            rect.y + height,
                            rect.width,
                            rect.height - height
                        ),
                        subdivisionChance * SUBDIVISION_FACTOR
                    )
                );
            } else if (subdivisionType === "VERTICAL") {
                const width = Math.max(
                    MIN_SIZE,
                    p.randomGaussian(rect.width / 2, rect.width / 4)
                );
                if (
                    width > rect.width ||
                    width < MIN_SIZE ||
                    rect.width - width < MIN_SIZE
                ) {
                    // Try again
                    return subdivideRect(rect, subdivisionChance);
                }
                return subdivideRect(
                    createRect(rect.x, rect.y, width, rect.height),
                    subdivisionChance * SUBDIVISION_FACTOR
                ).concat(
                    subdivideRect(
                        createRect(
                            rect.x + width,
                            rect.y,
                            rect.width - width,
                            rect.height
                        ),
                        subdivisionChance * SUBDIVISION_FACTOR
                    )
                );
            } else {
                const width = Math.max(
                    MIN_SIZE,
                    p.randomGaussian(rect.width / 2, rect.width / 4)
                );
                const height = Math.max(
                    MIN_SIZE,
                    p.randomGaussian(rect.height / 2, rect.height / 4)
                );
                if (
                    width > rect.width ||
                    height > rect.height ||
                    width < MIN_SIZE ||
                    height < MIN_SIZE ||
                    rect.width - width < MIN_SIZE ||
                    rect.height - height < MIN_SIZE
                ) {
                    // Try again
                    return subdivideRect(rect, subdivisionChance);
                }
                return subdivideRect(
                    createRect(rect.x, rect.y, width, height),
                    subdivisionChance * SUBDIVISION_FACTOR
                )
                    .concat(
                        subdivideRect(
                            createRect(
                                rect.x + width,
                                rect.y,
                                rect.width - width,
                                height
                            ),
                            subdivisionChance * SUBDIVISION_FACTOR
                        )
                    )
                    .concat(
                        subdivideRect(
                            createRect(
                                rect.x,
                                rect.y + height,
                                width,
                                rect.height - height
                            ),
                            subdivisionChance * SUBDIVISION_FACTOR
                        )
                    )
                    .concat(
                        subdivideRect(
                            createRect(
                                rect.x + width,
                                rect.y + height,
                                rect.width - width,
                                rect.height - height
                            ),
                            subdivisionChance * SUBDIVISION_FACTOR
                        )
                    );
            }
        };

        const colors: any = {};
        p.setup = () => {
            colors.yellow = p.color("hsl(51, 78%, 68%)");
            colors.red = p.color("hsl(3, 79%, 48%)");
            colors.blue = p.color("hsl(205, 99%, 31%)");
            colors.black = p.color("hsl(140, 60%, 6%)");
            colors.white = p.color("hsl(60, 4%, 91%)");

            p.randomSeed(seed);
            console.log("Seed: " + seed);
            createMainCanvas(p);
            p.noLoop();
        };

        p.draw = () => {
            p.background(colors.black);
            const borderSize =
                window.innerWidth < SMALL_BORDER_THRESHOLD
                    ? BORDER_SIZE / 2
                    : BORDER_SIZE;
            const rects = subdivideRect(
                createRect(
                    borderSize,
                    borderSize,
                    p.width - borderSize * 2,
                    p.height - borderSize * 2
                ),
                1
            );
            let numColored = Math.ceil(rects.length * PERCENT_COLOR);
            let numRed = Math.ceil(numColored / 3);
            let numBlue = Math.ceil(numColored / 3);
            let numYellow = numColored - numRed - numBlue;
            const colorIdxs: number[] = [];
            while (numColored > 0) {
                const idx = p.random(rects.map((rect, i) => i));
                if (colorIdxs.indexOf(idx) === -1) {
                    colorIdxs.push(idx);
                    numColored--;
                }
            }
            rects.forEach((rect, i) => {
                let color = colors.white;
                if (colorIdxs.indexOf(i) !== -1) {
                    // There's got to be a better way...
                    if (numRed > 0 && numYellow > 0 && numBlue > 0) {
                        color = p.random([
                            colors.yellow,
                            colors.blue,
                            colors.red
                        ]);
                    } else if (numRed == 0 && numYellow > 0 && numBlue > 0) {
                        color = p.random([colors.yellow, colors.blue]);
                    } else if (numRed > 0 && numYellow == 0 && numBlue > 0) {
                        color = p.random([colors.blue, colors.red]);
                    } else if (numRed > 0 && numYellow > 0 && numBlue == 0) {
                        color = p.random([colors.yellow, colors.red]);
                    } else if (numRed == 0 && numYellow == 0 && numBlue > 0) {
                        color = colors.blue;
                    } else if (numRed == 0 && numYellow > 0 && numBlue == 0) {
                        color = colors.yellow;
                    } else if (numRed > 0 && numYellow == 0 && numBlue == 0) {
                        color = colors.red;
                    }
                    switch (color) {
                        case colors.red:
                            numRed--;
                            break;
                        case colors.yellow:
                            numYellow--;
                            break;
                        case colors.blue:
                            numBlue--;
                            break;
                    }
                }
                renderRect(rect, color, colors.black, borderSize, p);
            });
        };
    };
};
