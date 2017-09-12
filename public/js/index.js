var sketches = [
    { title: "Splatter", module: "splatter1" }
];
define(function (require) {
    var p5 = require("./lib/p5");
    require(["./sketches/" + sketches[0].module], function (sketch) {
        var myP5 = new p5(sketch.default);
    });
});
