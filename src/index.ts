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

const loadSketch = function(explicitSeed?: number | string) {
    const $titleSelector: HTMLSelectElement = <HTMLSelectElement>document.getElementById(
        "titleSelector"
    );
    const sketchData = sketches[$titleSelector.selectedIndex];
    const seed = explicitSeed
        ? explicitSeed
        : typeof sketchData.seed === "function"
          ? sketchData.seed()
          : sketchData.seed;
    initSeedSpan(seed);
    require(["./lib/p5", "./sketches/" + sketchData.module], (p5, sketch) => {
        const currentP5 = new p5(sketch.default(seed));
        initSaveButton(currentP5, sketchData.title);
    });
};

define(require => {
    const p5 = require("./lib/p5");

    let sketchTitle;
    let sketchModule;

    const initTitleSelector = function(
        $titleSelector: HTMLSelectElement,
        sketches: Sketch[]
    ): HTMLSelectElement {
        $titleSelector.innerHTML = "";
        sketches.forEach(sketch => {
            const $option = new Option(sketch.title, sketch.module);
            $titleSelector.add($option);
        });
        $titleSelector.item(0).selected = true;
        $titleSelector.addEventListener("change", () => loadSketch());
        return $titleSelector;
    };

    const $titleSelector: HTMLSelectElement = <HTMLSelectElement>document.getElementById(
        "titleSelector"
    );
    initTitleSelector($titleSelector, sketches);
    loadSketch();

    const $refresh = document.getElementById("refresh")!;
    $refresh.addEventListener("click", () => loadSketch());
});
