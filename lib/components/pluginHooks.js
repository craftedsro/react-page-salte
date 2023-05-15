"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useComponentMarkPlugins = exports.useComponentNodePlugins = void 0;
var react_1 = require("react");
var useComponentNodePlugins = function (_a, deps) {
    var plugins = _a.plugins;
    return (0, react_1.useMemo)(function () {
        return plugins.filter(function (plugin) {
            return plugin.pluginType === 'component' && plugin.object !== 'mark';
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        );
    }, deps);
};
exports.useComponentNodePlugins = useComponentNodePlugins;
var useComponentMarkPlugins = function (_a, deps) {
    var plugins = _a.plugins;
    return (0, react_1.useMemo)(function () {
        return plugins.filter(function (plugin) {
            return plugin.pluginType === 'component' && plugin.object === 'mark';
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        );
    }, deps);
};
exports.useComponentMarkPlugins = useComponentMarkPlugins;
//# sourceMappingURL=pluginHooks.js.map