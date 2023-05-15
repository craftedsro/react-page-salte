"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var editor_1 = require("@react-page/editor");
var react_1 = __importStar(require("react"));
var slate_1 = require("slate");
var slate_react_1 = require("slate-react");
var withInline_1 = __importDefault(require("../slateEnhancer/withInline"));
var withPaste_1 = __importDefault(require("../slateEnhancer/withPaste"));
var DialogVisibleProvider_1 = __importDefault(require("./DialogVisibleProvider"));
var SlateProvider = function (props) {
    var data = props.data, plugins = props.plugins, children = props.children, defaultPluginType = props.defaultPluginType;
    var editor = (0, react_1.useMemo)(function () {
        return (0, withPaste_1.default)(plugins, defaultPluginType)((0, slate_react_1.withReact)((0, withInline_1.default)(plugins)((0, slate_1.createEditor)())));
    }, []);
    // unfortunatly, slate broke the controlled input pattern. So we have to hack our way around it, see https://github.com/ianstormtaylor/slate/issues/4992
    (0, react_1.useMemo)(function () {
        // better do this in use effect to avoid certain timing edge cases
        editor.children = data === null || data === void 0 ? void 0 : data.slate;
    }, [data === null || data === void 0 ? void 0 : data.slate]);
    (0, react_1.useEffect)(function () {
        try {
            // focus
            slate_react_1.ReactEditor.focus(editor);
        }
        catch (e) {
            // ignore, can happen
        }
        if (data.selection) {
            // update seleciton, if changed from outside (e.g. through undo)
            slate_1.Transforms.select(editor, data.selection);
        }
        else {
            // deselect, otherwise slate might throw an eerror if cursor is now on a non existing dom node
            slate_1.Transforms.deselect(editor);
        }
    }, [data === null || data === void 0 ? void 0 : data.slate, data === null || data === void 0 ? void 0 : data.selection]);
    var onChange = (0, react_1.useCallback)(function () {
        var dataEqual = (0, editor_1.deepEquals)(editor.children, data === null || data === void 0 ? void 0 : data.slate);
        var selectionEqual = (0, editor_1.deepEquals)(editor.selection, data === null || data === void 0 ? void 0 : data.selection);
        if (!dataEqual || !selectionEqual)
            props.onChange({
                slate: editor.children,
                selection: editor.selection,
            }, {
                // mark as not undoable when state is same
                // that happens if only selection was changed
                notUndoable: dataEqual,
            });
    }, [data === null || data === void 0 ? void 0 : data.slate, props.onChange]);
    var initialValue = data === null || data === void 0 ? void 0 : data.slate;
    return (react_1.default.createElement(DialogVisibleProvider_1.default, null,
        react_1.default.createElement(slate_react_1.Slate, { editor: editor, value: initialValue /*
        this is confusingly only for the initial value since slate 0.70something, see https://github.com/ianstormtaylor/slate/issues/4992
      */, onChange: onChange }, children)));
};
exports.default = SlateProvider;
//# sourceMappingURL=SlateProvider.js.map