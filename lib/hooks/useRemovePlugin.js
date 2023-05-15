"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePlugin = void 0;
var react_1 = require("react");
var slate_1 = require("slate");
var slate_react_1 = require("slate-react");
var getCurrentData_1 = __importDefault(require("../utils/getCurrentData"));
var removePlugin = function (editor, plugin) {
    if (plugin.customRemove) {
        plugin.customRemove(editor);
    }
    else if (plugin.pluginType === 'component') {
        if (plugin.object === 'mark') {
            editor.removeMark(plugin.type);
        }
        else if (plugin.object === 'inline') {
            if (plugin.isVoid) {
                slate_1.Transforms.removeNodes(editor, {
                    match: function (elem) { return elem.type === plugin.type; },
                });
            }
            else {
                slate_1.Transforms.unwrapNodes(editor, {
                    match: function (elem) { return elem.type === plugin.type; },
                });
            }
            // Transforms.setNodes(editor, { type: null });
        }
        else if (plugin.object === 'block') {
            if (plugin.isVoid) {
                slate_1.Transforms.removeNodes(editor, {
                    match: function (elem) { return elem.type === plugin.type; },
                });
            }
            else if (plugin.replaceWithDefaultOnRemove) {
                slate_1.Transforms.setNodes(editor, {
                    type: null,
                });
            }
            else {
                slate_1.Transforms.unwrapNodes(editor, {
                    match: function (elem) { return elem.type === plugin.type; },
                    split: true,
                });
            }
        }
    }
    else if (plugin.pluginType === 'data') {
        if (!plugin.properties) {
            // can't be removed
        }
        else {
            var existingData_1 = (0, getCurrentData_1.default)(editor);
            var dataWithout = Object.keys(existingData_1).reduce(function (acc, key) {
                var _a;
                var _b;
                if ((_b = plugin.properties) === null || _b === void 0 ? void 0 : _b.includes(key)) {
                    return acc;
                }
                return __assign(__assign({}, acc), (_a = {}, _a[key] = existingData_1[key], _a));
            }, {});
            slate_1.Transforms.setNodes(editor, {
                data: dataWithout,
            });
        }
    }
};
exports.removePlugin = removePlugin;
exports.default = (function (plugin) {
    var editor = (0, slate_react_1.useSlate)();
    return (0, react_1.useCallback)(function () { return (0, exports.removePlugin)(editor, plugin); }, []);
});
//# sourceMappingURL=useRemovePlugin.js.map