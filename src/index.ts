interface Sketch {
  title: string;
  module: string;
}

const sketches: Sketch[] = [
  { title: "Mondrian I", module: "mondrian" },
  { title: "Splatter", module: "splatter1" },
  { title: "Circles", module: "randomCircles" }
];

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

    sketchTitle = $selectedOption.title;
    sketchModule = $selectedOption.value;

    require(["./sketches/" + sketchModule], sketch => {
      const myP5 = new p5(sketch.default(sketchTitle));
    });
  };

  const $titleSelector: HTMLSelectElement = <HTMLSelectElement>document.getElementById(
    "titleSelector"
  );
  initTitleSelector($titleSelector, sketches);
  handleSelected();
});
