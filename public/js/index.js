var sketches = [
    { title: "Splatter", module: "splatter1" }
];
define(function (require) {
    var p5 = require("./lib/p5");
    var initTitleSelector = function ($titleSelector, sketches) {
        $titleSelector.innerHTML = "";
        sketches.forEach(function (sketch) {
            var $option = new Option(sketch.title, sketch.module);
            $titleSelector.add($option);
        });
        $titleSelector.item(0).selected = true;
        return $titleSelector;
    };
    var $titleSelector = document.getElementById('titleSelector');
    initTitleSelector($titleSelector, sketches);
    var $selectedOption = $titleSelector.item($titleSelector.selectedIndex);
    var sketchTitle = $selectedOption.title;
    var sketchModule = $selectedOption.value;
    require(["./sketches/" + sketchModule], function (sketch) {
        var myP5 = new p5(sketch.default(sketchTitle));
    });
});
