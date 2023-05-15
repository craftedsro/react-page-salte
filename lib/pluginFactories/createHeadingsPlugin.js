"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createSimpleHtmlBlockPlugin_1 = __importDefault(require("./createSimpleHtmlBlockPlugin"));
// eslint-disable-next-line @typescript-eslint/ban-types
function createHeadingsPlugin(def) {
    return (0, createSimpleHtmlBlockPlugin_1.default)({
        type: def.type,
        hotKey: 'mod+' + def.level,
        replaceWithDefaultOnRemove: true,
        icon: def.icon,
        label: "Heading ".concat(def.level),
        tagName: ('h' + def.level),
    });
}
exports.default = createHeadingsPlugin;
//# sourceMappingURL=createHeadingsPlugin.js.map