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
var pluginFactories_1 = require("../../pluginFactories");
var createListIndentionPlugin_1 = __importDefault(require("../../pluginFactories/createListIndentionPlugin"));
var createListPlugin_1 = __importDefault(require("../../pluginFactories/createListPlugin"));
var constants_1 = require("./constants");
var ListIcon = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('@mui/icons-material/FormatListBulleted')); }); });
var OrderedListIcon = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('@mui/icons-material/FormatListNumbered')); }); });
var IncreaseIndentIcon = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('@mui/icons-material/FormatIndentIncrease')); }); });
var DecreaseIndentIcon = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('@mui/icons-material/FormatIndentDecrease')); }); });
var ol = (0, createListPlugin_1.default)({
    type: constants_1.OL,
    icon: react_1.default.createElement(OrderedListIcon, null),
    label: 'Ordered List',
    tagName: 'ol',
});
var ul = (0, createListPlugin_1.default)({
    type: constants_1.UL,
    icon: react_1.default.createElement(ListIcon, null),
    label: 'Unordered List',
    tagName: 'ul',
});
// only used for easier access on createCata
var li = (0, pluginFactories_1.createListItemPlugin)({
    tagName: 'li',
    type: constants_1.LI,
});
var indention = (0, createListIndentionPlugin_1.default)({
    iconIncrease: react_1.default.createElement(IncreaseIndentIcon, null),
    iconDecrease: react_1.default.createElement(DecreaseIndentIcon, null),
    listItemType: constants_1.LI,
    labelIncrease: 'Increase Indentation',
    labelDecrease: 'Decrease Indentation',
});
exports.default = {
    ol: ol,
    ul: ul,
    li: li,
    indention: indention,
};
//# sourceMappingURL=index.js.map