interface sketch {
    title: string,
    module: string
}

const sketches : sketch[] = [
    { title: "Splatter", module: "splatter1" }
];

define(require => {
    const p5 = require("./lib/p5");

    const hydrateTitleSelector = function($titleSelector: HTMLSelectElement, sketches: sketch[]) : HTMLSelectElement {
        $titleSelector.innerHTML = "";
        sketches.forEach(sketch => {
            const $option = new Option(sketch.title, sketch.module);
            $titleSelector.add($option);
        });
        $titleSelector.item(0).selected = true;
        return $titleSelector;
    }

    const $titleSelector : HTMLSelectElement = <HTMLSelectElement>document.getElementById('titleSelector');
    hydrateTitleSelector($titleSelector, sketches);

    const $selectedOption : HTMLOptionElement = $titleSelector.item($titleSelector.selectedIndex);

    let sketchTitle = $selectedOption.title;
    let sketchModule = $selectedOption.value;

    require(["./sketches/" + sketchModule], sketch => {
        const myP5 = new p5(sketch.default(sketchTitle));
    });
});
