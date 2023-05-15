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
exports.addPlugin = void 0;
var react_1 = require("react");
var slate_1 = require("slate");
var slate_react_1 = require("slate-react");
var useCurrentNodeWithPlugin_1 = require("./useCurrentNodeWithPlugin");
var useRemovePlugin_1 = require("./useRemovePlugin");
var getCurrentData_1 = __importDefault(require("../utils/getCurrentData"));
var addPlugin = function (editor, plugin, props) {
    var _a;
    var _b = props || {}, passedData = _b.data, text = _b.text;
    var currentNodeEntry = (0, useCurrentNodeWithPlugin_1.getCurrentNodeWithPlugin)(editor, plugin);
    if (text) {
        var withExtraSpace = plugin.pluginType === 'component' &&
            plugin.object === 'inline' &&
            plugin.addExtraSpace;
        var textToInsert = withExtraSpace ? text + ' ' : text;
        editor.insertText(textToInsert);
        if (editor.selection) {
            slate_1.Transforms.select(editor, {
                anchor: editor.selection.anchor,
                focus: __assign(__assign({}, editor.selection.focus), { offset: editor.selection.focus.offset - textToInsert.length }),
            });
        }
    }
    var data = passedData || (plugin.getInitialData ? plugin.getInitialData() : null);
    if (currentNodeEntry) {
        slate_1.Transforms.select(editor, currentNodeEntry[1]);
        (0, useRemovePlugin_1.removePlugin)(editor, plugin);
    }
    // add new
    if (plugin.customAdd) {
        plugin.customAdd(editor);
    }
    else if (plugin.pluginType === 'component') {
        if (plugin.object === 'mark') {
            editor.addMark(plugin.type, data || true);
        }
        else if (plugin.isVoid) {
            slate_1.Transforms.insertNodes(editor, {
                type: plugin.type,
                data: data,
                children: [{ text: '' }],
            });
        }
        else {
            if (plugin.object === 'block' && plugin.replaceWithDefaultOnRemove) {
                slate_1.Transforms.setNodes(editor, { type: plugin.type, data: data });
            }
            else {
                slate_1.Transforms.wrapNodes(editor, {
                    type: plugin.type,
                    children: [],
                    data: data,
                }, { split: true });
                // workaround for inline problems in slate
                if (plugin.object === 'inline' &&
                    plugin.addExtraSpace &&
                    !text &&
                    editor.selection) {
                    var focus_1 = __assign({}, editor.selection.focus);
                    slate_1.Transforms.insertText(editor, ' ', {
                        at: editor.selection.focus,
                    });
                    slate_1.Transforms.select(editor, focus_1);
                }
            }
        }
    }
    else if (plugin.pluginType === 'data') {
        var existingData = (_a = (0, getCurrentData_1.default)(editor)) !== null && _a !== void 0 ? _a : {};
        slate_1.Transforms.setNodes(editor, {
            data: __assign(__assign({}, existingData), (data !== null && data !== void 0 ? data : {})),
        });
    }
};
exports.addPlugin = addPlugin;
exports.default = (function (plugin) {
    var editor = (0, slate_react_1.useSlate)();
    return (0, react_1.useCallback)(function (props) {
        return (0, exports.addPlugin)(editor, plugin, props);
    }, []);
});
//# sourceMappingURL=useAddPlugin.js.map