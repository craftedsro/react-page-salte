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
var createHeadingsPlugin_1 = __importDefault(require("../../pluginFactories/createHeadingsPlugin"));
var editor_1 = require("@react-page/editor");
var react_1 = __importDefault(require("react"));
var H1Icon = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('@mui/icons-material/LooksOne')); }); });
var H2Icon = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('@mui/icons-material/LooksTwo')); }); });
var H3Icon = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('@mui/icons-material/Looks3')); }); });
var H4Icon = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('@mui/icons-material/Looks4')); }); });
var H5Icon = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('@mui/icons-material/Looks5')); }); });
var H6Icon = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('@mui/icons-material/Looks6')); }); });
exports.default = {
    h1: (0, createHeadingsPlugin_1.default)({
        type: 'HEADINGS/HEADING-ONE',
        level: 1,
        icon: react_1.default.createElement(H1Icon, null),
    }),
    h2: (0, createHeadingsPlugin_1.default)({
        type: 'HEADINGS/HEADING-TWO',
        level: 2,
        icon: react_1.default.createElement(H2Icon, null),
    }),
    h3: (0, createHeadingsPlugin_1.default)({
        type: 'HEADINGS/HEADING-THREE',
        level: 3,
        icon: react_1.default.createElement(H3Icon, null),
    }),
    h4: (0, createHeadingsPlugin_1.default)({
        type: 'HEADINGS/HEADING-FOUR',
        level: 4,
        icon: react_1.default.createElement(H4Icon, null),
    }),
    h5: (0, createHeadingsPlugin_1.default)({
        type: 'HEADINGS/HEADING-FIVE',
        level: 5,
        icon: react_1.default.createElement(H5Icon, null),
    }),
    h6: (0, createHeadingsPlugin_1.default)({
        type: 'HEADINGS/HEADING-SIX',
        level: 6,
        icon: react_1.default.createElement(H6Icon, null),
    }),
};
//# sourceMappingURL=index.js.map