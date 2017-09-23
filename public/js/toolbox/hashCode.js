define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // From http://www.erlycoder.com/49/javascript-hash-functions-to-convert-string-into-integer-hash-
    function default_1(str) {
        var hash = 0;
        if (str.length == 0)
            return hash;
        for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
    exports.default = default_1;
});
