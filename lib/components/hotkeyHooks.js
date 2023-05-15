"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOnKeyDown = void 0;
var is_hotkey_1 = __importDefault(require("is-hotkey"));
var react_1 = __importDefault(require("react"));
var slate_react_1 = require("slate-react");
var slate_react_2 = require("slate-react");
var useAddPlugin_1 = require("../hooks/useAddPlugin");
var useCurrentNodeWithPlugin_1 = require("../hooks/useCurrentNodeWithPlugin");
var useRemovePlugin_1 = require("../hooks/useRemovePlugin");
var useOnKeyDown = function (_a, deps) {
    var plugins = _a.plugins;
    var editor = (0, slate_react_2.useSlate)();
    return react_1.default.useCallback(function (event) {
        plugins
            .filter(function (plugin) { return plugin.hotKey; })
            .forEach(function (plugin) {
            if (plugin.hotKey && (0, is_hotkey_1.default)(plugin.hotKey, event)) {
                event.preventDefault();
                var node = (0, useCurrentNodeWithPlugin_1.getCurrentNodeWithPlugin)(editor, plugin);
                if (node) {
                    (0, useRemovePlugin_1.removePlugin)(editor, plugin);
                }
                else {
                    (0, useAddPlugin_1.addPlugin)(editor, plugin);
                }
            }
        });
        // we need to prevent slate from handling undo and redo
        if ((0, is_hotkey_1.default)(['mod+z', 'mod+y'], event)) {
            event.preventDefault();
            return true;
        }
        if ((0, is_hotkey_1.default)(['esc'], event)) {
            slate_react_1.ReactEditor.blur(editor);
            return true;
        }
        if ((0, is_hotkey_1.default)('shift+enter', event)) {
            event.preventDefault();
            editor.insertText('\n');
            return true;
        }
    }, deps);
};
exports.useOnKeyDown = useOnKeyDown;
//# sourceMappingURL=hotkeyHooks.js.map