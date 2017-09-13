import createMainCanvas from "../toolbox/createMainCanvas";

export default function randomCircles(seed: string) {
    return p => {
        p.setup = () => {
            p.noLoop();
            p.randomSeed(seed);
            const cvs = createMainCanvas(p);
        };

        p.draw = () => {
            for (let i = 0; i < 100; i++) {
                p.ellipse(
                    p.randomGaussian(p.width / 2, p.width / 4),
                    p.randomGaussian(p.height / 2, p.height / 4),
                    p.random(10, 40)
                );
            }
        };
    };
}
