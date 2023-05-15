"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var slate_1 = require("slate");
var getCurrentData = function (editor) {
    var _a;
    var _b = __read(slate_1.Editor.nodes(editor, {
        mode: 'all',
        match: function (node) {
            return Boolean(node.data);
        },
    }), 1), existingNodeWithData = _b[0];
    var existingData = existingNodeWithData
        ? (_a = existingNodeWithData[0]) === null || _a === void 0 ? void 0 : _a.data
        : {};
    return existingData;
};
exports.default = getCurrentData;
//# sourceMappingURL=getCurrentData.js.map