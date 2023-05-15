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
var createDataPlugin_1 = __importDefault(require("../pluginFactories/createDataPlugin"));
var AlignLeftIcon = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('@mui/icons-material/FormatAlignLeft')); }); });
var AlignCenterIcon = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('@mui/icons-material/FormatAlignCenter')); }); });
var AlignRightIcon = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('@mui/icons-material/FormatAlignRight')); }); });
var AlignJustifyIcon = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('@mui/icons-material/FormatAlignJustify')); }); });
var left = (0, createDataPlugin_1.default)({
    icon: react_1.default.createElement(AlignLeftIcon, null),
    label: 'Align Left',
    object: 'block',
    addToolbarButton: true,
    addHoverButton: false,
    dataMatches: function (data) { return (data === null || data === void 0 ? void 0 : data.align) === 'left'; },
    getInitialData: function () { return ({ align: 'left' }); },
});
var center = (0, createDataPlugin_1.default)({
    icon: react_1.default.createElement(AlignCenterIcon, null),
    label: 'Align Center',
    object: 'block',
    addToolbarButton: true,
    addHoverButton: false,
    dataMatches: function (data) { return (data === null || data === void 0 ? void 0 : data.align) === 'center'; },
    getInitialData: function () { return ({ align: 'center' }); },
});
var right = (0, createDataPlugin_1.default)({
    icon: react_1.default.createElement(AlignRightIcon, null),
    label: 'Align Right',
    object: 'block',
    addToolbarButton: true,
    addHoverButton: false,
    dataMatches: function (data) { return (data === null || data === void 0 ? void 0 : data.align) === 'right'; },
    getInitialData: function () { return ({ align: 'right' }); },
});
var justify = (0, createDataPlugin_1.default)({
    icon: react_1.default.createElement(AlignJustifyIcon, null),
    label: 'Align Justify',
    object: 'block',
    addToolbarButton: true,
    addHoverButton: false,
    dataMatches: function (data) { return (data === null || data === void 0 ? void 0 : data.align) === 'justify'; },
    getInitialData: function () { return ({ align: 'justify' }); },
});
exports.default = {
    left: left,
    center: center,
    right: right,
    justify: justify,
};
//# sourceMappingURL=alignment.js.map