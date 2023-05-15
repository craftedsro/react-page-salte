"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var useCurrentNodeWithPlugin_1 = __importDefault(require("./useCurrentNodeWithPlugin"));
exports.default = (function (plugin) {
    var nodeEntry = (0, useCurrentNodeWithPlugin_1.default)(plugin);
    return Boolean(nodeEntry);
});
//# sourceMappingURL=usePluginIsActive.js.map