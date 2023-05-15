"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var PluginButton_1 = __importDefault(require("./PluginButton"));
var material_1 = require("@mui/material");
var Controls = function (props) {
    var plugins = props.plugins, translations = props.translations;
    var theme = (0, material_1.useTheme)();
    var dark = theme.palette.mode === 'dark';
    return (react_1.default.createElement("div", null, plugins &&
        plugins.map(function (plugin, i) {
            return plugin.addToolbarButton ? (react_1.default.createElement(PluginButton_1.default, { key: i, translations: translations, plugin: plugin, dark: dark })) : null;
        })));
};
exports.default = react_1.default.memo(Controls);
//# sourceMappingURL=Controls.js.map