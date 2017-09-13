import createMainCanvas from "../toolbox/createMainCanvas";

/*
  The idea here is a rectangle subdivision algorithm. It starts with one big rectangle, the whole canvas.
  It subdivides that rectangle into either 2 or 4 sub-rectangles of a random size. Each of these subdivisions
  has a chance to get subdivided. This chance decreases with the number of iterations. Once the algorithm has
  finished, the rectangles get rendered. The rendering algorithm goes something like, choose either white (likely),
  red, blue, or yellow (much less likely). Render a black rectangle the full size of the rectangle, then a {color}
  rectangle x pixels smaller, where x is the desired border size.

  TODO things to improve:
  - Color picking: initially colors should be more likely to be white, with the chance for choosing a particular other
  color increasing the longer that color is not picked
  - Borders: make borders uniform, don't allow double borders
  - Subdivision size: disallow tiny subdivided squares while maintaining a reasonable amount of subdivision. Maybe choosing
  a new width / height for subdivisions on a guassian scale instead of choosing an x/y?
*/

interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

type SubdivisionType = "HORIZONTAL" | "VERTICAL" | "BOTH";

const MIN_SIZE = 30;
const SUBDIVISION_FACTOR = 0.75;

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
    //    p.stroke(borderColor);
    //    p.fill(borderColor);
    //    p.rect(rect.x, rect.y, rect.width, rect.height);
    //    p.stroke(fillColor);
    //    p.fill(fillColor);
    //    p.rect(rect.x + borderSize, rect.y + borderSize, rect.width - (2 * borderSize), rect.height - (2 * borderSize));
    p.fill(fillColor);
    p.rect(rect.x, rect.y, rect.width, rect.height);
};

export default (title: string) => {
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
                if (height > rect.height) {
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
                if (width > rect.width) {
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
                if (width > rect.width || height > rect.height) {
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
                                rect.height + height,
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

            createMainCanvas(p);
            //            p.randomSeed(title);
            p.noLoop();
            p.background(colors.white);
        };

        p.draw = () => {
            const rects = subdivideRect(createRect(0, 0, p.width, p.height), 1);
            for (let rect of rects) {
                const color = p.random([
                    colors.yellow,
                    colors.red,
                    colors.blue,
                    colors.white,
                    colors.white,
                    colors.white,
                    colors.white
                ]);
                renderRect(rect, color, colors.black, 20, p);
            }
        };
    };
};
