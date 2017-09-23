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
var initTitle = function (title) {
    var $title = document.getElementById("title");
    $title.innerHTML = "";
    $title.appendChild(document.createTextNode(title));
};
var displaySketchList = function () {
    var $listHolder = document.getElementById("listHolder");
    $listHolder.style.display = "block";
};
var hideSketchList = function () {
    var $listHolder = document.getElementById("listHolder");
    $listHolder.style.display = "none";
};
var currentSketch = sketches[0];
var loadSketch = function (sketchData, explicitSeed) {
    currentSketch = sketchData;
    var seed = explicitSeed
        ? explicitSeed
        : typeof sketchData.seed === "function"
            ? sketchData.seed()
            : sketchData.seed;
    initSeedSpan(seed);
    initTitle(sketchData.title);
    require([
        "./lib/p5",
        "./toolbox/hashCode",
        "./sketches/" + sketchData.module
    ], function (p5, hash, sketch) {
        var seedNum = typeof seed === "number" ? seed : hash.default(seed);
        var currentP5 = new p5(sketch.default(seedNum));
        initSaveButton(currentP5, sketchData.title);
    });
};
var initSketchList = function () {
    var $sketchList = document.getElementById("sketchList");
    var _loop_1 = function (sketch) {
        var $text = document.createTextNode(sketch.title);
        var $li = document.createElement("li");
        $li.addEventListener("click", function () {
            loadSketch(sketch);
            hideSketchList();
        });
        $li.appendChild($text);
        $sketchList.appendChild($li);
    };
    for (var _i = 0, sketches_1 = sketches; _i < sketches_1.length; _i++) {
        var sketch = sketches_1[_i];
        _loop_1(sketch);
    }
};
define(function (require) {
    var p5 = require("./lib/p5");
    initSketchList();
    loadSketch(sketches[0]);
    var $list = document.getElementById("list");
    $list.addEventListener("click", displaySketchList);
    var $closeList = document.getElementById("closeList");
    $closeList.addEventListener("click", hideSketchList);
    var $refresh = document.getElementById("refresh");
    $refresh.addEventListener("click", function () { return loadSketch(currentSketch); });
});
