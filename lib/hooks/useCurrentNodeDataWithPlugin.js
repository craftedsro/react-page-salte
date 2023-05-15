"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentNodeDataWithPlugin = void 0;
var slate_react_1 = require("slate-react");
var useCurrentNodeWithPlugin_1 = require("./useCurrentNodeWithPlugin");
var getCurrentNodeDataWithPlugin = function (editor, plugin) {
    var currentNodeEntry = (0, useCurrentNodeWithPlugin_1.getCurrentNodeWithPlugin)(editor, plugin);
    if (currentNodeEntry) {
        var currentNode = currentNodeEntry[0];
        if (plugin.pluginType === 'component' && plugin.object === 'mark') {
            return currentNode[plugin.type];
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var data = currentNode.data;
        return data;
    }
    else if (plugin.getInitialData) {
        return plugin.getInitialData();
    }
    else {
        return {};
    }
};
exports.getCurrentNodeDataWithPlugin = getCurrentNodeDataWithPlugin;
exports.default = (function (plugin) {
    var editor = (0, slate_react_1.useSlate)();
    return (0, exports.getCurrentNodeDataWithPlugin)(editor, plugin);
});
//# sourceMappingURL=useCurrentNodeDataWithPlugin.js.map