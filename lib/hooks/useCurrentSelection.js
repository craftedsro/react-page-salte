"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var slate_react_1 = require("slate-react");
exports.default = (function () {
    var editor = (0, slate_react_1.useSlate)();
    return editor.selection;
});
//# sourceMappingURL=useCurrentSelection.js.map