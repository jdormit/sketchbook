var sketches = [
    { title: "Mondrian I", module: "mondrian", seed: function () { return Date.now(); } },
    { title: "Splatter", module: "splatter1", seed: function () { return Date.now(); } },
    { title: "Circles", module: "randomCircles", seed: function () { return Date.now(); } }
];
var save = function (p5, title) {
    p5.save(title);
};
var currentSaveFunction;
var initSaveButton = function (p5, title) {
    var $save = document.getElementById("save");
    $save.removeEventListener("click", currentSaveFunction);
    currentSaveFunction = function () { return save(p5, title); };
    $save.addEventListener("click", currentSaveFunction);
};
var initSeedSpan = function (seed) {
    var $seed = document.getElementById("seed");
    $seed.innerHTML = "Seed: " + seed;
};
var loadSketch = function (explicitSeed) {
    var $titleSelector = document.getElementById("titleSelector");
    var sketchData = sketches[$titleSelector.selectedIndex];
    var seed = explicitSeed
        ? explicitSeed
        : typeof sketchData.seed === "function"
            ? sketchData.seed()
            : sketchData.seed;
    initSeedSpan(seed);
    require(["./lib/p5", "./sketches/" + sketchData.module], function (p5, sketch) {
        var currentP5 = new p5(sketch.default(seed));
        initSaveButton(currentP5, sketchData.title);
    });
};
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
        $titleSelector.addEventListener("change", function () { return loadSketch(); });
        return $titleSelector;
    };
    var $titleSelector = document.getElementById("titleSelector");
    initTitleSelector($titleSelector, sketches);
    loadSketch();
    var $refresh = document.getElementById("refresh");
    $refresh.addEventListener("click", function () { return loadSketch(); });
});
