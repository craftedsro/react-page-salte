"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var createDataPlugin_1 = __importDefault(require("../../pluginFactories/createDataPlugin"));
var anchor = (0, createDataPlugin_1.default)({
    addHoverButton: false,
    addToolbarButton: true,
    object: 'block',
    label: 'Id for Link Anchor',
    icon: react_1.default.createElement("span", null, "#"),
    properties: ['id'],
    dataMatches: function (data) {
        return Boolean(data === null || data === void 0 ? void 0 : data.id);
    },
    controls: {
        type: 'autoform',
        schema: {
            type: 'object',
            required: ['id'],
            properties: {
                id: {
                    type: 'string',
                },
            },
        },
    },
});
exports.default = anchor;
//# sourceMappingURL=anchor.js.map