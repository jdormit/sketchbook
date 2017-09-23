interface SeedFunction {
    (): string | number;
}

interface Sketch {
    title: string;
    module: string;
    seed: string | number | SeedFunction;
}

const sketches: Sketch[] = [
    { title: "Mondrian I", module: "mondrian", seed: () => Date.now() },
    { title: "Splatter", module: "splatter1", seed: () => Date.now() },
    { title: "Circles", module: "randomCircles", seed: () => Date.now() }
];

const save = function(p5: any, title: string) {
    p5.save(title);
};

let currentSaveFunction;

const initSaveButton = function(p5, title) {
    const $save = document.getElementById("save")!;
    $save.removeEventListener("click", currentSaveFunction);
    currentSaveFunction = () => save(p5, title);
    $save.addEventListener("click", currentSaveFunction);
};

const initSeedSpan = function(seed: string | number) {
    const $seed = document.getElementById("seed")!;
    $seed.innerHTML = `Seed: ${seed}`;
};

const initTitle = function(title: string) {
    const $title = document.getElementById("title")!;
    $title.innerHTML = "";
    $title.appendChild(document.createTextNode(title));
};

const displaySketchList = function() {
    const $listHolder = document.getElementById("listHolder")!;
    $listHolder.style.display = "block";
};

const hideSketchList = function() {
    const $listHolder = document.getElementById("listHolder")!;
    $listHolder.style.display = "none";
};

let currentSketch: Sketch = sketches[0];

const loadSketch = function(
    sketchData: Sketch,
    explicitSeed?: number | string
) {
    currentSketch = sketchData;
    const seed = explicitSeed
        ? explicitSeed
        : typeof sketchData.seed === "function"
          ? sketchData.seed()
          : sketchData.seed;
    initSeedSpan(seed);
    initTitle(sketchData.title);
    require(["./lib/p5", "./sketches/" + sketchData.module], (p5, sketch) => {
        const currentP5 = new p5(sketch.default(seed));
        initSaveButton(currentP5, sketchData.title);
    });
};

const initSketchList = function() {
    const $sketchList = document.getElementById("sketchList")!;
    for (const sketch of sketches) {
        const $text = document.createTextNode(sketch.title);
        const $li = document.createElement("li");
        $li.addEventListener("click", () => {
            loadSketch(sketch);
            hideSketchList();
        });
        $li.appendChild($text);
        $sketchList.appendChild($li);
    }
};

define(require => {
    const p5 = require("./lib/p5");

    initSketchList();
    loadSketch(sketches[0]);

    const $list = document.getElementById("list")!;
    $list.addEventListener("click", displaySketchList);
    const $closeList = document.getElementById("closeList")!;
    $closeList.addEventListener("click", hideSketchList);

    const $refresh = document.getElementById("refresh")!;
    $refresh.addEventListener("click", () => loadSketch(currentSketch));
});
