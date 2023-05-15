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
var react_1 = __importDefault(require("react"));
var slate_react_1 = require("slate-react");
var DialogVisibleProvider_1 = require("./DialogVisibleProvider");
var hotkeyHooks_1 = require("./hotkeyHooks");
var renderHooks_1 = require("./renderHooks");
var HoverButtons = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('./HoverButtons')); }); });
var SlateEditable = react_1.default.memo(function (props) {
    var plugins = props.plugins, defaultPluginType = props.defaultPluginType, readOnly = props.readOnly, placeholder = props.placeholder;
    var injections = {
        useSelected: slate_react_1.useSelected,
        useFocused: slate_react_1.useFocused,
        readOnly: readOnly,
    };
    var renderElement = (0, renderHooks_1.useRenderElement)({ plugins: plugins, defaultPluginType: defaultPluginType, injections: injections }, []);
    var renderLeaf = (0, renderHooks_1.useRenderLeave)({ plugins: plugins, injections: injections }, []);
    var onKeyDown = (0, hotkeyHooks_1.useOnKeyDown)({ plugins: plugins }, []);
    // this is required so that dialogs & controls don't mess with slate's selection
    var dialogVisible = (0, DialogVisibleProvider_1.useDialogIsVisible)();
    var multipleNodesSelected = (0, editor_1.useAllFocusedNodeIds)().length > 1;
    return (react_1.default.createElement(slate_react_1.Editable, { placeholder: readOnly ? undefined : placeholder, readOnly: dialogVisible || readOnly || multipleNodesSelected, renderElement: renderElement, renderLeaf: renderLeaf, onKeyDown: readOnly ? undefined : onKeyDown }));
});
var SlateEditor = function (props) {
    var _a, _b;
    var plugins = props.plugins, focused = props.focused, readOnly = props.readOnly;
    var t = (0, editor_1.useUiTranslator)().t;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        !readOnly && focused && (react_1.default.createElement(HoverButtons, { plugins: props.plugins, translations: props.translations })),
        react_1.default.createElement(SlateEditable, { placeholder: (_b = t((_a = props.translations) === null || _a === void 0 ? void 0 : _a.placeholder)) !== null && _b !== void 0 ? _b : '', readOnly: readOnly, plugins: plugins, defaultPluginType: props.defaultPluginType })));
};
exports.default = react_1.default.memo(SlateEditor);
//# sourceMappingURL=SlateEditor.js.map