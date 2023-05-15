"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlignmentFromElement = void 0;
var createComponentPlugin_1 = __importDefault(require("../../pluginFactories/createComponentPlugin"));
var getAlignmentFromElement = function (el) {
    var _a;
    var align = (_a = el === null || el === void 0 ? void 0 : el.style) === null || _a === void 0 ? void 0 : _a.textAlign;
    if (align) {
        return {
            align: align,
        };
    }
};
exports.getAlignmentFromElement = getAlignmentFromElement;
exports.default = {
    paragraph: (0, createComponentPlugin_1.default)({
        type: 'PARAGRAPH/PARAGRAPH',
        label: 'Paragraph',
        object: 'block',
        addToolbarButton: false,
        addHoverButton: false,
        deserialize: {
            tagName: 'p',
            getData: exports.getAlignmentFromElement,
        },
        getStyle: function (_a) {
            var align = _a.align;
            return ({ textAlign: align });
        },
        Component: 'p',
    }),
    // currently only for deserialize
    pre: (0, createComponentPlugin_1.default)({
        type: 'PARAGRAPH/PRE',
        label: 'Pre',
        object: 'block',
        addToolbarButton: false,
        addHoverButton: false,
        deserialize: {
            tagName: 'pre',
            getData: exports.getAlignmentFromElement,
        },
        getStyle: function (_a) {
            var align = _a.align;
            return ({ textAlign: align });
        },
        Component: 'pre',
    }),
};
//# sourceMappingURL=index.js.map