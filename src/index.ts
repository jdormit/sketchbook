interface Sketch {
    title: string,
    module: string
}

const sketches : Sketch[] = [
    { title: "Splatter", module: "splatter1" }
];

define(require => {
    const p5 = require("./lib/p5");

    const initTitleSelector = function($titleSelector: HTMLSelectElement, sketches: Sketch[]) : HTMLSelectElement {
        $titleSelector.innerHTML = "";
        sketches.forEach(sketch => {
            const $option = new Option(sketch.title, sketch.module);
            $titleSelector.add($option);
        });
        $titleSelector.item(0).selected = true;
        return $titleSelector;
    }

    const $titleSelector : HTMLSelectElement = <HTMLSelectElement>document.getElementById('titleSelector');
    initTitleSelector($titleSelector, sketches);

    const $selectedOption : HTMLOptionElement = $titleSelector.item($titleSelector.selectedIndex);

    let sketchTitle = $selectedOption.title;
    let sketchModule = $selectedOption.value;

    require(["./sketches/" + sketchModule], sketch => {
        const myP5 = new p5(sketch.default(sketchTitle));
    });
});
