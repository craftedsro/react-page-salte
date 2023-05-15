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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var editor_1 = require("@react-page/editor");
var react_1 = __importDefault(require("react"));
var ConditionalWrapper_1 = require("./ConditionalWrapper");
var material_1 = require("@mui/material");
var IconButton = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('@mui/material/IconButton')); }); });
var Tooltip = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('@mui/material/Tooltip')); }); });
var ToolbarButton = function (_a) {
    var dark = _a.dark, icon = _a.icon, isActive = _a.isActive, onClick = _a.onClick, _b = _a.disabled, disabled = _b === void 0 ? false : _b, _c = _a.toolTip, toolTip = _c === void 0 ? '' : _c;
    var theme = (0, material_1.useTheme)();
    return (react_1.default.createElement(ConditionalWrapper_1.ConditionalWrapper, { condition: !disabled, wrapper: function (children) { return (react_1.default.createElement(Tooltip, { title: toolTip },
            react_1.default.createElement(react_1.default.Fragment, null, children))); } },
        react_1.default.createElement(IconButton, { onMouseDown: onClick, style: __assign({ transition: '0.3s' }, (isActive
                ? {
                    transform: 'scale(1.15)',
                    color: theme.palette.primary.main,
                }
                : disabled
                    ? { color: theme.palette.action.disabled }
                    : {
                        color: dark
                            ? theme.palette.common.white
                            : theme.palette.common.black,
                    })), disabled: disabled }, icon)));
};
exports.default = react_1.default.memo(ToolbarButton);
//# sourceMappingURL=ToolbarButton.js.map