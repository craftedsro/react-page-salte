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
var react_1 = __importStar(require("react"));
var react_portal_1 = require("react-portal");
var slate_react_1 = require("slate-react");
var useTextIsSelected_1 = __importDefault(require("../hooks/useTextIsSelected"));
var PluginButton_1 = __importDefault(require("./PluginButton"));
var HoverButtons = function (_a) {
    var plugins = _a.plugins, translations = _a.translations;
    var showHoverToolbar = (0, useTextIsSelected_1.default)();
    var toolbarRef = (0, react_1.useRef)(null);
    var editor = (0, slate_react_1.useSlate)();
    (0, react_1.useEffect)(function () {
        var toolbar = toolbarRef.current;
        if (!showHoverToolbar || !toolbar) {
            return;
        }
        var s = window.getSelection();
        try {
            var oRange = s === null || s === void 0 ? void 0 : s.getRangeAt(0); // get the text range
            var oRect = oRange === null || oRange === void 0 ? void 0 : oRange.getBoundingClientRect();
            if (oRect) {
                var left = oRect.left, top_1 = oRect.top, width = oRect.width;
                toolbar.style.opacity = '1';
                toolbar.style.top = "".concat(top_1 + window.scrollY - toolbar.offsetHeight, "px");
                toolbar.style.left = "".concat(left + window.scrollX - toolbar.offsetWidth / 2 + width / 2, "px");
            }
        }
        catch (e) {
            // ignore
        }
    }, [editor, showHoverToolbar]);
    return (react_1.default.createElement(react_portal_1.Portal, null,
        react_1.default.createElement("div", { className: 'react-page-plugins-content-slate-inline-toolbar ' +
                (showHoverToolbar
                    ? ''
                    : 'react-page-plugins-content-slate-inline-toolbar--hidden'), style: { padding: 0 }, ref: toolbarRef }, plugins &&
            plugins.map(function (plugin, i) {
                return plugin.addHoverButton ? (react_1.default.createElement(PluginButton_1.default, { dark: true, translations: translations, key: i, plugin: plugin })) : null;
            }))));
};
exports.default = HoverButtons;
//# sourceMappingURL=HoverButtons.js.map