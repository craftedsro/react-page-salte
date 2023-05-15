"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionalWrapper = void 0;
var react_1 = __importDefault(require("react"));
var ConditionalWrapper = function (_a) {
    var condition = _a.condition, wrapper = _a.wrapper, children = _a.children;
    return (react_1.default.createElement(react_1.default.Fragment, null, condition ? wrapper(children) : children));
};
exports.ConditionalWrapper = ConditionalWrapper;
//# sourceMappingURL=ConditionalWrapper.js.map