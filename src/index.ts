interface sketch {
    title: string,
    module: string
}

const sketches : sketch[] = [
    { title: "Splatter", module: "splatter1" }
];

define(require => {
    const p5 = require("./lib/p5");
    require(["./sketches/" + sketches[0].module], sketch => {
        const myP5 = new p5(sketch.default);
    });
});
