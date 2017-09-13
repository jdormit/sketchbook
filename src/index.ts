interface Sketch {
    title: string;
    module: string;
    seed: string | number;
}

const sketches: Sketch[] = [
    { title: "Mondrian I", module: "mondrian", seed: Date.now() },
    { title: "Splatter", module: "splatter1", seed: Date.now() },
    { title: "Circles", module: "randomCircles", seed: Date.now() }
];

const loadSketchWithSeed = function(seed: number | string) {
    const $titleSelector: HTMLSelectElement = <HTMLSelectElement>document.getElementById(
        "titleSelector"
    );
    const sketchData = sketches[$titleSelector.selectedIndex];
    require(["./lib/p5", "./sketches/" + sketchData.module], (p5, sketch) => {
        new p5(sketch.default(seed));
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
        $titleSelector.addEventListener("change", handleSelected);
        return $titleSelector;
    };

    const handleSelected = () => {
        const $selectedOption: HTMLOptionElement = $titleSelector.item(
            $titleSelector.selectedIndex
        );

        const sketchData = sketches[$titleSelector.selectedIndex];

        require(["./sketches/" + sketchData.module], sketch => {
            const myP5 = new p5(sketch.default(sketchData.seed));
        });
    };

    const $titleSelector: HTMLSelectElement = <HTMLSelectElement>document.getElementById(
        "titleSelector"
    );
    initTitleSelector($titleSelector, sketches);
    handleSelected();
});
