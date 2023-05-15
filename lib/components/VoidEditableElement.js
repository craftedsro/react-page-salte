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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var slate_1 = require("slate");
var slate_react_1 = require("slate-react");
var PluginControls_1 = __importDefault(require("./PluginControls"));
var slate_react_2 = require("slate-react");
var VoidEditableElement = function (_a) {
    var plugin = _a.plugin, element = _a.element, component = _a.component;
    var _b = __read((0, react_1.useState)(false), 2), showVoidDialog = _b[0], setShowVoidDialog = _b[1];
    var editor = (0, slate_react_1.useSlateStatic)();
    var onVoidClick = (0, react_1.useCallback)(function (e) {
        e.stopPropagation();
        var path = slate_react_1.ReactEditor.findPath(editor, element);
        setShowVoidDialog(true);
        slate_1.Transforms.select(editor, path);
    }, [editor, element]);
    var closeVoidDialog = (0, react_1.useCallback)(function () { return setShowVoidDialog(false); }, []);
    var Element = plugin.object === 'inline' ? 'span' : 'div';
    var selected = (0, slate_react_2.useSelected)();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        showVoidDialog ? (react_1.default.createElement(PluginControls_1.default, { open: showVoidDialog, close: closeVoidDialog, plugin: plugin })) : null,
        react_1.default.createElement(Element, { onClick: onVoidClick, style: {
                cursor: 'pointer',
                outline: selected ? '1px dotted grey' : undefined,
            } },
            react_1.default.createElement(Element, { style: { pointerEvents: 'none' } }, component))));
};
exports.default = VoidEditableElement;
//# sourceMappingURL=VoidEditableElement.js.map