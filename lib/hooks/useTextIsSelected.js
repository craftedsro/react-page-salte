"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var slate_1 = require("slate");
var slate_react_1 = require("slate-react");
var useTextIsSelected = function () {
    var editor = (0, slate_react_1.useSlate)();
    try {
        return Boolean(editor.selection && slate_1.Editor.string(editor, editor.selection) !== '');
    }
    catch (e) {
        // can in some cases throw currently
        return false;
    }
};
exports.default = useTextIsSelected;
//# sourceMappingURL=useTextIsSelected.js.map