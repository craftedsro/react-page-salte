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
exports.getCurrentNodeWithPlugin = void 0;
var slate_1 = require("slate");
var slate_react_1 = require("slate-react");
var getCurrentNodeWithPlugin = function (editor, plugin) {
    if (plugin.pluginType === 'custom') {
        return null;
    }
    var match = plugin.pluginType === 'component'
        ? plugin.object === 'mark'
            ? function (elem) { return Boolean(elem[plugin.type]); }
            : function (elem) { return elem.type === plugin.type; }
        : plugin.pluginType === 'data'
            ? // search for data
                function (_a) {
                    var data = _a.data;
                    var matches = plugin.dataMatches(data);
                    return matches;
                }
            : null;
    if (!match) {
        return null;
    }
    try {
        var _a = __read(slate_1.Editor.nodes(editor, {
            match: match,
            mode: 'lowest', // FIXME: whats the best value?
        }), 1), matchingNode = _a[0];
        return matchingNode;
    }
    catch (e) {
        // seems to crash sometimes on redu
        return null;
    }
};
exports.getCurrentNodeWithPlugin = getCurrentNodeWithPlugin;
exports.default = (function (plugin) {
    var editor = (0, slate_react_1.useSlate)();
    return (0, exports.getCurrentNodeWithPlugin)(editor, plugin);
});
//# sourceMappingURL=useCurrentNodeWithPlugin.js.map