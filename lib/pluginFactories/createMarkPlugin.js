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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var createComponentPlugin_1 = __importDefault(require("./createComponentPlugin"));
exports.default = (function (markDef) {
    return (0, createComponentPlugin_1.default)({
        type: markDef.type,
        object: 'mark',
        hotKey: markDef.hotKey,
        icon: markDef.icon,
        label: markDef.label,
        addToolbarButton: false,
        addHoverButton: true,
        deserialize: {
            tagName: markDef.tagName,
        },
        Component: function (_a) {
            var children = _a.children, attributes = _a.attributes;
            var Tag = markDef.tagName;
            return react_1.default.createElement(Tag, __assign({}, attributes), children);
        },
    });
});
//# sourceMappingURL=createMarkPlugin.js.map