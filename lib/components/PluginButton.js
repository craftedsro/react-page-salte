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
var editor_1 = require("@react-page/editor");
var react_1 = __importStar(require("react"));
var slate_1 = require("slate");
var slate_react_1 = require("slate-react");
var useAddPlugin_1 = __importDefault(require("../hooks/useAddPlugin"));
var usePluginIsActive_1 = __importDefault(require("../hooks/usePluginIsActive"));
var usePluginIsDisabled_1 = __importDefault(require("../hooks/usePluginIsDisabled"));
var useRemovePlugin_1 = __importDefault(require("../hooks/useRemovePlugin"));
var PluginControls_1 = __importDefault(require("./PluginControls"));
var ToolbarButton_1 = __importDefault(require("./ToolbarButton"));
function PluginButton(props) {
    var _a, _b, _c, _d;
    var plugin = props.plugin, dark = props.dark;
    var t = (0, editor_1.useUiTranslator)().t;
    var hasControls = Boolean(plugin.controls);
    var _e = __read((0, react_1.useState)(false), 2), showControls = _e[0], setShowControls = _e[1];
    var editor = (0, slate_react_1.useSlate)();
    var isActive = (0, usePluginIsActive_1.default)(plugin);
    var isVoid = plugin.pluginType === 'component' &&
        (plugin.object === 'inline' || plugin.object === 'block') &&
        plugin.isVoid;
    var shouldInsertWithText = plugin.pluginType === 'component' &&
        (plugin.object === 'inline' || plugin.object === 'mark') &&
        (!editor.selection || slate_1.Range.isCollapsed(editor.selection)) &&
        !isActive &&
        !isVoid;
    var add = (0, useAddPlugin_1.default)(plugin);
    var remove = (0, useRemovePlugin_1.default)(plugin);
    var close = (0, react_1.useCallback)(function () { return setShowControls(false); }, [setShowControls]);
    var onClick = react_1.default.useCallback(function (e) {
        e.preventDefault();
        if (hasControls || shouldInsertWithText) {
            setShowControls(!showControls);
        }
        else {
            if (isActive) {
                remove();
            }
            else {
                add();
            }
        }
    }, [isActive, hasControls, showControls, shouldInsertWithText]);
    var isDisabled = (0, usePluginIsDisabled_1.default)(plugin);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ToolbarButton_1.default, { onClick: onClick, disabled: isDisabled, isActive: isActive, dark: dark, icon: (_a = plugin.icon) !== null && _a !== void 0 ? _a : (plugin.pluginType === 'component'
                ? (_c = (_b = plugin.deserialize) === null || _b === void 0 ? void 0 : _b.tagName) !== null && _c !== void 0 ? _c : ''
                : ''), toolTip: (_d = t(plugin.label)) !== null && _d !== void 0 ? _d : '' }),
        (hasControls || shouldInsertWithText) && showControls ? (react_1.default.createElement(PluginControls_1.default, __assign({}, props, { open: showControls, close: close }))) : null));
}
exports.default = react_1.default.memo(PluginButton);
//# sourceMappingURL=PluginButton.js.map