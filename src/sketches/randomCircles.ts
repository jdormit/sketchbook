import createMainCanvas from '../toolbox/createMainCanvas';

export default function randomCircles(title: string) {
    return p => {
        p.setup = () => {
            p.noLoop();
            p.randomSeed(title);
            p.noFill();
            const cvs = createMainCanvas(p, 1024, 768);
        };

        p.draw = () => {
            for (let i = 0; i < 100; i++) {
                p.ellipse(p.randomGaussian(0, p.width / 2),
                          p.randomGaussian(0, p.height / 2),
                          p.random(30, 80),
                          p.random(30, 80)
                         )
            }
        };
    }
}
