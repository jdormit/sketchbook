import createMainCanvas from '../toolbox/createMainCanvas';

/*
  The idea here is a rectangle subdivision algorithm. It starts with one big rectangle, the whole canvas.
  It subdivides that rectangle into either 2 or 4 sub-rectangles of a random size. Each of these subdivisions
  has a chance to get subdivided. This chance decreases with the number of iterations. Once the algorithm has
  finished, the rectangles get rendered. The rendering algorithm goes something like, choose either white (likely),
  red, blue, or yellow (much less likely). Render a black rectangle the full size of the rectangle, then a {color}
  rectangle x pixels smaller, where x is the desired border size.
*/

interface Rect {
    x: number,
    y: number,
    width: number,
    height: number
}

type SubdivisionType = 'HORIZONTAL' | 'VERTICAL' | 'BOTH';

const SUBDIVIDE_SIZE_THRESHOLD = 10;

const createRect = (x: number, y: number, width: number, height: number) : Rect => {
    return {x, y, width, height};
}

const renderRect = (rect: Rect, fillColor: any, borderColor: any, borderSize: number, p: any) => {
    p.stroke(borderColor);
    p.fill(borderColor);
    p.rect(rect.x, rect.y, rect.width, rect.height);
    p.stroke(fillColor);
    p.fill(fillColor);
    p.rect(rect.x + borderSize, rect.y + borderSize, rect.width - (2 * borderSize), rect.height - (2 * borderSize));
}

export default (title: string) => {
    return p => {
        const subdivideRect = (rect: Rect, subdivisionChance: number) : Rect[] => {
            const rand = p.random();
            const shouldSubdivide = rand < subdivisionChance;
            if (!shouldSubdivide) {
                return [ rect ];
            }
            const subdivisionType : SubdivisionType = p.random(['HORIZONTAL', 'VERTICAL', 'BOTH']);
            if (subdivisionType === 'HORIZONTAL') {
                const y = p.random(rect.y, rect.y + rect.height);
                if (y - rect.y < SUBDIVIDE_SIZE_THRESHOLD) {
                    return [ rect ];
                }
                return subdivideRect(createRect(rect.x, rect.y, rect.width, y - rect.y), subdivisionChance / 2).concat(
                       subdivideRect(createRect(rect.x, y, rect.width, rect.height + rect.y - y), subdivisionChance / 2));
            } else if (subdivisionType === 'VERTICAL') {
                const x = p.random(rect.x, rect.x + rect.width);
                if (x - rect.x < SUBDIVIDE_SIZE_THRESHOLD) {
                    return [ rect ];
                }
                return subdivideRect(createRect(rect.x, rect.y, x - rect.x, rect.height), subdivisionChance / 2).concat(
                       subdivideRect(createRect(x, rect.y, rect.x + rect.width - x, rect.height), subdivisionChance / 2));
            } else {
                const x = p.random(rect.x, rect.x + rect.width);
                const y = p.random(rect.y, rect.y + rect.height);
                if (x - rect.x < SUBDIVIDE_SIZE_THRESHOLD || y - rect.y < SUBDIVIDE_SIZE_THRESHOLD) {
                    return [ rect ];
                }
                return subdivideRect(createRect(rect.x, rect.y, x - rect.x, y - rect.y), subdivisionChance / 2).concat(
                       subdivideRect(createRect(x, rect.y, rect.x + rect.width - x, y - rect.y), subdivisionChance / 2)).concat(
                       subdivideRect(createRect(rect.x, y, x - rect.x, rect.y + rect.height - y), subdivisionChance / 2)).concat(
                       subdivideRect(createRect(x, y, rect.x + rect.width - x, rect.y + rect.height - y), subdivisionChance / 2));
            }
        }

        const colors: any = {};
        p.setup = () => {
            colors.yellow = p.color('hsl(51, 78%, 68%)');
            colors.red = p.color('hsl(3, 79%, 48%)');
            colors.blue = p.color('hsl(205, 99%, 31%)');
            colors.black = p.color('hsl(140, 60%, 6%)');
            colors.white = p.color('hsl(60, 4%, 91%)');

            createMainCanvas(p);
//            p.randomSeed(title);
            p.noLoop();
            p.background(colors.white);
        }

        p.draw = () => {
            const rects = subdivideRect(createRect(0, 0, p.width, p.height), 2);
            for (let rect of rects) {
                const color = p.random([colors.yellow, colors.red, colors.blue, colors.white, colors.white, colors.white, colors.white]);
                renderRect(rect, color, colors.black, 20, p);
            }
        }
    }
}
