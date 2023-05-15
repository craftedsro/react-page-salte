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
var createComponentPlugin_1 = __importDefault(require("../../pluginFactories/createComponentPlugin"));
var LinkIcon = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('@mui/icons-material/Link')); }); });
var link = (0, createComponentPlugin_1.default)({
    type: 'LINK/LINK',
    object: 'inline',
    icon: react_1.default.createElement(LinkIcon, null),
    label: 'Link',
    addHoverButton: true,
    addToolbarButton: true,
    controls: {
        type: 'autoform',
        schema: {
            type: 'object',
            required: ['href'],
            properties: {
                href: {
                    type: 'string',
                },
                openInNewWindow: {
                    type: 'boolean',
                },
            },
        },
    },
    deserialize: {
        tagName: 'a',
        getData: function (el) { return ({
            href: el.getAttribute('href') || '',
            openInNewWindow: el.getAttribute('target') === '_blank',
        }); },
    },
    Component: function (_a) {
        var children = _a.children, openInNewWindow = _a.openInNewWindow, href = _a.href, attributes = _a.attributes;
        return (react_1.default.createElement("a", __assign({}, attributes, { target: openInNewWindow ? '_blank' : undefined, href: href }), children));
    },
});
exports.default = link;
//# sourceMappingURL=link.js.map