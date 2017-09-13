var sketches = [
    { title: "Mondrian I", module: "mondrian" },
    { title: "Splatter", module: "splatter1" },
    { title: "Circles", module: "randomCircles" }
];
define(function (require) {
    var p5 = require("./lib/p5");
    var sketchTitle;
    var sketchModule;
    var initTitleSelector = function ($titleSelector, sketches) {
        $titleSelector.innerHTML = "";
        sketches.forEach(function (sketch) {
            var $option = new Option(sketch.title, sketch.module);
            $titleSelector.add($option);
        });
        $titleSelector.item(0).selected = true;
        $titleSelector.addEventListener("change", handleSelected);
        return $titleSelector;
    };
    var handleSelected = function () {
        var $selectedOption = $titleSelector.item($titleSelector.selectedIndex);
        sketchTitle = $selectedOption.title;
        sketchModule = $selectedOption.value;
        require(["./sketches/" + sketchModule], function (sketch) {
            var myP5 = new p5(sketch.default(sketchTitle));
        });
    };
    var $titleSelector = document.getElementById("titleSelector");
    initTitleSelector($titleSelector, sketches);
    handleSelected();
});
