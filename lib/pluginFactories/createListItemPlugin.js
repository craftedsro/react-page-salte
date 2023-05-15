"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createSimpleHtmlBlockPlugin_1 = __importDefault(require("./createSimpleHtmlBlockPlugin"));
function default_1(def) {
    return (0, createSimpleHtmlBlockPlugin_1.default)({
        noButton: true,
        tagName: def.tagName,
        type: def.type,
    });
}
exports.default = default_1;
//# sourceMappingURL=createListItemPlugin.js.map