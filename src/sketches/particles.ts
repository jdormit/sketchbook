import createMainCanvas from "../toolbox/createMainCanvas";

const particles: Sketch = seed => {
    return p => {
        p.setup = () => {
            p.randomSeed(seed);
            const cvs = createMainCanvas(p);
        };

        p.draw = () => {};
    };
};
